import { CameraOutlined, UploadOutlined } from "@ant-design/icons";
import { Input, Spin, UploadProps, notification } from "antd";
import { Button, Form, Modal, Radio, Upload } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile, UploadChangeParam } from "antd/lib/upload";
import type { AxiosError } from "axios";
import { FC, useCallback, useEffect, useState } from "react";

import DrawerCore from "components/drawer/drawerCore";

import { useGeolocationAPI } from "hooks/use-geolocation-api";

import { getBase64 } from "lib/helper";

import { useGetAttendeeInfo, useToggleCheckInCheckOut } from "apis/attendance";
import { useNominatimReverseGeocode } from "apis/nominatim";

import { AttendanceStaffWebcamModal } from ".";

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
  const { mutate: toggleCheckInCheckOut, isLoading: checkInOutLoading } =
    useToggleCheckInCheckOut();

  const { position, isPermissionBlocked } = useGeolocationAPI();

  /** Field: Lokasi saat ini */
  const { data: locationDisplayName, isLoading: locationDisplayNameLoading } =
    useNominatimReverseGeocode(position);

  const [uploadPictureLoading, setUploadPictureLoading] = useState(false);

  /** Uploaded file object. Wrapped as RcFile. Used as payload. */
  const [uploadedEvidencePicture, setUploadedEvidencePicture] = useState<
    RcFile | Blob | File
  >(null);

  /** Toggle preview modal on and off. */
  const [isPreviewEvidencePicture, setIsPreviewEvidencePicutre] =
    useState(false);

  /** Either empty string or long long string (base64) from a file (`uploadedEvidencePicture`). */
  const [previewEvidencePictureData, setPreviewEvidencePictureData] =
    useState("");

  const [fileList, setFileList] = useState<UploadFile<RcFile>[]>([]);
  const onUploadChange = useCallback(
    ({ file }: UploadChangeParam<UploadFile<RcFile>>) => {
      setUploadPictureLoading(file.status === "uploading");

      if (file.status !== "removed") {
        setFileList([file]);
      }
    },
    []
  );

  const [isWebcamModalShown, setIsWebcamModalShown] = useState(false);

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
    setFileList([]);
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
      // notification.warning({
      //   message: `Lokasi belum sesuai, pastikan lokasi anda sesuai dengan tempat anda bekerja`,
      // });
      toggleCheckInCheckOut(
        {
          evidence: uploadedEvidencePicture,
          geo_loc: locationDisplayName || "",
          lat: position?.coords.latitude.toString(),
          long: position?.coords.longitude.toString(),
          wfo: value?.work_from === "WFO" ? 1 : 0,
        },
        {
          onSuccess: (response) => {
            setUploadedEvidencePicture(null);
            setPreviewEvidencePictureData("");
            setFileList([]);

            form.resetFields();
            onClose();

            notification.success({ message: response.data.message });
          },
          onError: (error: AxiosError) => {
            const errorMessage = error.response.data.message;
            const actualErrorMessage =
              "errorInfo" in errorMessage
                ? errorMessage["errorInfo"].pop()
                : errorMessage;

            notification.error({ message: actualErrorMessage });
          },
        }
      );
    },
    [uploadedEvidencePicture]
  );

  const onWebcamModalFinished = useCallback((result: string) => {
    /**
     * 1. Set uploaded evidence picture
     * 2. Set uploaded evidence picture data (base64) for preview purpose
     */
    (async () => {
      const base64ToBlob = await (await fetch(result)).blob();

      const fileLastModifiedTimestamp = Date.now();
      const fileName = `capture_${fileLastModifiedTimestamp}.jpeg`;

      const blobFile = new File([base64ToBlob], "webcam_picture.jpeg", {
        type: "image/jpeg",
        lastModified: fileLastModifiedTimestamp,
      });

      // Update the image preview component
      setFileList([
        {
          uid: fileLastModifiedTimestamp.toString(),
          name: fileName,
          status: "done",
          url: result,
        },
      ]);
      // Update File payload
      setUploadedEvidencePicture(blobFile);
      // Set preview base64 data
      setPreviewEvidencePictureData(result);

      // close the modal
      setIsWebcamModalShown(false);
    })();
  }, []);

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
        disabled={
          uploadPictureLoading ||
          uploadedEvidencePicture === null ||
          checkInOutLoading
        }
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
                    initialValue="WFO"
                  >
                    <Radio.Group disabled={uploadPictureLoading}>
                      <Radio value="WFO" className="block">
                        WFO
                      </Radio>
                      <Radio value="WFH" className="block">
                        WFH
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
                    <div className="relative">
                      {/* Gunakan camera */}
                      <div className="flex items-center space-x-5">
                        <Button
                          className="mig-button mig-button--outlined-primary self-start"
                          onClick={() => {
                            setIsWebcamModalShown(true);
                          }}
                        >
                          <CameraOutlined />
                          Ambil Foto
                        </Button>

                        <span className="mig-caption--medium text-mono50">
                          Atau
                        </span>
                      </div>

                      {/* Upload from file */}
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
                        fileList={fileList}
                        onChange={onUploadChange}
                      >
                        <Button className="mig-button mig-button--outlined-primary absolute top-0 right-0">
                          <UploadOutlined />
                          Unggah File
                        </Button>
                      </Upload>
                    </div>

                    <em className="text-mono50">
                      Unggah File JPEG (Maksimal 5 MB)
                    </em>
                  </div>
                </Form.Item>
              </Form>
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

      <AttendanceStaffWebcamModal
        visible={isWebcamModalShown}
        onCancel={() => setIsWebcamModalShown(false)}
        onOk={onWebcamModalFinished}
      />
    </>
  );
};
