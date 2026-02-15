import { useTranslation } from "react-i18next";
import StatCard from "./StatCard";
import type { DashboardStats } from "../services/statsService";
import { RiGlobalLine, RiTrophyLine } from "react-icons/ri";

type StatsGridProps = {
    stats: DashboardStats;
}

export default function StatsGrid({ stats }: StatsGridProps) {
    const { t } = useTranslation();
    const wordsInProgress = stats.in_learning; 
    const mastered = stats.mastered_words;
    
    return (
        <div className="grid grid-cols-2 gap-4">
            <StatCard 
                label={t('dashboard.totalWords')} 
                value={stats.total_system_words} 
                icon={<RiGlobalLine className="text-2xl opacity-50" />} 
            >
                {t('dashboard.wordsAvailable')}
            </StatCard>
            <StatCard 
                label={t('dashboard.personalProgress')}
                value={stats.user_total_words} 
                icon={<RiTrophyLine className="text-2xl text-success opacity-50" />} 
            >
                {
                    stats.user_total_words > 0 ? (
                        <div className="flex flex-col gap-1 mt-1 leading-4">
                            <span className="text-secondary-dark">
                                {t('dashboard.status.inProgress')}: {wordsInProgress}
                            </span>
                            <span className="text-primary-dark">
                                {t('dashboard.status.mastered')}: {mastered}
                            </span>
                        </div>
                    ) : (
                        t('dashboard.status.noWordsYet')
                    )
                }
            </StatCard>
        </div>
    );
}
