import type { LocalizedText } from "@/features/demo-engine/types";
import type { Content, MenuCategory, MenuItem, RestaurantData, Review, Settings } from "./types";

// Store actions both variants need. A variant store spreads `createSharedActions(set)` into its actions.
export type SetData<D> = (update: Partial<D> | ((state: D) => Partial<D>)) => void;

export type NewMenuItem = Omit<MenuItem, "id">;

export type SharedActions = {
  updateSettings: (patch: Partial<Settings>) => void;
  updateContent: (content: Content) => void;
  addMenuCategory: (name: LocalizedText) => string;
  renameMenuCategory: (id: string, name: LocalizedText) => void;
  removeMenuCategory: (id: string) => void;
  addMenuItem: (item: NewMenuItem) => string;
  updateMenuItem: (id: string, patch: Partial<NewMenuItem>) => void;
  removeMenuItem: (id: string) => void;
  setReviewVisible: (id: string, visible: boolean) => void;
  dismissTip: (id: string) => void;
};

export function createSharedActions(set: SetData<RestaurantData>): SharedActions {
  return {
    updateSettings: (patch) =>
      set((state) => ({
        settings: {
          ...state.settings,
          ...patch,
          // editing the name in Settings takes over from the name given at register
          nameEdited: state.settings.nameEdited || patch.businessName !== undefined,
        },
      })),

    updateContent: (content) => set({ content }),

    addMenuCategory: (name) => {
      const category: MenuCategory = { id: crypto.randomUUID(), name };
      set((state) => ({ menu: { ...state.menu, categories: [...state.menu.categories, category] } }));
      return category.id;
    },

    renameMenuCategory: (id, name) =>
      set((state) => ({
        menu: {
          ...state.menu,
          categories: state.menu.categories.map((category) =>
            category.id === id ? { ...category, name } : category,
          ),
        },
      })),

    removeMenuCategory: (id) =>
      set((state) => ({
        menu: {
          categories: state.menu.categories.filter((category) => category.id !== id),
          items: state.menu.items.filter((item) => item.categoryId !== id),
        },
      })),

    addMenuItem: (item) => {
      const created: MenuItem = { ...item, id: crypto.randomUUID() };
      set((state) => ({ menu: { ...state.menu, items: [...state.menu.items, created] } }));
      return created.id;
    },

    updateMenuItem: (id, patch) =>
      set((state) => ({
        menu: {
          ...state.menu,
          items: state.menu.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
        },
      })),

    removeMenuItem: (id) =>
      set((state) => ({ menu: { ...state.menu, items: state.menu.items.filter((item) => item.id !== id) } })),

    setReviewVisible: (id, visible) =>
      set((state) => ({
        reviews: state.reviews.map((review: Review) => (review.id === id ? { ...review, visible } : review)),
      })),

    dismissTip: (id) =>
      set((state) =>
        state.dismissedTips.includes(id) ? {} : { dismissedTips: [...state.dismissedTips, id] },
      ),
  };
}
