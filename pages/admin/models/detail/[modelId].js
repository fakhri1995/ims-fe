import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import httpcookie from 'cookie'
import Link from 'next/link'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { notification, Button, Checkbox, Collapse, Timeline, Empty, Modal, Tooltip } from 'antd'
import Layout from '../../../../components/layout-dashboard'
import st from '../../../../components/layout-dashboard.module.css'
import Sticky from 'wil-react-sticky'

const DetailModel = ({ initProps, dataProfile, sidemenu, modelid }) => {
    //1. Init
    const rt = useRouter()
    var pathArr = rt.pathname.split("/").slice(1)
    pathArr.splice(3, 1)
    pathArr[pathArr.length - 1] = "Detail Asset Type"
    const { Panel } = Collapse

    //2.Helper functions
    const renderChildPartModel = (item) => {
        return (
            item.map((doc, idx) => {
                return (
                    <Children doc={doc}></Children>
                )
            })
        )
    }
    const Children = ({ doc }) => {
        return (
            <Timeline.Item>
                <Collapse accordion>
                    {
                        <Panel header={doc.name}>
                            <div className="flex flex-col p-3">
                                <div className="flex flex-col mb-5">
                                    <h1 className="font-semibold mb-1">Quantity <span className="judulsn"></span></h1>
                                    <div className="rounded bg-gray-200 w-full flex items-center my-auto h-12 px-2">
                                        <p className="mb-0 text-sm">{doc.quantity}</p>
                                    </div>
                                </div>
                                {
                                    doc.model_column.map((doc, idx) => {
                                        return (
                                            <div className="flex flex-col mb-5">
                                                <h1 className="font-semibold mb-1">{doc.name} {doc.required ? <span className="judulsn"></span> : null} <span className="text-gray-400">({doc.data_type.charAt(0).toUpperCase() + doc.data_type.slice(1)})</span></h1>
                                                <div className="rounded bg-gray-200 w-full flex items-center my-auto h-12 px-2">
                                                    <p className="mb-0 text-sm">{doc.default}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                {
                                    doc.model_child.length > 0 && renderChildPartModel(doc.model_child)
                                }
                            </div>
                            <style jsx>
                                {`
                                                        .judulassettype::before{
                                                            content: '*';
                                                            color: red;
                                                        }
                                                        .judulsn::before{
                                                            content: '*';
                                                            color: red;
                                                        }
                                                    `}
                            </style>
                        </Panel>
                    }
                </Collapse>
            </Timeline.Item>
        )
    }

    //2.useState
    const [displaydata, setdisplaydata] = useState({
        id: '',
        asset_id: "",
        name: "",
        description: "",
        manufacturer_id: "",
        required_sn: false,
        asset: {
            deleted_at: null
        },
        manufacturer: {},
        asset_columns: [],
        model_columns: [],
        model_parts: []
    })
    const [loadingdelete, setloadingdelete] = useState(false)
    const [modaldelete, setmodaldelete] = useState(false)

    //3.onChange


    //4.handler
    const handleDeleteModel = () => {
        setloadingdelete(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteModel`, {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: Number(modelid)
            })
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingdelete(false)
                if (res2.success) {
                    notification['success']({
                        message: "Model berhasil dihapus",
                        duration: 3
                    })
                    setTimeout(() => {
                        setmodaldelete(false)
                        rt.push(`/admin/models`)
                    }, 500)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }


    //5.useeffect
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getModel?id=${modelid}`)
            .then(res => res.json())
            .then(res2 => {
                var t = {}
                for (var prop in res2.data) {
                    if (prop === "model_columns" || prop === "asset_columns") {
                        t[prop] = res2.data[prop].map((doc, idx) => {
                            if (doc.data_type === 'dropdown' || doc.data_type === 'checkbox') {
                                return ({
                                    ...doc,
                                    default: JSON.parse(doc.default)
                                })
                            }
                            else {
                                return { ...doc }
                            }
                        })
                    }
                    else {
                        t[prop] = res2.data[prop]
                    }
                }
                setdisplaydata(t)
            })
    }, [])

    return (
        <Layout st={st} sidemenu={sidemenu} tok={initProps} pathArr={pathArr} dataProfile={dataProfile}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4" id="createAssetsWrapper">
                <div className=" col-span-1 md:col-span-4 mb-8">
                    <Sticky containerSelectorFocus="#createAgentsWrapper">
                        <div className=" col-span-4 flex justify-between py-2 px-4 border-t-2 border-b-2 bg-white">
                            <h1 className="font-semibold py-2 text-2xl mb-0">{displaydata.name}</h1>
                            <div className="flex space-x-2 items-center">
                                {/* <Link href={`/admin/models/update2/${displaydata.id}`}> */}
                                <Button onClick={() => { window.location.href = `/admin/models/update2/${displaydata.id}` }} type="primary">Ubah</Button>
                                {/* </Link> */}
                                <Button type="danger" onClick={() => { setmodaldelete(true) }}>Hapus</Button>
                            </div>
                        </div>
                    </Sticky>
                </div>
                <div className="col-span-1 md:col-span-4">
                    <div className="py-3 px-5 mb-8 rounded-md border shadow-md flex flex-col w-9/12">
                        <div className="flex flex-col mb-4">
                            <h1 className="font-semibold mb-1">Asset Type:</h1>
                            {
                                displaydata.asset.deleted_at !== null ?
                                    <p className="mb-0 flex items-center">
                                        <span className="mb-0 text-xs w-auto mr-1">{displaydata.asset.name}</span>
                                        <Tooltip placement="right" title="Assett Type telah dihapus. Segera lakukan pengubahan pada Asset Type!">
                                            <ExclamationCircleOutlined style={{ color: `brown` }}></ExclamationCircleOutlined>
                                        </Tooltip>
                                    </p>
                                    :
                                    <p className="mb-0 text-xs">{displaydata.asset.name}</p>
                            }
                        </div>
                        <div className="flex flex-col mb-4">
                            <h1 className="font-semibold mb-1">Manufacturer:</h1>
                            {
                                displaydata.manufacturer.deleted_at !== null ?
                                    <p className="mb-0 flex items-center">
                                        <span className="mb-0 text-xs w-auto mr-1">{displaydata.manufacturer.name}</span>
                                        <Tooltip placement="right" title="Manufacturer telah dihapus. Segera lakukan pengubahan pada Manufacturer!">
                                            <ExclamationCircleOutlined style={{ color: `brown` }}></ExclamationCircleOutlined>
                                        </Tooltip>
                                    </p>
                                    :
                                    <p className="mb-0 text-xs">{displaydata.manufacturer.name}</p>
                            }
                        </div>
                        <div className="flex flex-col mb-4">
                            <h1 className="font-semibold mb-1">Deskripsi:</h1>
                            <p className="mb-0 text-xs">{displaydata.description}</p>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="font-semibold mb-1">Jumlah Item:</h1>
                            <p className="mb-0 text-xs">{displaydata.count}</p>
                        </div>
                    </div>
                    <div className="flex flex-col mb-8">
                        <div className="mb-4 px-5 py-3">
                            <h1 className="font-bold mb-0 text-xl">Spesifikasi Model</h1>
                        </div>
                        <div className="rounded-md border shadow-md flex flex-col w-9/12 px-5 py-3">
                            {
                                displaydata.model_columns.map((docmc, idxmc) => {
                                    return (
                                        <div className="flex flex-col mb-5">
                                            <h1 className="font-semibold mb-1">{docmc.name} {docmc.required ? <span className="judulsn"></span> : null} <span className="text-gray-400">({docmc.data_type.charAt(0).toUpperCase() + docmc.data_type.slice(1)})</span></h1>
                                            {
                                                docmc.default === "" ?
                                                    <div className="rounded bg-gray-200 w-full flex flex-col justify-center my-auto p-3">
                                                        -
                                                    </div>
                                                    :
                                                    <div className="rounded bg-gray-200 w-full flex flex-col justify-center my-auto p-3">
                                                        {
                                                            docmc.data_type === 'dropdown' || docmc.data_type === 'checkbox' ?
                                                                <>
                                                                    {docmc.data_type === 'dropdown' &&
                                                                        <>
                                                                            {
                                                                                docmc.default.opsi.map((docopsi, idxopsi) => (
                                                                                    <div key={idxopsi} className="rounded bg-white border w-5/12 flex items-center my-auto px-2 py-1 mb-1">
                                                                                        <Checkbox disabled checked={idxopsi === docmc.default.default} style={{ marginRight: `0.5rem` }} />
                                                                                        {docopsi}
                                                                                    </div>
                                                                                ))
                                                                            }
                                                                        </>
                                                                    }
                                                                    {docmc.data_type === 'checkbox' &&
                                                                        <>
                                                                            {
                                                                                docmc.default.opsi.map((docopsi, idxopsi) => (
                                                                                    <div key={idxopsi} className="rounded w-full flex items-center my-auto px-2 py-1 mb-1">
                                                                                        <Checkbox disabled checked={docmc.default.default.includes(idxopsi)} style={{ marginRight: `0.5rem` }} />
                                                                                        {docopsi}
                                                                                    </div>
                                                                                ))
                                                                            }
                                                                        </>
                                                                    }
                                                                </>
                                                                :
                                                                <p className="mb-0 text-sm">{docmc.default}</p>
                                                        }
                                                    </div>
                                            }
                                        </div>
                                    )
                                })
                            }
                            <style jsx>
                                {`
                                    .judulsn::before{
                                        content: '*';
                                        color: red;
                                    }
                                `}
                            </style>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="mb-4 px-5 py-3">
                            <h1 className="font-bold mb-0 text-xl">Konfigurasi Part Model</h1>
                        </div>
                        {/* <div className="rounded-md border shadow-md flex flex-col w-full px-5 py-3"> */}
                        {
                            displaydata.model_parts.length === 0 ?
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
                                :
                                <>
                                    <Collapse accordion style={{ width: `75%` }}>
                                        {
                                            displaydata.model_parts.map((docmp, idxmp) => {
                                                return (
                                                    <Panel id={`panel${idxmp}`} key={idxmp} header={<strong>{docmp.name}</strong>}>
                                                        <div className="flex flex-col p-3">
                                                            <div className="flex flex-col mb-5">
                                                                <h1 className="font-semibold mb-1">Asset Type <span className="judulassettype"></span></h1>
                                                                <div className="rounded bg-gray-200 w-full flex items-center my-auto h-12 px-2">
                                                                    <p className="mb-0 text-sm">-</p>
                                                                </div>
                                                            </div>
                                                            {
                                                                docmp.model_column.map((docmc2, idxmc2) => {
                                                                    return (
                                                                        <div className="flex flex-col mb-5">
                                                                            <h1 className="font-semibold mb-1">{docmc2.name} {docmc2.required ? <span className="judulsn"></span> : null} <span className="text-gray-400">({docmc2.data_type.charAt(0).toUpperCase() + docmc2.data_type.slice(1)})</span></h1>
                                                                            <div className="rounded bg-gray-200 w-full flex flex-col justify-center my-auto px-2 py-1">
                                                                                {
                                                                                    docmc2.data_type === 'dropdown' || docmc2.data_type === 'checkbox' ?
                                                                                        <>
                                                                                            {docmc2.data_type === 'dropdown' &&
                                                                                                <>
                                                                                                    {
                                                                                                        docmc2.default.opsi.map((docopsi, idxopsi) => (
                                                                                                            <div key={idxopsi} className="rounded bg-white border w-3/12 flex items-center my-auto px-2 py-1 mb-1">
                                                                                                                <Checkbox disabled checked={idxopsi === docmc2.default.default} style={{ marginRight: `0.5rem` }} />
                                                                                                                {docopsi}
                                                                                                            </div>
                                                                                                        ))
                                                                                                    }
                                                                                                </>
                                                                                            }
                                                                                            {docmc2.data_type === 'checkbox' &&
                                                                                                <>
                                                                                                    {
                                                                                                        docmc2.default.opsi.map((docopsi, idxopsi) => (
                                                                                                            <div key={idxopsi} className="rounded w-full flex items-center my-auto px-2 py-1 mb-1">
                                                                                                                <Checkbox disabled checked={idxopsi === docmc2.default.default} style={{ marginRight: `0.5rem` }} />
                                                                                                                {docopsi}
                                                                                                            </div>
                                                                                                        ))
                                                                                                    }
                                                                                                </>
                                                                                            }
                                                                                        </>
                                                                                        :
                                                                                        <p className="mb-0 text-sm">{docmc2.default}</p>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                            {
                                                                docmp.model_child.length === 0 ?
                                                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
                                                                    :
                                                                    <>
                                                                        <Timeline style={{ marginTop: `1rem` }}>
                                                                            {
                                                                                renderChildPartModel(docmp.model_child)
                                                                            }
                                                                        </Timeline>
                                                                    </>
                                                            }
                                                        </div>
                                                    </Panel>
                                                )
                                            })
                                        }
                                    </Collapse>
                                </>
                        }
                        <style jsx>
                            {`
                                    .judulsn::before{
                                        content: '*';
                                        color: red;
                                    }
                                `}
                        </style>
                        {/* </div> */}
                    </div>
                </div>
            </div>
            <Modal title={<h1 className="font-semibold">Konfirmasi Hapus Model</h1>}
                visible={modaldelete}
                onCancel={() => { setmodaldelete(false) }}
                okText="Ya"
                cancelText="Tidak"
                onOk={handleDeleteModel}
                okButtonProps={{ loading: loadingdelete }}
            >
                Apakah anda yakin ingin menghapus Model <strong>"{displaydata.name}"</strong> ?
            </Modal>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }) {
    const modelid = params.modelId
    var initProps = {};
    if (!req.headers.cookie) {
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            }
        }
    }
    const cookiesJSON1 = httpcookie.parse(req.headers.cookie);
    if (!cookiesJSON1.token) {
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            }
        }
    }
    initProps = cookiesJSON1.token
    const resourcesGP = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    if (![107, 108, 109, 110, 111, 112, 132].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
        res.writeHead(302, { Location: '/dashboard/admin' })
        res.end()
    }

    return {
        props: {
            initProps,
            dataProfile,
            sidemenu: "4",
            modelid
        },
    }
}

export default DetailModel
