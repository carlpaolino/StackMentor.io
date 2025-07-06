# StackMentor.io Development Plan

## 🎯 Project Overview

StackMentor.io is a guided tech stack helper desktop application that assists developers in choosing, configuring, and deploying full-stack projects with step-by-step guidance.

## 📋 Implementation Phases

### Phase 1: Core Setup ✅ (COMPLETED)

**Objective**: Establish the foundational project structure and development environment.

**Completed Tasks**:
- [x] Project initialization with Electron + React + TypeScript
- [x] Vite build configuration
- [x] Tailwind CSS setup with custom design system
- [x] Basic project structure and file organization
- [x] Development environment configuration
- [x] Git repository setup with proper .gitignore

**Files Created**:
- `package.json` - Dependencies and scripts
- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `.gitignore` - Git ignore rules
- `README.md` - Project documentation

### Phase 2: Core Features 🚧 (IN PROGRESS)

**Objective**: Implement the main application functionality.

**Current Tasks**:
- [x] Zustand state management setup
- [x] Tech stack data structure and sample data
- [x] Stack selection wizard UI
- [x] Guide generation simulation
- [x] Progress tracking system
- [x] Copy-to-clipboard functionality

**Next Tasks**:
- [ ] OpenAI API integration for real guide generation
- [ ] Project scaffolding functionality
- [ ] Database integration (SQLite)
- [ ] Global hotkey implementation
- [ ] System tray integration

**Files Created**:
- `src/store/StackStore.tsx` - State management
- `src/components/StackWizard.tsx` - Main wizard interface
- `src/components/StackSelector.tsx` - Stack selection component
- `src/components/GuideViewer.tsx` - Guide display component
- `src/App.tsx` - Main application component
- `src/main.tsx` - React entry point
- `src/index.css` - Global styles

### Phase 3: Electron Integration 🚧 (IN PROGRESS)

**Objective**: Implement desktop application functionality.

**Current Tasks**:
- [x] Electron main process setup
- [x] Preload script configuration
- [x] Basic window management

**Next Tasks**:
- [ ] Global hotkey registration (⌘ + ⇧ + P)
- [ ] System tray integration
- [ ] Window state management
- [ ] Auto-updater implementation

**Files Created**:
- `electron/main.ts` - Main process
- `electron/preload/index.ts` - Preload script

### Phase 4: AI Integration 📋 (PLANNED)

**Objective**: Integrate OpenAI API for intelligent guide generation.

**Tasks**:
- [ ] OpenAI API client setup
- [ ] Prompt engineering for stack-specific guides
- [ ] Response parsing and formatting
- [ ] Error handling and retry logic
- [ ] Rate limiting and cost management

**Implementation Steps**:
1. Create OpenAI service module
2. Design prompt templates for different stack combinations
3. Implement response parsing and guide generation
4. Add error handling and user feedback
5. Test with various stack combinations

### Phase 5: Project Scaffolding 📋 (PLANNED)

**Objective**: Automatically generate project files and structure.

**Tasks**:
- [ ] Template engine for different frameworks
- [ ] File system operations
- [ ] Project structure generation
- [ ] Configuration file creation
- [ ] Git repository initialization

**Implementation Steps**:
1. Create template system for different tech stacks
2. Implement file generation logic
3. Add project structure templates
4. Integrate with Git for repository setup
5. Test with various stack combinations

### Phase 6: Polish & Testing 📋 (PLANNED)

**Objective**: Refine user experience and ensure stability.

**Tasks**:
- [ ] UI/UX improvements
- [ ] Performance optimization
- [ ] Cross-platform testing
- [ ] Error handling improvements
- [ ] Accessibility features

### Phase 7: Distribution 📋 (PLANNED)

**Objective**: Package and distribute the application.

**Tasks**:
- [ ] Electron Builder configuration
- [ ] Code signing setup
- [ ] Auto-updater implementation
- [ ] Installer creation for all platforms
- [ ] Release management

## 🛠️ Technical Architecture

### Frontend Stack
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

### Desktop Stack
- **Electron** - Desktop framework
- **Vite** - Build tool
- **Electron Builder** - Packaging

### Backend Integration
- **OpenAI API** - AI guide generation
- **SQLite** - Local data storage
- **Node.js** - Runtime environment

## 📁 File Structure

```
StackMentor.io/
├── src/
│   ├── main.tsx              # React entry point
│   ├── App.tsx               # Main app component
│   ├── index.css             # Global styles
│   ├── components/           # React components
│   │   ├── StackWizard.tsx   # Main wizard interface
│   │   ├── StackSelector.tsx # Stack selection component
│   │   └── GuideViewer.tsx   # Guide display component
│   └── store/
│       └── StackStore.tsx    # Zustand state management
├── electron/
│   ├── main.ts               # Electron main process
│   └── preload/
│       └── index.ts          # Preload script
├── dist/                     # Built application
├── package.json              # Dependencies and scripts
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS config
├── tsconfig.json             # TypeScript configuration
├── .gitignore                # Git ignore rules
├── README.md                 # Project documentation
├── SETUP.md                  # Setup guide
├── DEVELOPMENT_PLAN.md       # This file
└── setup.sh                  # Setup script
```

## 🚀 Quick Start for Development

### 1. Initial Setup
```bash
# Clone and setup
git clone <repository-url>
cd StackMentor.io
./setup.sh

# Or manual setup
pnpm install
cp env.example .env
# Edit .env with your OpenAI API key
```

### 2. Development Commands
```bash
# Start development server
pnpm dev

# Start Electron app (in another terminal)
pnpm electron:dev

# Build for production
pnpm build
pnpm dist
```

### 3. Testing the Application

**Visual Testing**:
1. Start the development server: `pnpm dev`
2. Start Electron: `pnpm electron:dev`
3. Test the interface:
   - Select different tech stacks
   - Generate a guide
   - Test progress tracking
   - Test copy functionality

**Hotkey Testing**:
- Press `⌘ + ⇧ + P` (macOS) or `Ctrl + Shift + P` (Windows/Linux)
- App should show/hide instantly

## 🎯 Key Features Implementation Status

### ✅ Completed
- [x] Project structure and setup
- [x] Stack selection wizard
- [x] Interactive UI with pros/cons
- [x] Guide generation (simulated)
- [x] Progress tracking
- [x] Copy-to-clipboard functionality
- [x] Responsive design
- [x] Basic Electron integration

### 🚧 In Progress
- [ ] OpenAI API integration
- [ ] Global hotkey implementation
- [ ] System tray integration
- [ ] Project scaffolding

### 📋 Planned
- [ ] Database integration
- [ ] Auto-updater
- [ ] Community templates
- [ ] Git integration
- [ ] Terminal integration

## 🔧 Configuration

### Environment Variables
```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_DEV_SERVER_URL=http://localhost:5173
VITE_APP_NAME=StackMentor.io
VITE_APP_VERSION=1.0.0
```

### Tech Stacks Configuration
Edit `src/store/StackStore.tsx` to add/modify available tech stacks:

```typescript
const sampleStacks: TechStack[] = [
  {
    id: 'react',
    name: 'React',
    description: 'A JavaScript library for building user interfaces',
    category: 'frontend',
    pros: ['Large ecosystem', 'Great documentation', 'Flexible'],
    cons: ['Steep learning curve', 'Complex state management'],
  },
  // Add more stacks...
]
```

## 🐛 Troubleshooting

### Common Issues

1. **Dependencies not found**:
   ```bash
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```

2. **Electron not starting**:
   - Ensure `pnpm dev` is running first
   - Check port 5173 is available

3. **Hotkey not working**:
   - On macOS: Grant accessibility permissions
   - On Windows: Run as administrator

4. **Build errors**:
   ```bash
   pnpm build
   pnpm dist
   ```

## 📈 Next Steps

1. **Complete OpenAI Integration**:
   - Implement real AI guide generation
   - Add prompt engineering for different stacks
   - Handle API errors gracefully

2. **Enhance Desktop Features**:
   - Implement global hotkey
   - Add system tray functionality
   - Create auto-updater

3. **Add Project Scaffolding**:
   - Create template system
   - Implement file generation
   - Add Git integration

4. **Polish and Test**:
   - Improve UI/UX
   - Add comprehensive testing
   - Optimize performance

5. **Prepare for Distribution**:
   - Configure Electron Builder
   - Set up code signing
   - Create installers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

- Create issues for bugs or feature requests
- Check documentation in `docs/` folder
- Join community discussions

---

**Happy coding! 🚀** 