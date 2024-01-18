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
  InputNumber,
  Modal,
  Select,
  Skeleton,
  Spin,
  Tooltip,
  Upload,
  UploadProps,
  notification,
} from "antd";
import { FormInstance } from "antd/es/form/Form";
import { useForm } from "antd/lib/form/Form";
import { UploadChangeParam } from "antd/lib/upload";
import { RcFile, UploadFile } from "antd/lib/upload/interface";
import type { AxiosError } from "axios";
import parse from "html-react-parser";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { formatDateToLocale } from "lib/date-utils";
import { getBase64, objectToFormData, objectToFormDataNew } from "lib/helper";

import { Detail } from "apis/auth";
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
import { JobAttributeDetail } from "./JobAttributeDetail";

const ShareButtonsGroup = dynamic(
  async () => (await import("./ShareButtonsGroup")).ShareButtonsGroup,
  { ssr: false }
);
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

export enum FormAktivitasTypes {
  TEKS = 1,
  PARAGRAPH,
  CHECKLIST, // value = []
  NUMERAL,
  DROPDOWN, // value = []
  UNGGAH,
}

export const JobDetail: FC = () => {
  /**
   * Dependencies
   */

  const onCopyToClipboard = useCallback((visibility: boolean) => {
    if (visibility) {
      navigator.clipboard.writeText(window.location.href);
    }
  }, []);
  const [form] = useForm<FormType>();
  const router = useRouter();
  const slug = router.query?.job_slug as string;
  const [modalApply, setModalApply] = useState(false);
  const { data, isLoading } = useGetPostedCareer(
    { slug },
    (response) => response.data.data
  );
  const { mutate: applyJob, isLoading: isApplying } = useApplyCareer();

  /**
   * States
   */
  const [captchaVerifyValue, setCaptchaVerifyValue] = useState<string | null>(
    null
  );
  const [resumeFileBlob, setResumeFileBlob] = useState<RcFile | Blob | File>(
    null
  );
  const [isAgreementPassed, setIsAgreementPassed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusSent, setStatusSent] = useState(false);
  const [showThankYou, setShowThankyou] = useState<string | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [questionForm, setQuestionForm] = useState(undefined);
  const [careerApplyId, setCareerApplyId] = useState(null);
  /**
   * Values
   */
  const formattedJobPostedDate = formatDateToLocale(
    data?.created_at,
    "MMMM dd, yyyy"
  );

  const currencyI18n = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  const startSalaryRange = currencyI18n.format(data?.salary_min || 0);
  const endSalaryRange = currencyI18n.format(data?.salary_max || 0);

  const formattedSalaryRange = `${startSalaryRange} - ${endSalaryRange}`;

  /**
   * Callbacks
   */
  const onFormValuesChanged = useCallback(
    (valueChanged: { agreement: boolean }) => {
      if ("agreement" in valueChanged) {
        setIsAgreementPassed(valueChanged.agreement);
      }
    },
    []
  );

  const onBeforeResumeUploaded = useCallback((uploadedFile) => {
    const fileSizeInMb = Number.parseFloat(
      (uploadedFile.size / 1024 / 1024).toFixed(4)
    );
    if (fileSizeInMb > 5) {
      notification.error({
        message: "Ukuran file melebih batas persyaratan!",
      });
      return Upload.LIST_IGNORE;
    }

    setResumeFileBlob(uploadedFile);
  }, []);

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
      setStatusSent(false);
      applyJob(
        {
          name: values.name,
          email: values.email,
          phone: values.phone_number,
          career_id: data.id,
          "g-recaptcha-response": captchaVerifyValue,
          resume: resumeFileBlob,
        },
        {
          onSuccess: (response) => {
            // TODO: handle on succeed
            // notification.success({ message: response.data.message });

            setTimeout(() => {
              setStatusSent(true);
            }, 3000);
            setTimeout(() => {
              setLoading(false);
              resetForm();
              if (data.question != null) {
                setCareerApplyId(response.data.id);
                setShowQuestion(true);
              } else {
                setShowThankyou("half");
              }
            }, 5000);
          },
          onError: (error: AxiosError) => {
            notification.error({
              message: error.response.data?.message?.errorInfo?.reason,
            });
          },
        }
      );
    },
    [form, data, captchaVerifyValue, resumeFileBlob]
  );

  const showFormThankYou = () => {
    setTimeout(() => {
      setShowThankyou("half");
    }, 5000);
  };

  const showFormThankYouQuestion = () => {
    setTimeout(() => {
      setShowThankyou("half");
    }, 2000);
  };
  const _safeCastPayloadValue = (value: any) => {
    let mValue;

    switch (typeof value) {
      case "number":
        mValue = value.toString();
        break;
      case "undefined":
      case "string":
        mValue = value || "";
        break;
      default:
        mValue = value;
        break;
    }

    return mValue;
  };
  const handleOnFormSubmitted = useCallback(
    (formValues?: { [key: string]: any }) => {
      // format payload to needed form in FormData
      let formValuesArr = Object.entries(formValues);
      let detailObjectList = formValuesArr.map((detail, idx) => {
        let obj = {};
        obj[`details[${idx}][key]`] = detail[0];
        obj[`details[${idx}][value]`] = _safeCastPayloadValue(detail[1]);
        return obj;
      });
      let allDetailObject = {};
      for (let detailObject of detailObjectList) {
        Object.assign(allDetailObject, detailObject);
      }
      let payloadFormData;

      let dataPost = {
        career_apply_id: careerApplyId,
        career_question_id: data.question.id,
      };

      let dataPostDetail = {
        ...dataPost,
        ...allDetailObject,
      };
      payloadFormData = objectToFormData(dataPostDetail);
      setLoading(true);
      setStatusSent(false);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/addCareerApplyQuestion`,
        {
          method: "POST",
          headers: {
            Accept: "*/*",
          },
          body: payloadFormData,
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          console.log("hasil isi question ", res2);
          if (res2.success) {
            setStatusSent(false);
            setTimeout(() => {
              setStatusSent(true);
              // notification["success"]({
              //   message: res2.message,
              //   duration: 3,
              // });
            }, 2000);
            setTimeout(() => {
              setLoading(false);
              resetForm();
              setShowThankyou("half");
            }, 3000);
          } else if (!res2.success) {
            notification["error"]({
              message: res2.message.errorInfo.status_detail,
              duration: 3,
            });
          }
        });
    },
    [data, careerApplyId, showQuestion, showThankYou]
  );

  const resetForm = () => {
    setCaptchaVerifyValue(null);
    setResumeFileBlob(null);
    setIsAgreementPassed(false);
    form.resetFields();
  };

  const handleModalApply = () => {
    setModalApply(false);
    setShowThankyou(null);
  };

  const handleModalApplyNew = () => {
    setModalApply(true);
    // cobashowthankyou()
  };

  const _renderDynamicUpload = (key: string, form: FormInstance<any>) => {
    // START: Upload Field

    /** Uploaded file object. Wrapped as RcFile. */

    const onUploadChange = useCallback(
      ({ file }: UploadChangeParam<UploadFile<RcFile>>) => {
        form.setFieldsValue({ [key]: file?.originFileObj });
      },
      []
    );

    /**
     * Validating uploaded file before finally attached to the paylaod.
     *
     * - Size max 5 MiB
     * - File type should satisfy  [
          "image/png",
          "image/jpeg",
          "application/pdf",
          "text/csv",
          "application/msword",
          "application/vnd.ms-powerpoint",
          "application/vnd.ms-excel",
        ]
     */

    // END: Upload field

    return (
      <div className="flex flex-col space-y-6">
        <div className="relative">
          {/* Gunakan camera */}

          {/* Upload from file */}
          <Upload.Dragger
            className={"customdragger w-full"}
            customRequest={({ onSuccess }) =>
              setTimeout(() => {
                onSuccess("ok", null);
              }, 0)
            }
            name="files"
            maxCount={1}
            onChange={onUploadChange}
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
        </div>

        <em className="text-mono50">Unggah File (Maksimal 5 MB)</em>
      </div>
    );
  };

  /**
   * Generates a child for <Form.Item> component respective to its type argument.
   *
   * @private
   */
  const _renderDynamicInput = (
    key: string,
    type: FormAktivitasTypes,
    list?: Pick<Detail, "list">["list"]
  ) => {
    const onUploadChange = async (info) => {
      if (info.file.status === "uploading") {
        // setLoadingupload(true);
        return;
      }
      if (info.file.status === "done") {
        const blobFile = info.file.originFileObj;
        const base64Data = await getBase64(blobFile);
        form.setFieldsValue({ [key]: blobFile });
      }
    };
    switch (type) {
      case FormAktivitasTypes.TEKS:
        return <Input name="" type="text" />;

      case FormAktivitasTypes.PARAGRAPH:
        return <Input.TextArea />;

      case FormAktivitasTypes.CHECKLIST:
        return (
          <Checkbox.Group className="flex flex-col space-x-0 space-y-4">
            {list?.map((value, idx) => (
              <Checkbox value={idx} key={idx}>
                {value}
              </Checkbox>
            ))}
          </Checkbox.Group>
        );

      case FormAktivitasTypes.NUMERAL:
        return <InputNumber className="w-full" />;

      case FormAktivitasTypes.DROPDOWN:
        return (
          <Select placeholder="Pilih nilai" allowClear>
            {list?.map((value, idx) => (
              <Select.Option value={value} key={idx}>
                {value}
              </Select.Option>
            ))}
          </Select>
        );
      case FormAktivitasTypes.UNGGAH:
        return (
          <Upload.Dragger
            className={"customdragger w-full"}
            customRequest={({ onSuccess }) =>
              setTimeout(() => {
                onSuccess("ok", null);
              }, 0)
            }
            name="files"
            maxCount={1}
            onChange={onUploadChange}
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
        );
    }
  };

  const formInitialValue = useMemo(() => {
    if (data == null || data.question === null) {
      return {};
    }

    return data.question.details.reduce((prev, curr) => {
      let defaultValue;
      switch (curr.type) {
        case FormAktivitasTypes.TEKS:
        case FormAktivitasTypes.PARAGRAPH:
        case FormAktivitasTypes.DROPDOWN:
          defaultValue = "";
          break;
        case FormAktivitasTypes.NUMERAL:
          defaultValue = curr.required ? 0 : undefined;
          break;
        case FormAktivitasTypes.CHECKLIST:
          defaultValue = [];
          break;
        case FormAktivitasTypes.UNGGAH:
          defaultValue = {};
          break;
      }
      return { ...prev, [curr.key]: defaultValue };
    }, {});
  }, [data?.question]);

  const isAllowedToSubmit = captchaVerifyValue !== null && isAgreementPassed;

  return (
    <section className="py-8 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 flex flex-col">
      <div
        onClick={() => router.back()}
        className={"flex flex-row gap-2 hover:cursor-pointer"}
      >
        <LeftOutlined rev={""} style={{ fontSize: 20, color: "#188E4D" }} />
        <p
          className={
            "text-[16px] text-primary100 font-normal leading-6 font-gilroysemibold"
          }
        >
          Kembali
        </p>
      </div>
      <div
        className={"mt-[16.5px] flex md:flex-row flex-col md:justify-between"}
      >
        <p
          className={
            "text-blackmig font-gilroysemibold text-2xl font-normal leading-[28.8px]"
          }
        >
          {data && data?.name}
        </p>
        <div className={"flex gap-3 md:mt-0 mt-2"}>
          <Tooltip
            trigger={["click"]}
            title="Copied to clipboard!"
            afterVisibleChange={onCopyToClipboard}
            placement="bottom"
            className="cursor-pointer"
          >
            <div
              className={
                "bg-white border-2 border-lightgrey rounded px-4 flex items-center py-2 gap-2"
              }
            >
              <p
                className={
                  "text-[16px] font-gilroysemibold font-normal leading-6 text-lightgrey"
                }
              >
                Share
              </p>
              <ShareAltOutlined
                rev={""}
                style={{ color: "#B8B8B8", fontSize: 20 }}
              />
            </div>
          </Tooltip>

          <div
            onClick={() => handleModalApplyNew()}
            className={
              "rounded bg-primary100 px-4 py-2 flex items-center gap-2 hover:cursor-pointer"
            }
          >
            <p
              className={
                "text-[16px] font-gilroysemibold font-normal leading-6 text-white"
              }
            >
              Apply Now
            </p>
            <RiseOutlined rev={""} style={{ fontSize: 20, color: "#FFFFFF" }} />
          </div>
        </div>
      </div>
      <div className={"mt-[31px] flex md:gap-16 md:flex-row flex-col "}>
        <div className={"w-full md:w-3/4"}>
          <p
            className={
              "text-xs md:text-[16px] font-gilroyregular font-normal leading-6 text-blackmig"
            }
          >
            {data && parse(data.overview)}
          </p>
        </div>
        <div className={"w-full md:w-1/4"}>
          <div className={"flex flex-col gap-3"}>
            <div className={"flex flex-row gap-4"}>
              <WorkIconSvg />
              <p
                className={
                  "font-gilroyregular text-[16px] font-medium leading-6 text-blackmig"
                }
              >
                {formattedSalaryRange}
              </p>
            </div>
            <div className={"flex flex-row gap-4"}>
              <ArchivedIconSvg size={24} color={"#585858"} />
              <p
                className={
                  "font-gilroyregular text-[16px] font-medium leading-6 text-blackmig"
                }
              >
                {data?.role_type.name}
              </p>
            </div>
            <div className={"flex flex-row gap-4"}>
              <AccessTimeIconSvg />
              <p
                className={
                  "font-gilroyregular text-[16px] font-medium leading-6 text-blackmig customfontcareerdetail"
                }
              >
                {data?.experience.str}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={"mt-8"}
        style={{ width: "100%", height: "100%", border: "1px #E5E7E6 solid" }}
      ></div>
      <div className={"mt-8 "}>
        <p
          className={
            "font-gilroysemibold text-[16px] text-blackmig leading-[120%] font-normal"
          }
        >
          You Are Expected To Be Able To
        </p>
        <div className={"mt-2"}>{data && parse(data.description)}</div>
      </div>
      <div className={"mt-8 "}>
        <p
          className={
            "font-gilroysemibold text-[16px] text-blackmig leading-[120%] font-normal"
          }
        >
          Minimum Qualifications And Experience
        </p>
        <div className={"mt-2"}>{data && parse(data.qualification)}</div>
      </div>
      <Modal
        open={modalApply}
        onCancel={handleModalApply}
        bodyStyle={{
          backgroundImage: `url('/bg-apply-form.svg')`,
        }}
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
            statusSent ? (
              <div
                style={{ position: "absolute", top: "70%" }}
                className={"flex w-full flex-col self-center gap-2.5"}
              >
                <CheckCircleOutlined
                  rev={""}
                  style={{ fontSize: 80, color: "#35763B" }}
                />
                <p
                  className={"text-primary100 text-sm font-medium leading-6"}
                ></p>
              </div>
            ) : (
              <div
                style={{ position: "absolute", top: "70%", left: "5%" }}
                className={"flex w-full flex-col  gap-2.5"}
              >
                <LoadingOutlined
                  rev={""}
                  style={{ fontSize: 80, color: "#35763B" }}
                />
                <p className={"text-primary100 text-sm font-medium leading-6"}>
                  Sending
                </p>
              </div>
            )
          }
        >
          {showThankYou == null && showQuestion == false && (
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
                {data?.name}
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
                        customRequest={({ onSuccess }) =>
                          setTimeout(() => {
                            onSuccess("ok", null);
                          }, 0)
                        }
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
                        className={`${styles.ctaButton} bg-primarygreen mt-6 w-full md:w-auto md:self-end md:mt-8 text-white`}
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
          {showThankYou == null && showQuestion == true && (
            <div className={"relative min-h-12"}>
              <p
                className={
                  "text-center text-mono50 text-sm leading-[150%] font-gilroysemibold font-normal mt-2"
                }
                style={{ fontFeatureSettings: "cv04 cv03 cv02" }}
              >
                Additional Question for
              </p>
              <p
                className={
                  "text-secondary100 text-[16px] font-normal font-gilroysemibold leading-6 customfontmodal mt-2"
                }
              >
                {data?.name}
              </p>
              <div className={"mt-4"}>
                <Form
                  form={form}
                  layout="vertical"
                  className="w-full max-w-full"
                  initialValues={formInitialValue}
                  onFinish={handleOnFormSubmitted}
                  validateMessages={{
                    required: "Field ini harus diisi!",
                  }}
                >
                  {data?.question.details.map(
                    ({ name, description, type, key, list, required }) => {
                      return (
                        <Form.Item
                          label={
                            <label className="font-bold text-mono30">
                              {name}
                            </label>
                          }
                          required={!!required}
                          key={key}
                        >
                          <p className="mb-4 mt-2">{description}</p>
                          <Form.Item name={key} rules={[{ required }]}>
                            {_renderDynamicInput(key, type, list)}
                          </Form.Item>
                        </Form.Item>
                      );
                    }
                  )}
                  <Form.Item noStyle>
                    <div className={""}>
                      <Button
                        className={`${styles.ctaButton} mt-6 w-full md:w-full md:self-end md:mt-8 text-white`}
                        htmlType="submit"
                        // disabled={!isAllowedToSubmit}
                        loading={isApplying}
                      >
                        Submit My Application
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
                <div className={"test-animation"}>
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
                <div className={"test-animation2 flex flex-col justify-center"}>
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
                    onClick={() => router.push("/joinourteam")}
                    className={
                      "mt-3 px-4 py-2 rounded bg-primarygreen hover:cursor-pointer max-w-fit flex self-center"
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
                      "mt-3 text-[14px] font-gilroyregular font-normal text-center leading-[21px] text-blackmig"
                    }
                  >
                    or{" "}
                  </p>
                  <div
                    onClick={() => router.push("/")}
                    className={
                      "mt-3 px-4 py-2  max-w-fit flex self-center rounded bg-white border-2 border-primarygreen hover:cursor-pointer"
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
            </div>
          ) : showThankYou == "full" ? (
            <div
              className={
                "flex justify-center h-[500px] md:h-[656px] bg-form-modal"
              }
            >
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
                  onClick={() => router.push("/joinourteam")}
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
                  onClick={() => router.push("/")}
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
