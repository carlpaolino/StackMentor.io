# StackMentor.io 🚀

A guided tech stack helper desktop application that assists developers in choosing, configuring, and deploying full-stack projects with step-by-step guidance.

## ✨ Features

- **Stack Selection Wizard**: Choose from frontend, backend, database, and deployment options
- **AI-Powered Guides**: Get detailed, step-by-step instructions for your chosen stack
- **Project Scaffolding**: Automatically generate starter projects with your selected tech stack
- **Global Hotkey Access**: Summon the app instantly with ⌘ + ⇧ + P (or Ctrl + Shift + P)
- **Progress Tracking**: Mark steps as complete and resume later
- **Cross-Platform**: Works on Windows, macOS, and Linux

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Desktop Framework**: Electron
- **AI Integration**: OpenAI GPT-4
- **State Management**: Zustand
- **Database**: SQLite (local storage)
- **Build Tool**: Vite
- **Package Manager**: pnpm

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd StackMentor.io
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your OpenAI API key:
   ```
   VITE_OPENAI_API_KEY=your_api_key_here
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

5. **Build for production**
   ```bash
   pnpm build
   pnpm dist
   ```

## 📁 Project Structure

```
StackMentor.io/
├── src/
│   ├── main/                 # Electron main process
│   ├── renderer/             # React frontend
│   ├── shared/               # Shared types and utilities
│   └── assets/               # Static assets
├── electron/                 # Electron configuration
├── dist/                     # Built application
└── docs/                     # Documentation
```

## 🎯 Development Roadmap

### Phase 1: Core Setup ✅
- [x] Project initialization
- [x] Electron + React setup
- [x] Basic UI framework
- [x] Development environment

### Phase 2: Core Features 🚧
- [ ] Stack selection wizard
- [ ] AI integration
- [ ] Project scaffolding
- [ ] Global hotkey system

### Phase 3: Polish & Testing
- [ ] UI/UX refinement
- [ ] Error handling
- [ ] Cross-platform testing
- [ ] Performance optimization

### Phase 4: Distribution
- [ ] Packaging for all platforms
- [ ] Auto-updater
- [ ] Code signing
- [ ] Release management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- Create an issue for bugs or feature requests
- Join our Discord community
- Check the [documentation](docs/) for detailed guides