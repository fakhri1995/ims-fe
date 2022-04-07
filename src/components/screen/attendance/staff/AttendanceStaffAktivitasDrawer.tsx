import {
  Checkbox,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Skeleton,
  notification,
} from "antd";
import type { AxiosError, AxiosResponse } from "axios";
import { FC, useCallback, useEffect, useMemo } from "react";
import { useQuery } from "react-query";

import DrawerCore from "components/drawer/drawerCore";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  FormAktivitasTypes,
  IAddAttendanceActivityPayload,
  IUpdateAttendanceActivityPayload,
  useGetAttendeeInfo,
  useGetUserAttendanceTodayActivities,
  useMutateAttendanceActivity,
} from "apis/attendance";
import { AuthService, AuthServiceQueryKeys } from "apis/auth";
import { Detail } from "apis/auth";

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
  const { attendeeStatus } = useGetAttendeeInfo();
  const { todayActivities, findTodayActivity } =
    useGetUserAttendanceTodayActivities();

  const {
    addMutation: { mutate: addAttendanceActivity },
    updateMutation: { mutate: updateAttendanceActivity },
    deleteMutation: { mutate: deleteAttendanceActivity },
  } = useMutateAttendanceActivity();

  const { data: userAttendanceForm, isLoading } = useQuery(
    AuthServiceQueryKeys.DETAIL_PROFILE,
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
      }

      return { ...prev, [curr.key]: defaultValue };
    }, {});
  }, [userAttendanceForm]);

  const onMutationSucceed = useCallback((response: AxiosResponse<any, any>) => {
    form.resetFields();

    onClose();

    notification.success({ message: response.data.message });
  }, []);

  const onMutationFailed = useCallback((error: AxiosError) => {
    notification.error({ message: error.response.data.message });
  }, []);

  const handleOnFormSubmitted = useCallback(
    (formValues?: { [key: string]: any }) => {
      if (!userAttendanceForm) {
        return;
      }

      if (action === "create") {
        const payload: IAddAttendanceActivityPayload = {
          attendance_form_id: userAttendanceForm.id,
          details: [],
        };

        for (const [key, value] of Object.entries(formValues)) {
          payload.details.push({
            key,
            value: _safeCastPayloadValue(value),
          });
        }

        addAttendanceActivity(payload, {
          onSuccess: onMutationSucceed,
          onError: onMutationFailed,
        });
      } else {
        const payload: IUpdateAttendanceActivityPayload = {
          id: activityFormId,
          details: [],
        };

        for (const [key, value] of Object.entries(formValues)) {
          payload.details.push({
            key,
            value: _safeCastPayloadValue(value),
          });
        }

        updateAttendanceActivity(payload, {
          onSuccess: onMutationSucceed,
          onError: onMutationFailed,
        });
      }
    },
    [activityFormId, userAttendanceForm]
  );

  const handleOnDeleteAktivitas = useCallback(() => {
    if (action !== "update") {
      return;
    }

    Modal.confirm({
      centered: true,
      title: "Perhatian!",
      content: "Apakah Anda yakin untuk menghapus aktivitas ini?",
      okText: "Hapus Aktivitas",
      cancelText: "Kembali",
      onOk: () => {
        deleteAttendanceActivity(activityFormId, {
          onSuccess: onMutationSucceed,
          onError: onMutationFailed,
        });
      },
      onCancel: () => onClose(),
    });
  }, [action, activityFormId]);

  useEffect(() => {
    /** Always clean up the form fields on close */
    if (!visible) {
      form.resetFields();
    }
  }, [visible]);

  useEffect(() => {
    if (action !== "update" || !todayActivities) {
      return;
    }

    const formFieldsValue = {};

    const clickedActivityData = findTodayActivity(activityFormId);
    clickedActivityData.details.forEach((detail) => {
      const { key, value } = detail;

      formFieldsValue[key] = value;
    });

    form.setFieldsValue(formFieldsValue);
  }, [form, action, todayActivities]);

  return (
    <DrawerCore
      title={`${action === "create" ? "Masukkan" : "Mengubah"} Aktivitas`}
      buttonOkText="Simpan Aktivitas"
      visible={visible}
      onClose={onClose}
      onClick={() => form.submit()}
      buttonCancelText={action === "update" ? "Hapus Aktivitas" : undefined}
      onButtonCancelClicked={handleOnDeleteAktivitas}
    >
      <div className="space-y-6">
        {isLoading && (
          <div className="flex flex-col space-y-6">
            <Skeleton active round paragraph={{ rows: 4 }} />
            <Skeleton active round paragraph={{ rows: 2 }} />
            <Skeleton active round paragraph={{ rows: 3 }} />
          </div>
        )}

        {!isLoading && !!userAttendanceForm && attendeeStatus !== "checkout" && (
          <>
            <em className="text-state1">* Informasi ini harus diisi</em>

            <Form
              form={form}
              initialValues={formInitialValue}
              layout="vertical"
              onFinish={handleOnFormSubmitted}
              validateMessages={{
                required: "Field ini harus diisi!",
              }}
            >
              {userAttendanceForm.details.map(
                ({ name, description, type, key, list, required }) => {
                  return (
                    <Form.Item label={name} required={!!required} key={key}>
                      <p className="mb-4 mt-2">{description}</p>

                      <Form.Item name={key} rules={[{ required }]}>
                        {_renderDynamicInput(type, list)}
                      </Form.Item>
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
  list?: Pick<Detail, "list">["list"]
) => {
  switch (type) {
    case FormAktivitasTypes.TEKS:
      return <Input name="" type="text" />;

    case FormAktivitasTypes.PARAGRAPH:
      return <Input.TextArea />;

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
        <Select placeholder="Pilih nilai" allowClear>
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
