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

  static getProjectList = async (initProps, feature) => {
    if (!feature) {
      permissionWarningNotification("Mendapatkan", "Daftar Proyek");
      return;
    }

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectsList`,
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

  static getProject = async (initProps, feature, projectId) => {
    if (!feature) {
      permissionWarningNotification("Mendapatkan", "Data Proyek");
      return;
    }

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProject?id=${projectId}`,
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

  static getProjectLogs = async (initProps, feature, queryParams, keyword) => {
    if (!feature) {
      permissionWarningNotification("Mendapatkan", "Log Aktivitas Proyek");
      return;
    }

    const params = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectLogs${params}&keyword=${keyword}`,
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

  static getProjectNotes = async (initProps, feature, queryParams, keyword) => {
    if (!feature) {
      permissionWarningNotification("Mendapatkan", "Catatan Proyek");
      return;
    }

    const params = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectLogNotes${params}&keyword=${keyword}`,
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

  static getTaskList = async (initProps, feature, queryParams) => {
    if (!feature) {
      permissionWarningNotification("Mendapatkan", "Daftar Task");
      return;
    }

    const params = QueryString.stringify(queryParams);

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectTasks?${params}`,
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

  static getAdminTaskList = async (
    initProps,
    feature,
    queryParams,
    keyword
  ) => {
    if (!feature) {
      permissionWarningNotification("Mendapatkan", "Daftar Task Admin");
      return;
    }

    const params = QueryString.stringify(queryParams);

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectTasksAdmin?${params}&keyword=${keyword}`,
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

  static getStatusList = async (initProps, feature) => {
    if (!feature) {
      permissionWarningNotification("Mendapatkan", "Daftar Status Proyek");
      return;
    }

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectStatuses`,
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

  static getProjectCategoryList = async (initProps, feature) => {
    if (!feature) {
      permissionWarningNotification("Mendapatkan", "Daftar Tag Proyek");
      return;
    }

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectCategoryList`,
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

  static getProjectStatusCount = async (initProps, feature) => {
    if (!feature) {
      permissionWarningNotification("Mendapatkan", "Data Chart Status Proyek");
      return;
    }

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectsCount`,
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

  static getProjectDeadlineCount = async (initProps, feature, queryParams) => {
    if (!feature) {
      permissionWarningNotification(
        "Mendapatkan",
        "Data Chart Deadline Proyek"
      );
      return;
    }

    const params = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectsDeadline${params}`,
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

  static getTaskStatusCount = async (initProps, feature, queryParams) => {
    if (!feature) {
      permissionWarningNotification("Mendapatkan", "Data Chart Status Task");
      return;
    }
    const params = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectTasksCount${
        params ?? ""
      }`,
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

  static getTaskDeadlineCount = async (
    initProps,
    feature,
    queryParams,
    projectId
  ) => {
    if (!feature) {
      permissionWarningNotification("Mendapatkan", "Data Chart Deadline Task");
      return;
    }

    const params = QueryString.stringify(queryParams);

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectTasksDeadline?${
        params ?? ""
      }&${projectId ? `&project_id=${projectId}` : ""}`,
      // + projectId
      //   ? `&project_id=${projectId}`
      //   : ""
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

  static getTaskStaffCount = async (initProps, feature) => {
    if (!feature) {
      permissionWarningNotification("Mendapatkan", "Data Chart Jumlah Staff");
      return;
    }

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectTaskStaffCount`,
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
