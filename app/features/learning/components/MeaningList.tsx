import { useState, useEffect, useRef } from "react";
import type { EntryMeaning } from "~/services/entryService";
import type { MouseEvent } from "react";

type MeaningListProps = {
    meanings: EntryMeaning[];
}

export default function MeaningList({ meanings }: MeaningListProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScroll, setCanScroll] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const showBottomMask = canScroll && isAtTop;
    const listCss = canScroll ? '' : 'mx-auto';
    const containerCss = showBottomMask ? '[mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]' : '';

    const handleScroll = () => {
        const el = scrollRef.current;
        if (!el) {
            return;
        }
        setIsAtTop(el.scrollTop < 5);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) {
            return;
        }
        setCanScroll(el.scrollHeight > el.clientHeight);
    }, [meanings]);

    return (
        <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className={`space-y-4 flex-grow overflow-y-auto pr-3 flex flex flex-col ${containerCss}`}
        >
            <ol className={`list-decimal list-inside ${listCss} space-y-5 marker:text-primary-dark cursor-default`} 
                onClick={(e: MouseEvent) => e.stopPropagation()}
            >
                {meanings.map((meaning, index) => (
                    <li key={index} className="transition-all hover:translate-x-1">
                        <span className="text-md md:text-xl font-bold leading-none">{meaning.val}</span>
                        <p className="text-sm md:text-base text-ink-muted mt-1 font-medium leading-relaxed">
                            {meaning.context}
                        </p>
                    </li>
                ))}
            </ol>
        </div>
    )
}
