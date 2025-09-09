import { Drawer } from "antd";
import React, { ReactNode } from "react";

import ButtonSys from "../button";
import { CheckIconSvg } from "../icon";

const DrawerCore = ({
  title,
  visible,
  onClose,
  children,
  buttonOkText,
  onClick,
  disabled,
  loading,
  drawerStyle,
  buttonCancelText,
  onButtonCancelClicked,
  buttonUpdateText,
  iconButtonText,
  width = 360,
  form,
  submit,
  newbuttonCancelText,
  newbuttonUpdateText,
}: {
  title: string | ReactNode;
  visible: boolean;
  onClose: () => void;
  children: string | ReactNode;
  buttonOkText?: string | ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  drawerStyle?: React.CSSProperties;
  buttonCancelText?: string | ReactNode;
  onButtonCancelClicked?: () => void;
  buttonUpdateText?: string | ReactNode;
  iconButtonText?: ReactNode;
  width?: number;
  form?: string;
  submit?: boolean;
  newbuttonCancelText?: string | ReactNode;
  newbuttonUpdateText?: string | ReactNode;
}) => {
  return (
    <Drawer
      title={title}
      maskClosable={false}
      open={visible}
      onClose={onClose}
      destroyOnClose={true}
      width={width}
      drawerStyle={drawerStyle}
      footer={
        <div
          className={`flex items-center justify-end space-x-3
          `}
        >
          {/* Additional button on the LHS for Cancelling the action, etc. */}
          {buttonCancelText && onButtonCancelClicked && (
            <ButtonSys
              type={"default"}
              color="mono50"
              onClick={onButtonCancelClicked}
            >
              {buttonCancelText}
            </ButtonSys>
          )}

          {buttonOkText && (onClick || (submit && form)) && (
            <ButtonSys
              disabled={disabled}
              type="primary"
              onClick={onClick}
              loading={loading}
              form={form}
              submit={submit}
            >
              <div className={"flex items-center gap-2"}>
                {iconButtonText ? (
                  iconButtonText
                ) : (
                  <CheckIconSvg size={16} color="#FFFFFF" />
                )}
                {buttonOkText}
              </div>
            </ButtonSys>
          )}

          {buttonUpdateText && onClick && (
            <ButtonSys
              disabled={disabled}
              loading={loading}
              type={disabled ? "primary" : "default"}
              onClick={onClick}
            >
              {buttonUpdateText}
            </ButtonSys>
          )}

          {newbuttonCancelText && (onClick || (submit && form)) && (
            <div
              onClick={onButtonCancelClicked}
              className={
                "bg-white rounded-[5px] border border-[#BF4A40] hover:cursor-pointer px-4 py-2"
              }
            >
              {newbuttonCancelText}
            </div>
          )}

          {newbuttonUpdateText && onClick && (
            <ButtonSys
              disabled={disabled}
              loading={loading}
              type={disabled ? "default" : "primary"}
              onClick={onClick}
            >
              {newbuttonUpdateText}
            </ButtonSys>
          )}
        </div>
      }
    >
      {children}
    </Drawer>
  );
};

export default DrawerCore;
