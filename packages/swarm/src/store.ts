import { create } from 'zustand';
import { Swarm, Agent, AgentStatus, generateDemoSwarms, generateDemoAgents } from '@easymoney/shared';

interface SwarmState {
  swarms: Swarm[];
  agents: Map<string, Agent[]>;
  initializeDemo: (swarmCount?: number) => void;
  getSwarmAgents: (swarmId: string) => Agent[];
  updateAgentStatus: (agentId: string, status: AgentStatus) => void;
}

export const useSwarm = create<SwarmState>((set, get) => ({
  swarms: [],
  agents: new Map(),
  initializeDemo: (swarmCount = 100) => {
    const demoSwarms = generateDemoSwarms(swarmCount);
    const agentsMap = new Map<string, Agent[]>();

    demoSwarms.forEach((swarm) => {
      agentsMap.set(swarm.id, generateDemoAgents(swarm.id, Math.min(swarm.agentCount, 100)));
    });

    set({
      swarms: demoSwarms,
      agents: agentsMap,
    });
  },
  getSwarmAgents: (swarmId: string) => {
    return get().agents.get(swarmId) || [];
  },
  updateAgentStatus: (agentId: string, status: AgentStatus) => {
    set((state) => {
      const newAgents = new Map(state.agents);
      for (const [swarmId, agents] of newAgents.entries()) {
        const agent = agents.find((a) => a.id === agentId);
        if (agent) {
          agent.status = status;
          break;
        }
      }
      return { agents: newAgents };
    });
  },
}));
