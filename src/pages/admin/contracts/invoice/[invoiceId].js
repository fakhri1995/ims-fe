import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
  notification,
} from "antd";
import debounce from "lodash.debounce";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useQuery } from "react-query";

import { AccessControl } from "components/features/AccessControl";
import Layout from "components/layout-dashboard";
import st from "components/layout-dashboard.module.css";

import { useAccessControl } from "contexts/access-control";

import {
  COMPANY_DETAIL_GET,
  COMPANY_MAIN_BANKS_GET,
  CONTRACT_INVOICE_GET,
  CONTRACT_INVOICE_UPDATE,
} from "lib/features";

import ButtonSys from "../../../../components/button";
import {
  AlertCircleIconSvg,
  ArrowLeftIconSvg,
  CalendarEventIconSvg,
  CheckIconSvg,
  DownloadIcon2Svg,
  FileTextIconSvg,
  PlusIconSvg,
} from "../../../../components/icon";
import ModalContractInfo from "../../../../components/modal/contracts/modalContractInfo";
import { ModalUbah } from "../../../../components/modal/modalCustom";
import {
  FILE,
  LIST,
} from "../../../../components/screen/contract/detail/ContractInfoSection";
import InvoiceItemSection from "../../../../components/screen/contract/invoice/InvoiceItemSection";
import {
  convertDaysToString,
  generateStaticAssetUrl,
  getFileName,
  momentFormatDate,
  permissionWarningNotification,
} from "../../../../lib/helper";
import { contractInfoString } from "../[contractId]/invoice-template";
import { InvoicePDFTemplate } from "./invoicePDF";
import httpcookie from "cookie";

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

  const isAllowedToGetInvoice = hasPermission(CONTRACT_INVOICE_GET);
  const isAllowedToUpdateInvoice = hasPermission(CONTRACT_INVOICE_UPDATE);
  const isAllowedToGetMainBanks = hasPermission(COMPANY_MAIN_BANKS_GET);
  const isAllowedToGetCompanyDetail = hasPermission(COMPANY_DETAIL_GET);

  const rt = useRouter();
  // Breadcrumb url
  const pathArr = rt.asPath.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 1);
  pathTitleArr.splice(1, 3, "Kontrak", "Invoice", "Sunting Draft Invoice");

  // 2. useState
  // Data
  const [dataInvoice, setDataInvoice] = useState({});
  const [dataInvoiceDetail, setDataInvoiceDetail] = useState([]);
  const [dataServiceTemplateNames, setDataServiceTemplateNames] = useState([]);
  const [dataServices, setDataServices] = useState([]);
  const [bankAccountList, setBankAccountList] = useState([]);
  const [dataClient, setDataClient] = useState({});

  // Modal
  const [modalContractInfo, setModalContractInfo] = useState(false);
  const [modalPublish, setModalPublish] = useState(false);

  // Loading
  const [loadingContractInvoice, setLoadingContractInvoice] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  // Misc.
  const [refresh, setRefresh] = useState(-1);
  const [showSuccessIcon, setShowSuccessIcon] = useState(false);
  const [disablePublish, setDisablePublish] = useState(true);
  const [isReadOnly, setIsReadOnly] = useState(false);

  const requiredField = [
    dataInvoice?.invoice_number,
    dataInvoice?.invoice_name,
    dataInvoice?.invoice_raise_at,
    dataInvoice?.invoice_total,
  ];

  // 3. Use Effect & Use Query
  // 2.1. Get Invoice Data
  useEffect(() => {
    if (!isAllowedToGetInvoice) {
      permissionWarningNotification("Mendapatkan", "Data Contract Invoice");
      setLoadingContractInvoice(false);
      return;
    }

    if (invoiceId) {
      setLoadingContractInvoice(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getContractInvoice?id=${invoiceId}`,
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

            // if invoice is already posted, then set form to disabled
            setIsReadOnly(Boolean(res2?.data?.is_posted));
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
          setLoadingContractInvoice(false);
        });
    }
  }, [isAllowedToGetInvoice, refresh]);

  // 2.2. Set displayed invoice detail
  useEffect(() => {
    if (dataInvoice?.invoice_attribute?.length) {
      const currentInvoiceDetail = [];
      for (let item of dataInvoice?.invoice_attribute) {
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

          currentInvoiceDetail.push({
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

              currentInvoiceDetail.push(dataExtra);
            }
          }
        }
      }
      setDataInvoiceDetail(currentInvoiceDetail);
    }
  }, [dataInvoice?.invoice_attribute]);

  // 2.3. Set item table data
  useEffect(() => {
    setDataServiceTemplateNames(dataInvoice?.service_attribute);
    setDataServices(dataInvoice?.invoice_services);
  }, [dataInvoice?.service_attribute, dataInvoice?.invoice_services]);

  // 2.4. Enable "Terbitkan" button if all required fields are filled
  useEffect(() => {
    const isAllFilled = requiredField.every((item) => Boolean(item));
    if (isAllFilled) {
      setDisablePublish(false);
    } else {
      setDisablePublish(true);
    }
  }, [...requiredField]);

  // 2.5. Clean up debounce function when component unmounts
  useEffect(() => {
    return () => {
      debouncedSaveInvoice.cancel();
    };
  }, []);

  // 2.6. Get main bank account list
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

  // 2.7. [PDF] Get client data
  useEffect(() => {
    if (!isAllowedToGetCompanyDetail) {
      permissionWarningNotification("Mendapatkan", "Detail Company");
      return;
    }

    if (dataInvoice?.client_id) {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyDetail?id=${dataInvoice?.client_id}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          setDataClient(res2?.data);
        })
        .catch((err) => {
          notification.error({
            message: `${err.response}`,
            duration: 3,
          });
        });
    }
  }, [dataInvoice?.client_id]);

  // 3. Event
  // Debounce function for auto save draft
  const debouncedSaveInvoice = useCallback(
    debounce((data) => {
      handleSaveInvoice(0, data);
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
      permissionWarningNotification("Mengubah", "Invoice Kontrak");
      return;
    }

    if (isReadOnly) {
      notification.warning({
        message: "Gagal mengubah invoice. Invoice sudah diterbitkan.",
        duration: 3,
      });
      return;
    }

    const payload = {
      ...data,
      is_posted: isPosted,
      service_attribute_values: data?.invoice_services?.map((item) => ({
        id: item?.id,
        product_id: item?.product_id,
        pax: item?.pax,
        price: item?.price,
        unit: item?.unit,
        details: item?.invoice_service_value?.details || [],
        is_delete: item?.is_delete || false,
      })),
    };

    setLoadingSave(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateContractInvoice`, {
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
          setRefresh((prev) => prev + 1);
          setShowSuccessIcon(true);
          setTimeout(() => setShowSuccessIcon(false), 1000);
          if (isPosted) {
            notification.success({
              message: "Invoice berhasil diterbitkan.",
              duration: 3,
            });
            setModalPublish(false);
          }
        } else {
          notification.error({
            message: response.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal mengubah invoice kontrak. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoadingSave(false));
  };

  // console.log({ dataServices });
  // console.log({ dataServiceTemplateNames });
  // console.log({ dataInvoice });
  // console.log({ dataInvoiceDetail });
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
        className="grid grid-cols-1 gap-4 lg:gap-6 md:px-5 "
        id="mainWrapper"
      >
        {/* Detail Invoice */}

        <section
          className="grid grid-cols-1  
          gap-6 shadow-md rounded-md bg-white p-4 lg:p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <div className="flex gap-6 items-center">
              <button
                className="flex space-x-2 items-center bg-transparent"
                onClick={() => rt.back()}
              >
                <ArrowLeftIconSvg size={24} />
                <h4 className="mig-heading--4 text-left">
                  Sunting Draft Invoice
                </h4>
              </button>
              {dataInvoice?.is_posted ? (
                <div
                  className="rounded-md py-1 px-4 hover:cursor-pointer text-center mig-caption--bold
                   text-primary100 bg-primary100 bg-opacity-10 whitespace-nowrap"
                >
                  Terbit
                </div>
              ) : (
                <div className="flex items-center gap-6">
                  <div
                    className="rounded-md py-1 px-4 hover:cursor-pointer 
                  text-center mig-caption--bold text-mono30 bg-mono90"
                  >
                    Draft
                  </div>
                  {loadingSave ? (
                    <Spin className="mt-2" spinning={loadingSave} />
                  ) : (
                    <div
                      className={`transition duration-700 ease-in-out ${
                        showSuccessIcon ? "opacity-1" : "opacity-0"
                      }`}
                    >
                      <CheckIconSvg color={"#35763B"} size={32} />
                    </div>
                  )}
                </div>
              )}
            </div>
            {!isReadOnly ? (
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 lg:items-center">
                <PDFDownloadLink
                  document={
                    <InvoicePDFTemplate
                      dataInvoice={dataInvoice}
                      dataInvoiceDetail={dataInvoiceDetail}
                      dataClient={dataClient}
                    />
                  }
                  fileName={`Invoice_${dataInvoice?.invoice_number}.pdf`}
                >
                  {({ blob, url, loading, error }) => (
                    <Spin spinning={loadingContractInvoice}>
                      <ButtonSys
                        type={"primary"}
                        color={"secondary100"}
                        disabled={false}
                      >
                        <div className="flex space-x-2 items-center">
                          <p>Unduh Draft</p>
                          <DownloadIcon2Svg color={"#FFFFFF"} size={20} />
                        </div>
                      </ButtonSys>
                    </Spin>
                  )}
                </PDFDownloadLink>

                <ButtonSys
                  type={"primary"}
                  disabled={!isAllowedToUpdateInvoice || disablePublish}
                  onClick={() => {
                    setModalPublish(true);
                  }}
                >
                  <p>Terbitkan</p>
                </ButtonSys>
              </div>
            ) : (
              <PDFDownloadLink
                document={
                  <InvoicePDFTemplate
                    dataInvoice={dataInvoice}
                    dataInvoiceDetail={dataInvoiceDetail}
                    dataClient={dataClient}
                  />
                }
                fileName={`Invoice_${dataInvoice?.invoice_number}.pdf`}
              >
                {({ blob, url, loading, error }) => (
                  <Spin spinning={loadingContractInvoice}>
                    <ButtonSys
                      type={"primary"}
                      color={"secondary100"}
                      disabled={false}
                    >
                      <div className="flex space-x-2 items-center">
                        <p>Unduh Draft</p>
                        <DownloadIcon2Svg color={"#FFFFFF"} size={20} />
                      </div>
                    </ButtonSys>
                  </Spin>
                )}
              </PDFDownloadLink>
            )}
          </div>
          <Spin spinning={loadingContractInvoice}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {!isReadOnly && (
                <p className="md:col-span-2 text-warning">
                  <em>*Informasi ini harus diisi</em>
                </p>
              )}
              <Form
                layout="vertical"
                className="md:col-span-2 md:grid md:grid-cols-2 gap-x-6"
              >
                <Form.Item
                  name="invoice_number"
                  label="Nomor Invoice"
                  className="md:col-span-2"
                  rules={[
                    {
                      required: true,
                      message: "Nomor invoice wajib diisi",
                    },
                  ]}
                >
                  <>
                    <Input
                      placeholder="Masukkan nomor invoice"
                      name={`invoice_number`}
                      value={dataInvoice?.invoice_number}
                      disabled={isReadOnly}
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
                >
                  <>
                    <Input
                      placeholder="Masukkan nama invoice"
                      name={`invoice_name`}
                      value={dataInvoice?.invoice_name}
                      disabled={isReadOnly}
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
                      value={dataInvoice?.client?.name}
                      disabled
                      className="themedSelector"
                    ></Select>
                  </>
                </Form.Item>

                <Form.Item
                  name="invoice_raise_at"
                  label="Tanggal Terbit Invoice"
                  rules={[
                    {
                      required: true,
                      message: "Tanggal terbit invoice wajib diisi",
                    },
                  ]}
                >
                  <>
                    <DatePicker
                      placeholder="Pilih tanggal terbit"
                      name={`invoice_raise_at`}
                      defaultValue={moment(dataInvoice?.invoice_raise_at)}
                      disabled={isReadOnly}
                      onChange={(date, datestring) => {
                        onChangeInput("invoice_raise_at", datestring);
                      }}
                      className="w-full"
                    />
                  </>
                </Form.Item>

                <Form.Item
                  name="invoice_total"
                  label="Total Tagihan"
                  rules={[
                    {
                      required: true,
                      message: "Total tagihan wajib diisi",
                    },
                  ]}
                >
                  <>
                    <InputNumber
                      name={`invoice_total`}
                      disabled={isReadOnly}
                      value={dataInvoice.invoice_total}
                      formatter={(value) =>
                        `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                      }
                      parser={(value) => value.replace(/Rp\s?|(\.*)/g, "")}
                      onChange={(value) => {
                        onChangeInput("invoice_total", value);
                      }}
                      className="w-full"
                    />
                  </>
                </Form.Item>

                <Form.Item
                  name="invoice_bank"
                  label="Nomor Rekening"
                  rules={[
                    {
                      required: true,
                      message: "Nomor rekening wajib diisi",
                    },
                  ]}
                >
                  <>
                    {/* TODO: adjust if API is done */}
                    <Select
                      name="invoice_bank"
                      // value={""}
                      disabled={!isAllowedToGetMainBanks || isReadOnly}
                      placeholder="Pilih Rekening"
                      onChange={(value) => {}}
                      className="themedSelector"
                    >
                      {bankAccountList?.map((item) => (
                        <Select.Option key={item?.id} value={item?.id}>
                          {item?.name} - {item?.account_number}
                        </Select.Option>
                      ))}
                    </Select>
                  </>
                </Form.Item>
              </Form>

              {dataInvoiceDetail?.map((item) => (
                <div key={item?.title} className="md:space-y-2">
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
          </Spin>

          {!isReadOnly && (
            <button
              onClick={() => setModalContractInfo(true)}
              className="flex space-x-1 items-center bg-transparent hover:opacity-75"
            >
              <PlusIconSvg size={18} color={"#35763B"} />
              <p className="mig-caption--bold text-primary100">
                Tambah Informasi Lainnya
              </p>
            </button>
          )}
        </section>

        {/* Daftar Item */}
        <section className="shadow-md rounded-md bg-white p-6 mb-4 gap-6">
          <InvoiceItemSection
            initProps={initProps}
            dataInvoiceUpdate={dataInvoice}
            setDataInvoiceUpdate={setDataInvoice}
            dataServiceTemplateNames={dataServiceTemplateNames}
            setDataServiceTemplateNames={setDataServiceTemplateNames}
            dataServices={dataServices}
            setDataServices={setDataServices}
            loading={loadingContractInvoice}
            debouncedSave={debouncedSaveInvoice}
            handleSaveInvoice={handleSaveInvoice}
            isReadOnly={isReadOnly}
          />
        </section>
      </div>

      <AccessControl hasPermission={CONTRACT_INVOICE_UPDATE}>
        <ModalContractInfo
          visible={modalContractInfo}
          onvisible={setModalContractInfo}
          dataContract={dataInvoice}
          dataInvoice={dataInvoiceDetail}
          setDataInvoice={setDataInvoiceDetail}
          isInvoiceForm={true}
          handleSaveInvoice={handleSaveInvoice}
        />
      </AccessControl>

      {/* Modal "Terbitkan" */}
      <AccessControl hasPermission={CONTRACT_INVOICE_UPDATE}>
        <ModalUbah
          title={
            <div className="flex gap-2 items-center">
              <AlertCircleIconSvg size={28} color={"#35763B75"} />
              <h3 className="mig-heading--3 text-primary100">
                Konfirmasi Terbitkan Invoice
              </h3>
            </div>
          }
          visible={modalPublish}
          onvisible={setModalPublish}
          onOk={() => handleSaveInvoice(1, dataInvoice)}
          onCancel={() => setModalPublish(false)}
          loading={loadingSave}
          disabled={!isAllowedToUpdateInvoice}
          okButtonText={"Terbitkan"}
          closable={false}
        >
          <p>
            Apakah Anda yakin ingin menerbitkan invoice dengan nomor invoice{" "}
            <strong>{dataInvoice?.invoice_number}?</strong>
          </p>
        </ModalUbah>
      </AccessControl>
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
