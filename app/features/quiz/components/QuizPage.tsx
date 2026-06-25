
import { useReducer, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useQuizSession } from "../hooks/useQuizSession";
import Toast from "~/shared/components/ui/Toast";
import QuizSession from "./QuizSession";
import ProgressBar from "~/shared/components/ui/ProgressBar";
import SummarySkeleton from "~/shared/components/ui/SummarySkeleton";
import type { QuizEntry, Distractor } from "~/services/entryService";
import type { QuizAction, QuizState } from "../types";

const QuizSummary = lazy(() => import("./QuizSummary"));

type QuizPageProps = {
    words: QuizEntry[];
    firstQuestionDistractors: Distractor[];
};

const quizReducer = (state: QuizState, action: QuizAction) => {
    let updatedState = { ...state };

    switch (action.type) {
        case 'ANSWER':
            updatedState.known += action.payload.isCorrect ? 1 : 0;
            updatedState.unknown += !action.payload.isCorrect ? 1 : 0;
            break;

        default:
            return state;
    }

    const { isLast } = action.payload || {};
    
    return {
        ...updatedState,
        completed: isLast ?? state.completed,
        currentIndex: isLast ? state.currentIndex : state.currentIndex + 1,
    };
}

export default function QuizPage({ words, firstQuestionDistractors }: QuizPageProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(quizReducer, {
        known: 0,
        unknown: 0,
        currentIndex: 0,
        completed: false,
    });
    
    const { distractors, isLoading, error, setError, submitAnswer } = useQuizSession(firstQuestionDistractors);
    const total = words.length;
    const isLast = state.currentIndex + 1 >= total;
    const currentWord = words[state.currentIndex];
    
 
    const handleAnswerSubmit = async (optionId: number) => {
        const isAnswerCorrect = currentWord.id === optionId;
        const nextWord = isLast? null : words[state.currentIndex + 1];

        submitAnswer(currentWord, nextWord, isAnswerCorrect, () => {
            dispatch({ type: 'ANSWER', payload: { isCorrect: isAnswerCorrect, isLast } });
        });
    };
    

    return (
        <div className="relative flex flex-col h-full">
            <div className="flex items-center justify-between p-2 md:p-4">
                <Link to="/dashboard" className="no-underline hover:underline">← {t('learning.finishButton')}</Link>
                <div className="flex items-center gap-4">
                    <ProgressBar value={state.currentIndex + 1} max={total} className="w-24 md:w-40" />
                    {state.completed? (
                        <span className="text-green-600 flex items-center gap-1">
                            {total} / {total}
                        </span>)
                        : 
                        (<span>{state.currentIndex + 1} / {total}</span>)
                    }
                </div>
            </div>
            {state.completed?
                 <Suspense fallback={<SummarySkeleton/>}>
                     <QuizSummary 
                        total={total}
                        results={state}
                        onRepeat={() => navigate('/review', { replace: true })}
                        onExit={() => navigate('/dashboard', { replace: true })}    
                     />
                 </Suspense>
                :
                <QuizSession 
                    isLast={isLast} 
                    isLoading={isLoading} 
                    question={currentWord} 
                    distractors={distractors} 
                    onAnswerSubmit={handleAnswerSubmit} 
                />
            }

            {error && <Toast onClose={() => setError(null)}>{error}</Toast>}
        </div>
    );
}
