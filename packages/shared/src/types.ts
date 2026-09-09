// Types for swarm agents
export enum AgentStatus {
  ONLINE = 'ONLINE',
  WORKING = 'WORKING',
  IDLE = 'IDLE',
  THROTTLED = 'THROTTLED',
  ERROR = 'ERROR',
  OFFLINE = 'OFFLINE',
}

export interface Agent {
  id: string;
  swarmId: string;
  status: AgentStatus;
  capabilities: string[];
  cpu: number;
  gpu: number;
  storage: number;
  network: number;
  currentJob: string | null;
  heartbeat: number;
  uptime: number;
  earnings: number;
}

export interface Swarm {
  id: string;
  status: 'ONLINE' | 'OFFLINE';
  agentCount: number;
  activeJobs: number;
  cpu: number;
  gpu: number;
  storage: number;
  network: number;
  uptime: number;
  throughput: number;
  createdAt: number;
}

// Types for jobs
export enum JobType {
  CPU_DEMO = 'CPU_DEMO',
  GPU_DEMO = 'GPU_DEMO',
  DATA_PROCESSING_DEMO = 'DATA_PROCESSING_DEMO',
  AI_INFERENCE_DEMO = 'AI_INFERENCE_DEMO',
  STORAGE_DEMO = 'STORAGE_DEMO',
}

export enum JobStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export interface Job {
  id: string;
  type: JobType;
  status: JobStatus;
  createdAt: number;
  startedAt: number | null;
  completedAt: number | null;
  workerCount: number;
  resourceClass: string;
  progress: number;
  reward: number;
}

// Types for earnings
export interface Earning {
  id: string;
  timestamp: number;
  jobId: string;
  workerId: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED';
}

// Types for wallet
export interface WalletBalance {
  currency: string;
  balance: number;
  available: number;
  pending: number;
}

export interface Transaction {
  id: string;
  timestamp: number;
  type: 'EARNING' | 'PAYOUT' | 'TRANSFER';
  amount: number;
  currency: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  metadata: Record<string, unknown>;
}

// Types for device
export interface DeviceInfo {
  platform: string;
  os: string;
  browser: string;
  cpuCores: number;
  memory: number;
  screenSize: string;
}

// Types for system status
export interface SystemStatus {
  online: boolean;
  swarmCount: number;
  agentCount: number;
  cpuUtilization: number;
  gpuUtilization: number;
  storageUtilization: number;
  networkActivity: number;
  jobsPerSecond: number;
  demoEarningsPerSecond: number;
  walletBalance: number;
}
