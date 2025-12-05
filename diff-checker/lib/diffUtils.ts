import { diffChars, diffWords, diffLines, Change } from 'diff';

export type DiffMode = 'chars' | 'words' | 'lines';

export interface DiffConfig {
    ignoreWhitespace: boolean;
    ignorePunctuation: boolean;
    breakSentences: boolean;
}

export const stripSRT = (text: string): string => {
    // Regex to match SRT timing lines (e.g., 00:00:01,000 --> 00:00:04,000)
    // and numeric indices.
    const srtTimingRegex = /\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}/g;
    const srtIndexRegex = /^\d+$/gm;

    // Remove timing lines
    let cleaned = text.replace(srtTimingRegex, '');
    // Remove index lines (numbers on their own line)
    cleaned = cleaned.replace(srtIndexRegex, '');
    // Remove multiple newlines left behind
    cleaned = cleaned.replace(/\n\s*\n/g, '\n');
    return cleaned.trim();
};

export const reformatText = (text: string): string => {
    // 1. Replace newlines with spaces
    let processed = text.replace(/\n/g, ' ');
    // 2. Collapse multiple spaces
    processed = processed.replace(/\s+/g, ' ');
    // 3. Add newline after sentence endings (. ! ?) if followed by space or end
    // We look for [.!?] followed by a space, and replace with the match + double newline
    processed = processed.replace(/([.!?])\s+/g, '$1\n\n');
    return processed.trim();
};

export const processDiff = (changes: Change[], config: DiffConfig): Change[] => {
    let processed = [...changes];

    if (config.ignorePunctuation) {
        processed = processed.map(change => {
            // Check if content is strictly punctuation/whitespace
            const isPunctuation = /^[\s.,\/#!$%\^&\*;:{}=\-_`~()'"?]+$/.test(change.value);

            if (isPunctuation) {
                // If it's just punctuation, treat it as unchanged text
                return { ...change, added: false, removed: false };
            }
            return change;
        });

        // Merge adjacent unchanged nodes to keep the array clean
        const merged: Change[] = [];
        processed.forEach(change => {
            const last = merged[merged.length - 1];
            if (last && !last.added && !last.removed && !change.added && !change.removed) {
                last.value += change.value;
            } else {
                merged.push(change);
            }
        });
        return merged;
    }

    return processed;
};

export const normalizeText = (text: string, config: DiffConfig): string => {
    let processed = text;

    if (config.breakSentences) {
        // improved sentence breaking: look for [.!?] followed by space or end of line
        processed = processed.replace(/([.!?])\s+/g, '$1\n');
    }

    // Punctuation ignoring is now handled in processDiff (post-diff) to avoid altering original text structure before diff

    if (config.ignoreWhitespace) {
        // collapse all whitespace (spaces, tabs, newlines) to a single space
        processed = processed.replace(/\s+/g, ' ').trim();
    }

    return processed;
};

export const computeDiff = (oldText: string, newText: string, mode: DiffMode = 'words'): Change[] => {
    if (mode === 'chars') return diffChars(oldText, newText);
    if (mode === 'lines') return diffLines(oldText, newText);
    return diffWords(oldText, newText);
};
