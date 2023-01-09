import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import Head from "next/head";
import Linkk from "next/link";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import Flickity from "react-flickity-component";
import { Link, animateScroll as scroll } from "react-scroll";
import Slider from "react-slick";

// import { LikeFillIconSvg, LikeIconSvg,ReplyIconSvg } from "../../../components/icon";
import Layout from "../../../components/migwebsite/layout";
import LayoutFormContactUs from "../../../components/migwebsite/layout-form-contact-us.js";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function BlogDetail({}) {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [dataContactUs, setDataContactUs] = useState({
    company_name: null,
    company_email: null,
    name: null,
    phone_number: null,
    interested_in: null,
    message: null,
  });
  const [hideReply, setHideReply] = useState(true);
  const sliderSettingsPhone = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
  };
  const onChangereply = () => {
    setHideReply(!hideReply);
  };

  return (
    <Layout>
      {/* <section className={'container mx-auto'}> */}
      <Head>
        <title>Blog Detail</title>
      </Head>
      <section
        className={
          "section1landingpage hidden md:block px-4 md:px-[112px] pt-8 md:pt-16 pb-10 md:pb-[74px]"
        }
      >
        <div className={"w-5/6"}>
          <p
            className={
              "text-2xl md:text-[32px] text-blackmig font-gilroysemibold"
            }
          >
            This is a Title This is a Title This is a Title
          </p>
          <div className={"flex flex-row justify-between my-[17px]"}>
            <p className={"text-xs text-darkgrey"}>
              by <span className={"font-bold"}>Mayfa Shadrina </span>
              on <span className={"font-bold"}>August 8th, 2022</span>
            </p>
            <p className={"text-sm text-darkgrey font-gilroyregular"}>
              9 MINUTE READ
            </p>
          </div>
        </div>
        <div className={"flex flex-row py-2"}>
          <div className={"w-5/6"}>
            <img src="/image/blog.png" className={"w-full h-full"} alt="" />
          </div>
          <div
            className={
              "w-1/6 items-center grid justify-items-center self-center"
            }
          >
            <p
              className={
                "text-sm text-darkgrey md:text-base font-gilroysemibold"
              }
            >
              Share
            </p>
            <img
              src="/image/message-circle.png"
              className={"my-4"}
              style={{ width: "42px", height: "42px" }}
              alt=""
            />
            <img
              src="/image/facebook-circle.png"
              className={"my-4"}
              style={{ width: "42px", height: "42px" }}
              alt=""
            />
            <img
              src="/image/twitter-circle.png"
              className={"my-4"}
              style={{ width: "42px", height: "42px" }}
              alt=""
            />
            <img
              src="/image/share-link.png"
              className={"my-4"}
              style={{ width: "42px", height: "42px" }}
              alt=""
            />
          </div>
        </div>
        {/* section web article */}
        <div className={"flex flex-row mt-16"}>
          <div className={"w-1/5"}>
            <div
              className={"bg-white p-4 rounded"}
              style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
            >
              <p className={"text-blackmig text-base font-gilroysemibold"}>
                TABLE OF CONTENT
              </p>
              <div className={"border border-dividermig mt-2"}></div>
              <div className={"mt-1"}>
                <ul class="">
                  <li class={"text-primarygreen text-sm font-gilroysemibold"}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing eli.
                  </li>
                  <li
                    class={
                      "text-blackmig text-sm font-regular font-gilroyregular"
                    }
                  >
                    Sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua
                  </li>
                  <li
                    class={
                      "text-blackmig text-sm font-regular font-gilroyregular"
                    }
                  >
                    Ut enim ad minim veniam, quis nostrud exercitation.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={"w-3/5 ml-12"}>
            <p className={"indent-5 text-base font-gilroyregular"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p className={"indent-5 text-base font-gilroyregular"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p className={"indent-5 text-base font-gilroyregular"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div className={"grid justify-items-center pt-4"}>
              <img
                src="/image/blog.png"
                style={{ width: "515px", height: "289px" }}
                alt=""
              />
              <p
                className={
                  "text-xs text-darkgrey font-gilroyregular font-regular pt-2 mb-4"
                }
              >
                This is a caption for the image above
              </p>
            </div>
            <p className={"indent-5 text-base font-gilroyregular"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p className={"indent-5 text-base font-gilroyregular"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </section>
      <section
        className={
          "section1articlepagephone block md:hidden pt-6 md:mt-6 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
      >
        <div className={"px-2 py-2"}>
          <p
            className={"text-2xl md:text-3xl text-blackmig font-gilroysemibold"}
          >
            This is a Title This is a Title This is a Title
          </p>
          <p className={"text-xs text-blackmig font-gilroyregular mt-3 mb-4"}>
            by <span className={"font-gilroysemibold"}>Mayfa Shadrina </span>
            on <span className={"font-gilroysemibold"}>August 8th, 2022</span>
          </p>
          <img
            src="/image/blog.png"
            className={"w-full h-full rounded-lg"}
            alt=""
          />
        </div>
        <div className={"py-4 flex flex-row justify-between px-2"}>
          <div className={"flex flex-row justify-around"}>
            <p
              className={
                "text-xs text-darkgrey md:text-base font-gilroysemibold self-center"
              }
            >
              Share
            </p>
            <img
              src="/image/message-circle.png"
              className={"ml-2"}
              style={{ width: "36px", height: "36px" }}
              alt=""
            />
            <img
              src="/image/facebook-circle.png"
              className={"ml-2"}
              style={{ width: "36px", height: "36px" }}
              alt=""
            />
            <img
              src="/image/twitter-circle.png"
              className={"ml-2"}
              style={{ width: "36px", height: "36px" }}
              alt=""
            />
            <img
              src="/image/share-link.png"
              className={"ml-2"}
              style={{ width: "42px", height: "42px" }}
              alt=""
            />
          </div>
          <div className={"self-center"}>
            <p className={"text-xs text-darkgrey font-gilroyregular"}>
              9 MINUTE READ
            </p>
          </div>
        </div>
      </section>
      <section className={"section2articlepage block md:hidden px-5 py-6"}>
        <div
          className={"bg-table p-4 w-full rounded-lg"}
          style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
        >
          <p className={"text-blackmig text-base font-gilroysemibold"}>
            TABLE OF CONTENT
          </p>
          <div className={"mt-2 border border-dividermig"}></div>
          <div className={"mt-2"}>
            <ul class="list-disc">
              <li class={"text-blackmig text-sm font-gilroyregular"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing eli.
              </li>
              <li
                class={"text-blackmig text-sm font-regular font-gilroyregular"}
              >
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua
              </li>
              <li
                class={"text-blackmig text-sm font-regular font-gilroyregular"}
              >
                Ut enim ad minim veniam, quis nostrud exercitation.
              </li>
            </ul>
          </div>
        </div>
        <div className={"px-2 mt-6"}>
          <p className={"indent-5 text-sm font-gilroyregular"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className={"indent-5 text-sm font-gilroyregular"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className={"indent-5 text-sm font-gilroyregular"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className={"grid justify-items-center pt-4"}>
            <img
              src="/image/blog.png"
              className={"rounded-lg"}
              style={{ width: "244px", height: "124px" }}
              alt=""
            />
            <p
              className={
                "text-xs text-darkgrey font-gilroyregular font-regular pt-2 mb-4"
              }
            >
              This is a caption for the image above
            </p>
          </div>
          <p className={"indent-5 text-sm font-gilroyregular"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className={"indent-5 text-sm font-gilroyregular"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </section>
      {/* <section
        className={
          "section3clientpagephone m-4 block md:hidden md:relative mt-6 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
      >
        <div className={"bg-white p-2 text-center shadow-lg"}>
          <p className={"text-primarygreen text-xs font-gilroysemibold my-4"}>
            Our Client
          </p>
          <div className={"grid justify-items-center"}>
            <img
              src="/image/landingpage/testimonial-client.png"
              style={{ width: "50px", height: "42px" }}
              alt=""
            />
          </div>
          <p className={"text-blackmig text-sm Gilroy-bold font-bold"}>
            KB Bukopin, Tbk.
          </p>
          <div className={"px-2 flex flex-row justify-between"}>
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
          <div className={"mt-6 grid justify-items-center"}>
            <Linkk href="/hardware">
              <button
                className={
                  "text-base text-center -mt-10 text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 md:px-4 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black bg-white"
                }
              >
                <div className={"flex flex-row justify-between"}>
                  <p className={"px-1"}>See Our Products</p>
                  <img
                    className={"py-1 px-1"}
                    style={{ width: "15px" }}
                    src="/image/landingpage/arrow-forward.png"
                  />
                </div>
              </button>
            </Linkk>
          </div>
          <Linkk href="/contactus">
            <p className={"text-blackmig text-sm font-gilroyregular my-4"}>
              or{" "}
              <span className={"text-primarygreen"}>
                contact our sales team
              </span>
            </p>
          </Linkk>
        </div>
      </section> */}
      <section
        className={
          "section2blog hidden md:block md:pt-[25px] md:px-[112px] md:pb-6 bg-bgjoinmig "
        }
      >
        <div className={"flex flex-row justify-between"}>
          <p className={"text-base md:text-xl gilroy-bold text-primarygreen"}>
            Read Other Articles
          </p>
          <p
            className={
              "text-base pr-10 md:text-base gilroy-bold text-darkgreen"
            }
          >
            See More
          </p>
        </div>
        <div className={"grid md:grid-cols-4 gap-4  mt-[25px]"}>
          <div className={"mx-2 bg-white w-full rounded-lg p-4"}>
            <img
              className={"w-full h-[184px] rounded-lg"}
              src="/image/blog.png"
            />
            <div className={"mt-3"}>
              <p className={"text-xs text-darkgrey"}>
                by <span className={"font-bold"}>Mayfa Shadrina </span>
                on <span className={"font-bold"}>August 8th, 2022</span>
              </p>
              <p className={"font-bold text-blackmig text-base mt-3"}>
                This is a Title This is a Title This is a Title This is a Title
              </p>
              <p className={" text-blackmig font-gilroyregular text-xs mt-1.5"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <span class="text-xs mt-4 font-gilroyregular text-primarygreen bg-greenTrans20 mr-2 px-2 py-1 rounded-[20px]">
                Hardware
              </span>
            </div>
          </div>
          <div className={"mx-2 bg-white w-full rounded-lg p-4"}>
            <img
              className={"w-full h-[184px] rounded-lg"}
              src="/image/blog.png"
            />
            <div className={"mt-3"}>
              <p className={"text-xs text-darkgrey"}>
                by <span className={"font-bold"}>Mayfa Shadrina </span>
                on <span className={"font-bold"}>August 8th, 2022</span>
              </p>
              <p className={"font-bold text-blackmig text-base mt-3"}>
                This is a Title This is a Title This is a Title This is a Title
              </p>
              <p className={" text-blackmig font-gilroyregular text-xs mt-1.5"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <span class="text-xs mt-4 font-gilroyregular text-primarygreen bg-greenTrans20 mr-2 px-2 py-1 rounded-[20px]">
                Hardware
              </span>
            </div>
          </div>
          <div className={"mx-2 bg-white w-full rounded-lg p-4"}>
            <img
              className={"w-full h-[184px] rounded-lg"}
              src="/image/blog.png"
            />
            <div className={"mt-3"}>
              <p className={"text-xs text-darkgrey"}>
                by <span className={"font-bold"}>Mayfa Shadrina </span>
                on <span className={"font-bold"}>August 8th, 2022</span>
              </p>
              <p className={"font-bold text-blackmig text-base mt-3"}>
                This is a Title This is a Title This is a Title This is a Title
              </p>
              <p className={" text-blackmig font-gilroyregular text-xs mt-1.5"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <span class="text-xs mt-4 font-gilroyregular text-primarygreen bg-greenTrans20 mr-2 px-2 py-1 rounded-[20px]">
                Hardware
              </span>
            </div>
          </div>
          <div className={"mx-2 bg-white w-full rounded-lg p-4"}>
            <img
              className={"w-full h-[184px] rounded-lg"}
              src="/image/blog.png"
            />
            <div className={"mt-3"}>
              <p className={"text-xs text-darkgrey"}>
                by <span className={"font-bold"}>Mayfa Shadrina </span>
                on <span className={"font-bold"}>August 8th, 2022</span>
              </p>
              <p className={"font-bold text-blackmig text-base mt-3"}>
                This is a Title This is a Title This is a Title This is a Title
              </p>
              <p className={" text-blackmig font-gilroyregular text-xs mt-1.5"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <span class="text-xs mt-4 font-gilroyregular text-primarygreen bg-greenTrans20 mr-2 px-2 py-1 rounded-[20px]">
                Hardware
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className={"section2blog block md:hidden p-4 bg-bgjoinmig "}>
        <p
          className={
            "text-base md:text-xl font-gilroybold text-primarygreen px-4"
          }
        >
          Read Other Articles
        </p>
        <Slider {...sliderSettingsPhone}>
          <Linkk href="/blog/1">
            <div
              className={"flex flex-row bg-white mt-3 p-4 rounded-lg"}
              style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
            >
              <img
                className={""}
                style={{ width: "103px", height: "131px" }}
                src="/image/blog.png"
              />
              <div className={"pl-4"}>
                <p className={"text-[10px] text-darkgrey font-gilroysemibold"}>
                  August 8th, 2022
                </p>
                <p className={"font-gilroybold text-blackmig text-sm mt-1"}>
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p className={" text-blackmig font-gilroyregular text-xs mt-1"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing .....
                </p>
                <span class="text-xs mt-1 font-gilroyregular text-primarygreen bg-greenTrans20 px-2 py-1 rounded-[20px]">
                  Hardware
                </span>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/1">
            <div
              className={"flex flex-row bg-white mt-3 p-4 rounded-lg"}
              style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
            >
              <img
                className={""}
                style={{ width: "103px", height: "131px" }}
                src="/image/blog.png"
              />
              <div className={"pl-4"}>
                <p className={"text-[10px] text-darkgrey font-gilroysemibold"}>
                  August 8th, 2022
                </p>
                <p className={"font-gilroybold text-blackmig text-sm mt-1"}>
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p className={" text-blackmig font-gilroyregular text-xs mt-1"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing .....
                </p>
                <span class="text-xs mt-1 font-gilroyregular text-primarygreen bg-greenTrans20 px-2 py-1 rounded-[20px]">
                  Hardware
                </span>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/1">
            <div
              className={"flex flex-row bg-white mt-3 p-4 rounded-lg"}
              style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
            >
              <img
                className={""}
                style={{ width: "103px", height: "131px" }}
                src="/image/blog.png"
              />
              <div className={"pl-4"}>
                <p className={"text-[10px] text-darkgrey font-gilroysemibold"}>
                  August 8th, 2022
                </p>
                <p className={"font-gilroybold text-blackmig text-sm mt-1"}>
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p className={" text-blackmig font-gilroyregular text-xs mt-1"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing .....
                </p>
                <span class="text-xs mt-1 font-gilroyregular text-primarygreen bg-greenTrans20 px-2 py-1 rounded-[20px]">
                  Hardware
                </span>
              </div>
            </div>
          </Linkk>
        </Slider>
      </section>
      <section className={"sectioncomments md:relative py-4 px-6 md:p-20"}>
        <p className={"text-blackmig text-base md:text-xl font-gilroysemibold"}>
          Comments (6)
        </p>
        <p className={"text-redmig text-sm font-gilroyregular mt-4"}>
          * <span className={"text-blackmig"}>Comment</span>
        </p>
        <div className={"py-2"}>
          <Form id="formcontact" layout={"vertical"} form={form}>
            <TextArea
              rows={4}
              placeholder="Tell us about your thoughts"
              onChange={(e) => {
                setDataContactUs({
                  ...dataContactUs,
                  company_name: e.target.value,
                });
              }}
            />
            <div className="mt-4">
              <Input
                size="large"
                placeholder="Name"
                onChange={(e) => {
                  setDataContactUs({
                    ...dataContactUs,
                    company_name: e.target.value,
                  });
                }}
                prefix={
                  <img
                    src="/image/person.png"
                    className={"w-[24px] h-[24px]"}
                  />
                }
              />
            </div>
            <div className="mt-4">
              <Input
                size="large"
                className={"border-sm"}
                placeholder="Email"
                onChange={(e) => {
                  setDataContactUs({
                    ...dataContactUs,
                    company_name: e.target.value,
                  });
                }}
                prefix={
                  <img src="/image/email.png" className={"w-[24px] h-[24px]"} />
                }
              />
            </div>
            <div className="mt-4">
              <Form.Item
                name="checkbox"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error("Should accept agreement")),
                  },
                ]}
              >
                <Checkbox name="checkbox">
                  Save my name and email for the next time I comment
                </Checkbox>
              </Form.Item>
            </div>
            <Form.Item>
              <div className={"w-full flex justify-start"}>
                <button
                  type={"submit"}
                  className={
                    "text-sm text-center text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 md:px-4 mt-4 rounded bg-white"
                  }
                >
                  <p className={"px-1 text-base font-gilroysemibold"}>Share</p>
                </button>
              </div>
            </Form.Item>
          </Form>
        </div>
        <div className={"mt-6 border border-dividermig"}></div>
        <div className="mt-8 p-4 md:px-4 md:pt-4 md:pb-[19px] border-2 border-bordermig rounded-lg">
          <p className={"text-sm text-blackmig font-gilroysemibold"}>
            Mayfa Shadrina
          </p>
          <p className={"text-xs text-darkgrey pt-1 font-gilroyregular"}>
            Feb 21, 2022 on 13:59 WIB
          </p>
          <p className={"text-sm text-blackmig pt-4 font-gilroyregular"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className={"w-32 flex flex-row justify-between mt-2"}>
            <a href="#">
              <p className={"text-primarygreen text-xs font-gilroysemibold"}>
                Reply
              </p>
            </a>
            <div className="flex flex-row justify-around items-center">
              <img
                src="/image/Icon-like.png"
                style={{ width: "16px", height: "13px" }}
                alt=""
              />
              <p className="text-xs text-lightgrey font-gilroysemibold ml-2">
                3 Likes
              </p>
            </div>
          </div>
          <div className={"mt-4"}>
            <img
              src="/image/icon-reply.png"
              style={{ width: "27px", height: "23px" }}
              alt=""
            />
          </div>
          <div className={"ml-10 -mt-2"}>
            <p className={"text-sm text-blackmig font-gilroysemibold"}>
              Mayfa Shadrina
            </p>
            <p className={"text-xs text-darkgrey pt-1 font-gilroyregular"}>
              Feb 21, 2022 on 13:59 WIB
            </p>
            <p className={"text-sm text-blackmig pt-4 font-gilroyregular"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div className={"w-32 flex flex-row justify-between mt-2"}>
              <a href="#">
                <p className={"text-primarygreen text-xs font-gilroysemibold"}>
                  Reply
                </p>
              </a>
              <div className="flex flex-row justify-around items-center">
                <img
                  src="/image/Icon-like-fill.png"
                  style={{ width: "16px", height: "13px" }}
                  alt=""
                />
                <p className="text-xs text-lightgrey font-gilroysemibold ml-2">
                  3 Likes
                </p>
              </div>
            </div>
          </div>
          {hideReply ? (
            <button
              className={"mt-8 flex flex-row items-center bg-white"}
              onClick={onChangereply}
            >
              <img
                src="/image/icon-collapsible-close.png"
                style={{ width: "5px", height: "10px" }}
                alt=""
              />
              <div className={"ml-4"}>
                <p className={"text-xs font-gilroysemibold text-primarygreen"}>
                  See other 4 replies
                </p>
              </div>
            </button>
          ) : (
            <button
              className={"mt-8 flex flex-row items-center bg-white"}
              onClick={onChangereply}
            >
              <img
                src="/image/icon-collapsible-open.png"
                style={{ width: "10px", height: "5px" }}
                alt=""
              />
              <div className={"ml-4"}>
                <p className={"text-xs font-gilroysemibold text-primarygreen"}>
                  Hide other 4 replies
                </p>
              </div>
            </button>
          )}
          {hideReply == false && (
            <div>
              <div className={"ml-10 mt-4"}>
                <p className={"text-sm text-blackmig font-gilroysemibold"}>
                  Mayfa Shadrina
                </p>
                <p className={"text-xs text-darkgrey pt-1 font-gilroyregular"}>
                  Feb 21, 2022 on 13:59 WIB
                </p>
                <p className={"text-sm text-blackmig pt-4 font-gilroyregular"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <div className={"w-32 flex flex-row justify-between mt-2"}>
                  <a href="#">
                    <p
                      className={
                        "text-primarygreen text-xs font-gilroysemibold"
                      }
                    >
                      Reply
                    </p>
                  </a>
                  <div className="flex flex-row justify-around items-center">
                    <img
                      src="/image/Icon-like-fill.png"
                      style={{ width: "16px", height: "13px" }}
                      alt=""
                    />
                    <p className="text-xs text-lightgrey font-gilroysemibold ml-2">
                      3 Likes
                    </p>
                  </div>
                </div>
              </div>
              <div className={"ml-10 mt-4"}>
                <p className={"text-sm text-blackmig font-gilroysemibold"}>
                  Mayfa Shadrina
                </p>
                <p className={"text-xs text-darkgrey pt-1 font-gilroyregular"}>
                  Feb 21, 2022 on 13:59 WIB
                </p>
                <p className={"text-sm text-blackmig pt-4 font-gilroyregular"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <div className={"w-32 flex flex-row justify-between mt-2"}>
                  <a href="#">
                    <p
                      className={
                        "text-primarygreen text-xs font-gilroysemibold"
                      }
                    >
                      Reply
                    </p>
                  </a>
                  <div className="flex flex-row justify-around items-center">
                    <img
                      src="/image/Icon-like-fill.png"
                      style={{ width: "16px", height: "13px" }}
                      alt=""
                    />
                    <p className="text-xs text-lightgrey font-gilroysemibold ml-2">
                      3 Likes
                    </p>
                  </div>
                </div>
              </div>
              <div className={"ml-10 mt-4"}>
                <p className={"text-sm text-blackmig font-gilroysemibold"}>
                  Mayfa Shadrina
                </p>
                <p className={"text-xs text-darkgrey pt-1 font-gilroyregular"}>
                  Feb 21, 2022 on 13:59 WIB
                </p>
                <p className={"text-sm text-blackmig pt-4 font-gilroyregular"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <div className={"w-32 flex flex-row justify-between mt-2"}>
                  <a href="#">
                    <p
                      className={
                        "text-primarygreen text-xs font-gilroysemibold"
                      }
                    >
                      Reply
                    </p>
                  </a>
                  <div className="flex flex-row justify-around items-center">
                    <img
                      src="/image/Icon-like-fill.png"
                      style={{ width: "16px", height: "13px" }}
                      alt=""
                    />
                    <p className="text-xs text-lightgrey font-gilroysemibold ml-2">
                      3 Likes
                    </p>
                  </div>
                </div>
              </div>
              <div className={"ml-10 mt-4"}>
                <p className={"text-sm text-blackmig font-gilroysemibold"}>
                  Mayfa Shadrina
                </p>
                <p className={"text-xs text-darkgrey pt-1 font-gilroyregular"}>
                  Feb 21, 2022 on 13:59 WIB
                </p>
                <p className={"text-sm text-blackmig pt-4 font-gilroyregular"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <div className={"w-32 flex flex-row justify-between mt-2"}>
                  <a href="#">
                    <p
                      className={
                        "text-primarygreen text-xs font-gilroysemibold"
                      }
                    >
                      Reply
                    </p>
                  </a>
                  <div className="flex flex-row justify-around items-center">
                    <img
                      src="/image/Icon-like-fill.png"
                      style={{ width: "16px", height: "13px" }}
                      alt=""
                    />
                    <p className="text-xs text-lightgrey font-gilroysemibold ml-2">
                      3 Likes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <LayoutFormContactUs
        title={"Want help on providing your IT needs?"}
        description={`Need help in providing your needs? Whether they related to hardware, software, or even talent hiring? 
Learn more about what service can we offer to you and your company!`}
        button_title={"Learn more"}
      />
    </Layout>
  );
}

export default BlogDetail;
