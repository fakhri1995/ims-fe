import { notification } from "antd";
import QueryString from "qs";

import { objectToFormData, permissionWarningNotification } from "lib/helper";

export class ProductCatalogService {
  static getInventories = async (initProps, feature, keyword) => {
    if (!feature) {
      permissionWarningNotification("Mendapatkan", "Daftar Product Inventory");
      return;
    }

    // const payload = QueryString.stringify(queryParams, {
    //   addQueryPrefix: true,
    // });

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProductInventories?keyword=${keyword}`,
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

    setTimeout(() => apiRes, 500);

    return apiRes;
  };
}
