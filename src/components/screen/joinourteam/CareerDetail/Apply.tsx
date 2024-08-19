import { Button, Checkbox, Form, Input, Upload, notification } from "antd";
import { useForm } from "antd/lib/form/Form";
import type { RcFile } from "antd/lib/upload";
import type { AxiosError } from "axios";
import { useRouter } from "next/router";
import { FC, useCallback, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { useApplyCareer, useGetPostedCareer } from "apis/career_v2";

import styles from "./CareersDetail.module.scss";

type FormType = {
  agreement: boolean;
  email: string;
  name: string;
  phone_number: string;
  university: string;
  resume: {
    file: RcFile;
    fileList: RcFile[];
  };
};

export const Apply: FC = () => {
  /**
   * Dependencies
   */
  const router = useRouter();
  const slug = router.query?.job_slug as string;

  const [form] = useForm<FormType>();

  const { data } = useGetPostedCareer(
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

  const onCaptchaChanged = useCallback((verifyValue) => {
    setCaptchaVerifyValue(verifyValue);
  }, []);

  const onFormSubmitted = useCallback(
    (values: FormType) => {
      if (resumeFileBlob === null) {
        form?.setFields([{ name: "resume", errors: ["Resume wajib diisi!"] }]);
        return;
      }

      applyJob(
        {
          name: values.name,
          email: values.email,
          phone: values.phone_number,
          career_id: data.id,
          university: values.university,
          "g-recaptcha-response": captchaVerifyValue,
          resume: resumeFileBlob,
        },
        {
          onSuccess: (response) => {
            // TODO: handle on succeed
            notification.success({ message: response.data.message });
          },
          onError: (error: AxiosError<any, any>) => {
            notification.error({
              message: error.response.data?.message?.errorInfo?.reason,
            });
          },
        }
      );
    },
    [form, data, captchaVerifyValue, resumeFileBlob]
  );

  /**
   * Values
   */
  const isAllowedToSubmit = captchaVerifyValue !== null && isAgreementPassed;

  return (
    <section
      className="
      section2job py-10 md:py-20 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20
      flex flex-col md:flex-row space-y-8 md:space-x-12 md:space-y-0
      "
    >
      <div className="w-full">
        <h3 className="text-3xl md:text-4xl font-bold mb-12">Apply</h3>
        <p className="text-xl gilroy-regular">
          Fill in your contact information, and our team will contact you
          shortly.
        </p>
      </div>

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
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Email wajib diisi!" }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          name="phone_number"
          label="Phone Number"
          rules={[{ required: true, message: "Phone Number wajib diisi!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="university"
          label="University"
          rules={[{ required: true, message: "University wajib diisi!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item required label="Resume">
          <div className="flex items-start">
            <Form.Item
              name="resume"
              noStyle
              rules={[{ required: true, message: "Resume wajib diisi!" }]}
            >
              <Upload
                className="w-1/3"
                accept=".pdf"
                maxCount={1}
                beforeUpload={onBeforeResumeUploaded}
              >
                <Button className={styles.ctaButton}>Upload File</Button>
              </Upload>
            </Form.Item>

            <div className="w-2/3">
              <p>Max. file size 5MB.</p>
              <p>Supported file type: PDF.</p>
            </div>
          </div>
        </Form.Item>

        <Form.Item name="agreement" valuePropName="checked" noStyle>
          <Checkbox className="flex items-start space-x-4">
            By proceeding, I agree that MIG's representative may contact me by
            email, phone, or SMS (including by automatic telephone dialing
            system) at the email address or number I provide, including for
            marketing purposes.*
          </Checkbox>
        </Form.Item>

        <ReCAPTCHA
          className="mt-8"
          sitekey={process.env.NEXT_PUBLIC_G_RECAPTCHA_CID || ""}
          onChange={onCaptchaChanged}
        />

        <Form.Item noStyle>
          <Button
            className={`${styles.ctaButton} mt-8`}
            htmlType="submit"
            disabled={!isAllowedToSubmit}
            loading={isApplying}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};
