import { useReducer, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import LearningSession from "./LearningSession";
import PorgressBar from "~/shared/components/ProgressBar";
import NoWords from "./NoWords";
import type { LearningState, LearningAction, Answer } from "~/features/learning/types";
import type { WordEntry } from "~/features/learning/services/dailywords";

const SessionSummary = lazy(() => import('./SessionSummary'));

type LearningPageProps = {
    words: WordEntry[];
};

const learningReducer = (state: LearningState, action: LearningAction) => {
    switch (action.type) {
        case 'ANSWER':
            const { answer, isLast } = action.payload;
            return {
                ...state,
                [answer]: state[answer] + 1,
                completed: isLast,
                currentIndex: isLast ? state.currentIndex : state.currentIndex +1,
            };
        default:
            return state;
    }
};

export default function LearningPage({ words }: LearningPageProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [state, reducer] = useReducer(learningReducer, {
        known: 0,
        harder: 0,
        unknown: 0,
        currentIndex: 0,
        completed: false,
    });
    const total = words.length;

    function handleAnswer(type: Answer) {
        const isLastWord = state.currentIndex + 1 >= total;

        reducer({ type: 'ANSWER', payload: { answer: type, isLast: isLastWord } });
    }

    if (total === 0) {
        return <NoWords />;
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-2 md:p-4">
                <Link to="/dashboard" className="no-underline hover:underline">{t('learning.finishButton')}</Link>
                <div className="flex items-center gap-4">
                    <PorgressBar value={state.currentIndex + 1} max={total} className="md:w-40" />
                    <span>
                        {state.completed? (
                            <span className="text-green-600 flex items-center gap-1">
                                {total} / {total}
                            </span>)
                            : 
                            `${state.currentIndex + 1} / ${total}`
                        }
                    </span>
                </div>
            </div>

            <div className="flex-grow flex flex-col justify-center items-center">
                {!state.completed ? (
                    <LearningSession
                        entry={words[state.currentIndex]}
                        onAnswer={handleAnswer}
                    />
                ) : (
                    <Suspense fallback={<div>Loading...</div>}>
                        <SessionSummary
                            total={total}
                            results={state}
                            onRepeat={() => {}}
                            onExit={() => navigate('/dashboard')}
                        />
                    </Suspense>
                )}
            </div>
        </div>
    );
}