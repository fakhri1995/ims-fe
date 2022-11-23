import Head from "next/head";
import Link from "next/link";
import Linkk from "next/link";
import React from "react";

function LeftContactUs({ children }) {
  return (
    <div className={"w-full md:w-2/5"}>
      <p
        className={
          "text-2xl font-semibold text-blackmig gilroy-semibold pb-8 pt-10"
        }
      >
        We’d love to hear from you
      </p>
      <p className={"text-sm gilroy-regular pb-4 w-[400px]"}>
        Have questions about our products, features, or company? Our teams will
        help you.
      </p>
      <div className="py-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2594377018986!2d106.85151101396694!3d-6.229487895490642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3cf13d3fd29%3A0xd79c8011caa6f98c!2sPT%20Mitramas%20Infosys%20Global!5e0!3m2!1sid!2sid!4v1668590778820!5m2!1sid!2sid"
          width="374"
          height="232"
          frameborder="0"
          style={{ border: 0 }}
          allowfullscreen=""
          aria-hidden="false"
          tabindex="0"
        ></iframe>
      </div>
      <div className={"flex flex-row"}>
        <p className={"font-semibold text-base text-blackmig"}>
          Location:&nbsp;
        </p>
        <p classNamme={"text-base text-blackmig gilroy-regular"}>
          Tebet raya no. 72 South Jakarta, DKI Jakarta,12820
        </p>
      </div>
      <div className={"flex flex-row"}>
        <p className={"font-semibold text-base text-blackmig"}>
          Contact:&nbsp;
        </p>
        <p className={"text-accentblue text-base underline"}>+62-21-831-4522</p>
      </div>
      <div className={"flex flex-row"}>
        <p className={"font-semibold text-base text-blackmig"}>Email:&nbsp;</p>
        <a
          href="mailto:help@mitrasolusi.group"
          className={"text-accentblue text-base underline"}
        >
          help@mitrasolusi.group
        </a>
      </div>

      <div className={"mt-10"}>
        <p className={"text-sm text-blackmig font-semibold gilroy-semibold"}>
          Or reach us through:
        </p>
        <div className={"flex flex-row mt-4"}>
          <a>
            <img
              className={"mr-4"}
              style={{ width: "32px", height: "32px" }}
              src="/image/instagram-trans.png"
            />
          </a>
          <a>
            <img
              className={""}
              style={{ width: "32px", height: "32px" }}
              src="/image/linkedin.png"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default LeftContactUs;
