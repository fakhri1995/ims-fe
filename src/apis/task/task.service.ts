import type { AxiosInstance } from "axios";

import { objectToFormData } from "lib/helper";

import type {
  AddTaskPayload,
  DeleteFileTaskPayload,
  SaveFilesTaskPayload,
} from "./task.types";

import type { HttpRequestBaseSucceedResponse } from "types/common";

export class TaskService {
  /**
   * Create a new task.
   *
   * @access POST /addTask
   */
  static async add(axiosClient: AxiosInstance, payload: AddTaskPayload) {
    return await axiosClient.post<
      HttpRequestBaseSucceedResponse & { id: number }
    >("/addTask", payload);
  }

  /**
   * Add one or more files to a task.
   *
   * @access POST /saveFilesTask
   */
  static async saveFilesTask(
    axiosClient: AxiosInstance,
    payload: SaveFilesTaskPayload
  ) {
    const payloadFormData = objectToFormData(payload);

    return await axiosClient.post("/saveFilesTask", payloadFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  /**
   * @access DELETE /deleteFileTask
   */
  static async deleteFileTask(
    axiosClient: AxiosInstance,
    payload: DeleteFileTaskPayload
  ) {
    return await axiosClient.delete<HttpRequestBaseSucceedResponse>(
      "/deleteFileTask",
      { data: payload }
    );
  }
}
