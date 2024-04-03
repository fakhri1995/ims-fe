import { CheckCircleTwoTone } from "@ant-design/icons";
import {
  Card,
  Checkbox,
  Collapse,
  Form,
  Input,
  Select,
  notification,
} from "antd";
import Head from "next/head";
import Link from "next/link";
import { React, useEffect, useRef, useState } from "react";
import Slider from "react-slick";

import Layout from "../../../components/migwebsite/layout.js";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function HardwareDetail({}) {
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
  const handleChange = () => {};
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
      <section className={"pagehardware pt-4 mt-16 ml-48"}>
        <Link href={{ pathname: "/hardware" }}>
          <div className={"flex flex-row justify-between w-[163px]"}>
            <img
              src="/image/hardware/arrow_back_ios_new.png"
              alt=""
              className="w-[20px] h-[20px]"
            />
            <p className={"text-base text-primarygreen font-semibold"}>
              Back to Hardware
            </p>
          </div>
        </Link>
        <div>
          <Select
            className="ant-select-suffix"
            suffixIcon={
              <img src="/image/landingpage/caret-down-outlined.png" alt="" />
            }
            bordered={"false"}
            defaultValue="Popular"
            style={{ width: 150 }}
            onChange={handleChange}
            options={[
              {
                value: "Popular",
                label: "Most Popular",
              },
              {
                value: "Latest",
                label: "Latest",
              },
              {
                value: "Oldest",
                label: "Oldest",
              },
            ]}
          />
        </div>
        <div className={"mt-6 flex flex-row items-center"}>
          <p className={"gilroy-regular text-sm text-darkgrey"}>Filter by:</p>
          <div
            className={
              "text-sm h-[29px] w-[187px] gilroy-regular mx-3 text-darkgrey border border-transp45 flex justify-center items-center rounded-[20px]"
            }
          >
            Automated Teller Machine
          </div>
          <div
            className={
              "text-sm h-[29px] w-[187px] gilroy-regular mx-3 text-darkgrey border border-transp45 flex justify-center items-center rounded-[20px]"
            }
          >
            Cash Sorter Machine
          </div>
          <div
            className={
              "text-sm h-[29px] w-[187px] gilroy-regular mx-3 text-darkgrey border border-transp45 flex justify-center items-center rounded-[20px]"
            }
          >
            Teller Assist Unit
          </div>
        </div>
        <div className={"mt-6 grid md: grid-cols-4"}>
          <div
            className={
              "border rounded-lg border-divider w-[282px] h-[383px] p-4"
            }
          >
            <img
              src="/image/hardware/laptop.png"
              alt=""
              className="w-[250px] h-[177px]"
            />
            <div
              className={
                "bg-greenTrans20 w-[83px] h-[26px] flex justify-center items-center  rounded-[20px]"
              }
            >
              <p className={"text-primarygreen text-xs gilroy-regular"}>
                Workstation
              </p>
            </div>
            <div className={"mt-3"}>
              <p className={"gilroy-bold text-blackmig text-base"}>
                LENOVO IdeaPad S340
              </p>
            </div>
            <div className={"mt-3"}>
              <p className={"gilroy-regular text-darkgrey text-xs"}>
                Biaya Sewa
              </p>
              <p
                className={
                  "gilroy-semibold font-semibold text-blackmig text-sm"
                }
              >
                Rp 300.000 - Rp 400.000/bulan
              </p>
            </div>
            <div className={"flex justify-end px-4 mt-4"}>
              <button
                className={
                  "flex flex-row justify-between bg-white items-center px-4 w-[131px] h-[40px]"
                }
              >
                <p
                  className={
                    "text-primarygreen text-base gilroy-semibold font-semibold"
                  }
                >
                  See more
                </p>
                <img
                  src="/image/hardware/arrow-circle-right.png"
                  alt=""
                  className="w-[20px] h-[20px]"
                />
              </button>
            </div>
          </div>
          <div
            className={
              "border rounded-lg border-divider w-[282px] h-[383px] p-4"
            }
          >
            <img
              src="/image/hardware/laptop.png"
              alt=""
              className="w-[250px] h-[177px]"
            />
            <div
              className={
                "bg-greenTrans20 w-[83px] h-[26px] flex justify-center items-center  rounded-[20px]"
              }
            >
              <p className={"text-primarygreen text-xs gilroy-regular"}>
                Workstation
              </p>
            </div>
            <div className={"mt-3"}>
              <p className={"gilroy-bold text-blackmig text-base"}>
                LENOVO IdeaPad S340
              </p>
            </div>
            <div className={"mt-3"}>
              <p className={"gilroy-regular text-darkgrey text-xs"}>
                Biaya Sewa
              </p>
              <p
                className={
                  "gilroy-semibold font-semibold text-blackmig text-sm"
                }
              >
                Rp 300.000 - Rp 400.000/bulan
              </p>
            </div>
            <div className={"flex justify-end px-4 mt-4"}>
              <button
                className={
                  "flex flex-row justify-between bg-white items-center px-4 w-[131px] h-[40px]"
                }
              >
                <p
                  className={
                    "text-primarygreen text-base gilroy-semibold font-semibold"
                  }
                >
                  See more
                </p>
                <img
                  src="/image/hardware/arrow-circle-right.png"
                  alt=""
                  className="w-[20px] h-[20px]"
                />
              </button>
            </div>
          </div>
          <div
            className={
              "border rounded-lg border-divider w-[282px] h-[383px] p-4"
            }
          >
            <img
              src="/image/hardware/laptop.png"
              alt=""
              className="w-[250px] h-[177px]"
            />
            <div
              className={
                "bg-greenTrans20 w-[83px] h-[26px] flex justify-center items-center  rounded-[20px]"
              }
            >
              <p className={"text-primarygreen text-xs gilroy-regular"}>
                Workstation
              </p>
            </div>
            <div className={"mt-3"}>
              <p className={"gilroy-bold text-blackmig text-base"}>
                LENOVO IdeaPad S340
              </p>
            </div>
            <div className={"mt-3"}>
              <p className={"gilroy-regular text-darkgrey text-xs"}>
                Biaya Sewa
              </p>
              <p
                className={
                  "gilroy-semibold font-semibold text-blackmig text-sm"
                }
              >
                Rp 300.000 - Rp 400.000/bulan
              </p>
            </div>
            <div className={"flex justify-end px-4 mt-4"}>
              <button
                className={
                  "flex flex-row justify-between bg-white items-center px-4 w-[131px] h-[40px]"
                }
              >
                <p
                  className={
                    "text-primarygreen text-base gilroy-semibold font-semibold"
                  }
                >
                  See more
                </p>
                <img
                  src="/image/hardware/arrow-circle-right.png"
                  alt=""
                  className="w-[20px] h-[20px]"
                />
              </button>
            </div>
          </div>
          <div
            className={
              "border rounded-lg border-divider w-[282px] h-[383px] p-4"
            }
          >
            <img
              src="/image/hardware/laptop.png"
              alt=""
              className="w-[250px] h-[177px]"
            />
            <div
              className={
                "bg-greenTrans20 w-[83px] h-[26px] flex justify-center items-center  rounded-[20px]"
              }
            >
              <p className={"text-primarygreen text-xs gilroy-regular"}>
                Workstation
              </p>
            </div>
            <div className={"mt-3"}>
              <p className={"gilroy-bold text-blackmig text-base"}>
                LENOVO IdeaPad S340
              </p>
            </div>
            <div className={"mt-3"}>
              <p className={"gilroy-regular text-darkgrey text-xs"}>
                Biaya Sewa
              </p>
              <p
                className={
                  "gilroy-semibold font-semibold text-blackmig text-sm"
                }
              >
                Rp 300.000 - Rp 400.000/bulan
              </p>
            </div>
            <div className={"flex justify-end px-4 mt-4"}>
              <button
                className={
                  "flex flex-row justify-between bg-white items-center px-4 w-[131px] h-[40px]"
                }
              >
                <p
                  className={
                    "text-primarygreen text-base gilroy-semibold font-semibold"
                  }
                >
                  See more
                </p>
                <img
                  src="/image/hardware/arrow-circle-right.png"
                  alt=""
                  className="w-[20px] h-[20px]"
                />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section
        className={
          "youronestop mt-32 hidden md:block md:flex md:flex-row md:justify-between bg-bgfooter pt-8"
        }
      >
        <div className={"justify-start self-end"}>
          <img
            style={{ width: "332px", height: "142px" }}
            src="/image/landingpage/footer-left.png"
          />
        </div>
        <div className={"container w-1/2 mx-auto"}>
          <div className="bg-white border-3 mx-auto  w-[645px] border-solid shadow-2xl rounded-[8px] text-center -mt-32 py-4 px-8">
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
          <div className="bg-white border-3 border-solid shadow-2xl rounded-[8px] text-center mx-5  -mt-24 py-4 px-8">
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

export default HardwareDetail;
