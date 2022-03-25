import { UploadOutlined } from "@ant-design/icons";
import { Input, Spin, UploadProps, notification } from "antd";
import { Button, Form, Modal, Radio, Upload } from "antd";
import { RcFile } from "antd/lib/upload";
import { AxiosError } from "axios";
import { FC, useCallback, useEffect, useState } from "react";

import DrawerCore from "components/drawer/drawerCore";

import { useGeolocationAPI } from "hooks/use-geolocation-api";

import { getBase64 } from "lib/helper";

import { useGetAttendeeInfo, useToggleCheckInCheckOut } from "apis/attendance";
import { useCloudinaryUploadOne } from "apis/cloudinary";
import { useNominatimReverseGeocode } from "apis/nominatim";

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
  const [form] = Form.useForm();

  const { attendeeStatus } = useGetAttendeeInfo();
  const { mutate: toggleCheckInCheckOut } = useToggleCheckInCheckOut();
  const { mutate: uploadPictureCloudinary, isLoading: uploadPictureLoading } =
    useCloudinaryUploadOne();

  const { position, isPermissionBlocked } = useGeolocationAPI();

  const { data: locationDisplayName, isLoading: locationDisplayNameLoading } =
    useNominatimReverseGeocode(position);

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
      notification.error({
        message: "Ukuran file melebih batas persyaratan!",
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

  const onFormSubmitted = useCallback(
    (value: { work_from?: "WFO" | "WFH"; evidence_image?: string }) => {
      uploadPictureCloudinary(uploadedEvidencePicture, {
        onSuccess: (response) => {
          const imageUrl = response.data.secure_url;

          toggleCheckInCheckOut(
            {
              evidence: imageUrl,
              geo_loc: locationDisplayName || "",
              lat: position?.coords.latitude.toString(),
              long: position?.coords.longitude.toString(),
              wfo: value?.work_from === "WFO",
            },
            {
              onSuccess: (response) => {
                setUploadedEvidencePicture(null);

                form.resetFields();
                onClose();

                notification.success({ message: response.data.message });
              },
              onError: (error: AxiosError) =>
                notification.error({ message: error.response.data.message }),
            }
          );
        },
        onError: () => {
          notification.error({
            message: "Terjadi kesalahan ketika upload picture.",
          });
        },
      });
    },
    [uploadedEvidencePicture]
  );

  useEffect(() => {
    if (visible && isPermissionBlocked) {
      Modal.error({
        centered: true,
        title: "Perhatian!",
        content: (
          <p>
            Mohon izinkan browser untuk dapat mengakses lokasi Anda saat ini
            dengan cara klik <strong>Allow</strong> pada Popup yang muncul di
            sebelah kiri atas.
          </p>
        ),
        okText: "Kembali",
        onOk: () => onClose(),
        onCancel: () => onClose(),
        closable: true,
      });
      return;
    }
  }, [visible, isPermissionBlocked]);

  const drawerTitleAndButtonContent =
    attendeeStatus === "checkout" ? "Check In" : "Check Out";
  const evidencePictureLabel =
    attendeeStatus === "checkout" ? "Bukti Kehadiran" : "Bukti Check Out";

  return (
    <>
      <DrawerCore
        title={drawerTitleAndButtonContent}
        buttonOkText={drawerTitleAndButtonContent}
        visible={visible}
        onClose={onClose}
        onClick={() => form.submit()}
        disabled={uploadPictureLoading}
      >
        <div className="space-y-6">
          {!isPermissionBlocked && (
            <>
              {/* Required field information */}
              <em className="text-state1">* Informasi ini harus diisi</em>

              <Form form={form} onFinish={onFormSubmitted} layout="vertical">
                {/* Location */}
                <Form.Item name="current_location" label="Lokasi saat ini">
                  {!locationDisplayNameLoading ? (
                    <Input
                      disabled
                      placeholder={locationDisplayName || ""}
                      className="text-mono30 placeholder-gray-900 disabled:bg-transparent font-bold border-none p-0"
                    />
                  ) : (
                    <Spin />
                  )}
                </Form.Item>

                {/* Kerja Dari: hanya tampilkan ketika Check In */}
                {attendeeStatus === "checkout" && (
                  <Form.Item
                    name="work_from"
                    label="Kerja Dari"
                    required
                    initialValue="WFH"
                  >
                    <Radio.Group disabled={uploadPictureLoading}>
                      <Radio value="WFH" className="block">
                        WFH
                      </Radio>
                      <Radio value="WFO" className="block">
                        WFO
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                )}

                {/* Bukti Kehadran */}
                <Form.Item
                  name="evidence_image"
                  label={evidencePictureLabel}
                  required
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
                      disabled={uploadPictureLoading}
                    >
                      <Button
                        className="mig-button mig-button--outlined-primary"
                        loading={uploadPictureLoading}
                      >
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

              {uploadPictureLoading && (
                <div className="flex flex-col items-center space-y-3">
                  <Spin size="large" />
                  <span className="mig-caption text-mono50">
                    Sedang mengupload foto...
                  </span>
                </div>
              )}
            </>
          )}
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
