import { CloseOutlined } from "@ant-design/icons";
import {
  Button,
  Calendar,
  Checkbox,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Table,
  TimePicker,
  Typography,
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
  PlusIconSvg,
  RightIconSvg,
} from "../../../../components/icon";
import Layout from "../../../../components/layout-dashboard-management";
import st from "../../../../components/layout-dashboard-management.module.css";
import httpcookie from "cookie";

const { RangePicker } = TimePicker;
const { Text } = Typography;
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

  const rt = useRouter();

  const tok = initProps;
  const pathArr = rt.pathname.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 1);
  pathTitleArr.splice(1, 1, "Workday Schedule");
  // const pathArr = rt.pathname.split("/").slice(1);
  // pathArr.splice(1, 1);
  const specialDates = {
    "2025-08-17": {
      label: "HUT Kemerdekaan RI",
      bgColor: "#fde3cf",
    },
    "2025-08-18": {
      label: "Cuti Bersama\nKemerdekaan RI",
      bgColor: "#00589F19",
    },
    "2025-09-05": {
      label: "Maulid Nabi",
      bgColor: "#00589F19",
    },
  };
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
  const tempIdUpdate = useRef(-1);
  const [triggerUpdate, setTriggerUpdate] = useState(-1);
  // 2.2. Create Role
  const [isCreateDrawerShown, setCreateDrawerShown] = useState(false);
  const [isUpdateDrawerShown, setIsUpdateDrawerShown] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [holidaysArray, setHolidaysArray] = useState([]);
  const dataSource = [
    {
      key: "1",
      num: 1,
      name: "John Doe",
      type: "Full Day",
      total: 20,
    },
    {
      key: "2",
      num: 2,
      name: "Jane Smith",
      type: "Half Day",
      total: 12,
    },
    {
      key: "3",
      num: 3,
      name: "Michael Johnson",
      type: "Remote",
      total: 8,
    },
    {
      key: "4",
      num: 4,
      name: "Sarah Connor",
      type: "Shift",
      total: 15,
    },
  ];
  const dataWorkDayTypes = [
    {
      key: "1",
      id: 1,
      name: "Cuti Bersama dihitung kerja",
    },
    {
      key: "2",
      id: 2,
      name: "Mengikuti Peraturan Pemerintah",
    },
  ];
  const [loading, setLoading] = useState(false);
  const columnWorkDay = [
    {
      title: "No",
      key: "num",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: <div className="flex justify-center">{text}</div>,
        };
      },
    },
    {
      title: "Company Name",
      key: "name",
      dataIndex: "name",
      render: (text, record, index) => {
        return {
          children: (
            <div className="xl:w-40">{record.name ? record.name : ""}</div>
          ),
        };
      },
    },
    {
      title: "Workday Type",
      key: "type",
      width: 200,
      dataIndex: "type",
      render: (text, record, index) => {
        return {
          children: <>{text}</>,
        };
      },
    },
    {
      title: "Workday(s) Total",
      key: "total",
      dataIndex: "total",
      render: (text, record, index) => {
        return {
          children: <>{text}</>,
        };
      },
    },
    {
      title: "Action",
      key: "button_action",
      width: 50,
      render: (text, record) => {
        return {
          children: (
            <div className="flex flex-row gap-2">
              <div
                className={
                  "hover:cursor-pointer flex justify-center items-center"
                }
                onClick={(event) => {
                  event.stopPropagation();
                  tempIdUpdate.current = record.id;
                  setTriggerUpdate((prev) => prev + 1);
                  setIsUpdateDrawerShown(true);
                }}
              >
                <EditTablerIconSvg size={20} color={"#808080"} />
              </div>
              <Link href={`/company/workdayschedule/${record.id}`}>
                <EyeIconSvg size={20} color={"#808080"} />
              </Link>
            </div>
          ),
        };
      },
    },
  ];
  const [datatable, setdatatable] = useState([]);
  // const [datatable2, setdatatable2] = useState([]);
  const [loaddatatable, setloaddatatable] = useState(false);

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

  const holidays = holidaysArray.reduce((acc, item) => {
    acc[item.tanggal] = item;
    return acc;
  }, {});

  const dateFullCellRender = (value) => {
    const dateStr = value.format("YYYY-MM-DD");
    const day = value.date();
    const isSunday = value.day() === 0;
    const holiday = holidaysArray.find(
      (item) => moment(item.tanggal).format("YYYY-MM-DD") === dateStr
    );

    let style = {
      borderTop: "1px solid #E6E6E6",
      boxSizing: "border-box",
      height: "100%",
      backgroundColor: isSunday ? "#F5851E19" : "inherit",
      color: isSunday ? "#4D4D4D" : "inherit",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      fontSize: 14,
      height: 85,
      marginRight: 8,
      paddingTop: 1,
    };

    if (holiday) {
      style.backgroundColor = holiday.is_cuti ? "#FFEBEE" : "#E3F2FD";
      style.color = "#4D4D4D";
    }

    return (
      <div style={style}>
        <div style={{ fontWeight: "bold", marginBottom: 4, textAlign: "left" }}>
          {day}
        </div>
        {holiday && (
          <div className="px-1" style={{ fontSize: 11, textAlign: "center" }}>
            {holiday.keterangan}
          </div>
        )}
      </div>
    );
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
        console.log("hasilnya ", res2);
        setCompanyList(res2.data);
        setLoadingGetCompany(false);
      });
  }, []);

  const dataWorkType = [
    { id: 1, name: "Full Day" },
    { id: 2, name: "Half Day" },
    { id: 3, name: "Remote" },
    { id: 4, name: "Shift" },
    { id: 5, name: "Flexible" },
  ];
  const [rowstate, setrowstate] = useState(0);
  const [loadingGetCompany, setLoadingGetCompany] = useState(false);
  const [instanceForm] = Form.useForm();
  const [companyList, setCompanyList] = useState([]);
  const [dataCompany, setDataCompany] = useState({
    id: null,
    name: "",
    work_day_type: null,
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
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [activeDays, setActiveDays] = useState({});

  const handleToggle = (day, checked) => {
    setActiveDays((prev) => ({ ...prev, [day]: checked }));
  };

  const cutiBersamaOptions = [
    "Cuti Bersama Idul Fitri",
    "Cuti Bersama Idul Adha",
  ];
  const liburNasionalOptions = [
    "Tahun Baru 2025 Masehi",
    "Hari Raya Nyepi",
    "Idul Fitri 1446 Hijriah",
    "Hari Kemerdekaan RI",
    "Hari Raya Natal",
  ];

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

  return (
    <Layout
      tok={tok}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      pathArr={pathArr}
      st={st}
    >
      {/* <div className="lg:col-span-3 flex flex-col px-4 pt-3 pb-0 border-neutrals70 bg-white">
        <Calendar
          fullscreen={true}
          // headerRender={headerRender}
          dateFullCellRender={dateFullCellRender}
        />
      </div> */}
      <div className="lg:col-span-3 flex flex-col rounded-[10px] border border-neutrals70 shadow-desktopCard bg-white mt-5">
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between px-4 pt-4 pb-3 border-b ">
          <h4 className="text-[14px] leading-6 text-mono30 font-bold mb-2 md:mb-0">
            Set Up Workday Schedule
          </h4>
          <div className={"flex gap-3"}>
            <ButtonSys
              type={"default"}
              color="mono50"
              //   onClick={onButtonCancelClicked}
            >
              <div className={"flex gap-1.5"}>
                <CloseOutlined size={16} color={"#808080"} />
                <p className={"text-[#808080] text-sm/4 "}>Cancel</p>
              </div>
            </ButtonSys>
            <Button
              type={"primary"}
              onClick={() => setCreateDrawerShown(true)}
              className="btn btn-sm text-white font-semibold px-2 py-2 border 
                        bg-primary100 hover:bg-primary75 border-primary100 
                        hover:border-primary75 focus:bg-primary100 focus:border-primary100 
                        flex-nowrap w-full md:w-fit"
              icon={<CirclePlusIconSvg size={16} color="#FFFFFF" />}
            >
              Create Schedule
            </Button>
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
              className="grid grid-cols-2 gap-x-4"
            >
              <Form.Item
                label="Company"
                name={"recruitment_role_type_id"}
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
                    value={dataCompany.recruitment_role_type_id}
                    onChange={(value) => {
                      setDataCompany({
                        ...dataCompany,
                        name: value,
                      });
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
                name={"recruitment_role_type_id"}
                rules={[
                  {
                    required: true,
                    message: "Company is required",
                  },
                ]}
                className="w-full"
              >
                <div>
                  <Input
                    value={dataCompany.name}
                    name={"name"}
                    //   onChange={onChangeInput}
                  />
                </div>
              </Form.Item>
              <Form.Item
                label="Year"
                name={"recruitment_role_type_id"}
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
                    // showSearch
                    optionFilterProp="children"
                    placeholder="Select Year"
                    // filterOption={(input, option) =>
                    //     (option?.children ?? "")
                    //         .toLowerCase()
                    //         .includes(input.toLowerCase())
                    // }
                    loading={loadingGetCompany}
                    style={{ width: `100%` }}
                    value={dataCompany.recruitment_role_type_id}
                    onChange={(value) => {
                      setDataCompany({
                        ...dataCompany,
                        name: value,
                      });
                    }}
                  >
                    {years.map((year) => (
                      <Option key={year} value={year}>
                        {year}
                      </Option>
                    ))}
                  </Select>
                </div>
              </Form.Item>
              <Form.Item
                label="Month"
                name={"recruitment_role_type_id"}
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
                    // showSearch
                    optionFilterProp="children"
                    placeholder="Select Month"
                    // filterOption={(input, option) =>
                    //     (option?.children ?? "")
                    //         .toLowerCase()
                    //         .includes(input.toLowerCase())
                    // }
                    loading={loadingGetCompany}
                    style={{ width: `100%` }}
                    value={dataCompany.recruitment_role_type_id}
                    onChange={(value) => {
                      setDataCompany({
                        ...dataCompany,
                        name: value,
                      });
                    }}
                  >
                    {months.map((month, index) => (
                      <Option key={index + 1} value={index + 1}>
                        {month}
                      </Option>
                    ))}
                  </Select>
                </div>
              </Form.Item>
            </Form>
            <div className={"pt-2"}>
              <h4 className="text-[14px] leading-6 text-mono30 font-bold mb-2 md:mb-4">
                Set Working Day
              </h4>
              {days.map((day) => (
                <div
                  key={day}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 12,
                    gap: 12,
                  }}
                >
                  <div className={"flex gap-3 w-2/5"}>
                    <div style={{ width: 100 }}>{day}</div>
                    <Switch
                      checked={activeDays[day]}
                      onChange={(checked) => handleToggle(day, checked)}
                    />
                  </div>
                  <div className={"w-3/5"}>
                    <RangePicker
                      format="HH:mm"
                      separator={
                        <ArrowRightIconSvg size={16} color={"#4D4D4D"} />
                      }
                      className="w-full"
                      disabled={!activeDays[day]}
                      defaultValue={[
                        moment("00:00", "HH:mm"),
                        moment("00:00", "HH:mm"),
                      ]}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={"w-1/2 pt-4 pl-4"}>
            <div className={"flex gap-4"}>
              <h4 className="text-[14px] leading-6 text-mono30 font-bold mb-2 md:mb-4">
                Set Joint Holiday
              </h4>
              <Switch checked={enabled} onChange={setEnabled} />
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
                onClick={() => handleSelectAll("cuti")}
              >
                {selectedCuti.length === cutiBersamaOptions.length ? (
                  <p className={"text-[#4D4D4D]"}>Deselect All</p>
                ) : (
                  <p className={"text-[#35763B]"}>Select All</p>
                )}
              </Button>
            </Row>
            <Checkbox.Group
              disabled={!enabled}
              options={cutiBersamaOptions}
              value={selectedCuti}
              onChange={setSelectedCuti}
            />
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
                onClick={() => handleSelectAll("libur")}
              >
                {selectedLibur.length === liburNasionalOptions.length ? (
                  <p className={"text-[#4D4D4D]"}>Deselect All</p>
                ) : (
                  <p className={"text-[#35763B]"}>Select All</p>
                )}
              </Button>
            </Row>
            <Checkbox.Group
              disabled={!enabled}
              options={liburNasionalOptions}
              value={selectedLibur}
              onChange={setSelectedLibur}
            />
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
