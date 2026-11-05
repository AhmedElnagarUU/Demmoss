"use client";

import { useState } from "react";
import type { LocalizedText } from "@/features/demo-engine/types";
import { Button } from "@/shared/ui/button";
import { formatPrice } from "../format";
import { restaurantImages } from "../images";
import { getRestaurantT, type RestaurantTranslate } from "../messages";
import { menuTags, type MenuCategory, type MenuItem } from "../types";
import { useRestaurant } from "./restaurant-context";
import { trackEdit } from "./track-edit";
import { BilingualField, PageHeader, SelectInput, StatusBadge, TextInput } from "./ui";

export function MenuPage() {
  const { store, config, locale } = useRestaurant();
  const t = getRestaurantT(locale);
  const menu = store((state) => state.menu);
  const addMenuCategory = store((state) => state.addMenuCategory);
  const [newCategory, setNewCategory] = useState<LocalizedText>({ ar: "", en: "" });

  function addCategory() {
    if (!newCategory.ar.trim() && !newCategory.en.trim()) return;
    addMenuCategory({
      ar: newCategory.ar.trim() || newCategory.en.trim(),
      en: newCategory.en.trim() || newCategory.ar.trim(),
    });
    setNewCategory({ ar: "", en: "" });
    trackEdit("menu", config.slug, locale);
  }

  return (
    <div className="space-y-6">
      <PageHeader title={t("menu.title")} intro={t("menu.intro")} />

      {menu.categories.map((category) => (
        <CategorySection
          key={category.id}
          category={category}
          items={menu.items.filter((item) => item.categoryId === category.id)}
        />
      ))}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          addCategory();
        }}
        className="space-y-3 rounded-control border border-dashed border-border p-4"
      >
        <BilingualField
          id="new-category"
          label={t("menu.categoryName")}
          value={newCategory}
          onChange={setNewCategory}
          t={t}
        />
        <Button type="submit" variant="secondary">
          {t("menu.addCategory")}
        </Button>
      </form>
    </div>
  );
}

function CategorySection({ category, items }: { category: MenuCategory; items: MenuItem[] }) {
  const { store, config, locale } = useRestaurant();
  const t = getRestaurantT(locale);
  const renameMenuCategory = store((state) => state.renameMenuCategory);
  const removeMenuCategory = store((state) => state.removeMenuCategory);
  const addMenuItem = store((state) => state.addMenuItem);
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState(category.name);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  function addDish() {
    const id = addMenuItem({
      categoryId: category.id,
      name: { ar: getRestaurantT("ar")("menu.newDishName"), en: getRestaurantT("en")("menu.newDishName") },
      description: { ar: "", en: "" },
      price: 0,
      image: items[0]?.image ?? restaurantImages[0]?.id ?? "",
      tags: [],
      available: true,
      featured: false,
    });
    setEditingItemId(id);
    trackEdit("menu", config.slug, locale);
  }

  return (
    <section aria-labelledby={`category-${category.id}`} className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id={`category-${category.id}`} className="text-xl font-bold text-text">
          {category.name[locale]}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            aria-expanded={editingName}
            aria-label={`${t("menu.categoryName")}: ${category.name[locale]}`}
            onClick={() => setEditingName((open) => !open)}
          >
            {t("menu.categoryName")}
          </Button>
          <Button
            variant="secondary"
            aria-label={`${t("menu.deleteCategory")}: ${category.name[locale]}`}
            onClick={() => {
              removeMenuCategory(category.id);
              trackEdit("menu", config.slug, locale);
            }}
          >
            {t("common.delete")}
          </Button>
        </div>
      </div>

      {editingName ? (
        <div className="space-y-3 rounded-control border border-border bg-surface p-4">
          <BilingualField
            id={`rename-${category.id}`}
            label={t("menu.categoryName")}
            value={name}
            onChange={setName}
            t={t}
          />
          <Button
            onClick={() => {
              renameMenuCategory(category.id, name);
              setEditingName(false);
              trackEdit("menu", config.slug, locale);
            }}
          >
            {t("menu.renameCategory")}
          </Button>
        </div>
      ) : null}

      {items.length === 0 ? <p className="text-muted">{t("menu.emptyCategory")}</p> : null}

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="space-y-3 rounded-control border border-border bg-bg p-3">
            <ItemRow
              item={item}
              editing={editingItemId === item.id}
              onToggleEdit={() => setEditingItemId(editingItemId === item.id ? null : item.id)}
            />
            {editingItemId === item.id ? (
              <ItemForm key={JSON.stringify(item)} item={item} t={t} onDone={() => setEditingItemId(null)} />
            ) : null}
          </li>
        ))}
      </ul>

      <Button variant="secondary" onClick={addDish}>
        {t("menu.addDish")}: {category.name[locale]}
      </Button>
    </section>
  );
}

function ItemRow({
  item,
  editing,
  onToggleEdit,
}: {
  item: MenuItem;
  editing: boolean;
  onToggleEdit: () => void;
}) {
  const { store, config, locale } = useRestaurant();
  const t = getRestaurantT(locale);
  const currency = store((state) => state.settings.currency);
  const updateMenuItem = store((state) => state.updateMenuItem);
  const removeMenuItem = store((state) => state.removeMenuItem);
  const name = item.name[locale];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="min-w-0 space-y-1">
        <p className="font-bold text-text">{name}</p>
        <p className="text-sm text-muted">
          {formatPrice(item.price, currency, locale)}
          {!item.available ? (
            <>
              {" "}
              · <StatusBadge label={t("menu.unavailableBadge")} />
            </>
          ) : null}
          {item.featured ? (
            <>
              {" "}
              · <StatusBadge label={t("menu.featuredBadge")} />
            </>
          ) : null}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm font-semibold">
          <input
            type="checkbox"
            checked={item.available}
            aria-label={`${t("menu.available")}: ${name}`}
            onChange={(event) => {
              updateMenuItem(item.id, { available: event.target.checked });
              trackEdit("menu", config.slug, locale);
            }}
            className="size-5"
          />
          {t("menu.available")}
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold">
          <input
            type="checkbox"
            checked={item.featured}
            aria-label={`${t("menu.featuredBadge")}: ${name}`}
            onChange={(event) => {
              updateMenuItem(item.id, { featured: event.target.checked });
              trackEdit("menu", config.slug, locale);
            }}
            className="size-5"
          />
          {t("menu.featuredBadge")}
        </label>
        <Button
          variant="secondary"
          aria-expanded={editing}
          aria-label={`${t("menu.editDish")}: ${name}`}
          onClick={onToggleEdit}
        >
          {t("common.edit")}
        </Button>
        <Button
          variant="secondary"
          aria-label={`${t("common.delete")}: ${name}`}
          onClick={() => {
            removeMenuItem(item.id);
            trackEdit("menu", config.slug, locale);
          }}
        >
          {t("common.delete")}
        </Button>
      </div>
    </div>
  );
}

function ItemForm({ item, t, onDone }: { item: MenuItem; t: RestaurantTranslate; onDone: () => void }) {
  const { store, config, locale } = useRestaurant();
  const updateMenuItem = store((state) => state.updateMenuItem);
  const [draft, setDraft] = useState(item);
  const idPrefix = `item-${item.id}`;

  function save() {
    updateMenuItem(item.id, {
      name: draft.name,
      description: draft.description,
      price: Number.isFinite(draft.price) ? Math.max(0, draft.price) : 0,
      image: draft.image,
      tags: draft.tags,
    });
    trackEdit("menu", config.slug, locale);
    onDone();
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        save();
      }}
      className="space-y-4 rounded-control border border-border bg-surface p-4"
    >
      <BilingualField
        id={`${idPrefix}-name`}
        label={t("menu.dishName")}
        value={draft.name}
        onChange={(name) => setDraft({ ...draft, name })}
        t={t}
      />
      <BilingualField
        id={`${idPrefix}-description`}
        label={t("menu.dishDescription")}
        value={draft.description}
        onChange={(description) => setDraft({ ...draft, description })}
        t={t}
        multiline
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput
          id={`${idPrefix}-price`}
          label={t("menu.price")}
          type="number"
          min={0}
          step="0.5"
          value={draft.price}
          onChange={(event) => setDraft({ ...draft, price: event.target.valueAsNumber })}
        />
        <SelectInput
          id={`${idPrefix}-image`}
          label={t("menu.image")}
          value={draft.image}
          onChange={(event) => setDraft({ ...draft, image: event.target.value })}
        >
          {restaurantImages.map((image) => (
            <option key={image.id} value={image.id}>
              {image.alt[locale]}
            </option>
          ))}
        </SelectInput>
      </div>
      <fieldset className="flex flex-wrap gap-4">
        <legend className="mb-1 text-sm font-bold text-text">{t("menu.tags")}</legend>
        {menuTags.map((tag) => (
          <label key={tag} className="flex items-center gap-2 text-sm font-semibold">
            <input
              type="checkbox"
              checked={draft.tags.includes(tag)}
              onChange={(event) =>
                setDraft({
                  ...draft,
                  tags: event.target.checked
                    ? [...draft.tags, tag]
                    : draft.tags.filter((other) => other !== tag),
                })
              }
              className="size-5"
            />
            {t(`tags.${tag}`)}
          </label>
        ))}
      </fieldset>
      <div className="flex gap-2">
        <Button type="submit">{t("common.save")}</Button>
        <Button variant="secondary" onClick={onDone}>
          {t("common.cancel")}
        </Button>
      </div>
    </form>
  );
}
