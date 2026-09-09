import React from 'react';

export interface CRTOverlayProps {
  intensity?: number;
  enabled?: boolean;
}

export const CRTOverlay: React.FC<CRTOverlayProps> = ({ intensity = 0.15, enabled = true }) => {
  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          rgba(0, 0, 0, ${intensity}),
          rgba(0, 0, 0, ${intensity}) 1px,
          transparent 1px,
          transparent 2px
        )`,
      }}
    />
  );
};
