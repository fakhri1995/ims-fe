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
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { LEAVE_TYPE_ADD } from "lib/features";

import PengajuanCutiIcon from "assets/vectors/pengajuan-cuti.svg";

import DrawerTipeCuti from "../../drawer/attendance/drawerTipeCuti";
import {
  AlertCircleIconSvg,
  CheckBoldSvg,
  CheckIconSvg,
  CloseIconSvg,
  CloseOverlay,
  DeleteTablerIconSvg,
  EditIconSvg,
  EditTablerIconSvg,
  UserIconSvg,
  UsercircleIconSvg,
} from "../../icon";

const ModalTipeCuti = ({ visible, onClose, initProps }) => {
  const { hasPermission } = useAccessControl();
  const isAllowedToAddLeaveType = hasPermission(LEAVE_TYPE_ADD);
  const [statusActive, setStatusActive] = useState("1");
  const [dataTipeCutis, setDataTipeCutis] = useState([]);
  const [dataDefault, setDataDefault] = useState(null);
  const [rowstate, setrowstate] = useState(0);
  const [showDrawerCuti, setShowDrawerTipeCuti] = useState(false);
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
                onClick={() => editData(record.id, record)}
              >
                <EditTablerIconSvg size={16} color={"#4D4D4D"} />
              </div>
              <div
                className={"items-center hover:cursor-pointer"}
                onClick={() => editData(record.id)}
              >
                <DeleteTablerIconSvg size={16} color={"#BF4A40"} />
              </div>
            </div>
          ),
        };
      },
    },
  ];

  const editData = (id, record) => {
    setDataDefault(record);
    setShowDrawerTipeCuti(true);
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
      />
      <div className={"flex justify-center mt-5"}>
        {isAllowedToAddLeaveType && (
          <div
            onClick={() => setShowDrawerTipeCuti(true)}
            className={
              "flex justify-center px-6 py-2 bg-white border border-solid border-[#35763B] rounded-[5px] hover:cursor-pointer"
            }
          >
            <p className="text-[#35763B] text-xs font-bold leading-5">
              Tambah Tipe Cuti
            </p>
          </div>
        )}
      </div>
      <DrawerTipeCuti
        visible={showDrawerCuti}
        onClose={() => setShowDrawerTipeCuti(false)}
        fetchData={fetchData}
        initProps={initProps}
        dataDefault={dataDefault}
      />
    </Modal>
  );
};

export default ModalTipeCuti;
