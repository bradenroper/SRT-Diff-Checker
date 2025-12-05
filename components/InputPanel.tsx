"use client";

import { X, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InputPanelProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    onStripSRT?: () => void;
    onReformat?: () => void;
}

export default function InputPanel({ label, value, onChange, onStripSRT, onReformat }: InputPanelProps) {
    return (
        <div className="flex flex-col h-full glass-panel rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-primary/10 hover:border-primary/30">
            <div className="flex items-center justify-between px-4 py-3 bg-card/50 border-b border-border">
                <h3 className="font-semibold text-card-foreground flex items-center gap-2">
                    <FileText size={16} className="text-primary" />
                    {label}
                </h3>
                <div className="flex gap-2">
                    {onStripSRT && (
                        <button
                            onClick={onStripSRT}
                            className="px-3 py-1.5 text-xs font-medium text-primary-foreground bg-primary/80 hover:bg-primary border border-primary/50 rounded-md transition-colors backdrop-blur-sm"
                            title="Remove SRT formatting"
                        >
                            Strip SRT
                        </button>
                    )}
                    {onReformat && (
                        <button
                            onClick={onReformat}
                            className="px-3 py-1.5 text-xs font-medium text-primary-foreground bg-primary/80 hover:bg-primary border border-primary/50 rounded-md transition-colors backdrop-blur-sm"
                            title="Combine lines and split by sentence"
                        >
                            Reformat
                        </button>
                    )}
                    <button
                        onClick={() => onChange('')}
                        className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                        title="Clear text"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 w-full bg-background/50 p-4 resize-none outline-none text-sm font-mono text-foreground placeholder-muted-foreground focus:bg-background/80 transition-colors"
                placeholder={`Paste your ${label.toLowerCase()} text here...`}
                spellCheck={false}
            />
            <div className="px-4 py-2 bg-muted/30 border-t border-border text-xs text-muted-foreground flex justify-between">
                <span>{value.length} chars</span>
                <span>{value.split('\n').length} lines</span>
            </div>
        </div>
    );
}
