import {
  CloseOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  notification,
} from "antd";
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
  AlignJustifiedIconSvg,
  CheckIconSvg,
  CheckboxIconSvg,
  CopyIconSvg,
  FileTextIconSvg,
  PlusIconSvg,
  SquareCheckIconSvg,
  TrashIconSvg,
  XIconSvg,
} from "../../../../components/icon";
import LayoutDashboard from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import ContractExtrasForm from "../../../../components/screen/contract/create/ContractExtrasForm";
import {
  FILE,
  LIST,
  TEXT,
} from "../../../../components/screen/contract/detail/ContractInfoSection";
import EmployeeProfileForm from "../../../../components/screen/employee/create/profile";
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
  // const handleUpdateContract = (contractData) => {
  //   if (!isAllowedToUpdateContract) {
  //     permissionWarningNotification("Menyimpan", "Kontrak");
  //     return;
  //   }

  //   /** Setup form data to be sent in API */
  //   let payload = contractData;

  //   // Mapping file list to required format in API updateEmployeeContract form-data
  //   if (contractData?.extras?.length) {
  //     let fileObjectList = contractData?.extras?.map(
  //       (file, idx) => file?.originFileObj
  //     );

  //     fileObjectList?.forEach((file, idx) => {
  //       payload[`extras[${idx}]`] = file;
  //     });
  //   }

  //   // Mapping removed file list to required format
  //   if (contractData?.removed_file_ids?.length) {
  //     contractData?.removed_file_ids?.forEach((removedFileId, idx) => {
  //       payload[`contract_file_delete_ids[${idx}]`] = removedFileId;
  //     });
  //   }

  //   // Mapping salaries list to required format
  //   if (contractData?.salaries?.length > 0) {
  //     let benefitObjectList = contractData?.salaries?.map((benefit, idx) => {
  //       let obj = {};
  //       obj[`salaries[${idx}][employee_salary_column_id]`] =
  //         benefit?.employee_salary_column_id;
  //       obj[`salaries[${idx}][value]`] = benefit?.value;
  //       obj[`salaries[${idx}][is_amount_for_bpjs]`] =
  //         benefit?.is_amount_for_bpjs;
  //       return obj;
  //     });

  //     let allBenefitObject = {};
  //     for (let benefitObject of benefitObjectList) {
  //       Object.assign(allBenefitObject, benefitObject);
  //     }

  //     payload = {
  //       ...payload,
  //       ...allBenefitObject,
  //     };
  //   }

  //   // convert object to form data
  //   const payloadFormData = objectToFormData(payload);

  //   setLoadingUpdate(true);
  //   fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateEmployeeContract`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: JSON.parse(initProps),
  //     },
  //     body: payloadFormData,
  //   })
  //     .then((response) => response.json())
  //     .then((response2) => {
  //       if (response2.success) {
  //         notification.success({
  //           message: `Kontrak karyawan berhasil ditambahkan.`,
  //           duration: 3,
  //         });
  //       } else {
  //         notification.error({
  //           message: `Gagal menyimpan kontrak karyawan. ${response2.message}`,
  //           duration: 3,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       notification.error({
  //         message: `Gagal menyimpan kontrak karyawan. ${err.response}`,
  //         duration: 3,
  //       });
  //     })
  //     .finally(() => {
  //       setLoadingUpdate(false);
  //     });
  // };

  if (isAccessControlPending) {
    return null;
  }

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
        <div className="flex flex-row items-center justify-between mb-7">
          <h4 className="mig-heading--4">Form Tambah Kontrak</h4>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 items-end md:items-center">
            <ButtonSys
              color={"danger"}
              type={"default"}
              onClick={() => rt.back()}
            >
              <div className="flex flex-row space-x-2">
                <CloseOutlined />
                <p>Batalkan</p>
              </div>
            </ButtonSys>
            <ButtonSys
              type={"primary"}
              // onClick={handleSaveEmployee}
              // disabled={!isAllowedToUpdateContract || disablePublish}
            >
              <div className="flex flex-row space-x-2">
                <CheckIconSvg color={"white"} size={16} />
                <p>Simpan</p>
              </div>
            </ButtonSys>
          </div>
        </div>

        {/* Form Body */}
        <Form layout="vertical" className="md:grid md:grid-cols-6 md:gap-x-6">
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
                value={dataContractUpdate.contract_number}
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
                value={dataContractUpdate.title}
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
          <div className="mb-6 col-span-2">
            <p className="mb-2">Tanggal Dibuat</p>
            <DatePicker
              allowClear
              allowEmpty
              value={
                moment(dataContractUpdate.initial_date).isValid()
                  ? moment(dataContractUpdate.initial_date)
                  : null
              }
              placeholder={"Pilih tanggal dibuat"}
              style={{ width: `100%` }}
              onChange={(dates, datestrings) => {
                onChangeSelect(datestrings, "initial_date");
              }}
            />
          </div>

          {/* Tanggal Berlaku */}
          <div className="mb-6 col-span-2">
            <p className="mb-2">Tanggal Berlaku</p>
            <DatePicker
              allowClear
              allowEmpty
              value={
                moment(dataContractUpdate.start_date).isValid()
                  ? moment(dataContractUpdate.start_date)
                  : null
              }
              placeholder={"Pilih tanggal berlaku"}
              style={{ width: `100%` }}
              onChange={(dates, datestrings) => {
                onChangeSelect(datestrings, "start_date");
              }}
            />
          </div>

          {/* Tanggal Selesai */}
          <div className="mb-6 col-span-2">
            <p className="mb-2">Tanggal Selesai</p>
            <DatePicker
              allowClear
              allowEmpty
              value={
                moment(dataContractUpdate.end_date).isValid()
                  ? moment(dataContractUpdate.end_date)
                  : null
              }
              placeholder={"Pilih tanggal selesai"}
              style={{ width: `100%` }}
              onChange={(dates, datestrings) => {
                onChangeSelect(datestrings, "end_date");
              }}
            />
          </div>

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
