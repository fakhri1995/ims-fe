import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";
import { Button, Card } from "antd";
import Head from "next/head";
import Link from "next/link";
import Linkk from "next/link";
import React from "react";

import LayoutFormContactUs from "../../../components/migwebsite/layout-form-contact-us.js";
import Layout from "../../../components/migwebsite/layout.js";

function AboutUs({}) {
  return (
    <Layout>
      <Head>
        <title>About Us | Mitramas Infosys Global - MIG</title>
      </Head>
      <section
        className={
          "section2people pt-8 md:pt-[16] pb-5 md:pb-[40px] px-4 md:px-[112px] text-center"
        }
      >
        <div className={""}>
          <p
            className={
              "text-2xl md:text-[32px] font-gilroysemibold text-blackmig"
            }
          >
            Operate your business, more efficient and more agile
          </p>

          <p
            className={
              "text-sm md:text-base text-blackmig font-gilroyregular mt-12 md:mt-4 px-4 md:px-0"
            }
          >
            Mitramas Infosys global is supporting you staff augmentation &
            delivering software and hardware managed services. We have served
            multiple industries, bringing the best solutions to financial
            service companies, start ups, as well as government agencies.
          </p>
        </div>
      </section>
      <section className={"block bg-transp60 py-4 md:py-6 px-4 md:px-[112px]"}>
        <p
          className={"font-gilroysemibold text-left pb-0 text-base md:text-2xl"}
        >
          Who we are
        </p>
        {/* <div className={'block md:hidden flex-col py-4 md:py-4 m-auto'}>
                        <img src="/image-aboutus.png" className={'block'} style={{width:'400px',height:'auto',margin:'0 auto'}}></img>
                    </div> */}
        <p className={"mt-3 md:mt-4 font-gilroyregular text-sm md:text-base"}>
          Founded in 2003, Mitramas Infosys Global (MIG) directly partner with
          global providers and collaborate with local IT talents to offer you a
          seamless technology experience. Experienced across archipelago for
          more than decade we have a plethora of experience in the business.
          With integrity as our core principle, we collaborate with our clients
          to increase their efficiency and reach long-term business goals.
        </p>

        <p className={"mt-4 text-sm md:text-base font-gilroyregular"}>
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
        <p
          className={"text-base md:text-2xl font-gilroysemibold text-blackmig"}
        >
          Support your business efficiently
        </p>
        <div>
          <p className={"text-sm md:text-base mt-3 md:mt-4 font-gilroyregular"}>
            One stop seamless technology solution to help you achieve business
            goals and optimize your cost{" "}
          </p>
        </div>
        <div className={"hidden md:flex md:flex-row mt-4"}>
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
          <p
            className={
              "font-gilroysemibold text-2xl text-blackmig md:text-2xl pb-2"
            }
          >
            MIG Location
          </p>
          <p className={"font-gilroysemibold pb-2 text-xl text-blackmig"}>
            Headquarter
          </p>
          <p className={"text-base "}>
            <span className="font-gilroysemibold text-darkgrey">
              Location:{" "}
            </span>
            <span className={"text-blackmig font-gilroyregular"}>
              Tebet Raya No. 42, South Jakarta, DKI Jakarta, 12820
            </span>
          </p>

          <div className={"flex flex-row mt-3"}>
            <p className={"font-gilroysemibold text-base text-darkgrey"}>
              Phone:&nbsp;
            </p>
            <a href="tel:+62218314522">
              <p className={"text-accentblue text-base underline"}>
                +62-21-831-4522
              </p>
            </a>
          </div>
          <div className={"flex flex-row mt-3"}>
            <p className={"font-gilroysemibold text-base text-darkgrey"}>
              Email:&nbsp;
            </p>
            <a
              href="mailto:help@mitrasolusi.group"
              className={"text-accentblue text-base underline"}
            >
              help@mitrasolusi.group
            </a>
          </div>
          <p className={"py-4 text-blackmig font-gilroysemibold text-xl"}>
            Coverages
          </p>
          <div
            className={"bg-white p-6 rounded-lg"}
            style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
          >
            <div className={"flex flex-row justify-between"}>
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
            <p className={"text-2xl font-gilroysemibold text-black"}>
              Fulfill your IT needs easily!
            </p>
            <div
              className={
                "mt-3.5 text-base font-gilroyregular text-center text-black"
              }
            >
              <p>
                Need help in providing your needs? Whether they related to
                hardware,{" "}
              </p>
              <p>software, or even talent hiring?</p>
              <p>
                Contact us and hear what service can we offer to you and your
                company!
              </p>
            </div>
            <Link href="/contactus">
              <button
                className={
                  "text-sm w-[145px] h-[40px] text-white border-2 rounded bg-primarygreen border-primarygreen px-4 py-2 md:px-4 mt-3.5"
                }
              >
                <div className={"flex flex-row justify-between"}>
                  <p
                    className={"text-base gilroy-semibold font-gilroysemibold"}
                  >
                    Contact Us
                  </p>
                  <img
                    className={"self-center"}
                    style={{ height: "15px", width: "8px" }}
                    src="/image/landingpage/arrow-forward.png"
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
