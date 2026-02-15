import { useTranslation } from "react-i18next";
import StatCard from "./StatCard";
import type { DashboardStats } from "../services/statsService";
import { RiGlobalLine, RiTrophyLine } from "react-icons/ri";

type StatsGridProps = {
    stats: DashboardStats;
}

export default function StatsGrid({ stats }: StatsGridProps) {
    const { t } = useTranslation();
    const completionRate = stats.total_system_words > 0 
        ? Math.round((stats.mastered_words / stats.total_system_words) * 100) 
        : 0;

    return (
        <div className="grid grid-cols-2 gap-4">
            <StatCard 
                label={t('dashboard.totalWords')} 
                value={stats.total_system_words} 
                description={t('dashboard.wordsAvailable')}
                icon={<RiGlobalLine className="text-2xl opacity-50" />} 
            />
            <StatCard 
                label={t('dashboard.personalProgress')}
                value={stats.mastered_words} 
                description={completionRate > 0 ? t('dashboard.learnedRate', { rate: completionRate }) : t('dashboard.noLearnedWords')} 
                icon={<RiTrophyLine className="text-2xl text-success" />} 
            />
        </div>
    );
}
