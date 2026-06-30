"use client";

import type { TeaOrigin } from "@/data/teaOrigins";

type TeaAtlasMapProps = {
  origins: TeaOrigin[];
  activeOrigin: TeaOrigin;
  onSelect: (origin: TeaOrigin) => void;
  onExplore: (origin: TeaOrigin) => void;
  onOpenMap: () => void;
};

export function TeaAtlasMap({ origins, activeOrigin, onSelect, onExplore, onOpenMap }: TeaAtlasMapProps) {
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
        <dl className="atlas-detail-list">
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
            <dt>Brewing</dt>
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
      </div>
    </article>
  );
}
