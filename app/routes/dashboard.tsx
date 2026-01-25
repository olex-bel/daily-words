import { useTranslation } from "react-i18next";
import type { Route } from "./+types/dashboard";


export default function Dashboard({ loaderData }: Route.ComponentProps) {
    const { t } = useTranslation();

    return (
        <div>
            <title>{t("dashboard.meta.title")}</title>
            <meta name="description" content={t("dashboard.meta.description")}/>
            <meta name="keywords" content={t("dashboard.meta.keywords")} />
        </div>
    )
}