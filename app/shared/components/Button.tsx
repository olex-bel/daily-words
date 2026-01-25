
import type { ButtonHTMLAttributes } from "react";

type LinkButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className = "", children, ...props }: LinkButtonProps) {
    return (
        <button {...props} className={`rounded-md font-semibold hover:opacity-80 transition ${className}`}>
            {children}
        </button>
    );
}
