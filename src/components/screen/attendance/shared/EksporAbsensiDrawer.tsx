import { Button, Checkbox, DatePicker, Form, Select, notification } from "antd";
import type { AxiosError } from "axios";
import moment from "moment";
import type { Moment } from "moment";
import { FC, useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";

import DrawerCore from "components/drawer/drawerCore";

import { useAxiosClient } from "hooks/use-axios-client";
import { useDebounce } from "hooks/use-debounce-value";

import { downloadFile, generateStaticAssetUrl } from "lib/helper";

import {
  AttendanceExportExcelDataResult,
  AttendanceFormAktivitasService,
  AttendanceFormAktivitasServiceQueryKeys,
  AttendanceService,
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
  const [dataFormAktifitas, setDataFormAktifitas] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue);
  const [namaSelected, setNamaSelected] = useState([]);
  const [namaTempSelected, setNamaTempSelected] = useState([]);
  const [selectedFormAktivitasId, setSelectedFormAktivitasId] = useState([]);

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
      select: (response) => response.data.data,
    }
  );

  /**
   * Handler ketika form di submit
   */
  const handleOnFormSubmitted = useCallback(
    async (fieldValues: {
      rentang_waktu?: [Moment, Moment];
      form_aktivitas?: number;
      selected_staff?: string[];
    }) => {
      const from = fieldValues.rentang_waktu[0].toDate();
      const to = fieldValues.rentang_waktu[1].toDate();
      let staffIds: number[] = [];
      /**
       * 1. Form Aktivitas is required
       * 2. Transform array of selected staff (string) into their respective ID (number)
       */
      if (exportAsAdmin) {
        fieldValues.selected_staff.map((staffName) => {
          const staff = dataFormAktifitas.find(
            (staff) => staff.name === staffName
          );

          if (staff) {
            staffIds.push(staff.id);
          }
        });
      }

      try {
        const payload = {
          from,
          to,
          attendance_form_id: fieldValues.form_aktivitas,
        };

        if (exportAsAdmin) {
          payload["user_ids"] = staffIds;
        }

        const { file, fileName } = (await AttendanceService.exportExcelData(
          axiosClient,
          payload
        )) as AttendanceExportExcelDataResult;
        downloadFile(file, fileName);

        notification.success({
          message: `Berhasil mengunduh file ${fileName}`,
        });
        onClose();
      } catch (error) {
        notification.error({
          message: `Terdapat kesalahan saat mengunduh file. ${
            (error as AxiosError).message
          }`,
        });
        console.error(error);
      }
    },
    [exportAsAdmin, dataFormAktifitas]
  );

  /**
   * Handler ketika Select field berubah nilai (mengganti form aktivitas)
   */
  const handleOnChangeFormAktivitas = useCallback(
    (value: Array<number> | undefined) => {
      if (!exportAsAdmin) {
        return;
      }
      if (value === undefined) {
        setSearchValue("");
        setSelectedFormAktivitasId(undefined);
        return;
      } else if (value.length == 0) {
        setSearchValue("");
        setSelectedFormAktivitasId(undefined);
        setDataFormAktifitas([]);
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
  const handleOnUnSelectAllStaff = useCallback(() => {
    if (!form || !exportAsAdmin) {
      return;
    }
    setNamaTempSelected([]);
    form.setFields([{ name: "selected_staff", value: [] }]);
  }, [form, formAktivitasStaffList, exportAsAdmin]);

  const handleOnSelectAllStaff = useCallback(() => {
    if (!form || !exportAsAdmin) {
      return;
    }
    // setNamaSelected([])
    // setNamaTempSelected([])
    let formAktivitasStaffListOnlyName = [];
    formAktivitasStaffList?.map((data_user) =>
      data_user.users.map((user) =>
        formAktivitasStaffListOnlyName.push(user.name)
      )
    );
    setNamaSelected(formAktivitasStaffListOnlyName);
    setNamaTempSelected(formAktivitasStaffListOnlyName);
    form.setFields([
      { name: "selected_staff", value: formAktivitasStaffListOnlyName || [] },
    ]);
  }, [form, formAktivitasStaffList, exportAsAdmin]);

  const handleOnSelectStaff = (value) => {
    let dataNamaTemp = namaTempSelected;
    if (dataNamaTemp.length == 0) {
      dataNamaTemp.push(value.target.value);
    } else if (namaSelected.length > 1) {
      if (value.target.checked == false) {
        dataNamaTemp = dataNamaTemp.filter(function (item) {
          return item !== value.target.value;
        });
      } else {
        dataNamaTemp.push(value.target.value);
      }
    }
    setNamaTempSelected([...dataNamaTemp]);
  };
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
      let formAktivitasStaffListOnlyName = [];
      formAktivitasStaffList?.map((data_user) =>
        data_user.users.map((user) =>
          formAktivitasStaffListOnlyName.push(user.name)
        )
      );

      // const formAktivitasStaffListOnlyName = formAktivitasStaffList?.map(
      //   (user) => user.name
      // );

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

  useEffect(() => {
    let dataForm = [];
    formAktivitasStaffList?.map((dataUser) =>
      dataUser.users.map((user) => dataForm.push(user))
    );
    if (dataForm.length > 0) {
      setDataFormAktifitas(dataForm);
    }
    let dataNama = [];
    formAktivitasStaffList?.map((dataUser) =>
      dataUser.users.map(({ id, name }) => dataNama.push(name))
    );
    if (dataNama.length > 0) {
      setNamaTempSelected(dataNama);
      setNamaSelected(dataNama);
    }
  }, [formAktivitasStaffList]);

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
            <RangePicker format="DD MMM YYYY" allowClear={false} />
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
                  mode={"multiple"}
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
                {formAktivitasStaffList &&
                  formAktivitasStaffList.length > 0 &&
                  namaSelected.length == namaTempSelected.length &&
                  namaSelected.length != 0 && (
                    <Button
                      type="link"
                      onClick={handleOnUnSelectAllStaff}
                      className="absolute -top-8 right-0 p-0 m-0 border text-primary100 hover:text-primary75 active:text-primary75 focus:text-primary75"
                    >
                      Hapus Semua
                    </Button>
                  )}
                {formAktivitasStaffList &&
                  formAktivitasStaffList.length > 0 &&
                  namaSelected.length > namaTempSelected.length && (
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
                {dataFormAktifitas && (
                  <Form.Item
                    name="selected_staff"
                    rules={[{ required: true }]}
                    shouldUpdate
                  >
                    <Checkbox.Group>
                      <div className="flex flex-col space-x-0 space-y-4">
                        {dataFormAktifitas.map((user) => (
                          <Checkbox
                            key={user.id}
                            value={user.name}
                            onChange={(e) => {
                              handleOnSelectStaff(e);
                            }}
                            className="flex items-center"
                          >
                            <div className="flex items-center space-x-4">
                              {/* Profile Picture */}
                              <div className="w-8 h-8 bg-mono80 rounded-full overflow-hidden">
                                <img
                                  src={generateStaticAssetUrl(
                                    user.profile_image.link
                                  )}
                                  alt={`${user.name}'s Avatar`}
                                  className="w-full h-full bg-cover"
                                />
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
