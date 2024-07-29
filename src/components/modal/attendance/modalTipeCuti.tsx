import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  Checkbox,
  Collapse,
  DatePicker,
  Drawer,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  Switch,
  Table,
  Tag,
  notification,
} from "antd";
import { SorterResult } from "antd/lib/table/interface";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import ButtonSys from "components/button";
import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  LEAVE_TYPE_ADD,
  LEAVE_TYPE_DELETE,
  LEAVE_TYPE_UPDATE,
} from "lib/features";
import {
  notificationError,
  notificationSuccess,
  permissionWarningNotification,
} from "lib/helper";

import PengajuanCutiIcon from "assets/vectors/pengajuan-cuti.svg";

import DrawerTipeCuti from "../../drawer/attendance/drawerTipeCuti";
import {
  AlertCircleIconSvg,
  CheckBoldSvg,
  CheckIconSvg,
  CirclePlusIconSvg,
  CloseIconSvg,
  CloseOverlay,
  DeleteTablerIconSvg,
  EditIconSvg,
  EditTablerIconSvg,
  UserIconSvg,
  UsercircleIconSvg,
} from "../../icon";
import { ModalDelete } from "../modalConfirmation";

const ModalTipeCuti = ({ visible, onClose, initProps }) => {
  const { hasPermission } = useAccessControl();
  const isAllowedToAddLeaveType = hasPermission(LEAVE_TYPE_ADD);
  const isAllowedToUpdateLeaveType = hasPermission(LEAVE_TYPE_UPDATE);
  const isAllowedToDeleteLeaveType = hasPermission(LEAVE_TYPE_DELETE);

  const [statusActive, setStatusActive] = useState("1");
  const [dataTipeCutis, setDataTipeCutis] = useState([]);
  const [dataDefault, setDataDefault] = useState(null);
  const [rowstate, setrowstate] = useState(0);
  const [showDrawerCuti, setShowDrawerTipeCuti] = useState(false);
  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
  });
  const [dataRawTipeCuti, setDataRawTipeCuti] = useState({
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
  const [loadingTipeCuti, setLoadingTipeCuti] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const columnsTipeCuti = [
    {
      title: "No",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: <>{index + 1}</>,
        };
      },
    },
    {
      title: "Nama",
      dataIndex: "name",
      render: (text, record, index) => {
        return {
          children: <>{record.name}</>,
        };
      },
    },
    {
      title: "Cuti Tahunan",
      dataIndex: "is_tahunan",
      render: (text, record, index) => {
        return {
          children: <p>{record.is_tahunan ? "Mengurangi" : "Tidak"}</p>,
        };
      },
    },
    {
      title: "File Pendukung",
      dataIndex: "is_document_required",
      render: (text, record, index) => {
        return {
          children: <p>{record.is_document_required ? "Wajib" : "Opsional"}</p>,
        };
      },
    },
    {
      title: "Deskripsi",
      dataIndex: "description",
      render: (text, record, index) => {
        return {
          children: <p>{record.description}</p>,
        };
      },
    },
    {
      title: "Aksi",
      key: "action_button",
      dataIndex: "action_button",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex flex-col md:flex-row gap-2 items-center">
              <div
                className={"items-center hover:cursor-pointer"}
                onClick={() => editData(record)}
              >
                <EditTablerIconSvg size={16} color={"#4D4D4D"} />
              </div>
              <div
                className={"items-center hover:cursor-pointer"}
                onClick={() => handleDelete(record)}
              >
                <DeleteTablerIconSvg size={16} color={"#BF4A40"} />
              </div>
            </div>
          ),
        };
      },
    },
  ];

  const editData = (record) => {
    setDataDefault(record);
    setShowDrawerTipeCuti(true);
  };

  const closeDrawer = () => {
    setDataDefault(null);
    setShowDrawerTipeCuti(false);
  };

  const handleDelete = (record) => {
    setDataDefault(record);
    setShowModalConfirmDelete(true);
  };

  const closeModalDelete = () => {
    setDataDefault(null);
    setShowModalConfirmDelete(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoadingTipeCuti(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getLeaveTypes?page=${queryParams.page}&rows=${queryParams.rows}&sort_by=${queryParams.sort_by}&sort_type=${queryParams.sort_type}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        // setDataRawTipeCuti(res2.data); // table-related data source
        setDataTipeCutis(res2.data); // table main data source
        setLoadingTipeCuti(false);
      });
  };

  const onDeleteType = (id) => {
    if (!isAllowedToDeleteLeaveType) {
      permissionWarningNotification("Menghapus", "Leave Type");
      return;
    }

    setLoadingDelete(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteLeaveType `, {
      method: "DELETE",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          closeModalDelete();
          fetchData();
          notificationSuccess({
            message: res2.message,
            duration: 3,
          });
        } else {
          notificationError({
            message: res2.message,
            duration: 3,
          });
        }
      })
      .finally(() => setLoadingDelete(false));
  };

  return (
    <Modal
      width={600}
      footer={null}
      onCancel={onClose}
      open={visible}
      title={
        <p className={"text-[#4D4D4D] text-[14px] leading-6 font-bold"}>
          Daftar Tipe Cuti
        </p>
      }
      closeIcon={<CloseOverlay size={24} />}
    >
      {/* tabel */}
      <Table
        className="tableTask"
        dataSource={dataTipeCutis}
        columns={columnsTipeCuti}
        loading={loadingTipeCuti}
        scroll={{ x: "max-content" }}
        pagination={{
          current: queryParams.page,
          pageSize: queryParams.rows,
          total: dataRawTipeCuti.total,
          showSizeChanger: true,
        }}
        rowClassName={(record, idx) => {
          return `${record.id === rowstate && `cursor-pointer`} ${
            record.status === 1 && `bg-bgBackdropOverdue`
          }`;
        }}
        onChange={(pagination, filters, sorter: SorterResult<any>, extra) => {
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
      />
      <div className={"flex justify-center"}>
        <ButtonSys
          onClick={() => setShowDrawerTipeCuti(true)}
          disabled={!isAllowedToAddLeaveType}
        >
          <div className={"flex justify-center items-center gap-2 "}>
            <CirclePlusIconSvg />
            <p>Add Leave Type</p>
          </div>
        </ButtonSys>
      </div>
      <DrawerTipeCuti
        visible={showDrawerCuti}
        onClose={closeDrawer}
        fetchData={fetchData}
        initProps={initProps}
        dataDefault={dataDefault}
      />

      <AccessControl hasPermission={LEAVE_TYPE_DELETE}>
        <ModalDelete
          visible={showModalConfirmDelete}
          itemName="Leave Type"
          loading={loadingDelete}
          disabled={!isAllowedToDeleteLeaveType}
          onOk={() => onDeleteType(dataDefault?.id)}
          onCancel={closeModalDelete}
        >
          <p>
            Are you sure you want to delete <strong>{dataDefault?.name}</strong>
            ? This action cannot be undone.
          </p>
        </ModalDelete>
      </AccessControl>
    </Modal>
  );
};

export default ModalTipeCuti;
