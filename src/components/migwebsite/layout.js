import {
  CaretDownOutlined,
  InstagramFilled,
  LinkedinFilled,
} from "@ant-design/icons";
import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";
import { Button, Dropdown, Layout, Menu, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import Bounce from "react-reveal/Bounce";

import en from "../../locales/en";
import id from "../../locales/id";
import Head from "./head";
import Styles from "./styles";

function layout({ children }) {
  const router = useRouter();

  const { locale } = router;
  const t = locale === "en" ? en : id;
  const { Header, Content, Footer } = Layout;
  const [countArticle, setCountArticle] = useState(null);
  const [countStories, setCountStories] = useState(null);
  const menu = (
    <div
      className={"bg-white w-96 h-auto p-2 top-6 relative"}
      // style={{ boxShadow: "0px 0px 3px rgba(50, 50, 50, 0.75)" }}
    >
      <Link href="/hardware">
        <div className={"group flex py-2 cursor-pointer hover:bg-gray-100"}>
          <div className={"px-4 my-auto w-1/6"}>
            {/* <img className={'relative -top-5'} width={40} src={'/image/navbar/hardware_black.png'}></img> */}
            <svg
              className={
                "relative -top-5 fill-current text-black group-hover:text-green-500"
              }
              width="30"
              height="30"
              viewBox="0 0 72 72"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.2"
                d="M9 42.75V18C9 16.8065 9.47411 15.6619 10.318 14.818C11.1619 13.9741 12.3065 13.5 13.5 13.5H58.5C59.6935 13.5 60.8381 13.9741 61.682 14.818C62.5259 15.6619 63 16.8065 63 18V42.75H9Z"
              />
              <path d="M58.5 11.25H13.5C11.7121 11.2574 9.99948 11.9709 8.73521 13.2352C7.47094 14.4995 6.7574 16.2121 6.75 18V49.5C6.7574 51.2879 7.47094 53.0005 8.73521 54.2648C9.99948 55.5291 11.7121 56.2426 13.5 56.25H33.75V60.75H27C26.4033 60.75 25.831 60.9871 25.409 61.409C24.9871 61.831 24.75 62.4033 24.75 63C24.75 63.5967 24.9871 64.169 25.409 64.591C25.831 65.0129 26.4033 65.25 27 65.25H45C45.5967 65.25 46.169 65.0129 46.591 64.591C47.0129 64.169 47.25 63.5967 47.25 63C47.25 62.4033 47.0129 61.831 46.591 61.409C46.169 60.9871 45.5967 60.75 45 60.75H38.25V56.25H58.5C60.2879 56.2426 62.0005 55.5291 63.2648 54.2648C64.5291 53.0005 65.2426 51.2879 65.25 49.5V18C65.2426 16.2121 64.5291 14.4995 63.2648 13.2352C62.0005 11.9709 60.2879 11.2574 58.5 11.25ZM13.5 15.75H58.5C59.0967 15.75 59.669 15.9871 60.091 16.409C60.5129 16.831 60.75 17.4033 60.75 18V40.5H11.25V18C11.25 17.4033 11.4871 16.831 11.909 16.409C12.331 15.9871 12.9033 15.75 13.5 15.75ZM58.5 51.75H13.5C12.9033 51.75 12.331 51.5129 11.909 51.091C11.4871 50.669 11.25 50.0967 11.25 49.5V45H60.75V49.5C60.75 50.0967 60.5129 50.669 60.091 51.091C59.669 51.5129 59.0967 51.75 58.5 51.75Z" />
            </svg>
          </div>
          <div className={"w-5/6"}>
            <p className={"text-lg gilroy-medium group-hover:text-green-500"}>
              Hardware
            </p>
            <p
              className={
                "text-sm font-gilroyregular group-hover:text-green-500"
              }
            >
              {t.hardwaredescriptionnavbar}
            </p>
          </div>
        </div>
      </Link>
      <Link href="/software">
        <div className={"group flex py-2 cursor-pointer hover:bg-gray-100"}>
          <div className={"px-4 my-auto w-1/6"}>
            <svg
              className={
                "relative -top-5 fill-current text-black group-hover:text-green-500"
              }
              width="30"
              height="30"
              viewBox="0 0 72 72"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.2"
                d="M63 15.75V56.25C63 56.8467 62.7629 57.419 62.341 57.841C61.919 58.2629 61.3467 58.5 60.75 58.5H11.25C10.6533 58.5 10.081 58.2629 9.65901 57.841C9.23705 57.419 9 56.8467 9 56.25V15.75C9 15.1533 9.23705 14.581 9.65901 14.159C10.081 13.7371 10.6533 13.5 11.25 13.5H60.75C61.3467 13.5 61.919 13.7371 62.341 14.159C62.7629 14.581 63 15.1533 63 15.75Z"
              />
              <path d="M60.75 11.25H11.25C10.0565 11.25 8.91193 11.7241 8.06802 12.568C7.22411 13.4119 6.75 14.5565 6.75 15.75V56.25C6.75 57.4435 7.22411 58.5881 8.06802 59.432C8.91193 60.2759 10.0565 60.75 11.25 60.75H60.75C61.9435 60.75 63.0881 60.2759 63.932 59.432C64.7759 58.5881 65.25 57.4435 65.25 56.25V15.75C65.25 14.5565 64.7759 13.4119 63.932 12.568C63.0881 11.7241 61.9435 11.25 60.75 11.25ZM60.75 56.25H11.25V15.75H60.75V56.25ZM22.5 23.625C22.5 24.2925 22.3021 24.945 21.9312 25.5C21.5604 26.0551 21.0333 26.4876 20.4166 26.7431C19.7999 26.9985 19.1213 27.0654 18.4666 26.9352C17.8119 26.8049 17.2105 26.4835 16.7385 26.0115C16.2665 25.5395 15.9451 24.9381 15.8148 24.2834C15.6846 23.6287 15.7515 22.9501 16.0069 22.3334C16.2624 21.7167 16.6949 21.1896 17.25 20.8188C17.805 20.4479 18.4575 20.25 19.125 20.25C20.0201 20.25 20.8786 20.6056 21.5115 21.2385C22.1444 21.8714 22.5 22.7299 22.5 23.625ZM33.75 23.625C33.75 24.2925 33.5521 24.945 33.1812 25.5C32.8104 26.0551 32.2833 26.4876 31.6666 26.7431C31.0499 26.9985 30.3713 27.0654 29.7166 26.9352C29.0619 26.8049 28.4605 26.4835 27.9885 26.0115C27.5165 25.5395 27.1951 24.9381 27.0648 24.2834C26.9346 23.6287 27.0015 22.9501 27.2569 22.3334C27.5124 21.7167 27.9449 21.1896 28.5 20.8188C29.055 20.4479 29.7075 20.25 30.375 20.25C31.2701 20.25 32.1286 20.6056 32.7615 21.2385C33.3944 21.8714 33.75 22.7299 33.75 23.625Z" />
            </svg>
          </div>
          <div className={"w-5/6"}>
            <p className={"text-lg gilroy-medium group-hover:text-green-500"}>
              Software
            </p>
            <p
              className={
                "text-sm font-gilroyregular group-hover:text-green-500"
              }
            >
              {t.softwaredescriptionnavbar}
            </p>
          </div>
        </div>
      </Link>
      <Link href="/talents">
        <div className={"group flex py-2 cursor-pointer hover:bg-gray-100"}>
          <div className={"px-4 my-auto w-1/6"}>
            <svg
              className={
                "relative -top-5 fill-current text-black group-hover:text-green-500"
              }
              width="30"
              height="30"
              viewBox="0 0 72 72"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.2"
                d="M31.5 47.25C31.5 49.03 30.9722 50.7701 29.9832 52.2501C28.9943 53.7302 27.5887 54.8837 25.9442 55.5649C24.2996 56.2461 22.49 56.4243 20.7442 56.0771C18.9984 55.7298 17.3947 54.8726 16.136 53.614C14.8774 52.3553 14.0202 50.7516 13.6729 49.0058C13.3257 47.26 13.5039 45.4504 14.1851 43.8059C14.8663 42.1613 16.0198 40.7557 17.4999 39.7668C18.9799 38.7778 20.72 38.25 22.5 38.25C24.887 38.25 27.1761 39.1982 28.864 40.886C30.5518 42.5739 31.5 44.8631 31.5 47.25ZM22.5 9C20.72 9 18.9799 9.52784 17.4999 10.5168C16.0198 11.5057 14.8663 12.9113 14.1851 14.5559C13.5039 16.2004 13.3257 18.01 13.6729 19.7558C14.0202 21.5016 14.8774 23.1053 16.136 24.364C17.3947 25.6226 18.9984 26.4798 20.7442 26.8271C22.49 27.1743 24.2996 26.9961 25.9442 26.3149C27.5887 25.6337 28.9943 24.4802 29.9832 23.0001C30.9722 21.5201 31.5 19.78 31.5 18C31.5 15.6131 30.5518 13.3239 28.864 11.636C27.1761 9.94821 24.887 9 22.5 9ZM49.5 38.25C47.72 38.25 45.9799 38.7778 44.4999 39.7668C43.0198 40.7557 41.8663 42.1613 41.1851 43.8059C40.5039 45.4504 40.3257 47.26 40.6729 49.0058C41.0202 50.7516 41.8774 52.3553 43.136 53.614C44.3947 54.8726 45.9984 55.7298 47.7442 56.0771C49.49 56.4243 51.2996 56.2461 52.9442 55.5649C54.5887 54.8837 55.9943 53.7302 56.9832 52.2501C57.9722 50.7701 58.5 49.03 58.5 47.25C58.5 44.8631 57.5518 42.5739 55.864 40.886C54.1761 39.1982 51.887 38.25 49.5 38.25ZM49.5 27C51.28 27 53.0201 26.4722 54.5001 25.4832C55.9802 24.4943 57.1337 23.0887 57.8149 21.4442C58.4961 19.7996 58.6743 17.99 58.3271 16.2442C57.9798 14.4984 57.1226 12.8947 55.864 11.636C54.6053 10.3774 53.0016 9.5202 51.2558 9.17294C49.51 8.82567 47.7004 9.0039 46.0559 9.68509C44.4113 10.3663 43.0057 11.5198 42.0168 12.9999C41.0278 14.4799 40.5 16.22 40.5 18C40.5 20.387 41.4482 22.6761 43.136 24.364C44.8239 26.0518 47.1131 27 49.5 27Z"
              />
              <path d="M7.65001 35.55C8.03647 35.8478 8.51217 36.0063 9.00001 36C9.34931 36 9.69382 35.9186 10.0062 35.7624C10.3187 35.6062 10.5904 35.3794 10.8 35.1C12.1606 33.2873 13.9239 31.8157 15.9508 30.8013C17.9776 29.7868 20.2124 29.2574 22.4789 29.2546C24.7454 29.2519 26.9816 29.776 29.0108 30.7855C31.0401 31.7951 32.8069 33.2625 34.1719 35.0718L34.3406 35.2687H34.3688C34.3969 35.325 34.4531 35.3531 34.5094 35.4093H34.5656L34.65 35.4937H34.6781C34.7557 35.5595 34.8407 35.6162 34.9313 35.6625L35.0156 35.7187L35.2688 35.8312H35.3531L35.5781 35.8875H36.5063L36.9844 35.7187H37.0406L37.1813 35.6343L37.2656 35.5781L37.35 35.5219C37.3575 35.5218 37.3646 35.5189 37.3699 35.5136C37.3752 35.5083 37.3781 35.5012 37.3781 35.4937L37.4625 35.4375L37.6031 35.2968H37.6313L37.8 35.1281C39.1623 33.3117 40.9287 31.8375 42.9595 30.8221C44.9903 29.8067 47.2295 29.2781 49.5 29.2781C51.7705 29.2781 54.0097 29.8067 56.0405 30.8221C58.0713 31.8375 59.8377 33.3117 61.2 35.1281C61.5625 35.5993 62.0949 35.9101 62.6834 35.9942C63.272 36.0783 63.8701 35.9289 64.35 35.5781C64.5864 35.4008 64.7855 35.1787 64.9361 34.9245C65.0866 34.6702 65.1856 34.3888 65.2274 34.0963C65.2692 33.8038 65.2529 33.5059 65.1796 33.2197C65.1063 32.9335 64.9773 32.6645 64.8 32.4281C62.8124 29.7449 60.155 27.6306 57.0938 26.2968C58.7669 24.7662 59.9383 22.7657 60.4546 20.5576C60.9708 18.3495 60.8078 16.0369 59.9867 13.9232C59.1657 11.8094 57.725 9.99306 55.8537 8.71237C53.9823 7.43168 51.7676 6.7464 49.5 6.7464C47.2324 6.7464 45.0177 7.43168 43.1463 8.71237C41.275 9.99306 39.8343 11.8094 39.0133 13.9232C38.1923 16.0369 38.0292 18.3495 38.5454 20.5576C39.0617 22.7657 40.2332 24.7662 41.9063 26.2968C39.7026 27.2551 37.699 28.6195 36 30.3187C34.301 28.6195 32.2974 27.2551 30.0938 26.2968C31.7669 24.7662 32.9383 22.7657 33.4546 20.5576C33.9708 18.3495 33.8078 16.0369 32.9867 13.9232C32.1657 11.8094 30.725 9.99306 28.8537 8.71237C26.9823 7.43168 24.7676 6.7464 22.5 6.7464C20.2324 6.7464 18.0177 7.43168 16.1463 8.71237C14.275 9.99306 12.8343 11.8094 12.0133 13.9232C11.1923 16.0369 11.0292 18.3495 11.5454 20.5576C12.0617 22.7657 13.2332 24.7662 14.9063 26.2968C11.8483 27.6228 9.19122 29.7271 7.20001 32.4C7.02272 32.6364 6.89373 32.9053 6.8204 33.1916C6.74707 33.4778 6.73084 33.7757 6.77262 34.0682C6.81441 34.3607 6.9134 34.6421 7.06394 34.8963C7.21448 35.1506 7.41363 35.3727 7.65001 35.55ZM42.75 18C42.75 16.6649 43.1459 15.3599 43.8876 14.2499C44.6293 13.1398 45.6835 12.2747 46.9169 11.7638C48.1503 11.2529 49.5075 11.1192 50.8169 11.3797C52.1262 11.6401 53.329 12.283 54.273 13.227C55.217 14.171 55.8599 15.3737 56.1203 16.6831C56.3808 17.9925 56.2471 19.3497 55.7362 20.5831C55.2253 21.8165 54.3601 22.8707 53.2501 23.6124C52.1401 24.3541 50.835 24.75 49.5 24.75C47.7121 24.7426 45.9995 24.029 44.7352 22.7648C43.4709 21.5005 42.7574 19.7879 42.75 18ZM15.75 18C15.75 16.6649 16.1459 15.3599 16.8876 14.2499C17.6293 13.1398 18.6835 12.2747 19.9169 11.7638C21.1503 11.2529 22.5075 11.1192 23.8169 11.3797C25.1262 11.6401 26.329 12.283 27.273 13.227C28.217 14.171 28.8599 15.3737 29.1203 16.6831C29.3808 17.9925 29.2471 19.3497 28.7362 20.5831C28.2253 21.8165 27.3601 22.8707 26.2501 23.6124C25.1401 24.3541 23.835 24.75 22.5 24.75C20.7121 24.7426 18.9995 24.029 17.7352 22.7648C16.4709 21.5005 15.7574 19.7879 15.75 18ZM57.0938 55.5468C58.7669 54.0162 59.9383 52.0157 60.4546 49.8076C60.9708 47.5995 60.8078 45.2869 59.9867 43.1732C59.1657 41.0594 57.725 39.2431 55.8537 37.9624C53.9823 36.6817 51.7676 35.9964 49.5 35.9964C47.2324 35.9964 45.0177 36.6817 43.1463 37.9624C41.275 39.2431 39.8343 41.0594 39.0133 43.1732C38.1923 45.2869 38.0292 47.5995 38.5454 49.8076C39.0617 52.0157 40.2332 54.0162 41.9063 55.5468C39.7026 56.5051 37.699 57.8695 36 59.5687C34.301 57.8695 32.2974 56.5051 30.0938 55.5468C31.7669 54.0162 32.9383 52.0157 33.4546 49.8076C33.9708 47.5995 33.8078 45.2869 32.9867 43.1732C32.1657 41.0594 30.725 39.2431 28.8537 37.9624C26.9823 36.6817 24.7676 35.9964 22.5 35.9964C20.2324 35.9964 18.0177 36.6817 16.1463 37.9624C14.275 39.2431 12.8343 41.0594 12.0133 43.1732C11.1923 45.2869 11.0292 47.5995 11.5454 49.8076C12.0617 52.0157 13.2332 54.0162 14.9063 55.5468C11.8483 56.8728 9.19122 58.9771 7.20001 61.65C6.84197 62.1274 6.68823 62.7274 6.77262 63.3182C6.85701 63.9089 7.17262 64.4419 7.65001 64.8C8.03647 65.0978 8.51217 65.2563 9.00001 65.25C9.34931 65.25 9.69382 65.1686 10.0062 65.0124C10.3187 64.8562 10.5904 64.6294 10.8 64.35C12.1606 62.5373 13.9239 61.0657 15.9508 60.0513C17.9776 59.0368 20.2124 58.5073 22.4789 58.5046C24.7454 58.5019 26.9816 59.026 29.0108 60.0355C31.0401 61.0451 32.8069 62.5125 34.1719 64.3218L34.3406 64.5187H34.3688L34.5094 64.6593H34.5656L34.65 64.7437H34.6781L34.9313 64.9125L35.0156 64.9687L35.2688 65.0812H35.3531L35.5781 65.1375H36.5344L36.7313 65.0531H36.7594L36.9844 64.9687H37.0406L37.1813 64.8843L37.2656 64.8281L37.35 64.7719H37.3781L37.4625 64.7156L37.6031 64.575H37.6313L37.8 64.4062C39.1623 62.5899 40.9287 61.1156 42.9595 60.1002C44.9903 59.0848 47.2295 58.5562 49.5 58.5562C51.7705 58.5562 54.0097 59.0848 56.0405 60.1002C58.0713 61.1156 59.8377 62.5899 61.2 64.4062C61.5625 64.8774 62.0949 65.1882 62.6834 65.2723C63.272 65.3564 63.8701 65.2071 64.35 64.8562C64.5864 64.6789 64.7855 64.4568 64.9361 64.2026C65.0866 63.9483 65.1856 63.6669 65.2274 63.3744C65.2692 63.0819 65.2529 62.784 65.1796 62.4978C65.1063 62.2116 64.9773 61.9426 64.8 61.7062C62.816 59.0127 60.1583 56.8884 57.0938 55.5468ZM15.75 47.25C15.75 45.915 16.1459 44.6099 16.8876 43.4999C17.6293 42.3898 18.6835 41.5247 19.9169 41.0138C21.1503 40.5029 22.5075 40.3692 23.8169 40.6297C25.1262 40.8901 26.329 41.533 27.273 42.477C28.217 43.421 28.8599 44.6237 29.1203 45.9331C29.3808 47.2425 29.2471 48.5997 28.7362 49.8331C28.2253 51.0665 27.3601 52.1207 26.2501 52.8624C25.1401 53.6041 23.835 54 22.5 54C20.7121 53.9926 18.9995 53.279 17.7352 52.0148C16.4709 50.7505 15.7574 49.0379 15.75 47.25ZM42.75 47.25C42.75 45.915 43.1459 44.6099 43.8876 43.4999C44.6293 42.3898 45.6835 41.5247 46.9169 41.0138C48.1503 40.5029 49.5075 40.3692 50.8169 40.6297C52.1262 40.8901 53.329 41.533 54.273 42.477C55.217 43.421 55.8599 44.6237 56.1203 45.9331C56.3808 47.2425 56.2471 48.5997 55.7362 49.8331C55.2253 51.0665 54.3601 52.1207 53.2501 52.8624C52.1401 53.6041 50.835 54 49.5 54C47.7121 53.9926 45.9995 53.279 44.7352 52.0148C43.4709 50.7505 42.7574 49.0379 42.75 47.25Z" />
            </svg>
          </div>
          <div className={"w-5/6"}>
            <p className={"text-lg gilroy-medium group-hover:text-green-500"}>
              Talents
            </p>
            <p
              className={
                "text-sm font-gilroyregular group-hover:text-green-500"
              }
            >
              {t.talentdescriptionnavbar}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );

  const menuResources = (
    <div
      className={"bg-white px-2 py-4 flex flex-col"}
      // style={{ boxShadow: "0px 0px 3px rgba(50, 50, 50, 0.75)" }}
    >
      {countStories > 0 && (
        <Link href="/customerstories">
          <Button
            className={"bg-transparent border-0 border-white "}
            // onClick={() => changeLanguage("en")}
          >
            <p className={"text-lg gilroy-medium self-center"}>
              {locale == "en" ? "Customer Stories" : "Klien Kami"}
            </p>
          </Button>
        </Link>
      )}
      {console.log("jumlah article ", countStories)}

      {countArticle > 0 && (
        <Link href="/blog">
          <Button
            className={"bg-transparent border-0 border-white  my-4 pb-4"}
            // onClick={() => changeLanguage("id")}
          >
            <p className={"text-lg gilroy-medium self-center"}>Blog</p>
          </Button>
        </Link>
      )}
    </div>
  );
  const menuLanguanges = (
    <div
      className={"bg-transparent px-2 py-4 flex flex-col"}
      // style={{ boxShadow: "0px 0px 3px rgba(50, 50, 50, 0.75)" }}
    >
      <Button
        className={"bg-transparent border-0 border-white "}
        onClick={() => changeLanguage("en")}
      >
        <div className={"flex flex-row"}>
          <img
            className={"self-center w-[40px] h-[20px]"}
            src={"/image/english.png"}
          />
          <div className={"ml-4"}>
            <p className={"text-lg gilroy-medium items-center self-center"}>
              English
            </p>
          </div>
        </div>
      </Button>
      <Button
        className={"bg-transparent border-0 border-white "}
        onClick={() => changeLanguage("id")}
      >
        <div className={"flex flex-row"}>
          <img
            className={"self-center w-[40px] h-[20px]"}
            src={"/image/indonesia.png"}
          />
          <div className={"ml-4"}>
            <p className={"text-lg gilroy-medium items-center self-center"}>
              Indonesia
            </p>
          </div>
        </div>
      </Button>
      {/* <Button
        className={"bg-transparent border-0 border-white"}
        onClick={() => changeLanguage("id")}
      >
        <div className={"flex flex-row"}>
          <img
            className={"self-center"}
            width={40}
            height={40}
            src={"/image/indonesia.png"}
          />
          <div className={"ml-4"}>
            <p className={"text-lg gilroy-medium items-center self-center"}>Indonesia</p>
          </div>
        </div>
      </Button> */}
    </div>
  );
  const [kelas, setKelas] = useState("notShadow");

  const handleScroll = () => {
    setKelas("notShadow");
  };
  useEffect(() => {
    window.onscroll = () => {
      handleScroll();
    };
  }, []);

  useEffect(() => {
    getCountArticle();
    getCountStories();
  }, []);
  const getCountArticle = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getCountArticle`, {
      method: `GET`,
    })
      .then((res) => res.json())
      .then((res2) => {
        console.log("get data testimonial ", res2);
        if (res2.success) {
          // setDataTestimonial(res2.data);
          setCountArticle(res2.data);
        } else {
        }
      })
      .catch((err) => {})
      .finally(() => {
        // setLoadingEmployees(false);
      });
  };
  const getCountStories = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getCountCustomerStories`, {
      method: `GET`,
    })
      .then((res) => res.json())
      .then((res2) => {
        console.log("get data testimonial ", res2);
        if (res2.success) {
          // setDataTestimonial(res2.data);
          setCountStories(res2.data);
        } else {
        }
      })
      .catch((err) => {})
      .finally(() => {
        // setLoadingEmployees(false);
      });
  };

  const [navbar, setNavbar] = useState(true); //true for hidden
  const [navbarBottom, setNavbarBottom] = useState(true); //true for hidden

  const handleNavbar = () => {
    console.log("handle navbar ");
    setNavbar(!navbar);
    setNavbarSolution(true); //true for hidden
    setNavbarCompany(true); //true for hidden
  };
  const handleNavbarBottom = () => {
    if (navbarBottom == true) {
      setTimeout(() => {
        setNavbarBottom(!navbarBottom);
      }, 600);
    } else {
      setNavbarBottom(!navbarBottom);
    }
  };
  const changeLanguage = (e) => {
    const locale = e;
    console.log("change language");
    console.log("router pathname ", router.pathname);
    console.log("router.asPath ", router.asPath);
    console.log("router locale ", router.locale);
    let datatemp = router.asPath;
    let datasplit = datatemp.split("/");
    for (let a = 0; a < datasplit.length; a++) {
      console.log("data ke ", datasplit[a]);
    }
    if (datasplit[2] == "customerstories" && datasplit[3] != "") {
      console.log("masuk customerstories ");
      getDataCustomerStoriesDetail(datasplit[3], router.locale, locale);
    } else if (datasplit[2] == "blog" && datasplit[3] != "") {
      getDataCustomerStoriesDetail(datasplit[3], router.locale, locale);
    } else {
      router.push(router.pathname, router.asPath, { locale });
    }
  };
  const changeLanguageMobile = (e) => {
    const locale = e;
    console.log("change language mobile ");
    let datatemp = router.asPath;
    let datasplit = datatemp.split("/");
    for (let a = 0; a < datasplit.length; a++) {
      console.log("data ke ", datasplit[a]);
    }
    if (datasplit[2] == "customerstories" && datasplit[3] != "") {
      console.log("masuk customerstories ");
      getDataCustomerStoriesDetail(datasplit[3], router.locale, locale);
    } else if (datasplit[2] == "blog" && datasplit[3] != "") {
      getDataCustomerStoriesDetail(datasplit[3], router.locale, locale);
    } else {
      router.push(router.pathname, router.asPath, { locale });
    }
    setNavbar(!navbar);
    setNavbarBottom(!navbarBottom);
  };

  const getDataCustomerStoriesDetail = (page, locale, locale_temp) => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTestimonialDetail?pagepath=${page}`,
      {
        method: `GET`,
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        console.log("get data testimonial ", res2);
        if (res2.success) {
          //   setDataTestimonial(res2.data);
          console.log("locale apa ", locale);
          if (locale == "en") {
            console.log("masuk if en ");
            if (
              res2.data[0].title_id != "" &&
              res2.data[0].description_id != "" &&
              res2.data[0].page_path_id != "" &&
              res2.data[0].content_id != "" &&
              res2.data[0].tags_id != ""
            ) {
              console.log("harusnya pindah halaman ", router);
              // router.push(`/id/`+router.asPath);
              let path =
                "/migwebsite/customerstories/" + res2.data[0].page_path_id;
              router.push(router.pathname, path, { locale: "id" });
            } else {
              alert("Halaman ID tidak tersedia untuk testimoni ini");
            }
          } else {
            console.log("masuk if id ");
            if (
              res2.data[0].title != "" &&
              res2.data[0].description != "" &&
              res2.data[0].page_path != "" &&
              res2.data[0].content != "" &&
              res2.data[0].tags != ""
            ) {
              console.log("harusnya pindah halaman baru ", router);
              let path =
                "/migwebsite/customerstories/" + res2.data[0].page_path;
              router.push(router.pathname, path, { locale: "en" });
            } else {
              alert("Page EN Not Found for this testimonial");
            }
          }
        } else {
        }
      })
      .catch((err) => {})
      .finally(() => {
        // setLoadingEmployees(false);
      });
  };
  const { SubMenu } = Menu;

  return (
    <>
      {/* <Head title="Home" /> */}
      <Styles />
      <Layout className={"h-auto"}>
        <Header
          className={`${kelas} header`}
          style={{
            background: "white",
            position: "fixed",
            zIndex: 31,
            width: "100%",
            // boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Link href="/">
            <div className="logo top-4 md:top-4 absolute w-24 md:w-32 cursor-pointer">
              <img width={"auto"} height={"auto"} src="/mig.png" />
            </div>
          </Link>

          {/* Open Hamburger Button */}
          <label
            onClick={() => {
              handleNavbarBottom();
            }}
            htmlFor={`menutoggle`}
            className="md:hidden block float-right cursor-pointer mt-7"
            hidden={!navbar}
          >
            <svg
              className="fill-current text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 20 20"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </label>

          {/* Close Hamburger Button */}
          <label
            onClick={() => {
              handleNavbar(), handleNavbarBottom();
            }}
            htmlFor={`menutoggle`}
            className="md:hidden block float-right cursor-pointer mt-7"
            hidden={navbar}
          >
            <svg
              className="fill-current text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 32 32"
            >
              <title>Menu</title>
              <path d="M17.768 16l13.866-13.866c0.488-0.488 0.488-1.28 0-1.768s-1.28-0.488-1.768 0l-13.866 13.866-13.866-13.866c-0.488-0.488-1.28-0.488-1.768 0s-0.488 1.28 0 1.768l13.866 13.866-13.866 13.866c-0.488 0.488-0.488 1.28 0 1.768 0.244 0.244 0.564 0.366 0.884 0.366s0.64-0.122 0.884-0.366l13.866-13.866 13.866 13.866c0.244 0.244 0.564 0.366 0.884 0.366s0.64-0.122 0.884-0.366c0.488-0.488 0.488-1.28 0-1.768l-13.866-13.866z" />
            </svg>
          </label>

          {/* Browser Menu Navbar Header */}
          <div
            theme="light"
            mode="horizontal"
            style={{ lineHeight: "3.9rem" }}
            className={"hidden md:block float-right menu pt-2"}
          >
            <Dropdown overlay={menuLanguanges} placement="bottomCenter">
              <Button
                type={"text"}
                style={{ background: "white" }}
                className={
                  "ant-dropdown-link text-lg text-black hover:text-black"
                }
                onClick={(e) => e.preventDefault()}
              >
                {locale == "en" ? (
                  <img
                    className={"relative"}
                    style={{ display: "inline-block" }}
                    width={37}
                    src={"/image/english.png"}
                  />
                ) : (
                  <img
                    className={"relative"}
                    style={{ display: "inline-block" }}
                    width={37}
                    src={"/image/indonesia.png"}
                  />
                )}
              </Button>
            </Dropdown>
            <Dropdown overlay={menu} placement="bottomCenter">
              <Button
                type={"text"}
                style={{ background: "white" }}
                className={
                  "ant-dropdown-link text-lg text-black hover:text-black"
                }
                onClick={(e) => e.preventDefault()}
              >
                <p
                  className={
                    "text-base font-gilroyregular text-blackmig  menu-underlined hover:text-green-500"
                  }
                >
                  {t.solutions}{" "}
                  <CaretDownOutlined
                    style={{ display: "inline-block", verticalAlign: "middle" }}
                  />
                </p>
              </Button>
            </Dropdown>
            <Link href="/aboutus">
              <a
                style={{ textDecoration: "none" }}
                className="text-base font-gilroyregular text-blackmig menu-underlined mx-4 hover:text-green-500 no-underline"
              >
                {t.aboutus}
              </a>
            </Link>
            <Link href="/joinourteam">
              <a
                style={{ textDecoration: "none" }}
                className="text-base font-gilroyregular text-blackmig  menu-underlined mx-4 hover:text-green-500"
              >
                {t.career}
              </a>
            </Link>
            {countArticle == 0 && countStories == 0 && (
              <Link href="/contactus">
                <a
                  style={{ textDecoration: "none" }}
                  className="text-base font-gilroyregular text-blackmig  menu-underlined mx-4 hover:text-green-500"
                >
                  {t.contactus}
                </a>
              </Link>
            )}
            {countArticle > 0 || countStories > 0 ? (
              <Dropdown overlay={menuResources} placement="bottomCenter">
                <Button
                  type={"text"}
                  style={{ background: "white" }}
                  className={
                    "ant-dropdown-link text-lg text-black hover:text-black"
                  }
                  onClick={(e) => e.preventDefault()}
                >
                  <p
                    className={
                      "text-base font-gilroyregular text-blackmig  menu-underlined hover:text-green-500"
                    }
                  >
                    Resource{" "}
                    <CaretDownOutlined
                      style={{
                        display: "inline-block",
                        verticalAlign: "middle",
                      }}
                    />
                  </p>
                </Button>
              </Dropdown>
            ) : (
              <div></div>
            )}
            {countArticle > 0 || countStories > 0 ? (
              <Link href="/contactus">
                <a
                  style={{ textDecoration: "none" }}
                  className="text-base font-gilroyregular text-blackmig  menu-underlined mx-4 hover:text-green-500"
                >
                  {t.contactus}
                </a>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </Header>

        {/* Mobile Menu Navbar Header */}
        <input
          className={`hidden menuToggle`}
          type="checkbox"
          id={`menutoggle`}
        />
        <section className={"md:hidden w-full h-auto mt-3 pt-16"}>
          <div
            theme="light"
            style={{ lineHeight: "3.9rem" }}
            className={"float-right menu2"}
          >
            <Menu mode="inline" className={"w-auto"}>
              <SubMenu
                key="sub 1"
                title={
                  locale == "en" ? (
                    <div className={"flex flex-row"}>
                      <img
                        className={"relative self-center"}
                        style={{ display: "inline-block" }}
                        width={20}
                        src={"/image/english.png"}
                      />
                      <p
                        className={
                          "text-base ml-2 text-blackmig font-gilroyregular"
                        }
                      >
                        English
                      </p>
                    </div>
                  ) : (
                    <div className={"flex flex-row"}>
                      <img
                        className={"relative self-center"}
                        style={{ display: "inline-block" }}
                        width={20}
                        src={"/image/indonesia.png"}
                      />
                      <p
                        className={
                          "text-base ml-2 text-blackmig font-gilroyregular"
                        }
                      >
                        Indonesia
                      </p>
                    </div>
                  )
                }
                className="text-base font-gilroyregular text-blackmig "
              >
                <Menu.Item key="1">
                  <img
                    className={"relative"}
                    style={{ display: "inline-block" }}
                    width={40}
                    src={"/image/english.png"}
                  ></img>
                  <a
                    onClick={() => changeLanguageMobile("en")}
                    style={{ textDecoration: "none" }}
                    className="text-base font-gilroyregular text-blackmig  pl-3"
                  >
                    English
                  </a>
                </Menu.Item>
                <Menu.Item key="2">
                  <img
                    className={"relative"}
                    style={{ display: "inline-block" }}
                    width={40}
                    src={"/image/indonesia.png"}
                  ></img>
                  <a
                    onClick={() => changeLanguageMobile("id")}
                    style={{ textDecoration: "none" }}
                    className="text-base font-gilroyregular text-blackmig  pl-3"
                  >
                    Indonesia
                  </a>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub 2"
                title="Solutions"
                className="text-base font-gilroyregular text-blackmig "
              >
                <Menu.Item key="1">
                  <img
                    className={"relative"}
                    style={{ display: "inline-block" }}
                    width={40}
                    src={"/image/navbar/hardware_black.png"}
                  ></img>
                  <Link href="/hardware">
                    <a
                      style={{ textDecoration: "none" }}
                      className="text-base font-gilroyregular text-blackmig  pl-3"
                    >
                      Hardware
                    </a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <img
                    className={"relative"}
                    style={{ display: "inline-block" }}
                    width={40}
                    src={"/image/navbar/software_black.png"}
                  ></img>
                  <Link href="/software">
                    <a
                      style={{ textDecoration: "none" }}
                      className="text-base font-gilroyregular text-blackmig  pl-3"
                    >
                      Software
                    </a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <img
                    className={"relative"}
                    style={{ display: "inline-block" }}
                    width={40}
                    src={"/image/navbar/talents_black.png"}
                  ></img>
                  <Link href="/talents">
                    <a
                      style={{ textDecoration: "none" }}
                      className="text-base font-gilroyregular text-blackmig  pl-3"
                    >
                      Talents
                    </a>
                  </Link>
                </Menu.Item>
              </SubMenu>

              <Menu.Item key="4">
                <Link href="/aboutus">
                  <a
                    style={{ textDecoration: "none" }}
                    className="text-base font-gilroyregular text-blackmig"
                  >
                    About Us
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link href="/joinourteam">
                  <a
                    style={{ textDecoration: "none" }}
                    className="text-base font-gilroyregular text-blackmig"
                  >
                    Career in MIG
                  </a>
                </Link>
              </Menu.Item>
              {countArticle > 0 || countStories > 0 ? (
                <SubMenu
                  key="sub 6"
                  title={"Resource"}
                  className="text-base font-gilroyregular text-blackmig "
                >
                  {countStories > 0 && (
                    <Menu.Item key="1">
                      <Link href="/migwebsite/customerstories">
                        <a
                          style={{ textDecoration: "none" }}
                          className="text-base font-gilroyregular text-blackmig  pl-3"
                        >
                          Customer Stories
                        </a>
                      </Link>
                    </Menu.Item>
                  )}
                  {countArticle > 0 && (
                    <Menu.Item key="2">
                      <Link href="/migwebsite/blog">
                        <a
                          style={{ textDecoration: "none" }}
                          className="text-base font-gilroyregular text-blackmig  pl-3"
                        >
                          Blog
                        </a>
                      </Link>
                    </Menu.Item>
                  )}
                </SubMenu>
              ) : (
                <div></div>
              )}
              {/* <Menu.Item key='6'
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                zIndex: 1,
                                transition: 'all 0.2s',
                            }}><a href='/contactus' className="text-lg gilroy-medium">Contact Us &nbsp;&nbsp;
                            <ArrowRightOutlined style={{fontSize:'20px' ,display: 'inline-block', verticalAlign: 'middle'}}/>
                            <LinkedinFilled style={{fontSize:'20px' ,display: 'inline-block', verticalAlign: 'middle'}}/>
                            <InstagramFilled style={{fontSize:'20px' ,display: 'inline-block', verticalAlign: 'middle'}}/>
                            </a></Menu.Item> */}
              {/* <SubMenu key="sub 2" title="Contactus" className="text-lg gilroy-medium"style={{
                                position: 'absolute',
                                bottom: 0,
                                zIndex: 1,
                                transition: 'all 0.2s',
                            }}>
                                <Menu.Item key='1'>
                                    <img className={'relative'} style={{ display: 'inline-block' }} width={40} src={'/image/navbar/hardware_black.png'}></img>
                                    <a href='/hardware' className="text-lg gilroy-medium pl-3">
                                        Hardware
                                    </a>
                                </Menu.Item>
                                <Menu.Item key='2'>
                                    <img className={'relative'} style={{ display: 'inline-block' }} width={40} src={'/image/navbar/software_black.png'}></img>
                                    <a href='/software' className="text-lg gilroy-medium pl-3">
                                        Software
                                    </a>
                                </Menu.Item>
                                <Menu.Item key='3'>
                                    <img className={'relative'} style={{ display: 'inline-block' }} width={40} src={'/image/navbar/talents_black.png'}></img>
                                    <a href='/talents' className="text-lg gilroy-medium pl-3">
                                        Talents
                                    </a>
                                </Menu.Item>
                            </SubMenu> */}
            </Menu>
            <div
              className="text-lg gilroy-medium mx-6 my-10"
              style={{
                position: "absolute",
                bottom: 10,
                zIndex: 1,
                transition: "all 0.2s",
              }}
            >
              <Link href="/contactus">
                <a
                  style={{ textDecoration: "none" }}
                  className="text-base font-gilroyregular text-blackmig menu-navbar"
                >
                  Contact Us{" "}
                </a>
              </Link>
              &nbsp;&nbsp;
              <ArrowRightOutlined
                style={{
                  fontSize: "20px",
                  display: "inline-block",
                  verticalAlign: "middle",
                }}
              />
              &nbsp;&nbsp;
              <a
                style={{ textDecoration: "none" }}
                className="menu-navbar"
                href="https://www.linkedin.com/company/pt-mitramas-infosys-global"
              >
                <LinkedinFilled
                  style={{
                    fontSize: "20px",
                    display: "inline-block",
                    verticalAlign: "middle",
                  }}
                />
              </a>
              &nbsp;&nbsp;
              <a
                style={{ textDecoration: "none" }}
                className="menu-navbar"
                href="https://instagram.com/mitramasglobal?utm_medium=copy_link"
              >
                <InstagramFilled
                  style={{
                    fontSize: "20px",
                    display: "inline-block",
                    verticalAlign: "middle",
                  }}
                />
              </a>
            </div>
          </div>
        </section>

        <Content className="site-layout" style={{ padding: "0px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 0, minHeight: 380 }}
          >
            <div>
              <div className=" bg-white h-full">
                <div className="px-0 relative" id="wrapper">
                  <main className="pt-9 lg:pt-20" style={{ height: `auto` }}>
                    {children}
                  </main>
                </div>
              </div>
            </div>
          </div>
        </Content>
        <div
          className={"px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"}
          style={{ textAlign: "left", backgroundColor: "#EEF1EE" }}
        >
          <div className={"container mx-auto"}>
            {/* <div className={'py-8'}> */}
            <div
              className={"py-8 flex flex-col lg:flex-row lg:justify-between"}
            >
              <Link href="/">
                <div
                  className={"pb-4 cursor-pointer w-[132px] md:w-[150px]"}
                  // style={{ minWidth: "132px", width: "150px" }}
                >
                  <img src="/mig.png" />
                </div>
              </Link>
              <div className={"hidden md:flex flex-row px-0 justify-between"}>
                <div className={"flex-col pr-2 my-2 lg:my-0 lg:px-16"}>
                  <p
                    className={
                      "py-1 font-gilroysemibold py-1 text-base text-blackmig "
                    }
                  >
                    {t.solutions}
                  </p>
                  <Link href={{ pathname: "/hardware" }}>
                    <p
                      className={
                        "font-gilroyregular text-sm text-blackmig cursor-pointer menu-underlined py-1 w-min hover:text-green-500"
                      }
                    >
                      Hardware
                    </p>
                  </Link>
                  <Link href={{ pathname: "/software" }}>
                    <p
                      className={
                        "font-gilroyregular text-sm text-blackmig cursor-pointer menu-underlined py-1 w-min hover:text-green-500"
                      }
                    >
                      Software
                    </p>
                  </Link>
                  <Link href={{ pathname: "/talents" }}>
                    <p
                      className={
                        "font-gilroyregular text-sm text-blackmig cursor-pointer menu-underlined py-1 w-min hover:text-green-500"
                      }
                    >
                      Talents
                    </p>
                  </Link>
                </div>
                <div className={"flex-col pr-2 my-2 lg:my-0 lg:px-16"}>
                  <p
                    className={
                      "font-gilroysemibold py-1 text-base text-blackmig"
                    }
                  >
                    {locale == "en" ? "Company" : "Perusahaan"}
                  </p>
                  <Link href={{ pathname: "/aboutus" }}>
                    {locale == "en" ? (
                      <p
                        className={
                          "font-gilroyregular text-sm text-blackmig cursor-pointer menu-underlined py-1 w-min hover:text-green-500"
                        }
                      >
                        About&nbsp;Us
                      </p>
                    ) : (
                      <p
                        className={
                          "font-gilroyregular text-sm text-blackmig cursor-pointer menu-underlined py-1 w-min hover:text-green-500"
                        }
                      >
                        Tentang&nbsp;Kami
                      </p>
                    )}
                  </Link>
                  <Link href={{ pathname: "/joinourteam" }}>
                    {locale == "en" ? (
                      <p
                        className={
                          "font-gilroyregular text-sm text-blackmig cursor-pointer menu-underlined py-1 w-min hover:text-green-500"
                        }
                      >
                        Career&nbsp;in&nbsp;MIG
                      </p>
                    ) : (
                      <p
                        className={
                          "font-gilroyregular text-sm text-blackmig cursor-pointer menu-underlined py-1 w-min hover:text-green-500"
                        }
                      >
                        Karir&nbsp;di&nbsp;MIG
                      </p>
                    )}
                  </Link>
                  {countArticle > 0 && (
                    <Link href="/blog">
                      <p
                        className={
                          "font-gilroyregular text-sm text-blackmig cursor-pointer menu-underlined py-1 w-min hover:text-green-500"
                        }
                      >
                        Blog
                      </p>
                    </Link>
                  )}
                  {countStories > 0 && (
                    <Link href="/customerstories">
                      {locale == "en" ? (
                        <p
                          className={
                            "font-gilroyregular text-sm text-blackmig cursor-pointer menu-underlined py-1 w-min hover:text-green-500"
                          }
                        >
                          Customer&nbsp;Stories
                        </p>
                      ) : (
                        <p
                          className={
                            "font-gilroyregular text-sm text-blackmig cursor-pointer menu-underlined py-1 w-min hover:text-green-500"
                          }
                        >
                          Klien&nbsp;Kami
                        </p>
                      )}
                    </Link>
                  )}
                </div>
                <div className={"flex-col pr-2 my-2 lg:my-0 lg:px-16"}>
                  <p
                    className={
                      "font-gilroysemibold py-1 text-base text-blackmig"
                    }
                  >
                    {locale == "en" ? "Get in touch" : "Hubungi Kami"}
                  </p>
                  <Link href="/contactus">
                    {locale == "en" ? (
                      <p
                        className={
                          "font-gilroyregular text-sm text-blackmig cursor-pointer menu-underlined py-1 w-min hover:text-green-500"
                        }
                      >
                        Contact&nbsp;Us
                      </p>
                    ) : (
                      <p
                        className={
                          "font-gilroyregular text-sm text-blackmig cursor-pointer menu-underlined py-1 w-min hover:text-green-500"
                        }
                      >
                        Kontak&nbsp;Kami
                      </p>
                    )}
                  </Link>
                </div>
                <div className={"flex-col my-2 lg:my-0 lg:px-16"}>
                  <p
                    className={
                      "font-gilroysemibold py-1 text-base text-blackmig"
                    }
                  >
                    {locale == "en" ? "Follow" : "Media Sosial"}
                  </p>
                  <div className={"flex"}>
                    <img
                      className={"w-5 h-5 relative top-1 mr-2"}
                      src="/image/footer/instagram.png"
                    />
                    <a
                      style={{ textDecoration: "none" }}
                      className={
                        "font-gilroyregular text-[14px] cursor-pointer menu-underlined py-1 hover:text-green-500"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://instagram.com/mitramasglobal?utm_medium=copy_link"
                    >
                      Instagram
                    </a>
                  </div>
                  <div className={"flex"}>
                    <img
                      className={"w-5 h-5 relative top-1 mr-2"}
                      src="/image/footer/linkedin.png"
                    />
                    <a
                      style={{ textDecoration: "none" }}
                      style={{ textDecoration: "none" }}
                      className={
                        "font-gilroyregular text-[14px] cursor-pointer menu-underlined py-1 hover:text-green-500"
                      }
                      href="https://www.linkedin.com/company/pt-mitramas-infosys-global"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
              <div className={"block md:hidden"}>
                <div className={"flex"}>
                  <div className={"w-1/2 pr-2 my-2 lg:my-0 lg:px-16"}>
                    <p
                      className={
                        "font-gilroysemibold py-1 text-xs text-blackmig  py-1"
                      }
                    >
                      Solutions
                    </p>
                    <Link href={{ pathname: "/hardware" }}>
                      <p
                        className={
                          "font-gilroyregular text-xs text-blackmig cursor-pointer menu-underlined py-1 w-min hover:text-green-500"
                        }
                      >
                        Hardware
                      </p>
                    </Link>
                    <Link href={{ pathname: "/software" }}>
                      <p
                        className={
                          "font-gilroyregular text-xs text-blackmig cursor-pointer menu-underlined py-1 w-min hover:text-green-500"
                        }
                      >
                        Software
                      </p>
                    </Link>
                    <Link href={{ pathname: "/talents" }}>
                      <p
                        className={
                          "font-gilroyregular text-xs text-blackmig cursor-pointer menu-underlined py-1 w-min hover:text-green-500"
                        }
                      >
                        Talents
                      </p>
                    </Link>
                  </div>
                  <div className={"w-1/2 pr-2 my-2 lg:my-0 lg:px-16"}>
                    <p
                      className={"gilroy-bold py-1 text-xs text-blackmig py-1"}
                    >
                      Company
                    </p>
                    <Link href={{ pathname: "/aboutus" }}>
                      <p
                        className={
                          "font-gilroyregular text-xs text-blackmig cursor-pointer menu-underlined py-1 w-min hover:text-green-500"
                        }
                      >
                        About&nbsp;Us
                      </p>
                    </Link>
                    <Link href={{ pathname: "/joinourteam" }}>
                      <p
                        className={
                          "font-gilroyregular text-xs text-blackmig cursor-pointer menu-underlined py-1 w-min hover:text-green-500"
                        }
                      >
                        Career&nbsp;in&nbsp;Mig
                      </p>
                    </Link>
                    {countStories > 0 && (
                      <Link href={{ pathname: "/migwebsite/customerstories" }}>
                        {locale == "en" ? (
                          <p
                            className={
                              "font-gilroyregular text-xs text-blackmig cursor-pointer menu-underlined py-1 w-min hover:text-green-500"
                            }
                          >
                            Customer&nbsp;Stories
                          </p>
                        ) : (
                          <p
                            className={
                              "font-gilroyregular text-xs text-blackmig cursor-pointer menu-underlined py-1 w-min hover:text-green-500"
                            }
                          >
                            Klien&nbsp;Kami
                          </p>
                        )}
                      </Link>
                    )}
                    {countArticle > 0 && (
                      <Link href={{ pathname: "/migwebsite/blog" }}>
                        <p
                          className={
                            "font-gilroyregular text-xs text-blackmig cursor-pointer menu-underlined py-1 w-min hover:text-green-500"
                          }
                        >
                          {locale == "en" ? "Blog" : "Artikel"}
                        </p>
                      </Link>
                    )}
                  </div>
                </div>
                <div className={"flex"}>
                  <div className={"w-1/2 pr-2 my-2 lg:my-0 lg:px-16"}>
                    <p
                      className={
                        "font-gilroysemibold py-1 text-xs text-blackmig py-1"
                      }
                    >
                      Get in touch
                    </p>
                    <Link href="/contactus">
                      <p
                        className={
                          "font-gilroyregular text-xs text-blackmig cursor-pointer menu-underlined py-1 w-min hover:text-green-500"
                        }
                      >
                        Contact&nbsp;Us
                      </p>
                    </Link>
                  </div>
                  <div className={"w-1/2 my-2 lg:my-0 lg:px-16"}>
                    <p className={"gilroy-bold py-1 text-xs"}>Follow</p>
                    <Link href="https://instagram.com/mitramasglobal?utm_medium=copy_link">
                      <div className={"flex"}>
                        <img
                          className={"w-5 h-5 relative top-1 mr-2"}
                          src="/image/footer/instagram.png"
                        />
                        <p
                          className={
                            "font-gilroyregular text-xs cursor-pointer menu-underlined py-1 hover:text-green-500"
                          }
                        >
                          Instagram
                        </p>
                      </div>
                    </Link>
                    <Link href="https://www.linkedin.com/company/pt-mitramas-infosys-global">
                      <div className={"flex"}>
                        <img
                          className={"w-5 h-5 relative top-1 mr-2"}
                          src="/image/footer/linkedin.png"
                        />
                        <p
                          className={
                            "font-gilroyregular text-xs cursor-pointer menu-underlined py-1 hover:text-green-500"
                          }
                        >
                          LinkedIn
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <hr className={"border"} style={{ background: "#000" }} />
            <div className={"flex flex-row pb-4 justify-between pt-2"}>
              <p className={" text-xs "}>
                Copyright © 2021 Mitramas Infosys Global. All rights reserved
              </p>
              <div className={"flex flex-row "}>
                <Link href={{ pathname: "/privacy" }}>
                  <p
                    className={
                      "menu-underlined text-xs cursor-pointer ml-4 sm:ml-10 md:ml-20 lg:ml-32 hover:text-green-500"
                    }
                  >
                    Privacy
                  </p>
                </Link>
                <Link href={{ pathname: "/term" }}>
                  <p
                    className={
                      "menu-underlined text-xs cursor-pointer ml-4 sm:ml-10 md:ml-20 lg:ml-32 hover:text-green-500"
                    }
                  >
                    Term
                  </p>
                </Link>
                <Link href={{ pathname: "/sitemap" }}>
                  <p
                    className={
                      "menu-underlined text-xs cursor-pointer ml-4 sm:ml-10 md:ml-20 lg:ml-32 hover:text-green-500"
                    }
                  >
                    Sitemap
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
export default layout;
