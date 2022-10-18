import { useRef, useState } from 'react'
import { Badge } from './Badge'

export type CardItem = {
  title: string
  categoryName: string
  isDone: boolean
  id: number | string
}

type CardsProps = {
  items: CardItem[]
}

const Cards = ({ items }: CardsProps) => {
  const [highlightedIndex] = useState()
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      tabIndex={0}
      ref={containerRef}
      className="outline-none text-text-primary"
    >
      <ul className="flex flex-col gap-1">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`px-2 py-2.5 hover:bg-action-hover bg-white rounded flex items-center gap-2.5 ${
              index === highlightedIndex ? 'bg-action-focus text-white' : ''
            }`}
          >
            <input
              type="checkbox"
              defaultChecked={item.isDone}
              className="rounded outline-none border-none accent-action-focus"
            />
            <div>
              <p>{item.title}</p>
              <p className="text-[0.625rem] sm:text-xs text-text-secondary flex items-center gap-1">
                <Badge /> {item.categoryName}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Cards
