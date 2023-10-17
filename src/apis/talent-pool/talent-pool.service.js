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

  static getCandidates = async (initProps, feature, queryParams) => {
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTalentPoolCandidates${payload}`,
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

  // static getContract = async (initProps, feature, contractId) => {
  //   if (!feature) {
  //     permissionWarningNotification("Mendapatkan", "Data Contract");
  //     return;
  //   }

  //   const apiRes = await fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/getContract?id=${contractId}`,
  //     {
  //       method: `GET`,
  //       headers: {
  //         Authorization: JSON.parse(initProps),
  //       },
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((res2) => {
  //       if (res2.success) {
  //         return res2;
  //       } else {
  //         notification.error({
  //           message: `${res2.message}`,
  //           duration: 3,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       notification.error({
  //         message: `${err.response}`,
  //         duration: 3,
  //       });
  //     });

  //   return apiRes;
  // };
}
