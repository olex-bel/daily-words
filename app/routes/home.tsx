import { useTranslation } from "react-i18next";
import LinkButton from "~/shared/components/ui/LinkButton";
import CardFront from "~/features/learning/components/CardFront";
import wordcloud from "~/asset/wordcloud.svg";
import HeroVisual from "~/features/home/components/HeroVisual";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="h-screen flex justify-center">
      <title>{t("home.meta.title")}</title>
      <meta name="description" content={t("home.meta.description")}/>
      <meta name="keywords" content={t("home.meta.keywords")} />

      <div className="h-screen flex flex-col md:flex-row justify-center md:flex-row items-center gap-8">
        <section className="mt-4 md:mt-0 order-1 md:order-0 flex flex-col items-center md:items-start text-center md:text-left max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center leading-tight tracking-tighter">{t('home.headline')}</h1>
          <p className="mt-4 text-md text-ink-muted dark:text-zinc-400 leading-relaxed max-w-md">
            {t('home.intro1')} {t('home.intro2')}
          </p>

          <section className="flex flex-col sm:flex-row gap-3 mt-8 w-full sm:w-auto">
            <LinkButton to="/signup" className="bg-primary text-primary-ink px-8 py-4">
              {t('home.getStartedButton')}
            </LinkButton>
            <LinkButton to="/signin" className="bg-surface hover:bg-surface-hover shadow-md shadow-line px-8 py-4">
              {t('home.signInButton')}
            </LinkButton>
          </section>
        </section>
        
        <HeroVisual />
      </div>
    </div>
  );
}
