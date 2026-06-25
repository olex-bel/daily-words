import { useTranslation } from "react-i18next";
import { RiEmotionHappyLine, RiCloseCircleLine } from "react-icons/ri";


type QuizBackProps = {
    content: string;
    meaning: string;
    isCorrect: boolean;
};

export default function QuizBack({ content, isCorrect, meaning }: QuizBackProps) {
    const { t } = useTranslation();

    return (
        <div className="absolute inset-0 flex flex-col backface-hidden p-4 rotate-x-180 shadow-md hover:shadow-xl flex flex-col justify-center">
            <div>
                <div className="text-center font-semibold text-lg md:text-xl shrink-0">
                    {
                        isCorrect?
                            <div className="text-success-dark flex items-center justify-center gap-2">
                                <RiEmotionHappyLine className="animate-bounce" /> <span>{t('quiz.result.correct')}</span>
                            </div>
                            :
                            <div className="text-error-dark flex items-center justify-center gap-2">
                                <RiCloseCircleLine /> <span>{t('quiz.result.incorrect')}</span>
                            </div>
                    }
                </div>
                
                <div className="mt-4 mb-2 text-xl font-semibold text-center">{content}</div>   

                <div className="text-center my-2 text-lg">{meaning}</div>
            </div>
        </div>
    );
}
