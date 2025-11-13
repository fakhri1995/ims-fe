import { CameraOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Skeleton,
  Upload,
  UploadProps,
  notification,
} from "antd";
import { FormInstance } from "antd/es/form/Form";
import { UploadChangeParam } from "antd/lib/upload";
import { RcFile, UploadFile } from "antd/lib/upload/interface";
import type { AxiosError, AxiosResponse } from "axios";
import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQuery } from "react-query";

import DrawerCore from "components/drawer/drawerCore";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  ATTENDANCE_ACTIVITY_ADD,
  ATTENDANCE_ACTIVITY_DELETE,
  ATTENDANCE_ACTIVITY_UPDATE,
} from "lib/features";
import {
  getBase64,
  getFileName,
  notificationError,
  notificationSuccess,
  objectToFormData,
  permissionWarningNotification,
} from "lib/helper";

import {
  FormAktivitasTypes,
  IAddAttendanceActivityPayload,
  IUpdateAttendanceActivityPayload,
  useGetUserAttendanceTodayActivities,
  useMutateAttendanceActivity,
} from "apis/attendance";
import { AuthService, AuthServiceQueryKeys } from "apis/auth";
import { Detail } from "apis/auth";

import { AttendanceStaffWebcamModal } from "./AttendanceStaffWebcamModal";

/**
 * Component AttendanceStaffAktivitasDrawer's props.
 */
export interface IAttendanceStaffAktivitasDrawer {
  action: "create" | "update";

  /**
   * Arg ini diperlukan untuk `action === "update"`.
   */
  activityFormId?: number;

  visible: boolean;
  onClose: () => void;
}

/**
 * Component AttendanceStaffAktivitasDrawer
 */
export const AttendanceStaffAktivitasDrawer: FC<
  IAttendanceStaffAktivitasDrawer
> = ({ action = "create", visible, onClose, activityFormId }) => {
  const [form] = Form.useForm();
  const axiosClient = useAxiosClient();
  const { todayActivities, findTodayActivity } =
    useGetUserAttendanceTodayActivities();
  const { hasPermission } = useAccessControl();
  const isAllowedToAddActivity = hasPermission(ATTENDANCE_ACTIVITY_ADD);
  const isAllowedToUpdateActivity = hasPermission(ATTENDANCE_ACTIVITY_UPDATE);
  const isAllowedToDeleteActivity = hasPermission(ATTENDANCE_ACTIVITY_DELETE);

  const [isWebcamModalShown, setIsWebcamModalShown] = useState(false);

  const {
    addMutation: {
      mutate: addAttendanceActivity,
      isLoading: addMutationLoading,
    },
    updateMutation: {
      mutate: updateAttendanceActivity,
      isLoading: updateMutationLoading,
    },
    deleteMutation: {
      mutate: deleteAttendanceActivity,
      isLoading: deleteMutationLoading,
    },
  } = useMutateAttendanceActivity();

  const isOnMutationLoading =
    addMutationLoading || updateMutationLoading || deleteMutationLoading;

  const { data: userAttendanceForm, isLoading } = useQuery(
    [AuthServiceQueryKeys.DETAIL_PROFILE],
    () => AuthService.whoAmI(axiosClient),
    {
      select: (response) => response.data.data.attendance_forms[0],
    }
  );

  const formInitialValue = useMemo(() => {
    if (userAttendanceForm === undefined) {
      return {};
    }

    return userAttendanceForm.details.reduce((prev, curr) => {
      let defaultValue;
      switch (curr.type) {
        case FormAktivitasTypes.TEKS:
        case FormAktivitasTypes.PARAGRAPH:
        case FormAktivitasTypes.DROPDOWN:
          defaultValue = "";
          break;
        case FormAktivitasTypes.NUMERAL:
          defaultValue = curr.required ? 0 : undefined;
          break;
        case FormAktivitasTypes.CHECKLIST:
          defaultValue = [];
          break;
        case FormAktivitasTypes.UNGGAH:
          defaultValue = {};
          break;
      }
      return { ...prev, [curr.key]: defaultValue };
    }, {});
  }, [userAttendanceForm]);

  const onMutationSucceed = useCallback((response: AxiosResponse<any, any>) => {
    form.resetFields();

    onClose();

    notificationSuccess({ message: response.data.message });
  }, []);

  const onMutationFailed = useCallback((error: AxiosError<any, any>) => {
    notificationError({ message: error.response.data.message });
  }, []);

  const handleOnFormSubmitted = useCallback(
    (formValues?: { [key: string]: any }) => {
      if (!userAttendanceForm) {
        return;
      }

      // format payload to needed form in FormData
      let allDetailObject = {};
      let formValuesArr = Object.entries(formValues);
      if (formValuesArr.length > 0) {
        let detailObjectList = formValuesArr.map((detail, idx) => {
          let obj = {};
          obj[`details[${idx}][key]`] = detail[0];
          obj[`details[${idx}][value]`] = _safeCastPayloadValue(detail[1]);
          return obj;
        });

        for (let detailObject of detailObjectList) {
          Object.assign(allDetailObject, detailObject);
        }
      }
      if (action === "create") {
        if (!isAllowedToAddActivity) {
          permissionWarningNotification("Membuat", "Aktivitas");
          return;
        }

        const payload = {
          attendance_form_id: userAttendanceForm.id,
          ...allDetailObject,
        };

        const payloadFormData = objectToFormData(payload);

        addAttendanceActivity(payloadFormData, {
          onSuccess: onMutationSucceed,
          onError: onMutationFailed,
        });
      } else {
        if (!isAllowedToUpdateActivity) {
          permissionWarningNotification("Memperbarui", "Aktivitas");
          return;
        }

        const payload = {
          id: activityFormId,
          ...allDetailObject,
        };

        const payloadFormData = objectToFormData(payload);

        updateAttendanceActivity(payloadFormData, {
          onSuccess: onMutationSucceed,
          onError: onMutationFailed,
        });
      }
    },
    [
      activityFormId,
      userAttendanceForm,
      isAllowedToAddActivity,
      isAllowedToUpdateActivity,
    ]
  );

  useEffect(() => {
    /** Always clean up the form fields on close */
    if (!visible) {
      form.resetFields();
    }
  }, [visible]);

  // display available data in drawer update
  useEffect(() => {
    if (action !== "update" || !todayActivities) {
      return;
    }

    const formFieldsValue = {};

    const clickedActivityData = findTodayActivity(activityFormId);
    clickedActivityData.details.forEach((detail) => {
      const { key, value } = detail;
      let valueDisplay = value;

      // use for displaying checked option in checkbox field
      if (Array.isArray(value)) {
        valueDisplay = value.map((v) => Number(v));
      }

      formFieldsValue[key] = valueDisplay;
    });

    form.setFieldsValue(formFieldsValue);
  }, [form, action, todayActivities]);

  return (
    <DrawerCore
      title={`${action === "create" ? "Add" : "Edit"} Activity`}
      buttonOkText="Save Changes"
      visible={visible}
      onClose={onClose}
      onClick={() => form.submit()}
      disabled={isOnMutationLoading}
    >
      <div className="space-y-6">
        {isLoading && (
          <div className="flex flex-col space-y-6">
            <Skeleton active round paragraph={{ rows: 4 }} />
            <Skeleton active round paragraph={{ rows: 2 }} />
            <Skeleton active round paragraph={{ rows: 3 }} />
          </div>
        )}

        {!isLoading && !!userAttendanceForm && (
          <>
            {/* <em className="text-state1">*This information must be filled in</em> */}

            <Form
              form={form}
              initialValues={formInitialValue}
              layout="vertical"
              onFinish={handleOnFormSubmitted}
              validateMessages={{
                required: "This field is required!",
              }}
            >
              {userAttendanceForm.details.map(
                ({ name, description, type, key, list, required }) => {
                  return (
                    <Form.Item
                      name={name}
                      label={name}
                      required={!!required}
                      key={key}
                    >
                      {type === 6 ? (
                        <Form.Item name={key} rules={[{ required }]}>
                          {_renderDynamicUpload(
                            key,
                            form,
                            isWebcamModalShown,
                            setIsWebcamModalShown,
                            visible
                          )}
                        </Form.Item>
                      ) : (
                        <Form.Item name={key} rules={[{ required }]}>
                          {_renderDynamicInput(type, list, description)}
                        </Form.Item>
                      )}
                    </Form.Item>
                  );
                }
              )}
            </Form>
          </>
        )}
      </div>
    </DrawerCore>
  );
};

/**
 * Generates a child for <Form.Item> component respective to its type argument.
 *
 * @private
 */
const _renderDynamicInput = (
  type: FormAktivitasTypes,
  list?: Pick<Detail, "list">["list"],
  description?: string
) => {
  switch (type) {
    case FormAktivitasTypes.TEKS:
      return <Input name="" type="text" placeholder={description} />;

    case FormAktivitasTypes.PARAGRAPH:
      return <Input.TextArea rows={10} placeholder={description} />;

    case FormAktivitasTypes.CHECKLIST:
      return (
        <Checkbox.Group className="flex flex-col space-x-0 space-y-4">
          {list?.map((value, idx) => (
            <Checkbox value={idx} key={idx}>
              {value}
            </Checkbox>
          ))}
        </Checkbox.Group>
      );

    case FormAktivitasTypes.NUMERAL:
      return <InputNumber className="w-full" />;

    case FormAktivitasTypes.DROPDOWN:
      return (
        <Select placeholder={description || "Pilih nilai"} allowClear>
          {list?.map((value, idx) => (
            <Select.Option value={value} key={idx}>
              {value}
            </Select.Option>
          ))}
        </Select>
      );
  }
};

/**
 * Generates a child for <Form.Item> component with upload type (UNGGAH).
 *
 * @private
 */
const _renderDynamicUpload = (
  key: string,
  form: FormInstance<any>,
  isWebcamModalShown: boolean,
  setIsWebcamModalShown: Dispatch<SetStateAction<boolean>>,
  visible: boolean
) => {
  // START: Upload Field

  /** Uploaded file object. Wrapped as RcFile. */
  const [uploadedActivityPicture, setUploadedActivityPicture] = useState<
    RcFile | Blob | File
  >(null);
  const [uploadPictureLoading, setUploadPictureLoading] = useState(false);

  /** Toggle preview modal on and off. */
  const [isPreviewActivityPicture, setIsPreviewActivityPicture] =
    useState(false);

  /** Either empty string or long long string (base64) from a file (`uploadedActivityPicture`). */
  const [previewActivityPictureData, setPreviewActivityPictureData] =
    useState("");

  const [fileList, setFileList] = useState<UploadFile<RcFile>[]>([]);

  useEffect(() => {
    // Remove uploaded file when drawer closed
    if (!visible) {
      onRemoveActivityPicture();
      return;
    }

    // Display file name if available
    const fileUrl = form.getFieldValue(key);
    if (fileUrl) {
      setFileList([
        {
          uid: "-1",
          name: getFileName(fileUrl),
        } as RcFile,
      ]);
    }
  }, [visible]);

  const onUploadChange = useCallback(
    ({ file }: UploadChangeParam<UploadFile<RcFile>>) => {
      setUploadPictureLoading(file.status === "uploading");

      if (file.status !== "removed") {
        setFileList([file]);
      }

      form.setFieldsValue({ [key]: file?.originFileObj });
    },
    []
  );

  /**
   * Validating uploaded file before finally attached to the paylaod.
   *
   * - Size max 5 MiB
   * - File type should satisfy  [
        "image/png",
        "image/jpeg",
        "application/pdf",
        "text/csv",
        "application/msword",
        "application/vnd.ms-powerpoint",
        "application/vnd.ms-excel",
      ]
   */
  const beforeUploadActivityPicture = useCallback<
    Pick<UploadProps, "beforeUpload">["beforeUpload"]
  >((uploadedFile) => {
    const allowedFileTypes = [
      "image/png",
      "image/jpeg",
      "application/pdf",
      "text/csv",
      "application/msword",
      "application/vnd.ms-powerpoint",
      "application/vnd.ms-excel",
    ];

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

    form.setFieldsValue({ [key]: uploadedFile });
    setUploadedActivityPicture(uploadedFile);
  }, []);

  const onRemoveActivityPicture = useCallback(() => {
    setFileList([]);
    form.setFieldsValue({ [key]: "" });
    setUploadedActivityPicture(null);
  }, []);

  const onPreviewActivityPicture = useCallback(async () => {
    const previewImageData = (await getBase64(
      uploadedActivityPicture
    )) as string;

    setPreviewActivityPictureData(previewImageData);
    setIsPreviewActivityPicture(true);
  }, [uploadedActivityPicture]);

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
      form.setFieldsValue({ [key]: blobFile });
      setUploadedActivityPicture(blobFile);

      // Set preview base64 data
      setPreviewActivityPictureData(result);

      // close the modal
      setIsWebcamModalShown(false);
    })();
  }, []);
  // END: Upload field

  return (
    <div className="flex flex-col ">
      <div className="relative">
        {/* Gunakan camera */}
        <div className="flex items-center gap-2">
          <Button
            className="mig-button mig-button--outlined-primary self-start"
            onClick={() => {
              setIsWebcamModalShown(true);
            }}
          >
            <CameraOutlined />
            Take Photo
          </Button>

          <span className="mig-caption--medium text-mono50">or</span>
        </div>

        {/* Upload from file */}
        <Upload
          capture
          listType="picture"
          name="file"
          accept="image/png, image/jpeg, application/pdf,
                      text/csv,
                      application/msword,
                      application/vnd.ms-powerpoint,
                      application/vnd.ms-excel"
          maxCount={1}
          beforeUpload={beforeUploadActivityPicture}
          onRemove={onRemoveActivityPicture}
          onPreview={onPreviewActivityPicture}
          disabled={uploadPictureLoading}
          fileList={fileList}
          onChange={onUploadChange}
        >
          <Button className="mig-button mig-button--outlined-primary absolute top-0 right-0">
            <UploadOutlined />
            Upload Photo
          </Button>
        </Upload>
      </div>

      <em className="text-mono50">Upload JPEG file (Max. 5 MB)</em>
      <Modal
        title="Activity Photo"
        visible={isPreviewActivityPicture}
        footer={null}
        onCancel={() => setIsPreviewActivityPicture(false)}
        centered
      >
        <img alt="Preview Activity Picture" src={previewActivityPictureData} />
      </Modal>

      <AttendanceStaffWebcamModal
        visible={isWebcamModalShown}
        title="Take Activity Photo"
        onCancel={() => setIsWebcamModalShown(false)}
        onOk={onWebcamModalFinished}
      />
    </div>
  );
};

/**
 * Safely cast the given `value` before we send it to the backend.
 *
 * @private
 */
const _safeCastPayloadValue = (value: any) => {
  let mValue;

  switch (typeof value) {
    case "number":
      mValue = value.toString();
      break;
    case "undefined":
    case "string":
      mValue = value || "";
      break;
    default:
      mValue = value;
      break;
  }

  return mValue;
};
