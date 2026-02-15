
import Surface from "~/shared/components/ui/Surface";

type StatCardProps = {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    description: string;
};

export default function StatCard({ label, value, description, color, icon }: StatCardProps) {
    return (
        <Surface className="border-none p-5 flex flex-col gap-1">
            <div className="flex justify-between items-start">
                <span className="text-2xl font-black text-ink">{value}</span>
                <span className={`${color}`}>{icon}</span>
            </div>
            <p className="font-bold text-ink text-sm mt-1">{label}</p>
            <p className="text-[10px] text-ink-muted uppercase font-semibold tracking-tighter">{description}</p>
        </Surface>
    );
}
