import { useCallback, useEffect, useRef, useState } from 'react'

export type DropdownOption = {
  label: string | React.ReactNode
  value: string
}

type DropdownProps = {
  options: DropdownOption[]
  value?: DropdownOption
  onChange: (value: DropdownOption | undefined) => void
  placeholder?: string | React.ReactNode
}

export const Dropdown = ({
  options,
  onChange,
  value,
  placeholder
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)

  const handleSelectOption = useCallback(
    (option: DropdownOption) => {
      if (option !== value) onChange(option)
    },
    [onChange, value]
  )

  useEffect(() => {
    let containerRefValue: HTMLDivElement | null = null

    if (containerRef.current) {
      containerRefValue = containerRef.current
    }

    const handler = (evt: KeyboardEvent) => {
      if (evt.target != containerRef.current) return

      switch (evt.code) {
        case 'Enter':
        case 'Space':
          evt.preventDefault()
          setIsOpen((prev) => !prev)
          if (isOpen) handleSelectOption(options[highlightedIndex])
          break
        case 'ArrowUp':
        case 'ArrowDown': {
          evt.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
            break
          }
          const newValue =
            highlightedIndex + (evt.code === 'ArrowDown' ? 1 : -1)
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue)
          }
        }
      }
    }

    containerRefValue?.addEventListener('keydown', handler)

    return () => {
      containerRefValue?.removeEventListener('keydown', handler)
    }
  }, [handleSelectOption, highlightedIndex, isOpen, options])

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0)
  }, [isOpen])

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="relative gap-2 px-3 py-2 rounded bg-white min-h-[31px] outline-none focus:ring focus:ring-action-focus text-text-primary"
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="flex items-center cursor-pointer">
        <span className="flex-grow">
          {!value?.label ? placeholder : value.label}
        </span>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-inherit"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </div>

      {isOpen && (
        <ul className="absolute bg-white top-[calc(100%+6px)] left-0 w-full py-2 rounded z-50 shadow-2xl">
          {options.map((option, index) => (
            <li
              key={option.value}
              className={`px-3 py-2 hover:bg-action-hover cursor-pointer ${
                index === highlightedIndex ? 'bg-action-focus text-white' : ''
              }`}
              onClick={(e) => {
                e.stopPropagation()
                handleSelectOption(option)
                setIsOpen(false)
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
