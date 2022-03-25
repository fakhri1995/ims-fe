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

/**
 * Response dari backend ketika melakukan komunikasi ke beberapa endpoint.
 * Biasanya endpoint dengan method POST, PUT, atau DELETE.
 *
 * Menandakan kalau transaksi (data) berhasil.
 */
export interface HttpRequestBaseSucceedResponse {
  success: boolean;
  message: string;
  status: number;
}

/**
 * Response backend ketika endpoint mengahsilkan suatu data.
 */
export interface HttpRequestWithDataSucceedResponse<DataType>
  extends HttpRequestBaseSucceedResponse {
  data: DataType;
}

/**
 * Sama seperti @see HttpRequestBaseSucceedResponse akan tetapi digunakan ketika
 * transaksi gagal.
 *
 * NOTE: Saya belum pernah ketemu response / kondisi ini, tapi siapin aja :) -kennan
 */
export interface HttpRequestBaseFailedResponse {
  success: boolean;
  message: {
    errorInfo: {
      status: number;
      reason: string;
      server_code: number;
      status_detail: string;
    };
  };
}
