import { useTranslation } from "react-i18next";
import DashboardHero from "~/features/dashboard/components/DashboardHero";
import StatsGrid from "~/features/dashboard/components/StatsGrid";
import SmartReview from "~/features/dashboard/components/SmartReview";
import { getDashboardStats } from "~/features/dashboard/services/statsService";
import type { Route } from "./+types/dashboard";    

export async function clientLoader() {
    const stats = await getDashboardStats();
    
    if (!stats) {
        throw new Response('Unable to load dashboard', { status: 500 });
    }

    return {
        stats,
    };
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
    const { t } = useTranslation();
    const { stats } = loaderData;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pt-6">
            <title>{t('dashboard.meta.title')}</title>
            <meta name="description" content={t('dashboard.meta.description')}/>
            <meta name="keywords" content={t('dashboard.meta.keywords')} />

            <DashboardHero />
            <SmartReview stats={stats} />
            <StatsGrid stats={stats} />
        </div>
    )
}