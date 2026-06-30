import { useTranslation } from "react-i18next";
import Button from "~/shared/components/ui/Button";

type OptionItem = {
    id: number;
    content: string;
};

type QuizFrontProps = {
    question: string;
    options: OptionItem[];
    onOptionSelect: (optionId: number) => void;
}

export default function QuizFront({ question, options, onOptionSelect }: QuizFrontProps) {
    const { t } = useTranslation();
    return (
        <div className="h-full min-h-0 flex flex-col backface-hidden py-2 px-4 rotate-x-0 shadow-md hover:shadow-xl overflow-hidden">
            <div className="first-letter:uppercase text-primary-dark text-center font-bold mb-2 shrink-0">
                {question}
            </div>
            <div className="w-full overflow-y-auto pr-1 max-h-[270px] md:max-h-[330px] my-auto">
                <div role="radiogroup" aria-label={t('quiz.anwsersLabel')} className="w-full flex flex-col gap-2">
                    {
                        options.map((option, index) => {
                            const letter = String.fromCharCode(65 + index);
                            return (
                                <Button 
                                    key={option.id} 
                                    className="flex items-start gap-2 text-left text-sm md:text-base w-full p-2 border border-line bg-surface hover:bg-surface-hover"
                                    onClick={() => onOptionSelect(option.id)}
                                >
                                    <span className="font-semibold">{letter}.</span>
                                    <span>{option.content}</span>
                                </Button>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}
