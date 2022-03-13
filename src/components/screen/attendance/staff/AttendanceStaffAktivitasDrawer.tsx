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
import type { AxiosError } from "axios";
import { FC, useCallback, useEffect } from "react";
import { useQuery } from "react-query";

import DrawerCore from "components/drawer/drawerCore";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  FormAktivitasTypes,
  IAddAttendanceActivityPayload,
  useAddAttendanceActivity,
  useGetAttendeeInfo,
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
> = ({ action = "create", visible, onClose }) => {
  const [form] = Form.useForm();

  const axiosClient = useAxiosClient();
  const { attendeeStatus } = useGetAttendeeInfo();
  const { mutate: addAttendanceActivity } = useAddAttendanceActivity();

  const { data: userAttendanceForm, isLoading } = useQuery(
    AuthServiceQueryKeys.DETAIL_PROFILE,
    () => AuthService.whoAmI(axiosClient),
    {
      select: (response) => response.data.data.attendance_forms[0],
    }
  );

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
          let mValue;

          if (value instanceof Number) {
            mValue = value.toString();
          } else if (value instanceof Array) {
            /**
             * NOTE: it's necessary to sort the index from lowest to highest! Do not change this code.
             *
             * Soalnya jawaban dari backend nanti akan kita gunakan pada update / delete aktivitas.
             * Kecuali backend memberikan API yang jauh lebih mudah.
             *
             * Misal backend menyediakan API untuk retrieve data per form aktivitas (e.g. by id).
             */
            mValue = value.sort((a, b) => (a < b ? -1 : 1));
          } else {
            // it must be a string
            mValue = value;
          }

          payload.details.push({
            key,
            value: mValue,
          });
        }

        addAttendanceActivity(payload, {
          onSuccess: (response) => {
            form.resetFields();

            onClose();

            notification.success({ message: response.data.message });
          },
          onError: (error: AxiosError) => {
            notification.error({ message: error.response.data.message });
          },
        });
      } else {
        /** TODO */
      }
    },
    [userAttendanceForm]
  );

  /** Guard to prevent User fill the form when they're not signed in yet. */
  useEffect(() => {
    if (visible && attendeeStatus !== "checkin") {
      Modal.error({
        centered: true,
        title: "Perhatian!",
        content:
          "Anda perlu Check In terlebih dahulu untuk menambahkan aktivitas!",
        okText: "Kembali",
        onOk: () => onClose(),
        onCancel: () => onClose(),
        closable: true,
      });

      return;
    }

    if (visible && !userAttendanceForm) {
      Modal.error({
        centered: true,
        title: "Terjadi kesalahan!",
        content:
          "Anda belum memiliki form aktivitas. Mohon hubungi Admin untuk segera menambahkan Anda ke dalam form aktivitas.",
        okText: "Kembali",
        onOk: () => onClose(),
        onCancel: () => onClose(),
        closable: true,
      });

      return;
    }
  }, [visible, attendeeStatus, userAttendanceForm]);

  return (
    <DrawerCore
      title={`${action === "create" ? "Masukkan" : "Mengubah"} Aktivitas`}
      buttonOkText="Simpan Aktivitas"
      visible={visible}
      onClose={onClose}
      onClick={() => form.submit()}
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
        <Select placeholder="Pilih nilai">
          {list?.map((value, idx) => (
            <Select.Option value={value} key={idx}>
              {value}
            </Select.Option>
          ))}
        </Select>
      );
  }
};
