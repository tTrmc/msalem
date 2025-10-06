import type { HTMLAttributes, ReactNode } from "react"

type NierPanelVariant = "default" | "muted"

interface NierPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Upper-left heading rendered in the panel header */
  heading?: ReactNode
  /** Optional lighter subtitle rendered alongside the title */
  subtitle?: ReactNode
  /** Right-aligned header actions (icons, status, etc.) */
  actions?: ReactNode
  /** Optional footer content rendered beneath the body */
  footer?: ReactNode
  /** Use the muted surface colour variant */
  variant?: NierPanelVariant
  /** Reduce default body padding for compact layouts */
  compact?: boolean
  /** Extra class names applied to the inner body container */
  bodyClassName?: string
}

export function NierPanel({
  heading,
  subtitle,
  actions,
  footer,
  variant = "default",
  compact = false,
  bodyClassName,
  children,
  className,
  ...rest
}: NierPanelProps) {
  const rootClassName = [
    "nier-panel",
    variant === "muted" ? "nier-panel--muted" : "",
    compact ? "nier-panel--compact" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ")

  const shouldRenderHeader = heading || subtitle || actions

  return (
    <section className={rootClassName} {...rest}>
      <div className="nier-panel__crt" aria-hidden="true" />
      {shouldRenderHeader && (
        <header className="nier-panel__header">
          <div className="flex items-center gap-4">
            {heading && <span className="nier-panel__title">{heading}</span>}
            {subtitle && <span className="nier-panel__subtitle">{subtitle}</span>}
          </div>
          {actions && <div className="nier-panel__actions">{actions}</div>}
        </header>
      )}

      <div className={['nier-panel__body', bodyClassName ?? ''].filter(Boolean).join(' ')}>
        {children}
      </div>

      {footer && <footer className="nier-panel__footer">{footer}</footer>}
    </section>
  )
}
