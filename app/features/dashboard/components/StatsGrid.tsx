import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import StatCard from "./StatCard";
import PorgressBar from "~/shared/components/ui/ProgressBar";
import { RiLineChartLine, RiTrophyLine } from "react-icons/ri";
import type { DashboardStats } from "../services/statsService";

type StatsGridProps = {
    stats: DashboardStats;
}

const POINTS_PER_LEVEL = 25;

export default function StatsGrid({ stats }: StatsGridProps) {
    const { t } = useTranslation();
    const totalPoints = stats.total_stages;

    const { currentLevel, progressInLevel, pointsToNext } = useMemo(()=> {
        return {
            currentLevel: Math.floor(totalPoints / POINTS_PER_LEVEL) + 1,
            progressInLevel: (totalPoints % POINTS_PER_LEVEL) * (100 / POINTS_PER_LEVEL),
            pointsToNext: POINTS_PER_LEVEL - (totalPoints % POINTS_PER_LEVEL),
        }
    }, [totalPoints])
    
    return (
        <div className="grid grid-cols-2 gap-4">
            <StatCard 
                label={t('dashboard.status.level')} 
                value={currentLevel} 
                icon={<RiLineChartLine className="text-2xl opacity-50" />} 
            >
                <PorgressBar value={progressInLevel} max={100} />

                <span className="text-tiny ink-muted">
                    {pointsToNext} {t('dashboard.status.toNextLevel')}
                </span>
            </StatCard>
            <StatCard 
                label={t('dashboard.personalProgress')}
                value={stats.user_total_words} 
                icon={<RiTrophyLine className="text-2xl text-success opacity-50" />} 
            >
                {
                    stats.user_total_words > 0 ? (
                        <div className="flex flex-col gap-1 mt-1 text-tiny font-medium">
                            <div className="flex justify-between">
                                <span className="text-secondary-dark">{t('dashboard.status.inProgress')}:</span>
                                <span>{stats.in_learning}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-ink-muted">{t('dashboard.status.mastered')}:</span>
                                <span className={stats.mastered_words > 0 ? "text-primary-dark font-bold" : ""}>
                                    {stats.mastered_words}
                                </span>
                            </div>
                        </div>
                    ) : (
                        t('dashboard.status.noWordsYet')
                    )
                }
            </StatCard>
        </div>
    );
}
