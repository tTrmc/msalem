interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  resetTime: number
  source: 'upstash' | 'memory'
}

interface MemoryEntry {
  count: number
  expiresAt: number
}

const memoryStore = new Map<string, MemoryEntry>()
let warnedAboutRedisConfig = false

const redisUrl = process.env.UPSTASH_REDIS_REST_URL
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN

function logRedisWarning() {
  if (!warnedAboutRedisConfig && process.env.NODE_ENV !== 'test') {
    warnedAboutRedisConfig = true
    console.warn(
      'Upstash Redis credentials are not configured; falling back to in-memory rate limiting. This is not production safe.'
    )
  }
}

function buildResult(
  count: number,
  limit: number,
  resetTime: number,
  source: RateLimitResult['source']
): RateLimitResult {
  return {
    success: count <= limit,
    limit,
    remaining: Math.max(0, limit - count),
    resetTime,
    source,
  }
}

function toNumber(entry: unknown): number {
  if (typeof entry === 'object' && entry !== null && 'result' in (entry as Record<string, unknown>)) {
    return Number((entry as { result: unknown }).result)
  }
  return Number(entry)
}

function memoryRateLimit(identifier: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now()
  const entry = memoryStore.get(identifier)

  if (!entry || entry.expiresAt <= now) {
    const expiresAt = now + windowMs
    memoryStore.set(identifier, { count: 1, expiresAt })
    return buildResult(1, limit, expiresAt, 'memory')
  }

  if (entry.count >= limit) {
    return buildResult(entry.count, limit, entry.expiresAt, 'memory')
  }

  entry.count += 1
  return buildResult(entry.count, limit, entry.expiresAt, 'memory')
}

async function upstashRateLimit(identifier: string, limit: number, windowMs: number): Promise<RateLimitResult> {
  if (!redisUrl || !redisToken) {
    logRedisWarning()
    return memoryRateLimit(identifier, limit, windowMs)
  }

  const key = `rate-limit:${identifier}`
  const commands: Array<[string, ...(string | number)[]]> = [
    ['INCR', key],
    ['PEXPIRE', key, windowMs],
    ['PTTL', key],
  ]

  try {
    const response = await fetch(`${redisUrl}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${redisToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commands),
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`Upstash pipeline failed with status ${response.status}`)
    }

    const payload = await response.json()
    const rawResults = Array.isArray(payload) ? payload : payload?.result
    const results = Array.isArray(rawResults) ? rawResults : []

    const count = toNumber(results[0])
    const ttl = toNumber(results[2])

    if (Number.isNaN(count)) {
      throw new Error('Unable to parse Upstash INCR result')
    }

    const ttlMs = ttl > 0 ? ttl : windowMs
    const resetTime = Date.now() + ttlMs

    return buildResult(count, limit, resetTime, 'upstash')
  } catch (error) {
    console.error('Upstash rate limiting failed; falling back to memory:', error)
    return memoryRateLimit(identifier, limit, windowMs)
  }
}

export async function rateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 15 * 60 * 1000
): Promise<RateLimitResult> {
  return upstashRateLimit(identifier, limit, windowMs)
}
