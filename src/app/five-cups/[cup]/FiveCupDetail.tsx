"use client";

import type { FiveCup } from "@/app/five-cups/fiveCupsData";
import { useLanguage } from "@/lib/language";

const firstPackContents = [
  { en: "Curated starter tea", zh: "精選入門茶" },
  { en: "Tea-Mind result card", zh: "茶心測試結果卡" },
  { en: "Simple brewing guide", zh: "簡易沖泡指南" }
];

export function FiveCupPhilosophy({ cup }: { cup: FiveCup }) {
  const { t, language } = useLanguage();

  return (
    <article className="chazen-subpage-note five-cups-detail-note">
      <h3>{cup.english}</h3>
      <p lang={language === "zh" ? "zh-Hant" : undefined}>{t(cup.modernStateEn, cup.modernState)}</p>
      <div lang={language === "zh" ? "zh-Hant" : undefined}>
        {(language === "zh" ? cup.mainCopy : cup.mainCopyEn).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}

export function FiveCupProductBridge({ cup }: { cup: FiveCup }) {
  const { t, language } = useLanguage();

  return (
    <article className="chazen-subpage-card faculty-product-bridge">
      <span>{t("A$25 First Pack", "A$25 初次體驗包")}</span>
      <h3>
        {t(
          `A simple first step after ${cup.english}`,
          `${cup.tab}之後，一個簡單的第一步`
        )}
      </h3>
      <p>
        {t(
          `This pack turns the ${cup.english.toLowerCase()} idea into a practical first tea ritual: one approachable tea direction, one short guide, and one result card to keep the meaning close.`,
          `這個體驗包，將「${cup.tab}」的理念轉化為實際可行的第一場茶儀式：一個容易入門的茶方向、一份簡短指南，以及一張讓意義常伴左右的結果卡。`
        )}
      </p>
      <ul>
        {firstPackContents.map((item) => (
          <li key={item.en}>{t(item.en, item.zh)}</li>
        ))}
      </ul>
    </article>
  );
}
