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
        className={
          "section2careers hidden md:block px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 z-50"
        }
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
                  "gilroy-regular text-base text-blackmig cursor-pointer flex-col focus:outline-none jot-underlined bg-transparent"
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
                  "gilroy-regular text-base text-blackmig cursor-pointer flex-col focus:outline-none jot-underlined bg-transparent"
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
                  "gilroy-regular text-base text-blackmig cursor-pointer flex-col focus:outline-none jot-underlined bg-transparent"
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
        className={"section1careers py-4 md:py-16 mx-auto md:w-[1216px]"}
      >
        <div className={"block md:flex"}>
          <div className={"flex-col m-auto w-[660px]"}>
            <div className={""}>
              <p
                className={
                  "text-2xl md:text-[32px] text-center md:text-left font-semibold text-blackmig"
                }
              >
                Careers at MIG
              </p>
              <div className={"flex-col block md:hidden pb-6"}>
                <img
                  style={{ width: "1000px", height: "auto" }}
                  src="/image/joinourteam/joinourteam_image.png"
                />
              </div>
              <p
                className={
                  "text-base gilroy-regular text-blackmig my-4 md:my-8"
                }
              >
                We are currently looking to expand our team! Our team comprises
                of highly motivated, positive and hardworking individuals.
              </p>
              <div className={"text-center md:text-left"}>
                <Link href="/section7careers">
                  <button
                    className={
                      "flex flex-row justify-between text-xl w-[294px] rounded h-[54px] text-white border-2 bg-primarygreen border-primarygreen px-3 py-2 md:px-6 md:py-4 font-semibold"
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
          <div className={"flex-col hidden md:flex"}>
            <img
              style={{ width: "514px", height: "335px" }}
              src="/image/joinourteam/joinourteam_image.png"
            />
          </div>
        </div>
      </section>

      <section className={"h-8 hidden md:block"}></section>

      <section className={"section3careers bg-trans60 bg-opacity-60"}>
        <div className={"py-4 md:py-6"}>
          <p
            className={
              "text-2xl md:text-3xl gilroy-semibold font-semibold text-blackmig text-center "
            }
          >
            Our Values
          </p>

          <div
            className={
              "md:flex md:flex-row mx-auto justify-between w-[1216px] mt-6"
            }
          >
            <div
              className={
                "flex-col flex text-center w-[384px] h-[180px] bg-white  p-4 border-2 border-black-300 shadow-lg rounded-lg pb-4"
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
                    "text-lg md:text-xl mt-2 font-semibold text-blackmig"
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
                "flex-col flex text-center w-[384px] h-[180px] bg-white mr-0  p-4  border-2 border-black-300 shadow-lg rounded-lg hover:shadow-lg"
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
                    "text-lg md:text-xl mt-2 font-semibold text-blackmig"
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
                "flex-col flex text-center w-[384px] h-[180px] bg-white mr-0 p-4 border-2 border-black-300 shadow-lg rounded-lg hover:shadow-lg"
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
                    "text-lg md:text-xl mt-2 font-semibold text-blackmig"
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
        </div>
      </section>

      {/* <section
        className={
          "section8careers py-10 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 h-auto"
        }
      >
        <div className={"justify-center"}>
          <p className={"text-center gilroy-bold text-3xl md:text-4xl pb-8"}>
            Employee Stories
          </p>
        </div>
        <div className="bg-green-600 h-auto">
          <Slider {...sliderSettings2}>
            {empData.map((data, idx) => {
              return (
                <div key={idx}>
                  <div
                    className={"h-auto py-8 lg:py-14 grid justify-items-center"}
                  >
                    <p
                      className={
                        "w-3/4 lg:w-2/3 xl:w-1/2 mb-10 text-white text-center text-ld md:text-xl gilroy-bold"
                      }
                    >
                      {data.story}
                    </p>
                    <div
                      className={"h-14 w-14 mb-2 bg-gray-500 rounded-full"}
                    ></div>
                    <p className={"text-white font-bold"}>{data.name}</p>
                    <p className={"text-white font-bold"}>{data.role}</p>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </section> */}

      <section className={"section6careers py-8 md:py-16"}>
        <p
          className={
            "text-center text-blackmig font-semibold text-2xl md:text-3xl"
          }
        >
          Benefits
        </p>
        <div className={"w-[1216px] mx-auto mt-4"}>
          <p className={"text-base gilroy-regular text-blackmig"}>
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
                    "flex-row my-auto pl-4 text-base text-black gilroy-regular"
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
                    "flex-row my-auto pl-4 text-base text-black gilroy-regular"
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
                    "flex-row my-auto pl-4 text-base text-black gilroy-regular"
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
                    "flex-row my-auto pl-4 text-base text-black gilroy-regular"
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
                    "flex-row my-auto pl-4 text-base text-black gilroy-regular"
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
                    "flex-row my-auto pl-4 text-base text-black gilroy-regular"
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
      <LayoutFormContactUs />
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
