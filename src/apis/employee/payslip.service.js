import { notification } from "antd";
import QueryString from "qs";

import { permissionWarningNotification } from "lib/helper";

export class PayslipService {
  static getCompanyClientList = async (initProps, feature) => {
    if (!feature) {
      permissionWarningNotification("Mendapatkan", "Daftar Company Client");
      return;
    }

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyClientList?with_mig=1`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          return res2;
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
      });

    return apiRes;
  };

  static getEmployeeRoleList = async (initProps, feature) => {
    if (!feature) {
      permissionWarningNotification("Mendapatkan", "Daftar Employee Role");
      return;
    }

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentRolesList`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          return res2;
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
      });

    return apiRes;
  };

  static getPayslipStatusCount = async (initProps, feature) => {
    if (!feature) {
      permissionWarningNotification(
        "Mendapatkan",
        "Data Chart Status Karyawan"
      );
      return;
    }

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeePayslipStatusCount`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          return res2;
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
      });

    return apiRes;
  };

  static getPayslips = async (initProps, feature, queryParams, keyword) => {
    if (!feature) {
      permissionWarningNotification("Mendapatkan", "Daftar Slip Gaji");
      return;
    }

    const payload = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeesPayslip${payload}&keyword=${keyword}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          return res2;
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
      });

    return apiRes;
  };

  static getEmployeePayslips = async (
    initProps,
    feature,
    queryParams,
    keyword
  ) => {
    if (!feature) {
      permissionWarningNotification("Mendapatkan", "Daftar Slip Gaji Karyawan");
      return;
    }

    const payload = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeePayslips${payload}&keyword=${keyword}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          return res2;
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
      });

    return apiRes;
  };

  static getEmployee = async (initProps, feature, employeeId) => {
    if (!feature) {
      permissionWarningNotification("Mendapatkan", "Detail Karyawan");
      return;
    }

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployee?id=${employeeId}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          return res2;
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
      });

    return apiRes;
  };
}
