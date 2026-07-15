"use client";

import Link from "next/link";
import { Gift, Leaf, MessageCircle, Sparkles, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/lib/language";

const paths = {
  teaTest: "/tea-test",
  ritual: "/tea-ritual",
  gift: "/gift-box",
  contact: "/contact"
};

export function TeaCompanion() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const onTest = pathname?.includes("tea-test");
  const onContact = pathname?.includes("contact");
  const message = onTest
    ? t(
        "Take your time. When you finish, I can help you continue with your tea match.",
        "慢慢來。完成測試後，我會幫你延續你的茶葉配對。"
      )
    : onContact
      ? t(
          "Need a little direction before you enquire? I can point you to the right place.",
          "查詢前想先了解多一點嗎？我可以帶你到合適的地方。"
        )
      : t(
          "Hello, I’m Cha — your quiet tea companion. Where would you like to begin?",
          "你好，我是茶，一位安靜的茶友。你想由哪裡開始？"
        );

  return (
    <aside className="tea-companion" aria-label={t("Chazen tea guide", "Chazen 茶導覽員")}>
      {open ? (
        <section className="tea-companion-panel" aria-live="polite">
          <div className="tea-companion-head">
            <div className="tea-companion-mark" aria-hidden="true">
              <Leaf size={18} />
            </div>
            <div>
              <strong>Cha</strong>
              <span>{t("Tea companion", "茶友導覽員")}</span>
            </div>
            <button
              type="button"
              className="tea-companion-close"
              onClick={() => setOpen(false)}
              aria-label={t("Close tea guide", "關閉茶導覽員")}
            >
              <X size={16} />
            </button>
          </div>
          <p>{message}</p>
          <div className="tea-companion-actions">
            <Link href={paths.teaTest} onClick={() => setOpen(false)}>
              <Sparkles size={15} />
              {t("Find my tea", "找適合我的茶")}
            </Link>
            <Link href={paths.gift} onClick={() => setOpen(false)}>
              <Gift size={15} />
              {t("Choose a gift", "挑選禮物")}
            </Link>
            <Link href={onContact ? paths.ritual : paths.contact} onClick={() => setOpen(false)}>
              <MessageCircle size={15} />
              {onContact ? t("Explore a ritual", "探索茶儀式") : t("Ask Chazen", "聯絡 Chazen")}
            </Link>
          </div>
        </section>
      ) : null}
      <button
        type="button"
        className="tea-companion-launcher"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label={open ? t("Close Cha", "關閉茶") : t("Open Cha, your tea guide", "開啟茶導覽員")}
      >
        <span className="tea-companion-steam" aria-hidden="true" />
        <span className="tea-companion-cup" aria-hidden="true"><Leaf size={18} /></span>
        <span className="tea-companion-label">Cha</span>
      </button>
    </aside>
  );
}
