import Layout from "../../../components/migwebsite/layout.js";
import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";
import { Tabs } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Flickity from "react-flickity-component";
import Fade from "react-reveal/Fade";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function Advantages({}) {
  const { TabPane } = Tabs;
  const flickityOptions = {
    initialIndex: 0,
    wrapAround: "true",
  };
  const flickityOptions2 = {
    initialIndex: 0,
    // wrapAround: 'true',
    cellAlign: "left",
    contain: true,
    pageDots: false,
    prevNextButtons: false,
  };
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let slider1 = [];
  let slider2 = [];
  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);
  const [isHiddenAnimation, setIsHiddenAnimation] = useState(true);
  const onClickHiddenAnimation = () => {
    setIsHiddenAnimation((s) => !s);
  };

  return (
    <Layout>
      <section
        className={
          "section1advantages hidden md:block fixed w-full z-50 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
        style={{ background: "#F4F4F4" }}
      >
        <div className={"block md:flex"}>
          <div className={"flex py-4"}>
            <Link href={{ pathname: "/advantages" }}>
              <p
                className={
                  "cursor-pointer flex-col text-base font-semibold pr-4"
                }
                style={{}}
              >
                Advantages
              </p>
            </Link>
            <Link href={{ pathname: "/hardware" }}>
              <p
                className={
                  "cursor-pointer flex-col text-base font-semibold px-4"
                }
              >
                Hardware
              </p>
            </Link>
            <Link href={{ pathname: "/software" }}>
              <p
                className={
                  "cursor-pointer flex-col text-base font-semibold px-4"
                }
              >
                Software
              </p>
            </Link>
            <Link href={{ pathname: "/people" }}>
              <p
                className={
                  "cursor-pointer flex-col text-base font-semibold px-4"
                }
              >
                People
              </p>
            </Link>
          </div>
        </div>
      </section>
      <section className={"section2advantages h-20 hidden md:block"}></section>
      <section
        className={
          "section3advantages block md:hidden py-8 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
        style={{ background: "#F4F4F4" }}
      >
        <div className={"pb-4"}>
          <p
            className={"text-2xl md:text-3xl font-bold"}
            style={{ letterSpacing: "1.5px" }}
          >
            Support your business efficiently
          </p>
        </div>
        <div>
          <p className={"text-base w-full md:w-2/5 pb-4"}>
            One stop seamless technology solution to help you achieve business
            goals and optimize your cost{" "}
          </p>
        </div>
        <Flickity
          className={"carousel"} // default ''
          elementType={"div"} // default 'div'
          options={flickityOptions2} // takes flickity options {}
          disableImagesLoaded={false} // default false
          reloadOnUpdate // default false
          static // default false
          // centerMode={true}
          // centerPadding={'30px'}
        >
          <div
            className={
              "flex-col flex bg-white p-4 w-4/5 md:w-96 rounded-xl mx-4 h-auto min-h-full"
            }
          >
            <div className={"min-h-full relative pb-8"} style={{}}>
              <img
                style={{ height: "50px", width: "auto" }}
                src="/image1-section2.png"
              ></img>
              <p className={"text-left py-3 font-bold "}>Hardware</p>
              <p>
                Optimize your cost by leasing and maintenances variety of
                electronic equipments
              </p>
              <div className={"absolute bottom-0"}>
                <Link href={{ pathname: "/hardware" }}>
                  <button className={"pt-4 font-bold text-purple-800"}>
                    Get yours&nbsp;{" "}
                    <ArrowRightOutlined
                      className={"relative"}
                      style={{ top: "-2.5px" }}
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div
            className={
              "flex-col flex bg-white p-4 w-4/5 md:w-96 rounded-xl mx-4 h-auto min-h-full"
            }
          >
            <div className={"min-h-full relative pb-8"} style={{}}>
              <img
                style={{
                  height: "50px",
                  width: "auto",
                  position: "relative",
                  left: "-25px",
                }}
                src="/image3-section2.png"
              ></img>
              <p className={"text-left py-3 font-bold "}>Software</p>
              <p>
                We support your companies to simplify and automate the process
                through digitalization
              </p>
              <div className={"absolute bottom-0"}>
                <Link href={{ pathname: "/software" }}>
                  <button className={"pt-4 font-bold text-purple-800"}>
                    Build now&nbsp;{" "}
                    <ArrowRightOutlined
                      className={"relative"}
                      style={{ top: "-2.5px" }}
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div
            className={
              "flex-col flex bg-white p-4 w-4/5 md:w-96 rounded-xl mx-4 h-auto min-h-full"
            }
          >
            <div className={"min-h-full relative pb-8"} style={{}}>
              <img
                style={{
                  height: "50px",
                  width: "auto",
                  position: "relative",
                  left: "-10px",
                }}
                src="/image2-section2.png"
              ></img>
              <p className={"text-left py-3 font-bold "}>People</p>
              <p>
                We help you reduce complexity in talent sourcing and management
              </p>
              <div className={"absolute bottom-0"}>
                <Link href={{ pathname: "/people" }}>
                  <button className={"pt-4 font-bold text-purple-800"}>
                    Setup your team&nbsp;{" "}
                    <ArrowRightOutlined
                      className={"relative"}
                      style={{ top: "-2.5px" }}
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Flickity>
      </section>
      <section
        className={
          "section3advantages hidden md:block py-8 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
        style={{ background: "#F4F4F4" }}
      >
        <div className={"pb-4"}>
          <p
            className={"text-2xl md:text-3xl font-bold"}
            style={{ letterSpacing: "1.5px" }}
          >
            Support your business efficiently
          </p>
        </div>
        <div>
          <p className={"text-base w-full md:w-2/5"}>
            One stop seamless technology solution to help you achieve business
            goals and optimize your cost{" "}
          </p>
        </div>
        <div className={"grid md:flex my-4 justify-center md:justify-between"}>
          <div
            className={
              "flex-col flex bg-white mr-0 md:mr-10 p-4 w-full md:w-96"
            }
          >
            <div className={"min-h-full relative pb-8"} style={{}}>
              <img
                style={{ height: "50px", width: "auto" }}
                src="/image1-section2.png"
              ></img>
              <p className={"text-left py-3 font-bold "}>Hardware</p>
              <p>
                Optimize your cost by leasing and maintenances variety of
                electronic equipments
              </p>
              <div className={"absolute bottom-0"}>
                <Link href={{ pathname: "/hardware" }}>
                  <button className={"pt-4 font-bold text-purple-800"}>
                    Get yours&nbsp;{" "}
                    <ArrowRightOutlined
                      className={"relative"}
                      style={{ top: "-2.5px" }}
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div
            className={
              "flex-col bg-white my-5 md:my-0 mx-0 md:mx-10 p-4 w-full md:w-96"
            }
          >
            <div className={"min-h-full relative pb-8"} style={{}}>
              <img
                style={{
                  height: "50px",
                  width: "auto",
                  position: "relative",
                  left: "-25px",
                }}
                src="/image3-section2.png"
              ></img>
              <p className={"text-left py-3 font-bold "}>Software</p>
              <p>
                We support your companies to simplify and automate the process
                through digitalization
              </p>
              <div className={"absolute bottom-0"}>
                <Link href={{ pathname: "/software" }}>
                  <button className={"pt-4 font-bold text-purple-800"}>
                    Build now&nbsp;{" "}
                    <ArrowRightOutlined
                      className={"relative"}
                      style={{ top: "-2.5px" }}
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div
            className={"flex-col bg-white mdl-0 md:ml-10 p-4 w-full md:w-96"}
          >
            <div className={"min-h-full relative pb-8"} style={{}}>
              <img
                style={{
                  height: "50px",
                  width: "auto",
                  position: "relative",
                  left: "-10px",
                }}
                src="/image2-section2.png"
              ></img>
              <p className={"text-left py-3 font-bold "}>People</p>
              <p>
                We help you reduce complexity in talent sourcing and management
              </p>
              <div className={"absolute bottom-0"}>
                <Link href={{ pathname: "/people" }}>
                  <button className={"pt-4 font-bold text-purple-800"}>
                    Setup your team&nbsp;{" "}
                    <ArrowRightOutlined
                      className={"relative"}
                      style={{ top: "-2.5px" }}
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className={'hidden md:block md:px-auto py-8 lg:px-28 xl:px-40'}>
                <div className={'pb-8'}>
                    <p className={'text-2xl md:text-3xl font-bold'} style={{letterSpacing:'1.5px'}}>Our Advantages</p>
                </div>
                <div className={'border-l border-r pr-4'}>
                <Tabs tabPosition={'left'} size={'large'}>
                    <TabPane tab="On demand service" key="1">
                        <div className={'flex-important'}>
                            <div className={'m-auto flex'}>
                                <img className={'w-40 h-56'} src='/advantage-animation1.png'></img>
                                <div className={'my-auto'}>
                                    <p className={'font-bold text-2xl pb-4'}>On demand services</p>
                                    <p className={''}>Transform your business with our custom solutions to optimize your cost and productivity.</p>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Reliable partner" key="2">
                        <div className={'flex-important'}>
                            <div className={'m-auto flex'}>
                                <div className={'my-auto'}>
                                    <p className={'font-bold text-2xl pb-4'}>Realiable partner</p>
                                    <p className={''}>A partner you can trust, with more than 15 years of experiences-we’re here for the long run. </p>
                                </div>
                                <img className={'w-40 h-56'} src='/advantage-animation2.png'></img>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Competitive rate" key="3">
                        <div className={'flex-important'}>
                            <div className={'m-auto flex'}>
                                <img className={'w-40 h-56'} src='/advantage-animation3.png'></img>
                                <div className={'my-auto'}>
                                    <p className={'font-bold text-2xl pb-4 '}>Competitive rates</p>
                                    <p className={''}>We offer the best services with the best price tailored to your needs.</p>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Cost efficient" key="4">
                        <div className={'flex-important'}>
                            <div className={'m-auto flex'}>
                                <div className={'my-auto'}>
                                    <p className={'font-bold text-2xl pb-4 '}>Cost efficient</p>
                                    <p className={''}>Customer driven, we help you grow and offer solutions to help optimized your bussiness. </p>
                                </div>
                                <img className={'w-40 h-56'} src='/advantage-animation4.png'></img>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
                </div>
            </section> */}
      <div className={"hidden md:block"}>
        <Fade ssrFadeout left opposite collapse when={isHiddenAnimation}>
          <section
            onClick={() => {
              onClickHiddenAnimation();
            }}
            className={`py-8 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20`}
          >
            <Slider
              slidesToShow={4}
              asNavFor={nav1}
              ref={(slider) => (slider2 = slider)}
              focusOnSelect={true}
            >
              <div
                className={
                  " cursor-pointer text-2xl px-10 py-20 w-full border-l border-r"
                }
              >
                <p>On demand service</p>
                <ArrowRightOutlined />
              </div>
              <div
                className={
                  " cursor-pointer text-2xl px-10 py-20 w-full border-r"
                }
              >
                <p>Reliable partner</p>
                <ArrowRightOutlined />
              </div>
              <div
                className={
                  " cursor-pointer text-2xl px-10 py-20 w-full border-r"
                }
              >
                <p>Competitive rate</p>
                <ArrowRightOutlined />
              </div>
              <div
                className={
                  " cursor-pointer text-2xl px-10 py-20 w-full border-r"
                }
              >
                <p>Cost efficient</p>
                <ArrowRightOutlined />
              </div>
            </Slider>
          </section>
        </Fade>
      </div>
      <div className={"hidden md:block"}>
        <Fade ssrFadeout bottom collapse when={!isHiddenAnimation}>
          <section
            className={
              "bg-green-600 py-8 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
            }
          >
            <div className={"text-center relative -top-4"}>
              <button
                type="text"
                className={"border px-4 py-2 rounded-full border-white"}
                style={{ zIndex: 51 }}
                onClick={onClickHiddenAnimation}
              >
                <p className={"text-white"}>X</p>
              </button>
            </div>
            <Slider
              dots={false}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              ref={(slider) => (slider1 = slider)}
              arrows={true}
              asNavFor={nav2}
              fade={isHiddenAnimation}
            >
              <div className={"flex-important"}>
                <div className={"m-auto flex"}>
                  <img
                    className={"w-40 h-56"}
                    src="/advantage-animation1.png"
                  ></img>
                  <div className={"my-auto"}>
                    <p className={"font-bold text-2xl pb-4 text-white"}>
                      On demand services
                    </p>
                    <p className={"text-white"}>
                      Transform your business with our custom solutions to
                      optimize your cost and productivity.
                    </p>
                  </div>
                </div>
              </div>
              <div className={"flex-important"}>
                <div className={"m-auto flex"}>
                  <div className={"my-auto"}>
                    <p className={"font-bold text-2xl pb-4 text-white"}>
                      Realiable partner
                    </p>
                    <p className={"text-white"}>
                      A partner you can trust, with more than 15 years of
                      experiences-we’re here for the long run.{" "}
                    </p>
                  </div>
                  <img
                    className={"w-40 h-56"}
                    src="/advantage-animation2.png"
                  ></img>
                </div>
              </div>
              <div className={"flex-important"}>
                <div className={"m-auto flex"}>
                  <img
                    className={"w-40 h-56"}
                    src="/advantage-animation3.png"
                  ></img>
                  <div className={"my-auto"}>
                    <p className={"font-bold text-2xl pb-4 text-white"}>
                      Competitive rates
                    </p>
                    <p className={"text-white"}>
                      We offer the best services with the best price tailored to
                      your needs.
                    </p>
                  </div>
                </div>
              </div>
              <div className={"flex-important"}>
                <div className={"m-auto flex"}>
                  <div className={"my-auto"}>
                    <p className={"font-bold text-2xl pb-4 text-white"}>
                      Cost efficient
                    </p>
                    <p className={"text-white"}>
                      Customer driven, we help you grow and offer solutions to
                      help optimized your bussiness.{" "}
                    </p>
                  </div>
                  <img
                    className={"w-40 h-56"}
                    src="/advantage-animation4.png"
                  ></img>
                </div>
              </div>
            </Slider>
          </section>
        </Fade>
      </div>
      <section className={"section4advantages py-10 px-4 block md:hidden"}>
        <Flickity
          className={"carousel"} // default ''
          elementType={"div"} // default 'div'
          options={flickityOptions} // takes flickity options {}
          disableImagesLoaded={false} // default false
          reloadOnUpdate // default false
          static // default false
        >
          <div className={"w-full"}>
            <div className={"w-40 h-56 m-auto"}>
              <img src="/advantage-animation1.png"></img>
            </div>
            <div>
              <p className={"pb-4 font-bold text-xl"}>On demand services</p>
              <p>
                Transform your business with our custom solutions to optimize
                your cost and productivity.
              </p>
            </div>
          </div>
          <div className={"w-full"}>
            <div className={"w-40 h-56 m-auto"}>
              <img src="/advantage-animation2.png"></img>
            </div>
            <div>
              <p className={"pb-4 font-bold text-xl"}>Realiable partner</p>
              <p>
                A partner you can trust, with more than 15 years of
                experiences-we’re here for the long run.
              </p>
            </div>
          </div>
          <div className={"w-full"}>
            <div className={"w-40 h-56 m-auto"}>
              <img src="/advantage-animation3.png"></img>
            </div>
            <div>
              <p className={"pb-4 font-bold text-xl"}>Competitive rates</p>
              <p>
                We offer the best services with the best price tailored to your
                needs.
              </p>
            </div>
          </div>
          <div className={"w-full"}>
            <div className={"w-40 h-56 m-auto"}>
              <img src="/advantage-animation4.png"></img>
            </div>
            <div>
              <p className={"pb-4 font-bold text-xl"}>Cost efficient</p>
              <p>
                Customer driven, we help you grow and offer solutions to help
                optimized your bussiness.{" "}
              </p>
            </div>
          </div>
        </Flickity>
      </section>
      <section
        className={
          "section5landingpage px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
      >
        <div
          className={" md:flex relative justify-between "}
          style={{ top: "40%" }}
        >
          <div
            className={
              "flex-col text-2xl md:text-4xl text-black -top-4 md:top-0 relative gilroy-bold"
            }
            style={{}}
          >
            <p>Let’s be better together</p>
          </div>
          <div className={"flex-col w-auto"}>
            <button
              className={
                "text-black flex border-2 text-base md:text-xl border-black px-3 py-2 md:px-4 md:py-3 -mt-2 md:right-20 relative focus:outline-none gilroy-medium hover:text-white hover:bg-black"
              }
            >
              Contact Sales &nbsp;
              <ArrowRightOutlined className={"pt-1"} />
            </button>
          </div>
        </div>
      </section>
      {/* <section className={'section5landingpage'} style={{backgroundColor:'#93D9B5'}}>
                <div className={' md:flex relative justify-between px-4 md:px-20 lg:px-28 xl:px-40'}style={{top:'40%'}}>
                    <div className={'flex-col text-2xl md:text-3xl text-white font-bold -top-4 md:top-0 relative'} style={{}}>
                        <p>Let’s be better together</p>
                    </div>
                    <div className={'flex-col w-auto'}>
                        <button className={'text-white flex border-2 text-base md:text-lg border-white px-4 mt-1 focus:outline-none'}>Contact Sales &nbsp;
                            <ArrowRightOutlined className={'pt-1'}/>
                        </button>

                    </div>
                </div>
            </section> */}
    </Layout>
  );
}

export default Advantages;
