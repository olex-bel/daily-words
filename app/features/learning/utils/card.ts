import type { GrammarDetails } from '../services/dailywords';

export const WORD_STYLES = {
    m: {
        bg: 'bg-word-masculine',
        text: 'text-word-masculine',
        shadow: 'shadow-word-masculine',
        border: 'border-word-masculine',
    },
    f: {
        bg: 'bg-word-feminine',
        text: 'text-word-feminine',
        shadow: 'shadow-word-feminine',
        border: 'border-word-feminine',
    },
    n: {
        bg: 'bg-word-neutral',
        text: 'text-word-neutral',
        shadow: 'shadow-word-neutral',
        border: 'border-word-neutral',
    },
    action: {
        bg: 'bg-word-action',
        text: 'text-word-action',
        shadow: 'shadow-word-action',
        border: 'border-word-action',
    },
    default: {
        bg: 'bg-gray-500',
        text: 'text-gray-500',
        shadow: 'shadow-gray-200',
        border: 'border-gray-500',
    }
} as const;

export function getWordStyle(grammar: GrammarDetails) {
    if (grammar.pos === 'noun') {
        return WORD_STYLES[grammar.gender] ?? WORD_STYLES.default;
    }
    if (grammar.pos === 'verb') {
        return WORD_STYLES.action;
    }
    return WORD_STYLES.default;
}
