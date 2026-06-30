"use client";

import type { TeaOrigin } from "@/data/teaOrigins";

type TeaAtlasMapProps = {
  origins: TeaOrigin[];
  activeOrigin: TeaOrigin;
  onSelect: (origin: TeaOrigin) => void;
  onExplore: (origin: TeaOrigin) => void;
  onOpenMap: () => void;
  onRain: () => void;
};

export function TeaAtlasMap({ origins, activeOrigin, onSelect, onExplore, onOpenMap, onRain }: TeaAtlasMapProps) {
  return (
    <article className="atlas-panel">
      <p className="museum-kicker">Chapter 07 / Tea Atlas / 茶之地圖</p>
      <h2>Origin is not a coordinate. It is climate remembered by leaf.</h2>
      <div className="atlas-map" aria-label="Highlighted tea regions">
        {origins.map((origin) => (
          <button
            type="button"
            key={origin.name}
            className={activeOrigin.name === origin.name ? "is-active" : ""}
            onClick={() => onSelect(origin)}
            aria-pressed={activeOrigin.name === origin.name}
          >
            {origin.name}
          </button>
        ))}
      </div>
      <div className="atlas-feature">
        <span>Featured Origin</span>
        <strong>
          {activeOrigin.name} {activeOrigin.chinese}
        </strong>
        <p>{activeOrigin.tea}</p>
        <div className="origin-image-triptych" aria-hidden="true">
          <span data-label="Origin" />
          <span data-label="Leaf" />
          <span data-label="Landscape" />
        </div>
        <dl className="atlas-detail-list">
          <div>
            <dt>Region</dt>
            <dd>{activeOrigin.name} / {activeOrigin.chinese}</dd>
          </div>
          <div>
            <dt>Tea Type</dt>
            <dd>{activeOrigin.tea}</dd>
          </div>
          <div>
            <dt>Landscape</dt>
            <dd>{activeOrigin.landscape}</dd>
          </div>
          <div>
            <dt>Climate</dt>
            <dd>{activeOrigin.climate}</dd>
          </div>
          <div>
            <dt>Terroir</dt>
            <dd>{activeOrigin.terroir}</dd>
          </div>
          <div>
            <dt>Taste Profile</dt>
            <dd>{activeOrigin.taste}</dd>
          </div>
          <div>
            <dt>Ritual Suggestion</dt>
            <dd>{activeOrigin.brewing}</dd>
          </div>
        </dl>
      </div>
      <div className="chapter-actions">
        <button type="button" className="museum-link-button dark-on-light" onClick={() => onExplore(activeOrigin)}>
          Explore Tea Origins
        </button>
        <button type="button" className="museum-link-button dark-on-light" onClick={onOpenMap}>
          Open Tea Map
        </button>
        <button type="button" className="museum-link-button dark-on-light" onClick={onRain}>
          Enter Mountain Rain
        </button>
      </div>
    </article>
  );
}
