import {
  DownloadOutlined,
  LoadingOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  Spin,
  Tabs,
  notification,
} from "antd";
import type { AxiosError } from "axios";
import moment from "moment";
import type { Moment } from "moment";
import { FC, useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";

import ButtonSys from "components/button";
import DrawerCore from "components/drawer/drawerCore";
import { AccessControl } from "components/features/AccessControl";
import ModalCore from "components/modal/modalCore";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";
import { useDebounce } from "hooks/use-debounce-value";

import { TIME_SHEET_GET } from "lib/features";
import { downloadFile, generateStaticAssetUrl } from "lib/helper";

import {
  AttendanceExportExcelDataResult,
  AttendanceExportPdfDataResult,
  AttendanceFormAktivitasService,
  AttendanceFormAktivitasServiceQueryKeys,
  AttendanceService,
} from "apis/attendance";

import { DownloadIcon2Svg, DownloadIconSvg } from "../../../icon";
import ExportActivityTemplate from "../ExportActivityTemplate";

const { RangePicker } = DatePicker;
const { Option } = Select;

const { TabPane } = Tabs;

/**
 * Component EksporAbsensiDrawer's props.
 */
export interface IEksporAbsensiDrawer {
  visible: boolean;
  token?: string;
  onClose: () => void;

  /**
   * Set it to true to show more filter options.
   * It only used for Admin and not Staff.
   */

  exportAsAdmin?: boolean;
  exportActivity?: boolean;
}

/**
 * Component EksporAbsensiDrawer
 */
export const EksporAbsensiDrawer: FC<IEksporAbsensiDrawer> = ({
  visible,
  onClose,
  token,
  exportAsAdmin = false,
  exportActivity = false,
}) => {
  const [form] = Form.useForm();
  const [formPdf] = Form.useForm();
  const axiosClient = useAxiosClient();
  const [dataFormAktifitas, setDataFormAktifitas] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue);
  const [namaSelected, setNamaSelected] = useState([]);
  const [namaTempSelected, setNamaTempSelected] = useState([]);
  const [namaSupervisor, setNamaSupervisor] = useState(null);
  const [activeTabKey, setActiveTabKey] = useState("1");
  const { hasPermission } = useAccessControl();
  const isAllowedToExportActivity = hasPermission(TIME_SHEET_GET);
  const [dataProfile, setDataProfile] = useState({
    name: null,
    position: null,
    placement: null,
    form_activity_name: null,
  });
  const [selectedFormAktivitasId, setSelectedFormAktivitasId] = useState<
    Array<number> | undefined
  >(undefined);

  const [dataFormat, setDataFormat] = useState({
    from: null,
    to: null,
    supervisor: null,
  });
  const [dataPdf, setDataPdf] = useState(null);
  const [loadingData, setLoadingData] = useState(false);

  const [modalConfirmExportPdf, setModalConfirmExportPdf] = useState(false);

  // default time in range picker
  const [selectedDateRange, setSelectedDateRange] = useState({
    start_date: moment().subtract(1, "months"),
    end_date: moment(),
  });

  const [selectedDateRangePdf, setSelectedDateRangePdf] = useState({
    start_date: moment().subtract(1, "months"),
    end_date: moment(),
  });

  // Sorting button in Form Aktivitas dropdown
  const [isSortAsc, setIsSortAsc] = useState(false);

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

      const formAktivitasId = query.queryKey[1] as number[] | undefined;
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
      rentang_waktu_pdf?: [Moment, Moment];
      supervisor: string;
      form_aktivitas?: number;
      selected_staff?: string[];
    }) => {
      if (fieldValues.rentang_waktu?.length > 0) {
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
        }
      }
      if (fieldValues.rentang_waktu_pdf?.length > 0) {
        const from = fieldValues.rentang_waktu_pdf[0].toDate();
        const to = fieldValues.rentang_waktu_pdf[1].toDate();
        const nama_supervisor = fieldValues.supervisor;
        setDataFormat({
          from: from,
          to: to,
          supervisor: nama_supervisor,
        });
        const from_format = moment(from).format("YYYY-MM-DD");
        const to_format = moment(to).format("YYYY-MM-DD");
        /**
         * 1. Form Aktivitas is required
         * 2. Transform array of selected staff (string) into their respective ID (number)
         */
        setModalConfirmExportPdf(true);
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTimeSheet?from=${from_format}&to=${to_format}`,
          {
            method: `GET`,
            headers: {
              Authorization: JSON.parse(token),
            },
          }
        )
          .then((response) => response.json())
          .then((response2) => {
            if (response2.success) {
              setDataPdf(response2.data);
              setLoadingData(false);
            } else {
              notification.error({
                message: `${response2.message}`,
                duration: 3,
              });
              setLoadingData(false);
            }
          })
          .catch((err) => {
            notification.error({
              message: `${err.response}`,
              duration: 3,
            });
            setLoadingData(false);
          });
      }
    },
    [exportAsAdmin, dataFormAktifitas]
  );

  useEffect(() => {
    if (exportActivity) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/detailProfile`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(token),
        },
      })
        .then((response) => response.json())
        .then((response2) => {
          if (response2.success) {
            setDataProfile({
              name: response2.data.name,
              position: response2.data.position,
              placement: response2.data.employee.contract.placement,
              form_activity_name: response2.data.attendance_forms[0].name,
            });
          } else {
            notification.error({
              message: `${response2.message}`,
              duration: 3,
            });
            setLoadingData(false);
          }
        })
        .catch((err) => {
          notification.error({
            message: `${err.response}`,
            duration: 3,
          });
          setLoadingData(false);
        });
    }
  }, []);
  useEffect(() => {
    const from = selectedDateRangePdf.start_date.toDate();
    const to = selectedDateRangePdf.end_date.toDate();
    const payload = {
      from,
      to,
    };
  }, [selectedDateRangePdf]);
  const handleOnFormTerpaduSubmitted = useCallback(
    async (fieldValues: {
      rentang_waktu_pdf?: [Moment, Moment];
      supervisor?: string;
    }) => {
      const from = fieldValues.rentang_waktu_pdf[0].toDate();
      const to = fieldValues.rentang_waktu_pdf[1].toDate();
      const nama_supervisor = fieldValues.supervisor;
      setDataFormat({
        from: from,
        to: to,
        supervisor: nama_supervisor,
      });
      const from_format = moment(from).format("YYYY-MM-DD");
      const to_format = moment(to).format("YYYY-MM-DD");
      /**
       * 1. Form Aktivitas is required
       * 2. Transform array of selected staff (string) into their respective ID (number)
       */
      setModalConfirmExportPdf(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTimeSheet?from=${from_format}&to=${to_format}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(token),
          },
        }
      )
        .then((response) => response.json())
        .then((response2) => {
          if (response2.success) {
            setDataPdf(response2.data);
            setLoadingData(false);
          } else {
            notification.error({
              message: `${response2.message}`,
              duration: 3,
            });
            setLoadingData(false);
          }
        })
        .catch((err) => {
          notification.error({
            message: `${err.response}`,
            duration: 3,
          });
          setLoadingData(false);
        });
    },
    [namaSupervisor]
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
      } else {
        setSelectedFormAktivitasId(value);
      }
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
    if (Array.isArray(formAktivitasStaffList)) {
      formAktivitasStaffList?.map((data_user) =>
        data_user.users.map((user) =>
          formAktivitasStaffListOnlyName.push(user.name)
        )
      );
    }

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

    // selected time in range picker
    fieldData.push({
      name: "rentang_waktu",
      value: [
        moment(selectedDateRange.start_date),
        moment(selectedDateRange.end_date),
      ],
      // value: [moment().subtract(1, "months"), moment()],
    });

    // default selected staff
    if (exportAsAdmin) {
      let formAktivitasStaffListOnlyName = [];
      if (Array.isArray(formAktivitasStaffList)) {
        formAktivitasStaffList?.map((data_user) =>
          data_user.users.map((user) =>
            formAktivitasStaffListOnlyName.push(user.name)
          )
        );
      }

      // const formAktivitasStaffListOnlyName = formAktivitasStaffList?.map(
      //   (user) => user.name
      // );

      fieldData.push({
        name: "selected_staff",
        value: formAktivitasStaffListOnlyName || [],
      });
    }
    fieldData.push({
      name: "rentang_waktu_pdf",
      value: [
        moment(selectedDateRangePdf.start_date),
        moment(selectedDateRangePdf.end_date),
      ],
      // value: [moment().subtract(1, "months"), moment()],
    });

    form.setFields(fieldData);
  }, [form, formPdf, formAktivitasStaffList, exportAsAdmin]);

  // useEffect(() => {
  //   if (!formPdf) {
  //     return;
  //   }
  //   const fieldData = [];

  //   // selected time in range picker
  //   fieldData.push({
  //     name: "rentang_waktu_pdf",
  //     value: [
  //       moment(selectedDateRangePdf.start_date),
  //       moment(selectedDateRangePdf.end_date),
  //     ],
  //     // value: [moment().subtract(1, "months"), moment()],
  //   });
  //   formPdf.setFields(fieldData);
  // }, [formPdf]);
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
    if (Array.isArray(formAktivitasStaffList)) {
      formAktivitasStaffList?.map((dataUser) =>
        dataUser.users.map((user) => dataForm.push(user))
      );
    }

    if (dataForm.length > 0) {
      setDataFormAktifitas(dataForm);
    }
    let dataNama = [];
    if (Array.isArray(formAktivitasStaffList)) {
      formAktivitasStaffList?.map((dataUser) =>
        dataUser.users.map(({ id, name }) => dataNama.push(name))
      );
    }
    if (dataNama.length > 0) {
      setNamaTempSelected(dataNama);
      setNamaSelected(dataNama);
    }
  }, [formAktivitasStaffList]);

  const handleChangeSupervisor = (e) => {
    setNamaSupervisor(e.target.value);
  };

  const handleCancelModalPdf = () => {
    setModalConfirmExportPdf(false);
  };

  return (
    <DrawerCore
      visible={visible}
      title="Download Activity"
      buttonOkText={activeTabKey == "1" ? "Download Excel" : "Download PDF"}
      iconButtonText={<DownloadOutlined />}
      onClick={() => form.submit()}
      buttonCancelText={"Cancel"}
      onButtonCancelClicked={onClose}
      onClose={onClose}
    >
      <div className="">
        <Tabs
          defaultActiveKey={activeTabKey}
          onChange={setActiveTabKey}
          // tabBarGutter={120}
          // tabBarStyle={{ textAlign: "center" }}
        >
          <TabPane tab="Attendance Sheet" key="1" />
          {exportActivity && isAllowedToExportActivity && (
            <TabPane tab="Integrated Format" key="2" />
          )}
        </Tabs>
        {/* <div className={"space-y-6"}>
          <h4 className="mig-heading--4">Pilih Filter:</h4>
        </div> */}
        {activeTabKey == "1" ? (
          <div className={"space-y-6"}>
            <Form
              layout="vertical"
              form={form}
              onFinish={handleOnFormSubmitted}
              validateMessages={{
                required: "This field is required!",
              }}
            >
              {/* Pick export date range */}
              <Form.Item name="rentang_waktu" label="Time Range" required>
                <RangePicker
                  format="DD MMM YYYY"
                  className="w-full"
                  allowClear={false}
                  value={[
                    selectedDateRange.start_date,
                    selectedDateRange.end_date,
                  ]}
                  onCalendarChange={(value) => {
                    if (value) {
                      let startDate = value[0];
                      let endDate = value[1];
                      setSelectedDateRange({
                        start_date: startDate,
                        end_date: endDate,
                      });
                    }
                  }}
                />
              </Form.Item>

              {exportAsAdmin && (
                <>
                  {/* Select Form Aktivitas */}
                  <div className="flex flex-row space-x-2 items-center">
                    <Form.Item
                      name="form_aktivitas"
                      label="Activity Form"
                      className="w-full"
                      rules={[{ required: true }]}
                    >
                      <Select
                        showSearch
                        mode={"multiple"}
                        allowClear
                        placeholder="Select activity form"
                        optionFilterProp="children"
                        filterSort={(optionA, optionB) => {
                          if (isSortAsc) {
                            return String(optionA.children ?? "")
                              .toLowerCase()
                              .localeCompare(
                                String(optionB?.children ?? "").toLowerCase()
                              );
                          } else {
                            return 1;
                          }
                        }}
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
                    <div className="mt-2">
                      <ButtonSys
                        type={isSortAsc ? "primary" : "default"}
                        icon={<SortAscendingOutlined />}
                        onClick={() => setIsSortAsc(!isSortAsc)}
                      >
                        <SortAscendingOutlined />
                      </ButtonSys>
                    </div>
                  </div>
                  {/* Selectable staff */}
                  <Form.Item label="Staff" required className="relative">
                    {Array.isArray(formAktivitasStaffList) &&
                      formAktivitasStaffList.length > 0 &&
                      namaSelected.length == namaTempSelected.length &&
                      namaSelected.length != 0 && (
                        <Button
                          type="link"
                          onClick={handleOnUnSelectAllStaff}
                          className="absolute -top-8 right-0 p-0 m-0 border text-primary100 hover:text-primary75 active:text-primary75 focus:text-primary75"
                        >
                          Deselect All
                        </Button>
                      )}
                    {Array.isArray(formAktivitasStaffList) &&
                      formAktivitasStaffList.length > 0 &&
                      namaSelected.length > namaTempSelected.length && (
                        <Button
                          type="link"
                          onClick={handleOnSelectAllStaff}
                          className="absolute -top-8 right-0 p-0 m-0 border text-primary100 hover:text-primary75 active:text-primary75 focus:text-primary75"
                        >
                          Select All
                        </Button>
                      )}

                    {!formAktivitasStaffList &&
                      !formAktivitasStaffListLoading && (
                        <span className="text-mono50">
                          Please select Activity Form before selecting staff.
                        </span>
                      )}

                    {Array.isArray(formAktivitasStaffList) &&
                      formAktivitasStaffList.length === 0 && (
                        <span className="text-mono50">
                          Activity Form has no staff yet.
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
                                  <span className="text-mono30">
                                    {user.name}
                                  </span>
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
        ) : (
          <div className={"space-y-6"}>
            <Form
              layout="vertical"
              form={form}
              onFinish={handleOnFormSubmitted}
              validateMessages={{
                required: "This field is required!",
              }}
            >
              {/* Pick export date range */}
              <Form.Item name="rentang_waktu_pdf" label="Time Range">
                <RangePicker
                  format="DD MMM YYYY"
                  className="w-full"
                  allowClear={false}
                  value={[
                    selectedDateRangePdf.start_date,
                    selectedDateRangePdf.end_date,
                  ]}
                  onCalendarChange={(value) => {
                    if (value) {
                      let startDate = value[0];
                      let endDate = value[1];
                      setSelectedDateRangePdf({
                        start_date: startDate,
                        end_date: endDate,
                      });
                    }
                  }}
                />
              </Form.Item>
              <Form.Item
                name="supervisor"
                label="Supervisor's Name"
                className="w-full"
                rules={[{ required: true }]}
              >
                <Input
                  type="text"
                  value={namaSupervisor}
                  onChange={(e) => handleChangeSupervisor(e)}
                />
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
      <ModalCore
        title={"Download PDF"}
        visible={modalConfirmExportPdf}
        onCancel={() => handleCancelModalPdf()}
        footer={<></>}
      >
        <Spin spinning={loadingData}>
          <p className={"text-base text-black font-semibold mb-4"}>
            Are you sure you want to download activity?
          </p>
          {dataPdf ? (
            <div className="flex justify-center">
              <PDFDownloadLink
                document={
                  <ExportActivityTemplate
                    dataResume={dataPdf}
                    logoStatus={true}
                    supervisor={dataFormat.supervisor}
                    from_data={dataFormat.from}
                    to_data={dataFormat.to}
                    dataProfile={dataProfile}
                  />
                }
                fileName={`${moment(dataFormat.from).format(
                  "YYYY-MM"
                )} Timesheet TKTI ${dataProfile.form_activity_name} ${
                  dataProfile.name
                }.pdf`}
                // fileName={`my-attendance_data-${moment().format(
                //   "DD_MM_YYYY"
                // )}.pdf`}
              >
                <ButtonSys
                  type={"primary"}
                  // onClick={() => rt.push('/admin/candidates/pdfTemplate')}
                >
                  <div className={"flex flex-row"}>
                    <DownloadIcon2Svg size={16} color={"#fffffff"} />
                    <p className={"ml-2 text-xs text-white"}>Download PDF</p>
                  </div>
                </ButtonSys>
              </PDFDownloadLink>
            </div>
          ) : (
            <div className={"flex flex-col justify-center"}>
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 24,
                    }}
                    spin
                  />
                }
              >
                <p className="text-blackmig text-sm font-semibold text-center">
                  Please wait, get data
                </p>
              </Spin>
            </div>
          )}
        </Spin>
      </ModalCore>
    </DrawerCore>
  );
};
