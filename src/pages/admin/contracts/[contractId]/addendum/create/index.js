import {
  CloseOutlined,
  DeleteOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { DatePicker, Form, Input, Select, Tabs, notification } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  COMPANY_CLIENTS_GET,
  CONTRACT_DELETE,
  CONTRACT_GET,
  CONTRACT_UPDATE,
  REQUESTERS_GET,
} from "lib/features";

import { CompanyService } from "apis/company";
import { ContractService } from "apis/contract";
import { RequesterService } from "apis/user";

import ButtonSys from "../../../../../../components/button";
import {
  ArrowNarrowRightIconSvg,
  PlusIconSvg,
} from "../../../../../../components/icon";
import LayoutDashboard from "../../../../../../components/layout-dashboard";
import st from "../../../../../../components/layout-dashboard.module.css";
import ContractExtrasForm from "../../../../../../components/screen/contract/create/ContractExtrasForm";
import ContractServiceForm from "../../../../../../components/screen/contract/create/ContractServiceForm";
import {
  FILE,
  LIST,
  TEXT,
} from "../../../../../../components/screen/contract/detail/ContractInfoSection";
import {
  objectToFormDataNew,
  permissionWarningNotification,
} from "../../../../../../lib/helper";
import httpcookie from "cookie";

const ContractAddendumCreateIndex = ({ initProps, dataProfile, sidemenu }) => {
  /**
   * Dependencies
   */

  const axiosClient = useAxiosClient();
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  const isAllowedToGetContract = hasPermission(CONTRACT_GET);
  const isAllowedToAddAddendum = hasPermission(CONTRACT_UPDATE);
  const isAllowedToDeleteContract = hasPermission(CONTRACT_DELETE);
  const isAllowedToGetCompanyClients = hasPermission(COMPANY_CLIENTS_GET);
  const isAllowedToGetRequesters = hasPermission(REQUESTERS_GET);

  //INIT
  const rt = useRouter();
  const { contractId } = rt.query;

  // Breadcrumb url
  const pathArr = rt.asPath.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 4, "Kontrak", "Detail Kontrak", "Tambah Adendum");

  // 1. Use State
  const [dataAddendum, setDataAddendum] = useState({
    contract_number: "",
    title: "",
    client_id: 0,
    requester_id: 0,
    initial_date: "",
    start_date: "",
    end_date: "",
    is_posted: 0,
    extras: [], //{key:"", type:0, name:"", value:""}
    services: [],
  });

  const [loadingAdd, setLoadingAdd] = useState(false);
  const [disableSave, setDisableSave] = useState(false);

  // 2. Use Query & Use Effect
  // 2.1. Get Contract
  const {
    data: dataContract,
    isLoading: loadingDataContract,
    isFetched: isFetchedContract,
  } = useQuery(
    [CONTRACT_GET, contractId],
    () =>
      ContractService.getContract(
        initProps,
        isAllowedToGetContract,
        contractId
      ),
    {
      enabled: isAllowedToGetContract,
      refetchOnMount: true,
      select: (response) => response.data,
    }
  );

  useEffect(() => {
    if (isFetchedContract) {
      setDataAddendum(dataContract);
    }
  }, [dataContract]);

  // 2.2. Get Company Client
  const { data: dataCompanyList, isLoading: loadingCompanyList } = useQuery(
    [COMPANY_CLIENTS_GET],
    () => CompanyService.getCompanyClientList(axiosClient, true),
    {
      enabled: isAllowedToGetCompanyClients,
      select: (response) => response.data.data,
    }
  );

  // 2.3. Get Requester List
  const { data: dataRequesterList, isLoading: loadingRequesterList } = useQuery(
    [REQUESTERS_GET],
    () => RequesterService.getRequesterList(axiosClient, true),
    {
      enabled: isAllowedToGetRequesters,
      select: (response) => response.data.data.data,
    }
  );

  // 2.4. Disable "Simpan Kontrak" button if any required field is empty
  useEffect(() => {
    const requiredContractFields = [
      { data: dataAddendum?.contract_number, name: "No Kontrak" },
      { data: dataAddendum?.title, name: "Judul Kontrak" },
      { data: dataAddendum?.client_id, name: "Klien" },
      { data: dataAddendum?.requester_id, name: "Requester" },
      { data: dataAddendum?.initial_date, name: "Tanggal Dibuat" },
      { data: dataAddendum?.start_date, name: "Tanggal Berlaku" },
      { data: dataAddendum?.end_date, name: "Tanggal Selesai" },
    ];

    if (!requiredContractFields.every((field) => Boolean(field.data))) {
      setDisableSave(true);
    } else {
      setDisableSave(false);
    }
  }, [dataAddendum]);

  // 3. Handler
  const onChangeInput = (e) => {
    setDataAddendum((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeSelect = (value, name) => {
    setDataAddendum((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save Employee Contract
  const handleAddAddendum = (data) => {
    if (!isAllowedToAddAddendum) {
      permissionWarningNotification("Menambah", "Adendum");
      return;
    }

    /** Setup form data to be sent in API */

    // let payload = { ...data };

    // convert object to form data
    const payloadFormData = objectToFormDataNew(data);

    setLoadingAdd(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addContractAddendum`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
      },
      body: payloadFormData,
    })
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          notification.success({
            message: `Adendum berhasil ditambah.`,
            duration: 3,
          });
          setTimeout(() => {
            rt.push(`/admin/contracts/${dataContract?.id}`);
          }, 1000);
        } else {
          notification.error({
            message: `Gagal menambah adendum. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambah adendum. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingAdd(false);
      });
  };

  if (isAccessControlPending) {
    return null;
  }

  // console.log({ dataAddendum });

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
      pathTitleArr={pathTitleArr}
    >
      <div className="grid grid-cols-1 shadow-lg rounded-md bg-white p-3 md:py-7 md:px-6">
        {/* Form Header */}
        <Form layout="vertical" className="md:grid md:grid-cols-6 md:gap-x-6">
          <div className="col-span-6 flex flex-row items-center justify-between mb-7">
            <h4 className="mig-heading--4">Form Tambah Addendum Kontrak</h4>
            <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6 items-end lg:items-center">
              <ButtonSys
                color={"danger"}
                type={"default"}
                onClick={() => rt.back()}
              >
                <div className="flex flex-row space-x-2">
                  <DeleteOutlined />
                  <p>Batalkan</p>
                </div>
              </ButtonSys>

              <ButtonSys
                type={"primary"}
                onClick={() => handleAddAddendum(dataAddendum)}
                disabled={!isAllowedToAddAddendum || disableSave}
              >
                <div className="flex flex-row space-x-2">
                  <p>Simpan Adendum</p>
                  <ArrowNarrowRightIconSvg color={"white"} size={16} />
                </div>
              </ButtonSys>
            </div>
          </div>

          {/* Form Body */}
          <Form.Item
            label="No Adendum Kontrak"
            name={"contract_number"}
            rules={[
              {
                required: true,
                message: "Nomor Kontrak wajib diisi",
              },
            ]}
            className="col-span-3"
          >
            <div>
              <Input
                value={dataAddendum?.contract_number}
                name={"contract_number"}
                onChange={onChangeInput}
                placeholder="Masukkan nomor kontrak"
              />
            </div>
          </Form.Item>
          <Form.Item
            label="Judul Kontrak"
            name={"title"}
            rules={[
              {
                required: true,
                message: "Judul Kontrak wajib diisi",
              },
            ]}
            className="col-span-3"
          >
            <div>
              <Input
                value={dataAddendum?.title}
                name={"title"}
                onChange={onChangeInput}
                placeholder="Masukkan judul kontrak"
              />
            </div>
          </Form.Item>
          <Form.Item
            label="Klien"
            name={"client_id"}
            rules={[
              {
                required: true,
                message: "Klien wajib diisi",
              },
            ]}
            className="col-span-3"
          >
            <>
              <Select
                showSearch
                value={
                  dataAddendum?.client_id
                    ? Number(dataAddendum?.client_id)
                    : null
                }
                onChange={(value) => onChangeSelect(value, "client_id")}
                placeholder="Pilih klien"
                disabled={!isAllowedToGetCompanyClients}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.children ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                <>
                  {dataCompanyList?.map((option) => (
                    <Select.Option key={option.id} value={option.id}>
                      {option.name}
                    </Select.Option>
                  ))}
                </>
              </Select>
            </>
          </Form.Item>
          <Form.Item
            label="Requester"
            name={"requester_id"}
            rules={[
              {
                required: true,
                message: "Requester wajib diisi",
              },
            ]}
            className="col-span-3"
          >
            <>
              <Select
                showSearch
                value={
                  dataAddendum?.requester_id
                    ? Number(dataAddendum?.requester_id)
                    : null
                }
                onChange={(value) => onChangeSelect(value, "requester_id")}
                placeholder="Pilih requester"
                disabled={!isAllowedToGetRequesters}
                // TODO: refetch api on search, when filter in API is done
                // onSearch={(value) => {
                //   onSearchUsers(value, setDataStaffs);
                // }}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.children ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                <>
                  {dataRequesterList?.map((option) => (
                    <Select.Option key={option.id} value={option.id}>
                      {option.name}
                    </Select.Option>
                  ))}
                </>
              </Select>
            </>
          </Form.Item>

          {/* Tanggal Dibuat */}
          <Form.Item
            label="Tanggal Dibuat"
            name={"initial_date"}
            rules={[
              {
                required: true,
                message: "Tanggal dibuat wajib diisi",
              },
            ]}
            className="mb-6 col-span-2"
          >
            <div>
              <DatePicker
                allowClear
                allowEmpty
                value={
                  moment(dataAddendum?.initial_date).isValid()
                    ? moment(dataAddendum?.initial_date)
                    : null
                }
                placeholder={"Pilih tanggal dibuat"}
                style={{ width: `100%` }}
                onChange={(dates, datestrings) => {
                  onChangeSelect(datestrings, "initial_date");
                }}
              />
            </div>
          </Form.Item>

          {/* Tanggal Berlaku */}
          <Form.Item
            label="Tanggal Berlaku"
            name={"start_date"}
            rules={[
              {
                required: true,
                message: "Tanggal dibuat wajib diisi",
              },
            ]}
            className="mb-6 col-span-2"
          >
            <div>
              <DatePicker
                allowClear
                allowEmpty
                value={
                  moment(dataAddendum?.start_date).isValid()
                    ? moment(dataAddendum?.start_date)
                    : null
                }
                placeholder={"Pilih tanggal berlaku"}
                style={{ width: `100%` }}
                onChange={(dates, datestrings) => {
                  onChangeSelect(datestrings, "start_date");
                }}
              />
            </div>
          </Form.Item>

          {/* Tanggal Selesai */}
          <Form.Item
            label="Tanggal Selesai"
            name={"end_date"}
            rules={[
              {
                required: true,
                message: "Tanggal selesai wajib diisi",
              },
            ]}
            className="mb-6 col-span-2"
          >
            <div>
              <DatePicker
                allowClear
                allowEmpty
                value={
                  moment(dataAddendum?.end_date).isValid()
                    ? moment(dataAddendum?.end_date)
                    : null
                }
                placeholder={"Pilih tanggal selesai"}
                style={{ width: `100%` }}
                onChange={(dates, datestrings) => {
                  onChangeSelect(datestrings, "end_date");
                }}
              />
            </div>
          </Form.Item>

          <hr className="col-span-6 mb-6" />

          {/* Konfigurasi Kontrak  */}
          <h4 className="mig-heading--4 col-span-6 mb-6">
            Konfigurasi Kontrak
          </h4>

          <div className="col-span-6">
            <div className="col-span-6 mb-6">
              <ButtonSys
                type={"dashed"}
                onClick={() => {
                  setDataAddendum((prev) => ({
                    ...prev,
                    extras: [
                      ...prev.extras,
                      { type: TEXT, name: "", value: "" },
                    ],
                  }));
                }}
              >
                <div className="flex items-center space-x-2">
                  <PlusIconSvg color={"#35763B"} size={16} />
                  <p className="text-primary100 hover:text-primary75">
                    Tambah Isian Baru
                  </p>
                </div>
              </ButtonSys>
            </div>

            {/* Form dinamis */}
            {dataAddendum?.extras?.map((item, idx) =>
              !item?.is_deleted ? (
                <ContractExtrasForm
                  key={item?.key || idx}
                  type={item?.type}
                  name={item?.name}
                  value={item?.value}
                  idx={idx}
                  dataAddendum={dataAddendum}
                  setDataAddendum={setDataAddendum}
                />
              ) : null
            )}
          </div>

          <hr className="col-span-6 mb-6" />

          <Tabs className="col-span-6">
            <Tabs.TabPane tab="Service">
              <ContractServiceForm
                initProps={initProps}
                dataAddendum={dataAddendum}
                setDataAddendum={setDataAddendum}
                loading={loadingDataContract}
              />
            </Tabs.TabPane>
          </Tabs>
        </Form>
      </div>
    </LayoutDashboard>
  );
};

export async function getServerSideProps({ req, res, query }) {
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
      sidemenu: "contract-list",
    },
  };
}

export default ContractAddendumCreateIndex;
