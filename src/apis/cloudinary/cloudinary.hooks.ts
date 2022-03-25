import type { RcFile } from "antd/lib/upload";
import axios from "axios";
import { useMutation } from "react-query";

import { CloudinaryService } from "./cloudinary.service";

/**
 * Custom hook untuk upload image ke Cloudinary storage service.
 */
export const useCloudinaryUploadOne = () => {
  const axiosClient = axios.create();

  return useMutation((file: RcFile) =>
    CloudinaryService.uploadOne(axiosClient, file)
  );
};
