import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import type { FC } from "react";

import ButtonSys from "components/button";

export interface IFormAktivitasTableHeader {
  onSearchTriggered: (searchValue: string) => void;
}

export const FormAktivitasTableHeader: FC<IFormAktivitasTableHeader> = ({
  onSearchTriggered,
}) => {
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
            <Input placeholder="Cari..." />
          </Form.Item>

          <Form.Item noStyle>
            <Button
              htmlType="submit"
              className="rounded-md bg-primary100 hover:bg-primary75 focus:bg-primary100 hover:border-primary75 focus:border-primary100 hover:text-white focus:text-white text-white font-medium flex items-center px-6"
              icon={<SearchOutlined />}
            >
              Cari
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
