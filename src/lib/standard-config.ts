/**
 * Module ini berisikan functions yang dapat membantu untuk bootstrap
 *  konfigurasi suatu komponen.
 *
 * Agar setiap konfigurasi komponen konsisten dan tidak perlu mengulang setiap membuat komponen,
 *  maka dibuatlah module ini.
 */
import type { TablePaginationConfig } from "antd/lib/table";

/**
 * Function ini digunakan untuk generate standard configuration untuk props pada
 *  komponen <Table> Ant Design.
 *
 * Base configurations untuk pagination pada component table antara lain:
 * - Posisi pagination berada di sebelah kanan
 * - Menampilkan size change
 * - Menambahkan space (padding top) antara table dengan pagination
 *
 * @example
 * ```tsx
 * <Table pagination={getAntdTablePagination()} />
 * ```
 */
export const getAntdTablePaginationConfig = (
  extraConf?: Partial<TablePaginationConfig>
): TablePaginationConfig => {
  return {
    position: ["bottomRight"],
    className: "pt-6",
    showSizeChanger: true,
    ...extraConf,
  };
};
