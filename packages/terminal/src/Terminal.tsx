import React, { useState, useRef, useEffect } from 'react';

export interface TerminalProps {
  onCommand?: (command: string) => Promise<string>;
}

export const Terminal: React.FC<TerminalProps> = ({ onCommand }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = async (command: string) => {
    const trimmed = command.trim();
    if (!trimmed) return;

    setLines((prev) => [...prev, `> ${trimmed}`]);
    setHistory((prev) => [...prev, trimmed]);
    setInput('');
    setHistoryIndex(-1);

    if (onCommand) {
      const result = await onCommand(trimmed);
      setLines((prev) => [...prev, result]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = historyIndex + 1;
      if (newIndex < history.length) {
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="bg-black border-2 border-green-500 rounded font-mono text-sm text-green-500 flex flex-col h-full">
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto p-3 text-xs whitespace-pre-wrap break-words"
        style={{
          textShadow: '0 0 10px #00FF66',
        }}
      >
        {lines.length === 0 && (
          <div>
            EASYMONEY TERMINAL v0.1.0
            <br />
            Type 'help' for commands
            <br />
          </div>
        )}
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      <div className="border-t border-green-500 p-2">
        <div className="flex items-center">
          <span>&gt; </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-black text-green-500 outline-none ml-1"
            style={{
              textShadow: '0 0 10px #00FF66',
            }}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};
