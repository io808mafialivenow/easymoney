import React, { useState, useEffect } from 'react';
import { CRTOverlay, Scanlines, GlowText, ProgressBar } from '@easymoney/ui';

export const DevicePage: React.FC = () => {
  const [prefers, setPrefers] = useState({
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  });

  const deviceInfo = {
    platform: navigator.platform,
    userAgent: navigator.userAgent,
    language: navigator.language,
    onLine: navigator.onLine,
  };

  return (
    <div className="min-h-screen bg-black text-easymoney-green font-mono p-6 relative">
      <CRTOverlay intensity={0.05} />
      <Scanlines />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="border-b-2 border-easymoney-green pb-4 mb-6">
          <h1 className="text-2xl font-bold" style={{ textShadow: '0 0 20px #00FF66' }}>
            DEVICE // CONFIGURATION
          </h1>
        </div>

        {/* Device Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="border-2 border-easymoney-green p-4 bg-black bg-opacity-50">
            <div className="text-xs text-easymoney-cyan mb-3">DEVICE INFORMATION</div>
            <div className="space-y-2 text-xs">
              <div>PLATFORM: {deviceInfo.platform}</div>
              <div>STATUS: {deviceInfo.onLine ? <GlowText color="green">ONLINE</GlowText> : <GlowText color="red">OFFLINE</GlowText>}</div>
              <div>LANGUAGE: {deviceInfo.language}</div>
            </div>
          </div>

          <div className="border-2 border-easymoney-green p-4 bg-black bg-opacity-50">
            <div className="text-xs text-easymoney-cyan mb-3">ACCESSIBILITY</div>
            <div className="space-y-2 text-xs">
              <div>REDUCED MOTION: {prefers.reducedMotion ? 'YES' : 'NO'}</div>
              <div>SCREEN READER: NOT DETECTED</div>
            </div>
          </div>
        </div>

        {/* Resource Controls */}
        <div className="border-2 border-easymoney-green p-4 bg-black bg-opacity-50">
          <div className="text-xs text-easymoney-cyan mb-4">RESOURCE CONTRIBUTION (DEMO)</div>
          <div className="space-y-4">
            {[
              { name: 'CPU', default: 50 },
              { name: 'GPU', default: 0 },
              { name: 'STORAGE', default: 0 },
              { name: 'NETWORK', default: 50 },
            ].map((resource) => (
              <div key={resource.name}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">{resource.name}</span>
                  <span className="text-sm">{resource.default}%</span>
                </div>
                <div className="w-full h-4 border border-easymoney-green bg-black">
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${resource.default}%`,
                      backgroundColor: '#00FF66',
                      boxShadow: '0 0 10px #00FF66',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
