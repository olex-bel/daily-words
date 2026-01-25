import Button from "~/shared/components/Button";

type SessionSummaryProps = {
    total: number;
    results: {
        known: number;
        harder: number;
        unknown: number;
    };
    onRepeat: () => void;
    onExit: () => void;
}

export default function SessionSummary({ total, results, onRepeat, onExit }: SessionSummaryProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center gap-6">
            <h2 className="text-2xl font-bold">
                🎉 Сесію завершено!
            </h2>

            <div className="space-y-1">
                <p>Всього карток: {total}</p>
                <p>✅ Знаю: {results.known}</p>
                <p>⚠️ Важко: {results.harder}</p>
                <p>❌ Не знаю: {results.unknown}</p>
            </div>

            <div className="grid grid-flow-col auto-cols-fr gap-4">
                <Button
                    onClick={onRepeat}
                    className="px-6 py-3 bg-primary text-white"
                >
                    🔁 Повторити складні
                </Button>

                <Button
                    onClick={onExit}
                    className="px-6 py-3 bg-secondary text-white"
                >
                    📚 До наборів
                </Button>
            </div>
        </div>
    );
}
