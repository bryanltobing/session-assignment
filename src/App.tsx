import { useState } from 'react'
import { Autocomplete, AutocompleteOption } from './components/Autocomplete'
import { Badge } from './components/Badge'
import Cards, { CardItem } from './components/Cards'

import { Dropdown, DropdownOption } from './components/Dropdown'

const dropdownOptions = [
  {
    label: (
      <p className="flex items-center gap-1">
        <Badge color="bg-red-400" /> Design
      </p>
    ),
    value: 'design'
  },
  {
    label: (
      <p className="flex items-center gap-1">
        <Badge color="bg-yellow-400" /> Programming
      </p>
    ),
    value: 'programming'
  },
  {
    label: (
      <p className="flex items-center gap-1">
        <Badge color="bg-green-400" /> Marketing
      </p>
    ),
    value: 'marketing'
  },
  {
    label: (
      <p className="flex items-center gap-1">
        <Badge color="bg-teal-400" /> Finance
      </p>
    ),
    value: 'finance'
  },
  {
    label: (
      <p className="flex items-center gap-1">
        <Badge color="bg-blue-400" /> Support
      </p>
    ),
    value: 'support'
  },
  {
    label: (
      <p className="flex items-center gap-1">
        <Badge color="bg-purple-400" /> Sleep
      </p>
    ),
    value: 'sleep'
  }
]

const autocompleteOptions = [
  {
    label: 'Designer',
    value: 'designer'
  },
  {
    label: 'Developer',
    value: 'developer'
  },
  {
    label: 'Debussy',
    value: 'debussy'
  },
  {
    label: 'Declarative',
    value: 'declarative'
  },
  {
    label: 'Design',
    value: 'Decorondum'
  }
]

const cardItems: CardItem[] = [
  {
    title: 'Designing Interface',
    categoryName: 'Design',
    isDone: true,
    id: 1
  },
  {
    title: 'Coding Focus',
    categoryName: 'Working',
    isDone: false,
    id: 2
  },
  {
    title: 'Sleep',
    categoryName: 'Rest',
    isDone: false,
    id: 3
  }
]

const App = () => {
  const [category, setCategory] = useState<DropdownOption>()
  const [focus, setFocus] = useState<AutocompleteOption>()

  return (
    <div className="container mx-auto my-8">
      <div className="flex justify-center">
        <div className="w-full max-w-[280px]">
          <div>
            <Dropdown
              options={dropdownOptions}
              onChange={(option) => setCategory(option)}
              value={category}
              placeholder={
                <p className="flex items-center gap-1">
                  <Badge color="bg-green-400" /> Categories
                </p>
              }
            />
          </div>
          <div className="mt-1.5">
            <Autocomplete
              options={autocompleteOptions}
              onChange={(option) => setFocus(option)}
              placeholder="What's your focus?"
            />
          </div>

          <div className="mt-8">
            <Cards items={cardItems} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
