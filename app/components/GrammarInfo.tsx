import type { Grammar } from "~/utils/card";

type GrammarInfoProps = {
    grammar: Grammar;
}

export default function GrammarInfo({ grammar }: GrammarInfoProps) {

    if (grammar.partsOfSpeech === "verb") {
        return (
            <div className="flex items-center gap-2 text-ink-light">
                <span className="text-ink-faint">•</span>
                <span>{grammar.aspect === 'perfective' ? 'dok.' : 'nedok.'}</span>
            </div>
        );
    }
    
    return (
        <div className="flex items-center gap-2 text-ink-light">
            <span className="text-ink-faint">•</span>
            <span>G: {grammar.genitive}</span>
            <span className="text-ink-faint">•</span>
            <span>Pl: {grammar.plural}</span>
        </div>
    );
}