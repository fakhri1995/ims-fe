import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { FC, memo } from "react";

export interface IFormAktivitasTableHeader {
  onSearchTriggered: (searchValue: string) => void;
}

export const FormAktivitasTableHeader: FC<IFormAktivitasTableHeader> = memo(
  ({ onSearchTriggered }) => {
    const [searchForm] = Form.useForm();

    return (
      <div className="flex flex-col md:flex-row md:items-center justify-between overflow-x-auto">
        {/* Title */}
        <span className="mig-heading--4 mb-2 md:mb-0">Form Aktivitas</span>

        {/* Buttons and Input */}
        <Form
          form={searchForm}
          className="flex flex-row space-x-2 md:space-x-4"
          onFinish={() => {
            onSearchTriggered(searchForm.getFieldValue("search"));
          }}
        >
          <Form.Item noStyle name="search">
            <Input
              placeholder="Cari..."
              allowClear
              onChange={(event) => {
                if (
                  event.target.value.length === 0 ||
                  event.target.value === ""
                ) {
                  onSearchTriggered("");
                }
              }}
            />
          </Form.Item>

          <Form.Item noStyle>
            <Button
              htmlType="submit"
              className="mig-button mig-button--solid-primary"
              icon={<SearchOutlined />}
            >
              Cari
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
);
FormAktivitasTableHeader.displayName = "FormAktivitasTableHeader";
