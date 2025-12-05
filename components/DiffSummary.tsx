"use client";

import { Change } from 'diff';
import { Minus, Plus } from 'lucide-react';

interface DiffSummaryProps {
    changes: Change[];
}

export default function DiffSummary({ changes }: DiffSummaryProps) {
    const summaryItems = changes.filter(change => change.added || change.removed);

    if (summaryItems.length === 0) {
        return (
            <div className="p-6 text-center text-muted-foreground italic glass-panel rounded-xl">
                No differences found.
            </div>
        );
    }

    return (
        <div className="glass-panel rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-card/50 border-b border-border">
                <h3 className="font-semibold text-card-foreground">Diff Summary</h3>
            </div>
            <div className="max-h-60 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                {summaryItems.map((change, idx) => (
                    <div
                        key={idx}
                        className={`flex items-start gap-3 p-2 rounded-lg text-sm font-mono border ${change.added
                            ? 'bg-emerald-100/50 border-emerald-200/50 text-emerald-900 dark:bg-emerald-950/80 dark:border-emerald-900/30 dark:text-emerald-200'
                            : 'bg-rose-100/50 border-rose-200/50 text-rose-900 dark:bg-rose-950/80 dark:border-rose-900/30 dark:text-rose-200'
                            }`}
                    >
                        <span className={`mt-0.5 p-0.5 rounded ${change.added ? 'bg-emerald-500/20' : 'bg-rose-500/20'}`}>
                            {change.added ? <Plus size={12} /> : <Minus size={12} />}
                        </span>
                        <span className="whitespace-pre-wrap break-all">{change.value.trim() || '[Whitespace/Newline]'}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
