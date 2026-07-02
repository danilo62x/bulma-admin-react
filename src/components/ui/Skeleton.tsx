interface SkeletonProps {
  width?: string
  circle?: boolean
  size?: 'is-large' | ''
}

export default function Skeleton({ width, circle, size = '' }: SkeletonProps) {
  return (
    <div
      className={`tx-skeleton ${circle ? 'is-circle' : ''} ${size}`}
      style={width ? { width } : undefined}
    />
  )
}
