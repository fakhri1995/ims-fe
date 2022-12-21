import { CheckCircleTwoTone } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Select, notification } from "antd";
import Head from "next/head";
import Link from "next/link";
import { React, useEffect, useState } from "react";

import LayoutFormContactUs from "../../../components/migwebsite/layout-form-contact-us.js";
import Layout from "../../../components/migwebsite/layout.js";
import LeftContactUs from "../../../components/migwebsite/left-contact-us.js";
import RightContactUs from "../../../components/migwebsite/right-contact-us.js";
import useAnalyticsEventTracker from "../../../components/migwebsite/useAnalyticsEventTracker.js";

function ContactUs({}) {
  const gaEventTracker = useAnalyticsEventTracker("Contact us");
  const [form] = Form.useForm();
  const { Option } = Select;
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
          "hidden md:block px-4 py-16 sm:py-8 sm:px-[61px] md:py-16 md:px-[112px]"
        }
      >
        <div className={"container md:flex "}>
          <LeftContactUs />
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
          "block md:hidden px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
      >
        <div className={"container mx-auto  md:flex"}>
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
        className={
          "contactusphone mt-20 md:relative block md:hidden md:flex bg-bgfooter pt-8"
        }
      >
        <div className={"container mx-auto"}>
          <div class="bg-white border-3 border-solid shadow-2xl rounded-[8px] text-center mx-5  -mt-24 py-4 px-8">
            <p className={"text-xl font-gilroysemibold"}>
              Fulfill your IT needs easily!
            </p>
            <p className={"py-5 text-sm font-gilroyregularegular"}>
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

export default ContactUs;
