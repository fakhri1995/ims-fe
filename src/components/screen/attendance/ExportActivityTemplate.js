import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Html from "react-pdf-html";

import { generateStaticAssetUrl, momentFormatDate } from "../../../lib/helper";

const ExportActivityTemplate = ({
  dataResume,
  logoStatus = true,
  supervisor,
  to_data,
  from_data,
  dataProfile,
}) => {
  const isAllResultEmpty = dataResume?.assessment_results?.every(
    (result) => result?.value === ""
  );

  const [bulanpdf, setBulanPdf] = useState(null);

  function breakText(text) {
    return [text];
  }
  useEffect(() => {
    let month_from = moment(from_data).format("MMM");
    let month_to = moment(to_data).format("MMM");
    let year_from = moment(from_data).format("YYYY");
    let year_to = moment(to_data).format("YYYY");
    let bulan = "";
    if (month_from == month_to && year_from == year_to) {
      bulan =
        moment(from_data).format("MMMM") +
        " " +
        moment(from_data).format("YYYY");
    } else if (month_from != month_to && year_from == year_to) {
      bulan =
        moment(from_data).format("MMMM") +
        " - " +
        moment(to_data).format("MMMM") +
        " " +
        moment(from_data).format("YYYY");
    } else if (month_from != month_to && year_from != year_to) {
      bulan =
        moment(from_data).format("MMMM") +
        " " +
        moment(from_data).format("YYYY") +
        " - " +
        moment(to_data).format("MMMM") +
        " " +
        moment(to_data).format("YYYY");
    }
    setBulanPdf(bulan);
  }, []);

  const renderDetailDailyActivity = (daily) => {
    if (daily.length == 0) {
      return daily[0].value;
    } else {
      let kata = "";
      for (let a = 0; a < daily.length; a++) {
        if (a != daily.length - 1) {
          kata = kata + daily[a].value + ", ";
        } else {
          kata = kata + daily[a].value;
        }
      }
      return kata;
    }
  };

  return (
    <Document>
      <Page size={"A4"} style={styles.page}>
        <View style={styles.rowTwoCol} wrap={false}>
          <View style={{ width: "60%", flexDirection: "column" }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Inter",
                fontWeight: 500,
                color: `#4D4D4D`,
              }}
            >
              TIME SHEET {bulanpdf ? bulanpdf : "-"}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <Text
                style={{
                  color: "#808080",
                  fontSize: 10,
                  fontFamily: "Inter",
                  fontWeight: 500,
                }}
              >
                {dataProfile.name}
              </Text>
              <View
                style={{
                  width: 3,
                  height: 3,
                  backgroundColor: "#4D4D4D",
                  borderRadius: 3,
                  marginHorizontal: 8,
                }}
              ></View>
              <View>
                {" "}
                <Text
                  style={{
                    color: "#CCCCCC",
                    fontSize: 10,
                    fontFamily: "Inter",
                    fontWeight: 500,
                  }}
                >
                  {dataProfile.position}
                </Text>{" "}
              </View>
            </View>
            <View style={{ flexDirection: "row", marginTop: "20px" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 6,
                    height: 6,
                    backgroundColor: "#FFDFDC",
                    borderRadius: 6,
                    marginRight: 8,
                  }}
                ></View>
                <Text
                  style={{
                    marginRight: 12,
                    color: "#4D4D4D",
                    fontSize: 10,
                    fontWeight: 500,
                  }}
                >
                  Cuti
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 6,
                    height: 6,
                    backgroundColor: "#E0F1FF",
                    borderRadius: 6,
                    marginRight: 8,
                  }}
                ></View>
                <Text
                  style={{ color: "#BF4A40", fontSize: 10, fontWeight: 500 }}
                >
                  Libur
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: "40%",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Text
              style={{
                fontSize: 6,
                fontFamily: "Inter",
                fontWeight: 700,
                letterSpacing: 1,
                marginRight: 5,
              }}
            >
              {" "}
              GENERATED BY:
            </Text>
            <Image
              style={{ width: 80, height: 31.86 }}
              src={`/image/LogoMig2.png`}
            />
          </View>

          {/* <Text>Annisa Feranda</Text>
                <Text style={{color:'#CCCCCC',fontSize: 10, lineHeight:24,
            fontFamily: "Inter",
            fontWeight: 500,}}>MARKETING SPECIALIST</Text> */}
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 24,
            // borderWidth: 1,
            // borderColor: '#CCCCCC',
            paddingHorizontal: 48,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              borderColor: "#CCCCCC",
              backgroundColor: "#FAFAFA",
              borderWidth: 1,
              alignItems: "center",
              height: 24,
              textAlign: "center",
              fontSize: 8,
              color: `#4D4D4D`,
              fontWeight: 500,
              flexGrow: 1,
            }}
          >
            <View
              style={{
                width: "10%",
                height: 24,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRightColor: "#CCCCCC",
                borderRightWidth: 1,
              }}
            >
              <Text>Date</Text>
            </View>

            <View
              style={{
                width: "10%",
                height: 24,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRightColor: "#CCCCCC",
                borderRightWidth: 1,
              }}
            >
              <Text>From</Text>
            </View>
            <View
              style={{
                width: "10%",
                height: 24,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRightColor: "#CCCCCC",
                borderRightWidth: 1,
              }}
            >
              <Text>To</Text>
            </View>
            <View
              style={{
                width: "10%",
                height: 24,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRightColor: "#CCCCCC",
                borderRightWidth: 1,
              }}
            >
              <Text>Work</Text>
            </View>
            <View
              style={{
                width: "30%",
                height: 24,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRightColor: "#CCCCCC",
                borderRightWidth: 1,
              }}
            >
              <Text>Daily Activity</Text>
            </View>
            <View
              style={{
                width: "15%",
                height: 24,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRightColor: "#CCCCCC",
                borderRightWidth: 1,
              }}
            >
              <Text>Supervisor</Text>
            </View>
            <View
              style={{
                width: "15%",
                height: 24,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>Signature</Text>
            </View>
          </View>
          {dataResume?.map((data, idx) => (
            <View
              style={{
                flexDirection: "row",
                borderRightColor: "#CCCCCC",
                backgroundColor:
                  data["daily activity"] == "Libur Nasional"
                    ? "#E0F1FF"
                    : data["daily activity"] == "Cuti Bersama"
                    ? "#E0F1FF"
                    : data["daily activity"] == "Cuti"
                    ? "#E0F1FF"
                    : data["daily activity"] == "Weekend"
                    ? "#E0F1FF"
                    : data["daily activity"] == "Empty"
                    ? "#FFDFDC"
                    : "#ffffff",
                borderRightWidth: 1,
                borderLeftColor: "#CCCCCC",
                borderLeftWidth: 1,
                borderBottomColor:
                  idx == dataResume.length - 1 ? "#CCCCCC" : "white",
                borderBottomWidth: idx == dataResume.length - 1 ? 1 : 0,
                marginTop: 0,
                alignItems: "center",
                height: 24,
                textAlign: "center",
                fontSize: 8,
                color: `#4D4D4D`,
                fontWeight: 500,
                flexGrow: 1,
              }}
            >
              <View
                style={{
                  width: "10%",
                  height: 24,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRightColor: "#CCCCCC",
                  borderRightWidth: 1,
                }}
              >
                <Text>{moment(data.date).format("DD MMM YYYY")}</Text>
              </View>
              <View
                style={{
                  width: "10%",
                  height: 24,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRightColor: "#CCCCCC",
                  borderRightWidth: 1,
                }}
              >
                <Text>
                  {data.from == null ? "-" : moment(data.from).format("HH:mm")}
                </Text>
              </View>
              <View
                style={{
                  width: "10%",
                  height: 24,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRightColor: "#CCCCCC",
                  borderRightWidth: 1,
                }}
              >
                <Text>
                  {data.to == null ? "-" : moment(data.to).format("HH:mm")}
                </Text>
              </View>
              <View
                style={{
                  width: "10%",
                  height: 24,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRightColor: "#CCCCCC",
                  borderRightWidth: 1,
                }}
              >
                <Text>
                  {data.work == 0 ? "WFH" : data.work == 1 ? "WFO" : "-"}
                </Text>
              </View>
              <View
                style={{
                  width: "30%",
                  height: 24,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 5,
                  // justifyContent:'center',
                  borderRightColor: "#CCCCCC",
                  borderRightWidth: 1,
                }}
              >
                {data["daily activity"] == null ? (
                  <Text></Text>
                ) : data["daily activity"] == "Empty" ? (
                  <Text></Text>
                ) : data["daily activity"] == "Other" ? (
                  <Text></Text>
                ) : data["daily activity"] == [] ? (
                  <Text></Text>
                ) : data["daily activity"].length == 1 ? (
                  <Text
                    style={{
                      fontSize: 8,
                      color: `#4D4D4D`,
                      fontWeight: 500,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {data["daily activity"][0].details
                      ? renderDetailDailyActivity(
                          data["daily activity"][0].details
                        )
                      : data["daily activity"][0].activity}
                  </Text>
                ) : Array.isArray(data["daily activity"]) &&
                  data["daily activity"].length > 1 ? (
                  data["daily activity"].map((datanew, idxnew) => (
                    <View style={{ flexDirection: "row" }}>
                      <View
                        style={{
                          width: 3,
                          height: 3,
                          backgroundColor: "#4D4D4D",
                          borderRadius: 3,
                          marginRight: 2,
                          marginTop: 2,
                        }}
                      ></View>
                      <Text
                        style={{
                          fontSize: 8,
                          color: `#4D4D4D`,
                          fontWeight: 500,
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        {datanew.details
                          ? renderDetailDailyActivity(datanew.details)
                          : datanew.activity}
                      </Text>
                    </View>
                  ))
                ) : Array.isArray(data["daily activity"]) &&
                  data["daily activity"] == [] ? (
                  <Text
                    style={{
                      fontSize: 8,
                      color: `#4D4D4D`,
                      fontWeight: 500,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    -
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 8,
                      color: `#4D4D4D`,
                      fontWeight: 500,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {data["daily activity"]}
                  </Text>
                )}
              </View>
              <View
                style={{
                  width: "15%",
                  height: 24,
                  flexDirection: "row",
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRightColor: "#CCCCCC",
                  borderRightWidth: 1,
                }}
              >
                <Text>
                  {idx == parseInt(dataResume.length / 2) ? supervisor : ""}
                </Text>
              </View>
              <View
                style={{
                  width: "15%",
                  height: 24,
                  backgroundColor: "white",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text></Text>
              </View>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View fixed style={styles.footer}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{ color: `black` }}
              render={({ pageNumber }) => `${pageNumber}`}
            />
            <Text>&nbsp;/ </Text>
            <Text render={({ totalPages }) => `${totalPages}`} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

// .ttf link taken from https://developers.google.com/fonts/docs/developer_api?apix_params=%7B%22sort%22%3A%22ALPHA%22%7D
// click "Execute" then search for desired font in the API response, remember to change the link into https
Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf",
      fontWeight: 700,
    },
  ],
});

Font.register({
  family: "Inter Tight",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/intertight/v3/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0xCHy5XgqoUPvi5.ttf",
      fontStyle: "italic",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/intertight/v3/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0ylGC5XgqoUPvi5.ttf",
      fontStyle: "italic",
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    paddingTop: 30,
    paddingBottom: 88,
    color: "#4D4D4D",
  },
  section: {
    margin: 10,
    padding: 10,
    display: "flex",
    flexDirection: "row",
  },
  rowOneCol: {
    paddingHorizontal: 48,
    paddingBottom: 30,
  },

  rowTwoCol: {
    paddingHorizontal: 48,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  section: {
    width: `45%`,
    paddingBottom: 20,
  },

  sectionHeader: {
    fontSize: 12,
    fontFamily: "Inter",
    fontWeight: 700,
    letterSpacing: 1.5,
    color: `#35763B`,
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: `1px solid #E6E6E6`,
  },

  sectionBlock1: {
    paddingHorizontal: 6,
    paddingTop: 6,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  sectionBlock2: {
    paddingTop: 6,
    paddingBottom: 10,
    paddingRight: 6,
    flexDirection: "row",
  },

  sectionCol2: {
    flexDirection: "col",
    marginLeft: 16,
  },

  title: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 10,
    color: `#4D4D4D`,
    paddingBottom: 4,
    marginRight: 20,
  },

  desc: {
    fontSize: 10,
    color: `#808080`,
    marginBottom: 2,
    marginRight: 0,
  },

  textGreen: {
    color: `#35763B`,
    fontSize: 10,
    fontFamily: "Inter",
    fontWeight: 700,
    width: 40,
  },

  textYear: {
    fontFamily: "Inter",
    fontWeight: 700,
    color: `#808080`,
    fontSize: 10,
  },

  skillTag: {
    color: `#35763B`,
    fontSize: 10,
    backgroundColor: `rgba(53, 118, 59, 0.1)`,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
  },

  htmlStyle: {
    p: {
      margin: 0,
      marginBottom: 2,
      color: "#808080",
      lineHeight: 1.5,
      marginRight: 10,
    },
    ul: {
      margin: 0,
      paddingLeft: 0,
      color: "#808080",
      lineHeight: 1.5,
      marginRight: 10,
      width: "100%",
    },
    ".ql-indent-1": { marginLeft: 5 },
    ".ql-indent-2": { marginLeft: 15 },
    ".ql-indent-3": { marginLeft: 25 },
    strong: {
      fontFamily: "Inter",
      fontWeight: 700,
    },
    em: {
      fontFamily: "Inter Tight",
      fontStyle: "italic",
    },
  },

  header: {
    fontSize: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingBottom: 28,
    paddingRight: 48,
    color: "#4D4D4D",
  },

  footer: {
    position: "absolute",
    fontSize: 10,
    bottom: 20,
    left: 48,
    right: 48,
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

export default ExportActivityTemplate;
