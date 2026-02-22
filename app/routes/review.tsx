import { useTranslation } from "react-i18next";
import { redirect } from "react-router";
import LearningPage from "~/features/learning/components/LearningPage";
import { getDifficultEntries } from "~/services/entryService";
import type { Route } from "./+types/review";

export async function clientLoader() {
    const words = await getDifficultEntries();

    if (words.length === 0) {
        return redirect('/dashboard');
    }

    return { words };
}

export default function Review({ loaderData }: Route.ComponentProps) {
    const { words } = loaderData;
    const { t } = useTranslation();

    return (
        <>
            <title>{t("review.meta.title")}</title>
            <meta name="description" content={t("review.meta.description")} />
            <meta name="keywords" content={t("review.meta.keywords")} />
            <LearningPage mode="review" words={words} />
        </>
    );
}