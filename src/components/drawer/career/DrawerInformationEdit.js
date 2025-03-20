import {
  Button,
  Checkbox,
  Col,
  Drawer,
  Empty,
  Form,
  Input,
  Row,
  Select,
  Space,
  Spin,
  Switch,
  notification,
} from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import "react-quill/dist/quill.snow.css";

import { useAccessControl } from "contexts/access-control";

import {
  RECRUITMENT_JALUR_DAFTARS_LIST_GET,
  RECRUITMENT_ROLE_TYPES_LIST_GET,
} from "lib/features";

import { permissionWarningNotification } from "../../../lib/helper";
import {
  AlignJustifiedIconSvg,
  CheckIconSvg,
  CheckboxIconSvg,
  CopyIconSvg,
  ListNumbersSvg,
  TrashIconSvg,
  UploadIconSvg,
} from "../../icon";
import { H2, Label } from "../../typography";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const DrawerInformationEdit = ({
  title,
  visible,
  onvisible,
  buttonOkText,
  setdraweditinformation,
  handleEditInformation,
  dataeditinformation,
  setdataeditinformation,
  loadingeditinformation,
  dataRoleTypeList,
  dataExperience,
  dataRoles,
  sendEditData,
}) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetRegistPlatformList = hasPermission(
    RECRUITMENT_JALUR_DAFTARS_LIST_GET
  );

  const [instanceForm] = Form.useForm();

  //USESTATE
  const isAllowedToGetRoleTypeList = hasPermission(
    RECRUITMENT_ROLE_TYPES_LIST_GET
  );
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link"],
    ],
  };
  const formats = [
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  const [form] = Form.useForm();

  const onChangeJobPlaftorm = (checkedValues) => {
    form.setFieldsValue({
      platform: checkedValues, // Mengatur nilai "role" menjadi "Backend"
    });
    setdataeditinformation({
      ...dataeditinformation,
      platform_value: checkedValues,
    });
  };

  useEffect(() => {
    if (dataeditinformation.platforms) {
      let datatemp = [];
      for (let a = 0; a < dataeditinformation.platforms.length; a++) {
        datatemp.push(dataeditinformation.platforms[a].id.toString());
      }
      form.setFieldsValue({
        platform: datatemp, // Mengatur nilai "role" menjadi "Backend"
      });
      setdataeditinformation({
        ...dataeditinformation,
        platform_value: datatemp,
      });
    }
  }, [dataeditinformation.platforms]);

  return (
    <Drawer
      title={title}
      visible={visible}
      onClose={() => {
        setdraweditinformation(false);
      }}
      destroyOnClose={true}
      maskClosable={false}
      width={400}
      //   disabled={disabledcreate}
    >
      <Spin spinning={loadingeditinformation}>
        <Form
          layout="vertical"
          form={form}
          initialValues={dataeditinformation}
          onFinish={handleEditInformation}
        >
          <Form.Item
            label="ID Role"
            name="recruitment_role_id"
            rules={[
              {
                required: true,
                message: "Role wajib diisi",
              },
            ]}
          >
            <Select
              showSearch={true}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              value={
                dataeditinformation?.recruitment_role_id &&
                Number(dataeditinformation?.recruitment_role_id)
              }
              onChange={(e, index) => {
                form.setFieldsValue({
                  name: index.role, // Mengatur nilai "role" menjadi "Backend"
                });
                setdataeditinformation({
                  ...dataeditinformation,
                  recruitment_role_id: e,
                  name: index.role,
                });
              }}
              placeholder="Pilih ID Role"
            >
              <>
                {dataRoles?.map((option) => (
                  <Select.Option
                    role={option.role}
                    key={option.id}
                    value={option.id}
                  >
                    {option.alias}
                  </Select.Option>
                ))}
              </>
            </Select>
          </Form.Item>
          <Form.Item label="Role" name="name">
            <Input defaultValue={dataeditinformation.name} disabled />
          </Form.Item>
          <Form.Item
            label="Status Kontrak"
            name="career_role_type_id"
            rules={[
              {
                required: true,
                message: "Status Kontrak wajib diisi",
              },
            ]}
          >
            <Select
              value={
                dataeditinformation?.career_role_type_id &&
                Number(dataeditinformation?.career_role_type_id)
              }
              onChange={(e) => {
                setdataeditinformation({
                  ...dataeditinformation,
                  career_role_type_id: e,
                });
              }}
              placeholder="Pilih status kontrak"
            >
              <>
                {dataRoleTypeList?.map((option) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
              </>
            </Select>
          </Form.Item>
          <Form.Item
            label="Pengalaman Kerja"
            name="career_experience_id"
            rules={[
              {
                required: true,
                message: "Pengalaman Kerja wajib diisi",
              },
            ]}
          >
            <Select
              value={
                dataeditinformation?.career_experience_id &&
                Number(dataeditinformation?.career_experience_id)
              }
              onChange={(e) => {
                setdataeditinformation({
                  ...dataeditinformation,
                  career_experience_id: e,
                });
              }}
              placeholder="Pilih pengalaman kerja"
            >
              <>
                {dataExperience?.map((option) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
              </>
            </Select>
          </Form.Item>

          <Form.Item
            label="Salary Min"
            name="salary_min"
            rules={[
              {
                required: true,
                message: "Salary Min wajib diisi",
              },
            ]}
          >
            <CurrencyFormat
              customInput={Input}
              placeholder={"Masukkan Minimal Gaji"}
              value={dataeditinformation?.salary_min || 0}
              thousandSeparator={"."}
              decimalSeparator={","}
              prefix={"Rp"}
              allowNegative={false}
              onValueChange={(values) => {
                const { formattedValue, value, floatValue } = values;
                setdataeditinformation((prev) => ({
                  ...prev,
                  salary_min: floatValue || 0,
                }));
              }}
              renderText={(value) => <p>{value}</p>}
            />
          </Form.Item>
          <Form.Item
            label="Salary Max"
            name="salary_max"
            rules={[
              {
                required: true,
                message: "Salary Max wajib diisi",
              },
            ]}
          >
            <CurrencyFormat
              customInput={Input}
              placeholder={"Masukkan Maksimal Gaji"}
              value={dataeditinformation?.salary_max || 0}
              thousandSeparator={"."}
              decimalSeparator={","}
              prefix={"Rp"}
              allowNegative={false}
              onValueChange={(values) => {
                const { formattedValue, value, floatValue } = values;
                setdataeditinformation((prev) => ({
                  ...prev,
                  salary_max: floatValue || 0,
                }));
              }}
              renderText={(value) => <p>{value}</p>}
            />
          </Form.Item>
          <Form.Item
            label="Overview"
            name="overview"
            rules={[
              {
                required: true,
                message: "Overview wajib diisi",
              },
            ]}
          >
            <ReactQuill
              theme="snow"
              value={dataeditinformation?.overview}
              modules={modules}
              formats={formats}
              className="h-44 pb-10"
              onChange={(value) => {
                setdataeditinformation({
                  ...dataeditinformation,
                  overview: value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Description Job wajib diisi",
              },
            ]}
          >
            <ReactQuill
              theme="snow"
              value={dataeditinformation?.description}
              modules={modules}
              formats={formats}
              className="h-44 pb-10"
              onChange={(value) => {
                setdataeditinformation({
                  ...dataeditinformation,
                  description: value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Platform"
            name="platform"
            rules={[
              {
                required: true,
                message: "Platform wajib diisi",
              },
            ]}
          >
            <Checkbox.Group
              style={{ width: "100%" }}
              onChange={onChangeJobPlaftorm}
            >
              <Row>
                <Col>
                  <Space direction="vertical">
                    <Checkbox value="1">Deals</Checkbox>
                    <Checkbox value="2">Glints</Checkbox>
                    <Checkbox value="3">Kitalulus</Checkbox>
                    <Checkbox value="4">Internal Website</Checkbox>
                  </Space>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <div className="flex justify-end">
            <Button
              type="default"
              onClick={() => {
                form
                  .validateFields()
                  .then(() => {
                    sendEditData("draft");
                  })
                  .catch(() => {
                    // form validation failed
                  });
              }}
              style={{ marginRight: `1rem` }}
            >
              Save as Draft
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              danger
              icon={<CheckIconSvg size={16} color={"#ffffff"} />}
              loading={loadingeditinformation}
            >
              Save
            </Button>
          </div>
        </Form>
      </Spin>
    </Drawer>
  );
};

export default DrawerInformationEdit;
