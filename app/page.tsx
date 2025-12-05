"use client";

import { useState, useMemo } from 'react';
import InputPanel from '@/components/InputPanel';
import DiffViewer from '@/components/DiffViewer';
import DiffSummary from '@/components/DiffSummary';
import { stripSRT, normalizeText, computeDiff, DiffConfig, reformatText, processDiff } from '@/lib/diffUtils';
import { Settings, Sparkles, Zap } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');

  const [config, setConfig] = useState<DiffConfig>({
    ignoreWhitespace: false,
    ignorePunctuation: false,
    breakSentences: false,
  });

  // Derived state: compute diff whenever inputs or config changes
  const diffResult = useMemo(() => {
    // 1. Normalize
    const normLeft = normalizeText(leftText, config);
    const normRight = normalizeText(rightText, config);

    // 2. Compute Diff (using words mode by default as it's most common for text)
    const rawDiff = computeDiff(normLeft, normRight, config.breakSentences ? 'lines' : 'words');

    // 3. Post-process (filtering punctuation)
    return processDiff(rawDiff, config);
  }, [leftText, rightText, config]);

  const toggleConfig = (key: keyof DiffConfig) => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main className="min-h-screen bg-background text-foreground p-6 flex flex-col gap-6 transition-colors duration-300">

      {/* Header */}
      <header className="flex items-center justify-between pb-2 border-b border-border">
        <div className="flex items-center gap-3">
          {/* <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/20">
            <Sparkles className="text-white" size={24} />
          </div> */}
          <div>
            <h1 className="flex flex-row items-center text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-400">
              TC
              <Zap className='text-cyan-500' />
              DC
            </h1>
            <p className="text-xs text-muted-foreground font-medium">Transcript Caption Diff Checker</p>
          </div>
        </div>
        <ThemeToggle />
      </header>

      {/* Main Grid: Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[50vh] min-h-[400px]">
        <InputPanel
          label="Original Text"
          value={leftText}
          onChange={setLeftText}
          onStripSRT={() => setLeftText(stripSRT(leftText))}
          onReformat={() => setLeftText(reformatText(leftText))}
        />
        <InputPanel
          label="Modified Text"
          value={rightText}
          onChange={setRightText}
          onStripSRT={() => setRightText(stripSRT(rightText))}
          onReformat={() => setRightText(reformatText(rightText))}
        />
      </div>

      {/* Results Section */}
      <div className="flex flex-col lg:flex-row gap-6 h-auto min-h-[400px]">

        {/* Results Components (takes up 3/4) */}
        <div className="flex-[3] flex flex-col gap-6">
          <DiffViewer changes={diffResult} />
        </div>

        {/* Configuration Side Panel (takes up 1/4) */}
        <div className="flex-[1] flex flex-col gap-6">

          {/* Settings Box */}
          <div className="glass-panel rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border text-foreground font-semibold">
              <Settings size={18} className="text-muted-foreground" />
              Comparison Options
            </div>

            <div className="flex flex-col gap-3">
              {/* <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer group transition-colors">
                <input
                  type="checkbox"
                  checked={config.breakSentences}
                  onChange={() => toggleConfig('breakSentences')}
                  className="w-4 h-4 rounded border-input text-primary focus:ring-ring bg-background"
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Break Sentences</span>
              </label> */}

              {/* <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer group transition-colors">
                <input
                  type="checkbox"
                  checked={config.ignoreWhitespace}
                  onChange={() => toggleConfig('ignoreWhitespace')}
                  className="w-4 h-4 rounded border-input text-primary focus:ring-ring bg-background"
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Ignore Whitespace</span>
              </label> */}

              <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer group transition-colors">
                <input
                  type="checkbox"
                  checked={config.ignorePunctuation}
                  onChange={() => toggleConfig('ignorePunctuation')}
                  className="w-4 h-4 rounded border-input text-primary focus:ring-ring bg-background"
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Ignore Equivalent Punctuation</span>
              </label>
            </div>
          </div>

          {/* Summary Box */}
          <DiffSummary changes={diffResult} />
        </div>

      </div>
    </main >
  );
}
