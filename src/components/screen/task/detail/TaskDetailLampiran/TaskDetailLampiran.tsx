import { Button, Upload, notification } from "antd";
import type { RcFile, UploadChangeParam } from "antd/es/upload/interface";
import type { UploadFile } from "antd/lib/upload/interface";
import { FC, useCallback, useEffect, useState } from "react";

import { CloudUploadIconSvg } from "components/icon";
import { H2 } from "components/typography";

import { useAxiosClient } from "hooks/use-axios-client";

import { beforeUploadFileMaxSize, generateStaticAssetUrl } from "lib/helper";

import { TaskService } from "apis/task";

interface ITaskDetailLampiran {
  onNewFileChanged: (files: RcFile[]) => void;
  currentAttachments: { id: number; link: string; description: string }[];

  isSeenAsCreator: boolean;
  isTaskSubmitted: boolean;
  isSubmitting: boolean;

  taskId: number;
}

export const TaskDetailLampiran: FC<ITaskDetailLampiran> = ({
  onNewFileChanged,
  currentAttachments,
  isSeenAsCreator = false,
  isTaskSubmitted = false,
  isSubmitting,
  taskId,
}) => {
  const axiosClient = useAxiosClient();

  const shouldHideUploadFileButton = isSeenAsCreator ? true : isTaskSubmitted;
  const canRemoveFile = isSeenAsCreator ? false : !isTaskSubmitted;

  const [fileBlobBuffer, setFileBlobBuffer] = useState<RcFile[]>([]);
  const [fileListBuffer, setFileListBuffer] = useState<UploadFile[]>([]);

  /**
   * Effect untuk mapping antara file yang sudah ada di backend (FE terima)
   *  menjadi bentuk file yang dapat dimengerti oleh component `<Upload>`.
   *
   * Tujuan mapping ini adalah agar component `<Upload>` dapat menampilkan daftar
   *  antara file yang sudah ada dan akan (baru) diupload
   */
  useEffect(() => {
    if (currentAttachments === undefined) {
      return;
    }

    if (currentAttachments.length === 0) {
      return;
    }

    const asFileListBuffer: UploadFile[] = currentAttachments.map(
      ({ id, link }) => ({
        uid: id.toString(),
        name: link.split("/").pop(),
        status: "done",
        url: generateStaticAssetUrl(link),
      })
    );

    setFileListBuffer(asFileListBuffer);
  }, [currentAttachments]);

  /**
   * Effect untuk memperbarui payload `attachments` pada parent component.
   * `attachments` berupa array of File (blob).
   *
   * Effect ini selalu berubah jika terjadi perubahan (insert or remove) file yang
   *  ter-trigger oleh callback `onUploadFileChange`
   */
  useEffect(() => {
    onNewFileChanged?.call(null, fileBlobBuffer);
  }, [onNewFileChanged, fileBlobBuffer]);

  /**
   * Callback untuk handle upload file changes.
   */
  const onUploadFileChange = useCallback(
    ({ file, fileList }: UploadChangeParam<UploadFile<RcFile>>) => {
      if (file.status === "done") {
        setFileBlobBuffer((prev) => [...prev, file.originFileObj]);
      }

      if (file.status === "removed") {
        const fileUid = file.uid;
        /**
         * Kalau UID starts with "rc-" artinya file itu baru saja diupload dan belum terdaftar di backend (storage service).
         *
         * Jikai UID bernilai "231" plain number, itu artinya file sudah tersimpan di backend.
         */
        const isExistingFile = fileUid.split("-")[0].toLowerCase() !== "rc";
        if (isExistingFile) {
          TaskService.deleteFileTask(axiosClient, {
            id: Number(fileUid),
            task_id: taskId,
          })
            .then((response) => {
              notification.success({ message: response.data.message });
              setFileListBuffer(fileList);
            })
            .catch(() => {
              // Jika terjadi kegagalan saat menghapus file, tidak perlu memperbarui state `fileListBuffer`.
              notification.error({
                message: `Terjadi kesalahan saat menghapus File lampiran: ${file.name}`,
              });
            });
          return;
        }

        setFileBlobBuffer((prev) =>
          prev.filter((file) => file.uid !== fileUid)
        );
      }

      setFileListBuffer(fileList);
    },
    [taskId]
  );

  return (
    <div className="w-full relative">
      <H2>Lampiran</H2>
      <Upload
        className="w-full text-primary100"
        accept=".jpg,.jpeg,.png,.gif,.tiff,.svg,.pdf,.doc,.docx,.xls,.xlsx,.csv,.tsv"
        showUploadList={{
          showDownloadIcon: true,
          downloadIcon: "Download",
          showRemoveIcon: canRemoveFile,
          removeIcon: "Remove",
        }}
        beforeUpload={beforeUploadFileMaxSize()}
        fileList={fileListBuffer}
        onChange={onUploadFileChange}
      >
        <Button
          disabled={isSubmitting}
          className="absolute top-0 right-0 flex items-center bg-white rounded-md border-primary100 hover:bg-primary75 focus-within:bg-white  text-primary100 hover:text-white focus-within:text-primary100 font-bold hover:border-primary75 focus-within:border-primary100"
          hidden={shouldHideUploadFileButton}
        >
          <CloudUploadIconSvg size={15} color={`#35763B`} />
          Unggah Lampiran
        </Button>
      </Upload>
    </div>
  );
};
