import { LoadingOutlined } from "@ant-design/icons";
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
import { useRouter } from "next/router";
import type { FC } from "react";
import { useCallback, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { getBase64 } from "lib/helper";

import { useApplyCareer } from "apis/career_v2";

import BgApplyForm from "assets/vectors/bg-apply-form.svg";

import en from "../../../../locales/en";
import id from "../../../../locales/id";
import {
  AccessTimeIconSvg,
  ArchivedIconSvg,
  SpinnerIconSvg,
  WorkIconSvg,
} from "../../../icon";
import styles from "./CareersAtMig.module.scss";
import { JobListTable } from "./JobListTable";
import { SearchAndFilter } from "./SearchAndFilterSection";

type FormType = {
  agreement: boolean;
  email: string;
  name: string;
  phone_number: string;
  resume: {
    file: RcFile;
    fileList: RcFile[];
  };
};

export const CareersAtMig: FC = () => {
  const router = useRouter();

  const { locale } = router;
  const t = locale === "en" ? en : id;
  const [loading, setLoading] = useState(false);
  const [statusSent, setStatusSent] = useState(false);
  const [showThankYou, setShowThankyou] = useState<string | null>(null);
  const [modalApply, setModalApply] = useState(false);
  const { mutate: applyJob, isLoading: isApplying } = useApplyCareer();
  const [captchaVerifyValue, setCaptchaVerifyValue] = useState<string | null>(
    null
  );
  const [resumeFileBlob, setResumeFileBlob] = useState<RcFile | Blob | File>(
    null
  );
  const [isAgreementPassed, setIsAgreementPassed] = useState(false);
  const [form] = useForm<FormType>();

  const onChangeFile = async (info) => {
    if (info.file.status === "uploading") {
      // setLoadingupload(true);
      return;
    }
    if (info.file.status === "done") {
      const blobFile = info.file.originFileObj;
      const base64Data = await getBase64(blobFile);
      setResumeFileBlob(blobFile);
    }
  };

  const onFormValuesChanged = useCallback(
    (valueChanged: { agreement: boolean }) => {
      if ("agreement" in valueChanged) {
        setIsAgreementPassed(valueChanged.agreement);
      }
    },
    []
  );

  const onCaptchaChanged = useCallback((verifyValue) => {
    setCaptchaVerifyValue(verifyValue);
  }, []);

  const onFormSubmitted = useCallback(
    (values: FormType) => {
      if (resumeFileBlob === null) {
        form?.setFields([{ name: "resume", errors: ["Resume wajib diisi!"] }]);
        return;
      }
      setLoading(true);
      applyJob(
        {
          name: values.name,
          email: values.email,
          phone: values.phone_number,
          career_id: null,
          "g-recaptcha-response": captchaVerifyValue,
          resume: resumeFileBlob,
        },
        {
          onSuccess: (response) => {
            // TODO: handle on succeed
            // notification.success({ message: response.data.message });

            setStatusSent(false);
            setTimeout(() => {
              setStatusSent(true);
            }, 3000);
            setTimeout(() => {
              setLoading(false);
            }, 5000);
            setTimeout(() => {
              setShowThankyou("half");
            }, 2000);

            setTimeout(() => {
              setShowThankyou("full");
            }, 3000);
          },
          onError: (error: AxiosError) => {
            notification.error({
              message: error.response.data?.message?.errorInfo?.reason,
            });
          },
        }
      );
    },
    [form, captchaVerifyValue, resumeFileBlob]
  );

  const handleModalApply = () => {
    setModalApply(false);
    setShowThankyou(null);
  };

  const handleModalApplyNew = () => {
    setModalApply(true);
    // cobaLoading()
    // cobashowthankyou()
  };

  const isAllowedToSubmit = captchaVerifyValue !== null && isAgreementPassed;

  return (
    <section className="section7careers pb-10 md:pb-20 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 space-y-8">
      {/* Section Heading */}
      <div>
        <h3
          style={{ lineHeight: "120%" }}
          className="text-center gilroy-semibold text-2xl text-blackmig font-semibold lg:text-[32px] pb-8"
        >
          {t.vacancylistsectiontitle}
        </h3>
        <p
          style={{ lineHeight: "150%" }}
          className="pb-8 text-center text-base gilroy-regular text-blackmig"
        >
          {t.vacancylistsectiondescription}
        </p>
      </div>

      {/* Input data: Search and Filter */}
      <SearchAndFilter />

      {/* Display data: Table */}
      <JobListTable />

      {/* Notes */}
      <div className="flex flex-col justify-center items-center ">
        <p
          style={{ lineHeight: "120%" }}
          className="text-[32px] text-blackmig font-gilroysemibold font-normal text-center mt-[80px]"
        >
          Haven’t found job vacancies that related to you?
        </p>
        <div className={"md:w-[328px] w-[200px] mt-6"}>
          <p
            style={{ fontFeatureSettings: "cv04", lineHeight: "150%" }}
            className={"text-blackmig font-gilroyregular text-center text-sm"}
          >
            Drop your resume here, sooner or later we will check it, good luck!
          </p>
        </div>
        <div
          className={
            "mt-3 mb-12 md:mb-8 px-4 py-2 rounded bg-primary100 hover:cursor-pointer"
          }
          onClick={() => handleModalApplyNew()}
        >
          <p
            className={
              "text-[16px] font-gilroysemibold font-normal leading-[150%] text-white  "
            }
          >
            Drop Resume Here
          </p>
        </div>
      </div>
      <Modal
        open={modalApply}
        onCancel={handleModalApply}
        className={" w-[100px] md:w-[777px]"}
        closeIcon={
          <img
            className={"w-[24px] mt-8 h-[24px]"}
            src="/image/people/close.png"
          />
        }
        footer={null}
      >
        <Spin
          spinning={loading}
          indicator={
            <div
              style={{ position: "absolute", top: "70%", left: "5%" }}
              className={"flex w-full flex-col gap-2.5"}
            >
              {statusSent ? (
                <SpinnerIconSvg style={{ fontSize: 80, color: "#35763B" }} />
              ) : (
                <LoadingOutlined
                  rev={""}
                  style={{ fontSize: 80, color: "#35763B" }}
                />
              )}
              <p className={"text-primary100 text-sm font-medium leading-6"}>
                {statusSent ? "Sent" : "Sending.."}
              </p>
            </div>
          }
        >
          <BgApplyForm className={"absolute h-320 -z-0 -top-5 -left-10"} />
          {showThankYou == null && (
            <div className={"relative"}>
              <p
                className={
                  "text-center text-mono50 text-sm leading-[150%] font-gilroysemibold font-normal mt-2"
                }
                style={{ fontFeatureSettings: "cv04 cv03 cv02" }}
              >
                Application Form
              </p>
              <p
                className={
                  "text-secondary100 text-[16px] font-normal font-gilroysemibold leading-6 customfontmodal mt-2"
                }
              >
                Drop Resume
              </p>
              <div className={"mt-4"}>
                <Form
                  form={form}
                  layout="vertical"
                  className="w-full max-w-full"
                  onFinish={onFormSubmitted}
                  onValuesChange={onFormValuesChanged}
                >
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: "Name wajib diisi!" }]}
                  >
                    <Input placeholder="Input your full name here" />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: "Email wajib diisi!" }]}
                  >
                    <Input placeholder="Enter your email here" type="email" />
                  </Form.Item>

                  <Form.Item
                    name="phone_number"
                    label="Phone Number"
                    rules={[
                      { required: true, message: "Phone Number wajib diisi!" },
                    ]}
                  >
                    <Input placeholder="Enter your phone number here" />
                  </Form.Item>
                  <div
                    className={"flex items-center"}
                    style={{ position: "absolute" }}
                  ></div>

                  <Form.Item required label="Resume">
                    <Form.Item
                      name="resume"
                      noStyle
                      rules={[
                        { required: true, message: "Resume wajib diisi!" },
                      ]}
                    >
                      <Upload.Dragger
                        className={"customdragger w-full"}
                        name="files"
                        maxCount={1}
                        onChange={onChangeFile}
                        accept=".pdf"
                        // action="/upload.do"
                        style={{ width: "100%", height: "180px" }}
                      >
                        <img
                          className="anticon anticon-inbox mt-3"
                          style={{ width: "48px", height: "32px" }}
                          src="/image/landingpage/upload.png"
                        />
                        <p className="text-xs font-gilroyregular px-9 mt-9">
                          Drag and drop your sourcing documents here
                        </p>
                        <p className="text-xs font-gilroyregular mt-2">or</p>
                        <p className="text-xs font-gilroyregular text-bluemig mt-2">
                          browse a file
                        </p>
                      </Upload.Dragger>
                    </Form.Item>
                  </Form.Item>

                  <Form.Item name="agreement" valuePropName="checked" noStyle>
                    <Checkbox className="flex items-start space-x-4">
                      By proceeding, I agree that MIG's representative may
                      contact me by email, phone, or SMS (including by automatic
                      telephone dialing system) at the email address or number I
                      provide, including for marketing purposes.*
                    </Checkbox>
                  </Form.Item>

                  <ReCAPTCHA
                    className="mt-8"
                    sitekey={process.env.NEXT_PUBLIC_G_RECAPTCHA_CID || ""}
                    onChange={onCaptchaChanged}
                  />

                  <Form.Item noStyle>
                    <div className={"md:flex md:justify-end"}>
                      <Button
                        className={`${styles.ctaButton} mt-6 w-full md:mt-8`}
                        htmlType="submit"
                        disabled={!isAllowedToSubmit}
                        loading={isApplying}
                      >
                        Submit Application
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </div>
          )}
          {showThankYou == "half" ? (
            <div className={"flex justify-center h-[500px] md:h-[656px]"}>
              <div
                className={
                  "flex flex-col justify-center content-center items-center"
                }
              >
                <p
                  className={
                    "font-gilroysemibold text-lg font-normal leading-6 text-blackmig"
                  }
                >
                  Thank you for applying at MIG!
                </p>
                <p
                  className={
                    "mt-3 font-gilroyregular text-sm leading-[21px] text-blackmig"
                  }
                  style={{ fontFeatureSettings: "cv04" }}
                >
                  We’ll get back to you as soon as possible
                </p>
                <div className={"mt-9"}>
                  <img
                    src="/image/landingpage/Talents.png"
                    className={"w-full h-full"}
                    style={{ width: "255px", height: "152px" }}
                  />
                </div>
              </div>
            </div>
          ) : showThankYou == "full" ? (
            <div className={"flex justify-center h-[500px] md:h-[656px]"}>
              <div
                className={
                  "flex flex-col justify-center content-center items-center transition-2"
                }
              >
                <p
                  className={
                    "font-gilroysemibold text-lg font-normal leading-6 text-blackmig"
                  }
                >
                  Thank you for applying at MIG!
                </p>
                <p
                  className={
                    "mt-3 font-gilroyregular text-sm leading-[21px] text-blackmig"
                  }
                  style={{ fontFeatureSettings: "cv04" }}
                >
                  We’ll get back to you as soon as possible
                </p>
                <div className={"mt-9"}>
                  <img
                    src="/image/landingpage/Talents.png"
                    className={"w-full h-full"}
                    style={{ width: "255px", height: "152px" }}
                  />
                </div>
                <p
                  style={{ fontFeatureSettings: "cv04" }}
                  className={
                    "mt-9 font-gilroyregular text-[16px] font-normal leading-6 "
                  }
                >
                  In the meantime, check other job vacancies that might suit
                  you:
                </p>
                <div
                  className={
                    "mt-3 px-4 py-2 rounded bg-primarygreen hover:cursor-pointer"
                  }
                >
                  <p
                    className={
                      "text-white font-gilroysemibold text-[16px] font-normal leading-6"
                    }
                    style={{ fontFeatureSettings: "cv04" }}
                  >
                    Explore Jobs
                  </p>
                </div>
                <p
                  className={
                    "mt-3 text-[14px] font-gilroyregular font-normal leading-[21px] text-blackmig"
                  }
                >
                  or{" "}
                </p>
                <div
                  className={
                    "mt-3 px-4 py-2 rounded bg-white border-2 border-primarygreen hover:cursor-pointer"
                  }
                >
                  <p
                    className={
                      "text-primarygreen font-gilroysemibold text-[16px] font-normal leading-6"
                    }
                    style={{ fontFeatureSettings: "cv04" }}
                  >
                    Back to Home
                  </p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </Spin>
      </Modal>
    </section>
  );
};
