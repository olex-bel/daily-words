import CardHeader from "./CardHeader";
import { useTranslation } from "react-i18next";
import { getWordStyle } from "~/features/learning/utils/card";
import type { WordEntry } from "../services/dailywords";


type CardFrontProps = {
    entry: WordEntry;
    onShowTranslation?: () => void;
}

export default function CardFront({ entry, onShowTranslation }: CardFrontProps) {
    const { t } = useTranslation();
    const { content, grammar, example } = entry;
    const style = getWordStyle(grammar);

    return (
        <div className={`h-full flex flex-col backface-hidden p-4 rotate-x-0 shadow-md ${style.shadow}`}>
            <CardHeader grammar={grammar} />
            <div className="uppercase text-4xl md:text-5xl font-extrabold text-ink text-center">
                {content}
            </div>
            <div className="flex-grow flex justify-center items-center">
                <p className="font-serif text-lg md:text-xl italic text-ink-light leading-relaxed">
                    {example}
                </p>
            </div>
            <button 
                className="bg-primary py-2 rounded-sm w-8/9 mx-auto block mt-8 text-white font-semibold hover:scale-105 transition-transform"
                onClick={onShowTranslation}
            >
                {t('learning.showTranslation')}
            </button>
        </div>
    );
}
