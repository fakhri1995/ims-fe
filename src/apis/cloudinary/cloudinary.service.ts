import type { RcFile } from "antd/lib/upload";
import type { AxiosInstance } from "axios";

import { IUploadCloudinaryImageSucceedResponse } from "./cloudinary.types";

export class CloudinaryService {
  /**
   * Upload a picture to Cloudinary storage service.
   *
   * @access POST https://api.Cloudinary.com/v1_1/aqlpeduli/image/upload
   */
  static async uploadOne(axiosClient: AxiosInstance, file: RcFile | Blob) {
    const payload = new FormData();
    payload.append("file", file);
    payload.append("upload_preset", "migsys");

    return await axiosClient.post<IUploadCloudinaryImageSucceedResponse>(
      "https://api.Cloudinary.com/v1_1/aqlpeduli/image/upload",
      payload
    );
  }
}
