"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/shared/i18n/config";
import { Photo } from "@/features/demo-engine/photo/photo";
import { getFreightT } from "../messages";
import { freightPhotos } from "../photos";
import { FREIGHT_ROOT } from "../slug";
import { useFreightStore } from "../store";
import { Lines, MutedTail } from "./brand";
import { BoxIcon, CloseIcon, FileIcon, HeadsetIcon, PlayIcon, ShieldIcon, ArrowIcon } from "./icons";
import { Reveal } from "./section";
import { btnPrimary, container, eyebrow, rtlSafe } from "./styles";

const featureIcons = [ShieldIcon, BoxIcon, FileIcon, HeadsetIcon] as const;
const featureKeys = ["insured", "fast", "customs", "manager"] as const;

// The hero of the source: the big two-line headline, one pill action and the play button, four promises under it,
// and a three-photo composition with a spinning ring, a floating client card and two avatars.
export function HeroSection({ locale }: { locale: Locale }) {
  const t = getFreightT(locale);
  const content = useFreightStore((state) => state.content);
  const root = `/${locale}${FREIGHT_ROOT}`;
  const [videoOpen, setVideoOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!videoOpen) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setVideoOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [videoOpen]);

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-x-clip bg-[linear-gradient(180deg,#ececee_0%,#f3f3f4_45%,#fff_100%)] pb-[150px] pt-[130px] max-[1024px]:pb-[130px] max-[1024px]:pt-[110px] max-[640px]:pb-[110px] max-[640px]:pt-[96px]"
    >
      <div className={container}>
        <div className="grid grid-cols-[1fr_1.05fr] items-center gap-[30px] max-[1024px]:grid-cols-1">
          <div>
            <Reveal>
              <p className={eyebrow}>{t("hero.eyebrow")}</p>
            </Reveal>
            <Reveal delay={1}>
              <h1
                id="hero-title"
                className={`my-[22px] text-[clamp(44px,6vw,82px)] font-normal leading-[1.02] tracking-[-0.035em] text-text max-[640px]:my-5 ${rtlSafe} rtl:leading-[1.3]`}
              >
                <MutedTail text={content.hero.title[locale]} className="font-medium" />
              </h1>
            </Reveal>
            <Reveal delay={2}>
              <p className="mb-9 max-w-[400px] text-[16.5px] leading-[1.55] text-text/85">
                {content.hero.subtitle[locale]}
              </p>
            </Reveal>
            <Reveal delay={3}>
              <div className="flex flex-wrap items-center gap-[22px]">
                <a href={`${root}#calculator`} className={btnPrimary}>
                  {t("hero.calculate")}
                  <ArrowIcon className="size-[18px] rtl:rotate-180" />
                </a>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  aria-label={t("hero.watchLabel")}
                  onClick={() => setVideoOpen(true)}
                  className="flex cursor-pointer items-center gap-3.5 border-0 bg-transparent text-start text-[13px] font-medium leading-[1.35] text-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                >
                  <i className="lg-pulse relative grid size-[52px] shrink-0 place-items-center rounded-full bg-surface shadow-[0_10px_40px_rgba(17,17,17,0.06)] transition-transform duration-[250ms] hover:scale-[1.08] motion-reduce:transition-none">
                    <PlayIcon className="size-4" />
                  </i>
                  <span>
                    <Lines text={t("hero.watch")} />
                  </span>
                </button>
              </div>
            </Reveal>
            <Reveal delay={4}>
              <div className="mt-[58px] grid max-w-[560px] grid-cols-4 gap-[18px] max-[640px]:grid-cols-2 max-[640px]:gap-6">
                {featureKeys.map((key, index) => {
                  const Icon = featureIcons[index] ?? ShieldIcon;
                  return (
                    <div key={key} className="feat">
                      <Icon className="mb-3 size-[26px] text-text" />
                      <p className="text-[11.5px] leading-[1.4] text-text/70">{t(`hero.features.${key}`)}</p>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>

          <Reveal delay={2} className="max-[1024px]:mt-5">
            <div className="relative h-[560px] max-[1024px]:mx-auto max-[1024px]:h-[520px] max-[1024px]:w-full max-[1024px]:max-w-[640px] max-[640px]:h-[430px]">
              <div
                aria-hidden="true"
                className="lg-spin absolute start-[10%] top-[60px] size-[150px] rounded-full border border-dashed border-border max-[640px]:hidden"
              />

              <div className="group absolute end-0 top-0 h-[350px] w-[84%] overflow-hidden rounded-[200px_28px_28px_28px] shadow-[0_18px_50px_rgba(17,17,17,0.10)] max-[640px]:h-[270px] max-[640px]:w-[88%]">
                <Photo
                  photo={freightPhotos.airplane}
                  locale={locale}
                  priority
                  widths={[480, 800, 1200]}
                  sizes="(min-width: 1024px) 45vw, 88vw"
                  className="grayscale contrast-[1.05] transition-transform duration-[1.2s] group-hover:scale-105 motion-reduce:transition-none"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(0,0,0,0.08))]" />
              </div>

              <div className="group absolute bottom-0 start-0 h-[250px] w-[62%] overflow-hidden rounded-[28px] shadow-[0_18px_50px_rgba(17,17,17,0.10)] max-[640px]:h-[190px] max-[640px]:w-[60%]">
                <Photo
                  photo={freightPhotos.ship}
                  locale={locale}
                  widths={[320, 640, 800]}
                  sizes="(min-width: 1024px) 32vw, 60vw"
                  className="grayscale contrast-[1.05] transition-transform duration-[1.2s] group-hover:scale-105 motion-reduce:transition-none"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(0,0,0,0.08))]" />
              </div>

              <div className="group absolute bottom-[30px] end-0 h-[170px] w-[30%] overflow-hidden rounded-[999px_999px_24px_24px] shadow-[0_18px_50px_rgba(17,17,17,0.10)] max-[640px]:bottom-5 max-[640px]:h-[130px] max-[640px]:w-[32%]">
                <Photo
                  photo={freightPhotos.port}
                  locale={locale}
                  widths={[240, 400]}
                  sizes="30vw"
                  className="grayscale transition-transform duration-[1.2s] group-hover:scale-105 motion-reduce:transition-none"
                />
              </div>

              <div className="lg-bob absolute end-[2%] top-[340px] z-[3] flex items-center gap-3.5 rounded-[20px] bg-surface px-5 py-4 shadow-[0_18px_50px_rgba(17,17,17,0.10)] max-[640px]:end-0 max-[640px]:top-[250px] max-[640px]:px-3.5 max-[640px]:py-3">
                <div className="flex">
                  <span className="size-9 overflow-hidden rounded-full border-2 border-surface bg-border">
                    <Photo
                      photo={freightPhotos.avatarDaniel}
                      locale={locale}
                      widths={[80, 120]}
                      sizes="36px"
                      fallback={false}
                      className="grayscale"
                    />
                  </span>
                  <span className="-ms-3 size-9 overflow-hidden rounded-full border-2 border-surface bg-border">
                    <Photo
                      photo={freightPhotos.avatarMarcus}
                      locale={locale}
                      widths={[80, 120]}
                      sizes="36px"
                      fallback={false}
                      className="grayscale"
                    />
                  </span>
                </div>
                <div>
                  <b className="block text-xl font-semibold leading-[1.1] text-text">
                    {t("hero.float.value")}
                  </b>
                  <small className="block text-[11.5px] leading-[1.3] text-muted">
                    <Lines text={t("hero.float.text")} />
                  </small>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {videoOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("video.label")}
          onClick={(event) => {
            if (event.target === event.currentTarget) setVideoOpen(false);
          }}
          className="lg-fade fixed inset-0 z-[100] grid place-items-center bg-[rgba(10,10,12,0.72)] p-5 backdrop-blur-[6px]"
        >
          <div className="relative w-[min(820px,100%)] rounded-[26px] bg-surface p-3.5">
            <button
              ref={closeRef}
              type="button"
              aria-label={t("video.close")}
              onClick={() => setVideoOpen(false)}
              className="absolute -end-2 -top-2 grid size-[42px] cursor-pointer place-items-center rounded-full border-0 bg-primary text-on-primary shadow-[0_6px_18px_rgba(0,0,0,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              <CloseIcon />
            </button>
            <div className="relative grid aspect-video place-items-center overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,#1c1c1f,#3a3a40)] text-center text-white">
              <div aria-hidden="true" className="absolute inset-0 opacity-25 grayscale">
                <Photo
                  photo={freightPhotos.video}
                  locale={locale}
                  widths={[480, 800, 1200]}
                  sizes="(min-width: 820px) 820px, 100vw"
                  fallback={false}
                />
              </div>
              <div className="relative px-5">
                <i className="mx-auto mb-3.5 grid size-[76px] place-items-center rounded-full bg-surface">
                  <PlayIcon className="ms-1 size-[26px] text-text" />
                </i>
                <b className="block text-lg font-semibold">{t("video.title")}</b>
                <p className="mt-1 text-[13px] opacity-70">{t("video.text")}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
