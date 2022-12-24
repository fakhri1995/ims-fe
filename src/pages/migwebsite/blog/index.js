import {
  CaretDownOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";
import { Badge, Card, Col, Row, Select, Space } from "antd";
import Head from "next/head";
import Linkk from "next/link";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import Flickity from "react-flickity-component";
import { Link, animateScroll as scroll } from "react-scroll";
import Slider from "react-slick";

import Layout from "../../../components/migwebsite/layout";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function Blog({}) {
  const handleChange = () => {};
  return (
    <Layout>
      {/* <section className={'container mx-auto'}> */}
      <Head>
        <title>Blog</title>
      </Head>
      <section
        className={
          "section1landingpage md:relative md:py-16 px-4 md:px-[112px]"
        }
      >
        {/* Browser View */}
        {/* Browser View */}
        <div className={"hidden md:flex container mx-auto "}>
          <div className={"flex-col w-1/2"}>
            <img
              className={"w-[614px] h-[336px]"}
              src="/image/landingpage/hero-blog.png"
            />
          </div>
          <div className={"flex w-1/2 md:ml-[50px] xl:ml-[60px]"}>
            <div className={"w-3/4 flex flex-col justify-between"}>
              <div>
                <p className={"text-[32px] font-gilroysemibold text-blackmig"}>
                  Welcome to MIG Blog!
                </p>
                <p
                  className={" text-base text-blackmig font-gilroyregular mt-1"}
                >
                  MIG catalyzes your core business with{" "}
                  <span className={"font-gilroysemibold"}>
                    IT hardware solutions
                  </span>
                  ,
                  <span className={"font-gilroysemibold"}>
                    software development
                  </span>
                  , and{" "}
                  <span className={"font-gilroysemibold"}>tech talents</span>.
                  We serve you the best resource with efficient cost, but high
                  maintenance.
                </p>
              </div>
              <div className={""}>
                <Link
                  activeClass="active"
                  to="section2blog"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  <button
                    className={
                      "text-sm text-center w-[223px] text-white border-2 rounded bg-primarygreen border-primarygreen px-4 py-2 md:px-4 mt-4"
                    }
                  >
                    <div className={"flex flex-row justify-between px-4 "}>
                      <p className={"text-base"}>Explore Articles</p>
                      <img
                        className={"self-center"}
                        style={{ width: "20px", height: "20px" }}
                        src="/image/landingpage/arrow-circle-down.png"
                      />
                    </div>
                  </button>
                </Link>
              </div>
            </div>
            <div className={"w-1/4 grid justify-end self-center "}>
              <p
                className={
                  "text-sm text-darkgrey md:text-base font-gilroysemibold"
                }
              >
                Share
              </p>
              <div className={"mt-[22px]"}>
                <img
                  src="/image/message-svg.png"
                  className={"mt-[22px] w-[42.88px] h-[42.88px]"}
                  alt=""
                />
                <img
                  src="/image/facebook-svg.png"
                  className={"mt-[22px] w-[43.75px] h-[43.75px]"}
                  alt=""
                />
                <img
                  src="/image/twitter-svg.png"
                  className={"mt-[22px] w-[43.75px] h-[43.75px]"}
                  alt=""
                />
                <img
                  src="/image/share-svg.png"
                  className={"mt-[22px] w-[43.75px] h-[43.75px]"}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        {/* ---------- */}
        {/* Phone View */}
        <div className={"block md:hidden py-8"}>
          <div className={"flex-col center"}>
            <div className={"text-center"}>
              <p className={"text-2xl font-gilroysemibold"}>
                Welcome to MIG Blog!
              </p>
            </div>
          </div>
          <div className={"flex-col mt-16"}>
            <img
              style={{
                width: "328px",
                height: "172px",
                marginRight: "auto",
                marginLeft: "auto",
              }}
              src="/image/landingpage/image-section1.png"
            />
          </div>
          <p
            className={
              " text-base text-center text-blackmig font-gilroyregular mt-16"
            }
          >
            MIG catalyzes your core business with{" "}
            <span className={"font-gilroysemibold"}>IT hardware solutions</span>
            ,<span className={"font-gilroysemibold"}>software development</span>
            , and <span className={"font-gilroysemibold"}>tech talents</span>.
            We serve you the best resource with efficient cost, but high
            maintenance.
          </p>
          <div className={"flex-col center"}>
            <div className={"grid justify-items-center text-center"}>
              <Link
                activeClass="active"
                to="section2blog"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <button
                  className={
                    "text-sm text-center w-[223px] mt-7 text-white border-2 bg-primarygreen border-primarygreen py-3 pl-6 pr-[19px] rounded"
                  }
                >
                  <div className={"flex flex-row justify-between"}>
                    <p className={"text-xl font-gilroysemibold"}>
                      Explore Articles
                    </p>
                    <img
                      className={"self-center"}
                      style={{ width: "20px", height: "20px" }}
                      src="/image/landingpage/arrow-circle-down.png"
                    />
                  </div>
                </button>
              </Link>
            </div>
            <div className={"text-center mt-7"}>
              <p
                className={
                  "text-base text-darkgrey md:text-base font-gilroysemibold"
                }
              >
                Share
              </p>
            </div>
            <div className={"flex flex-row justify-between mt-4 mx-auto"}>
              <img
                src="/image/message-circle.png"
                style={{ width: "42px", height: "42px" }}
                alt=""
              />
              <img
                src="/image/facebook-circle.png"
                className={""}
                style={{ width: "42px", height: "42px" }}
                alt=""
              />
              <img
                src="/image/twitter-circle.png"
                className={""}
                style={{ width: "42px", height: "42px" }}
                alt=""
              />
              <img
                src="/image/share-link.png"
                className={""}
                style={{ width: "42px", height: "42px" }}
                alt=""
              />
            </div>
          </div>
        </div>
        {/* ------------ */}
      </section>
      <section
        className={"section2blog py-6 md:py-12 px-4 md:px-[112px] bg-bgjoinmig"}
      >
        <p
          className={
            "text-base md:text-xl font-gilroybold md:font-gilroysemibold text-primarygreen"
          }
        >
          Most Popular
        </p>
        <div className={"hidden md:block grid md:grid-cols-2 gap-4 mt-4"}>
          <Linkk href="/blog/1">
            <div
              className={
                "flex w-full rounded-lg md:h-[181px] mx-1 flex-row bg-white mt-[21px] p-4"
              }
            >
              <img
                className={
                  "rounded-lg md:w-[200px] md:h-[142px] w-[103px] h-[131px]"
                }
                // style={{ width: "200px", height: "142px" }}
                src="/image/blog.png"
              />
              <div className={"pl-4"}>
                <p className={"text-[10px] md:text-sm text-darkgrey"}>
                  by{" "}
                  <span className={"font-gilroysemibold"}>Mayfa Shadrina </span>
                  on{" "}
                  <span className={"font-gilroysemibold"}>
                    August 8th, 2022
                  </span>
                </p>
                <p
                  className={
                    "font-bold text-blackmig bold text-sm md:text-base mt-1.5"
                  }
                >
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p
                  className={" text-blackmig font-gilroyregular text-xs mt-1.5"}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className={"mt-1.5"}>
                  <span class="text-xs h-[26px] font-gilroyregular text-primarygreen bg-greenTrans20 mr-2 px-2 py-1 rounded-[20px]">
                    Hardware
                  </span>
                </div>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/1">
            <div
              className={
                "flex w-full rounded-lg md:h-[181px] mx-1 mt-[21px] flex-row bg-white mt-6 p-4"
              }
            >
              <img
                className={
                  "rounded-lg md:w-[200px] md:h-[142px] w-[103px] h-[131px]"
                }
                // style={{ width: "200px", height: "142px" }}
                src="/image/blog.png"
              />
              <div className={"pl-4"}>
                <p className={"text-[10px] md:text-sm text-darkgrey"}>
                  by{" "}
                  <span className={"font-gilroysemibold"}>Mayfa Shadrina </span>
                  on{" "}
                  <span className={"font-gilroysemibold"}>
                    August 8th, 2022
                  </span>
                </p>
                <p
                  className={
                    "font-bold text-blackmig bold text-sm md:text-base mt-1.5"
                  }
                >
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p
                  className={" text-blackmig font-gilroyregular text-xs mt-1.5"}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className={"mt-1.5"}>
                  <span class="text-xs h-[26px] font-gilroyregular text-primarygreen bg-greenTrans20 mr-2 px-2 py-1 rounded-[20px]">
                    Hardware
                  </span>
                </div>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/1">
            <div
              className={
                "flex w-full rounded-lg md:h-[181px] mx-1 flex-row bg-white mt-[21px] p-4"
              }
            >
              <img
                className={
                  "rounded-lg md:w-[200px] md:h-[142px] w-[103px] h-[131px]"
                }
                // style={{ width: "200px", height: "142px" }}
                src="/image/blog.png"
              />
              <div className={"pl-4"}>
                <p className={"text-[10px] md:text-sm text-darkgrey"}>
                  by{" "}
                  <span className={"font-gilroysemibold"}>Mayfa Shadrina </span>
                  on{" "}
                  <span className={"font-gilroysemibold"}>
                    August 8th, 2022
                  </span>
                </p>
                <p
                  className={
                    "font-bold text-blackmig bold text-sm md:text-base mt-1.5"
                  }
                >
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p
                  className={" text-blackmig font-gilroyregular text-xs mt-1.5"}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className={"mt-1.5"}>
                  <span class="text-xs h-[26px] font-gilroyregular text-primarygreen bg-greenTrans20 mr-2 px-2 py-1 rounded-[20px]">
                    Hardware
                  </span>
                </div>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/1">
            <div
              className={
                "flex w-full rounded-lg md:h-[181px] mx-1 mt-[21px] flex-row bg-white mt-6 p-4"
              }
            >
              <img
                className={
                  "rounded-lg md:w-[200px] md:h-[142px] w-[103px] h-[131px]"
                }
                // style={{ width: "200px", height: "142px" }}
                src="/image/blog.png"
              />
              <div className={"pl-4"}>
                <p className={"text-[10px] md:text-sm text-darkgrey"}>
                  by{" "}
                  <span className={"font-gilroysemibold"}>Mayfa Shadrina </span>
                  on{" "}
                  <span className={"font-gilroysemibold"}>
                    August 8th, 2022
                  </span>
                </p>
                <p
                  className={
                    "font-bold text-blackmig bold text-sm md:text-base mt-1.5"
                  }
                >
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p
                  className={" text-blackmig font-gilroyregular text-xs mt-1.5"}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className={"mt-1.5"}>
                  <span class="text-xs h-[26px] font-gilroyregular text-primarygreen bg-greenTrans20 mr-2 px-2 py-1 rounded-[20px]">
                    Hardware
                  </span>
                </div>
              </div>
            </div>
          </Linkk>
        </div>
        <div className={"md:hidden "}>
          <Linkk href="/blog/1">
            <div
              className={"flex w-full rounded-lg flex-row bg-white  p-4 mt-3"}
            >
              <img
                className={"rounded-lg w-[103px] h-[131px]"}
                // style={{ width: "200px", height: "142px" }}
                src="/image/blog.png"
              />
              <div className={"pl-4"}>
                <p className={"text-[10px] md:text-sm text-darkgrey"}>
                  by{" "}
                  <span className={"font-gilroysemibold"}>Mayfa Shadrina </span>
                  on{" "}
                  <span className={"font-gilroysemibold"}>
                    August 8th, 2022
                  </span>
                </p>
                <p
                  className={
                    "font-gilroybold text-blackmig bold text-sm md:text-base mt-1"
                  }
                >
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p className={" text-blackmig font-gilroyregular text-xs mt-1"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing .....
                </p>
                <div className={"mt-1.5"}>
                  <span class="text-xs h-[26px] font-gilroyregular text-primarygreen bg-greenTrans20 mr-2 px-2 py-1 rounded-[20px]">
                    Hardware
                  </span>
                </div>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/1">
            <div
              className={"flex w-full rounded-lg flex-row bg-white  p-4 mt-3"}
            >
              <img
                className={"rounded-lg w-[103px] h-[131px]"}
                // style={{ width: "200px", height: "142px" }}
                src="/image/blog.png"
              />
              <div className={"pl-4"}>
                <p className={"text-[10px] md:text-sm text-darkgrey"}>
                  by{" "}
                  <span className={"font-gilroysemibold"}>Mayfa Shadrina </span>
                  on{" "}
                  <span className={"font-gilroysemibold"}>
                    August 8th, 2022
                  </span>
                </p>
                <p
                  className={
                    "font-gilroybold text-blackmig bold text-sm md:text-base mt-1"
                  }
                >
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p className={" text-blackmig font-gilroyregular text-xs mt-1"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing .....
                </p>
                <div className={"mt-1.5"}>
                  <span class="text-xs h-[26px] font-gilroyregular text-primarygreen bg-greenTrans20 mr-2 px-2 py-1 rounded-[20px]">
                    Hardware
                  </span>
                </div>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/1">
            <div
              className={"flex w-full rounded-lg flex-row bg-white  p-4 mt-3"}
            >
              <img
                className={"rounded-lg w-[103px] h-[131px]"}
                // style={{ width: "200px", height: "142px" }}
                src="/image/blog.png"
              />
              <div className={"pl-4"}>
                <p className={"text-[10px] md:text-sm text-darkgrey"}>
                  by{" "}
                  <span className={"font-gilroysemibold"}>Mayfa Shadrina </span>
                  on{" "}
                  <span className={"font-gilroysemibold"}>
                    August 8th, 2022
                  </span>
                </p>
                <p
                  className={
                    "font-gilroybold text-blackmig bold text-sm md:text-base mt-1"
                  }
                >
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p className={" text-blackmig font-gilroyregular text-xs mt-1"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing .....
                </p>
                <div className={"mt-1.5"}>
                  <span class="text-xs h-[26px] font-gilroyregular text-primarygreen bg-greenTrans20 mr-2 px-2 py-1 rounded-[20px]">
                    Hardware
                  </span>
                </div>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/1">
            <div
              className={"flex w-full rounded-lg flex-row bg-white  p-4 mt-3"}
            >
              <img
                className={"rounded-lg w-[103px] h-[131px]"}
                // style={{ width: "200px", height: "142px" }}
                src="/image/blog.png"
              />
              <div className={"pl-4"}>
                <p className={"text-[10px] md:text-sm text-darkgrey"}>
                  by{" "}
                  <span className={"font-gilroysemibold"}>Mayfa Shadrina </span>
                  on{" "}
                  <span className={"font-gilroysemibold"}>
                    August 8th, 2022
                  </span>
                </p>
                <p
                  className={
                    "font-gilroybold text-blackmig bold text-sm md:text-base mt-1"
                  }
                >
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p className={" text-blackmig font-gilroyregular text-xs mt-1"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing .....
                </p>
                <div className={"mt-1.5"}>
                  <span class="text-xs h-[26px] font-gilroyregular text-primarygreen bg-greenTrans20 mr-2 px-2 py-1 rounded-[20px]">
                    Hardware
                  </span>
                </div>
              </div>
            </div>
          </Linkk>
        </div>
      </section>
      <section
        className={"allarticles py-4 md:py-[69px] px-[17px] md:px-[112px]"}
      >
        <div className={"flex flex-row justify-between mb-[5px]"}>
          <p
            className={"text-base md:text-xl font-gilroybold text-primarygreen"}
          >
            All Articles
          </p>
          <div className={"flex flex-row pr-4"}>
            <p
              className={
                "text-xs md:text-sm font-gilroyregular text-blackmig mr-4 self-center"
              }
            >
              Sort by
            </p>
            <Select
              className="ant-select-suffix"
              suffixIcon={
                <img
                  src="/image/landingpage/caret-down-outlined.png"
                  className="w-[10px] h-[5px] md:w-[20px] md:h-[10px]"
                  alt=""
                />
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
        </div>
        <div className={"hidden grid md:grid-cols-4 gap-4"}>
          <Linkk href="/blog/1">
            <div className={"bg-white w-full mt-4 p-4"}>
              <img
                className={"w-[260px] h-[184px] rounded-lg"}
                src="/image/blog.png"
              />
              <div className={"mt-3"}>
                <p className={"text-xs text-darkgrey"}>
                  by{" "}
                  <span className={"font-gilroysemibold"}>Mayfa Shadrina </span>
                  on{" "}
                  <span className={"font-gilroysemibold"}>
                    August 8th, 2022
                  </span>
                </p>
                <p className={"font-bold text-blackmig text-base mt-3"}>
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p
                  className={" text-blackmig font-gilroyregular text-xs mt-1.5"}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className={"mt-1.5"}>
                  <span class="text-xs font-gilroyregular text-primarygreen bg-greenTrans20 mr-2 px-2 py-1 rounded-[20px]">
                    Hardware
                  </span>
                </div>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/1">
            <div className={"bg-white w-full mt-4 p-4"}>
              <img
                className={"w-[260px] h-[184px] rounded-lg"}
                src="/image/blog.png"
              />
              <div className={"mt-3"}>
                <p className={"text-xs text-darkgrey"}>
                  by{" "}
                  <span className={"font-gilroysemibold"}>Mayfa Shadrina </span>
                  on{" "}
                  <span className={"font-gilroysemibold"}>
                    August 8th, 2022
                  </span>
                </p>
                <p className={"font-bold text-blackmig text-base mt-3"}>
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p
                  className={" text-blackmig font-gilroyregular text-xs mt-1.5"}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className={"mt-1.5"}>
                  <span class="text-xs font-gilroyregular text-primarygreen bg-greenTrans20 mr-2 px-2 py-1 rounded-[20px]">
                    Hardware
                  </span>
                </div>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/1">
            <div className={"bg-white w-full mt-4 p-4"}>
              <img
                className={"w-[260px] h-[184px] rounded-lg"}
                src="/image/blog.png"
              />
              <div className={"mt-3"}>
                <p className={"text-xs text-darkgrey"}>
                  by{" "}
                  <span className={"font-gilroysemibold"}>Mayfa Shadrina </span>
                  on{" "}
                  <span className={"font-gilroysemibold"}>
                    August 8th, 2022
                  </span>
                </p>
                <p className={"font-bold text-blackmig text-base mt-3"}>
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p
                  className={" text-blackmig font-gilroyregular text-xs mt-1.5"}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className={"mt-1.5"}>
                  <span class="text-xs font-gilroyregular text-primarygreen bg-greenTrans20 mr-2 px-2 py-1 rounded-[20px]">
                    Hardware
                  </span>
                </div>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/1">
            <div className={"bg-white w-full mt-4 p-4"}>
              <img
                className={"w-[260px] h-[184px] rounded-lg"}
                src="/image/blog.png"
              />
              <div className={"mt-3"}>
                <p className={"text-xs text-darkgrey"}>
                  by{" "}
                  <span className={"font-gilroysemibold"}>Mayfa Shadrina </span>
                  on{" "}
                  <span className={"font-gilroysemibold"}>
                    August 8th, 2022
                  </span>
                </p>
                <p className={"font-bold text-blackmig text-base mt-3"}>
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p
                  className={" text-blackmig font-gilroyregular text-xs mt-1.5"}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className={"mt-1.5"}>
                  <span class="text-xs font-gilroyregular text-primarygreen bg-greenTrans20 mr-2 px-2 py-1 rounded-[20px]">
                    Hardware
                  </span>
                </div>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/1">
            <div className={"bg-white w-full mt-4 p-4"}>
              <img
                className={"w-[260px] h-[184px] rounded-lg"}
                src="/image/blog.png"
              />
              <div className={"mt-3"}>
                <p className={"text-xs text-darkgrey"}>
                  by{" "}
                  <span className={"font-gilroysemibold"}>Mayfa Shadrina </span>
                  on{" "}
                  <span className={"font-gilroysemibold"}>
                    August 8th, 2022
                  </span>
                </p>
                <p className={"font-bold text-blackmig text-base mt-3"}>
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p
                  className={" text-blackmig font-gilroyregular text-xs mt-1.5"}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className={"mt-1.5"}>
                  <span class="text-xs font-gilroyregular text-primarygreen bg-greenTrans20 mr-2 px-2 py-1 rounded-[20px]">
                    Hardware
                  </span>
                </div>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/1">
            <div className={"bg-white w-full mt-4 p-4"}>
              <img
                className={"w-[260px] h-[184px] rounded-lg"}
                src="/image/blog.png"
              />
              <div className={"mt-3"}>
                <p className={"text-xs text-darkgrey"}>
                  by{" "}
                  <span className={"font-gilroysemibold"}>Mayfa Shadrina </span>
                  on{" "}
                  <span className={"font-gilroysemibold"}>
                    August 8th, 2022
                  </span>
                </p>
                <p className={"font-bold text-blackmig text-base mt-3"}>
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p
                  className={" text-blackmig font-gilroyregular text-xs mt-1.5"}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className={"mt-1.5"}>
                  <span class="text-xs font-gilroyregular text-primarygreen bg-greenTrans20 mr-2 px-2 py-1 rounded-[20px]">
                    Hardware
                  </span>
                </div>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/1">
            <div className={"bg-white w-full mt-4 p-4"}>
              <img
                className={"w-[260px] h-[184px] rounded-lg"}
                src="/image/blog.png"
              />
              <div className={"mt-3"}>
                <p className={"text-xs text-darkgrey"}>
                  by{" "}
                  <span className={"font-gilroysemibold"}>Mayfa Shadrina </span>
                  on{" "}
                  <span className={"font-gilroysemibold"}>
                    August 8th, 2022
                  </span>
                </p>
                <p className={"font-bold text-blackmig text-base mt-3"}>
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p
                  className={" text-blackmig font-gilroyregular text-xs mt-1.5"}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className={"mt-1.5"}>
                  <span class="text-xs font-gilroyregular text-primarygreen bg-greenTrans20 mr-2 px-2 py-1 rounded-[20px]">
                    Hardware
                  </span>
                </div>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/1">
            <div className={"bg-white w-full mt-4 p-4"}>
              <img
                className={"w-[260px] h-[184px] rounded-lg"}
                src="/image/blog.png"
              />
              <div className={"mt-3"}>
                <p className={"text-xs text-darkgrey"}>
                  by{" "}
                  <span className={"font-gilroysemibold"}>Mayfa Shadrina </span>
                  on{" "}
                  <span className={"font-gilroysemibold"}>
                    August 8th, 2022
                  </span>
                </p>
                <p className={"font-bold text-blackmig text-base mt-3"}>
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p
                  className={" text-blackmig font-gilroyregular text-xs mt-1.5"}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className={"mt-1.5"}>
                  <span class="text-xs font-gilroyregular text-primarygreen bg-greenTrans20 mr-2 px-2 py-1 rounded-[20px]">
                    Hardware
                  </span>
                </div>
              </div>
            </div>
          </Linkk>
        </div>
        <div className={"md:hidden"}>
          <Linkk href="/blog/1">
            <div
              className={"bg-white w-full rounded-lg mt-3 p-4"}
              style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
            >
              <img
                className={"w-full h-[185px] rounded-lg flex justify-center"}
                src="/image/blog.png"
              />
              <div className={"mt-2"}>
                <p className={"text-[10px] text-darkgrey font-gilroyregular"}>
                  by{" "}
                  <span className={"font-gilroysemibold"}>Mayfa Shadrina </span>
                  on{" "}
                  <span className={"font-gilroysemibold"}>
                    August 8th, 2022
                  </span>
                </p>
                <p className={"font-gilroybold text-blackmig text-sm mt-2"}>
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p
                  className={" text-blackmig font-gilroyregular text-xs mt-1.5"}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className={"mt-1.5"}>
                  <span class="text-xs font-gilroyregular text-primarygreen bg-greenTrans20 mr-2 px-2 py-1 rounded-[20px]">
                    Hardware
                  </span>
                </div>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/1">
            <div
              className={"bg-white w-full rounded-lg mt-3 p-4"}
              style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
            >
              <img
                className={"w-full h-[185px] rounded-lg flex justify-center"}
                src="/image/blog.png"
              />
              <div className={"mt-2"}>
                <p className={"text-[10px] text-darkgrey font-gilroyregular"}>
                  by{" "}
                  <span className={"font-gilroysemibold"}>Mayfa Shadrina </span>
                  on{" "}
                  <span className={"font-gilroysemibold"}>
                    August 8th, 2022
                  </span>
                </p>
                <p className={"font-gilroybold text-blackmig text-sm mt-2"}>
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p
                  className={" text-blackmig font-gilroyregular text-xs mt-1.5"}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className={"mt-1.5"}>
                  <span class="text-xs font-gilroyregular text-primarygreen bg-greenTrans20 mr-2 px-2 py-1 rounded-[20px]">
                    Hardware
                  </span>
                </div>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/1">
            <div
              className={"bg-white w-full mt-3 p-4 rounded-lg"}
              style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
            >
              <img
                className={"w-full h-[185px] rounded-lg flex justify-center"}
                src="/image/blog.png"
              />
              <div className={"mt-2"}>
                <p className={"text-[10px] text-darkgrey font-gilroyregular"}>
                  by{" "}
                  <span className={"font-gilroysemibold"}>Mayfa Shadrina </span>
                  on{" "}
                  <span className={"font-gilroysemibold"}>
                    August 8th, 2022
                  </span>
                </p>
                <p className={"font-gilroybold text-blackmig text-sm mt-2"}>
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p
                  className={" text-blackmig font-gilroyregular text-xs mt-1.5"}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className={"mt-1.5"}>
                  <span class="text-xs font-gilroyregular text-primarygreen bg-greenTrans20 mr-2 px-2 py-1 rounded-[20px]">
                    Hardware
                  </span>
                </div>
              </div>
            </div>
          </Linkk>
        </div>
      </section>
      {/* testimonial */}
      {/* client */}
      {/*section join mig*/}
      <section
        className={
          "section2landingpagebrowser mt-10 bg-bgjoinmig pt-8 md:pt-[53px] pb-[53px] md:pb-[134px] hidden md:block px-4 md:px-10 "
        }
      >
        <div className={"container mx-auto"}>
          <div className={"flex flex-row justify-center"}>
            <div className={"w-2/5 flex justify-end"}>
              <img
                src="/image/landingpage/career-mig.png"
                className={"w-[398px] h-[253px]"}
                alt=""
              />
            </div>
            <div className={"w-3/5 justify-self-start"}>
              <div className="flex flex-col items-start px-10">
                <h4 className="mb-2 text-2xl font-gilroysemibold text-blackmig">
                  Hear what our customers said about us!
                </h4>
                <div className="flex flex-row items-center mt-5">
                  <div className="w-11">
                    <img
                      src="/image/landingpage/career-icon1.png"
                      className="w-[42px] h-[42px]"
                    />
                  </div>
                  <div>
                    <p className="text-left px-5 text-base text-blackmig font-gilroyregular">
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
                    <p className="text-left px-5 text-base text-blackmig font-gilroyregular">
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
                    <p className="text-left px-5 text-base text-blackmig font-gilroyregular">
                      We support personal growth through constant experiment and
                      learning
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <a href="/contactus">
                    <div className="flex border-2 border-primarygreen w-[264px] rounded px-4 py-2 justify-between">
                      <p className="text-base mr-2 text-primarygreen font-gilroysemibold">
                        Read Our Customer Stories
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
        </div>
      </section>

      <section className={"section2landingpagephone block md:hidden px-4"}>
        <p
          className={
            "text-xl text-blackmig text-center font-gilroysemibold py-8 md:py-0 px-4 w-[328px]"
          }
        >
          Hear what{" "}
          <span
            style={{
              borderBottom: "solid 3px #188E4D",
              paddingBottom: "2.5px",
            }}
          >
            our customers
          </span>{" "}
          said about us!
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
            <div className="flex mt-5 rounded mx-auto w-[264px] border-2 border-primarygreen pl-4 pr-[12.18px] py-2">
              <p className="text-base mr-2 text-primarygreen font-gilroysemibold">
                Read Our Customer Series
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
          "youronestop hidden md:flex md:flex-row md:justify-between bg-bgfooter pt-8"
        }
      >
        <div className={"justify-start self-end bg-red"}>
          <img
            style={{ width: "332px", height: "142px" }}
            src="/image/landingpage/footer-left.png"
          />
        </div>
        <div className={"container w-1/2 mx-auto"}>
          <div class="bg-white border-3 mx-auto  w-[645px] border-solid shadow-2xl rounded-[8px] text-center -mt-[144px] py-4 px-8">
            <p className={"text-2xl font-gilroysemibold text-blackmig"}>
              Want help on providing your IT needs?
            </p>
            <p className={"py-5 text-base font-gilroyregular text-blackmig"}>
              Need help in providing your needs? Whether they related to
              hardware, software, or even talent hiring? Contact us and hear
              what service can we offer to you and your company!
            </p>
            <Linkk href="/contactus">
              <button
                className={
                  "text-sm w-[145px] -mt-10 text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 md:px-4 mt-4"
                }
              >
                <div className={"flex flex-row justify-between"}>
                  <p
                    className={
                      "text-base font-gilroysemibold font-gilroysemibold mr-2"
                    }
                  >
                    Learn more
                  </p>
                  <img
                    className={"self-center"}
                    style={{ height: "15px", width: "8px" }}
                    src="/image/landingpage/arrow-forward.png"
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
          "contactusphone mt-8 md:relative block md:hidden md:flex bg-bgfooter pt-8"
        }
      >
        <div className={"container mx-auto"}>
          <div class="bg-white border-3 border-solid shadow-2xl rounded-[8px] text-center mx-5  -mt-30 py-4 px-8">
            <p className={"text-xl font-gilroysemibold"}>
              Fulfill your IT needs easily!
            </p>
            <p className={"py-5 text-sm font-gilroyregular"}>
              Need help in providing your needs? Whether they related to
              hardware, software, or even talent hiring? Contact us and hear
              what service can we offer to you and your company!
            </p>
            <Linkk href="/hardware">
              <button
                className={
                  "text-base text-center rounded text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 md:px-4"
                }
              >
                <div className={"flex flex-row justify-between"}>
                  <p
                    className={"px-1 text-base text-white font-gilroysemibold "}
                  >
                    Contact Us
                  </p>
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
        <div className={"flex justify-between self-end mt-[7.81px]"}>
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

export default Blog;
