import type { GrammarDetails } from '../services/dailywords';

export const WORD_STYLES = {
    m: {
        bg: 'bg-word-masculine',
        text: 'text-word-masculine',
        shadow: 'shadow-word-masculine',
        label: 'Podstatné meno (m)'
    },
    f: {
        bg: 'bg-word-feminine',
        text: 'text-word-feminine',
        shadow: 'shadow-word-feminine',
        label: 'Podstatné meno (ž)'
    },
    n: {
        bg: 'bg-word-neutral',
        text: 'text-word-neutral',
        shadow: 'shadow-word-neutral',
        label: 'Podstatné meno (s)'
    },
    action: {
        bg: 'bg-word-action',
        text: 'text-word-action',
        shadow: 'shadow-word-action',
        label: 'Sloveso'
    },
    default: {
        bg: 'bg-gray-500',
        text: 'text-gray-500',
        shadow: 'shadow-gray-200',
        label: 'Slovo'
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
