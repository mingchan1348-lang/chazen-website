"use client";

import Link from "next/link";
import { footerItems, legalItems, site } from "@/lib/site";
import { useLanguage } from "@/lib/language";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="museum-site-footer">
      <div className="container">
        <div className="museum-footer-brand">
          <p className="display-title">{site.name}</p>
          <h2>{t("Tea. Return. Stillness.", "茶。回歸。靜心。")}</h2>
          <p>{t(
            "A modern cultural tea house for ritual, origin, stillness, and meaningful gifts.",
            "一間現代茶文化之家，關於儀式、源起、靜心與有意義的贈禮。"
          )}</p>
        </div>
        <div className="museum-footer-grid">
          <div>
            <p>{t("Explore", "探索")}</p>
            {footerItems.map((item) => (
              <Link key={item.href} href={item.href}>{t(item.label, item.labelZh)}</Link>
            ))}
          </div>
          <div>
            <p>{t("Our approach", "品牌理念")}</p>
            <span>{t("Chinese tea culture", "中國茶文化")}</span>
            <span>{t("Guided tea discovery", "引導式選茶")}</span>
            <span>{t("Calm daily ritual", "日常靜心儀式")}</span>
            <span>{t("Five Cups philosophy", "五盞理念")}</span>
            <span>{t("Meaningful gifting", "有意義的贈禮")}</span>
          </div>
          <div>
            <p>{t("Contact", "聯絡我們")}</p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <Link href="/contact">{t("General inquiry", "一般查詢")}</Link>
            <Link href="/b2b">{t("Private cultural gifting inquiry", "企業文化禮品洽詢")}</Link>
            <span>{t("Social channels are coming soon.", "社交媒體即將推出。")}</span>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-current/10 pt-6 text-xs opacity-60">
          <p>© {new Date().getFullYear()} Chazen 茶禪. {t("All rights reserved.", "版權所有。")}</p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label={t("Legal", "法律資訊")}>
            {legalItems.map((item) => (
              <Link key={item.href} href={item.href}>{t(item.label, item.labelZh)}</Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
