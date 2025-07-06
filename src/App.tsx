import React from 'react'
import { Toaster } from 'react-hot-toast'
import StackWizard from './components/StackWizard'
import DebugPanel from './components/DebugPanel'
import { StackProvider } from './store/StackStore'

function App() {
  return (
    <StackProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              StackMentor.io
            </h1>
            <p className="text-gray-600 text-lg">
              Your guided tech stack assistant
            </p>
          </header>
          
          <StackWizard />
        </div>
        
        <DebugPanel />
        
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </div>
    </StackProvider>
  )
}

export default App 