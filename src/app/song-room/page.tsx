import { ChapterHero } from "@/components/ChapterHero";
import { MotionReveal } from "@/components/MotionReveal";

export const metadata = {
  title: "The Song Room"
};

const exhibits = [
  {
    title: "Dian Cha",
    cn: "點茶",
    copy: "Powdered tea is whisked into a pale foam. The act is controlled, quiet, and almost architectural."
  },
  {
    title: "Jian Ware",
    cn: "建盞",
    copy: "Dark bowls reveal light foam. Hare's fur, oil spot, and kiln fire become part of the ceremony."
  },
  {
    title: "Tea Whisk",
    cn: "茶筅",
    copy: "The whisk is a discipline of rhythm: wrist, breath, texture, then stillness."
  },
  {
    title: "Scholar Studio",
    cn: "文人茶",
    copy: "Tea belongs beside ink, paper, stone, poetry, and the measured life of the desk."
  }
];

export default function SongRoomPage() {
  return (
    <main>
      <ChapterHero
        chapter="Chapter 05 / The Song Room"
        title="The Song Room"
        chinese="宋室"
        copy="A quiet exhibition on Song dynasty tea aesthetics: foam, dark ceramic, scholar restraint, and the luxury of saying almost nothing."
        image="chazen-song-diancha-v1.png"
        imageAlt="A Song dynasty style dian cha tea whisking scene with dark ceramic bowl and pale foam."
      />

      <section className="song-gallery bg-porcelain">
        <div className="container grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <MotionReveal>
            <p className="museum-label">Exhibition Thesis</p>
            <h2 className="display-title mt-5 text-5xl leading-none text-ink md:text-7xl">
              Restraint is not emptiness. It is concentration.
            </h2>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <div className="overflow-hidden rounded-lg border border-ink/10 shadow-soft">
              <video
                className="aspect-[4/5] w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/video/dian-cha.mp4`}
              />
              <p className="museum-label border-t border-ink/10 bg-porcelain px-5 py-3 text-ink/60">
                foam / black glaze / breath / silence
              </p>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="container">
          <div className="exhibit-grid">
            {exhibits.map((item, index) => (
              <MotionReveal key={item.title} delay={index * 0.06}>
                <article className="museum-exhibit-card">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="display-title">{item.cn}</h3>
                  <p className="mt-2 font-semibold text-ink">{item.title}</p>
                  <p className="mt-6 text-sm leading-7 text-ink/62">{item.copy}</p>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-ink text-porcelain">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <MotionReveal>
            <p className="museum-label text-brass">Curator Note</p>
            <h2 className="display-title mt-5 text-5xl leading-none md:text-7xl">
              Song elegance lives in what is removed.
            </h2>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <p className="max-w-2xl border-l border-porcelain/20 pl-7 text-xl leading-10 text-porcelain/72">
              No loud ornament, no theatrical abundance. The room asks visitors to look at a bowl
              until the bowl becomes weather, time, hand, fire, and breath.
            </p>
          </MotionReveal>
        </div>
      </section>
    </main>
  );
}
