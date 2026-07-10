import { ChapterHero } from "@/components/ChapterHero";
import { StillnessRoom } from "@/components/StillnessRoom";
import { MotionReveal } from "@/components/MotionReveal";

export const metadata = {
  title: "Stillness Mode"
};

export default function StillnessModePage() {
  return (
    <main>
      <ChapterHero
        chapter="Chapter 07 / Stillness Mode"
        title="Stillness Mode"
        chinese="靜心茶室"
        copy="A quiet digital tea room for one minute of breath, bowl sound, and a tea recommendation based on the mood you bring to the cup."
        image="chazen-tea-room-hero-v2.png"
        imageAlt="A dim, quiet tea room prepared for a moment of stillness."
      />

      <section className="section bg-porcelain">
        <div className="container">
          <MotionReveal className="mb-12 max-w-3xl">
            <p className="museum-label text-brass">Interactive Meditation Chamber</p>
            <h2 className="display-title mt-5 text-5xl leading-none text-ink md:text-7xl">
              Listen once. Breathe for sixty seconds.
            </h2>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <StillnessRoom />
          </MotionReveal>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="container grid gap-8 md:grid-cols-3">
          {[
            ["Sound", "A single bowl tone gives the mind a threshold."],
            ["Breath", "A quiet pulse marks each inhale and exhale for sixty seconds."],
            ["Tea", "The recommendation is not an upsell. It is a ritual pairing for the state you arrived in."]
          ].map(([title, copy], index) => (
            <MotionReveal key={title} delay={index * 0.06}>
              <article className="border-l border-ink/12 pl-6">
                <p className="museum-label text-moss">{title}</p>
                <p className="mt-6 text-lg leading-8 text-ink/68">{copy}</p>
              </article>
            </MotionReveal>
          ))}
        </div>
      </section>
    </main>
  );
}
