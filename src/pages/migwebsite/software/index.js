import { CheckCircleTwoTone } from "@ant-design/icons";
import { Card, Checkbox, Form, Input, notification } from "antd";
import { transparent } from "daisyui/src/colors/index.js";
import Head from "next/head";
import Link from "next/link";
import { React, useEffect, useRef, useState } from "react";
import Slider from "react-slick";

import Layout from "../../../components/migwebsite/layout.js";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function Software({}) {
  const [form] = Form.useForm();
  const handleSubmit = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataSoftware),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          form.resetFields();
          setFeedback(false);
          setTimeout(() => {
            setFeedback(true);
          }, 5000);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message.errorInfo.status_detail,
            duration: 5,
          });
        }
      });
  };
  const [dataSoftware, setDataSoftware] = useState({
    company_name: null,
    company_email: null,
    name: null,
    phone_number: null,
    interested_in: "software",
    message: null,
  });
  const [feedback, setFeedback] = useState(true);
  const [heightt, setHeightt] = useState("");
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
  const slider = useRef(null);
  const slider2 = useRef(null);
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

  useEffect(() => {}, []);
  return (
    <Layout>
      <Head>
        <title>Software</title>
      </Head>
      <section
        className={
          "section1advantages hidden md:block fixed w-full z-50 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
        style={{ background: "#F4F4F4" }}
      >
        <div className={"block md:flex container mx-auto"}>
          <div className={"flex py-4"}>
            <Link href={{ pathname: "/hardware" }}>
              <p
                className={"cursor-pointer flex-col text-lg gilroy-medium mr-4"}
              >
                Hardware
              </p>
            </Link>
            <Link href={{ pathname: "/software" }}>
              <p
                className={"cursor-pointer flex-col text-lg gilroy-bold mx-4"}
                style={{
                  borderBottom: "solid 2px #10B981",
                  paddingBottom: "2.5px",
                }}
              >
                Software
              </p>
            </Link>
            <Link href={{ pathname: "/talents" }}>
              <p
                className={"cursor-pointer flex-col text-lg gilroy-medium mx-4"}
              >
                Talents
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className={"section2advantages h-12 hidden md:block"}></section>

      <section
        className={
          "section2software py-4 md:py-8 mt-10 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
      >
        <div className={"hidden md:flex container mx-auto"}>
          <div className={"flex-col w-1/2 my-auto"}>
            <p className={"text-3xl pb-4 gilroy-bold"}>
              Simplify and automate the process through digitalization
            </p>
            <p className={"mr-20 pb-4 gilroy-regular text-base"}>
              High competition, need transformation, and slow operations force
              you to be more effective and efficient in order to grow rapidly.
            </p>
            <div className={"my-6"}>
              <p className={"mr-20 gilroy-bold text-primarygreen text-base"}>
                Reach us to get more information
              </p>
              <div className={"flex flex-row items-center my-4"}>
                <Input
                  name={"email"}
                  className={"w-1/2 h-[40px]"}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter your email here."
                />
                <button
                  className={
                    "text-base text-center ml-4 -mt-1 text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 md:px-4 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black bg-white"
                  }
                >
                  <div className={"flex flex-row justify-between"}>
                    <p className={"px-1"}>Let's talk!</p>
                    <img
                      className={"py-1 px-1"}
                      style={{ width: "15px" }}
                      src="/image/landingpage/arrow-forward.png"
                    />
                  </div>
                </button>
              </div>
              <div
                className={
                  "my-4 w-3/4 border rounded-lg shadow-lg p-4 bg-green15"
                }
              >
                <div className={"flex flex-row"}>
                  <img
                    className={"pr-1"}
                    src="/image/landingpage/info.png"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <div>
                    <p className={"text-base text-blackmig gilroy-regular"}>
                      Let us help you to achieve business goals with :
                    </p>
                    <ul>
                      <li>
                        <p className={"text-base text-blackmig gilroy-regular"}>
                          {""}
                          <span className={"font-semibold"}>
                            {" "}
                            Customized
                          </span>{" "}
                          software solutions
                        </p>
                      </li>
                      <li>
                        <p className={"text-base text-blackmig gilroy-regular"}>
                          {""}
                          <span className={"font-semibold"}>
                            Automated
                          </span>{" "}
                          business operations
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"flex-col w-1/2 my-auto"}>
            <img src="/image/landingpage/Software.png"></img>
          </div>
        </div>
        <div className={"block md:hidden"}>
          <div className={"my-auto"}>
            <div className={"my-auto"}>
              <img src="/image/hardware/Hardware-Solution.png"></img>
            </div>
            <p className={"text-2xl pb-4 gilroy-bold"}>
              Managing IT infrastructures is{" "}
              <span
                style={{
                  borderBottom: "solid 3px #188E4D",
                  paddingBottom: "2.5px",
                }}
              >
                challenging
              </span>{" "}
            </p>
            <p className={"pb-4 pt-2 gilroy-medium text-xl"}>
              Rapid pace of change, uncertainty on scalability, and heavy
              capital requirements might break your focus from executing your
              core business.
            </p>
            <p className={"gilroy-medium text-xl"}>
              Let us help you to scale and manage your IT infrastructure with :
            </p>
            <ul className={"list-inside list-disc"}>
              <li className={"gilroy-medium text-xl"}>
                <span className={"gilroy-bold"}>predictable</span> monthly cost{" "}
              </li>
              <li className={"gilroy-medium text-xl"}>
                <span className={"gilroy-bold"}>guaranteed</span> service level
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section
        className={
          "section3software bg-bgjoinmig pt-4 pb-8 md:pt-8 md:pb-20 mt-10"
        }
      >
        <p
          className={
            "text-xl md:text-3xl text-center gilroy-semibold font-semibold py-8 md:py-0 mb-10"
          }
        >
          Let’s see some of{" "}
          <span
            style={{
              borderBottom: "solid 3px #188E4D",
              paddingBottom: "2.5px",
            }}
          >
            our past works
          </span>{" "}
          in digitalizing businesses
        </p>
        <div className={"flex flex-row"}>
          <button onClick={() => slider?.current?.slickPrev()}>
            <div
              className={
                "self-center flex items-center justify-center  absolute left-[100px] w-[53px] h-[53px] bg-bgIcon rounded-[500px]"
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
            style={{ maxWidth: 1145 }}
          >
            <Slider {...sliderSettings2} ref={slider}>
              <div>
                <div className={"flex flex-row mx-auto"}>
                  <img
                    className={"bg-black"}
                    style={{ width: "480px", height: "270px" }}
                    src="/image/software/migsys.png"
                  />
                  <div className={"ml-[40px]"}>
                    <div
                      className={
                        "flex justify-center items-center w-[161px] h-[29px] bg-greenTrans20 rounded-[20px]"
                      }
                    >
                      <p className={"text-primarygreen gilroy-regular text-sm"}>
                        Website Development
                      </p>
                    </div>
                    <p className={"text-2xl gilroy-bold text-blackmig my-4 "}>
                      MIGsys
                    </p>
                    <p className={"gilroy-regular text-blackmig text-base"}>
                      An enterprise resource planning that built to enhance
                      employee’s performance and productivity:{" "}
                    </p>
                    <ul className={"gilroy-regular text-blackmig text-base"}>
                      <li>Task & Recruitment Process</li>
                      <li>Warehouse Managed Service</li>
                      <li>Contract, Order, and Service for Assets</li>
                      <li>Attendance Tracking</li>
                      <li>Tickets, and more</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <div className={"flex flex-row mx-auto"}>
                  <img
                    className={"bg-black"}
                    style={{ width: "480px", height: "270px" }}
                    src="/image/software/lms.png"
                  />
                  <div className={"ml-[40px]"}>
                    <div
                      className={
                        "flex justify-center items-center w-[161px] h-[29px] bg-greenTrans20 rounded-[20px]"
                      }
                    >
                      <p className={"text-primarygreen gilroy-regular text-sm"}>
                        Website Development
                      </p>
                    </div>
                    <p className={"text-2xl gilroy-bold text-blackmig my-4 "}>
                      AQL Learning Management System (LMS)
                    </p>
                    <p className={"gilroy-regular text-blackmig text-base"}>
                      A web-based educational platform that built to digitalize
                      learning programs; plan, implement and assess learning
                      programs at AQL Islamic Center.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className={"flex flex-row mx-auto"}>
                  <img
                    className={"bg-black"}
                    style={{ width: "480px", height: "270px" }}
                    src="/image/software/warung-lebaran.png"
                  />
                  <div className={"ml-[40px]"}>
                    <div
                      className={
                        "flex justify-center items-center w-[161px] h-[29px] bg-greenTrans20 rounded-[20px]"
                      }
                    >
                      <p className={"text-primarygreen gilroy-regular text-sm"}>
                        Website Development
                      </p>
                    </div>
                    <p className={"text-2xl gilroy-bold text-blackmig my-4 "}>
                      Warung Lebaran
                    </p>
                    <p className={"gilroy-regular text-blackmig text-base"}>
                      A web-based hardware managed service to enhance the
                      efficiency of distributions between seller and consumer.
                    </p>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
          <button onClick={() => slider?.current?.slickNext()}>
            <div
              className={
                "self-center flex items-center justify-center  absolute right-[100px] w-[53px] h-[53px] bg-bgIcon rounded-[500px]"
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
      </section>

      <section
        className={"px-4 mt-10 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"}
      >
        <div className={"container mx-auto text-center"}>
          <div className={"pb-12"}>
            <p
              className={
                "text-base text-black gilroy-regular text-center mx-auto w-full gilroy-medium max-w-[646px]"
              }
            >
              We support your companies to simplify and automate the process
              through digitalization with all framework that you want.
            </p>
          </div>
          <img className={"m-auto w-full"} src="/image-software.png"></img>
        </div>
      </section>
      <section
        className={
          "section2landingpagebrowser bg-bgjoinmig md:relative py-8 hidden md:block px-4 md:px-10 "
        }
      >
        <div className={"container mx-auto"}>
          <div className={"flex flex-row justify-center"}>
            <div className={"w-2/5 flex justify-end"}>
              <img
                src="/image/people/People-Solution.png"
                className={"w-[477px] h-[282px]"}
                alt=""
              />
            </div>
            <div className={"w-3/5 justify-self-start"}>
              <div className="flex flex-col items-start px-10">
                <h4 className="mb-2 text-2xl font-semibold text-blackmig">
                  Why you should trust us in building your IT projects?
                </h4>
                <div className="flex flex-row items-center mt-5">
                  <div className="w-11">
                    <img
                      src="/image/landingpage/career-icon1.png"
                      className="w-[42px] h-[42px]"
                    />
                  </div>
                  <div>
                    <h5 className="px-5 text-sm md:text-base font-semibold text-blackmig">
                      Build Software Based on Your Needs
                    </h5>
                    <p className="text-left px-5 text-base text-blackmig gilroy-regular">
                      Giving you customization software to simplify and automate
                      your business.
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
                    <h5 className="px-5 text-sm md:text-base font-semibold text-blackmig">
                      Excellent Talent Support
                    </h5>
                    <p className="text-left px-5 text-base text-blackmig gilroy-regular">
                      We develops software to help you achieve business process
                      automation with our IT talent pool
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
                    <h5 className="px-5 text-sm md:text-base font-semibold text-blackmig">
                      Enhance Productivity & Efficiency
                    </h5>
                    <p className="text-left px-5 text-base text-blackmig gilroy-regular">
                      We can discuss about project also provide the best cost
                      with a mutual agreement based on time, and complexity
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* section how it work */}
      <section
        className={
          "section4howitworkbrowser bg-white py-4 md:py-8 md:mb-10 hidden md:block px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
      >
        <div className={"container text-center mx-auto"}>
          <p className={"text-xl md:text-2xl gilroy-bold py-8 md:py-0"}>
            How it{" "}
            <span
              style={{
                borderBottom: "solid 3px #188E4D",
                paddingBottom: "2.5px",
              }}
            >
              works
            </span>{" "}
            ?
          </p>
        </div>
        <div className={"flex flex-row justify-between md:px-20 mt-10"}>
          <div className={""}>
            <div className={"w-[360px]"}>
              <img
                className={"mx-auto"}
                src="/image/software/software-work-1.png"
                style={{ width: "145px", height: "145px" }}
              />
              <p
                className={
                  "text-blackmig text-sm md:text-base Gilroy-semibold font-semibold mt-4 text-center"
                }
              >
                Custom project-based collaboration
              </p>
              <p
                className={"text-base text-blackmig gilroy-regular text-center"}
              >
                One-stop service to develop tailored products
              </p>
            </div>
          </div>
          <div className={"self-center"}>
            <img
              src="/image/hardware/how-it-work-arrow.png"
              style={{ width: "42px", height: "21px" }}
            />
          </div>
          <div className={"w-[360px]"}>
            <img
              className={"mx-auto"}
              src="/image/software/software-work-2.png"
              style={{ width: "145px", height: "145px" }}
            />
            <p
              className={
                "text-blackmig text-sm md:text-base Gilroy-semibold font-semibold mt-4 text-center"
              }
            >
              Providing all the resources you’ll need
            </p>
            <p className={"text-base text-blackmig gilroy-regular text-center"}>
              We have extensive talents and technologies tobuild the best
              project for you and your companies
            </p>
          </div>
          <div className={"self-center"}>
            <img
              src="/image/hardware/how-it-work-arrow.png"
              style={{ width: "42px", height: "21px" }}
            />
          </div>
          <div className={"w-[360px]"}>
            <img
              className={"mx-auto"}
              src="/image/software/software-work-3.png"
              style={{ width: "145px", height: "145px" }}
            />
            <p
              className={
                "text-blackmig text-sm md:text-base Gilroy-semibold font-semibold mt-4 text-center"
              }
            >
              Clear and detailed project development
            </p>
            <p className={"text-base text-blackmig gilroy-regular text-center"}>
              We do multiple iterations and input before you’re receiving the
              end-product
            </p>
          </div>
        </div>
      </section>
      <section
        className={
          "section3landingpageadvantages bg-bgjoinmig pt-8 pb-60 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
      >
        <p
          className={
            "text-xl md:text-3xl text-center gilroy-semibold font-semibold py-8 md:py-0 mb-10"
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
          className={"center md:content-around block md:hidden mt-30"}
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
                  <p className="text-sm text italic gilroy-semibold font-semibold">
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
                  <p className="text-sm text italic gilroy-semibold font-semibold">
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
                        <p className="text-sm font-semibold Gilroy-semibold text-black">
                          Fachri Fauzan
                        </p>
                        <p className="text-sm font-semibold Gilroy-semibold text-darkgrey">
                          Talent Acquisition at Bukopin
                        </p>
                      </div>
                    </div>
                    <div className="self-start">
                      <div className="bg-greenTrans20 px-4 rounded-[20px] mt-2">
                        <p className="text-sm text-primarygreen font-semibold ">
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
                        <p className="text-sm text-primarygreen font-semibold ">
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
                  <p className="text-3xl text italic gilroy-semibold font-semibold">
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
                  <p className="text-sm text italic gilroy-semibold font-semibold">
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
                        <p className="text-sm font-semibold Gilroy-semibold text-black">
                          Fachri Fauzan
                        </p>
                        <p className="text-sm font-semibold Gilroy-semibold text-darkgrey">
                          Talent Acquisition at Bukopin
                        </p>
                      </div>
                    </div>
                    <div className="self-start">
                      <div className="bg-greenTrans20 px-4 rounded-[20px] mt-2">
                        <p className="text-sm text-primarygreen font-semibold ">
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
                        <p className="text-sm text-primarygreen font-semibold ">
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
                "self-center flex items-center justify-center  absolute left-[100px] w-[53px] h-[53px] bg-bgIcon rounded-[500px]"
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
            <Slider {...sliderSettings2} ref={slider2}>
              <div className={"rounded-lg"}>
                <Card
                  bordered
                  style={{
                    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)",
                    borderRadius: "8px",
                  }}
                >
                  <div className="">
                    <div className="flex flex-row justify-between">
                      <p className="text-3xl text-darkgrey italic gilroy-semibold font-semibold">
                        "
                      </p>
                      <p className="text-3xl text-darkgrey italic gilroy-semibold font-semibold">
                        "
                      </p>
                    </div>
                    <p className="pb-4 gilroy-regular text-xl text-blackmig mx-auto text-left">
                      I had a{" "}
                      <span className={"font-bold"}>wonderful experience</span>{" "}
                      working with Mitramas Infosys Global. Lorem ipsum dolor
                      sit amet, consectetur adipiscing elit, sed do eiusmod{" "}
                      <span className={"font-semibold"}>tempor incididunt</span>{" "}
                      ut labore et dolore magna aliqua.
                    </p>
                    <div
                      className={
                        "border-solid border-2 border-divider mt-5 mx-auto w-[417px]"
                      }
                    ></div>
                    <div className="flex flex-col items-center mt-5">
                      <div className="flex justify-center mt-10">
                        <img
                          className="rounded-full mr-4"
                          src="/image/landingpage/testimonial-user.png"
                          style={{ height: "68px", width: "102px" }}
                          alt=""
                        />
                        <div className="self-center">
                          <p
                            className={"text-blackmig font-semibold text-base"}
                          >
                            Fachri Fauzan
                          </p>
                          <p className={"text-darkgrey font-semibold text-sm"}>
                            Talent Acquisition at Bukopin
                          </p>
                        </div>
                        <div className="ml-4">
                          <img
                            style={{ height: "68px", width: "81px" }}
                            src="/image/landingpage/testimonial-client.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="flex justify-around mt-10">
                        <div className="bg-greenTrans20 mx-10 py-2 px-4 rounded-[20px]">
                          <p className="text-sm text-primarygreen gilroy-regular">
                            <span className={"font-semibold"}>Industry : </span>
                            Banking
                          </p>
                        </div>
                        <div className="bg-lightblue mx-10 py-2 px-4 rounded-[20px]">
                          <p className="text-sm text-primarygreen gilroy-regular">
                            <span className={"font-semibold"}>Service : </span>
                            Hardware, Talents
                          </p>
                        </div>
                      </div>
                      <a href="#">
                        <div className="flex justify-center items-center mt-10">
                          <p className="text-base mr-5 text-primarygreen font-semibold gilroy-semibold">
                            Read more
                          </p>
                          <img
                            className={"items-center"}
                            style={{ width: "8px", height: "15px" }}
                            src="/image/landingpage/arrow-forward-ios.png"
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                </Card>
              </div>
              <div className={"rounded-lg"}>
                <Card
                  bordered
                  style={{
                    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)",
                    borderRadius: "8px",
                  }}
                >
                  <div className="">
                    <div className="flex flex-row justify-between">
                      <p className="text-3xl text-darkgrey italic gilroy-semibold font-semibold">
                        "
                      </p>
                      <p className="text-3xl text-darkgrey italic gilroy-semibold font-semibold">
                        "
                      </p>
                    </div>
                    <p className="pb-4 gilroy-regular text-xl text-blackmig mx-auto text-left">
                      I had a{" "}
                      <span className={"font-bold"}>wonderful experience</span>{" "}
                      working with Mitramas Infosys Global. Lorem ipsum dolor
                      sit amet, consectetur adipiscing elit, sed do eiusmod{" "}
                      <span className={"font-semibold"}>tempor incididunt</span>{" "}
                      ut labore et dolore magna aliqua.
                    </p>
                    <div
                      className={
                        "border-solid border-2 border-divider mt-5 mx-auto w-[417px]"
                      }
                    ></div>
                    <div className="flex flex-col items-center mt-5">
                      <div className="flex justify-center mt-10">
                        <img
                          className="rounded-full mr-4"
                          src="/image/landingpage/testimonial-user.png"
                          style={{ height: "68px", width: "102px" }}
                          alt=""
                        />
                        <div className="self-center">
                          <p
                            className={"text-blackmig font-semibold text-base"}
                          >
                            Fachri Fauzan
                          </p>
                          <p className={"text-darkgrey font-semibold text-sm"}>
                            Talent Acquisition at Bukopin
                          </p>
                        </div>
                        <div className="ml-4">
                          <img
                            style={{ height: "68px", width: "81px" }}
                            src="/image/landingpage/testimonial-client.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="flex justify-around mt-10">
                        <div className="bg-greenTrans20 mx-10 py-2 px-4 rounded-[20px]">
                          <p className="text-sm text-primarygreen gilroy-regular">
                            <span className={"font-semibold"}>Industry : </span>
                            Banking
                          </p>
                        </div>
                        <div className="bg-lightblue mx-10 py-2 px-4 rounded-[20px]">
                          <p className="text-sm text-primarygreen gilroy-regular">
                            <span className={"font-semibold"}>Service : </span>
                            Hardware, Talents
                          </p>
                        </div>
                      </div>
                      <a href="#">
                        <div className="flex justify-center items-center mt-10">
                          <p className="text-base mr-5 text-primarygreen font-semibold gilroy-semibold">
                            Read more
                          </p>
                          <img
                            className={"items-center"}
                            style={{ width: "8px", height: "15px" }}
                            src="/image/landingpage/arrow-forward-ios.png"
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                </Card>
              </div>
            </Slider>
          </div>
          <button onClick={() => slider?.current?.slickNext()}>
            <div
              className={
                "self-center flex items-center justify-center  absolute right-[100px] w-[53px] h-[53px] bg-bgIcon rounded-[500px]"
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
      </section>
      <section
        className={
          "contactusphone mt-20 md:relative block md:hidden md:flex bg-bgfooter pt-8"
        }
      >
        <div className={"container mx-auto"}>
          <div class="bg-white border-3 border-solid shadow-2xl rounded-[8px] text-center mx-5  -mt-24 py-4 px-8">
            <p className={"text-xl font-semibold"}>
              Fulfill your IT needs easily!
            </p>
            <p className={"py-5 text-sm Gilroy-regular"}>
              Need help in providing your needs? Whether they related to
              hardware, software, or even talent hiring? Contact us and hear
              what service can we offer to you and your company!
            </p>
            <Link href="/hardware">
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
            </Link>
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
      <section
        className={
          "youronestop hidden md:block md:flex md:flex-row md:justify-between bg-bgfooter -mt-3 pt-8"
        }
      >
        <div className={"justify-start self-end"}>
          <img
            style={{ width: "332px", height: "142px" }}
            src="/image/landingpage/footer-left.png"
          />
        </div>
        <div className={"container w-1/2 mx-auto"}>
          <div class="bg-white border-3 mx-auto  w-[645px] border-solid shadow-2xl rounded-[8px] text-center -mt-36 py-4 px-8">
            <p className={"text-2xl font-semibold text-black"}>
              Fulfill your IT needs easily!
            </p>
            <p className={"py-5 text-base gilroy-regular text-black"}>
              Need help in providing your needs? Whether they related to
              hardware, software, or even talent hiring? Contact us and hear
              what service can we offer to you and your company!
            </p>
            <Link href="/contactus">
              <button
                className={
                  "text-sm w-[145px] -mt-10 text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 md:px-4 mt-4"
                }
              >
                <div className={"flex flex-row justify-between"}>
                  <p className={"text-base gilroy-semibold font-semibold mr-2"}>
                    Contact Us
                  </p>
                  <img
                    className={"self-center"}
                    style={{ height: "15px", width: "8px" }}
                    src="/image/landingpage/arrow-forward.png"
                  />
                </div>
              </button>
            </Link>
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
          <div class="bg-white border-3 border-solid shadow-2xl rounded-[8px] text-center mx-5  -mt-24 py-4 px-8">
            <p className={"text-xl font-semibold"}>
              Fulfill your IT needs easily!
            </p>
            <p className={"py-5 text-sm Gilroy-regular"}>
              Need help in providing your needs? Whether they related to
              hardware, software, or even talent hiring? Contact us and hear
              what service can we offer to you and your company!
            </p>
            <Link href="/hardware">
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
            </Link>
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

export default Software;
