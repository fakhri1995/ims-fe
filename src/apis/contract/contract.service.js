import { notification } from "antd";
import QueryString from "qs";

import { objectToFormData, permissionWarningNotification } from "lib/helper";

export class ContractService {
  static getCountContract = async (initProps, feature) => {
    if (!feature) {
      permissionWarningNotification("Mendapatkan", "Data Contract Count");
      return;
    }

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getCountRecruitment`,
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
