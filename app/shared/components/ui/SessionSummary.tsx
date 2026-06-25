import { useTranslation } from "react-i18next";
import { RiRefreshLine, RiBookShelfLine, RiTrophyLine } from "react-icons/ri";
import Button from "~/shared/components/ui/Button";
import ViewCenter from "~/shared/components/layout/ViewCenter";
import Surface from "~/shared/components/ui/Surface";
import type { ReactNode } from "react";

type SessionSummaryProps = {
    total: number;
    onRepeat: () => void;
    onExit: () => void;
    children: ReactNode;
}

export default function SessionSummary({ total, onRepeat, onExit, children }: SessionSummaryProps) {
    const { t } = useTranslation();

    return (
        <ViewCenter>
            <Surface className="flex flex-col p-8 gap-8 items-center max-w-sm w-full">
                <div className="text-center space-y-2">
                    <div className="flex justify-center mb-2">
                        <div className="bg-warning-light p-4 rounded-full animate-bounce duration-1000">
                            <RiTrophyLine className="text-5xl text-warning-ink" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight uppercase">
                        {t('summary.title')}
                    </h2>
                    <p className="text-ink-muted font-medium">{t('summary.message')}</p>
                </div>

                <div className="w-full">
                    {children}
                </div>

                <div className="w-full pt-2">
                   <p className="text-center text-sm text-ink-muted font-bold mb-4 uppercase tracking-widest">
                      {t('summary.totalCards', { total })}
                   </p>
                </div>

                <div className="flex flex-col gap-3 w-full">
                    <Button
                        onClick={onRepeat}
                        className="
                            w-full flex items-center justify-center gap-2 py-4 uppercase
                            bg-secondary text-secondary-ink hover:bg-secondary-hover
                            transition-all
                        "
                    >
                        <RiRefreshLine className="text-xl" />
                        {t('summary.repeatButton')}
                    </Button>

                    <Button
                        onClick={onExit}
                        className="
                            w-full flex items-center justify-center gap-2 py-4 uppercase
                            font-bold border border-line
                            transition-colors hover:bg-line/40
                        "
                    >
                        <RiBookShelfLine className="text-xl" />
                        {t('summary.exitButton')}
                    </Button>
                </div>
            </Surface>
        </ViewCenter>
    );
}
