import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Input, Modal, Select, Spin, notification } from "antd";
import moment from "moment";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useQuery } from "react-query";

import { AccessControl } from "components/features/AccessControl";
import { AddNewFormButton } from "components/screen/resume";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  COMPANY_CLIENTS_GET,
  CONTRACTS_COUNT_GET,
  CONTRACTS_GET,
  CONTRACT_ADD,
  CONTRACT_DELETE,
  CONTRACT_GET,
  CONTRACT_UPDATE,
  RECRUITMENT_STATUSES_LIST_GET,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import { CompanyService } from "apis/company";
import { ContractService } from "apis/contract";

import ButtonSys from "../../../components/button";
import { SearchIconSvg } from "../../../components/icon";
import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
import { ModalHapus2 } from "../../../components/modal/modalCustom";
import { TableCustomContractList } from "../../../components/table/tableCustom";
import {
  convertDaysToString,
  createKeyPressHandler,
  momentFormatDate,
} from "../../../lib/helper";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import httpcookie from "cookie";

Chart.register(
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement
);

const ContractIndex = ({ dataProfile, sidemenu, initProps }) => {
  // 1. Init
  /**
   * Dependencies
   */
  const axiosClient = useAxiosClient();
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  const isAllowedToGetContracts = hasPermission(CONTRACTS_GET);
  const isAllowedToGetContract = hasPermission(CONTRACT_GET);
  const isAllowedToUpdateContract = hasPermission(CONTRACT_UPDATE);
  const isAllowedToDeleteContract = hasPermission(CONTRACT_DELETE);
  const isAllowedToAddContract = hasPermission(CONTRACT_ADD);
  const isAllowedToGetContractCount = hasPermission(CONTRACTS_COUNT_GET);

  const isAllowedToGetCompanyClients = hasPermission(COMPANY_CLIENTS_GET);

  const isAllowedToGetContractStatusList = hasPermission(
    RECRUITMENT_STATUSES_LIST_GET
  );

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    duration: withDefault(NumberParam, undefined),
    client_ids: withDefault(NumberParam, undefined),
    status_types: withDefault(StringParam, undefined),
  });

  const rt = useRouter();
  // Breadcrumb url
  const pathArr = rt.pathname.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 1);
  pathTitleArr.splice(1, 1, "Kontrak");

  const durationRangeList = [
    { name: "1 Bulan", value: 30 },
    { name: "3 Bulan", value: 90 },
    { name: "1 Tahun", value: 365 },
  ];

  const dataStatusList = [
    {
      id: "segeraberakhir",
      name: "Segera Berakhir",
      color: "#BF4A40",
    },
    {
      id: "draft",
      name: "Draft",
      color: "#808080",
    },
    {
      id: "berlangsung",
      name: "Berlangsung",
      color: "#00589F",
    },
    {
      id: "selesai",
      name: "Selesai",
      color: "#35763B",
    },
  ];

  // 2. Use state
  // 2.1. Table Contract
  // filter search & selected options
  const [searchingFilterContracts, setSearchingFilterContracts] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(undefined);
  const [selectedCompany, setSelectedCompany] = useState(undefined);
  const [selectedStatus, setSelectedStatus] = useState(undefined);

  // Modal Duration Range Filter
  const [modalDuration, setModalDuration] = useState(false);
  const [durationInput, setDurationInput] = useState(0);

  const [refresh, setRefresh] = useState(-1);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [dataRowClicked, setDataRowClicked] = useState({});

  // 3. UseEffect & UseQuery
  // 3.1. Get Contract Count
  const { data: dataCount, isLoading: loadingDataCount } = useQuery(
    [CONTRACTS_COUNT_GET, refresh],
    () =>
      ContractService.getCountContract(initProps, isAllowedToGetContractCount),
    {
      enabled: isAllowedToGetContractCount,
      select: (response) => response.data,
    }
  );

  // 3.2. Get Company Client List
  const { data: dataCompanyList, isLoading: loadingCompanyList } = useQuery(
    [COMPANY_CLIENTS_GET],
    () => CompanyService.getCompanyClientList(axiosClient, true),
    {
      enabled: isAllowedToGetCompanyClients,
      select: (response) => response.data.data,
    }
  );

  // 3.3. Get Contracts
  const { data: dataRawContracts, isLoading: loadingDataRawContracts } =
    useQuery(
      [CONTRACTS_GET, queryParams, searchingFilterContracts, refresh],
      () =>
        ContractService.getContracts(
          initProps,
          isAllowedToGetContracts,
          queryParams,
          searchingFilterContracts
        ),
      {
        enabled: isAllowedToGetContracts,
        select: (response) => response.data,
      }
    );

  // 4. Event
  // 4.1. Filter Table
  const onFilterRecruitments = () => {
    setQueryParams({
      duration: selectedDuration,
      client_ids: selectedCompany,
      status_types: selectedStatus,
    });
  };

  const { onKeyPressHandler } = createKeyPressHandler(
    onFilterRecruitments,
    "Enter"
  );

  // 4.2. Create Contract
  const onAddContract = useCallback(() => {
    handleAddContract();
  }, []);

  const handleAddContract = () => {
    // if (!isAllowedToAddContract) {
    //   permissionWarningNotification("Menambah", "Kontrak");
    //   return;
    // }
    setLoadingAdd(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addContract`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          setTimeout(() => {
            rt.push(
              `/admin/contracts/create?id=${response2.data?.id}&prevpath=add`
            );
            setLoadingAdd(false);
          }, 500);
        } else {
          notification.error({
            message: `Gagal menambahkan kontrak. ${response2.message}`,
            duration: 3,
          });
          setLoadingAdd(false);
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan kontrak. ${err.response}`,
          duration: 3,
        });
        setLoadingAdd(false);
      });
  };

  // 4.3. Delete Contract
  const handleDeleteContract = (id) => {
    if (!isAllowedToDeleteContract) {
      permissionWarningNotification("Menghapus", "Kontrak");
      return;
    }

    setLoadingDelete(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteContract?id=${id}`, {
      method: `DELETE`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setRefresh((prev) => prev + 1);
          setModalDelete(false);

          notification.success({
            message: response.message,
            duration: 3,
          });
        } else {
          notification.error({
            message: response.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus proyek. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoadingDelete(false));
  };

  // Kontrak Table's columns
  const columnContracts = [
    {
      title: "No",
      key: "number",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex justify-center">
              {dataRawContracts?.from + index}
            </div>
          ),
        };
      },
    },
    {
      title: "Nomor Kontrak",
      key: "code_number",
      dataIndex: "code_number",
      render: (text, record, index) => {
        return {
          children: <div className="xl:w-40">{text || "-"}</div>,
        };
      },
      sorter: isAllowedToGetContracts
        ? (a, b) => a.code_number?.toLowerCase() > b.code_number?.toLowerCase()
        : false,
    },
    {
      title: "Judul Kontrak",
      key: "title",
      dataIndex: "title",
      render: (text, record, index) => {
        return {
          children: <>{record.title || "-"}</>,
        };
      },
      sorter: isAllowedToGetContracts
        ? (a, b) => a.title?.toLowerCase().localeCompare(b.title?.toLowerCase())
        : false,
    },
    {
      title: "Nama Klien",
      key: "client_name",
      dataIndex: ["client", "name"],
      render: (text, record, index) => {
        return {
          children: <div>{text || "-"}</div>,
        };
      },
    },
    {
      title: "Tanggal Berlaku",
      key: "start_date",
      dataIndex: "start_date",
      render: (text, record, index) => {
        return {
          children: <div>{momentFormatDate(text)}</div>,
        };
      },
      sorter: isAllowedToGetContracts
        ? (a, b) => a?.start_date?.localeCompare(b?.start_date)
        : false,
    },
    {
      title: "Sisa Durasi",
      key: "duration",
      dataIndex: "duration",
      render: (duration, record, index) => {
        return {
          children: <>{convertDaysToString(duration)}</>,
        };
      },
      sorter: isAllowedToGetContracts
        ? (a, b) => a?.duration - b?.duration
        : false,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (text, record, index) => {
        return {
          children: (
            <>
              {record.is_posted ? (
                text == "segeraberakhir" ? (
                  <div
                    className="rounded-md py-1 px-4 hover:cursor-pointer text-center
                   text-white bg-warning whitespace-nowrap"
                  >
                    Segera Berakhir
                  </div>
                ) : text == "berlangsung" ? (
                  <div
                    className="rounded-md py-1 px-4 hover:cursor-pointer text-center
                    text-white bg-secondary100 whitespace-nowrap"
                  >
                    Berlangsung
                  </div>
                ) : (
                  <div
                    className="rounded-md py-1 px-4 hover:cursor-pointer text-center
                    text-white bg-primary100 whitespace-nowrap"
                  >
                    Selesai
                  </div>
                )
              ) : (
                <div
                  className="rounded-md py-1 px-4 hover:cursor-pointer text-center 
                   bg-mono50 text-white"
                >
                  Draft
                </div>
              )}
            </>
          ),
        };
      },
      sorter: isAllowedToGetContracts
        ? (a, b) => {
            const dataStatusListIds = dataStatusList?.map(
              (status) => status?.id
            );
            const indexA = dataStatusListIds?.indexOf(a?.status);
            const indexB = dataStatusListIds?.indexOf(b?.status);
            return indexA - indexB;
          }
        : false,
    },
    dataRawContracts?.data?.some((item) => !item.is_posted)
      ? {
          title: "Aksi",
          key: "action_button",
          dataIndex: "action_button",
          render: (text, record, index) => {
            return {
              children: (
                <>
                  {!record.is_posted && (
                    <div className="flex flex-col md:flex-row gap-2 items-center">
                      <ButtonSys
                        type={"default"}
                        color={"secondary100"}
                        disabled={!isAllowedToUpdateContract}
                        onClick={(event) => {
                          event.stopPropagation();
                          rt.push(`/admin/contracts/create?id=${record.id}`);
                        }}
                      >
                        <EditOutlined />
                      </ButtonSys>
                      <ButtonSys
                        type={"default"}
                        color={"danger"}
                        disabled={!isAllowedToDeleteContract}
                        onClick={(event) => {
                          event.stopPropagation();
                          setDataRowClicked(record);
                          setModalDelete(true);
                        }}
                      >
                        <DeleteOutlined />
                      </ButtonSys>
                    </div>
                  )}
                </>
              ),
            };
          },
          sorter: isAllowedToGetContracts
            ? (a, b) =>
                a.role?.name
                  .toLowerCase()
                  .localeCompare(b.role?.name.toLowerCase())
            : false,
        }
      : {},
  ];

  if (isAccessControlPending) {
    return null;
  }

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      st={st}
      pathArr={pathArr}
      pathTitleArr={pathTitleArr}
    >
      <div className="grid grid-cols-1 gap-6" id="mainWrapper">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:px-5 gap-6">
          <div
            className="flex flex-row items-center w-full 
						justify-between px-6 py-2 shadow-md rounded-md bg-white
						divide-x divide-gray-300"
          >
            <div className="flex flex-row items-center justify-between w-full">
              <h4 className="font-semibold lg:mig-heading--4">Kontrak Aktif</h4>
              <Spin spinning={loadingDataCount}>
                <p className="text-4xl lg:text-5xl text-primary100">
                  {dataCount?.total}
                </p>
              </Spin>
            </div>
          </div>
          <AddNewFormButton
            title="Buat Kontrak"
            subtitle={moment().format("dddd, DD MMMM YYYY")}
            onButtonClicked={onAddContract}
            disabled={!isAllowedToAddContract || loadingAdd}
          />
        </div>
        <div className="md:px-5">
          {/* Table Kontrak */}
          <div className="flex flex-col shadow-md rounded-md bg-white p-5 mb-6">
            <div className="flex flex-col gap-4 md:flex-row md:justify-between w-full md:items-center mb-4">
              <h4 className="mig-heading--4 w-full md:w-2/12">Kontrak</h4>
              {/* Start: Search criteria */}

              {/* Filter by duration (dropdown) */}
              <div className="w-full md:w-2/12">
                <Select
                  defaultValue={queryParams.duration}
                  allowClear
                  name={`role`}
                  placeholder="Rentang Durasi"
                  style={{ width: `100%` }}
                  onChange={(value) => {
                    setQueryParams({ duration: value });
                    setSelectedDuration(value);
                  }}
                  dropdownRender={(options) => (
                    <>
                      {options}
                      <p
                        onClick={() => setModalDuration(true)}
                        className={`flex justify-center py-1 px-2 text-center 
                        rounded hover:bg-primary100 hover:text-white hover:cursor-pointer`}
                      >
                        Custom Range
                      </p>
                    </>
                  )}
                >
                  {durationRangeList?.map((item, idx) => (
                    <Select.Option key={idx + 1} value={item.value}>
                      <p
                        className={`px-2 text-center rounded  
                        ${
                          selectedDuration === item.value &&
                          "bg-primary100 text-white"
                        }`}
                      >
                        {item.name}
                      </p>
                    </Select.Option>
                  ))}
                  {durationInput && (
                    <Select.Option key={5} value={durationInput * 30}>
                      <p
                        className={`px-2 text-center rounded
                      ${
                        selectedDuration === durationInput * 30 &&
                        "bg-primary100 text-white"
                      }`}
                      >
                        {durationInput} Bulan (Custom)
                      </p>
                    </Select.Option>
                  )}
                </Select>
              </div>

              {/* Filter by company client */}
              <div className="w-full md:w-2/12">
                <Select
                  defaultValue={queryParams.client_ids}
                  allowClear
                  name={`client`}
                  disabled={!isAllowedToGetCompanyClients}
                  placeholder="Semua Klien"
                  style={{ width: `100%` }}
                  onChange={(value) => {
                    setQueryParams({ client_ids: value });
                    setSelectedCompany(value);
                  }}
                >
                  {dataCompanyList?.map((client) => (
                    <Select.Option key={client.id} value={client.id}>
                      {client.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>

              {/* Search by status (dropdown) */}
              <div className="w-full md:w-2/12">
                <Select
                  defaultValue={queryParams.status_types}
                  allowClear
                  name={`status`}
                  disabled={!isAllowedToGetContractStatusList}
                  placeholder="Semua Status"
                  style={{ width: `100%` }}
                  onChange={(value) => {
                    setQueryParams({ status_types: value });
                    setSelectedStatus(value);
                  }}
                  optionLabelProp="children"
                >
                  {dataStatusList?.map((status) => (
                    <Select.Option key={status.id} value={status.id}>
                      <div className="flex items-center">
                        <div
                          className="rounded-full w-4 h-4 p-2 mr-2"
                          style={{ backgroundColor: `${status.color}` }}
                        />
                        <p className="truncate">{status.name}</p>
                      </div>
                    </Select.Option>
                  ))}
                </Select>
              </div>

              {/* Search by keyword (kata kunci) */}
              <div className="w-full md:w-4/12">
                <Input
                  defaultValue={searchingFilterContracts}
                  style={{ width: `100%` }}
                  placeholder="Cari.."
                  allowClear
                  onChange={(e) => {
                    setTimeout(
                      () => setSearchingFilterContracts(e.target.value),
                      500
                    );
                  }}
                  onKeyPress={onKeyPressHandler}
                  disabled={!isAllowedToGetContracts}
                />
              </div>

              {/* End: Search criteria */}

              <div className="flex justify-end">
                <ButtonSys
                  type={`primary`}
                  onClick={onFilterRecruitments}
                  disabled={!isAllowedToGetContracts}
                >
                  <div className="flex flex-row space-x-2.5 w-full items-center">
                    <SearchIconSvg size={15} color={`#ffffff`} />
                    <p>Cari</p>
                  </div>
                </ButtonSys>
              </div>
            </div>

            <div>
              <TableCustomContractList
                rt={rt}
                dataSource={dataRawContracts?.data}
                columns={columnContracts}
                loading={loadingDataRawContracts}
                total={dataRawContracts?.total}
                queryParams={queryParams}
                setQueryParams={setQueryParams}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal Duration Range */}
      <AccessControl hasPermission={CONTRACTS_GET}>
        <Modal
          title={"Masukkan Jumlah Bulan"}
          visible={modalDuration}
          onCancel={() => setModalDuration(false)}
          maskClosable={false}
          footer={
            <div className="flex space-x-2 justify-end items-center">
              <button
                onClick={() => setModalDuration(false)}
                className="bg-transparent text-mono50 py-2 px-6 hover:text-mono80"
              >
                Batal
              </button>
              <ButtonSys
                type={"primary"}
                onClick={() => setModalDuration(false)}
              >
                <p>Tambah</p>
              </ButtonSys>
            </div>
          }
          // loading={}
        >
          <div className="space-y-2">
            <p>Jumlah Bulan</p>
            <Input
              type="number"
              min={0}
              placeholder="Masukkan jumlah bulan"
              value={durationInput}
              onChange={(e) => setDurationInput(e.target.value)}
            />
          </div>
        </Modal>
      </AccessControl>

      {/* Modal Delete Contract */}
      <AccessControl hasPermission={CONTRACT_DELETE}>
        <ModalHapus2
          title={`Peringatan`}
          visible={modalDelete}
          onvisible={setModalDelete}
          onOk={() => handleDeleteContract(dataRowClicked?.id)}
          onCancel={() => {
            setModalDelete(false);
          }}
          itemName={"kontrak"}
          loading={loadingDelete}
        >
          <p className="mb-4">
            Apakah Anda yakin ingin melanjutkan penghapusan kontrak{" "}
            <strong>{dataRowClicked?.code_number}</strong>?
          </p>
        </ModalHapus2>
      </AccessControl>
    </Layout>
  );
};

export async function getServerSideProps({ req, res }) {
  let initProps = {};
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
      method: "GET",
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
      sidemenu: "contract-list",
    },
  };
}

export default ContractIndex;
