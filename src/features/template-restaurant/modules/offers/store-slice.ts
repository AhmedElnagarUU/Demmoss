import type { SetData } from "../../shared-slice";
import type { OrdersData } from "../orders/types";
import type { Offer, OffersData } from "./types";

export type NewOffer = Omit<Offer, "id">;

export type OffersActions = {
  addOffer: (offer: NewOffer) => string;
  updateOffer: (id: string, patch: Partial<NewOffer>) => void;
  setOfferActive: (id: string, active: boolean) => void;
  removeOffer: (id: string) => void;
};

export function createOffersActions(set: SetData<OffersData & OrdersData>): OffersActions {
  return {
    addOffer: (offer) => {
      const created: Offer = { ...offer, id: crypto.randomUUID() };
      set((state) => ({ offers: [created, ...state.offers] }));
      return created.id;
    },

    updateOffer: (id, patch) =>
      set((state) => ({
        offers: state.offers.map((offer) => (offer.id === id ? { ...offer, ...patch } : offer)),
      })),

    setOfferActive: (id, active) =>
      set((state) => ({
        offers: state.offers.map((offer) => (offer.id === id ? { ...offer, active } : offer)),
      })),

    // A removed offer also leaves every cart.
    removeOffer: (id) =>
      set((state) => ({
        offers: state.offers.filter((offer) => offer.id !== id),
        cart: state.cart.filter((line) => !(line.kind === "offer" && line.refId === id)),
      })),
  };
}
