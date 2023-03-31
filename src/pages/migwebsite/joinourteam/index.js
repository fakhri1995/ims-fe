import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";
import { Collapse } from "antd";
import Head from "next/head";
import Linkk from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Link } from "react-scroll";
import Slider from "react-slick";

import { CareersAtMig } from "components/screen/joinourteam";

import LayoutFormContactUs from "../../../components/migwebsite/layout-form-contact-us.js";
import Layout from "../../../components/migwebsite/layout.js";
import en from "../../../locales/en";
import id from "../../../locales/id";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function JoinOurTeam({ dataCareers, empData }) {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : id;
  const careers = dataCareers.data ?? [];
  const { Panel } = Collapse;
  const sliderSettings2 = {
    adaptiveHeight: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
  };
  return (
    <Layout>
      <Head>
        <title>{t.careermetatitle}</title>
        <meta name="description" content={t.careermetadescription} />
      </Head>
      <section
        className={"section2careers  px-4 lg:px-[112px] z-50"}
        style={{ background: "#F4F4F4" }}
      >
        <div className={"block lg:flex"}>
          <div className={"flex py-4"}>
            <Link
              activeClass="active"
              to="section3careers"
              spy={true}
              smooth={true}
              offset={-120}
              className={"mr-12"}
              duration={500}
            >
              <button
                className={
                  "font-gilroyregular text-base text-blackmig cursor-pointer flex-col focus:outline-none jot-underlined bg-transparent"
                }
                style={{}}
              >
                {locale == "en" ? "Our Values" : "Pilar Kami"}
              </button>
            </Link>
            <div className={"hidden lg:block"}>
              <Link
                activeClass="active"
                to="section6careers"
                spy={true}
                smooth={true}
                offset={-120}
                className={"mr-12"}
                duration={500}
              >
                <button
                  className={
                    "font-gilroyregular text-base text-blackmig cursor-pointer flex-col focus:outline-none jot-underlined bg-transparent"
                  }
                  style={{}}
                >
                  {locale == "en" ? "Benefits" : " Fasilitas"}
                </button>
              </Link>
            </div>
            <div className={"lg:hidden"}>
              <Link
                activeClass="active"
                to="section6careersmobile"
                spy={true}
                smooth={true}
                offset={-120}
                className={"mr-12"}
                duration={500}
              >
                <button
                  className={
                    "font-gilroyregular text-base text-blackmig cursor-pointer flex-col focus:outline-none jot-underlined bg-transparent"
                  }
                  style={{}}
                >
                  {locale == "en" ? "Benefits" : " Fasilitas"}
                </button>
              </Link>
            </div>
            <Link
              activeClass="active"
              to="section7careers"
              spy={true}
              smooth={true}
              offset={-150}
              className={"mr-12"}
              duration={500}
            >
              <button
                className={
                  "font-gilroyregular text-base text-blackmig cursor-pointer flex-col focus:outline-none jot-underlined bg-transparent"
                }
                style={{}}
              >
                {locale == "en" ? "Careers" : "  Lowongan Kerja"}
              </button>
            </Link>
          </div>
        </div>
      </section>
      <section
        className={
          "section1careers hidden lg:block py-4 lg:py-16 lg:px-[113.5px]"
        }
      >
        <div className={"block lg:flex"}>
          <div className={"flex-col w-1/2 self-center"}>
            <div className={""}>
              <h3
                style={{ lineHeight: "120%" }}
                className={
                  "text-2xl lg:text-[32px] text-center lg:text-left font-gilroysemibold text-blackmig"
                }
              >
                {t.careersatmig}
              </h3>
              <p
                style={{ lineHeight: "150%" }}
                className={
                  "text-base font-gilroyregular text-blackmig my-4 lg:my-8"
                }
              >
                {t.careersatmigsubtitle}
              </p>
              <div className={"text-center lg:text-left"}>
                <Link to="section7careers" smooth={true}>
                  <button
                    className={
                      "flex flex-row justify-between text-xl w-[294px] rounded h-[54px] text-white border-2 bg-primarygreen border-primarygreen px-3 py-2 lg:px-6 lg:py-4 font-gilroysemibold"
                    }
                  >
                    <p className={"self-center"}>{t.careersatmigbuttontitle}</p>
                    <img
                      className={"self-center"}
                      style={{ width: "20px", height: "20px" }}
                      src="/image/landingpage/arrow-circle-down.png"
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className={"flex-col hidden lg:flex w-1/2"}>
            <img
              className={"w-full h-auto"}
              src="/image/joinourteam/joinourteam_image.png"
            />
          </div>
        </div>
      </section>
      {/* section career1 mobile */}
      <section className={"section1careers lg:hidden py-12 px-4"}>
        <p className={"text-2xl text-center font-gilroysemibold text-blackmig"}>
          {t.careersatmig}
        </p>
        <div className={"mt-12 flex justify-center"}>
          <img
            src="/image/joinourteam/joinourteam_image.png"
            className={"w-[328px] h-[206px]"}
          />
        </div>
        <div className={"py-12"}>
          <p
            className={"text-base text-center font-gilroyregular text-blackmig"}
          >
            {t.careersatmigsubtitle}
          </p>
        </div>
        <div className={"flex justify-center"}>
          <Link to="section7careers" smooth={true}>
            <button
              className={
                "flex flex-row justify-between text-xl w-[294px] rounded h-[54px] text-white border-2 bg-primarygreen border-primarygreen px-6 py-3 lg:px-6 lg:py-4 font-gilroysemibold"
              }
            >
              <p className={"self-center"}>{t.careersatmigbuttontitle}</p>
              <img
                className={"self-center"}
                style={{ width: "20px", height: "20px" }}
                src="/image/landingpage/arrow-circle-down.png"
              />
            </button>
          </Link>
        </div>
      </section>
      <section className={"h-8 hidden lg:block"}></section>

      <section className={"section3careers bg-transp60"}>
        <div className={"py-4 lg:py-6 px-4 lg:px-[113.5px]"}>
          <h3
            style={{ lineHeight: "120%" }}
            className={
              "text-xl lg:text-[32px] font-gilroysemibold text-blackmig text-center "
            }
          >
            {t.careersatmigvaluesectiontitle}
          </h3>
          {/*tampilan dekstpp */}
          <div className={"hidden lg:flex lg:flex-row lg:justify-between mt-6"}>
            <div
              className={
                "flex-col flex text-center w-[300px] lg:w-[384px] bg-white  p-4 border-2 border-black-300 shadow-lg rounded-lg pb-4"
              }
            >
              <div className={""}>
                <div className={"grid justify-items-center"}>
                  <img
                    style={{ width: "60px", height: "60px" }}
                    src="/image/joinourteam/values-1.png"
                  />
                </div>
                <h5
                  style={{ lineHeight: "150%" }}
                  className={
                    "text-lg lg:text-xl mt-2 font-gilroysemibold text-blackmig"
                  }
                >
                  Agility
                </h5>
                <p
                  style={{ lineHeight: "150%" }}
                  className={"text-blackmig text-sm lg:text-base mt-2"}
                >
                  {t.careersatmigvaluesectionsubtitlebox1}
                </p>
              </div>
            </div>

            <div
              className={
                "flex-col flex text-center w-[300px] lg:w-[384px] lg:mx-8 bg-white mr-0  p-4  border-2 border-black-300 shadow-lg rounded-lg hover:shadow-lg"
              }
            >
              <div className={""}>
                <div className={"grid justify-items-center"}>
                  <img
                    style={{ width: "60px", height: "60px`" }}
                    src="/image/joinourteam/values-2.png"
                  />
                </div>
                <h5
                  style={{ lineHeight: "150%" }}
                  className={
                    "text-lg lg:text-xl mt-2 font-gilroysemibold text-blackmig"
                  }
                >
                  Perseverance
                </h5>
                <p className={"text-black text-sm lg:text-base mt-2"}>
                  {t.careersatmigvaluesectionsubtitlebox2}
                </p>
              </div>
            </div>
            <div
              className={
                "flex-col flex text-center w-[300px] lg:w-[384px] bg-white mr-0 p-4 border-2 border-black-300 shadow-lg rounded-lg hover:shadow-lg"
              }
            >
              <div className={""}>
                <div className={"grid justify-items-center"}>
                  <img
                    style={{ width: "60px", height: "60px`" }}
                    src="/image/joinourteam/values-3.png"
                  />
                </div>
                <h5
                  style={{ lineHeight: "150%" }}
                  className={
                    "text-lg lg:text-xl mt-2 font-gilroysemibold text-blackmig"
                  }
                >
                  Integrity
                </h5>

                <p
                  style={{ lineHeight: "150%" }}
                  className={"text-blackmig mt-2 text-sm lg:text-base"}
                >
                  {t.careersatmigvaluesectionsubtitlebox3}
                </p>
              </div>
            </div>
          </div>
          {/*tampilan mobile */}
          <div className={"mt-7 lg:hidden"}>
            <div
              className={
                "flex flex-row bg-white rounded-lg h-[110px] px-4 py-3"
              }
              style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
            >
              <div className={" justify-center self-center w-1/5"}>
                <img
                  className={"w-[60px] h-[60px]"}
                  src="/image/joinourteam/values-1.png"
                />
              </div>
              <div className={" w-4/5 ml-4"}>
                <p className={"text-sm font-gilroysemibold text-blackmig"}>
                  {t.careersatmigvaluesectiontitlebox1}
                </p>
                <p className={"text-blackmig text-sm mt-1"}>
                  {t.careersatmigvaluesectionsubtitlebox1}
                </p>
              </div>
            </div>
            <div
              className={
                "flex flex-row bg-white rounded-lg h-[110px] px-4 py-3 mt-4"
              }
              style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
            >
              <div className={" justify-center self-center w-1/5"}>
                <img
                  className={"w-[60px] h-[60px]"}
                  src="/image/joinourteam/values-2.png"
                />
              </div>
              <div className={" w-4/5 ml-4"}>
                <p className={"text-sm font-gilroysemibold text-blackmig"}>
                  {t.careersatmigvaluesectiontitlebox2}
                </p>
                <p className={"text-blackmig text-sm mt-1"}>
                  {t.careersatmigvaluesectionsubtitlebox2}
                </p>
              </div>
            </div>
            <div
              className={
                "flex flex-row bg-white rounded-lg h-[110px] mt-4 px-4 py-3"
              }
              style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
            >
              <div className={" justify-center self-center w-1/5"}>
                <img
                  className={"w-[60px] h-[60px]"}
                  src="/image/joinourteam/values-3.png"
                />
              </div>
              <div className={" w-4/5 ml-4"}>
                <p className={"text-sm font-gilroysemibold text-blackmig"}>
                  {t.careersatmigvaluesectiontitlebox3}
                </p>
                <p className={"text-blackmig text-sm mt-1"}>
                  {t.careersatmigvaluesectionsubtitlebox3}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={"section6careers hidden lg:block py-8 md:py-16"}>
        <h3
          style={{ lineHeight: "120%" }}
          className={
            "text-center text-blackmig font-gilroysemibold text-2xl lg:text-[32px]"
          }
        >
          {t.careersatmigbenefitsection}
        </h3>
        <div className={"px-4 md:px-[112px] mt-4"}>
          <p
            style={{ lineHeight: "150%" }}
            className={"text-base font-gilroyregular text-blackmig"}
          >
            {t.careersatmigbenefitsectionsubtitle}
          </p>
          <div className={"block md:flex md:flex-row justify-center mt-4"}>
            <div
              className={"block md:flex md:flex-col justify-center md:w-1/2"}
            >
              <div className={"pb-6 flex-row flex "}>
                <img
                  src="/image/joinourteam/benefit_1.png"
                  style={{ height: "44px", width: "44px" }}
                ></img>

                <p
                  style={{ lineHeight: "150%" }}
                  className={
                    "flex-row my-auto pl-4 text-[18px] text-black font-gilroyregular"
                  }
                >
                  {t.careersatmigbenefitsectionpoint1}
                </p>
              </div>
              <div className={"pb-6 flex-row flex"}>
                <img
                  src="/image/joinourteam/benefit_2.png"
                  style={{ height: "44px", width: "44px" }}
                ></img>
                <p
                  style={{ lineHeight: "150%" }}
                  className={
                    "flex-row my-auto pl-4 text-[18px] text-black font-gilroyregular"
                  }
                >
                  {t.careersatmigbenefitsectionpoint2}
                </p>
              </div>
              <div className={"pb-6 flex-row flex"}>
                <img
                  src="/image/joinourteam/benefit_3.png"
                  style={{ height: "44px", width: "44px" }}
                ></img>
                <p
                  style={{ lineHeight: "150%" }}
                  className={
                    "flex-row my-auto pl-4 text-[18px] text-black font-gilroyregular"
                  }
                >
                  {t.careersatmigbenefitsectionpoint3}
                </p>
              </div>
            </div>
            <div
              className={"block md:flex md:flex-col justify-center md:w-1/2"}
            >
              <div className={"pb-6 flex-row flex"}>
                <img
                  src="/image/joinourteam/benefit_4.png"
                  style={{ height: "44px", width: "44px" }}
                ></img>
                <p
                  style={{ lineHeight: "150%" }}
                  className={
                    "flex-row my-auto pl-4 text-[18px] text-black font-gilroyregular"
                  }
                >
                  {t.careersatmigbenefitsectionpoint4}
                </p>
              </div>
              <div className={"pb-6 flex-row flex"}>
                <img
                  src="/image/joinourteam/benefit_5.png"
                  style={{ height: "44px", width: "44px" }}
                ></img>
                <p
                  style={{ lineHeight: "150%" }}
                  className={
                    "flex-row my-auto pl-4 text-[18px] text-black font-gilroyregular"
                  }
                >
                  {t.careersatmigbenefitsectionpoint5}
                </p>
              </div>
              <div className={"pb-6 flex-row flex"}>
                <img
                  src="/image/joinourteam/benefit_6.png"
                  style={{ height: "44px", width: "44px" }}
                ></img>
                <p
                  style={{ lineHeight: "150%" }}
                  className={
                    "flex-row my-auto pl-4 text-[18px] text-black font-gilroyregular"
                  }
                >
                  {t.careersatmigbenefitsectionpoint6}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*section 6 careers mobile view */}
      <section className={"section6careersmobile lg:hidden py-12 px-4"}>
        <p className={"text-center text-blackmig font-gilroysemibold text-xl"}>
          {t.careersatmigbenefitsection}
        </p>
        <div className={"mt-2"}>
          <p
            className={"text-base font-gilroyregular text-center text-blackmig"}
          >
            {t.careersatmigbenefitsectionsubtitle}
          </p>
          <div className={"block lg:flex lg:flex-row justify-center mt-4"}>
            <div
              className={"block lg:flex lg:flex-col justify-center lg:w-1/2"}
            >
              <div className={"pb-6 flex-row flex "}>
                <img
                  src="/image/joinourteam/benefit_1.png"
                  style={{ height: "44px", width: "44px" }}
                ></img>

                <p
                  className={
                    "flex-row my-auto pl-4 text-xs text-blackmig font-gilroyregular"
                  }
                >
                  {t.careersatmigbenefitsectionpoint1}
                </p>
              </div>
              <div className={"pb-6 flex-row flex"}>
                <img
                  src="/image/joinourteam/benefit_2.png"
                  style={{ height: "44px", width: "44px" }}
                ></img>
                <p
                  className={
                    "flex-row my-auto pl-4 text-xs text-blackmig font-gilroyregular"
                  }
                >
                  {t.careersatmigbenefitsectionpoint2}
                </p>
              </div>
              <div className={"pb-6 flex-row flex"}>
                <img
                  src="/image/joinourteam/benefit_3.png"
                  style={{ height: "44px", width: "44px" }}
                ></img>
                <p
                  className={
                    "flex-row my-auto pl-4 text-xs text-blackmig font-gilroyregular"
                  }
                >
                  {t.careersatmigbenefitsectionpoint3}
                </p>
              </div>
            </div>
            <div
              className={"block lg:flex lg:flex-col justify-center lg:w-1/2"}
            >
              <div className={"pb-6 flex-row flex"}>
                <img
                  src="/image/joinourteam/benefit_4.png"
                  style={{ height: "44px", width: "44px" }}
                ></img>
                <p
                  className={
                    "flex-row my-auto pl-4 text-xs text-blackmig font-gilroyregular"
                  }
                >
                  {t.careersatmigbenefitsectionpoint4}
                </p>
              </div>
              <div className={"pb-6 flex-row flex"}>
                <img
                  src="/image/joinourteam/benefit_5.png"
                  style={{ height: "44px", width: "44px" }}
                ></img>
                <p
                  className={
                    "flex-row my-auto pl-4 text-xs text-blackmig font-gilroyregular"
                  }
                >
                  {t.careersatmigbenefitsectionpoint5}
                </p>
              </div>
              <div className={"pb-6 flex-row flex"}>
                <img
                  src="/image/joinourteam/benefit_6.png"
                  style={{ height: "44px", width: "44px" }}
                ></img>
                <p
                  className={
                    "flex-row my-auto pl-4 text-xs text-blackmig font-gilroyregular"
                  }
                >
                  {t.careersatmigbenefitsectionpoint6}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={"section7careers"}>
        <CareersAtMig />
      </section>
      <section
        className={
          "youronestop hidden lg:block lg:flex lg:flex-row lg:justify-between bg-bgfooter pt-[50px] h-[173px]"
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
              "bg-white border-3 mx-auto max-w-[645px] border-solid shadow-2xl rounded-lg text-center -mt-[150px] py-[31.38px]  px-[31.38px]"
            }
          >
            <h4
              style={{ lineHeight: "120%" }}
              className={"text-2xl font-gilroysemibold text-black"}
            >
              {t.contactussectiontitle}
            </h4>
            <div
              className={
                "mt-3.5 text-base font-gilroyregular text-center text-black"
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
                    <p className={"text-base font-gilroysemibold"}>
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
                <Linkk href="/contactus">
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
                <Linkk href="/aboutus">
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
  let dataCareers = null;

  try {
    const resources = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getCareers`,
      {
        method: `GET`,
      }
    );
    const resjson = await resources.json();
    dataCareers = resjson;
  } catch {}
  const empData = [
    {
      story:
        "I gained the professional skills of project management, problem solving, flexibility, time management, mediation, and stakeholder management",
      name: "Bintang Agung",
      role: "Associate Product Manager",
    },
    {
      story:
        "The internship at MIG gave me experience of management and communication with developers. I learned a lot about product management and my mentor trusted me enough to fully develop my soft skills and hard skills.",
      name: "Hanifah Rahmajati",
      role: "Product Mangement Intern",
    },
    {
      story:
        "I work by challenging incidental operations so that each time they occur, new incidental problems enable me to learn new things about them. I am working to help engineers across Indonesia increase my strong analytical and communication skills.",
      name: "Aninditya Satriawan",
      role: "Operation Specialist",
    },
    {
      story:
        "Working here was an amazing opportunity to learn many soft skills apart from your specialties. The workmates are also kind and caring so that I never had any major struggles understanding how thing works in the company",
      name: "Yusron Taufiq",
      role: "UI UX Intern",
    },
  ];
  return {
    props: {
      dataCareers: dataCareers || [],
      empData,
    },
    revalidate: 60,
  };
}

export default JoinOurTeam;
