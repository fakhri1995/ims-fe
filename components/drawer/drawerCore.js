import React from 'react'
import { Drawer } from 'antd'
import ButtonSys from '../button'
import { CheckIconSvg } from '../icon'

const DrawerCore = ({ title, visible, onClose, children, buttonOkText, onClick, disabled, drawerStyle }) => {
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
                <div style={{ textAlign: 'right' }}>
                    <ButtonSys disabled={disabled} type="primary" onClick={onClick}>
                        <CheckIconSvg size={15} color="#FFFFFF" />
                        {buttonOkText}
                    </ButtonSys>
                </div>
            }
        >
            {children}
        </Drawer>
    )
}

export default DrawerCore
