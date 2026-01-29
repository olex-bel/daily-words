import { getWordStyle } from "~/features/learning/utils/card";
import type { WordEntry } from "../services/dailywords";

type CardBackProps = {
    entry: WordEntry;
}

export default function CardBack({ entry }: CardBackProps) {
    const { content, meanings, grammar } = entry;
    const style = getWordStyle(grammar);

    return (
        <div className={`absolute inset-0 flex flex-col backface-hidden p-4 rotate-x-180 shadow-md ${style.shadow}`}>
            <div className="uppercase text-3xl md:text-4xl font-extrabold text-ink text-center mb-4 md:mb-6">
                {content}
            </div>

            <div className="space-y-4 flex-grow overflow-y-auto pr-3">
                {meanings.map((meaning, index) => (
                    <div key={index} className={`border-l-4 pl-4 py-1 transition-all hover:translate-x-1 ${style.border}`}>
                        <p className="text-lg md:text-xl font-bold leading-tight">{meaning.val}</p>
                        <p className="text-sm text-slate-500 italic mt-1">
                            {meaning.context}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}