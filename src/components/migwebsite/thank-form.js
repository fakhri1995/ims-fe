import { CheckCircleTwoTone } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Select, notification } from "antd";
import Head from "next/head";
import Link from "next/link";
import Linkk from "next/link";
import React from "react";

function ThankForm({ type_form }) {
  return (
    <div className={"mx-auto py-12"}>
      <div className={"w-[391px] text-center"}>
        <p
          className={
            "text-blackmig text-2xl lg:text-[32px] font-gilroysemibold"
          }
        >
          Thank you for submitting!
        </p>
        <p className={"text-sm lg:text-base text-blackmig gilroy-regular mt-3"}>
          We’ll get back to you as soon as possible
        </p>
        <div className={"flex justify-center"}>
          <img
            className={"w-[250px] lg:w-[346px] h-[149px] lg:h-[206px] mt-6"}
            src="/image/landingpage/Talents-2.png"
          />
        </div>
        <p
          className={
            "text-sm lg:text-base text-blackmig gilroy-regular mt-9 lg:mt-6"
          }
        >
          In the meantime, check our two other services:
        </p>
        {type_form == "Hardware" ? (
          <div className={"mt-3 flex flex-row justify-between"}>
            <Link href={{ pathname: "/software" }}>
              <button
                className={
                  "w-[175px] bg-primarygreen rounded py-2 pl-4 pr-[12.18px] flex flex-row justify-between"
                }
              >
                <p className={"text-white text-base font-gilroysemibold"}>
                  Go to Software
                </p>
                <img
                  src="image/landingpage/arrow_forward_ios2.png"
                  className={"w-5 h-5 self-center"}
                />
              </button>
            </Link>
            <Link href={{ pathname: "/talents" }}>
              <button
                className={
                  "w-[160px] bg-primarygreen rounded py-2 pl-4 pr-[12.18px] flex flex-row justify-between"
                }
              >
                <p className={"text-white text-base font-gilroysemibold"}>
                  Go to Talents
                </p>
                <img
                  src="image/landingpage/arrow_forward_ios2.png"
                  className={"w-5 h-5 self-center"}
                />
              </button>
            </Link>
          </div>
        ) : type_form == "Software" ? (
          <div className={"mt-3 flex flex-row justify-between"}>
            <Link href={{ pathname: "/talents" }}>
              <button
                className={
                  "w-[153px] bg-primarygreen rounded py-2 pl-4 pr-[12.18px] flex flex-row justify-between"
                }
              >
                <p className={"text-white text-base font-gilroysemibold"}>
                  Go to Talent
                </p>
                <img
                  src="image/landingpage/arrow_forward_ios2.png"
                  className={"w-5 h-5 self-center"}
                />
              </button>
            </Link>
            <Link href={{ pathname: "/hardware" }}>
              <button
                className={
                  "w-[180px] bg-primarygreen rounded py-2 pl-4 pr-[12.18px] flex flex-row justify-between"
                }
              >
                <p className={"text-white text-base font-gilroysemibold"}>
                  Go to Hardware
                </p>
                <img
                  src="image/landingpage/arrow_forward_ios2.png"
                  className={"w-5 h-5 self-center"}
                />
              </button>
            </Link>
          </div>
        ) : (
          <div className={"mt-3 flex flex-row justify-between"}>
            <Link href={{ pathname: "/software" }}>
              <button
                className={
                  "w-[175px] bg-primarygreen rounded py-2 pl-4 pr-[12.18px] flex flex-row justify-between"
                }
              >
                <p className={"text-white text-base font-gilroysemibold"}>
                  Go to Software
                </p>
                <img
                  src="image/landingpage/arrow_forward_ios2.png"
                  className={"w-5 h-5 self-center"}
                />
              </button>
            </Link>
            <Link href={{ pathname: "/hardware" }}>
              <button
                className={
                  "w-[180px] bg-primarygreen rounded py-2 pl-4 pr-[12.18px] flex flex-row justify-between"
                }
              >
                <p className={"text-white text-base font-gilroysemibold"}>
                  Go to Hardware
                </p>
                <img
                  src="image/landingpage/arrow_forward_ios2.png"
                  className={"w-5 h-5 self-center"}
                />
              </button>
            </Link>
          </div>
        )}
        <p className={"mt-3 text-sm text-blackmig"}>Or</p>
        <Link href={{ pathname: "/" }}>
          <button
            className={
              "mt-3 border-2 py-2 px-4 border-primarygreen bg-white text-primarygreen font-gilroysemibold rounded text-base"
            }
          >
            <p>Back to Home</p>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ThankForm;
