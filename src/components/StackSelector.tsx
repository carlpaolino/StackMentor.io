import React from 'react'
import { useStackStore, TechStack } from '../store/StackStore'
import { Check, Info } from 'lucide-react'

const StackSelector: React.FC = () => {
  const { availableStacks, selectedStack, setSelectedStack } = useStackStore()

  const categories = [
    { key: 'frontend', label: 'Frontend Framework', description: 'Choose your UI framework' },
    { key: 'backend', label: 'Backend Framework', description: 'Select your server-side technology' },
    { key: 'database', label: 'Database', description: 'Pick your data storage solution' },
    { key: 'deployment', label: 'Deployment', description: 'Choose your hosting platform' },
  ] as const

  const getStacksByCategory = (category: string) => {
    return availableStacks.filter(stack => stack.category === category)
  }

  const isSelected = (stack: TechStack) => {
    return selectedStack[stack.category as keyof typeof selectedStack]?.id === stack.id
  }

  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <div key={category.key} className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{category.label}</h3>
            <p className="text-sm text-gray-600">{category.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {getStacksByCategory(category.key).map((stack) => (
              <StackCard
                key={stack.id}
                stack={stack}
                isSelected={isSelected(stack)}
                onSelect={() => setSelectedStack(category.key, stack)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

interface StackCardProps {
  stack: TechStack
  isSelected: boolean
  onSelect: () => void
}

const StackCard: React.FC<StackCardProps> = ({ stack, isSelected, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
        isSelected
          ? 'border-primary-500 bg-primary-50'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-gray-900">{stack.name}</h4>
        {isSelected && (
          <Check className="w-5 h-5 text-primary-600" />
        )}
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{stack.description}</p>
      
      <div className="space-y-2">
        <div>
          <div className="flex items-center text-xs font-medium text-green-600 mb-1">
            <Info className="w-3 h-3 mr-1" />
            Pros
          </div>
          <ul className="text-xs text-gray-600 space-y-1">
            {stack.pros.slice(0, 2).map((pro, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-1">•</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <div className="flex items-center text-xs font-medium text-red-600 mb-1">
            <Info className="w-3 h-3 mr-1" />
            Cons
          </div>
          <ul className="text-xs text-gray-600 space-y-1">
            {stack.cons.slice(0, 2).map((con, index) => (
              <li key={index} className="flex items-start">
                <span className="text-red-500 mr-1">•</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </button>
  )
}

export default StackSelector 