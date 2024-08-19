import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { getElementsByTagName } from "domutils";
import { DomUtils } from "htmlparser2";
import moment from "moment";
import Head from "next/head";
import Linkk from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import Flickity from "react-flickity-component";
import { Link, animateScroll as scroll } from "react-scroll";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";
import Slider from "react-slick";

// import { LikeFillIconSvg, LikeIconSvg,ReplyIconSvg } from "../../../components/icon";
import Layout from "../../../components/migwebsite/layout";
import LayoutFormContactUs from "../../../components/migwebsite/layout-form-contact-us.js";
import {
  generateStaticAssetUrl,
  stripTags,
  timeRead,
  wordsCount,
} from "../../../lib/helper";
import en from "../../../locales/en";
import id from "../../../locales/id";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function BlogDetail({}) {
  const [form] = Form.useForm();
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : id;
  const { TextArea } = Input;
  const [minutesRead, setMinutesRead] = useState(null);
  const [detailBlog, setDetailBlog] = useState(null);
  const [dataHighlight, setDataHighlight] = useState([]);
  const [tableContent, setTableContent] = useState([]);
  const [tableContentH3, setTableContentH3] = useState([]);
  const [dataContactUs, setDataContactUs] = useState({
    company_name: null,
    company_email: null,
    name: null,
    phone_number: null,
    interested_in: null,
    message: null,
  });
  const [hideReply, setHideReply] = useState(true);
  const sliderSettingsPhone = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
  };
  const [articleList, setArticleList] = useState([]);
  const onChangereply = () => {
    setHideReply(!hideReply);
  };

  const [fullUrl, setFullUrl] = useState("http://www.google.com");
  const [halamanId, setHalamanId] = useState(false);

  useEffect(() => {
    setFullUrl(window.location.href);
    if (router.isReady) {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getArticleDetailLanding?page_path=${router.query.blog_id}`,
        {
          method: `GET`,
          // headers: {
          //   Authorization: JSON.parse(initProps),
          // },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          if (res2.success) {
            if (locale == "en") {
              setDetailBlog(res2.data[0]);
              let total =
                wordsCount(stripTags(res2.data[0].description)) +
                wordsCount(stripTags(res2.data[0].content));
              let minute = timeRead(total);
              setMinutesRead(minute);
              let parser = new DOMParser();
              const content = parser.parseFromString(
                res2.data[0].content,
                "text/html"
              );
              const content_data = content.querySelectorAll("h2");
              let datacontenttemp = [];
              if (content_data.length > 0) {
                for (let a = 0; a < content_data.length; a++) {
                  datacontenttemp.push(content_data[a].outerText);
                }
              }
              setTableContent(datacontenttemp);
              const content_data_h3 = content.querySelectorAll("h3");
              let datacontenttemph3 = [];
              if (content_data_h3.length > 0) {
                for (let a = 0; a < content_data_h3.length; a++) {
                  datacontenttemph3.push(content_data_h3[a].outerText);
                }
              }
              setTableContentH3(datacontenttemph3);
            } else {
              if (
                res2.data[0].title_id != "" &&
                res2.data[i].description_id != "" &&
                res2.data[i].page_path_id != "" &&
                res2.data[i].content_id != "" &&
                res2.data[i].tags_id != ""
              ) {
                setHalamanId(true);
                setDetailBlog(res2.data[0]);
                let total =
                  wordsCount(stripTags(res2.data[0].description_id)) +
                  wordsCount(stripTags(res2.data[0].content_id));
                let minute = timeRead(total);
                setMinutesRead(minute);
                let parser = new DOMParser();
                const content = parser.parseFromString(
                  res2.data[0].content_id,
                  "text/html"
                );
                const content_data = content.querySelectorAll("h2");
                let datacontenttemp = [];
                if (content_data.length > 0) {
                  for (let a = 0; a < content_data.length; a++) {
                    datacontenttemp.push(content_data[a].outerText);
                  }
                }
                setTableContent(datacontenttemp);
                const content_data_h3 = content.querySelectorAll("h3");
                let datacontenttemph3 = [];
                if (content_data_h3.length > 0) {
                  for (let a = 0; a < content_data_h3.length; a++) {
                    datacontenttemph3.push(content_data_h3[a].outerText);
                  }
                }
                setTableContentH3(datacontenttemph3);
              } else {
                setHalamanId(false);
                alert("Halaman ID tidak tersedia untuk testimoni ini");
                setDetailBlog(res2.data[0]);
                let total =
                  wordsCount(stripTags(res2.data[0].description)) +
                  wordsCount(stripTags(res2.data[0].content));
                let minute = timeRead(total);
                setMinutesRead(minute);
              }
            }
          } else {
          }
        })
        .catch((err) => {})
        .finally(() => {});
      getOtherArticle();
    }
  }, [router]);

  const loadContent = (content) => {
    return (
      <div
        className=""
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    );
  };
  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(window.location.toString());
    alert("URL is copied");
  };

  const getOtherArticle = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getArticlePopularList`, {
      method: `GET`,
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          if (locale == "en") {
            let dataTemp = [];
            for (let i = 0; i < res2.data.length; i++) {
              if (res2.data[i].page_path != router.query.blog_id) {
                dataTemp.push(res2.data[i]);
              }
            }
            setArticleList(dataTemp);
          } else {
            let dataTemp = [];
            for (let i = 0; i < res2.data.length; i++) {
              if (
                res2.data[i].title_id != "" &&
                res2.data[i].description_id != "" &&
                res2.data[i].page_path_id != "" &&
                res2.data[i].content_id != "" &&
                res2.data[i].tags_id != "" &&
                res2.data[i].page_path_id != router.query.blog_id
              ) {
                dataTemp.push(res2.data[i]);
              }
            }
            setArticleList(dataTemp);
          }
        } else {
        }
      })
      .catch((err) => {})
      .finally(() => {
        // setLoadingEmployees(false);
      });
  };

  return (
    <Layout>
      {/* <section className={'container mx-auto'}> */}
      <Head>
        <title>Blog Detail</title>
      </Head>
      <section
        className={
          articleList.length > 0
            ? "section1landingpage hidden lg:block px-4 lg:px-[112px] pt-8 lg:pt-16 pb-10 lg:pb-[74px]"
            : "section1landingpage hidden lg:block px-4 lg:px-[112px] pt-8 lg:pt-16 pb-10 lg:pb-[174px]"
        }
      >
        <div className={"w-5/6"}>
          <p
            className={
              "text-2xl lg:text-[32px] text-blackmig font-gilroysemibold"
            }
          >
            {locale == "en" && detailBlog
              ? detailBlog.title
              : locale == "id" && detailBlog && halamanId
              ? detailBlog.title_id
              : locale == "id" && detailBlog && halamanId == false
              ? detailBlog.title
              : ""}
          </p>
          <div className={"flex flex-row justify-between my-[17px]"}>
            <p className={"text-xs text-darkgrey"}>
              {locale == "en" ? "by " : "oleh "}
              <span className={"font-bold"}>
                {detailBlog
                  ? detailBlog.author
                    ? detailBlog.author
                    : "Admin"
                  : "Admin"}{" "}
              </span>
              {locale == "en" ? "on " : "pada "}
              <span className={"font-bold"}>
                {detailBlog &&
                  moment(detailBlog.created_at).format("DD MMMM YYYY")}
              </span>
            </p>
            <p className={"text-sm text-darkgrey font-gilroyregular"}>
              {minutesRead} MINUTE READ
            </p>
          </div>
        </div>
        <div className={"flex flex-row py-2"}>
          <div className={"w-5/6"}>
            {detailBlog && detailBlog.attachment_article ? (
              <img
                src={generateStaticAssetUrl(detailBlog.attachment_article.link)}
                className={"w-full h-full"}
                alt=""
              />
            ) : (
              <img src="/image/blog.png" className={"w-full h-full"} alt="" />
            )}
          </div>
          <div
            className={
              "w-1/6 items-center grid justify-items-center self-center"
            }
          >
            <p
              className={
                "text-sm text-darkgrey lg:text-base font-gilroysemibold"
              }
            >
              {locale == "en" ? "Share" : "Bagikan"}
            </p>
            <EmailShareButton
              url={fullUrl} //eg. https://www.example.com
              quotes={"halo"} //"Your Quotes"
              hashtag={"#oke"}
            >
              <img
                src="/image/message-circle.png"
                className={"my-4"}
                style={{ width: "42px", height: "42px" }}
                alt=""
              />
            </EmailShareButton>
            <FacebookShareButton
              url={fullUrl} //eg. https://www.example.com
              quotes={"halo"} //"Your Quotes"
              hashtag={"#oke"} // #hashTag
            >
              <img
                src="/image/facebook-circle.png"
                className={"my-4"}
                style={{ width: "42px", height: "42px" }}
                alt=""
              />
            </FacebookShareButton>

            <TwitterShareButton
              url={fullUrl} //eg. https://www.example.com
              quotes={"halo"} //"Your Quotes"
              hashtag={"#oke"} // #hashTag
            >
              <img
                src="/image/twitter-circle.png"
                className={"my-4"}
                style={{ width: "42px", height: "42px" }}
                alt=""
              />
            </TwitterShareButton>
            <img
              onClick={copyToClipboard}
              src="/image/share-link.png"
              className={"my-4 cursor-pointer"}
              style={{ width: "42px", height: "42px" }}
              alt=""
            />
          </div>
        </div>
        {/* section web article */}
        <div className={"flex flex-row mt-16"}>
          {tableContent.length > 0 || tableContentH3.length > 0 ? (
            <div className={"w-1/5"}>
              <div
                className={"bg-white p-4 rounded"}
                style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
              >
                <p className={"text-blackmig text-base font-gilroysemibold"}>
                  {locale == "en" ? "TABLE OF CONTENT" : "Tabel Konten"}
                </p>
                <div className={"border border-dividermig mt-2"}></div>
                <div className={"mt-1"}>
                  <ul className="">
                    {tableContent.map((data, index) => (
                      <li
                        className={
                          "text-blackmig text-sm font-regular font-gilroyregular"
                        }
                      >
                        {data}
                      </li>
                    ))}
                  </ul>
                  {tableContentH3.length > 0 && (
                    <ul className={"ml-12"}>
                      {tableContentH3.map((data, index) => (
                        <li
                          className={
                            "text-blackmig text-sm font-regular font-gilroyregular"
                          }
                        >
                          {data}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <div className={"w-3/5 ml-12"}>
            {locale == "en" && detailBlog ? (
              loadContent(detailBlog.description)
            ) : locale == "id" && detailBlog && halamanId ? (
              loadContent(detailBlog.description_id)
            ) : locale == "id" && detailBlog && halamanId == false ? (
              loadContent(detailBlog.description)
            ) : (
              <div></div>
            )}
            <div className={" pt-4"}>
              {locale == "en" && detailBlog ? (
                loadContent(detailBlog.content)
              ) : locale == "id" && detailBlog && halamanId ? (
                loadContent(detailBlog.content_id)
              ) : locale == "id" && detailBlog && halamanId == false ? (
                loadContent(detailBlog.content)
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section
        className={
          "section1articlepagephone block lg:hidden pt-6 mt-8 lg:mt-6 px-4 sm:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
      >
        <div className={"px-2 py-2"}>
          <p
            className={"text-2xl lg:text-3xl text-blackmig font-gilroysemibold"}
          >
            {locale == "en" && detailBlog
              ? detailBlog.title
              : locale == "id" && detailBlog && halamanId
              ? detailBlog.title_id
              : locale == "id" && detailBlog && halamanId == false
              ? detailBlog.title
              : ""}
          </p>
          <p className={"text-xs text-blackmig font-gilroyregular mt-3 mb-4"}>
            {locale == "en" ? "by " : "oleh "}
            <span className={"font-gilroysemibold"}>
              {detailBlog
                ? detailBlog.author
                  ? detailBlog.author
                  : "Admin"
                : "Admin"}{" "}
            </span>
            {locale == "en" ? "on " : "pada "}
            <span className={"font-gilroysemibold"}>
              {moment(detailBlog?.created_at).format("DD MMMM YYYY")}
            </span>
          </p>
          {detailBlog && detailBlog.attachment_article ? (
            <img
              src={generateStaticAssetUrl(detailBlog.attachment_article.link)}
              className={"w-full h-full rounded-lg"}
              alt=""
            />
          ) : (
            <img
              src="/image/blog.png"
              className={"w-full h-full rounded-lg"}
              alt=""
            />
          )}
        </div>
        <div className={"py-4 flex flex-row justify-between px-2"}>
          <div className={"flex flex-row justify-around"}>
            <p
              className={
                "text-xs text-darkgrey lg:text-base font-gilroysemibold self-center"
              }
            >
              Share
            </p>
            <EmailShareButton
              url={fullUrl} //eg. https://www.example.com
              quotes={"halo"} //"Your Quotes"
              hashtag={"#oke"} // #hashTag
            >
              <img
                src="/image/message-circle.png"
                className={"ml-2"}
                style={{ width: "36px", height: "36px" }}
                alt=""
              />
            </EmailShareButton>
            <FacebookShareButton
              url={fullUrl} //eg. https://www.example.com
              quotes={"halo"} //"Your Quotes"
              hashtag={"#oke"} // #hashTag
            >
              <img
                src="/image/facebook-circle.png"
                className={"ml-2"}
                style={{ width: "36px", height: "36px" }}
                alt=""
              />
            </FacebookShareButton>
            <TwitterShareButton
              url={fullUrl} //eg. https://www.example.com
              quotes={"halo"} //"Your Quotes"
              hashtag={"#oke"} // #hashTag
            >
              <img
                src="/image/twitter-circle.png"
                className={"ml-2"}
                style={{ width: "36px", height: "36px" }}
                alt=""
              />
            </TwitterShareButton>
            <img
              onClick={copyToClipboard}
              src="/image/share-link.png"
              className={"ml-2 cursor-pointer"}
              style={{ width: "42px", height: "42px" }}
              alt=""
            />
          </div>
          <div className={"self-center"}>
            <p className={"text-xs text-darkgrey font-gilroyregular"}>
              {minutesRead} MINUTE READ
            </p>
          </div>
        </div>
      </section>
      <section className={"section2articlepage block lg:hidden px-5 py-6"}>
        {tableContent.length > 0 || tableContentH3.length > 0 ? (
          <div
            className={"bg-table p-4 w-full rounded-lg"}
            style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
          >
            <p className={"text-blackmig text-base font-gilroysemibold"}>
              {locale == "en" ? "TABLE OF CONTENT" : "Tabel Konten"}
            </p>
            <div className={"mt-2 border border-dividermig"}></div>
            <div className={"mt-2"}>
              <ul className="list-disc">
                {tableContent.map((data, index) => (
                  <li className={"text-blackmig text-sm font-gilroyregular"}>
                    {data}
                  </li>
                ))}
              </ul>
              {tableContentH3.length > 0 && (
                <ul className={"ml-12"}>
                  {tableContentH3.map((data, index) => (
                    <li className={"text-blackmig text-sm font-gilroyregular"}>
                      {data}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <div className={"px-2 mt-6"}>
          {locale == "en" && detailBlog ? (
            loadContent(detailBlog.description)
          ) : locale == "id" && detailBlog ? (
            loadContent(detailBlog.description_id)
          ) : (
            <div></div>
          )}
          <div className={" pt-4"}>
            {locale == "en" && detailBlog ? (
              loadContent(detailBlog.content)
            ) : locale == "id" && detailBlog ? (
              loadContent(detailBlog.content_id)
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </section>
      {/* <section
        className={
          "section3clientpagephone m-4 block md:hidden md:relative mt-6 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
      >
        <div className={"bg-white p-2 text-center shadow-lg"}>
          <p className={"text-primarygreen text-xs font-gilroysemibold my-4"}>
            Our Client
          </p>
          <div className={"grid justify-items-center"}>
            <img
              src="/image/landingpage/testimonial-client.png"
              style={{ width: "50px", height: "42px" }}
              alt=""
            />
          </div>
          <p className={"text-blackmig text-sm Gilroy-bold font-bold"}>
            KB Bukopin, Tbk.
          </p>
          <div className={"px-2 flex flex-row justify-between"}>
            <div className="bg-greenTrans20 px-4 rounded-[20px] mt-2">
              <p className="text-sm text-primarygreen font-gilroysemibold ">
                Industry :
                <span
                  style={{
                    fontWeight: "regular",
                    marginLeft: "5px",
                  }}
                >
                  Banking
                </span>
              </p>
            </div>
            <div className="bg-lightblue px-4 rounded-[20px] mt-2">
              <p className="text-sm text-primarygreen font-gilroysemibold ">
                Service:
                <span
                  style={{
                    fontWeight: "regular",
                    marginLeft: "5px",
                  }}
                >
                  Hardware, Talents
                </span>
              </p>
            </div>
          </div>
          <div className={"mt-6 grid justify-items-center"}>
            <Linkk href="/hardware">
              <button
                className={
                  "text-base text-center -mt-10 text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 md:px-4 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black bg-white"
                }
              >
                <div className={"flex flex-row justify-between"}>
                  <p className={"px-1"}>See Our Products</p>
                  <img
                    className={"py-1 px-1"}
                    style={{ width: "15px" }}
                    src="/image/landingpage/arrow-forward.png"
                  />
                </div>
              </button>
            </Linkk>
          </div>
          <Linkk href="/contactus">
            <p className={"text-blackmig text-sm font-gilroyregular my-4"}>
              or{" "}
              <span className={"text-primarygreen"}>
                contact our sales team
              </span>
            </p>
          </Linkk>
        </div>
      </section> */}
      {articleList.length > 0 && (
        <section
          className={
            "section2blog hidden lg:block lg:pt-[25px] lg:px-[112px] lg:pb-[150px] bg-bgjoinmig "
          }
        >
          <div className={"flex flex-row justify-between"}>
            <p className={"text-base lg:text-xl gilroy-bold text-primarygreen"}>
              {locale == "en" ? "Read Other Articles" : "Baca Artikel Lain"}
            </p>
            <Linkk href={`/blog`} legacyBehavior>
              <p
                className={
                  "text-base pr-10 lg:text-base gilroy-bold text-darkgreen"
                }
              >
                {locale == "en" ? "See More" : "Lihat semua"}
              </p>
            </Linkk>
          </div>
          <div className={"grid lg:grid-cols-4 gap-4  mt-[25px]"}>
            {articleList &&
              articleList.map((data1) => (
                <div className={"mx-2 bg-white w-full rounded-lg p-4"}>
                  {data1.attachment_article ? (
                    <img
                      className={"w-full h-[184px] rounded-lg"}
                      src={generateStaticAssetUrl(
                        data1.attachment_article.link
                      )}
                    />
                  ) : (
                    <img
                      className={"w-full h-[184px] rounded-lg"}
                      src="/image/blog.png"
                    />
                  )}
                  <div className={"mt-3"}>
                    <p className={"text-xs text-darkgrey"}>
                      {locale == "en" ? "by " : "oleh "}
                      <span className={"font-bold"}>
                        {data1.author ? data1.author : "Admin"}{" "}
                      </span>
                      {locale == "en" ? "on " : "pada "}
                      <span className={"font-bold"}>
                        {moment(data1.created_at).format("DD MMMM YYYY")}
                      </span>
                    </p>
                    <p className={"font-bold text-blackmig text-base mt-3"}>
                      {locale == "en" ? data1.title : data1.title_id}
                    </p>
                    <p
                      className={
                        " text-blackmig font-gilroyregular text-xs mt-1.5"
                      }
                    >
                      {stripTags(
                        locale == "en"
                          ? data1.description
                          : data1.description_id
                      )}
                    </p>
                    <span className="text-xs mt-4 font-gilroyregular text-primarygreen bg-greenTrans20 mr-2 px-2 py-1 rounded-[20px]">
                      {data1.tags}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}
      {articleList.length > 0 && (
        <section className={"section2blog block lg:hidden p-4 bg-bgjoinmig "}>
          <p
            className={
              "text-base lg:text-xl font-gilroybold text-primarygreen px-4"
            }
          >
            {locale == "en" ? "Read Other Articles" : "Baca Artikel Lain"}
          </p>
          <Slider {...sliderSettingsPhone}>
            {articleList.map((dataarticle) => (
              <Linkk href={`/blog/${dataarticle.page_path}`} legacyBehavior>
                <div
                  className={"flex flex-row bg-white mt-3 p-4 rounded-lg"}
                  style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
                >
                  {dataarticle.attachment_article ? (
                    <img
                      className={""}
                      style={{ width: "103px", height: "131px" }}
                      src={generateStaticAssetUrl(
                        dataarticle.attachment_article.link
                      )}
                    />
                  ) : (
                    <img
                      className={""}
                      style={{ width: "103px", height: "131px" }}
                      src="/image/blog.png"
                    />
                  )}
                  <div className={"pl-4"}>
                    <p
                      className={
                        "text-[10px] text-darkgrey font-gilroysemibold"
                      }
                    >
                      {moment(dataarticle.created_at).format("DD MMMM YYYY")}
                    </p>
                    <p className={"font-gilroybold text-blackmig text-sm mt-1"}>
                      {locale == "en"
                        ? dataarticle.title
                        : dataarticle.title_id}
                    </p>
                    <p
                      className={
                        " text-blackmig font-gilroyregular text-xs mt-1"
                      }
                    >
                      {stripTags(
                        locale == "en"
                          ? dataarticle.description
                          : dataarticle.description_id
                      )}
                    </p>
                    <span className="text-xs mt-1 font-gilroyregular text-primarygreen bg-greenTrans20 px-2 py-1 rounded-[20px]">
                      {locale == "en" ? dataarticle.tags : dataarticle.tags_id}
                    </span>
                  </div>
                </div>
              </Linkk>
            ))}
          </Slider>
        </section>
      )}
      {/* <section className={"sectioncomments md:relative py-4 px-6 md:p-20"}>
        <p className={"text-blackmig text-base md:text-xl font-gilroysemibold"}>
          Comments (6)
        </p>
        <p className={"text-redmig text-sm font-gilroyregular mt-4"}>
          * <span className={"text-blackmig"}>Comment</span>
        </p>
        <div className={"py-2"}>
          <Form id="formcontact" layout={"vertical"} form={form}>
            <TextArea
              rows={4}
              placeholder="Tell us about your thoughts"
              onChange={(e) => {
                setDataContactUs({
                  ...dataContactUs,
                  company_name: e.target.value,
                });
              }}
            />
            <div className="mt-4">
              <Input
                size="large"
                placeholder="Name"
                onChange={(e) => {
                  setDataContactUs({
                    ...dataContactUs,
                    company_name: e.target.value,
                  });
                }}
                prefix={
                  <img
                    src="/image/person.png"
                    className={"w-[24px] h-[24px]"}
                  />
                }
              />
            </div>
            <div className="mt-4">
              <Input
                size="large"
                className={"border-sm"}
                placeholder="Email"
                onChange={(e) => {
                  setDataContactUs({
                    ...dataContactUs,
                    company_name: e.target.value,
                  });
                }}
                prefix={
                  <img src="/image/email.png" className={"w-[24px] h-[24px]"} />
                }
              />
            </div>
            <div className="mt-4">
              <Form.Item
                name="checkbox"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error("Should accept agreement")),
                  },
                ]}
              >
                <Checkbox name="checkbox">
                  Save my name and email for the next time I comment
                </Checkbox>
              </Form.Item>
            </div>
            <Form.Item>
              <div className={"w-full flex justify-start"}>
                <button
                  type={"submit"}
                  className={
                    "text-sm text-center text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 md:px-4 mt-4 rounded bg-white"
                  }
                >
                  <p className={"px-1 text-base font-gilroysemibold"}>Share</p>
                </button>
              </div>
            </Form.Item>
          </Form>
        </div>
        <div className={"mt-6 border border-dividermig"}></div>
        <div className="mt-8 p-4 md:px-4 md:pt-4 md:pb-[19px] border-2 border-bordermig rounded-lg">
          <p className={"text-sm text-blackmig font-gilroysemibold"}>
            Mayfa Shadrina
          </p>
          <p className={"text-xs text-darkgrey pt-1 font-gilroyregular"}>
            Feb 21, 2022 on 13:59 WIB
          </p>
          <p className={"text-sm text-blackmig pt-4 font-gilroyregular"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className={"w-32 flex flex-row justify-between mt-2"}>
            <a href="#">
              <p className={"text-primarygreen text-xs font-gilroysemibold"}>
                Reply
              </p>
            </a>
            <div className="flex flex-row justify-around items-center">
              <img
                src="/image/Icon-like.png"
                style={{ width: "16px", height: "13px" }}
                alt=""
              />
              <p className="text-xs text-lightgrey font-gilroysemibold ml-2">
                3 Likes
              </p>
            </div>
          </div>
          <div className={"mt-4"}>
            <img
              src="/image/icon-reply.png"
              style={{ width: "27px", height: "23px" }}
              alt=""
            />
          </div>
          <div className={"ml-10 -mt-2"}>
            <p className={"text-sm text-blackmig font-gilroysemibold"}>
              Mayfa Shadrina
            </p>
            <p className={"text-xs text-darkgrey pt-1 font-gilroyregular"}>
              Feb 21, 2022 on 13:59 WIB
            </p>
            <p className={"text-sm text-blackmig pt-4 font-gilroyregular"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div className={"w-32 flex flex-row justify-between mt-2"}>
              <a href="#">
                <p className={"text-primarygreen text-xs font-gilroysemibold"}>
                  Reply
                </p>
              </a>
              <div className="flex flex-row justify-around items-center">
                <img
                  src="/image/Icon-like-fill.png"
                  style={{ width: "16px", height: "13px" }}
                  alt=""
                />
                <p className="text-xs text-lightgrey font-gilroysemibold ml-2">
                  3 Likes
                </p>
              </div>
            </div>
          </div>
          {hideReply ? (
            <button
              className={"mt-8 flex flex-row items-center bg-white"}
              onClick={onChangereply}
            >
              <img
                src="/image/icon-collapsible-close.png"
                style={{ width: "5px", height: "10px" }}
                alt=""
              />
              <div className={"ml-4"}>
                <p className={"text-xs font-gilroysemibold text-primarygreen"}>
                  See other 4 replies
                </p>
              </div>
            </button>
          ) : (
            <button
              className={"mt-8 flex flex-row items-center bg-white"}
              onClick={onChangereply}
            >
              <img
                src="/image/icon-collapsible-open.png"
                style={{ width: "10px", height: "5px" }}
                alt=""
              />
              <div className={"ml-4"}>
                <p className={"text-xs font-gilroysemibold text-primarygreen"}>
                  Hide other 4 replies
                </p>
              </div>
            </button>
          )}
          {hideReply == false && (
            <div>
              <div className={"ml-10 mt-4"}>
                <p className={"text-sm text-blackmig font-gilroysemibold"}>
                  Mayfa Shadrina
                </p>
                <p className={"text-xs text-darkgrey pt-1 font-gilroyregular"}>
                  Feb 21, 2022 on 13:59 WIB
                </p>
                <p className={"text-sm text-blackmig pt-4 font-gilroyregular"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <div className={"w-32 flex flex-row justify-between mt-2"}>
                  <a href="#">
                    <p
                      className={
                        "text-primarygreen text-xs font-gilroysemibold"
                      }
                    >
                      Reply
                    </p>
                  </a>
                  <div className="flex flex-row justify-around items-center">
                    <img
                      src="/image/Icon-like-fill.png"
                      style={{ width: "16px", height: "13px" }}
                      alt=""
                    />
                    <p className="text-xs text-lightgrey font-gilroysemibold ml-2">
                      3 Likes
                    </p>
                  </div>
                </div>
              </div>
              <div className={"ml-10 mt-4"}>
                <p className={"text-sm text-blackmig font-gilroysemibold"}>
                  Mayfa Shadrina
                </p>
                <p className={"text-xs text-darkgrey pt-1 font-gilroyregular"}>
                  Feb 21, 2022 on 13:59 WIB
                </p>
                <p className={"text-sm text-blackmig pt-4 font-gilroyregular"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <div className={"w-32 flex flex-row justify-between mt-2"}>
                  <a href="#">
                    <p
                      className={
                        "text-primarygreen text-xs font-gilroysemibold"
                      }
                    >
                      Reply
                    </p>
                  </a>
                  <div className="flex flex-row justify-around items-center">
                    <img
                      src="/image/Icon-like-fill.png"
                      style={{ width: "16px", height: "13px" }}
                      alt=""
                    />
                    <p className="text-xs text-lightgrey font-gilroysemibold ml-2">
                      3 Likes
                    </p>
                  </div>
                </div>
              </div>
              <div className={"ml-10 mt-4"}>
                <p className={"text-sm text-blackmig font-gilroysemibold"}>
                  Mayfa Shadrina
                </p>
                <p className={"text-xs text-darkgrey pt-1 font-gilroyregular"}>
                  Feb 21, 2022 on 13:59 WIB
                </p>
                <p className={"text-sm text-blackmig pt-4 font-gilroyregular"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <div className={"w-32 flex flex-row justify-between mt-2"}>
                  <a href="#">
                    <p
                      className={
                        "text-primarygreen text-xs font-gilroysemibold"
                      }
                    >
                      Reply
                    </p>
                  </a>
                  <div className="flex flex-row justify-around items-center">
                    <img
                      src="/image/Icon-like-fill.png"
                      style={{ width: "16px", height: "13px" }}
                      alt=""
                    />
                    <p className="text-xs text-lightgrey font-gilroysemibold ml-2">
                      3 Likes
                    </p>
                  </div>
                </div>
              </div>
              <div className={"ml-10 mt-4"}>
                <p className={"text-sm text-blackmig font-gilroysemibold"}>
                  Mayfa Shadrina
                </p>
                <p className={"text-xs text-darkgrey pt-1 font-gilroyregular"}>
                  Feb 21, 2022 on 13:59 WIB
                </p>
                <p className={"text-sm text-blackmig pt-4 font-gilroyregular"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <div className={"w-32 flex flex-row justify-between mt-2"}>
                  <a href="#">
                    <p
                      className={
                        "text-primarygreen text-xs font-gilroysemibold"
                      }
                    >
                      Reply
                    </p>
                  </a>
                  <div className="flex flex-row justify-around items-center">
                    <img
                      src="/image/Icon-like-fill.png"
                      style={{ width: "16px", height: "13px" }}
                      alt=""
                    />
                    <p className="text-xs text-lightgrey font-gilroysemibold ml-2">
                      3 Likes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section> */}
      <section
        className={
          "youronestop hidden lg:block lg:flex lg:flex-row lg:justify-between bg-bgfooter pt-[31px] h-[173px]"
        }
      >
        <div className={"justify-start self-end"}>
          <img
            style={{ width: "332px", height: "142px" }}
            src="/image/landingpage/footer-left.png"
          />
        </div>
        <div className={"container w-1/2 mx-auto"}>
          <div
            className={
              "bg-white border-3 mx-auto w-[645px] border-solid shadow-2xl rounded-lg text-center -mt-[144px] py-[31.38px]  px-[31.38px]"
            }
          >
            <h2
              style={{ lineHeight: "120%" }}
              className={"text-[28px] font-gilroysemibold text-black"}
            >
              {t.contactussectiontitle}
            </h2>
            <div
              className={
                "mt-3.5 text-xl font-gilroyregular text-center text-black"
              }
            >
              <p style={{ lineHeight: "120%" }}>
                {t.contactussectionsubtitle1}
              </p>
              <p style={{ lineHeight: "120%" }}>
                {t.contactussectionsubtitle2}
              </p>
            </div>
            <div className="mt-3.5 flex flex-row justify-center">
              <div className={"mr-3.5"}>
                <Linkk href="/contactus" legacyBehavior>
                  <button
                    className={
                      "text-sm px-4 py-2 text-white border-2 rounded bg-primarygreen border-primarygreen"
                    }
                  >
                    <p className={"text-xl font-gilroysemibold"}>
                      {t.ctacontactuslandingpage}
                    </p>
                  </button>
                </Linkk>
              </div>
              <div>
                <Linkk href="/aboutus" legacyBehavior>
                  <button
                    className={
                      "text-sm px-4 py-2 text-primarygreen border-2 rounded bg-white border-primarygreen"
                    }
                  >
                    <p className={"text-xl font-gilroysemibold"}>
                      {t.ctalearnmorelandingpage}
                    </p>
                  </button>
                </Linkk>
              </div>
            </div>
          </div>
        </div>
        <div className={"justify-end  self-end"}>
          <img
            className={"w-[332px] h-[142px]"}
            src="/image/landingpage/footer-right.png"
          />
        </div>
      </section>
      <section
        className={"contactusphone mt-[140px] block lg:hidden bg-bgfooter pt-8"}
      >
        <div className={"container mx-auto"}>
          <div
            className={
              "bg-white border-3 border-solid shadow-2xl rounded-[8px] text-center mx-5  -mt-24 py-4 px-8"
            }
          >
            <p className={"text-xl font-gilroysemibold"}>
              {t.contactussectiontitle}
            </p>
            <p className={" text-sm font-gilroyregular"}>
              {t.contactussectionsubtitle1}
            </p>
            <p className={"text-sm font-gilroyregular"}>
              {t.contactussectionsubtitle2}
            </p>
            <div className="mt-4 flex flex-row justify-center">
              <div className={"mr-1.5"}>
                <Linkk href="/contactus" legacyBehavior>
                  <button
                    className={
                      "text-sm px-4 py-2 text-white border-2 rounded bg-primarygreen border-primarygreen"
                    }
                  >
                    <p className={"text-xl font-gilroysemibold"}>
                      {t.ctacontactuslandingpage}
                    </p>
                  </button>
                </Linkk>
              </div>
              <div>
                <Linkk href="/aboutus" legacyBehavior>
                  <button
                    className={
                      "text-sm px-4 py-2 text-primarygreen border-2 rounded bg-white border-primarygreen"
                    }
                  >
                    <p className={"text-xl font-gilroysemibold"}>
                      {t.ctalearnmorelandingpage}
                    </p>
                  </button>
                </Linkk>
              </div>
            </div>
          </div>
        </div>
        <div className={"flex justify-between self-end mt-[7.61px]"}>
          <img
            style={{ width: "160px", height: "69px" }}
            src="/image/landingpage/footer-left.png"
          />
          <img
            style={{ width: "160px", height: "69px" }}
            src="/image/landingpage/footer-right.png"
          />
        </div>
      </section>
    </Layout>
  );
}

export default BlogDetail;
