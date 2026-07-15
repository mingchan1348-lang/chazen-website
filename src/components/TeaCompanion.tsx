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
    <aside className="fixed bottom-5 right-5 z-[70] grid justify-items-end gap-3 max-sm:bottom-3.5 max-sm:right-3.5" aria-label={t("Chazen tea guide", "Chazen 茶導覽員")}>
      {open ? (
        <section className="w-[min(19rem,calc(100vw-2.5rem))] rounded-2xl border border-[#5b3a24]/20 bg-[#fffcf5] p-4 text-[#2a2722] shadow-[0_18px_44px_rgba(23,23,19,0.22)]" aria-live="polite">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-[50%_50%_46%_46%] bg-[#d1a956] text-[#173225]" aria-hidden="true">
              <Leaf size={18} />
            </div>
            <div>
              <strong className="block font-[var(--font-serif)] text-[1.35rem] leading-none">Cha</strong>
              <span className="block text-xs leading-5 text-[#2a2722]/65">{t("Tea companion", "茶友導覽員")}</span>
            </div>
            <button type="button" className="grid h-8 w-8 place-items-center rounded-full text-[#2a2722]/55 hover:bg-[#b9823a]/10 hover:text-[#6f4a32] focus-visible:bg-[#b9823a]/10 focus-visible:outline-none" onClick={() => setOpen(false)} aria-label={t("Close tea guide", "關閉茶導覽員")}>
              <X size={16} />
            </button>
          </div>
          <p className="my-3 text-sm leading-6 text-[#2a2722]/75">{message}</p>
          <div className="grid gap-2">
            <Link href={paths.teaTest} onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-[0.6rem] bg-[#f3ebdf] px-3 py-2.5 text-[0.82rem] font-bold text-[#284a38] hover:bg-[#e6d8c1] focus-visible:bg-[#e6d8c1] focus-visible:outline-none">
              <Sparkles size={15} /> {t("Find my tea", "找適合我的茶")}
            </Link>
            <Link href={paths.gift} onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-[0.6rem] bg-[#f3ebdf] px-3 py-2.5 text-[0.82rem] font-bold text-[#284a38] hover:bg-[#e6d8c1] focus-visible:bg-[#e6d8c1] focus-visible:outline-none">
              <Gift size={15} /> {t("Choose a gift", "挑選禮物")}
            </Link>
            <Link href={onContact ? paths.ritual : paths.contact} onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-[0.6rem] bg-[#f3ebdf] px-3 py-2.5 text-[0.82rem] font-bold text-[#284a38] hover:bg-[#e6d8c1] focus-visible:bg-[#e6d8c1] focus-visible:outline-none">
              <MessageCircle size={15} /> {onContact ? t("Explore a ritual", "探索茶儀式") : t("Ask Chazen", "聯絡 Chazen")}
            </Link>
          </div>
        </section>
      ) : null}
      <button type="button" className="relative inline-flex min-h-[3.3rem] items-center gap-2 rounded-full border border-white/45 bg-[#1f4735] py-1.5 pl-1.5 pr-3 text-[#fbf7ef] shadow-[0_12px_28px_rgba(23,23,19,0.22)] transition hover:-translate-y-0.5 hover:bg-[#285942] focus-visible:-translate-y-0.5 focus-visible:bg-[#285942] focus-visible:outline-none" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-label={open ? t("Close Cha", "關閉茶") : t("Open Cha, your tea guide", "開啟茶導覽員")}>
        <span className="absolute -top-2 left-4 h-4 w-3 rotate-[15deg] rounded-full border-l border-[#d1a956]/85" aria-hidden="true" />
        <span className="grid h-10 w-10 place-items-center rounded-[50%_50%_46%_46%] bg-[#d1a956] text-[#173225]" aria-hidden="true"><Leaf size={18} /></span>
        <span className="text-sm font-extrabold tracking-[0.04em]">Cha</span>
      </button>
    </aside>
  );
}
