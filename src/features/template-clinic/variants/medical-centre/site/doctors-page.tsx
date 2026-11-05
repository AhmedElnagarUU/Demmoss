"use client";

import { useState } from "react";
import { useClinic } from "../../../context";
import { SectionHead, wrap } from "../../../site/site-ui";
import { getCentreT } from "../messages";
import { DoctorCard } from "./doctor-card";

// Doctors: the directory, filtered by department.
export function DoctorsPage() {
  const { store, locale } = useClinic();
  const t = getCentreT(locale);
  const departments = store((state) => state.departments);
  const doctors = store((state) => state.doctors);
  const [departmentId, setDepartmentId] = useState("");
  const shown = doctors.filter((doctor) => !departmentId || doctor.departmentId === departmentId);
  const filters = [
    { id: "", label: t("doctors.all") },
    ...departments.map((item) => ({ id: item.id, label: item.name[locale] })),
  ];

  return (
    <div className={`${wrap} space-y-8 py-12`}>
      <SectionHead
        level={1}
        pill={t("nav.doctors")}
        title={t("doctors.title")}
        titleId="doctors-title"
        intro={t("doctors.intro")}
      />
      <div role="group" aria-label={t("doctors.filter")} className="flex flex-wrap justify-center gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            aria-pressed={departmentId === filter.id}
            onClick={() => setDepartmentId(filter.id)}
            className="min-h-11 rounded-full bg-border px-5 text-sm font-medium text-text aria-pressed:bg-primary aria-pressed:text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            {filter.label}
          </button>
        ))}
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((doctor) => (
          <li key={doctor.id}>
            <DoctorCard doctor={doctor} />
          </li>
        ))}
      </ul>
    </div>
  );
}
