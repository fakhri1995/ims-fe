import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import httpcookie from 'cookie'
import Link from 'next/link'
import { SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, TreeSelect, Table, Input, Select, Tooltip } from 'antd'
import Layout from '../../components/layout-dashboard2'
import st from '../../components/layout-dashboard.module.css'


const ItemsIndex = ({ dataProfile, sidemenu, initProps }) => {
    // 1.Init
    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)

    //2.useState
    const [displaydata, setdisplaydata] = useState([])
    const [invrelations, setinvrelations] = useState({
        models: [],
        assets: [],
        manufacturers: [],
        status_condition: [],
        status_usage: [],
        companies: []
    })
    const [assetdata, setassetdata] = useState([])
    const [displaydata1, setdisplaydata1] = useState([])
    const [displaydata2, setdisplaydata2] = useState([])
    const [namasearchact, setnamasearchact] = useState(false)
    const [namavalue, setnamavalue] = useState("")
    const [assettypefilteract, setassettypefilteract] = useState(false)
    const [assettypevalue, setassettypevalue] = useState("")
    const [modelfilteract, setmodelfilteract] = useState(false)
    const [modelvalue, setmodelvalue] = useState("")
    const [kondisifilteract, setkondisifilteract] = useState(false)
    const [kondisivalue, setkondisivalue] = useState("")
    const [pemakaianfilteract, setpemakaianfilteract] = useState(false)
    const [pemakaianvalue, setpemakaianvalue] = useState("")
    const [namaasset, setnamaasset] = useState("")
    const [rowstate, setrowstate] = useState(0)
    const [praloading, setpraloading] = useState(true)

    //3.Define
    const columnsTable = [
        {
            title: 'Nama Item',
            dataIndex: 'inventory_name',
        },
        {
            title: 'Asset Type',
            dataIndex: 'asset_name',
            render: (text, record, index) => {
                return {
                    children:
                        <div className="flex items-center">
                            <p className="mb-0 mr-1">{record.asset_name}</p>
                            {
                                record.asset_deleted_at !== null ?
                                    <Tooltip placement="right" title="Asset Type telah dihapus, segera lakukan pengubahan Asset Type!">
                                        <ExclamationCircleOutlined style={{ color: `red` }}></ExclamationCircleOutlined>
                                    </Tooltip>
                                    :
                                    null
                            }
                        </div>
                }
            }
        },
        {
            title: 'Model',
            dataIndex: 'model_name',
            render: (text, record, index) => {
                return {
                    children:
                        <div className="flex items-center">
                            <p className="mb-0 mr-1">{record.model_name}</p>
                            {
                                record.model_deleted_at !== null ?
                                    <Tooltip placement="right" title="Model telah dihapus, segera lakukan pengubahan Model!">
                                        <ExclamationCircleOutlined style={{ color: `red` }}></ExclamationCircleOutlined>
                                    </Tooltip>
                                    :
                                    null
                            }
                        </div>
                }
            }
        },
        {
            title: 'Kondisi',
            dataIndex: 'status_condition',
            render: (text, record, index) => {
                return {
                    children:
                        <div className="w-full flex">
                            {
                                record.status_condition === 1 &&
                                <div className="p-1 flex w-full items-center">
                                    <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                                    <p className="mb-0">Good</p>
                                </div>
                            }
                            {
                                record.status_condition === 2 &&
                                <div className="p-1 flex w-full items-center">
                                    <div className="w-3 h-3 rounded-full bg-gray-500 mr-1"></div>
                                    <p className="mb-0">Grey</p>
                                </div>
                            }
                            {
                                record.status_condition === 3 &&
                                <div className="p-1 flex w-full items-center">
                                    <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                                    <p className="mb-0">Bad</p>
                                </div>
                            }
                        </div>
                }
            }
        },
        {
            title: 'Status Pemakaian',
            dataIndex: 'status_usage',
            align: 'center',
            render: (text, record, index) => {
                return {
                    children:
                        <div className="justify-center flex">
                            {
                                record.status_usage === 1 &&
                                <div className="rounded-md w-7/12 h-auto px-1 text-center py-1 bg-blue-100 border border-blue-200 text-blue-600">In Used</div>
                            }
                            {
                                record.status_usage === 2 &&
                                <div className="rounded-md w-7/12 h-auto px-1 text-center py-1 bg-green-100 border border-green-200 text-green-600">In Stock</div>
                            }
                            {
                                record.status_usage === 3 &&
                                <div className="rounded-md w-7/12 h-auto px-1 text-center py-1 bg-red-100 border border-red-200 text-red-600">Replacement</div>
                            }
                        </div>
                }
            }
        },
    ]

    //3.onChange
    //search nama
    const onChangeSearch = (e) => {
        if (e.target.value === "") {
            setdisplaydata(displaydata2)
            setnamasearchact(false)
        }
        else {
            setnamasearchact(true)
            setnamavalue(e.target.value)
        }
    }
    //search asset type
    const onChangeAssetType = (id) => {
        if (typeof (id) === 'undefined') {
            setdisplaydata(displaydata2)
            setassettypefilteract(false)
        }
        else {
            setassettypefilteract(true)
            setassettypevalue(id)
        }
    }
    //search model
    const onChangeModel = (idmodel) => {
        if (typeof (idmodel) === 'undefined') {
            setdisplaydata(displaydata2)
            setmodelfilteract(false)
        }
        else {
            setmodelfilteract(true)
            setmodelvalue(idmodel)
        }
    }
    //search kondisi
    const onChangeKondisi = (idkondisi) => {
        if (typeof (idkondisi) === 'undefined') {
            setdisplaydata(displaydata2)
            setkondisifilteract(false)
        }
        else {
            setkondisifilteract(true)
            setkondisivalue(idkondisi)
        }
    }
    //search Pemakaian
    const onChangePemakaian = (idpemakaian) => {
        if (typeof (idpemakaian) === 'undefined') {
            setdisplaydata(displaydata2)
            setpemakaianfilteract(false)
        }
        else {
            setpemakaianfilteract(true)
            setpemakaianvalue(idpemakaian)
        }
    }
    const onFinalClick = () => {
        var datatemp = displaydata1
        if (assettypefilteract) {
            datatemp = datatemp.filter(flt => {
                return (flt.asset_name.toLowerCase().includes(assettypevalue.toLowerCase())) || (flt.asset_name.replaceAll(/\s+\/\s+/g, "/").split("/")[0] === namaasset)
            })
        }
        if (modelfilteract) {
            datatemp = datatemp.filter(flt => flt.modelid === modelvalue)
        }
        if (kondisifilteract) {
            datatemp = datatemp.filter(flt => flt.status_condition === kondisivalue)
        }
        if (pemakaianfilteract) {
            datatemp = datatemp.filter(flt => flt.status_usage === pemakaianvalue)
        }
        if (namasearchact) {
            datatemp = datatemp.filter(flt => {
                return flt.model_name.toLowerCase().includes(namavalue.toLowerCase())
            })
        }
        setdisplaydata(datatemp)
    }


    //4.handler


    //5.useEffect
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getInventories`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setdisplaydata(res2.data)
                setdisplaydata1(res2.data)
                setdisplaydata2(res2.data)
            })
    }, [])
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getInventoryRelations`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setinvrelations(res2.data)
                setpraloading(false)
            })
    }, [])
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getAssets`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setassetdata(res2.data)
                setpraloading(false)
            })
    }, [])
    return (
        <Layout dataProfile={dataProfile} sidemenu={sidemenu} tok={initProps} st={st} pathArr={pathArr}>
            <div className="h-20 w-full grid grid-cols-1 md:grid-cols-3 border-gray-400 md:border-t md:border-b bg-white mb-5 p-4">
                <div className=" col-span-1 md:col-span-2 flex items-center mb-2 md:mb-0">
                    <div className="font-semibold text-base w-auto">Items</div>
                </div>
                <div className=" col-span-1 md:col-span-1 flex md:justify-end items-center">
                    <Link href={'/items/create'}>
                        <Button size="large" type="primary">
                            Tambah
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="h-auto w-full grid grid-cols-1 md:grid-cols-5 mb-5 bg-white rounded-md">
                <div className="md:col-span-5 col-span-1 flex flex-col py-3">
                    <div className="flex mb-8">
                        <div className=" w-full mr-1 grid grid-cols-12">
                            <div className="col-span-3 mr-1">
                                <Input style={{ width: `100%`, marginRight: `0.5rem` }} placeholder="Cari Nama Model" onChange={onChangeSearch} allowClear></Input>
                            </div>
                            <div className="col-span-3 mr-1">
                                <TreeSelect allowClear
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    treeData={assetdata}
                                    placeholder="Cari Asset Type"
                                    treeDefaultExpandAll
                                    style={{ width: `100%` }}
                                    onChange={(value, label, extra) => {
                                        if (typeof (value) === 'undefined') {
                                            onChangeAssetType()
                                        }
                                        else {
                                            onChangeAssetType(extra.allCheckedNodes[0].node.props.title)
                                            setnamaasset(extra.allCheckedNodes[0].node.props.title)
                                        }
                                    }}
                                />
                            </div>
                            <div className="col-span-2 mr-1">
                                <Select placeholder="Model" style={{ width: `100%` }} allowClear onChange={(value) => {
                                    if (typeof (value) === 'undefined') {
                                        onChangeModel()
                                    }
                                    else {
                                        onChangeModel(value)
                                    }
                                }}>
                                    {
                                        invrelations.models.map((docmodels, idxmodels) => {
                                            return (
                                                <Select.Option value={docmodels.id}>{docmodels.name}</Select.Option>
                                            )
                                        })
                                    }
                                </Select>
                            </div>
                            <div className="col-span-1 mr-1">
                                <Select placeholder="Kondisi" style={{ width: `100%` }} allowClear onChange={(value) => {
                                    if (typeof (value) === 'undefined') {
                                        onChangeKondisi()
                                    }
                                    else {
                                        onChangeKondisi(value)
                                    }
                                }}>
                                    {
                                        invrelations.status_condition.map((docconds, idxconds) => {
                                            return (
                                                <Select.Option value={docconds.id}>{docconds.name}</Select.Option>
                                            )
                                        })
                                    }
                                </Select>
                            </div>
                            <div className="col-span-2 mr-1">
                                <Select placeholder="Pemakaian" style={{ width: `100%` }} allowClear onChange={(value) => {
                                    if (typeof (value) === 'undefined') {
                                        onChangePemakaian()
                                    }
                                    else {
                                        onChangePemakaian(value)
                                    }
                                }}>
                                    {
                                        invrelations.status_usage.map((docusage, idxusage) => {
                                            return (
                                                <Select.Option value={docusage.id}>{docusage.name}</Select.Option>
                                            )
                                        })
                                    }
                                </Select>
                            </div>
                            <div className=" col-span-1">
                                <Button type="primary" style={{ width: `100%` }} onClick={onFinalClick}><SearchOutlined /></Button>
                            </div>
                        </div>
                    </div>
                    <Table pagination={{ pageSize: 9 }} scroll={{ x: 200 }} dataSource={displaydata} columns={columnsTable} loading={praloading}
                        onRow={(record, rowIndex) => {
                            return {
                                onMouseOver: (event) => {
                                    setrowstate(record.id)
                                },
                                onClick: (event) => {
                                    // {
                                    //     [107, 110, 111, 112, 132].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                                    rt.push(`/items/detail/${record.id}`)
                                    //         :
                                    //         null
                                    // }
                                }
                            }
                        }}
                        rowClassName={(record, idx) => {
                            return (
                                record.id === rowstate ? `cursor-pointer` : ``
                            )
                        }}
                    ></Table>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res }) {
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
            sidemenu: "3"
        },
    }
}

export default ItemsIndex
