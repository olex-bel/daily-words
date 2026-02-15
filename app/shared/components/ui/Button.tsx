
import type { ButtonHTMLAttributes } from "react";

type ButtonVariants = 'primary' | 'text';

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
        case 'text':
            variantClasses = 'border-none';
            break;
        default:
            variantClasses = 'rounded-md font-semibold transition-all active:scale-95 shadow-sm';
    }

    if (icon) {
        className += ' inline-flex items-center';
    }

    return (
        <button {...props} className={`${className} ${variantClasses}`}>
            {icon && <span className="mr-2 inline-flex">{icon}</span>}
            {children}
        </button>
    );
}
