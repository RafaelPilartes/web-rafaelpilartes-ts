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

export function StatsCard({ title, value, icon, trend, color = 'var(--dash-accent)' }: StatsCardProps) {
  const isPositive = trend && trend.value >= 0

  return (
    <div className="dash-card p-5 dash-animate-in">
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}18`, color }}
        >
          {icon}
        </div>
        {trend && (
          <div
            className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
            style={{
              background: isPositive ? 'var(--dash-success-soft)' : 'var(--dash-danger-soft)',
              color: isPositive ? 'var(--dash-success)' : 'var(--dash-danger)'
            }}
          >
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <div>
        <h3
          className="text-2xl font-bold mb-1"
          style={{ color: 'var(--dash-text)' }}
        >
          <CountUp end={value} duration={1.5} separator="." />
        </h3>
        <p className="text-xs" style={{ color: 'var(--dash-text-muted)' }}>
          {title}
        </p>
      </div>
    </div>
  )
}
