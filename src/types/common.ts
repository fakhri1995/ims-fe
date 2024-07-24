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
 * Response backend ketika endpoint menghasilkan suatu data dan terdapat paging.
 */
export interface HttpRequestWithDataAndPagingSucceedResponse<DataType>
  extends HttpRequestBaseSucceedResponse {
  data: Paging<DataType>;
}

export interface Paging<DataType> {
  current_page: number;
  data: DataType[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: string;
  prev_page_url: null;
  to: number;
  total: number;
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

/**
 * New DTO shape for every `profile_image` attribute.
 *
 * Note: Perubahan attribute `profile_image` dari string menjadi object berlaku sejak 2022-05-18
 *  dikarenakan backend sudah terintegraasi dengan Digital Ocean Space (storage service).
 */
export interface ProfileImageAttribute {
  id: number;
  link: string;
  description: string;
}

export interface IFileAttribute {
  id: number;
  link: string;
  description: string;
}
