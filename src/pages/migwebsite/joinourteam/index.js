import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";
import { Collapse } from "antd";
import Head from "next/head";
import React from "react";
import { Link } from "react-scroll";
import Slider from "react-slick";

import { CareersAtMig } from "components/screen/joinourteam";

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
          "section1careers py-4 md:py-20 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
      >
        <div className={"block md:flex"}>
          <div className={"flex-col m-auto"}>
            <div className={""}>
              <p
                className={
                  "text-3xl md:text-4xl pb-6 text-center md:text-left gilroy-bold"
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
              <p className={"text-xl gilroy-medium pb-4"}>
                We are currently looking to expand our team! Our team comprises
                of highly motivated, positive and hardworking individuals.
              </p>
              <div className={"text-center md:text-left"}>
                <div className={"md:center w-max m-auto md:mx-0"}>
                  <Link
                    className={"flex-col md:center hover:text-black"}
                    activeClass="active"
                    to="section7careers"
                    smooth={true}
                    offset={-150}
                    duration={500}
                  >
                    <p
                      className={"text-xl gilroy-regular hover:text-green-500"}
                    >
                      See open position!
                    </p>
                    <div className="grid justify-items-center">
                      <img
                        className={"mt-5 animate-bounce"}
                        src="/image/landingpage/arrow-down.png"
                        style={{ width: 60 }}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={"flex-col hidden md:flex ml-4"}>
            <img
              style={{ width: "1000px", height: "auto" }}
              src="/image/joinourteam/joinourteam_image.png"
            />
          </div>
        </div>
      </section>
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
                  "gilroy-regular text-xl text-black cursor-pointer flex-col focus:outline-none jot-underlined bg-transparent"
                }
                style={{}}
              >
                Our Values
              </button>
            </Link>
            <Link
              activeClass="active"
              to="section8careers"
              spy={true}
              smooth={true}
              offset={-120}
              className={"mr-12"}
              duration={500}
            >
              <button
                className={
                  "gilroy-regular text-xl text-black cursor-pointer flex-col focus:outline-none jot-underlined bg-transparent"
                }
                style={{}}
              >
                Employee Stories
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
                  "gilroy-regular text-xl text-black cursor-pointer flex-col focus:outline-none jot-underlined bg-transparent"
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
                  "gilroy-regular text-xl text-black cursor-pointer flex-col focus:outline-none jot-underlined bg-transparent"
                }
                style={{}}
              >
                Careers
              </button>
            </Link>
          </div>
        </div>
      </section>
      <section className={"h-8 hidden md:block"}></section>
      <section
        className={
          "section3careers py-10 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
      >
        <span
          className={"relative"}
          style={{ top: "-140px" }}
          id="ourvalues"
        ></span>
        <div>
          <p className={"text-3xl md:text-4xl gilroy-bold text-center pb-8"}>
            Our Values
          </p>
        </div>

        <div className={"md:flex justify-between"}>
          <div
            className={
              "flex-col flex bg-white mr-0 md:mr-10 p-4 w-auto border-2 border-black-300 rounded-lg hover:shadow-lg mb-4"
            }
          >
            <div>
              <p className={"text-xl md:text-2xl gilroy-bold pr-10"}>Agility</p>
              <br></br>
              <p className={"text-left pr-4 text-base md:text-xl"}>
                We are adapting to fast-changing environments.
              </p>
            </div>
          </div>
          <div
            className={
              "flex-col flex bg-white mr-0 md:mr-10 p-4 w-auto border-2 border-black-300 rounded-lg hover:shadow-lg mb-4"
            }
          >
            <div>
              <p className={"text-xl md:text-2xl gilroy-bold pr-10"}>
                Perseverance
              </p>
              <br></br>
              <p className={"text-left pr-4 text-base md:text-xl"}>
                We aim high and constantly strive for excellence.
              </p>
            </div>
          </div>
          <div
            className={
              "flex-col flex bg-white mr-0 md:mr-10 p-4 w-auto border-2 border-black-300 rounded-lg hover:shadow-lg mb-4"
            }
          >
            <div>
              <p className={"text-xl md:text-2xl gilroy-bold pr-10"}>
                Integrity
              </p>
              <br></br>
              <p className={"text-left pr-4 text-base md:text-xl"}>
                We are dedicated to adhering to positive ethical values.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
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
      </section>

      <section
        className={
          "section6careers py-10 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 h-auto"
        }
      >
        <span
          className={"relative"}
          style={{ top: "-140px" }}
          id="benefits"
        ></span>
        <div className={"justify-center"}>
          <p className={"text-center gilroy-bold text-3xl md:text-4xl pb-8"}>
            Benefits
          </p>
          <p className={"pb-8 text-justify text-xl"}>
            Mitramas is a people-centric business with a foundation to gives
            working opportunities for motivated individuals at all levels. Our
            long-term sustainable business which has been running for +15 years
            and operated across 45 cities have a strong commitment to offer
            pleasant experience for our team, communities, and clients.
          </p>
          <div
            className={
              "block md:flex md:flex-row justify-center object-scale-down text-base"
            }
          >
            <div
              className={"block md:flex md:flex-col justify-center md:w-1/2"}
            >
              <div className={"pb-6 flex-row flex "}>
                <img
                  className={"flex-row"}
                  src="/image/joinourteam/benefit_1.png"
                  style={{ height: 30 }}
                ></img>
                <p className={"flex-row my-auto pl-4"}>
                  We love to empower our team members to solve problems that
                  matter
                </p>
              </div>
              <div className={"pb-6 flex-row flex"}>
                <img
                  className={"flex-row"}
                  src="/image/joinourteam/benefit_2.png"
                  style={{ height: 30 }}
                ></img>
                <p className={"flex-row my-auto pl-4"}>
                  We offer diverse industry exposures and hands-on experience
                </p>
              </div>
              <div className={"pb-6 flex-row flex"}>
                <img
                  className={"flex-row"}
                  src="/image/joinourteam/benefit_3.png"
                  style={{ height: 30 }}
                ></img>
                <p className={"flex-row my-auto pl-4"}>
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
                  className={"flex-row"}
                  src="/image/joinourteam/benefit_4.png"
                  style={{ height: 30 }}
                ></img>
                <p className={"flex-row my-auto pl-4"}>
                  We provide unique and competitive packages to launch your
                  career
                </p>
              </div>
              <div className={"pb-6 flex-row flex"}>
                <img
                  className={"flex-row"}
                  src="/image/joinourteam/benefit_5.png"
                  style={{ height: 30 }}
                ></img>
                <p className={"flex-row my-auto pl-4"}>
                  We value informal social bonding to offer a enjoyable working
                  environment
                </p>
              </div>
              <div className={"pb-6 flex-row flex"}>
                <img
                  className={"flex-row"}
                  src="/image/joinourteam/benefit_6.png"
                  style={{ height: 30 }}
                ></img>
                <p className={"flex-row my-auto pl-4"}>
                  We create engaging environment and believe everyone has a
                  voice at the table
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section
        className={
          "section7careers pb-10 md:pb-20 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 h-auto bg-red-400"
        }>
        <span
          className={"relative"}
          style={{ top: "-150px" }}
          id="vacancies"></span>
        <div className={"block md:flex justify-between"}>
          <div className={"flex-row left-column-section7careers pr-0 md:pr-8"}>
            <p className={"text-3xl gilroy-bold pb-8"}>Careers at MIG</p>
            <p className={"pb-8 text-xl"}>
              Want to advance your career with us ? See our job openings below
              for our current financial services and government projects.
            </p>
            <div className={"w-5/12 border-t-8 border-green-700 pb-8"}></div>
            <p className={"pb-8 text-xl"}>
              Didn't find the role that best describes your skills ? Send your
              CV to{" "}
              <span className={"gilroy-bold"}>
                recruitment@mitrasolusi.group
              </span>{" "}
              for potential opportunities
            </p>
          </div>
          <div className={"flex-row w-full"}>
            <Collapse
              accordion
              defaultActiveKey={["0"]}
              expandIconPosition={"right"}>
              {careers.map((item, idx) => {
                return (
                  <Panel
                    className={"text-base"}
                    header={item.position_name}
                    key={idx}>
                    <div>
                      <div className={"text-base pb-4"}>
                        <p className={"gilroy-bold text-base"}>
                          Job Description:
                        </p>
                        <p className={"text-base"}>{item.job_description}</p>
                      </div>
                      <a
                        className={"text-base hover:text-green-500"}
                        href={item.register_link}
                        target="_blank"
                        rel="noopener noreferrer">
                        Apply Now
                        <ArrowRightOutlined
                          className={"pl-2 relative -top-0.5"}
                        />
                      </a>
                    </div>
                  </Panel>
                );
              })}
            </Collapse>
          </div>
        </div>
      </section> */}

      <CareersAtMig />
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
