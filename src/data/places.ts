export enum PlaceCategory {
  Restaurant = "餐廳",
  Attraction = "景點",
  Shopping = "購物",
}

type BasePlace = {
  id: string;
  name: string;
  nameJa: string;
  categoryEn: string;
  position: [number, number];
  address: string;
  hours: string;
  stay: string;
  note: string;
  tags: string[];
  maps: string;
  official: string;
};

type RestaurantPlace = BasePlace & {
  category: PlaceCategory.Restaurant;
  tabelogUrl?: string;
};

type NonRestaurantPlace = BasePlace & {
  category: PlaceCategory.Attraction | PlaceCategory.Shopping;
  tabelogUrl?: never;
};

export type Place = RestaurantPlace | NonRestaurantPlace;

export const places: Place[] = [
  {
    id: "donki-kokusai",
    name: "唐吉訶德 國際通店",
    nameJa: "ドン・キホーテ 国際通り店",
    category: PlaceCategory.Shopping,
    categoryEn: "SHOPPING",
    position: [26.21503, 127.68742],
    address: "沖繩縣那霸市松尾 2-8-19",
    hours: "09:00–翌日 05:00",
    stay: "建議停留 45–90 分鐘",
    note: "位在國際通中段，靠近平和通商店街入口。適合安排在晚餐後採買伴手禮與日用品。",
    tags: ["免稅", "深夜營業", "伴手禮", "藥妝"],
    maps: "https://www.google.com/maps/search/?api=1&query=Don+Quijote+Kokusai+Dori+Naha",
    official: "https://www.donki.com/en/store/shop_detail.php?shop_id=323",
  },
  {
    id: "parco-city",
    name: "SAN-A 浦添西海岸 PARCO CITY",
    nameJa: "サンエー浦添西海岸 PARCO CITY",
    category: PlaceCategory.Shopping,
    categoryEn: "SHOPPING",
    position: [26.26258, 127.69875],
    address: "沖繩縣浦添市西洲 3-1-1",
    hours: "10:00–22:00（部分設施不同）",
    stay: "建議停留 2–3 小時",
    note: "臨海的大型購物中心，餐飲、電影院、超市與伴手禮選擇完整；適合從那霸往中北部移動時順遊。",
    tags: ["海景", "餐飲", "電影院", "大型停車場"],
    maps: "https://www.google.com/maps/search/?api=1&query=San-A+Urasoe+West+Coast+PARCO+CITY",
    official: "https://www.parcocity.jp/",
  },
  {
    id: "aeon-rycom",
    name: "永旺夢樂城 沖繩來客夢",
    nameJa: "イオンモール沖縄ライカム",
    category: PlaceCategory.Shopping,
    categoryEn: "SHOPPING",
    position: [26.31404, 127.79586],
    address: "沖繩縣中頭郡北中城村來客夢 1",
    hours: "專門店 10:00–22:00；餐廳 11:00–23:00",
    stay: "建議停留 2–4 小時",
    note: "沖繩中部的大型購物中心，商店、餐廳、超市與娛樂設施集中；適合搭配北谷或中部行程。",
    tags: ["免稅", "美食街", "超市", "大型停車場"],
    maps: "https://www.google.com/maps/search/?api=1&query=AEON+MALL+Okinawa+Rycom",
    official: "https://en.aeonmall.global/mall/okinawarycom",
  },
  {
    id: "churaumi-aquarium",
    name: "沖繩美麗海水族館",
    nameJa: "沖縄美ら海水族館",
    category: PlaceCategory.Attraction,
    categoryEn: "ATTRACTION",
    position: [26.69434, 127.87793],
    address: "沖繩縣國頭郡本部町石川 424",
    hours: "通常 08:30–18:30；旺季延長營業",
    stay: "建議停留 3–4 小時",
    note: "位於海洋博公園內，以黑潮之海大型水槽聞名。位置較北，適合安排為北部行程的主要景點。",
    tags: ["親子", "室內景點", "北部", "大型停車場"],
    maps: "https://www.google.com/maps/search/?api=1&query=Okinawa+Churaumi+Aquarium",
    official: "https://www.churaumi.okinawa/",
  },
];
