interface RateLimitEntry {
  count: number
  lastRequest: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

export function rateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): { success: boolean; limit: number; remaining: number; resetTime: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(identifier)

  if (!entry || now - entry.lastRequest > windowMs) {
    // Reset or create new entry
    rateLimitMap.set(identifier, { count: 1, lastRequest: now })
    return {
      success: true,
      limit,
      remaining: limit - 1,
      resetTime: now + windowMs
    }
  }

  if (entry.count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      resetTime: entry.lastRequest + windowMs
    }
  }

  entry.count += 1
  entry.lastRequest = now
  rateLimitMap.set(identifier, entry)

  return {
    success: true,
    limit,
    remaining: limit - entry.count,
    resetTime: entry.lastRequest + windowMs
  }
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now - entry.lastRequest > 15 * 60 * 1000) {
      rateLimitMap.delete(key)
    }
  }
}, 5 * 60 * 1000) // Clean up every 5 minutes
