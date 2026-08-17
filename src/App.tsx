import { useEffect, useMemo, useState } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import { PlaceCategory, places, type Place } from "./data/places";

const ALL_CATEGORIES = "全部" as const;
type FilterCategory = typeof ALL_CATEGORIES | PlaceCategory;
const categories: FilterCategory[] = [
  ALL_CATEGORIES,
  PlaceCategory.Restaurant,
  PlaceCategory.Attraction,
  PlaceCategory.Shopping,
];

const CATEGORY_COLORS: Record<PlaceCategory, string> = {
  [PlaceCategory.Restaurant]: "#e0a52b",
  [PlaceCategory.Attraction]: "#187f8c",
  [PlaceCategory.Shopping]: "#ee4b2b",
};

function MapController({
  visiblePlaces,
  selected,
}: {
  visiblePlaces: Place[];
  selected: Place | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (selected) map.flyTo(selected.position, 15, { duration: 0.8 });
    else if (visiblePlaces.length > 1)
      map.fitBounds(
        visiblePlaces.map((place) => place.position),
        { padding: [55, 55] },
      );
    else if (visiblePlaces[0]) map.flyTo(visiblePlaces[0].position, 15, { duration: 0.8 });
  }, [map, selected, visiblePlaces]);
  return null;
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>(ALL_CATEGORIES);
  const [selected, setSelected] = useState<Place | null>(null);
  const filteredPlaces = useMemo(
    () =>
      activeCategory === ALL_CATEGORIES
        ? places
        : places.filter((place) => place.category === activeCategory),
    [activeCategory],
  );

  function selectCategory(category: FilterCategory) {
    setActiveCategory(category);
    setSelected(null);
  }

  return (
    <main className="app-shell">
      <section className="sidebar">
        <header className="brand">
          <div className="eyebrow">
            <span>OKINAWA · MAP 01</span>
            <span>沖繩本島</span>
          </div>
          <h1>
            沿途
            <br />
            旅遊情報
          </h1>
          <p>把影片裡看到的店，整理成真正能排進行程的地圖。</p>
        </header>
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
                aria-pressed={activeCategory === category}
                onClick={() => selectCategory(category)}
              >
                {category} <b>{count}</b>
              </button>
            );
          })}
        </div>
        <div className="place-list">
          {filteredPlaces.map((place, index) => (
            <article
              key={place.id}
              className={`place-card ${selected?.id === place.id ? "selected" : ""}`}
              onClick={() => setSelected(place)}
            >
              <div className="card-topline">
                <span className="number">{String(index + 1).padStart(2, "0")}</span>
                <span className="category">{place.categoryEn}</span>
                <span className="status">
                  <i />
                  營業資訊已核對
                </span>
              </div>
              <h2>{place.name}</h2>
              <p className="jp">{place.nameJa}</p>
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
              <p className="description">{place.note}</p>
              <div className="tags">
                {place.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="actions">
                <a className="primary" href={place.maps} target="_blank" rel="noreferrer">
                  開啟 Google Maps ↗
                </a>
                <a className="secondary" href={place.official} target="_blank" rel="noreferrer">
                  官方資料
                </a>
                {place.tabelogUrl && (
                  <a className="secondary" href={place.tabelogUrl} target="_blank" rel="noreferrer">
                    Tabelog
                  </a>
                )}
              </div>
            </article>
          ))}
          {filteredPlaces.length === 0 && (
            <div className="empty-state" role="status">
              <span>0 PLACES</span>
              <strong>目前沒有「{activeCategory}」資料</strong>
              <p>之後從影片整理出的地點會出現在這裡。</p>
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
        <MapContainer center={[26.26, 127.73]} zoom={11} scrollWheelZoom className="map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapController visiblePlaces={filteredPlaces} selected={selected} />
          {filteredPlaces.map((place) => (
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
          {[PlaceCategory.Shopping, PlaceCategory.Attraction].map((category) => (
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
    </main>
  );
}
