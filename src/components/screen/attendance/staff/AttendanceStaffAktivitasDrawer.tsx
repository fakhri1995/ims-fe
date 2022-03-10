import { Checkbox, Form, Input, InputNumber, Select, Skeleton } from "antd";
import { FC, useCallback } from "react";
import { useQuery } from "react-query";

import DrawerCore from "components/drawer/drawerCore";

import { useAxiosClient } from "hooks/use-axios-client";

import { FormAktivitasTypes } from "apis/attendance";
import { AuthService, AuthServiceQueryKeys } from "apis/auth";
import { Detail } from "apis/auth";

/**
 * Component AttendanceStaffAktivitasDrawer's props.
 */
export interface IAttendanceStaffAktivitasDrawer {
  visible: boolean;
  onClose: () => void;
}

/**
 * Component AttendanceStaffAktivitasDrawer
 */
export const AttendanceStaffAktivitasDrawer: FC<
  IAttendanceStaffAktivitasDrawer
> = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  const axiosClient = useAxiosClient();
  const { data: userAttendanceForm, isLoading } = useQuery(
    AuthServiceQueryKeys.DETAIL_PROFILE,
    () => AuthService.whoAmI(axiosClient),
    {
      select: (response) => response.data.data.attendance_forms[0] || null,
    }
  );

  const handleOnFormSubmitted = useCallback((value) => {
    console.log(value);
  }, []);

  return (
    <DrawerCore
      title="Masukkan Aktivitas"
      buttonOkText="Simpan Aktivitas"
      visible={visible}
      onClose={onClose}
      onClick={() => form.submit()}
    >
      <div className="space-y-6">
        <em className="text-state1">* Informasi ini harus diisi</em>

        <Form form={form} layout="vertical" onFinish={handleOnFormSubmitted}>
          {isLoading && (
            <div className="flex flex-col space-y-6">
              <Skeleton active round paragraph={{ rows: 4 }} />
              <Skeleton active round paragraph={{ rows: 2 }} />
              <Skeleton active round paragraph={{ rows: 3 }} />
            </div>
          )}
          {!isLoading &&
            userAttendanceForm.details.map(
              ({ name, description, type, key, list, required }) => {
                return (
                  <Form.Item label={name} required={!!required} key={key}>
                    <p className="mb-4 mt-2">{description}</p>

                    <Form.Item name={key} required={!!required}>
                      {_renderDynamicInput(type, list)}
                    </Form.Item>
                  </Form.Item>
                );
              }
            )}
        </Form>
      </div>
    </DrawerCore>
  );
};

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
