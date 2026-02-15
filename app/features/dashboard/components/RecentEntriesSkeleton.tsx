
type RecentEntriesSkeletonProps = {
    count: number;
}

export default function RecentEntriesSkeleton({ count }: RecentEntriesSkeletonProps) {
    const entries = [...Array(count).keys()]

    return (
        <section className="space-y-4 animate-pulse">
            <div className="flex justify-between items-center px-1">
                <h3 className="font-bold text-slate-700 uppercase text-xs tracking-widest">
                </h3>
            </div>
            
            <div className="space-y-2">
                {entries.map((index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-2xl border shadow-sm border-slate-100 hover:border-sky-200 dark:border-slate-800 dark:hover:border-sky-700 transition-colors cursor-default">
                        <div className="h-5 w-32 bg-ink rounded-lg"></div>
                        <div className="h-3 w-20 bg-ink-muted rounded-md"></div>
                    </div>
                ))}
            </div>
        </section>
    );
}