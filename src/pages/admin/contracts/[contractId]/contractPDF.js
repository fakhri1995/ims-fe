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
import React, { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";

import { useAccessControl } from "contexts/access-control";

import { CONTRACT_GET } from "lib/features";

import { ContractService } from "apis/contract";

import {
  FILE,
  LIST,
  TEXT,
} from "../../../../components/screen/contract/detail/ContractInfoSection";
import {
  countSubTotal,
  currency,
  generateStaticAssetUrl,
  getFileName,
  momentFormatDate,
} from "../../../../lib/helper";
import httpcookie from "cookie";

// This page is only used for developing Contract PDF,
// it will automatically renders the PDF when saved
const ContractPDF = ({ initProps, contractId }) => {
  // 1. Init
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetContract = hasPermission(CONTRACT_GET);

  // 2. useState

  // Misc.
  const [windowSize, setWindowSize] = useState([]);

  // 3. Use Effect & Use Query
  // Get contract detail
  const { data: dataContract, isLoading: loadingDataContract } = useQuery(
    [CONTRACT_GET],
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

  // Use for rendering pdf in full window size
  useEffect(() => {
    setWindowSize([window.innerWidth, window.innerHeight]);
  }, []);

  return (
    <PDFViewer width={windowSize[0]} height={windowSize[1]}>
      <ContractPDFTemplate dataContract={dataContract} />
    </PDFViewer>
  );
};

// Actual Contract PDF template
export const ContractPDFTemplate = ({ dataContract }) => {
  // PDF Stylesheet
  // Source of font link: https://developers.google.com/fonts/docs/developer_api?apix_params=%7B%22sort%22%3A%22ALPHA%22%7D
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
      paddingTop: 28,
      paddingBottom: 50,
      fontFamily: "Inter",
      color: "#4D4D4D",
      fontSize: 10,
      lineHeight: 1.5,
    },

    rowSection: {
      marginHorizontal: 40,
      marginBottom: 28,
      flexDirection: "row",
      justifyContent: "space-between",
    },

    rowBetween: {
      flexDirection: "row",
      justifyContent: "space-between",
    },

    tableBorder: {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      paddingVertical: 12,
      marginTop: 12,
      borderColor: "#CCCCCC",
      fontWeight: 700,
    },

    textHeading: {
      fontSize: 22,
      fontFamily: "Inter",
      fontWeight: 700,
      lineHeight: 1.5,
      color: "#35763B",
    },

    footer: {
      position: "absolute",
      fontSize: 10,
      bottom: 28,
      right: 40,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#4D4D4D",
    },

    // Table cols
    colNo: {
      width: "6%",
    },

    colKet: {
      width: "30%",
    },

    colPax: {
      width: "6%",
    },

    colHarga: {
      width: "33%",
    },

    colSub: {
      width: "25%",
      textAlign: "right",
    },
  });

  const TableHeader = () => (
    <View
      wrap={false}
      style={[
        styles.rowBetween,
        styles.tableBorder,
        {
          textAlign: "left",
        },
      ]}
    >
      <Text style={styles.colNo}>No.</Text>
      <Text style={styles.colKet}>Keterangan</Text>
      <Text style={styles.colPax}>Pax</Text>
      <Text style={styles.colHarga}>Harga</Text>
      <Text style={styles.colSub}>Subtotal</Text>
    </View>
  );

  // Conditional render
  const getExtrasDetail = (item) => {
    switch (item?.type) {
      case TEXT:
        return (
          <Text>
            {item?.name}: {item?.value}
          </Text>
        );

      case LIST:
        return (
          <View>
            <Text>{item?.name}: </Text>
            {item?.value?.map((val, idx) => (
              <Text key={idx}>• {val}</Text>
            ))}
          </View>
        );

      case FILE:
        return (
          <View>
            <Text>{item?.name}: </Text>
            <Link src={generateStaticAssetUrl(item?.value?.link)}>
              <Text style={{ color: "#35763B" }}>
                {getFileName(item?.value?.link)}
              </Text>
            </Link>
          </View>
        );
    }
  };

  const countTotalPrice = () =>
    dataContract?.services?.reduce((acc, item) => acc + item?.subtotal, 0);

  return (
    <Document>
      <Page size={"LETTER"} style={styles.page} wrap>
        {/* Header */}
        <View style={styles.rowSection}>
          <View style={{ width: "50%" }}>
            <Text style={styles.textHeading}>KONTRAK</Text>
            <Text>NO. {dataContract?.code_number?.toUpperCase()}</Text>
            <Text>
              TANGGAL DIBUAT :{" "}
              {momentFormatDate(dataContract?.initial_date).toUpperCase()}
            </Text>
            <Text style={{ fontWeight: 700, fontSize: 12 }}>
              {dataContract?.title?.toUpperCase()}
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
        {/* CONTRACT DETAIL SECTION */}
        <View
          style={[
            styles.rowSection,
            {
              height: 140,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: `1px solid #CCCCCC`,
              paddingVertical: 12,
              marginBottom: 20,
            },
          ]}
        >
          {/* Left column */}
          <View
            style={{
              width: 250,
              paddingRight: 5,
            }}
          >
            <Text>Klien: {dataContract?.client?.name}</Text>
            <Text>Requester: {dataContract?.requester?.name}</Text>
            <Text>Tanggal Berlaku: {dataContract?.start_date}</Text>
            <Text>Tanggal Selesai: {dataContract?.end_date}</Text>
          </View>

          {/* Right column */}
          <View
            style={{
              width: 250,
              textAlign: "right",
              borderLeft: "0.5px solid #CCC",
              paddingLeft: 10,
            }}
          >
            {dataContract?.extras?.map((item) => (
              <View key={item?.key}>{getExtrasDetail(item)}</View>
            ))}
          </View>
        </View>

        {/* CONTRACT ITEM TABLE */}
        <View
          style={[
            styles.rowSection,
            { flexDirection: "column", borderBottomWidth: 0 },
          ]}
        >
          {/* Table rows */}
          {dataContract?.services?.map((item, idx) => {
            const subtotal =
              item?.subtotal || countSubTotal(item?.pax, item?.price);
            return (
              <View key={item?.id}>
                {/* Repeat table header in each top of page */}
                {(idx === 0 || idx === 12 || idx == 33) && <TableHeader />}
                <View
                  style={[
                    styles.rowBetween,
                    { marginTop: 12, textAlign: "left" },
                  ]}
                >
                  <Text style={styles.colNo}>{idx + 1}</Text>
                  <Text style={styles.colKet}>{item?.product?.name}</Text>
                  <Text style={styles.colPax}>{item?.pax}</Text>
                  <Text style={styles.colHarga}>
                    {currency(item?.price)}/
                    <Text style={{ color: "#808080" }}>
                      {item?.unit?.toLowerCase()}
                    </Text>
                  </Text>
                  <Text style={styles.colSub}>{currency(subtotal)}</Text>
                </View>
              </View>
            );
          })}

          {/* Total Keseluruhan */}
          <View
            style={[styles.rowBetween, styles.tableBorder, { marginTop: 12 }]}
            wrap={false}
          >
            <Text>Total Keseluruhan</Text>
            <Text>{currency(countTotalPrice())}</Text>
          </View>
        </View>

        {/* Footer */}
        <View fixed style={styles.footer}>
          <Text
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
};

export async function getServerSideProps({ req, res, params }) {
  const contractId = 1;
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

  return {
    props: {
      initProps,
      contractId,
    },
  };
}

export default ContractPDF;
