import React, { useEffect, useState } from 'react';

export interface GlowTextProps {
  children: React.ReactNode;
  color?: 'green' | 'cyan' | 'magenta' | 'amber';
  intensity?: number;
  pulse?: boolean;
}

const colorMap = {
  green: '#00FF66',
  cyan: '#00E5FF',
  magenta: '#FF00AA',
  amber: '#FFB000',
};

export const GlowText: React.FC<GlowTextProps> = ({
  children,
  color = 'green',
  intensity = 1,
  pulse = false,
}) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (!pulse) return;

    let direction = -0.05;
    const interval = setInterval(() => {
      setOpacity((prev) => {
        let next = prev + direction;
        if (next > 1) {
          direction = -0.05;
          next = 1;
        } else if (next < 0.3) {
          direction = 0.05;
          next = 0.3;
        }
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [pulse]);

  return (
    <span
      style={{
        color: colorMap[color],
        textShadow: `0 0 ${10 * intensity}px ${colorMap[color]}, 0 0 ${20 * intensity}px ${colorMap[color]}`,
        opacity: pulse ? opacity : 1,
      }}
    >
      {children}
    </span>
  );
};
