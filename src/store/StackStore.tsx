import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface TechStack {
  id: string
  name: string
  description: string
  category: 'frontend' | 'backend' | 'database' | 'deployment'
  pros: string[]
  cons: string[]
  icon?: string
}

export interface SelectedStack {
  frontend?: TechStack
  backend?: TechStack
  database?: TechStack
  deployment?: TechStack
}

export interface GuideStep {
  id: string
  title: string
  description: string
  commands?: string[]
  code?: string
  completed: boolean
}

export interface Guide {
  id: string
  title: string
  description: string
  steps: GuideStep[]
  createdAt: Date
}

interface StackState {
  // Available tech stacks
  availableStacks: TechStack[]
  
  // Selected stack
  selectedStack: SelectedStack
  
  // Generated guide
  currentGuide: Guide | null
  
  // UI state
  currentStep: number
  isLoading: boolean
  error: string | null
  
  // Actions
  setSelectedStack: (category: keyof SelectedStack, stack: TechStack) => void
  generateGuide: () => Promise<void>
  updateStepCompletion: (stepId: string, completed: boolean) => void
  setCurrentStep: (step: number) => void
  reset: () => void
}

// Sample tech stacks data
const sampleStacks: TechStack[] = [
  // Frontend
  {
    id: 'react',
    name: 'React',
    description: 'A JavaScript library for building user interfaces',
    category: 'frontend',
    pros: ['Large ecosystem', 'Great documentation', 'Flexible'],
    cons: ['Steep learning curve', 'Complex state management'],
  },
  {
    id: 'vue',
    name: 'Vue.js',
    description: 'The Progressive JavaScript Framework',
    category: 'frontend',
    pros: ['Easy to learn', 'Great documentation', 'Progressive'],
    cons: ['Smaller ecosystem', 'Less enterprise adoption'],
  },
  {
    id: 'angular',
    name: 'Angular',
    description: 'Platform for building mobile and desktop web applications',
    category: 'frontend',
    pros: ['Enterprise-ready', 'TypeScript first', 'Comprehensive'],
    cons: ['Steep learning curve', 'Heavy framework'],
  },
  
  // Backend
  {
    id: 'node-express',
    name: 'Node.js + Express',
    description: 'Fast, unopinionated, minimalist web framework for Node.js',
    category: 'backend',
    pros: ['JavaScript everywhere', 'Large ecosystem', 'Fast development'],
    cons: ['Callback hell', 'Less structured'],
  },
  {
    id: 'django',
    name: 'Django',
    description: 'High-level Python Web framework that encourages rapid development',
    category: 'backend',
    pros: ['Batteries included', 'Admin interface', 'Security focused'],
    cons: ['Monolithic', 'Less flexible'],
  },
  {
    id: 'spring-boot',
    name: 'Spring Boot',
    description: 'Java-based framework for building microservices',
    category: 'backend',
    pros: ['Enterprise ready', 'Strong typing', 'Mature ecosystem'],
    cons: ['Verbose', 'Steep learning curve'],
  },
  
  // Database
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    description: 'Advanced open source relational database',
    category: 'database',
    pros: ['ACID compliant', 'Rich features', 'Extensible'],
    cons: ['Complex setup', 'Resource intensive'],
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    description: 'Document-oriented NoSQL database',
    category: 'database',
    pros: ['Flexible schema', 'Easy scaling', 'JSON-like documents'],
    cons: ['No ACID compliance', 'Less mature'],
  },
  {
    id: 'mysql',
    name: 'MySQL',
    description: 'Open source relational database management system',
    category: 'database',
    pros: ['Widely used', 'Good performance', 'Easy setup'],
    cons: ['Limited features', 'Less extensible'],
  },
  
  // Deployment
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Cloud platform for static sites and Serverless Functions',
    category: 'deployment',
    pros: ['Easy deployment', 'Great for frontend', 'Free tier'],
    cons: ['Limited backend', 'Vendor lock-in'],
  },
  {
    id: 'aws',
    name: 'AWS',
    description: 'Comprehensive cloud computing platform',
    category: 'deployment',
    pros: ['Comprehensive', 'Scalable', 'Enterprise ready'],
    cons: ['Complex', 'Expensive', 'Steep learning curve'],
  },
  {
    id: 'digitalocean',
    name: 'DigitalOcean',
    description: 'Cloud infrastructure provider for developers',
    category: 'deployment',
    pros: ['Simple pricing', 'Developer friendly', 'Good documentation'],
    cons: ['Limited services', 'Less enterprise features'],
  },
]

export const useStackStore = create<StackState>()(
  devtools(
    (set, get) => ({
      // Initial state
      availableStacks: sampleStacks,
      selectedStack: {},
      currentGuide: null,
      currentStep: 0,
      isLoading: false,
      error: null,
      
      // Actions
      setSelectedStack: (category, stack) => {
        set((state) => ({
          selectedStack: {
            ...state.selectedStack,
            [category]: stack,
          },
        }))
      },
      
      generateGuide: async () => {
        const { selectedStack } = get()
        
        if (!selectedStack.frontend || !selectedStack.backend || !selectedStack.database || !selectedStack.deployment) {
          set({ error: 'Please select all required stacks' })
          return
        }
        
        set({ isLoading: true, error: null })
        
        try {
          // Simulate AI guide generation
          await new Promise(resolve => setTimeout(resolve, 2000))
          
          const guide: Guide = {
            id: Date.now().toString(),
            title: `${selectedStack.frontend.name} + ${selectedStack.backend.name} + ${selectedStack.database.name} + ${selectedStack.deployment.name}`,
            description: `Complete setup guide for your selected tech stack`,
            steps: [
              {
                id: '1',
                title: 'Environment Setup',
                description: 'Install required tools and dependencies',
                commands: [
                  'node --version',
                  'npm --version',
                  'git --version',
                ],
                completed: false,
              },
              {
                id: '2',
                title: 'Project Initialization',
                description: 'Create and configure your project structure',
                commands: [
                  'mkdir my-project',
                  'cd my-project',
                  'npm init -y',
                ],
                completed: false,
              },
              {
                id: '3',
                title: 'Install Dependencies',
                description: 'Add necessary packages to your project',
                commands: [
                  'npm install express cors dotenv',
                  'npm install --save-dev nodemon',
                ],
                completed: false,
              },
              {
                id: '4',
                title: 'Database Setup',
                description: 'Configure your database connection',
                code: `
// database.js
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

module.exports = pool;
                `,
                completed: false,
              },
              {
                id: '5',
                title: 'API Development',
                description: 'Create your first API endpoints',
                code: `
// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});
                `,
                completed: false,
              },
              {
                id: '6',
                title: 'Frontend Setup',
                description: 'Create your React application',
                commands: [
                  'npx create-react-app client',
                  'cd client',
                  'npm start',
                ],
                completed: false,
              },
              {
                id: '7',
                title: 'Deployment',
                description: 'Deploy your application',
                commands: [
                  'git add .',
                  'git commit -m "Initial commit"',
                  'git push origin main',
                ],
                completed: false,
              },
            ],
            createdAt: new Date(),
          }
          
          set({ currentGuide: guide, currentStep: 0 })
        } catch (error) {
          set({ error: 'Failed to generate guide' })
        } finally {
          set({ isLoading: false })
        }
      },
      
      updateStepCompletion: (stepId, completed) => {
        set((state) => ({
          currentGuide: state.currentGuide
            ? {
                ...state.currentGuide,
                steps: state.currentGuide.steps.map((step) =>
                  step.id === stepId ? { ...step, completed } : step
                ),
              }
            : null,
        }))
      },
      
      setCurrentStep: (step) => {
        set({ currentStep: step })
      },
      
      reset: () => {
        set({
          selectedStack: {},
          currentGuide: null,
          currentStep: 0,
          error: null,
        })
      },
    }),
    {
      name: 'stack-store',
    }
  )
)

export const StackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>
} 