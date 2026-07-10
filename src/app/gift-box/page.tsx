import Link from "next/link";
import { ArrowRight, Check, Package, Send } from "lucide-react";
import { ProductVisual } from "@/components/ProductVisual";
import { SectionHeading } from "@/components/SectionHeading";
import { buildInquiryPath } from "@/lib/inquiry";
import { giftBoxItems, site } from "@/lib/site";

export const metadata = {
  title: "Tea Ritual Gift Box"
};

export default function GiftBoxPage() {
  return (
    <main>
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div>
            <p className="eyebrow">Hero product</p>
            <h1 className="display-title mt-4 text-5xl leading-[1] md:text-7xl">
              Chazen Tea Ritual Gift Box
            </h1>
            <p className="mt-6 text-2xl text-leaf">{site.price}</p>
            <p className="mt-6 text-lg leading-8 text-ink/66">
              A complete modern Chinese tea ritual gift: premium loose-leaf tea, compact
              teaware, guided ritual cards, and a quiet sound moment inside a refined
              outer gift box.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={buildInquiryPath({
                  type: "Personal gift",
                  message: "I would like to inquire about or pre-order the Chazen Tea Ritual Gift Box.",
                  source: "Gift box hero"
                })}
                className="button-primary"
              >
                Inquire or pre-order <ArrowRight size={17} />
              </Link>
              <Link href="/b2b" className="button-secondary">
                Request a B2B sample
              </Link>
            </div>
          </div>
          <ProductVisual />
        </div>
      </section>

      <section className="section bg-porcelain">
        <div className="container">
          <SectionHeading
            eyebrow="Box contents"
            title="Every element supports the first cup."
            copy="The gift box is designed to feel valuable before it is opened, then intimate once the ritual begins."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {giftBoxItems.map((item) => (
              <div key={item} className="premium-card bg-white p-6">
                <Check className="text-moss" size={20} />
                <p className="mt-5 text-lg font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-3">
          {[
            ["1", "Open", "The box opens with a quiet brand message and a clear ritual invitation."],
            ["2", "Listen", "Scan the QR card for a short Zen bowl sound ritual."],
            ["3", "Pour", "Prepare the first cup slowly and let the gift become an experience."]
          ].map(([step, title, copy]) => (
            <div key={step} className="border-t border-ink/12 pt-7">
              <p className="eyebrow">{step}</p>
              <p className="display-title mt-5 text-4xl text-leaf">{title}</p>
              <p className="mt-5 text-sm leading-7 text-ink/62">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-porcelain">
        <div className="container grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeading
            eyebrow="Perceived value"
            title="More than tea in a box."
            copy="Chazen combines a physical gift, a cultural story, and a guided first-use moment. The value is in the ritual the recipient can repeat long after the occasion."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Material", "A refined object with tea, teaware, and printed ritual pieces."],
              ["Emotional", "A slower first cup that marks arrival, gratitude, or a new beginning."],
              ["Memorable", "A gift with a sequence, sound cue, and story clients can retell."]
            ].map(([title, copy]) => (
              <article key={title} className="premium-card bg-white p-6">
                <p className="display-title text-2xl text-leaf">{title}</p>
                <p className="mt-4 text-sm leading-7 text-ink/62">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-stone">
        <div className="container grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="eyebrow">For private and agency gifting</p>
            <h2 className="display-title mt-4 text-4xl text-ink md:text-5xl">
              A compact luxury gift with a lasting ritual after the handover.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-ink/64">
              For real estate settlement gifting, add an agency congratulations card so
              the client receives a personal message alongside the Chazen ritual.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link href="/b2b" className="button-primary">
              Explore settlement gifting <Package size={17} />
            </Link>
            <Link
              href={buildInquiryPath({
                type: "Real estate settlement",
                message: "I would like to request a B2B sample for settlement gifting.",
                source: "Gift box B2B section"
              })}
              className="button-secondary"
            >
              Request a B2B sample <Send size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
