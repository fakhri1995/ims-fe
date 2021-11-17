import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import httpcookie from 'cookie'
import Link from 'next/link'
import { SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, TreeSelect, Table, Input, Select, Tooltip, Spin } from 'antd'
import Layout from '../../components/layout-dashboard2'
import st from '../../components/layout-dashboard.module.css'


const ItemsIndex = ({ dataProfile, sidemenu, initProps }) => {
    // 1.Init
    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)
    var asset_id1 = "", model_id1 = "", status_condition1 = "", status_usage1 = "", name1 = "", migid1 = "", location_id1 = ""
    const { asset_id, model_id, status_condition, status_usage, name, mig_id, location_id, sort_by, sort_type } = rt.query
    if (asset_id) {
        asset_id1 = asset_id
    }
    if (model_id) {
        model_id1 = model_id
    }
    if (status_condition) {
        status_condition1 = status_condition
    }
    if (status_usage) {
        status_usage1 = status_usage
    }
    if (name) {
        name1 = name
    }
    if (mig_id) {
        migid1 = mig_id
    }
    if (location_id) {
        location_id1 = location_id
    }

    //2.useState
    const [displaydata, setdisplaydata] = useState([])
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
    const [namasearchact, setnamasearchact] = useState(name1 === "" ? false : true)
    const [namavalue, setnamavalue] = useState(null)
    const [migidact, setmigidact] = useState(migid1 === "" ? false : true)
    const [migidvalue, setmigidvalue] = useState(null)
    const [locationact, setlocationact] = useState(location_id1 === "" ? false : true)
    const [locationvalue, setlocationvalue] = useState(null)
    const [assettypefilteract, setassettypefilteract] = useState(asset_id1 === "" ? false : true)
    const [assettypevalue, setassettypevalue] = useState(null)
    const [modelfilteract, setmodelfilteract] = useState(model_id1 === "" ? false : true)
    const [modelvalue, setmodelvalue] = useState(model_id1 === "" ? null : Number(model_id1))
    const [kondisifilteract, setkondisifilteract] = useState(status_condition1 === "" ? false : true)
    const [kondisivalue, setkondisivalue] = useState(null)
    const [pemakaianfilteract, setpemakaianfilteract] = useState(status_usage1 === "" ? false : true)
    const [pemakaianvalue, setpemakaianvalue] = useState(null)
    const [namaasset, setnamaasset] = useState(asset_id1)
    const [defasset, setdefasset] = useState(null)
    const [rowstate, setrowstate] = useState(0)
    const [praloading, setpraloading] = useState(true)
    const [praloading2, setpraloading2] = useState(true)
    const [modelfilter, setmodelfilter] = useState([])
    const [fetchingmodel, setfetchingmodel] = useState(false)

    //3.Define
    const columnsTable = [
        {
            title: 'MIG ID',
            dataIndex: 'mig_id',
            sorter: (a, b) => a.mig_id.length - b.mig_id.length,
            defaultSortOrder: `${sort_type && sort_by === 'mig_id' ? (sort_type === "asc" ? "ascend" : "descend") : null}`,
        },
        {
            title: 'Asset Type',
            dataIndex: 'asset_name',
            render: (text, record, index) => {
                return {
                    children:
                        <div className="flex items-center">
                            <p className="mb-0 mr-1">{record.model_inventory.asset.asset_name}</p>
                            {
                                record.model_inventory.asset.deleted_at !== null ?
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
                            <p className="mb-0 mr-1">{record.model_inventory.name}</p>
                            {
                                record.model_inventory.deleted_at !== null ?
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
            title: 'Lokasi',
            dataIndex: 'location',
            render: (text, record, index) => {
                return {
                    children:
                        <div className="flex items-center">
                            <p className="mb-0 mr-1">{record.location_inventory.id === 0 ? "-" : record.location_inventory.name}</p>
                        </div>
                }
            },
        },
        {
            title: 'Kondisi',
            dataIndex: 'status_condition',
            render: (text, record, index) => {
                return {
                    children:
                        <div className="w-full flex">
                            {
                                record.status_condition.id === 1 &&
                                <div className="p-1 flex w-full items-center">
                                    <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                                    <p className="mb-0">Good</p>
                                </div>
                            }
                            {
                                record.status_condition.id === 2 &&
                                <div className="p-1 flex w-full items-center">
                                    <div className="w-3 h-3 rounded-full bg-gray-500 mr-1"></div>
                                    <p className="mb-0">Grey</p>
                                </div>
                            }
                            {
                                record.status_condition.id === 3 &&
                                <div className="p-1 flex w-full items-center">
                                    <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                                    <p className="mb-0">Bad</p>
                                </div>
                            }
                        </div>
                }
            },
            sorter: (a, b) => a.status_condition.id - b.status_condition.id,
            defaultSortOrder: `${sort_type && sort_by === 'status_condition' ? (sort_type === "asc" ? "ascend" : "descend") : null}`,
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
                                record.status_usage.id === 1 &&
                                <div className="rounded-md w-7/12 h-auto px-1 text-center py-1 bg-blue-100 border border-blue-200 text-blue-600">In Used</div>
                            }
                            {
                                record.status_usage.id === 2 &&
                                <div className="rounded-md w-7/12 h-auto px-1 text-center py-1 bg-green-100 border border-green-200 text-green-600">In Stock</div>
                            }
                            {
                                record.status_usage.id === 3 &&
                                <div className="rounded-md w-7/12 h-auto px-1 text-center py-1 bg-red-100 border border-red-200 text-red-600">Replacement</div>
                            }
                        </div>
                }
            },
            sorter: (a, b) => a.status_usage.id - b.status_usage.id,
            defaultSortOrder: `${sort_type && sort_by === 'mig_id' ? (sort_type === "asc" ? "ascend" : "descend") : null}`,
        },
    ]

    //3.onChange
    //search nama
    const onChangeSearch = (e) => {
        if (e.target.value === "") {
            // setdisplaydata(displaydata2)
            window.location.href = `items?asset_id=${assettypefilteract ? asset_id1 : ""}&model_id=${modelfilteract ? model_id1 : ""}&status_condition=${kondisifilteract ? status_condition1 : ""}&status_usage=${pemakaianfilteract ? status_usage1 : ""}&name=&mig_id=${migidact ? migid1 : ""}&location_id=${locationact ? location_id1 : ""}&sort_by=${sort_by}&sort_type=${sort_type}`
            setnamasearchact(false)
        }
        else {
            setnamasearchact(true)
            setnamavalue(e.target.value)
        }
    }
    //search mig id
    const onChangeMigid = (e) => {
        if (e.target.value === "") {
            // setdisplaydata(displaydata2)
            window.location.href = `items?asset_id=${assettypefilteract ? asset_id1 : ""}&model_id=${modelfilteract ? model_id1 : ""}&status_condition=${kondisifilteract ? status_condition1 : ""}&status_usage=${pemakaianfilteract ? status_usage1 : ""}&name=${namasearchact ? name1 : ""}&mig_id=&location_id=${locationact ? location_id1 : ""}&sort_by=${sort_by}&sort_type=${sort_type}`
            setmigidact(false)
        }
        else {
            setmigidact(true)
            setmigidvalue(e.target.value)
        }
    }
    //search location
    const onChangeLocation = (id) => {
        if (e.target.value === "") {
            // setdisplaydata(displaydata2)
            window.location.href = `items?asset_id=${assettypefilteract ? asset_id1 : ""}&model_id=${modelfilteract ? model_id1 : ""}&status_condition=${kondisifilteract ? status_condition1 : ""}&status_usage=${pemakaianfilteract ? status_usage1 : ""}&name=${namasearchact ? name1 : ""}&mig_id=${migidact ? migid1 : ""}&location_id=&sort_by=${sort_by}&sort_type=${sort_type}`
            setlocationact(false)
        }
        else {
            setlocationact(true)
            setlocationvalue(id)
        }
    }
    //search asset type
    const onChangeAssetType = (id) => {
        if (typeof (id) === 'undefined') {
            // setdisplaydata(displaydata2)
            window.location.href = `items?asset_id=&model_id=&status_condition=${kondisifilteract ? status_condition1 : ""}&status_usage=${pemakaianfilteract ? status_usage1 : ""}&name=${namasearchact ? name1 : ""}&mig_id=${migidact ? migid1 : ""}&mig_id=${migidact ? migid1 : ""}&location_id=${locationact ? location_id1 : ""}&sort_by=${sort_by}&sort_type=${sort_type}`
            setassettypefilteract(false)
        }
        else {
            fetch(`https://boiling-thicket-46501.herokuapp.com/getModels?rows=100&asset_id=${id}`, {
                method: `GET`,
                headers: {
                    'Authorization': JSON.parse(initProps),
                }
            })
                .then(res => res.json())
                .then(res2 => {
                    res2.data.length === 0 ? setmodelfilter([]) : setmodelfilter(res2.data.data)
                })
            setassettypefilteract(true)
            setassettypevalue(id)
        }
    }
    //search model
    const onChangeModel = (idmodel) => {
        if (typeof (idmodel) === 'undefined') {
            // setdisplaydata(displaydata2)
            window.location.href = `items?asset_id=${assettypefilteract ? asset_id1 : ""}&model_id=&status_condition=${kondisifilteract ? status_condition1 : ""}&status_usage=${pemakaianfilteract ? status_usage1 : ""}&name=${namasearchact ? name1 : ""}&mig_id=${migidact ? migid1 : ""}&location_id=${locationact ? location_id1 : ""}&sort_by=${sort_by}&sort_type=${sort_type}`
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
            // setdisplaydata(displaydata2)
            window.location.href = `items?asset_id=${assettypefilteract ? asset_id1 : ""}&model_id=${modelfilteract ? model_id1 : ""}&status_condition=&status_usage=${pemakaianfilteract ? status_usage1 : ""}&name=${namasearchact ? name1 : ""}&mig_id=${migidact ? migid1 : ""}&location_id=${locationact ? location_id1 : ""}&sort_by=${sort_by}&sort_type=${sort_type}`
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
            // setdisplaydata(displaydata2)
            window.location.href = `items?asset_id=${assettypefilteract ? asset_id1 : ""}&model_id=${modelfilteract ? model_id1 : ""}&status_condition=${kondisifilteract ? status_condition1 : ""}&status_usage=&name=${namasearchact ? name1 : ""}&mig_id=${migidact ? migid1 : ""}&sort_by=${sort_by}&sort_type=${sort_type}`
            setpemakaianfilteract(false)
        }
        else {
            setpemakaianfilteract(true)
            setpemakaianvalue(idpemakaian)
        }
    }
    const onFinalClick = () => {
        // var datatemp = displaydata1
        // if (assettypefilteract) {
        //     datatemp = datatemp.filter(flt => {
        //         return flt.asset_name.toLowerCase() === assettypevalue.toLowerCase()
        //     })
        // }
        // if (modelfilteract) {
        //     datatemp = datatemp.filter(flt => flt.model_id === modelvalue)
        // }
        // if (kondisifilteract) {
        //     datatemp = datatemp.filter(flt => flt.status_condition.id === kondisivalue)
        // }
        // if (pemakaianfilteract) {
        //     datatemp = datatemp.filter(flt => flt.status_usage.id === pemakaianvalue)
        // }
        // if (namasearchact) {
        //     datatemp = datatemp.filter(flt => {
        //         return flt.inventory_name.toLowerCase().includes(namavalue.toLowerCase())
        //     })
        // }
        // setdisplaydata(datatemp)
        window.location.href = `/items?asset_id=${assettypefilteract ? (assettypevalue === null ? asset_id1 : assettypevalue) : ""}&model_id=${modelfilteract ? (modelvalue === null ? model_id1 : modelvalue) : ""}&status_condition=${kondisifilteract ? (kondisivalue === "" ? status_condition1 : kondisivalue) : ""}&status_usage=${pemakaianfilteract ? (pemakaianvalue === "" ? status_usage1 : pemakaianvalue) : ""}&name=${namasearchact ? (namavalue === "" ? name1 : namavalue) : ""}&mig_id=${migidact ? (migidvalue === "" ? migid1 : migidvalue) : ""}&location_id=${locationact ? (locationvalue === "" ? location_id1 : locationvalue) : ""}&sort_by=${sort_by}&sort_type=${sort_type}`
        // setpraloading(true)
        // fetch(`https://boiling-thicket-46501.herokuapp.com/getInventories?rows=100&asset_id=${assettypefilteract ? assettypevalue : ""}&model_id=${modelfilteract ? modelvalue : ""}&status_condition=${kondisifilteract ? kondisivalue : ""}&status_usage=${pemakaianfilteract ? pemakaianvalue : ""}&name=${namasearchact ? namavalue : ""}`, {
        //     method: `GET`,
        //     headers: {
        //         'Authorization': JSON.parse(initProps),
        //     },
        // })
        //     .then(res => res.json())
        //     .then(res2 => {
        //         setdisplaydata(res2.data.data)
        //         setpraloading(false)
        //     })
    }


    //4.handler


    //5.useEffect
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getInventories?asset_id=${asset_id1}&model_id=${model_id1}&status_condition=${status_condition1}&status_usage=${status_usage1}&name=${name1}&mig_id=${migid1}&location_id=${location_id1}&sort_by=${sort_by}&sort_type=${sort_type}`, {
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
                // setmodelfilter(res2.data.models)
                setpraloading(false)
            })
    }, [])
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getModels?rows=50&asset_id=${asset_id1 === "" ? "" : asset_id1}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            }
        })
            .then(res => res.json())
            .then(res2 => {
                res2.data.length === 0 ? setmodelfilter([]) : setmodelfilter(res2.data.data)
                setpraloading2(false)
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
                // setpraloading(false)
            })
    }, [])
    return (
        <Layout dataProfile={dataProfile} sidemenu={sidemenu} tok={initProps} st={st} pathArr={pathArr}>
            <div className="h-20 w-full grid grid-cols-1 md:grid-cols-3 border-gray-400 md:border-t md:border-b bg-white mb-5 p-4">
                <div className=" col-span-1 md:col-span-2 flex items-center mb-2 md:mb-0">
                    <div className="font-bold text-2xl w-auto">Items</div>
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
                    {
                        praloading ?
                            null
                            :
                            <div className="flex mb-8">
                                <div className=" w-full mr-1 grid grid-cols-12">
                                    <div className="col-span-2 mr-1">
                                        <Input style={{ width: `100%`, marginRight: `0.5rem` }} defaultValue={migid1} placeholder="Cari MIG ID" onChange={onChangeMigid} allowClear></Input>
                                    </div>
                                    <div className="col-span-2 mr-1">
                                        <TreeSelect allowClear
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            defaultValue={asset_id1 === "" ? null : defasset}
                                            treeData={assetdata}
                                            placeholder="Cari Asset Type"
                                            treeDefaultExpandAll
                                            style={{ width: `100%` }}
                                            onChange={(value, label, extra) => {
                                                if (typeof (value) === 'undefined') {
                                                    onChangeAssetType()
                                                }
                                                else {
                                                    onChangeAssetType(extra.allCheckedNodes[0].node.props.id)
                                                    setnamaasset(extra.allCheckedNodes[0].node.props.title)
                                                    // setmodelfilter(prev => {
                                                    //     return invrelations.models.filter(docfil => docfil.asset_id === extra.allCheckedNodes[0].node.props.id)
                                                    // })
                                                    modelvalue !== null ? setmodelvalue(null) : null
                                                }
                                            }}
                                        />
                                    </div>
                                    {
                                        praloading2 ?
                                            <>
                                                <Spin />
                                            </>
                                            :
                                            <div className="col-span-2 mr-1 flex flex-col">
                                                <Select showSearch optionFilterProp="children" notFoundContent={fetchingmodel ? <Spin size="small" /> : null} onSearch={(value) => {
                                                    setfetchingmodel(true)
                                                    fetch(`https://boiling-thicket-46501.herokuapp.com/getFilterModels?name=${value !== "" ? value : ""}`, {
                                                        method: `GET`,
                                                        headers: {
                                                            'Authorization': JSON.parse(initProps),
                                                        },
                                                    })
                                                        .then(res => res.json())
                                                        .then(res2 => {
                                                            setmodelfilter(res2.data)
                                                            setfetchingmodel(false)
                                                        })
                                                }} filterOption={(input, opt) => (
                                                    opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                )} disabled={modelfilter.length === 0} placeholder="Cari Model" style={{ width: `100%` }} defaultValue={model_id1 === "" || asset_id1 === "" ? null : Number(model_id1)} allowClear onChange={(value) => {
                                                    if (typeof (value) === 'undefined') {
                                                        onChangeModel()
                                                    }
                                                    else {
                                                        onChangeModel(value)
                                                    }
                                                }}>
                                                    {
                                                        modelfilter.map((docmodels, idxmodels) => {
                                                            return (
                                                                <Select.Option value={docmodels.id}>{docmodels.name}</Select.Option>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                                {modelfilter.length === 0 && <p className="mb-0 text-red-500 text-sm">Model kosong</p>}
                                            </div>
                                    }
                                    <div className="col-span-2 mr-1">
                                        <TreeSelect allowClear
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            defaultValue={location_id1 === "" ? null : Number(location_id1)}
                                            treeData={[invrelations.tree_companies]}
                                            placeholder="Cari Lokasi"
                                            treeDefaultExpandAll
                                            style={{ width: `100%` }}
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
                                    <div className="col-span-1 mr-1">
                                        <Select placeholder="Kondisi" style={{ width: `100%` }} defaultValue={status_condition1 === "" ? null : Number(status_condition1)} allowClear onChange={(value) => {
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
                                        <Select placeholder="Pemakaian" style={{ width: `100%` }} defaultValue={status_usage1 === "" ? null : Number(status_usage1)} allowClear onChange={(value) => {
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
                    }
                    <Table pagination={{
                        pageSize: 10, total: displayentiredata.data.total, onChange: (page, pageSize) => {
                            setpraloading(true)
                            fetch(`https://boiling-thicket-46501.herokuapp.com/getInventories?page=${page}&rows=10&asset_id=${asset_id1}&model_id=${model_id1}&status_condition=${status_condition1}&status_usage=${status_usage1}&name=${name1}&mig_id=${migid1}&location_id=${location_id1}&sort_by=${sort_by}&sort_type=${sort_type}`, {
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
                        onChange={(pagination, filters, sorter, extra) => {
                            // console.log('params', pagination, filters, sorter, extra);
                            if (extra.action === "sort") {
                                if (sorter.column) {
                                    if (sorter.column.dataIndex === "mig_id") {
                                        window.location.href = `/items?asset_id=${assettypefilteract ? (assettypevalue === null ? asset_id1 : assettypevalue) : ""}&model_id=${modelfilteract ? (modelvalue === null ? model_id1 : modelvalue) : ""}&status_condition=${kondisifilteract ? (kondisivalue === "" ? status_condition1 : kondisivalue) : ""}&status_usage=${pemakaianfilteract ? (pemakaianvalue === "" ? status_usage1 : pemakaianvalue) : ""}&name=${namasearchact ? (namavalue === "" ? name1 : namavalue) : ""}&mig_id=${migidact ? (migidvalue === "" ? migid1 : migidvalue) : ""}&location_id=${locationact ? (locationvalue === "" ? location_id1 : locationvalue) : ""}&sort_by=mig_id&sort_type=${sorter.order === "ascend" ? "asc" : "desc"}`
                                    }
                                    else if (sorter.column.dataIndex === "status_usage") {
                                        window.location.href = `/items?asset_id=${assettypefilteract ? (assettypevalue === null ? asset_id1 : assettypevalue) : ""}&model_id=${modelfilteract ? (modelvalue === null ? model_id1 : modelvalue) : ""}&status_condition=${kondisifilteract ? (kondisivalue === "" ? status_condition1 : kondisivalue) : ""}&status_usage=${pemakaianfilteract ? (pemakaianvalue === "" ? status_usage1 : pemakaianvalue) : ""}&name=${namasearchact ? (namavalue === "" ? name1 : namavalue) : ""}&mig_id=${migidact ? (migidvalue === "" ? migid1 : migidvalue) : ""}&location_id=${locationact ? (locationvalue === "" ? location_id1 : locationvalue) : ""}&sort_by=status_usage&sort_type=${sorter.order === "ascend" ? "asc" : "desc"}`
                                    }
                                    else if (sorter.column.dataIndex === "status_condition") {
                                        window.location.href = `/items?asset_id=${assettypefilteract ? (assettypevalue === null ? asset_id1 : assettypevalue) : ""}&model_id=${modelfilteract ? (modelvalue === null ? model_id1 : modelvalue) : ""}&status_condition=${kondisifilteract ? (kondisivalue === "" ? status_condition1 : kondisivalue) : ""}&status_usage=${pemakaianfilteract ? (pemakaianvalue === "" ? status_usage1 : pemakaianvalue) : ""}&name=${namasearchact ? (namavalue === "" ? name1 : namavalue) : ""}&mig_id=${migidact ? (migidvalue === "" ? migid1 : migidvalue) : ""}&location_id=${locationact ? (locationvalue === "" ? location_id1 : locationvalue) : ""}&sort_by=status_condition&sort_type=${sorter.order === "ascend" ? "asc" : "desc"}`
                                    }
                                    else if (sorter.column.dataIndex === "name") {
                                        window.location.href = `/items?asset_id=${assettypefilteract ? (assettypevalue === null ? asset_id1 : assettypevalue) : ""}&model_id=${modelfilteract ? (modelvalue === null ? model_id1 : modelvalue) : ""}&status_condition=${kondisifilteract ? (kondisivalue === "" ? status_condition1 : kondisivalue) : ""}&status_usage=${pemakaianfilteract ? (pemakaianvalue === "" ? status_usage1 : pemakaianvalue) : ""}&name=${namasearchact ? (namavalue === "" ? name1 : namavalue) : ""}&mig_id=${migidact ? (migidvalue === "" ? migid1 : migidvalue) : ""}&location_id=${locationact ? (locationvalue === "" ? location_id1 : locationvalue) : ""}&sort_by=name&sort_type=${sorter.order === "ascend" ? "asc" : "desc"}`
                                    }
                                }
                                else {
                                    window.location.href = `/items?asset_id=${assettypefilteract ? (assettypevalue === null ? asset_id1 : assettypevalue) : ""}&model_id=${modelfilteract ? (modelvalue === null ? model_id1 : modelvalue) : ""}&status_condition=${kondisifilteract ? (kondisivalue === "" ? status_condition1 : kondisivalue) : ""}&status_usage=${pemakaianfilteract ? (pemakaianvalue === "" ? status_usage1 : pemakaianvalue) : ""}&name=${namasearchact ? (namavalue === "" ? name1 : namavalue) : ""}&mig_id=${migidact ? (migidvalue === "" ? migid1 : migidvalue) : ""}&location_id=${locationact ? (locationvalue === "" ? location_id1 : locationvalue) : ""}&sort_by=&sort_type=`
                                }
                            }
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
