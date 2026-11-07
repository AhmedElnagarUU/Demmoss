import type { z } from "zod";
import { areasShape } from "../../modules/areas/types";
import { offersShape } from "../../modules/offers/types";
import { ordersShape } from "../../modules/orders/types";
import { restaurantDataSchema } from "../../types";

// Sole Trattoria stores the shared restaurant data + the cart and orders + offers + delivery areas.
export const fastFoodSchema = restaurantDataSchema.extend({
  ...ordersShape,
  ...offersShape,
  ...areasShape,
});

export type FastFoodData = z.infer<typeof fastFoodSchema>;
