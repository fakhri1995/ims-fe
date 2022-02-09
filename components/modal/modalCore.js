import React from 'react'
import { Modal } from 'antd'

const ModalCore = ({ title, visible, onOk, onCancel, footer, loading, children, width, closeIcon, maskClosable }) => {
    return (
        <Modal
            title={title}
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            footer={footer}
            okButtonProps={{ loading: loading }}
            width={width}
            closeIcon={closeIcon}
            maskClosable={maskClosable}
        >
            {children}
        </Modal>
    )
}

export default ModalCore
