import { knowledgeCards, teaHistoryItems } from "@/data/teaHistory";

type TeaHistoryTimelineProps = {
  onEnterTimeline: () => void;
};

export function TeaHistoryTimeline({ onEnterTimeline }: TeaHistoryTimelineProps) {
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
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <strong lang="zh-Hant">{item.chinese}</strong>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
        <div className="knowledge-grid" aria-label="Tea culture knowledge cards">
          {knowledgeCards.map((card) => (
            <article key={card.title}>
              <span className="seal-mark" aria-hidden="true" />
              <h3>{card.title}</h3>
              <strong lang="zh-Hant">{card.chinese}</strong>
              <p>{card.copy}</p>
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
