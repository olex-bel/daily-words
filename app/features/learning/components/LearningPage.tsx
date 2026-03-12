import { useReducer, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import { useEntryRating } from "../hooks/useEntryRating";
import LearningSession from "./LearningSession";
import PorgressBar from "~/shared/components/ui/ProgressBar";
import Toast from "~/shared/components/ui/Toast";
import type { LearningState, LearningAction, Answer } from "~/features/learning/types";
import type { Entry } from "~/services/entryService";

const LearningSummary = lazy(() => import('./SessionSummary'));
const ReviweSummary = lazy(() => import('./ReviewSummary'));

type LearningPageProps = {
    mode: 'review' | 'learn';
    words: Entry[];
};

const learningReducer = (state: LearningState, action: LearningAction) => {
    const { isLast } = action.payload || {};

    switch (action.type) {
        case 'ANSWER':
            const { answer } = action.payload;
            return {
                ...state,
                [answer]: state[answer] + 1,
                completed: isLast,
                currentIndex: isLast ? state.currentIndex : state.currentIndex +1,
            };
        case 'NEXT':
            return {
                ...state,
                completed: isLast,
                currentIndex: isLast ? state.currentIndex : state.currentIndex + 1,
            };
        default:
            return state;
    }
};

export default function LearningPage({ words, mode }: LearningPageProps) {
    const { error, setError, submitRating, isPending } = useEntryRating();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(learningReducer, {
        know: 0,
        hard: 0,
        unknown: 0,
        currentIndex: 0,
        completed: false,
    });
    const total = words.length;

    const handleAnswer= async (id: number, rating: Answer) => {
        if (mode === 'review') {
            dispatch({ type: 'NEXT', payload: { isLast: state.currentIndex + 1 >= total } });
            return;
        }

        submitRating(id, rating, () => {
            dispatch({ type: 'ANSWER', payload: { answer: rating, isLast: state.currentIndex + 1 >= total } });
        });
    }

    return (
        <div className="relative flex flex-col h-full">
            <div className="flex items-center justify-between p-2 md:p-4">
                <Link to="/dashboard" className="no-underline hover:underline">← {t('learning.finishButton')}</Link>
                <div className="flex items-center gap-4">
                    <PorgressBar value={state.currentIndex + 1} max={total} className="w-24 md:w-40" />
                    {state.completed? (
                        <span className="text-green-600 flex items-center gap-1">
                            {total} / {total}
                        </span>)
                        : 
                        (<span>{state.currentIndex + 1} / {total}</span>)
                    }
                </div>
            </div>

            <div className="flex-grow flex flex-col justify-center items-center">
                {!state.completed ? (
                    <LearningSession
                        mode={mode}
                        isPending={isPending}
                        entry={words[state.currentIndex]}
                        onAnswer={handleAnswer}
                    />
                ) : (
                    <Suspense fallback={<div>Loading...</div>}>
                        {mode === 'learn' ? (
                            <LearningSummary
                                total={total}
                                results={state}
                                onRepeat={() => {}}
                                onExit={() => navigate('/dashboard', { replace: true })}
                            />
                        ) : (
                            <ReviweSummary
                                total={total}
                                onExit={() => navigate('/dashboard', { replace: true })}
                            />
                        )}
                    </Suspense>
                )}
            </div>

            {error && <Toast onClose={() => setError(null)}>{error}</Toast>}
        </div>
    );
}