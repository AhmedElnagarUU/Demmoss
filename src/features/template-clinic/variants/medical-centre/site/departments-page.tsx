"use client";

import Link from "next/link";
import { useClinic } from "../../../context";
import { PriceTable } from "../../../site/site-parts";
import { Block, primaryButton, SectionHead, wrap } from "../../../site/site-ui";
import { getCentreT } from "../messages";

// Departments: for each, what it treats, its doctors, and the price of every service (clear prices decide the booking).
export function DepartmentsPage() {
  const { store, config, locale } = useClinic();
  const t = getCentreT(locale);
  const departments = store((state) => state.departments);
  const doctors = store((state) => state.doctors);
  const treatments = store((state) => state.treatments);
  const root = `/${locale}${config.basePath}`;

  return (
    <>
      <div className={`${wrap} pt-12`}>
        <SectionHead
          level={1}
          pill={t("nav.departments")}
          title={t("departments.title")}
          titleId="departments-title"
          intro={t("departments.intro")}
        />
      </div>
      {departments.map((department, index) => {
        const items = treatments.filter((treatment) => treatment.departmentId === department.id);
        const team = doctors.filter((doctor) => doctor.departmentId === department.id);
        return (
          <Block
            key={department.id}
            titleId={`department-${department.id}`}
            tone={index % 2 === 0 ? "soft" : "plain"}
          >
            <div id={department.id} className="scroll-mt-24 space-y-6">
              <div className="space-y-2">
                <h2 id={`department-${department.id}`} className="text-3xl font-medium rtl:leading-snug">
                  {department.name[locale]}
                </h2>
                <p className="max-w-2xl text-muted">{department.description[locale]}</p>
              </div>
              <h3 className="text-lg font-medium">{t("departments.services")}</h3>
              {items.length > 0 ? (
                <PriceTable treatments={items} locale={locale} />
              ) : (
                <p className="text-muted">{t("departments.noServices")}</p>
              )}
              {team.length > 0 ? (
                <>
                  <h3 className="text-lg font-medium">{t("departments.doctors")}</h3>
                  <ul className="flex flex-wrap gap-3">
                    {team.map((doctor) => (
                      <li key={doctor.id}>
                        <Link
                          href={`${root}/doctors/detail?id=${doctor.id}`}
                          className="inline-flex min-h-11 items-center rounded-full bg-bg px-5 font-medium ring-1 ring-border focus-visible:outline-2 focus-visible:outline-focus"
                        >
                          {doctor.name[locale]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
              {team[0] ? (
                <Link href={`${root}/book?doctor=${team[0].id}`} className={primaryButton}>
                  {t("departments.book")}
                </Link>
              ) : null}
            </div>
          </Block>
        );
      })}
    </>
  );
}
