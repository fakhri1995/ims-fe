import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";
import { Collapse } from "antd";
import Head from "next/head";
import React from "react";
import { Link as Linkk } from "react-scroll";

import Layout from "../../../components/migwebsite/layout.js";

function JoinOurTeam({ dataCareers }) {
  const careers = dataCareers.data ?? [];
  const { Panel } = Collapse;
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
                <p className={"text-xl gilroy-regular"}>See open position!</p>
                <div className={"md:center w-20 m-auto md:mx-0"}>
                  <Linkk
                    className={"flex-col md:center"}
                    activeClass="active"
                    to="section7careers"
                    smooth={true}
                    offset={-150}
                    duration={500}
                  >
                    <img
                      className={"mt-5 animate-bounce"}
                      src="/image/landingpage/arrow-down.png"
                      style={{ width: 60 }}
                    />
                  </Linkk>
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
            <Linkk
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
                  "gilroy-regular text-xl text-black cursor-pointer flex-col focus:outline-none jot-underlined"
                }
                style={{}}
              >
                Our Values
              </button>
            </Linkk>
            <Linkk
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
                  "gilroy-regular text-xl text-black cursor-pointer flex-col focus:outline-none jot-underlined"
                }
                style={{}}
              >
                Benefits
              </button>
            </Linkk>
            <Linkk
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
                  "gilroy-regular text-xl text-black cursor-pointer flex-col focus:outline-none jot-underlined"
                }
                style={{}}
              >
                Careers
              </button>
            </Linkk>
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
      <section
        className={
          "section7careers pb-10 md:pb-20 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 h-auto"
        }
      >
        <span
          className={"relative"}
          style={{ top: "-150px" }}
          id="vacancies"
        ></span>
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
              expandIconPosition={"right"}
            >
              {careers.map((item, idx) => {
                return (
                  <Panel
                    className={"text-base"}
                    header={item.position_name}
                    key={idx}
                  >
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
                      >
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
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const resources = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getCareers`,
    {
      method: `GET`,
    }
  );
  const resjson = await resources.json();
  const dataCareers = resjson;
  return {
    props: {
      dataCareers,
    },
    revalidate: 60,
  };
}

export default JoinOurTeam;
