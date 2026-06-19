import { ReactNode } from 'react'
import CountUp from 'react-countup'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: number
  icon: ReactNode
  trend?: { value: number; label: string }
  color?: string
}

export function StatsCard({
  title,
  value,
  icon,
  trend,
  color = 'var(--dash-accent)'
}: StatsCardProps) {
  const isPositive = trend && trend.value >= 0

  return (
    <div className="dash-card dash-stat-card p-5 dash-animate-in">
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: `${color}1A`, color }}
        >
          {icon}
        </div>
        {trend && (
          <div
            className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
            style={{
              background: isPositive
                ? 'var(--dash-success-soft)'
                : 'var(--dash-danger-soft)',
              color: isPositive ? 'var(--dash-success)' : 'var(--dash-danger)'
            }}
          >
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <h3
        className="dash-value text-3xl font-bold leading-none mb-1.5"
        style={{ color: 'var(--dash-text)' }}
      >
        <CountUp end={value} duration={1.5} separator="." />
      </h3>
      <p
        className="dash-mono text-[11px] font-medium uppercase"
        style={{ color: 'var(--dash-text-muted)', letterSpacing: '0.08em' }}
      >
        {title}
      </p>
    </div>
  )
}
