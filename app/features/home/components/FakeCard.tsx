import { RiStickyNoteLine, RiSpeakFill } from "react-icons/ri";

type FakeCardProps = {
    content: string;
    example: string;
};

export default function FakeCard({ content, example }: FakeCardProps) {
    return (
        <div className="bg-surface flex flex-col p-4 rotate-x-0 shadow-md overflow-hidden">
            <div className="first-letter:uppercase text-primary-dark text-center font-bold">
                {content}
            </div>
            <div className="flex-grow flex justify-center items-center overflow-hidden text-ellipsis">
                <p className="font-serif text-lg md:text-xl text-ink-muted leading-relaxed">
                    {example}
                </p>
            </div>
            <div className="h-10 flex justify-between items-center shrink-0">
                <RiSpeakFill className="w-6 h-6" />
                <div className="p-2">
                    <RiStickyNoteLine aria-hidden="true" focusable="false" className="w-6 h-6 text-ink" />
                </div>
            </div>
        </div>
    );
}