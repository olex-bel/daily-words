
type NounGrammar = {
    partsOfSpeech: "noun";
    gender: "masculine" | "feminine" | "neutral";
    genitive: string;
    plural: string;
}

type VerbGrammar = {
    partsOfSpeech: "verb";
    aspect: "imperfective" | "perfective";
}

export type Grammar = NounGrammar | VerbGrammar;

export type WordData = {
    word: string;
    example: string;
    translation: string;
    grammar: Grammar;
}

export const WORD_STYLES = {
    masculine: {
        bg: "bg-word-masculine",
        text: "text-word-masculine",
        shadow: "shadow-word-masculine",
        label: "Podstatné meno (m)"
    },
    feminine: {
        bg: "bg-word-feminine",
        text: "text-word-feminine",
        shadow: "shadow-word-feminine",
        label: "Podstatné meno (ž)"
    },
    neutral: {
        bg: "bg-word-neutral",
        text: "text-word-neutral",
        shadow: "shadow-word-neutral",
        label: "Podstatné meno (s)"
    },
    action: {
        bg: "bg-word-action",
        text: "text-word-action",
        shadow: "shadow-word-action",
        label: "Sloveso"
    },
    default: {
        bg: "bg-gray-500",
        text: "text-gray-500",
        shadow: "shadow-gray-200",
        label: "Slovo"
    }
} as const;

export function getWordStyle(grammar: Grammar) {
    if (grammar.partsOfSpeech === "noun") {
        return WORD_STYLES[grammar.gender] ?? WORD_STYLES.default;
    }
    if (grammar.partsOfSpeech === "verb") {
        return WORD_STYLES.action;
    }
    return WORD_STYLES.default;
}
