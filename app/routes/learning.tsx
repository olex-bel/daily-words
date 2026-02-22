import { redirect } from "react-router";
import { useTranslation } from "react-i18next";
import { getDailyEntries, MAX_DAILY_ENTRIES } from "~/services/entryService";
import LearningPage from "~/features/learning/components/LearningPage";
import type { Route } from "./+types/learning";

export async function clientLoader() {
    const words = await getDailyEntries(MAX_DAILY_ENTRIES);

    if (words.length === 0) {
       return redirect('/dashboard');
    }

    return { words };
}

export default function Learning({ loaderData }: Route.ComponentProps) {
    const { t } = useTranslation();
    const { words } = loaderData;
    return (
        <>
            <title>{t("learning.meta.title")}</title>
            <meta name="description" content={t("learning.meta.description")} />
            <meta name="keywords" content={t("learning.meta.keywords")} />
            <LearningPage mode="learn" words={words} />
        </>
    );
}
