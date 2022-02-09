import { CheckCircleTwoTone } from "@ant-design/icons";
import { Checkbox, Collapse, Form, Input, notification } from "antd";
import Head from "next/head";
import Link from "next/link";
import { React, useEffect, useState } from "react";

import Layout from "../../../components/migwebsite/layout.js";

function Talents({}) {
  const { Panel } = Collapse;
  const [form] = Form.useForm();
  const handleSubmit = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPeople),
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
  const [dataPeople, setDataPeople] = useState({
    company_name: null,
    company_email: null,
    name: null,
    phone_number: null,
    interested_in: "talents",
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
        <title>Talents</title>
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
                className={"cursor-pointer flex-col text-lg gilroy-medium mr-4"}
              >
                Hardware
              </p>
            </Link>
            <Link href={{ pathname: "/software" }}>
              <p
                className={"cursor-pointer flex-col text-lg gilroy-medium mx-4"}
              >
                Software
              </p>
            </Link>
            <Link href={{ pathname: "/talents" }}>
              <p
                className={"cursor-pointer flex-col text-lg gilroy-bold mx-4"}
                style={{
                  borderBottom: "solid 2px #10B981",
                  paddingBottom: "2.5px",
                }}
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
            Enabling you to assemble the best team
          </p>
        </div>
      </section>

      <section
        className={
          "section2people py-8 md:py-0 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
        }
      >
        <div className={"hidden md:flex container mx-auto"}>
          <div className={"flex-col w-1/2 my-auto"}>
            <p className={"text-3xl pb-4 gilroy-bold"}>
              Building team takes massive{" "}
              <span
                style={{
                  borderBottom: "solid 3px #188E4D",
                  paddingBottom: "2.5px",
                }}
              >
                effort
              </span>
            </p>
            <p className={"mr-20 pb-4 gilroy-medium text-xl"}>
              Large quantity of profiles coming in with widely different
              qualities. Your turnover rate is high and you have to do it all
              over again.
            </p>
            <p className={"mr-20 gilroy-medium text-xl"}>
              Let us streamline your process with:
            </p>
            <ul className={"list-inside list-disc"}>
              <li className={"gilroy-medium text-xl"}>
                <span className={"gilroy-bold"}>On-demand</span> expertise
              </li>
              <li className={"gilroy-medium text-xl"}>
                <span className={"gilroy-bold"}>Flexibility in</span> talent
                head counts and working period
              </li>
            </ul>
          </div>
          <div className={"flex-col w-1/2 my-auto"}>
            <img src="/image/people/People-Solution.png"></img>
          </div>
        </div>
        <div className={"block md:hidden"}>
          <div className={"my-auto"}>
            <div className={"my-auto"}>
              <img src="/image/people/People-Solution.png"></img>
            </div>
            <p className={"text-2xl pb-8 gilroy-bold"}>
              Building team takes massive{" "}
              <span
                style={{
                  borderBottom: "solid 3px #188E4D",
                  paddingBottom: "2.5px",
                }}
              >
                effort
              </span>
            </p>
            <p className={"pb-4 gilroy-medium text-xl"}>
              Large quantity of profiles coming in with widely different
              qualities. Your turnover rate is high and you have to do it all
              over again.
            </p>
            <p className={"gilroy-medium text-xl"}>
              Let us streamline your process with:
            </p>
            <ul className={"list-inside list-disc"}>
              <li className={"gilroy-medium text-xl"}>
                <span className={"gilroy-bold"}>On-demand</span> expertise
              </li>
              <li className={"gilroy-medium text-xl"}>
                <span className={"gilroy-bold"}>Flexibility in</span> talent
                head counts and working period
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section
        className={
          "section2hardware py-8 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"
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
                  Custom made with your needs
                </p>
                <p className={"pb-4 gilroy-medium text-lg"}>
                  Numbers of talent and their working period can be tailored as
                  per required by project.
                </p>
              </div>
            </div>
            <div className={"px-4 bg-gray-200 rounded-xl mb-4"}>
              <div className={"py-4 my-auto"}>
                <p className={"text-2xl font-bold pb-4 gilroy-bold"}>
                  Risk free talent acquisition
                </p>
                <p className={"pb-4 gilroy-medium text-lg"}>
                  You have full flexibility to rotate and rematch to make your
                  quality criteria fullfiled.
                </p>
              </div>
            </div>
            <div className={"px-4 bg-gray-200 rounded-xl mb-4"}>
              <div className={"py-4 my-auto"}>
                <p className={"text-2xl font-bold pb-4 gilroy-bold"}>
                  Get qualified talent for your team
                </p>
                <p className={"pb-4 gilroy-medium text-lg"}>
                  Extensive test and interview process covering tech stacks,
                  coding algorithm, systems design, and soft skills are given to
                  ensure you having qualified talents.
                </p>
              </div>
            </div>
          </div>
          <div className={"hidden md:block container"}>
            <div className={"flex"}>
              <div className={"pt-8 pb-8 w-1/3 pr-2"}>
                <p className={"text-3xl pb-4 gilroy-bold md:h-32 lg:h-20"}>
                  Custom made with your needs
                </p>
                <p className={"pb-4 gilroy-medium text-xl"}>
                  Numbers of talent and their working period can be tailored as
                  per required by project.
                </p>
              </div>
              <div className={"pt-8 pb-8 w-1/3 px-2"}>
                <p className={"text-3xl pb-4 gilroy-bold md:h-32 lg:h-20"}>
                  Risk free talent acquisition
                </p>
                <p className={"pb-4 gilroy-medium text-xl"}>
                  You have full flexibility to rotate and rematch to make your
                  quality criteria fullfiled.
                </p>
              </div>
              <div className={"pt-8 pb-8 w-1/3 pl-2"}>
                <p className={"text-3xl pb-4 gilroy-bold md:h-32 lg:h-20"}>
                  Get qualified talent for your team
                </p>
                <p className={"pb-4 gilroy-medium text-xl"}>
                  Extensive test and interview process covering tech stacks,
                  coding algorithm, systems design, and soft skills are given to
                  ensure you having qualified talents.
                </p>
              </div>
            </div>
          </div>
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
              Our talents profile
            </p>
            <p className={"pb-4 gilroy-medium text-lg md:text-xl"}>
              In typical cases, our talents have but not limited to the
              following specifications and deliverable
            </p>
          </div>
          <div className={"pb-0 md:pb-8 w-full md:w-1/3 pr-0 md:pr-4"}>
            <div className={"pb-8"}>
              <Collapse
                accordion
                expandIconPosition={"right"}
                style={{ background: "#ffffff" }}
                className={"text-center"}
              >
                <Panel
                  className={"gilroy-medium text-lg"}
                  header={"Software Engineer"}
                >
                  <div className={"py-4 px-4"}>
                    <p className={"gilroy-bold text-base md:text-lg text-left"}>
                      Typical Skills:
                    </p>
                    <p
                      className={
                        "py-4 gilroy-medium text-base md:text-lg text-left"
                      }
                    >
                      Bachelor's degree in Computer Science, Knowledge of
                      primary coding languages including C++, HTML5, and
                      JavaScript, PHP Java, Spring, Laravel,Tibco, etc., Basic
                      programming experience, Knowledge of databases and
                      operating systems, ability to learn new software and
                      technologies quickly, Detail-oriented.
                    </p>
                    <p className={"gilroy-bold text-base md:text-lg text-left"}>
                      Typical deliverable:
                    </p>
                    <p
                      className={
                        "py-4 gilroy-medium text-base md:text-lg text-left"
                      }
                    >
                      Integration of user-facing elements developed by front-end
                      developers, provide support in building efficient,
                      testable, and reusable software modules, provide
                      assistance in solving performance problems and
                      architectural challenges, integration of data storage
                      solutions.
                    </p>
                  </div>
                </Panel>
              </Collapse>
            </div>
            <div className={"pb-8"}>
              <Collapse
                accordion
                expandIconPosition={"right"}
                style={{ background: "#ffffff" }}
                className={"text-center"}
              >
                <Panel
                  className={"gilroy-medium text-lg"}
                  header={"Data Analyst"}
                >
                  <div className={"py-4 px-4"}>
                    <p className={"gilroy-bold text-base md:text-lg text-left"}>
                      Typical Skills:
                    </p>
                    <p
                      className={
                        "py-4 gilroy-medium text-base md:text-lg text-left"
                      }
                    >
                      Skills: A high level of mathematical ability, Programming
                      languages, such as SQL, Oracle and Python, The ability to
                      analyze, model and interpret data, Problem-solving skills,
                      A systematic and logical approach, Written and verbal
                      communication skills.
                    </p>
                    <p className={"gilroy-bold text-base md:text-lg text-left"}>
                      Typical deliverable:
                    </p>
                    <p
                      className={
                        "py-4 gilroy-medium text-base md:text-lg text-left"
                      }
                    >
                      Examines information using data analysis tools. Generate
                      meaningful results that pulled from the raw data and help
                      make decisions by identifying various facts and trends.
                      Typical duties includes removing corrupted data,
                      performing initial analysis to assess the quality of the
                      data, preparing reports based on analysis and presenting
                      to management.
                    </p>
                  </div>
                </Panel>
              </Collapse>
            </div>
          </div>
          <div className={"pb-0 md:pb-8 w-full md:w-1/3 pr-0 md:pr-4"}>
            <div className={"pb-8"}>
              <Collapse
                accordion
                expandIconPosition={"right"}
                style={{ background: "#ffffff" }}
                className={"text-center"}
              >
                <Panel
                  className={"gilroy-medium text-lg"}
                  header={"Quality Assurance"}
                >
                  <div className={"py-4 px-4"}>
                    <p className={"gilroy-bold text-base md:text-lg text-left"}>
                      Typical Skills:
                    </p>
                    <p
                      className={
                        "py-4 gilroy-medium text-base md:text-lg text-left"
                      }
                    >
                      Proven experience as a Quality Assurance Tester or similar
                      role, Experience in project management and QA methodology,
                      ability to document and troubleshoot errors, Working
                      Knowledge of test management software and SQL, Excellent
                      communication skills, attention to detail, BSc/BA in
                      Computer Science, Engineering or a related field.
                    </p>
                    <p className={"gilroy-bold text-base md:text-lg text-left"}>
                      Typical deliverable:
                    </p>
                    <p
                      className={
                        "py-4 gilroy-medium text-base md:text-lg text-left"
                      }
                    >
                      Reviewing and analyzing system specifications, Executing
                      test scripts and reviewing results, Reporting and
                      documenting technical issues, Create logs to document
                      testing phases and defects.
                    </p>
                  </div>
                </Panel>
              </Collapse>
            </div>
            <div className={"pb-8"}>
              <Collapse
                accordion
                expandIconPosition={"right"}
                style={{ background: "#ffffff" }}
                className={"text-center"}
              >
                <Panel className={"gilroy-medium text-lg"} header={"Product"}>
                  <div className={"py-4 px-4"}>
                    <p className={"gilroy-bold text-base md:text-lg text-left"}>
                      Typical Skills:
                    </p>
                    <p
                      className={
                        "py-4 gilroy-medium text-base md:text-lg text-left"
                      }
                    >
                      Proven experience with rapid prototyping tools and
                      techniques, such as story mapping, design sprints, and
                      product methodology. Excellent analytical skills and
                      strong intuitions of user behaviors. Solid oral and
                      written communications skills. Strong business requirement
                      analysis.
                    </p>
                    <p className={"gilroy-bold text-base md:text-lg text-left"}>
                      Typical deliverable:
                    </p>
                    <p
                      className={
                        "py-4 gilroy-medium text-base md:text-lg text-left"
                      }
                    >
                      Doing the research and analysis of the competitive
                      landscape, product metrics, and latest internet trends to
                      identify and fill product gaps and generate new ideas that
                      improve customer experience. Scope and prioritize
                      activities based on business and customer impact.
                      Analyzing user requirements into specification and
                      architectural design for developers
                    </p>
                  </div>
                </Panel>
              </Collapse>
            </div>
          </div>
        </div>
      </section>

      <section
        className={"py-8 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"}
      >
        <div className={"container mx-auto"}>
          <p className={"text-3xl gilroy-bold pb-8 pt-4 md:pt-10"}>
            Build your team now
          </p>
          <p className={"gilroy-medium text-lg pb-4"}>
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
                      setDataPeople({
                        ...dataPeople,
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
                      setDataPeople({
                        ...dataPeople,
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
                      setDataPeople({ ...dataPeople, name: e.target.value });
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
                      setDataPeople({
                        ...dataPeople,
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
                  setDataPeople({ ...dataPeople, message: e.target.value });
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
                    "text-black text-base border border-black px-4 py-1 focus:outline-none gilroy-medium hover:text-white hover:bg-black"
                  }
                >
                  Submit
                </button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </section>
    </Layout>
  );
}

export default Talents;
