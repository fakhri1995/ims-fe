import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";
import { Card, Col, Row, Space } from "antd";
import Linkk from "next/link";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import Flickity from "react-flickity-component";
import { Link, animateScroll as scroll } from "react-scroll";
import Slider from "react-slick";

import Layout from "../../../components/migwebsite/layout";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function LandingPage({}) {
  const flickityOptions = {
    initialIndex: 0,
    // wrapAround: 'true',
    cellAlign: "left",
    contain: true,
    pageDots: false,
    prevNextButtons: false,
  };
  // const [nav1, setNav1] = useState(null)
  // const [nav2, setNav2] = useState(null)
  // let slider1 = []
  // let slider2 = []
  // useEffect(() => {
  //     setNav1(slider1)
  //     setNav2(slider2)
  // }, [slider1, slider2])

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    arrows: false,
    dots: true,
    swipeToSlide: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          dots: true,
        },
      },
    ],
  };
  const sliderSettings2 = {
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
          <div className={"flex-col w-1/2 my-auto"}>
            <div className={"hidden md:block"}>
              <p
                className={
                  "text-3xl md:text-4xl md:leading-tight lg:leading-normal xl:leading-relaxed lg:text-5xl pb-6 gilroy-bold"
                }
                style={{ lineHeight: "1.25" }}
              >
                Solve your business technology challenges with our IT expertise
                today
              </p>
              {/* <button className={'text-black text-xl border-2 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black'}>Let's Collaborate</button> */}
              <p className={" text-xl gilroy-regular"}>
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
            <div class="flex flex-row justify-between">
              <Link
                activeClass="active"
                to="youronestop"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <button
                  className={
                    "flex text-xl text-green-600 border-2 border-green-600 px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black bg-white"
                  }
                >
                  <p className={"pl-4 pr-8"}>Explore Solutions</p>
                  <img
                    className={"pt-1 pr-4"}
                    style={{ width: "40px" }}
                    src="/image/landingpage/arrow-down-green.png"
                  />
                </button>
              </Link>
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
            <div className={"container py-5 pr-8"}>
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
            {/* <div className={'block md:hidden text-center'}>
                                    <p className={'text-3xl md:text-5xl lg:text-6xl pb-6 gilroy-medium font-bold'} style={{ letterSpacing:'1.5px' }}>Your One Stop,
                                        Cost Efficient IT Solutions
                                    </p>
                                </div> */}
          </div>
          <div className={"flex-col w-1/2 my-auto"}>
            <img
              className={"w-full"}
              src="/image/landingpage/image-section1.png"
            />
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
        </div>
        {/* ------------ */}
      </section>
      <section
        className={
          "youronestop px-4 mt-10 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 md:relative md:bottom-32 text-center"
        }
      >
        <div className={"container mx-auto"}>
          <p className={"text-3xl md:text-4xl gilroy-bold py-8 md:py-0"}>
            What{" "}
            <span
              style={{
                borderBottom: "solid 3px #188E4D",
                paddingBottom: "2.5px",
              }}
            >
              IT resources/solutions
            </span>{" "}
            do you need?
          </p>
        </div>
        <div className="md:flex md:flex-row items-center py-10 justify-around">
          <div class="py-20">
            <div class="flex flex-col items-center">
              <div class="bg-lightblue shadow-2xl rounded-xl w-60 h-70 pb-8 px-4 relative pt-24">
                <img
                  src="/image/landingpage/hero-hardware.png"
                  alt=""
                  className="absolute -top-20 left-0 ease-in-out duration-500 group-hover:rotate-6 group-hover:scale-125"
                />
                <div>
                  <p class="text-center text-3xl text-accentblue gilroy-bold font-bold pb-4">
                    Hardware
                  </p>
                  <p class="text-center text-base font-semibold gilroy-semi-bold pb-4">
                    Lighten up your heavy capital in IT infrastructure
                  </p>
                  <p class="text-center text-sm gilroy-regular pb-4">
                    Transform yours into managed service model, guaranteeing you
                    with predictable monthly cost and excelent service level.
                  </p>

                  <div className={"text-center pb-4"}>
                    <Linkk href="/hardware">
                      <button
                        className={
                          "text-sm text-center text-white border-2 bg-green-600 border-green-600 px-4 py-2 md:px-4 md:py-3 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black bg-white"
                        }
                      >
                        <div className={"flex flex-row justify-between"}>
                          <p className={"px-1"}>Get Yours</p>
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
              </div>
            </div>
          </div>
          <div class="py-20">
            <div class="flex flex-col items-center">
              <div class="bg-lightblue shadow-2xl rounded-xl w-60 h-70 pb-8 px-4 relative pt-24">
                <img
                  src="/image/landingpage/hero-software.png"
                  alt=""
                  class="absolute -top-20 left-0"
                />
                <div>
                  <p class="text-center text-3xl text-darkgreen gilroy-bold font-bold pb-4">
                    Software
                  </p>
                  <p class="text-center text-base font-semibold gilroy-semi-bold pb-4">
                    Delivering custom-made software
                  </p>
                  <p class="text-center text-sm gilroy-regular pb-4">
                    Simplify and digitalize your business process. Customize
                    your system with us.
                  </p>

                  <div className={"text-center pb-4"}>
                    <Linkk href="/software">
                      <button
                        className={
                          "text-sm text-center text-white border-2 bg-green-600 border-green-600 px-4 py-2 md:px-4 md:py-3 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black bg-white"
                        }
                      >
                        <div className={"flex flex-row justify-between"}>
                          <p className={"px-1"}>Build Now</p>
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
              </div>
            </div>
          </div>
          <div class="py-20">
            <div class="flex flex-col items-center">
              <div class="bg-lightblue shadow-2xl rounded-xl w-60 h-70 pb-8 px-4 relative pt-24">
                <img
                  src="/image/landingpage/hero-talent.png"
                  alt=""
                  class="absolute -top-20 left-0 scale-50 hover:scale-75 ease-in duration-500"
                />
                <div>
                  <p class="text-center text-3xl text-accentpurple gilroy-bold font-bold pb-4">
                    Talents
                  </p>
                  <p class="text-center text-base font-semibold gilroy-semi-bold pb-4">
                    Our people, your growth
                  </p>
                  <p class="text-center text-sm gilroy-regular pb-4">
                    Let us streamline your hiring process with on-demand
                    expertise, giving you flexible headcounts and talents
                    working period.
                  </p>

                  <div className={"text-center pb-4"}>
                    <Linkk href="/talents">
                      <button
                        className={
                          "text-sm text-center text-white border-2 bg-green-600 border-green-600 px-4 py-2 md:px-4 md:py-3 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black bg-white"
                        }
                      >
                        <div className={"flex flex-row justify-between"}>
                          <p className={"px-1"}>Hire Now</p>
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={"youronestop md:relative md:bottom-32 flex"}>
        <div className={"justify-start"}>
          <img
            style={{ width: "215px", height: "300px" }}
            src="/image/landingpage/image-left.png"
          />
        </div>
        <div className={"container mx-auto"}>
          <p
            className={
              "text-3xl text-center md:text-4xl gilroy-bold py-8 md:py-0"
            }
          >
            A trusted partner after 15+ years of experience across Indonesia!
          </p>
          <div className={"flex py-5"}>
            <div
              className={
                "flex-col text-black p-1 md:px-4 md:py-2 mx-auto md:w-40 lg:w-52"
              }
            >
              <p
                className={
                  "text-2xl text-green-500 md:text-5xl lg:text-5xl text-center gilroy-regular "
                }
              >
                <CountUp end={45} />+
              </p>
              <p
                className={
                  "hidden md:block text-lg md:text-xl text-center gilroy-regular"
                }
              >
                cities
              </p>
              <p
                className={
                  "block md:hidden text-base md:text-xl text-center gilroy-regular"
                }
              >
                cities
              </p>
            </div>
            <div
              className={
                "flex-col text-black p-1 md:px-4 md:py-2 mx-auto md:w-40 lg:w-52"
              }
            >
              <p
                className={
                  "text-2xl text-green-500 md:text-5xl lg:text-5xl text-center gilroy-regular "
                }
              >
                <CountUp end={9000} />+
              </p>
              <p
                className={
                  "hidden md:block text-lg md:text-xl text-center gilroy-regular"
                }
              >
                managed and leased devices
              </p>
              <p
                className={
                  "block md:hidden text-base md:text-xl text-center gilroy-regular"
                }
              >
                managed and leased devices
              </p>
            </div>
            <div
              className={
                "flex-col text-black p-1 md:px-4 md:py-2 mx-auto md:w-40 lg:w-52"
              }
            >
              <p
                className={
                  "text-2xl text-green-500 md:text-5xl lg:text-5xl text-center gilroy-regular "
                }
              >
                <CountUp end={100} />+
              </p>
              <p
                className={
                  "hidden md:block text-lg md:text-xl text-center gilroy-regular"
                }
              >
                IT projects
              </p>
              <p
                className={
                  "block md:hidden text-base md:text-xl text-center gilroy-regular"
                }
              >
                IT projects
              </p>
            </div>
          </div>
        </div>
        <div className={"justify-end"}>
          <img
            style={{ width: "215px", height: "300px" }}
            src="/image/landingpage/image-right.png"
          />
        </div>
      </section>
      <section
        className={
          "youronestop py-4 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 md:relative md:bottom-32 text-center"
        }
      >
        <div className={"container mx-auto"}>
          <p className={"text-3xl md:text-4xl gilroy-bold py-8 md:py-0"}>
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
        <div className="md:flex flex-row items-center py-10 justify-around">
          <a
            href="#"
            class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="p-4"
              style={{ height: "111px" }}
              src="/image/landingpage/on_demand.png"
              alt=""
            />
            <div className="flex flex-col items-start px-2">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-primarygreen dark:text-white">
                On Demand Services
              </h5>
              <p className="mb-3 text-left text-base font-normal text-black dark:text-gray-400">
                Transform your business with our custom solutions to optimize
                your cost and productivity
              </p>
            </div>
          </a>
          <a
            href="#"
            class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
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
              <p className="mb-3 text-left text-base text-black font-normal text-gray-700 dark:text-gray-400">
                A partner you can trust, with more than 15 years of
                experiences-we’re here for the long run
              </p>
            </div>
          </a>
        </div>
        <div className="md:flex flex-row items-center py-10 justify-around">
          <a
            href="#"
            class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
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
              <p className="mb-3 text-left text-base font-normal text-black dark:text-gray-400">
                We offer the best services with the best price tailored to your
                needs
              </p>
            </div>
          </a>
          <a
            href="#"
            class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
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
              <p className="mb-3 text-left text-base text-black font-normal text-gray-700 dark:text-gray-400">
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
      <section
        className={
          "youronestop py-4 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 md:relative md:bottom-32 text-center"
        }
      >
        <div className={"container mx-auto"}>
          <p className={"text-3xl md:text-4xl gilroy-bold py-8 md:py-0"}>
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
        </div>
      </section>
      {/* client */}
      <section
        className={
          "youronestop py-4 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 md:relative md:bottom-32 text-center"
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

      {/* <section
        className={
          "md:relative px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 text-center md:bottom-16"
        }>
        <p
          className={
            "text-3xl md:text-4xl pb-2 md:pb-4 gilroy-medium font-semibold"
          }>
          Show Cases
        </p>
        <p className={"gilroy-medium text-2xl"}>
          We collaborate with partners from a wide range of industries
        </p>
        <br></br>
        <div
          className={"pb-8 center md:content-around text-xl"}
          // style={{ maxWidth: 1000 }}
        >
          <Slider {...sliderSettings}>
            <div>
              <Card>
                <div className="h-auto">
                  <Row
                    className="hidden md:flex pb-4"
                    style={{ alignItems: "center" }}>
                    <Col xs={{ span: 12 }} md={{ span: 6 }}>
                      <img
                        className={"pr-2"}
                        style={{ maxHeight: 70 }}
                        src="/image/company/kb.jpg"></img>
                    </Col>
                    <Col span={12}>
                      <p className={"text-xl gilroy-medium text-left"}>
                        KB Bukopin
                      </p>
                      <p className={"gilroy-regular text-left"}>Banking</p>
                    </Col>
                  </Row>
                  <div className="block md:hidden pb-2">
                    <img
                      className={"pr-2"}
                      style={{ maxHeight: 70 }}
                      src="/image/company/kb.jpg"></img>
                    <p className={"text-xl gilroy-medium text-left"}>
                      KB Bukopin
                    </p>
                    <p className={"gilroy-regular text-left"}>Banking</p>
                  </div>
                  <p className={"text-left"}>
                    Provide IT hardware infrastructure with 45 service points in
                    Indonesia. Rent and maintenance +5.000 hardware. Support IT
                    Engineer for build many projects.{" "}
                  </p>
                </div>
              </Card>
            </div>
            <div>
              <Card>
                <div className="h-auto">
                  <Row
                    className="hidden md:flex pb-4"
                    style={{ alignItems: "center" }}>
                    <Col xs={{ span: 12 }} md={{ span: 6 }}>
                      <img
                        className={""}
                        style={{ maxHeight: 70 }}
                        src="/image/company/shipper.png"></img>
                    </Col>
                    <Col span={12}>
                      <p className={"text-xl gilroy-medium text-left"}>
                        Shipper
                      </p>
                      <p className={"gilroy-regular  text-left"}>
                        Logistic Service
                      </p>
                    </Col>
                  </Row>
                  <div className="block md:hidden pb-2">
                    <img
                      className={"pr-2"}
                      style={{ maxHeight: 70 }}
                      src="/image/company/shipper.png"></img>
                    <p className={"text-xl gilroy-medium text-left"}>Shipper</p>
                    <p className={"gilroy-regular text-left"}>
                      Logistic Service
                    </p>
                  </div>
                  <p className={"text-left"}>
                    Accommodate talent with exceptional skills in a short time.
                    The project was conducted earlier with help recruitment
                    fastly.
                  </p>
                </div>
              </Card>
            </div>
            <div>
              <Card>
                <div className="h-auto">
                  <Row
                    className="hidden md:flex pb-4"
                    style={{ alignItems: "center" }}>
                    <Col xs={{ span: 12 }} md={{ span: 6 }}>
                      <img
                        className={""}
                        style={{ maxHeight: 70 }}
                        src="/image/company/cgx.png"></img>
                    </Col>
                    <Col span={12}>
                      <p className={"text-xl gilroy-medium text-left"}>CGX</p>
                      <p className={"gilroy-regular text-left"}>
                        Shipment and Warehouse
                      </p>
                    </Col>
                  </Row>
                  <div className="block md:hidden pb-2">
                    <img
                      className={"pr-2"}
                      style={{ maxHeight: 70 }}
                      src="/image/company/cgx.png"></img>
                    <p className={"text-xl gilroy-medium text-left"}>CGX</p>
                    <p className={"gilroy-regular text-left"}>
                      Shipment and Warehouse
                    </p>
                  </div>
                  <p className={"text-left"}>
                    Develop logistic delivery process and reporting. Make sure
                    to handle critical operations about open API business.
                  </p>
                </div>
              </Card>
            </div>
            <div>
              <Card>
                <div className="h-auto">
                  <Row
                    className="hidden md:flex pb-4"
                    style={{ alignItems: "center" }}>
                    <Col xs={{ span: 12 }} md={{ span: 6 }}>
                      <img
                        className={""}
                        style={{ maxHeight: 70 }}
                        src="/image/company/kb.jpg"></img>
                    </Col>
                    <Col span={12}>
                      <p className={"text-xl gilroy-medium text-left"}>
                        KB Bukopin Syariah
                      </p>
                      <p className={"gilroy-regular  text-left"}>Banking</p>
                    </Col>
                  </Row>
                  <div className="md:hidden pb-2">
                    <img
                      className={"pr-2"}
                      style={{ maxHeight: 70 }}
                      src="/image/company/kb.jpg"></img>
                    <p className={"text-xl gilroy-medium text-left"}>
                      KB Bukopin Syariah
                    </p>
                    <p className={"gilroy-regular text-left"}>Banking</p>
                  </div>
                  <p className={"text-left"}>
                    Rent and maintenance IT hardware infrastructure. Support at
                    a high service level.{" "}
                  </p>
                </div>
              </Card>
            </div>
            <div>
              <Card>
                <div className="h-auto">
                  <Row
                    className="hidden md:flex pb-4"
                    style={{ alignItems: "center" }}>
                    <Col xs={{ span: 12 }} md={{ span: 6 }}>
                      <img
                        className={""}
                        style={{ maxHeight: 70 }}
                        src="/image/company/forty.png"></img>
                    </Col>
                    <Col span={12}>
                      <p className={"text-xl gilroy-medium text-left"}>Forty</p>
                      <p className={"gilroy-regular  text-left"}>IT Service</p>
                    </Col>
                  </Row>
                  <div className="block pb-2 md:hidden">
                    <img
                      className={"pr-2"}
                      style={{ maxHeight: 70 }}
                      src="/image/company/forty.png"></img>
                    <p className={"text-xl gilroy-medium text-left"}>Forty</p>
                    <p className={"gilroy-regular text-left"}>IT Service</p>
                  </div>
                  <p className={"text-left"}>
                    Develop Forty Mobile App with a sensitive timeline. Manage
                    from initial lending, payment transactions to reporting.{" "}
                  </p>
                </div>
              </Card>
            </div>
          </Slider>
        </div>
      </section> */}

      <section
        className={"youronestop mt-4 md:relative md:flex bg-bgfooter pt-8"}
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
      {/* <section className={'section4landingpage pt-8 pb-16'}>
                    <div className={'text-center'}>
                        <Flickity
                            className={'carousel'} // default ''
                            elementType={'div'} // default 'div'
                            options={flickityOptions} // takes flickity options {}
                            disableImagesLoaded={false} // default false
                            reloadOnUpdate // default false
                            static // default false
                            >
                            <div className={'w-full'}>
                                <div className={'text-base md:text-4xl font-bold inline-block pb-12 px-4 md:px-64'} style={{color:'#188E4D'}}>
                                    <p>“I Absolutely love the way Goodkit handles systematic design”</p>
                                </div>
                                <div className={' relative -top-7 md:-top-12 mt-4 md:mt-8'}>
                                    <div className={'w-auto inline-block'}>
                                        <img src="/avatar.png"></img>
                                    </div>
                                    <div className={'font-bold pb-1'}>
                                        <p>Adhi Bramantya</p>
                                    </div>
                                    <div>
                                        <p>CFO Bank Bukopin</p>
                                    </div>
                                </div>
                            </div>
                            <div className={'w-full'}>
                                <div className={'text-base md:text-4xl font-bold inline-block pb-12 px-4 md:px-64'} style={{color:'#188E4D'}}>
                                    <p>“I Absolutely love the way Goodkit handles systematic design”</p>
                                </div>
                                <div className={' relative -top-7 md:-top-12 mt-4 md:mt-8'}>
                                    <div className={'w-auto inline-block'}>
                                        <img src="/avatar.png"></img>
                                    </div>
                                    <div className={'font-bold pb-1'}>
                                        <p>Adhi Bramantya</p>
                                    </div>
                                    <div>
                                        <p>CFO Bank Bukopin</p>
                                    </div>
                                </div>
                            </div>
                        </Flickity>
                    </div>
                </section> */}
      {/* <section className={'section5landingpage px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'}>
                    <div className={' md:flex relative justify-between '}style={{top:'40%'}}>
                        <div className={'flex-col text-2xl md:text-4xl text-black -top-4 md:top-0 relative gilroy-bold'} style={{}}>
                            <p>Let’s be better together</p>
                        </div>
                        <div className={'flex-col w-auto'}>
                            <button className={'text-black flex border-2 text-base md:text-xl border-black px-3 py-2 md:px-4 md:py-3 -mt-2 md:right-20 relative focus:outline-none gilroy-medium hover:text-white hover:bg-black'}>Contact Us &nbsp;
                                <ArrowRightOutlined className={'pt-1'}/>
                            </button>
                        </div>
                    </div>
                </section> */}
      {/* </section> */}
      {/* <section className={'px-4 sm:px-10 md:bottom-32 md:px-10 lg:px-10 xl:px-10 2xl:px-20 pb-20 pt-10 md:pt-0 text-center'}>

                <p className={'text-2xl pb-2 md:pb-4 gilroy-bold'}>
                    Our Clients
                </p>
                <p className={'gilroy-medium text-lg'}>
                    Trusted by startups, financial services, goverment agencies
                </p>
                <br></br>
                <Space>
                    <img className={'w-full pr-10'} src="/image/company/setneg.png"></img>
                    <img className={'w-full pr-10'} src="/image/company/syariah.png"></img>
                    <img className={'w-full pr-10'} src="/image/company/kb_text.png"></img>
                    <img className={'w-full'} src="/image/company/shipper_text.png"></img>
                </Space>

            </section> */}
    </Layout>
  );
}

export default LandingPage;
