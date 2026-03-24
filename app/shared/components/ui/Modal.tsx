import { createPortal } from "react-dom";

type ModalProps = {
    children: React.ReactNode;
    ref: React.RefObject<HTMLDialogElement | null>;
    onClose?: () => void;
}


export default function Modal({ children, ref, onClose }: ModalProps) {
    return createPortal(
        <dialog ref={ref} className="m-auto p-6 shadow-lg rounded-lg bg-surface dark:border dark:border-white/10 dark:shadow-none" onCancel={onClose}>
            {children}
        </dialog>,
        document.getElementById("modal") as HTMLElement
    );
}