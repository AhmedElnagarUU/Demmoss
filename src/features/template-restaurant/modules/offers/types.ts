import { z } from "zod";
import { localizedTextSchema } from "@/features/demo-engine/types";

// An offer is a deal sold as one line in the cart. Active offers show on the home page and on top of the menu.
export const offerSchema = z.object({
  id: z.string().min(1),
  title: localizedTextSchema,
  description: localizedTextSchema,
  price: z.number().min(0),
  image: z.string(),
  active: z.boolean(),
});

export const offersShape = { offers: z.array(offerSchema) };

export type Offer = z.infer<typeof offerSchema>;
export type OffersData = { offers: Offer[] };
