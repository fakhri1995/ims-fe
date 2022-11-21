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
          "section1landingpage md:relative md:-top-6 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
      >
        {/* Browser View */}
        <div className={"hidden md:block text-center mt-6"}>
          <h3
            className={
              "text-2xl text-black md:text-3xl md:leading-tight lg:leading-normal xl:leading-relaxed lg:text-5xl pb-6 font-semibold"
            }
            style={{ lineHeight: "1.25" }}
          >
            Inspiring stories, real MIG customers
          </h3>
        </div>
        <div
          className={
            "hidden md:flex h-screen container mx-auto -top-10 relative"
          }
        >
          <div className={"flex-col w-1/2 mt-20 px-10"}>
            <img
              className={"w-full h-[336px]"}
              src="/image/landingpage/Talents-2.png"
            />
          </div>
          <div className={"w-1/2 flex flex-row"}>
            <div
              className={"flex flex-col justify-between w-5/6 h-[336px] mt-20"}
            >
              <div className={"hidden md:block"}>
                {/* <button className={'text-black text-xl border-2 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black'}>Let's Collaborate</button> */}
                <img
                  className={"py-1 px-1"}
                  style={{ width: "82px", height: "69px" }}
                  src="/image/landingpage/testimonial-client.png"
                />
                <p className={" text-base text-black gilroy-regular"}>
                  "MIG catalyzes your core business with{" "}
                  <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
                    IT hardware solutions
                  </span>
                  ,
                  <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
                    software development
                  </span>
                  , and{" "}
                  <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
                    tech talents
                  </span>
                  . We serve you the best resource with efficient cost, but high
                  maintenance.""
                </p>
                <div className={"mt-4"}>
                  <p className={"text-blackmig text-sm font-semibold mt-2"}>
                    Mayfa Shadrina Siddi
                  </p>
                  <p className={"text-blackmig text-sm Gilroy-regular mt-2"}>
                    CTO of Bukopin
                  </p>
                </div>
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
                      "text-sm text-center text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 md:px-4 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black bg-white"
                    }
                  >
                    <div className={"flex flex-row justify-between"}>
                      <p className={"px-1 text-base"}>Read Story</p>
                      <img
                        className={"py-1 px-1"}
                        style={{ width: "15px" }}
                        src="/image/landingpage/arrow-forward.png"
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
            <div className="w-1/6 mt-20 ml-4">
              <p className={"text-sm text-darkgrey md:text-base font-semibold"}>
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
      <section
        className={"section2blog mt-4 md:-mt-28 p-2 md:p-12 bg-bgjoinmig "}
      >
        <p className={"text-base md:text-xl gilroy-bold text-primarygreen"}>
          Most Popular
        </p>
        <div className={"grid md:grid-cols-2 mt-4"}>
          <Linkk href="/blog/1">
            <div className={"flex mx-2 flex-row bg-white mt-2 shadow-lg p-4"}>
              <img
                className={"m-1 md:w-[200px] md:h-[142px] w-[103px] h-[120px]"}
                // style={{ width: "200px", height: "142px" }}
                src="/image/landingpage/Hardware.png"
              />
              <div className={"pl-4"}>
                <img
                  className={"py-1 px-1"}
                  style={{ width: "40px", height: "34px" }}
                  src="/image/landingpage/testimonial-client.png"
                />
                <p
                  className={
                    "font-bold text-blackmig gilroy-bold text-sm md:text-base"
                  }
                >
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p className={" text-blackmig gilroy-regular text-xs"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/2">
            <div className={"flex mx-2 flex-row bg-white mt-2 shadow-lg p-4"}>
              <img
                className={"m-1 md:w-[200px] md:h-[142px] w-[103px] h-[120px]"}
                // style={{ width: "200px", height: "142px" }}
                src="/image/landingpage/Hardware.png"
              />
              <div className={"pl-4"}>
                <img
                  className={"py-1 px-1"}
                  style={{ width: "40px", height: "34px" }}
                  src="/image/landingpage/testimonial-client.png"
                />
                <p
                  className={
                    "font-bold text-blackmig gilroy-bold text-sm md:text-base"
                  }
                >
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p className={" text-blackmig gilroy-regular text-xs"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/3">
            <div className={"flex mx-2 flex-row bg-white mt-2 shadow-lg p-4"}>
              <img
                className={"m-1 md:w-[200px] md:h-[142px] w-[103px] h-[120px]"}
                // style={{ width: "200px", height: "142px" }}
                src="/image/landingpage/Hardware.png"
              />
              <div className={"pl-4"}>
                <img
                  className={"py-1 px-1"}
                  style={{ width: "40px", height: "34px" }}
                  src="/image/landingpage/testimonial-client.png"
                />
                <p
                  className={
                    "font-bold text-blackmig gilroy-bold text-sm md:text-base"
                  }
                >
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p className={" text-blackmig gilroy-regular text-xs"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/4">
            <div className={"flex mx-2 flex-row bg-white mt-2 shadow-lg p-4"}>
              <img
                className={"m-1 md:w-[200px] md:h-[142px] w-[103px] h-[120px]"}
                // style={{ width: "200px", height: "142px" }}
                src="/image/landingpage/Hardware.png"
              />
              <div className={"pl-4"}>
                <img
                  className={"py-1 px-1"}
                  style={{ width: "40px", height: "34px" }}
                  src="/image/landingpage/testimonial-client.png"
                />
                <p
                  className={
                    "font-bold text-blackmig gilroy-bold text-sm md:text-base"
                  }
                >
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p className={" text-blackmig gilroy-regular text-xs"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
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
              defaultValue="recent"
              style={{ width: 150 }}
              onChange={handleChange}
              options={[
                {
                  value: "recent",
                  label: "Most Recent",
                },
                {
                  value: "popular",
                  label: "Most Popular",
                },
              ]}
            />
          </div>
        </div>
        <div className={"grid md:grid-cols-4 justify-items-center  mt-4"}>
          <Linkk href="/blog/1">
            <div className={"mx-2 bg-white w-[260px] mt-2 p-4"}>
              <img className={"w-full"} src="/image/blog.png" />
              <div className={"pl-1 mt-2"}>
                <p className={"text-xs text-darkgrey"}>
                  by <span className={"font-bold"}>Mayfa Shadrina </span>
                  on <span className={"font-bold"}>August 8th, 2022</span>
                </p>
                <p className={"font-bold text-blackmig text-base py-2"}>
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p className={" text-blackmig gilroy-regular text-xs pb-2"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <span class="text-xs mt-4 gilroy-regular text-primarygreen bg-greenTrans20 mr-2 px-2.5 py-0.5 rounded-[20px]">
                  Hardware
                </span>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/2">
            <div className={"mx-2 bg-white w-[260px] mt-2 p-4"}>
              <img className={"w-full"} src="/image/blog.png" />
              <div className={"pl-1 mt-2"}>
                <p className={"text-xs text-darkgrey"}>
                  by <span className={"font-bold"}>Mayfa Shadrina </span>
                  on <span className={"font-bold"}>August 8th, 2022</span>
                </p>
                <p className={"font-bold text-blackmig text-base py-2"}>
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p className={" text-blackmig gilroy-regular text-xs pb-2"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <span class="text-xs mt-4 gilroy-regular text-primarygreen bg-greenTrans20 mr-2 px-2.5 py-0.5 rounded-[20px]">
                  Hardware
                </span>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/3">
            <div className={"mx-2 bg-white w-[260px] mt-2 p-4"}>
              <img className={"w-full"} src="/image/blog.png" />
              <div className={"pl-1 mt-2"}>
                <p className={"text-xs text-darkgrey"}>
                  by <span className={"font-bold"}>Mayfa Shadrina </span>
                  on <span className={"font-bold"}>August 8th, 2022</span>
                </p>
                <p className={"font-bold text-blackmig text-base py-2"}>
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p className={" text-blackmig gilroy-regular text-xs pb-2"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <span class="text-xs mt-4 gilroy-regular text-primarygreen bg-greenTrans20 mr-2 px-2.5 py-0.5 rounded-[20px]">
                  Hardware
                </span>
              </div>
            </div>
          </Linkk>
          <Linkk href="/blog/4">
            <div className={"mx-2 bg-white w-[260px] mt-2 p-4"}>
              <img className={"w-full"} src="/image/blog.png" />
              <div className={"pl-1 mt-2"}>
                <p className={"text-xs text-darkgrey"}>
                  by <span className={"font-bold"}>Mayfa Shadrina </span>
                  on <span className={"font-bold"}>August 8th, 2022</span>
                </p>
                <p className={"font-bold text-blackmig text-base py-2"}>
                  This is a Title This is a Title This is a Title This is a
                  Title
                </p>
                <p className={" text-blackmig gilroy-regular text-xs pb-2"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <span class="text-xs mt-4 gilroy-regular text-primarygreen bg-greenTrans20 mr-2 px-2.5 py-0.5 rounded-[20px]">
                  Hardware
                </span>
              </div>
            </div>
          </Linkk>
        </div>
      </section>
      {/* <section className={'section3landingpage md:relative md:bottom-32 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'} style={{backgroundColor:'white'}}>
                    <div className={'h-auto flex justify-between md:px-30 pt-8 md:pt-16 pb-0: md:pb-4 container mx-auto'} >
                        <div className={'block md:flex py-0 md:py-8'} style={{width:'100%',margin:'0 auto 0'}}>

                            <div className={'flex-col mx-10 w-auto md:w-120 block md:hidden'} style={{margin:'auto'}}>
                                <p className={'text-3xl pb-6 text-black gilroy-bold'} style={{ letterSpacing:'1.5px' }}> Bringing you the <span className={''} style={{borderBottom:'solid 3px green',paddingBottom:'2.5px'}}>advantages</span></p>
                            </div>

                            <div className={'flex-col md:mr-10 pb-8 md:pb-0 md:w-1/2'}>
                                <img style={{  }} className={'w-full'} src='/image/landingpage/image-section3.png' />
                            </div>
                            <div className={'flex-col mx-10 w-auto md:w-1/2 '} style={{margin:'auto'}}>
                                <p className={'text-3xl md:text-4xl  pb-6 text-black gilroy-bold hidden md:block'} style={{ letterSpacing:'1.5px' }}> Bringing you the <span className={''} style={{borderBottom:'solid 3px green',paddingBottom:'2.5px'}}>advantages</span></p>
                                <p className={'pb-8 text-lg md:text-xl text-justify font-normal text-black gilroy-medium'} style={{letterSpacing:'1.5px'}}>Improving efficiencies by supporting you with <span className={''} style={{paddingBottom:'2.5px', borderBottom:'solid 3px green'}}> staff augmentation</span>, <span className={''} style={{paddingBottom:'2.5px', borderBottom:'solid 3px green'}}>software</span> and <span className={''} style={{paddingBottom:'2.5px', borderBottom:'solid 3px green'}}>hardware managed services.</span></p>
                                <Linkk href="/advantages"><button className={'text-black border-2 text-lg md:text-xl border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black'}>
                                See How It Work
                                </button></Linkk>
                            </div>
                        </div>
                    </div>
                </section> */}
      {/* testimonial */}
      {/* client */}
      {/*section join mig*/}
      <section
        className={
          "section2landingpagebrowser bg-bgjoinmig mt-10 md:bottom-16 md:relative py-8 hidden md:block px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
      >
        <div className={"container mx-auto"}>
          <div className={"flex flex-row justify-center"}>
            <div className={"w-2/5"}>
              <img
                src="/image/landingpage/career-mig.png"
                className={"w-full h-full"}
                alt=""
              />
            </div>
            <div className={"w-2/5 justify-self-start"}>
              <div className="flex flex-col items-start px-10">
                <h4 className="mb-2 text-2xl font-bold tracking-tight text-black dark:text-white">
                  Hear what our customers said about us!
                </h4>
                <div className="flex flex-row py-5">
                  <div className="w-11">
                    <img
                      src="/image/landingpage/career-icon1.png"
                      className="object-cover h-42 w-42"
                    />
                  </div>
                  <div>
                    <p className="text-left px-5 text-base text-black">
                      We love to empower our team members to solve problems that
                      matter
                    </p>
                  </div>
                </div>
                <div className="flex flex-row py-5">
                  <div className="w-11">
                    <img
                      src="/image/landingpage/career-icon2.png"
                      className="object-cover h-42 w-42"
                    />
                  </div>
                  <div>
                    <p className="text-left px-5 text-base text-black">
                      We offer diverse industry exposures and hands-on
                      experience
                    </p>
                  </div>
                </div>
                <div className="flex flex-row py-5">
                  <div className="w-11">
                    <img
                      src="/image/landingpage/career-icon3.png"
                      className="object-cover h-42 w-42"
                    />
                  </div>
                  <div>
                    <p className="text-left px-5 text-base text-black">
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

      <section
        className={
          "youronestop mt-4 md:relative hidden md:block md:flex bg-bgfooter pt-8"
        }
      >
        <div className={"justify-start self-end "}>
          <img
            style={{ width: "332px", height: "142px" }}
            src="/image/landingpage/footer-left.png"
          />
        </div>
        <div className={"container mx-auto"}>
          <div class="bg-white border-3 border-solid shadow-2xl rounded-[8px] text-center mx-20  -mt-24 py-4 px-8">
            <p className={"text-2xl font-bold"}>
              Want help on providing your IT needs?
            </p>
            <p className={"py-5 text-base"}>
              Need help in providing your needs? Whether they related to
              hardware, software, or even talent hiring? Learn more about what
              service can we offer to you and your company!
            </p>
            <Linkk href="/contactus">
              <button
                className={
                  "text-sm text-center -mt-10 text-white border-2 bg-green-600 border-green-600 px-4 py-2 md:px-4 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black bg-white"
                }
              >
                <div className={"flex flex-row justify-between"}>
                  <p className={"px-1"}>Learn More</p>
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
        <div className={"justify-end self-end "}>
          <img
            style={{ width: "332px", height: "142px" }}
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
            <Linkk href="/hardware">
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
