import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect } from "react";
import "react-quill/dist/quill.snow.css";

import ButtonSys from "../../button";
import { PlusIconSvg } from "../../icon";

const ModalColumnAdd = ({
  visible,
  onvisible,
  handleAddColumn,
  dataCurrentColumn,
  setDataCurrentColumn,
  onEnterAddColumn,
}) => {
  const [instanceForm] = useForm();
  useEffect(() => {
    if (visible) {
      instanceForm.resetFields();
    }
  }, [visible]);
  return (
    <Modal
      title={<p className="mig-heading--4 text-mono30">Tambah Kolom Baru</p>}
      visible={visible}
      closable={true}
      onCancel={() => {
        setDataCurrentColumn({ idx: -1, name: "" });
        onvisible(false);
      }}
      maskClosable={false}
      footer={
        <ButtonSys
          type={"primary"}
          fullWidth
          onClick={handleAddColumn}
          disabled={!dataCurrentColumn?.name}
        >
          <div className="flex items-center space-x-2">
            <p>Tambah Kolom</p>
            <PlusIconSvg size={16} color={"#FFFFFF"} />
          </div>
        </ButtonSys>
      }
    >
      <div className="">
        <Form layout="vertical" form={instanceForm}>
          <Form.Item
            label="Nama Kolom"
            name={"column_name"}
            rules={[
              {
                required: true,
                message: "Nama Kolom wajib diisi",
              },
            ]}
          >
            <>
              <Input
                placeholder="Masukkan nama kolom"
                onChange={(e) =>
                  setDataCurrentColumn((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                onKeyPress={(e) => {
                  e.target.value && onEnterAddColumn(e);
                }}
              ></Input>
            </>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalColumnAdd;
