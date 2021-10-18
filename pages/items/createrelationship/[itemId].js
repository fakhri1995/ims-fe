import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import httpcookie from 'cookie'
import Link from 'next/link'
import { ExclamationCircleOutlined, SearchOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { notification, Button, Spin, Timeline, Empty, Modal, Tooltip, Select, Tabs, Input, TreeSelect, Table, Popover } from 'antd'
import Layout from '../../../components/layout-dashboard2'
import moment from 'moment'
import st from '../../../components/layout-dashboard.module.css'
import Sticky from 'wil-react-sticky'

const CreateRelationshipItem = ({ initProps, dataProfile, sidemenu, itemid }) => {
    // 1.Init
    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)
    pathArr.splice(2, 1)
    pathArr[pathArr.length - 1] = "Tambah Relationship Item"
    const { name, asset_id } = rt.query

    //useState
    const [newdata, setnewdata] = useState({
        subject_id: Number(itemid),
        relationship_asset_id: null,
        connected_ids: [],
        is_inverse: null
    })
    const [relitemdata, setrelitemdata] = useState([])
    const [reltipeitemdata, setreltipeitemdata] = useState(-10)
    const [reldetailitemdata, setreldetailitemdata] = useState("")
    const [relitemdatatrigger, setrelitemdatatrigger] = useState(-1)
    const [relitemloading, setrelitemloading] = useState(false)
    const [selectedrelitemdata, setselectedrelitemdata] = useState([])
    const [displaydatarelations, setdisplaydatarelations] = useState([])
    const [disabledrel, setdisabledrel] = useState(true)
    const [modaladd, setmodaladd] = useState(false)
    const [loadingadd, setloadingadd] = useState(false)

    //declaration
    const columns12 = [
        {
            title: 'Nama',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                        {
                            record.role === 1 &&
                            <p className="mb-0">Admin</p>
                        }
                        {
                            record.role === 2 &&
                            <p className="mb-0">Client</p>
                        }
                        {
                            record.role === 3 &&
                            <p className="mb-0">Branch</p>
                        }
                        </>
                }
            }
        },
    ]
    const columns4 = [
        {
            title: 'Nama',
            dataIndex: 'inventory_name',
            key: 'inventory_name',
        },
        {
            title: 'Serial Number',
            dataIndex: 'serial_number',
            key: 'serial_number',
        },
        {
            title: 'MIG ID',
            dataIndex: 'mig_id',
            key: 'mig_id',
        },
    ]
    const columns3 = [
        {
            title: 'Nama Perusahaan',
            dataIndex: 'title',
            key: 'title',
        },

    ]


    //handler
    const handleAddRelationshipItem = () => {
        setloadingadd(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addRelationshipInventories`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newdata)
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingadd(false)
                setmodaladd(false)
                if (res2.success) {
                    notification['success']({
                        message: "Relationship Item berhasil ditambahkan",
                        duration: 3
                    })
                    rt.push(`/items/detail/${itemid}?active=relationship`)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }

    //useEffect
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationshipInventoryRelation?asset_id=${asset_id}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setdisplaydatarelations(res2.data)
            })
    }, [])
    useEffect(() => {
        if (relitemdatatrigger !== -1) {
            setrelitemloading(true)
            fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationshipInventoryDetailList?relationship_asset_id=${relitemdatatrigger}`, {
                method: `GET`,
                headers: {
                    'Authorization': JSON.parse(initProps),
                }
            })
                .then(res => res.json())
                .then(res2 => {
                    setrelitemdata([res2.data])
                    setrelitemloading(false)
                })
        }
    }, [relitemdatatrigger])
    return (
        <Layout dataProfile={dataProfile} sidemenu={sidemenu} tok={initProps} st={st} pathArr={pathArr}>
            <div className="h-20 w-full grid grid-cols-1 md:grid-cols-3 bg-white mb-5 px-8 py-4">
                <div className=" col-span-1 md:col-span-2 flex items-center mb-2 md:mb-0">
                    <div className="font-semibold text-xl w-auto">Form Tambah Relationship - {name}</div>
                </div>
                <div className=" col-span-1 md:col-span-1 flex md:justify-end items-center">
                    <Button onClick={() => { /*rt.push(`/items/detail/${itemid}?active=relationship`)*/ console.log(newdata) }} style={{ marginRight: `1rem` }} size="middle" type="danger">
                        Batal
                    </Button>
                    <Button disabled={disabledrel} onClick={() => { setmodaladd(true) }} size="middle" type="primary">
                        Simpan
                    </Button>
                </div>
            </div>
            <div className="h-auto w-full grid grid-cols-1 md:grid-cols-5 mb-5 px-8 py-4 bg-white rounded-md">
                <div className="md:col-span-5 col-span-1 flex flex-col">
                    <div className="flex flex-col w-full mb-8">
                        <p className="mb-1 font-semibold">Relationship Type <span className="relitemtambah"></span></p>
                        <Select placeholder="Pilih Relationship Type" style={{ width: `100%` }} allowClear onChange={(value, option) => {
                            setnewdata({
                                ...newdata,
                                relationship_asset_id: typeof (value) === 'undefined' ? null : value,
                                is_inverse: typeof (option) === 'undefined' ? null : option.is_inverse
                            })
                            setreltipeitemdata(typeof (option) === 'undefined' ? -10 : option.type_id)
                            setreldetailitemdata(typeof (option) === 'undefined' ? "" : option.detail)
                            typeof (value) === 'undefined' ? setrelitemdata([]) : setrelitemdatatrigger(value)
                        }}>
                            {
                                displaydatarelations.map((docmodels, idxmodels) => {
                                    return (
                                        <Select.Option value={docmodels.id} type_id={docmodels.type_id} is_inverse={docmodels.is_inverse} detail={docmodels.detail}>{docmodels.detail}</Select.Option>
                                    )
                                })
                            }
                        </Select>
                        <style jsx>
                            {`
                                .relitemtambah::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                        </style>
                    </div>
                    <Table
                        rowSelection={{
                            onChange: (selectedRowKeys, selectedRows) => {
                                if (selectedRows.length > 0) {
                                    setdisabledrel(false)
                                }
                                else {
                                    setdisabledrel(true)
                                }
                                setselectedrelitemdata(selectedRows)
                                setnewdata({ ...newdata, connected_ids: reltipeitemdata === -1 || reltipeitemdata === -2 ? selectedRows.map(doc => doc.user_id) : selectedRows.map(doc => doc.id) })
                            },
                            checkStrictly: true
                        }}
                        defaultExpandedRowKeys={[1]}
                        pagination={{ pageSize: 9 }} rowKey={reltipeitemdata === -1 || reltipeitemdata === -2 ? "user_id" : "id"} scroll={{ x: 200 }} dataSource={relitemdata} columns={reltipeitemdata === -1 || reltipeitemdata === -2 ? columns12 : (reltipeitemdata === -3 ? columns3 : columns4)} loading={relitemloading}
                    ></Table>
                </div>
            </div>
            <Modal title={<>Apakah Anda yakin ingin menambahkan Relationship ke Item berikut ini?</>}
                visible={modaladd}
                onCancel={() => { setmodaladd(false) }}
                okText="Ya"
                cancelText="Tidak"
                onOk={handleAddRelationshipItem}
                okButtonProps={{ loading: loadingadd }}
                width={700}
            >
                <div className="flex flex-col">
                    <div className="flex flex-col border-b mb-5">
                        <div className="flex flex-col mb-3">
                            <h1 className="font-semibold mb-0">Relationship Type:</h1>
                            <p className="mb-0">{reldetailitemdata}</p>
                        </div>
                        <div className="flex flex-col mb-3">
                            <h1 className="font-semibold mb-0">Item:</h1>
                            {
                                selectedrelitemdata.map((doc, idx) => (
                                    <p className="mb-0">- {reltipeitemdata === -1 || reltipeitemdata === -2 ? doc.fullname : (reltipeitemdata === -3 ? doc.title : (reltipeitemdata === -4 ? doc.inventory_name : null))}</p>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p className="mb-0">Notes</p>
                        <Input placeholder="Masukkan Notes" onChange={(e => {
                            // setdataApiremoved({ ...dataApiremoved, notes: e.target.value })
                        })}></Input>
                    </div>
                </div>
            </Modal>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }) {
    var initProps = {};
    const itemid = params.itemId
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
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    // if (![107, 108, 109, 110, 111, 112, 132].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
    //     res.writeHead(302, { Location: '/dashboard/admin' })
    //     res.end()
    // }

    return {
        props: {
            initProps,
            dataProfile,
            sidemenu: "3",
            itemid
        },
    }
}

export default CreateRelationshipItem
