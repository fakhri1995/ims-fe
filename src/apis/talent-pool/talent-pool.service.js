import { notification } from "antd";
import QueryString from "qs";

import { objectToFormData, permissionWarningNotification } from "lib/helper";

export class TalentPoolService {
  static getCategories = async (initProps, feature) => {
    if (!feature) {
      permissionWarningNotification(
        "Mendapatkan",
        "Daftar Kategori Talent Pool"
      );
      return;
    }

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTalentPoolCategories`,
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

  static getTalentPools = async (initProps, feature, queryParams, keyword) => {
    if (!feature) {
      permissionWarningNotification("Mendapatkan", "Daftar Talent Pool");
      return;
    }

    const payload = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTalentPools${payload}&keyword=${keyword}`,
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

  static getFilters = async (initProps, feature, categoryId) => {
    if (!feature) {
      permissionWarningNotification("Mendapatkan", "Daftar Talent Pool Filter");
      return;
    }

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTalentPoolFilters?category_id=${categoryId}`,
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

  static getCandidates = async (initProps, feature, queryParams, keyword) => {
    if (!feature) {
      permissionWarningNotification(
        "Mendapatkan",
        "Daftar Kandidat Talent Pool"
      );
      return;
    }

    const payload = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTalentPoolCandidates${payload}&keyword=${keyword}`,
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

  static getTalent = async (initProps, feature, talentId) => {
    if (!feature) {
      permissionWarningNotification("Mendapatkan", "Data Talent");
      return;
    }

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTalentPool?id=${talentId}`,
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

  /** Shared Link **/
  static generateSharedLink = async (initProps, feature, payload) => {
    if (!feature) {
      permissionWarningNotification("Membuat", "Link Talent Pool");
      return;
    }

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/addTalentPoolShare`,
      {
        method: `POST`,
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        return res2;
      });
    return apiRes;
  };

  static getSharedLinks = async (initProps, feature, categoryId) => {
    if (!feature) {
      permissionWarningNotification("Mendapat", "Daftar Link Talent Pool");
      return;
    }

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTalentPoolShares?category_id=${categoryId}`,
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

  static deleteSharedLink = async (initProps, feature, linkId) => {
    if (!feature) {
      permissionWarningNotification("Menghapus", "Link Talent Pool");
      return;
    }

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteTalentPoolShare?id=${linkId}`,
      {
        method: `DELETE`,
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        return res2;
      });
    return apiRes;
  };

  /** Public Talent Pool */
  static getPublicTalentPools = async (feature, queryParams, keyword) => {
    if (!feature) {
      permissionWarningNotification(
        "Mendapatkan",
        "Daftar Talent yang Dibagikan"
      );
      return;
    }

    const payload = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    const apiRes = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/getTalentPoolSharePublics${payload}&keyword=${keyword || ""}`,
      {
        method: `GET`,
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        return res2;
      });

    return apiRes;
  };

  static getPublicResume = async (feature, resumeId) => {
    if (!feature) {
      permissionWarningNotification("Mendapatkan", "Public Resume");
      return;
    }

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTalentPoolSharePublic?id=${resumeId}`,
      {
        method: `GET`,
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        return res2;
      });

    return apiRes;
  };

  static eliminate = async (feature, linkCode, talentId) => {
    if (!feature) {
      permissionWarningNotification("Mengeliminasi", "Talent");
      return;
    }

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/eliminateTalentPoolSharePublic?share_code=${linkCode}&talent_id=${talentId}`,
      {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        return res2;
      });
    return apiRes;
  };

  static cancelEliminate = async (feature, linkCode, talentId) => {
    if (!feature) {
      permissionWarningNotification("Membatalkan", "Eliminasi Talent");
      return;
    }

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/cancelTalentPoolSharePublic?share_code=${linkCode}&talent_id=${talentId}`,
      {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        return res2;
      });
    return apiRes;
  };
}
