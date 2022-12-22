import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";
import { Collapse } from "antd";
import Head from "next/head";
import React from "react";
import { Link } from "react-scroll";
import Slider from "react-slick";

import { CareersAtMig } from "components/screen/joinourteam";

import LayoutFormContactUs from "../../../components/migwebsite/layout-form-contact-us.js";
import Layout from "../../../components/migwebsite/layout.js";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function JoinOurTeam({ dataCareers, empData }) {
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
        <title>Join Our Team</title>
      </Head>
      <section
        className={"section2careers  px-4 md:px-[112px] z-50"}
        style={{ background: "#F4F4F4" }}
      >
        <div className={"block md:flex"}>
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
                Our Values
              </button>
            </Link>
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
                Benefits
              </button>
            </Link>
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
                Careers
              </button>
            </Link>
          </div>
        </div>
      </section>
      <section
        className={
          "section1careers hidden md:block py-4 md:py-16 md:px-[112px]"
        }
      >
        <div className={"block md:flex"}>
          <div className={"flex-col w-1/2 self-center"}>
            <div className={""}>
              <p
                className={
                  "text-2xl md:text-[32px] text-center md:text-left font-gilroysemibold text-blackmig"
                }
              >
                Careers at MIG
              </p>
              <p
                className={
                  "text-base font-gilroyregular text-blackmig my-4 md:my-8"
                }
              >
                We are currently looking to expand our team! Our team comprises
                of highly motivated, positive and hardworking individuals.
              </p>
              <div className={"text-center md:text-left"}>
                <Link href="/section7careers">
                  <button
                    className={
                      "flex flex-row justify-between text-xl w-[294px] rounded h-[54px] text-white border-2 bg-primarygreen border-primarygreen px-3 py-2 md:px-6 md:py-4 font-gilroysemibold"
                    }
                  >
                    <p className={"self-center"}>Explore Open Positions</p>
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
          <div className={"flex-col hidden md:flex w-1/2"}>
            <img
              className={"w-full h-auto"}
              src="/image/joinourteam/joinourteam_image.png"
            />
          </div>
        </div>
      </section>
      {/* section career1 mobile */}
      <section className={"section1careers md:hidden py-12 px-4"}>
        <p className={"text-2xl text-center font-gilroysemibold text-blackmig"}>
          Careers at MIG
        </p>
        <div className={"mt-12"}>
          <img
            src="/image/joinourteam/joinourteam_image.png"
            className={"w-[328px] h-auto"}
          />
        </div>
        <div className={"py-12"}>
          <p
            className={"text-base text-center font-gilroyregular text-blackmig"}
          >
            We are currently looking to expand our team! Our team comprises of
            highly motivated, positive and hardworking individuals.
          </p>
        </div>
        <div className={"flex justify-center"}>
          <Link href="/section7careers">
            <button
              className={
                "flex flex-row justify-between text-xl w-[294px] rounded h-[54px] text-white border-2 bg-primarygreen border-primarygreen px-3 py-2 md:px-6 md:py-4 font-gilroysemibold"
              }
            >
              <p className={"self-center"}>Explore Open Positions</p>
              <img
                className={"self-center"}
                style={{ width: "20px", height: "20px" }}
                src="/image/landingpage/arrow-circle-down.png"
              />
            </button>
          </Link>
        </div>
      </section>
      <section className={"h-8 hidden md:block"}></section>

      <section className={"section3careers bg-transp60"}>
        <div className={"py-4 md:py-6 px-4 md:px-[112px]"}>
          <p
            className={
              "text-xl md:text-[32px] font-gilroysemibold text-blackmig text-center "
            }
          >
            Our Values
          </p>
          {/*tampilan dekstpp */}
          <div className={"hidden md:flex md:flex-row md:justify-between mt-6"}>
            <div
              className={
                "flex-col flex text-center w-[300px] md:w-[384px] bg-white  p-4 border-2 border-black-300 shadow-lg rounded-lg pb-4"
              }
            >
              <div className={""}>
                <div className={"grid justify-items-center"}>
                  <img
                    style={{ width: "60px", height: "60px" }}
                    src="/image/joinourteam/values-1.png"
                  />
                </div>
                <p
                  className={
                    "text-lg md:text-xl mt-2 font-gilroysemibold text-blackmig"
                  }
                >
                  Agility
                </p>
                <p className={"text-blackmig text-sm md:text-base mt-2"}>
                  We are adapting to fast-changing environments.
                </p>
              </div>
            </div>

            <div
              className={
                "flex-col flex text-center w-[300px] md:w-[384px] md:mx-8 bg-white mr-0  p-4  border-2 border-black-300 shadow-lg rounded-lg hover:shadow-lg"
              }
            >
              <div className={""}>
                <div className={"grid justify-items-center"}>
                  <img
                    style={{ width: "60px", height: "60px`" }}
                    src="/image/joinourteam/values-2.png"
                  />
                </div>
                <p
                  className={
                    "text-lg md:text-xl mt-2 font-gilroysemibold text-blackmig"
                  }
                >
                  Perseverance
                </p>
                <p className={"text-black text-sm md:text-base mt-2"}>
                  We aim high and constantly strive for excellence.
                </p>
              </div>
            </div>
            <div
              className={
                "flex-col flex text-center w-[300px] md:w-[384px] bg-white mr-0 p-4 border-2 border-black-300 shadow-lg rounded-lg hover:shadow-lg"
              }
            >
              <div className={""}>
                <div className={"grid justify-items-center"}>
                  <img
                    style={{ width: "60px", height: "60px`" }}
                    src="/image/joinourteam/values-3.png"
                  />
                </div>
                <p
                  className={
                    "text-lg md:text-xl mt-2 font-gilroysemibold text-blackmig"
                  }
                >
                  Integrity
                </p>

                <p className={"text-blackmig mt-2 text-sm md:text-base"}>
                  We are dedicated to adhering to positive ethical values.
                </p>
              </div>
            </div>
          </div>
          {/*tampilan mobile */}
          <div className={"mt-7 md:hidden"}>
            <div
              className={
                "flex flex-row bg-white border-2 border-black-300 shadow-lg rounded-lg h-[91px] px-4 py-3"
              }
            >
              <div className={" justify-center self-center w-1/5"}>
                <img
                  className={"w-[60px] h-[60px]"}
                  src="/image/joinourteam/values-1.png"
                />
              </div>
              <div className={" w-4/5 ml-4"}>
                <p className={"text-sm font-gilroysemibold text-blackmig"}>
                  Agility
                </p>
                <p className={"text-blackmig text-sm mt-1"}>
                  We are adapting to fast-changing environments.
                </p>
              </div>
            </div>
            <div
              className={
                "flex flex-row bg-white border-2 border-black-300 shadow-lg rounded-lg h-[91px] px-4 py-3 mt-4"
              }
            >
              <div className={" justify-center self-center w-1/5"}>
                <img
                  className={"w-[60px] h-[60px]"}
                  src="/image/joinourteam/values-1.png"
                />
              </div>
              <div className={" w-4/5 ml-4"}>
                <p className={"text-sm font-gilroysemibold text-blackmig"}>
                  Perseverance
                </p>
                <p className={"text-blackmig text-sm mt-1"}>
                  We aim high and constantly strive for excellence.
                </p>
              </div>
            </div>
            <div
              className={
                "flex flex-row bg-white border-2 border-black-300 shadow-lg rounded-lg h-[91px] mt-4 px-4 py-3"
              }
            >
              <div className={" justify-center self-center w-1/5"}>
                <img
                  className={"w-[60px] h-[60px]"}
                  src="/image/joinourteam/values-3.png"
                />
              </div>
              <div className={" w-4/5 ml-4"}>
                <p className={"text-sm font-gilroysemibold text-blackmig"}>
                  Integrity
                </p>
                <p className={"text-blackmig text-sm mt-1"}>
                  We are dedicated to adhering to positive ethical values.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={"section6careers hidden md:block py-8 md:py-16"}>
        <p
          className={
            "text-center text-blackmig font-gilroysemibold text-2xl md:text-[32px]"
          }
        >
          Benefits
        </p>
        <div className={"px-4 md:px-[112px] mt-4"}>
          <p className={"text-base font-gilroyregular text-blackmig"}>
            Mitramas is a people-centric business with a foundation to gives
            working opportunities for motivated individuals at all levels. Our
            long-term sustainable business which has been running for +15 years
            and operated across 45 cities have a strong commitment to offer
            pleasant experience for our team, communities, and clients.
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
                  className={
                    "flex-row my-auto pl-4 text-base text-black font-gilroyregular"
                  }
                >
                  We love to empower our team members to solve problems that
                  matter
                </p>
              </div>
              <div className={"pb-6 flex-row flex"}>
                <img
                  src="/image/joinourteam/benefit_2.png"
                  style={{ height: "44px", width: "44px" }}
                ></img>
                <p
                  className={
                    "flex-row my-auto pl-4 text-base text-black font-gilroyregular"
                  }
                >
                  We offer diverse industry exposures and hands-on experience
                </p>
              </div>
              <div className={"pb-6 flex-row flex"}>
                <img
                  src="/image/joinourteam/benefit_3.png"
                  style={{ height: "44px", width: "44px" }}
                ></img>
                <p
                  className={
                    "flex-row my-auto pl-4 text-base text-black font-gilroyregular"
                  }
                >
                  We support personal growth through constant experiment and
                  learning
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
                  className={
                    "flex-row my-auto pl-4 text-base text-black font-gilroyregular"
                  }
                >
                  We provide unique and competitive packages to launch your
                  career
                </p>
              </div>
              <div className={"pb-6 flex-row flex"}>
                <img
                  src="/image/joinourteam/benefit_5.png"
                  style={{ height: "44px", width: "44px" }}
                ></img>
                <p
                  className={
                    "flex-row my-auto pl-4 text-base text-black font-gilroyregular"
                  }
                >
                  We value informal social bonding to offer a enjoyable working
                  environment
                </p>
              </div>
              <div className={"pb-6 flex-row flex"}>
                <img
                  src="/image/joinourteam/benefit_6.png"
                  style={{ height: "44px", width: "44px" }}
                ></img>
                <p
                  className={
                    "flex-row my-auto pl-4 text-base text-black font-gilroyregular"
                  }
                >
                  We create engaging environment and believe everyone has a
                  voice at the table
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*section 6 careers mobile view */}
      <section className={"section6careers md:hidden pt-12 pb-[150px] px-4"}>
        <p className={"text-center text-blackmig font-gilroysemibold text-xl"}>
          Benefits
        </p>
        <div className={"mt-2"}>
          <p
            className={"text-base font-gilroyregular text-center text-blackmig"}
          >
            Mitramas is a people-centric business with a foundation to gives
            working opportunities for motivated individuals at all levels. Our
            long-term sustainable business which has been running for +15 years
            and operated across 45 cities have a strong commitment to offer
            pleasant experience for our team, communities, and clients.
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
                  className={
                    "flex-row my-auto pl-4 text-xs text-blackmig font-gilroyregular"
                  }
                >
                  We love to empower our team members to solve problems that
                  matter
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
                  We offer diverse industry exposures and hands-on experience
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
                  We support personal growth through constant experiment and
                  learning
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
                  className={
                    "flex-row my-auto pl-4 text-xs text-blackmig font-gilroyregular"
                  }
                >
                  We provide unique and competitive packages to launch your
                  career
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
                  We value informal social bonding to offer a enjoyable working
                  environment
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
                  We create engaging environment and believe everyone has a
                  voice at the table
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={"section7careers"}>
        <CareersAtMig />
      </section>
      <LayoutFormContactUs
        description={`Need help in providing your needs? Whether they related to
              hardware, software, or even talent hiring? Contact us and hear
              what service can we offer to you and your company!`}
        button_title={"Contact Us"}
      />
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
