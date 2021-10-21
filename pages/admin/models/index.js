import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import httpcookie from 'cookie'
import Link from 'next/link'
import { SearchOutlined } from '@ant-design/icons'
import { Button, TreeSelect, Table, Input } from 'antd'
import Layout from '../../../components/layout-dashboard'
import st from '../../../components/layout-dashboard.module.css'

const ModelsIndex = ({ initProps, dataProfile, sidemenu }) => {
    // 1.Init
    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)

    //2.useState
    const [displaydata, setdisplaydata] = useState([])
    const [assetdata, setassetdata] = useState([])
    const [displaydata1, setdisplaydata1] = useState([])
    const [displaydata2, setdisplaydata2] = useState([])
    const [namasearchact, setnamasearchact] = useState(false)
    const [namavalue, setnamavalue] = useState("")
    const [assettypefilteract, setassettypefilteract] = useState(false)
    const [assettypevalue, setassettypevalue] = useState("")
    const [namaasset, setnamaasset] = useState("")
    const [rowstate, setrowstate] = useState(0)
    const [praloading, setpraloading] = useState(true)

    //3.Define
    const columnsTable = [
        {
            title: 'Nama',
            dataIndex: 'name',
        },
        {
            title: 'Asset Type',
            dataIndex: 'asset_name',
        },
        {
            title: 'Jumlah Item',
            dataIndex: 'count',
        },
    ]

    //3.onChange
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
    const onFinalClick = () => {
        var datatemp = displaydata1
        if (assettypefilteract) {
            datatemp = datatemp.filter(flt => {
                return (flt.asset_id === Number(assettypevalue)) || (flt.asset_name.replaceAll(/\s+\/\s+/g, "/").split("/")[0] === namaasset)
            })
        }
        if (namasearchact) {
            datatemp = datatemp.filter(flt => {
                return flt.name.toLowerCase().includes(namavalue.toLowerCase())
            })
        }
        setdisplaydata(datatemp)
    }


    //4.handler


    //5.useEffect
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getModels`, {
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
        <Layout tok={initProps} dataProfile={dataProfile} sidemenu={sidemenu} st={st} pathArr={pathArr}>
            <div className="h-20 w-full grid grid-cols-1 md:grid-cols-3 border-gray-400 md:border-t md:border-b bg-white mb-5 p-4">
                <div className=" col-span-1 md:col-span-2 flex items-center mb-2 md:mb-0">
                    <div className="font-semibold text-base w-auto">Models</div>
                </div>
                <div className=" col-span-1 md:col-span-1 flex md:justify-end items-center">
                    <Link href={'/admin/models/create'}>
                        <Button size="large" type="primary">
                            Tambah
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="h-auto w-full grid grid-cols-1 md:grid-cols-5 mb-5 bg-white rounded-md">
                <div className="md:col-span-5 col-span-1 flex flex-col py-3">
                    <div className="flex mb-8">
                        <div className=" w-10/12 mr-1 grid grid-cols-6">
                            <div className="col-span-4 mr-1">
                                <Input style={{ width: `100%`, marginRight: `0.5rem` }} placeholder="Cari Nama Model" onChange={onChangeSearch} allowClear></Input>
                            </div>
                            <div className="col-span-2 mr-1">
                                <TreeSelect allowClear
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    treeData={assetdata}
                                    placeholder="Cari Asset Type"
                                    treeDefaultExpandAll
                                    style={{ width: `100%`, marginRight: `0.5rem` }}
                                    onChange={(value, label, extra) => {
                                        if (typeof (value) === 'undefined') {
                                            onChangeAssetType()
                                        }
                                        else {
                                            onChangeAssetType(extra.allCheckedNodes[0].node.props.id)
                                            setnamaasset(extra.allCheckedNodes[0].node.props.title)
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="w-2/12">
                            <Button type="primary" style={{ width: `100%` }} onClick={onFinalClick}><SearchOutlined /></Button>
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
                                    rt.push(`/admin/models/detail/${record.id}`)
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
            sidemenu: "452"
        },
    }
}

export default ModelsIndex
