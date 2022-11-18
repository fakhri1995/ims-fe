import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";
import { Badge, Card, Col, Row, Space } from "antd";
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
  return (
    <Layout>
      {/* <section className={'container mx-auto'}> */}
      <section
        className={
          "section1landingpage md:relative md:-top-6 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
      >
        {/* Browser View */}
        <div
          className={
            "hidden md:flex h-screen container mx-auto -top-10 relative"
          }
        >
          <div className={"flex-col w-1/2 mt-20 px-10"}>
            <img
              className={"w-full h-[336px]"}
              src="/image/landingpage/footer-right.png"
            />
          </div>
          <div
            className={"flex flex-col justify-between w-1/2  h-[336px] mt-20"}
          >
            <div className={"hidden md:block"}>
              <h3
                className={
                  "text-2xl text-black md:text-3xl md:leading-tight lg:leading-normal xl:leading-relaxed lg:text-5xl pb-6 font-semibold"
                }
                style={{ lineHeight: "1.25" }}
              >
                Welcome to MIG Blog!
              </h3>
              {/* <button className={'text-black text-xl border-2 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black'}>Let's Collaborate</button> */}
              <p className={" text-base text-black gilroy-regular"}>
                MIG catalyzes your core business with{" "}
                <span style={{ fontWeight: "bold" }}>
                  IT hardware solutions
                </span>
                ,
                <span style={{ fontWeight: "bold" }}>software development</span>
                , and <span style={{ fontWeight: "bold" }}>tech talents</span>.
                We serve you the best resource with efficient cost, but high
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
                    "text-sm text-center text-white border-2 bg-green-600 border-green-600 px-4 py-2 md:px-4 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black bg-white"
                  }
                >
                  <div className={"flex flex-row justify-between"}>
                    <p className={"px-1 text-base"}>Explore Articles</p>
                    <img
                      className={"m-1"}
                      style={{ width: "20px" }}
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
        </div>
        {/* ---------- */}
        {/* Phone View */}
        <div className={"block md:hidden pt-8"}>
          <div className={"flex-col center"}>
            <div className={"text-center"}>
              <p className={"text-4xl gilroy-bold"}>
                Focus on your best, we take care of the rest
              </p>
            </div>
          </div>
          <div className={"flex-col"}>
            <img
              style={{ width: "1500px", height: "auto" }}
              src="/image/landingpage/image-section1.png"
            />
          </div>
          <div className={"flex-col center"}>
            <div className={"grid justify-items-center text-center"}>
              <Linkk href="/hardware">
                <button
                  className={
                    "flex text-xl text-white border-2 bg-green-600 border-green-600 px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black bg-white"
                  }
                >
                  <p className={"pl-4 pr-8"}>Get Free Consultation</p>
                </button>
              </Linkk>
            </div>
          </div>
          <div className={"flex-col center"}>
            <div className={"mx-auto"}>
              <Link
                activeClass="active"
                to="youronestopmobile"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <div className="grid justify-items-center text-center">
                  <button
                    className={
                      "flex text-xl text-green-600 px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black bg-white"
                    }
                  >
                    <p className={""}>Explore Solutions</p>
                    <img
                      className={"mt-1 ml-1"}
                      style={{ width: "20px" }}
                      src="/image/landingpage/arrow-down-green.png"
                    />
                  </button>
                </div>
              </Link>
            </div>
          </div>
          <div className={"container mx-auto mt-2"}>
            <div className={"border rounded-lg shadow-lg p-4 bg-green15"}>
              <div className={"flex flex-row"}>
                <img
                  className={"pr-1"}
                  src="/image/landingpage/info.png"
                  style={{ width: "30px", height: "30px" }}
                />
                <p className={"text-base gilroy-semi-bold"}>
                  <span style={{ fontWeight: "bold" }}>Trusted </span>
                  in more than
                  <span style={{ fontWeight: "bold" }}> 45+ cities</span> and
                  <span style={{ fontWeight: "bold" }}> 10+ companies </span>
                  in providing their
                  <span style={{ fontWeight: "bold" }}> IT & Business </span>
                  needs!
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* ------------ */}
      </section>
      <section className={"section2blog -mt-28 mb-5 p-2 md:p-12 bg-bgjoinmig "}>
        <p className={"text-base md:text-xl gilroy-bold text-primarygreen"}>
          Most Popular
        </p>
        <div className={"grid md:grid-cols-2 mt-4"}>
          <div className={"flex mx-2 flex-row bg-white mt-2 shadow-lg p-4"}>
            <img
              className={"m-1"}
              style={{ width: "200px", height: "142px" }}
              src="/image/landingpage/Hardware.png"
            />
            <div className={"pl-4"}>
              <p className={"text-xs text-darkgrey"}>
                by <span className={"font-bold"}>Mayfa Shadrina </span>
                on <span className={"font-bold"}>August 8th, 2022</span>
              </p>
              <p className={"font-bold text-blackmig text-base"}>
                This is a Title This is a Title This is a Title This is a Title
              </p>
              <p className={" text-blackmig gilroy-regular text-xs"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <span class="text-xs mt-4 gilroy-regular text-primarygreen bg-greenTrans20 mr-2 px-2.5 py-0.5 rounded-[20px]">
                Hardware
              </span>
            </div>
          </div>
          <div className={"flex mx-2  flex-row bg-white mt-2 shadow-lg p-4"}>
            <img
              className={"m-1"}
              style={{ width: "200px", height: "142px" }}
              src="/image/landingpage/Hardware.png"
            />
            <div className={"pl-4"}>
              <p className={"text-xs text-darkgrey"}>
                by <span className={"font-bold"}>Mayfa Shadrina </span>
                on <span className={"font-bold"}>August 8th, 2022</span>
              </p>
              <p className={"font-bold text-blackmig text-base"}>
                This is a Title This is a Title This is a Title This is a Title
              </p>
              <p className={" text-blackmig gilroy-regular text-xs"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <span class="text-xs mt-4 gilroy-regular text-primarygreen bg-greenTrans20 mr-2 px-2.5 py-0.5 rounded-[20px]">
                Hardware
              </span>
            </div>
          </div>
          <div className={"flex mx-2 flex-row bg-white mt-2 shadow-lg p-4"}>
            <img
              className={"m-1"}
              style={{ width: "200px", height: "142px" }}
              src="/image/landingpage/Hardware.png"
            />
            <div className={"pl-4"}>
              <p className={"text-xs text-darkgrey"}>
                by <span className={"font-bold"}>Mayfa Shadrina </span>
                on <span className={"font-bold"}>August 8th, 2022</span>
              </p>
              <p className={"font-bold text-blackmig text-base"}>
                This is a Title This is a Title This is a Title This is a Title
              </p>
              <p className={" text-blackmig gilroy-regular text-xs"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <span class="text-xs mt-4 gilroy-regular text-primarygreen bg-greenTrans20 mr-2 px-2.5 py-0.5 rounded-[20px]">
                Hardware
              </span>
            </div>
          </div>
          <div className={"flex mx-2  flex-row bg-white mt-2 shadow-lg p-4"}>
            <img
              className={"m-1"}
              style={{ width: "200px", height: "142px" }}
              src="/image/landingpage/Hardware.png"
            />
            <div className={"pl-4"}>
              <p className={"text-xs text-darkgrey"}>
                by <span className={"font-bold"}>Mayfa Shadrina </span>
                on <span className={"font-bold"}>August 8th, 2022</span>
              </p>
              <p className={"font-bold text-blackmig text-base"}>
                This is a Title This is a Title This is a Title This is a Title
              </p>
              <p className={" text-blackmig gilroy-regular text-xs"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <span class="text-xs mt-4 gilroy-regular text-primarygreen bg-greenTrans20 mr-2 px-2.5 py-0.5 rounded-[20px]">
                Hardware
              </span>
            </div>
          </div>
        </div>
      </section>
      <section
        className={
          "youronestop py-4 md:mt-40 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 md:relative md:bottom-32 text-center"
        }
      >
        <div className={"container mx-auto"}>
          <p className={"text-xl md:text-2xl gilroy-bold py-8 md:py-0"}>
            Why you should{" "}
            <span
              style={{
                borderBottom: "solid 3px #188E4D",
                paddingBottom: "2.5px",
              }}
            >
              work with us
            </span>{" "}
            ?
          </p>
        </div>
        <div className="md:flex flex-row items-center md:py-10 justify-around">
          <a
            href="#"
            class="flex md:mt-0 mt-4 items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="p-4"
              style={{ height: "111px" }}
              src="/image/landingpage/on_demand.png"
              alt=""
            />
            <div className="flex flex-col items-start px-2">
              <h5 className="mb-2 text-sm md:text-xl text-black font-bold tracking-tight md:text-primarygreen dark:text-white">
                On Demand Services
              </h5>
              <p className="mb-3 text-left text-sm md:text-base font-normal text-black dark:text-gray-400">
                Transform your business with our custom solutions to optimize
                your cost and productivity
              </p>
            </div>
          </a>
          <a
            href="#"
            class="flex md:mt-0 mt-4 items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="p-4"
              src="/image/landingpage/reliable_partner.png"
              alt=""
              style={{ height: "111px" }}
            />
            <div className="flex flex-col items-start px-2">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-primarygreen dark:text-white">
                Reliable Partner
              </h5>
              <p className="mb-3 text-left text-sm md:text-base text-black font-normal text-gray-700 dark:text-gray-400">
                A partner you can trust, with more than 15 years of
                experiences-we’re here for the long run
              </p>
            </div>
          </a>
        </div>
        <div className="md:flex flex-row items-center md:py-10 justify-around">
          <a
            href="#"
            class="flex  md:mt-0 mt-4 items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="p-4"
              src="/image/landingpage/competitive_rates.png"
              style={{ height: "111px" }}
              alt=""
            />
            <div className="flex flex-col items-start px-2">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-primarygreen dark:text-white">
                Competitive Rate
              </h5>
              <p className="mb-3 text-left text-sm md:text-base font-normal text-black dark:text-gray-400">
                We offer the best services with the best price tailored to your
                needs
              </p>
            </div>
          </a>
          <a
            href="#"
            class="flex md:mt-0 mt-4 items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="p-4"
              src="/image/landingpage/cost_efficient.png"
              style={{ height: "111px" }}
              alt=""
            />
            <div className="flex flex-col items-start px-2">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-primarygreen dark:text-white">
                Cost Efficient
              </h5>
              <p className="mb-3 text-left text-sm md:text-base text-black font-normal text-gray-700 dark:text-gray-400">
                We help you grow and offer solutions to help optimized your
                bussiness
              </p>
            </div>
          </a>
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
      <section
        className={
          "youronestop py-4 px-4 mt-0 md:mt-24 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 md:relative md:bottom-32 text-center"
        }
      >
        <div className={"container mx-auto"}>
          <p
            className={
              "text-sm md:text-m text-darkgrey gilroy-bold py-8 md:py-0"
            }
          >
            Join hundreds of our clients and partners in fulfilling your needs
          </p>
        </div>
        <div className={"flex flex-row py-5 px-5"}>
          <img
            className={"py-1 px-4"}
            style={{ width: "80px", height: "40px" }}
            src="/image/landingpage/client1.png"
          />
          <img
            className={"py-1 px-4"}
            style={{ width: "80px", height: "40px" }}
            src="/image/landingpage/client2.png"
          />
          <img
            className={"py-1 px-4"}
            style={{ width: "80px", height: "40px" }}
            src="/image/landingpage/client3.png"
          />
          <img
            className={"py-1 px-4"}
            style={{ width: "80px", height: "40px" }}
            src="/image/landingpage/client4.png"
          />
          <img
            className={"py-1 px-4"}
            style={{ width: "80px", height: "40px" }}
            src="/image/landingpage/client1.png"
          />
          <img
            className={"py-1 px-4 hidden md:block"}
            style={{ width: "80px", height: "40px" }}
            src="/image/landingpage/client2.png"
          />
          <img
            className={"py-1 px-4 hidden md:block"}
            style={{ width: "80px", height: "40px" }}
            src="/image/landingpage/client3.png"
          />
          <img
            className={"py-1 px-4 hidden md:block"}
            style={{ width: "80px", height: "40px" }}
            src="/image/landingpage/client4.png"
          />
          <img
            className={"py-1 px-4 hidden md:block"}
            style={{ width: "80px", height: "40px" }}
            src="/image/landingpage/client1.png"
          />
          <img
            className={"py-1 px-4 hidden md:block"}
            style={{ width: "80px", height: "40px" }}
            src="/image/landingpage/client2.png"
          />
          <img
            className={"py-1 px-4 hidden md:block"}
            style={{ width: "80px", height: "40px" }}
            src="/image/landingpage/client3.png"
          />
          <img
            className={"py-1 px-4 hidden md:block"}
            style={{ width: "80px", height: "40px" }}
            src="/image/landingpage/client4.png"
          />
        </div>
        <div className="md:hidden">
          <a href="#">
            <div className="flex mt-5 justify-center">
              <p className="text-base mr-2 text-primarygreen font-semibold gilroy-semibold">
                Read More
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
      {/*section join mig*/}
      <section
        className={
          "section2landingpagebrowser bg-bgjoinmig md:bottom-16 md:relative py-8 hidden md:block px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
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
                  Interested in joining MIG?
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
              Fulfill your IT needs easily!
            </p>
            <p className={"py-5 text-base"}>
              Need help in providing your needs? Whether they related to
              hardware, software, or even talent hiring? Contact us and hear
              what service can we offer to you and your company!
            </p>
            <Linkk href="/hardware">
              <button
                className={
                  "text-sm text-center -mt-10 text-white border-2 bg-green-600 border-green-600 px-4 py-2 md:px-4 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black bg-white"
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
