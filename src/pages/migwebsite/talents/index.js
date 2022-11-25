import { CheckCircleTwoTone } from "@ant-design/icons";
import {
  Card,
  Checkbox,
  Collapse,
  Form,
  Input,
  Modal,
  notification,
} from "antd";
import Head from "next/head";
import Link from "next/link";
import { React, useEffect, useRef, useState } from "react";
import Slider from "react-slick";

import Layout from "../../../components/migwebsite/layout.js";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function Talents({}) {
  const { Panel } = Collapse;
  const [form] = Form.useForm();
  const handleSubmit = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPeople),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          form.resetFields();
          setFeedback(false);
          setTimeout(() => {
            setFeedback(true);
          }, 5000);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message.errorInfo.status_detail,
            duration: 5,
          });
        }
      });
  };
  const [dataPeople, setDataPeople] = useState({
    company_name: null,
    company_email: null,
    name: null,
    phone_number: null,
    interested_in: "talents",
    message: null,
  });
  const [modalTalents, setModalTalents] = useState(false);
  const [dataEngineering, setDataEngineering] = useState(null);
  const [feedback, setFeedback] = useState(true);
  const [heightt, setHeightt] = useState("");
  const showModal = () => {
    setModalTalents(true);
  };

  const handleCancel = () => {
    setModalTalents(false);
  };
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <img
          style={{ width: "16px", height: "16px" }}
          src="/image/landingpage/arrow-sm-left.png"
        />
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <img
          style={{ width: "16px", height: "16px" }}
          src="/image/landingpage/arrow-sm-left.png"
        />
      </div>
    );
  };
  const slider = useRef(null);

  const sliderSettings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
  };
  const sliderSettingsPhone = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
  };
  useEffect(() => {}, []);
  return (
    <Layout>
      <Head>
        <title>Talents</title>
      </Head>
      <section
        className={
          "section1advantages hidden md:block fixed w-full z-50 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
        style={{ background: "#F4F4F4" }}
      >
        <div className={"block md:flex container mx-auto"}>
          <div className={"flex py-4"}>
            <Link href={{ pathname: "/hardware" }}>
              <p
                className={"cursor-pointer flex-col text-lg gilroy-medium mr-4"}
              >
                Hardware
              </p>
            </Link>
            <Link href={{ pathname: "/software" }}>
              <p
                className={"cursor-pointer flex-col text-lg gilroy-medium mx-4"}
              >
                Software
              </p>
            </Link>
            <Link href={{ pathname: "/talents" }}>
              <p
                className={"cursor-pointer flex-col text-lg gilroy-bold mx-4"}
                style={{
                  borderBottom: "solid 2px #10B981",
                  paddingBottom: "2.5px",
                }}
              >
                Talents
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className={"section2advantages h-12 hidden md:block"}></section>

      <section
        className={"section2talents py-4 md:py-12 mt-10 px-4 sm:px-10 md:px-10"}
      >
        <div className={"mt-0 md:mt-10 flex md:flex-row md:justify-center"}>
          <div
            className={"hidden md:flex container md:flex-row md:justify-center"}
          >
            <div className={"flex-col w-[495px]"}>
              <p className={"text-[32px] font-semibold"}>
                Enabling you to assemble the best team
              </p>
              <p className={"mt-8 gilroy-regular text-base"}>
                Large quantity of profiles coming in with widely different
                qualities. Your turnover rate is high and you have to do it all
                over again.
              </p>
              <div className={"mt-10"}>
                <p className={"gilroy-bold text-primarygreen text-base"}>
                  Reach us to get more information
                </p>
                <div className={"flex flex-row items-center mt-1"}>
                  <Input
                    name={"email"}
                    className={"w-[253px] h-[37px]"}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="Enter your email here."
                  />
                  <button
                    className={
                      "text-base text-center ml-4 text-white border-2 bg-primarygreen border-primarygreen w-[129px] h-[40px] rounded px-4"
                    }
                  >
                    <div className={"flex flex-row justify-between"}>
                      <p className={""}>Hire Now</p>
                      <img
                        className={"w-[20px] h-[20px]"}
                        src="/image/landingpage/arrow-circle-right.png"
                      />
                    </div>
                  </button>
                </div>
                <div
                  className={
                    "mt-10 w-[495px]  border rounded-lg p-2 bg-green15"
                  }
                >
                  <div className={"flex flex-row"}>
                    <img
                      className={"mr-1"}
                      src="/image/landingpage/info.png"
                      style={{ width: "20px", height: "20px" }}
                    />
                    <div>
                      <p className={"text-base text-blackmig gilroy-regular"}>
                        Let us help you to scale and manage your IT
                        infrastructure with :
                      </p>
                      <ul>
                        <li>
                          <p
                            className={"text-base text-blackmig gilroy-regular"}
                          >
                            {""}
                            <span className={"font-semibold"}>
                              {" "}
                              predictable
                            </span>{" "}
                            monthly cost
                          </p>
                        </li>
                        <li>
                          <p
                            className={"text-base text-blackmig gilroy-regular"}
                          >
                            {""}
                            <span className={"font-semibold"}>
                              guaranteed
                            </span>{" "}
                            service level
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={"flex-col ml-[54px]"}>
              <img
                className={"w-[667px] h-[389px]"}
                src="/image/landingpage/Talents-2.png"
              ></img>
            </div>
          </div>
        </div>

        <div className={"block md:hidden"}>
          <div className={"my-auto"}>
            <div className={"my-auto"}>
              <img src="/image/hardware/Hardware-Solution.png"></img>
            </div>
            <p className={"text-2xl pb-4 gilroy-bold"}>
              Managing IT infrastructures is{" "}
              <span
                style={{
                  borderBottom: "solid 3px #188E4D",
                  paddingBottom: "2.5px",
                }}
              >
                challenging
              </span>{" "}
            </p>
            <p className={"pb-4 pt-2 gilroy-medium text-xl"}>
              Rapid pace of change, uncertainty on scalability, and heavy
              capital requirements might break your focus from executing your
              core business.
            </p>
            <p className={"gilroy-medium text-xl"}>
              Let us help you to scale and manage your IT infrastructure with :
            </p>
            <ul className={"list-inside list-disc"}>
              <li className={"gilroy-medium text-xl"}>
                <span className={"gilroy-bold"}>predictable</span> monthly cost{" "}
              </li>
              <li className={"gilroy-medium text-xl"}>
                <span className={"gilroy-bold"}>guaranteed</span> service level
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section
        className={
          "section3talents bg-bgjoinmig py-4 md:py-12 mt-10 px-4 sm:px-10 md:px-10"
        }
      >
        <p
          className={
            "text-xl md:text-3xl text-center gilroy-semibold font-semibold py-8 md:py-0 mb-10"
          }
        >
          Let’s see what{" "}
          <span
            style={{
              borderBottom: "solid 3px #188E4D",
              paddingBottom: "2.5px",
            }}
          >
            IT Talents
          </span>{" "}
          we can provide
        </p>
        <div className={"mt-0 md:mt-12 flex md:flex-row md:justify-center"}>
          <div
            className={
              "md:w-[600px] md:h-[176px] bg-white md:mr-[19px] rounded-lg p-4 pb-6"
            }
          >
            <div className={"flex flex-row"}>
              <img
                style={{ width: "100px", height: "100px" }}
                src="/image/people/engineering.png"
              />
              <div
                className={
                  "ml-4 w-[452px] flex flex-col justify-between pb-1 h-[81px] self-center"
                }
              >
                <div>
                  <p
                    className={"text-accentblue gilroy-bold text-lg md:text-xl"}
                  >
                    Engineering
                  </p>
                </div>
                <div className={""}>
                  <p className={"text-xs gilroy-regular text-darkgrey"}>
                    Typical Roles
                  </p>
                  <p className={"text-blackmig text-sm font-semibold"}>
                    Website Developer, Android/IOS Developer, and more
                  </p>
                </div>
              </div>
            </div>
            <div className={"flex justify-end px-4 mt-4"}>
              <button
                onClick={showModal}
                className={
                  "flex flex-row justify-between pb-6 bg-white items-center px-4 w-[131px] h-[40px]"
                }
              >
                <p
                  className={
                    "text-primarygreen text-base gilroy-semibold font-semibold"
                  }
                >
                  See more
                </p>
                <img
                  src="/image/hardware/arrow-circle-right.png"
                  alt=""
                  className="w-[20px] h-[20px]"
                />
              </button>
            </div>
          </div>
          <div
            className={"md:w-[600px] md:h-[176px] bg-white rounded-lg p-4 pb-6"}
          >
            <div className={"flex flex-row"}>
              <img
                style={{ width: "100px", height: "100px" }}
                src="/image/people/data.png"
              />
              <div
                className={
                  "ml-4 w-[452px] flex flex-col justify-between pb-1 h-[81px] self-center"
                }
              >
                <div>
                  <p
                    className={"text-accentpink gilroy-bold text-lg md:text-xl"}
                  >
                    Data
                  </p>
                </div>
                <div className={""}>
                  <p className={"text-xs gilroy-regular text-darkgrey"}>
                    Typical Roles
                  </p>
                  <p className={"text-blackmig text-sm font-semibold"}>
                    Data Scientist, Data/Business Intelligence Analyst, and more
                  </p>
                </div>
              </div>
            </div>
            <div className={"flex justify-end px-4 mt-4"}>
              <button
                className={
                  "flex flex-row justify-between pb-6 bg-white items-center px-4 w-[131px] h-[40px]"
                }
              >
                <p
                  className={
                    "text-primarygreen text-base gilroy-semibold font-semibold"
                  }
                >
                  See more
                </p>
                <img
                  src="/image/hardware/arrow-circle-right.png"
                  alt=""
                  className="w-[20px] h-[20px]"
                />
              </button>
            </div>
          </div>
        </div>
        <div className={"mt- md:mt-[42px] flex md:flex-row md:justify-center"}>
          <div
            className={
              "md:w-[600px] md:h-[176px] bg-white md:mr-[19px] rounded-lg p-4 pb-6"
            }
          >
            <div className={"flex flex-row"}>
              <img
                style={{ width: "100px", height: "100px" }}
                src="/image/people/design.png"
              />
              <div
                className={
                  "ml-4 w-[452px] flex flex-col justify-between pb-1 h-[81px] self-center"
                }
              >
                <div>
                  <p
                    className={
                      "text-accentpurple gilroy-bold text-lg md:text-xl"
                    }
                  >
                    Design
                  </p>
                </div>
                <div className={""}>
                  <p className={"text-xs gilroy-regular text-darkgrey"}>
                    Typical Roles
                  </p>
                  <p className={"text-blackmig text-sm font-semibold"}>
                    Product Designer, Web Designer, Graphic Designer, and more
                  </p>
                </div>
              </div>
            </div>
            <div className={"flex justify-end px-4 mt-4"}>
              <button
                className={
                  "flex flex-row justify-between pb-6 bg-white items-center px-4 w-[131px] h-[40px]"
                }
              >
                <p
                  className={
                    "text-primarygreen text-base gilroy-semibold font-semibold"
                  }
                >
                  See more
                </p>
                <img
                  src="/image/hardware/arrow-circle-right.png"
                  alt=""
                  className="w-[20px] h-[20px]"
                />
              </button>
            </div>
          </div>
          <div
            className={"md:w-[600px] md:h-[176px] bg-white rounded-lg p-4 pb-6"}
          >
            <div className={"flex flex-row"}>
              <img
                style={{ width: "100px", height: "100px" }}
                src="/image/people/product.png"
              />
              <div
                className={
                  "ml-4 w-[452px] flex flex-col justify-between pb-1 h-[81px] self-center"
                }
              >
                <div>
                  <p
                    className={
                      "text-primarygreen gilroy-bold text-lg md:text-xl"
                    }
                  >
                    Product
                  </p>
                </div>
                <div className={""}>
                  <p className={"text-xs gilroy-regular text-darkgrey"}>
                    Typical Roles
                  </p>
                  <p className={"text-blackmig text-sm font-semibold"}>
                    Product Manager, Product Analyst, Project Manager, and more
                  </p>
                </div>
              </div>
            </div>
            <div className={"flex justify-end px-4 mt-4"}>
              <button
                className={
                  "flex flex-row justify-between pb-6 bg-white items-center px-4 w-[131px] h-[40px]"
                }
              >
                <p
                  className={
                    "text-primarygreen text-base gilroy-semibold font-semibold"
                  }
                >
                  See more
                </p>
                <img
                  src="/image/hardware/arrow-circle-right.png"
                  alt=""
                  className="w-[20px] h-[20px]"
                />
              </button>
            </div>
          </div>
        </div>
        <div
          className={"mt-[42px] text-center mx-auto md:h-[104px] md:w-[646px]"}
        >
          <p className={"font-regular gilroy-regular text-base"}>
            <span className={"font-semibold"}>
              Didn’t find what you were looking for?
            </span>{" "}
            Reach us to get your orders customized based on your IT talent needs
          </p>
          <div className={"md:mt-4 mx-auto"}>
            <Link href="/contactus">
              <button
                className={
                  "text-sm md:w-[167px] h-[40px] rounded text-primarygreen border-2 bg-bgjoinmig border-primarygreen justify-center items-center"
                }
              >
                <p className={"text-base gilroy-semibold font-semibold"}>
                  Contact Our Team
                </p>
              </button>
            </Link>
          </div>
        </div>
      </section>
      {/* modal talents */}
      <Modal
        open={modalTalents}
        onCancel={handleCancel}
        width={777}
        closeIcon={
          <img
            className={"w-[24px] mt-8 h-[24px]"}
            src="/image/people/close.png"
          />
        }
        footer={null}
      >
        <div className={"flex flex-row"}>
          <img
            className={"w-[63px] h-[63px]"}
            src="/image/people/engineering.png"
          />
          <div className={"ml-12 flex flex-col justify-between"}>
            <div>
              <p>Engineering</p>
            </div>
            <div>
              <p>Pilihan Masa Kontrak</p>
              <p>1 minggu - 5 tahun</p>
            </div>
          </div>
        </div>
        <div className={"mt-8"}>
          <p>Typical Roles</p>
          <ul>
            <li>Web Developer</li>
            <li>Mobile App Developer</li>
            <li>Quality Assurance Engineer, etc.</li>
          </ul>
        </div>
        <div className={"mt-8"}>
          <p>Typical Skills</p>
          <ul>
            <li>Bachelor's degree in Computer Science, </li>
            <li>
              Knowledge of primary coding languages including C++, HTML5, and
              JavaScript, PHP Java, Spring, Laravel,Tibco, etc.,{" "}
            </li>
            <li>Basic programming experience,</li>
            <li>Knowledge of databases and operating systems, </li>
            <li>Ability to learn new software and technologies quickly, </li>
            <li>Detail-oriented.</li>
          </ul>
        </div>
        <div className={"mt-8"}>
          <p>Typical Deliverables</p>
          <ul>
            <li>
              Integration of user-facing elements developed by front-end
              developers,
            </li>
            <li>
              Provide support in building efficient, testable, and reusable
              software modules,{" "}
            </li>
            <li>
              Provide assistance in solving performance problems and
              architectural challenges,{" "}
            </li>
            <li>Integration of data storage solutions.</li>
          </ul>
        </div>
        <div className={"mt-8 bg-bgjoinmig h-[72px] w-[777px] -mx-6 -mb-6"}>
          <div className={"flex flex-row justify-end mr-4"}>
            <p
              className={
                "text-base text-mig font-semibold px-4 py-2 md:px-4 mt-3.5"
              }
            >
              Interested with our talents?
            </p>
            <Link href="/contactus">
              <button
                className={
                  "text-sm w-[125px] h-[40px] text-white border-2 rounded bg-primarygreen border-primarygreen py-2 md:px-4 mt-3.5"
                }
              >
                <div className={"flex flex-row justify-between"}>
                  <p className={"text-base font-semibold"}>Hire now</p>
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
      </Modal>
      <section
        className={
          "section4talents bg-bgtalents py-4 md:py-12 px-4 sm:px-10 md:px-10"
        }
      >
        <p
          className={
            "text-xl md:text-3xl text-center gilroy-semibold font-semibold py-8 md:py-0"
          }
        >
          Why you should{" "}
          <span
            style={{
              borderBottom: "solid 3px #188E4D",
              paddingBottom: "2.5px",
            }}
          >
            trust us
          </span>{" "}
          in building your team?
        </p>
        <p
          className={
            "text-center text-sm  md:text-base text-black gilroy-regular pt-6"
          }
        >
          With on-demand expertise and flexibility in talent head counts and
          working period,
        </p>
        <div
          className={
            "md:my-[40px] mx-auto h-[222px] w-[1142px] flex md:items-stretch"
          }
        >
          <img
            src="/image/landingpage/People.png"
            style={{ width: "374px", height: "222px" }}
          />
          <div className={"pl-[40px] self-center"}>
            <div className="flex flex-row items-center mt-5">
              <div className="w-11">
                <img
                  src="/image/landingpage/career-icon1.png"
                  className="w-[42px] h-[42px]"
                />
              </div>
              <div>
                <h5 className="px-5 text-sm md:text-base font-semibold text-blackmig">
                  Customization Based on Your Needs
                </h5>
                <p className="text-left px-5 text-base text-blackmig gilroy-regular">
                  Numbers of talent and their working period can be tailored as
                  per required by project.
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center mt-[20px]">
              <div className="w-11">
                <img
                  src="/image/landingpage/career-icon2.png"
                  className="w-[42px] h-[42px]"
                />
              </div>
              <div>
                <h5 className="px-5 text-sm md:text-base font-semibold text-blackmig">
                  Full Flexibility
                </h5>
                <p className="text-left px-5 text-base text-blackmig gilroy-regular">
                  You have full flexibility to rotate and rematch to make your
                  quality criteria fullfiled.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={"mx-auto h-[222px] w-[1142px] flex md:items-stretch"}>
          <div className={"w-[603px] h-[188px] py-1"}>
            <div className={"flex md:flex-row"}>
              <img
                style={{ width: "42px", height: "42px" }}
                src="/image/people/icon-talents1.png"
              />
              <div className={"ml-[14px] text-blackmig text-base"}>
                <p className={"font-semibold"}>Tight Candidate Selection</p>
                <p className={"gilroy-regular"}>
                  Only less than 10% of all candidates from various industry
                  backgrounds and top tier universities are selected as our top
                  talent.
                </p>
              </div>
            </div>
            <div className={"flex md:flex-row mt-[20px]"}>
              <img
                style={{ width: "42px", height: "42px" }}
                src="/image/people/icon-talents2.png"
              />
              <div className={"ml-[14px] text-blackmig text-base"}>
                <p className={"font-semibold"}>Excellent Capability</p>
                <p className={"gilroy-regular"}>
                  Extensive test and interview process covering tech stacks,
                  coding algorithm, systems design, and soft skills are given to
                  ensure you having qualified talents.
                </p>
              </div>
            </div>
          </div>
          <div className={"w-[525px] h-[222px]"}>
            <img
              className={"w-full h-full"}
              src="/image/people/icon-techstack.png"
            />
          </div>
        </div>
      </section>
      <section
        className={
          "section5talents bg-white py-4 md:py-12 px-4 sm:px-10 md:px-10"
        }
      >
        <p
          className={
            "text-xl md:text-3xl text-center gilroy-semibold font-semibold py-8 md:py-0"
          }
        >
          Which{" "}
          <span
            style={{
              borderBottom: "solid 3px #188E4D",
              paddingBottom: "2.5px",
            }}
          >
            recruitment scheme
          </span>{" "}
          we provided?
        </p>
        <div
          className={
            "md:mt-[42px] md: w-[1216px] md:h-[183px] flex md:flex-row justify-between mx-auto"
          }
        >
          <div
            className={
              "bg-greenTrans5 md:w-[598px] md:h-[183px] py-[23.5px] px-4 flex md:flex-row"
            }
          >
            <img
              className={"md:w-[117px] md:h-[136px]"}
              src="/image/people/head-hunt.png"
            />
            <div className={"ml-6 "}>
              <p className={"text-primarygreen text-xl gilroy-bold"}>
                Head-Hunt
              </p>
              <ul className={"text-blackmig text-sm gilroy-regular"}>
                <li>
                  Conduct end-to-end hiring process to provide dedicated talents
                  for your business
                </li>
                <li>
                  Rigorous process to obtain shortlisted high-quality candidates{" "}
                </li>
                <li>
                  Connection to our extensive talent and recruiting network
                </li>
              </ul>
            </div>
          </div>
          <div
            className={
              "bg-greenTrans5 md:w-[598px] md:h-[183px] py-[23.5px] px-4 flex md:flex-row"
            }
          >
            <img
              className={"md:w-[117px] md:h-[136px]"}
              src="/image/people/it-staff.png"
            />
            <div className={"ml-6 "}>
              <p className={"text-primarygreen text-xl gilroy-bold"}>
                IT Staff Augmentation
              </p>
              <ul className={"text-blackmig text-sm gilroy-regular"}>
                <li>
                  All-in service, where we provide talents, including their
                  compensation & benefit, device, and tax
                </li>
                <li>Flexibility of talent headcount and working period </li>
                <li>Full access over assignments for talents</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* testimonial */}
      <section
        className={
          "section3landingpageadvantages bg-bgjoinmig pt-12 pb-[179px]"
        }
      >
        <p
          className={
            "text-xl md:text-3xl text-center gilroy-semibold font-semibold mb-[42px]"
          }
        >
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
        <div
          className={"center md:content-around block md:hidden"}
          style={{ maxWidth: 1000 }}
        >
          <Slider {...sliderSettingsPhone}>
            <div>
              <Card
                bordered
                style={{
                  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)",
                }}
              >
                <div className="">
                  <p className="text-sm text italic gilroy-semibold font-semibold">
                    "
                  </p>

                  <p className="pb-4 gilroy-medium text-sm mx-auto text-left">
                    I had a wonderful experience working with Mitramas Infosys
                    Global. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua.
                    <br className="hidden xl:block"></br> optimize your cost and
                    productivity
                  </p>
                  <p className="text-sm text italic gilroy-semibold font-semibold">
                    "
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="flex justify-center mt-2">
                      <img
                        className="rounded-full mr-4"
                        src="/image/landingpage/testimonial-user.png"
                        style={{ height: "40px", width: "60px" }}
                        alt=""
                      />
                      <div className="self-center">
                        <p className="text-sm font-semibold Gilroy-semibold text-black">
                          Fachri Fauzan
                        </p>
                        <p className="text-sm font-semibold Gilroy-semibold text-darkgrey">
                          Talent Acquisition at Bukopin
                        </p>
                      </div>
                    </div>
                    <div className="self-start">
                      <div className="bg-greenTrans20 px-4 rounded-[20px] mt-2">
                        <p className="text-sm text-primarygreen font-semibold ">
                          Industry :
                          <span
                            style={{
                              fontWeight: "regular",
                              marginLeft: "5px",
                            }}
                          >
                            Banking
                          </span>
                        </p>
                      </div>
                      <div className="bg-lightblue px-4 rounded-[20px] mt-2">
                        <p className="text-sm text-primarygreen font-semibold ">
                          Service:
                          <span
                            style={{
                              fontWeight: "regular",
                              marginLeft: "5px",
                            }}
                          >
                            Hardware, Talents
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div>
              <Card
                bordered
                style={{
                  boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
                }}
              >
                <div className="">
                  <p className="text-3xl text italic gilroy-semibold font-semibold">
                    "
                  </p>

                  <p className="pb-4 gilroy-medium text-sm mx-auto text-left">
                    I had a wonderful experience working with Mitramas Infosys
                    Global. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua.
                    <br className="hidden xl:block"></br> optimize your cost and
                    productivity
                  </p>
                  <p className="text-sm text italic gilroy-semibold font-semibold">
                    "
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="flex justify-center mt-2">
                      <img
                        className="rounded-full mr-4"
                        src="/image/landingpage/testimonial-user.png"
                        style={{ height: "40px", width: "60px" }}
                        alt=""
                      />
                      <div className="self-center">
                        <p className="text-sm font-semibold Gilroy-semibold text-black">
                          Fachri Fauzan
                        </p>
                        <p className="text-sm font-semibold Gilroy-semibold text-darkgrey">
                          Talent Acquisition at Bukopin
                        </p>
                      </div>
                    </div>
                    <div className="self-start">
                      <div className="bg-greenTrans20 px-4 rounded-[20px] mt-2">
                        <p className="text-sm text-primarygreen font-semibold ">
                          Industry :
                          <span
                            style={{
                              fontWeight: "regular",
                              marginLeft: "5px",
                            }}
                          >
                            Banking
                          </span>
                        </p>
                      </div>
                      <div className="bg-lightblue px-4 rounded-[20px] mt-2">
                        <p className="text-sm text-primarygreen font-semibold ">
                          Service:
                          <span
                            style={{
                              fontWeight: "regular",
                              marginLeft: "5px",
                            }}
                          >
                            Hardware, Talents
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </Slider>
        </div>
        <div className={"flex flex-row"}>
          <button onClick={() => slider?.current?.slickPrev()}>
            <div
              className={
                "self-center flex items-center justify-center  absolute left-[180px] w-[53px] h-[53px] bg-bgIcon rounded-[500px]"
              }
            >
              <img
                className={"grid justify-items-center"}
                style={{ width: "40px", height: "40px" }}
                src="/image/landingpage/arrow-sm-left.png"
              />
            </div>
          </button>
          <div
            className={"center md:content-around hidden md:block"}
            style={{ maxWidth: 1000 }}
          >
            <Slider {...sliderSettings2} ref={slider}>
              <div
                className="pt-6 pb-8 md:px-16 bg-white rounded-lg"
                style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
              >
                <div className="flex flex-row justify-between">
                  <p className="text-[32px] text-darkgrey italic gilroy-semibold font-semibold">
                    "
                  </p>
                  <p className="text-[32px] text-darkgrey italic gilroy-semibold font-semibold">
                    "
                  </p>
                </div>
                <p className="pb-4 gilroy-regular text-xl text-blackmig mx-auto text-center">
                  I had a{" "}
                  <span className={"text-primarygreen font-semibold"}>
                    wonderful experience
                  </span>{" "}
                  working with Mitramas Infosys Global. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit, sed do eiusmod{" "}
                  <span className={"text-primarygreen font-semibold"}>
                    tempor incididunt
                  </span>{" "}
                  ut labore et dolore magna aliqua.
                </p>
                <div
                  className={
                    "border-solid border-2 border-dividermig mt-6 mx-auto w-[417px] h-0"
                  }
                ></div>
                <div className="flex flex-col items-center mt-6">
                  <div className="flex justify-center">
                    <img
                      className="rounded-full mr-4"
                      src="/image/landingpage/testimonial-user.png"
                      style={{ height: "68px", width: "68px" }}
                      alt=""
                    />
                    <div className="self-center">
                      <p className={"text-blackmig font-semibold text-base"}>
                        Fachri Fauzan
                      </p>
                      <p className={"text-darkgrey font-semibold text-sm"}>
                        Talent Acquisition at Bukopin
                      </p>
                    </div>
                    <div className="ml-6">
                      <img
                        style={{ height: "68px", width: "81px" }}
                        src="/image/landingpage/testimonial-client.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="flex flex-row justify-center mx-2 mt-6">
                    <div className="bg-greenTrans20 mr-6 px-2 py-2 rounded-[20px]">
                      <p className="text-sm text-primarygreen gilroy-regular">
                        <span className={"font-semibold"}>Industry : </span>
                        Banking
                      </p>
                    </div>
                    <div className="bg-lightblue px-2 py-2 rounded-[20px]">
                      <p className="text-sm text-primarygreen gilroy-regular">
                        <span className={"font-semibold"}>Service : </span>
                        Hardware, Talents
                      </p>
                    </div>
                  </div>
                  <a href="#">
                    <div className="flex justify-between mx-auto mt-6 py-2 px-4 w-[142px]">
                      <p className="text-base text-primarygreen font-semibold gilroy-semibold">
                        Read more
                      </p>
                      <img
                        className={"self-center"}
                        style={{ width: "8px", height: "15px" }}
                        src="/image/landingpage/arrow-forward-ios.png"
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div
                className="pt-6 pb-8 md:px-16 bg-white rounded-lg"
                style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
              >
                <div className="flex flex-row justify-between">
                  <p className="text-[32px] text-darkgrey italic gilroy-semibold font-semibold">
                    "
                  </p>
                  <p className="text-[32px] text-darkgrey italic gilroy-semibold font-semibold">
                    "
                  </p>
                </div>
                <p className="pb-4 gilroy-regular text-xl text-blackmig mx-auto text-center">
                  I had a{" "}
                  <span className={"text-primarygreen font-semibold"}>
                    wonderful experience
                  </span>{" "}
                  working with Mitramas Infosys Global. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit, sed do eiusmod{" "}
                  <span className={"text-primarygreen font-semibold"}>
                    tempor incididunt
                  </span>{" "}
                  ut labore et dolore magna aliqua.
                </p>
                <div
                  className={
                    "border-solid border-2 border-dividermig mt-6 mx-auto w-[417px] h-0"
                  }
                ></div>
                <div className="flex flex-col items-center mt-6">
                  <div className="flex justify-center">
                    <img
                      className="rounded-full mr-4"
                      src="/image/landingpage/testimonial-user.png"
                      style={{ height: "68px", width: "68px" }}
                      alt=""
                    />
                    <div className="self-center">
                      <p className={"text-blackmig font-semibold text-base"}>
                        Fachri Fauzan
                      </p>
                      <p className={"text-darkgrey font-semibold text-sm"}>
                        Talent Acquisition at Bukopin
                      </p>
                    </div>
                    <div className="ml-6">
                      <img
                        style={{ height: "68px", width: "81px" }}
                        src="/image/landingpage/testimonial-client.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="flex flex-row justify-center mx-2 mt-6">
                    <div className="bg-greenTrans20 mr-6 px-2 py-2 rounded-[20px]">
                      <p className="text-sm text-primarygreen gilroy-regular">
                        <span className={"font-semibold"}>Industry : </span>
                        Banking
                      </p>
                    </div>
                    <div className="bg-lightblue px-2 py-2 rounded-[20px]">
                      <p className="text-sm text-primarygreen gilroy-regular">
                        <span className={"font-semibold"}>Service : </span>
                        Hardware, Talents
                      </p>
                    </div>
                  </div>
                  <a href="#">
                    <div className="flex justify-between mx-auto mt-6 py-2 px-4 w-[142px]">
                      <p className="text-base text-primarygreen font-semibold gilroy-semibold">
                        Read more
                      </p>
                      <img
                        className={"self-center"}
                        style={{ width: "8px", height: "15px" }}
                        src="/image/landingpage/arrow-forward-ios.png"
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div
                className="pt-6 pb-8 md:px-16 bg-white rounded-lg"
                style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
              >
                <div className="flex flex-row justify-between">
                  <p className="text-[32px] text-darkgrey italic gilroy-semibold font-semibold">
                    "
                  </p>
                  <p className="text-[32px] text-darkgrey italic gilroy-semibold font-semibold">
                    "
                  </p>
                </div>
                <p className="pb-4 gilroy-regular text-xl text-blackmig mx-auto text-center">
                  I had a{" "}
                  <span className={"text-primarygreen font-semibold"}>
                    wonderful experience
                  </span>{" "}
                  working with Mitramas Infosys Global. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit, sed do eiusmod{" "}
                  <span className={"text-primarygreen font-semibold"}>
                    tempor incididunt
                  </span>{" "}
                  ut labore et dolore magna aliqua.
                </p>
                <div
                  className={
                    "border-solid border-2 border-dividermig mt-6 mx-auto w-[417px] h-0"
                  }
                ></div>
                <div className="flex flex-col items-center mt-6">
                  <div className="flex justify-center">
                    <img
                      className="rounded-full mr-4"
                      src="/image/landingpage/testimonial-user.png"
                      style={{ height: "68px", width: "68px" }}
                      alt=""
                    />
                    <div className="self-center">
                      <p className={"text-blackmig font-semibold text-base"}>
                        Fachri Fauzan
                      </p>
                      <p className={"text-darkgrey font-semibold text-sm"}>
                        Talent Acquisition at Bukopin
                      </p>
                    </div>
                    <div className="ml-6">
                      <img
                        style={{ height: "68px", width: "81px" }}
                        src="/image/landingpage/testimonial-client.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="flex flex-row justify-center mx-2 mt-6">
                    <div className="bg-greenTrans20 mr-6 px-2 py-2 rounded-[20px]">
                      <p className="text-sm text-primarygreen gilroy-regular">
                        <span className={"font-semibold"}>Industry : </span>
                        Banking
                      </p>
                    </div>
                    <div className="bg-lightblue px-2 py-2 rounded-[20px]">
                      <p className="text-sm text-primarygreen gilroy-regular">
                        <span className={"font-semibold"}>Service : </span>
                        Hardware, Talents
                      </p>
                    </div>
                  </div>
                  <a href="#">
                    <div className="flex justify-between mx-auto mt-6 py-2 px-4 w-[142px]">
                      <p className="text-base text-primarygreen font-semibold gilroy-semibold">
                        Read more
                      </p>
                      <img
                        className={"self-center"}
                        style={{ width: "8px", height: "15px" }}
                        src="/image/landingpage/arrow-forward-ios.png"
                      />
                    </div>
                  </a>
                </div>
              </div>
            </Slider>
          </div>
          <button onClick={() => slider?.current?.slickNext()}>
            <div
              className={
                "self-center flex items-center justify-center  absolute right-[180px] w-[53px] h-[53px] bg-bgIcon rounded-[500px]"
              }
            >
              <img
                className={"grid justify-items-center"}
                style={{ width: "40px", height: "40px" }}
                src="/image/landingpage/arrow-sm-right.png"
              />
            </div>
          </button>
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
            <p className={"text-2xl font-semibold text-black"}>
              Fulfill your IT needs easily!
            </p>
            <div
              className={
                "mt-3.5 text-base gilroy-regular text-center text-black"
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
                  <p className={"text-base gilroy-semibold font-semibold"}>
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
          <div class="bg-white border-3 border-solid shadow-2xl rounded-[8px] text-center mx-5  -mt-24 py-4 px-8">
            <p className={"text-xl font-semibold"}>
              Fulfill your IT needs easily!
            </p>
            <p className={"py-5 text-sm Gilroy-regular"}>
              Need help in providing your needs? Whether they related to
              hardware, software, or even talent hiring? Contact us and hear
              what service can we offer to you and your company!
            </p>
            <Link href="/hardware">
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
            </Link>
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

export default Talents;
