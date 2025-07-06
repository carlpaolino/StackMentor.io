# StackMentor.io Setup Guide

This guide will help you set up and run StackMentor.io on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **pnpm** (recommended) or npm - Install with `npm install -g pnpm`
- **Git** - [Download here](https://git-scm.com/)

## Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd StackMentor.io
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

Copy the environment example file and configure it:

```bash
cp env.example .env
```

Edit `.env` and add your OpenAI API key:

```env
VITE_OPENAI_API_KEY=your_actual_openai_api_key_here
```

### 4. Start Development Server

```bash
pnpm dev
```

This will start the Vite development server at `http://localhost:5173`

### 5. Start Electron App

In a new terminal:

```bash
pnpm electron:dev
```

This will launch the Electron desktop application.

## Development Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Vite development server |
| `pnpm electron:dev` | Start Electron app in development mode |
| `pnpm build` | Build the React app for production |
| `pnpm dist` | Build and package the Electron app |
| `pnpm dist:win` | Build for Windows |
| `pnpm dist:mac` | Build for macOS |
| `pnpm dist:linux` | Build for Linux |

## Project Structure

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
└── tsconfig.json             # TypeScript configuration
```

## Features

### ✅ Implemented
- Stack selection wizard with 4 categories (Frontend, Backend, Database, Deployment)
- Interactive UI with pros/cons for each technology
- Step-by-step guide generation (simulated)
- Progress tracking with checkboxes
- Copy-to-clipboard functionality for commands and code
- Responsive design with Tailwind CSS
- Global hotkey support (⌘ + ⇧ + P / Ctrl + Shift + P)
- System tray integration

### 🚧 In Progress
- OpenAI API integration for real guide generation
- Project scaffolding functionality
- Database integration for saving guides
- Auto-updater implementation

### 📋 Planned
- Community templates
- Git integration
- Terminal integration
- Analytics dashboard
- Plugin system

## Testing the Application

### Visual Testing

1. **Start the development server:**
   ```bash
   pnpm dev
   ```

2. **Start the Electron app:**
   ```bash
   pnpm electron:dev
   ```

3. **Test the interface:**
   - Select different tech stacks from each category
   - Verify the "Generate Guide" button becomes enabled when all categories are selected
   - Click "Generate Guide" to see the step-by-step interface
   - Test the progress tracking by clicking checkboxes
   - Test the copy functionality for commands and code
   - Test the expand/collapse functionality for steps

### Hotkey Testing

1. **Test the global hotkey:**
   - Press `⌘ + ⇧ + P` (macOS) or `Ctrl + Shift + P` (Windows/Linux)
   - The app should show/hide instantly
   - Test from different applications to ensure it works globally

### Tray Testing

1. **Test the system tray:**
   - Right-click the tray icon
   - Test "Show StackMentor.io" and "Quit" options
   - Click the tray icon to show/hide the app

## Troubleshooting

### Common Issues

1. **Dependencies not found:**
   ```bash
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```

2. **Electron not starting:**
   - Make sure you're running `pnpm electron:dev` after `pnpm dev`
   - Check that port 5173 is available

3. **Hotkey not working:**
   - On macOS, grant accessibility permissions to Terminal/VS Code
   - On Windows, run as administrator if needed

4. **Build errors:**
   ```bash
   pnpm build
   pnpm dist
   ```

### Environment Variables

Make sure your `.env` file is properly configured:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_DEV_SERVER_URL=http://localhost:5173
VITE_APP_NAME=StackMentor.io
VITE_APP_VERSION=1.0.0
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

## Next Steps

1. **Get an OpenAI API key** from [OpenAI Platform](https://platform.openai.com/)
2. **Configure the API key** in your `.env` file
3. **Test the full functionality** with real AI-generated guides
4. **Customize the tech stacks** in `src/store/StackStore.tsx`
5. **Add your own templates** and deployment options

## Support

- Create an issue for bugs or feature requests
- Check the [documentation](docs/) for detailed guides
- Join our community discussions

---

Happy coding! 🚀 