import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer, useMap, ZoomControl } from "react-leaflet";
import { PlaceCategory, places, type Place } from "./data/places";
import { TravelKnowledge } from "./TravelKnowledge";

const ALL_CATEGORIES = "全部" as const;
type FilterCategory = typeof ALL_CATEGORIES | PlaceCategory;
const categories: FilterCategory[] = [
  ALL_CATEGORIES,
  PlaceCategory.Restaurant,
  PlaceCategory.Attraction,
  PlaceCategory.Shopping,
  PlaceCategory.Lodging,
];

const COLLAPSED_TAG_COUNT = 8;
const tagOptions = Array.from(
  places
    .flatMap((place) => place.tags)
    .reduce((counts, tag) => {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
      return counts;
    }, new Map<string, number>()),
)
  .map(([tag, count]) => ({ tag, count }))
  .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, "zh-Hant"));

const CATEGORY_COLORS: Record<PlaceCategory, string> = {
  [PlaceCategory.Restaurant]: "#e0a52b",
  [PlaceCategory.Attraction]: "#187f8c",
  [PlaceCategory.Shopping]: "#ee4b2b",
  [PlaceCategory.Lodging]: "#7656a8",
};

const CATEGORY_CONTRAST: Record<PlaceCategory, string> = {
  [PlaceCategory.Restaurant]: "#15221f",
  [PlaceCategory.Attraction]: "#ffffff",
  [PlaceCategory.Shopping]: "#ffffff",
  [PlaceCategory.Lodging]: "#ffffff",
};

type CategoryColorStyle = CSSProperties & {
  "--category-color": string;
  "--category-contrast": string;
};

function getCategoryStyle(category: FilterCategory): CategoryColorStyle {
  if (category === ALL_CATEGORIES) {
    return { "--category-color": "#15221f", "--category-contrast": "#ffffff" };
  }
  return {
    "--category-color": CATEGORY_COLORS[category],
    "--category-contrast": CATEGORY_CONTRAST[category],
  };
}

type MappablePlace = Place & { position: [number, number] };

function hasPosition(place: Place): place is MappablePlace {
  return place.position !== null;
}

function highlightMatches(text: string | undefined, query: string): ReactNode {
  if (!text) return text;

  const keyword = query.trim();
  if (!keyword) return text;

  const normalizedText = text.toLocaleLowerCase();
  const normalizedKeyword = keyword.toLocaleLowerCase();
  const parts: ReactNode[] = [];
  let cursor = 0;
  let matchIndex = normalizedText.indexOf(normalizedKeyword);

  while (matchIndex !== -1) {
    if (matchIndex > cursor) parts.push(text.slice(cursor, matchIndex));
    parts.push(
      <mark key={`${matchIndex}-${cursor}`}>
        {text.slice(matchIndex, matchIndex + keyword.length)}
      </mark>,
    );
    cursor = matchIndex + keyword.length;
    matchIndex = normalizedText.indexOf(normalizedKeyword, cursor);
  }

  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts.length ? parts : text;
}

function MapController({
  visiblePlaces,
  selected,
}: {
  visiblePlaces: MappablePlace[];
  selected: Place | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (selected) {
      if (selected.position) map.flyTo(selected.position, 15, { duration: 0.8 });
      return;
    }
    if (visiblePlaces.length > 1)
      map.fitBounds(
        visiblePlaces.map((place) => place.position),
        { padding: [55, 55] },
      );
    else if (visiblePlaces[0]) map.flyTo(visiblePlaces[0].position, 15, { duration: 0.8 });
  }, [map, selected, visiblePlaces]);
  return null;
}

export default function App() {
  const sidebarRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<FilterCategory>(ALL_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showAllTags, setShowAllTags] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showKnowledge, setShowKnowledge] = useState(false);
  const [selected, setSelected] = useState<Place | null>(null);
  const visibleTagOptions = useMemo(() => {
    if (showAllTags) return tagOptions;

    const popularTags = tagOptions.slice(0, COLLAPSED_TAG_COUNT);
    const selectedTag = activeTag && tagOptions.find(({ tag }) => tag === activeTag);
    if (selectedTag && !popularTags.some(({ tag }) => tag === activeTag)) {
      return [...popularTags.slice(0, -1), selectedTag];
    }
    return popularTags;
  }, [activeTag, showAllTags]);
  const filteredPlaces = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();

    return places.filter((place) => {
      const matchesCategory =
        activeCategory === ALL_CATEGORIES || place.category === activeCategory;
      const matchesTag = !activeTag || place.tags.includes(activeTag);
      if (!matchesCategory || !matchesTag) return false;
      if (!query) return true;

      return [
        place.name,
        place.nameJa,
        place.address,
        place.note,
        place.category,
        place.categoryEn,
        ...place.tags,
      ]
        .filter(Boolean)
        .some((value) => value?.toLocaleLowerCase().includes(query));
    });
  }, [activeCategory, activeTag, searchQuery]);
  const mappablePlaces = useMemo(() => filteredPlaces.filter(hasPosition), [filteredPlaces]);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const updateVisibility = () => {
      const isMobile = window.matchMedia("(max-width: 820px)").matches;
      setShowScrollTop((isMobile ? window.scrollY : (sidebar?.scrollTop ?? 0)) > 500);
    };

    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    sidebar?.addEventListener("scroll", updateVisibility, { passive: true });
    updateVisibility();

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
      sidebar?.removeEventListener("scroll", updateVisibility);
    };
  }, []);

  function selectCategory(category: FilterCategory) {
    setActiveCategory(category);
    setSelected(null);
  }

  function resetFilters() {
    setSearchQuery("");
    setActiveCategory(ALL_CATEGORIES);
    setActiveTag(null);
    setShowAllTags(false);
    setSelected(null);
  }

  function scrollToTop() {
    const isMobile = window.matchMedia("(max-width: 820px)").matches;
    if (isMobile) window.scrollTo({ top: 0, behavior: "smooth" });
    else sidebarRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="app-shell">
      <section ref={sidebarRef} className="sidebar">
        <header className="brand">
          <div className="eyebrow">
            <span>OKINAWA · TRIP MAP</span>
            <span>沖繩本島</span>
          </div>
          <h1>
            沖繩
            <br />
            旅遊地圖
          </h1>
          <p>整理沖繩的餐廳、景點與購物資訊，方便規劃行程。</p>
          <button
            className="knowledge-trigger"
            type="button"
            onClick={() => setShowKnowledge(true)}
          >
            旅遊小知識 <span aria-hidden="true">＋</span>
          </button>
        </header>
        <div className="search-box">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={searchQuery}
            placeholder="搜尋名稱、地區或標籤"
            aria-label="搜尋地點"
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setSelected(null);
            }}
          />
          {searchQuery && (
            <button
              type="button"
              aria-label="清除搜尋"
              onClick={() => {
                setSearchQuery("");
                setSelected(null);
              }}
            >
              ×
            </button>
          )}
        </div>
        <div className="filters" aria-label="地點分類">
          {categories.map((category) => {
            const count =
              category === ALL_CATEGORIES
                ? places.length
                : places.filter((place) => place.category === category).length;
            return (
              <button
                key={category}
                type="button"
                className={`filter ${activeCategory === category ? "active" : ""}`}
                style={getCategoryStyle(category)}
                aria-pressed={activeCategory === category}
                onClick={() => selectCategory(category)}
              >
                {category} <b>{count}</b>
              </button>
            );
          })}
        </div>
        <div className="tag-filter">
          <div className="tag-filter-heading">
            <span>標籤搜尋</span>
            <div className="tag-filter-actions">
              <button type="button" onClick={resetFilters}>
                重置篩選
              </button>
              <button
                type="button"
                aria-expanded={showAllTags}
                onClick={() => setShowAllTags((current) => !current)}
              >
                {showAllTags ? "收合" : `展開全部 ${tagOptions.length}`}
              </button>
            </div>
          </div>
          <div className={`tag-options ${showAllTags ? "expanded" : ""}`}>
            {visibleTagOptions.map(({ tag, count }) => (
              <button
                key={tag}
                type="button"
                className={activeTag === tag ? "active" : ""}
                aria-pressed={activeTag === tag}
                onClick={() => {
                  setActiveTag((current) => (current === tag ? null : tag));
                  setSelected(null);
                }}
              >
                {tag} <b>{count}</b>
              </button>
            ))}
          </div>
        </div>
        <div className="place-list">
          {filteredPlaces.map((place, index) => (
            <article
              key={place.id}
              className={`place-card ${selected?.id === place.id ? "selected" : ""}`}
              style={getCategoryStyle(place.category)}
              onClick={() => setSelected(place)}
            >
              <div className="card-topline">
                <span className="number">{String(index + 1).padStart(2, "0")}</span>
                <span className="category">{place.categoryEn}</span>
                <span className={`status ${place.verified === false ? "pending" : ""}`}>
                  <i />
                  {place.verified === false ? "營業資訊待核對" : "營業資訊已核對"}
                </span>
              </div>
              <h2>{highlightMatches(place.name, searchQuery)}</h2>
              <div className="place-subline">
                <p className="jp">{highlightMatches(place.nameJa, searchQuery)}</p>
                {place.tabelog?.rating && (
                  <span className="tabelog-meta">
                    <span className="tabelog-score">
                      <span>Tabelog</span>
                      <strong>{place.tabelog.rating.toFixed(2)}</strong>
                    </span>
                    {place.tabelog.verifiedAt && (
                      <small>{place.tabelog.verifiedAt.replace(/-/g, ".")}</small>
                    )}
                  </span>
                )}
              </div>
              <div className="facts">
                <div>
                  <span>營業時間</span>
                  <strong>{place.hours}</strong>
                </div>
                <div>
                  <span>安排建議</span>
                  <strong>{place.stay}</strong>
                </div>
              </div>
              <p className="description">{highlightMatches(place.note, searchQuery)}</p>
              <div className="tags">
                {place.tags.map((tag) => (
                  <span key={tag}>{highlightMatches(tag, searchQuery)}</span>
                ))}
              </div>
              <div className="actions">
                <a className="primary" href={place.maps} target="_blank" rel="noreferrer">
                  開啟 Google Maps ↗
                </a>
                {place.official && (
                  <a className="secondary" href={place.official} target="_blank" rel="noreferrer">
                    官方資料
                  </a>
                )}
                {place.tabelog && (
                  <a
                    className="secondary"
                    href={place.tabelog.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Tabelog
                  </a>
                )}
              </div>
            </article>
          ))}
          {filteredPlaces.length === 0 && (
            <div className="empty-state" role="status">
              <span>0 PLACES</span>
              <strong>找不到符合條件的地點</strong>
              <p>試試其他關鍵字或切換分類。</p>
            </div>
          )}
        </div>
        <footer>資料核對日期 · 2026.08.17</footer>
      </section>
      <section className="map-panel" aria-label="沖繩地點地圖">
        <div className="map-caption">
          <span className="pulse" />
          <div>
            <small>{selected ? "SELECTED PLACE" : "VISIBLE PLACES"}</small>
            <strong>{selected?.name ?? `${filteredPlaces.length} 個地點`}</strong>
          </div>
        </div>
        <MapContainer
          center={[26.26, 127.73]}
          zoom={11}
          zoomControl={false}
          scrollWheelZoom
          className="map"
        >
          <ZoomControl position="topright" />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapController visiblePlaces={mappablePlaces} selected={selected} />
          {mappablePlaces.map((place) => (
            <CircleMarker
              key={place.id}
              center={place.position}
              radius={selected?.id === place.id ? 16 : 11}
              eventHandlers={{ click: () => setSelected(place) }}
              pathOptions={{
                color: "#fff",
                weight: 4,
                fillColor: selected?.id === place.id ? "#15221f" : CATEGORY_COLORS[place.category],
                fillOpacity: 1,
              }}
            >
              <Popup>
                <strong>{place.name}</strong>
                <br />
                {place.address}
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
        <div className="route-note">
          <span>ROUTE</span>
          <strong>那霸 → 中部 → 北部</strong>
          <small>點選左側卡片查看位置</small>
        </div>
        <div className="map-legend">
          {[
            PlaceCategory.Restaurant,
            PlaceCategory.Attraction,
            PlaceCategory.Shopping,
            PlaceCategory.Lodging,
          ].map((category) => (
            <span key={category}>
              <i className="dot" style={{ background: CATEGORY_COLORS[category] }} />
              {category}
            </span>
          ))}
          <span>
            <i className="dot dark" />
            目前選取
          </span>
        </div>
      </section>
      <button
        type="button"
        className={`scroll-to-top ${showScrollTop ? "visible" : ""}`}
        aria-label="回到頁面頂端"
        onClick={scrollToTop}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M5 5h14M12 20V9m0 0-5 5m5-5 5 5" />
        </svg>
        <b>回到頂端</b>
      </button>
      {showKnowledge && <TravelKnowledge onClose={() => setShowKnowledge(false)} />}
    </main>
  );
}
