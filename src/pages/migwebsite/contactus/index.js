import { CheckCircleTwoTone } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Select, notification } from "antd";
import Head from "next/head";
import Link from "next/link";
import { React, useEffect, useState } from "react";

import LayoutFormContactUs from "../../../components/migwebsite/layout-form-contact-us.js";
import Layout from "../../../components/migwebsite/layout.js";
import LeftContactUs from "../../../components/migwebsite/left-contact-us.js";
import RightContactUs from "../../../components/migwebsite/right-contact-us.js";

function ContactUs({}) {
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
          "hidden md:block px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
      >
        <div className={"container mx-auto  md:flex"}>
          <LeftContactUs />
          <RightContactUs
            feedback={feedback}
            heightt={heightt}
            form={form}
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
            handleSubmit={handleSubmit}
            Option={Option}
          />
          <LeftContactUs />
        </div>
      </section>
      <div className={"mb-6"}></div>
      <LayoutFormContactUs
        description={`Need help in providing your needs? Whether they related to
              hardware, software, or even talent hiring? Contact us and hear
              what service can we offer to you and your company!`}
        button_title={"Contact Us"}
      />
    </Layout>
  );
}

export default ContactUs;
