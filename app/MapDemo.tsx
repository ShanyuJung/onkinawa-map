"use client";

import { useState } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const places = [{
  id: "donki-kokusai", name: "唐吉訶德 國際通店", category: "購物",
  position: [26.21503, 127.68742] as [number, number],
  address: "沖繩縣那霸市松尾 2-8-19", hours: "09:00–翌日 05:00",
  stay: "建議停留 45–90 分鐘",
  note: "位在國際通中段，靠近平和通商店街入口。適合安排在晚餐後採買伴手禮與日用品。",
  tags: ["免稅", "深夜營業", "伴手禮", "藥妝"],
  maps: "https://www.google.com/maps/search/?api=1&query=Don+Quijote+Kokusai+Dori+Naha",
  official: "https://www.donki.com/en/store/shop_detail.php?shop_id=323",
}];

function FlyToPlace({ position }: { position: [number, number] }) {
  const map = useMap();
  map.flyTo(position, 17, { duration: 0.8 });
  return null;
}

export default function MapDemo() {
  const [selected, setSelected] = useState(places[0]);
  return (
    <main className="app-shell">
      <section className="sidebar">
        <header className="brand">
          <div className="eyebrow"><span>OKINAWA · MAP 01</span><span>那霸</span></div>
          <h1>國際通<br />沿途情報</h1>
          <p>把影片裡看到的店，整理成真正能排進行程的地圖。</p>
        </header>
        <div className="filters" aria-label="地點分類">
          <button className="filter active">全部 <b>1</b></button>
          <button className="filter">餐廳 <b>0</b></button>
          <button className="filter">景點 <b>0</b></button>
          <button className="filter">購物 <b>1</b></button>
        </div>
        <article className="place-card" onClick={() => setSelected(places[0])}>
          <div className="card-topline"><span className="number">01</span><span className="category">SHOPPING</span><span className="status"><i />營業資訊已核對</span></div>
          <h2>{places[0].name}</h2><p className="jp">ドン・キホーテ 国際通り店</p>
          <div className="facts"><div><span>營業時間</span><strong>{places[0].hours}</strong></div><div><span>安排建議</span><strong>{places[0].stay}</strong></div></div>
          <p className="description">{places[0].note}</p>
          <div className="tags">{places[0].tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          <div className="actions"><a className="primary" href={places[0].maps} target="_blank" rel="noreferrer">開啟 Google Maps ↗</a><a className="secondary" href={places[0].official} target="_blank" rel="noreferrer">官方資料</a></div>
        </article>
        <footer>資料核對日期 · 2026.08.17</footer>
      </section>
      <section className="map-panel" aria-label="國際通地圖">
        <div className="map-caption"><span className="pulse" /><div><small>SELECTED PLACE</small><strong>{selected.name}</strong></div></div>
        <MapContainer center={selected.position} zoom={16} scrollWheelZoom className="map">
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <FlyToPlace position={selected.position} />
          <CircleMarker center={selected.position} radius={15} pathOptions={{ color: "#fff", weight: 4, fillColor: "#ee4b2b", fillOpacity: 1 }}><Popup><strong>{selected.name}</strong><br />{selected.address}</Popup></CircleMarker>
        </MapContainer>
        <div className="route-note"><span>徒歩</span><strong>國際通中段</strong><small>牧志站約 600m · 美榮橋站約 500m</small></div>
        <div className="map-legend"><span><i className="dot orange" />已選地點</span><span><i className="dot dark" />行程路線</span></div>
      </section>
    </main>
  );
}
