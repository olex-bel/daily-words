import type { GrammarDetails } from '../../../services/entryService';

export const WORD_STYLES = {
    m: {
        bg: 'bg-word-masculine',
        text: 'text-word-masculine',
        border: 'border-word-masculine',
    },
    f: {
        bg: 'bg-word-feminine',
        text: 'text-word-feminine',
        border: 'border-word-feminine',
    },
    n: {
        bg: 'bg-word-neutral',
        text: 'text-word-neutral',
        border: 'border-word-neutral',
    },
    default: {
        bg: 'bg-word-default',
        text: 'text-word-default',
        border: 'border-word-default',
    }
} as const;

export function getWordStyle(grammar: GrammarDetails) {
    if (grammar.pos === 'noun') {
        return WORD_STYLES[grammar.gender] ?? WORD_STYLES.default;
    }
    return WORD_STYLES.default;
}
