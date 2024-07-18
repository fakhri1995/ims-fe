import { Modal } from "antd";
import React, { ReactElement } from "react";

import { CheckIconSvg } from "components/icon";

import ButtonSys from "../button";

interface IModalCore {
  title: string;
  visible: boolean;
  onOk: () => void;
  loading: boolean;
  children: ReactElement;
  buttonOkText?: string;
  onCancel?: () => void;
  buttonCancelText?: string;
  footer?: ReactElement;
  disabled?: boolean;
  width?: number;
  iconButtonText?: string;
  closable?: boolean;
  maskClosable?: boolean;
  closeIcon?: ReactElement;
}

/** Core modal component for main feature.
 * Don't use it for confirmation modal,
 * use component in modalCustomNew instead.
 * */
const ModalCore = ({
  title,
  visible,
  onOk,
  loading,
  children,
  buttonOkText,
  onCancel,
  buttonCancelText,
  footer,
  disabled,
  width,
  iconButtonText,
  closable = true,
  maskClosable = false,
  closeIcon,
}: IModalCore) => {
  return (
    <Modal
      className="modalCore"
      title={title}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={
        footer ?? (
          <div className={`flex items-center justify-end gap-4`}>
            {/* Additional button on the LHS for Cancelling the action, etc. */}
            {buttonCancelText && onCancel && (
              <ButtonSys type={"default"} color="mono50" onClick={onCancel}>
                {buttonCancelText}
              </ButtonSys>
            )}

            {buttonOkText && onOk && (
              <ButtonSys disabled={disabled} type="primary" onClick={onOk}>
                <div className={"flex items-center gap-3"}>
                  {iconButtonText ?? <CheckIconSvg size={16} color="#FFFFFF" />}
                  {buttonOkText}
                </div>
              </ButtonSys>
            )}
          </div>
        )
      }
      okButtonProps={{ loading: loading }}
      width={width}
      closeIcon={closeIcon}
      maskClosable={maskClosable}
      closable={closable}
    >
      {children}
    </Modal>
  );
};

export default ModalCore;
