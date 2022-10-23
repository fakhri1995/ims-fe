import { Drawer } from "antd";
import React from "react";

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
  drawerStyle,
  buttonCancelText,
  onButtonCancelClicked,
  buttonUpdateText,
}) => {
  return (
    <Drawer
      title={title}
      maskClosable={false}
      visible={visible}
      onClose={onClose}
      destroyOnClose={true}
      width={420}
      drawerStyle={drawerStyle}
      footer={
        <div className="flex items-center justify-end space-x-6">
          {/* Additional button on the LHS for Cancelling the action, etc. */}
          {buttonCancelText && onButtonCancelClicked && (
            <ButtonSys
              // disabled={disabled}
              // type={disabled ? "primary" : "default"}
              type={"default"}
              color="danger"
              onClick={onButtonCancelClicked}
            >
              {buttonCancelText}
            </ButtonSys>
          )}

          {buttonOkText && onClick && (
            <ButtonSys disabled={disabled} type="primary" onClick={onClick}>
              <CheckIconSvg size={15} color="#FFFFFF" />
              {buttonOkText}
            </ButtonSys>
          )}

          {buttonUpdateText && onClick && (
            <ButtonSys
              disabled={disabled}
              type={disabled ? "primary" : "default"}
              onClick={onClick}
            >
              {buttonUpdateText}
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
