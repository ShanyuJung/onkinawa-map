export enum SouvenirCategory {
  LocalFood = "在地料理",
  Sweets = "特色點心",
  FoodAndDrink = "食材與飲品",
  Crafts = "工藝與紀念品",
}

export type Souvenir = {
  id: string;
  name: string;
  nameJa: string;
  category: SouvenirCategory;
  description: string;
  buyingTip: string;
  tags: string[];
};

export const souvenirs: Souvenir[] = [
  {
    id: "taco-rice",
    name: "塔可飯",
    nameJa: "タコライス",
    category: SouvenirCategory.LocalFood,
    description: "把塔可肉醬、生菜、番茄與起司鋪在白飯上，是源自沖繩的美式風格料理。",
    buyingTip: "各店肉醬辣度與配料差異不少，可依喜好加莎莎醬；份量通常比外觀看起來更有飽足感。",
    tags: ["沖繩料理", "肉醬", "美式風格"],
  },
  {
    id: "pork-tamago-onigiri",
    name: "沖繩豬肉蛋飯糰",
    nameJa: "ポークたまごおにぎり",
    category: SouvenirCategory.LocalFood,
    description:
      "以午餐肉、煎蛋與白飯組成的沖繩式飯糰，常再加入苦瓜、炸蝦、油味噌等配料，適合當早餐或輕食。",
    buyingTip:
      "不推薦只點最基礎的午餐肉加蛋口味，特色比較不明顯；建議選有額外配料的版本，個人推薦苦瓜口味。牧志市場店人通常很多，不必執著特定分店，可在美國村、機場或其他行程順路地點購買。",
    tags: ["午餐肉", "飯糰", "早餐", "苦瓜口味"],
  },
  {
    id: "okinawa-soba",
    name: "沖繩麵",
    nameJa: "沖縄そば",
    category: SouvenirCategory.LocalFood,
    description: "使用小麥麵條搭配豬骨、柴魚等湯底，常放三層肉、排骨或豬腳。",
    buyingTip:
      "不同店家的湯頭、麵體與肉類差異很大；ソーキそば通常放排骨，三枚肉そば則是帶皮五花肉。",
    tags: ["沖繩料理", "麵食", "排骨"],
  },
  {
    id: "agu-pork",
    name: "阿古豬料理",
    nameJa: "あぐー豚料理",
    category: SouvenirCategory.LocalFood,
    description:
      "阿古豬不是一道固定料理，而是沖繩代表性的品牌豬；油脂帶有甜味、肉質柔嫩，最常以薄切涮涮鍋呈現，也可見於燒肉、炸豬排與漢堡排。",
    buyingTip:
      "個人實際吃過的感受是沒有明顯勝過台灣豬，不需要只因為『阿古豬』三個字特地安排高價餐廳；想嘗鮮再點即可。",
    tags: ["品牌豬", "涮涮鍋", "燒肉"],
  },
  {
    id: "umibudo",
    name: "海葡萄",
    nameJa: "海ぶどう",
    category: SouvenirCategory.FoodAndDrink,
    description: "顆粒狀海藻有清脆爆開的口感，常搭配醋醬作為前菜或下酒菜。",
    buyingTip: "不要放進冰箱冷藏，也不要長時間泡醬汁，否則顆粒容易縮小並失去口感。",
    tags: ["海藻", "前菜", "清脆口感"],
  },
  {
    id: "goya-champuru",
    name: "苦瓜炒什錦",
    nameJa: "ゴーヤーチャンプルー",
    category: SouvenirCategory.LocalFood,
    description: "以苦瓜、島豆腐、雞蛋與豬肉或午餐肉拌炒，是沖繩家常料理的代表。",
    buyingTip:
      "這是居酒屋與沖繩料理店常見的家常菜，不需要特別找名店；行程中看到順便點即可。怕苦的人可選苦瓜較薄、蛋與豆腐比例較高的版本。",
    tags: ["苦瓜", "島豆腐", "家常料理"],
  },
  {
    id: "jimami-dofu",
    name: "花生豆腐",
    nameJa: "ジーマーミ豆腐",
    category: SouvenirCategory.Sweets,
    description: "以花生製成、口感像布丁般黏滑有彈性，通常淋上帶甜味的醬汁；餐廳也常把它當作前菜。",
    buyingTip: "和黃豆豆腐完全不同，花生過敏者需避免；市場常有冷藏外帶包裝。",
    tags: ["花生", "冷藏食品", "沖繩料理"],
  },
  {
    id: "beniimo-tart",
    name: "紅芋塔",
    nameJa: "紅いもタルト",
    category: SouvenirCategory.Sweets,
    description: "以沖繩紅芋製成紫色內餡，是最具代表性的盒裝伴手禮之一。",
    buyingTip: "機場、國際通與大型購物中心都容易買到，注意常溫與冷藏版本的保存方式。",
    tags: ["紅芋", "甜點", "盒裝伴手禮"],
  },
  {
    id: "chinsuko",
    name: "金楚糕",
    nameJa: "ちんすこう",
    category: SouvenirCategory.Sweets,
    description: "口感酥鬆的琉球傳統點心，常見原味、黑糖、紅芋與鹽味。",
    buyingTip:
      "各家配方、油脂感與酥鬆程度差異很大，有些口味真的不太好吃；最好先試吃或買小包吃過，再決定是否大量購買。攜帶時也要避免重壓。",
    tags: ["傳統點心", "餅乾", "分送方便"],
  },
  {
    id: "sata-andagi",
    name: "沖繩沙翁",
    nameJa: "サーターアンダギー",
    category: SouvenirCategory.Sweets,
    description: "外層酥香、內部扎實的沖繩炸甜甜圈，在市場與老街常可現買現吃。",
    buyingTip: "現炸口感最好；若要帶回台灣，選獨立包裝並留意保存期限。",
    tags: ["現炸", "市場小吃", "甜甜圈"],
  },
  {
    id: "okinawa-brown-sugar",
    name: "沖繩黑糖",
    nameJa: "沖縄黒糖",
    category: SouvenirCategory.FoodAndDrink,
    description: "沖繩各離島都有黑糖產品，風味會因甘蔗與製法不同而有所差異。",
    buyingTip: "除了塊狀黑糖，也有糖漿、糖果與搭配咖啡的加工品。",
    tags: ["黑糖", "離島產地", "調味料"],
  },
  {
    id: "shikuwasa",
    name: "香檬製品",
    nameJa: "シークヮーサー",
    category: SouvenirCategory.FoodAndDrink,
    description: "沖繩常見的酸香柑橘，可製成果汁、果醬、調味醬與糖果。",
    buyingTip: "購買果汁時可留意原汁比例；濃縮原汁適合加水、氣泡水或入菜。",
    tags: ["柑橘", "果汁", "調味"],
  },
  {
    id: "awamori",
    name: "泡盛",
    nameJa: "泡盛",
    category: SouvenirCategory.FoodAndDrink,
    description: "以泰國米與黑麴菌釀造的沖繩蒸餾酒，熟成後稱為古酒。",
    buyingTip: "酒精濃度與容量選擇很多，搭機攜帶前應確認航空公司與入境規定。",
    tags: ["沖繩酒", "古酒", "蒸餾酒"],
  },
  {
    id: "okinawa-salt",
    name: "沖繩鹽與雪鹽製品",
    nameJa: "沖縄の塩・雪塩",
    category: SouvenirCategory.FoodAndDrink,
    description: "海鹽除了料理用，也常被做成餅乾、巧克力、霜淇淋與美容用品。",
    buyingTip: "調味鹽體積小、容易攜帶；可依肉類、天婦羅或飯糰用途選擇。",
    tags: ["海鹽", "雪鹽", "料理"],
  },
  {
    id: "ryukyu-glass",
    name: "琉球玻璃",
    nameJa: "琉球ガラス",
    category: SouvenirCategory.Crafts,
    description: "色彩鮮明、帶有氣泡與手工痕跡的沖繩玻璃工藝，常見杯具與小擺飾。",
    buyingTip: "每件成品略有差異，購買後確認店家是否提供防撞包裝。",
    tags: ["玻璃工藝", "杯具", "手作"],
  },
  {
    id: "yachimun",
    name: "沖繩陶器",
    nameJa: "やちむん",
    category: SouvenirCategory.Crafts,
    description: "沖繩方言稱陶器為やちむん，常見魚紋、植物紋與厚實溫潤的器型。",
    buyingTip: "壺屋通與讀谷一帶選擇較集中，手工器皿尺寸與釉色可能不完全一致。",
    tags: ["陶器", "餐具", "壺屋"],
  },
  {
    id: "shisa",
    name: "風獅爺",
    nameJa: "シーサー",
    category: SouvenirCategory.Crafts,
    description: "沖繩代表性的守護獸，可見於屋頂、門口，也有各種陶製與角色聯名版本。",
    buyingTip: "從小型磁鐵到手工陶偶都有，易碎款建議放隨身行李妥善包裝。",
    tags: ["守護獸", "擺飾", "沖繩象徵"],
  },
  {
    id: "bingata",
    name: "紅型染",
    nameJa: "紅型",
    category: SouvenirCategory.Crafts,
    description: "以鮮豔色彩和自然圖案著稱的琉球染色工藝，常製成布包、衣飾與小物。",
    buyingTip: "若不方便攜帶大型織品，可選杯墊、收納包或書籤等實用小物。",
    tags: ["染色工藝", "布製品", "傳統圖案"],
  },
];
