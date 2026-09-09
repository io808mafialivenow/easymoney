import { describe, it, expect } from 'vitest';
import { Agent, AgentStatus } from '@easymoney/shared';

describe('Agent Types', () => {
  it('has valid agent statuses', () => {
    const statuses = Object.values(AgentStatus);
    expect(statuses.length).toBeGreaterThan(0);
    expect(statuses).toContain(AgentStatus.ONLINE);
    expect(statuses).toContain(AgentStatus.WORKING);
  });

  it('can create an agent object', () => {
    const agent: Agent = {
      id: 'test-agent',
      swarmId: 'test-swarm',
      status: AgentStatus.ONLINE,
      capabilities: ['CPU', 'GPU'],
      cpu: 50,
      gpu: 75,
      storage: 40,
      network: 60,
      currentJob: null,
      heartbeat: Date.now(),
      uptime: 1000,
      earnings: 100,
    };
    expect(agent.id).toBe('test-agent');
    expect(agent.status).toBe(AgentStatus.ONLINE);
  });
});
