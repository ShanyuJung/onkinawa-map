import { z } from "zod";
import { PlaceCategory, places, type Place } from "../src/data/places";

const nonEmptyText = z.string().trim().min(1);
const positionSchema = z
  .tuple([z.number().min(-90).max(90), z.number().min(-180).max(180)])
  .nullable();
const tabelogSchema = z
  .object({
    url: z.url().refine((url) => url.includes("tabelog.com/"), "必須是 Tabelog 網址"),
    rating: z.number().min(0).max(5).optional(),
    verifiedAt: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "日期格式必須是 YYYY-MM-DD")
      .optional(),
  })
  .strict();

const basePlaceShape = {
  id: z
    .string()
    .trim()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "必須使用 kebab-case"),
  name: nonEmptyText,
  nameJa: nonEmptyText,
  position: positionSchema,
  address: nonEmptyText,
  hours: nonEmptyText,
  stay: nonEmptyText,
  note: nonEmptyText,
  tags: z.array(nonEmptyText).min(1),
  maps: z.url(),
  official: z.url().optional(),
  verified: z.boolean().optional(),
};

const placeSchema: z.ZodType<Place> = z.discriminatedUnion("category", [
  z
    .object({
      ...basePlaceShape,
      category: z.literal(PlaceCategory.Restaurant),
      categoryEn: z.literal("RESTAURANT"),
      tabelog: tabelogSchema.optional(),
    })
    .strict(),
  z
    .object({
      ...basePlaceShape,
      category: z.literal(PlaceCategory.Attraction),
      categoryEn: z.literal("ATTRACTION"),
    })
    .strict(),
  z
    .object({
      ...basePlaceShape,
      category: z.literal(PlaceCategory.Shopping),
      categoryEn: z.literal("SHOPPING"),
    })
    .strict(),
  z
    .object({
      ...basePlaceShape,
      category: z.literal(PlaceCategory.Lodging),
      categoryEn: z.literal("LODGING"),
    })
    .strict(),
]);

const placesSchema = z
  .array(placeSchema)
  .min(1)
  .superRefine((items, context) => {
    const seenIds = new Set<string>();

    items.forEach((place, index) => {
      if (seenIds.has(place.id)) {
        context.addIssue({
          code: "custom",
          message: `地點 id 重複：${place.id}`,
          path: [index, "id"],
        });
      }
      seenIds.add(place.id);

      if (new Set(place.tags).size !== place.tags.length) {
        context.addIssue({
          code: "custom",
          message: `同一地點含有重複標籤：${place.id}`,
          path: [index, "tags"],
        });
      }
    });
  });

const result = placesSchema.safeParse(places);

if (!result.success) {
  console.error(z.prettifyError(result.error));
  throw new Error("Place 資料驗證失敗");
}

console.log(`Place 資料驗證通過：${result.data.length} 筆`);
