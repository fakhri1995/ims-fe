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
          "section1landingpage h-[336px] md:relative md:top-6 px-4 md:px-10"
        }
      >
        {/* Browser View */}
        {/* Browser View */}
        <div className={"hidden md:flex container mx-auto"}>
          <div className={"flex-col w-6/12"}>
            <img
              className={"w-[614px] h-[336px]"}
              src="/image/landingpage/footer-right.png"
            />
          </div>
          <div className={"flex flex-col justify-between w-5/12  h-[336px]"}>
            <div className={"hidden md:block"}>
              <h3
                className={
                  "text-2xl text-blackmig md:text-3xl pb-6 font-semibold"
                }
              >
                Welcome to MIG Blog!
              </h3>
              {/* <button className={'text-black text-xl border-2 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black'}>Let's Collaborate</button> */}
              <p className={" text-base text-blackmig gilroy-regular"}>
                MIG catalyzes your core business with{" "}
                <span className={"font-semibold gilroy-semibold"}>
                  IT hardware solutions
                </span>
                ,
                <span className={"font-semibold gilroy-semibold"}>
                  software development
                </span>
                , and{" "}
                <span className={"font-semibold gilroy-semibold"}>
                  tech talents
                </span>
                . We serve you the best resource with efficient cost, but high
                maintenance.
              </p>
            </div>
            <div className={"w-full self-end flex"}>
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
            {/* <div className={'block md:hidden text-center'}>
                                    <p className={'text-3xl md:text-5xl lg:text-6xl pb-6 gilroy-medium font-bold'} style={{ letterSpacing:'1.5px' }}>Your One Stop,
                                        Cost Efficient IT Solutions
                                    </p>
                                </div> */}
          </div>
          <div className="w-1/12 grid justify-items-center self-center item-center">
            <p className={"text-sm text-darkgrey md:text-base font-semibold"}>
              Share
            </p>
            <img
              src="/image/message-circle.png"
              className={"my-2"}
              style={{ width: "42px", height: "42px" }}
              alt=""
            />
            <img
              src="/image/facebook-circle.png"
              className={"my-2"}
              style={{ width: "42px", height: "42px" }}
              alt=""
            />
            <img
              src="/image/twitter-circle.png"
              className={"my-2"}
              style={{ width: "42px", height: "42px" }}
              alt=""
            />
            <img
              src="/image/share-link.png"
              className={"my-2"}
              style={{ width: "42px", height: "42px" }}
              alt=""
            />
          </div>
        </div>
        {/* ---------- */}
        {/* Phone View */}
        <div className={"block md:hidden py-8 mb-4"}>
          <div className={"flex-col center"}>
            <div className={"text-center"}>
              <p className={"text-4xl gilroy-bold"}>Welcome to MIG Blog!</p>
            </div>
          </div>
          <div className={"flex-col"}>
            <img
              style={{ width: "1500px", height: "auto" }}
              src="/image/landingpage/image-section1.png"
            />
          </div>
          <div className={"grid grid justify-items-center py-4"}>
            <img
              style={{ width: "82px", height: "69px" }}
              src="/image/landingpage/testimonial-client.png"
            />
          </div>
          <p className={" text-base text-center text-black gilroy-regular"}>
            MIG catalyzes your core business with{" "}
            <span style={{ fontWeight: "bold" }}>IT hardware solutions</span>,
            <span style={{ fontWeight: "bold" }}>software development</span>,
            and <span style={{ fontWeight: "bold" }}>tech talents</span>. We
            serve you the best resource with efficient cost, but high
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
                    "text-sm text-center text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 md:px-4 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black bg-white"
                  }
                >
                  <div className={"flex flex-row justify-between"}>
                    <p className={"px-1 text-base"}>Read Story</p>
                    <img
                      className={"ml-2"}
                      style={{ width: "20px" }}
                      src="/image/landingpage/arrow-circle-down.png"
                    />
                  </div>
                </button>
              </Link>
            </div>
            <div className={"text-center my-4"}>
              <p
                className={"text-base text-darkgrey md:text-base font-semibold"}
              >
                Share
              </p>
            </div>
            <div className={"flex flex-row justify-around"}>
              <img
                src="/image/message-circle.png"
                className={"ml-4"}
                style={{ width: "36px", height: "36px" }}
                alt=""
              />
              <img
                src="/image/facebook-circle.png"
                className={"ml-4"}
                style={{ width: "36px", height: "36px" }}
                alt=""
              />
              <img
                src="/image/twitter-circle.png"
                className={"ml-4"}
                style={{ width: "36px", height: "36px" }}
                alt=""
              />
              <img
                src="/image/share-link.png"
                className={"ml-4"}
                style={{ width: "42px", height: "42px" }}
                alt=""
              />
            </div>
          </div>
        </div>
        {/* ------------ */}
      </section>
      <section className={"section2blog mt-10 p-2 md:p-12 bg-bgjoinmig "}>
        <p className={"text-base md:text-xl gilroy-bold text-primarygreen"}>
          Most Popular
        </p>
        <div className={"grid md:grid-cols-2 mt-4 md:justify-items-center"}>
          <Linkk href="/blog/1">
            <div
              className={
                "flex w-[598px] rounded-lg h-[181px] mx-2 flex-row bg-white mt-6 p-4"
              }
            >
              <img
                className={
                  "m-1 rounded-lg md:w-[200px] md:h-[142px] w-[103px] h-[120px]"
                }
                // style={{ width: "200px", height: "142px" }}
                src="/image/blog.png"
              />
              <div className={"pl-4"}>
                <p className={"text-xs text-darkgrey"}>
                  by <span className={"font-semibold"}>Mayfa Shadrina </span>
                  on <span className={"font-semibold"}>August 8th, 2022</span>
                </p>
                <p
                  className={
                    "font-bold text-blackmig gilroy-bold text-sm md:text-base"
                  }
                >
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p className={" text-blackmig gilroy-regular text-xs mt-2"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className={"mt-3"}>
                  <span class="text-xs h-[26px] gilroy-regular text-primarygreen bg-greenTrans20 mr-2 px-2.5 py-2 rounded-[20px]">
                    Hardware
                  </span>
                </div>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/1">
            <div
              className={
                "flex w-[598px] rounded-lg h-[181px] mx-2 flex-row bg-white mt-6 p-4"
              }
            >
              <img
                className={
                  "m-1 rounded-lg md:w-[200px] md:h-[142px] w-[103px] h-[120px]"
                }
                // style={{ width: "200px", height: "142px" }}
                src="/image/blog.png"
              />
              <div className={"pl-4"}>
                <p className={"text-xs text-darkgrey"}>
                  by <span className={"font-semibold"}>Mayfa Shadrina </span>
                  on <span className={"font-semibold"}>August 8th, 2022</span>
                </p>
                <p
                  className={
                    "font-bold text-blackmig gilroy-bold text-sm md:text-base"
                  }
                >
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p className={" text-blackmig gilroy-regular text-xs mt-2"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className={"mt-3"}>
                  <span class="text-xs h-[26px] gilroy-regular text-primarygreen bg-greenTrans20 mr-2 px-2.5 py-2 rounded-[20px]">
                    Hardware
                  </span>
                </div>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/1">
            <div
              className={
                "flex w-[598px] rounded-lg h-[181px] mx-2 flex-row bg-white mt-6 p-4"
              }
            >
              <img
                className={
                  "m-1 rounded-lg md:w-[200px] md:h-[142px] w-[103px] h-[120px]"
                }
                // style={{ width: "200px", height: "142px" }}
                src="/image/blog.png"
              />
              <div className={"pl-4"}>
                <p className={"text-xs text-darkgrey"}>
                  by <span className={"font-semibold"}>Mayfa Shadrina </span>
                  on <span className={"font-semibold"}>August 8th, 2022</span>
                </p>
                <p
                  className={
                    "font-bold text-blackmig gilroy-bold text-sm md:text-base"
                  }
                >
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p className={" text-blackmig gilroy-regular text-xs mt-2"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className={"mt-3"}>
                  <span class="text-xs h-[26px] gilroy-regular text-primarygreen bg-greenTrans20 mr-2 px-2.5 py-2 rounded-[20px]">
                    Hardware
                  </span>
                </div>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/1">
            <div
              className={
                "flex w-[598px] rounded-lg h-[181px] mx-2 flex-row bg-white mt-6 p-4"
              }
            >
              <img
                className={
                  "m-1 rounded-lg md:w-[200px] md:h-[142px] w-[103px] h-[120px]"
                }
                // style={{ width: "200px", height: "142px" }}
                src="/image/blog.png"
              />
              <div className={"pl-4"}>
                <p className={"text-xs text-darkgrey"}>
                  by <span className={"font-semibold"}>Mayfa Shadrina </span>
                  on <span className={"font-semibold"}>August 8th, 2022</span>
                </p>
                <p
                  className={
                    "font-bold text-blackmig gilroy-bold text-sm md:text-base"
                  }
                >
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p className={" text-blackmig gilroy-regular text-xs mt-2"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className={"mt-3"}>
                  <span class="text-xs h-[26px] gilroy-regular text-primarygreen bg-greenTrans20 mr-2 px-2.5 py-2 rounded-[20px]">
                    Hardware
                  </span>
                </div>
              </div>
            </div>
          </Linkk>
        </div>
      </section>
      <section className={"allarticles p-2 md:p-12"}>
        <div className={"flex flex-row justify-between"}>
          <p className={"text-base md:text-xl gilroy-bold text-primarygreen"}>
            All Articles
          </p>
          <div className={"flex flex-row pr-4"}>
            <p
              className={
                "text-xs md:text-sm gilroy-regular text-blackmig mr-4 self-center"
              }
            >
              Sort by
            </p>
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
        </div>
        <div className={"grid md:grid-cols-4 justify-items-center  mt-4"}>
          <Linkk href="/blog/1">
            <div className={"mx-2 bg-white w-[260px] mt-2 p-4"}>
              <img className={"w-full rounded-lg"} src="/image/blog.png" />
              <div className={"pl-1 mt-2"}>
                <p className={"text-xs text-darkgrey"}>
                  by <span className={"font-semibold"}>Mayfa Shadrina </span>
                  on <span className={"font-semibold"}>August 8th, 2022</span>
                </p>
                <p className={"font-bold text-blackmig text-base py-2"}>
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p className={" text-blackmig gilroy-regular text-xs pb-2"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className={"mt-2"}>
                  <span class="text-xs gilroy-regular text-primarygreen bg-greenTrans20 mr-2 px-2.5 py-2 rounded-[20px]">
                    Hardware
                  </span>
                </div>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/2">
            <div className={"mx-2 bg-white w-[260px] mt-2 p-4"}>
              <img className={"w-full rounded-lg"} src="/image/blog.png" />
              <div className={"pl-1 mt-2"}>
                <p className={"text-xs text-darkgrey"}>
                  by <span className={"font-semibold"}>Mayfa Shadrina </span>
                  on <span className={"font-semibold"}>August 8th, 2022</span>
                </p>
                <p className={"font-bold text-blackmig text-base py-2"}>
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p className={" text-blackmig gilroy-regular text-xs pb-2"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className={"mt-2"}>
                  <span class="text-xs gilroy-regular text-primarygreen bg-greenTrans20 mr-2 px-2.5 py-2 rounded-[20px]">
                    Hardware
                  </span>
                </div>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/3">
            <div className={"mx-2 bg-white w-[260px] mt-2 p-4"}>
              <img className={"w-full rounded-lg"} src="/image/blog.png" />
              <div className={"pl-1 mt-2"}>
                <p className={"text-xs text-darkgrey"}>
                  by <span className={"font-semibold"}>Mayfa Shadrina </span>
                  on <span className={"font-semibold"}>August 8th, 2022</span>
                </p>
                <p className={"font-semibold text-blackmig text-base py-2"}>
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p className={" text-blackmig gilroy-regular text-xs pb-2"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className={"mt-2"}>
                  <span class="text-xs gilroy-regular text-primarygreen bg-greenTrans20 mr-2 px-2.5 py-2 rounded-[20px]">
                    Hardware
                  </span>
                </div>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/4">
            <div className={"mx-2 bg-white w-[260px] mt-2 p-4"}>
              <img className={"w-full rounded-lg"} src="/image/blog.png" />
              <div className={"pl-1 mt-2"}>
                <p className={"text-xs text-darkgrey"}>
                  by <span className={"font-semibold"}>Mayfa Shadrina </span>
                  on <span className={"font-semibold"}>August 8th, 2022</span>
                </p>
                <p className={"font-semibold text-blackmig text-base py-2"}>
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p className={" text-blackmig gilroy-regular text-xs pb-2"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className={"mt-2"}>
                  <span class="text-xs gilroy-regular text-primarygreen bg-greenTrans20 mr-2 px-2.5 py-2 rounded-[20px]">
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
          "section2landingpagebrowser mt-10 bg-bgjoinmig md:relative py-8 hidden md:block px-4 md:px-10 "
        }
      >
        <div className={"container mx-auto"}>
          <div className={"flex flex-row justify-center"}>
            <div className={"w-2/5flex justify-end"}>
              <img
                src="/image/landingpage/career-mig.png"
                className={"w-[398px] h-[253px]"}
                alt=""
              />
            </div>
            <div className={"w-3/5 justify-self-start"}>
              <div className="flex flex-col items-start px-10">
                <h4 className="mb-2 text-2xl font-semibold text-blackmig">
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
                    <p className="text-left px-5 text-base text-blackmig gilroy-regular">
                      We support personal growth through constant experiment and
                      learning
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <a href="/contactus">
                    <div className="flex border-2 border-primarygreen w-[264px] rounded px-4 py-2 justify-between">
                      <p className="text-base mr-2 text-primarygreen font-semibold gilroy-semibold">
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
          className={"text-xl md:text-2xl text-center gilroy-bold py-8 md:py-0"}
        >
          Interested in joining MIG?
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
            <div className="flex mt-5 justify-end mr-5">
              <p className="text-base mr-2 text-primarygreen font-semibold gilroy-semibold">
                Apply for jobs
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
      <div className={"h-30 bg-bgjoinmig"}></div>
      <section
        className={
          "youronestop mt-10 hidden md:block md:flex md:flex-row md:justify-between bg-bgfooter pt-8"
        }
      >
        <div className={"justify-start self-end bg-red"}>
          <img
            style={{ width: "332px", height: "142px" }}
            src="/image/landingpage/footer-left.png"
          />
        </div>
        <div className={"container w-1/2 mx-auto"}>
          <div class="bg-white border-3 mx-auto  w-[645px] border-solid shadow-2xl rounded-[8px] text-center -mt-20 py-4 px-8">
            <p className={"text-2xl font-semibold text-blackmig"}>
              Want help on providing your IT needs?
            </p>
            <p className={"py-5 text-base gilroy-regular text-blackmig"}>
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
                  <p className={"text-base gilroy-semibold font-semibold mr-2"}>
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
          "contactusphone mt-20 md:relative block md:hidden md:flex bg-bgfooter pt-8"
        }
      >
        <div className={"container mx-auto"}>
          <div class="bg-white border-3 border-solid shadow-2xl rounded-[8px] text-center mx-5  -mt-30 py-4 px-8">
            <p className={"text-xl font-semibold"}>
              Want help on providing your IT needs?
            </p>
            <p className={"py-5 text-sm Gilroy-regular"}>
              Need help in providing your needs? Whether they related to
              hardware, software, or even talent hiring? Contact us and hear
              what service can we offer to you and your company!
            </p>
            <Linkk href="/hardware">
              <button
                className={
                  "text-base text-center -mt-10 text-white border-2 bg-green-600 border-green-600 px-4 py-2 md:px-4 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black bg-white"
                }
              >
                <div className={"flex flex-row justify-between"}>
                  <p className={"px-1"}>Learn more</p>
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

export default Blog;
