import type { IDetailProfileSucceedResponse } from "apis/auth";

/**
 * Props yang digunakan untuk pages (mungkin semua) yang menggunakan SSR.
 *
 * Kedua property berikut dibutuhkan oleh component <LayoutDashboard />.
 *
 * TODO: Refactor / better solution to prevent boilerplate code.
 */
export interface ProtectedPageProps {
  token: string;
  dataProfile: IDetailProfileSucceedResponse;
}

/**
 * Digunakan untuk implementasi breadcrumb dengan strategi baru (fixed and defined ahead of time)
 *  pada komponen <LayoutDashboard> (layout-dashboardNew).
 */
export interface PageBreadcrumbValue {
  name: string;
  hrefValue?: string;
}
