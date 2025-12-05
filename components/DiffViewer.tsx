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
                        change.added && 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/80 dark:text-emerald-100 decoration-emerald-500/30 rounded border border-emerald-200/50 dark:border-emerald-200/20',
                        change.removed && 'bg-rose-100 text-rose-800 line-through dark:bg-rose-900/80 dark:text-rose-100 decoration-rose-500/30 opacity-70 rounded border border-rose-200/50 dark:border-rose-200/20',
                        !change.added && !change.removed && 'text-muted-foreground'
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
            <div className="grid grid-cols-2 gap-px bg-border rounded-lg overflow-hidden border border-border">
                {/* Left / Original */}
                <div className="bg-muted/30 p-4 overflow-x-auto">
                    <div className="font-mono text-sm whitespace-pre-wrap">
                        {changes.map((change, idx) => {
                            if (change.added) return null; // Don't show added things in original
                            return (
                                <span
                                    key={idx}
                                    className={clsx(
                                        change.removed && 'bg-rose-100 text-rose-800 dark:bg-rose-900/80 dark:text-rose-200 rounded border border-rose-200/50 dark:border-rose-200/20',
                                        !change.removed && 'text-muted-foreground'
                                    )}
                                >
                                    {change.value}
                                </span>
                            )
                        })}
                    </div>
                </div>
                {/* Right / New */}
                <div className="bg-muted/30 p-4 overflow-x-auto border-l border-border">
                    <div className="font-mono text-sm whitespace-pre-wrap">
                        {changes.map((change, idx) => {
                            if (change.removed) return null; // Don't show removed things in new
                            return (
                                <span
                                    key={idx}
                                    className={clsx(
                                        change.added && 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/80 dark:text-emerald-200 rounded border border-emerald-200/50 dark:border-emerald-200/20',
                                        !change.added && 'text-muted-foreground'
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
            <div className="flex items-center justify-between px-4 py-3 bg-card/50 border-b border-border">
                <h3 className="font-semibold text-card-foreground">Comparison Result</h3>
                <div className="flex bg-muted/50 rounded-lg p-1 border border-border">
                    <button
                        onClick={() => setViewMode('unified')}
                        className={clsx(
                            "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                            viewMode === 'unified'
                                ? 'bg-background text-primary shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                        )}
                    >
                        <LayoutTemplate size={14} /> Unified
                    </button>
                    <button
                        onClick={() => setViewMode('split')}
                        className={clsx(
                            "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                            viewMode === 'split'
                                ? 'bg-background text-primary shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
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
