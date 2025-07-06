import { create } from 'zustand'

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

// Function to generate detailed, specific steps based on selected stack
const generateDetailedSteps = (selectedStack: SelectedStack): GuideStep[] => {
  const steps: GuideStep[] = []
  let stepId = 1

  // Step 1: Environment Setup
  steps.push({
    id: stepId.toString(),
    title: 'Environment Setup & Prerequisites',
    description: 'Install and verify all required tools and development environment',
    commands: [
      'node --version',
      'npm --version',
      'git --version',
      'code --version',
    ],
    completed: false,
  })
  stepId++

  // Step 2: Project Structure Setup
  steps.push({
    id: stepId.toString(),
    title: 'Create Project Structure',
    description: 'Set up the exact folder structure for your application',
    commands: [
      'mkdir my-fullstack-app',
      'cd my-fullstack-app',
      'mkdir backend frontend docs',
      'cd backend && npm init -y',
      'cd ../frontend && npm init -y',
    ],
    code: `
# Project Structure
my-fullstack-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   └── utils/
│   ├── tests/
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   └── assets/
│   ├── public/
│   ├── package.json
│   └── .env
└── docs/
    ├── api.md
    └── deployment.md
    `,
    completed: false,
  })
  stepId++

  // Step 3: Backend Setup
  if (selectedStack.backend?.id === 'node-express') {
    steps.push({
      id: stepId.toString(),
      title: 'Backend: Node.js + Express Setup',
      description: 'Set up the Express.js backend with proper structure and dependencies',
      commands: [
        'cd backend',
        'npm install express cors helmet morgan dotenv',
        'npm install --save-dev nodemon @types/node @types/express',
        'npm install bcryptjs jsonwebtoken',
        'npm install --save-dev jest supertest',
      ],
      code: `
// backend/package.json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "morgan": "^1.10.0",
    "dotenv": "^16.0.3",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.22",
    "@types/node": "^20.0.0",
    "@types/express": "^4.17.17",
    "jest": "^29.5.0",
    "supertest": "^6.3.3"
  }
}
    `,
    completed: false,
    })
    stepId++
  }

  // Step 4: Database Setup
  if (selectedStack.database?.id === 'postgresql') {
    steps.push({
      id: stepId.toString(),
      title: 'Database: PostgreSQL Setup & Configuration',
      description: 'Set up PostgreSQL database with proper configuration and connection',
      commands: [
        'brew install postgresql@14',
        'brew services start postgresql@14',
        'createdb my_fullstack_app',
        'psql -d my_fullstack_app -c "CREATE USER app_user WITH PASSWORD \'your_password\';"',
        'psql -d my_fullstack_app -c "GRANT ALL PRIVILEGES ON DATABASE my_fullstack_app TO app_user;"',
      ],
      code: `
// backend/src/config/database.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'app_user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'my_fullstack_app',
  password: process.env.DB_PASSWORD || 'your_password',
  port: process.env.DB_PORT || 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test the connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database connected successfully');
  }
});

module.exports = pool;
    `,
    completed: false,
    })
    stepId++
  } else if (selectedStack.database?.id === 'mongodb') {
    steps.push({
      id: stepId.toString(),
      title: 'Database: MongoDB Setup & Configuration',
      description: 'Set up MongoDB database with proper configuration and connection',
      commands: [
        'brew install mongodb-community@6.0',
        'brew services start mongodb-community@6.0',
        'mkdir -p ~/data/db',
        'mongod --dbpath ~/data/db',
      ],
      code: `
// backend/src/config/database.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/my_fullstack_app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(\`MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;

// backend/src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
    `,
      completed: false,
    })
    stepId++
  }

  // Step 5: API Keys & External Services Setup
  steps.push({
    id: stepId.toString(),
    title: 'API Keys & External Services Setup',
    description: 'Get API keys and configure external services for your application',
    commands: [
      'cd backend',
      'touch .env',
      'cd ../frontend',
      'touch .env',
    ],
    code: `
# Step-by-Step API Key Setup:

# 1. Stripe (Payment Processing)
# Go to: https://dashboard.stripe.com/apikeys
# Create account and get your API keys
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# 2. SendGrid (Email Service)
# Go to: https://app.sendgrid.com/settings/api_keys
# Create account and generate API key
SENDGRID_API_KEY=your_sendgrid_api_key

# 3. AWS (Cloud Services)
# Go to: https://console.aws.amazon.com/iam/
# Create IAM user and get access keys
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1

# 4. Google Maps (Maps Integration)
# Go to: https://console.cloud.google.com/apis/credentials
# Create project and get API key
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# 5. MongoDB Atlas (Cloud Database)
# Go to: https://cloud.mongodb.com/
# Create cluster and get connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/my_fullstack_app

# 6. PostgreSQL (Cloud Database)
# Go to: https://www.elephantsql.com/ or https://supabase.com/
# Create database and get connection details
DATABASE_URL=postgresql://username:password@host:port/database

# Environment Variables Files:

# backend/.env
NODE_ENV=development
PORT=5000
DB_USER=app_user
DB_HOST=localhost
DB_NAME=my_fullstack_app
DB_PASSWORD=your_password
DB_PORT=5432
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# API Keys (add your actual keys)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
SENDGRID_API_KEY=your_sendgrid_api_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1

# frontend/.env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
    `,
    completed: false,
  })
  stepId++

  // Step 6: Database Schema
  if (selectedStack.database?.id === 'postgresql') {
    steps.push({
      id: stepId.toString(),
      title: 'Database Schema & Migrations',
      description: 'Create database tables and relationships',
      commands: [
        'cd backend',
        'mkdir src/migrations',
        'touch src/migrations/001_create_users.sql',
        'touch src/migrations/002_create_posts.sql',
      ],
      code: `
-- backend/src/migrations/001_create_users.sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- backend/src/migrations/002_create_posts.sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Run migrations
psql -d my_fullstack_app -f src/migrations/001_create_users.sql
psql -d my_fullstack_app -f src/migrations/002_create_posts.sql
    `,
    completed: false,
    })
    stepId++
  }

  // Step 7: Backend API Development
  steps.push({
    id: stepId.toString(),
    title: 'Backend API Development',
    description: 'Create RESTful API endpoints with proper structure',
    commands: [
      'cd backend',
      'mkdir src/routes src/controllers src/middleware',
      'touch src/routes/auth.js src/routes/posts.js',
      'touch src/controllers/authController.js src/controllers/postController.js',
      'touch src/middleware/auth.js src/middleware/validation.js',
    ],
    code: `
// backend/src/server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date(),
    environment: process.env.NODE_ENV 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});

// backend/src/routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', auth, authController.getProfile);

module.exports = router;
    `,
    completed: false,
  })
  stepId++

  // Step 8: Frontend Setup
  if (selectedStack.frontend?.id === 'react') {
    steps.push({
      id: stepId.toString(),
      title: 'Frontend: React Application Setup',
      description: 'Set up React frontend with modern tooling and structure',
      commands: [
        'cd frontend',
        'npx create-react-app . --template typescript',
        'npm install axios react-router-dom @tanstack/react-query',
        'npm install @mui/material @emotion/react @emotion/styled',
        'npm install react-hook-form @hookform/resolvers yup',
        'npm install --save-dev @types/node',
      ],
      code: `
// frontend/package.json
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.3.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.11.56",
    "@types/react": "^18.0.17",
    "@types/react-dom": "^18.0.6",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.7.4",
    "web-vitals": "^2.1.4",
    "axios": "^1.4.0",
    "react-router-dom": "^6.11.1",
    "@tanstack/react-query": "^4.29.5",
    "@mui/material": "^5.13.0",
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "react-hook-form": "^7.43.9",
    "@hookform/resolvers": "^3.1.0",
    "yup": "^1.2.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
    `,
    completed: false,
    })
    stepId++
  }

  // Step 9: Frontend Components
  if (selectedStack.frontend?.id === 'react') {
    steps.push({
      id: stepId.toString(),
      title: 'Frontend: Component Structure & API Integration',
      description: 'Create React components and integrate with backend API',
      commands: [
        'cd frontend/src',
        'mkdir components pages hooks services utils',
        'touch components/Header.tsx components/Footer.tsx',
        'touch pages/Home.tsx pages/Login.tsx pages/Register.tsx',
        'touch services/api.ts hooks/useAuth.ts',
      ],
      code: `
// frontend/src/services/api.ts
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// frontend/src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import api from '../services/api';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/auth/me')
        .then(response => setUser(response.data))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return { user, loading, login, logout };
};
    `,
    completed: false,
    })
    stepId++
  }

  // Step 10: Testing Setup
  steps.push({
    id: stepId.toString(),
    title: 'Testing Setup & Configuration',
    description: 'Set up comprehensive testing for both backend and frontend',
    commands: [
      'cd backend',
      'npm install --save-dev jest supertest @types/jest',
      'touch jest.config.js',
      'mkdir __tests__',
      'touch __tests__/auth.test.js __tests__/posts.test.js',
      'cd ../frontend',
      'npm install --save-dev @testing-library/react @testing-library/jest-dom',
    ],
    code: `
// backend/jest.config.js
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

// backend/__tests__/auth.test.js
const request = require('supertest');
const app = require('../src/server');

describe('Auth Endpoints', () => {
  test('POST /api/auth/register - should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('email', 'test@example.com');
  });
});
    `,
    completed: false,
  })
  stepId++

  // Step 11: Deployment Setup
  if (selectedStack.deployment?.id === 'vercel') {
    steps.push({
      id: stepId.toString(),
      title: 'Deployment: Vercel Configuration',
      description: 'Deploy your application to Vercel with proper configuration',
      commands: [
        'npm install -g vercel',
        'cd frontend',
        'vercel login',
        'vercel --prod',
        'cd ../backend',
        'vercel --prod',
      ],
      code: `
# vercel.json (in frontend directory)
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/\$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}

# vercel.json (in backend directory)
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "src/server.js"
    }
  ]
}
    `,
    completed: false,
    })
    stepId++
  } else if (selectedStack.deployment?.id === 'aws') {
    steps.push({
      id: stepId.toString(),
      title: 'Deployment: AWS Configuration',
      description: 'Deploy your application to AWS with proper configuration',
      commands: [
        'npm install -g aws-cli',
        'aws configure',
        'aws s3 mb s3://your-app-bucket-name',
        'aws s3 sync frontend/build s3://your-app-bucket-name',
        'aws ec2 run-instances --image-id ami-12345678 --count 1 --instance-type t2.micro',
      ],
      code: `
# AWS Configuration Steps:

# 1. Install AWS CLI
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /

# 2. Configure AWS CLI
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Enter your default region (e.g., us-east-1)
# Enter your output format (json)

# 3. Create S3 bucket for frontend
aws s3 mb s3://your-app-bucket-name
aws s3 website s3://your-app-bucket-name --index-document index.html --error-document error.html

# 4. Deploy frontend to S3
cd frontend
npm run build
aws s3 sync build/ s3://your-app-bucket-name

# 5. Create Elastic Beanstalk application
aws elasticbeanstalk create-application --application-name my-fullstack-app

# 6. Create environment
aws elasticbeanstalk create-environment \\
  --application-name my-fullstack-app \\
  --environment-name my-fullstack-app-prod \\
  --solution-stack-name "64bit Amazon Linux 2 v5.8.0 running Node.js 18"

# 7. Deploy backend
cd ../backend
zip -r ../backend.zip .
aws elasticbeanstalk create-application-version \\
  --application-name my-fullstack-app \\
  --version-label v1 \\
  --source-bundle S3Bucket="your-app-bucket-name",S3Key="backend.zip"

# Environment Variables for AWS
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-app-bucket-name
AWS_EB_APPLICATION=my-fullstack-app
    `,
      completed: false,
    })
    stepId++
  }

  // Step 12: Production Environment
  steps.push({
    id: stepId.toString(),
    title: 'Production Environment & Security',
    description: 'Configure production environment with security best practices',
    commands: [
      'cd backend',
      'npm install helmet express-rate-limit',
      'touch src/config/production.js',
      'cd ../frontend',
      'npm run build',
    ],
    code: `
// backend/src/config/production.js
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const productionConfig = {
  // Security headers
  helmet: helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  }),
  
  // Rate limiting
  rateLimit: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP',
  }),
  
  // CORS configuration
  cors: {
    origin: process.env.FRONTEND_URL || 'https://your-app.vercel.app',
    credentials: true,
  },
};

module.exports = productionConfig;

# Environment Variables for Production
NODE_ENV=production
PORT=5000
DB_USER=your_production_db_user
DB_HOST=your_production_db_host
DB_NAME=your_production_db_name
DB_PASSWORD=your_production_db_password
JWT_SECRET=your_super_secure_production_jwt_secret
FRONTEND_URL=https://your-app.vercel.app
    `,
    completed: false,
  })

  return steps
}

export const useStackStore = create<StackState>((set, get) => ({
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
        
        console.log('Store: Starting guide generation for:', selectedStack)
        set({ isLoading: true, error: null })
        
        try {
          // Simulate AI guide generation
          await new Promise(resolve => setTimeout(resolve, 2000))
          
          const guide: Guide = {
            id: Date.now().toString(),
            title: `${selectedStack.frontend.name} + ${selectedStack.backend.name} + ${selectedStack.database.name} + ${selectedStack.deployment.name}`,
            description: `Complete setup guide for your selected tech stack`,
            steps: generateDetailedSteps(selectedStack),
            createdAt: new Date(),
          }
      
      console.log('Store: Guide generated successfully:', guide)
      set({ currentGuide: guide, currentStep: 0 })
    } catch (error) {
      console.error('Store: Error generating guide:', error)
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
}))

export const StackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>
} 