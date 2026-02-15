import Surface from "~/shared/components/ui/Surface";
import { useTranslation } from "react-i18next";

type RecentEntriesSkeletonProps = {
    count: number;
}

export default function RecentEntriesSkeleton({ count }: RecentEntriesSkeletonProps) {
    const { t } = useTranslation();
    const entries = [...Array(count).keys()]

    return (
        <section className="mt-12">
            <div className="flex justify-between items-center px-1">
                <h3 className="font-bold text-ink uppercase text-xs tracking-widest">
                    {t('dashboard.lastAddedWords')}
                </h3>
            </div>
        
            <div className="mt-6 flex flex-col gap-3">
                {entries.map((index) => (
                    <Surface key={index} className="flex items-center justify-between p-4 cursor-default">
                        <div className="h-5 w-32 bg-ink/5"></div>
                        <div className="h-3 w-20 bg-ink/5"></div>
                    </Surface>
                ))}
            </div>
        </section>
    );
}