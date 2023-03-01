import Head from "next/head";
import Link from "next/link";
import Linkk from "next/link";
import { useRouter } from "next/router";
import React from "react";

import en from "../../locales/en";
import id from "../../locales/id";

function LeftContactUs({ children }) {
  const router = useRouter();

  const { locale } = router;
  const t = locale === "en" ? en : id;

  return (
    <div className={"w-full md:w-1/2 md:px-4"}>
      <p
        style={{ lineHeight: "120%" }}
        className={"text-[30px] font-gilroysemibold text-blackmig"}
      >
        {t.contactusleftsectiontitle}
      </p>
      <p
        style={{ lineHeight: "150%" }}
        className={"text-[18px] font-gilroyregular mt-3 w-[400px]"}
      >
        {t.contactusleftsectiondescription}
      </p>
      <div className="pt-6 hidden md:block">
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
      <div className="pt-6 block md:hidden mx-auto">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2594377018986!2d106.85151101396694!3d-6.229487895490642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3cf13d3fd29%3A0xd79c8011caa6f98c!2sPT%20Mitramas%20Infosys%20Global!5e0!3m2!1sid!2sid!4v1668590778820!5m2!1sid!2sid"
          width="282"
          height="172"
          frameborder="0"
          style={{
            border: 0,
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          allowfullscreen=""
          aria-hidden="false"
          tabindex="0"
        ></iframe>
      </div>
      <div className={"flex flex-row mt-6"}>
        <p
          style={{ lineHeight: "150%" }}
          className={"font-gilroysemibold text-sm md:text-[18px] text-blackmig"}
        >
          {locale == "en" ? "Location:" : "Kantor pusat:"}&nbsp;
        </p>
        <p
          style={{ lineHeight: "150%" }}
          className={"text-sm md:text-[18px] text-blackmig font-gilroyregular"}
        >
          Tebet raya no. 42{" "}
          {locale == "en" ? "South Jakarta" : "Jakarta Selatan"}, DKI
          Jakarta,12820
        </p>
      </div>
      <div className={"flex flex-row mt-3"}>
        <p
          style={{ lineHeight: "150%" }}
          className={"font-gilroysemibold text-sm md:text-[18px] text-blackmig"}
        >
          {locale == "en" ? "Phone:" : "Telepon:"}&nbsp;
        </p>
        <a href="tel:+62218314522">
          <p
            style={{ lineHeight: "150%" }}
            className={"text-accentblue text-sm md:text-[18px] underline"}
          >
            +62-21-831-4522
          </p>
        </a>
      </div>
      <div className={"flex flex-row mt-3"}>
        <p
          style={{ lineHeight: "150%" }}
          className={"font-gilroysemibold text-sm md:text-[18px] text-blackmig"}
        >
          Email:&nbsp;
        </p>
        <a
          href="mailto:help@mitrasolusi.group"
          style={{ lineHeight: "150%" }}
          className={"text-accentblue text-sm md:text-[18px] underline"}
        >
          help@mitrasolusi.group
        </a>
      </div>

      <div className={"mt-[54px] hidden md:block"}>
        <p
          style={{ lineHeight: "150%" }}
          className={"text-[18px] text-blackmig font-gilroysemibold"}
        >
          {t.contactussosialmedialabel}
        </p>
        <div className={"flex flex-row mt-2"}>
          <a href="https://instagram.com/mitramasglobal">
            <img
              className={"mr-6"}
              style={{ width: "32px", height: "32px" }}
              src="/image/instagram-trans.png"
            />
          </a>
          <a href="https://www.linkedin.com/company/pt-mitramas-infosys-global">
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
