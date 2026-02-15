import { getWordStyle } from "../utils/card";
import type { GrammarDetails } from "../../../services/entryService";

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
    const  dot = <span className="text-ink-muted">•</span>;
    const style = getWordStyle(grammar);

    return (
        <div className="flex items-center gap-2 text-ink-muted">
            <span className="italic">{posLabels[grammar.pos] || grammar.pos}</span>
            {grammar.pos === 'verb' && (
                <>
                    {dot}
                    <span>
                        {grammar.aspect === "pf" ? "dok." : "ned."}
                    </span>
                </>
            )}

            {grammar.pos === 'noun' && (
                <>
                    {dot}
                    <span className={style.text}>{grammar.gender}</span>
                    {grammar.genitive && <>{dot}<span className="lowercase">G: -{grammar.genitive.slice(-2)}</span></>}
                    {grammar.plural && <>{dot}<span className="lowercase">PL: -{grammar.plural.slice(-2)}</span></>}
                </>
            )}
        </div>
    );
}