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
    var asset_id1 = "", name1 = ""
    const { asset_id, name } = rt.query
    if (asset_id) {
        asset_id1 = asset_id
    }
    if (name) {
        name1 = name
    }

    //2.useState
    const [displayentiredata, setdisplayentiredata] = useState({
        success: false,
        message: "",
        data: {
            current_page: 0,
            data: [],
            first_page_url: "",
            from: 0,
            last_page: 0,
            last_page_url: "",
            next_page_url: null,
            path: "",
            per_page: "",
            prev_page_url: "",
            to: 0,
            total: 0
        },
    })
    const [displaydata, setdisplaydata] = useState([])
    const [assetdata, setassetdata] = useState([])
    const [displaydata1, setdisplaydata1] = useState([])
    const [displaydata2, setdisplaydata2] = useState([])
    const [namasearchact, setnamasearchact] = useState(name1 === "" ? false : true)
    const [namavalue, setnamavalue] = useState(null)
    const [assettypefilteract, setassettypefilteract] = useState(asset_id1 === "" ? false : true)
    const [assettypevalue, setassettypevalue] = useState(null)
    const [namaasset, setnamaasset] = useState(asset_id1)
    const [defasset, setdefasset] = useState(null)
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
            // setdisplaydata(displaydata2)
            window.location.href = `/admin/models?asset_id=${assettypefilteract ? asset_id1 : ""}&name=`
            setnamasearchact(false)
        }
        else {
            setnamasearchact(true)
            setnamavalue(e.target.value)
        }
    }
    const onChangeAssetType = (id) => {
        if (typeof (id) === 'undefined') {
            // setdisplaydata(displaydata2)
            window.location.href = `/admin/models?asset_id=&name=${namasearchact ? name1 : ""}`
            setassettypefilteract(false)
        }
        else {
            setassettypefilteract(true)
            setassettypevalue(id)
        }
    }
    const onFinalClick = () => {
        // var datatemp = displaydata1
        // if (assettypefilteract) {
        //     datatemp = datatemp.filter(flt => {
        //         return (flt.asset_id === Number(assettypevalue)) || (flt.asset_name.replaceAll(/\s+\/\s+/g, "/").split("/")[0] === namaasset)
        //     })
        // }
        // if (namasearchact) {
        //     datatemp = datatemp.filter(flt => {
        //         return flt.name.toLowerCase().includes(namavalue.toLowerCase())
        //     })
        // }
        // setdisplaydata(datatemp)
        window.location.href = `/admin/models?asset_id=${assettypefilteract ? (assettypevalue === null ? asset_id1 : assettypevalue) : ""}&name=${namasearchact ? (namavalue === null ? name1 : namavalue) : ""}`
    }


    //4.handler


    //5.useEffect
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getModels?asset_id=${asset_id1}&name=${name1}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setdisplayentiredata(res2)
                setdisplaydata(res2.data.data)
                setdisplaydata1(res2.data.data)
                setdisplaydata2(res2.data.data)
                console.log(assettypefilteract,namasearchact)
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
                var selectedAsset = {}
                const recursiveSearchAsset = (doc, key) => {
                    for (var i = 0; i < doc.length; i++) {
                        if (doc[i].id === key) {
                            selectedAsset = doc[i]
                        }
                        else {
                            if (doc[i].children) {
                                recursiveSearchAsset(doc[i].children, key)
                            }
                        }
                    }
                }
                recursiveSearchAsset(res2.data, Number(namaasset))
                setdefasset(selectedAsset.key)
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
                    {
                        praloading ?
                            null
                            :
                            <div className="flex mb-8">
                                <div className=" w-10/12 mr-1 grid grid-cols-6">
                                    <div className="col-span-4 mr-1">
                                        <Input style={{ width: `100%`, marginRight: `0.5rem` }} defaultValue={name1} placeholder="Cari Nama Model" onChange={onChangeSearch} allowClear></Input>
                                    </div>
                                    <div className="col-span-2 mr-1">
                                        <TreeSelect allowClear
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            defaultValue={namaasset === "" ? null : defasset}
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
                    }
                    <Table pagination={{
                        pageSize: 10, total: displayentiredata.data.total, onChange: (page, pageSize) => {
                            setpraloading(true)
                            fetch(`https://boiling-thicket-46501.herokuapp.com/getModels?page=${page}&rows=10&asset_id=${asset_id1}&name=${name1}`, {
                                method: `GET`,
                                headers: {
                                    'Authorization': JSON.parse(initProps),
                                },
                            })
                                .then(res => res.json())
                                .then(res2 => {
                                    setdisplayentiredata(res2)
                                    setdisplaydata(res2.data.data)
                                    setdisplaydata1(res2.data.data)
                                    setdisplaydata2(res2.data.data)
                                    setpraloading(false)
                                })
                        }
                    }} scroll={{ x: 200 }} dataSource={displaydata} columns={columnsTable} loading={praloading}
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
            sidemenu: "82"
        },
    }
}

export default ModelsIndex
