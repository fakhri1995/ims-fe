import type { AxiosInstance } from "axios";
import { addDays } from "date-fns";
import QueryString from "qs";

import { formatDateToLocale } from "lib/date-utils";
import { objectToFormData } from "lib/helper";

import { ProjectExportExcelDataResult } from "./project.types";

import { HttpRequestBaseSucceedResponse } from "types/common";

export class ProjectService {
  /**
   * Retrieve a binary large object file (Excel file, I assume) from the backend.
   *
   * @access GET /exportAttendanceActivityUsers
   * @access GET /exportAttendanceActivityUser
   */
  static async exportExcelData(
    axiosClient: AxiosInstance
  ): Promise<ProjectExportExcelDataResult | Error> {
    const endpoint = "/exportProjects";

    const result: ProjectExportExcelDataResult = {
      file: null,
      fileName: "",
    };

    try {
      const response = await axiosClient.get(endpoint, {
        responseType: "blob",
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      });

      const fileName = "project-".concat(
        formatDateToLocale(Date.now(), "yyyy-MM-dd"),
        ".xlsx"
      );
      result.file = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      result.fileName = fileName.concat("-", fileName);
    } catch (error) {
      return error;
    }

    return result;
  }
}
