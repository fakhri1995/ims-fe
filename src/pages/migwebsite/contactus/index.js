import { CheckCircleTwoTone } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Select, notification } from "antd";
import Head from "next/head";
import Link from "next/link";
import Linkk from "next/link";
import { useRouter } from "next/router";
import { React, useEffect, useState } from "react";

import LayoutFormContactUs from "../../../components/migwebsite/layout-form-contact-us.js";
import Layout from "../../../components/migwebsite/layout.js";
import LeftContactUs from "../../../components/migwebsite/left-contact-us.js";
import RightContactUs from "../../../components/migwebsite/right-contact-us.js";
import useAnalyticsEventTracker from "../../../components/migwebsite/useAnalyticsEventTracker.js";
import en from "../../../locales/en";
import id from "../../../locales/id";

function ContactUs({}) {
  const gaEventTracker = useAnalyticsEventTracker("Contact us");
  const [form] = Form.useForm();
  const { Option } = Select;
  const router = useRouter();

  const { locale } = router;
  const t = locale === "en" ? en : id;

  const handleSubmit = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataContactUs),
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
  const [dataContactUs, setDataContactUs] = useState({
    company_name: null,
    company_email: null,
    name: null,
    phone_number: null,
    interested_in: null,
    message: null,
  });
  const [feedback, setFeedback] = useState(true);
  const [heightt, setHeightt] = useState("");
  useEffect(() => {
    var clntHeight = document.getElementById("formcontact").offsetHeight;
    var clientHeight = clntHeight.toString() + "px";
    setHeightt(clientHeight);
  }, []);
  return (
    <Layout>
      <Head>
        <title>Contact Us</title>
      </Head>
      <section
        className={
          "hidden lg:block px-4 py-16 sm:py-8 sm:px-[61px] lg:py-16 lg:px-[113.5px]"
        }
      >
        <div className={"container lg:flex "}>
          <LeftContactUs analytics={gaEventTracker} />
          <RightContactUs
            feedback={feedback}
            heightt={heightt}
            form={form}
            dataContactUs={dataContactUs}
            setDataContactUs={setDataContactUs}
            handleSubmit={handleSubmit}
            Option={Option}
          />
        </div>
      </section>
      <section
        className={
          "block lg:hidden px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
      >
        <div className={"container mx-auto  lg:flex"}>
          <RightContactUs
            feedback={feedback}
            heightt={heightt}
            form={form}
            dataContactUs={dataContactUs}
            setDataContactUs={setDataContactUs}
            handleSubmit={handleSubmit}
            Option={Option}
          />
          <LeftContactUs />
        </div>
      </section>
      <section
        className={"contactusphone mt-[140px] block lg:hidden bg-bgfooter pt-8"}
      >
        <div className={"container mx-auto"}>
          <div
            className={
              "bg-white border-3 border-solid shadow-2xl rounded-[8px] text-center mx-5  -mt-24 py-4 px-8"
            }
          >
            <p className={"text-xl font-gilroysemibold"}>
              {t.contactussectiontitle}
            </p>
            <p className={" text-sm font-gilroyregular"}>
              {t.contactussectionsubtitle1}
            </p>
            <p className={"text-sm font-gilroyregular"}>
              {t.contactussectionsubtitle2}
            </p>
            <div className="mt-4 flex flex-row justify-center">
              <div className={"mr-1.5"}>
                <Linkk href="/contactus">
                  <button
                    className={
                      "text-sm px-4 py-2 text-white border-2 rounded bg-primarygreen border-primarygreen"
                    }
                  >
                    <p className={"text-base font-gilroysemibold"}>
                      {t.ctacontactuslandingpage}
                    </p>
                  </button>
                </Linkk>
              </div>
              <div>
                <Linkk href="/aboutus">
                  <button
                    className={
                      "text-sm px-4 py-2 text-primarygreen border-2 rounded bg-white border-primarygreen"
                    }
                  >
                    <p className={"text-base font-gilroysemibold"}>
                      {t.ctalearnmorelandingpage}
                    </p>
                  </button>
                </Linkk>
              </div>
            </div>
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

export default ContactUs;
