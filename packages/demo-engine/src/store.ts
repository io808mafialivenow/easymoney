import { create } from 'zustand';
import { generateDemoJobs, Job, JobStatus } from '@easymoney/shared';

interface DemoState {
  jobs: Job[];
  earningsPerSecond: number;
  earnings: number;
  isRunning: boolean;
  initializeDemo: () => void;
  startSimulation: () => void;
  stopSimulation: () => void;
  updateProgress: () => void;
}

export const useDemo = create<DemoState>((set, get) => {
  let simulationInterval: NodeJS.Timeout | null = null;

  return {
    jobs: [],
    earningsPerSecond: 0.0137,
    earnings: 0,
    isRunning: false,
    initializeDemo: () => {
      const jobs = generateDemoJobs(50);
      set({ jobs });
    },
    startSimulation: () => {
      set({ isRunning: true });
      simulationInterval = setInterval(() => {
        get().updateProgress();
      }, 1000);
    },
    stopSimulation: () => {
      set({ isRunning: false });
      if (simulationInterval) {
        clearInterval(simulationInterval);
        simulationInterval = null;
      }
    },
    updateProgress: () => {
      set((state) => {
        const updatedJobs = state.jobs.map((job) => {
          if (job.status === JobStatus.RUNNING && job.progress < 100) {
            return {
              ...job,
              progress: Math.min(job.progress + Math.random() * 20, 100),
              completedAt: job.progress + Math.random() * 20 >= 100 ? Date.now() : null,
            };
          }
          return job;
        });

        const newEarnings = state.earnings + state.earningsPerSecond;

        return {
          jobs: updatedJobs,
          earnings: newEarnings,
        };
      });
    },
  };
});
