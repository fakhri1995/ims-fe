import { notification } from "antd";
import QueryString from "qs";

import { permissionWarningNotification } from "lib/helper";

export class ProjectManagementService {
  static getProjects = async (initProps, feature, queryParams, keyword) => {
    if (!feature) {
      permissionWarningNotification("Mendapatkan", "Daftar Proyek");
      return;
    }

    const params = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjects${params}&keyword=${keyword}`,
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

  static getRoleTypeList = async (initProps, feature) => {
    if (!feature) {
      permissionWarningNotification("Mendapatkan", "Daftar Tipe Role");
      return;
    }

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentRoleTypesList`,
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

  static getEmployeePlacementCount = async (initProps, feature) => {
    if (!feature) {
      permissionWarningNotification(
        "Mendapatkan",
        "Statistik Employee Placement"
      );
      return;
    }

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeePlacementsCount`,
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

  static getEmployeeRoleCount = async (initProps, feature) => {
    if (!feature) {
      permissionWarningNotification("Mendapatkan", "Statistik Employee Role");
      return;
    }

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeeRolesCount`,
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

  static getEmployeeStatusCount = async (initProps, feature) => {
    if (!feature) {
      permissionWarningNotification("Mendapatkan", "Statistik Employee Status");
      return;
    }

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeeStatusesCount`,
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
