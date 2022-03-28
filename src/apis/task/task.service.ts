import type { AxiosInstance } from "axios";

import type { AddTaskPayload } from "./task.types";

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
}
