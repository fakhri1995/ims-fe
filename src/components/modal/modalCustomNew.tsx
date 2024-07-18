import { Modal, Spin } from "antd";
import { ReactElement } from "react";

import ButtonSys from "components/button";
import { AlertCircleFilledIconSvg, TrashIconSvg } from "components/icon";

/** New modal components used for revamped design in July 2024 */

const ModalWarning = ({
  visible,
  okText,
  onOk,
  loading = false,
  disabled = false,
  children,
}: {
  visible: boolean;
  okText: string;
  onOk: any;
  loading?: boolean;
  disabled?: boolean;
  children: ReactElement;
}) => {
  return (
    <Modal
      title={
        <div className="text-warning flex items-center gap-3">
          <AlertCircleFilledIconSvg size={24} />
          <p>Attention</p>
        </div>
      }
      visible={visible}
      onOk={onOk}
      okText={okText}
      okButtonProps={{ loading: loading, disabled: disabled }}
      cancelButtonProps={{ hidden: true }}
      maskClosable={true}
      closable={true}
      className="mig-body--medium"
    >
      {children}
    </Modal>
  );
};

const ModalDelete = ({
  visible,
  itemName,
  loading = false,
  disabled = false,
  onOk,
  children,
  onCancel,
  title,
}: {
  visible: boolean;
  itemName: string;
  loading: boolean;
  disabled: boolean;
  onOk: any;
  children: ReactElement;
  onCancel?: any;
  title?: string;
}) => {
  return (
    <Modal
      title={
        <div className="text-danger flex items-center gap-3">
          <AlertCircleFilledIconSvg size={24} />
          <p> {title ?? `Delete ${itemName}`}</p>
        </div>
      }
      visible={visible}
      onCancel={onCancel}
      className="mig-body--medium"
      footer={
        <Spin spinning={loading}>
          <div className="flex gap-4 items-center justify-end">
            <ButtonSys type={"default"} color={"mono50"} onClick={onCancel}>
              Cancel
            </ButtonSys>
            <div className="col-span-2 hover:opacity-75">
              <ButtonSys
                type={"primary"}
                color={"danger"}
                onClick={onOk}
                disabled={disabled}
              >
                <div className="flex items-center gap-2">
                  <TrashIconSvg />
                  <p>Delete {itemName}</p>
                </div>
              </ButtonSys>
            </div>
          </div>
        </Spin>
      }
    >
      {children}
    </Modal>
  );
};

export { ModalWarning, ModalDelete };
