import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, Form, Modal, Radio, Upload, message } from "antd";
import { RcFile } from "antd/lib/upload";
import { FC, useCallback, useState } from "react";

import DrawerCore from "components/drawer/drawerCore";

import { getBase64 } from "lib/helper";

/**
 * Component AttendanceStaffCheckInDrawer's props.
 */
export interface IAttendanceStaffCheckInDrawer {
  visible: boolean;
  onClose: () => void;
}

/**
 * Component AttendanceStaffCheckInDrawer
 */
export const AttendanceStaffCheckInDrawer: FC<
  IAttendanceStaffCheckInDrawer
> = ({ visible, onClose }) => {
  /** Uploaded file object. Wrapped as RcFile. */
  const [uploadedEvidencePicture, setUploadedEvidencePicture] =
    useState<RcFile | null>(null);

  /** Toggle preview modal on and off. */
  const [isPreviewEvidencePicture, setIsPreviewEvidencePicutre] =
    useState(false);

  /** Either empty string or long long string (base64) from a file (`uploadedEvidencePicture`). */
  const [previewEvidencePictureData, setPreviewEvidencePictureData] =
    useState("");

  /**
   * Validating uploaded file before finally attached to the paylaod.
   *
   * - Size max 5 MiB
   * - File type should satisfy ["image/png", "image/jpeg"]
   */
  const beforeUploadEvidencePicture = useCallback<
    Pick<UploadProps, "beforeUpload">["beforeUpload"]
  >((uploadedFile) => {
    const allowedFileTypes = ["image/png", "image/jpeg"];
    if (!allowedFileTypes.includes(uploadedFile.type)) {
      return Upload.LIST_IGNORE;
    }

    const fileSizeInMb = Number.parseFloat(
      (uploadedFile.size / 1024 / 1024).toFixed(4)
    );
    if (fileSizeInMb > 5) {
      message.error({
        content: "Ukuran file melebih batas persyaratan!",
      });
      return Upload.LIST_IGNORE;
    }

    setUploadedEvidencePicture(uploadedFile);
  }, []);

  const onRemoveEvidencePicture = useCallback(() => {
    setUploadedEvidencePicture(null);
  }, []);

  const onPreviewEvidencePicture = useCallback(async () => {
    const previewImageData = (await getBase64(
      uploadedEvidencePicture
    )) as string;

    setPreviewEvidencePictureData(previewImageData);
    setIsPreviewEvidencePicutre(true);
  }, [uploadedEvidencePicture]);

  return (
    <>
      <DrawerCore
        title="Check In"
        buttonOkText="Check In"
        visible={visible}
        onClose={onClose}
      >
        <div className="space-y-6">
          {/* Required field information */}
          <em className="text-state1">* Informasi ini harus diisi</em>

          {/* Location */}

          {/* Kerja Dari */}
          <Form>
            <Form.Item
              name="work_from"
              label="Kerja Dari"
              required
              className="block"
            >
              <Radio.Group defaultValue="WFH">
                <Radio value="WFH" className="block">
                  WFH
                </Radio>
                <Radio value="WFO" className="block">
                  WFO
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="evidence_image"
              label="Bukti Kehadiran"
              required
              className="block"
            >
              <div className="flex flex-col space-y-6">
                <Upload
                  capture
                  listType="picture"
                  name="file"
                  accept="image/png, image/jpeg"
                  maxCount={1}
                  beforeUpload={beforeUploadEvidencePicture}
                  onRemove={onRemoveEvidencePicture}
                  onPreview={onPreviewEvidencePicture}
                >
                  <Button className="mig-button mig-button--outlined-primary">
                    <UploadOutlined />
                    Unggah File
                  </Button>
                </Upload>
                <em className="text-mono50">
                  Unggah File JPEG (Maksimal 5 MB)
                </em>
              </div>
            </Form.Item>
          </Form>

          {/* Bukti Kehadiran */}
        </div>
      </DrawerCore>

      <Modal
        title="Foto Bukti Kehadiran"
        visible={isPreviewEvidencePicture}
        footer={null}
        onCancel={() => setIsPreviewEvidencePicutre(false)}
        centered
      >
        <img alt="Preview Evidence Picture" src={previewEvidencePictureData} />
      </Modal>
    </>
  );
};
