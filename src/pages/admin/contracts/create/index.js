import {
  ArrowRightOutlined,
  CloseOutlined,
  DeleteOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { DatePicker, Form, Input, Select, Tabs, notification } from "antd";
import parse from "html-react-parser";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Html from "react-pdf-html";
import { useQuery } from "react-query";

import { AccessControl } from "components/features/AccessControl";

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

import ButtonSys from "../../../../components/button";
import {
  ArrowNarrowRightIconSvg,
  PlusIconSvg,
} from "../../../../components/icon";
import LayoutDashboard from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import ContractExtrasForm from "../../../../components/screen/contract/create/ContractExtrasForm";
import ContractServiceForm from "../../../../components/screen/contract/create/ContractServiceForm";
import {
  FILE,
  LIST,
  TEXT,
} from "../../../../components/screen/contract/detail/ContractInfoSection";
import {
  objectToFormData,
  permissionWarningNotification,
} from "../../../../lib/helper";
import httpcookie from "cookie";

const ContractCreateIndex = ({ initProps, dataProfile, sidemenu }) => {
  /**
   * Dependencies
   */

  const axiosClient = useAxiosClient();
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  const isAllowedToGetContract = hasPermission(CONTRACT_GET);
  const isAllowedToUpdateContract = hasPermission(CONTRACT_UPDATE);
  const isAllowedToDeleteContract = hasPermission(CONTRACT_DELETE);
  const isAllowedToGetCompanyClients = hasPermission(COMPANY_CLIENTS_GET);
  const isAllowedToGetRequesters = hasPermission(REQUESTERS_GET);

  //INIT
  const rt = useRouter();
  const { id: contractId, prevpath } = rt.query;

  // Breadcrumb url
  const pathArr = rt.asPath.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 3);
  pathTitleArr.splice(1, 2, "Kontrak", "Tambah Kontrak");

  // 1. Use State
  const [dataContractUpdate, setDataContractUpdate] = useState({
    contract_number: "",
    title: "",
    client_id: 0,
    requester_id: 0,
    initial_date: "",
    start_date: "",
    end_date: "",
    is_posted: 0,
    extras: [], //{type:0, name:"", value:""}
  });

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [disablePublish, setDisablePublish] = useState(false);

  // 2. Use Query & Use Effect
  // 2.1. Get Contract
  const {
    data: dataContract,
    isLoading: loadingDataContract,
    isFetched: isFetchedContract,
  } = useQuery(
    [CONTRACT_GET],
    () =>
      ContractService.getContract(
        initProps,
        isAllowedToGetContract,
        contractId
      ),
    {
      enabled: isAllowedToGetContract,
      select: (response) => response.data,
    }
  );

  useEffect(() => {
    if (isFetchedContract) {
      setDataContractUpdate(dataContract);
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
      { data: dataContractUpdate.contract_number, name: "No Kontrak" },
      { data: dataContractUpdate.title, name: "Judul Kontrak" },
      { data: dataContractUpdate.client_id, name: "Klien" },
      { data: dataContractUpdate.requester_id, name: "Requester" },
      { data: dataContractUpdate.initial_date, name: "Tanggal Dibuat" },
      { data: dataContractUpdate.start_date, name: "Tanggal Berlaku" },
      { data: dataContractUpdate.end_date, name: "Tanggal Selesai" },
    ];

    if (!requiredContractFields.every((field) => Boolean(field.data))) {
      setDisablePublish(true);
    } else {
      setDisablePublish(false);
    }
  }, [dataContractUpdate]);

  // 3. Handler
  const onChangeInput = (e) => {
    setDataContractUpdate((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeSelect = (value, name) => {
    setDataContractUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save Employee Contract
  const handleUpdateContract = (contractData, isPosted) => {
    if (!isAllowedToUpdateContract) {
      permissionWarningNotification("Mengubah", "Kontrak");
      return;
    }

    /** Setup form data to be sent in API */
    let payload = { ...contractData, is_posted: isPosted };

    // Mapping extras list to required format in API updateContract form-data
    if (contractData?.extras?.length > 0) {
      let extrasObjectList = contractData?.extras?.map((extra, idx) => {
        let obj = {};
        obj[`extras[${idx}][type]`] = extra?.type;
        obj[`extras[${idx}][name]`] = extra?.name;
        obj[`extras[${idx}][value]`] = extra?.value;
        return obj;
      });

      let allExtrasObject = {};
      for (let extraObject of extrasObjectList) {
        Object.assign(allExtrasObject, extraObject);
      }

      payload = {
        ...payload,
        ...allExtrasObject,
      };
    }

    // convert object to form data
    const payloadFormData = objectToFormData(payload);

    setLoadingUpdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateContract`, {
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
            message: `Kontrak berhasil diubah.`,
            duration: 3,
          });
          if (isPosted) {
            setTimeout(() => {
              rt.push(`/admin/contracts/${dataContract?.id}`);
            }, 1000);
          } else {
            setTimeout(() => {
              rt.push(`/admin/contracts`);
            }, 1000);
          }
        } else {
          notification.error({
            message: `Gagal mengubah kontrak. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal mengubah kontrak. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingUpdate(false);
      });
  };

  const handleDeleteContract = () => {
    if (!isAllowedToDeleteContract) {
      permissionWarningNotification("Menghapus", "Kontrak");
      return;
    }

    setLoadingDelete(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteContract?id=${dataContract?.id}`,
      {
        method: `DELETE`,
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          rt.push("/admin/contracts");
          setTimeout(() => {
            notification.success({
              message: response.message,
              duration: 3,
            });
          }, 1000);
        } else {
          notification.error({
            message: response.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus kontrak. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoadingDelete(false));
  };

  if (isAccessControlPending) {
    return null;
  }

  // console.log({ dataContractUpdate });

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
            <h4 className="mig-heading--4">Form Tambah Kontrak</h4>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 items-end md:items-center">
              <ButtonSys
                color={"danger"}
                type={"default"}
                onClick={() => {
                  if (prevpath == "add") {
                    handleDeleteContract();
                  } else {
                    rt.push("/admin/contracts");
                  }
                }}
              >
                <div className="flex flex-row space-x-2">
                  {prevpath == "add" ? <DeleteOutlined /> : <CloseOutlined />}
                  <p>Batalkan</p>
                </div>
              </ButtonSys>
              <ButtonSys
                type={"default"}
                className="flex flex-row"
                onClick={() => handleUpdateContract(dataContractUpdate, 0)}
                disabled={
                  !isAllowedToUpdateContract ||
                  (!dataContractUpdate.contract_number &&
                    !dataContractUpdate.title)
                }
              >
                <div className="flex flex-row space-x-2">
                  <ProfileOutlined />
                  <p className="ml-2">Simpan Draft</p>
                </div>
              </ButtonSys>
              <ButtonSys
                type={"primary"}
                onClick={() => handleUpdateContract(dataContractUpdate, 1)}
                disabled={!isAllowedToUpdateContract || disablePublish}
              >
                <div className="flex flex-row space-x-2">
                  <p>Simpan Kontrak</p>
                  <ArrowNarrowRightIconSvg color={"white"} size={16} />
                </div>
              </ButtonSys>
            </div>
          </div>

          {/* Form Body */}
          <Form.Item
            label="No Kontrak"
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
                value={dataContractUpdate?.contract_number}
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
                value={dataContractUpdate?.title}
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
                  dataContractUpdate?.client_id &&
                  Number(dataContractUpdate?.client_id)
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
                  dataContractUpdate?.requester_id &&
                  Number(dataContractUpdate?.requester_id)
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
                  moment(dataContractUpdate?.initial_date).isValid()
                    ? moment(dataContractUpdate?.initial_date)
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
                  moment(dataContractUpdate?.start_date).isValid()
                    ? moment(dataContractUpdate?.start_date)
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
                  moment(dataContractUpdate?.end_date).isValid()
                    ? moment(dataContractUpdate?.end_date)
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

          {/* Komponen Tambahan Kontrak  */}
          <h4 className="mig-heading--4 col-span-6 mb-6">
            Komponen Tambahan Kontrak
          </h4>

          <div className="col-span-6">
            <div className="col-span-6 mb-6">
              <ButtonSys
                type={"dashed"}
                onClick={() => {
                  setDataContractUpdate((prev) => ({
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
            {dataContractUpdate?.extras?.map((item, idx) => (
              <ContractExtrasForm
                key={item?.key || idx}
                type={item?.type}
                name={item?.name}
                value={item?.value}
                idx={idx}
                dataContractUpdate={dataContractUpdate}
                setDataContractUpdate={setDataContractUpdate}
              />
            ))}
          </div>

          <hr className="col-span-6 mb-6" />

          <Tabs className="col-span-6">
            <Tabs.TabPane tab="Service">
              <ContractServiceForm
                initProps={initProps}
                dataContractUpdate={dataContractUpdate}
                setDataContractUpdate={setDataContractUpdate}
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

export default ContractCreateIndex;
