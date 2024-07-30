/** New modal components
 * used for confirmation before the real action (delete, update, etc).
 * Currently used in revamped design July 2024.
 * */
import { Modal, Spin } from "antd";
import { ReactElement } from "react";

import ButtonSys from "components/button";
import {
  AlertCircleFilledIconSvg,
  CheckIconSvg,
  TrashIconSvg,
} from "components/icon";

const ModalWarning = ({
  visible,
  okText,
  onOk,
  onCancel,
  loading = false,
  disabled = false,
  children,
}: {
  visible: boolean;
  okText: string;
  onOk: any;
  onCancel: () => void;
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
      onCancel={onCancel}
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
  iconDelete,
}: {
  visible: boolean;
  itemName: string;
  loading: boolean;
  disabled: boolean;
  onOk: any;
  children: ReactElement;
  onCancel?: any;
  title?: string;
  iconDelete?: ReactElement;
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
        <div className="flex gap-4 items-center justify-end">
          <ButtonSys type={"default"} color={"mono50"} onClick={onCancel}>
            Cancel
          </ButtonSys>
          <div className="col-span-2 hover:opacity-75">
            <ButtonSys
              type={"primary"}
              color={"danger"}
              onClick={onOk}
              loading={loading}
              disabled={disabled}
            >
              <div className="flex items-center gap-2">
                {iconDelete ? iconDelete : <TrashIconSvg />}
                <p> {title ?? `Delete ${itemName}`}</p>
              </div>
            </ButtonSys>
          </div>
        </div>
      }
    >
      {children}
    </Modal>
  );
};

const ModalAccept = ({
  visible,
  loading = false,
  disabled = false,
  onOk,
  children,
  onCancel,
  title,
  icon,
}: {
  visible: boolean;
  loading: boolean;
  disabled: boolean;
  onOk: any;
  children: ReactElement;
  onCancel?: any;
  title?: string;
  icon?: ReactElement;
}) => {
  return (
    <Modal
      title={
        <div className="text-primary100 flex items-center gap-3">
          <AlertCircleFilledIconSvg size={24} />
          <p> {title}</p>
        </div>
      }
      visible={visible}
      onCancel={onCancel}
      className="mig-body--medium"
      footer={
        <div className="flex gap-4 items-center justify-end">
          <ButtonSys type={"default"} color={"mono50"} onClick={onCancel}>
            Cancel
          </ButtonSys>
          <div className="col-span-2 hover:opacity-75">
            <ButtonSys
              type={"primary"}
              onClick={onOk}
              loading={loading}
              disabled={disabled}
            >
              <div className="flex items-center gap-2">
                {icon ? icon : <CheckIconSvg />}
                <p> {title}</p>
              </div>
            </ButtonSys>
          </div>
        </div>
      }
    >
      {children}
    </Modal>
  );
};

const ModalApply = ({
  visible,
  loading = false,
  disabled = false,
  onOk,
  children,
  onCancel,
  title,
  buttonOkText,
}: {
  visible: boolean;
  loading: boolean;
  disabled: boolean;
  onOk: any;
  children: ReactElement;
  onCancel?: any;
  title?: string;
  buttonOkText?: string;
}) => {
  return (
    <Modal
      title={
        <div className="text-danger flex items-center gap-3">
          <AlertCircleFilledIconSvg size={24} />
          <p> {title}</p>
        </div>
      }
      visible={visible}
      onCancel={onCancel}
      className="mig-body--medium"
      footer={
        <div className="flex gap-4 items-center justify-end">
          <ButtonSys type={"default"} color={"mono50"} onClick={onCancel}>
            Cancel
          </ButtonSys>
          <div className="col-span-2 hover:opacity-75">
            <ButtonSys
              type={"primary"}
              onClick={onOk}
              loading={loading}
              disabled={disabled}
            >
              <div className="flex items-center gap-2">
                <p> {buttonOkText}</p>
              </div>
            </ButtonSys>
          </div>
        </div>
      }
    >
      {children}
    </Modal>
  );
};

export { ModalWarning, ModalDelete, ModalAccept, ModalApply };
