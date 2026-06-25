import { Suspense } from "react";
import { redirect, Await } from "react-router";
import { useTranslation } from "react-i18next";
import QuizPage from "~/features/quiz/components/QuizPage";
import { getWordsForQuiz, getDistractors } from "~/services/entryService"; 
import { RiLoader4Line } from "react-icons/ri";
import type { Route } from "./+types/quiz";

export async function clientLoader() {
    const words = await getWordsForQuiz();

    if (words.length === 0) {
       return redirect('/dashboard');
    }

    
    const firstWordId = words[0].id;
    const distractors = getDistractors(firstWordId);
    

    return { words, firstWordDistractors: distractors };
}

export default function Quiz({ loaderData }: Route.ComponentProps) {
    const { t } = useTranslation();
    const { words, firstWordDistractors } = loaderData;

    return (
        <>
            <title>{t("quiz.meta.title")}</title>
            <meta name="description" content={t("quiz.meta.description")} />
            <meta name="keywords" content={t("quiz.meta.keywords")} />

            <Suspense fallback={
                    <div className="flex items-center justify-center min-h-[60vh] w-full animate-spin text-ink">
                        <RiLoader4Line className="h-12 w-12" />
                    </div>
            }>
                <Await 
                    resolve={firstWordDistractors}
                    children={(resolvedDistractors) => <QuizPage words={words} firstQuestionDistractors={resolvedDistractors} />}
                />
            </Suspense>
        </>
    );
}
