import { useEffect, useRef, useState } from 'react'
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
  const [highlightedIndex, setHighlightedIndex] = useState<number>()

  const containerRef = useRef<HTMLDivElement>(null)

  const [isFocused, setIsFocused] = useState(
    document.activeElement === containerRef.current
  )

  useEffect(() => {
    if (isFocused) {
      setHighlightedIndex(0)
    } else {
      setHighlightedIndex(undefined)
    }
  }, [isFocused])

  useEffect(() => {
    let containerRefValue: HTMLDivElement | null = null

    if (containerRef.current) {
      containerRefValue = containerRef.current
    }

    const handler = (evt: KeyboardEvent) => {
      if (evt.target != containerRef.current) return

      switch (evt.code) {
        case 'ArrowUp':
        case 'ArrowDown': {
          evt.preventDefault()
          if (highlightedIndex !== undefined) {
            console.log('called')
            const newValue =
              highlightedIndex + (evt.code === 'ArrowDown' ? 1 : -1)
            if (newValue >= 0 && newValue < items.length) {
              setHighlightedIndex(newValue)
            }
          }
        }
      }
    }

    containerRefValue?.addEventListener('keydown', handler)

    return () => {
      containerRefValue?.removeEventListener('keydown', handler)
    }
  }, [highlightedIndex, items.length])

  return (
    <div
      tabIndex={0}
      ref={containerRef}
      className="text-text-primary outline-none"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
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
              <p
                className={`text-[0.625rem] sm:text-xs ${
                  index === highlightedIndex
                    ? 'text-inherit'
                    : 'text-text-secondary'
                } flex items-center gap-1`}
              >
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
