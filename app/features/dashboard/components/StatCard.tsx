
import Surface from "~/shared/components/ui/Surface";
import type { ReactNode } from "react";

type StatCardProps = {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    children: ReactNode;
};

export default function StatCard({ label, value, children, icon }: StatCardProps) {
    return (
        <Surface className="border-none p-5 flex flex-col gap-1">
            <div className="flex justify-between items-start">
                <span className="text-2xl font-black text-ink">{value}</span>
                <span>{icon}</span>
            </div>
            <p className="font-bold text-ink text-sm mt-1">{label}</p>
            <div className="text-sm text-ink-muted tracking-wider font-semibold tracking-tighter">{children}</div>
        </Surface>
    );
}
