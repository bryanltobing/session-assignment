import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { escapeRegex } from '../helpers'

export type AutocompleteOption = {
  label: string
  value: string
}

type AutocompleteProps = {
  options: AutocompleteOption[]
  value?: AutocompleteOption
  onChange: (value: AutocompleteOption | undefined) => void
  placeholder?: string
}

export const Autocomplete = ({
  options,
  onChange,
  placeholder
}: AutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  const filteredOptions = useMemo(() => {
    if (inputValue) {
      const pattern = new RegExp(escapeRegex(inputValue), 'gi')
      return options.filter((option) => pattern.test(escapeRegex(option.label)))
    }
    return options
  }, [options, inputValue])

  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleSelectOption = useCallback(
    (option?: AutocompleteOption) => {
      if (option && option?.label !== inputValue) {
        onChange(option)
        setInputValue(option.label)
        inputRef.current?.focus()
      }
    },
    [onChange, inputValue]
  )

  useEffect(() => {
    let containerRefValue: HTMLDivElement | null = null

    if (inputRef.current) {
      containerRefValue = inputRef.current
    }

    const handler = (evt: KeyboardEvent) => {
      if (evt.target != inputRef.current) return

      switch (evt.code) {
        case 'Tab':
          if (isOpen) {
            setIsOpen(false)
          }
          break
        case 'Enter':
          evt.preventDefault()
          setIsOpen((prev) => !prev)

          if (isOpen) handleSelectOption(filteredOptions[highlightedIndex])
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
          if (newValue >= 0 && newValue < filteredOptions.length) {
            setHighlightedIndex(newValue)
          }
        }
      }
    }

    containerRefValue?.addEventListener('keydown', handler)

    return () => {
      containerRefValue?.removeEventListener('keydown', handler)
    }
  }, [handleSelectOption, highlightedIndex, isOpen, filteredOptions])

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0)
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (evt: any) => {
      if (containerRef.current && !containerRef.current.contains(evt.target)) {
        setIsOpen(false)
      }
    }

    window.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      className="relative flex items-center gap-2 rounded bg-white min-h-[31px] outline-none focus-within:ring focus-within:ring-action-focus text-text-primary"
      ref={containerRef}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className="px-3 py-2 w-full h-full outline-none rounded"
        onChange={(evt) => {
          if (!isOpen) {
            setIsOpen(true)
          }
          if (highlightedIndex !== 0) {
            setHighlightedIndex(0)
          }
          setInputValue(evt.target.value)
        }}
        value={inputValue}
        onFocus={() => setIsOpen((prev) => !prev)}
      />

      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute bg-white top-[calc(100%+6px)] left-0 w-full py-2 rounded z-40 shadow-2xl">
          {filteredOptions.map((option, index) => (
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
