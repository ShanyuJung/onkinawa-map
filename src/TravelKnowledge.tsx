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
          <h1 id="knowledge-title">沖繩旅遊小知識</h1>
          <p>整理餐廳評分判讀、在地料理、傳統點心與值得帶回家的沖繩特色。</p>
        </header>

        <div className="knowledge-groups">
          <section className="knowledge-group">
            <div className="knowledge-group-title">
              <span>01</span>
              <h2>用餐攻略</h2>
            </div>
            <div className="souvenir-grid">
              <article className="souvenir-card">
                <div className="souvenir-name">
                  <h3>Tabelog 評分怎麼看</h3>
                  <small>食べログの点数</small>
                </div>
                <p>
                  Tabelog
                  分數不是評論的單純平均，而會考量評論者在各料理類型的影響度與有效評論數。官方將
                  3.5～4.0 視為全體前約 3%，4.0 以上更只有前約 0.07%；3.5
                  以下則也可能包含新店、評論較少或尚未被發現的好店。
                </p>
                <div className="buying-tip">
                  <b>沖繩判讀方式</b>
                  <span>
                    沖繩不少好店因評論數較少，分數會集中在 3.0～3.4，因此 3.5
                    已經相當突出。分數適合初步篩選，仍應搭配評論數、近期心得與個人經驗判斷。
                  </span>
                </div>
                <div className="tags">
                  <span>3.5 以上：前約 3%</span>
                  <span>4.0 以上：前約 0.07%</span>
                  <span>不是單純平均</span>
                </div>
              </article>
            </div>
          </section>
          {categories.map((category) => (
            <section key={category} className="knowledge-group">
              <div className="knowledge-group-title">
                <span>{String(categories.indexOf(category) + 2).padStart(2, "0")}</span>
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
