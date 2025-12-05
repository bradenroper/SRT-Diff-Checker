"use client";

import { X, FileText } from 'lucide-react';

interface InputPanelProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    onStripSRT?: () => void;
    onReformat?: () => void;
}

export default function InputPanel({ label, value, onChange, onStripSRT, onReformat }: InputPanelProps) {
    return (
        <div className="flex flex-col h-full glass-panel rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-cyan-500/10 hover:border-cyan-500/30">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
                <h3 className="font-semibold text-slate-200 flex items-center gap-2">
                    <FileText size={16} className="text-cyan-400" />
                    {label}
                </h3>
                <div className="flex gap-2">
                    {onStripSRT && (
                        <button
                            onClick={onStripSRT}
                            className="px-3 py-1.5 text-xs font-medium text-cyan-200 bg-cyan-950/30 hover:bg-cyan-900/50 border border-cyan-900/50 rounded-md transition-colors backdrop-blur-sm"
                            title="Remove SRT formatting"
                        >
                            Strip SRT
                        </button>
                    )}
                    {onReformat && (
                        <button
                            onClick={onReformat}
                            className="px-3 py-1.5 text-xs font-medium text-emerald-200 bg-emerald-950/30 hover:bg-emerald-900/50 border border-emerald-900/50 rounded-md transition-colors backdrop-blur-sm"
                            title="Combine lines and split by sentence"
                        >
                            Reformat
                        </button>
                    )}
                    <button
                        onClick={() => onChange('')}
                        className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-950/30 rounded-md transition-colors"
                        title="Clear text"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 w-full bg-slate-900/30 p-4 resize-none outline-none text-sm font-mono text-slate-300 placeholder-slate-600 focus:bg-slate-900/50 transition-colors"
                placeholder={`Paste your ${label.toLowerCase()} text here...`}
                spellCheck={false}
            />
            <div className="px-4 py-2 bg-slate-800/30 border-t border-slate-700/50 text-xs text-slate-500 flex justify-between">
                <span>{value.length} chars</span>
                <span>{value.split('\n').length} lines</span>
            </div>
        </div>
    );
}
