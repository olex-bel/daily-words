import { useTranslation } from "react-i18next";
import ViewCenter from "~/shared/components/layout/ViewCenter";
import Surface from "~/shared/components/ui/Surface";
import Button from "~/shared/components/ui/Button";
import { RiBookShelfLine } from "react-icons/ri";

type ReviewSummaryProps = {
    total: number;
    onExit: () => void;
}

export default function ReviewSummary({ total, onExit }: ReviewSummaryProps) {
    const { t } = useTranslation();

    return (
        <ViewCenter>
            <Surface className="flex flex-col p-8 gap-6 items-center max-w-sm w-full text-center">
                <div className="bg-primary/10 p-4 rounded-full">
                    <RiBookShelfLine className="text-5xl text-primary" />
                </div>
                <h2 className="text-2xl font-bold uppercase tracking-tight">
                    {t('review.completedTitle')}
                </h2>
                <p className="text-ink-muted">
                    {t('review.completedMessage', { count: total })}
                </p>
                <Button onClick={onExit} className="w-full py-4 border border-line hover:bg-line/20">
                    {t('learning.summary.exitButton')}
                </Button>
            </Surface>
        </ViewCenter>
    );
}
