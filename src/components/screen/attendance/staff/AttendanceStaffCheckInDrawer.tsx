import { CameraOutlined, UploadOutlined } from "@ant-design/icons";
import { Input, Select, Spin, UploadProps, notification } from "antd";
import { Button, Form, Modal, Radio, Upload } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile, UploadChangeParam } from "antd/lib/upload";
import type { AxiosError } from "axios";
import { FC, useCallback, useEffect, useState } from "react";

import DrawerCore from "components/drawer/drawerCore";

import { useGeolocationAPI } from "hooks/use-geolocation-api";

import {
  getBase64,
  notificationError,
  notificationSuccess,
  notificationWarning,
} from "lib/helper";

import { useGetAttendeeInfo, useToggleCheckInCheckOut } from "apis/attendance";
import { useNominatimReverseGeocode } from "apis/nominatim";

import { AttendanceStaffWebcamModal } from ".";

/**
 * Component AttendanceStaffCheckInDrawer's props.
 */
export interface IAttendanceStaffCheckInDrawer {
  visible: boolean;
  onClose: () => void;
  token: string;
  idCompany: number;
}

/**
 * Component AttendanceStaffCheckInDrawer
 */
export const AttendanceStaffCheckInDrawer: FC<
  IAttendanceStaffCheckInDrawer
> = ({ visible, onClose, token, idCompany }) => {
  const [form] = Form.useForm();

  const { attendeeStatus } = useGetAttendeeInfo();
  const { mutate: toggleCheckInCheckOut, isLoading: checkInOutLoading } =
    useToggleCheckInCheckOut();
  const [workFrom, setWorkFrom] = useState("WFO");
  const [placementDisable, setPlacementDisable] = useState(true);
  const [placement, setPlacement] = useState(null);
  const { position, isPermissionBlocked } = useGeolocationAPI();
  const [attendanceCodeId, setAttendanceCodeId] = useState(null);
  const [dataListAttendanceCode, setDataListAttendanceCode] = useState([]);
  const [perluVerifikasi, setPerluVerifikasi] = useState(null);
  /** Field: Lokasi saat ini */
  const { data: locationDisplayName, isLoading: locationDisplayNameLoading } =
    useNominatimReverseGeocode(position);

  const [uploadPictureLoading, setUploadPictureLoading] = useState(false);
  const [uploadSupportingFileLoading, setUploadSupportingFileLoading] =
    useState(false);
  /** Uploaded file object. Wrapped as RcFile. Used as payload. */
  const [uploadedEvidencePicture, setUploadedEvidencePicture] = useState<
    RcFile | Blob | File
  >(null);

  const [uploadedSupportingFile, setUploadedSupportingFile] = useState<
    RcFile | Blob | File
  >(null);

  /** Toggle preview modal on and off. */
  const [isPreviewEvidencePicture, setIsPreviewEvidencePicutre] =
    useState(false);

  /** Either empty string or long long string (base64) from a file (`uploadedEvidencePicture`). */
  const [previewEvidencePictureData, setPreviewEvidencePictureData] =
    useState("");

  const [fileList, setFileList] = useState<UploadFile<RcFile>[]>([]);
  const [supportingfileList, setSupportingFileList] = useState<
    UploadFile<RcFile>[]
  >([]);
  const onUploadChange = useCallback(
    ({ file }: UploadChangeParam<UploadFile<RcFile>>) => {
      setUploadPictureLoading(file.status === "uploading");
      if (file.status !== "removed") {
        setFileList([file]);
      }
    },
    []
  );

  const onUploadSupportFileChange = useCallback(
    ({ file }: UploadChangeParam<UploadFile<RcFile>>) => {
      setUploadSupportingFileLoading(file.status === "uploading");
      if (file.status !== "removed") {
        setSupportingFileList([file]);
      }
    },
    []
  );

  const [isWebcamModalShown, setIsWebcamModalShown] = useState(false);
  const attendanceCodeList = [
    {
      id: 1,
      name: "Present",
    },
    {
      id: 2,
      name: "Overtime",
    },
    {
      id: 3,
      name: "Unpaid Leave",
    },
    {
      id: 4,
      name: "Paid Leave",
    },
  ];
  interface MyOptionType {
    value: string | number;
    label: string;
    perlu_verifikasi?: boolean;
  }

  /**
   * Validating uploaded file before finally attached to the paylaod.
   *
   * - Size max 5 MiB
   * - File type should satisfy ["image/png", "image/jpeg"]
   */

  useEffect(() => {
    fetchData();
  }, []);
  // useEffect(() => {
  //   if (attendeeStatus == "checkin") {
  //     setPlacementDisable(false);
  //   } else {
  //     setPlacementDisable(true);
  //   }
  // }, [attendeeStatus]);

  const fetchData = async () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getCodesUser`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(token),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2?.data?.attendance_codes.length > 0) {
          setDataListAttendanceCode(res2.data.attendance_codes);
        } else {
          setDataListAttendanceCode([]);
        }
      });
  };
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
      notificationError({
        message: "File size exceeds the requirement limit!",
      });
      return Upload.LIST_IGNORE;
    }

    setUploadedEvidencePicture(uploadedFile);
  }, []);

  const onRemoveEvidencePicture = useCallback(() => {
    setFileList([]);
    setUploadedEvidencePicture(null);
  }, []);

  const beforeUploadSupportingFile = useCallback<
    Pick<UploadProps, "beforeUpload">["beforeUpload"]
  >((uploadedFile) => {
    // const allowedFileTypes = ["image/png", "image/jpeg"];
    // if (!allowedFileTypes.includes(uploadedFile.type)) {
    //   return Upload.LIST_IGNORE;
    // }
    const fileSizeInMb = Number.parseFloat(
      (uploadedFile.size / 1024 / 1024).toFixed(4)
    );
    if (fileSizeInMb > 5) {
      notificationError({
        message: "File size exceeds the requirement limit!",
      });
      return Upload.LIST_IGNORE;
    }

    setUploadedSupportingFile(uploadedFile);
  }, []);

  const onRemoveSupportingFile = useCallback(() => {
    setSupportingFileList([]);
    setUploadedSupportingFile(null);
  }, []);

  const onPreviewEvidencePicture = useCallback(async () => {
    const previewImageData = (await getBase64(
      uploadedEvidencePicture
    )) as string;

    setPreviewEvidencePictureData(previewImageData);
    setIsPreviewEvidencePicutre(true);
  }, [uploadedEvidencePicture]);

  const onFormSubmitted = useCallback(
    (value: {
      work_from?: "WFO" | "WFH";
      evidence_image?: string;
      subcompany: number;
    }) => {
      // console.log("upload evidence picture ", uploadedEvidencePicture);
      let payload;
      if (perluVerifikasi) {
        payload = {
          attendance_code_id: attendanceCodeId,
          support_file: uploadedSupportingFile,
          geo_loc: locationDisplayName || "",
          lat: position?.coords.latitude.toString(),
          long: position?.coords.longitude.toString(),
          wfo: value?.work_from === "WFO" ? 1 : 0,
          company_id: value?.subcompany,
        };
      } else {
        payload = {
          attendance_code_id: attendanceCodeId,
          evidence: uploadedEvidencePicture,
          geo_loc: locationDisplayName || "",
          lat: position?.coords.latitude.toString(),
          long: position?.coords.longitude.toString(),
          wfo: value?.work_from === "WFO" ? 1 : 0,
          company_id: value?.subcompany,
        };
      }
      // toggleCheckInCheckOut(payload, {
      //   onSuccess: (response) => {
      //     if (response.data.success) {
      //       setUploadedEvidencePicture(null);
      //       setPreviewEvidencePictureData("");
      //       setFileList([]);
      //       setUploadedSupportingFile(null);
      //       setSupportingFileList([]);

      //       form.resetFields();
      //       onClose();

      //       notificationSuccess({ message: response.data.message });
      //     } else {
      //       notificationWarning({
      //         message: response.data.message,
      //         duration: 2,
      //       });
      //     }
      //   },
      //   onError: (error: AxiosError<any, any>) => {
      //     const errorMessage = error.response.data.message;
      //     const actualErrorMessage =
      //       "errorInfo" in errorMessage
      //         ? errorMessage["errorInfo"].pop()
      //         : errorMessage;

      //     notificationError({ message: actualErrorMessage });
      //   },
      // });
    },
    [uploadedEvidencePicture, uploadedSupportingFile]
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

  const handleChangeWorkFrom = (e) => {
    if (e.target.value == "WFH") {
      setPlacementDisable(false);
    } else {
      if (placement == null) {
        setPlacementDisable(true);
      }
    }
    setWorkFrom(e.target.value);
  };

  const handleChangePlacement = (value) => {
    setPlacement(value);
    setPlacementDisable(false);
  };

  useEffect(() => {
    if (visible && isPermissionBlocked) {
      Modal.error({
        centered: true,
        title: "Attention!",
        content: (
          <p>
            Please allow the browser to access your current location by clicking{" "}
            <strong>Allow</strong> on the Popup that appears top left.
          </p>
        ),
        okText: "Back",
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
    attendeeStatus === "checkout"
      ? "Proof of Attendance"
      : "Proof of Check Out";

  return (
    <>
      <DrawerCore
        title={drawerTitleAndButtonContent}
        buttonOkText={drawerTitleAndButtonContent}
        visible={visible}
        onClose={onClose}
        onClick={() => form.submit()}
        disabled={
          perluVerifikasi
            ? uploadSupportingFileLoading ||
              // uploadedEvidencePicture === null ||
              uploadedSupportingFile === null ||
              checkInOutLoading
            : uploadedEvidencePicture === null ||
              uploadedSupportingFile === null ||
              checkInOutLoading
        }
      >
        <div className="space-y-6">
          {!isPermissionBlocked && (
            <>
              {/* Required field information */}
              <Form form={form} onFinish={onFormSubmitted} layout="vertical">
                {/* Location */}
                <div className="p-3 bg-neutrals50 rounded-[10px] mb-4">
                  <h4 className="mig-body mb-1">My Current Location</h4>
                  {!locationDisplayNameLoading ? (
                    <p className="text-mono30 placeholder-gray-900 disabled:bg-transparent font-bold border-none p-0">
                      {locationDisplayName || ""}
                    </p>
                  ) : (
                    <Spin />
                  )}
                  {/* <Form.Item
                    name="current_location"
                    label="My Current Location">
                    {!locationDisplayNameLoading ? (
                      <Input
                        disabled
                        placeholder={locationDisplayName || ""}
                        className="text-mono30 placeholder-gray-900 disabled:bg-transparent font-bold border-none p-0"
                      />
                    ) : (
                      <Spin />
                    )}
                  </Form.Item> */}
                </div>

                {/* Kerja Dari: hanya tampilkan ketika Check In */}
                {attendeeStatus === "checkout" && (
                  <Form.Item
                    label="Select Attendance Code"
                    name={"attendance_code_name"}
                    rules={[
                      {
                        required: true,
                        message: "Attendance Code is required",
                      },
                    ]}
                    className="w-full"
                  >
                    <div>
                      <Select
                        showSearch
                        optionFilterProp="children"
                        placeholder="Select Attendance Code"
                        // loading={loadingGetCompany}
                        style={{ width: `100%` }}
                        // value={item?.name}
                        onChange={(value, option) => {
                          const opt = option as unknown as MyOptionType;
                          setPerluVerifikasi(
                            opt?.perlu_verifikasi ? true : false
                          );
                          form.setFieldsValue({ attendance_code_name: value });
                          setAttendanceCodeId(value);
                        }}
                      >
                        {dataListAttendanceCode?.map((code) => (
                          <Select.Option
                            perlu_verifikasi={code.perlu_verifikasi}
                            key={code.id}
                            value={code.id}
                          >
                            {code.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                  </Form.Item>
                )}

                {attendeeStatus === "checkout" && perluVerifikasi && (
                  <Form.Item
                    name="supporting_file"
                    label={"Supporting File"}
                    required
                  >
                    <Upload
                      capture
                      // listType="picture"
                      name="supporting_file"
                      // accept="image/png, image/jpeg,"
                      maxCount={1}
                      beforeUpload={beforeUploadSupportingFile}
                      onRemove={onRemoveSupportingFile}
                      // onPreview={onPreviewEvidencePicture}
                      disabled={uploadSupportingFileLoading}
                      fileList={supportingfileList}
                      onChange={onUploadSupportFileChange}
                    >
                      <Button className="mig-button mig-button--outlined-primary">
                        <UploadOutlined />
                        Upload File
                      </Button>
                    </Upload>
                  </Form.Item>
                )}

                {attendeeStatus === "checkout" && (
                  <Form.Item
                    name="work_from"
                    label="Work From"
                    required
                    initialValue="WFO"
                  >
                    <Radio.Group
                      onChange={handleChangeWorkFrom}
                      disabled={uploadPictureLoading}
                    >
                      <Radio value="WFO">WFO</Radio>
                      <Radio value="WFH">WFH</Radio>
                    </Radio.Group>
                  </Form.Item>
                )}
                {/* {workFrom == "WFO" && attendeeStatus === "checkout" && (
                  <Form.Item
                    name="subcompany"
                    label={"Select Placement"}
                    required
                  >
                    <Select
                      onChange={handleChangePlacement}
                      placeholder={"Select Placement"}
                    >
                      {dataListCompany?.map((data) => (
                        <Select.Option key={data.id} value={data.id}>
                          {data.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                )} */}

                {/* Bukti Kehadran */}
                {perluVerifikasi != null && perluVerifikasi == false && (
                  <Form.Item
                    name="evidence_image"
                    label={evidencePictureLabel}
                    required
                  >
                    <div className="flex flex-col">
                      <div className="relative">
                        {/* Gunakan camera */}
                        <div className="flex items-center">
                          <Button
                            className="mig-button mig-button--outlined-primary self-start"
                            onClick={() => {
                              setIsWebcamModalShown(true);
                            }}
                          >
                            <CameraOutlined />
                            Take Photo
                          </Button>

                          {/* <span className="mig-caption--medium text-mono50">
                          or
                        </span> */}
                        </div>

                        {/* Upload from file */}
                        {/* <Upload
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
                          Upload Photo
                        </Button>
                      </Upload> */}
                      </div>

                      <em className="text-mono50 mt-2">
                        Upload JPEG File (Max. 5 MB)
                      </em>
                    </div>
                  </Form.Item>
                )}
              </Form>
            </>
          )}
        </div>
      </DrawerCore>
      <Modal
        title={
          attendeeStatus === "checkout"
            ? "Proof of Attendance"
            : "Proof of Check Out"
        }
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
