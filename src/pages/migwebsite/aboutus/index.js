import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";
import { Button, Card } from "antd";
import Head from "next/head";
import Link from "next/link";
import Linkk from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Slider from "react-slick";

import LayoutFormContactUs from "../../../components/migwebsite/layout-form-contact-us.js";
import Layout from "../../../components/migwebsite/layout.js";
import en from "../../../locales/en";
import id from "../../../locales/id";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function AboutUs({}) {
  const router = useRouter();

  const { locale } = router;
  const t = locale === "en" ? en : id;
  const sliderSettingsPhone = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
  };
  const sliderSettingsPhone2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
  };

  return (
    <Layout>
      <Head>
        <title>{t.aboutusmetatitle}</title>
        <meta name="description" content={t.aboutusmetadescription} />
      </Head>

      <section
        className={
          "section2people pt-8 md:pt-16 pb-5 lg:pb-[40px] px-4 lg:px-[113.5px] text-center"
        }
      >
        <div className={""}>
          <h3
            style={{ lineHeight: "120%" }}
            className={
              "text-2xl lg:text-[32px] font-gilroysemibold text-blackmig"
            }
          >
            {t.aboutustitle}
          </h3>

          <p
            style={{ lineHeight: "150%" }}
            className={
              "text-sm lg:text-base text-blackmig font-gilroyregular mt-12 lg:mt-4 px-4 lg:px-0"
            }
          >
            {t.aboutussubtitle}
          </p>
        </div>
      </section>
      <section className={"block bg-white py-4 lg:py-6 px-4 lg:px-[113.5px]"}>
        <h5
          style={{ lineHeight: "120%" }}
          className={"font-gilroysemibold text-left pb-0 text-base lg:text-xl"}
        >
          {t.whoweare}
        </h5>
        {/* <div className={'block md:hidden flex-col py-4 md:py-4 m-auto'}>
                        <img src="/image-aboutus.png" className={'block'} style={{width:'400px',height:'auto',margin:'0 auto'}}></img>
                    </div> */}
        <p
          style={{ lineHeight: "150%" }}
          className={"mt-3 lg:mt-4 font-gilroyregular text-sm lg:text-base"}
        >
          {t.whowearedescription}
        </p>
        <p
          style={{ lineHeight: "150%" }}
          className={"mt-3 lg:mt-4 font-gilroyregular text-sm lg:text-base"}
        >
          {t.whowearedescription2}
        </p>
        {locale == "id" && (
          <div>
            <p
              style={{ lineHeight: "150%" }}
              className={"mt-3 lg:mt-4 font-gilroyregular text-sm lg:text-base"}
            >
              {t.whowearedescription3}
            </p>
            <p
              style={{ lineHeight: "150%" }}
              className={"mt-3 lg:mt-4 font-gilroyregular text-sm lg:text-base"}
            >
              {t.whowearedescription4}
            </p>
          </div>
        )}

        <p
          style={{ lineHeight: "120%" }}
          className={"mt-4 text-sm lg:text-xl font-gilroyregular"}
        >
          {t.whowearejoinmig}{" "}
          <Link href="joinourteam" legacyBehavior>
            <em className={"cursor-pointer text-primarygreen underline"}>
              {t.whowearejoinmiglink}
            </em>
          </Link>{" "}
        </p>
      </section>
      <section
        className={"pt-12 lg:pt-[40px] pb-12 lg:pb-8 px-4 lg:px-[113.5px]"}
      >
        <h5
          style={{ lineHeight: "120%" }}
          className={"text-base lg:text-xl font-gilroysemibold text-blackmig"}
        >
          {t.supportyourbusiness}
        </h5>
        <div>
          <p
            style={{ lineHeight: "150%" }}
            className={
              "text-sm lg:text-base mt-3 lg:-mb-24 lg:mt-4 font-gilroyregular"
            }
          >
            {t.supportyourbusinessdetail}{" "}
          </p>
        </div>
        {/* hardware, software, talent */}
        <div
          className={
            "mt-[118px] hidden w-full lg:max-w-[1122px] lg:flex lg:flex-wrap lg:justify-between mx-auto"
          }
        >
          <div className={"flex flex-col items-center"}>
            <div
              className={
                "bg-lightblue hover:shadow-2xl rounded-xl w-[332px] h-[360px] pb-8 px-4 relative pt-24 mt-24"
              }
            >
              <div className={"grid justify-items-center"}>
                <img
                  src="/image/landingpage/hero-talent.png"
                  alt=""
                  className={
                    "absolute w-[241px] h-[139px] hover:w-[300px] hover:h-[180px] -top-20"
                  }
                />
              </div>
              <div>
                <p
                  style={{ lineHeight: "120%" }}
                  className={
                    "text-center text-2xl text-accentblue font-gilroybold font-bold"
                  }
                >
                  Hardware
                </p>
                {/* <p
                  className={
                    "text-center text-blackmig text-base font-gilroysemibold gilroy-semibold mt-1"
                  }
                >
                  Lighten up your heavy capital in IT infrastructure
                </p> */}
                <p
                  style={{ lineHeight: "150%" }}
                  className={
                    "text-center text-blackmig text-xl font-gilroyregular h-[130px] mt-5"
                  }
                >
                  {t.aboutushardwaredescription}
                </p>

                <div className={"text-center"}>
                  <Linkk href="/hardware" legacyBehavior>
                    <button
                      className={
                        "text-xl text-center rounded text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 focus:outline-none gilroy-medium"
                      }
                    >
                      <div className={"flex flex-row justify-between"}>
                        <p className={"px-1"}>
                          {locale == "en" ? "Get Yours" : "Cek pilihan"}
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
            </div>
          </div>
          <div className={"flex flex-col items-center"}>
            <div
              className={
                "bg-lightgreen hover:shadow-2xl rounded-xl w-[332px] h-[360px] pb-8 px-4 relative pt-24 mt-24"
              }
            >
              <div className={"grid justify-items-center"}>
                <img
                  src="/image/landingpage/hero-software.png"
                  alt=""
                  className={
                    "absolute w-[241px] h-[139px] hover:w-[300px] hover:h-[180px] -top-20"
                  }
                />
              </div>
              <div>
                <p
                  style={{ lineHeight: "120%" }}
                  className={
                    "text-center text-2xl text-darkgreen font-gilroybold font-bold"
                  }
                >
                  Software
                </p>
                {/* <p
                  style={{ lineHeight: "150%" }}
                  className={
                    "text-center text-blackmig text-base font-gilroysemibold font-gilroysemibold mt-1 pb-[42.5px]"
                  }
                >
                  Delivering custom-made software
                </p> */}
                <p
                  className={
                    "text-center text-blackmig text-xl font-gilroyregular h-[130px] mt-5"
                  }
                >
                  {t.aboutussoftwaredescription}
                </p>

                <div className={"text-center"}>
                  <Linkk href="/software" legacyBehavior>
                    <button
                      className={
                        "text-xl text-center rounded text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 focus:outline-none gilroy-medium"
                      }
                    >
                      <div className={"flex flex-row justify-between"}>
                        <p className={"px-1"}>
                          {locale == "en" ? "Build Now" : "Mulai sekarang"}
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
            </div>
          </div>
          <div className={"flex flex-col items-center"}>
            <div
              className={
                "bg-lightgrey hover:shadow-2xl rounded-xl w-[332px] h-[360px] pb-8 px-4 relative pt-24 mt-24"
              }
            >
              <div className={"grid justify-items-center"}>
                <img
                  src="/image/landingpage/hero-hardware.png"
                  alt=""
                  className={
                    "absolute w-[241px] h-[139px] hover:w-[300px] hover:h-[180px] -top-20"
                  }
                />
              </div>
              <div>
                <p
                  style={{ lineHeight: "120%" }}
                  className={
                    "text-center text-2xl text-accentpurple font-gilroybold font-bold"
                  }
                >
                  Talents
                </p>
                {/* <p
                  className={
                    "text-center text-blackmig text-base font-gilroysemibold mt-1 pb-8"
                  }
                >
                  Our people, your growth
                </p> */}
                <p
                  style={{ lineHeight: "150%" }}
                  className={
                    "text-center text-blackmig text-xl font-gilroyregular h-[130px] mt-5"
                  }
                >
                  {t.aboutustalentdescription}
                </p>

                <div className={"text-center"}>
                  <Linkk href="/talents" legacyBehavior>
                    <button
                      className={
                        "text-xl text-center text-white rounded border-2 bg-primarygreen border-primarygreen px-4 py-2 focus:outline-none gilroy-medium"
                      }
                    >
                      <div className={"flex flex-row justify-between"}>
                        <p className={"px-1"}>
                          {locale == "en" ? "Hire Now" : "Dirikan tim Anda"}
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
            </div>
          </div>
        </div>
        <div className={"block md:hidden mt-3"}>
          <Slider {...sliderSettingsPhone}>
            <div className={"flex flex-col items-center mt-20"}>
              <div
                className={
                  "bg-lightblue hover:shadow-2xl rounded-xl w-[332px] h-[360px] pb-8 px-4 relative pt-24"
                }
              >
                <div className={"grid justify-items-center"}>
                  <img
                    src="/image/landingpage/hero-talent.png"
                    alt=""
                    className={
                      "absolute w-[241px] h-[139px] hover:w-[300px] hover:h-[180px] -top-20"
                    }
                  />
                </div>
                <div>
                  <p
                    style={{ lineHeight: "120%" }}
                    className={
                      "text-center text-2xl text-accentblue font-gilroybold font-bold"
                    }
                  >
                    Hardware
                  </p>
                  {/* <p
                  className={
                    "text-center text-blackmig text-base font-gilroysemibold gilroy-semibold mt-1"
                  }
                >
                  Lighten up your heavy capital in IT infrastructure
                </p> */}
                  <p
                    style={{ lineHeight: "150%" }}
                    className={
                      "text-center text-blackmig text-xl font-gilroyregular h-[130px] mt-5"
                    }
                  >
                    {t.aboutushardwaredescription}
                  </p>

                  <div className={"text-center"}>
                    <Linkk href="/hardware" legacyBehavior>
                      <button
                        className={
                          "text-xl text-center rounded text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 focus:outline-none gilroy-medium"
                        }
                      >
                        <div className={"flex flex-row justify-between"}>
                          <p className={"px-1"}>
                            {locale == "en" ? "Get Yours" : "Cek pilihan"}
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
              </div>
            </div>
            <div className={"flex flex-col items-center mt-20"}>
              <div
                className={
                  "bg-lightgreen hover:shadow-2xl rounded-xl w-[332px] h-[360px] pb-8 px-4 relative pt-24"
                }
              >
                <div className={"grid justify-items-center"}>
                  <img
                    src="/image/landingpage/hero-software.png"
                    alt=""
                    className={
                      "absolute w-[241px] h-[139px] hover:w-[300px] hover:h-[180px] -top-20"
                    }
                  />
                </div>
                <div>
                  <p
                    style={{ lineHeight: "120%" }}
                    className={
                      "text-center text-2xl text-darkgreen font-gilroybold font-bold"
                    }
                  >
                    Software
                  </p>
                  {/* <p
                  style={{ lineHeight: "150%" }}
                  className={
                    "text-center text-blackmig text-base font-gilroysemibold font-gilroysemibold mt-1 pb-[42.5px]"
                  }
                >
                  Delivering custom-made software
                </p> */}
                  <p
                    className={
                      "text-center text-blackmig text-xl font-gilroyregular h-[130px] mt-5"
                    }
                  >
                    {t.aboutussoftwaredescription}
                  </p>

                  <div className={"text-center"}>
                    <Linkk href="/software" legacyBehavior>
                      <button
                        className={
                          "text-xl text-center rounded text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 focus:outline-none gilroy-medium "
                        }
                      >
                        <div className={"flex flex-row justify-between"}>
                          <p className={"px-1"}>
                            {locale == "en" ? "Build Now" : "Mulai sekarang"}
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
              </div>
            </div>
            <div className={"flex flex-col items-center mt-20"}>
              <div
                className={
                  "bg-lightgrey hover:shadow-2xl rounded-xl w-[332px] h-[360px] pb-8 px-4 relative pt-24"
                }
              >
                <div className={"grid justify-items-center"}>
                  <img
                    src="/image/landingpage/hero-hardware.png"
                    alt=""
                    className={
                      "absolute w-[241px] h-[139px] hover:w-[300px] hover:h-[180px] -top-20"
                    }
                  />
                </div>
                <div>
                  <p
                    style={{ lineHeight: "120%" }}
                    className={
                      "text-center text-2xl text-accentpurple font-gilroybold font-bold"
                    }
                  >
                    Talents
                  </p>
                  {/* <p
                  className={
                    "text-center text-blackmig text-base font-gilroysemibold mt-1 pb-8"
                  }
                >
                  Our people, your growth
                </p> */}
                  <p
                    style={{ lineHeight: "150%" }}
                    className={
                      "text-center text-blackmig text-xl font-gilroyregular h-[130px] mt-5"
                    }
                  >
                    {t.aboutustalentdescription}
                  </p>

                  <div className={"text-center"}>
                    <Linkk href="/talents" legacyBehavior>
                      <button
                        className={
                          "text-xl text-center text-white rounded border-2 bg-primarygreen border-primarygreen px-4 py-2 focus:outline-none gilroy-medium "
                        }
                      >
                        <div className={"flex flex-row justify-between"}>
                          <p className={"px-1"}>
                            {locale == "en" ? "Hire Now" : "Dirikan tim Anda"}
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
              </div>
            </div>
          </Slider>
        </div>
        <div className={"hidden md:block lg:hidden mt-3"}>
          <Slider {...sliderSettingsPhone2}>
            <div className={"flex flex-col items-center mt-20"}>
              <div
                className={
                  "bg-lightblue hover:shadow-2xl rounded-xl w-[332px] h-[360px] pb-8 px-4 relative pt-24"
                }
              >
                <div className={"grid justify-items-center"}>
                  <img
                    src="/image/landingpage/hero-talent.png"
                    alt=""
                    className={
                      "absolute w-[241px] h-[139px] hover:w-[300px] hover:h-[180px] -top-20"
                    }
                  />
                </div>
                <div>
                  <p
                    style={{ lineHeight: "120%" }}
                    className={
                      "text-center text-2xl text-accentblue font-gilroybold font-bold"
                    }
                  >
                    Hardware
                  </p>
                  {/* <p
                  className={
                    "text-center text-blackmig text-base font-gilroysemibold gilroy-semibold mt-1"
                  }
                >
                  Lighten up your heavy capital in IT infrastructure
                </p> */}
                  <p
                    style={{ lineHeight: "150%" }}
                    className={
                      "text-center text-blackmig text-xl font-gilroyregular h-[130px] mt-5"
                    }
                  >
                    {t.aboutushardwaredescription}
                  </p>

                  <div className={"text-center"}>
                    <Linkk href="/hardware" legacyBehavior>
                      <button
                        className={
                          "text-xl text-center rounded text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 focus:outline-none gilroy-medium "
                        }
                      >
                        <div className={"flex flex-row justify-between"}>
                          <p className={"px-1"}>
                            {locale == "en" ? "Get Yours" : "Cek pilihan"}
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
              </div>
            </div>
            <div className={"flex flex-col items-center mt-20"}>
              <div
                className={
                  "bg-lightgreen hover:shadow-2xl rounded-xl w-[332px] h-[360px] pb-8 px-4 relative pt-24"
                }
              >
                <div className={"grid justify-items-center"}>
                  <img
                    src="/image/landingpage/hero-software.png"
                    alt=""
                    className={
                      "absolute w-[241px] h-[139px] hover:w-[300px] hover:h-[180px] -top-20"
                    }
                  />
                </div>
                <div>
                  <p
                    style={{ lineHeight: "120%" }}
                    className={
                      "text-center text-2xl text-darkgreen font-gilroybold font-bold"
                    }
                  >
                    Software
                  </p>
                  {/* <p
                  style={{ lineHeight: "150%" }}
                  className={
                    "text-center text-blackmig text-base font-gilroysemibold font-gilroysemibold mt-1 pb-[42.5px]"
                  }
                >
                  Delivering custom-made software
                </p> */}
                  <p
                    className={
                      "text-center text-blackmig text-xl font-gilroyregular h-[130px] mt-5"
                    }
                  >
                    {t.aboutussoftwaredescription}
                  </p>

                  <div className={"text-center"}>
                    <Linkk href="/software" legacyBehavior>
                      <button
                        className={
                          "text-xl text-center rounded text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 focus:outline-none gilroy-medium "
                        }
                      >
                        <div className={"flex flex-row justify-between"}>
                          <p className={"px-1"}>
                            {locale == "en" ? "Build Now" : "Mulai sekarang"}
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
              </div>
            </div>
            <div className={"flex flex-col items-center mt-20"}>
              <div
                className={
                  "bg-lightgrey hover:shadow-2xl rounded-xl w-[332px] h-[360px] pb-8 px-4 relative pt-24"
                }
              >
                <div className={"grid justify-items-center"}>
                  <img
                    src="/image/landingpage/hero-hardware.png"
                    alt=""
                    className={
                      "absolute w-[241px] h-[139px] hover:w-[300px] hover:h-[180px] -top-20"
                    }
                  />
                </div>
                <div>
                  <p
                    style={{ lineHeight: "120%" }}
                    className={
                      "text-center text-2xl text-accentpurple font-gilroybold font-bold"
                    }
                  >
                    Talents
                  </p>
                  {/* <p
                  className={
                    "text-center text-blackmig text-base font-gilroysemibold mt-1 pb-8"
                  }
                >
                  Our people, your growth
                </p> */}
                  <p
                    style={{ lineHeight: "150%" }}
                    className={
                      "text-center text-blackmig text-xl font-gilroyregular h-[130px] mt-5"
                    }
                  >
                    {t.aboutustalentdescription}
                  </p>

                  <div className={"text-center"}>
                    <Linkk href="/talents" legacyBehavior>
                      <button
                        className={
                          "text-xl text-center text-white rounded border-2 bg-primarygreen border-primarygreen px-4 py-2 focus:outline-none gilroy-medium "
                        }
                      >
                        <div className={"flex flex-row justify-between"}>
                          <p className={"px-1"}>
                            {locale == "en" ? "Hire Now" : "Dirikan tim Anda"}
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
              </div>
            </div>
          </Slider>
        </div>
      </section>

      <section
        className={
          "px-4 lg:px-[113.5px] pt-4 lg:pt-8 lg:pb-[145px] bg-transp60"
        }
      >
        <div>
          <h4
            style={{ lineHeight: "120%" }}
            className={"font-gilroysemibold text-2xl text-blackmig pb-2"}
          >
            {t.aboutuslocation}
          </h4>
          <h5
            style={{ lineHeight: "120%" }}
            className={"font-gilroysemibold pb-2 text-xl text-blackmig"}
          >
            {t.aboutusheadquarter}
          </h5>
          <p style={{ lineHeight: "120%" }} className={"text-base "}>
            <span className="font-gilroysemibold text-darkgrey">
              {locale == "en" ? "Location" : "Lokasi"} :{" "}
            </span>
            <span className={"text-blackmig font-gilroyregular"}>
              {t.aboutusaddress}
            </span>
          </p>

          <div className={"flex flex-row mt-3"}>
            <p
              style={{ lineHeight: "150%" }}
              className={"font-gilroysemibold text-base text-darkgrey"}
            >
              {locale == "en" ? "Phone" : "Telepon"}:&nbsp;
            </p>
            <a href="tel:+62218314522">
              <p
                style={{ lineHeight: "150%" }}
                className={"text-accentblue text-base underline"}
              >
                +62-21-831-4522
              </p>
            </a>
          </div>
          <div className={"flex flex-row mt-3"}>
            <p
              style={{ lineHeight: "150%" }}
              className={"font-gilroysemibold text-base text-darkgrey"}
            >
              Email:&nbsp;
            </p>
            <a
              href="mailto:help@mitrasolusi.group"
              style={{ lineHeight: "150%" }}
              className={"text-accentblue text-base underline"}
            >
              help@mitrasolusi.group
            </a>
          </div>
          <h4
            style={{ lineHeight: "120%" }}
            className={
              "py-4 text-blackmig font-gilroysemibold text-xl lg:text-2xl"
            }
          >
            {locale == "en" ? "Coverages" : "Area jangkauan kami"}
          </h4>
          <div
            className={"bg-white p-6 rounded-lg"}
            style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
          >
            <div
              className={
                "hidden lg:flex lg:flex-row lg:justify-between text-[18px]"
              }
            >
              <div>
                <ul>
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
                </ul>
              </div>
              <div>
                <ul>
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
                </ul>
              </div>
              <div>
                <ul>
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
            </div>
            <div
              className={"lg:hidden flex flex-row justify-between text-[18px]"}
            >
              <div>
                <ul>
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
                </ul>
              </div>
              <div>
                <ul>
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
            </div>
          </div>
        </div>
      </section>
      <section
        className={
          "youronestop hidden lg:flex lg:flex-row lg:justify-between bg-bgfooter pt-[31px] h-[173px]"
        }
      >
        <div className={"justify-start self-end"}>
          <img
            style={{ width: "332px", height: "142px" }}
            src="/image/landingpage/footer-left.png"
          />
        </div>
        <div className={"container w-1/2 mx-auto"}>
          <div
            className={
              "bg-white border-3 mx-auto max-w-[645px] border-solid shadow-2xl rounded-lg text-center -mt-[144px] py-[31.38px]  px-[31.38px]"
            }
          >
            <h4
              style={{ lineHeight: "120%" }}
              className={"text-2xl font-gilroysemibold text-black"}
            >
              {t.contactussectiontitle}
            </h4>
            <div
              className={
                "mt-3.5 text-base font-gilroyregular text-center text-black"
              }
            >
              <p style={{ lineHeight: "120%" }}>
                {t.contactussectionsubtitle1}
              </p>
              <p style={{ lineHeight: "120%" }}>
                {t.contactussectionsubtitle2}
              </p>
            </div>
            <div className="mt-3.5 flex flex-row justify-center">
              <div className={"mr-3.5"}>
                <Linkk href="/contactus" legacyBehavior>
                  <button
                    className={
                      "text-sm px-4 py-2 text-white border-2 rounded bg-primarygreen border-primarygreen"
                    }
                  >
                    <p className={"text-base font-gilroysemibold"}>
                      {t.ctacontactuslandingpage}
                    </p>
                  </button>
                </Linkk>
              </div>
              <div>
                <Linkk href="/aboutus" legacyBehavior>
                  <button
                    className={
                      "text-sm px-4 py-2 text-primarygreen border-2 rounded bg-white border-primarygreen"
                    }
                  >
                    <p className={"text-base font-gilroysemibold"}>
                      {t.ctalearnmorelandingpage}
                    </p>
                  </button>
                </Linkk>
              </div>
            </div>
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
        className={"contactusphone mt-[100px] block lg:hidden bg-bgfooter pt-8"}
      >
        <div className={"container mx-auto"}>
          <div
            className={
              "bg-white border-3 border-solid shadow-2xl rounded-[8px] text-center mx-5  -mt-24 py-4 px-8"
            }
          >
            <p className={"text-xl font-gilroysemibold"}>
              {t.contactussectiontitle}
            </p>
            <p className={" text-sm font-gilroyregular"}>
              {t.contactussectionsubtitle1}
            </p>
            <p className={"text-sm font-gilroyregular"}>
              {t.contactussectionsubtitle2}
            </p>
            <div className="mt-4 flex flex-row justify-center">
              <div className={"mr-1.5"}>
                <Linkk href="/contactus" legacyBehavior>
                  <button
                    className={
                      "text-sm px-4 py-2 text-white border-2 rounded bg-primarygreen border-primarygreen"
                    }
                  >
                    <p className={"text-base font-gilroysemibold"}>
                      {t.ctacontactuslandingpage}
                    </p>
                  </button>
                </Linkk>
              </div>
              <div>
                <Linkk href="/aboutus" legacyBehavior>
                  <button
                    className={
                      "text-sm px-4 py-2 text-primarygreen border-2 rounded bg-white border-primarygreen"
                    }
                  >
                    <p className={"text-base font-gilroysemibold"}>
                      {t.ctalearnmorelandingpage}
                    </p>
                  </button>
                </Linkk>
              </div>
            </div>
          </div>
        </div>
        <div className={"flex justify-between self-end mt-[7.61px]"}>
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

export default AboutUs;
