import { Badge } from './ui/Badge'

interface FeaturePillsProps {
  status: 'active' | 'inactive'
}

const PILLS: Record<'active' | 'inactive', readonly string[]> = {
  active: ['Monitoramento 24/7', 'Anti-Pirataria', 'Validação Pública'],
  inactive: ['Selo Emitido', 'Validação Pública'],
}

export function FeaturePills({ status }: FeaturePillsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 px-5 pb-1 pt-5 md:px-0">
      {PILLS[status].map((label) => (
        <Badge key={label} variant={status === 'active' ? 'success' : 'warning'}>
          {label}
        </Badge>
      ))}
    </div>
  )
}
