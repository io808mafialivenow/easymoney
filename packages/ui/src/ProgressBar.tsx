import React from 'react';

export interface ProgressBarProps {
  value: number;
  max?: number;
  color?: 'green' | 'cyan' | 'magenta' | 'amber' | 'red';
  showLabel?: boolean;
}

const colorMap = {
  green: 'bg-green-500',
  cyan: 'bg-cyan-500',
  magenta: 'bg-pink-500',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = 'green',
  showLabel = true,
}) => {
  const percentage = (value / max) * 100;
  const blocks = Math.floor(percentage / 5);
  const barRepresentation = '█'.repeat(blocks) + '░'.repeat(20 - blocks);

  return (
    <div className="w-full">
      <div className="font-mono text-xs" style={{ color: '#00FF66' }}>
        {barRepresentation}
      </div>
      {showLabel && <div className="text-xs text-right mt-1">{Math.round(percentage)}%</div>}
    </div>
  );
};
