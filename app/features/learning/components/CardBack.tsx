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
            <div className="uppercase text-4xl md:text-5xl font-extrabold text-ink text-center">
                {content}
            </div>

            <div className="space-y-4 flex-grow overflow-y-auto">
                {meanings.map((meaning, index) => (
                    <div key={index} className="border-l-4 border-sky-500 pl-4 py-1">
                        <p className="text-2xl font-bold leading-tight">{meaning.val}</p>
                        <p className="text-sm text-slate-500 italic mt-1 leading-snug">
                            {meaning.context}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}