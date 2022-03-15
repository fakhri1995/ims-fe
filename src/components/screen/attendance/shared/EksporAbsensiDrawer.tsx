import { Button, Checkbox, DatePicker, Form, Select } from "antd";
import moment from "moment";
import { FC, useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";

import DrawerCore from "components/drawer/drawerCore";

import { useAxiosClient } from "hooks/use-axios-client";
import { useDebounce } from "hooks/use-debounce-value";

import {
  AttendanceFormAktivitasService,
  AttendanceFormAktivitasServiceQueryKeys,
} from "apis/attendance";

const { RangePicker } = DatePicker;
const { Option } = Select;

/**
 * Component EksporAbsensiDrawer's props.
 */
export interface IEksporAbsensiDrawer {
  visible: boolean;
  onClose: () => void;

  /**
   * Set it to true to show more filter options.
   * It only used for Admin and not Staff.
   */
  exportAsAdmin?: boolean;
}

/**
 * Component EksporAbsensiDrawer
 */
export const EksporAbsensiDrawer: FC<IEksporAbsensiDrawer> = ({
  visible,
  onClose,
  exportAsAdmin = false,
}) => {
  const [form] = Form.useForm();
  const axiosClient = useAxiosClient();

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue);

  const [selectedFormAktivitasId, setSelectedFormAktivitasId] = useState<
    number | undefined
  >(undefined);

  const { data: formAktivitasData, refetch: findFormAktivitas } = useQuery(
    [AttendanceFormAktivitasServiceQueryKeys.FIND, debouncedSearchValue],
    (query) => {
      const searchKeyword = query.queryKey[1] as string;

      return AttendanceFormAktivitasService.find(axiosClient, {
        keyword: searchKeyword,
      });
    },
    {
      enabled: false,
      select: (response) =>
        response.data.data.data.map((formAktivitasDatum) => ({
          id: formAktivitasDatum.id,
          name: formAktivitasDatum.name,
        })),
    }
  );

  const {
    data: formAktivitasStaffList,
    refetch: getFormAktivitasStaffList,
    isLoading: formAktivitasStaffListLoading,
  } = useQuery(
    [
      AttendanceFormAktivitasServiceQueryKeys.FIND_ONE,
      /** Form Aktivitas ID */ selectedFormAktivitasId,
    ],
    (query) => {
      /**
       * Set nilai menjadi undefined ketika Form Aktivtias null atau tidak terpilih.
       */
      const formAktivitasId = query.queryKey[1] as number | undefined;
      if (formAktivitasId === undefined) {
        return undefined;
      }

      return AttendanceFormAktivitasService.findOne(
        axiosClient,
        formAktivitasId
      );
    },
    {
      enabled: false,
      select: (response) => response.data.data.users,
    }
  );

  /**
   * Handler ketika form di submit
   */
  const handleOnFormSubmitted = useCallback(
    (fieldValues: {
      /** @type {[Moment, Moment]} */
      rentang_waktu?: object[];
      form_aktivitas?: number;
      selected_staff?: string[];
    }) => {
      console.log(fieldValues);
    },
    []
  );

  /**
   * Handler ketika Select field berubah nilai (mengganti form aktivitas)
   */
  const handleOnChangeFormAktivitas = useCallback(
    (value: number | undefined) => {
      if (!exportAsAdmin) {
        return;
      }

      if (value === undefined) {
        setSearchValue("");
        setSelectedFormAktivitasId(undefined);
        return;
      }

      setSelectedFormAktivitasId(value);
    },
    [exportAsAdmin]
  );

  /**
   * Handler ketika User mencari nama form aktivitas
   */
  const handleOnSearchFormAktivitas = useCallback(
    (value: string | undefined) => {
      if (!exportAsAdmin) {
        return;
      }

      setSearchValue(value);
    },
    [exportAsAdmin]
  );

  /**
   * Handler ketika User click "button" Pilih semua.
   * Callback akan checklist seluruh staff pada checkbox group.
   */
  const handleOnSelectAllStaff = useCallback(() => {
    if (!form || !exportAsAdmin) {
      return;
    }

    const formAktivitasStaffListOnlyName = formAktivitasStaffList?.map(
      (user) => user.name
    );

    form.setFields([
      { name: "selected_staff", value: formAktivitasStaffListOnlyName || [] },
    ]);
  }, [form, formAktivitasStaffList, exportAsAdmin]);

  /**
   * Effect untuk set form default field values.
   */
  useEffect(() => {
    if (!form) {
      return;
    }

    const fieldData = [];

    // default selected time range picker
    fieldData.push({
      name: "rentang_waktu",
      value: [moment().subtract(1, "months"), moment()],
    });

    // default selected staff
    if (exportAsAdmin) {
      const formAktivitasStaffListOnlyName = formAktivitasStaffList?.map(
        (user) => user.name
      );

      fieldData.push({
        name: "selected_staff",
        value: formAktivitasStaffListOnlyName || [],
      });
    }

    form.setFields(fieldData);
  }, [form, formAktivitasStaffList, exportAsAdmin]);

  /**
   * Effect untuk mencari Form Aktivitas setelah User melakukan Search pada Select component.
   */
  useEffect(() => {
    /** Trigger HTTP request to retrieve searched form aktivitas field options */
    findFormAktivitas({
      queryKey: [
        AttendanceFormAktivitasServiceQueryKeys.FIND,
        debouncedSearchValue,
      ],
      exact: true,
    });
  }, [debouncedSearchValue]);

  /**
   * Effect untuk mendapatkan daftar Staff sesuai dengan form aktivitas yang telah dipilih User.
   */
  useEffect(() => {
    /** Trigger HTTP request to retrieve form aktivitas users */
    getFormAktivitasStaffList({
      queryKey: [
        AttendanceFormAktivitasServiceQueryKeys.FIND_ONE,
        selectedFormAktivitasId,
      ],
      exact: true,
    });
  }, [selectedFormAktivitasId]);

  return (
    <DrawerCore
      visible={visible}
      title="Ekspor Absensi"
      buttonOkText="Ekspor Absensi"
      onClick={() => form.submit()}
      onClose={onClose}
    >
      <div className="space-y-6">
        <em className="text-state1">* Informasi ini harus diisi</em>

        <h4 className="mig-heading--4">Pilih Filter:</h4>

        <Form
          layout="vertical"
          form={form}
          onFinish={handleOnFormSubmitted}
          validateMessages={{
            required: "Field ini harus diisi!",
          }}
        >
          {/* Pick export date range */}
          <Form.Item name="rentang_waktu" label="Rentang Waktu">
            <RangePicker format="DD MMM YYYY" />
          </Form.Item>

          {exportAsAdmin && (
            <>
              {/* Select Form Aktivitas */}
              <Form.Item
                name="form_aktivitas"
                label="Form Aktivitas"
                rules={[{ required: true }]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Pilih form aktivitas"
                  filterOption={false}
                  onChange={handleOnChangeFormAktivitas}
                  onSearch={handleOnSearchFormAktivitas}
                >
                  {formAktivitasData?.map(({ id, name }) => (
                    <Option key={id} value={id}>
                      {name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Selectable staff */}
              <Form.Item label="Staff" required className="relative">
                {formAktivitasStaffList && formAktivitasStaffList.length > 0 && (
                  <Button
                    type="link"
                    onClick={handleOnSelectAllStaff}
                    className="absolute -top-8 right-0 p-0 m-0 border text-primary100 hover:text-primary75 active:text-primary75 focus:text-primary75"
                  >
                    Pilih Semua
                  </Button>
                )}

                {!formAktivitasStaffList && !formAktivitasStaffListLoading && (
                  <span className="text-mono50">
                    Mohon pilih Form Aktivitas terlebih dahulu untuk memilih
                    staff.
                  </span>
                )}

                {formAktivitasStaffList &&
                  formAktivitasStaffList.length === 0 && (
                    <span className="text-mono50">
                      Form Aktivitas ini belum memiliki staff.
                    </span>
                  )}

                {formAktivitasStaffList && (
                  <Form.Item name="selected_staff" rules={[{ required: true }]}>
                    <Checkbox.Group>
                      <div className="flex flex-col space-x-0 space-y-4">
                        {formAktivitasStaffList.map((user) => (
                          <Checkbox
                            key={user.id}
                            value={user.name}
                            className="flex items-center"
                          >
                            <div className="flex items-center space-x-4">
                              {/* Profile Picture */}
                              <div className="w-8 h-8 bg-mono80 rounded-full overflow-hidden">
                                {user.profile_image !== "-" && (
                                  <img
                                    src={user.profile_image}
                                    alt={`${user.name}'s Avatar`}
                                    className="w-full h-full bg-cover"
                                  />
                                )}
                              </div>

                              {/* Staff name */}
                              <span className="text-mono30">{user.name}</span>
                            </div>
                          </Checkbox>
                        ))}
                      </div>
                    </Checkbox.Group>
                  </Form.Item>
                )}
              </Form.Item>
            </>
          )}
        </Form>
      </div>
    </DrawerCore>
  );
};
