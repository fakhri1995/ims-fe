import {
  Checkbox,
  Empty,
  Input,
  Popover,
  Progress,
  Select,
  Spin,
  Table,
  notification,
} from "antd";
import jscookie from "js-cookie";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import Link from "next/link";
import { useRouter } from "next/router";
import QueryString from "qs";
import { useEffect, useState } from "react";

import ButtonSys from "../../../components/button";
import {
  AlerttriangleIconSvg,
  DownIconSvg,
  NewsIconSvg,
  PakaiSewaIconSvg,
  SearchIconSvg,
  UpIconSvg,
  UserCheckIconSvg,
  UserIconSvg,
} from "../../../components/icon";
import { H1, H2, Label, Text } from "../../../components/typography";
import { useAccessControl } from "../../../contexts/access-control";
import { PROJECT_TASKS_COUNT_CLIENT_GET } from "../../../lib/features";
import DetailAgenCard from "./DetailAgenCard";

function EmployeeList({ initProps, companyId }) {
  const [dataStatusList, setDataStatusList] = useState([
    {
      id: 1,
      name: "Tepat Waktu",
    },
    {
      id: 2,
      name: "Terlambat",
    },
  ]);
  const { hasPermission } = useAccessControl();
  const isAllowedToGetProjectTaskCount = hasPermission(
    PROJECT_TASKS_COUNT_CLIENT_GET
  );
  const [rowstate, setrowstate] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const router = useRouter();
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    company_ids: withDefault(StringParam, companyId),
    keyword: withDefault(StringParam, undefined),
    keyword_role: withDefault(StringParam, undefined),
    is_on_time: withDefault(NumberParam, undefined),
    is_late: withDefault(NumberParam, undefined),
    is_wfo: withDefault(NumberParam, undefined),
    is_wfh: withDefault(NumberParam, undefined),
    is_hadir: withDefault(NumberParam, undefined),
  });
  const [dataDetailAgen, setDataDetailAgen] = useState({
    name: null,
    id: null,
    role: null,
    attendance_user: null,
  });
  const [visibleDetail, setVisibleDetail] = useState(false);
  const columnsTable = [
    {
      title: "No.",
      dataIndex: "id",
      render: (text, record, index) => {
        return {
          children: <>{dataRawAttendances?.from + index}</>,
        };
      },
    },
    {
      title: "Nama",
      dataIndex: "name",
      render: (text, record, index) => {
        return {
          children: (
            <div className={"hover:cursor-pointer"}>
              <Popover
                content={
                  <div>
                    <p>{record.name}</p>
                    <p className={"mt-2"}>{record.position}</p>
                  </div>
                }
              >
                {text}
              </Popover>
            </div>
          ),
        };
      },
    },
    {
      title: "Role",
      dataIndex: "position",
      render: (text, record, index) => {
        return {
          children: <div className={"hover:cursor-pointer"}>{text}</div>,
        };
      },
    },
    {
      title: "Status Kehadiran",
      dataIndex: "status_kehadiran",
      align: "center",
      render: (text, record, index) => {
        return {
          children: (
            <div key={index} className={"hover:cursor-pointer"}>
              {record.attendance_user == null ? (
                <div
                  className={"bg-onprogress py-0.5 px-2 rounded-[2px] w-[92px]"}
                >
                  <p className={"text-[10px] text-white font-bold leading-4"}>
                    Belum Check In
                  </p>
                </div>
              ) : (
                <div className={"flex gap-2.5"}>
                  {record.attendance_user.is_late == 0 ? (
                    <div className={"bg-primary100 px-2 py-0.5 rounded-[2px]"}>
                      <p
                        className={"text-[10px] text-white font-bold leading-4"}
                      >
                        Tepat Waktu
                      </p>
                    </div>
                  ) : (
                    <div className={"bg-state1 px-2 py-0.5 rounded-[2px]"}>
                      <p
                        className={"text-[10px] text-white font-bold leading-4"}
                      >
                        Terlambat
                      </p>
                    </div>
                  )}
                  <div className={"bg-closed px-2 py-0.5 rounded-[2px]"}>
                    <p className={"text-[10px] text-white font-bold leading-4"}>
                      {record.attendance_user.is_wfo == 1 ? "WFO" : "WFH"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ),
        };
      },
    },
    {
      title: "Jumlah Tugas",
      dataIndex: "project_tasks_count",
      render: (text, record, index) => {
        return {
          // children: <div className={'hover:cursor-pointer'} onClick={()=> router.push(`/kehadiran/projects/${record.id}`)}>{text}</div>,
          children: (
            <div className={"hover:cursor-pointer"}>
              {isAllowedToGetProjectTaskCount ? text : "-"}
            </div>
          ),
        };
      },
    },
    {
      title: "Aksi",
      dataIndex: "project_tasks_count",
      align: "center",
      render: (text, record, index) => {
        return {
          children: (
            <div key={index} className="flex gap-2.5 hover:cursor-pointer">
              <div
                className={
                  "px-4 py-1 border border-secondary100 rounded-[5px] flex justify-center items-center"
                }
              >
                <UserCheckIconSvg size={16} color={"#00589F"} />
              </div>
              <div
                className={
                  "px-4 py-1 border border-primary100 rounded-[5px] flex justify-center items-center"
                }
              >
                <NewsIconSvg size={16} />
              </div>
            </div>
          ),
        };
      },
    },
  ];
  const [dataChecked, setDataChecked] = useState({
    tepat_waktu: false,
    terlambat: false,
    wfh: false,
    wfo: false,
    belum_cek_in: false,
  });
  const [dataKehadiranSelected, setDataKehadiranSelected] = useState([]);
  const [displaydata, setdisplaydata] = useState([]);
  const [dataAttendances, setDataAttendances] = useState([]);
  const [dataRawAttendances, setDataRawAttendances] = useState({
    current_page: "",
    data: [],
    first_page_url: "",
    from: null,
    last_page: null,
    last_page_url: "",
    next_page_url: "",
    path: "",
    per_page: null,
    prev_page_url: null,
    to: null,
    total: null,
  });
  const [loadingTable, setLoadingTable] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  useEffect(() => {
    setdisplaydata([
      {
        id: 1,
        name: "Fikri Nurul Ilmi",
        role: "Project Manager",
        status_kehadiran: "Belum Checkin",
        status_kerja: "WFH",
        jumlah_tugas: 5,
      },
      {
        id: 2,
        name: "Mochamad Bakhtiar Hanafi",
        role: "Junior Programmer",
        status_kehadiran: "Tepat Waktu",
        status_kerja: "WF0",
        jumlah_tugas: 10,
      },
      {
        id: 3,
        name: "Palito",
        role: "Backend",
        status_kehadiran: "Terlambat",
        status_kerja: "WFH",
        jumlah_tugas: 10,
      },
    ]);

    setLoadingTable(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [
    queryParams.page,
    queryParams.rows,
    queryParams.keyword,
    queryParams.keyword_role,
    queryParams.is_hadir,
    queryParams.is_late,
    queryParams.is_on_time,
    queryParams.is_wfh,
    queryParams.is_wfo,
  ]);
  const fetchData = async () => {
    const params = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });
    setLoadingTable(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAttendancesUsersPaginate${params}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataRawAttendances(res2.data);
          setDataAttendances(res2.data.data);
        } else {
          // notification.error({
          //   message: `${res2.message}`,
          //   duration: 3,
          // });
        }
      })
      .catch((err) => {
        // notification.error({
        //   message: `${err.response}`,
        //   duration: 3,
        // });
      })
      .finally(() => {
        setLoadingTable(false);
      });
  };

  const handleCheckKehadiran = (kehadiran) => {
    if (kehadiran == "Terlambat") {
      let dataTemp = dataKehadiranSelected;
      if (dataChecked.terlambat == true) {
        //remove
        var filteredArray = dataKehadiranSelected.filter(function (e) {
          return e !== "Terlambat";
        });
        setDataKehadiranSelected(filteredArray);
        setQueryParams({
          page: 1,
          is_late: undefined,
        });
      } else {
        dataTemp.push("Terlambat");
        setDataKehadiranSelected(dataTemp);
        setQueryParams({
          page: 1,
          is_late: 1,
        });
      }
      setDataChecked({
        ...dataChecked,
        terlambat: !dataChecked.terlambat,
      });
    } else if (kehadiran == "Tepat Waktu") {
      let dataTemp = dataKehadiranSelected;
      if (dataChecked.tepat_waktu == true) {
        //remove
        setQueryParams({
          page: 1,
          is_on_time: undefined,
        });
        var filteredArray = dataKehadiranSelected.filter(function (e) {
          return e !== "Tepat Waktu";
        });
        setDataKehadiranSelected(filteredArray);
      } else {
        dataTemp.push("Tepat Waktu");
        setDataKehadiranSelected(dataTemp);
        setQueryParams({
          page: 1,
          is_on_time: 1,
        });
      }
      setDataChecked({
        ...dataChecked,
        tepat_waktu: !dataChecked.tepat_waktu,
      });
    } else if (kehadiran == "WFH") {
      let dataTemp = dataKehadiranSelected;
      if (dataChecked.wfh == true) {
        //remove
        var filteredArray = dataKehadiranSelected.filter(function (e) {
          return e !== "WFH";
        });
        setDataKehadiranSelected(filteredArray);
        setQueryParams({
          page: 1,
          is_wfh: undefined,
        });
      } else {
        dataTemp.push("WFH");
        setDataKehadiranSelected(dataTemp);
        setQueryParams({
          page: 1,
          is_wfh: 1,
        });
      }
      setDataChecked({
        ...dataChecked,
        wfh: !dataChecked.wfh,
      });
    } else if (kehadiran == "WFO") {
      let dataTemp = dataKehadiranSelected;
      if (dataChecked.wfo == true) {
        //remove
        setQueryParams({
          page: 1,
          is_wfo: undefined,
        });
        var filteredArray = dataKehadiranSelected.filter(function (e) {
          return e !== "WFO";
        });
        setDataKehadiranSelected(filteredArray);
      } else {
        dataTemp.push("WFO");
        setDataKehadiranSelected(dataTemp);
        setQueryParams({
          page: 1,
          is_wfo: 1,
        });
      }
      setDataChecked({
        ...dataChecked,
        wfo: !dataChecked.wfo,
      });
    } else {
      let dataTemp = dataKehadiranSelected;
      if (dataChecked.belum_cek_in == true) {
        //remove
        var filteredArray = dataKehadiranSelected.filter(function (e) {
          return e !== "Belum Check In";
        });
        setDataKehadiranSelected(filteredArray);
        setQueryParams({
          page: 1,
          is_hadir: undefined,
        });
      } else {
        dataTemp.push("Belum Check In");
        setDataKehadiranSelected(dataTemp);
        setQueryParams({
          page: 1,
          is_hadir: 0,
        });
      }
      setDataChecked({
        ...dataChecked,
        belum_cek_in: !dataChecked.belum_cek_in,
      });
    }
  };

  const selectAllKehadiran = () => {
    let dataTemp = [];
    dataTemp.push("Tepat Waktu");
    dataTemp.push("Terlambat");
    dataTemp.push("WFH");
    dataTemp.push("WFO");
    dataTemp.push("Belum Check In");
    setDataKehadiranSelected(dataTemp);
    setDataChecked({
      ...dataChecked,
      terlambat: true,
      belum_cek_in: true,
      wfh: true,
      wfo: true,
      tepat_waktu: true,
    });
    setQueryParams({
      page: 1,
      is_hadir: 0,
      is_late: 1,
      is_on_time: 1,
      is_wfh: 1,
      is_wfo: 1,
    });
  };

  const clearAllKehadiran = () => {
    setDataKehadiranSelected([]);
    setDataChecked({
      ...dataChecked,
      terlambat: false,
      belum_cek_in: false,
      wfh: false,
      wfo: false,
      tepat_waktu: false,
    });
    setQueryParams({
      page: 1,
      is_hadir: undefined,
      is_late: undefined,
      is_on_time: undefined,
      is_wfh: undefined,
      is_wfo: undefined,
    });
  };

  const renderStatusKehadiran = () => {
    let kata = "";
    for (let a = 0; a < dataKehadiranSelected.length; a++) {
      if (a == dataKehadiranSelected.length - 1) {
        kata += dataKehadiranSelected[a];
      } else {
        kata += dataKehadiranSelected[a] + ",";
      }
    }
    if (kata.length > 23) {
      return kata.slice(0, 23) + "...";
    } else {
      return kata;
    }
  };

  const onChangeKeyword = (e) => {
    setQueryParams({
      page: 1,
      keyword: e.target.value === "" ? undefined : e.target.value,
    });
  };
  const onChangeKeywordRole = (e) => {
    setQueryParams({
      page: 1,
      keyword_role: e.target.value === "" ? undefined : e.target.value,
    });
  };
  const closeDetail = () => {
    setVisibleDetail(false);
  };
  return (
    <div className="mt-6 py-6 px-5 mx-5 md:mx-0 bg-white rounded-[5px] shadow-md ">
      <H1>Daftar Karyawan</H1>
      <div className="grid grid-cols-2 gap-2 mt-6 md:flex md:flex-row justify-between w-full items-center mb-4">
        {/* Search by keyword (kata kunci) */}
        <div className="md:w-11/12">
          <Input
            value={queryParams.keyword}
            style={{ width: `100%` }}
            placeholder="Cari Keyword.."
            onChange={onChangeKeyword}
            allowClear
          />
        </div>
        <div className="md:w-4/12">
          <Input
            value={queryParams.keyword_role}
            style={{ width: `100%` }}
            placeholder="Role Agen.."
            onChange={onChangeKeywordRole}
            allowClear
          />
        </div>
        <div className="md:w-3/12">
          {/* <Select
            allowClear
            showSearch
            mode="multiple"
            placeholder="Status Kehadiran"
            style={{ width: `100%` }}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option.children ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {dataStatusList?.map((status) => (
              <Select.Option key={status.id} value={status.id}>
                {status.name}
              </Select.Option>
            ))}
          </Select> */}
          <Popover
            content={
              <div className={"w-[320px]"}>
                <div className={"flex justify-between"}>
                  <p className={"text-xs leading-5 font-bold text-mono30"}>
                    Filter
                  </p>
                  {dataKehadiranSelected.length == 0 ? (
                    <p
                      onClick={() => selectAllKehadiran()}
                      className={
                        "text-xs leading-5 font-bold text-state1 hover:cursor-pointer"
                      }
                    >
                      Select All
                    </p>
                  ) : (
                    <p
                      onClick={() => clearAllKehadiran()}
                      className={
                        "text-xs leading-5 font-bold text-state1 hover:cursor-pointer"
                      }
                    >
                      {" "}
                      Clear({dataKehadiranSelected.length})
                    </p>
                  )}
                </div>
                <div className={"flex justify-between mt-3"}>
                  <p
                    className={
                      dataChecked.tepat_waktu
                        ? "text-sm leading-6 text-mono50 font-bold"
                        : "text-sm leading-6 text-mono50 "
                    }
                  >
                    Tepat Waktu
                  </p>
                  <Checkbox
                    checked={dataChecked.tepat_waktu}
                    onChange={() => handleCheckKehadiran("Tepat Waktu")}
                  />
                </div>
                <div className={"flex justify-between mt-3"}>
                  <p
                    className={
                      dataChecked.terlambat
                        ? "text-sm leading-6 text-mono50 font-bold"
                        : "text-sm leading-6 text-mono50 "
                    }
                  >
                    Terlambat
                  </p>
                  <Checkbox
                    checked={dataChecked.terlambat}
                    onChange={() => handleCheckKehadiran("Terlambat")}
                  />
                </div>
                <div className={"flex justify-between mt-3"}>
                  <p
                    className={
                      dataChecked.wfh
                        ? "text-sm leading-6 text-mono50 font-bold"
                        : "text-sm leading-6 text-mono50 "
                    }
                  >
                    WFH
                  </p>
                  <Checkbox
                    checked={dataChecked.wfh}
                    onChange={() => handleCheckKehadiran("WFH")}
                  />
                </div>
                <div className={"flex justify-between mt-3"}>
                  <p
                    className={
                      dataChecked.wfo
                        ? "text-sm leading-6 text-mono50 font-bold"
                        : "text-sm leading-6 text-mono50 "
                    }
                  >
                    WFO
                  </p>
                  <Checkbox
                    checked={dataChecked.wfo}
                    onChange={() => handleCheckKehadiran("WFO")}
                  />
                </div>
                <div className={"flex justify-between mt-3"}>
                  <p
                    className={
                      dataChecked.belum_cek_in
                        ? "text-sm leading-6 text-mono50 font-bold"
                        : "text-sm leading-6 text-mono50 "
                    }
                  >
                    Belum Check In
                  </p>
                  <Checkbox
                    checked={dataChecked.belum_cek_in}
                    onChange={() => handleCheckKehadiran("Belum Check In")}
                  />
                </div>
              </div>
            }
            trigger="click"
            placement="bottom"
            open={showFilter}
            onOpenChange={() => setShowFilter(!showFilter)}
          >
            <div
              className={
                "flex justify-between items-center px-4 border border-primary100 rounded-[5px] h-[32px] hover:cursor-pointer"
              }
            >
              <p className={"text-sm text-primary100 leading-4"}>
                {dataKehadiranSelected.length == 0
                  ? "Status Kehadiran"
                  : renderStatusKehadiran()}
              </p>
              {showFilter ? (
                <UpIconSvg size={24} color={"#35763B"} />
              ) : (
                <DownIconSvg size={24} color={"#35763B"} />
              )}
            </div>
          </Popover>
        </div>
        <div className={"md:w-2/12 "}>
          <ButtonSys
            type={`primary`}
            // onClick={onFilterProjects}
            // disabled={!isAllowedToGetProjects}
          >
            <div
              className={
                "flex flex-row space-x-2.5 w-full items-center hover:cursor-pointer"
              }
              onClick={() => fetchData()}
            >
              <SearchIconSvg size={15} color={`#ffffff`} />
              <p>Cari Agen</p>
            </div>
          </ButtonSys>
        </div>
      </div>
      <DetailAgenCard
        initProps={initProps}
        onClose={closeDetail}
        visible={visibleDetail}
        dataAgen={dataDetailAgen}
      />
      <Table
        className="tableTypeTask"
        pagination={{
          current: queryParams.page,
          pageSize: queryParams.rows,
          total: dataRawAttendances.total,
        }}
        scroll={{ x: 200 }}
        dataSource={dataAttendances}
        columns={columnsTable}
        loading={loadingTable}
        onRow={(record, rowIndex) => {
          return {
            // onMouseOver: (event) => {
            //   setrowstate(record.id);
            // },
            onClick: (event) => {
              setVisibleDetail(true);
              setDataDetailAgen({
                id: record.id,
                name: record.name,
                role: record.position,
                attendance_user: record.attendance_user,
              });
            },
          };
        }}
        rowClassName={(record, idx) => {
          return record.id === rowstate ? `cursor-pointer` : ``;
        }}
        onChange={(pagination, _, sorter) => {
          const sortTypePayload =
            sorter.order === "ascend"
              ? "asc"
              : sorter.order === "descend"
              ? "desc"
              : undefined;

          setQueryParams({
            sort_type: sortTypePayload,
            sort_by: sortTypePayload === undefined ? undefined : sorter.field,
            page: pagination.current,
            rows: pagination.pageSize,
          });
        }}
      ></Table>
    </div>
  );
}

export default EmployeeList;
