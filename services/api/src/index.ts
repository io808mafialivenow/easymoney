import express, { Request, Response } from 'express';
import { generateDemoSwarms, generateDemoAgents, generateDemoJobs, SystemStatus } from '@easymoney/shared';

const app = express();
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// In-memory demo data
const demoSwarms = generateDemoSwarms(100);
const demoJobs = generateDemoJobs(50);
let demoEarnings = 0;
let lastEarningsUpdate = Date.now();

// Simulate earnings
setInterval(() => {
  demoEarnings += 0.0137;
  lastEarningsUpdate = Date.now();
}, 1000);

// Routes
app.get('/api/status', (req: Request, res: Response) => {
  const status: SystemStatus = {
    online: true,
    swarmCount: demoSwarms.length,
    agentCount: demoSwarms.reduce((sum, s) => sum + s.agentCount, 0),
    cpuUtilization: Math.random() * 100,
    gpuUtilization: Math.random() * 100,
    storageUtilization: Math.random() * 100,
    networkActivity: Math.random() * 1000,
    jobsPerSecond: Math.random() * 20000,
    demoEarningsPerSecond: 0.0137,
    walletBalance: 284.61 + demoEarnings,
  };
  res.json(status);
});

app.get('/api/swarms', (req: Request, res: Response) => {
  res.json(demoSwarms);
});

app.get('/api/swarms/:id', (req: Request, res: Response) => {
  const swarm = demoSwarms.find((s) => s.id === req.params.id);
  if (!swarm) {
    res.status(404).json({ error: 'Swarm not found' });
    return;
  }
  res.json(swarm);
});

app.get('/api/swarms/:id/agents', (req: Request, res: Response) => {
  const agents = generateDemoAgents(req.params.id, 100);
  res.json(agents);
});

app.get('/api/jobs', (req: Request, res: Response) => {
  res.json(demoJobs);
});

app.get('/api/earnings', (req: Request, res: Response) => {
  res.json({
    today: demoEarnings * Math.random(),
    thisWeek: demoEarnings * 7 * Math.random(),
    thisMonth: demoEarnings * 30 * Math.random(),
    pending: Math.random() * 50,
    total: demoEarnings * 100,
  });
});

app.get('/api/wallet', (req: Request, res: Response) => {
  res.json({
    balances: [
      { currency: 'DEMO_USD', balance: 284.61 + demoEarnings, available: 250.0, pending: 34.61 },
      { currency: 'DEMO_USDC', balance: 100.0, available: 100.0, pending: 0 },
      { currency: 'DEMO_EASY', balance: 5000.0, available: 5000.0, pending: 0 },
    ],
  });
});

app.get('/api/device', (req: Request, res: Response) => {
  res.json({
    platform: 'web',
    os: 'unknown',
    browser: 'unknown',
    cpuCores: 8,
    memory: 16,
    screenSize: '1920x1080',
  });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`EasyMoney API running on port ${PORT}`);
});
