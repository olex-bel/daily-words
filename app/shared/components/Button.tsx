
import type { ButtonHTMLAttributes } from "react";

type ButtonVariants = 'primary';

type LinkButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariants;
    icon?: React.ReactNode;
};

export default function Button({ className = "", children, variant, icon, ...props }: LinkButtonProps) {
    let variantClasses = '';

    switch (variant) {
        case 'primary':
            variantClasses = 'bg-primary text-white hover:brightness-90';
            break;
        default:
            variantClasses = '';
    }

    if (icon) {
        className += ' inline-flex items-center';
    }

    return (
        <button {...props} className={`rounded-md font-semibold transition-all active:scale-95 shadow-sm ${className} ${variantClasses}`}>
            {icon && <span className="mr-2 inline-flex">{icon}</span>}
            {children}
        </button>
    );
}
