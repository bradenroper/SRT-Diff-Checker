"use client";

import { Change } from 'diff';
import { clsx } from 'clsx';
import { useState } from 'react';
import { LayoutTemplate, Columns } from 'lucide-react';

interface DiffViewerProps {
    changes: Change[];
}

type ViewMode = 'split' | 'unified';

export default function DiffViewer({ changes }: DiffViewerProps) {
    const [viewMode, setViewMode] = useState<ViewMode>('unified');

    // Helper to reconstruct text for split view (simplified approach)
    // In a real robust split view, we'd line-match. For this simplified version:
    // LEFT side: Original (removed + unchanged)
    // RIGHT side: New (added + unchanged)

    const renderUnified = () => (
        <div className="font-mono text-sm whitespace-pre-wrap">
            {changes.map((change, idx) => (
                <span
                    key={idx}
                    className={clsx(
                        change.added && 'bg-emerald-900/50 text-emerald-100 decoration-emerald-500/30',
                        change.removed && 'bg-rose-900/50 text-rose-100 line-through decoration-rose-500/30 opacity-70',
                        !change.added && !change.removed && 'text-slate-400'
                    )}
                >
                    {change.value}
                </span>
            ))}
        </div>
    );

    const renderSplit = () => {
        // A simple split view needs to reconstruct lines. 
        // This is a complex logic to do perfectly line-by-line in a simple component.
        // For this iteration, we will render two panes:
        // Left pane shows all 'removed' and 'no change' parts.
        // Right pane shows all 'added' and 'no change' parts.
        // Highlighting the differences.

        return (
            <div className="grid grid-cols-2 gap-px bg-slate-700/50 rounded-lg overflow-hidden border border-slate-700/50">
                {/* Left / Original */}
                <div className="bg-slate-900/80 p-4 overflow-x-auto">
                    <div className="font-mono text-sm whitespace-pre-wrap">
                        {changes.map((change, idx) => {
                            if (change.added) return null; // Don't show added things in original
                            return (
                                <span
                                    key={idx}
                                    className={clsx(
                                        change.removed && 'bg-rose-900/40 text-rose-200',
                                        !change.removed && 'text-slate-400'
                                    )}
                                >
                                    {change.value}
                                </span>
                            )
                        })}
                    </div>
                </div>
                {/* Right / New */}
                <div className="bg-slate-900/80 p-4 overflow-x-auto border-l border-slate-700">
                    <div className="font-mono text-sm whitespace-pre-wrap">
                        {changes.map((change, idx) => {
                            if (change.removed) return null; // Don't show removed things in new
                            return (
                                <span
                                    key={idx}
                                    className={clsx(
                                        change.added && 'bg-emerald-900/40 text-emerald-200',
                                        !change.added && 'text-slate-400'
                                    )}
                                >
                                    {change.value}
                                </span>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="glass-panel rounded-xl overflow-hidden flex flex-col h-full">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
                <h3 className="font-semibold text-slate-200">Comparison Result</h3>
                <div className="flex bg-slate-900/50 rounded-lg p-1 border border-slate-700/50">
                    <button
                        onClick={() => setViewMode('unified')}
                        className={clsx(
                            "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                            viewMode === 'unified'
                                ? 'bg-slate-700 text-cyan-400 shadow-sm'
                                : 'text-slate-500 hover:text-slate-300'
                        )}
                    >
                        <LayoutTemplate size={14} /> Unified
                    </button>
                    <button
                        onClick={() => setViewMode('split')}
                        className={clsx(
                            "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                            viewMode === 'split'
                                ? 'bg-slate-700 text-cyan-400 shadow-sm'
                                : 'text-slate-500 hover:text-slate-300'
                        )}
                    >
                        <Columns size={14} /> Split
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-auto p-4 custom-scrollbar">
                {viewMode === 'unified' ? renderUnified() : renderSplit()}
            </div>
        </div>
    );
}
