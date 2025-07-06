import React from 'react'
import { Guide, GuideStep } from '../store/StackStore'
import { Check, Copy, Play, ChevronDown, ChevronUp } from 'lucide-react'
import toast from 'react-hot-toast'

interface GuideViewerProps {
  guide: Guide
}

const GuideViewer: React.FC<GuideViewerProps> = ({ guide }) => {
  const [expandedSteps, setExpandedSteps] = React.useState<Set<string>>(new Set(['1']))
  const { updateStepCompletion } = useStackStore()

  const toggleStep = (stepId: string) => {
    const newExpanded = new Set(expandedSteps)
    if (newExpanded.has(stepId)) {
      newExpanded.delete(stepId)
    } else {
      newExpanded.add(stepId)
    }
    setExpandedSteps(newExpanded)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const handleStepToggle = (stepId: string, completed: boolean) => {
    updateStepCompletion(stepId, completed)
  }

  const completedSteps = guide.steps.filter(step => step.completed).length
  const totalSteps = guide.steps.length

  return (
    <div className="space-y-6">
      {/* Guide Header */}
      <div className="card">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{guide.title}</h1>
            <p className="text-gray-600">{guide.description}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600">
              {completedSteps}/{totalSteps}
            </div>
            <div className="text-sm text-gray-500">Steps Complete</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {guide.steps.map((step, index) => (
          <StepCard
            key={step.id}
            step={step}
            stepNumber={index + 1}
            isExpanded={expandedSteps.has(step.id)}
            onToggle={() => toggleStep(step.id)}
            onCompletionToggle={(completed) => handleStepToggle(step.id, completed)}
            onCopyToClipboard={copyToClipboard}
          />
        ))}
      </div>
    </div>
  )
}

interface StepCardProps {
  step: GuideStep
  stepNumber: number
  isExpanded: boolean
  onToggle: () => void
  onCompletionToggle: (completed: boolean) => void
  onCopyToClipboard: (text: string) => void
}

const StepCard: React.FC<StepCardProps> = ({
  step,
  stepNumber,
  isExpanded,
  onToggle,
  onCompletionToggle,
  onCopyToClipboard,
}) => {
  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <button
            onClick={() => onCompletionToggle(!step.completed)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
              step.completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            {step.completed && <Check className="w-4 h-4" />}
          </button>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Step {stepNumber}: {step.title}
                </h3>
                <p className="text-gray-600 mt-1">{step.description}</p>
              </div>
              
              <button
                onClick={onToggle}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>
            
            {isExpanded && (
              <div className="mt-4 space-y-4">
                {/* Commands */}
                {step.commands && step.commands.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <Play className="w-4 h-4 mr-2 text-green-600" />
                      Commands to Run
                    </h4>
                    <div className="space-y-2">
                      {step.commands.map((command, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm font-mono">
                            {command}
                          </code>
                          <button
                            onClick={() => onCopyToClipboard(command)}
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Code */}
                {step.code && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <Play className="w-4 h-4 mr-2 text-blue-600" />
                      Code Example
                    </h4>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{step.code}</code>
                      </pre>
                      <button
                        onClick={() => onCopyToClipboard(step.code!)}
                        className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-200 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GuideViewer 