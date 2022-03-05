import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { FC, memo } from "react";

import ButtonSys from "components/button";

export interface IFormAktivitasTableHeader {
  onSearchTriggered: (searchValue: string) => void;
}

export const FormAktivitasTableHeader: FC<IFormAktivitasTableHeader> = memo(
  ({ onSearchTriggered }) => {
    const [searchForm] = Form.useForm();

    return (
      <div className="flex items-center justify-between overflow-x-auto">
        {/* Title */}
        <span className="text-mono30 font-bold text-lg">Form Aktivitas</span>

        {/* Buttons and Input */}
        <div className="flex space-x-4">
          <ButtonSys type="default">
            <DownloadOutlined
              className="mr-2"
              onClick={
                /** TODO */ () => {
                  alert("Button Unduh Tabel clicked");
                }
              }
            />
            Unduh Tabel
          </ButtonSys>

          <Form
            form={searchForm}
            layout="inline"
            onFinish={() => {
              onSearchTriggered(searchForm.getFieldValue("search"));
            }}
          >
            <Form.Item name="search">
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
      </div>
    );
  }
);
FormAktivitasTableHeader.displayName = "FormAktivitasTableHeader";
