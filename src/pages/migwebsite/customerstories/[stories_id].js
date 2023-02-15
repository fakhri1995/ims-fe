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

function CustomerStoriesDetail({}) {
  const [form] = Form.useForm();
  const WORDS_PER_MIN = 275; // wpm

  const IMAGE_READ_TIME = 12; // in seconds

  const CHINESE_KOREAN_READ_TIME = 500; // cpm

  const IMAGE_TAGS = ["img", "Image"];

  const [detailBlog, setDetailBlog] = useState(null);
  const [dataOthers, setDataOthers] = useState([]);
  const [minutesRead, setMinutesRead] = useState(null);
  const { TextArea } = Input;
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : id;
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
  const [fullUrl, setFullUrl] = useState("http://www.google.com");
  const onChangereply = () => {
    setHideReply(!hideReply);
  };

  useEffect(() => {
    setFullUrl(window.location.href);
    let page = router.query.stories_id;
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTestimonialDetail?pagepath=${page}`,
      {
        method: `GET`,
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        console.log("get data testimonial ", res2);
        if (res2.success) {
          //   setDataTestimonial(res2.data);
          if (locale == "en") {
            setDetailBlog(res2.data[0]);
            let total =
              wordsCount(stripTags(res2.data[0].description)) +
              wordsCount(stripTags(res2.data[0].content));
            let minute = timeRead(total);
            setMinutesRead(minute);
          } else {
            if (
              res2.data[0].title_id != "" &&
              res2.data[i].description_id != "" &&
              res2.data[i].page_path_id != "" &&
              res2.data[i].content_id != "" &&
              res2.data[i].tags_id != ""
            ) {
              setDetailBlog(res2.data[0]);
              let total =
                wordsCount(stripTags(res2.data[0].description_id)) +
                wordsCount(stripTags(res2.data[0].content_id));
              let minute = timeRead(total);
              setMinutesRead(minute);
            }
          }
        } else {
        }
      })
      .catch((err) => {})
      .finally(() => {
        // setLoadingEmployees(false);
      });
    getOther();
  }, [router.isReady]);

  const getOther = () => {
    let page = router.query.stories_id;
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getOtherTestimonial?pagepath=${page}`,
      {
        method: `GET`,
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        console.log("get data testimonial 2 ", res2);
        if (res2.success) {
          //   setDataTestimonial(res2.data);
          if (locale == "en") {
            let dataTemp = [];
            for (let i = 0; i < res2.data.length; i++) {
              if (res2.data[i].page_path != page) {
                dataTemp.push(res2.data[i]);
              }
            }
            setDataOthers(dataTemp);
          } else {
            let dataTemp = [];
            for (let i = 0; i < res2.data.length; i++) {
              if (
                res2.data[i].title_id != "" &&
                res2.data[i].description_id != "" &&
                res2.data[i].page_path_id != "" &&
                res2.data[i].content_id != "" &&
                res2.data[i].tags_id != "" &&
                res2.data[i].page_path_id != page
              ) {
                dataTemp.push(res2.data[i]);
              }
            }
            setDataOthers(dataTemp);
          }
        } else {
        }
      })
      .catch((err) => {})
      .finally(() => {
        // setLoadingEmployees(false);
      });
  };

  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(window.location.toString());
    alert("URL is copied");
  };

  const loadContent = (content) => {
    if (detailBlog) {
      return (
        <div
          className=""
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      );
    } else {
      <div></div>;
    }
  };

  return (
    <Layout>
      {/* <section className={'container mx-auto'}> */}
      <Head>
        <title>Customer Stories Detail</title>
      </Head>
      {console.log("query router ", router)}
      <section
        className={
          dataOthers.length > 0
            ? "section1landingpage hidden md:block px-4 md:px-[112px] pt-8 md:pt-16 pb-10 md:pb-[74px]"
            : "section1landingpage hidden md:block px-4 md:px-[112px] pt-8 md:pt-16 pb-10 md:pb-[150px]"
        }
      >
        <div className={"w-5/6"}>
          <p
            className={
              "text-2xl md:text-[32px] text-blackmig font-gilroysemibold"
            }
          >
            {locale == "en" ? detailBlog?.title : detailBlog?.title_id}
          </p>
          <div className={"flex flex-row justify-between my-[17px]"}>
            <p className={"text-xs text-darkgrey"}>
              by{" "}
              <span className={"font-bold"}>
                {detailBlog
                  ? detailBlog.author
                    ? detailBlog.author
                    : "Admin"
                  : ""}{" "}
              </span>
              on{" "}
              <span className={"font-bold"}>
                {detailBlog
                  ? moment(detailBlog.created_at).format("DD MMMM YYYY")
                  : "-"}
              </span>
            </p>
            <p className={"text-sm text-darkgrey font-gilroyregular"}>
              {minutesRead && minutesRead + " MINUTE READ"}
            </p>
          </div>
        </div>
        <div className={"flex flex-row py-2"}>
          <div className={"w-5/6"}>
            {detailBlog ? (
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
                "text-sm text-darkgrey md:text-base font-gilroysemibold"
              }
            >
              Share
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
              hashtag={"#oke"}
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
              hashtag={"#oke"}
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
          <div className={"w-1/5"}>
            <div
              className={"bg-white p-4 rounded"}
              style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
            >
              <p className={"text-blackmig text-base font-gilroysemibold"}>
                TABLE OF CONTENT
              </p>
              <div className={"border border-dividermig mt-2"}></div>
              <div className={"mt-1"}>
                <ul class="">
                  <li class={"text-primarygreen text-sm font-gilroysemibold"}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing eli.
                  </li>
                  <li
                    class={
                      "text-blackmig text-sm font-regular font-gilroyregular"
                    }
                  >
                    Sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua
                  </li>
                  <li
                    class={
                      "text-blackmig text-sm font-regular font-gilroyregular"
                    }
                  >
                    Ut enim ad minim veniam, quis nostrud exercitation.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={"w-3/5 ml-12"}>
            {locale == "en" && detailBlog ? (
              loadContent(detailBlog.description)
            ) : locale == "en" && detailBlog ? (
              loadContent(detailBlog.description_id)
            ) : (
              <div></div>
            )}
            <div className={" pt-4"}>
              {locale == "en" && detailBlog ? (
                loadContent(detailBlog.content)
              ) : locale == "en" && detailBlog ? (
                loadContent(detailBlog.content_id)
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section
        className={
          "section1articlepagephone block md:hidden pt-6 md:mt-6 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
      >
        <div className={"px-2 py-2"}>
          <p
            className={"text-2xl md:text-3xl text-blackmig font-gilroysemibold"}
          >
            {detailBlog?.title}
          </p>
          <p className={"text-xs text-blackmig font-gilroyregular mt-3 mb-4"}>
            by{" "}
            <span className={"font-gilroysemibold"}>
              {detailBlog
                ? detailBlog.author
                  ? detailBlog.author
                  : "Admin"
                : ""}{" "}
            </span>
            on{" "}
            <span className={"font-gilroysemibold"}>
              {detailBlog
                ? moment(detailBlog.created_at).format("DD MMMM YYYY")
                : "-"}
            </span>
          </p>
          <img
            src="/image/blog.png"
            className={"w-full h-full rounded-lg"}
            alt=""
          />
        </div>
        <div className={"py-4 flex flex-row justify-between px-2"}>
          <div className={"flex flex-row justify-around"}>
            <p
              className={
                "text-xs text-darkgrey md:text-base font-gilroysemibold self-center"
              }
            >
              Share
            </p>
            <EmailShareButton
              url={fullUrl} //eg. https://www.example.com
              quotes={"halo"} //"Your Quotes"
              hashtag={"#oke"}
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
              hashtag={"#oke"}
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
              hashtag={"#oke"}
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
      <section className={"section2articlepage block md:hidden px-5 py-6"}>
        <div
          className={"bg-table p-4 w-full rounded-lg"}
          style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
        >
          <p className={"text-blackmig text-base font-gilroysemibold"}>
            TABLE OF CONTENT
          </p>
          <div className={"mt-2 border border-dividermig"}></div>
          <div className={"mt-2"}>
            <ul class="list-disc">
              <li class={"text-blackmig text-sm font-gilroyregular"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing eli.
              </li>
              <li
                class={"text-blackmig text-sm font-regular font-gilroyregular"}
              >
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua
              </li>
              <li
                class={"text-blackmig text-sm font-regular font-gilroyregular"}
              >
                Ut enim ad minim veniam, quis nostrud exercitation.
              </li>
            </ul>
          </div>
        </div>
        <div className={"px-2 mt-6"}>
          {detailBlog && (
            <div
              className=""
              dangerouslySetInnerHTML={{
                __html: detailBlog.description,
              }}
            />
          )}
          <div className={" pt-4"}>
            {detailBlog && (
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html: detailBlog.content,
                }}
              />
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
      {dataOthers.length > 0 && (
        <section
          className={
            "section2blog hidden md:block md:pt-[25px] md:px-[113.5px] md:pb-[150px] bg-bgjoinmig "
          }
        >
          <div className={"flex flex-row justify-between"}>
            <p className={"text-base md:text-xl gilroy-bold text-primarygreen"}>
              Read Other Stories
            </p>
            <Linkk href={`/customerstories`}>
              <p
                className={
                  "text-base pr-10 md:text-base gilroy-bold text-darkgreen"
                }
              >
                See More
              </p>
            </Linkk>
          </div>
          <div className={"grid md:grid-cols-4 gap-4  mt-[25px]"}>
            {dataOthers
              ? dataOthers.map((dataarticle) => (
                  <Linkk href={`/customerstories/${dataarticle.page_path}`}>
                    <div
                      className={
                        "mx-2 bg-white w-full rounded-lg p-4 cursor-pointer"
                      }
                    >
                      {dataarticle.attachment_article ? (
                        <img
                          src={generateStaticAssetUrl(
                            dataarticle.attachment_article.link
                          )}
                          className={"w-full h-[184px] rounded-lg"}
                          alt=""
                        />
                      ) : (
                        <img
                          className={"w-full h-[184px] rounded-lg"}
                          src="/image/blog.png"
                        />
                      )}
                      <div className={"mt-3"}>
                        <p className={"text-xs text-darkgrey"}>
                          by{" "}
                          <span className={"font-bold"}>
                            {dataarticle.author ? dataarticle.author : "Admin "}{" "}
                          </span>
                          on{" "}
                          <span className={"font-bold"}>
                            {moment(dataarticle.createdAt).format(
                              "DD MMMM YYYY"
                            )}
                          </span>
                        </p>
                        <p className={"font-bold text-blackmig text-base mt-3"}>
                          {dataarticle.title}
                        </p>
                        <p
                          className={
                            " text-blackmig font-gilroyregular text-xs mt-1.5 h-[60px]"
                          }
                        >
                          {stripTags(dataarticle.description)}
                        </p>
                        <span class="text-xs font-gilroyregular text-primarygreen bg-greenTrans20 mr-2 px-2 py-1 rounded-[20px]">
                          {dataarticle.tags}
                        </span>
                      </div>
                    </div>
                  </Linkk>
                ))
              : ""}
          </div>
        </section>
      )}
      {dataOthers.length > 0 && (
        <section className={"section2blog block md:hidden p-4 bg-bgjoinmig "}>
          <p
            className={
              "text-base md:text-xl font-gilroybold text-primarygreen px-4"
            }
          >
            Read Other Stories
          </p>
          <Slider {...sliderSettingsPhone}>
            {dataOthers.map((dataarticle) => (
              <Linkk href={`/customerstories/${dataarticle.page_path}`}>
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
                      {moment(dataarticle.createdAt).format("DD MMMM YYYY")}
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
                      {locale == "en"
                        ? stripTags(dataarticle.description)
                        : stripTags(dataarticle.description_id)}
                    </p>
                    <span class="text-xs mt-1 font-gilroyregular text-primarygreen bg-greenTrans20 px-2 py-1 rounded-[20px]">
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
          "youronestop hidden md:block md:flex md:flex-row md:justify-between bg-bgfooter pt-[31px] h-[173px]"
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
                <Linkk href="/contactus">
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
                <Linkk href="/aboutus">
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
        className={"contactusphone mt-[140px] block md:hidden bg-bgfooter pt-8"}
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
                <Linkk href="/contactus">
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
                <Linkk href="/aboutus">
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

export default CustomerStoriesDetail;
