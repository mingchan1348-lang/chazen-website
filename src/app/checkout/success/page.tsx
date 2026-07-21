"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language";

export default function CheckoutSuccessPage() {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title = language === "zh" ? "訂單完成 | Chazen" : "Order Confirmed | Chazen";
  }, [language]);

  return (
    <main className="chazen-subpage flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <h1>{t("Thank you for your order", "感謝你的訂購")}</h1>
      <p>
        {t(
          "Your payment was successful. A confirmation has been sent to your email.",
          "付款成功。確認信件已寄送至你的電郵。"
        )}
      </p>
      <Link href="/tea-boxes" className="button-primary">
        {t("Continue exploring", "繼續探索")}
      </Link>
    </main>
  );
}
