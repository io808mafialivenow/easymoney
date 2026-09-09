import { describe, it, expect } from 'vitest';
import { generateDemoSwarms, generateDemoJobs } from '@easymoney/shared';

describe('Demo Data Generation', () => {
  it('generates correct number of swarms', () => {
    const swarms = generateDemoSwarms(50);
    expect(swarms).toHaveLength(50);
  });

  it('generates swarms with valid structure', () => {
    const swarms = generateDemoSwarms(1);
    expect(swarms[0]).toHaveProperty('id');
    expect(swarms[0]).toHaveProperty('status');
    expect(swarms[0]).toHaveProperty('agentCount');
  });

  it('generates correct number of jobs', () => {
    const jobs = generateDemoJobs(100);
    expect(jobs).toHaveLength(100);
  });

  it('generates jobs with valid properties', () => {
    const jobs = generateDemoJobs(1);
    expect(jobs[0]).toHaveProperty('id');
    expect(jobs[0]).toHaveProperty('status');
    expect(jobs[0]).toHaveProperty('progress');
  });
});
