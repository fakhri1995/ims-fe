import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";
import { Card, Col, Row, Space } from "antd";
import { data } from "flickity";
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
  const [dataTestimonial, setDataTestimonial] = useState(null);
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

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getTestimonialLandingPage`, {
      method: `GET`,
    })
      .then((res) => res.json())
      .then((res2) => {
        console.log("get data testimonial ", res2);
        if (res2.success) {
          setDataTestimonial(res2.data);
        } else {
        }
      })
      .catch((err) => {})
      .finally(() => {
        // setLoadingEmployees(false);
      });
  }, []);

  return (
    <Layout>
      {/* <section className={'container mx-auto'}> */}
      {console.log("locale ", locale)}
      <Head>
        <title>{t.landingpagemetatitle}</title>
        <meta name="description" content={t.landingpagemetadescription} />
        <meta
          name="keywords"
          content="managed service, software development, it oursourcing"
        />
      </Head>
      <section
        className={
          "section1landingpage bg-white md:pt-[64px] md:pb-[94px] md:px-[113.5px]"
        }
      >
        {/* Browser View */}
        <div className={"hidden md:flex container relative mx-auto"}>
          <div className={"flex-col w-1/2"}>
            <h1
              style={{ lineHeight: "120%" }}
              className={
                "text-[36px] mt-[34px] font-gilroysemibold text-blackmig"
              }
            >
              {t.landingpagesection1}
            </h1>
            <p
              style={{ lineHeight: "150%" }}
              className={" text-xl font-gilroyregular text-blackmig mt-[34px]"}
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
              className={" text-xl font-gilroyregular text-blackmig mt-4"}
            >
              {t.weprovideyou}
            </p>
            <p
              style={{ lineHeight: "150%" }}
              className={" text-xl font-gilroyregular text-blackmig"}
            >
              {t.firstprovide}
            </p>
            <p
              style={{ lineHeight: "150%" }}
              className={" text-xl font-gilroyregular text-blackmig"}
            >
              {t.secondprovide}
            </p>
            <p
              style={{ lineHeight: "150%" }}
              className={" text-xl font-gilroyregular text-blackmig"}
            >
              {t.thirdprovide}
            </p>
            <div className={"mt-[34px]"}>
              <div className={"flex flex-row justify-between w-[512px]"}>
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
                      "flex flex-row justify-center text-xl text-primarygreen rounded border-2 border-primarygreen pl-4 pr-3 py-2 mt-4 bg-white"
                    }
                  >
                    <p className={"mr-2 font-gilroysemibold"}>
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
                    "text-xl text-center px-4 py-2 text-white rounded border-2 bg-primarygreen border-primarygreen mt-4 gilroy-medium bg-white"
                  }
                >
                  <p className={""}>{t.landingpagefreeconsultation}</p>
                </button>
              </div>
            </div>
          </div>
          <div className={"flex-col w-1/2"}>
            <img
              src="/image/landingpage/image-section1.png"
              className={"w-[742px] h-[395px]  "}
            ></img>
          </div>
        </div>
        <div className={"hidden md:block"}>
          <div className={"mt-[72px] text-center"}>
            <h2
              style={{ lineHeight: "150%" }}
              className={"text-xl text-blackmig font-gilroysemibold"}
            >
              {t.landingpagetitlelogo}
            </h2>
          </div>
          <marquee className={"marquee-inner"}>
            <div className={"flex flex-row mt-6"}>
              <img
                className={"mx-[26.5px]"}
                style={{ width: "59px", height: "50px" }}
                src="/image/landingpage/client1.png"
              />
              <img
                className={"mx-[26.5px]"}
                style={{ width: "34px", height: "40px" }}
                src="/image/landingpage/client2.png"
              />
              <img
                className={"mx-[26.5px]"}
                style={{ width: "50px", height: "50px" }}
                src="/image/landingpage/client3.png"
              />
              <img
                className={"mx-[26.5px]"}
                style={{ width: "44px", height: "50px" }}
                src="/image/landingpage/client4.png"
              />
              <img
                className={"mx-[26.5px]"}
                style={{ width: "59px", height: "50px" }}
                src="/image/landingpage/client1.png"
              />
              <img
                className={"mx-[26.5px]"}
                style={{ width: "34px", height: "40px" }}
                src="/image/landingpage/client2.png"
              />
              <img
                className={"mx-[26.5px]"}
                style={{ width: "50px", height: "50px" }}
                src="/image/landingpage/client3.png"
              />
              <img
                className={"mx-[26.5px]"}
                style={{ width: "44px", height: "50px" }}
                src="/image/landingpage/client4.png"
              />
              <img
                className={"mx-[26.5px]"}
                style={{ width: "59px", height: "50px" }}
                src="/image/landingpage/client1.png"
              />
              <img
                className={"mx-[26.5px]"}
                style={{ width: "34px", height: "40px" }}
                src="/image/landingpage/client2.png"
              />
              <img
                className={"mx-[26.5px]"}
                style={{ width: "50px", height: "50px" }}
                src="/image/landingpage/client3.png"
              />
              <img
                className={"mx-[26.5px]"}
                style={{ width: "44px", height: "50px" }}
                src="/image/landingpage/client4.png"
              />
              <img
                className={"mx-[26.5px]"}
                style={{ width: "59px", height: "50px" }}
                src="/image/landingpage/client1.png"
              />
              <img
                className={"mx-[26.5px]"}
                style={{ width: "34px", height: "40px" }}
                src="/image/landingpage/client2.png"
              />
              <img
                className={"mx-[26.5px]"}
                style={{ width: "50px", height: "50px" }}
                src="/image/landingpage/client3.png"
              />
              <img
                className={"mx-[26.5px]"}
                style={{ width: "44px", height: "50px" }}
                src="/image/landingpage/client4.png"
              />
              <img
                className={"mx-[26.5px]"}
                style={{ width: "59px", height: "50px" }}
                src="/image/landingpage/client1.png"
              />
              <img
                className={"mx-[26.5px]"}
                style={{ width: "34px", height: "40px" }}
                src="/image/landingpage/client2.png"
              />
              <img
                className={"mx-[26.5px]"}
                style={{ width: "50px", height: "50px" }}
                src="/image/landingpage/client3.png"
              />
              <img
                className={"mx-[26.5px]"}
                style={{ width: "44px", height: "50px" }}
                src="/image/landingpage/client4.png"
              />
            </div>
          </marquee>

          <div className={"mt-6 text-center"}>
            <h2
              style={{ lineHeight: "150%" }}
              className={"text-blackmig font-gilroysemibold text-xl"}
            >
              <span className={"text-primarygreen"}>45+ </span>
              {t.cities},<span className={"text-primarygreen"}> 9000+ </span>
              {t.managed}.<span className={"text-primarygreen"}> 200+ </span>
              {t.techproject}.
            </h2>
          </div>
        </div>
        {/* ---------- */}
        {/* Phone View */}
        <div className={"block md:hidden pt-8"}>
          <div className={"flex-col center"}>
            <div className={"text-center"}>
              <p className={"text-2xl font-gilroysemibold"}>
                Accelerate your business, fortify your tech capabilities with us
              </p>
            </div>
          </div>
          <div className={"flex justify-center"}>
            <img
              className={"w-[328px] h-[172px]"}
              src="/image/landingpage/image-section1.png"
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
              <Linkk href="/freeconsultation">
                <button
                  className={
                    "flex text-base text-white border-2 rounded bg-primarygreen rounded border-primarygreen px-4 py-2 mt-9"
                  }
                >
                  <p className={"font-gilroysemibold"}>
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
                  <p className={""}>Explore Solutions</p>
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
          <div className={"flex flex-row justify-center mt-6"}>
            <img
              className={"mr-[42.4px]"}
              style={{ width: "47.5px", height: "40px" }}
              src="/image/landingpage/client1.png"
            />
            <img
              className={"mr-[42.4px]"}
              style={{ width: "27.54px", height: "32px" }}
              src="/image/landingpage/client2.png"
            />
            <img
              className={"mr-[42.4px]"}
              style={{ width: "40px", height: "40px" }}
              src="/image/landingpage/client3.png"
            />
            <img
              className={""}
              style={{ width: "35.27px", height: "40px" }}
              src="/image/landingpage/client4.png"
            />
          </div>
          <div className={"mt-7 text-center"}>
            <p className={"text-blackmig font-gilroysemibold text-sm px-4"}>
              <span className={"text-primarygreen"}>45+ </span>
              {t.cities},<span className={"text-primarygreen"}> 9000+ </span>
              {t.managed}.<span className={"text-primarygreen"}> 100+ </span>
              {t.techproject}.
            </p>
          </div>
        </div>
        {/* ------------ */}
      </section>
      {/*section it resource */}
      <section
        className={
          "youronestop hidden md:block py-4 md:py-12 md:px-[113.5px] 2xl:px-[226px] bg-white text-center"
        }
      >
        <div className={"container mx-auto"}>
          <h2
            style={{ lineHeight: "120%" }}
            className={
              "text-xl md:text-[36px] text-blackmig font-gilroysemibold md:py-0"
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
          </h2>
        </div>
        <div className={"mt-[42px]"}>
          <div className={"flex flex-row justify-between"}>
            <div className={"text-left max-w-[609px]"}>
              <h2
                style={{ lineHeight: "120%" }}
                className={"font-gilroybold text-primarygreen text-2xl"}
              >
                Hardware
              </h2>
              <h2
                style={{ lineHeight: "120%" }}
                className={
                  " text-blackmig text-[36px] font-gilroysemibold gilroy-semibold mt-1"
                }
              >
                {t.hardwaresubtitlelanding}
              </h2>
              <p
                style={{ lineHeight: "150%" }}
                className={" text-blackmig text-xl font-gilroyregular mt-5"}
              >
                {t.hardwaredescription}
              </p>
              <div className={"mt-5"}>
                <Linkk href="/hardware">
                  <button
                    className={
                      "text-xl font-gilroysemibold rounded text-white border-2 bg-primarygreen border-primarygreen pl-4 py-2 pr-[12.18px]"
                    }
                  >
                    <div className={"flex flex-row justify-between"}>
                      <p className={"mr-[13.52px]"}>{t.hardwarebuttontitle}</p>
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
            <div className={"flex justify-end "}>
              <img
                src="/image/landingpage/hero-talent.png"
                alt=""
                className={"w-[444px] h-[256px]"}
              />
            </div>
          </div>
        </div>
        <div className={"mt-[42px]"}>
          <div className={"flex flex-row justify-between"}>
            <div className={""}>
              <img
                src="/image/landingpage/hero-software.png"
                alt=""
                className={"w-[444px] h-[259px]"}
              />
            </div>
            <div className={"text-left max-w-[609px] justify-end"}>
              <h2
                style={{ lineHeight: "120%" }}
                className={"font-gilroybold text-primarygreen text-2xl"}
              >
                Software
              </h2>
              <h2
                style={{ lineHeight: "120%" }}
                className={
                  " text-blackmig text-[36px] font-gilroysemibold gilroy-semibold mt-1"
                }
              >
                {t.softwaresubtitlelanding}
              </h2>
              <p
                style={{ lineHeight: "150%" }}
                className={" text-blackmig text-xl font-gilroyregular mt-5"}
              >
                {t.softwaredescription}
              </p>
              <div className={"mt-5"}>
                <Linkk href="/software">
                  <button
                    className={
                      "text-xl font-gilroysemibold rounded text-white border-2 bg-primarygreen border-primarygreen pl-4 py-2 pr-[12.18px]"
                    }
                  >
                    <div className={"flex flex-row justify-between"}>
                      <p className={"mr-[13.52px]"}>{t.softwarebuttontitle}</p>
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
            <div className={"text-left max-w-[609px]"}>
              <h2
                style={{ lineHeight: "120%" }}
                className={"font-gilroybold text-primarygreen text-2xl"}
              >
                Talents
              </h2>
              <h2
                style={{ lineHeight: "120%" }}
                className={
                  " text-blackmig text-[36px] font-gilroysemibold gilroy-semibold mt-1"
                }
              >
                {t.talentsubtitle}
              </h2>
              <p
                style={{ lineHeight: "150%" }}
                className={" text-blackmig text-xl font-gilroyregular mt-5"}
              >
                {t.talentdescription}
              </p>
              <div className={"mt-5"}>
                <Linkk href="/talents">
                  <button
                    className={
                      "text-xl font-gilroysemibold rounded text-white border-2 bg-primarygreen border-primarygreen pl-4 py-2 pr-[12.18px]"
                    }
                  >
                    <div className={"flex flex-row justify-between"}>
                      <p className={"mr-[13.52px]"}>{t.talentbuttontitle}</p>
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
            <div className={"flex justify-end "}>
              <img
                src="/image/landingpage/hero-hardware.png"
                alt=""
                className={"w-[444px] h-[259px]"}
              />
            </div>
          </div>
        </div>
      </section>
      {/*section it resource mobile */}
      <section
        className={
          "youronestopmobile md:hidden px-4 mt-10 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 md:relative md:bottom-32 text-center"
        }
      >
        <div className={"container mx-auto"}>
          <p className={"text-xl md:text-2xl font-gilroysemibold py-8 md:py-0"}>
            Discover how our expertise{" "}
            <span
              style={{
                borderBottom: "solid 3px #188E4D",
                paddingBottom: "2.5px",
              }}
            >
              can enhance
            </span>{" "}
            your business
          </p>
        </div>
        <div>
          <div className="bg-lightgreen px-[16.5px] py-3 rounded-lg w-[287px] h-[388px] mx-auto">
            <div className={"grid justify-items-center text-center"}>
              <img
                src="/image/landingpage/hero-talent.png"
                className={"w-full h-full"}
                style={{ width: "200px", height: "115.32px" }}
              />
            </div>
            <p className="text-base text-primary text-left mt-4 font-gilroybold">
              Hardware
            </p>
            <p className="text-sm text-blackmig text-left mt-1 font-gilroysemibold">
              {t.hardwaresubtitlelanding}
            </p>
            <p className="text-sm text-blackmig text-left mt-1 font-gilroyregular">
              {t.hardwaredescription}
            </p>
            <div className={"flex mt-3 justify-end"}>
              <Linkk href="/hardware">
                <button
                  className={
                    "text-sm text-center rounded text-white border-2 bg-primarygreen border-primarygreen pl-4 py-2 pr-[12.18px]"
                  }
                >
                  <div className={"flex flex-row justify-between"}>
                    <p className={"font-gilroysemibold text-xl"}>Get Yours</p>
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
          <div className="bg-lightblue rounded-lg px-[16.5px] py-3 w-[287px] h-[388px] mt-7 mx-auto">
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
              Delivering tailor-made solutions for your business
            </p>
            <p className="text-sm text-blackmig text-left mt-1 font-gilroyregular">
              {t.softwaredescription}
            </p>
            <div className={"flex mt-[55.53px] justify-end"}>
              <Linkk href="/software">
                <button
                  className={
                    "text-sm text-center rounded text-white border-2 bg-primarygreen border-primarygreen pl-4 py-2 pr-[12.18px]"
                  }
                >
                  <div className={"flex flex-row justify-between"}>
                    <p className={"font-gilroysemibold text-xl"}>Build Now</p>
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
          <div className="bg-lightgrey rounded-lg px-[16.5px] py-3 w-[287px] h-[388px] mt-7 mx-auto">
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
            <div className={"flex mt-[34.53px] justify-end"}>
              <Linkk href="/talents">
                <button
                  className={
                    "text-sm text-center rounded text-white border-2 bg-primarygreen border-primarygreen pl-4 py-2 pr-[12.18px]"
                  }
                >
                  <div className={"flex flex-row justify-between"}>
                    <p className={"font-gilroysemibold text-xl"}>Hire Now</p>
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
      {dataTestimonial && (
        <section
          className={
            "section3landingpageadvantages hidden md:block bg-white py-8 md:pt-8 md:py-16 px-[30px] md:px-10"
          }
        >
          <p
            className={
              "text-xl md:text-3xl text-center font-gilroysemibold mb-[42px]"
            }
          >
            What they say{" "}
            <span
              style={{
                borderBottom: "solid 3px #188E4D",
                paddingBottom: "2.5px",
              }}
            >
              about us
            </span>{" "}
            ?
          </p>
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
            {dataTestimonial ? (
              dataTestimonial.length > 1 ? (
                <button onClick={() => slider?.current?.slickPrev()}>
                  <div
                    className={
                      "self-center flex items-center justify-center  absolute left-[180px] w-[53px] h-[53px] bg-bgIcon rounded-[500px]"
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
                  ? dataTestimonial.map((data1) => (
                      <div className="pt-6 pb-8 md:px-16 bg-bgadvantagecard border border-advantagecard rounded-lg">
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
                              <div
                                className={
                                  "bg-white p-4 absolute -bottom-4 -right-[50px] w-[293px] mt-[115px] rounded-lg"
                                }
                                style={{
                                  boxShadow:
                                    "0px 16px 40px rgba(113, 176, 112, 0.2)",
                                }}
                              >
                                {locale == "en" ? (
                                  <div
                                    className=""
                                    dangerouslySetInnerHTML={{
                                      __html: data1.quote,
                                    }}
                                  />
                                ) : locale == "id" && data1.quote_id != null ? (
                                  <div
                                    className=""
                                    dangerouslySetInnerHTML={{
                                      __html: data1.quote_id,
                                    }}
                                  />
                                ) : (
                                  <div
                                    className=""
                                    dangerouslySetInnerHTML={{
                                      __html: data1.quote,
                                    }}
                                  />
                                )}
                                <div
                                  className={
                                    "mt-3 border border-dividermig w-[144px]"
                                  }
                                />
                                <p
                                  className={
                                    "mt-1 text-[10px] text-blackmig font-gilroysemibold"
                                  }
                                >
                                  {data1.author}
                                </p>
                                <p
                                  className={
                                    "mt-1 text-[10px] text-blackmig  font-gilroyregular"
                                  }
                                >
                                  {locale == "en"
                                    ? data1.job_title
                                    : locale == "id" &&
                                      data1.job_title_id != null
                                    ? data1.job_title_id
                                    : data1.job_title}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className={"w-[45%]"}>
                            <div className={"flex flex-row justify-between"}>
                              <div>
                                <h2
                                  style={{ lineHeight: "120%" }}
                                  className={
                                    "text-blackmig text-[36px] font-gilroysemibold"
                                  }
                                >
                                  {locale == "en"
                                    ? data1.title
                                    : locale == "id" && data1.title_id != null
                                    ? data1.title_id
                                    : data1.title}
                                </h2>
                                <p
                                  className={
                                    "text-primarygreen text-base font-gilroysemibold mt-1"
                                  }
                                >
                                  {data1.company_name}
                                </p>
                              </div>
                              <div>
                                {data1.company_logo ? (
                                  <img
                                    className={"w-[58.5px] h-[42.5px]"}
                                    src={generateStaticAssetUrl(
                                      data1.company_logo.link
                                    )}
                                  />
                                ) : (
                                  <img
                                    className={"w-[58.5px] h-[42.5px]"}
                                    src={
                                      "/image/landingpage/testimonial-client.png"
                                    }
                                  />
                                )}
                              </div>
                            </div>
                            <div
                              className="mt-4"
                              dangerouslySetInnerHTML={{
                                __html: data1.description,
                              }}
                            />
                            <Linkk href={`/customerstories/${data1.page_path}`}>
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
                          </div>
                        </div>
                      </div>
                    ))
                  : ""}
              </Slider>
            </div>
            {dataTestimonial ? (
              dataTestimonial.length > 1 ? (
                <button onClick={() => slider?.current?.slickNext()}>
                  <div
                    className={
                      "self-center flex items-center justify-center  absolute right-[180px] w-[53px] h-[53px] bg-bgIcon rounded-[500px]"
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
      {dataTestimonial && (
        <section
          className={
            "sectiontestimonialmobile block md:hidden bg-white pt-8 pb-14 px-[30px] md:px-10"
          }
        >
          <p
            className={
              "text-xl  text-center font-gilroysemibold md:py-0 mb-7 md:mb-10"
            }
          >
            What they say{" "}
            <span
              style={{
                borderBottom: "solid 3px #188E4D",
                paddingBottom: "2.5px",
              }}
            >
              about us
            </span>{" "}
            ?
          </p>
          <div className={"block md:hidden"} style={{ maxWidth: 1000 }}>
            <Slider {...sliderSettingsPhone}>
              {dataTestimonial.map((data1) => (
                <div className={"p-4 bg-bgadvantagecard rounded-lg"}>
                  <div className={"flex flex-row justify-between"}>
                    <p className={"font-gilroybold text-sm text-blackmig"}>
                      {data1.title}
                    </p>
                    {data1.company_logo ? (
                      <img
                        className="rounded-full"
                        src={generateStaticAssetUrl(data1.company_logo.link)}
                        style={{ height: "24px", width: "28.24px" }}
                        alt=""
                      />
                    ) : (
                      <img
                        className="rounded-full"
                        src="/image/landingpage/testimonial-client.png"
                        style={{ height: "24px", width: "28.24px" }}
                        alt=""
                      />
                    )}
                  </div>
                  <p
                    className={"mt-1 text-primarygreen text-xs font-gilroybold"}
                  >
                    KB Bukopin
                  </p>
                  <p
                    className={"mt-2 text-blackmig text-xs font-gilroyregular"}
                  >
                    {data1.description}
                  </p>
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
                      {data1.job_title}
                    </p>
                  </div>
                  <div className={"mt-3 flex justify-end"}>
                    <button
                      className={
                        "bg-primarygreen pl-4 py-[9px] rounded pr-[13.18px] flex flex-row"
                      }
                    >
                      <p className={"text-base text-white font-gilroysemibold"}>
                        Read Story
                      </p>
                      <img
                        className="w-[8.95px] h-[15.64px] self-center ml-[13.52px]"
                        src="/image/landingpage/arrow_forward_ios2.png"
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      )}
      <section className={"session4landingpage py-4 px-4 md:py-16 text-center"}>
        <div className={"container mx-auto"}>
          <h2
            style={{ lineHeight: "120%" }}
            className={
              "text-xl md:text-[36px] mt-12 font-gilroysemibold text-blackmig"
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
          </h2>
        </div>
        <div
          className={
            "hidden md:flex md:flex-row md:justify-between mx-auto md:w-[1108px]"
          }
        >
          <div className="flex mt-4 md:mt-[42px] py-1 md:py-2 px-2 md:px-4 md:mx-[21px] md:h-[152px] md:w-[533px] border border-advantage bg-bgadvantagecard rounded-lg md:flex-row ">
            {/* <div className={""}> */}
            <img
              className="w-[117px] h-[136px]"
              src="/image/landingpage/on_demand.png"
              alt=""
            />
            {/* </div> */}
            <div className=" ml-6 self-center">
              <h3
                style={{ lineHeight: "120%" }}
                className="mb-1 text-sm text-left md:text-2xl font-gilroysemibold text-primarygreen "
              >
                {t.whyustitle1}
              </h3>
              <p
                style={{ lineHeight: "150%" }}
                className="text-left text-sm md:text-xl text-blackmig font-gilroyregular"
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
          <div className="flex mt-4 md:mt-[42px] py-1 md:py-2 px-2 md:px-4 md:mx-[21px] md:w-[533px] md:h-[152px] border-advantage bg-bgadvantagecard rounded-lg md:flex-row">
            <img
              className="w-[117px] h-[136px]"
              src="/image/landingpage/reliable_partner.png"
              alt=""
            />
            <div className=" ml-6 self-center">
              <h3
                style={{ lineHeight: "120%" }}
                className="mb-1 text-sm text-left md:text-2xl font-gilroysemibold text-primarygreen "
              >
                {t.whyustitle2}
              </h3>
              <p
                style={{ lineHeight: "150%" }}
                className="text-left text-sm md:text-xl text-blackmig font-gilroyregular"
              >
                {t.whyussubtitle2}
              </p>
            </div>
          </div>
        </div>
        <div
          className={
            "hidden md:flex md:flex-row md:justify-between mx-auto md:w-[1108px]"
          }
        >
          <div className="flex mt-4 md:mt-[42px] md:mx-[21px] py-1 md:py-2 px-2 md:px-4 md:w-[533px] items-center border-advantage bg-bgadvantagecard rounded-lg md:flex-row ">
            <img
              className="w-[117px] h-[136px]"
              src="/image/landingpage/competitive_rates.png"
              alt=""
            />
            <div className=" ml-6 self-center">
              <h3
                style={{ lineHeight: "120%" }}
                className="mb-1 text-sm text-left md:text-2xl font-gilroysemibold text-primarygreen "
              >
                {t.whyustitle3}
              </h3>
              <p
                style={{ lineHeight: "150%" }}
                className="text-left text-sm md:text-xl text-blackmig font-gilroyregular"
              >
                {t.whyussubtitle3}
              </p>
            </div>
          </div>
          <div className="flex mt-4 md:mt-[42px] py-1 md:py-2 px-2 md:px-4 md:mx-[21px] md:w-[533px] border-advantage bg-bgadvantagecard rounded-lg md:flex-row">
            <img
              src="/image/landingpage/cost_efficient.png"
              alt=""
              className="w-[117px] h-[136px]"
            />
            <div className=" ml-6 self-center">
              <h3
                style={{ lineHeight: "120%" }}
                className="mb-1 text-sm text-left md:text-2xl font-gilroysemibold text-primarygreen "
              >
                {t.whyustitle4}
              </h3>
              <p
                style={{ lineHeight: "150%" }}
                className="text-left text-sm md:text-xl text-blackmig font-gilroyregular"
              >
                {t.whyussubtitle4}
              </p>
            </div>
          </div>
        </div>
        <div className={"md:hidden"}>
          <div className="flex mt-7 w-[328px] border border-advantage bg-bgadvantagecard rounded-lg mx-auto py-3 px-4">
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
          <div className="flex mt-4 w-[328px] border border-advantage bg-bgadvantagecard rounded-lg mx-auto py-3 px-4">
            <img
              className="w-[64px] h-[74px] my-[18.78px]"
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
          "section2landingpagebrowser bg-white md:pt-[53px] md:pb-[150px]"
        }
      >
        <div
          className={
            "hidden md:flex mx-auto w-[1027px]  flex-row justify-between"
          }
        >
          <div className={"w-[398px] flex justify-end"}>
            <img
              src="/image/landingpage/career-mig.png"
              className={"w-[398px] h-[253px]"}
              alt=""
            />
          </div>
          <div className={"w-[600px] justify-self-start"}>
            <div className="flex flex-col items-start">
              <h2
                style={{ lineHeight: "120%" }}
                className="mb-2 text-[28px] font-gilroysemibold text-blackmig"
              >
                {t.joinmigsection}
              </h2>
              <h2
                style={{ lineHeight: "120%" }}
                className={"text-2xl font-gilroyregular text-blackmig mt-5"}
              >
                {t.joinmigsubtitle}
              </h2>
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
                    className="text-left ml-3.5 text-xl text-blackmig font-gilroyregular"
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
                    className="text-left ml-3.5 text-xl text-blackmig font-gilroyregular"
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
                    className="text-left ml-3.5 text-xl text-blackmig font-gilroyregular"
                  >
                    {t.joinmigpoint3}
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <a href="/joinourteam">
                  <div className="flex mt-5 justify-end mr-5">
                    <p className="text-xl mr-2 text-primarygreen font-gilroysemibold">
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
        className={"section2landingpagephone block md:hidden px-4 bg-white"}
      >
        <p className={"text-xl text-center font-gilroysemibold py-8 md:py-0"}>
          Interested in{" "}
          <span
            style={{
              borderBottom: "solid 3px #188E4D",
              paddingBottom: "2.5px",
            }}
          >
            joining{" "}
          </span>{" "}
          MIG?
        </p>
        <div className={"grid justify-items-center text-center"}>
          <img
            src="/image/landingpage/career-mig.png"
            className={"w-full h-full"}
            style={{ width: "235px", height: "150px" }}
          />
        </div>
        <div className="flex flex-row py-3 px-2">
          <div className="w-11">
            <img
              src="/image/landingpage/career-icon1.png"
              style={{ width: "36px", height: "36px" }}
            />
          </div>
          <div>
            <p className="text-left px-5 text-sm text-black">
              We love to empower our team members to solve problems that matter
            </p>
          </div>
        </div>
        <div className="flex flex-row py-3 px-2">
          <div className="w-11">
            <img
              src="/image/landingpage/career-icon2.png"
              style={{ width: "36px", height: "36px" }}
            />
          </div>
          <div>
            <p className="text-left px-5 text-sm text-black">
              We offer diverse industry exposures and hands-on experience
            </p>
          </div>
        </div>
        <div className="flex flex-row py-3 px-2">
          <div className="w-11">
            <img
              src="/image/landingpage/career-icon3.png"
              style={{ width: "36px", height: "36px" }}
            />
          </div>
          <div>
            <p className="text-left px-5 text-sm text-black">
              We support personal growth through constant experiment and
              learning
            </p>
          </div>
        </div>
        <div className="self-end mt-5">
          <a href="#">
            <div className="flex mt-5 justify-end mr-5">
              <p className="text-base mr-[13.52px] text-primarygreen font-gilroysemibold">
                Apply for Jobs
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
                    <p className={"text-xl font-gilroysemibold"}>Contact Us</p>
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
                    <p className={"text-xl font-gilroysemibold"}>Learn More</p>
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
              Fulfill your IT needs easily!
            </p>
            <p className={"py-5 text-sm font-gilroyregular"}>
              Need help in providing your needs? Whether they related to
              hardware, software, or even talent hiring? Contact us and hear
              what service can we offer to you and your company!
            </p>
            <Linkk href="/contactus">
              <button
                className={
                  "text-base text-center rounded text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 md:px-4 mt-4"
                }
              >
                <div className={"flex flex-row justify-between"}>
                  <p className={"px-1"}>{t.contactuscta}</p>
                  <img
                    className={"py-1 px-1"}
                    style={{ width: "15px" }}
                    src="/image/landingpage/arrow-forward.png"
                  />
                </div>
              </button>
            </Linkk>
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
  console.log("hasil get api ", resources);
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
