import { LoadingOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Modal, Spin, Table, notification } from "antd";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import Link from "next/link";
import QueryString from "qs";
import React, { useEffect, useState } from "react";

import DrawerAddAttendanceCode from "../../drawer/companies/chargecode/drawerAddAttendanceCode";
import DrawerEditAttendanceCode from "../../drawer/companies/chargecode/drawerEditAttendanceCode";
import {
  CheckBoldSvg,
  CheckIconSvg,
  CloseIconSvg,
  EditTablerIconSvg,
  PlusIconSvg,
  TrashIconSvg,
  WarningIconSvg,
} from "../../icon";

const ModalAttendanceCode = ({
  visible,
  onClose,
  initProps,
  idChargeCode,
  setIdChargeCode,
}) => {
  const [statusActive, setStatusActive] = useState("1");
  const [datatable, setdatatable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowstate, setrowstate] = useState(0);
  const [attendanceName, setAttendanceName] = useState(null);
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
  });
  const [showDrawerAttendance, setShowDrawerAttendance] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [isRefresh, setIsRefresh] = useState(-1);
  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [active, setActive] = useState({
    id: null,
    name: null,
  });
  const [showEditDrawerAttendance, setShowEditDrawerAttendance] =
    useState(false);
  const [dataAttendanceCode, setDataAttendanceCode] = useState(null);
  // const [dataRawWorkDay, setDataRawWorkDay] = useState({
  //   current_page: "",
  //   data: [],
  //   first_page_url: "",
  //   from: 1,
  //   last_page: 10,
  //   last_page_url: "",
  //   next_page_url: "",
  //   path: "",
  //   per_page: null,
  //   prev_page_url: null,
  //   to: null,
  //   total: null,
  // });

  const columnChargeCode = [
    {
      title: "No",
      key: "num",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: <div className="flex justify-center">{index + 1}</div>,
        };
      },
    },
    {
      title: "Attendance Code Name",
      key: "name",
      dataIndex: "name",
      sorter: true,
      render: (text, record, index) => {
        return {
          children: (
            <div className="xl:w-40">{record.name ? record.name : ""}</div>
          ),
        };
      },
    },
    {
      title: "Description",
      key: "description",
      width: 200,
      //   sorter: true,
      dataIndex: "description",
      render: (text, record, index) => {
        return {
          children: <>{text}</>,
        };
      },
    },
    {
      title: "Hari Masuk",
      key: "hari_masuk",
      dataIndex: "hari_masuk",
      render: (text, record, index) => {
        return {
          children:
            text == 1 ? (
              <div className="flex gap-3">
                <div className="flex justify-center items-center bg-[#35763B1A] w-6 h-6 rounded-[100px]">
                  <CheckBoldSvg color={"#35763B"} size={18} />
                </div>
                <p className="text-sm/6 font-inter text-mono30">1</p>
              </div>
            ) : (
              <div className="flex gap-3">
                <div className="flex justify-center items-center bg-[#BF4A401A] w-6 h-6 rounded-[100px]">
                  <CloseIconSvg color={"#BF4A40"} size={18} />
                </div>
                <p className="text-sm/6 font-inter text-mono30">0</p>
              </div>
            ),
        };
      },
    },
    {
      title: "Penggajian",
      key: "hari_penggajian",
      dataIndex: "hari_penggajian",
      render: (text, record, index) => {
        return {
          children:
            text == 1 ? (
              <div className="flex gap-3">
                <div className="flex justify-center items-center bg-[#35763B1A] w-6 h-6 rounded-[100px]">
                  <CheckBoldSvg color={"#35763B"} size={18} />
                </div>
                <p className="text-sm/6 font-inter text-mono30">1</p>
              </div>
            ) : (
              <div className="flex gap-3">
                <div className="flex justify-center items-center bg-[#BF4A401A] w-6 h-6 rounded-[100px]">
                  <CloseIconSvg color={"#BF4A40"} size={18} />
                </div>
                <p className="text-sm/6 font-inter text-mono30">0</p>
              </div>
            ),
        };
      },
    },
    {
      title: "Dapat Ditagih",
      key: "dapat_ditagih",
      dataIndex: "dapat_ditagih",
      render: (text, record, index) => {
        return {
          children:
            text == 1 ? (
              <div className="flex gap-3">
                <div className="flex justify-center items-center bg-[#35763B1A] w-6 h-6 rounded-[100px]">
                  <CheckBoldSvg color={"#35763B"} size={18} />
                </div>
                <p className="text-sm/6 font-inter text-mono30">1</p>
              </div>
            ) : (
              <div className="flex gap-3">
                <div className="flex justify-center items-center bg-[#BF4A401A] w-6 h-6 rounded-[100px]">
                  <CloseIconSvg color={"#BF4A40"} size={18} />
                </div>
                <p className="text-sm/6 font-inter text-mono30">0</p>
              </div>
            ),
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
                className={"hover:cursor-pointer"}
                onClick={() => handleEdit(record)}
              >
                <EditTablerIconSvg size={20} color={"#808080"} />
              </div>
              <div
                className={"hover:cursor-pointer"}
                onClick={() => handleModalDelete(record)}
              >
                <TrashIconSvg size={20} color={"#BF4A40"} />
              </div>
            </div>
          ),
        };
      },
    },
  ];

  useEffect(() => {
    // if (isRefresh == -1) {
    //   return;
    // }
    if (idChargeCode) {
      getDataModal();
    }
  }, [idChargeCode]);

  const handleEdit = (record) => {
    setShowEditDrawerAttendance(true);
    setDataAttendanceCode(record);
  };

  useEffect(() => {
    // if (isRefresh == -1) {
    //   return;
    // }
    if (idChargeCode) {
      getDataModal();
    }
  }, [isRefresh]);

  const cancelDelete = () => {
    setModalDelete(false);
  };

  const getDataModal = () => {
    console.log("get data modal ");
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getChargeCode?id=${idChargeCode}`,
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
          // setDataRawWorkDay(res2.data);
          setdatatable(res2.data.attendance_codes);
          setAttendanceName(res2.data.name);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoading(false));
  };

  const handleCancel = () => {
    onClose();
    setdatatable([]);
    setIdChargeCode(null);
    setAttendanceName(null);
  };

  const handleModalDelete = (record) => {
    setActive({
      ...active,
      name: record.name,
      id: record.id,
    });
    setModalDelete(true);
  };

  const handleDeleteAttendance = () => {
    setLoadingDelete(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteAttendanceCode`, {
      method: "DELETE",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(active?.id),
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setLoadingDelete(false);
          setModalDelete(false);
          setIsRefresh(1);
          notification["success"]({
            message: `${active?.name} Attendance Code successfully deleted`,
            duration: 3,
          });
        } else if (!res2.success) {
          setLoadingDelete(false);
          setModalDelete(false);
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };

  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      className="modalCore"
      title={
        <p className={"text-sm/6 font-bold font-inter text-mono30"}>
          {attendanceName ? attendanceName : "-"} Attendance Code
        </p>
      }
      footer={null}
      width={950}
    >
      <div className="flex flex-col gap-3 ">
        <Table
          dataSource={datatable}
          columns={columnChargeCode}
          rowKey={(record) => record.id}
          loading={loading}
          scroll={{ x: 200 }}
          pagination={{
            current: queryParams.page,
            pageSize: queryParams.rows,
            total: 10,
            showSizeChanger: true,
          }}
          onChange={(pagination, filters, sorter, extra) => {
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
          onRow={(record, rowIndex) => {
            return {
              //   onMouseOver: () => {
              //     setrowstate(record.id);
              //   },
              // onClick: () => {
              //   !isBulk && setDrawerShown(true);
              //   tempIdClicked.current = record.id;
              //   setTriggerRowClicked((prev) => prev + 1);
              // },
            };
          }}
          rowClassName={(record, idx) => {
            return `${record.id === rowstate && `cursor-pointer`}
                                }`;
          }}
        />
        {console.log("id charge code ", idChargeCode)}
        <div className={"flex justify-center mt-4"}>
          <div
            onClick={() => setShowDrawerAttendance(true)}
            className={
              "hover:cursor-pointer flex gap-1.5 py-2 px-4 rounded-[5px] bg-[#35763B]"
            }
          >
            <PlusCircleOutlined style={{ width: 16, color: "white" }} />
            <p className={"text-white text-sm/4 font-roboto font-medium"}>
              Add Charge Code
            </p>
          </div>
        </div>
      </div>
      <DrawerAddAttendanceCode
        visible={showDrawerAttendance}
        onvisible={setShowDrawerAttendance}
        initProps={initProps}
        isAllowedToAddCompany={true}
        setLoadingCreate={setLoadingCreate}
        loadingCreate={loadingCreate}
        idChargeCode={idChargeCode}
        setIsRefresh={setIsRefresh}
      />
      <DrawerEditAttendanceCode
        visible={showEditDrawerAttendance}
        onvisible={setShowEditDrawerAttendance}
        initProps={initProps}
        isAllowedToAddCompany={true}
        setLoadingCreate={setLoadingCreate}
        loadingCreate={loadingCreate}
        idChargeCode={idChargeCode}
        setIsRefresh={setIsRefresh}
        dataAttendanceCode={dataAttendanceCode}
      />
      <Modal
        closeIcon={<CloseIconSvg size={20} color={"#808080"} />}
        title={
          <div className={"flex gap-2"}>
            <WarningIconSvg />
            <p
              className={
                "font-medium text-sm leading-6 text-[#4D4D4D] font-inter"
              }
            >
              Delete Attendance Code?
            </p>
          </div>
        }
        open={modalDelete}
        onCancel={() => {
          // setmodaldelete(false);
          cancelDelete();
        }}
        footer={
          <div className={"flex gap-4 justify-end"}>
            <div
              onClick={() => cancelDelete()}
              className={
                "bg-white border border-solid border-[#808080] py-2 px-4 rounded-md hover:cursor-pointer"
              }
            >
              <p
                className={
                  "text-sm leading-4 text-[#808080] font-medium font-roboto"
                }
              >
                Cancel
              </p>
            </div>
            <div
              onClick={() => handleDeleteAttendance()}
              className={
                "bg-[#BF4A40] flex items-center gap-1.5 py-2 px-4 rounded-md hover:cursor-pointer"
              }
            >
              {loadingDelete ? (
                <Spin
                  spinning={loadingDelete}
                  indicator={<LoadingOutlined />}
                  size={"default"}
                />
              ) : (
                <TrashIconSvg color={"white"} size={16} />
              )}
              <p className="text-white text-sm leading-4 font-medium font-roboto">
                Delete
              </p>
            </div>
          </div>
        }
        // onOk={handleDelete}

        maskClosable={true}
        style={{ top: `3rem` }}
        width={440}
        destroyOnClose={true}
      >
        <p className={"text-[#4D4D4D] "}>
          Are you sure you want to delete attendance code name{" "}
          <span className={"font-bold"}>{active?.name}</span>?
        </p>
      </Modal>
    </Modal>
  );
};

export default ModalAttendanceCode;
