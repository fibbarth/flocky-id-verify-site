import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '../../lib/utils'

type Variant = 'primary' | 'secondary' | 'whatsapp' | 'instagram'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ComponentPropsWithoutRef<'a'> {
  variant?: Variant
  size?: Size
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-amber-500 text-black hover:bg-amber-400',
  secondary: 'bg-surface-raised text-zinc-100 hover:bg-zinc-700 border border-border',
  whatsapp: 'bg-[#25D366] text-white hover:brightness-110',
  instagram:
    'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white hover:opacity-90',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-5 py-3 text-sm rounded-xl',
  lg: 'px-6 py-3.5 text-base rounded-xl',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <a
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  )
}
