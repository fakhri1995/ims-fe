/**
 * @access POST /addTask
 */
export interface AddTaskPayload {
  name: string;
  description: string;
  task_type_id: number;
  location_id: number;
  reference_id: number;
  created_at: /** Date */ string;
  deadline: /** Date */ string;
  is_group: boolean;
  is_replaceable: boolean;
  assign_ids: number[];
  inventory_ids: number[];
  is_uploadable: boolean;
  repeat: number;
  files: string[];
}

/**
 * @access POST /saveFilesTask
 */
export interface SaveFilesTaskPayload {
  id: number;
  attachments: File[];
}

/**
 * @access DELETE /deleteFileTask
 */
export interface DeleteFileTaskPayload {
  task_id: number;
  id: number; // file id
}
