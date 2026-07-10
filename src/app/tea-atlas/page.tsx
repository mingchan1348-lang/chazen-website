import { ChapterHero } from "@/components/ChapterHero";
import { TeaAtlasExhibit } from "@/components/TeaAtlasExhibit";
import { MotionReveal } from "@/components/MotionReveal";

export const metadata = {
  title: "Tea Atlas"
};

export default function TeaAtlasPage() {
  return (
    <main>
      <ChapterHero
        chapter="Chapter 06 / Tea Atlas"
        title="Tea Atlas"
        chinese="茶之地圖"
        copy="A living map of mountain, mist, altitude, processing, and ritual. The leaf remembers where it came from."
        image="chazen-shanshui-chapter-2.png"
        imageAlt="A misted mountain and water landscape evoking the origins of Chinese tea."
      />

      <section className="section bg-paper">
        <div className="container">
          <MotionReveal className="max-w-3xl">
            <p className="museum-label">Interactive Origin Map</p>
            <h2 className="display-title mt-5 text-5xl leading-none text-ink md:text-7xl">
              Terroir is a cultural memory.
            </h2>
          </MotionReveal>
          <MotionReveal delay={0.1} className="mt-14">
            <TeaAtlasExhibit />
          </MotionReveal>
        </div>
      </section>

      <section className="section bg-porcelain">
        <div className="container grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <MotionReveal>
            <p className="museum-label">How to Read the Map</p>
            <h2 className="display-title mt-5 text-5xl leading-none text-ink md:text-7xl">
              Altitude changes the breath of tea.
            </h2>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <div className="atlas-reading">
              {[
                ["Landscape", "Cliff, forest, lake, island, and shaded field each leave a different trace."],
                ["Processing", "Heat, oxidation, rolling, roast, aging, and milling translate place into taste."],
                ["Ritual", "A tea's origin suggests the vessel, pace, temperature, and silence around it."]
              ].map(([title, copy]) => (
                <article key={title}>
                  <p className="museum-label text-clay">{title}</p>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </MotionReveal>
        </div>
      </section>
    </main>
  );
}
