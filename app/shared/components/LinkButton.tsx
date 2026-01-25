
import { Link } from "react-router";

type LinkButtonProps = {
    to: string;
    className?: string;
    children: React.ReactNode;
}

export default function LinkButton({ to, className = "", children }: LinkButtonProps) {
    return (
        <Link to={to} className={`inline-block text-center py-2 rounded-md font-semibold hover:scale-105 transition-transform ${className}`}>
            {children}
        </Link>
    );
}
