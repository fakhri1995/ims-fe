import { DownloadOutlined, FileTextOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  notification,
} from "antd";
import debounce from "lodash.debounce";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useQuery } from "react-query";

import Layout from "components/layout-dashboard";
import st from "components/layout-dashboard.module.css";

import { useAccessControl } from "contexts/access-control";

import { CONTRACT_TEMPLATE_GET, CONTRACT_TEMPLATE_UPDATE } from "lib/features";

import ButtonSys from "../../../../components/button";
import {
  ArrowLeftIconSvg,
  CalendarEventIconSvg,
  DownloadIcon2Svg,
  FileTextIconSvg,
  PlusIconSvg,
} from "../../../../components/icon";
import ModalContractInfo from "../../../../components/modal/contracts/modalContractInfo";
import {
  FILE,
  LIST,
} from "../../../../components/screen/contract/detail/ContractInfoSection";
import ContractInvoiceItemSection from "../../../../components/screen/contract/invoice/ContractInvoiceItemSection";
import {
  convertDaysToString,
  generateStaticAssetUrl,
  getFileName,
  momentFormatDate,
  permissionWarningNotification,
} from "../../../../lib/helper";
import httpcookie from "cookie";

export const contractInfoString = {
  contract_number: "No. Kontrak",
  title: "Judul Kontrak",
  client: "Klien",
  requester: "Requester",
  initial_date: "Tanggal Dibuat",
  start_date: "Tanggal Berlaku",
  end_date: "Tanggal Selesai",
  duration: "Durasi Kontrak",
  extras: "Komponen Tambahan",
};

const ContractInvoiceFormIndex = ({
  dataProfile,
  sidemenu,
  initProps,
  invoiceId,
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

  // TODO: change feature constant
  const isAllowedToGetInvoice = hasPermission(CONTRACT_TEMPLATE_GET);
  const isAllowedToUpdateInvoice = hasPermission(CONTRACT_TEMPLATE_UPDATE);

  const rt = useRouter();
  // Breadcrumb url
  const pathArr = rt.asPath.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 1);
  pathTitleArr.splice(1, 3, "Kontrak", "Invoice", "Sunting Draft Invoice");

  // 2. useState
  const [refresh, setRefresh] = useState(-1);
  const [period, setPeriod] = useState(-1);
  const [dataInvoice, setDataInvoice] = useState({});
  const [dataInvoiceDetail, setDataInvoiceDetail] = useState([]);
  const [dataServiceTemplateNames, setDataServiceTemplateNames] = useState([]);
  const [dataServices, setDataServices] = useState([]);

  const [modalContractInfo, setModalContractInfo] = useState(false);

  const [loadingInvoice, setLoadingInvoice] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  // 3. Use Effect & Use Query
  // 2.1. Get Invoice Data
  useEffect(() => {
    if (!isAllowedToGetInvoice) {
      permissionWarningNotification("Mendapatkan", "Data Invoice");
      setLoadingInvoice(false);
      return;
    }

    if (invoiceId) {
      setLoadingInvoice(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getContractTemplate?contract_id=${invoiceId}`,
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
            setDataInvoice(res2.data);
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
        .finally(() => {
          setLoadingInvoice(false);
        });
    }
  }, [isAllowedToGetInvoice, refresh]);

  useEffect(() => {
    if (dataInvoice?.invoice_template) {
      const currentInvoiceTemplate = [];
      for (let item of dataInvoice?.invoice_template?.details) {
        if (!item?.includes("extras")) {
          let tempValue = dataInvoice[item];

          if (["initial_date", "start_date", "end_date"].includes(item)) {
            tempValue = momentFormatDate(tempValue);
          }

          if (item == "duration") {
            tempValue = convertDaysToString(tempValue);
          }

          if (item == "requester") {
            tempValue = dataInvoice?.requester?.name;
          }

          if (item == "client") {
            tempValue = dataInvoice?.client?.name;
          }

          currentInvoiceTemplate.push({
            name: item,
            title: contractInfoString[item],
            value: tempValue,
          });
        } else {
          for (let extra of dataInvoice?.extras) {
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
      setDataInvoiceDetail(currentInvoiceTemplate);
    }
  }, [dataInvoice?.invoice_template]);

  useEffect(() => {
    setDataServiceTemplateNames(dataInvoice?.service_template?.details);
    setDataServices(dataInvoice?.services);
  }, [dataInvoice?.service_template, dataInvoice?.services]);

  // 4. Event
  // Debounce function for auto save draft
  const debouncedSaveInvoice = useCallback(
    debounce((data) => {
      // handleSaveInvoice(0, data);
      console.log(data);
    }, 5000),
    []
  );

  const onChangeInput = (attributeName, value) => {
    setDataInvoice((prev) => ({
      ...prev,
      [attributeName]: value,
    }));

    // use for auto save
    debouncedSaveInvoice({
      ...dataInvoice,
      [attributeName]: value,
    });
  };

  const handleSaveInvoice = (isPosted, data) => {
    if (!isAllowedToUpdateInvoice) {
      permissionWarningNotification("Mengubah", "Template Invoice Kontrak");
      return;
    }

    const payload = {
      contract_id: Number(invoiceId),
      invoice_period: period,
      invoice_template: dataInvoiceDetail.map((item) => item.name),
      service_template: dataServiceTemplateNames,
      service_template_values: dataServices?.map(
        (item) => item?.service_template_value
      ),
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
            <div className="flex gap-6 items-center">
              <button
                className="flex space-x-2 items-center bg-transparent"
                onClick={() => rt.back()}
              >
                <ArrowLeftIconSvg size={24} />
                <h4 className="mig-heading--4">Sunting Draft Invoice</h4>
              </button>
              {dataInvoice?.is_posted ? (
                <div
                  className="rounded-md py-1 px-4 hover:cursor-pointer text-center mig-caption--bold
                   text-primary100 bg-primary100 bg-opacity-10 whitespace-nowrap"
                >
                  Terbit
                </div>
              ) : (
                <div
                  className="rounded-md py-1 px-4 hover:cursor-pointer 
                  text-center mig-caption--bold text-mono30 bg-mono90"
                >
                  Draft
                </div>
              )}
            </div>
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 lg:items-center">
              <ButtonSys
                type={"primary"}
                color={"secondary100"}
                disabled={false}
                // onClick={() => setModalInvoice(true)}
              >
                <div className="flex space-x-2 items-center">
                  <p>Unduh Draft</p>
                  <DownloadIcon2Svg color={"#FFFFFF"} size={20} />
                </div>
              </ButtonSys>
              <ButtonSys
                onClick={handleSaveInvoice}
                type={"primary"}
                disabled={!isAllowedToUpdateInvoice}
              >
                <p>Terbitkan</p>
              </ButtonSys>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <p className="col-span-2 text-warning">
              <em>*Informasi ini harus diisi</em>
            </p>
            <Form
              layout="vertical"
              className="col-span-2 grid grid-cols-2 gap-x-6"
            >
              <Form.Item
                name="invoice_no"
                label="Nomor Invoice"
                className="col-span-2"
                rules={[
                  {
                    required: true,
                    message: "Nomor invoice wajib diisi",
                  },
                ]}
                // initialValue={}
              >
                <>
                  <Input
                    placeholder="Masukkan nomor invoice"
                    name={`invoice_no`}
                    onChange={(e) =>
                      onChangeInput(e.target.name, e.target.value)
                    }
                  ></Input>
                </>
              </Form.Item>

              <Form.Item
                name="invoice_name"
                label="Nama Invoice"
                rules={[
                  {
                    required: true,
                    message: "Nama invoice wajib diisi",
                  },
                ]}
                // initialValue={newgroup.name}
              >
                <>
                  <Input
                    placeholder="Masukkan nama invoice"
                    name={`invoice_name`}
                    onChange={(e) =>
                      onChangeInput(e.target.name, e.target.value)
                    }
                  ></Input>
                </>
              </Form.Item>

              <Form.Item
                name="client_name"
                label="PT Klien"
                rules={[
                  {
                    required: true,
                    message: "PT klien wajib diisi",
                  },
                ]}
                // initialValue={newgroup.name}
              >
                <>
                  <Select
                    placeholder="Masukkan PT klien"
                    name={`client_name`}
                    disabled
                    value={dataInvoice?.client?.name}
                    className="themedSelector"
                  ></Select>
                </>
              </Form.Item>

              <Form.Item
                name="published_date"
                label="Tanggal Terbit Invoice"
                rules={[
                  {
                    required: true,
                    message: "Tanggal terbit invoice wajib diisi",
                  },
                ]}
                // initialValue={newgroup.name}
              >
                <>
                  <DatePicker
                    placeholder="Pilih tanggal terbit"
                    name={`published_date`}
                    // onChange={onChangeCreateGroup}
                    className="w-full"
                  />
                </>
              </Form.Item>

              <Form.Item
                name="total_bill"
                label="Total Tagihan"
                rules={[
                  {
                    required: true,
                    message: "Total tagihan wajib diisi",
                  },
                ]}
                // initialValue={newgroup.name}
              >
                <>
                  <InputNumber
                    disabled
                    name={`total_bill`}
                    value={5000000}
                    formatter={(value) =>
                      `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    // onChange={onChangeCreateGroup}
                    className="w-full"
                  />
                </>
              </Form.Item>
            </Form>

            <div className="space-y-2">
              <p className="mig-caption--bold">Periode Penagihan</p>

              <DatePicker
                allowEmpty
                format={"D"}
                showToday={false}
                picker="date"
                placeholder="Pilih Periode"
                bordered={false}
                className="invoiceTemplateDPInput p-0"
                dropdownClassName="invoiceTemplateDP"
                defaultValue={
                  moment(dataInvoice?.invoice_period ?? "").isValid()
                    ? moment(dataInvoice?.invoice_period)
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
            {dataInvoiceDetail?.map((item) => (
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
          <ContractInvoiceItemSection
            dataServiceTemplateNames={dataServiceTemplateNames}
            setDataServiceTemplateNames={setDataServiceTemplateNames}
            dataServices={dataServices}
            setDataServices={setDataServices}
            loading={loadingInvoice}
          />
        </section>
      </div>

      <ModalContractInfo
        visible={modalContractInfo}
        onvisible={setModalContractInfo}
        dataContract={dataInvoice}
        dataInvoice={dataInvoiceDetail}
        setDataInvoice={setDataInvoiceDetail}
      />
    </Layout>
  );
};

export async function getServerSideProps({ req, res, params }) {
  const invoiceId = params.invoiceId;
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
      sidemenu: "contract-invoice",
      invoiceId,
    },
  };
}

export default ContractInvoiceFormIndex;
