import {
  CloseOutlined,
  CopyOutlined,
  DeleteOutlined,
  PlusCircleFilled,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
  TimePicker,
  notification,
} from "antd";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { useAccessControl } from "contexts/access-control";

import {
  COMPANY_CLIENTS_GET,
  PUBLIC_HOLIDAYS_GET,
  WORKDAY_ADD,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import {
  ArrowLeftIconSvg,
  ArrowRightIconSvg,
  CirclePlusIconSvg,
  CopyIconSvg,
  InfoCircleIconSvg,
  PlusIconSvg,
  TrashIconSvg,
} from "../../../../components/icon";
import Layout from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard-management.module.css";
import httpcookie from "cookie";

const { RangePicker: DateRangePicker } = DatePicker;
const { RangePicker: TimeRangePicker } = TimePicker;
function WorkdayScheduleCreate({ initProps, dataProfile, sidemenu }) {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetCompanyClientList = hasPermission(COMPANY_CLIENTS_GET);
  const isAllowedToGetPublicHolidays = hasPermission(PUBLIC_HOLIDAYS_GET);
  const isAllowedToAddWorkday = hasPermission(WORKDAY_ADD);
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
  const [holidaysArray, setHolidaysArray] = useState([]);
  const [cutiBersamaOptions, setCutiBersamaOptions] = useState([]);
  const [liburNasionalOptions, setLiburNasionalOptions] = useState([]);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingGetCompany, setLoadingGetCompany] = useState(false);
  const [instanceForm] = Form.useForm();
  const [companyList, setCompanyList] = useState([]);
  const [dataCompany, setDataCompany] = useState({
    id: null,
    name: "",
    year: 2025,
    month: null,
  });
  const [enabled, setEnabled] = useState(false);
  const [selectedCuti, setSelectedCuti] = useState([]);
  const [selectedLibur, setSelectedLibur] = useState([]);
  const [warningWorkingDay, setWarningWorkingDay] = useState(false);
  const [warningCustomLibur, setWarningCustomLibur] = useState(false);
  const [isInteracted, setIsInteracted] = useState(false);
  const [holidays, setHolidays] = useState([]);
  const pageBreadcrumbValue = [
    { name: "Company", hrefValue: "/company/clients" },
    { name: "Workday Schedule", hrefValue: "/company/workdayschedule" },
    { name: "Create" },
  ];
  const [workingDays, setWorkingDays] = useState(
    days.map((day) => ({
      day,
      active: false,
      range: [],
    }))
  );
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

  useEffect(() => {
    if (!isAllowedToGetPublicHolidays) {
      permissionWarningNotification("Mendapatkan", "Get Public Holidays");
      // setloaddatatable(false);
      return;
    }
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
  }, [isAllowedToGetPublicHolidays]);

  useEffect(() => {
    if (!isAllowedToGetCompanyClientList) {
      permissionWarningNotification("Mendapatkan", "Daftar Company Client");
      setLoadingGetCompany(false);
      return;
    }
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
  }, [isAllowedToGetCompanyClientList]);

  useEffect(() => {
    if (!isInteracted) return;
    checkWorkingDay();
  }, [workingDays]);

  useEffect(() => {
    validateCustomHolidays();
  }, [holidays]);

  const handleCutiChange = (values) => {
    setSelectedCuti(values);
  };

  const handleLiburChange = (values) => {
    setSelectedLibur(values);
  };
  const handleToggle = (index, checked) => {
    setIsInteracted(true);
    const newSchedule = [...workingDays];
    newSchedule[index].active = checked;
    if (!checked) {
      newSchedule[index].range = []; // reset kalau dimatikan
    }
    setWorkingDays(newSchedule);
  };

  const handleTimeChange = (index, times) => {
    const newSchedule = [...workingDays];
    if (times) {
      newSchedule[index].range = times.map((t) => t.format("HH:mm"));
    } else {
      newSchedule[index].range = [];
    }
    setWorkingDays(newSchedule);
  };

  const handleCreateSchedule = () => {
    const custom_holidays = (holidays || []).map((h) => ({
      name: h.name,
      from: h.range?.[0]?.format("YYYY-MM-DD"),
      to: h.range?.[1]?.format("YYYY-MM-DD"),
    }));
    const isValid = validateCustomHolidays();
    if (checkWorkingDay() && isValid) {
      const payload = {
        // year: dataCompany.year,
        company_id: Number(dataCompany.id),
        // month: dataCompany.month,
        name: dataCompany.name,
        custom_holidays: custom_holidays,
        schedule: workingDays,
        holidays: [...selectedCuti, ...selectedLibur],
      };
      // console.log('Json stringify ', JSON.stringify(payload))
      setLoadingCreate(true);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addWorkday`, {
        method: "POST",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((response2) => {
          setLoadingCreate(false);
          if (response2.status == 200) {
            notification.success({
              message: `Workday Schedule has successfully created`,
              duration: 3,
              onClose: () => {
                rt.push("/company/workdayschedule/");
              },
            });
          } else {
            notification.error({
              message: `Create Workday Schedule has failed. ${response2.message}`,
              duration: 3,
            });
          }
        })
        .catch((err) => {
          setLoadingCreate(false);
          notification.error({
            message: `Add Engineer Workday Schedule failed. ${err.response}`,
            duration: 3,
          });
        });
    }
  };

  const validateCustomHolidays = () => {
    const custom_holidays = (holidays || []).map((h) => ({
      name: h.name,
      from: h.range?.[0]?.format("YYYY-MM-DD"),
      to: h.range?.[1]?.format("YYYY-MM-DD"),
    }));
    for (const h of custom_holidays) {
      if (!h.name || !h.from || !h.to) {
        setWarningCustomLibur(true);
        return false;
      }
    }
    setWarningCustomLibur(false);
    return true;
  };

  function checkWorkingDay() {
    const allEmpty = workingDays.every((item) => item.range.length === 0);

    if (allEmpty) {
      setWarningWorkingDay(true);
      return false;
    } else {
      setWarningWorkingDay(false);
      return true;
    }
  }

  const handleSetJoint = () => {
    if (enabled) {
      setSelectedCuti([]);
      setSelectedLibur([]);
    }
    setEnabled(!enabled);
  };

  const handleChangeName = (index, value) => {
    const newData = [...holidays];
    newData[index].name = value;
    setHolidays(newData);
  };

  const handleChangeRange = (index, dates) => {
    const newData = [...holidays];
    newData[index].range = dates;
    setHolidays(newData);
  };

  const handleAdd = () => {
    setHolidays([...holidays, { name: "", range: [] }]);
  };

  const handleDelete = (index) => {
    const newData = holidays.filter((_, i) => i !== index);
    setHolidays(newData);
  };

  const handleDuplicate = (index) => {
    const newData = [...holidays];
    newData.splice(index + 1, 0, { ...holidays[index] });
    setHolidays(newData);
  };

  return (
    <Layout
      tok={tok}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      pathArr={pathArr}
      st={st}
      fixedBreadcrumbValues={pageBreadcrumbValue}
    >
      {/* <div className="lg:col-span-3 flex flex-col px-4 pt-3 pb-0 border-neutrals70 bg-white">
        <Calendar
          fullscreen={true}
          // headerRender={headerRender}
          dateFullCellRender={dateFullCellRender}
        />
      </div> */}
      <div className="lg:col-span-3 flex flex-col rounded-[10px] border border-neutrals70 shadow-desktopCard bg-white pb-4">
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between px-4 pt-4 pb-3 border-b ">
          <div className={"flex gap-2"}>
            <div className={"hover:cursor-pointer"} onClick={() => rt.back()}>
              <ArrowLeftIconSvg />
            </div>
            <h4 className="text-[14px] leading-6 text-mono30 font-bold mb-2 md:mb-0">
              Set Up {moment().format("YYYY")} Workday Schedule
            </h4>
          </div>
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
            {isAllowedToAddWorkday && (
              <Button
                type={"primary"}
                loading={loadingCreate}
                onClick={() => instanceForm.submit()}
                className="btn btn-sm text-white font-semibold px-2 py-2 border 
                        bg-primary100 hover:bg-primary75 border-primary100 
                        hover:border-primary75 focus:bg-primary100 focus:border-primary100 
                        flex-nowrap w-full md:w-fit"
                icon={<CirclePlusIconSvg size={16} color="#FFFFFF" />}
              >
                Create Schedule
              </Button>
            )}
          </div>
        </div>
        <div className={"px-4 flex"}>
          <div className={"border-r w-1/2 pt-4 pr-4"}>
            <h4 className="text-[14px] leading-6 text-mono30 font-bold mb-2 md:mb-4">
              Set Up Schedule
            </h4>
            <Form
              layout="vertical"
              form={instanceForm}
              onFinish={handleCreateSchedule}
              className="grid grid-cols-2 gap-x-4 border-b"
            >
              <Form.Item
                label="Company"
                name={"company"}
                rules={[
                  {
                    required: true,
                    message: "Company is required",
                  },
                ]}
                className="w-full"
              >
                <div>
                  <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select Company"
                    filterOption={(input, option) =>
                      (option?.children ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    loading={loadingGetCompany}
                    style={{ width: `100%` }}
                    value={dataCompany.id}
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
            <div className={"py-2 border-b"}>
              <h4 className="text-[14px] leading-6 text-mono30 font-bold mb-2 md:mb-4">
                Set Working Day
              </h4>
              {workingDays.map((item, index) => (
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
                    <TimeRangePicker
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
            <div className={"py-4"}>
              <h4 className="text-[14px] leading-6 text-mono30 font-bold mb-2 md:mb-4">
                Customize Holidays
              </h4>
              <Space direction="vertical" style={{ width: "100%" }}>
                {holidays.map((item, index) => (
                  <div
                    key={index}
                    className={"p-4 rounded-[10px] border border-[#E6E6E6]"}
                  >
                    <p
                      className={
                        "text-xs/5 font-bold font-inter text-mono30 mb-4"
                      }
                    >
                      Holiday {index + 1}
                    </p>

                    <Form layout="vertical">
                      <Form.Item
                        label="Holiday Name"
                        name={"holiday_name"}
                        rules={[
                          {
                            required: true,
                            message: "Holiday Name is required",
                          },
                        ]}
                        className="w-full"
                      >
                        <div>
                          <Input
                            className={"w-full"}
                            placeholder="e.g. HUT KEMERDEKAAN RI"
                            name={"holiday_name"}
                            value={item.name}
                            onChange={(e) =>
                              handleChangeName(index, e.target.value)
                            }
                          />
                        </div>
                      </Form.Item>
                      <Form.Item
                        label="Holiday Period"
                        name={"holiday_period"}
                        rules={[
                          {
                            required: true,
                            message: "Holiday Period is required",
                          },
                        ]}
                        className="w-full"
                      >
                        <div>
                          <DateRangePicker
                            value={item.range}
                            onChange={(dates) =>
                              handleChangeRange(index, dates)
                            }
                            format="DD MMM YYYY"
                            style={{ width: "100%" }}
                          />
                        </div>
                      </Form.Item>
                    </Form>
                    <div className={"flex gap-4 justify-end mt-1"}>
                      <div
                        onClick={() => handleDuplicate(index)}
                        className={"hover:cursor-pointer"}
                      >
                        <CopyIconSvg size={24} color={"#4D4D4D"} />
                      </div>
                      {/* <Button
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleDelete(index)}
                        /> */}
                      <div
                        onClick={() => handleDelete(index)}
                        className={"hover:cursor-pointer"}
                      >
                        <TrashIconSvg size={24} color={"#4D4D4D"} />
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  type="dashed"
                  block
                  style={{
                    borderColor: "#35763B",
                    color: "#35763B",
                    height: 32,
                  }}
                  className="flex justify-center items-center"
                  icon={<PlusCircleOutlined />}
                  onClick={handleAdd}
                >
                  Add Custom Holiday
                </Button>
              </Space>
              {warningCustomLibur && (
                <p class="text-[#ff4d4f] text-sm font-medium mt-1">
                  Customize Holidays is must filled All
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
            <div className={"border-b pb-4"}>
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
            </div>
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
            {/* <div className={'py-4'}>
              <p
                className={`${enabled ? "text-[#4D4D4D]" : "text-black/25"
                  } text-xs/5 font-medium font-inter `}
              >
                Custom Libur
              </p>
              {holidays.map((holiday, index) => (
                <Row gutter={12} align="middle" key={index} className="my-4">
                  <Col>
                    <DatePicker
                      placeholder="Pilih tanggal"
                      format="YYYY-MM-DD"
                      value={holiday.date ? moment(holiday.date) : null}
                      onChange={(date) => handleDateChange(index, date)}
                    />
                  </Col>
                  <Col flex="auto">
                    <Input
                      placeholder="Nama hari libur"
                      value={holiday.name}
                      onChange={(e) => handleNameChange(index, e)}
                    />
                  </Col>
                  <Col>
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => removeHoliday(index)}
                    />
                  </Col>
                </Row>
              ))}
            </div>

            <Button
              type="dashed"
              onClick={addHoliday}
              icon={<PlusOutlined />}
              style={{ width: "100%" }}
            >
              Tambah Hari Libur
            </Button> */}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  var initProps = {};
  const reqBody = {
    page: 1,
    rows: 50,
    order_by: "asc",
  };
  if (req && req.headers) {
    const cookies = req.headers.cookie;
    if (!cookies) {
      res.writeHead(302, { Location: "/login" });
      res.end();
    }
    if (typeof cookies === "string") {
      const cookiesJSON = httpcookie.parse(cookies);
      initProps = cookiesJSON.token;
    }
  }
  const resourcesGP = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/detailProfile`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
    }
  );
  const resjsonGP = await resourcesGP.json();
  const dataProfile = resjsonGP;
  return {
    props: {
      initProps,
      dataProfile,
      // dataCompanyList,
      // dataLocations,
      sidemenu: "workdayschedule",
    },
  };
}

export default WorkdayScheduleCreate;
