import { Coffee, Github } from 'lucide-react'
import { cn } from '../../lib/utils'

const links = [
  {
    href: 'https://ko-fi.com/appl3tree',
    label: 'Ko-fi',
    title: 'Buy me a Coffee',
    icon: <Coffee size={13} />,
    accent: 'hover:border-pink-400/40 hover:text-pink-200',
  },
  {
    href: 'https://github.com/appl3tree/FFVIII-Guide/',
    label: 'GitHub',
    title: 'View on GitHub',
    icon: <Github size={13} />,
    accent: 'hover:border-sky-400/40 hover:text-sky-200',
  },
]

interface Props {
  compact?: boolean
}

export function SupportLinks({ compact = false }: Props) {
  if (compact) {
    return (
      <div className="flex items-center gap-1">
        {links.map(link => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            title={link.title}
            aria-label={link.title}
            className={cn(
              'inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800/80 bg-slate-900/35 text-slate-600 transition-colors',
              link.accent
            )}
          >
            {link.icon}
          </a>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-1.5">
      <p className="px-1 text-[10px] font-semibold uppercase tracking-widest text-slate-700">Project</p>
      <div className="grid grid-cols-2 gap-1.5">
        {links.map(link => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            title={link.title}
            className={`inline-flex min-w-0 items-center justify-center gap-1.5 rounded-lg border border-slate-800/80 bg-slate-900/45 px-2 py-1.5 text-[11px] font-medium text-slate-500 transition-colors ${link.accent}`}
          >
            {link.icon}
            <span className="truncate">{link.label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
