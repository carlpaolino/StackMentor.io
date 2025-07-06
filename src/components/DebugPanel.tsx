import React from 'react'
import { useStackStore } from '../store/StackStore'

const DebugPanel: React.FC = () => {
  const { selectedStack, currentGuide, isLoading, error } = useStackStore()

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-90 text-white p-4 rounded-lg text-xs max-w-sm">
      <h3 className="font-bold mb-2">Debug Info</h3>
      <div className="space-y-1">
        <div>Selected Stack: {Object.keys(selectedStack).filter(k => selectedStack[k as keyof typeof selectedStack]).length}/4</div>
        <div>Current Guide: {currentGuide ? 'Yes' : 'No'}</div>
        <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
        <div>Error: {error || 'None'}</div>
        {currentGuide && (
          <div>Guide Steps: {currentGuide.steps.length}</div>
        )}
      </div>
    </div>
  )
}

export default DebugPanel 