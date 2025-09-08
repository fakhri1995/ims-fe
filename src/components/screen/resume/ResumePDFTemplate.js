import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";
import Html from "react-pdf-html";

import {
  generateStaticAssetUrl,
  momentFormatDate,
  nameResume,
} from "../../../lib/helper";

const ResumePDFTemplate = ({ dataResume, logoStatus = true }) => {
  const isAllResultEmpty = dataResume?.assessment_results?.every(
    (result) => result?.value === ""
  );

  function breakText(text) {
    return [text];
  }

  // Only show initials if full name is more than 2 words
  const getFormattedCandidateName = (namaLengkap) => {
    const namaArray = namaLengkap.trim().toUpperCase().split(/\s+/);

    // Ambil nama depan dan kapitalisasi
    const namaDepan = namaArray[0];

    // Ambil inisial dari sisa nama dan kapitalisasi
    const inisial = namaArray
      .slice(1)
      .map((n) => n[0].toUpperCase())
      .join(" ");

    // Gabungkan hasilnya
    return `${namaDepan} ${inisial}`;
  };

  // function checkDataDescription(data) {
  //   if (data.description != undefined) {
  //     let checkDescription = parse(data.description);

  //     console.log(checkDescription);

  //     if (checkDescription?.props?.children?.length > 1) {
  //       return true;
  //     } else if (checkDescription?.props?.children?.type !== "br") {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } else return false;
  // }

  return (
    <Document>
      <Page size={"A4"} style={styles.page} wrap>
        {/* Header */}
        <View
          fixed
          render={({ pageNumber }) =>
            pageNumber !== 1 && (
              <View style={styles.header}>
                <Text
                  style={{
                    fontFamily: "Helvetica-Bold",
                    fontWeight: 700,
                    fontSize: 10,
                    color: "#808080",
                  }}
                >
                  {dataResume?.name}
                </Text>
                <Text style={{ fontSize: 10, color: "#808080" }}>
                  &nbsp;-&nbsp;
                </Text>
                <Text style={{ fontSize: 10, color: "#808080" }}>
                  {dataResume?.assessment?.name}
                </Text>
              </View>
            )
          }
        />

        {/* Name Section */}
        <View
          style={{
            paddingBottom: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: dataResume?.profile_image?.id ? "80%" : "100%",
              display: "flex",
              flexDirection: "col",
              marginRight: dataResume?.profile_image?.id ? 24 : 0,
            }}
          >
            <Text
              style={{
                fontSize: 28,
                fontFamily: "Inter",
                fontWeight: 700,
                color: `#4D4D4D`,
                borderBottomWidth: 1,
                borderColor: `1px solid #4D4D4D`,
                paddingBottom: 16,
                marginBottom: 16,
              }}
            >
              {getFormattedCandidateName(dataResume?.name)}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 12, height: 12 }}
                src={`/image/userIcon.png`}
              />
              <Text style={{ fontSize: 12, color: `#4D4D4D`, marginLeft: 10 }}>
                {dataResume?.assessment?.name}
              </Text>
            </View>
          </View>
          {Boolean(dataResume?.profile_image?.id) && (
            <View
              style={{
                width: 93,
                border: `1px solid #4D4D4D`,
                objectFit: "cover",
                padding: 4,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image
                style={{
                  width: 80,
                  height: 105,
                }}
                src={`${generateStaticAssetUrl(
                  dataResume?.profile_image?.link
                )}?rnd="${Math.random()}`}
              />
            </View>
          )}
        </View>

        {/*Summary Section */}
        {Boolean(dataResume?.summaries) && (
          <View style={{ ...styles.rowOneCol, paddingBottom: 30 }}>
            <Text style={styles.sectionHeader}>SUMMARY</Text>
            <View style={{}}>
              <Html
                // hyphenationCallback={e => breakText(e)}
                style={styles.desc}
                stylesheet={styles.htmlStyle}
              >
                {dataResume?.summaries?.description}
              </Html>
            </View>
          </View>
        )}
        {/* Body */}
        {/* EXPERIENCE SECTION */}
        {dataResume?.experiences?.length !== 0 && (
          <View style={{ ...styles.rowOneCol, paddingBottom: 30 }}>
            <Text style={styles.sectionHeader}>EXPERIENCE</Text>
            {dataResume?.experiences?.map((exp, idx) => (
              <View style={styles.sectionBlock1} key={exp?.id}>
                <View style={{ flexDirection: "column" }}>
                  <Image
                    style={{ width: 10, height: 10, padding: 1, marginTop: 2 }}
                    src={`/image/circleResume.png`}
                  />
                </View>
                <View style={{ flexDirection: "col", marginHorizontal: 15 }}>
                  <Text
                    style={styles.title}
                    hyphenationCallback={(e) => breakText(e)}
                  >
                    {exp?.role}
                  </Text>
                  <View
                    style={{
                      ...styles.desc,
                      flexDirection: "row",
                      paddingBottom: 2,
                    }}
                  >
                    <Text>{exp?.company} ·&nbsp;</Text>
                    <Text style={styles.textYear}>
                      {momentFormatDate(exp?.start_date, "", "MMM YYYY")}
                      {Boolean(exp?.start_date) && " - "}
                      {momentFormatDate(exp?.end_date, "present", "MMM YYYY")}
                    </Text>
                  </View>
                  <Html
                    // hyphenationCallback={e => breakText(e)}
                    style={styles.desc}
                    stylesheet={styles.htmlStyle}
                  >
                    {exp?.description}
                  </Html>
                </View>
              </View>
            ))}
          </View>
        )}
        <View style={styles.rowTwoCol} wrap={false}>
          {/* ACADEMIC SECTION */}
          {dataResume?.educations?.length !== 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>ACADEMIC HISTORY</Text>
              {dataResume?.educations?.map((edu, idx) => (
                <View style={styles.sectionBlock1} key={edu?.id}>
                  <View style={{ flexDirection: "column" }}>
                    <Image
                      style={{
                        width: 10,
                        height: 10,
                        padding: 1,
                        marginTop: 2,
                      }}
                      src={`/image/circleResume.png`}
                    />
                  </View>

                  <View style={{ flexDirection: "col", marginLeft: 15 }}>
                    <Text
                      style={styles.title}
                      hyphenationCallback={(e) => breakText(e)}
                    >
                      {edu?.university}
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        paddingBottom: 4,
                        ...styles.desc,
                      }}
                    >
                      <Text hyphenationCallback={(e) => breakText(e)}>
                        {edu?.major || "-"}
                      </Text>
                      {(edu?.start_date || edu?.end_date) && (
                        <View style={{ flexDirection: "row" }}>
                          <Text style={{ marginHorizontal: "4px" }}>·</Text>
                          <Text style={styles.textYear}>
                            {momentFormatDate(edu?.start_date, "", "MMM YYYY")}
                            {Boolean(edu?.start_date) && " - "}
                            {momentFormatDate(
                              edu?.end_date,
                              "present",
                              "MMM YYYY"
                            )}
                          </Text>
                        </View>
                      )}
                    </View>
                    {Boolean(edu?.gpa) && (
                      <Text style={styles.desc}>GPA {edu?.gpa}</Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* SKILL SECTION */}
          {dataResume?.skills?.length !== 0 && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionHeader}>SKILLS</Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {dataResume?.skills?.map((skill) => (
                  <View style={styles.skillTag} key={skill?.id}>
                    <Text>{skill?.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* PROJECT SECTION */}
        {dataResume?.projects?.length !== 0 && (
          <View
            style={styles.rowOneCol}
            // debug
            // wrap={false}
          >
            <Text style={styles.sectionHeader}>PROJECTS</Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {dataResume?.projects?.map((proj) => (
                <View
                  style={{
                    width: "45%",
                    ...styles.sectionBlock2,
                  }}
                  key={proj?.id}
                  wrap={false}
                >
                  <Text style={styles.textGreen}>
                    {proj?.year ? proj?.year.slice(0, 4) : "-"}
                  </Text>
                  <View style={styles.sectionCol2}>
                    <Text
                      style={styles.title}
                      hyphenationCallback={(e) => breakText(e)}
                    >
                      {proj?.name}
                    </Text>
                    <Html
                      // hyphenationCallback={e => breakText(e)}
                      style={styles.desc}
                      stylesheet={styles.htmlStyle}
                    >
                      {proj?.description}
                    </Html>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        <View
          style={{
            ...styles.rowTwoCol,
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {/* TRAINING SECTION */}
          {dataResume?.trainings?.length !== 0 && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionHeader}>TRAINING</Text>
              {dataResume?.trainings?.map((train) => (
                <View style={styles.sectionBlock2} key={train?.id}>
                  <Text style={styles.textGreen}>
                    {train?.year ? train?.year.slice(0, 4) : "-"}
                  </Text>
                  <View style={styles.sectionCol2}>
                    <Text
                      style={styles.title}
                      hyphenationCallback={(e) => breakText(e)}
                    >
                      {train?.name}
                    </Text>
                    <Text
                      style={styles.desc}
                      hyphenationCallback={(e) => breakText(e)}
                    >
                      {train?.organizer}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* CERTIFICATION SECTION */}
          {dataResume?.certificates?.length !== 0 && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionHeader}>CERTIFICATIONS</Text>
              {dataResume?.certificates?.map((cert) => (
                <View style={styles.sectionBlock2} key={cert?.id}>
                  <Text style={styles.textGreen}>
                    {cert?.year ? cert?.year.slice(0, 4) : "-"}
                  </Text>
                  <View style={styles.sectionCol2}>
                    <Text
                      style={styles.title}
                      hyphenationCallback={(e) => breakText(e)}
                    >
                      {cert?.name}
                    </Text>
                    <Text
                      style={styles.desc}
                      hyphenationCallback={(e) => breakText(e)}
                    >
                      {cert?.organizer}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* ACHIEVEMENT SECTION */}
          {dataResume?.achievements?.length !== 0 && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionHeader}>ACHIEVEMENTS</Text>
              {dataResume?.achievements?.map((achiev) => (
                <View style={styles.sectionBlock2} key={achiev?.id}>
                  <Text style={styles.textGreen}>
                    {achiev?.year ? achiev?.year?.slice(0, 4) : "-"}
                  </Text>
                  <View style={styles.sectionCol2}>
                    <Text
                      style={styles.title}
                      hyphenationCallback={(e) => breakText(e)}
                    >
                      {achiev?.name}
                    </Text>
                    <Text
                      style={styles.desc}
                      hyphenationCallback={(e) => breakText(e)}
                    >
                      {achiev?.organizer}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* ASSESSMENT SECTION */}
          {isAllResultEmpty === false && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionHeader}>
                TECHNICAL ASSESSMENT{"\n"}
                RESULTS
              </Text>
              {dataResume?.assessment_results?.map(
                (result) =>
                  result?.value !== "" && (
                    <View
                      key={result?.id}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "top",
                        marginBottom: 10,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "flex-start",
                        }}
                      >
                        <Text style={{ marginRight: 10, fontSize: 10 }}>•</Text>
                        <Text
                          style={{
                            color: `#4D4D4D`,
                            fontSize: 10,
                            width: 160,
                            lineHeight: 1.5,
                          }}
                          hyphenationCallback={(e) => breakText(e)}
                        >
                          {result?.criteria}
                        </Text>
                      </View>

                      <Text style={styles.textGreen}>{result?.value}</Text>
                    </View>
                  )
              )}
            </View>
          )}
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

          {logoStatus && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                APPROVED BY:
              </Text>
              <Image
                style={{ width: 80, height: 31.86 }}
                src={`/image/LogoMig2.png`}
              />
            </View>
          )}
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
    flexDirection: "col",
    backgroundColor: "#ffffff",
    paddingTop: 30,
    paddingBottom: 88,
    paddingHorizontal: 48,
    color: "#4D4D4D",
  },

  rowOneCol: {
    paddingRight: 30,
    paddingBottom: 30,
  },

  rowTwoCol: {
    flexDirection: "row",
    justifyContent: `space-between`,
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

export default ResumePDFTemplate;
