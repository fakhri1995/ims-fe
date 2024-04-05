import {
  CheckCircleOutlined,
  LeftOutlined,
  LoadingOutlined,
  RiseOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Skeleton,
  Spin,
  Tooltip,
  Upload,
  notification,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import type { RcFile } from "antd/lib/upload";
import type { AxiosError } from "axios";
import parse from "html-react-parser";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { formatDateToLocale } from "lib/date-utils";
import { getBase64 } from "lib/helper";

import { useApplyCareer, useGetPostedCareer } from "apis/career_v2";

import BgApplyForm from "assets/vectors/bg-apply-form.svg";

import { BackIconSvg } from "../../../icon";
import {
  AccessTimeIconSvg,
  ArchivedIconSvg,
  SpinnerIconSvg,
  WorkIconSvg,
} from "../../../icon";
import styles from "./CareersDetail.module.scss";

export const RelateJob: FC = () => {
  /**
   * Dependencies
   */
  const currencyI18n = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  const dataDummy = [
    {
      id: 1,
      name: "Senior UI/UX Designer",
      date: "22 Januari 2023",
      salary_min: 5000000,
      salary_max: 10000000,
      contract_type: "Fulltime",
      experience: "2-3 Tahun",
    },
    {
      id: 2,
      name: "Senior UI/UX Designer",
      date: "22 Januari 2023",
      salary_min: 5000000,
      salary_max: 10000000,
      contract_type: "Fulltime",
      experience: "2-3 Tahun",
    },
    {
      id: 3,
      name: "Senior UI/UX Designer",
      date: "22 Januari 2023",
      salary_min: 5000000,
      salary_max: 10000000,
      contract_type: "Fulltime",
      experience: "2-3 Tahun",
    },
    {
      id: 4,
      name: "Senior UI/UX Designer",
      date: "22 Januari 2023",
      salary_min: 5000000,
      salary_max: 10000000,
      contract_type: "Fulltime",
      experience: "2-3 Tahun",
    },
    {
      id: 5,
      name: "Senior UI/UX Designer",
      date: "22 Januari 2023",
      salary_min: 5000000,
      salary_max: 10000000,
      contract_type: "Fulltime",
      experience: "2-3 Tahun",
    },
    {
      id: 6,
      name: "Senior UI/UX Designer",
      date: "22 Januari 2023",
      salary_min: 5000000,
      salary_max: 10000000,
      contract_type: "Fulltime",
      experience: "2-3 Tahun",
    },
  ];
  // const cobashowthankyou = () => {
  //   setShowThankyou("half");
  //   setTimeout(() => {
  //     setShowThankyou("full");
  //   }, 3000);
  // };

  return (
    <section className="py-8 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 flex flex-col mt-16">
      <p className={"text-mono30 text-base font-bold leading-6"}>
        Related Job Vacancy
      </p>
      <div className={"grid grid-cols-4 gap-8"}>
        {dataDummy.map((data, key) => (
          <div
            style={{ boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.05)" }}
            className={
              "mt-4 p-6 flex flex-col rounded-[5px] bg-white items-start self-stretch"
            }
          >
            <p className={"text-[18px] text-mono30 font-bold leading-6"}>
              {data.name}
            </p>
            <p className={"text-xs text-mono30 font-medium leading-5 mt-3"}>
              Posted on {data.date}
            </p>
            <div className={"flex flex-row gap-3 mt-[26px]"}>
              <WorkIconSvg />
              <p
                className={
                  "font-gilroyregular text-xs font-medium leading-6 text-blackmig"
                }
              >
                {currencyI18n.format(data.salary_min)} -{" "}
                {currencyI18n.format(data.salary_max)}
              </p>
            </div>
            <div className={"flex flex-row gap-3 mt-4"}>
              <ArchivedIconSvg size={20} color={"#585858"} />
              <p
                className={
                  "font-gilroyregular text-xs font-medium leading-6 text-blackmig"
                }
              >
                {data.contract_type}
              </p>
            </div>
            <div className={"flex flex-row gap-3 mt-4"}>
              <AccessTimeIconSvg size={20} color={"#585858"} />
              <p
                className={
                  "font-gilroyregular text-xs font-medium leading-6 text-blackmig"
                }
              >
                {data.experience}
              </p>
            </div>
            <div
              className={
                "mt-6 flex justify-center items-center gap-[9px] bg-primarygreen rounded py-4 w-full hover:cursor-pointer"
              }
            >
              <p
                className={
                  "text-[16px] font-gilroysemibold font-normal leading-6 text-white"
                }
              >
                Apply Now
              </p>
              <RiseOutlined style={{ fontSize: 20, color: "#FFFFFF" }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
