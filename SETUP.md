# EasyMoney - Complete Setup Guide

**Cyberpunk distributed-compute platform** • Demo mode only • No real money

---

## 🚀 Quick Start (5 minutes)

### Option 1: Use in Browser (Easiest)

1. **Visit the app:**
   - Go to: https://easymoney.vercel.app (or your deployed URL)
   - Click "SKIP BOOT" on the intro screen
   - You're in! 🎮

2. **What you see:**
   - Dashboard with fake earnings counter
   - Swarms (100+ simulated compute networks)
   - Wallet with demo balances
   - Terminal for commands
   - Device settings page

### Option 2: Install Locally (Developers)

**Requirements:** Node.js 20+ and pnpm

```bash
# 1. Clone the project
git clone https://github.com/io808mafialivenow/easymoney.git
cd easymoney
git checkout init/project-setup

# 2. Install dependencies
pnpm install

# 3. Start everything
pnpm dev

# 4. Open browser
open http://localhost:5173
```

That's it! Backend API runs on port 3000, frontend on 5173.

---

## 📱 Mobile & APK Installation

### Install on Android (APK)

**Step 1: Download APK**
- Coming soon: Build APK with Capacitor
- For now, use **Progressive Web App (PWA)** below

**Step 2: PWA (Works on All Phones)**

#### On Android:
1. Open Chrome
2. Go to: https://easymoney.vercel.app
3. Tap menu (3 dots) → "Install app"
4. Tap "Install"
5. App appears on home screen

#### On iPhone:
1. Open Safari
2. Go to: https://easymoney.vercel.app
3. Tap share → "Add to Home Screen"
4. App appears on home screen

---

## 🎮 Using the App

### Dashboard (Home)
- See system status (online/offline)
- Watch live earnings counter
- CPU, GPU, storage usage
- Swarm count and active agents

### Swarm Page
- Browse 100+ simulated swarms
- Each has agents, CPU/GPU usage
- Click any swarm to see details
- All data is fake (demo only)

### Wallet
- View balances: DEMO_USD, DEMO_USDC, DEMO_EASY
- All money is simulated
- Available vs pending balance shown

### Earnings
- Track fake earnings by time period
- Today, this week, this month
- Total all-time earnings
- Transaction history (fake data)

### Terminal
Type commands:
```
help              # Show all commands
status            # System status
swarm list        # List all swarms
agents            # Agent count
earnings          # Show earnings
wallet            # Show balances
device            # Device info
```

### Device Page
- Configure CPU/GPU/Storage contribution (sliders)
- View device info
- All settings are local only

---

## 🛠️ For Developers

### File Structure
```
easymoney/
├── apps/web/                 # React app (what you see)
├── packages/
│   ├── shared/              # Shared types
│   ├── ui/                  # Demoscene effects (CRT, glows)
│   ├── terminal/            # Terminal component
│   ├── wallet/              # Wallet state
│   ├── swarm/               # Swarm state
│   └── demo-engine/         # Simulation engine
├── services/api/            # Backend (Express.js)
└── README.md, SECURITY.md   # Docs
```

### Common Commands

```bash
# Development
pnpm dev              # Start everything
pnpm dev:web          # Frontend only
pnpm dev:api          # Backend only

# Build
pnpm build            # Build all packages

# Testing
pnpm test             # Run tests
pnpm test:watch       # Watch mode

# Code quality
pnpm lint             # Check code
pnpm format           # Auto-format
pnpm typecheck        # Type errors
```

### Add New Page

1. Create file: `apps/web/src/pages/MyPage.tsx`
2. Add to router in `apps/web/src/App.tsx`
3. Style with Tailwind CSS + glow effects

### Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, Vite
- **State:** Zustand (simple store management)
- **Backend:** Express.js, Node.js
- **Monorepo:** pnpm workspaces

---

## 🐳 Docker (Advanced)

```bash
# Start all services in containers
docker-compose up

# Visit:
# Frontend: http://localhost:5173
# API: http://localhost:3000
```

---

## ⚠️ Important Notes

### Demo Mode
- ✅ Earnings are FAKE (not real money)
- ✅ Swarms are SIMULATED (not real computers)
- ✅ Jobs are PROCEDURALLY GENERATED
- ✅ Data resets when you refresh
- ✅ **No real financial transactions**

### Production Ready?
**NO** - This is a prototype. Before using for real:
- Add user authentication
- Use a database (PostgreSQL)
- Add HTTPS/SSL
- Implement rate limiting
- Add input validation
- See [SECURITY.md](./SECURITY.md)

---

## 🌐 Deployment Options

### Deploy to Vercel (Recommended for Web)

```bash
# 1. Push to GitHub
git push origin init/project-setup

# 2. Go to vercel.com
# 3. Connect your GitHub repo
# 4. Vercel auto-deploys

# Frontend runs on: https://easymoney-YOUR-NAME.vercel.app
# API runs on: https://api-easymoney-YOUR-NAME.vercel.app
```

### Deploy to Netlify

```bash
# 1. Build locally
pnpm build

# 2. Drag & drop apps/web/dist to netlify.com
# Done! Your app is live
```

### Deploy to Docker (Any Server)

```bash
# Build image
docker build -f services/api/Dockerfile -t easymoney-api .

# Run container
docker run -p 3000:3000 easymoney-api
```

---

## 🔧 Troubleshooting

### "Port 5173 already in use"
```bash
# Find what's using it
lsof -i :5173

# Kill it
kill -9 <PID>
```

### "pnpm not installed"
```bash
npm install -g pnpm
```

### "Node modules broken"
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### App won't start
```bash
# Clear cache
pnpm store prune

# Reinstall
rm -rf node_modules
pnpm install

# Try again
pnpm dev
```

---

## 📦 Building APK with Capacitor (Advanced)

For Android APK:

```bash
# 1. Add Capacitor
pnpm add -D @capacitor/core @capacitor/cli

# 2. Initialize
pnpm exec cap init

# 3. Add Android
pnpm exec cap add android

# 4. Build APK
pnpm exec cap build android

# 5. Find APK in: android/app/build/outputs/apk
```

For iOS: Similar steps, requires macOS + Xcode

---

## 🚀 Next Steps

1. **Try it out:** Open https://easymoney.vercel.app in your browser
2. **Install locally:** `git clone`, `pnpm install`, `pnpm dev`
3. **Explore code:** Check out pages in `apps/web/src/pages/`
4. **Build something:** Add a new feature or page
5. **Deploy:** Follow deployment section above

---

## ❓ FAQ

**Q: Is this real money?**
A: No, everything is simulated in demo mode.

**Q: Can I run this offline?**
A: Yes (except API calls). Use PWA for offline mode.

**Q: How do I modify the look?**
A: Edit Tailwind classes in pages, or customize CSS in `apps/web/src/index.css`

**Q: Can I use this in production?**
A: Not without significant changes. See SECURITY.md.

**Q: Where are my earnings stored?**
A: Nowhere - it's in-memory only. Refreshing the page resets everything.

**Q: Can I build an APK?**
A: Yes! Use Capacitor (see Advanced section).

---

## 📚 Documentation

- **[README.md](./README.md)** - Project overview
- **[SECURITY.md](./SECURITY.md)** - Security notes
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Developer guide
- **[GitHub Issues](https://github.com/io808mafialivenow/easymoney/issues)** - Report bugs

---

## 💬 Support

Need help?
1. Check this guide
2. Read [DEVELOPMENT.md](./DEVELOPMENT.md)
3. Open GitHub Issue
4. Check [GitHub Discussions](https://github.com/io808mafialivenow/easymoney/discussions)

---

## 🎉 You're Ready!

**Pick your path:**
- 🌐 **Browser only?** → Go to https://easymoney.vercel.app
- 💻 **Developer?** → Clone repo and `pnpm dev`
- 📱 **Mobile?** → Install PWA on your phone
- 🐳 **Docker?** → Run `docker-compose up`

Enjoy the cyberpunk simulation! 🤖✨

---

**Built with ❤️ and cyberpunk vibes** | MIT License © 2024
