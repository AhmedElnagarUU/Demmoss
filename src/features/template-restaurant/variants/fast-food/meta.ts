import { FAST_FOOD_SLUG } from "./slug";

// Catalog entry shown in the gallery and in the wizard result.
// The gallery imports this file (never the reverse), and its catalog checks the shape against TemplateMeta.
export const fastFoodMeta = {
  slug: FAST_FOOD_SLUG,
  category: "restaurant",
  variant: "fast-food",
  name: { ar: "سولي تراتوريا · بيتزا ومعكرونة", en: "Sole Trattoria · Pizza & pasta" },
  pitch: {
    ar: "بِع البيتزا والمعكرونة مباشرة دون عمولة تطبيقات التوصيل: طلبات استلام وتوصيل، ولوحة طلبات حيّة يتابع عميلك حالتها بنفسه.",
    en: "Sell pizza and pasta directly without delivery-app commission: pickup and delivery orders, and a live orders board your customers can follow themselves.",
  },
  screenshot: "/demos/restaurant-fast-food.jpg",
} as const;
