type BadgeProps = {
  size?: 'small' | 'medium' | 'large'
}

export const Badge = (props: BadgeProps) => {
  return (
    <span className="w-1.5 h-1.5 bg-red-400 rounded-full inline-flex"></span>
  )
}
