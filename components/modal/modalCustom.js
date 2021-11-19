import React from 'react'
import ModalCore from './modalCore'

function ModalEdit({ title, visible, onOk, onCancel, footer, loading, children }) {
    return (
        <ModalCore
            title={title}
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            footer={footer}
            loading={loading}
        >
            Apakah anda yakin ingin menghapus Perusahan ini?`
        </ModalCore>
    )
}

function ModalHapus({ title, visible, onOk, onCancel, footer, loading, namabank, children }) {
    return (
        <ModalCore
            title={title}
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            footer={footer}
            loading={loading}
        >
            Apakah Anda yakin ingin melanjutkan penghapusan Bank <strong>{namabank}</strong>?
        </ModalCore>
    )
}

export {
    ModalEdit, ModalHapus
}
