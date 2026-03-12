
import type { HTMLAttributes } from "react";

type SurfaceProps = {
    className?: string;
    children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function Surface({ className, children, ...args }: SurfaceProps) {
    return (
        <div {...args} className={`shadow-lg rounded-lg bg-surface ${className} dark:border dark:border-white/10 dark:shadow-none`}>
            {children}
        </div>
    );
}
