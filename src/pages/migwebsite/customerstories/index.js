import {
  CaretDownOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";
import { Badge, Card, Col, Row, Select, Space } from "antd";
import moment from "moment";
import Head from "next/head";
import Linkk from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import Flickity from "react-flickity-component";
import { Link, animateScroll as scroll } from "react-scroll";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";
import Slider from "react-slick";

import Layout from "../../../components/migwebsite/layout";
import Pagination from "../../../components/migwebsite/pagination";
import { generateStaticAssetUrl, stripTags } from "../../../lib/helper";
import en from "../../../locales/en";
import id from "../../../locales/id";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function CustomerStories({ dataBlog }) {
  const handleChange = () => {};
  const [currentPage, setCurrentPage] = useState(1);
  const [articleList, setArticleList] = useState(null);
  const [fullUrl, setFullUrl] = useState("http://www.google.com");
  const pageSize = 10;
  const router = useRouter();

  const { locale } = router;
  const t = locale === "en" ? en : id;
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setFullUrl(window.location.href);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getTestimonialLandingPage`, {
      method: `GET`,
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          console.log("get list customer stories ", res2);
          if (locale == "en") {
            console.log("masuk en");
            setArticleList(res2.data);
          } else {
            let dataTemp = [];
            for (let i = 0; i < res2.data.length; i++) {
              console.log("res2.data[i].title_id ", res2.data[i].title_id);
              if (
                res2.data[i].title_id != "" &&
                res2.data[i].description_id != ""
              ) {
                dataTemp.push(res2.data[i]);
              }
            }
            setArticleList(dataTemp);
          }
        } else {
        }
      })
      .catch((err) => {})
      .finally(() => {
        // setLoadingEmployees(false);
      });
  }, []);

  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(window.location.toString());
    alert("URL is copied");
  };
  return (
    <Layout>
      {/* <section className={'container mx-auto'}> */}
      {console.log("data blogs ", dataBlog)}
      <Head>
        <title>Customer Stories</title>
      </Head>
      <section
        className={
          "section1landingpage md:relative md:py-16 px-4 md:px-[112px]"
        }
      >
        {/* Browser View */}
        {/* Browser View */}
        <div className={"hidden md:flex container mx-auto "}>
          <div className={"flex-col w-1/2"}>
            <img
              className={"w-[614px] h-[336px]"}
              src="/image/landingpage/hero-blog.png"
            />
          </div>
          <div className={"flex w-1/2 md:ml-[50px] xl:ml-[60px]"}>
            <div className={"w-3/4 flex flex-col justify-between"}>
              <div>
                <p className={"text-[32px] font-gilroysemibold text-blackmig"}>
                  Welcome to MIG Blog!
                </p>
                <p
                  className={" text-base text-blackmig font-gilroyregular mt-1"}
                >
                  MIG catalyzes your core business with{" "}
                  <span className={"font-gilroysemibold"}>
                    IT hardware solutions
                  </span>
                  ,
                  <span className={"font-gilroysemibold"}>
                    software development
                  </span>
                  , and{" "}
                  <span className={"font-gilroysemibold"}>tech talents</span>.
                  We serve you the best resource with efficient cost, but high
                  maintenance.
                </p>
              </div>
              <div className={""}>
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
            </div>
            <div className={"w-1/4 grid justify-end self-center "}>
              <p
                className={
                  "text-sm text-darkgrey md:text-base font-gilroysemibold"
                }
              >
                {locale == "en" ? "Share" : "Bagikan"}
              </p>
              <div className={"mt-[22px] flex flex-col"}>
                <EmailShareButton
                  url={fullUrl} //eg. https://www.example.com
                  quotes={"halo"} //"Your Quotes"
                  hashtag={"#oke"}
                >
                  <img
                    src="/image/message-svg.png"
                    className={"mt-[22px] w-[42.88px] h-[42.88px]"}
                    alt=""
                  />
                </EmailShareButton>
                <FacebookShareButton
                  url={fullUrl} //eg. https://www.example.com
                  quotes={"halo"} //"Your Quotes"
                  hashtag={"#oke"}
                >
                  <img
                    src="/image/facebook-svg.png"
                    className={"mt-[22px] w-[43.75px] h-[43.75px]"}
                    alt=""
                  />
                </FacebookShareButton>
                <TwitterShareButton
                  url={fullUrl} //eg. https://www.example.com
                  quotes={"halo"} //"Your Quotes"
                  hashtag={"#oke"}
                >
                  <img
                    src="/image/twitter-svg.png"
                    className={"mt-[22px] w-[43.75px] h-[43.75px]"}
                    alt=""
                  />
                </TwitterShareButton>
                <img
                  onClick={copyToClipboard}
                  src="/image/share-svg.png"
                  className={"mt-[22px] w-[43.75px] h-[43.75px] cursor-pointer"}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        {/* ---------- */}
        {/* Phone View */}
        <div className={"block md:hidden py-8"}>
          <div className={"flex-col center"}>
            <div className={"text-center"}>
              <p className={"text-2xl font-gilroysemibold"}>
                Welcome to MIG Blog!
              </p>
            </div>
          </div>
          <div className={"flex-col mt-16"}>
            <img
              style={{
                width: "328px",
                height: "172px",
                marginRight: "auto",
                marginLeft: "auto",
              }}
              src="/image/landingpage/image-section1.png"
            />
          </div>
          <p
            className={
              " text-base text-center text-blackmig font-gilroyregular mt-16"
            }
          >
            MIG catalyzes your core business with{" "}
            <span className={"font-gilroysemibold"}>IT hardware solutions</span>
            ,<span className={"font-gilroysemibold"}>software development</span>
            , and <span className={"font-gilroysemibold"}>tech talents</span>.
            We serve you the best resource with efficient cost, but high
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
                    "text-sm text-center w-[223px] mt-7 text-white border-2 bg-primarygreen border-primarygreen py-3 pl-6 pr-[19px] rounded"
                  }
                >
                  <div className={"flex flex-row justify-between"}>
                    <p className={"text-xl font-gilroysemibold"}>
                      Explore Articles
                    </p>
                    <img
                      className={"self-center"}
                      style={{ width: "20px", height: "20px" }}
                      src="/image/landingpage/arrow-circle-down.png"
                    />
                  </div>
                </button>
              </Link>
            </div>
            <div className={"text-center mt-7"}>
              <p
                className={
                  "text-base text-darkgrey md:text-base font-gilroysemibold"
                }
              >
                {locale == "en" ? "Share" : "Bagikan"}
              </p>
            </div>
            <div className={"flex flex-row justify-between mt-4 mx-auto"}>
              <EmailShareButton
                url={fullUrl} //eg. https://www.example.com
                quotes={"halo"} //"Your Quotes"
                hashtag={"#oke"}
              >
                <img
                  src="/image/message-circle.png"
                  style={{ width: "42px", height: "42px" }}
                  alt=""
                />
              </EmailShareButton>
              <FacebookShareButton
                url={fullUrl} //eg. https://www.example.com
                quotes={"halo"} //"Your Quotes"
                hashtag={"#oke"}
              >
                <img
                  src="/image/facebook-circle.png"
                  className={""}
                  style={{ width: "42px", height: "42px" }}
                  alt=""
                />
              </FacebookShareButton>

              <TwitterShareButton
                url={fullUrl} //eg. https://www.example.com
                quotes={"halo"} //"Your Quotes"
                hashtag={"#oke"}
              >
                <img
                  src="/image/twitter-circle.png"
                  className={""}
                  style={{ width: "42px", height: "42px" }}
                  alt=""
                />
              </TwitterShareButton>

              <img
                onClick={copyToClipboard}
                src="/image/share-link.png"
                className={"cursor-pointer"}
                style={{ width: "42px", height: "42px" }}
                alt=""
              />
            </div>
          </div>
        </div>
        {/* ------------ */}
      </section>

      <section
        className={"allarticles py-4 md:py-[69px] px-[17px] md:px-[112px]"}
      >
        <div className={"flex flex-row justify-between mb-[5px]"}>
          <p
            className={"text-base md:text-xl font-gilroybold text-primarygreen"}
          >
            {locale == "en" ? "All Stories" : "Semua Testimoni"}
          </p>
          {/* <div className={"flex flex-row pr-4"}>
            <p
              className={
                "text-xs md:text-sm font-gilroyregular text-blackmig mr-4 self-center"
              }
            >
              Sort by
            </p>
            <Select
              className="ant-select-suffix"
              suffixIcon={
                <img
                  src="/image/landingpage/caret-down-outlined.png"
                  className="w-[10px] h-[5px] md:w-[20px] md:h-[10px]"
                  alt=""
                />
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
          </div> */}
        </div>
        <div className={"hidden md:grid md:grid-cols-4 gap-4"}>
          {articleList
            ? articleList.map((dataarticle) => (
                <Linkk
                  className={"cursor-pointer"}
                  href={`/customerstories/${dataarticle.page_path}`}
                >
                  <div className={"bg-white w-[292px] mt-4 p-4"}>
                    {dataarticle.attachment_article ? (
                      <img
                        className={"w-[260px] h-[184px] rounded-lg"}
                        src={generateStaticAssetUrl(
                          dataarticle.attachment_article.link
                        )}
                        alt=""
                      />
                    ) : (
                      <img
                        className={"w-[260px] h-[184px] rounded-lg"}
                        src="/image/blog.png"
                      />
                    )}
                    <div className={"mt-3"}>
                      <p className={"text-xs text-darkgrey"}>
                        by{" "}
                        <span className={"font-gilroysemibold"}>
                          {dataarticle.author
                            ? dataarticle.author + " "
                            : "Admin "}
                        </span>
                        on{" "}
                        <span className={"font-gilroysemibold"}>
                          {moment(dataarticle.createdAt).format("DD MMMM YYYY")}
                        </span>
                      </p>
                      <p className={"font-bold text-blackmig text-base mt-3"}>
                        {dataarticle.title}
                      </p>
                      {/* <p
                        className={
                          " text-blackmig font-gilroyregular text-xs mt-1.5"
                        }
                      >
                        
                    {dataarticle.description.length<130 ? dataarticle.description : dataarticle.description.substring(0,130) }
                      </p> */}
                      <div
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-flex",
                          lineClamp: "3",
                        }}
                        className="mt-1.5"
                        dangerouslySetInnerHTML={{
                          __html: dataarticle.description.substring(0, 100),
                        }}
                      />
                      <div className={"mt-1.5"}>
                        <span class="text-xs font-gilroyregular text-primarygreen bg-greenTrans20 mr-2 px-2 py-1 rounded-[20px]">
                          {dataarticle.tags}
                        </span>
                      </div>
                    </div>
                  </div>
                </Linkk>
              ))
            : ""}
        </div>
        {/* {articleList && (
          <div>
            <Pagination
              items={100} // 100
              currentPage={currentPage} // 1
              pageSize={pageSize} // 10
              onPageChange={onPageChange}
            />
          </div>
        )} */}

        <div className={"md:hidden"}>
          {articleList ? (
            articleList.map((dataarticle) => (
              <Linkk href={`/customerstories/${dataarticle.page_path}`}>
                <div
                  className={"bg-white w-full rounded-lg mt-3 p-4"}
                  style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
                >
                  {dataarticle.attachment_article ? (
                    <img
                      className={
                        "w-full h-[185px] rounded-lg flex justify-center"
                      }
                      src={generateStaticAssetUrl(
                        dataarticle.attachment_article.link
                      )}
                    />
                  ) : (
                    <img
                      className={
                        "w-full h-[185px] rounded-lg flex justify-center"
                      }
                      src="/image/blog.png"
                    />
                  )}
                  <div className={"mt-2"}>
                    <p
                      className={"text-[10px] text-darkgrey font-gilroyregular"}
                    >
                      by{" "}
                      <span className={"font-gilroysemibold"}>
                        {dataarticle.author ? dataarticle.author : "Admin"}
                      </span>
                      on{" "}
                      <span className={"font-gilroysemibold"}>
                        {moment(dataarticle.createdAt).format("DD MMMM YYYY")}
                      </span>
                    </p>
                    <p className={"font-gilroybold text-blackmig text-sm mt-2"}>
                      {locale == "en"
                        ? dataarticle.title
                        : dataarticle.title_id}
                    </p>
                    <p
                      className={
                        " text-blackmig font-gilroyregular text-xs mt-1.5"
                      }
                    >
                      {stripTags(dataarticle.description)}
                    </p>
                    <div className={"mt-1.5"}>
                      <span class="text-xs font-gilroyregular text-primarygreen bg-greenTrans20 mr-2 px-2 py-1 rounded-[20px]">
                        {dataarticle.tags}
                      </span>
                    </div>
                  </div>
                </div>
              </Linkk>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </section>
      {/* testimonial */}
      {/* client */}
      {/*section join mig*/}
      <section
        className={
          "section2landingpagebrowser mt-10 bg-bgjoinmig pt-8 md:pt-[53px] pb-[53px] md:pb-[134px] hidden md:block px-4 md:px-10 "
        }
      >
        <div className={"container mx-auto"}>
          <div className={"flex flex-row justify-center"}>
            <div className={"w-2/5 flex justify-end"}>
              <img
                src="/image/landingpage/career-mig.png"
                className={"w-[398px] h-[253px]"}
                alt=""
              />
            </div>
            <div className={"w-3/5 justify-self-start"}>
              <div className="flex flex-col items-start px-10">
                <h4 className="mb-2 text-2xl font-gilroysemibold text-blackmig">
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
                    <p className="text-left px-5 text-base text-blackmig font-gilroyregular">
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
                    <p className="text-left px-5 text-base text-blackmig font-gilroyregular">
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
                    <p className="text-left px-5 text-base text-blackmig font-gilroyregular">
                      We support personal growth through constant experiment and
                      learning
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <a href="/contactus">
                    <div className="flex border-2 border-primarygreen w-[264px] rounded px-4 py-2 justify-between">
                      <p className="text-base mr-2 text-primarygreen font-gilroysemibold">
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
          className={
            "text-xl text-blackmig text-center font-gilroysemibold py-8 md:py-0 px-4 w-[328px]"
          }
        >
          Hear what{" "}
          <span
            style={{
              borderBottom: "solid 3px #188E4D",
              paddingBottom: "2.5px",
            }}
          >
            our customers
          </span>{" "}
          said about us!
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
            <div className="flex mt-5 rounded mx-auto w-[264px] border-2 border-primarygreen pl-4 pr-[12.18px] py-2">
              <p className="text-base mr-2 text-primarygreen font-gilroysemibold">
                Read Our Customer Series
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
          "youronestop hidden md:flex md:flex-row md:justify-between bg-bgfooter pt-8"
        }
      >
        <div className={"justify-start self-end bg-red"}>
          <img
            style={{ width: "332px", height: "142px" }}
            src="/image/landingpage/footer-left.png"
          />
        </div>
        <div className={"container w-1/2 mx-auto"}>
          <div class="bg-white border-3 mx-auto  w-[645px] border-solid shadow-2xl rounded-[8px] text-center -mt-[144px] py-4 px-8">
            <p className={"text-2xl font-gilroysemibold text-blackmig"}>
              Want help on providing your IT needs?
            </p>
            <p className={"py-5 text-base font-gilroyregular text-blackmig"}>
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
                  <p
                    className={
                      "text-base font-gilroysemibold font-gilroysemibold mr-2"
                    }
                  >
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
          "contactusphone mt-8 md:relative block md:hidden md:flex bg-bgfooter pt-8"
        }
      >
        <div className={"container mx-auto"}>
          <div class="bg-white border-3 border-solid shadow-2xl rounded-[8px] text-center mx-5  -mt-30 py-4 px-8">
            <p className={"text-xl font-gilroysemibold"}>
              Fulfill your IT needs easily!
            </p>
            <p className={"py-5 text-sm font-gilroyregular"}>
              Need help in providing your needs? Whether they related to
              hardware, software, or even talent hiring? Contact us and hear
              what service can we offer to you and your company!
            </p>
            <Linkk href="/hardware">
              <button
                className={
                  "text-base text-center rounded text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 md:px-4"
                }
              >
                <div className={"flex flex-row justify-between"}>
                  <p
                    className={"px-1 text-base text-white font-gilroysemibold "}
                  >
                    Contact Us
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
        <div className={"flex justify-between self-end mt-[7.81px]"}>
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

export async function getStaticProps() {
  let dataBlogs = null;

  try {
    const resources = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getArticlePopularList`,
      {
        method: `GET`,
      }
    );
    console.log("hasil get api ", resources);
    const resjson = await resources.json();
    dataBlogs = resjson.data;
  } catch {}
  return {
    props: {
      dataBlog: dataBlogs || [],
    },
    revalidate: 60,
  };
}

export default CustomerStories;
