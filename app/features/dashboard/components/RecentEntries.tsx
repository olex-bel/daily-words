
import { useTranslation } from "react-i18next";
import Surface from "~/shared/components/ui/Surface";
import { formatDate } from "~/utils/date";
import type { RecentEntry } from "~/services/entryService";

type RecentEntriesProps = {
    entries: RecentEntry[];
}

export default function RecentEntries({ entries }: RecentEntriesProps) {
    const { t } = useTranslation();

    return (
        <section className="mt-12">
            <div className="flex justify-between items-center px-1">
                <h3 className="font-bold text-ink uppercase text-xs tracking-widest">
                    {t('dashboard.lastAddedWords')}
                </h3>
            </div>
            
            <div className="mt-6 flex flex-col gap-3">
                {entries.map((entry) => (
                    <Surface key={entry.id} className="flex items-center justify-between p-4 cursor-default">
                        <span className="font-semibold text-ink">{entry.content}</span>
                        <span className="text-xs text-ink-muted italic">{entry.created_at && formatDate(entry.created_at)}</span>
                    </Surface>
                ))}
            </div>
        </section>
    );
}