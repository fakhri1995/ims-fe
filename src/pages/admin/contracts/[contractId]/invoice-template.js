import {
  ArrowLeftOutlined,
  FileTextOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { DatePicker, Select, notification } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";

import Layout from "components/layout-dashboard-management";
import st from "components/layout-dashboard-management.module.css";

import { useAccessControl } from "contexts/access-control";

import {
  COMPANY_MAIN_BANKS_GET,
  CONTRACT_INVOICE_ADD,
  CONTRACT_TEMPLATE_GET,
  CONTRACT_TEMPLATE_UPDATE,
} from "lib/features";

import { ContractService } from "apis/contract";

import ButtonSys from "../../../../components/button";
import {
  ArrowLeftIconSvg,
  CalendarEventIconSvg,
  FileTextIconSvg,
  PlusIconSvg,
} from "../../../../components/icon";
import ModalContractInfo from "../../../../components/modal/contracts/modalContractInfo";
import ModalInvoiceCreate from "../../../../components/modal/contracts/modalInvoiceCreate";
import {
  FILE,
  LIST,
} from "../../../../components/screen/contract/detail/ContractInfoSection";
import InvoiceTemplateItemSection from "../../../../components/screen/contract/invoice/InvoiceTemplateItemSection";
import {
  convertDaysToString,
  generateStaticAssetUrl,
  getFileName,
  momentFormatDate,
  permissionWarningNotification,
} from "../../../../lib/helper";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  LineElement,
  LinearScale,
  PointElement,
  TooltipChart,
} from "chart.js";
import httpcookie from "cookie";

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement
);

export const contractInfoString = {
  code_number: "No. Kontrak",
  title: "Judul Kontrak",
  client: "Klien",
  requester: "Requester",
  initial_date: "Tanggal Dibuat",
  start_date: "Tanggal Berlaku",
  end_date: "Tanggal Selesai",
  duration: "Durasi Kontrak",
  extras: "Komponen Tambahan",
};

const ContractInvoiceTemplateIndex = ({
  dataProfile,
  sidemenu,
  initProps,
  contractId,
  contractHistoryId,
}) => {
  // 1. Init
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetContractTemplate = hasPermission(CONTRACT_TEMPLATE_GET);
  const isAllowedToUpdateInvoiceTemplate = hasPermission(
    CONTRACT_TEMPLATE_UPDATE
  );
  const isAllowedToAddInvoice = hasPermission(CONTRACT_INVOICE_ADD);
  const isAllowedToGetMainBanks = hasPermission(COMPANY_MAIN_BANKS_GET);

  const rt = useRouter();
  // Breadcrumb url
  const pathArr = rt.asPath.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 1);
  pathTitleArr.splice(1, 3, "Kontrak", "Detail Kontrak", "Template Invoice");

  // 2. useState
  const [refresh, setRefresh] = useState(-1);
  const [period, setPeriod] = useState(-1);
  const [dataInvoice, setDataInvoice] = useState([]);
  const [dataServiceTemplateNames, setDataServiceTemplateNames] = useState([]);
  const [dataServices, setDataServices] = useState([]);

  const [selectedBank, setSelectedBank] = useState(-1);
  const [bankAccountList, setBankAccountList] = useState([]);

  // Modal
  const [modalInvoice, setModalInvoice] = useState(false);
  const [modalContractInfo, setModalContractInfo] = useState(false);

  // Misc.
  const [loadingSave, setLoadingSave] = useState(false);

  // 3. Use Effect & Use Query
  // 3.1. Get contract template detail
  const { data: dataContractTemplate, isLoading: loadingDataContractTemplate } =
    useQuery(
      [CONTRACT_TEMPLATE_GET, refresh, contractId, contractHistoryId],
      () =>
        ContractService.getContractTemplate(
          initProps,
          isAllowedToGetContractTemplate,
          contractId,
          contractHistoryId
        ),
      {
        enabled: isAllowedToGetContractTemplate,
        refetchOnMount: true,
        select: (response) => response.data,
      }
    );

  // 3.2. Display invoice detail
  useEffect(() => {
    if (dataContractTemplate?.invoice_template) {
      const currentInvoiceTemplate = [];
      for (let item of dataContractTemplate?.invoice_template?.details) {
        if (!item?.includes("extras")) {
          let tempValue = dataContractTemplate[item];

          if (["initial_date", "start_date", "end_date"].includes(item)) {
            tempValue = momentFormatDate(tempValue);
          }

          if (item == "duration") {
            tempValue = convertDaysToString(tempValue);
          }

          if (item == "requester") {
            tempValue = dataContractTemplate?.requester?.name;
          }

          if (item == "client") {
            tempValue = dataContractTemplate?.client?.name;
          }

          currentInvoiceTemplate.push({
            name: item,
            title: contractInfoString[item],
            value: tempValue,
          });
        } else {
          for (let extra of dataContractTemplate?.extras) {
            if (`extras.${extra?.key}` == item) {
              const dataExtra = {
                name: `extras.${extra?.key}`,
                title: extra?.name,
                value: extra?.value,
                type: extra?.type,
              };

              currentInvoiceTemplate.push(dataExtra);
            }
          }
        }
      }
      setDataInvoice(currentInvoiceTemplate);
    }
  }, [dataContractTemplate?.invoice_template]);

  // 3.3. Fill state for item table
  useEffect(() => {
    setDataServiceTemplateNames(
      dataContractTemplate?.service_template?.details
    );
    setDataServices(dataContractTemplate?.services);
  }, [dataContractTemplate?.service_template, dataContractTemplate?.services]);

  // 3.4. Get main bank account list
  useEffect(() => {
    if (!isAllowedToGetMainBanks) {
      permissionWarningNotification("Mendapatkan", "Detail Company");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getMainBanks`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setBankAccountList(res2?.data);
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
      });
  }, [isAllowedToGetMainBanks]);

  // 3.5. Set period value from dataContractTemplate
  useEffect(() => {
    setPeriod(dataContractTemplate?.invoice_template?.invoice_period);
    setSelectedBank(dataContractTemplate?.invoice_template?.bank_id);
  }, [dataContractTemplate?.invoice_template]);

  // 4. Event
  const handleSaveInvoiceTemplate = () => {
    if (!isAllowedToUpdateInvoiceTemplate) {
      permissionWarningNotification("Mengubah", "Template Invoice Kontrak");
      return;
    }

    const payload = {
      contract_history_id: Number(contractHistoryId),
      contract_id: Number(contractId),
      invoice_period: period,
      invoice_template: dataInvoice.map((item) => item.name),
      service_template: dataServiceTemplateNames,
      service_template_values: dataServiceTemplateNames?.length
        ? dataServices?.map((item) => item?.service_template_value)
        : [],
      bank_id: selectedBank,
    };

    setLoadingSave(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateContractTemplate`, {
      method: `PUT`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          notification.success({
            message: response.message,
            duration: 3,
          });
          setRefresh((prev) => prev + 1);
        } else {
          notification.error({
            message: response.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal mengubah template invoice kontrak. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoadingSave(false));
  };

  // console.log({ dataServices });
  // console.log({ dataInvoice });
  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      st={st}
      pathArr={pathArr}
      pathTitleArr={pathTitleArr}
    >
      <div
        className="grid grid-cols-1 gap-4 lg:gap-6 px-4 md:px-5 "
        id="mainWrapper"
      >
        <section
          className="grid grid-cols-1  
          gap-6 shadow-md rounded-md bg-white p-4 lg:p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between">
            <button
              className="flex space-x-2 items-center bg-transparent"
              onClick={() => rt.back()}
            >
              <ArrowLeftIconSvg size={24} />
              <h4 className="mig-heading--4">Data Template Invoice</h4>
            </button>
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 lg:items-center">
              <ButtonSys
                type={"default"}
                onClick={() => setModalInvoice(true)}
                disabled={
                  !isAllowedToAddInvoice ||
                  !dataContractTemplate?.invoice_template
                }
              >
                <div className="flex space-x-2 items-center">
                  <FileTextOutlined rev={""} />
                  <p>Buat Invoice</p>
                </div>
              </ButtonSys>
              <ButtonSys
                onClick={handleSaveInvoiceTemplate}
                type={"primary"}
                disabled={
                  !isAllowedToUpdateInvoiceTemplate || !period || !selectedBank
                }
              >
                <p>Simpan Template Invoice</p>
              </ButtonSys>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="mig-caption--bold">Klien</p>
              <p>{dataContractTemplate?.client?.name}</p>
            </div>
            <div className="space-y-2">
              <p className="mig-caption--bold">
                <span className="text-[#ff4d4f]">*</span> Periode Penagihan
              </p>
              <DatePicker
                allowEmpty
                format={"DD"}
                showToday={false}
                picker="date"
                placeholder="Pilih Periode"
                bordered={false}
                className="invoiceTemplateDPInput p-0"
                dropdownClassName="invoiceTemplateDP"
                value={
                  period
                    ? moment(
                        `${moment().format("YYYY")}-${moment().format(
                          "MM"
                        )}-${period}`
                      )
                    : null
                }
                onChange={(date, datestring) => {
                  setPeriod(datestring);
                }}
                renderExtraFooter={() => <div />}
                suffixIcon={
                  <CalendarEventIconSvg color={"#2F80ED"} size={20} />
                }
              />
            </div>
            <div className="space-y-2">
              <p className="mig-caption--bold">
                <span className="text-[#ff4d4f]">*</span> Nomor Rekening
              </p>
              {/* TODO: adjust if API is done */}
              <Select
                value={selectedBank || null}
                disabled={!isAllowedToGetMainBanks}
                placeholder="Pilih Rekening"
                onChange={(value) => {
                  setSelectedBank(value);
                }}
                className="w-1/2 themedSelector"
              >
                {bankAccountList?.map((item) => (
                  <Select.Option key={item?.id} value={item?.id}>
                    {item?.name} - {item?.account_number}
                  </Select.Option>
                ))}
              </Select>
            </div>
            {dataInvoice?.map((item) => (
              <div key={item?.title} className="space-y-2">
                <p className="mig-caption--bold">{item?.title}</p>
                {item?.type === FILE ? (
                  <div className="flex space-x-2 items-center">
                    <FileTextIconSvg size={24} color={"#35763B"} />
                    <a
                      href={generateStaticAssetUrl(item?.value?.link)}
                      target="_blank"
                      className="text-primary100 truncate"
                    >
                      {getFileName(item?.value?.link)}
                    </a>
                  </div>
                ) : item?.type === LIST ? (
                  <ul>
                    {item?.value?.map((val, idx) => (
                      <li key={idx}>{val}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{item?.value}</p>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={() => setModalContractInfo(true)}
            className="flex space-x-1 items-center bg-transparent hover:opacity-75"
          >
            <PlusIconSvg size={18} color={"#35763B"} />
            <p className="mig-caption--bold text-primary100">
              Tambah Informasi Lainnya
            </p>
          </button>
        </section>

        {/* Detail Kontrak & Daftar Service */}
        <section className="shadow-md rounded-md bg-white p-6 mb-4 gap-6">
          <InvoiceTemplateItemSection
            dataServiceTemplateNames={dataServiceTemplateNames}
            setDataServiceTemplateNames={setDataServiceTemplateNames}
            dataServices={dataServices}
            setDataServices={setDataServices}
            loading={loadingDataContractTemplate}
          />
        </section>
      </div>

      <ModalInvoiceCreate
        initProps={initProps}
        visible={modalInvoice}
        onvisible={setModalInvoice}
        dataContract={dataContractTemplate}
      />

      <ModalContractInfo
        visible={modalContractInfo}
        onvisible={setModalContractInfo}
        dataContract={dataContractTemplate}
        dataInvoice={dataInvoice}
        setDataInvoice={setDataInvoice}
      />
    </Layout>
  );
};

export async function getServerSideProps({ req, res, params, query }) {
  const { ver: contractHistoryId, contractId } = query;

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
      contractId,
      contractHistoryId,
    },
  };
}

export default ContractInvoiceTemplateIndex;
