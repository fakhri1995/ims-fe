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
