import React, { useState } from 'react'
import { useStackStore } from '../store/StackStore'
import StackSelector from './StackSelector'
import GuideViewer from './GuideViewer'
import { ChevronRight, Sparkles, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

const StackWizard: React.FC = () => {
  const { selectedStack, currentGuide, generateGuide, isLoading, error, reset } = useStackStore()
  const [currentView, setCurrentView] = useState<'selection' | 'guide'>('selection')

  const handleGenerateGuide = async () => {
    if (!selectedStack.frontend || !selectedStack.backend || !selectedStack.database || !selectedStack.deployment) {
      toast.error('Please select all required stacks')
      return
    }

    console.log('Generating guide for:', selectedStack)
    await generateGuide()
    console.log('Guide generated:', currentGuide)
    setCurrentView('guide')
  }

  const handleBackToSelection = () => {
    setCurrentView('selection')
    reset()
  }

  const isSelectionComplete = selectedStack.frontend && selectedStack.backend && selectedStack.database && selectedStack.deployment

  if (currentView === 'guide') {
    if (!currentGuide) {
      return (
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <button
              onClick={handleBackToSelection}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Selection
            </button>
          </div>
          <div className="card text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Generating Guide...</h2>
            <p className="text-gray-600">Please wait while we create your personalized setup guide.</p>
          </div>
        </div>
      )
    }
    
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={handleBackToSelection}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Selection
          </button>
        </div>
        <GuideViewer guide={currentGuide} />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Stack Selection */}
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Choose Your Tech Stack
            </h2>
            <p className="text-gray-600 mb-6">
              Select your preferred technologies for each layer of your application
            </p>
            
            <StackSelector />
          </div>

          {/* Generate Guide Button */}
          <div className="card">
            <button
              onClick={handleGenerateGuide}
              disabled={!isSelectionComplete || isLoading}
              className="w-full btn-primary flex items-center justify-center py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Generating Guide...
                </div>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Step-by-Step Guide
                  <ChevronRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
            
            {error && (
              <p className="text-red-600 text-sm mt-2">{error}</p>
            )}
          </div>
        </div>

        {/* Selected Stack Preview */}
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Your Selected Stack
          </h3>
          
          <div className="space-y-4">
            {Object.entries(selectedStack).map(([category, stack]) => (
              <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    {category}
                  </span>
                  <p className="font-medium text-gray-900">
                    {stack?.name || 'Not selected'}
                  </p>
                </div>
                {stack && (
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </div>
            ))}
          </div>

          {isSelectionComplete && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">
                Stack Complete! 🎉
              </h4>
              <p className="text-sm text-green-700">
                You've selected all required components. Click "Generate Guide" to get your personalized setup instructions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StackWizard 