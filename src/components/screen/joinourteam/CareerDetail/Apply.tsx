import { Button, Checkbox, Form, Input, Upload } from "antd";
import { FC, useCallback, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { beforeUploadFileMaxSize } from "lib/helper";

import styles from "./CareersDetail.module.scss";

export const Apply: FC = () => {
  /**
   * States
   */
  const [isCaptchaPassed, setIsCaptchaPassed] = useState(false);
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

  const onCaptchaChanged = useCallback(() => {
    setIsCaptchaPassed(true);
  }, []);

  /**
   * Values
   */
  const isAllowedToSubmit = isCaptchaPassed && isAgreementPassed;

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
        layout="vertical"
        className="w-full max-w-full"
        onFinish={(values) => {
          console.log("Form.onFinish", { values });
        }}
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
                beforeUpload={beforeUploadFileMaxSize(5)}
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
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={onCaptchaChanged}
        />

        <Form.Item noStyle>
          <Button
            className={`${styles.ctaButton} mt-8`}
            htmlType="submit"
            disabled={!isAllowedToSubmit}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};
