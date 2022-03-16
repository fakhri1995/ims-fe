import { CheckCircleTwoTone } from "@ant-design/icons";
import { Checkbox, Collapse, Form, Input, notification } from "antd";
import Head from "next/head";
import Link from "next/link";
import { React, useEffect, useState } from "react";

import Layout from "../../../components/migwebsite/layout.js";

function Hardware({}) {
  const { Panel } = Collapse;
  const [form] = Form.useForm();
  const handleSubmit = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataHardware),
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
  const [dataHardware, setDataHardware] = useState({
    company_name: null,
    company_email: null,
    name: null,
    phone_number: null,
    interested_in: "hardware",
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
        <title>Hardware</title>
      </Head>
      <section
        className={
          "section1advantages hidden md:block fixed w-full z-50 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
        style={{ background: "#F4F4F4" }}
      >
        <div className={"block md:flex container mx-auto"}>
          <div className={"flex py-4"}>
            <Link href={{ pathname: "/hardware" }}>
              <p
                className={"cursor-pointer flex-col gilroy-bold text-lg mr-4"}
                style={{
                  borderBottom: "solid 2px #10B981",
                  paddingBottom: "2.5px",
                }}
              >
                Hardware
              </p>
            </Link>
            <Link href={{ pathname: "/software" }}>
              <p
                className={"cursor-pointer flex-col gilroy-medium text-lg mx-4"}
              >
                Software
              </p>
            </Link>
            <Link href={{ pathname: "/talents" }}>
              <p
                className={"cursor-pointer flex-col gilroy-medium text-lg mx-4"}
              >
                Talents
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className={"section2advantages h-12 hidden md:block"}></section>

      <section
        className={
          "md:pt-60 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 md:relative md:bottom-32 text-center"
        }
      >
        <div className={"container mx-auto"}>
          <p className={"text-3xl md:text-4xl gilroy-bold py-8 md:py-0"}>
            Nation-wide managed service model for your IT hardwares
          </p>
        </div>
      </section>

      <section
        className={
          "section2hardware py-8 md:py-0 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
      >
        <div className={"hidden md:flex container mx-auto"}>
          <div className={"flex-col w-1/2 my-auto"}>
            <p className={"text-3xl pb-4 gilroy-bold"}>
              Managing IT infrastructures is{" "}
              <span
                style={{
                  borderBottom: "solid 3px #188E4D",
                  paddingBottom: "2.5px",
                }}
              >
                challenging
              </span>
            </p>
            <p className={"mr-20 pb-4 gilroy-medium text-xl"}>
              Rapid pace of change, uncertainty on scalability, and heavy
              capital requirements might break your focus from executing your
              core business.
            </p>
            <p className={"mr-20 gilroy-medium text-xl"}>
              Let us help you to scale and manage your IT infrastructure with :
            </p>
            <ul className={"list-inside list-disc"}>
              <li className={"gilroy-medium text-xl"}>
                <span className={"gilroy-bold"}>predictable</span> monthly cost{" "}
              </li>
              <li className={"gilroy-medium text-xl"}>
                <span className={"gilroy-bold"}>guaranteed</span> service level
              </li>
            </ul>
          </div>
          <div className={"flex-col w-1/2 my-auto"}>
            <img src="/image/hardware/Hardware-Solution.png"></img>
          </div>
        </div>
        <div className={"block md:hidden"}>
          <div className={"my-auto"}>
            <div className={"my-auto"}>
              <img src="/image/hardware/Hardware-Solution.png"></img>
            </div>
            <p className={"text-2xl pb-4 gilroy-bold"}>
              Managing IT infrastructures is{" "}
              <span
                style={{
                  borderBottom: "solid 3px #188E4D",
                  paddingBottom: "2.5px",
                }}
              >
                challenging
              </span>{" "}
            </p>
            <p className={"pb-4 pt-2 gilroy-medium text-xl"}>
              Rapid pace of change, uncertainty on scalability, and heavy
              capital requirements might break your focus from executing your
              core business.
            </p>
            <p className={"gilroy-medium text-xl"}>
              Let us help you to scale and manage your IT infrastructure with :
            </p>
            <ul className={"list-inside list-disc"}>
              <li className={"gilroy-medium text-xl"}>
                <span className={"gilroy-bold"}>predictable</span> monthly cost{" "}
              </li>
              <li className={"gilroy-medium text-xl"}>
                <span className={"gilroy-bold"}>guaranteed</span> service level
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section
        className={
          "section3hardware py-8 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
      >
        <div className={"container mx-auto"}>
          <div className={"text-center py-8 md:py-16"}>
            <p className={"text-3xl md:text-4xl font-bold pb-4 gilroy-bold"}>
              Bringing you the advantages
            </p>
          </div>
          <div className={"block md:hidden"}>
            <div className={"px-4 bg-gray-200 rounded-xl mb-4"}>
              <div className={"py-4 my-auto"}>
                <p className={"text-2xl font-bold pb-4 gilroy-bold"}>
                  Cost efficient solution
                </p>
                <p className={"pb-4 gilroy-medium text-lg"}>
                  We transform a heavy capital IT hardware infrastructure, that
                  requires large upfront investment into managed services model.
                </p>
              </div>
            </div>
            <div className={"px-4 bg-gray-200 rounded-xl mb-4"}>
              <div className={"py-4 my-auto"}>
                <p className={"text-2xl font-bold pb-4 gilroy-bold"}>
                  Reliable IT service provider
                </p>
                <p className={"pb-4 gilroy-medium text-lg"}>
                  We provide guaranteed level of IT operation services to
                  support your business.
                </p>
              </div>
            </div>
            <div className={"px-4 bg-gray-200 rounded-xl mb-4"}>
              <div className={"py-4 my-auto"}>
                <p className={"text-2xl font-bold pb-4 gilroy-bold"}>
                  Extensive network in Indonesia
                </p>
                <p className={"pb-4 gilroy-medium text-lg"}>
                  Having operated over the past decades in Indonesia with 45
                  service points in Indonesia, we can provide strong local
                  knowledge and network to help you strive.
                </p>
              </div>
            </div>
          </div>
          <section className={"hidden md:block container"}>
            <div className={"flex"}>
              <div className={"pt-8 pb-8 w-1/3 pr-2"}>
                <p className={"text-3xl pb-4 gilroy-bold md:h-32 lg:h-20"}>
                  Cost efficient solution
                </p>
                <p className={"pb-4 gilroy-medium text-xl"}>
                  We transform a heavy capital IT hardware infrastructure, that
                  requires large upfront investment into managed services model.
                </p>
              </div>
              <div className={"pt-8 pb-8 w-1/3 px-2"}>
                <p className={"text-3xl pb-4 gilroy-bold md:h-32 lg:h-20"}>
                  Reliable IT service provider
                </p>
                <p className={"pb-4 gilroy-medium text-xl"}>
                  We provide guaranteed level of IT operation services to
                  support your business.
                </p>
              </div>
              <div className={"pt-8 pb-8 w-1/3 pl-2"}>
                <p className={"text-3xl pb-4 gilroy-bold md:h-32 lg:h-20"}>
                  Extensive network in Indonesia
                </p>
                <p className={"pb-4 gilroy-medium text-xl"}>
                  Having operated over the past decades in Indonesia with 45
                  service points in Indonesia, we can provide strong local
                  knowledge and network to help you strive.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section
        className={
          "section4hardware py-4 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
      >
        <div className={"container mx-auto block md:flex"}>
          <div className={"w-full md:w-1/3 pr-0 md:pr-4"}>
            <p className={"text-3xl md:text-4xl font-bold pb-4 gilroy-bold"}>
              Products selection
            </p>
            <p className={"pb-4 gilroy-medium text-lg md:text-xl"}>
              We leasing and maintaining a variety of IT hardwares
            </p>
          </div>
          <div className={"pb-0 md:pb-8 w-full md:w-1/3 pr-0 md:pr-4"}>
            <div className={"p-4 mb-8 border border-gray-300"}>
              {/* <Collapse
                            accordion
                            style={{background:"#ffffff"}}
                            className={"text-center"}
                            >
                                <Panel className={'gilroy-medium text-lg'} header={'ATM/CRM'} showArrow={false}>
                                </Panel>
                            </Collapse> */}
              <p className={"gilroy-medium text-lg text-center align-middle"}>
                ATM/CRM
              </p>
            </div>
            <div className={"p-4 mb-8 border border-gray-300"}>
              {/* <Collapse
                            accordion
                            style={{background:"#ffffff"}}
                            className={"text-center"}
                            >
                                <Panel className={'gilroy-medium text-lg'} header={'UPS'} showArrow={false}>
                                </Panel>
                            </Collapse> */}
              <p className={"gilroy-medium text-lg text-center align-middle"}>
                UPS
              </p>
            </div>
          </div>
          <div className={"pb-0 md:pb-8 w-full md:w-1/3 pr-0 md:pr-4"}>
            <div className={"p-4 mb-8 border border-gray-300"}>
              {/* <Collapse
                            accordion
                            style={{background:"#ffffff"}}
                            className={"text-center"}
                            >
                                <Panel className={'gilroy-medium text-lg'} header={'Laptop/desktop'} showArrow={false}>
                                   
                                </Panel>
                            </Collapse> */}
              <p className={"gilroy-medium text-lg text-center align-middle"}>
                Laptop/desktop
              </p>
            </div>
            <div className={"p-4 mb-8 border border-gray-300"}>
              {/* <Collapse
                            accordion
                            style={{background:"#ffffff"}}
                            className={"text-center"}
                            >
                                <Panel className={'gilroy-medium text-lg'} header={'Server'} showArrow={false}>
                                </Panel>
                            </Collapse> */}
              <p className={"gilroy-medium text-lg text-center align-middle"}>
                Server
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className={"py-8 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"}
      >
        <div className={"container mx-auto"}>
          <p className={"text-3xl gilroy-bold pb-8 pt-4 md:pt-10"}>
            Get yours now
          </p>
          <p className={"gilroy-medium text-xl pb-4"}>
            Fill in your contact information, and our sales team will contact
            you shortly.
          </p>
          <div
            hidden={feedback}
            className={"bg-white"}
            style={{ height: `${heightt}` }}
          >
            <div className={"h-1/3"}></div>
            <div
              className={
                "px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 text-center"
              }
            >
              <div className={"mx-auto my-auto"}>
                <p
                  className={"text-3xl md:text-4xl gilroy-bold py-0"}
                  style={{ color: "#188E4D" }}
                >
                  <CheckCircleTwoTone
                    className={"relative -top-2"}
                    twoToneColor="#188E4D"
                  />
                  &nbsp;Submited !
                </p>
                <p className={"text-3xl gilroy-bold"}>
                  Thank you for your interest in MIG
                </p>
                <p className={"text-xl gilroy-medium"}>
                  Someone from our team will be contact you shortly.
                </p>
              </div>
            </div>
          </div>
          <Form
            id="formcontact"
            hidden={!feedback}
            layout={"vertical"}
            onFinish={handleSubmit}
            form={form}
          >
            <div className={"flex"}>
              <div className={"w-1/2 mr-2"}>
                <Form.Item
                  name={"Company Name"}
                  className={"gilroy-medium text-xl"}
                  label="Company Name"
                  rules={[{ required: true }]}
                >
                  <Input
                    name={"Company Name"}
                    onChange={(e) => {
                      setDataHardware({
                        ...dataHardware,
                        company_name: e.target.value,
                      });
                    }}
                    placeholder=""
                  />
                </Form.Item>
                <Form.Item
                  name={"Email"}
                  className={"gilroy-medium text-xl"}
                  label="Email"
                  rules={[{ required: true, type: "email" }]}
                >
                  <Input
                    name={"Email"}
                    onChange={(e) => {
                      setDataHardware({
                        ...dataHardware,
                        company_email: e.target.value,
                      });
                    }}
                    placeholder=""
                  />
                </Form.Item>
              </div>
              <div className={"w-1/2 ml-2"}>
                <Form.Item
                  name={"Contact Name"}
                  className={"gilroy-medium text-xl"}
                  label="Contact Name"
                  rules={[{ required: true }]}
                >
                  <Input
                    name={"Contact Name"}
                    onChange={(e) => {
                      setDataHardware({
                        ...dataHardware,
                        name: e.target.value,
                      });
                    }}
                    placeholder=""
                  />
                </Form.Item>
                <Form.Item
                  name={"Phone Number"}
                  className={"gilroy-medium text-xl"}
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      pattern: new RegExp("^[0-9]*$"),
                      message: "Please input valid phone number",
                    },
                  ]}
                >
                  <Input
                    name={"Phone Number"}
                    onChange={(e) => {
                      setDataHardware({
                        ...dataHardware,
                        phone_number: parseInt(e.target.value),
                      });
                    }}
                    placeholder=""
                  />
                </Form.Item>
              </div>
            </div>
            <Form.Item
              name="Message"
              className={"gilroy-medium text-xl"}
              label="Message"
              rules={[{ required: true }]}
            >
              <Input.TextArea
                name="Message"
                onChange={(e) => {
                  setDataHardware({ ...dataHardware, message: e.target.value });
                }}
              />
            </Form.Item>
            <Form.Item
              name="checkbox"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Should accept agreement")),
                },
              ]}
            >
              <Checkbox name="checkbox" className={"gilroy-regular text-xl"}>
                By proceeding, I agree that MIG's representative may contact me
                by email, phone, or SMS (including by automatic telephone
                dialing system) at the email address or number I provide,
                including for marketing purposes.*
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <div className={"w-full flex justify-start pb-8"}>
                <button
                  type={"submit"}
                  className={
                    "text-black text-base border border-black px-4 py-1 focus:outline-none gilroy-medium hover:text-white hover:bg-black bg-white"
                  }
                >
                  Submit
                </button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </section>
      {/* <section className={'section5landingpage'}>
                <div className={' md:flex relative justify-between px-4 md:px-20 lg:px-28 xl:px-40'}style={{top:'40%'}}>
                    <div className={'flex-col text-2xl md:text-3xl text-white font-bold -top-4 md:top-0 relative'} style={{}}>
                        <p>Let’s be better together</p>
                    </div>
                    <div className={'flex-col w-auto'}>
                        <button className={'text-white flex border-2 text-base md:text-lg border-white px-4 mt-1 focus:outline-none'}>Contact Sales &nbsp;
                            <ArrowRightOutlined className={'pt-1'}/>
                        </button>

                    </div>
                </div>
            </section> */}
    </Layout>
  );
}

export default Hardware;
