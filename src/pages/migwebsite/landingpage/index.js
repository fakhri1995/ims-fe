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
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function LandingPage({}) {
  const gaEventTracker = useAnalyticsEventTracker("Landing Page");
  const rt = useRouter();
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

  return (
    <Layout>
      {/* <section className={'container mx-auto'}> */}
      <Head>
        <title>
          Mitramas Infosys Global: Hardware, Software, IT Outsourcing.
        </title>
        <meta
          name="description"
          content="We offer cost-effective technology solutions, including hardware managed service, software development, and sourcing of top IT talent. Contact us!"
        />
        <meta
          name="keywords"
          content="managed service, software development, it oursourcing"
        />
      </Head>
      <section
        className={
          "section1landingpage bg-white md:pt-[64px] md:pb-[94px] md:mx-auto md:relative"
        }
      >
        {/* Browser View */}
        <div className={"hidden md:flex container mx-auto relative"}>
          <div className={"flex-col w-2/5"}>
            <p
              className={
                "text-[32px] mt-[34px] font-gilroysemibold gilroy-medium"
              }
            >
              Solve your business technology challenges with our IT expertise
              today
            </p>
            <p className={" text-base font-gilroyregular text-blackmig pb-6"}>
              MIG catalyzes your core business with{" "}
              <span style={{ fontWeight: "bold" }}>IT hardware solutions</span>,
              <span style={{ fontWeight: "bold" }}> software development</span>,
              and <span style={{ fontWeight: "bold" }}>tech talents</span>. We
              serve you the best resource with efficient cost, but high
              maintenance.
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
                      "flex flex-row w-[240px] h-[54px] justify-center text-xl text-primarygreen rounded border-2 border-primarygreen px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none gilroy-medium bg-white"
                    }
                  >
                    <p className={"mr-2"}>Explore Solutions</p>
                    <img
                      className={"items-center self-center ml-2"}
                      style={{ width: "20px", height: "20px" }}
                      src="/image/landingpage/arrow-down-green.png"
                    />
                  </button>
                </Link>
                <button
                  onClick={getFreeConsultation}
                  className={
                    "text-xl text-center w-[256px] h-[54px] text-white rounded border-2 bg-primarygreen border-primarygreen mt-4 gilroy-medium bg-white"
                  }
                >
                  <p className={""}>Get Free Consultation</p>
                </button>
              </div>
              <div className={"container py-5 pr-20 mt-[34px]"}>
                <div
                  className={"border rounded-lg  p-2 bg-greentrans15 w-[442px]"}
                >
                  <div className={"flex flex-row"}>
                    <img
                      className={""}
                      src="/image/landingpage/info.png"
                      style={{ width: "20px", height: "20px" }}
                    />
                    <p className={"text-base font-gilroyregular ml-2"}>
                      <span className={"font-gilroysemibold"}>Trusted </span>
                      in more than
                      <span className={"font-gilroysemibold"}>
                        {" "}
                        45+ cities
                      </span>{" "}
                      and
                      <span className={"font-gilroysemibold"}>
                        {" "}
                        10+ companies{" "}
                      </span>
                      in providing their
                      <span className={"font-gilroysemibold"}>
                        {" "}
                        IT & Business{" "}
                      </span>
                      needs!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"flex-col w-3/5"}>
            <img
              src="/image/landingpage/image-section1.png"
              className={"w-[742px] h-[395px]  "}
            ></img>
          </div>
        </div>
        {/* ---------- */}
        {/* Phone View */}
        <div className={"block md:hidden pt-8"}>
          <div className={"flex-col center"}>
            <div className={"text-center"}>
              <p className={"text-4xl gilroy-bold"}>
                Focus on your best, we take care of the rest
              </p>
            </div>
          </div>
          <div className={"flex-col"}>
            <img
              style={{ width: "1500px", height: "auto" }}
              src="/image/landingpage/image-section1.png"
            />
          </div>
          <div className={"flex-col center"}>
            <div className={"grid justify-items-center text-center"}>
              <Linkk href="/freeconsultation">
                <button
                  className={
                    "flex text-xl text-white border-2 bg-primarygreen rounded border-primarygreen px-3 py-2 md:px-4 md:py-3 mt-4"
                  }
                >
                  <p className={"pl-4 pr-8"}>Get Free Consultation</p>
                </button>
              </Linkk>
            </div>
          </div>
          <div className={"flex-col center"}>
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
                      "flex text-xl text-primarygreen px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none bg-white"
                    }
                  >
                    <p className={""}>Explore Solutions</p>
                    <img
                      className={"mt-1 ml-1"}
                      style={{ width: "20px" }}
                      src="/image/landingpage/arrow-down-green.png"
                    />
                  </button>
                </div>
              </Link>
            </div>
          </div>
          <div className={"container mx-auto mt-2"}>
            <div className={"border rounded-lg shadow-lg p-4 bg-green15"}>
              <div className={"flex flex-row"}>
                <img
                  className={"pr-1"}
                  src="/image/landingpage/info.png"
                  style={{ width: "30px", height: "30px" }}
                />
                <p className={"text-base gilroy-semibold"}>
                  <span style={{ fontWeight: "bold" }}>Trusted </span>
                  in more than
                  <span style={{ fontWeight: "bold" }}> 45+ cities</span> and
                  <span style={{ fontWeight: "bold" }}> 10+ companies </span>
                  in providing their
                  <span style={{ fontWeight: "bold" }}> IT & Business </span>
                  needs!
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* ------------ */}
      </section>
      {/*section it resource */}
      <section
        className={
          "youronestop hidden md:block py-4 md:py-12 bg-transp60 text-center"
        }
      >
        <div className={"container mx-auto"}>
          <p
            className={
              "text-xl md:text-[32px] text-blackmig gilroy-medium md:py-0"
            }
          >
            What{" "}
            <span
              style={{
                borderBottom: "solid 3px #188E4D",
                paddingBottom: "2.5px",
              }}
            >
              IT resources/solutions
            </span>{" "}
            do you need?
          </p>
        </div>
        <div
          className={
            "mt-[118px] mx-auto w-[1122px] flex flex-row justify-between"
          }
        >
          <div className={"flex flex-col items-center"}>
            <div
              className={
                "bg-lightblue hover:shadow-2xl rounded-xl w-[332px] pb-8 px-4 relative pt-24"
              }
            >
              <div className={"grid justify-items-center"}>
                <img
                  src="/image/landingpage/hero-talent.png"
                  alt=""
                  className={
                    "absolute w-[241px] h-[139px] hover:w-[300px] hover:h-[180px] -top-20"
                  }
                />
              </div>
              <div>
                <p
                  className={
                    "text-center text-[32px] text-accentblue gilroy-bold font-bold"
                  }
                >
                  Hardware
                </p>
                <p
                  className={
                    "text-center text-base font-gilroysemibold gilroy-semibold mt-1"
                  }
                >
                  Lighten up your heavy capital in IT infrastructure
                </p>
                <p className={"text-center text-sm font-gilroyregular mt-5"}>
                  Transform yours into managed service model, guaranteeing you
                  with predictable monthly cost and excelent service level.
                </p>

                <div className={"text-center mt-5"}>
                  <Linkk href="/hardware">
                    <button
                      className={
                        "text-sm text-center rounded h-[40px] w-[125px] text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 focus:outline-none gilroy-medium bg-white"
                      }
                    >
                      <div className={"flex flex-row justify-between"}>
                        <p className={"px-1"}>Get Yours</p>
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
            </div>
          </div>
          <div className={"flex flex-col items-center"}>
            <div
              className={
                "bg-lightgreen hover:shadow-2xl rounded-xl w-[332px] pb-8 px-4 relative pt-24"
              }
            >
              <div className={"grid justify-items-center"}>
                <img
                  src="/image/landingpage/hero-software.png"
                  alt=""
                  className={
                    "absolute w-[241px] h-[139px] hover:w-[300px] hover:h-[180px] -top-20"
                  }
                />
              </div>
              <div>
                <p
                  className={
                    "text-center text-[32px] text-darkgreen gilroy-bold font-bold"
                  }
                >
                  Software
                </p>
                <p
                  className={
                    "text-center text-base font-gilroysemibold gilroy-semi-bold mt-1 pb-[42.5px]"
                  }
                >
                  Delivering custom-made software
                </p>
                <p
                  className={
                    "text-center text-sm font-gilroyregular pb-[42.5px]"
                  }
                >
                  Simplify and digitalize your business process. Customize your
                  system with us.
                </p>

                <div className={"text-center"}>
                  <Linkk href="/software">
                    <button
                      className={
                        "text-sm text-center rounded h-[40px] w-[125px] text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 focus:outline-none gilroy-medium bg-white"
                      }
                    >
                      <div className={"flex flex-row justify-between"}>
                        <p className={"px-1"}>Get Yours</p>
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
            </div>
          </div>
          <div className={"flex flex-col items-center"}>
            <div
              className={
                "bg-lightgrey hover:shadow-2xl rounded-xl w-[332px] pb-8 px-4 relative pt-24"
              }
            >
              <div className={"grid justify-items-center"}>
                <img
                  src="/image/landingpage/hero-hardware.png"
                  alt=""
                  className={
                    "absolute w-[241px] h-[139px] hover:w-[300px] hover:h-[180px] -top-20"
                  }
                />
              </div>
              <div>
                <p
                  className={
                    "text-center text-[32px] text-accentpurple gilroy-bold font-bold"
                  }
                >
                  Talents
                </p>
                <p
                  className={
                    "text-center text-base font-gilroysemibold gilroy-semi-bold mt-1 pb-8"
                  }
                >
                  Our people, your growth
                </p>
                <p className={"text-center text-sm font-gilroyregular pb-8"}>
                  Let us streamline your hiring process with on-demand
                  expertise, giving you flexible headcounts and talents working
                  period.
                </p>

                <div className={"text-center"}>
                  <Linkk href="/talents">
                    <button
                      className={
                        "text-sm text-center text-white rounded h-[40px] w-[125px] border-2 bg-primarygreen border-primarygreen px-4 py-2 focus:outline-none gilroy-medium bg-white"
                      }
                    >
                      <div className={"flex flex-row justify-between"}>
                        <p className={"px-1"}>Hire Now</p>
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
          <p className={"text-xl md:text-2xl gilroy-bold py-8 md:py-0"}>
            We are your one stop{" "}
            <span
              style={{
                borderBottom: "solid 3px #188E4D",
                paddingBottom: "2.5px",
              }}
            >
              cost efficient
            </span>{" "}
            IT solutions
          </p>
        </div>
        <Slider {...sliderSettingsPhone}>
          <div>
            <Card
              bordered
              style={{
                boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
              }}
            >
              <div className="bg-lightblue px-4 py-6">
                <div className={"grid justify-items-center text-center"}>
                  <img
                    src="/image/landingpage/Hardware.png"
                    className={"w-full h-full"}
                    style={{ width: "200px", height: "116px" }}
                  />
                </div>
                <p className="text-base text-accentblue text-left mt-4 gilroy-bold font-bold">
                  Hardware
                </p>
                <p className="text-sm text-black text-left mt-1 gilroy-semibold font-gilroysemibold">
                  Lighten up your heavy capital in IT infrastructure
                </p>
                <p className="text-sm text-black text-left mt-1 font-gilroyregular font-regular">
                  Transform yours into managed service model, guaranteeing you
                  with predictable monthly cost and excelent service level.
                </p>
                <div className={"flex mt-16 justify-end"}>
                  <Linkk href="/hardware">
                    <button
                      className={
                        "text-sm text-center -mt-10 text-white border-2 bg-green-600 border-green-600 px-4 py-2 md:px-4 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black bg-white"
                      }
                    >
                      <div className={"flex flex-row justify-between"}>
                        <p className={"px-1 text-base"}>Learn More</p>
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
            </Card>
          </div>
          <div>
            <Card
              bordered
              style={{
                boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
              }}
            >
              <div className="bg-lightblue px-4 py-6">
                <div className={"grid justify-items-center text-center"}>
                  <img
                    src="/image/landingpage/Software.png"
                    className={"w-full h-full"}
                    style={{ width: "200px", height: "116px" }}
                  />
                </div>
                <p className="text-base text-darkgreen text-left mt-4 gilroy-bold font-bold">
                  Software
                </p>
                <p className="text-sm text-black text-left mt-1 gilroy-semibold font-gilroysemibold">
                  Automate your business
                </p>
                <p className="text-sm text-black text-left mt-1 font-gilroyregular font-regular">
                  Simplify and digitalize your business process. Customize your
                  system with us.
                </p>
                <div className={"flex mt-16 justify-end"}>
                  <Linkk href="/software">
                    <button
                      className={
                        "text-sm text-center -mt-10 text-white border-2 bg-green-600 border-green-600 px-4 py-2 md:px-4 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black bg-white"
                      }
                    >
                      <div className={"flex flex-row justify-between"}>
                        <p className={"px-1 text-base"}>Learn More</p>
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
            </Card>
          </div>
          <div>
            <Card
              bordered
              style={{
                boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
              }}
            >
              <div className="bg-lightblue px-4 py-6">
                <div className={"grid justify-items-center text-center"}>
                  <img
                    src="/image/landingpage/Talents.png"
                    className={"w-full h-full"}
                    style={{ width: "200px", height: "116px" }}
                  />
                </div>
                <p className="text-base text-accentpurple text-left mt-4 gilroy-bold font-bold">
                  Talents
                </p>
                <p className="text-sm text-black text-left mt-1 gilroy-semibold font-gilroysemibold">
                  Our people, your growth
                </p>
                <p className="text-sm text-black text-left mt-1 font-gilroyregular font-regular">
                  Let us streamline your hiring process with on-demand
                  expertise, giving you flexible headcounts and talents working
                  period.
                </p>
                <div className={"flex mt-16 justify-end"}>
                  <Linkk href="/talents">
                    <button
                      className={
                        "text-sm text-center -mt-10 text-white border-2 bg-green-600 border-green-600 px-4 py-2 md:px-4 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black bg-white"
                      }
                    >
                      <div className={"flex flex-row justify-between"}>
                        <p className={"px-1 text-base"}>Learn More</p>
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
            </Card>
          </div>
        </Slider>
      </section>
      <section
        className={
          "youronestop hidden md:block md:pt-[49px] md:pb-12 bg-bgjoinmig"
        }
      >
        <div className={"container mx-auto"}>
          <p
            className={
              "text-xl text-center md:text-2xl font-gilroysemibold py-8 md:py-0"
            }
          >
            A trusted partner after 15+ years of experience across Indonesia!
          </p>
          <div className={"flex justify-center md:mt-12"}>
            <div className={"flex-col text-black md:w-40 mr-8 md:mr-16"}>
              <p
                className={
                  "text-2xl text-primarygreen md:text-[32px] text-center font-gilroyregular font-semibold "
                }
              >
                <CountUp end={45} />+
              </p>
              <p
                className={
                  "hidden md:block text-lg md:text-2xl  text-center text-darkgrey font-gilroysemibold mt-0.5"
                }
              >
                cities
              </p>
              <p
                className={
                  "block md:hidden text-base md:text-xl text-center text-darkgrey font-gilroysemibold"
                }
              >
                cities
              </p>
            </div>
            <div className={"flex-col text-black md:w-[227px] mr-16"}>
              <p
                className={
                  "text-2xl text-primarygreen md:text-[32px] text-center font-gilroyregular font-semibold"
                }
              >
                <CountUp end={9000} />+
              </p>
              <p
                className={
                  "hidden w-[227px] md:block text-2xl text-center text-darkgrey font-gilroysemibold mt-0.5"
                }
              >
                managed & leased devices
              </p>
              <p
                className={
                  "block md:hidden text-base md:text-xl text-center text-darkgrey font-gilroysemibold"
                }
              >
                managed & leased devices
              </p>
            </div>
            <div className={"flex-col text-black"}>
              <p
                className={
                  "text-2xl text-primarygreen md:text-[32px] text-center font-gilroyregular font-semibold"
                }
              >
                <CountUp end={100} />+
              </p>
              <p
                className={
                  "hidden md:block text-lg md:text-2xl text-center text-darkgrey font-gilroysemibold mt-0.5"
                }
              >
                IT projects
              </p>
              <p
                className={
                  "block md:hidden text-base md:text-xl text-center text-darkgrey font-gilroysemibold"
                }
              >
                IT projects
              </p>
            </div>
          </div>
        </div>
        <div className={"flex justify-between -mt-48"}>
          <div className={"justify-start"}>
            <img
              style={{ width: "214px", height: "202px" }}
              src="/image/landingpage/image-left.png"
            />
          </div>
          <div className={"justify-end"}>
            <img
              style={{ width: "214px", height: "202px" }}
              src="/image/landingpage/image-right.png"
            />
          </div>
        </div>
      </section>
      {/*section trusted mobile */}
      <section
        className={
          "phonetrustedpartnermobile block md:hidden py-4 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 md:relative md:bottom-32 text-center"
        }
      >
        <div className={"container mx-auto"}>
          <p className={"text-xl md:text-2xl gilroy-bold py-8 md:py-0"}>
            A trusted partner after 15+ years of experience across Indonesia!
          </p>
          <div className="flex">
            <div className={"justify-start self-end"}>
              <img
                style={{ width: "36px", height: "74px" }}
                src="/image/landingpage/trusted-left.png"
              />
            </div>
            <div className={"container mx-auto"}>
              <div className={"flex justify-around py-5"}>
                <div
                  className={
                    "flex-col text-black p-1 md:px-4 md:py-2 mx-auto md:w-40 lg:w-52"
                  }
                >
                  <p
                    className={
                      "text-xl text-primarygreen md:text-5xl lg:text-5xl text-center gilroy-semibold font-gilroysemibold "
                    }
                  >
                    <CountUp end={45} />+
                  </p>
                  <p
                    className={
                      "text-xs text-center gilroy-semibold font-gilroysemibold text-darkgrey"
                    }
                  >
                    cities
                  </p>
                </div>
                <div
                  className={
                    "flex-col text-black p-1 md:px-4 md:py-2 mx-auto md:w-40 lg:w-52"
                  }
                >
                  <p
                    className={
                      "text-xl text-primarygreen md:text-5xl lg:text-5xl text-center gilroy-semibold font-gilroysemibold "
                    }
                  >
                    <CountUp end={9000} />+
                  </p>
                  <p
                    className={
                      "text-xs text-center gilroy-semibold font-gilroysemibold text-darkgrey"
                    }
                  >
                    managed and leased devices
                  </p>
                </div>
                <div
                  className={
                    "flex-col text-black p-1 md:px-4 md:py-2 mx-auto md:w-40 lg:w-52"
                  }
                >
                  <p
                    className={
                      "text-xl text-primarygreen md:text-5xl lg:text-5xl text-center gilroy-semibold font-gilroysemibold"
                    }
                  >
                    <CountUp end={100} />+
                  </p>
                  <p
                    className={
                      "text-xs text-center gilroy-semibold font-gilroysemibold text-darkgrey"
                    }
                  >
                    IT projects
                  </p>
                </div>
              </div>
            </div>
            <div className={"justify-end self-end"}>
              <img
                style={{ width: "36px", height: "74px" }}
                src="/image/landingpage/trusted-right.png"
              />
            </div>
          </div>
        </div>
      </section>
      <section className={"session4landingpage py-4 md:py-16 text-center"}>
        <div className={"container mx-auto"}>
          <p
            className={
              "text-xl md:text-[32px] font-gilroysemibold text-blackmig"
            }
          >
            Why you should work{" "}
            <span
              style={{
                borderBottom: "solid 3px #188E4D",
                paddingBottom: "2.5px",
              }}
            >
              with us
            </span>{" "}
            ?
          </p>
        </div>
        <div
          className={
            "md:flex md:flex-row md:justify-between mx-auto md:w-[1108px]"
          }
        >
          <div className="flex mt-4 md:mt-[42px] py-1 md:py-2 px-2 md:px-4 md:mx-[21px] md:h-[152px] md:w-[533px] bg-greenTrans5 rounded-lg md:flex-row ">
            {/* <div className={""}> */}
            <img
              className="w-[117px] h-[136px]"
              src="/image/landingpage/on_demand.png"
              alt=""
            />
            {/* </div> */}
            <div className=" ml-6 self-center">
              <h5 className="mb-1 text-sm text-left md:text-xl font-gilroysemibold text-primarygreen ">
                On Demand Services
              </h5>
              <p className="text-left text-sm md:text-base text-blackmig font-gilroyregular">
                Transform your business with our custom solutions to optimize
                your cost and productivity
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
          <div className="flex mt-4 md:mt-[42px] py-1 md:py-2 px-2 md:px-4 md:mx-[21px] md:w-[533px] md:h-[152px] bg-greenTrans5 rounded-lg md:flex-row">
            <img
              className="w-[117px] h-[136px]"
              src="/image/landingpage/reliable_partner.png"
              alt=""
            />
            <div className=" ml-6 self-center">
              <h5 className="mb-1 text-sm text-left md:text-xl font-gilroysemibold text-primarygreen ">
                Reliable Partner
              </h5>
              <p className="text-left text-sm md:text-base text-blackmig font-gilroyregular">
                A partner you can trust, with more than 15 years of
                experiences-we’re here for the long run
              </p>
            </div>
          </div>
        </div>
        <div
          className={
            "md:flex md:flex-row md:justify-between mx-auto md:w-[1108px]"
          }
        >
          <div className="flex mt-4 md:mt-[42px] md:mx-[21px] py-1 md:py-2 px-2 md:px-4 md:w-[533px] items-center bg-greenTrans5 rounded-lg md:flex-row ">
            <img
              className="w-[117px] h-[136px]"
              src="/image/landingpage/competitive_rates.png"
              alt=""
            />
            <div className=" ml-6 self-center">
              <h5 className="mb-1 text-sm text-left md:text-xl font-gilroysemibold text-primarygreen ">
                Competitive Rate
              </h5>
              <p className="text-left text-sm md:text-base text-blackmig font-gilroyregular">
                We offer the best services with the best price tailored to your
                needs
              </p>
            </div>
          </div>
          <div className="flex mt-4 md:mt-[42px] py-1 md:py-2 px-2 md:px-4 md:mx-[21px] md:w-[533px] bg-greenTrans5 rounded-lg md:flex-row">
            <img
              src="/image/landingpage/cost_efficient.png"
              alt=""
              className="w-[117px] h-[136px]"
            />
            <div className=" ml-6 self-center">
              <h5 className="mb-1 text-sm text-left md:text-xl font-gilroysemibold text-primarygreen ">
                Cost Efficient
              </h5>
              <p className="text-left text-sm md:text-base text-blackmig font-gilroyregular">
                We help you grow and offer solutions to help optimized your
                bussiness
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* testimonial */}
      <section
        className={
          "section3landingpageadvantages hidden md:block bg-bgjoinmig py-8 md:pt-8 md:py-16 px-[30px] md:px-10"
        }
      >
        <p
          className={
            "text-xl md:text-3xl text-center gilroy-semibold font-gilroysemibold mb-[42px]"
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
                    <br className="hidden xl:block"></br> optimize your cost and
                    productivity
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
                    <br className="hidden xl:block"></br> optimize your cost and
                    productivity
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
          <div
            className={"center md:content-around hidden md:block"}
            style={{ maxWidth: 1000 }}
          >
            <Slider {...sliderSettings2} ref={slider}>
              <div
                className="pt-6 pb-8 md:px-16 bg-white rounded-lg"
                style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
              >
                <div className="flex flex-row justify-between">
                  <p className="text-[32px] text-darkgrey italic gilroy-semibold font-gilroysemibold">
                    "
                  </p>
                  <p className="text-[32px] text-darkgrey italic gilroy-semibold font-gilroysemibold">
                    "
                  </p>
                </div>
                <p className="pb-4 font-gilroyregular text-xl text-blackmig mx-auto text-center">
                  I had a{" "}
                  <span className={"text-primarygreen font-gilroysemibold"}>
                    wonderful experience
                  </span>{" "}
                  working with Mitramas Infosys Global. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit, sed do eiusmod{" "}
                  <span className={"text-primarygreen font-gilroysemibold"}>
                    tempor incididunt
                  </span>{" "}
                  ut labore et dolore magna aliqua.
                </p>
                <div
                  className={
                    "border-solid border border-dividermig mt-6 mx-auto w-[417px] h-0"
                  }
                ></div>
                <div className="flex flex-col items-center mt-6">
                  <div className="flex justify-center">
                    <img
                      className="rounded-full mr-4"
                      src="/image/landingpage/testimonial-user.png"
                      style={{ height: "68px", width: "68px" }}
                      alt=""
                    />
                    <div className="self-center">
                      <p
                        className={
                          "text-blackmig font-gilroysemibold text-base"
                        }
                      >
                        Fachri Fauzan
                      </p>
                      <p
                        className={"text-darkgrey font-gilroysemibold text-sm"}
                      >
                        Talent Acquisition at Bukopin
                      </p>
                    </div>
                    <div className="ml-6">
                      <img
                        style={{ height: "68px", width: "81px" }}
                        src="/image/landingpage/testimonial-client.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="flex flex-row justify-center mx-2 mt-6">
                    <div className="bg-greenTrans20 mr-6 px-2 py-2 rounded-[20px]">
                      <p className="text-sm text-primarygreen font-gilroyregular">
                        <span className={"font-gilroysemibold"}>
                          Industry :{" "}
                        </span>
                        Banking
                      </p>
                    </div>
                    <div className="bg-lightblue px-2 py-2 rounded-[20px]">
                      <p className="text-sm text-primarygreen font-gilroyregular">
                        <span className={"font-gilroysemibold"}>
                          Service :{" "}
                        </span>
                        Hardware, Talents
                      </p>
                    </div>
                  </div>
                  <a href="#">
                    <div className="flex justify-between mx-auto mt-6 py-2 px-4 w-[142px]">
                      <p className="text-base text-primarygreen font-gilroysemibold gilroy-semibold">
                        Read more
                      </p>
                      <img
                        className={"self-center"}
                        style={{ width: "8px", height: "15px" }}
                        src="/image/landingpage/arrow-forward-ios.png"
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div
                className="pt-6 pb-8 md:px-16 bg-white rounded-lg"
                style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
              >
                <div className="flex flex-row justify-between">
                  <p className="text-[32px] text-darkgrey italic gilroy-semibold font-gilroysemibold">
                    "
                  </p>
                  <p className="text-[32px] text-darkgrey italic gilroy-semibold font-gilroysemibold">
                    "
                  </p>
                </div>
                <p className="pb-4 font-gilroyregular text-xl text-blackmig mx-auto text-center">
                  I had a{" "}
                  <span className={"text-primarygreen font-gilroysemibold"}>
                    wonderful experience
                  </span>{" "}
                  working with Mitramas Infosys Global. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit, sed do eiusmod{" "}
                  <span className={"text-primarygreen font-gilroysemibold"}>
                    tempor incididunt
                  </span>{" "}
                  ut labore et dolore magna aliqua.
                </p>
                <div
                  className={
                    "border-solid border-2 border-dividermig mt-6 mx-auto w-[417px] h-0"
                  }
                ></div>
                <div className="flex flex-col items-center mt-6">
                  <div className="flex justify-center">
                    <img
                      className="rounded-full mr-4"
                      src="/image/landingpage/testimonial-user.png"
                      style={{ height: "68px", width: "68px" }}
                      alt=""
                    />
                    <div className="self-center">
                      <p
                        className={
                          "text-blackmig font-gilroysemibold text-base"
                        }
                      >
                        Fachri Fauzan
                      </p>
                      <p
                        className={"text-darkgrey font-gilroysemibold text-sm"}
                      >
                        Talent Acquisition at Bukopin
                      </p>
                    </div>
                    <div className="ml-6">
                      <img
                        style={{ height: "68px", width: "81px" }}
                        src="/image/landingpage/testimonial-client.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="flex flex-row justify-center mx-2 mt-6">
                    <div className="bg-greenTrans20 mr-6 px-2 py-2 rounded-[20px]">
                      <p className="text-sm text-primarygreen font-gilroyregular">
                        <span className={"font-gilroysemibold"}>
                          Industry :{" "}
                        </span>
                        Banking
                      </p>
                    </div>
                    <div className="bg-lightblue px-2 py-2 rounded-[20px]">
                      <p className="text-sm text-primarygreen font-gilroyregular">
                        <span className={"font-gilroysemibold"}>
                          Service :{" "}
                        </span>
                        Hardware, Talents
                      </p>
                    </div>
                  </div>
                  <a href="#">
                    <div className="flex justify-between mx-auto mt-6 py-2 px-4 w-[142px]">
                      <p className="text-base text-primarygreen font-gilroysemibold gilroy-semibold">
                        Read more
                      </p>
                      <img
                        className={"self-center"}
                        style={{ width: "8px", height: "15px" }}
                        src="/image/landingpage/arrow-forward-ios.png"
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div
                className="pt-6 pb-8 md:px-16 bg-white rounded-lg"
                style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
              >
                <div className="flex flex-row justify-between">
                  <p className="text-[32px] text-darkgrey italic gilroy-semibold font-gilroysemibold">
                    "
                  </p>
                  <p className="text-[32px] text-darkgrey italic gilroy-semibold font-gilroysemibold">
                    "
                  </p>
                </div>
                <p className="pb-4 font-gilroyregular text-xl text-blackmig mx-auto text-center">
                  I had a{" "}
                  <span className={"text-primarygreen font-gilroysemibold"}>
                    wonderful experience
                  </span>{" "}
                  working with Mitramas Infosys Global. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit, sed do eiusmod{" "}
                  <span className={"text-primarygreen font-gilroysemibold"}>
                    tempor incididunt
                  </span>{" "}
                  ut labore et dolore magna aliqua.
                </p>
                <div
                  className={
                    "border-solid border-2 border-dividermig mt-6 mx-auto w-[417px] h-0"
                  }
                ></div>
                <div className="flex flex-col items-center mt-6">
                  <div className="flex justify-center">
                    <img
                      className="rounded-full mr-4"
                      src="/image/landingpage/testimonial-user.png"
                      style={{ height: "68px", width: "68px" }}
                      alt=""
                    />
                    <div className="self-center">
                      <p
                        className={
                          "text-blackmig font-gilroysemibold text-base"
                        }
                      >
                        Fachri Fauzan
                      </p>
                      <p
                        className={"text-darkgrey font-gilroysemibold text-sm"}
                      >
                        Talent Acquisition at Bukopin
                      </p>
                    </div>
                    <div className="ml-6">
                      <img
                        style={{ height: "68px", width: "81px" }}
                        src="/image/landingpage/testimonial-client.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="flex flex-row justify-center mx-2 mt-6">
                    <div className="bg-greenTrans20 mr-6 px-2 py-2 rounded-[20px]">
                      <p className="text-sm text-primarygreen font-gilroyregular">
                        <span className={"font-gilroysemibold"}>
                          Industry :{" "}
                        </span>
                        Banking
                      </p>
                    </div>
                    <div className="bg-lightblue px-2 py-2 rounded-[20px]">
                      <p className="text-sm text-primarygreen font-gilroyregular">
                        <span className={"font-gilroysemibold"}>
                          Service :{" "}
                        </span>
                        Hardware, Talents
                      </p>
                    </div>
                  </div>
                  <a href="#">
                    <div className="flex justify-between mx-auto mt-6 py-2 px-4 w-[142px]">
                      <p className="text-base text-primarygreen font-gilroysemibold gilroy-semibold">
                        Read more
                      </p>
                      <img
                        className={"self-center"}
                        style={{ width: "8px", height: "15px" }}
                        src="/image/landingpage/arrow-forward-ios.png"
                      />
                    </div>
                  </a>
                </div>
              </div>
            </Slider>
          </div>
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
        </div>
        <div className={"container mx-auto text-center mt-[42px]"}>
          <p
            className={
              "text-sm text-darkgrey gilroy-semibold font-gilroysemibold"
            }
          >
            Join hundreds of our clients and partners in fulfilling your needs
          </p>
        </div>
        <div className={"flex flex-row justify-center mt-6"}>
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
      </section>
      {/* testimonial mobile */}
      <section
        className={
          "sectiontestimonialmobile block md:hidden bg-bgjoinmig pt-8 pb-[178px] px-[30px] md:px-10"
        }
      >
        <p
          className={
            "text-xl md:text-3xl text-center gilroy-semibold font-gilroysemibold md:py-0 mb-7 md:mb-10"
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
            <div
              className="py-4 px-8 bg-white rounded-lg"
              style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
            >
              <div className="">
                <p className="text-sm text italic gilroy-semibold font-gilroysemibold">
                  "
                </p>

                <p className="pb-4 gilroy-medium text-sm mx-auto text-left">
                  I had a{" "}
                  <span className={"text-primarygreen font-gilroysemibold"}>
                    wonderful experience{" "}
                  </span>
                  working with Mitramas Infosys Global. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit, sed do eiusmod{" "}
                  <span className={"text-primarygreen font-gilroysemibold"}>
                    tempor incididunt{" "}
                  </span>
                  ut labore et dolore magna aliqua.
                  <br className="hidden xl:block"></br> optimize your cost and
                  productivity
                </p>
                <p className="text-sm text italic gilroy-semibold font-gilroysemibold">
                  "
                </p>
                <div className="flex flex-col">
                  <div className="flex flex-row mt-2">
                    <img
                      className="rounded-full"
                      src="/image/landingpage/testimonial-user.png"
                      style={{ height: "40px", width: "60px" }}
                      alt=""
                    />
                    <div className="self-center ml-[6.8px]">
                      <p className="text-xs font-gilroysemibold Gilroy-semibold text-black">
                        Fachri Fauzan
                      </p>
                      <p className="text-xs font-gilroysemibold Gilroy-semibold text-darkgrey">
                        Talent Acquisition at Bukopin
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="py-4 px-8 bg-white rounded-lg"
              style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
            >
              <div className="">
                <p className="text-sm text italic gilroy-semibold font-gilroysemibold">
                  "
                </p>

                <p className="pb-4 gilroy-medium text-sm mx-auto text-left">
                  I had a{" "}
                  <span className={"text-primarygreen font-gilroysemibold"}>
                    wonderful experience{" "}
                  </span>
                  working with Mitramas Infosys Global. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit, sed do eiusmod{" "}
                  <span className={"text-primarygreen font-gilroysemibold"}>
                    tempor incididunt{" "}
                  </span>
                  ut labore et dolore magna aliqua.
                  <br className="hidden xl:block"></br> optimize your cost and
                  productivity
                </p>
                <p className="text-sm text italic gilroy-semibold font-gilroysemibold">
                  "
                </p>
                <div className="flex flex-col">
                  <div className="flex flex-row mt-2">
                    <img
                      className="rounded-full"
                      src="/image/landingpage/testimonial-user.png"
                      style={{ height: "40px", width: "60px" }}
                      alt=""
                    />
                    <div className="self-center ml-[6.8px]">
                      <p className="text-xs font-gilroysemibold Gilroy-semibold text-black">
                        Fachri Fauzan
                      </p>
                      <p className="text-xs font-gilroysemibold Gilroy-semibold text-darkgrey">
                        Talent Acquisition at Bukopin
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="py-4 px-8 bg-white rounded-lg"
              style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
            >
              <div className="">
                <p className="text-sm text italic gilroy-semibold font-gilroysemibold">
                  "
                </p>

                <p className="pb-4 gilroy-medium text-sm mx-auto text-left">
                  I had a{" "}
                  <span className={"text-primarygreen font-gilroysemibold"}>
                    wonderful experience{" "}
                  </span>
                  working with Mitramas Infosys Global. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit, sed do eiusmod{" "}
                  <span className={"text-primarygreen font-gilroysemibold"}>
                    tempor incididunt{" "}
                  </span>
                  ut labore et dolore magna aliqua.
                  <br className="hidden xl:block"></br> optimize your cost and
                  productivity
                </p>
                <p className="text-sm text italic gilroy-semibold font-gilroysemibold">
                  "
                </p>
                <div className="flex flex-col">
                  <div className="flex flex-row mt-2">
                    <img
                      className="rounded-full"
                      src="/image/landingpage/testimonial-user.png"
                      style={{ height: "40px", width: "60px" }}
                      alt=""
                    />
                    <div className="self-center ml-[6.8px]">
                      <p className="text-xs font-gilroysemibold Gilroy-semibold text-black">
                        Fachri Fauzan
                      </p>
                      <p className="text-xs font-gilroysemibold Gilroy-semibold text-darkgrey">
                        Talent Acquisition at Bukopin
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
        <div className={"block md:hidden mt-16 flex justify-center"}>
          <button className={"w-[142px] py-2 px-4 bg-bgjoinmig"}>
            <div className={"flex flex-row justify-around"}>
              <p
                className={
                  "text-base text-primarygreen gilroy-semibold font-gilroysemibold"
                }
              >
                Read More
              </p>
              <img
                className={"self-center"}
                style={{ height: "15.64px", width: "8.95px" }}
                src="/image/landingpage/arrow-forward-ios.png"
              />
            </div>
          </button>
        </div>
      </section>
      {/* client */}
      {/*section join mig*/}
      <section
        className={
          "section2landingpagebrowser bg-transp60 md:pt-[53px] md:pb-[150px]"
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
          <div className={"w-[589px] justify-self-start"}>
            <div className="flex flex-col items-start">
              <h4 className="mb-2 text-2xl font-gilroyregular font-gilroysemibold text-blackmig">
                Interested in joining MIG?
              </h4>
              <div className="flex flex-row items-center mt-5">
                <div className="">
                  <img
                    src="/image/landingpage/career-icon1.png"
                    className="w-[42px] h-[42px]"
                  />
                </div>
                <div>
                  <p className="text-left ml-3.5 text-base text-blackmig font-gilroyregular">
                    We love to empower our team members to solve problems that
                    matter
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center mt-3">
                <div className="w-11">
                  <img
                    src="/image/landingpage/career-icon2.png"
                    className="w-[42px] h-[42px]"
                  />
                </div>
                <div>
                  <p className="text-left ml-3.5 text-base text-blackmig font-gilroyregular">
                    We offer diverse industry exposures and hands-on experience
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
                  <p className="text-left ml-3.5 text-base text-blackmig font-gilroyregular">
                    We support personal growth through constant experiment and
                    learning
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <a href="/contactus">
                  <div className="flex mt-5 justify-end mr-5">
                    <p className="text-base mr-2 text-primarygreen font-gilroysemibold gilroy-semibold">
                      Apply for jobs
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

      <section className={"section2landingpagephone block md:hidden px-4"}>
        <p
          className={
            "text-xl md:text-2xl text-center gilroy-semibold py-8 md:py-0"
          }
        >
          Interested in joining MIG?
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
              <p className="text-base mr-2 text-primarygreen font-gilroysemibold gilroy-semibold">
                Apply for jobs
              </p>
              <img
                className={"py-1"}
                style={{ width: "8px" }}
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
              "bg-white border-3 mx-auto w-[645px] border-solid shadow-2xl rounded-lg text-center -mt-[144px] py-[31.38px] px-4"
            }
          >
            <p className={"text-2xl font-gilroysemibold text-black"}>
              Fulfill your IT needs easily!
            </p>
            <div
              className={
                "mt-3.5 text-base font-gilroyregular text-center text-black"
              }
            >
              <p>
                Need help in providing your needs? Whether they related to
                hardware,{" "}
              </p>
              <p>software, or even talent hiring?</p>
              <p>
                Contact us and hear what service can we offer to you and your
                company!
              </p>
            </div>
            <Linkk href="/contactus">
              <button
                className={
                  "text-sm w-[145px] h-[40px] text-white border-2 rounded bg-primarygreen border-primarygreen"
                }
              >
                <div className={"flex flex-row"}>
                  <p
                    className={
                      "text-base gilroy-semibold font-gilroysemibold ml-4 mr-3.5"
                    }
                  >
                    Contact Us
                  </p>
                  <img
                    className={"self-center"}
                    style={{ height: "20px", width: "20px" }}
                    src="/image/landingpage/arrow_forward_ios2.png"
                  />
                </div>
              </button>
            </Linkk>
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
        className={
          "contactusphone mt-20 md:relative block md:hidden md:flex bg-bgfooter pt-8"
        }
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
                  "text-base text-center -mt-10 text-white border-2 bg-green-600 border-green-600 px-4 py-2 md:px-4 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black bg-white"
                }
              >
                <div className={"flex flex-row justify-between"}>
                  <p className={"px-1"}>Contact Us</p>
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
        <div className={"flex justify-between self-end"}>
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

export default LandingPage;
