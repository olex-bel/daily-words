import GrammarInfo from "./GrammarInfo";
import { getWordStyle } from "~/utils/card";
import type { Grammar } from "~/utils/card";

type CardHeaderProps = {
    grammar: Grammar;
}

export default function CardHeader({ grammar }: CardHeaderProps) {
    const style = getWordStyle(grammar);

    return (
        <div className="flex items-center gap-3 mb-8">
            <div className={`h-4 w-1 rounded-full ${style.bg}`}></div>

            <div className="flex gap-2 text-[clamp(0.6rem,1vw,0.7rem)] font-black tracking-widest uppercase">
                <span className="text-sk-feminine">Podstatné meno</span>
                <GrammarInfo grammar={grammar} />
            </div>
        </div>
    );
}