
type SurfaceProps = {
    className?: string;
    children: React.ReactNode;
};

export default function Surface({ className, children }: SurfaceProps) {
    return (
        <div className={`shadow-lg rounded-lg bg-surface ${className} dark:border dark:border-white/10 dark:shadow-none`}>
            {children}
        </div>
    );
}
