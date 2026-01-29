
type PorgressBarProps = {
    className?: string;
    value: number;
    max: number;
};

export default function PorgressBar({ value, max, className='' }: PorgressBarProps) {
    const progressPercentage = (value / max) * 100;
    const barColor = `hsl(${100 + progressPercentage * 0.4}, 70%, 50%)`;

    return (
        <div className={`h-3 bg-gray-200 rounded-full overflow-hidden shadow-sm ${className}`}>
            <div 
                className="h-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%`, backgroundColor: barColor }}
            />
        </div>
    );
}
