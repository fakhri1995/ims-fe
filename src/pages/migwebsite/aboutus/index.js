import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";
import { Button, Card } from "antd";
import Head from "next/head";
import Link from "next/link";
import Linkk from "next/link";
import { useRouter } from "next/router";
import React from "react";

import LayoutFormContactUs from "../../../components/migwebsite/layout-form-contact-us.js";
import Layout from "../../../components/migwebsite/layout.js";
import en from "../../../locales/en";
import id from "../../../locales/id";

function AboutUs({}) {
  const router = useRouter();

  const { locale } = router;
  const t = locale === "en" ? en : id;
  return (
    <Layout>
      <Head>
        <title>{t.aboutusmetatitle}</title>
        <meta name="description" content={t.aboutusmetadescription} />
      </Head>

      <section
        className={
          "section2people pt-8 md:pt-[16] pb-5 md:pb-[40px] px-4 md:px-[112px] text-center"
        }
      >
        <div className={""}>
          <h1
            style={{ lineHeight: "120%" }}
            className={
              "text-2xl md:text-[36px] font-gilroysemibold text-blackmig"
            }
          >
            {t.aboutustitle}
          </h1>

          <p
            style={{ lineHeight: "150%" }}
            className={
              "text-sm md:text-xl text-blackmig font-gilroyregular mt-12 md:mt-4 px-4 md:px-0"
            }
          >
            {t.aboutussubtitle}
          </p>
        </div>
      </section>
      <section className={"block bg-white py-4 md:py-6 px-4 md:px-[112px]"}>
        <h2
          style={{ lineHeight: "120%" }}
          className={
            "font-gilroysemibold text-left pb-0 text-base md:text-[32px]"
          }
        >
          {t.whoweare}
        </h2>
        {/* <div className={'block md:hidden flex-col py-4 md:py-4 m-auto'}>
                        <img src="/image-aboutus.png" className={'block'} style={{width:'400px',height:'auto',margin:'0 auto'}}></img>
                    </div> */}
        <p
          style={{ lineHeight: "150%" }}
          className={"mt-3 md:mt-4 font-gilroyregular text-sm md:text-xl"}
        >
          {t.whowearedescription}
        </p>

        <p
          style={{ lineHeight: "120%" }}
          className={"mt-4 text-sm md:text-xl font-gilroyregular"}
        >
          <Link href="joinourteam">
            <em className={"cursor-pointer text-primarygreen underline"}>
              Careers
            </em>
          </Link>{" "}
          at MIG offer meaningful work to be better together
        </p>
      </section>
      <section
        className={"pt-12 md:pt-[40px] pb-12 md:pb-8 px-4 md:px-[112px]"}
      >
        <h2
          style={{ lineHeight: "120%" }}
          className={
            "text-base md:text-[32px] font-gilroysemibold text-blackmig"
          }
        >
          {t.supportyourbusiness}
        </h2>
        <div>
          <p
            style={{ lineHeight: "150%" }}
            className={"text-sm md:text-xl mt-3 md:mt-4 font-gilroyregular"}
          >
            {t.supportyourbusinessdetail}{" "}
          </p>
        </div>
        {/* hardware, software, talent */}
        <div className={"mt-[118px] w-[1122px] flex flex-row justify-between"}>
          <div className={"flex flex-col items-center"}>
            <div
              className={
                "bg-lightblue hover:shadow-2xl rounded-xl w-[332px] pb-8 px-4 relative pt-24"
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
                    "text-center text-blackmig text-xl font-gilroyregular mt-5"
                  }
                >
                  Optimize your cost by leasing and maintenances variety of
                  electronic equipments
                </p>

                <div className={"text-center mt-5"}>
                  <Linkk href="/hardware">
                    <button
                      className={
                        "text-xl text-center rounded text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 focus:outline-none gilroy-medium bg-white"
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
          <div className={"flex flex-col items-center"}>
            <div
              className={
                "bg-lightgreen hover:shadow-2xl rounded-xl w-[332px] pb-8 px-4 relative pt-24"
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
                    "text-center text-blackmig text-xl font-gilroyregular pb-[42.5px] mt-5"
                  }
                >
                  We support your companies to simplify and automate the process
                  through digitalization
                </p>

                <div className={"text-center"}>
                  <Linkk href="/software">
                    <button
                      className={
                        "text-xl text-center rounded text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 focus:outline-none gilroy-medium bg-white"
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
          <div className={"flex flex-col items-center"}>
            <div
              className={
                "bg-lightgrey hover:shadow-2xl rounded-xl w-[332px] pb-8 px-4 relative pt-24"
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
                    "text-center text-blackmig text-xl font-gilroyregular pb-8 mt-5"
                  }
                >
                  We help you reduce complexity in talent sourcing and
                  management
                </p>

                <div className={"text-center"}>
                  <Linkk href="/talents">
                    <button
                      className={
                        "text-xl text-center text-white rounded border-2 bg-primarygreen border-primarygreen px-4 py-2 focus:outline-none gilroy-medium bg-white"
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
        {/* <div className={"hidden md:flex md:flex-row mt-4"}>
          <div
            className={
              "flex-col flex bg-white mr-0 p-3 border-2 w-[392px] mr-5 border-dividermig rounded-lg hover:shadow-lg"
            }
          >
            <div>
              <img
                src="/image/navbar/hardware.svg"
                className={"w-[32px] h-[32px]"}
              />
              <p
                className={
                  "text-left mt-[11px] font-gilroysemibold text-blackmig text-base"
                }
              >
                Hardware
              </p>
              <p className={"font-gilroyregular text-base mt-2"}>
                {t.hardwaresubtitle}
              </p>
              <div className={"flex justify-end mt-4"}>
                <Link href={{ pathname: "/hardware" }}>
                  <a
                    className={
                      "flex flex-row justify-between items-center w-[133px] h-[40px] px-4 py-2"
                    }
                  >
                    <p
                      className={
                        "font-gilroysemibold text-base text-primarygreen"
                      }
                    >
                      {t.hardwarebuttontitleaboutus}
                    </p>
                    <img
                      src="/image/landingpage/arrow_right_alt.png"
                      className={"w-5 h-5"}
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div
            className={
              "flex-col flex bg-white mr-0 p-3 border-2 w-[392px] mr-5 border-dividermig rounded-lg hover:shadow-lg"
            }
          >
            <div>
              <img
                src="/image/navbar/software.svg"
                className={"w-[32px] h-[32px]"}
              />
              <p
                className={
                  "text-left mt-[11px] font-gilroysemibold text-blackmig text-base"
                }
              >
                Software
              </p>
              <p className={"font-gilroyregular text-base mt-2"}>
                {t.softwaresubtitle}
              </p>
              <div className={"flex justify-end mt-4"}>
                <Link href={{ pathname: "/software" }}>
                  <a
                    className={
                      "flex flex-row justify-between items-center w-[133px] h-[40px] px-4 py-2"
                    }
                  >
                    <p
                      className={
                        "font-gilroysemibold text-base text-primarygreen"
                      }
                    >
                      {t.softwarebuttontitle}
                    </p>
                    <img
                      src="/image/landingpage/arrow_right_alt.png"
                      className={"w-5 h-5"}
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div
            className={
              "flex-col flex bg-white mr-0 p-3 border-2 w-[392px] border-dividermig rounded-lg hover:shadow-lg"
            }
          >
            <div>
              <img
                src="/image/navbar/talents.svg"
                className={"w-[32px] h-[32px]"}
              />
              <p
                className={
                  "text-left mt-[11px] font-gilroysemibold text-blackmig text-base"
                }
              >
                Talents
              </p>
              <p className={"font-gilroyregular text-base mt-2"}>
                {t.talentsubtitleaboutus}
              </p>
              <div className={"flex justify-end mt-4"}>
                <Link href={{ pathname: "/talent" }}>
                  <a
                    className={
                      "flex flex-row justify-between items-center w-[190px] h-[40px] px-4 py-2"
                    }
                  >
                    <p
                      className={
                        "font-gilroysemibold text-base text-primarygreen"
                      }
                    >
                      {t.talentbuttontitleaboutus}
                    </p>
                    <img
                      src="/image/landingpage/arrow_right_alt.png"
                      className={"w-5 h-5"}
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div> */}
        <div className={"block md:hidden mt-3"}>
          <div
            className={
              "flex-col flex bg-white mr-0 p-3 border-2 w-[100%] border-dividermig rounded-lg"
            }
            style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
          >
            <div>
              <img
                src="/image/navbar/hardware.svg"
                className={"w-[32px] h-[32px]"}
              />
              <p
                className={
                  "text-left mt-[11px] font-gilroysemibold text-blackmig text-base"
                }
              >
                Hardware
              </p>
              <p className={"font-gilroyregular text-sm text-blackmig mt-2"}>
                Optimize your cost by leasing and maintenances variety of
                electronic equipments
              </p>
              <div className={"flex justify-end mt-4"}>
                <Link href={{ pathname: "/hardware" }}>
                  <a
                    className={
                      "flex flex-row justify-between items-center w-[133px] h-[40px] px-4 py-2"
                    }
                  >
                    <p
                      className={
                        "font-gilroysemibold text-base text-primarygreen"
                      }
                    >
                      Get yours
                    </p>
                    <img
                      src="/image/landingpage/arrow_right_alt.png"
                      className={"w-5 h-5"}
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div
            className={
              "flex-col flex bg-white mr-0 p-3 mt-3 border-2 w-[100%] border-dividermig rounded-lg"
            }
            style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
          >
            <div>
              <img
                src="/image/navbar/software.svg"
                className={"w-[32px] h-[32px]"}
              />
              <p
                className={
                  "text-left mt-[13px] font-gilroysemibold text-blackmig text-base"
                }
              >
                Software
              </p>
              <p className={"font-gilroyregular text-sm text-blackmig mt-2"}>
                We support your companies to simplify and automate the process
                through digitalization
              </p>
              <div className={"flex justify-end mt-4"}>
                <Link href={{ pathname: "/software" }}>
                  <a
                    className={
                      "flex flex-row justify-between items-center w-[133px] h-[40px] px-4 py-2"
                    }
                  >
                    <p
                      className={
                        "font-gilroysemibold text-base text-primarygreen"
                      }
                    >
                      Build now
                    </p>
                    <img
                      src="/image/landingpage/arrow_right_alt.png"
                      className={"w-5 h-5"}
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div
            className={
              "flex-col flex bg-white mr-0 p-3 mt-3 border-2 w-[100%] border-dividermig rounded-lg"
            }
            style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
          >
            <div>
              <img
                src="/image/navbar/talents.svg"
                className={"w-[32px] h-[32px]"}
              />
              <p
                className={
                  "text-left mt-[11px] font-gilroysemibold text-blackmig text-base"
                }
              >
                Talents
              </p>
              <p className={"font-gilroyregular text-blackmig text-sm mt-2"}>
                We help you reduce complexity in talent sourcing and management
              </p>
              <div className={"flex justify-end mt-4"}>
                <Link href={{ pathname: "/talent" }}>
                  <a
                    className={
                      "flex flex-row justify-between items-center w-[190px] h-[40px] px-4 py-2"
                    }
                  >
                    <p
                      className={
                        "font-gilroysemibold text-base text-primarygreen"
                      }
                    >
                      Set up your team
                    </p>
                    <img
                      src="/image/landingpage/arrow_right_alt.png"
                      className={"w-5 h-5"}
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className={"px-4 md:px-[112px] pt-4 md:pt-8 md:pb-[130px] bg-transp60"}
      >
        <div>
          <h2
            style={{ lineHeight: "120%" }}
            className={
              "font-gilroysemibold text-2xl text-blackmig md:text-[32px] pb-2"
            }
          >
            MIG Location
          </h2>
          <p
            style={{ lineHeight: "120%" }}
            className={
              "font-gilroysemibold pb-2 text-xl md:text2xl text-blackmig"
            }
          >
            Headquarter
          </p>
          <p style={{ lineHeight: "120%" }} className={"text-2xl "}>
            <span className="font-gilroysemibold text-darkgrey">
              Location:{" "}
            </span>
            <span className={"text-blackmig font-gilroyregular"}>
              Tebet Raya No. 42, South Jakarta, DKI Jakarta, 12820
            </span>
          </p>

          <div className={"flex flex-row mt-3"}>
            <p
              style={{ lineHeight: "150%" }}
              className={"font-gilroysemibold text-xl text-darkgrey"}
            >
              Phone:&nbsp;
            </p>
            <a href="tel:+62218314522">
              <p
                style={{ lineHeight: "150%" }}
                className={"text-accentblue text-xl underline"}
              >
                +62-21-831-4522
              </p>
            </a>
          </div>
          <div className={"flex flex-row mt-3"}>
            <p
              style={{ lineHeight: "150%" }}
              className={"font-gilroysemibold text-xl text-darkgrey"}
            >
              Email:&nbsp;
            </p>
            <a
              href="mailto:help@mitrasolusi.group"
              style={{ lineHeight: "150%" }}
              className={"text-accentblue text-xl underline"}
            >
              help@mitrasolusi.group
            </a>
          </div>
          <h2
            style={{ lineHeight: "120%" }}
            className={
              "py-4 text-blackmig font-gilroysemibold text-xl md:text-[32px]"
            }
          >
            Coverages
          </h2>
          <div
            className={"bg-white p-6 rounded-lg"}
            style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
          >
            <div className={"flex flex-row justify-between text-[18px]"}>
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
          </div>
        </div>
      </section>
      <section
        className={
          "youronestop hidden md:block md:flex md:flex-row md:justify-between bg-bgfooter pt-[31px] h-[173px]"
        }
      >
        <div className={"justify-start self-end"}>
          <img
            style={{ width: "332px", height: "142px" }}
            src="/image/landingpage/footer-left.png"
          />
        </div>
        <div className={"container w-1/2 mx-auto"}>
          <div class="bg-white border-3 mx-auto w-[645px] border-solid shadow-2xl rounded-lg text-center -mt-[144px] py-[31.38px] px-4">
            <h2
              style={{ lineHeight: "120%" }}
              className={"text-[28px] font-gilroysemibold text-black"}
            >
              Fulfill your IT needs easily!
            </h2>
            <div
              className={
                "mt-3.5 text-xl font-gilroyregular text-center text-black"
              }
            >
              <p
                style={{ lineHeight: "150%" }}
                className={"py-5 text-xl font-gilroyregular text-black"}
              >
                Need help in providing your needs? Whether they related to
                hardware, software, or even talent hiring? Contact us and hear
                what service can we offer to you and your company!
              </p>
            </div>
            <Link href="/contactus">
              <button
                className={
                  "text-sm text-white border-2 rounded bg-primarygreen border-primarygreen px-4 py-2 md:px-4 mt-3.5"
                }
              >
                <div className={"flex flex-row justify-between"}>
                  <p className={"text-xl gilroy-semibold font-gilroysemibold"}>
                    Contact Us
                  </p>
                  <img
                    className={"self-center ml-2"}
                    style={{ height: "20px", width: "20px" }}
                    src="/image/landingpage/arrow_forward.png"
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
          <div class="bg-white border-3 border-solid shadow-2xl rounded-[8px] text-center mx-5  -mt-20 py-4 px-8">
            <p className={"text-xl font-gilroysemibold"}>
              Fulfill your IT needs easily!
            </p>
            <p className={"py-5 text-sm font-gilroyregular"}>
              Need help in providing your needs? Whether they related to
              hardware, software, or even talent hiring? Contact us and hear
              what service can we offer to you and your company!
            </p>
            <Link href="/hardware">
              <button
                className={
                  "text-base text-center rounded-lg text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 md:px-4 mt-4"
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
