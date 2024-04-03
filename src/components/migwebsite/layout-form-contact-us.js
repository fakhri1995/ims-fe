import Head from "next/head";
import Link from "next/link";
import Linkk from "next/link";
import React from "react";

function LayoutFormContactUs({ title, description, button_title }) {
  return (
    <div>
      <section
        className={
          "youronestop mt-16 hidden md:block md:flex md:flex-row md:justify-between bg-bgfooter pt-[90px]"
        }
      >
        <div className={"justify-start self-end bg-red"}>
          <img
            style={{ width: "332px", height: "142px" }}
            src="/image/landingpage/footer-left.png"
          />
        </div>
        <div className={"container w-1/2 mx-auto"}>
          <div className="bg-white border-3 mx-auto  w-[645px] border-solid shadow-2xl rounded-[8px] text-center -mt-16 py-4 px-8">
            <h2
              style={{ lineHeight: "120%" }}
              className={"text-[28px] font-gilroysemibold text-black"}
            >
              {title ? title : "Fulfill your IT needs easily!"}
            </h2>
            <p
              style={{ lineHeight: "150%" }}
              className={"py-5 text-xl font-gilroyregular text-black"}
            >
              {description
                ? description
                : `Need help in providing your needs? Whether they related to
              hardware, software, or even talent hiring? Contact us and hear
              what service can we offer to you and your company!`}
            </p>
            <Linkk href="/contactus">
              <button
                className={
                  "text-sm -mt-10 text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 md:px-4 mt-4"
                }
              >
                <div className={"flex flex-row justify-between"}>
                  <p
                    className={
                      "text-xl gilroy-semibold font-gilroysemibold mr-2"
                    }
                  >
                    {button_title ? button_title : `Contact Us`}
                  </p>
                  <img
                    className={"self-center ml-2"}
                    style={{ height: "20px", width: "20px" }}
                    src="/image/landingpage/arrow_forward.png"
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
          "contactusphone mt-20 md:relative block md:hidden md:flex bg-bgfooter pt-8"
        }
      >
        <div className={"container mx-auto"}>
          <div className="bg-white border-3 border-solid shadow-2xl rounded-[8px] text-center mx-5  -mt-24 py-4 px-8">
            <p className={"text-xl font-gilroysemibold"}>
              {title ? title : "Fulfill your IT needs easily!"}
            </p>
            <p className={"py-5 text-sm font-gilroyregular"}>
              {description
                ? description
                : `Need help in providing your needs? Whether they related to
              hardware, software, or even talent hiring? Contact us and hear
              what service can we offer to you and your company!`}
            </p>
            <Linkk href="/contactus">
              <button
                className={
                  "text-base text-center rounded  text-white border-2 bg-primarygreen border-primarygreen px-4 py-2 md:px-4"
                }
              >
                <div className={"flex flex-row justify-between"}>
                  <p className={"px-1"}>
                    {button_title ? button_title : "Contact Us"}
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
    </div>
  );
}

export default LayoutFormContactUs;
