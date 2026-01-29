import GrammarInfo from "./GrammarInfo";
import { getWordStyle } from "~/features/learning/utils/card";
import type { GrammarDetails } from "../services/dailywords";

type CardHeaderProps = {
    grammar: GrammarDetails;
}

export default function CardHeader({ grammar }: CardHeaderProps) {
    const style = getWordStyle(grammar);

    return (
        <div className="flex items-center gap-3 mb-8">
            <div className={`h-4 w-1 rounded-full ${style.bg}`}></div>

            <div className="flex gap-2 text-[clamp(0.6rem,1vw,0.7rem)] font-black tracking-widest uppercase">
                <GrammarInfo grammar={grammar} />
            </div>
        </div>
    );
}