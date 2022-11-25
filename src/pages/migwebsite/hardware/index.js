import { CheckCircleTwoTone } from "@ant-design/icons";
import { Card, Checkbox, Collapse, Form, Input, notification } from "antd";
import Head from "next/head";
import Link from "next/link";
import { React, useEffect, useRef, useState } from "react";
import Slider from "react-slick";

import Layout from "../../../components/migwebsite/layout.js";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function Hardware({}) {
  const { Panel } = Collapse;
  const [form] = Form.useForm();
  const handleSubmit = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataHardware),
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
  const [dataHardware, setDataHardware] = useState({
    company_name: null,
    company_email: null,
    name: null,
    phone_number: null,
    interested_in: "hardware",
    message: null,
  });
  const [email, setEmail] = useState(null);
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
        <title>Hardware</title>
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
                className={"cursor-pointer flex-col gilroy-bold text-lg mr-4"}
                style={{
                  borderBottom: "solid 2px #10B981",
                  paddingBottom: "2.5px",
                }}
              >
                Hardware
              </p>
            </Link>
            <Link href={{ pathname: "/software" }}>
              <p
                className={"cursor-pointer flex-col gilroy-medium text-lg mx-4"}
              >
                Software
              </p>
            </Link>
            <Link href={{ pathname: "/talents" }}>
              <p
                className={"cursor-pointer flex-col gilroy-medium text-lg mx-4"}
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
          "section2hardware py-4 md:py-8 mt-10 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
      >
        <div className={"hidden md:flex container mx-auto"}>
          <div className={"flex-col w-1/2 my-auto"}>
            <p className={"text-3xl pb-4 gilroy-bold"}>
              Nation-wide managed service model for your IT hardwares
            </p>
            <p className={"mr-20 pb-4 gilroy-medium text-xl"}>
              Rapid pace of change, uncertainty on scalability, and heavy
              capital requirements might break your focus from executing your
              core business.
            </p>
            <div className={"my-6"}>
              <p className={"mr-20 gilroy-bold text-primarygreen text-xl"}>
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
                    <p className={"text-sm text-blackmig gilroy-regular"}>
                      Let us help you to scale and manage your IT infrastructure
                      with :
                    </p>
                    <ul>
                      <li>
                        <p className={"text-sm text-blackmig gilroy-regular"}>
                          {""}
                          <span className={"font-bold"}>predictable</span>{" "}
                          monthly cost
                        </p>
                      </li>
                      <li>
                        <p className={"text-sm text-blackmig gilroy-regular"}>
                          {""}
                          <span className={"font-bold"}>guaranteed</span>{" "}
                          service level
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"flex-col w-1/2 my-auto"}>
            <img src="/image/hardware/Hardware-Solution.png"></img>
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
      {/* section jenis hardware */}
      <section
        className={
          "section2somehardwarebrowser bg-bgjoinmig mt-20 pt-10 md:relative py-8 hidden md:block px-4 md:px-10"
        }
      >
        <div className={"container text-center mx-auto"}>
          <p className={"text-xl md:text-2xl gilroy-bold py-8 md:py-0"}>
            Let’s see what{" "}
            <span
              style={{
                borderBottom: "solid 3px #188E4D",
                paddingBottom: "2.5px",
              }}
            >
              IT hardwares
            </span>{" "}
            we can offer
          </p>
          <div className={"flex flex-row mt-10 justify-center"}>
            <div
              className={
                "flex flex-col justify-between text-center w-[241px] h-[146px] bg-lightblue rounded-lg p-3"
              }
            >
              <p className={"text-xl gilroy-bold text-accentblue"}>
                Banking Machinery
              </p>
              <p className={"text-xs font-semibold italic text-blackmig"}>
                Help you to grow your financial business domestically
              </p>
              <div className={"self-center"}>
                <button className={"bg-lightblue w-[133px]"}>
                  <div className={"flex flex-row justify-between px-4 pb-3"}>
                    <p className={"text-base text-accentblue font-semibold"}>
                      Get yours
                    </p>
                    <img
                      src="/image/hardware/arrow_forward_ios_blue.png"
                      className={"w-[20px] h-[20px] self-center"}
                      alt=""
                    />
                  </div>
                </button>
              </div>
            </div>
            <div className={"grid grid-cols-6 ml-3"}>
              <div className="bg-white p-3 border border-divider rounded-lg w-[152px] h-[146px] text-center mx-3">
                <img
                  src="/image/hardware/laptop.png"
                  className={"w-[128px] h-[90px] self-center"}
                  alt=""
                />
                <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
              </div>
              <div className="bg-white p-3 border border-divider rounded-lg w-[152px] h-[146px] text-center mx-3">
                <img
                  src="/image/hardware/laptop.png"
                  className={"w-[128px] h-[90px] self-center"}
                  alt=""
                />
                <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
              </div>
              <div className="bg-white p-3 border border-divider rounded-lg w-[152px] h-[146px] text-center mx-3">
                <img
                  src="/image/hardware/laptop.png"
                  className={"w-[128px] h-[90px] self-center"}
                  alt=""
                />
                <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
              </div>
              <div className="bg-white p-3 border border-divider rounded-lg w-[152px] h-[146px] text-center mx-3">
                <img
                  src="/image/hardware/laptop.png"
                  className={"w-[128px] h-[90px] self-center"}
                  alt=""
                />
                <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
              </div>
              <div className="bg-white p-3 border border-divider rounded-lg w-[152px] h-[146px] text-center mx-3">
                <img
                  src="/image/hardware/laptop.png"
                  className={"w-[128px] h-[90px] self-center"}
                  alt=""
                />
                <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
              </div>
              <div className="bg-white p-3 border border-divider rounded-lg w-[152px] h-[146px] text-center mx-3">
                <img
                  src="/image/hardware/laptop.png"
                  className={"w-[128px] h-[90px] self-center"}
                  alt=""
                />
                <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
              </div>
            </div>
          </div>
          <div className={"flex flex-row mt-10 justify-center"}>
            <div
              className={
                "flex flex-col justify-between text-center w-[241px] h-[146px] bg-lightgreen rounded-lg p-3"
              }
            >
              <p className={"text-xl gilroy-bold text-primarygreen"}>
                Workstation
              </p>
              <p className={"text-xs font-semibold italic text-blackmig"}>
                Enhance the productivity of your people
              </p>
              <div className={"self-center"}>
                <button className={"bg-lightgreen w-[133px]"}>
                  <div className={"flex flex-row justify-between px-4 pb-3"}>
                    <p className={"text-base text-primarygreen font-semibold"}>
                      Get yours
                    </p>
                    <img
                      src="/image/hardware/arrow_forward_ios_green.png"
                      className={"w-[20px] h-[20px] self-center"}
                      alt=""
                    />
                  </div>
                </button>
              </div>
            </div>
            <div className={"grid grid-cols-6 ml-3"}>
              <div className="bg-white p-3 border border-divider rounded-lg w-[152px] h-[146px] text-center mx-3">
                <img
                  src="/image/hardware/laptop.png"
                  className={"w-[128px] h-[90px] self-center"}
                  alt=""
                />
                <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
              </div>
              <div className="bg-white p-3 border border-divider rounded-lg w-[152px] h-[146px] text-center mx-3">
                <img
                  src="/image/hardware/laptop.png"
                  className={"w-[128px] h-[90px] self-center"}
                  alt=""
                />
                <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
              </div>
              <div className="bg-white p-3 border border-divider rounded-lg w-[152px] h-[146px] text-center mx-3">
                <img
                  src="/image/hardware/laptop.png"
                  className={"w-[128px] h-[90px] self-center"}
                  alt=""
                />
                <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
              </div>
              <div className="bg-white p-3 border border-divider rounded-lg w-[152px] h-[146px] text-center mx-3">
                <img
                  src="/image/hardware/laptop.png"
                  className={"w-[128px] h-[90px] self-center"}
                  alt=""
                />
                <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
              </div>
              <div className="bg-white p-3 border border-divider rounded-lg w-[152px] h-[146px] text-center mx-3">
                <img
                  src="/image/hardware/laptop.png"
                  className={"w-[128px] h-[90px] self-center"}
                  alt=""
                />
                <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
              </div>
              <div className="bg-white p-3 border border-divider rounded-lg w-[152px] h-[146px] text-center mx-3">
                <img
                  src="/image/hardware/laptop.png"
                  className={"w-[128px] h-[90px] self-center"}
                  alt=""
                />
                <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
              </div>
            </div>
          </div>
          <div className={"flex flex-row mt-10 justify-center"}>
            <div
              className={
                "flex flex-col justify-between text-center w-[241px] h-[146px] bg-lightgrey rounded-lg p-3"
              }
            >
              <p className={"text-xl gilroy-bold text-accentpurple"}>
                Server & Hosting
              </p>
              <p className={"text-xs font-semibold italic text-blackmig"}>
                Enhance the productivity of your people
              </p>
              <div className={"self-center"}>
                <button className={"bg-lightgrey w-[133px]"}>
                  <div className={"flex flex-row justify-between px-4 pb-3"}>
                    <p className={"text-base text-accentpurple font-semibold"}>
                      Get yours
                    </p>
                    <img
                      src="/image/hardware/arrow_forward_ios_purple.png"
                      className={"w-[20px] h-[20px] self-center"}
                      alt=""
                    />
                  </div>
                </button>
              </div>
            </div>
            <div className={"grid grid-cols-6 ml-3"}>
              <div className="bg-white p-3 border border-divider rounded-lg w-[152px] h-[146px] text-center mx-3">
                <img
                  src="/image/hardware/laptop.png"
                  className={"w-[128px] h-[90px] self-center"}
                  alt=""
                />
                <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
              </div>
              <div className="bg-white p-3 border border-divider rounded-lg w-[152px] h-[146px] text-center mx-3">
                <img
                  src="/image/hardware/laptop.png"
                  className={"w-[128px] h-[90px] self-center"}
                  alt=""
                />
                <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
              </div>
              <div className="bg-white p-3 border border-divider rounded-lg w-[152px] h-[146px] text-center mx-3">
                <img
                  src="/image/hardware/laptop.png"
                  className={"w-[128px] h-[90px] self-center"}
                  alt=""
                />
                <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
              </div>
              <div className="bg-white p-3 border border-divider rounded-lg w-[152px] h-[146px] text-center mx-3">
                <img
                  src="/image/hardware/laptop.png"
                  className={"w-[128px] h-[90px] self-center"}
                  alt=""
                />
                <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
              </div>
              <div className="bg-white p-3 border border-divider rounded-lg w-[152px] h-[146px] text-center mx-3">
                <img
                  src="/image/hardware/laptop.png"
                  className={"w-[128px] h-[90px] self-center"}
                  alt=""
                />
                <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
              </div>
              <div className="bg-white p-3 border border-divider rounded-lg w-[152px] h-[146px] text-center mx-3">
                <img
                  src="/image/hardware/laptop.png"
                  className={"w-[128px] h-[90px] self-center"}
                  alt=""
                />
                <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
              </div>
            </div>
          </div>
          <div className={"flex flex-row mt-10 justify-center"}>
            <div
              className={
                "flex flex-col justify-between text-center w-[241px] h-[146px] bg-lightpink rounded-lg p-3"
              }
            >
              <p className={"text-xl gilroy-bold text-accentblue"}>UPS</p>
              <p className={"text-xs font-semibold italic text-blackmig"}>
                Prevent any damage of your devices from power loss
              </p>
              <div className={"self-center"}>
                <button className={"bg-lightpink w-[133px]"}>
                  <div className={"flex flex-row justify-between px-4 pb-3"}>
                    <p className={"text-base text-accentpink font-semibold"}>
                      Get yours
                    </p>
                    <img
                      src="/image/hardware/arrow_forward_ios_pink.png"
                      className={"w-[20px] h-[20px] self-center"}
                      alt=""
                    />
                  </div>
                </button>
              </div>
            </div>
            <div className={"grid grid-cols-6 ml-3"}>
              <div className="bg-white p-3 border border-divider rounded-lg w-[152px] h-[146px] text-center mx-3">
                <img
                  src="/image/hardware/laptop.png"
                  className={"w-[128px] h-[90px] self-center"}
                  alt=""
                />
                <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
              </div>
              <div className="bg-white p-3 border border-divider rounded-lg w-[152px] h-[146px] text-center mx-3">
                <img
                  src="/image/hardware/laptop.png"
                  className={"w-[128px] h-[90px] self-center"}
                  alt=""
                />
                <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
              </div>
              <div className="bg-white p-3 border border-divider rounded-lg w-[152px] h-[146px] text-center mx-3">
                <img
                  src="/image/hardware/laptop.png"
                  className={"w-[128px] h-[90px] self-center"}
                  alt=""
                />
                <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
              </div>
              <div className="bg-white p-3 border border-divider rounded-lg w-[152px] h-[146px] text-center mx-3">
                <img
                  src="/image/hardware/laptop.png"
                  className={"w-[128px] h-[90px] self-center"}
                  alt=""
                />
                <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
              </div>
              <div className="bg-white p-3 border border-divider rounded-lg w-[152px] h-[146px] text-center mx-3">
                <img
                  src="/image/hardware/laptop.png"
                  className={"w-[128px] h-[90px] self-center"}
                  alt=""
                />
                <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
              </div>
              <div className="bg-white p-3 border border-divider rounded-lg w-[152px] h-[146px] text-center mx-3">
                <img
                  src="/image/hardware/laptop.png"
                  className={"w-[128px] h-[90px] self-center"}
                  alt=""
                />
                <p className={"mt-3 gilroy-bold text-base"}>ATM</p>
              </div>
            </div>
          </div>
          <div className={"pt-6 pb-4 text-center mx-auto md:w-[646px]"}>
            <p className={"font-regular gilroy-regular text-base"}>
              <span className={"font-semibold"}>
                Didn’t find what you were looking for?
              </span>{" "}
              Reach us to get your orders customized based on your IT needs
            </p>
          </div>
          <div className={"md:mt-3 mx-auto"}>
            <Link href="/contactus">
              <button
                className={
                  "text-sm md:w-[209px] -mt-10 rounded text-primarygreen border-2 bg-white border-primarygreen px-4 py-2 md:px-2 mt-4"
                }
              >
                <p className={"text-base gilroy-semibold font-semibold mr-2"}>
                  Contact our sales team
                </p>
              </button>
            </Link>
          </div>
        </div>
      </section>
      <section
        className={
          "section2landingpagebrowser bg-bgjoinmig md:relative py-8 hidden md:block px-4 md:px-10 "
        }
      >
        <div className={"container mx-auto"}>
          <div className={"flex flex-row justify-center"}>
            <div className={"w-2/5flex justify-end"}>
              <img
                src="/image/people/People-Solution.png"
                className={"w-[477px] h-[282px]"}
                alt=""
              />
            </div>
            <div className={"w-3/5 justify-self-start"}>
              <div className="flex flex-col items-start px-10">
                <h4 className="mb-2 text-2xl font-semibold text-blackmig">
                  Why you should trust us in taking care of your IT hardwares?
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
                      Reliable Partner
                    </h5>
                    <p className="text-left px-5 text-base text-blackmig gilroy-regular">
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
                    <h5 className="px-5 text-sm md:text-base font-semibold text-blackmig">
                      Increase Efficiency
                    </h5>
                    <p className="text-left px-5 text-base text-blackmig gilroy-regular">
                      We offer diverse industry exposures and hands-on
                      experience
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
                      Nationwide Performance
                    </h5>
                    <p className="text-left px-5 text-base text-blackmig gilroy-regular">
                      We support personal growth through constant experiment and
                      learning
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
                src="/image/hardware/hardware-work-1.png"
                style={{ width: "145px", height: "145px" }}
              />
              <p
                className={
                  "text-blackmig text-sm md:text-base Gilroy-semibold font-semibold mt-4 text-center"
                }
              >
                We find high quality hardware products
              </p>
              <p
                className={"text-base text-blackmig gilroy-regular text-center"}
              >
                We have extensive network and partnerships with hardware
                principles ready to be leveraged for your advantage
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
              src="/image/hardware/hardware-work-2.png"
              style={{ width: "145px", height: "145px" }}
            />
            <p
              className={
                "text-blackmig text-sm md:text-base Gilroy-semibold font-semibold mt-4 text-center"
              }
            >
              Custom match with your needs
            </p>
            <p className={"text-base text-blackmig gilroy-regular text-center"}>
              We customize our procurement with your specification needs
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
              src="/image/hardware/hardware-work-3.png"
              style={{ width: "145px", height: "145px" }}
            />
            <p
              className={
                "text-blackmig text-sm md:text-base Gilroy-semibold font-semibold mt-4 text-center"
              }
            >
              We conduct full operation and maintenance for your hardware
            </p>
            <p className={"text-base text-blackmig gilroy-regular text-center"}>
              We ensure guaranteed level of hardware performance throughout
            </p>
          </div>
        </div>
      </section>
      {/* testimonial */}
      <section
        className={
          "section3landingpageadvantages bg-bgjoinmig pt-8 py-16 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
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
            <Slider {...sliderSettings2} ref={slider}>
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
      {/* coverages */}
      <section
        className={
          "sectioncoverages bg-transp60 pt-8 pb-32 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
      >
        <p
          className={
            "text-xl md:text-3xl text-blackmig text-center gilroy-semibold font-semibold py-8 md:py-0 mb-10"
          }
        >
          Coverages
        </p>
        <div
          className={"bg-white p-12 items-center w-[788px] h-[408px] mx-auto"}
          style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
        >
          <ul className={"coverage-list"}>
            <li>
              <p href="">Banda Aceh</p>
            </li>
            <li>
              <p href="">Medan</p>
            </li>
            <li>
              <p href="">Padang</p>
            </li>
            <li>
              <p href="">Jambi</p>
            </li>
            <li>
              <p href="">Pekanbaru</p>
            </li>
            <li>
              <p href="">Batam</p>
            </li>
            <li>
              <p href="">Tanjung pinang</p>
            </li>
            <li>
              <p href="">Jakarta</p>
            </li>
            <li>
              <p href="">Bekasi</p>
            </li>
            <li>
              <p href="">Depok</p>
            </li>
            <li>
              <p href="">Karawang</p>
            </li>
            <li>
              <p href="">Cilegon</p>
            </li>
            <li>
              <p href="">Sukabumi</p>
            </li>
            <li>
              <p href="">Bandar lampung</p>
            </li>
            <li>
              <p href="">Palembang</p>
            </li>
            <li>
              <p href="">Bandung</p>
            </li>
            <li>
              <p href="">Tasikmalaya</p>
            </li>
            <li>
              <p href="">Cirebon</p>
            </li>
            <li>
              <p href="">Semarang</p>
            </li>
            <li>
              <p href="">Purwokerto</p>
            </li>
            <li>
              <p href="">Tegal</p>
            </li>
            <li>
              <p href="">Yogyakarta</p>
            </li>
            <li>
              <p href="">Magelang</p>
            </li>
            <li>
              <p href="">Solo</p>
            </li>
            <li>
              <p href="">Surabaya</p>
            </li>
            <li>
              <p href="">Madiun</p>
            </li>
            <li>
              <p href="">Sidoarjo</p>
            </li>
            <li>
              <p href="">Malang</p>
            </li>
            <li>
              <p href="">Kediri</p>
            </li>
            <li>
              <p href="">Bogor</p>
            </li>
            <li>
              <p href="">Probolingo</p>
            </li>
            <li>
              <p href="">Banyuwangi</p>
            </li>
            <li>
              <p href="">Jember</p>
            </li>
            <li>
              <p href="">Bali</p>
            </li>
            <li>
              <p href="">Mataram</p>
            </li>
            <li>
              <p href="">Kupang</p>
            </li>
            <li>
              <p href="">Samarinda</p>
            </li>
            <li>
              <p href="">Banjarmasin</p>
            </li>
            <li>
              <p href="">Pontianak</p>
            </li>
            <li>
              <p href="">Balikpapan</p>
            </li>
            <li>
              <p href="">Makasar</p>
            </li>
            <li>
              <p href="">Sorong</p>
            </li>
            <li>
              <p href="">Palu</p>
            </li>
            <li>
              <p href="">Manado</p>
            </li>
            <li>
              <p href="">Pare-pare</p>
            </li>
          </ul>
        </div>
      </section>
      <section
        className={
          "youronestop hidden md:block md:flex md:flex-row md:justify-between bg-bgfooter pt-8"
        }
      >
        <div className={"justify-start self-end"}>
          <img
            style={{ width: "332px", height: "142px" }}
            src="/image/landingpage/footer-left.png"
          />
        </div>
        <div className={"container w-1/2 mx-auto"}>
          <div class="bg-white border-3 mx-auto  w-[645px] border-solid shadow-2xl rounded-[8px] text-center -mt-32 py-4 px-8">
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

export default Hardware;
