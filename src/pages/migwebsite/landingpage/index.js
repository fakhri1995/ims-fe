import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";
import { Card, Col, Row, Space } from "antd";
import Head from "next/head";
import Linkk from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import Flickity from "react-flickity-component";
import { Link, animateScroll as scroll } from "react-scroll";
import Slider from "react-slick";

import Layout from "../../../components/migwebsite/layout";
import useAnalyticsEventTracker from "../../../components/migwebsite/useAnalyticsEventTracker";
import { generateStaticAssetUrl } from "../../../lib/helper";
import en from "../../../locales/en";
import id from "../../../locales/id";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function LandingPage({ dataBlog }) {
  const gaEventTracker = useAnalyticsEventTracker("Landing Page");
  const rt = useRouter();
  const { locale } = rt;
  const t = locale === "en" ? en : id;
  const [dataTestimonial, setDataTestimonial] = useState([]);
  const dataImages = [
    "/image/landingpage/kb-bukopin-logo-gray.png",
    "/image/landingpage/bulog-logo-cs-gray.png",
    "/image/landingpage/setneg-logo-gray.png",
    "/image/landingpage/kb-bukopin-syariah-logo-gray.png",
    "/image/landingpage/shipper-logo-gray.png",
    "/image/landingpage/dans-logo.png",
    "/image/landingpage/kb-bukopin-logo-gray.png",
    "/image/landingpage/bulog-logo-cs-gray.png",
    "/image/landingpage/setneg-logo-gray.png",
    "/image/landingpage/kb-bukopin-syariah-logo-gray.png",
    "/image/landingpage/shipper-logo-gray.png",
    "/image/landingpage/dans-logo.png",
    "/image/landingpage/kb-bukopin-logo-gray.png",
    "/image/landingpage/bulog-logo-cs-gray.png",
    "/image/landingpage/setneg-logo-gray.png",
    "/image/landingpage/kb-bukopin-syariah-logo-gray.png",
    "/image/landingpage/shipper-logo-gray.png",
    "/image/landingpage/dans-logo.png",
    "/image/landingpage/kb-bukopin-logo-gray.png",
    "/image/landingpage/bulog-logo-cs-gray.png",
    "/image/landingpage/setneg-logo-gray.png",
    "/image/landingpage/kb-bukopin-syariah-logo-gray.png",
    "/image/landingpage/shipper-logo-gray.png",
  ];
  const flickityOptions = {
    initialIndex: 0,
    // wrapAround: 'true',
    cellAlign: "left",
    arrows: true,
    dots: true,
    infinite: true,
    slideToShow: 3,
  };
  // const [nav1, setNav1] = useState(null)
  // const [nav2, setNav2] = useState(null)
  // let slider1 = []
  // let slider2 = []
  // useEffect(() => {
  //     setNav1(slider1)
  //     setNav2(slider2)
  // }, [slider1, slider2])
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <img
          style={{ width: "16px", height: "16px" }}
          src="/image/landingpage/arrow-sm-left.png"
        />
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <img
          style={{ width: "16px", height: "16px" }}
          src="/image/landingpage/arrow-sm-left.png"
        />
      </div>
    );
  };
  const slider = React.useRef(null);
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    arrows: false,
    dots: true,
    swipeToSlide: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          dots: true,
        },
      },
    ],
  };
  const sliderSettings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
  };
  const sliderSettingsPhone = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
  };

  const getFreeConsultation = () => {
    gaEventTracker("get free consultation");
    rt.push("/freeconsultation");
  };

  const readTestimoni = (page_path) => {
    let path = "/migwebsite/customerstories/" + page_path;
    let pathname = "/migwebsite/customerstories/[stories_id]";
    rt.push(pathname, path, { locale: "id" });
    // rt.push("/id/migwebsite/customerstories/" + page_path);
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getCustomerStoriesPage`, {
      method: `GET`,
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          if (locale == "en") {
            let dataTestiTemp = [];
            for (let i = 0; i < res2.data.length; i++) {
              if (dataTestiTemp.length < 6) {
                dataTestiTemp.push(res2.data[i]);
              } else {
                i = res2.data.length;
              }
            }
            setDataTestimonial(dataTestiTemp);
          } else {
            let dataTemp = [];
            for (let i = 0; i < res2.data.length; i++) {
              if (
                res2.data[i].title_id != "" &&
                res2.data[i].description_id != "" &&
                res2.data[i].page_path_id != "" &&
                res2.data[i].content_id != "" &&
                res2.data[i].tags_id != ""
              ) {
                dataTemp.push(res2.data[i]);
              }
            }
            setDataTestimonial(dataTemp);
          }
        } else {
        }
      })
      .catch((err) => {})
      .finally(() => {
        // setLoadingEmployees(false);
      });
  }, [rt]);

  const renderWhiteBox = (data) => {
    if (locale == "en") {
      if (data.author && data.job_title && data.quote) {
        return (
          <div
            className={
              "bg-white p-4 absolute -bottom-4 -right-[50px] w-[293px] mt-[115px] rounded-lg"
            }
            style={{
              boxShadow: "0px 16px 40px rgba(113, 176, 112, 0.2)",
            }}
          >
            {locale == "en" ? (
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html: data.quote,
                }}
              />
            ) : locale == "id" && data.quote_id != null ? (
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html: data.quote_id,
                }}
              />
            ) : (
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html: data.quote,
                }}
              />
            )}
            <div className={"mt-3 border border-dividermig w-[144px]"} />
            <p className={"mt-1 text-[10px] text-blackmig font-gilroysemibold"}>
              {data.author}
            </p>
            <p className={"mt-1 text-[10px] text-blackmig  font-gilroyregular"}>
              {locale == "en"
                ? data.job_title
                : locale == "id" && data.job_title_id != null
                ? data.job_title_id
                : data.job_title}
            </p>
          </div>
        );
      }
    } else {
      if (data.author && data.job_title_id && data.quote_id) {
        return (
          <div
            className={
              "bg-white p-4 absolute -bottom-4 -right-[50px] w-[293px] mt-[115px] rounded-lg"
            }
            style={{
              boxShadow: "0px 16px 40px rgba(113, 176, 112, 0.2)",
            }}
          >
            {locale == "en" ? (
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html: data.quote_id,
                }}
              />
            ) : locale == "id" && data.quote_id != null ? (
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html: data.quote_id,
                }}
              />
            ) : (
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html: data.quote_id,
                }}
              />
            )}
            <div className={"mt-3 border border-dividermig w-[144px]"} />
            <p className={"mt-1 text-[10px] text-blackmig font-gilroysemibold"}>
              {data.author}
            </p>
            <p className={"mt-1 text-[10px] text-blackmig  font-gilroyregular"}>
              {locale == "en"
                ? data.job_title
                : locale == "id" && data.job_title_id != null
                ? data.job_title_id
                : data.job_title}
            </p>
          </div>
        );
      }
    }
  };

  return (
    <Layout>
      {/* <section className={'container mx-auto'}> */}
      <Head>
        <title>{t.landingpagemetatitle}</title>
        <meta
          name="google-site-verification"
          content="2qK-7aoQVjWo7T2_OWW2UzFz5VvE3hwsXNB1-T6znSA"
        />
        <meta name="description" content={t.landingpagemetadescription} />
        <meta
          name="keywords"
          content="managed service, software development, it oursourcing"
        />
      </Head>
      <section
        className={
          "section1landingpage bg-white px-4 lg:px-[120px] lg:pt-[64px] lg:pb-[64px]"
        }
      >
        {/* Browser View */}
        <div className={"hidden lg:flex flex-row justify-between mx-auto"}>
          <div className={"flex-col w-1/2"}>
            <h3
              style={{ lineHeight: "120%" }}
              className={
                "md:text-[32px] lg:text-[32px] font-gilroysemibold text-blackmig"
              }
            >
              {t.landingpagesection1}
            </h3>
            <p
              style={{ lineHeight: "150%" }}
              className={
                "text-base lg:text-xl font-gilroyregular text-blackmig mt-[32px]"
              }
            >
              {t.landingpagesection2}
              <span className={"font-gilroysemibold text-blackmig"}>
                {t.hardwaresolution}
              </span>
              ,
              <span className={"font-gilroysemibold text-blackmig"}>
                {" "}
                {t.softwaredevelopment}
              </span>
              , {t.and}{" "}
              <span className={"font-gilroysemibold text-blackmig"}>
                {t.techtalent}
              </span>
              .
            </p>
            <p
              style={{ lineHeight: "150%" }}
              className={
                "text-base md:text-base font-gilroyregular text-blackmig"
              }
            >
              {t.weprovideyou}
            </p>
            <p
              style={{ lineHeight: "150%" }}
              className={
                "text-base md:text-base font-gilroyregular text-blackmig"
              }
            >
              {t.firstprovide}
            </p>
            <p
              style={{ lineHeight: "150%" }}
              className={
                "text-base md:text-base font-gilroyregular text-blackmig"
              }
            >
              {t.secondprovide}
            </p>
            <p
              style={{ lineHeight: "150%" }}
              className={
                "text-base md:text-base font-gilroyregular text-blackmig"
              }
            >
              {t.thirdprovide}
            </p>
            <div className={"mt-[32px]"}>
              <div className={"flex flex-row  w-[512px]"}>
                <Link
                  activeClass="active"
                  to="youronestop"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  <button
                    className={
                      "flex flex-row justify-center text-xl text-primarygreen rounded border-2 border-primarygreen pl-4 pr-3 py-2 bg-white"
                    }
                  >
                    <p className={"mr-2 text-base font-gilroysemibold"}>
                      {t.landingpageoursolution}
                    </p>
                    <img
                      className={"items-center self-center"}
                      style={{ width: "20px", height: "20x" }}
                      src="/image/landingpage/arrow-down-green.png"
                    />
                  </button>
                </Link>
                <button
                  onClick={getFreeConsultation}
                  className={
                    "text-xl text-center px-4 py-2 text-white rounded border-2 bg-primarygreen border-primarygreen ml-4"
                  }
                >
                  <p className={"text-base font-gilroysemibold"}>
                    {t.landingpagefreeconsultation}
                  </p>
                </button>
              </div>
            </div>
          </div>
          <div className={"flex justify-items-center self-center w-1/2"}>
            <img
              src="/image/landingpage/mitramas-infosys-global-landing-page-hero.png"
              className={"h-min-content max-w-[95%] mx-auto"}
            ></img>
          </div>
        </div>
        <div className={"hidden lg:block"}>
          <div className={"mt-[64px] text-center"}>
            <h5
              style={{ lineHeight: "150%" }}
              className={"text-xl text-blackmig font-gilroysemibold"}
            >
              {t.landingpagetitlelogo}
            </h5>
          </div>
          <div className="slider">
            <div className="slide-track">
              {dataImages.map((data1, idx) => (
                <div key={idx} className="slide ">
                  <img
                    className={
                      "mx-[30px] max-h-[45px] filter grayscale opacity-80"
                    }
                    src={data1}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={"text-center"}>
            <h2
              style={{ lineHeight: "150%" }}
              className={"text-blackmig font-gilroysemibold text-xl"}
            >
              <span className={"text-primarygreen"}>45+ </span>
              {t.cities},<span className={"text-primarygreen"}> 9000+ </span>
              {t.managed}.<span className={"text-primarygreen"}> 200+ </span>
              {t.techproject}
            </h2>
          </div>
        </div>
        {/* ---------- */}
        {/* Phone View */}
        <div className={"block lg:hidden pt-2.5"}>
          <div className={"flex-col center"}>
            <div className={"text-center"}>
              <p className={"text-2xl font-gilroysemibold"}>
                {t.landingpagesection1}
              </p>
            </div>
          </div>
          <div className={"flex justify-center px-3"}>
            <img
              className={"w-full h-auto"}
              src="/image/landingpage/mitramas-infosys-global-landing-page-hero.png"
            />
          </div>
          <p
            className={
              " text-sm font-gilroyregular text-blackmig mt-12 text-center px-[37px]"
            }
          >
            {t.landingpagesection2}{" "}
            <span className="font-gilroysemibold">{t.hardwaresolution}</span>,
            <span className="font-gilroysemibold">
              {" "}
              {t.softwaredevelopment}
            </span>
            ,{t.and} <span className="font-gilroysemibold">{t.techtalent}</span>
            .
          </p>
          <div className={"text-center"}>
            <p
              style={{ lineHeight: "150%" }}
              className={" text-sm font-gilroyregular text-blackmig mt-4"}
            >
              {t.weprovideyou}
            </p>
            <p
              style={{ lineHeight: "150%" }}
              className={" text-sm font-gilroyregular text-blackmig"}
            >
              {t.firstprovide}
            </p>
            <p
              style={{ lineHeight: "150%" }}
              className={" text-sm font-gilroyregular text-blackmig"}
            >
              {t.secondprovide}
            </p>
            <p
              style={{ lineHeight: "150%" }}
              className={" text-sm font-gilroyregular text-blackmig"}
            >
              {t.thirdprovide}
            </p>
          </div>
          <div className={"flex-col center"}>
            <div className={"grid justify-items-center text-center"}>
              <Linkk href="/freeconsultation" legacyBehavior>
                <button
                  className={
                    "flex text-base text-white border-2 rounded bg-primarygreen rounded border-primarygreen px-4 py-2 mt-9"
                  }
                >
                  <p className={"text-base font-gilroysemibold"}>
                    {t.landingpagefreeconsultation}
                  </p>
                </button>
              </Linkk>
            </div>
          </div>
          <div className={"mx-auto"}>
            <Link
              activeClass="active"
              to="youronestopmobile"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              <div className="grid justify-items-center text-center">
                <button
                  className={
                    "flex text-base text-primarygreen px-3 py-2 md:px-4 md:py-3 mt-8 bg-white font-gilroysemibold justify-center items-center"
                  }
                >
                  <p className={"text-base"}>{t.landingpageoursolution2}</p>
                  <img
                    className={"w-4 h-4 ml-3"}
                    src="/image/landingpage/arrow-down-green.png"
                  />
                </button>
              </div>
            </Link>
          </div>
          <div className={"mt-8 px-4"}>
            <h2
              className={
                "text-sm text-blackmig font-gilroysemibold text-center"
              }
            >
              {t.landingpagetitlelogo}
            </h2>
          </div>
          <div className="slider">
            <div className="slide-track">
              {dataImages.map((data1, idx) => (
                <div key={idx} className="slide ">
                  <img
                    className={
                      "mx-[21px] h-[50px] max-w-[100px] filter grayscale opacity-80"
                    }
                    src={data1}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={"mt-7 text-center"}>
            <p className={"text-blackmig font-gilroysemibold text-sm px-4"}>
              <span className={"text-primarygreen"}>45+ </span>
              {t.cities},<span className={"text-primarygreen"}> 9000+ </span>
              {t.managed}.<span className={"text-primarygreen"}> 200+ </span>
              {t.techproject}.
            </p>
          </div>
        </div>
        {/* ------------ */}
      </section>
      {/*section it resource */}
      <section
        className={
          "youronestop hidden lg:block px-4 py-4 lg:pt-[64px] lg:pb-12 lg:px-[120px] bg-white text-center"
        }
      >
        <div className={"container mx-auto"}>
          <h3
            style={{ lineHeight: "120%" }}
            className={
              "text-xl lg:text-[32px] text-blackmig font-gilroysemibold md:py-0"
            }
          >
            {t.findout}{" "}
            <span
              style={{
                borderBottom: "solid 3px #188E4D",
                paddingBottom: "2.5px",
              }}
            >
              {t.howourexpertise}
            </span>{" "}
            {t.helpyou}
          </h3>
        </div>
        <div className={"mt-[42px]"}>
          <div className={"flex flex-row justify-between"}>
            <div className={"text-left w-1/2"}>
              <h5
                style={{ lineHeight: "120%" }}
                className={"font-gilroybold text-primarygreen text-xl"}
              >
                Hardware
              </h5>
              <h4
                style={{ lineHeight: "120%" }}
                className={
                  " text-blackmig text-[30px] font-gilroysemibold gilroy-semibold mt-1"
                }
              >
                {t.hardwaresubtitlelanding}
              </h4>
              <p
                style={{ lineHeight: "150%" }}
                className={
                  " text-blackmig text-xl font-gilroyregular mt-[24px]"
                }
              >
                {t.hardwaredescription}
              </p>
              <div className={"mt-[32px]"}>
                <Linkk href="/hardware" legacyBehavior>
                  <button
                    className={
                      "text-base font-gilroysemibold rounded text-white border-2 bg-primarygreen border-primarygreen pl-4 py-2 pr-[12.18px]"
                    }
                  >
                    <div className={"flex flex-row justify-between"}>
                      <p className={"mr-[13.52px] text-base"}>
                        {t.hardwarebuttontitle}
                      </p>
                      <img
                        className={"self-center"}
                        style={{ width: "8px", height: "15px" }}
                        src="/image/landingpage/arrow-forward.png"
                      />
                    </div>
                  </button>
                </Linkk>
              </div>
            </div>
            <div className={"flex justify-end w-1/2 "}>
              <img
                src="/image/landingpage/hero-talent.png"
                alt=""
                className={"w-2/3 h-auto"}
              />
            </div>
          </div>
        </div>
        <div className={"mt-[42px]"}>
          <div className={"flex flex-row justify-between"}>
            <div className={"w-1/2"}>
              <img
                src="/image/landingpage/hero-software.png"
                alt=""
                className={"w-2/3 h-auto"}
              />
            </div>
            <div className={"text-left w-1/2 self-end"}>
              <h6
                style={{ lineHeight: "120%" }}
                className={"font-gilroybold text-primarygreen text-xl"}
              >
                Software
              </h6>
              <h4
                style={{ lineHeight: "120%" }}
                className={
                  " text-blackmig text-[30px] font-gilroysemibold gilroy-semibold mt-1"
                }
              >
                {t.softwaresubtitlelanding}
              </h4>
              <p
                style={{ lineHeight: "150%" }}
                className={
                  " text-blackmig text-xl font-gilroyregular mt-[24px]"
                }
              >
                {t.softwaredescription}
              </p>
              <div className={"mt-[32px]"}>
                <Linkk href="/software" legacyBehavior>
                  <button
                    className={
                      "text-base font-gilroysemibold rounded text-white border-2 bg-primarygreen border-primarygreen pl-4 py-2 pr-[12.18px]"
                    }
                  >
                    <div className={"flex flex-row justify-between"}>
                      <p className={"mr-[13.52px] text-base"}>
                        {t.softwarebuttontitle}
                      </p>
                      <img
                        className={"self-center"}
                        style={{ height: "15px", width: "8px" }}
                        src="/image/landingpage/arrow-forward.png"
                      />
                    </div>
                  </button>
                </Linkk>
              </div>
            </div>
          </div>
        </div>
        <div className={"mt-[42px]"}>
          <div className={"flex flex-row justify-between"}>
            <div className={"text-left w-1/2"}>
              <h5
                style={{ lineHeight: "120%" }}
                className={"font-gilroybold text-primarygreen text-xl"}
              >
                Talents
              </h5>
              <h4
                style={{ lineHeight: "120%" }}
                className={
                  " text-blackmig text-[30px] font-gilroysemibold gilroy-semibold mt-1"
                }
              >
                {t.talentsubtitle}
              </h4>
              <p
                style={{ lineHeight: "150%" }}
                className={
                  " text-blackmig text-xl font-gilroyregular mt-[24px]"
                }
              >
                {t.talentdescription}
              </p>
              <div className={"mt-[32px]"}>
                <Linkk href="/talents" legacyBehavior>
                  <button
                    className={
                      "text-base font-gilroysemibold rounded text-white border-2 bg-primarygreen border-primarygreen pl-4 py-2 pr-[12.18px]"
                    }
                  >
                    <div className={"flex flex-row justify-between"}>
                      <p className={"mr-[13.52px] text-base"}>
                        {t.talentbuttontitle}
                      </p>
                      <img
                        className={"self-center"}
                        style={{ height: "15px", width: "8px" }}
                        src="/image/landingpage/arrow-forward.png"
                      />
                    </div>
                  </button>
                </Linkk>
              </div>
            </div>
            <div className={"flex justify-end w-1/2"}>
              <img
                src="/image/landingpage/hero-hardware.png"
                alt=""
                className={"w-2/3 h-auto"}
              />
            </div>
          </div>
        </div>
      </section>
      {/*section it resource mobile */}
      <section
        className={
          "youronestopmobile lg:hidden px-4 mt-10 lg:px-10 xl:px-10 2xl:px-20 lg:bottom-32 text-center"
        }
      >
        <div className={"container mx-auto"}>
          <p className={"text-xl lg:text-2xl font-gilroysemibold py-8 lg:py-0"}>
            {locale == "en"
              ? "Discover how our expertise"
              : "Solusi teknologi kami"}{" "}
            <span
              style={{
                borderBottom: "solid 3px #188E4D",
                paddingBottom: "2.5px",
              }}
            >
              {locale == "en" ? "can enhance " : " dapat tingkatkan "}
            </span>{" "}
            {locale == "en" ? "your business" : "bisnis Anda"}
          </p>
        </div>
        <div>
          <div className="bg-lightgreen p-4 rounded-lg w-[287px] mx-auto">
            <div className={"grid justify-items-center text-center"}>
              <img
                src="/image/landingpage/hero-talent.png"
                className={"w-full h-full"}
                style={{ width: "200px", height: "115.32px" }}
              />
            </div>
            <p className="text-base text-primarygreen text-left mt-4 font-gilroybold">
              Hardware
            </p>
            <p className="text-sm text-blackmig text-left mt-1 font-gilroysemibold">
              {t.hardwaresubtitlelanding}
            </p>
            <p className="text-sm text-blackmig text-left mt-1 font-gilroyregular">
              {t.hardwaredescription}
            </p>
            <div className={"flex mt-3 justify-end"}>
              <Linkk href="/hardware" legacyBehavior>
                <button
                  className={
                    "text-sm text-center rounded text-white border-2 bg-primarygreen border-primarygreen pl-4 py-2 pr-[12.18px]"
                  }
                >
                  <div className={"flex flex-row justify-between"}>
                    <p className={"font-gilroysemibold text-base"}>
                      {t.hardwarebuttontitle}
                    </p>
                    <img
                      className={"self-center ml-[13.52px]"}
                      style={{ width: "8.95px", height: "15.64px" }}
                      src="/image/landingpage/arrow-forward.png"
                    />
                  </div>
                </button>
              </Linkk>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-lightblue rounded-lg p-4 w-[287px] mt-7 mx-auto">
            <div className={"grid justify-items-center text-center"}>
              <img
                src="/image/landingpage/Software.png"
                className={"w-full h-full"}
                style={{ width: "200px", height: "116px" }}
              />
            </div>
            <p className="text-base text-accentblue text-left mt-4 font-gilroybold">
              Software
            </p>
            <p className="text-sm text-blackmig text-left mt-1 font-gilroysemibold">
              {t.softwaresubtitlelanding}
            </p>
            <p className="text-sm text-blackmig text-left mt-1 font-gilroyregular">
              {t.softwaredescription}
            </p>
            <div className={"flex mt-3 justify-end"}>
              <Linkk href="/software" legacyBehavior>
                <button
                  className={
                    "text-sm text-center rounded text-white border-2 bg-primarygreen border-primarygreen pl-4 py-2 pr-[12.18px]"
                  }
                >
                  <div className={"flex flex-row justify-between"}>
                    <p className={"font-gilroysemibold text-base"}>
                      {t.softwarebuttontitle}
                    </p>
                    <img
                      className={"self-center ml-[13.52px]"}
                      style={{ width: "8.95px", height: "15.64px" }}
                      src="/image/landingpage/arrow-forward.png"
                    />
                  </div>
                </button>
              </Linkk>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-lightgrey rounded-lg p-4 w-[287px] mt-7 mx-auto">
            <div className={"grid justify-items-center text-center"}>
              <img
                src="/image/landingpage/Talents.png"
                className={"w-full h-full"}
                style={{ width: "200px", height: "116px" }}
              />
            </div>
            <p className="text-base text-accentpurple text-left mt-4 font-gilroybold">
              Talents
            </p>
            <p className="text-sm text-blackmig text-left mt-1 font-gilroysemibold">
              {t.talentsubtitle}
            </p>
            <p className="text-sm text-blackmig text-left mt-1 font-gilroyregular">
              {t.talentdescription}
            </p>
            <div className={"flex mt-3 justify-end"}>
              <Linkk href="/talents" legacyBehavior>
                <button
                  className={
                    "text-sm text-center rounded text-white border-2 bg-primarygreen border-primarygreen pl-4 py-2 pr-[12.18px]"
                  }
                >
                  <div className={"flex flex-row justify-between"}>
                    <p className={"font-gilroysemibold text-base"}>
                      {t.talentbuttontitle}
                    </p>
                    <img
                      className={"self-center ml-[13.52px]"}
                      style={{ width: "8.95px", height: "15.64px" }}
                      src="/image/landingpage/arrow-forward.png"
                    />
                  </div>
                </button>
              </Linkk>
            </div>
          </div>
        </div>
      </section>
      {/* testimonial */}
      {dataTestimonial.length > 0 && (
        <section
          className={
            "section3landingpageadvantages hidden lg:block bg-white py-8 lg:pt-[80px] lg:pb-16 px-[120px] lg:px-10"
          }
        >
          <h4
            style={{ lineHeight: "120%" }}
            className={
              "text-xl md:text-[32px] text-center font-gilroysemibold mb-[64px]"
            }
          >
            {t.customerstorieslandingpage}
          </h4>
          <div
            className={"center md:content-around block md:hidden"}
            style={{ maxWidth: 1000 }}
          >
            <Slider {...sliderSettingsPhone}>
              <div>
                <Card
                  bordered
                  style={{
                    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <div className="">
                    <p className="text-sm text italic gilroy-semibold font-gilroysemibold">
                      "
                    </p>

                    <p className="pb-4 gilroy-medium text-sm mx-auto text-left">
                      I had a wonderful experience working with Mitramas Infosys
                      Global. Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit, sed do eiusmod tempor incididunt ut labore et dolore
                      magna aliqua.
                      <br className="hidden xl:block"></br> optimize your cost
                      and productivity
                    </p>
                    <p className="text-sm text italic gilroy-semibold font-gilroysemibold">
                      "
                    </p>
                    <div className="flex flex-col items-center">
                      <div className="flex justify-center mt-2">
                        <img
                          className="rounded-full mr-4"
                          src="/image/landingpage/testimonial-user.png"
                          style={{ height: "40px", width: "60px" }}
                          alt=""
                        />
                        <div className="self-center">
                          <p className="text-sm font-gilroysemibold Gilroy-semibold text-black">
                            Fachri Fauzan
                          </p>
                          <p className="text-sm font-gilroysemibold Gilroy-semibold text-darkgrey">
                            Talent Acquisition at Bukopin
                          </p>
                        </div>
                      </div>
                      <div className="self-start">
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
                    </div>
                  </div>
                </Card>
              </div>
              <div>
                <Card
                  bordered
                  style={{
                    boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
                  }}
                >
                  <div className="">
                    <p className="text-3xl text italic gilroy-semibold font-gilroysemibold">
                      "
                    </p>

                    <p className="pb-4 gilroy-medium text-sm mx-auto text-left">
                      I had a wonderful experience working with Mitramas Infosys
                      Global. Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit, sed do eiusmod tempor incididunt ut labore et dolore
                      magna aliqua.
                      <br className="hidden xl:block"></br> optimize your cost
                      and productivity
                    </p>
                    <p className="text-sm text italic gilroy-semibold font-gilroysemibold">
                      "
                    </p>
                    <div className="flex flex-col items-center">
                      <div className="flex justify-center mt-2">
                        <img
                          className="rounded-full mr-4"
                          src="/image/landingpage/testimonial-user.png"
                          style={{ height: "40px", width: "60px" }}
                          alt=""
                        />
                        <div className="self-center">
                          <p className="text-sm font-gilroysemibold Gilroy-semibold text-black">
                            Fachri Fauzan
                          </p>
                          <p className="text-sm font-gilroysemibold Gilroy-semibold text-darkgrey">
                            Talent Acquisition at Bukopin
                          </p>
                        </div>
                      </div>
                      <div className="self-start">
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
                    </div>
                  </div>
                </Card>
              </div>
            </Slider>
          </div>
          <div className={"flex flex-row"}>
            {dataTestimonial.length > 0 ? (
              dataTestimonial.length > 1 ? (
                <button onClick={() => slider?.current?.slickPrev()}>
                  <div
                    className={
                      "self-center flex items-center justify-center  absolute left-[120px] w-[53px] h-[53px] bg-bgIcon rounded-[500px]"
                    }
                  >
                    <img
                      className={"grid justify-items-center"}
                      style={{ width: "40px", height: "40px" }}
                      src="/image/landingpage/arrow-sm-left.png"
                    />
                  </div>
                </button>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            <div
              className={"center md:content-around hidden md:block"}
              style={{ maxWidth: 1000 }}
            >
              <Slider {...sliderSettings2} ref={slider}>
                {dataTestimonial
                  ? dataTestimonial.map((data1, idx) => (
                      <div
                        key={idx}
                        className="pt-6 pb-8 md:px-16 bg-bgadvantagecard border border-advantagecard rounded-lg"
                      >
                        <div className={"flex flex-row justify-between"}>
                          <div className={"w-[45%]"}>
                            <div className={"flex relative self-center "}>
                              {data1.attachment_article ? (
                                <img
                                  className={"w-[356px] h-[237px] "}
                                  src={generateStaticAssetUrl(
                                    data1.attachment_article.link
                                  )}
                                  alt=""
                                />
                              ) : (
                                <img
                                  className={"w-[356px] h-[237px] "}
                                  src={
                                    "/image/landingpage/testimonial-client.png"
                                  }
                                  alt=""
                                />
                              )}
                              {renderWhiteBox(data1)}
                            </div>
                          </div>
                          <div className={"w-[45%]"}>
                            <div className={"flex flex-row justify-between"}>
                              <div>
                                <h5
                                  style={{ lineHeight: "120%" }}
                                  className={
                                    "text-blackmig text-xl font-gilroysemibold"
                                  }
                                >
                                  {locale == "en"
                                    ? data1.title
                                    : locale == "id" && data1.title_id != null
                                    ? data1.title_id
                                    : data1.title}
                                </h5>
                                <p
                                  className={
                                    "text-primarygreen text-base font-gilroysemibold mt-1"
                                  }
                                >
                                  {data1.company_name}
                                </p>
                              </div>
                              <div>
                                {data1.company_logo && (
                                  <img
                                    className={
                                      "max-w-[100px] h-auto self-center"
                                    }
                                    src={generateStaticAssetUrl(
                                      data1.company_logo.link
                                    )}
                                  />
                                )}
                              </div>
                            </div>
                            {locale == "en" ? (
                              <div
                                className="mt-4"
                                dangerouslySetInnerHTML={{
                                  __html: data1.description,
                                }}
                              />
                            ) : (
                              <div
                                className="mt-4"
                                dangerouslySetInnerHTML={{
                                  __html: data1.description_id,
                                }}
                              />
                            )}
                            {locale == "en" ? (
                              <Linkk
                                href={`/migwebsite/customerstories/${data1.page_path}`}
                                legacyBehavior
                              >
                                <button
                                  className={
                                    "text-sm rounded mt-8 pl-4 py-2 pr-[12.18px] text-white border-2 bg-primarygreen border-primarygreen"
                                  }
                                >
                                  <div
                                    className={"flex flex-row justify-between"}
                                  >
                                    <p
                                      className={
                                        "pr-[13.52px] text-base font-gilroysemibold"
                                      }
                                    >
                                      Read Story
                                    </p>
                                    <img
                                      className={"w-5 h-5"}
                                      src="/image/landingpage/arrow_forward_ios2.png"
                                    />
                                  </div>
                                </button>
                              </Linkk>
                            ) : (
                              <button
                                onClick={() =>
                                  readTestimoni(data1.page_path_id)
                                }
                                className={
                                  "text-sm rounded mt-8 pl-4 py-2 pr-[12.18px] text-white border-2 bg-primarygreen border-primarygreen"
                                }
                              >
                                <div
                                  className={"flex flex-row justify-between"}
                                >
                                  <p
                                    className={
                                      "pr-[13.52px] text-base font-gilroysemibold"
                                    }
                                  >
                                    Baca Testimoni
                                  </p>
                                  <img
                                    className={"w-5 h-5"}
                                    src="/image/landingpage/arrow_forward_ios2.png"
                                  />
                                </div>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  : ""}
              </Slider>
            </div>
            {dataTestimonial.length > 0 ? (
              dataTestimonial.length > 1 ? (
                <button onClick={() => slider?.current?.slickNext()}>
                  <div
                    className={
                      "self-center flex items-center justify-center  absolute right-[120px] w-[53px] h-[53px] bg-bgIcon rounded-[500px]"
                    }
                  >
                    <img
                      className={"grid justify-items-center"}
                      style={{ width: "40px", height: "40px" }}
                      src="/image/landingpage/arrow-sm-right.png"
                    />
                  </div>
                </button>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
        </section>
      )}
      {/* testimonial mobile */}
      {dataTestimonial.length > 0 && (
        <section
          className={
            "sectiontestimonialmobile block lg:hidden bg-white pt-8 pb-14 px-[30px] lg:px-10"
          }
        >
          <p
            className={
              "text-xl  text-center font-gilroysemibold lg:py-0 mb-7 lg:mb-10"
            }
          >
            {t.customerstorieslandingpage}
          </p>
          <div className={"block lg:hidden"} style={{ maxWidth: 1000 }}>
            <Slider {...sliderSettingsPhone}>
              {dataTestimonial.map((data1, idx) => (
                <div key={idx} className={"p-4 bg-bgadvantagecard rounded-lg"}>
                  <div className={"flex flex-row justify-between h-[67px]"}>
                    <div className={"flex flex-col"}>
                      <p className={"font-gilroybold text-sm text-blackmig"}>
                        {locale == "en" ? data1.title : data1.title_id}
                      </p>
                      <p
                        className={
                          "mt-1 text-primarygreen text-xs font-gilroybold"
                        }
                      >
                        {data1.company_name}
                      </p>
                    </div>
                    {data1.company_logo && (
                      <img
                        className="rounded-full max-w-[100px] max-h-[67px] self-center"
                        src={generateStaticAssetUrl(data1.company_logo.link)}
                        alt=""
                      />
                    )}
                  </div>

                  <div
                    className="mt-2 customer-stories"
                    dangerouslySetInnerHTML={{
                      __html:
                        locale == "en"
                          ? data1.description
                          : data1.description_id,
                    }}
                  />
                  {data1.quote && (
                    <div
                      className={"mt-2 bg-white p-3"}
                      style={{
                        boxShadow: "0px 16px 40px rgba(112, 144, 176, 0.2)",
                      }}
                    >
                      <p className={"text-xs text-blackmig"}>“{data1.quote}”</p>
                      <div className={"mt-3 border border-dividermig w-1/2"} />
                      <p
                        className={
                          "mt-1 text-[10px] font-gilroysemibold text-blackmig"
                        }
                      >
                        {data1.author}
                      </p>
                      <p
                        className={
                          "mt-1 text-[10px] font-gilroyregular text-blackmig"
                        }
                      >
                        {locale == "en" ? data1.job_title : data1.job_title_id}
                      </p>
                    </div>
                  )}
                  <div className={"mt-3 flex justify-end"}>
                    {locale == "en" ? (
                      <Linkk
                        href={`/migwebsite/customerstories/${data1.page_path}`}
                        legacyBehavior
                      >
                        <button
                          className={
                            "bg-primarygreen pl-4 py-[9px] rounded pr-[13.18px] flex flex-row"
                          }
                        >
                          <p
                            className={
                              "text-base text-white font-gilroysemibold"
                            }
                          >
                            Read Story
                          </p>
                          <img
                            className="w-[8.95px] h-[15.64px] self-center ml-[13.52px]"
                            src="/image/landingpage/arrow_forward_ios2.png"
                            alt=""
                          />
                        </button>
                      </Linkk>
                    ) : (
                      <button
                        onClick={() => readTestimoni(data1.page_path_id)}
                        className={
                          "bg-primarygreen pl-4 py-[9px] rounded pr-[13.18px] flex flex-row"
                        }
                      >
                        <p
                          className={"text-base text-white font-gilroysemibold"}
                        >
                          Baca Testimoni
                        </p>
                        <img
                          className="w-[8.95px] h-[15.64px] self-center ml-[13.52px]"
                          src="/image/landingpage/arrow_forward_ios2.png"
                          alt=""
                        />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      )}
      <section className={"session4landingpage py-4 px-4 lg:py-16 text-center"}>
        <div className={"container mx-auto"}>
          <h3
            style={{ lineHeight: "120%" }}
            className={
              "text-xl lg:text-[32px] font-gilroysemibold text-blackmig"
            }
          >
            {t.landingpagewhyus1}{" "}
            <span
              style={{
                borderBottom: "solid 3px #188E4D",
                paddingBottom: "2.5px",
              }}
            >
              {t.landingpagewhyus2}
            </span>{" "}
          </h3>
        </div>
        <div
          className={
            "hidden lg:flex lg:flex-row lg:justify-between mx-auto lg:max-w-[1108px]"
          }
        >
          <div className="flex mt-4 lg:mt-[64px] py-1 lg:py-2 px-2 lg:px-4 lg:mx-[21px] lg:h-[170px] lg:w-[533px] border border-advantage bg-bgadvantagecard rounded-lg lg:flex-row ">
            {/* <div className={""}> */}
            <img
              className="w-[117px] h-[136px]"
              src="/image/landingpage/on_demand.png"
              alt=""
            />
            {/* </div> */}
            <div className=" ml-6 self-center">
              <h5
                style={{ lineHeight: "120%" }}
                className="mb-1 text-sm text-left md:text-xl font-gilroysemibold text-primarygreen "
              >
                {t.whyustitle1}
              </h5>
              <p
                style={{ lineHeight: "150%" }}
                className="text-left text-sm md:text-base text-blackmig font-gilroyregular"
              >
                {t.whyussubtitle1}
              </p>
            </div>
            {/* <div className=" ml-6 mt-[35px]">
              <h5 className="mb-1 text-sm text-left md:text-xl font-gilroysemibold text-primarygreen ">
                On Demand Services
              </h5>
              <p className="text-left text-sm md:text-base text-blackmig font-gilroyregular">
                Transform your business with our custom solutions to optimize
                your cost and productivity
              </p>
            </div> */}
          </div>
          <div className="flex mt-4 lg:mt-[64px] py-1 lg:py-2 px-2 lg:px-4 lg:mx-[21px] lg:w-[533px] lg:h-[170px] border-advantage bg-bgadvantagecard rounded-lg lg:flex-row">
            <img
              className="w-[117px] h-[136px]"
              src="/image/landingpage/reliable_partner.png"
              alt=""
            />
            <div className=" ml-6 self-center">
              <h5
                style={{ lineHeight: "120%" }}
                className="mb-1 text-sm text-left md:text-xl font-gilroysemibold text-primarygreen "
              >
                {t.whyustitle2}
              </h5>
              <p
                style={{ lineHeight: "150%" }}
                className="text-left text-sm md:text-base text-blackmig font-gilroyregular"
              >
                {t.whyussubtitle2}
              </p>
            </div>
          </div>
        </div>
        <div
          className={
            "hidden lg:flex lg:flex-row lg:justify-between mx-auto lg:max-w-[1108px]"
          }
        >
          <div className="flex mt-4 lg:mt-[42px] lg:mx-[21px] py-1 lg:py-2 px-2 lg:px-4 lg:h-[170px] lg:w-[533px] items-center border-advantage bg-bgadvantagecard rounded-lg lg:flex-row ">
            <img
              className="w-[117px] h-[136px]"
              src="/image/landingpage/competitive_rates.png"
              alt=""
            />
            <div className=" ml-6 self-center">
              <h5
                style={{ lineHeight: "120%" }}
                className="mb-1 text-sm text-left md:text-xl font-gilroysemibold text-primarygreen "
              >
                {t.whyustitle3}
              </h5>
              <p
                style={{ lineHeight: "150%" }}
                className="text-left text-sm md:text-base text-blackmig font-gilroyregular"
              >
                {t.whyussubtitle3}
              </p>
            </div>
          </div>
          <div className="flex mt-4 lg:mt-[42px] py-1 lg:py-2 px-2 lg:px-4 lg:mx-[21px] lg:h-[170px] lg:w-[533px] border-advantage bg-bgadvantagecard rounded-lg lg:flex-row">
            <img
              src="/image/landingpage/cost_efficient.png"
              alt=""
              className="w-[117px] h-[136px]"
            />
            <div className=" ml-6 self-center">
              <h5
                style={{ lineHeight: "120%" }}
                className="mb-1 text-sm text-left md:text-xl font-gilroysemibold text-primarygreen "
              >
                {t.whyustitle4}
              </h5>
              <p
                style={{ lineHeight: "150%" }}
                className="text-left text-sm md:text-base text-blackmig font-gilroyregular"
              >
                {t.whyussubtitle4}
              </p>
            </div>
          </div>
        </div>
        <div className={"lg:hidden grid grid-cols-1 md:grid-cols-2"}>
          <div className="flex mt-7 md:mt-4 w-[328px] border border-advantage bg-bgadvantagecard rounded-lg mx-auto py-3 px-4">
            {/* <div className={""}> */}
            <img
              className="w-[64px] h-[84px] my-[14px]"
              src="/image/landingpage/on_demand.png"
              alt=""
            />
            {/* </div> */}
            <div className=" ml-6 self-center">
              <h5 className="mb-1 text-sm text-left font-gilroysemibold text-blackmig ">
                {t.whyustitle1}
              </h5>
              <p className="text-left text-sm  text-blackmig font-gilroyregular">
                {t.whyussubtitle1}
              </p>
            </div>
            {/* <div className=" ml-6 mt-[35px]">
              <h5 className="mb-1 text-sm text-left md:text-xl font-gilroysemibold text-primarygreen ">
                On Demand Services
              </h5>
              <p className="text-left text-sm md:text-base text-blackmig font-gilroyregular">
                Transform your business with our custom solutions to optimize
                your cost and productivity
              </p>
            </div> */}
          </div>
          <div className="flex mt-4 w-[328px] border border-advantage bg-bgadvantagecard rounded-lg mx-auto py-3 px-4">
            <img
              className="w-[64px] h-[84px] my-[14px]"
              src="/image/landingpage/reliable_partner.png"
              alt=""
            />
            <div className=" ml-6 self-center">
              <h5 className="mb-1 text-sm text-left font-gilroysemibold text-blackmig  ">
                {t.whyustitle2}
              </h5>
              <p className="text-left text-sm md:text-base text-blackmig font-gilroyregular">
                {t.whyussubtitle2}
              </p>
            </div>
          </div>
          <div className="flex mt-4 w-[328px] md:mb-12 border border-advantage bg-bgadvantagecard rounded-lg mx-auto py-3 px-4">
            <img
              className="w-[64px] h-[74px] my-[18.78px] md:my-[14px]"
              src="/image/landingpage/competitive_rates.png"
              alt=""
            />
            <div className=" ml-6 self-center">
              <h5 className="mb-1 text-sm text-left font-gilroysemibold text-blackmig ">
                {t.whyustitle3}
              </h5>
              <p className="text-left text-sm  text-blackmig font-gilroyregular">
                {t.whyussubtitle3}
              </p>
            </div>
          </div>
          <div className="flex mt-4 w-[328px] mb-12 border border-advantage bg-bgadvantagecard rounded-lg mx-auto py-3 px-4">
            <img
              src="/image/landingpage/cost_efficient.png"
              alt=""
              className="w-[64px] h-[77px] my-[17.5px]  "
            />
            <div className=" ml-6 self-center">
              <h5 className="mb-1 text-sm text-left font-gilroysemibold text-blackmig">
                {t.whyustitle4}
              </h5>
              <p className="text-left text-sm text-blackmig font-gilroyregular">
                {t.whyussubtitle4}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* client */}
      {/*section join mig*/}
      <section
        className={
          "section2landingpagebrowser bg-white lg:pt-[64px] lg:pb-[160px] lg:px-[113.5px]"
        }
      >
        <div
          className={
            "hidden lg:flex mx-auto max-w-[1027px]  flex-row justify-between"
          }
        >
          <div className={"max-w-[398px] flex justify-end"}>
            <img
              src="/image/landingpage/career-mig.png"
              className={"w-[398px] h-[253px]"}
              alt=""
            />
          </div>
          <div className={"w-[600px] justify-self-start"}>
            <div className="flex flex-col items-start">
              <h4
                style={{ lineHeight: "120%" }}
                className="mb-2 text-[24px] font-gilroysemibold text-blackmig"
              >
                {t.joinmigsection}
              </h4>
              <h5
                style={{ lineHeight: "120%" }}
                className={"text-xl font-gilroyregular text-blackmig mt-5"}
              >
                {t.joinmigsubtitle}
              </h5>
              <div className="flex flex-row items-center mt-3">
                <div className="">
                  <img
                    src="/image/landingpage/career-icon2.png"
                    className="w-[42px] h-[42px]"
                  />
                </div>
                <div>
                  <p
                    style={{ lineHeight: "150%" }}
                    className="text-left ml-3.5 text-base text-blackmig font-gilroyregular"
                  >
                    {t.joinmigpoint1}
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center mt-3">
                <div className="w-11">
                  <img
                    src="/image/landingpage/career-icon1.png"
                    className="w-[42px] h-[42px]"
                  />
                </div>
                <div>
                  <p
                    style={{ lineHeight: "150%" }}
                    className="text-left ml-3.5 text-base text-blackmig font-gilroyregular"
                  >
                    {t.joinmigpoint2}
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center mt-3">
                <div className="w-11">
                  <img
                    src="/image/landingpage/career-icon3.png"
                    className="w-[42px] h-[42px]"
                  />
                </div>
                <div>
                  <p
                    style={{ lineHeight: "150%" }}
                    className="text-left ml-3.5 text-base text-blackmig font-gilroyregular"
                  >
                    {t.joinmigpoint3}
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <a style={{ textDecoration: "none" }} href="/joinourteam">
                  <div className="flex mt-5 justify-end mr-5">
                    <p className="text-base mr-2 text-primarygreen font-gilroysemibold">
                      {t.joinmigcta}
                    </p>
                    <img
                      className={"py-1"}
                      style={{ width: "8px" }}
                      src="/image/landingpage/arrow-forward-ios.png"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className={"section2landingpagephone block lg:hidden px-4 bg-white"}
      >
        <p className={"text-xl text-center font-gilroysemibold py-8 lg:py-0"}>
          {t.joinmigsection}
        </p>
        <div className={"grid justify-items-center text-center"}>
          <img
            src="/image/landingpage/career-mig.png"
            className={"w-full h-full"}
            style={{ width: "235px", height: "150px" }}
          />
        </div>
        <div className={"py-3 px-2"}>
          <p className={"text-base text-blackmig md:text-center"}>
            {t.joinmigsubtitle}
          </p>
        </div>
        <div className="flex flex-row py-3">
          <div className="w-[54px] ">
            <img
              src="/image/landingpage/career-icon1.png"
              className={"w-9 h-9"}
            />
          </div>
          <div>
            <p className="text-left ml-[14px] text-sm text-black">
              {t.joinmigpoint1}
            </p>
          </div>
        </div>
        <div className="flex flex-row py-3">
          <div className="w-[54px]">
            <img
              src="/image/landingpage/career-icon2.png"
              className={"w-9 h-9"}
            />
          </div>
          <div>
            <p className="text-left ml-[14px] text-sm text-black">
              {t.joinmigpoint2}
            </p>
          </div>
        </div>
        <div className="flex flex-row py-3">
          <div className="w-[54px]">
            <img
              src="/image/landingpage/career-icon3.png"
              style={{ width: "36px", height: "36px" }}
            />
          </div>
          <div>
            <p className="text-left ml-[14px] text-sm text-black">
              {t.joinmigpoint3}
            </p>
          </div>
        </div>
        <div className="self-end mt-5">
          <a style={{ textDecoration: "none" }} href="/joinourteam">
            <div className="flex mt-5 justify-end mr-5">
              <p className="text-base mr-[13.52px] text-primarygreen font-gilroysemibold">
                {t.joinmigcta}
              </p>
              <img
                className={"self-center"}
                style={{ width: "8.95px", height: "15.64px" }}
                src="/image/landingpage/arrow-forward-ios.png"
              />
            </div>
          </a>
        </div>
      </section>

      <section
        className={
          "youronestop hidden lg:block lg:flex lg:flex-row md:justify-between bg-bgfooter pt-[140px] h-[173px]"
        }
      >
        <div className={"justify-start self-end"}>
          <img
            style={{ width: "332px", height: "142px" }}
            src="/image/landingpage/footer-left.png"
          />
        </div>
        <div className={"container w-1/2 mx-auto px-2"}>
          <div
            className={
              "bg-white border-3 mx-auto max-w-[645px] border-solid shadow-2xl rounded-lg text-center -mt-[220px] py-[31.38px]  px-[31.38px]"
            }
          >
            <h4
              style={{ lineHeight: "120%" }}
              className={"text-[24px] font-gilroysemibold text-black"}
            >
              {t.contactussectiontitle}
            </h4>
            <div
              className={
                "mt-3.5 text-xl font-gilroyregular text-center text-black"
              }
            >
              <p style={{ lineHeight: "120%", fontSize: "16px" }}>
                {t.contactussectionsubtitle1}
              </p>
              <p style={{ lineHeight: "120%", fontSize: "16px" }}>
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
                    <p className={"text-base font-gilroysemibold"}>
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
                    <p className={"text-base font-gilroysemibold"}>
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
                    <p className={"text-base font-gilroysemibold"}>
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
                    <p className={"text-base font-gilroysemibold"}>
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

export async function getStaticProps() {
  let dataBlogs = null;

  const resources = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getArticle`,
    {
      method: `GET`,
    }
  );
  const resjson = await resources.json();
  dataBlogs = resjson.data;
  return {
    props: {
      dataBlog: dataBlogs || [],
    },
    revalidate: 60,
  };
}

export default LandingPage;
