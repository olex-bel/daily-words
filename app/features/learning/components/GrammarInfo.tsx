import type { GrammarDetails } from "../services/dailywords";

type GrammarInfoProps = {
    grammar: GrammarDetails;
}

const posLabels: Record<string, string> = {
  noun: "podst. meno",
  verb: "sloveso",
  adj: "príd. meno",
  particle: "častica",
  prep: "predložka"
};

export default function GrammarInfo({ grammar }: GrammarInfoProps) {    
    const  dot = <span className="text-ink-faint">•</span>;

    return (
        <div className="flex items-center gap-2 text-ink-light">
            <span className="opacity-50 italic">{posLabels[grammar.pos] || grammar.pos}</span>
            {grammar.pos === 'verb' && (
                <>
                    {dot}
                    <span className="text-ink-faint">
                        {grammar.aspect === "pf" ? "dok." : "ned."}
                    </span>
                </>
            )}

            {grammar.pos === 'noun' && (
                <>
                    {dot}
                    <span className="text-sky-600">{grammar.gender}</span>
                    {grammar.genitive && <>{dot}<span className="lowercase opacity-70">G: -{grammar.genitive.slice(-2)}</span></>}
                    {grammar.plural && <>{dot}<span className="lowercase opacity-70">PL: -{grammar.plural.slice(-2)}</span></>}
                </>
            )}
        </div>
    );
}