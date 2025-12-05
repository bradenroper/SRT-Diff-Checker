"use client";

import { Change } from 'diff';
import { Minus, Plus, ArrowRight } from 'lucide-react';

interface DiffSummaryProps {
    changes: Change[];
}

export default function DiffSummary({ changes }: DiffSummaryProps) {
    const summaryItems = changes.filter(change => change.added || change.removed);

    if (summaryItems.length === 0) {
        return (
            <div className="p-6 text-center text-slate-500 italic glass-panel rounded-xl">
                No differences found.
            </div>
        );
    }

    return (
        <div className="glass-panel rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
                <h3 className="font-semibold text-slate-200">Diff Summary</h3>
            </div>
            <div className="max-h-60 overflow-y-auto p-4 space-y-2">
                {summaryItems.map((change, idx) => (
                    <div
                        key={idx}
                        className={`flex items-start gap-3 p-2 rounded-lg text-sm font-mono ${change.added
                                ? 'bg-emerald-950/30 border border-emerald-900/30 text-emerald-200'
                                : 'bg-rose-950/30 border border-rose-900/30 text-rose-200'
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
