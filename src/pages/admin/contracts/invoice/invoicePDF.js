// 2
import { DownloadOutlined, FileTextOutlined } from "@ant-design/icons";
import {
  Document,
  Font,
  Image,
  Link,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { notification } from "antd";
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

import { FileTextIconSvg } from "../../../../components/icon";
import {
  FILE,
  LIST,
} from "../../../../components/screen/contract/detail/ContractInfoSection";
import {
  convertDaysToString,
  countSubTotal,
  currency,
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

const ContractInvoicePDFView = ({
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
  const [dataClient, setDataClient] = useState({});
  const [dataMainCompany, setDataMainCompany] = useState({});

  // Loading
  const [loadingContractInvoice, setLoadingContractInvoice] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  // Misc.
  const [refresh, setRefresh] = useState(-1);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [windowSize, setWindowSize] = useState([]);

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

  // 2.4. Get client data
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
  }, [isAllowedToGetCompanyDetail, dataInvoice?.client_id]);

  // 2.5. Get main company data
  useEffect(() => {
    if (!isAllowedToGetCompanyDetail) {
      permissionWarningNotification("Mendapatkan", "Detail Company");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyDetail?id=1`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setDataMainCompany(res2?.data);
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
      });
  }, [isAllowedToGetCompanyDetail]);

  // use for rendering pdf in full window size
  useEffect(() => {
    setWindowSize([window.innerWidth, window.innerHeight]);
  }, []);
  // 4. Event

  // console.log({ dataServices });
  // console.log({ dataServiceTemplateNames });
  // console.log({ dataInvoice });
  // console.log({ dataInvoiceDetail });
  // console.log({ dataClient });
  return (
    <PDFViewer width={windowSize[0]} height={windowSize[1]}>
      <InvoicePDFTemplate
        dataInvoice={dataInvoice}
        dataInvoiceDetail={dataInvoiceDetail}
        dataClient={dataClient}
        dataMainCompany={dataMainCompany}
      />
    </PDFViewer>
  );
};

export const InvoicePDFTemplate = ({
  dataInvoice,
  dataInvoiceDetail,
  dataClient,
  dataMainCompany,
}) => {
  function breakText(text) {
    return [text];
  }

  // https://developers.google.com/fonts/docs/developer_api?apix_params=%7B%22sort%22%3A%22ALPHA%22%7D
  Font.register({
    family: "Inter",
    fonts: [
      {
        src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf",
      },
      {
        src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf",
        fontWeight: "bold",
      },
    ],
  });
  const styles = StyleSheet.create({
    page: {
      flexDirection: "col",
      backgroundColor: "#ffffff",
      paddingVertical: 40,
      fontFamily: "Inter",
      color: "#4D4D4D",
      fontSize: 11,
      lineHeight: 1.5,
    },

    rowSection: {
      marginHorizontal: 40,
      marginBottom: 40,
      flexDirection: "row",
      justifyContent: "space-between",
    },

    rowBetween: {
      flexDirection: "row",
      justifyContent: "space-between",
    },

    tableHeader: {
      fontWeight: 700,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      paddingVertical: 12,
      borderColor: "#CCCCCC",
    },

    textHeading: {
      fontSize: 24,
      fontFamily: "Inter",
      fontWeight: 700,
      lineHeight: 1.5,
      color: "#35763B",
    },

    textHeading6: {
      fontSize: 12,
      fontFamily: "Inter",
      fontWeight: 500,
      letterSpacing: 1.5,
      lineHeight: 1.5,
    },

    textCaptionBold: {
      fontSize: 10,
      fontFamily: "Inter",
      fontWeight: 700,
      lineHeight: 1.5,
      color: "#4D4D4D",
    },

    textCaptionSmallBold: {
      fontSize: 8,
      fontFamily: "Inter",
      fontWeight: 700,
      lineHeight: 1.5,
    },

    textCaptionSmallRegular: {
      fontSize: 8,
      fontFamily: "Inter",
      fontWeight: 400,
      lineHeight: 1.5,
    },

    footer: {
      position: "absolute",
      fontSize: 10,
      bottom: 20,
      left: 36,
      right: 36,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#4D4D4D",
    },

    pageNumber: {
      textAlign: "left",
      color: "#4D4D4D",
    },
  });

  return (
    <Document>
      <Page size={"A4"} style={styles.page} wrap>
        {/* Header */}
        <View style={styles.rowSection}>
          <View style={{ paddingRight: 10 }}>
            <Text style={styles.textHeading}>INVOICE</Text>
            <Text>{dataInvoice?.invoice_number?.toUpperCase()}</Text>
            <Text>
              TANGGAL :{" "}
              {momentFormatDate(dataInvoice?.invoice_raise_at).toUpperCase()}
            </Text>
            <Text style={{ fontWeight: 700, fontSize: 12 }}>
              {dataInvoice?.invoice_name?.toUpperCase()}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 145, height: 56 }}
              src={`/image/LogoMig2.png`}
            />
          </View>
        </View>

        {/* Body */}
        {/* INVOICE DETAIL SECTION */}
        <View
          style={[
            styles.rowSection,
            {
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: `1px solid #CCCCCC`,
              paddingVertical: 16,
            },
          ]}
        >
          {/* Left column */}
          <View
            style={{
              width: 250,
              borderRight: "0.5px solid #CCC",
              paddingRight: 10,
            }}
          >
            <Text>Kepada Yth,</Text>
            <Text>{dataClient?.name}</Text>
            <Text>{dataClient?.address}</Text>
          </View>

          {/* Right column */}
          <View style={{ width: 250, textAlign: "right", paddingLeft: 10 }}>
            {dataInvoiceDetail?.map((item) => (
              <View key={item?.title} className="md:space-y-2">
                {item?.type === FILE ? (
                  <View className="flex space-x-2 items-center">
                    <Text className="mig-caption--bold">{item?.title}: </Text>
                    <FileTextIconSvg size={24} color={"#35763B"} />
                    <Link
                      href={generateStaticAssetUrl(item?.value?.link)}
                      target="_blank"
                      className="text-primary100 truncate"
                    >
                      <Text>{getFileName(item?.value?.link)}</Text>
                    </Link>
                  </View>
                ) : item?.type === LIST ? (
                  <View>
                    <Text className="mig-caption--bold">{item?.title}: </Text>
                    {item?.value?.map((val, idx) => (
                      <Text key={idx}>{val}</Text>
                    ))}
                  </View>
                ) : (
                  <Text>
                    {item?.title}: {item?.value}
                  </Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* INVOICE ITEM TABLE */}
        <View
          style={[
            styles.rowSection,
            { flexDirection: "column", borderBottomWidth: 0 },
          ]}
        >
          <View
            style={[
              styles.rowBetween,
              {
                borderTopWidth: 1,
                paddingVertical: 12,
                borderColor: "#CCCCCC",
              },
            ]}
          >
            <View>
              <Text style={{ fontWeight: 700 }}>No.</Text>
              {dataInvoice?.invoice_services?.map((item, idx) => (
                <Text
                  key={item?.id}
                  style={{ marginTop: 12, textAlign: "center" }}
                >
                  {idx + 1}
                </Text>
              ))}
            </View>
            <View>
              <Text style={{ fontWeight: 700 }}>Keterangan</Text>
              {dataInvoice?.invoice_services?.map((item, idx) => (
                <Text key={item?.id} style={{ marginTop: 12 }}>
                  {item?.product?.name}
                </Text>
              ))}
            </View>
            <View>
              <Text style={{ fontWeight: 700 }}>Pax</Text>
              {dataInvoice?.invoice_services?.map((item, idx) => (
                <Text key={item?.id} style={{ marginTop: 12 }}>
                  {item?.pax}
                </Text>
              ))}
            </View>
            <View>
              <Text style={{ fontWeight: 700 }}>Harga</Text>
              {dataInvoice?.invoice_services?.map((item, idx) => (
                <Text key={item?.id} style={{ marginTop: 12 }}>
                  {currency(item?.price)}/
                  <Text style={{ color: "#808080" }}>
                    {item?.unit?.toLowerCase()}
                  </Text>
                </Text>
              ))}
            </View>
            <View>
              <Text style={{ fontWeight: 700 }}>Subtotal</Text>
              {dataInvoice?.invoice_services?.map((item, idx) => {
                const subtotal = countSubTotal(item?.pax, item?.price);
                return (
                  <Text key={item?.id} style={{ marginTop: 12 }}>
                    {currency(subtotal)}
                  </Text>
                );
              })}
            </View>
            {dataInvoice?.service_attribute?.map((item, idx) => (
              <View key={item}>
                <Text style={{ fontWeight: 700 }}>{item}</Text>
                {dataInvoice?.invoice_services?.[
                  idx
                ]?.invoice_service_value?.details?.map((value, idx) => (
                  <Text key={idx} style={{ marginTop: 12 }}>
                    {value}
                  </Text>
                ))}
              </View>
            ))}
          </View>

          {/* Total Keseluruhan */}
          <View
            style={{
              ...styles.rowBetween,
              marginTop: 12,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              paddingVertical: 12,
              borderColor: "#CCCCCC",
              fontWeight: 700,
            }}
          >
            <Text>Total Keseluruhan</Text>
            <Text>{currency(dataInvoice?.invoice_total)}</Text>
          </View>
        </View>

        {/* Footer */}
        <View
          style={[
            styles.rowSection,
            {
              width: "50%",
              flexDirection: "column",
              marginBottom: 0,
              // paddingTop: 16,
              // paddingBottom: 0,
              // borderBottomWidth: 0,
              // position: "absolute",
              // bottom: 10,
            },
          ]}
        >
          <Text>Pembayaran mohon ditransfer ke rekening :</Text>
          <Text>BANK {dataInvoice?.bank_account?.name || "-"}</Text>
          <Text>
            Rekening No: {dataInvoice?.bank_account?.account_number || "-"}
          </Text>
          <Text>a.n. {dataInvoice?.bank_account?.owner || "-"}</Text>
          <Text>No. NPWP {dataMainCompany?.npwp || "-"}</Text>
          <Text>{dataMainCompany?.address || "-"}</Text>

          <View style={{ marginTop: 40 }}>
            <Text>PT. Mitramas Infosys Global</Text>

            <View style={{ marginTop: 72 }}>
              <Text style={{ fontWeight: 700 }}>Kadmina</Text>
              <Text>Dierktur Utama</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export async function getServerSideProps({ req, res, params }) {
  const invoiceId = 9;
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

export default ContractInvoicePDFView;
