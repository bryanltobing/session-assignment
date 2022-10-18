type BadgeProps = {
  color?:
    | 'bg-red-400'
    | 'bg-yellow-400'
    | 'bg-green-400'
    | 'bg-teal-400'
    | 'bg-blue-400'
    | 'bg-purple-400'
}

export const Badge = ({ color = 'bg-red-400' }: BadgeProps) => {
  return (
    <span className={`w-1.5 h-1.5 ${color} rounded-full inline-flex`}></span>
  )
}
