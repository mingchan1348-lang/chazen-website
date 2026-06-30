import Image from "next/image";
import { knowledgeCards, teaHistoryItems } from "@/data/teaHistory";

type TeaHistoryTimelineProps = {
  onEnterTimeline: () => void;
};

export function TeaHistoryTimeline({ onEnterTimeline }: TeaHistoryTimelineProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <section id="tea-history" className="museum-section history-timeline-section">
      <div className="museum-container">
        <div className="section-title-block">
          <p className="museum-kicker">Chapter 03 / The History of Tea</p>
          <h2>Tea moves from legend to medicine, from scholarship to stillness.</h2>
          <p lang="zh-Hant">茶之源流，從傳說、藥性、文人審美，到當代靜心。</p>
        </div>
        <div className="history-timeline history-timeline-phase2">
          {teaHistoryItems.map((item) => (
            <article key={item.number}>
              <div className="timeline-card-image">
                <Image
                  src={`${basePath}/images/${item.image}`}
                  alt={`${item.title} ${item.chinese} tea history image`}
                  fill
                  sizes="(max-width: 760px) 100vw, 18vw"
                />
              </div>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <strong lang="zh-Hant">{item.chinese}</strong>
              <p>{item.copy}</p>
              <p className="timeline-expanded">{item.expanded}</p>
              <div className="timeline-keywords">
                {item.keywords.map((keyword) => (
                  <small key={keyword}>{keyword}</small>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="knowledge-grid" aria-label="Tea culture knowledge cards">
          {knowledgeCards.map((card) => (
            <article key={card.title}>
              <div className="knowledge-card-image">
                <Image
                  src={`${basePath}/images/${card.image}`}
                  alt={`${card.title} ${card.chinese} cultural reference`}
                  fill
                  sizes="(max-width: 760px) 100vw, 22vw"
                />
              </div>
              <h3>{card.title}</h3>
              <strong lang="zh-Hant">{card.chinese}</strong>
              <p>{card.copy}</p>
              <ul>
                {card.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <a href={card.href} className="text-link-button">
                Learn More
              </a>
            </article>
          ))}
        </div>
        <div className="chapter-actions">
          <button type="button" className="museum-link-button dark-on-light" onClick={onEnterTimeline}>
            Enter the Timeline <span lang="zh-Hant">進入茶史</span>
          </button>
        </div>
      </div>
    </section>
  );
}
