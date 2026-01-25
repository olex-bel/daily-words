import { useTranslation } from "react-i18next";
import LinkButton from "~/shared/components/LinkButton";
import wordcloud from "~/asset/wordcloud.svg";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="h-screen flex justify-center">
      <title>{t("home.meta.title")}</title>
      <meta name="description" content={t("home.meta.description")}/>
      <meta name="keywords" content={t("home.meta.keywords")} />

      <div className="h-screen flex flex-col justify-center md:flex-row items-center gap-8 w-[clamp(200px,90%,800px)]">
        <img src={wordcloud} alt={t("home.imageAlt")} className="w-2xs mask-y-from-70% mask-y-to-90%" />
        <section>
          <h1 className="text-[clamp(1rem,2vw,1.875rem)] font-bold text-center">{t('home.headline')}</h1>
          <p className="mt-4 text-justify text-ink-light">{t('home.intro1')} {t('home.intro2')}</p>

          <section className="flex flex-col gap-2 mt-4">
            <LinkButton to="/signup" className="bg-primary text-white w-full max-w-sm mx-auto">
              {t('home.getStartedButton')}
            </LinkButton>
            <LinkButton to="/signin" className="bg-secondary text-white w-full max-w-sm mx-auto">
              {t('home.signInButton')}
            </LinkButton>
          </section>
        </section>
        
      </div>
    </div>
  );
}
