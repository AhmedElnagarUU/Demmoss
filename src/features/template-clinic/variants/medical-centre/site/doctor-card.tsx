"use client";

import Link from "next/link";
import { useClinic } from "../../../context";
import { findPhoto, SitePhoto } from "../../../site/photo";
import type { Doctor } from "../../../types";
import { getCentreT } from "../messages";

// A doctor in a list: photo, name, title, and a link to the profile.
export function DoctorCard({ doctor }: { doctor: Doctor }) {
  const { store, config, locale } = useClinic();
  const t = getCentreT(locale);
  const department = store((state) => state.departments.find((item) => item.id === doctor.departmentId));
  return (
    <Link
      href={`/${locale}${config.basePath}/doctors/detail?id=${doctor.id}`}
      className="block overflow-hidden rounded-3xl bg-bg ring-1 ring-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
    >
      <div className="aspect-[4/5] overflow-hidden bg-surface">
        <SitePhoto
          photo={findPhoto(config.photos, doctor.photo)}
          locale={locale}
          sizes="(min-width: 1024px) 300px, 50vw"
        />
      </div>
      <div className="space-y-1 p-5">
        <p className="text-lg font-medium">{doctor.name[locale]}</p>
        <p className="text-sm text-muted">{doctor.title[locale]}</p>
        {department ? <p className="text-sm text-(--cl-accent)">{department.name[locale]}</p> : null}
        <p className="pt-1 text-sm font-medium">{t("doctors.profile")}</p>
      </div>
    </Link>
  );
}
