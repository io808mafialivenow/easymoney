// Demo data generation utilities
import { Agent, Swarm, Job, JobStatus, JobType, AgentStatus } from './types';

export function generateDemoSwarms(count: number = 100): Swarm[] {
  const swarms: Swarm[] = [];
  for (let i = 0; i < count; i++) {
    swarms.push({
      id: `swarm-${String(i).padStart(4, '0')}`,
      status: Math.random() > 0.1 ? 'ONLINE' : 'OFFLINE',
      agentCount: Math.floor(Math.random() * 1000),
      activeJobs: Math.floor(Math.random() * 50),
      cpu: Math.random() * 100,
      gpu: Math.random() * 100,
      storage: Math.random() * 100,
      network: Math.random() * 100,
      uptime: Math.floor(Math.random() * 1000000),
      throughput: Math.random() * 10000,
      createdAt: Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
    });
  }
  return swarms;
}

export function generateDemoAgents(swarmId: string, count: number = 100): Agent[] {
  const agents: Agent[] = [];
  const statuses = Object.values(AgentStatus);
  const capabilities = ['CPU', 'GPU', 'STORAGE', 'NETWORK'];

  for (let i = 0; i < count; i++) {
    agents.push({
      id: `agent-${swarmId}-${String(i).padStart(4, '0')}`,
      swarmId,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      capabilities: capabilities.slice(0, Math.floor(Math.random() * 4) + 1),
      cpu: Math.random() * 100,
      gpu: Math.random() * 100,
      storage: Math.random() * 100,
      network: Math.random() * 100,
      currentJob: Math.random() > 0.5 ? `job-${Math.floor(Math.random() * 1000)}` : null,
      heartbeat: Date.now(),
      uptime: Math.floor(Math.random() * 1000000),
      earnings: Math.random() * 1000,
    });
  }
  return agents;
}

export function generateDemoJobs(count: number = 50): Job[] {
  const jobs: Job[] = [];
  const jobTypes = Object.values(JobType);
  const jobStatuses = Object.values(JobStatus);

  for (let i = 0; i < count; i++) {
    const status = jobStatuses[Math.floor(Math.random() * jobStatuses.length)];
    const createdAt = Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000;

    jobs.push({
      id: `job-${String(i).padStart(5, '0')}`,
      type: jobTypes[Math.floor(Math.random() * jobTypes.length)],
      status,
      createdAt,
      startedAt: status === JobStatus.PENDING ? null : createdAt + 1000,
      completedAt: [JobStatus.COMPLETED, JobStatus.FAILED].includes(status) ? Date.now() : null,
      workerCount: Math.floor(Math.random() * 100) + 1,
      resourceClass: `class-${Math.floor(Math.random() * 5)}`,
      progress: status === JobStatus.RUNNING ? Math.random() * 100 : status === JobStatus.COMPLETED ? 100 : 0,
      reward: Math.random() * 10,
    });
  }
  return jobs;
}

export function seededRandom(seed: number): () => number {
  return function () {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}
