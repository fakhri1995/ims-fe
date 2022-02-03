import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";
import { Card, Col, Row, Space } from "antd";
import Linkk from "next/link";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import Flickity from "react-flickity-component";
import { Link, animateScroll as scroll } from "react-scroll";
import Slider from "react-slick";

import Layout from "../../../components/migwebsite/layout.js";
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
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    arrows: false,
    dots: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
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
          "section1landingpage md:relative md:-top-20 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
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
                Focus on your best, we take care of the rest
              </p>
              {/* <button className={'text-black text-xl border-2 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black'}>Let's Collaborate</button> */}
              <p className={" text-xl gilroy-regular"}>
                MIG catalyzes your core business with IT hardware solutions,
                software development, and tech talents.
              </p>
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
        <div
          className={
            "block md:flex justify-between md:bottom-36 relative container mx-auto"
          }
        >
          <Link
            className={"flex-col hidden md:block"}
            activeClass="active"
            to="youronestop"
            spy={true}
            smooth={true}
            offset={-120}
            duration={500}
          >
            <p className={"text-black text-xl text-center"}>
              See how it works!
            </p>
            <img
              className={"pt-3 mt-2 mx-auto animate-bounce"}
              style={{ width: "60px" }}
              src="/image/landingpage/arrow-down.png"
            />
          </Link>
          <div className={"flex pb-3"}>
            <div
              className={
                "flex-col text-black p-1 md:px-4 md:py-2 mx-auto md:w-40 lg:w-52"
              }
            >
              <p
                className={
                  "text-2xl md:text-5xl lg:text-5xl text-center gilroy-regular "
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
                  "text-2xl md:text-5xl lg:text-5xl text-center gilroy-regular "
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
                  "text-2xl md:text-5xl lg:text-5xl text-center gilroy-regular "
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
            <div
              className={
                "flex-col text-black p-1 md:px-4 md:py-2 mx-auto md:w-40 lg:w-52"
              }
            >
              <p
                className={
                  "text-2xl md:text-5xl lg:text-5xl text-center gilroy-regular "
                }
              >
                <CountUp end={15} />+
              </p>
              <p
                className={
                  "hidden md:block text-lg md:text-xl text-center gilroy-regular"
                }
              >
                years experience
              </p>
              <p
                className={
                  "block md:hidden text-base md:text-xl text-center gilroy-regular"
                }
              >
                years experience
              </p>
            </div>
          </div>
          <Link
            className={"flex-col block md:hidden pt-8 md:pt-0"}
            activeClass="active"
            to="youronestop"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            <p className={"text-center text-black"}>See how it works!</p>
            <img
              className={"pt-3 mt-2 mx-auto"}
              style={{ width: "60px" }}
              src="/image/landingpage/arrow-down.png"
            />
          </Link>
        </div>
      </section>
      <section
        className={
          "youronestop px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 md:relative md:bottom-32 text-center"
        }
      >
        <div className={"container mx-auto"}>
          <p className={"text-3xl md:text-4xl gilroy-bold py-8 md:py-0"}>
            Your one stop{" "}
            <span
              style={{
                borderBottom: "solid 3px #188E4D",
                paddingBottom: "2.5px",
              }}
            >
              cost efficient
            </span>{" "}
            IT solution
          </p>
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
      <section
        className={
          "section2landingpagephone py-8 md:hidden px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
      >
        {/* <Flickity
                    className={'carousel'}
                    elementType={'div'}
                    options={flickityOptions}
                    disableImagesLoaded={false}
                    reloadOnUpdate
                    static
                    > */}
        <div className={"bg-gray-200 rounded-2xl py-4 px-4 mx-4 mb-4"}>
          <p className={"text-xl pb-2 md:pb-4 gilroy-bold text-green-600"}>
            Hardware
          </p>
          <div className={"pt-4 pb-4 w-full"}>
            <img
              className={""}
              style={{ paddingLeft: "2px" }}
              src="/image/landingpage/Hardware.png"
            ></img>
          </div>
          <p className={"text-2xl pb-2 md:pb-4 gilroy-bold"}>
            Lighten up your heavy capital in IT infrastructure
          </p>
          <p className={"gilroy-medium text-lg"}>
            Transform yours into managed service model, guaranteeing you with
            predictable monthly cost and excelent service level.
          </p>
          <br></br>
          <Linkk href="/hardware">
            <button
              className={
                "text-lg text-black border-2 border-black px-3 py-2 md:px-4 md:py-3 focus:outline-none gilroy-medium hover:text-white hover:bg-black"
              }
            >
              Get yours
            </button>
          </Linkk>
        </div>
        <div className={"bg-gray-200 rounded-2xl py-4 px-4 mx-4 mb-4"}>
          <p className={"text-xl pb-2 md:pb-4 gilroy-bold text-green-600"}>
            Software
          </p>
          <div className={"pt-4 pb-4 w-full"}>
            <img
              className={""}
              style={{ paddingLeft: "2px" }}
              src="/image/landingpage/Software.png"
            ></img>
          </div>
          <p className={"text-2xl pb-2 md:pb-4 gilroy-bold"}>
            Automate your business
          </p>
          <p className={"gilroy-medium text-lg"}>
            Simplify and digitalize your business process. Customize your system
            with us.
          </p>
          <br></br>
          <Linkk href="/software">
            <button
              className={
                "text-lg text-black border-2 border-black px-3 py-2 md:px-4 md:py-3 focus:outline-none gilroy-medium hover:text-white hover:bg-black"
              }
            >
              Build now
            </button>
          </Linkk>
        </div>
        <div className={"bg-gray-200 rounded-2xl py-4 px-4 mx-4 mb-4"}>
          <p className={"text-xl pb-2 md:pb-4 gilroy-bold text-green-600"}>
            Talents
          </p>
          <div className={"pt-4 pb-4 w-full"}>
            <img
              className={""}
              style={{ paddingLeft: "2px" }}
              src="/image/landingpage/People.png"
            ></img>
          </div>
          <p className={"text-2xl pb-2 md:pb-4 gilroy-bold"}>
            Our people, your growth
          </p>
          <p className={"gilroy-medium text-lg"}>
            Let us streamline your hiring process with on-demand expertise,
            giving you flexible headcounts and talents working period.
          </p>
          <br></br>
          <Linkk href="/people">
            <button
              className={
                "text-lg text-black border-2 border-black px-3 py-2 md:px-4 md:py-3 focus:outline-none gilroy-medium hover:text-white hover:bg-black"
              }
            >
              Set up your team
            </button>
          </Linkk>
        </div>

        {/* </Flickity> */}
      </section>
      <section
        className={
          "section2landingpagebrowser md:bottom-16 md:relative py-8 hidden md:block px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
      >
        <div className={"container mx-auto flex justify-around pb-16"}>
          <Link
            className={""}
            activeClass="active"
            to="hardware"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            <p
              className={
                "gilroy-bold text-lg md:text-2xl text-green-600 cursor-pointer menu-underlined child"
              }
            >
              Hardware
            </p>
          </Link>
          <Link
            className={""}
            activeClass="active"
            to="software"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            <p
              className={
                "gilroy-bold text-lg md:text-2xl text-green-600 cursor-pointer menu-underlined child"
              }
            >
              Software
            </p>
          </Link>
          <Link
            className={""}
            activeClass="active"
            to="talents"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            <p
              className={
                "gilroy-bold text-lg md:text-2xl text-green-600 cursor-pointer menu-underlined child"
              }
            >
              Talents
            </p>
          </Link>
        </div>
        <div className={"hardware pb-16"}>
          <div className={"container mx-auto block md:flex"}>
            <div className={"pt-8 pb-8 w-full md:w-1/2 my-auto"}>
              <p className={"text-2xl pb-2 gilroy-bold text-green-600"}>
                Hardware
              </p>
              <p className={"text-4xl pb-2 md:pb-4 gilroy-medium"}>
                Lighten up your heavy capital in IT infrastructure
              </p>
              <div className={"pt-4 pb-4 w-full block md:hidden"}>
                <img
                  className={"pr-1"}
                  style={{ paddingLeft: "2px" }}
                  src="/image/landingpage/Hardware.png"
                ></img>
              </div>
              <p
                className={
                  "w-full md:w-full pb-4 gilroy-medium text-xl text-justify"
                }
              >
                Transform yours into managed service model, guaranteeing you
                with predictable monthly cost and excelent service level.
              </p>
              <Linkk href="/hardware">
                <button
                  className={
                    "flex text-xl text-black border-2 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black"
                  }
                >
                  <p className={"pl-4 pr-8"}>Get&nbsp;yours</p>
                  <ArrowRightOutlined className={"pt-1 pr-4"} />
                </button>
              </Linkk>
            </div>
            <div className={"pt-8 pb-8 w-1/2 ml-8 hidden md:block"}>
              <img
                className={"w-full pr-1"}
                src="/image/landingpage/Hardware.png"
              ></img>
            </div>
          </div>
        </div>
        <div className={"software pb-16"}>
          <div className={"container mx-auto block md:flex"}>
            <div className={"pt-8 pb-8 w-1/2 mr-8 hidden md:block"}>
              <img
                className={"w-full pl-1"}
                src="/image/landingpage/Software.png"
              ></img>
            </div>
            <div className={"pt-8 pb-8 w-full md:w-1/2 my-auto"}>
              <p className={"text-2xl pb-2 gilroy-bold text-green-600"}>
                Software
              </p>
              <p className={"text-4xl pb-2 md:pb-4 gilroy-medium"}>
                Automate your business
              </p>
              <div className={"pt-4 pb-4 w-full block md:hidden"}>
                <img
                  className={"pr-1"}
                  style={{ paddingLeft: "2px" }}
                  src="/image/landingpage/Software.png"
                ></img>
              </div>
              <p
                className={
                  "w-full md:w-full pb-4 gilroy-medium text-xl text-justify"
                }
              >
                Simplify and digitalize your business process. Customize your
                system with us.
              </p>
              <Linkk href="/software">
                <button
                  className={
                    "flex text-xl text-black border-2 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black"
                  }
                >
                  <p className={"pl-4 pr-8"}>Build now</p>
                  <ArrowRightOutlined className={"pt-1 pr-4"} />
                </button>
              </Linkk>
            </div>
          </div>
        </div>
        <div className={"talents pb-16"}>
          <div className={"container mx-auto block md:flex"}>
            <div className={"pt-8 pb-8 w-full md:w-1/2 my-auto"}>
              <p className={"text-2xl pb-2 gilroy-bold text-green-600"}>
                Talents
              </p>
              <p className={"text-4xl pb-2 md:pb-4 gilroy-medium"}>
                Our people, your growth
              </p>
              <div className={"pt-4 pb-4 w-full block md:hidden"}>
                <img
                  className={"pr-1"}
                  style={{ paddingLeft: "2px" }}
                  src="/image/landingpage/People.png"
                ></img>
              </div>
              <p
                className={
                  "w-full md:w-full pb-4 gilroy-medium text-xl text-justify"
                }
              >
                Let us streamline your hiring process with on-demand expertise,
                giving you flexible headcounts and talents working period.
              </p>
              <Linkk href="/talents">
                <button
                  className={
                    "flex text-xl text-black border-2 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black"
                  }
                >
                  <p className={"pl-4 pr-8"}>Set up your team</p>
                  <ArrowRightOutlined className={"pt-1 pr-4"} />
                </button>
              </Linkk>
            </div>
            <div className={"pt-8 pb-8 w-1/2 ml-8 hidden md:block"}>
              <img
                className={"w-full pr-1"}
                src="/image/landingpage/People.png"
              ></img>
            </div>
          </div>
        </div>
      </section>
      <section
        className={
          "section3landingpageadvantages py-8 md:hidden px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
      >
        <p
          className={
            "text-3xl md:text-4xl pb-2 md:pb-4 gilroy-medium text-center font-semibold"
          }
        >
          Advantages
        </p>
        <div
          className={"center md:content-around text-xl"}
          style={{ maxWidth: 1000 }}
        >
          <Slider {...sliderSettings2}>
            <div>
              <Card>
                <div className="">
                  <img
                    className="mx-auto"
                    src="/image/landingpage/on_demand.png"
                  ></img>
                  <p className="pb-4 gilroy-bold text-xl mx-auto text-center">
                    On Demand Services
                  </p>
                  <p className="pb-4 gilroy-medium text-xl mx-auto text-center">
                    Transform your business with our custom solutions to
                    <br className="hidden xl:block"></br> optimize your cost and
                    productivity
                  </p>
                </div>
              </Card>
            </div>
            <div>
              <Card>
                <div className="">
                  <img
                    className="mx-auto"
                    src="/image/landingpage/reliable_partner.png"
                  ></img>
                  <p className="pb-4 gilroy-bold text-xl mx-auto text-center">
                    Realiable Partner
                  </p>
                  <p className="pb-4 gilroy-medium text-xl mx-auto text-center">
                    A partner you can trust, with more than 15 years of
                    <br className="hidden xl:block"></br> experiences-we’re here
                    for the long run
                  </p>
                </div>
              </Card>
            </div>
            <div>
              <Card>
                <div className="">
                  <img
                    className="mx-auto"
                    src="/image/landingpage/competitive_rates.png"
                  ></img>
                  <p className="pb-4 gilroy-bold text-xl mx-auto text-center">
                    Competitive Rates
                  </p>
                  <p className="pb-4 gilroy-medium text-xl mx-auto text-center">
                    We offer the best services with the best price tailored
                    <br className="hidden xl:block"></br> to your needs
                  </p>
                </div>
              </Card>
            </div>
            <div>
              <Card>
                <div className="">
                  <img
                    className="mx-auto"
                    src="/image/landingpage/cost_efficient.png"
                  ></img>
                  <p className="pb-4 gilroy-bold text-xl mx-auto text-center">
                    Cost Efficient
                  </p>
                  <p className="pb-4 gilroy-medium text-xl mx-auto text-center">
                    We help you grow and offer solutions to help optimized
                    <br className="hidden xl:block"></br> your bussiness
                  </p>
                </div>
              </Card>
            </div>
          </Slider>
        </div>
      </section>

      {/* desktop show */}
      <section
        className={
          "section3landingpageadvantages md:bottom-24 md:relative py-8 hidden md:block px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
      >
        <p
          className={
            "text-3xl md:text-4xl pb-2 md:pb-4 gilroy-medium font-semibold text-center"
          }
        >
          Advantages
        </p>
        <div class="grid grid-cols-2 gap-2 place-content-center mx-auto">
          <div>
            <img
              className="mx-auto"
              src="/image/landingpage/on_demand.png"
            ></img>
            <p className="pb-4 gilroy-bold text-xl mx-auto text-center">
              On Demand Services
            </p>
            <p className="pb-4 gilroy-medium text-xl mx-auto text-center">
              Transform your business with our custom solutions to
              <br className="hidden xl:block"></br> optimize your cost and
              productivity
            </p>
          </div>
          <div>
            <img
              className="mx-auto"
              src="/image/landingpage/reliable_partner.png"
            ></img>
            <p className="pb-4 gilroy-bold text-xl mx-auto text-center">
              Realiable Partner
            </p>
            <p className="pb-4 gilroy-medium text-xl mx-auto text-center">
              A partner you can trust, with more than 15 years of
              <br className="hidden xl:block"></br> experiences-we’re here for
              the long run
            </p>
          </div>
          <div>
            <img
              className="mx-auto"
              src="/image/landingpage/competitive_rates.png"
            ></img>
            <p className="pb-4 gilroy-bold text-xl mx-auto text-center">
              Competitive Rates
            </p>
            <p className="pb-4 gilroy-medium text-xl mx-auto text-center">
              We offer the best services with the best price tailored
              <br className="hidden xl:block"></br> to your needs
            </p>
          </div>
          <div>
            <img
              className="mx-auto"
              src="/image/landingpage/cost_efficient.png"
            ></img>
            <p className="pb-4 gilroy-bold text-xl mx-auto text-center">
              Cost Efficient
            </p>
            <p className="pb-4 gilroy-medium text-xl mx-auto text-center">
              We help you grow and offer solutions to help optimized
              <br className="hidden xl:block"></br> your bussiness
            </p>
          </div>
        </div>
      </section>
      {/* <section className={'section2landingpagebrowser md:relative md:bottom-32 py-8 hidden md:block px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'}>
                    <div className={'container mx-auto pb-8'}>
                        <Slider
                        slidesToShow={3}
                        asNavFor={nav1}
                        ref={slider => (slider2 = slider) }
                        focusOnSelect={true}
                        >
                            <p className={'text-center parent'}>
                                <a className={'font-bold text-lg md:text-2xl text-green-700 cursor-pointer menu-underlined child'}>Hardware</a>
                            </p>
                            <p className={'text-center parent'}>
                                <a className={'font-bold text-lg md:text-2xl text-green-700 cursor-pointer menu-underlined child'}>People</a>
                            </p>
                            <p className={'text-center parent'}>
                                <a className={'font-bold text-lg md:text-2xl text-green-700 cursor-pointer menu-underlined child'}>Software</a>
                            </p>
                        </Slider>
                    </div>
                    <Slider 
                    className={'container mx-auto'}
                    autoplay={false}
                    autoplaySpeed={3000}
                    pauseOnHover={false}
                    // pauseOnFocus={true}
                    dots={false}
                    // fade={true}
                    infinite={true}
                    speed={500}
                    slidesToShow={1}
                    slidesToScroll={1}
                    ref={slider => (slider1 = slider)}
                    asNavFor={nav2}
                    arrows={false}
                    adaptiveHeight={true}
                    >
                        <div>
                            <div className={'block md:flex'}>
                                <div className={'pt-8 pb-8 w-full md:w-1/2 my-auto'}>
                                    <p className={'text-4xl font-bold pb-2 md:pb-4 gilroy-bold'}>Hardware</p>
                                    <div className={'pt-4 pb-4 w-full block md:hidden'}>
                                        <img className={'pr-1'} style={{paddingLeft:'2px'}} src="/image/landingpage/Hardware.png"></img>
                                    </div>
                                    <p className={'w-full md:w-full pb-4 gilroy-medium text-xl text-justify'} style={{letterSpacing:'1.5px'}}>Optimize your cost by leasing and maintenances variety of electronic equipments</p>
                                    <Linkk href="/hardware">
                                        <button style={{width:'150px'}} className={'text-xl text-black border-2 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black'}>
                                            Get yours
                                        </button>
                                    </Linkk>
                                </div>
                                <div className={'pt-8 pb-8 w-1/2 ml-8 hidden md:block'}>
                                    <img className={'w-full pr-1'} src="/image/landingpage/Hardware.png"></img>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={'block md:flex'}>
                                <div className={'pt-8 pb-8 w-full md:w-1/2 my-auto'}>
                                    <p className={'text-4xl font-bold pb-2 md:pb-4 gilroy-bold'}>People</p>
                                    <div className={'pt-4 pb-4 w-full block md:hidden'}>
                                        <img src="/image/landingpage/People.png"></img>
                                    </div>
                                    <p className={'w-full md:w-full pb-4 gilroy-medium text-xl text-justify'} style={{letterSpacing:'1.5px'}}>We help you reduce complexity in talent sourcing and management</p>
                                    <Linkk href="/people">
                                        <button style={{width:'150px'}} className={'text-xl text-black border-2 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black'}>
                                            Get yours
                                        </button>
                                    </Linkk>
                                </div>
                                <div className={'pt-8 pb-8 w-1/2 ml-8 hidden md:block'}>
                                    <img className={'w-full'} src="/image/landingpage/People.png"></img>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={'block md:flex'}>
                                <div className={'pt-8 pb-8 w-full md:w-1/2 my-auto'}>
                                    <p className={'text-4xl font-bold pb-2 md:pb-4 gilroy-bold'}>Software</p>
                                    <div className={'pt-4 pb-4 w-full block md:hidden'}>
                                        <img src="/image/landingpage/Software.png"></img>
                                    </div>
                                    <p className={'w-full md:w-full pb-4 gilroy-medium text-xl text-justify'} style={{letterSpacing:'1.5px'}}>We support your companies to simplify and automate the process through digitalization</p>
                                    <Linkk href="/software">
                                        <button style={{width:'150px'}} className={'text-xl text-black border-2 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black'}>
                                            Get yours
                                        </button>
                                    </Linkk>
                                </div>
                                <div className={'pt-8 pb-8 w-1/2 ml-8 hidden md:block'}>
                                    <img className={'w-full'} src="/image/landingpage/Software.png"></img>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </section> */}

      <section
        className={
          "md:relative px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 text-center md:bottom-16"
        }
      >
        <p
          className={
            "text-3xl md:text-4xl pb-2 md:pb-4 gilroy-medium font-semibold"
          }
        >
          Show Cases
        </p>
        <p className={"gilroy-medium text-2xl"}>
          We collaborate with partners from a wide range of industries
        </p>
        <br></br>
        <div
          className={"pb-8 center md:content-around text-xl h-max"}
          style={{ maxWidth: 1000 }}
        >
          <Slider {...sliderSettings}>
            <div>
              <Card>
                <div className="h-auto md:h-36">
                  <Row
                    className="hidden md:flex pb-4"
                    style={{ alignItems: "center" }}
                  >
                    <Col xs={{ span: 12 }} md={{ span: 6 }}>
                      <img
                        className={"pr-2"}
                        style={{ maxHeight: 70 }}
                        src="/image/company/kb.jpg"
                      ></img>
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
                      src="/image/company/kb.jpg"
                    ></img>
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
                <div className="h-auto md:h-36">
                  <Row
                    className="hidden md:flex pb-4"
                    style={{ alignItems: "center" }}
                  >
                    <Col xs={{ span: 12 }} md={{ span: 6 }}>
                      <img
                        className={""}
                        style={{ maxHeight: 70 }}
                        src="/image/company/shipper.png"
                      ></img>
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
                      src="/image/company/shipper.png"
                    ></img>
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
                <div className="h-auto md:h-36">
                  <Row
                    className="hidden md:flex pb-4"
                    style={{ alignItems: "center" }}
                  >
                    <Col xs={{ span: 12 }} md={{ span: 6 }}>
                      <img
                        className={""}
                        style={{ maxHeight: 70 }}
                        src="/image/company/cgx.png"
                      ></img>
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
                      src="/image/company/cgx.png"
                    ></img>
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
                <div className="h-auto md:h-36">
                  <Row
                    className="hidden md:flex pb-4"
                    style={{ alignItems: "center" }}
                  >
                    <Col xs={{ span: 12 }} md={{ span: 6 }}>
                      <img
                        className={""}
                        style={{ maxHeight: 70 }}
                        src="/image/company/kb.jpg"
                      ></img>
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
                      src="/image/company/kb.jpg"
                    ></img>
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
                <div className="h-auto md:h-36 pb-4">
                  <Row
                    className="hidden md:flex pb-4"
                    style={{ alignItems: "center" }}
                  >
                    <Col xs={{ span: 12 }} md={{ span: 6 }}>
                      <img
                        className={""}
                        style={{ maxHeight: 70 }}
                        src="/image/company/forty.png"
                      ></img>
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
                      src="/image/company/forty.png"
                    ></img>
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
      </section>

      <section
        className={
          "px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 pb-20 pt-10 md:pt-0 text-center"
        }
      >
        <div className={"container mx-auto"}>
          <p
            className={"text-3xl md:text-4xl pb-4 gilroy-medium font-semibold"}
          >
            Let's get Started
          </p>
          <Linkk href="/contactus">
            <button
              className={
                "text-xl text-black border-2 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none gilroy-medium hover:text-white hover:bg-black"
              }
            >
              <p className={"px-8 gilroy-bold"}>Contact Us</p>
            </button>
          </Linkk>
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
