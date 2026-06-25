
export default function SummarySkeleton() {
    return (
        <div className="flex-grow flex flex-col justify-center items-center w-full animate-pulse">
            <div className="w-full max-w-sm h-[450px] bg-surface rounded-2xl p-8 flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-line rounded-full" />
                <div className="w-3/4 h-8 bg-line rounded-md" />
                <div className="w-1/2 h-4 bg-line rounded-md" />
                
                <div className="flex w-full gap-3 mt-4">
                    <div className="flex-1 h-16 bg-line rounded-lg" />
                    <div className="flex-1 h-16 bg-line rounded-lg" />
                </div>

                <div className="w-full h-12 bg-line rounded-xl mt-auto" />
            </div>
        </div>
    );
}