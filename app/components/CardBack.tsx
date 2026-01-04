import { getWordStyle } from "~/utils/card";
import type { WordData } from "~/utils/card";

type CardBackProps = {
    data: WordData;
}

export default function CardBack({ data }: CardBackProps) {
    const { word, translation, grammar } = data;
    const style = getWordStyle(grammar);

    return (
        <div className={`absolute inset-0 flex flex-col backface-hidden p-4 rotate-x-180 shadow-md ${style.shadow}`}>
            <div className="uppercase text-4xl md:text-5xl font-extrabold text-ink text-center">
                {word}
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
                <h2 className="text-4xl font-black text-accent tracking-tight">
                    {translation}
                </h2>
            </div>

            <div className="grid grid-cols-3 gap-3 w-full mt-6">
                <button className="py-3 rounded-xl bg-red-50 text-red-600 font-bold text-sm border border-red-100 active:scale-95 transition-transform">
                    Zle
                </button>
                <button className="py-3 rounded-xl bg-amber-50 text-amber-600 font-bold text-sm border border-amber-100 active:scale-95 transition-transform">
                    Ťažko
                </button>
                <button className="py-3 rounded-xl bg-green-50 text-green-600 font-bold text-sm border border-green-100 active:scale-95 transition-transform">
                    Dobre
                </button>
            </div>
        </div>
    );
}