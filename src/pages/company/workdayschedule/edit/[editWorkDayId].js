import { CloseOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Row,
  Select,
  Switch,
  TimePicker,
  Typography,
  notification,
} from "antd";
import axios from "axios";
import moment from "moment";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import { COMPANY_CLIENTS_GET, COMPANY_CLIENT_ADD } from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import ButtonSys from "../../../../components/button";
import {
  ArrowRightIconSvg,
  CirclePlusIconSvg,
  CloseIconSvg,
  EditTablerIconSvg,
  EyeIconSvg,
  InfoCircleIconSvg,
  PlusIconSvg,
  RightIconSvg,
  WarningIconSvg,
} from "../../../../components/icon";
import Layout from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard-management.module.css";
import httpcookie from "cookie";

const { RangePicker } = TimePicker;
const { Text } = Typography;

const EditWorkDay = ({ initProps, dataProfile, sidemenu, workdayId }) => {
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetCompanyClientList = hasPermission(COMPANY_CLIENTS_GET);

  const rt = useRouter();

  const tok = initProps;
  const pathArr = rt.pathname.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 1);
  pathTitleArr.splice(1, 1, "Workday Schedule");
  // const pathArr = rt.pathname.split("/").slice(1);
  // pathArr.splice(1, 1);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    recruitment_role_id: withDefault(NumberParam, undefined),
    recruitment_stage_id: withDefault(NumberParam, undefined),
    recruitment_status_id: withDefault(NumberParam, undefined),
  });
  const [refresh, setRefresh] = useState(-1);
  const [active, setActive] = useState({
    id: null,
    name: null,
  });
  const [workHours, setWorkHours] = useState([]);
  const [holidaysArray, setHolidaysArray] = useState([]);
  const [cutiBersamaOptions, setCutiBersamaOptions] = useState([]);
  const [liburNasionalOptions, setLiburNasionalOptions] = useState([]);
  const [dataWorkDay, setDataWorkDay] = useState([]);
  const [loading, setLoading] = useState(false);
  const [datatable, setdatatable] = useState([]);
  const [dataSchedule, setDataSchedule] = useState([]);
  const [warningWorkingDay, setWarningWorkingDay] = useState(false);
  // const [datatable2, setdatatable2] = useState([]);
  const [loaddatatable, setloaddatatable] = useState(false);
  const [daysData, setDaysData] = useState([]);
  const [holidaysData, setHolidaysData] = useState([]);
  const [workingDays, setWorkingDays] = useState(
    days.map((day) => ({
      day,
      active: false,
      range: [],
    }))
  );
  const [workingDaysMap, setWorkingDaysMap] = useState([]);

  useEffect(() => {
    if (!daysData) return;
    const merged = workingDays.map((d) => {
      const apiDay = daysData.find((a) => a.day === d.day);
      return apiDay ? apiDay : d;
    });
    setWorkingDaysMap(merged);
  }, [daysData]);

  useEffect(() => {
    if (!holidaysData) return;
    let datacuti = holidaysData.filter((item) => item.is_cuti === 1);
    if (datacuti.length > 0) {
      const selectedIds = datacuti.map((item) => item.id);
      setSelectedCuti(selectedIds);
      setEnabled(true);
    } else {
      setEnabled(false);
    }
    let datalibur = holidaysData.filter((item) => item.is_cuti === 0);
    if (datalibur.length > 0) {
      const selectedIds = datalibur.map((item) => item.id);
      setSelectedLibur(selectedIds);
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }, [holidaysData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);
        const res = await axios.get("https://dayoffapi.vercel.app/api");
        setHolidaysArray(res.data); // data dari API
      } catch (err) {
        // setError(err.message || "Something went wrong");
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSetJoint = () => {
    if (enabled) {
      setSelectedCuti([]);
      setSelectedLibur([]);
    }
    setEnabled(!enabled);
  };

  const [refreshCompanyClientList, triggerRefreshCompanyClientList] =
    useState(0);

  //useEffect
  useEffect(() => {
    if (!isAllowedToGetCompanyClientList && !isAccessControlPending) {
      permissionWarningNotification("Mendapatkan", "Daftar Company Client");
      setloaddatatable(false);
      return;
    }

    setloaddatatable(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyClientList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setdatatable(res2.data);
        // setdatatable2(res2.data);
        setloaddatatable(false);
      });
  }, [
    refreshCompanyClientList,
    isAllowedToGetCompanyClientList,
    isAccessControlPending,
  ]);

  useEffect(() => {
    if (!active.id) return;
    // fetchDataDetail()
    getWorkDay();
  }, [active]);

  const getWorkDay = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getWorkday?id=${active.id}`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        // console.log("res2 work day detail ", res2.data);
        setDataSchedule(res2.data.schedule);
        updateWorkForm.setFieldsValue({
          schedule_name: res2.data.name,
        });
        setDataCompany({
          ...dataCompany,
          id: res2.data.id,
          name: res2.data.name,
        });
        setDaysData(res2.data.schedule);
        setHolidaysData(res2.data.holidays);
      });
  };

  useEffect(() => {
    fetchDataDetail();
  }, []);
  const fetchDataDetail = async () => {
    try {
      // setLoading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getWorkdays?company_id=${workdayId}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          // console.log("res2 work day ", res2.data);
          // setCompanyName(res2.data.company_name);
          let datatemp = res2.data.workdays;
          // console.log('isi datatemp[0] ',datatemp[0])
          setDataCompany({
            ...dataCompany,
            company_name: res2.data.company_name,
            name: datatemp[0].name,
          });
          if (datatemp.length > 0) {
            // fetchDataDetailStatistic(datatemp[0].id)
            setDataWorkDay(datatemp);
            setActive({
              id: datatemp[0].id,
              name: datatemp[0].name,
            });
            setWorkHours(datatemp[0].schedule);
          }
        });
    } catch (err) {
      // setError(err.message || "Something went wrong");
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getPublicHolidays`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        // console.log('res2 pblic holidays ', res2)
        let dataholidays = res2.data;
        setCutiBersamaOptions(
          dataholidays.filter((item) => item.is_cuti === 1)
        );
        setLiburNasionalOptions(
          dataholidays.filter((item) => item.is_cuti === 0)
        );
      });
  }, []);

  useEffect(() => {
    setLoadingGetCompany(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyClientList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        // console.log("hasilnya ", res2);
        setCompanyList(res2.data);
        setLoadingGetCompany(false);
      });
  }, []);

  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingGetCompany, setLoadingGetCompany] = useState(false);
  const [updateWorkForm] = Form.useForm();
  const [companyList, setCompanyList] = useState([]);
  const [dataCompany, setDataCompany] = useState({
    id: null,
    name: "",
    company_name: null,
    year: 2025,
    month: null,
  });
  const years = Array.from({ length: 2030 - 2025 + 1 }, (_, i) => 2025 + i);
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const [activeDays, setActiveDays] = useState({});
  const pageBreadcrumbValue = [
    { name: "Company", hrefValue: "/company/clients" },
    { name: "Workday Schedule", hrefValue: "/company/workdayschedule" },
    { name: "Edit Workday Schedule" },
  ];
  // const handleToggle = (day, checked) => {
  //   setActiveDays((prev) => ({ ...prev, [day]: checked }));
  // };

  const [enabled, setEnabled] = useState(false);

  const [selectedCuti, setSelectedCuti] = useState([]);
  const [selectedLibur, setSelectedLibur] = useState([]);
  const handleSelectAll = (type) => {
    if (type === "cuti") {
      setSelectedCuti(
        selectedCuti.length === cutiBersamaOptions.length
          ? []
          : cutiBersamaOptions
      );
    } else {
      setSelectedLibur(
        selectedLibur.length === liburNasionalOptions.length
          ? []
          : liburNasionalOptions
      );
    }
  };
  const handleCutiChange = (values) => {
    setSelectedCuti(values);
  };

  const handleLiburChange = (values) => {
    setSelectedLibur(values);
  };
  const handleToggle = (index, checked) => {
    const newSchedule = [...workingDaysMap];
    newSchedule[index].active = checked;
    if (!checked) {
      newSchedule[index].range = []; // reset kalau dimatikan
    }
    setWorkingDaysMap(newSchedule);
  };

  const handleTimeChange = (index, times) => {
    const newSchedule = [...workingDaysMap];
    if (times) {
      newSchedule[index].range = times.map((t) => t.format("HH:mm"));
    } else {
      newSchedule[index].range = [];
    }
    setWorkingDaysMap(newSchedule);
  };

  const handleCreateSchedule = () => {
    // console.log('isi dataCompany ', dataCompany)
    // console.log('isi working days ', workingDays)
    // console.log('isi cuti bersama ', selectedCuti)
    // console.log('isi libur ', selectedLibur)
    if (checkWorkingDay()) {
      const payload = {
        // year: dataCompany.year,
        company_id: Number(workdayId),
        id: Number(dataCompany.id),
        // month: dataCompany.month,
        name: dataCompany.name,
        schedule: workingDaysMap,
        holidays: [...selectedCuti, ...selectedLibur],
      };
      // console.log('Json stringify ', JSON.stringify(payload))
      setLoadingCreate(true);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateWorkday`, {
        method: "PUT",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((response2) => {
          setLoadingCreate(false);
          if (response2.success) {
            notification.success({
              message: `Engineer Workday Schedule successfully updated`,
              duration: 3,
            });
          } else {
            notification.error({
              message: `Update Engineer Workday Schedule failed. ${response2.message}`,
              duration: 3,
            });
          }
        })
        .catch((err) => {
          setLoadingCreate(false);
          notification.error({
            message: `Update Engineer Workday Schedule failed. ${err.response}`,
            duration: 3,
          });
        });
    }
  };

  const handleActive = (w) => {
    setActive({
      ...active,
      id: w.id,
      name: w.name,
    });
    if (w.schedule.length > 0) {
      setWorkHours(w.schedule);
    } else {
      setWorkHours([]);
    }
  };
  useEffect(() => {
    // ambil text default cuma sekali
    checkWorkingDay();
  }, [workingDaysMap]);

  function checkWorkingDay() {
    const allEmpty = workingDaysMap.every((item) => item.range.length === 0);
    if (allEmpty) {
      setWarningWorkingDay(true);
      return false;
    } else {
      setWarningWorkingDay(false);
      return true;
    }
  }

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      pathArr={pathTitleArr}
      st={st}
      idpage={workdayId}
      fixedBreadcrumbValues={pageBreadcrumbValue}
    >
      <div className="lg:col-span-3 flex flex-col rounded-[10px] border border-neutrals70 shadow-desktopCard bg-white pb-4">
        <div className="px-4 pt-4 pb-3 border-b ">
          <div
            className={
              "flex flex-col md:flex-row items-start md:items-center md:justify-between"
            }
          >
            <h4 className="text-[14px] leading-6 text-mono30 font-bold mb-2 md:mb-0">
              {moment().format("YYYY")} Workday Schedule
            </h4>
            <div className={"flex gap-3"}>
              <Link href={`/company/workdayschedule/`}>
                <div
                  className={
                    "flex gap-1.5 px-4 py-2 border border-[#808080] rounded-[5px] hover:cursor-pointer"
                  }
                >
                  <CloseOutlined
                    size={16}
                    color={"#808080"}
                    style={{ color: "#808080" }}
                  />
                  <p className={"text-[#808080] text-sm/4 "}>Cancel</p>
                </div>
              </Link>

              <Button
                type={"primary"}
                loading={loadingCreate}
                onClick={() => updateWorkForm.submit()}
                className="btn btn-sm text-white font-semibold px-2 py-2 border 
                        bg-primary100 hover:bg-primary75 border-primary100 
                        hover:border-primary75 focus:bg-primary100 focus:border-primary100 
                        flex-nowrap w-full md:w-fit"
                icon={<CirclePlusIconSvg size={16} color="#FFFFFF" />}
              >
                Save Change
              </Button>
            </div>
          </div>
          <div className={"flex items-center gap-3 pt-4"}>
            {dataWorkDay.map((w) => (
              <div
                key={w.id}
                onClick={() => handleActive(w)}
                className={`flex items-center gap-1 hover:cursor-pointer h-8 py-1 px-4 rounded-[48px] ${
                  active.id === w.id
                    ? "bg-[#35763B]"
                    : " border border-[#808080]"
                }`}
              >
                <p
                  className={`${
                    active.id === w.id ? "text-white" : "text-[#808080]"
                  }  font-inter text-sm/6`}
                >
                  {w.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className={"px-4 flex"}>
          <div className={"border-r w-1/2 pt-4 pr-4"}>
            <h4 className="text-[14px] leading-6 text-mono30 font-bold mb-2 md:mb-4">
              Edit Information
            </h4>
            <Form
              layout="vertical"
              form={updateWorkForm}
              onFinish={handleCreateSchedule}
              className="grid grid-cols-2 gap-x-4"
            >
              <Form.Item
                label="Company"
                name={"company"}
                // rules={[
                //   {
                //     required: true,
                //     message: "Company is required",
                //   },
                // ]}
                className="w-full"
              >
                <div>
                  <Select
                    showSearch
                    disabled
                    optionFilterProp="children"
                    placeholder="Select Company"
                    filterOption={(input, option) =>
                      (option?.children ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    loading={loadingGetCompany}
                    style={{ width: `100%` }}
                    value={dataCompany.company_name}
                    onChange={(value) => {
                      setDataCompany({
                        ...dataCompany,
                        id: value,
                      });
                      instanceForm.setFieldsValue({ company: value });
                    }}
                  >
                    {companyList?.map((company) => (
                      <Select.Option key={company.id} value={company.id}>
                        {company.name}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              </Form.Item>
              <Form.Item
                label="Workday Schedule Name"
                name={"schedule_name"}
                rules={[
                  {
                    required: true,
                    message: "Workday Schedule Name is required",
                  },
                ]}
                className="w-full"
              >
                <div>
                  <Input
                    value={dataCompany.name}
                    name={"name"}
                    onChange={(e) => {
                      setDataCompany({
                        ...dataCompany,
                        name: e.target.value,
                      });
                    }}
                  />
                </div>
              </Form.Item>
            </Form>
            <div className={"pt-2"}>
              <h4 className="text-[14px] leading-6 text-mono30 font-bold mb-2 md:mb-4">
                Set Working Day
              </h4>
              {workingDaysMap.map((item, index) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 12,
                    gap: 12,
                  }}
                >
                  <div className={"flex gap-3 w-2/5"}>
                    <div style={{ width: 100 }}>
                      <p className={"text-[#4D4D4D] font-inter text-sm/6"}>
                        {item.day}
                      </p>
                    </div>
                    <Switch
                      checked={item.active}
                      onChange={(checked) => handleToggle(index, checked)}
                    />
                  </div>
                  <div className={"w-3/5"}>
                    <RangePicker
                      format="HH:mm"
                      separator={
                        <ArrowRightIconSvg size={16} color={"#4D4D4D"} />
                      }
                      value={
                        item.range.length
                          ? [
                              moment(item.range[0], "HH:mm"),
                              moment(item.range[1], "HH:mm"),
                            ]
                          : null
                      }
                      onChange={(times) => handleTimeChange(index, times)}
                      disabled={!item.active}
                    />
                  </div>
                </div>
              ))}
              {warningWorkingDay && (
                <p class="text-[#ff4d4f] text-sm font-medium">
                  Working day is must filled
                </p>
              )}
            </div>
          </div>
          <div className={"w-1/2 pt-4 pl-4"}>
            <div className={"flex gap-4"}>
              <h4 className="text-[14px] leading-6 text-mono30 font-bold mb-2 md:mb-4">
                Set Joint Holiday
              </h4>
              <Switch checked={enabled} onChange={() => handleSetJoint()} />
            </div>
            <div
              className={
                "rounded-s py-2 px-3 w-full bg-[#00589F19] flex gap-2 items-center mb-2 md:mb-4"
              }
            >
              <InfoCircleIconSvg size={16} color={"#00589F"} />
              <p className={"text-xs/5 font-inter font-normal text-[#00589F]"}>
                Jika tidak diceklis akan menambah hari kerja di kalender kerja,
                jika diceklis akan mengurangi hari kerja di kalender kerja.
              </p>
            </div>
            <Row justify="space-between" align="middle">
              <p
                className={`${
                  enabled ? "text-[#4D4D4D]" : "text-black/25"
                } text-xs/5 font-medium font-inter `}
              >
                Cuti Bersama
              </p>
              <Button
                type="link"
                disabled={!enabled}
                onClick={() =>
                  setSelectedCuti(
                    selectedCuti.length === cutiBersamaOptions.length
                      ? [] // kalau semua sudah dipilih, klik lagi jadi kosong
                      : cutiBersamaOptions.map((i) => i.id) // pilih semua
                  )
                }
              >
                {selectedCuti.length === cutiBersamaOptions.length ? (
                  <p
                    className={`${
                      enabled ? "text-[#4D4D4D]" : "text-black/25"
                    }`}
                  >
                    Deselect All
                  </p>
                ) : (
                  <p
                    className={`${
                      enabled ? "text-[#35763B]" : "text-black/25"
                    }`}
                  >
                    Select All
                  </p>
                )}
              </Button>
            </Row>
            <Checkbox.Group
              disabled={!enabled}
              // options={cutiBersamaOptions}
              className="grid grid-cols-2 gap-x-6 gap-y-2"
              value={selectedCuti}
              onChange={handleCutiChange}
            >
              {cutiBersamaOptions?.map((item) => (
                <Checkbox
                  className="flex items-start !whitespace-normal !leading-snug !ml-0"
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </Checkbox>
              ))}
            </Checkbox.Group>
            <br />

            {/* Libur Nasional */}
            <Row
              justify="space-between"
              align="middle"
              style={{ marginTop: 16 }}
            >
              <p
                className={`${
                  enabled ? "text-[#4D4D4D]" : "text-black/25"
                } text-xs/5 font-medium font-inter `}
              >
                Libur Nasional
              </p>
              <Button
                type="link"
                disabled={!enabled}
                onClick={() =>
                  setSelectedLibur(
                    selectedLibur.length === liburNasionalOptions.length
                      ? [] // kalau semua sudah dipilih, klik lagi jadi kosong
                      : liburNasionalOptions.map((i) => i.id) // pilih semua
                  )
                }
              >
                {selectedLibur.length === liburNasionalOptions.length ? (
                  <p
                    className={`${
                      enabled ? "text-[#4D4D4D]" : "text-black/25"
                    }`}
                  >
                    Deselect All
                  </p>
                ) : (
                  <p
                    className={`${
                      enabled ? "text-[#35763B]" : "text-black/25"
                    }`}
                  >
                    Select All
                  </p>
                )}
              </Button>
            </Row>
            <Checkbox.Group
              disabled={!enabled}
              className="grid grid-cols-2 gap-x-6 gap-y-2"
              // options={liburNasionalOptions}
              value={selectedLibur}
              onChange={handleLiburChange}
            >
              {liburNasionalOptions?.map((item) => (
                <Checkbox
                  className="flex items-start !whitespace-normal !leading-snug !ml-0"
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ req, res, params }) {
  const workdayId = params.editWorkDayId;
  var initProps = {};
  if (!req.headers.cookie) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const cookiesJSON1 = httpcookie.parse(req.headers.cookie);
  if (!cookiesJSON1.token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  initProps = cookiesJSON1.token;
  const resourcesGP = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/detailProfile`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGP = await resourcesGP.json();
  const dataProfile = resjsonGP;

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "workdayschedule",
      workdayId,
    },
  };
}

export default EditWorkDay;
