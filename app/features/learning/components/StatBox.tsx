
export default  function StatBox({ label, value, color, textColor }: { label: string, value: number, color: string, textColor: string }) {
    return (
        <div className="flex flex-col items-center">
            <div className={`w-full h-2 ${color} rounded-full mb-2 opacity-20`} />
            <span className={`text-2xl ${textColor}`}>{value}</span>
            <span className="text-[10px] font-bold text-ink-muted uppercase tracking-tighter">{label}</span>
        </div>
    );
}
