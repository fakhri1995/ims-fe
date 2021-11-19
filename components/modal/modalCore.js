import React from 'react'
import { Modal } from 'antd'

const ModalCore = ({ title, visible, onOk, onCancel, footer, loading, children }) => {
    return (
        <Modal
            title={title}
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            footer={footer}
            okButtonProps={{ loading: loading }}
        >
            {children}
        </Modal>
    )
}

export default ModalCore
