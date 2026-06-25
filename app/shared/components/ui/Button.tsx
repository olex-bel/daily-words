
import type { ButtonHTMLAttributes } from "react";

type ButtonVariants = 'text';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariants;
    icon?: React.ReactNode;
};

export default function Button({ className = "", children, variant, icon, ...props }: ButtonProps) {
    const variantClasses =
        variant === 'text'
            ? 'border-none'
            : 'rounded-md';

    const iconClasses =
        icon
            ? 'inline-flex items-center'
            : '';

    return (
        <button {...props} className={`${className} ${variantClasses} ${iconClasses}`}>
            {icon && <span className="mr-2 inline-flex">{icon}</span>}
            {children}
        </button>
    );
}
