import React, { useEffect, useState } from 'react';

export interface TerminalCursorProps {
  blink?: boolean;
}

export const TerminalCursor: React.FC<TerminalCursorProps> = ({ blink = true }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!blink) return;

    const interval = setInterval(() => {
      setVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, [blink]);

  return (
    <span
      style={{
        display: 'inline-block',
        width: '0.6em',
        height: '1em',
        backgroundColor: '#00FF66',
        opacity: visible ? 1 : 0,
        marginLeft: '0.2em',
        transition: 'opacity 0.1s',
      }}
    />
  );
};
