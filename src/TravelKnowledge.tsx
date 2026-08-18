import { useEffect } from "react";
import { SouvenirCategory, souvenirs } from "./data/souvenirs";

const categories = Object.values(SouvenirCategory);

export function TravelKnowledge({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return (
    <div className="knowledge-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="knowledge-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="knowledge-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className="knowledge-close"
          type="button"
          aria-label="關閉旅遊小知識"
          onClick={onClose}
        >
          ×
        </button>
        <header className="knowledge-header">
          <span>OKINAWA · TRAVEL NOTES</span>
          <h1 id="knowledge-title">沖繩特色名產與料理</h1>
          <p>從在地料理、傳統點心到琉球工藝，整理值得現吃與帶回家的沖繩特色。</p>
        </header>

        <div className="knowledge-groups">
          {categories.map((category) => (
            <section key={category} className="knowledge-group">
              <div className="knowledge-group-title">
                <span>{String(categories.indexOf(category) + 1).padStart(2, "0")}</span>
                <h2>{category}</h2>
              </div>
              <div className="souvenir-grid">
                {souvenirs
                  .filter((souvenir) => souvenir.category === category)
                  .map((souvenir) => (
                    <article key={souvenir.id} className="souvenir-card">
                      <div className="souvenir-name">
                        <h3>{souvenir.name}</h3>
                        <small>{souvenir.nameJa}</small>
                      </div>
                      <p>{souvenir.description}</p>
                      <div className="buying-tip">
                        <b>選購提醒</b>
                        <span>{souvenir.buyingTip}</span>
                      </div>
                      <div className="tags">
                        {souvenir.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </article>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
