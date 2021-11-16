import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import httpcookie from 'cookie'
import Link from 'next/link'
import { ExclamationCircleOutlined, SearchOutlined, CloseCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { notification, Button, Spin, Timeline, Empty, Modal, Tooltip, Select, Tabs, Input, TreeSelect, Table, Popover } from 'antd'
import Layout from '../../../components/layout-dashboard2'
import moment from 'moment'
import st from '../../../components/layout-dashboard.module.css'
import Sticky from 'wil-react-sticky'

const Overview = ({ itemid, initProps, maindata, manuf, vendor, praloading }) => {
    const rt = useRouter()
    //useState
    const [invrelations2, setinvrelations2] = useState({})

    //helper

    return (
        <div className="flex flex-col">
            <div className="border-b flex justify-between p-5 mb-8">
                <h1 className="font-bold text-xl my-auto">Overview</h1>
                {
                    praloading ?
                        null
                        :
                        <Button type="primary" size="large" onClick={() => { rt.push(`/items/update/${itemid}`) }}>Ubah</Button>
                }
            </div>
            {
                praloading ?
                    <Spin />
                    :
                    <div className="mb-8 mx-5 p-5 w-9/12 border shadow-md rounded-md flex flex-col">
                        <div className="flex flex-col mb-5">
                            <h1 className=" text-sm font-semibold mb-0">Model:</h1>
                            {
                                // invrelations.models.filter(docfil => docfil.id === maindata.model_id)[0].deleted_at !== null
                                maindata.model_inventory.deleted_at !== null
                                    ?
                                    <div className="flex items-center">
                                        <p className="mb-0 mr-1">{maindata.model_inventory.name}</p>
                                        <Tooltip placement="right" title="Model telah dihapus, segera lakukan pengubahan Model!">
                                            <ExclamationCircleOutlined style={{ color: `brown` }}></ExclamationCircleOutlined>
                                        </Tooltip>
                                    </div>
                                    :
                                    <p className="mb-0 text-sm">{maindata.model_inventory.name}</p>
                            }
                        </div>
                        <div className="flex flex-col mb-5">
                            <h1 className=" text-sm font-semibold mb-0">Asset Type:</h1>
                            {
                                maindata.model_inventory.asset.deleted_at !== null
                                    ?
                                    <div className="flex items-center">
                                        <p className="mb-0 mr-1">{maindata.model_inventory.asset.name}</p>
                                        <Tooltip placement="right" title="Asset Type telah dihapus, segera lakukan pengubahan Asset Type!">
                                            <ExclamationCircleOutlined style={{ color: `brown` }}></ExclamationCircleOutlined>
                                        </Tooltip>
                                    </div>
                                    :
                                    <p className="mb-0 text-sm">{maindata.model_inventory.asset.name}</p>
                            }
                        </div>
                        <div className="flex flex-col mb-5">
                            <h1 className=" text-sm font-semibold mb-0">MIG ID:</h1>
                            <p className="mb-0 text-sm">{maindata.mig_id}</p>
                        </div>
                        <div className="flex flex-col mb-5">
                            <h1 className=" text-sm font-semibold mb-0">Serial Number:</h1>
                            <p className="mb-0 text-sm">{maindata.serial_number === "" || maindata.serial_number === null ? "-" : maindata.serial_number}</p>
                        </div>
                        <div className="flex flex-col mb-5">
                            <h1 className=" text-sm font-semibold mb-0">Manufacturer:</h1>
                            {
                                // invrelations.manufacturers.filter(docfil => docfil.id === maindata.manufacturer_id)[0].deleted_at !== null
                                manuf.isnull === false
                                    ?
                                    <div className="flex items-center">
                                        <p className="mb-0 mr-1">{manuf.name}</p>
                                        <Tooltip placement="right" title="Manufacturer telah dihapus, segera lakukan pengubahan Manufacturer!">
                                            <ExclamationCircleOutlined style={{ color: `brown` }}></ExclamationCircleOutlined>
                                        </Tooltip>
                                    </div>
                                    :
                                    <p className="mb-0 text-sm">{manuf.name}</p>
                            }
                        </div>
                        <div className="flex flex-col mb-5">
                            <h1 className=" text-sm font-semibold mb-0">Vendor:</h1>
                            <p className="mb-0 text-sm">{maindata.vendor_id === null ? "-" : vendor}</p>
                        </div>
                        <div className="flex flex-col mb-5">
                            <h1 className=" text-sm font-semibold mb-0">Location:</h1>
                            <p className="mb-0 text-sm">{maindata.location === null ? "-" : maindata.location_inventory.name}</p>
                        </div>
                        <div className="flex flex-col mb-5">
                            <h1 className=" text-sm font-semibold mb-0">Deskripsi:</h1>
                            <p className="mb-0 text-sm">{maindata.deskripsi === "" || maindata.deskripsi === null ? "-" : maindata.deskripsi}</p>
                        </div>
                        <hr />
                        {
                            maindata.additional_attributes.map((doccolumns, idxcolumns) => {
                                return (
                                    <div key={idxcolumns} className={`flex flex-col mb-5 ${idxcolumns === 0 ? `mt-5` : ``}`}>
                                        <h1 className=" text-sm font-semibold mb-0">{doccolumns.name}:</h1>
                                        <p className="mb-0 text-sm">
                                            {
                                                doccolumns.data_type === 'dropdown' || doccolumns.data_type === 'checkbox' || doccolumns.data_type === 'date' ?
                                                    <>
                                                        {
                                                            doccolumns.data_type === 'dropdown' &&
                                                            <>
                                                                {doccolumns.value.opsi[doccolumns.value.default]}
                                                            </>
                                                        }
                                                        {
                                                            doccolumns.data_type === 'checkbox' &&
                                                            <>
                                                                {doccolumns.value.opsi.filter((_, idxfil) => {
                                                                    return doccolumns.value.default.includes(idxfil)
                                                                }).join(", ")}
                                                            </>
                                                        }
                                                        {
                                                            doccolumns.data_type === 'date' &&
                                                            <>
                                                                {moment(doccolumns.value).locale('id').format('LL')}
                                                            </>
                                                        }
                                                    </>
                                                    :
                                                    <>
                                                        {doccolumns.value}
                                                    </>
                                            }
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>
            }
        </div>
    )
}
const KonfigurasiPart = ({ initProps, itemid, invrelations, maindata, praloading2, models, setmodels }) => {
    const rt = useRouter()

    //usestate
    const [mainpartdata, setmainpartdata] = useState([])
    const [assetdata, setassetdata] = useState([])
    const [praloadingpart, setpraloadingpart] = useState(true)
    const [events, setevents] = useState("")
    const [datatable, setdatatable] = useState([])
    const [datatable2, setdatatable2] = useState([])
    const [datatable3, setdatatable3] = useState([])
    const [namasearchact, setnamasearchact] = useState(false)
    const [namavalue, setnamavalue] = useState("")
    const [assettypefilteract, setassettypefilteract] = useState(false)
    const [assettypevalue, setassettypevalue] = useState("")
    const [modelfilteract, setmodelfilteract] = useState(false)
    const [modelvalue, setmodelvalue] = useState("")
    const [datatrigger, setdatatrigger] = useState(0)
    //changed dan removed
    const [datareplacements, setdatareplacements] = useState([])
    const [popover, setpopover] = useState(false)
    //changed
    const [datachanged, setdatachanged] = useState({
        id: null,
        model_id: null,
        inventory_name: "",
        mig_id: "",
        status_condition: {
            id: null,
            name: ""
        },
        status_usage: {
            id: null,
            name: ""
        },
        deleted_at: null,
        model_inventory: {
            id: null,
            name: "",
            asset_id: null,
            deleted_at: null,
            asset: {
                id: null,
                name: "",
                deleted_at: ""
            }
        },
    })
    const [dataApichanged, setdataApichanged] = useState({
        id: 0,
        replacement_id: 0,
        notes: ""
    })
    const [modalchanged, setmodalchanged] = useState(false)
    const [disabledchanged, setdisabledchanged] = useState(true)
    const [loadingchanged, setloadingchanged] = useState(false)
    const [triggerchanged, settriggerchanged] = useState(-1)
    //removed
    const [dataremoved, setdataremoved] = useState(-1)
    const [dataApiremoved, setdataApiremoved] = useState({
        id: 0,
        inventory_part_id: 0,
        notes: ""
    })
    const [modalremoved, setmodalremoved] = useState(false)
    const [disabledremoved, setdisabledremoved] = useState(true)
    const [loadingremoved, setloadingremoved] = useState(false)
    const [fetchingmodel, setfetchingmodel] = useState(false)
    const [backupmodels, setbackupmodels] = useState(models)

    const columns = [
        {
            title: 'Nama Item',
            dataIndex: 'inventory_name',
            key: 'inventory_name',
        },
        {
            title: 'MIG ID',
            dataIndex: 'mig_id',
            key: 'mig_id',
        },
        {
            title: 'Model',
            dataIndex: 'model_name',
            key: 'model_name',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {record.model_inventory.name}
                        </>
                }
            }
        },
        {
            title: 'Asset Type',
            dataIndex: 'asset_name',
            key: 'asset_name',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {record.model_inventory.asset.name}
                        </>
                }
            }
        },
        {
            title: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
            dataIndex: 'actionss',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {
                                events === record.id ?
                                    <Popover visible={popover} onVisibleChange={() => { setpopover(true) }} style={{ padding: `0px`, margin: `0px` }} placement="bottomLeft" trigger="click" content={
                                        <div className="flex flex-col">
                                            <div className="flex justify-center cursor-pointer" onClick={() => setpopover(false)}>
                                                <CloseCircleOutlined style={{ color: `red`, fontSize: `1.1rem` }} />
                                            </div>
                                            <Button type="text" style={{ width: `100%` }} onClick={() => { setdataremoved(record); setdataApiremoved({ ...dataApiremoved, id: mainpartdata.id, inventory_part_id: record.id, }); setmodalremoved(true); setpopover(false) }}>Keluarkan Part</Button>
                                            <Button type="text" style={{ width: `100%` }} onClick={() => { setdatachanged(record); setmodalchanged(true); setpopover(false); settriggerchanged(prev => prev + 1) }}>Gantikan Part</Button>
                                            {/* <div className="cursor-pointer hover:bg-gray-300 w-full p-4">Keluarkan Part</div>
                                            <div className="cursor-pointer hover:bg-gray-300 w-full p-4">Gantikan Part</div> */}
                                        </div>
                                    }>
                                        <div className="cursor-pointer" onClick={() => setpopover(false)}>
                                            <CloseCircleOutlined style={{ color: `red`, fontSize: `1.5rem` }} />
                                        </div>
                                    </Popover>
                                    :
                                    null
                            }
                        </>
                }
            }
        }
    ];

    //helper
    //1 nya lagi ada di useEffect
    const recursiveFlattenArr = (dataassets) => {
        const result = []
        dataassets.forEach((item, idx) => {
            result.push(item.id)
            if (item.children) {
                result.push(...recursiveFlattenArr(item.children))
            }
        })
        return result
    }
    function recursiveModifData(dataa) {
        for (var i = 0; i < dataa.length; i++) {
            dataa[i]['key'] = dataa[i].id
            dataa[i]['value'] = dataa[i].id
            dataa[i]['title'] = dataa[i].inventory_name
            dataa[i]['children'] = dataa[i].inventory_replacement_parts
            delete dataa[i].inventory_replacement_parts
            if (dataa[i].children.length > 0) {
                recursiveModifData(dataa[i].children)
            }
        }
        return dataa
    }

    //handler
    const assetPart = []
    const recursiveSearchPartFromAsset = (doc, assetid) => {
        var arr = []
        for (var i = 0; i < doc.length; i++) {
            if (doc[i].model_inventory.asset.id === Number(assetid)) {
                // continue
                assetPart.push(doc[i])
            }
            else {
                if (doc[i].children) {
                    arr.push({
                        ...doc[i],
                        children: recursiveSearchPartFromAsset(doc[i].children, assetid)
                    })
                }
                else {
                    arr.push({
                        ...doc[i]
                    })
                }
            }
        }
        return arr
    }
    const modelPart = []
    const recursiveSearchPartFromModel = (doc, modelid) => {
        var arr = []
        for (var i = 0; i < doc.length; i++) {
            if (doc[i].model_id === modelid) {
                // continue
                modelPart.push(doc[i])
            }
            else {
                if (doc[i].children) {
                    arr.push({
                        ...doc[i],
                        children: recursiveSearchPartFromModel(doc[i].children, modelid)
                    })
                }
                else {
                    arr.push({
                        ...doc[i]
                    })
                }
            }
        }
        return arr
    }
    const namePart = []
    const recursiveSearchPartFromName = (doc, name) => {
        var arr = []
        for (var i = 0; i < doc.length; i++) {
            if (doc[i].inventory_name.toLowerCase().includes(name.toLowerCase())) {
                // continue
                namePart.push(doc[i])
            }
            else {
                if (doc[i].children) {
                    arr.push({
                        ...doc[i],
                        children: recursiveSearchPartFromName(doc[i].children, name)
                    })
                }
                else {
                    arr.push({
                        ...doc[i]
                    })
                }
            }
        }
        return arr
    }
    //deliver API
    const handleReplacementItemPart = () => {
        setloadingchanged(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/replaceInventoryPart`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataApichanged)
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingchanged(false)
                if (res2.success) {
                    notification['success']({
                        message: "Item Part berhasil diganti",
                        duration: 3
                    })
                    setmodalchanged(false)
                    setdatatrigger(prev => prev + 1)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }
    const handleRemoveItemPart = () => {
        setloadingremoved(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/removeInventoryPart`, {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataApiremoved)
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingremoved(false)
                if (res2.success) {
                    notification['success']({
                        message: "Item Part berhasil dikeluarkan",
                        duration: 3
                    })
                    setmodalremoved(false)
                    setdatatrigger(prev => prev + 1)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }

    //search nama
    const onChangeSearch = (e) => {
        if (e.target.value === "") {
            setdatatable(datatable3)
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
            setdatatable(datatable3)
            setassettypefilteract(false)
            setmodels(backupmodels)
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
                    res2.data.length === 0 ? setmodels([]) : setmodels(res2.data.data)
                })
            setassettypefilteract(true)
            setassettypevalue(id)
        }
    }
    //search model
    const onChangeModel = (idmodel) => {
        if (typeof (idmodel) === 'undefined') {
            setdatatable(datatable3)
            setmodelfilteract(false)
        }
        else {
            setmodelfilteract(true)
            setmodelvalue(idmodel)
        }
    }
    //finalClick
    const onFinalClick = () => {
        var datatemp = datatable2
        if (assettypefilteract) {
            // const t = recursiveSearchPartFromAsset(datatemp, assettypevalue)
            recursiveSearchPartFromAsset(datatemp, assettypevalue)
            datatemp = assetPart
        }
        if (modelfilteract) {
            // const t = recursiveSearchPartFromModel(datatemp, modelvalue)
            recursiveSearchPartFromModel(datatemp, modelvalue)
            datatemp = modelPart
        }
        if (namasearchact) {
            // const t = recursiveSearchPartFromName(datatemp, namavalue)
            recursiveSearchPartFromName(datatemp, namavalue)
            datatemp = namePart
        }
        setdatatable(datatemp)
    }

    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getInventory?id=${itemid}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                return res2.data
            })
            .then(res3 => {
                const recursiveChangetoChildren = (rsc) => {
                    var res = []
                    for (var i = 0; i < rsc.length; i++) {
                        rsc[i].key = rsc[i].id
                        rsc[i].title = rsc[i].inventory_name
                        rsc[i].children = rsc[i].inventory_parts
                        delete rsc[i].inventory_parts
                        if (rsc[i].children.length !== 0) {
                            res.push({
                                ...rsc[i],
                                children: recursiveChangetoChildren(rsc[i].children)
                            })
                        }
                        else {
                            delete rsc[i].children
                            res.push({
                                ...rsc[i],
                            })
                        }
                    }
                    return res
                }
                const t = recursiveChangetoChildren(res3.inventory_parts)
                setmainpartdata({
                    ...res3,
                    inventory_parts: t
                })
                setdatatable(t)
                setdatatable2(t)
                setdatatable3(t)
                setpraloadingpart(false)
            })
    }, [datatrigger])
    useEffect(() => {
        if (triggerchanged !== -1) {
            fetch(`https://boiling-thicket-46501.herokuapp.com/getInventoryReplacements?id=${datachanged.model_inventory.asset_id}`, {
                method: `GET`,
                headers: {
                    'Authorization': JSON.parse(initProps),
                }
            })
                .then(res => res.json())
                .then(res2 => {
                    const mapdata = recursiveModifData(res2.data)
                    setdatareplacements(mapdata)
                    if (mapdata.length === 0) {
                        setdisabledchanged(false)
                    }
                })
        }
    }, [triggerchanged])
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
            })
    }, [])

    return (
        <div className="flex flex-col">
            <div className="border-b flex justify-between p-5 mb-8">
                <h1 className="font-bold text-xl my-auto">Konfigurasi Part</h1>
                {
                    praloading2 ?
                        null
                        :
                        <Button type="primary" size="large" onClick={() => { /*console.log(mainpartdata); console.log(dataremoved)*/ rt.push(`/items/createpart/${itemid}?nama=${mainpartdata.inventory_name}`) }}>Tambah</Button>
                }
            </div>
            <div className="flex mb-5">
                {
                    praloading2 ?
                        null
                        :
                        <div className=" w-full mr-1 grid grid-cols-12">
                            <div className="col-span-5 mr-1">
                                <Input style={{ width: `100%`, marginRight: `0.5rem` }} placeholder="Cari Nama Item" onChange={e => onChangeSearch(e)} allowClear></Input>
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
                                            onChangeAssetType(extra.allCheckedNodes[0].node.props.id)
                                        }
                                    }}
                                />
                            </div>
                            <div className="col-span-3 mr-1">
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
                                            setmodels(res2.data)
                                            setfetchingmodel(false)
                                        })
                                }} filterOption={(input, opt) => (
                                    opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                )} placeholder="Cari Model" style={{ width: `100%` }} allowClear onChange={(value) => {
                                    if (typeof (value) === 'undefined') {
                                        onChangeModel()
                                    }
                                    else {
                                        onChangeModel(value)
                                    }
                                }}>
                                    {
                                        models.map((docmodels, idxmodels) => {
                                            return (
                                                <Select.Option value={docmodels.id}>{docmodels.name}</Select.Option>
                                            )
                                        })
                                    }
                                </Select>
                            </div>
                            <div className=" col-span-1">
                                <Button type="primary" style={{ width: `100%` }} onClick={onFinalClick}><SearchOutlined /></Button>
                            </div>
                        </div>
                }
            </div>
            <Table loading={praloadingpart} pagination={{ pageSize: 9 }} scroll={{ x: 200 }} dataSource={datatable} columns={columns}
                onRow={(record, rowIndex) => {
                    return {
                        onMouseOver: (event) => {
                            setevents(record.id)
                        },
                        onMouseLeave: (event) => {
                            setevents(0)
                        }
                    }
                }}
            ></Table>
            <Modal title={
                <div className="flex justify-between p-5 mt-5">
                    <h1 className="font-bold text-xl">Form Pergantian Part "{datachanged.inventory_name}"</h1>
                    <div className="flex">
                        <>
                            <Button type="default" onClick={() => { setmodalchanged(false); setdataApichanged({ ...dataApichanged, replacement_id: null, notes: "" }) }} style={{ marginRight: `1rem` }}>Batal</Button>
                            <Button type='primary' disabled={disabledchanged} onClick={handleReplacementItemPart} loading={loadingchanged}>Simpan</Button>
                        </>
                    </div>
                </div>
            }
                visible={modalchanged}
                onCancel={() => { setmodalchanged(false) }}
                footer={null}
                width={760}
            >
                <div className="flex flex-col mb-3">
                    <div className="flex flex-col mb-3">
                        <p className="mb-0">Nama Item Part yang Ingin Diganti <span className="namapart"></span></p>
                        <TreeSelect disabled treeData={datatable3} value={datachanged.key}></TreeSelect>
                        <style jsx>
                            {`
                                .namapart::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                        </style>
                    </div>
                    <div className="flex flex-col mb-3">
                        <p className="mb-0">Asset Type dari Item Part yang ingin diganti <span className="namapart"></span></p>
                        <div className="w-full rounded-sm flex items-center bg-gray-100 border p-2 h-8">{datachanged.model_inventory.asset.name}</div>
                        <style jsx>
                            {`
                                .namapart::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                        </style>
                    </div>
                    <div className="flex flex-col mb-3">
                        <p className="mb-0">Nama Item Part Pengganti <span className="namapart"></span></p>
                        <TreeSelect
                            onChange={(value) => {
                                setdisabledchanged(false)
                                setdataApichanged({
                                    ...dataApichanged,
                                    id: datachanged.id,
                                    replacement_id: value,
                                })
                            }}
                            treeData={datareplacements}
                        >
                            {/* {
                                datareplacements.map((doc, idx) => {
                                    return (
                                        <Select.Option value={doc.id}>{doc.inventory_name}</Select.Option>
                                    )
                                })
                            } */}
                        </TreeSelect>
                        <style jsx>
                            {`
                                .namapart::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                        </style>
                    </div>
                    <div className="flex flex-col mb-3">
                        <p className="mb-0">Notes</p>
                        <Input.TextArea rows={3} placeholder="Masukkan Notes" value={dataApichanged.notes} onChange={(e => {
                            setdataApichanged({
                                ...dataApichanged,
                                notes: e.target.value
                            })
                        })}></Input.TextArea>
                    </div>
                </div>
            </Modal>
            <Modal title={<h1 className="font-semibold">Apakah anda yakin ingin mengeluarkan item "{dataremoved.inventory_name}" dari "{mainpartdata.inventory_name}"?</h1>}
                visible={modalremoved}
                onCancel={() => { setmodalremoved(false) }}
                okText="Ya"
                cancelText="Tidak"
                onOk={handleRemoveItemPart}
                okButtonProps={{ loading: loadingremoved }}
                width={760}
            >
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <p className="mb-0">Notes</p>
                        <Input placeholder="Masukkan Notes" onChange={(e => {
                            setdataApiremoved({ ...dataApiremoved, notes: e.target.value })
                        })}></Input>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
const Relationship = ({ initProps, maindata, itemid }) => {
    //init
    const rt = useRouter()
    //usestate
    const [events, setevents] = useState("")
    const [datatable, setdatatable] = useState([])
    const [datatable2, setdatatable2] = useState([])
    const [datatable3, setdatatable3] = useState([])
    const [namasearchact, setnamasearchact] = useState(false)
    const [namavalue, setnamavalue] = useState("")
    const [datatrigger, setdatatrigger] = useState(0)
    const [loadingrel, setloadingrel] = useState(false)
    const [praloadingrel, setpraloadingrel] = useState(false)
    const [dataasset, setdataasset] = useState({})
    //delete
    const [dataApidelete, setdataApidelete] = useState({
        id: "",
    })
    const [modaldelete, setmodaldelete] = useState(false)
    const [loadingdelete, setloadingdelete] = useState(false)
    const [relationdatadelete, setrelationdatadelete] = useState({
        name: "",
        tipe: "",
        koneksi: ""
    })

    //declaration
    //Declaration
    const columns = [
        {
            title: 'Relationship Type',
            dataIndex: 'relationship_name',
            key: 'relationship_name',
        },
        {
            title: 'Nama Item',
            dataIndex: 'connected_detail_name',
            key: 'connected_detail_name',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
            dataIndex: 'actionss',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {
                                events === record.id ?
                                    <>
                                        <DeleteOutlined onClick={() => { setdataApidelete({ id: record.id }); setrelationdatadelete({ name: record.relationship_name, tipe: record.type, koneksi: record.connected_detail_name }); setmodaldelete(true); }} style={{ fontSize: `1.2rem`, color: `red`, cursor: `pointer` }} />
                                    </>
                                    :
                                    null
                            }
                        </>
                }
            }
        }
    ]

    //handler
    //search nama
    const onChangeSearch = (e) => {
        if (e.target.value === "") {
            setdatatable(datatable3)
            setnamasearchact(false)
        }
        else {
            setnamasearchact(true)
            setnamavalue(e.target.value)
        }
    }
    //finalClick
    const onFinalClick = () => {
        var datatemp = datatable2
        if (namasearchact) {
            datatemp = datatemp.filter(flt => {
                return flt.connected_detail_name.toLowerCase().includes(namavalue.toLowerCase())
            })
        }
        setdatatable(datatemp)
    }

    //handler
    const handleDeleteRelationshipItem = () => {
        setloadingdelete(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteRelationshipInventory`, {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataApidelete)
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingdelete(false)
                setmodaldelete(false)
                if (res2.success) {
                    notification['success']({
                        message: "Relationship berhasil dihapus",
                        duration: 3
                    })
                    setdatatrigger(prev => prev + 1)
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
        if (datatrigger !== -1) {
            setpraloadingrel(true)
            fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationshipInventory?id=${itemid}&type_id=-4`, {
                method: `GET`,
                headers: {
                    'Authorization': JSON.parse(initProps),
                }
            })
                .then(res => res.json())
                .then(res2 => {
                    setdatatable(res2.data.from_inverse.concat(res2.data.not_from_inverse))
                    setdatatable2(res2.data.from_inverse.concat(res2.data.not_from_inverse))
                    setdatatable3(res2.data.from_inverse.concat(res2.data.not_from_inverse))
                    setpraloadingrel(false)
                })
        }
    }, [datatrigger])

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
                recursiveSearchAsset(res2.data, maindata.model_inventory.asset_id)
                setdataasset(selectedAsset)
            })
    }, [])

    return (
        <div className="flex flex-col">
            <div className="border-b flex justify-between p-5 mb-8">
                <div className="flex items-center">
                    <h1 className="font-bold text-xl my-auto mr-1">Relationship</h1>
                    {
                        maindata.model_inventory.asset.deleted_at !== null ?
                            <Tooltip placement="right" title="Asset Type telah dihapus, segera lakukan pengubahan Asset Type!">
                                <ExclamationCircleOutlined style={{ color: `brown` }}></ExclamationCircleOutlined>
                            </Tooltip>
                            :
                            null
                    }
                </div>
                <Button type="primary" size="large" onClick={() => { /*console.log(dataasset);*/ rt.push(`/items/createrelationship/${itemid}?nama=${maindata.inventory_name}&asset_id=${maindata.model_inventory.asset.id}`) }}>Tambah</Button>
            </div>
            <div className="flex mb-5">
                {
                    praloadingrel ?
                        null
                        :
                        <div className=" w-full mr-1 grid grid-cols-12">
                            <div className="col-span-11 mr-1">
                                <Input style={{ width: `100%`, marginRight: `0.5rem` }} placeholder="Cari Nama Item" onChange={e => onChangeSearch(e)} allowClear></Input>
                            </div>
                            <div className=" col-span-1">
                                <Button type="primary" style={{ width: `100%` }} onClick={onFinalClick}><SearchOutlined /></Button>
                            </div>
                        </div>
                }
            </div>
            <Table loading={praloadingrel} pagination={{ pageSize: 9 }} scroll={{ x: 200 }} dataSource={datatable} columns={columns}
                onRow={(record, rowIndex) => {
                    return {
                        onMouseOver: (event) => {
                            setevents(record.id)
                        },
                        onMouseLeave: (event) => {
                            setevents(0)
                        }
                    }
                }}
            ></Table>
            <Modal title={<>Apakah Anda yakin ingin menghapus Relationship berikut ini dari "{maindata.inventory_name}"?</>}
                visible={modaldelete}
                onCancel={() => { setmodaldelete(false) }}
                okText="Ya"
                cancelText="Tidak"
                onOk={handleDeleteRelationshipItem}
                okButtonProps={{ loading: loadingdelete }}
                width={700}
            >
                <div className="flex flex-col">
                    <div className="flex flex-col border-b mb-5">
                        <div className="flex flex-col mb-3">
                            <h1 className="font-semibold mb-0">Relationship Type:</h1>
                            <p className="mb-0">{relationdatadelete.name}</p>
                        </div>
                        <div className="flex flex-col mb-3">
                            <h1 className="font-semibold mb-0">Tipe:</h1>
                            <p className="mb-0">{relationdatadelete.tipe}</p>
                        </div>
                        <div className="flex flex-col mb-3">
                            <h1 className="font-semibold mb-0">Item:</h1>
                            <p className="mb-0">{relationdatadelete.koneksi}</p>
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
        </div>
    )
}
const Association = ({ initProps, itemid, maindata, praloading }) => {
    const rt = useRouter()
    return (
        <div className="flex flex-col">
            <div className="border-b flex justify-between p-5 mb-8">
                <h1 className="font-bold text-xl my-auto">Association</h1>
            </div>
            <div className="flex flex-col px-5">
                {
                    praloading ?
                        <>
                            <Spin />
                        </>
                        :
                        maindata.associations.length === 0 ?
                            <>
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            </>
                            :
                            <>
                                {
                                    maindata.associations.map((doc, idx) => {
                                        return (
                                            <div className="rounded-md shadow-md py-4 px-5 border mb-4 flex justify-between w-10/12 cursor-pointer" onClick={() => { rt.push(`/tickets/detail/${doc.ticket.id}`) }}>
                                                <div className="flex flex-col">
                                                    <p className="mb-0 font-semibold">Ticket Number</p>
                                                    <p className="mb-0">#{doc.ticket.type.code} - {doc.id}</p>
                                                </div>
                                                {
                                                    doc.ticket.status.id === 1 &&
                                                    <div className="rounded-md flex items-center px-2 text-center bg-blue-100 border border-blue-200 text-blue-600">Status: {doc.ticket.status.name}</div>
                                                }
                                                {
                                                    doc.ticket.status.id === 2 &&
                                                    <div className="rounded-md flex items-center px-2 text-center bg-green-100 border border-green-200 text-green-600">Status: {doc.ticket.status.name}</div>
                                                }
                                                {
                                                    doc.ticket.status.id === 3 &&
                                                    <div className="rounded-md flex items-center px-2 text-center bg-yellow-100 border border-yellow-200 text-yellow-600">Status: {doc.ticket.status.name}</div>
                                                }
                                                {
                                                    doc.ticket.status.id === 4 &&
                                                    <div className="rounded-md flex items-center px-2 text-center bg-red-100 border border-red-200 text-red-600">Status: {doc.ticket.status.name}</div>
                                                }
                                                {
                                                    doc.ticket.status.id === 5 &&
                                                    <div className="rounded-md flex items-center px-2 text-center bg-gray-100 border border-gray-200 text-gray-600">{doc.ticket.status.name}</div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </>
                }
            </div>
        </div >
    )
}
const Acitivty = ({ itemid, initProps, maindata, invrelations, praloading, activitytrigger }) => {
    const [daylogs, setdaylogs] = useState([])
    const [weeklogs, setweeklogs] = useState([])
    const [morelogs, setmorelogs] = useState([])
    const [praloadinglogs, setpraloadinglogs] = useState(true)
    const [inventories, setinventories] = useState([])

    useEffect(() => {
        setpraloadinglogs(true)

        fetch(`https://boiling-thicket-46501.herokuapp.com/getActivityInventoryLogs?id=${itemid}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            }
        })
            .then(res => res.json())
            .then(res2 => {
                var daylogsmap = res2.data.day_logs.map((doclogs, idxlogs) => {
                    const datenew = moment(doclogs.date).locale("id").format('LLL')
                    var descnew = ''
                    const desckondisiOld = doclogs.properties ? (doclogs.properties.old ? (doclogs.properties.old.status_condition === 1 ? 'Good' : (doclogs.properties.old.status_condition === 2 ? 'Grey' : (doclogs.properties.old.status_condition === 3 ? 'Bad' : null))) : null) : null
                    const desckondisiBaru = doclogs.properties ? (doclogs.properties.attributes ? (doclogs.properties.attributes.status_condition === 1 ? 'Good' : (doclogs.properties.attributes.status_condition === 2 ? 'Grey' : (doclogs.properties.attributes.status_condition === 3 ? 'Bad' : null))) : null) : null
                    const descusageOld = doclogs.properties ? (doclogs.properties.old ? (doclogs.properties.old.status_usage === 1 ? 'In Used' : (doclogs.properties.old.status_usage === 2 ? 'In Stock' : (doclogs.properties.old.status_usage === 3 ? 'Replacement' : null))) : null) : null
                    const descusageBaru = doclogs.properties ? (doclogs.properties.attributes ? (doclogs.properties.attributes.status_usage === 1 ? 'In Used' : (doclogs.properties.attributes.status_usage === 2 ? 'In Stock' : (doclogs.properties.attributes.status_usage === 3 ? 'Replacement' : null))) : null) : null
                    const desc1 = doclogs.description.split(" ")
                    if (desc1[0] === 'Created') {

                        if (desc1[2] === "Relationship") {
                            desc1[0] === 'Created' ? descnew = descnew + `Penambahan Relationship "${doclogs.properties.attributes.relationship}"` : null
                            desc1[0] === 'Deleted' ? descnew = descnew + `Penghapusan Relationship "${doclogs.properties.old.relationship}"` : null
                        }
                        else if (desc1[1] === 'Association') {
                            descnew = descnew + `Association Baru: ${doclogs.properties}`
                        }
                        else if (doclogs.properties.attributes?.list_parts) {
                            descnew = descnew + `Inisialisasi Pembuatan Item Part "${maindata.inventory_parts.filter(docfil => doclogs.properties.attributes?.list_parts.includes(docfil.id)).map(docmap => docmap.inventory_name).join(", ")}"`
                        }
                        else {
                            descnew = descnew + `Pembuatan Item Baru bernama "${doclogs.properties.attributes?.inventory_name}"`
                        }
                    }
                    desc1[0] === 'Notes' ? descnew = descnew + `Penambahan Notes` : null
                    if (desc1[0] === 'Updated') {
                        if (doclogs.properties.attributes.status_condition) {
                            descnew = descnew + `Pengubahan status kondisi dari ${desckondisiOld} ke ${desckondisiBaru}`
                        }
                        else if (doclogs.properties.attributes.status_usage) {
                            descnew = descnew + `Pengubahan status pemakaian dari ${descusageOld} ke ${descusageBaru}`
                        }
                        else if (doclogs.properties.attributes.inventory_name) {
                            descnew = descnew + `Pengubahan Nama Item dari "${doclogs.properties.old.inventory_name}" ke "${doclogs.properties.attributes.inventory_name}"`
                        }
                        else if (doclogs.properties.attributes.serial_number) {
                            descnew = descnew + `Pengubahan Serial Number Item dari "${doclogs.properties.old.serial_number}" ke "${doclogs.properties.attributes.serial_number}"`
                        }
                        else if (doclogs.properties.attributes.location) {
                            descnew = descnew + `Pengubahan Location Item dari "${invrelations.companies.filter(doc => doc.id === doclogs.properties.old.location)[0].name}" ke "${invrelations.companies.filter(doc => doc.id === doclogs.properties.attributes.location)[0].name}"`
                        }
                        else if (doclogs.properties.attributes.vendor_id) {
                            descnew = descnew + `Pengubahan Vendor Item dari "${invrelations.vendors.filter(doc => doc.id === doclogs.properties.old.vendor_id)[0].name}" ke "${invrelations.vendors.filter(doc => doc.id === doclogs.properties.attributes.vendor_id)[0].name}"`
                        }
                        else if (doclogs.properties.attributes.manufacturer_id) {
                            descnew = descnew + `Pengubahan Manufacturer Item dari "${invrelations.manufacturers.filter(doc => doc.id === doclogs.properties.old.manufacturer_id)[0].name}" ke "${invrelations.manufacturers.filter(doc => doc.id === doclogs.properties.attributes.manufacturer_id)[0].name}"`
                        }
                        else if (doclogs.properties.attributes.deskripsi) {
                            descnew = descnew + `Pengubahan Deskripsi Item`
                        }
                        else if (doclogs.properties.attributes?.list_parts) {
                            if (doclogs.notes.split(" ")[1] === "Added") {
                                const listpartsnew = doclogs.properties.attributes.list_parts.filter(docfil => doclogs.properties.old.list_parts.includes(docfil) === false)
                                descnew = descnew + `Penambahan Item "${maindata.inventory_parts.filter(docfil => listpartsnew.includes(docfil.id)).map(docmap => docmap.inventory_name).join(", ")}" menjadi Item Part`
                            }
                            if (doclogs.notes.split(" ")[1] === "Removed") {
                                const listpartsnew = doclogs.properties.old.list_parts.filter(docfil => doclogs.properties.attributes.list_parts.includes(docfil) === false)
                                descnew = descnew + `Pengeluaran Item Part "${maindata.inventory_parts.filter(docfil => listpartsnew.includes(docfil.id))[0].inventory_name}"`
                            }
                            if (doclogs.notes.split(" ")[1] === "Replaced") {
                                const listpartsold = doclogs.properties.old.list_parts.filter(docfil => doclogs.properties.attributes.list_parts.includes(docfil) === false)
                                const listpartsnew = doclogs.properties.attributes.list_parts.filter(docfil => doclogs.properties.old.list_parts.includes(docfil) === false)
                                descnew = descnew + `Pergantian Item Part "${maindata.inventory_parts.filter(docfil => listpartsold.includes(docfil.id))[0].inventory_name}" menjadi Item Part "${maindata.inventory_parts.filter(docfil => listpartsnew.includes(docfil.id))[0].inventory_name}"`
                            }
                        }
                        else {
                            var prpts = []
                            for (var prop in doclogs.properties.old) {
                                prpts.push(prop)
                            }
                            descnew = descnew + `Pengubahan "${prpts.join(", ")}" Item`
                        }
                    }
                    if (desc1[0] === "Deleted") {
                        if (desc1[2] === "Relationship") {
                            desc1[0] === 'Created' ? descnew = descnew + `Penambahan Relationship "${doclogs.properties.attributes.relationship}"` : null
                            desc1[0] === 'Deleted' ? descnew = descnew + `Penghapusan Relationship "${doclogs.properties.old.relationship}"` : null
                        }
                        else if (desc1[1] === 'Association') {
                            descnew = descnew + `Association Dihapus: ${doclogs.properties}`
                        }
                    }
                    return {
                        ...doclogs,
                        date: datenew,
                        description: descnew,
                    }
                })
                var weeklogsmap = res2.data.week_logs.map((doclogs, idxlogs) => {
                    const datenew = moment(doclogs.date).locale("id").format('LLL')
                    var descnew = ''
                    const desckondisiOld = doclogs.properties ? (doclogs.properties.old ? (doclogs.properties.old.status_condition === 1 ? 'Good' : (doclogs.properties.old.status_condition === 2 ? 'Grey' : (doclogs.properties.old.status_condition === 3 ? 'Bad' : null))) : null) : null
                    const desckondisiBaru = doclogs.properties ? (doclogs.properties.attributes ? (doclogs.properties.attributes.status_condition === 1 ? 'Good' : (doclogs.properties.attributes.status_condition === 2 ? 'Grey' : (doclogs.properties.attributes.status_condition === 3 ? 'Bad' : null))) : null) : null
                    const descusageOld = doclogs.properties ? (doclogs.properties.old ? (doclogs.properties.old.status_usage === 1 ? 'In Used' : (doclogs.properties.old.status_usage === 2 ? 'In Stock' : (doclogs.properties.old.status_usage === 3 ? 'Replacement' : null))) : null) : null
                    const descusageBaru = doclogs.properties ? (doclogs.properties.attributes ? (doclogs.properties.attributes.status_usage === 1 ? 'In Used' : (doclogs.properties.attributes.status_usage === 2 ? 'In Stock' : (doclogs.properties.attributes.status_usage === 3 ? 'Replacement' : null))) : null) : null
                    const desc1 = doclogs.description.split(" ")
                    if (desc1[0] === 'Created') {

                        if (desc1[2] === "Relationship") {
                            desc1[0] === 'Created' ? descnew = descnew + `Penambahan Relationship "${doclogs.properties.attributes.relationship}"` : null
                            desc1[0] === 'Deleted' ? descnew = descnew + `Penghapusan Relationship "${doclogs.properties.old.relationship}"` : null
                        }
                        else if (desc1[1] === 'Association') {
                            descnew = descnew + `Association Baru: ${doclogs.properties}`
                        }
                        else if (doclogs.properties.attributes?.list_parts) {
                            descnew = descnew + `Inisialisasi Pembuatan Item Part "${maindata.inventory_parts.filter(docfil => doclogs.properties.attributes?.list_parts.includes(docfil.id)).map(docmap => docmap.inventory_name).join(", ")}"`
                        }
                        else {
                            descnew = descnew + `Pembuatan Item Baru bernama "${doclogs.properties.attributes?.inventory_name}"`
                        }
                    }
                    desc1[0] === 'Notes' ? descnew = descnew + `Penambahan Notes` : null
                    if (desc1[0] === 'Updated') {
                        if (doclogs.properties.attributes.status_condition) {
                            descnew = descnew + `Pengubahan status kondisi dari ${desckondisiOld} ke ${desckondisiBaru}`
                        }
                        else if (doclogs.properties.attributes.status_usage) {
                            descnew = descnew + `Pengubahan status pemakaian dari ${descusageOld} ke ${descusageBaru}`
                        }
                        else if (doclogs.properties.attributes.inventory_name) {
                            descnew = descnew + `Pengubahan Nama Item dari "${doclogs.properties.old.inventory_name}" ke "${doclogs.properties.attributes.inventory_name}"`
                        }
                        else if (doclogs.properties.attributes.serial_number) {
                            descnew = descnew + `Pengubahan Serial Number Item dari "${doclogs.properties.old.serial_number}" ke "${doclogs.properties.attributes.serial_number}"`
                        }
                        else if (doclogs.properties.attributes.location) {
                            descnew = descnew + `Pengubahan Location Item dari "${invrelations.companies.filter(doc => doc.id === doclogs.properties.old.location)[0].name}" ke "${invrelations.companies.filter(doc => doc.id === doclogs.properties.attributes.location)[0].name}"`
                        }
                        else if (doclogs.properties.attributes.vendor_id) {
                            descnew = descnew + `Pengubahan Vendor Item dari "${invrelations.vendors.filter(doc => doc.id === doclogs.properties.old.vendor_id)[0].name}" ke "${invrelations.vendors.filter(doc => doc.id === doclogs.properties.attributes.vendor_id)[0].name}"`
                        }
                        else if (doclogs.properties.attributes.manufacturer_id) {
                            descnew = descnew + `Pengubahan Manufacturer Item dari "${invrelations.manufacturers.filter(doc => doc.id === doclogs.properties.old.manufacturer_id)[0].name}" ke "${invrelations.manufacturers.filter(doc => doc.id === doclogs.properties.attributes.manufacturer_id)[0].name}"`
                        }
                        else if (doclogs.properties.attributes.deskripsi) {
                            descnew = descnew + `Pengubahan Deskripsi Item`
                        }
                        else if (doclogs.properties.attributes?.list_parts) {
                            if (doclogs.notes.split(" ")[1] === "Added") {
                                const listpartsnew = doclogs.properties.attributes.list_parts.filter(docfil => doclogs.properties.old.list_parts.includes(docfil) === false)
                                descnew = descnew + `Penambahan Item "${maindata.inventory_parts.filter(docfil => listpartsnew.includes(docfil.id)).map(docmap => docmap.inventory_name).join(", ")}" menjadi Item Part`
                            }
                            if (doclogs.notes.split(" ")[1] === "Removed") {
                                const listpartsnew = doclogs.properties.old.list_parts.filter(docfil => doclogs.properties.attributes.list_parts.includes(docfil) === false)
                                descnew = descnew + `Pengeluaran Item Part "${maindata.inventory_parts.filter(docfil => listpartsnew.includes(docfil.id))[0].inventory_name}"`
                            }
                            if (doclogs.notes.split(" ")[1] === "Replaced") {
                                const listpartsold = doclogs.properties.old.list_parts.filter(docfil => doclogs.properties.attributes.list_parts.includes(docfil) === false)
                                const listpartsnew = doclogs.properties.attributes.list_parts.filter(docfil => doclogs.properties.old.list_parts.includes(docfil) === false)
                                descnew = descnew + `Pergantian Item Part "${maindata.inventory_parts.filter(docfil => listpartsold.includes(docfil.id))[0].inventory_name}" menjadi Item Part "${maindata.inventory_parts.filter(docfil => listpartsnew.includes(docfil.id))[0].inventory_name}"`
                            }
                        }
                        else {
                            var prpts = []
                            for (var prop in doclogs.properties.old) {
                                prpts.push(prop)
                            }
                            descnew = descnew + `Pengubahan "${prpts.join(", ")}" Item`
                        }
                    }
                    if (desc1[0] === "Deleted") {
                        if (desc1[2] === "Relationship") {
                            desc1[0] === 'Created' ? descnew = descnew + `Penambahan Relationship "${doclogs.properties.attributes.relationship}"` : null
                            desc1[0] === 'Deleted' ? descnew = descnew + `Penghapusan Relationship "${doclogs.properties.old.relationship}"` : null
                        }
                    }
                    return {
                        ...doclogs,
                        date: datenew,
                        description: descnew,
                    }
                })
                var morelogsmap = res2.data.else_logs.map((doclogs, idxlogs) => {
                    const datenew = moment(doclogs.date).locale("id").format('LLL')
                    var descnew = ''
                    const desckondisiOld = doclogs.properties ? (doclogs.properties.old ? (doclogs.properties.old.status_condition === 1 ? 'Good' : (doclogs.properties.old.status_condition === 2 ? 'Grey' : (doclogs.properties.old.status_condition === 3 ? 'Bad' : null))) : null) : null
                    const desckondisiBaru = doclogs.properties ? (doclogs.properties.attributes ? (doclogs.properties.attributes.status_condition === 1 ? 'Good' : (doclogs.properties.attributes.status_condition === 2 ? 'Grey' : (doclogs.properties.attributes.status_condition === 3 ? 'Bad' : null))) : null) : null
                    const descusageOld = doclogs.properties ? (doclogs.properties.old ? (doclogs.properties.old.status_usage === 1 ? 'In Used' : (doclogs.properties.old.status_usage === 2 ? 'In Stock' : (doclogs.properties.old.status_usage === 3 ? 'Replacement' : null))) : null) : null
                    const descusageBaru = doclogs.properties ? (doclogs.properties.attributes ? (doclogs.properties.attributes.status_usage === 1 ? 'In Used' : (doclogs.properties.attributes.status_usage === 2 ? 'In Stock' : (doclogs.properties.attributes.status_usage === 3 ? 'Replacement' : null))) : null) : null
                    const desc1 = doclogs.description.split(" ")
                    if (desc1[0] === 'Created') {

                        if (desc1[2] === "Relationship") {
                            desc1[0] === 'Created' ? descnew = descnew + `Penambahan Relationship "${doclogs.properties.attributes.relationship}"` : null
                            desc1[0] === 'Deleted' ? descnew = descnew + `Penghapusan Relationship "${doclogs.properties.old.relationship}"` : null
                        }
                        else if (desc1[1] === 'Association') {
                            descnew = descnew + `Association Baru: ${doclogs.properties}`
                        }
                        else if (doclogs.properties.attributes?.list_parts) {
                            descnew = descnew + `Inisialisasi Pembuatan Item Part "${maindata.inventory_parts.filter(docfil => doclogs.properties.attributes?.list_parts.includes(docfil.id)).map(docmap => docmap.inventory_name).join(", ")}"`
                        }
                        else {
                            descnew = descnew + `Pembuatan Item Baru bernama "${doclogs.properties.attributes?.inventory_name}"`
                        }
                    }
                    desc1[0] === 'Notes' ? descnew = descnew + `Penambahan Notes` : null
                    if (desc1[0] === 'Updated') {
                        if (doclogs.properties.attributes.status_condition) {
                            descnew = descnew + `Pengubahan status kondisi dari ${desckondisiOld} ke ${desckondisiBaru}`
                        }
                        else if (doclogs.properties.attributes.status_usage) {
                            descnew = descnew + `Pengubahan status pemakaian dari ${descusageOld} ke ${descusageBaru}`
                        }
                        else if (doclogs.properties.attributes.inventory_name) {
                            descnew = descnew + `Pengubahan Nama Item dari "${doclogs.properties.old.inventory_name}" ke "${doclogs.properties.attributes.inventory_name}"`
                        }
                        else if (doclogs.properties.attributes.serial_number) {
                            descnew = descnew + `Pengubahan Serial Number Item dari "${doclogs.properties.old.serial_number}" ke "${doclogs.properties.attributes.serial_number}"`
                        }
                        else if (doclogs.properties.attributes.location) {
                            descnew = descnew + `Pengubahan Location Item dari "${invrelations.companies.filter(doc => doc.id === doclogs.properties.old.location)[0].name}" ke "${invrelations.companies.filter(doc => doc.id === doclogs.properties.attributes.location)[0].name}"`
                        }
                        else if (doclogs.properties.attributes.vendor_id) {
                            descnew = descnew + `Pengubahan Vendor Item dari "${invrelations.vendors.filter(doc => doc.id === doclogs.properties.old.vendor_id)[0].name}" ke "${invrelations.vendors.filter(doc => doc.id === doclogs.properties.attributes.vendor_id)[0].name}"`
                        }
                        else if (doclogs.properties.attributes.manufacturer_id) {
                            descnew = descnew + `Pengubahan Manufacturer Item dari "${invrelations.manufacturers.filter(doc => doc.id === doclogs.properties.old.manufacturer_id)[0].name}" ke "${invrelations.manufacturers.filter(doc => doc.id === doclogs.properties.attributes.manufacturer_id)[0].name}"`
                        }
                        else if (doclogs.properties.attributes.deskripsi) {
                            descnew = descnew + `Pengubahan Deskripsi Item`
                        }
                        else if (doclogs.properties.attributes?.list_parts) {
                            if (doclogs.notes.split(" ")[1] === "Added") {
                                const listpartsnew = doclogs.properties.attributes.list_parts.filter(docfil => doclogs.properties.old.list_parts.includes(docfil) === false)
                                descnew = descnew + `Penambahan Item "${maindata.inventory_parts.filter(docfil => listpartsnew.includes(docfil.id)).map(docmap => docmap.inventory_name).join(", ")}" menjadi Item Part`
                            }
                            if (doclogs.notes.split(" ")[1] === "Removed") {
                                const listpartsnew = doclogs.properties.old.list_parts.filter(docfil => doclogs.properties.attributes.list_parts.includes(docfil) === false)
                                descnew = descnew + `Pengeluaran Item Part "${maindata.inventory_parts.filter(docfil => listpartsnew.includes(docfil.id))[0].inventory_name}"`
                            }
                            if (doclogs.notes.split(" ")[1] === "Replaced") {
                                const listpartsold = doclogs.properties.old.list_parts.filter(docfil => doclogs.properties.attributes.list_parts.includes(docfil) === false)
                                const listpartsnew = doclogs.properties.attributes.list_parts.filter(docfil => doclogs.properties.old.list_parts.includes(docfil) === false)
                                descnew = descnew + `Pergantian Item Part "${maindata.inventory_parts.filter(docfil => listpartsold.includes(docfil.id))[0].inventory_name}" menjadi Item Part "${maindata.inventory_parts.filter(docfil => listpartsnew.includes(docfil.id))[0].inventory_name}"`
                            }
                        }
                        else {
                            var prpts = []
                            for (var prop in doclogs.properties.old) {
                                prpts.push(prop)
                            }
                            descnew = descnew + `Pengubahan "${prpts.join(", ")}" Item`
                        }
                    }
                    if (desc1[0] === 'Deleted') {
                        if (desc1[2] === "Relationship") {
                            desc1[0] === 'Created' ? descnew = descnew + `Penambahan Relationship "${doclogs.properties.attributes.relationship}"` : null
                            desc1[0] === 'Deleted' ? descnew = descnew + `Penghapusan Relationship "${doclogs.properties.old.relationship}"` : null
                        }
                    }
                    return {
                        ...doclogs,
                        date: datenew,
                        description: descnew,
                    }
                })
                setdaylogs(daylogsmap); setweeklogs(weeklogsmap); setmorelogs(morelogsmap)
                setpraloadinglogs(false)
            })
        // .then(res3 => {
        //     fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationshipInventory?id=${itemid}&type_id=-4`, {
        //         method: `GET`,
        //         headers: {
        //             'Authorization': JSON.parse(initProps),
        //         }
        //     })
        //         .then(res => res.json())
        //         .then(res4 => {
        //             var concatarr = res4.data.from_inverse.concat(res4.data.not_from_inverse)

        //             var logs2map = res3.data.relationship.map((docrel, idxrel) => {
        //                 const datenew2 = moment(docrel.date).locale("id").format('LLL')
        //                 var descnew2 = ''
        //                 var idlognew = -1
        //                 const desc2 = docrel.description.split(" ")
        //                 desc2[0] === 'Created' ? idlognew = concatarr.filter(docfil => docfil.id === docrel.properties.attributes.id)[0] : null
        //                 desc2[0] === 'Created' ? descnew2 = descnew2 + `Penambahan Relationship "${typeof (idlognew) === 'undefined' ? "(Sudah Dihapus lagi)" : `${idlognew.relationship}`}"` : null
        //                 desc2[0] === 'Deleted' ? descnew2 = descnew2 + `Penghapusan Relationship` : null
        //                 return {
        //                     ...docrel,
        //                     date: datenew2,
        //                     description: descnew2
        //                 }
        //             })
        //             setlogs2(logs2map)
        //             setpraloadinglogs2(false)
        //         })
        // })
    }, [activitytrigger])

    return (
        <div className="flex flex-col">
            <div className="border-b flex justify-between p-5 mb-8">
                <h1 className="font-bold text-xl my-auto">Activity</h1>
            </div>
            <div className="flex">
                <div className="flex flex-col w-6/12">
                    <div className="flex flex-col mb-5">
                        <h1 className="font-semibold mx-auto text-xl mb-3">Hari Ini</h1>
                        {
                            praloadinglogs ?
                                <Spin />
                                :
                                daylogs.length < 1 ?
                                    <>
                                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                    </>
                                    :
                                    <Timeline mode="left">
                                        {
                                            daylogs.map((doclog, idxlog) => {
                                                return (
                                                    <Timeline.Item label={doclog.date}>
                                                        <div className="flex flex-col">
                                                            <h1 className="font-semibold text-base mb-1">{doclog.description}</h1>
                                                            <p className="mb-1 text-xs text-gray-500">Oleh {doclog.causer_name}</p>
                                                            <p className="mb-1 text-sm">Notes: {doclog.notes}</p>
                                                        </div>
                                                    </Timeline.Item>
                                                )
                                            })
                                        }
                                    </Timeline>
                        }
                    </div>
                    <div className="flex flex-col mb-5">
                        <h1 className="font-semibold mx-auto text-xl mb-3">Minggu Ini</h1>
                        {
                            praloadinglogs ?
                                <Spin />
                                :
                                weeklogs.length < 1 ?
                                    <>
                                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                    </>
                                    :
                                    <Timeline mode="left">
                                        {
                                            weeklogs.map((doclog, idxlog) => {
                                                return (
                                                    <Timeline.Item label={doclog.date}>
                                                        <div className="flex flex-col">
                                                            <h1 className="font-semibold text-base mb-1">{doclog.description}</h1>
                                                            <p className="mb-1 text-xs text-gray-500">Oleh {doclog.causer_name}</p>
                                                            <p className="mb-1 text-sm">Notes: {doclog.notes}</p>
                                                        </div>
                                                    </Timeline.Item>
                                                )
                                            })
                                        }
                                    </Timeline>
                        }
                    </div>
                </div>
                <div className="flex flex-col w-6/12">
                    <h1 className="font-semibold mx-auto text-xl mb-3">Minggu Lalu</h1>
                    {
                        praloadinglogs ?
                            <Spin />
                            :
                            morelogs.length < 1 ?
                                <>
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                </>
                                :
                                <Timeline mode="left">
                                    {
                                        morelogs.map((doclog, idxlog) => {
                                            return (
                                                <Timeline.Item label={doclog.date}>
                                                    <div className="flex flex-col">
                                                        <h1 className="font-semibold text-base mb-1">{doclog.description}</h1>
                                                        <p className="mb-1 text-xs text-gray-500">Oleh {doclog.causer_name}</p>
                                                        <p className="mb-1 text-sm">Notes: {doclog.notes}</p>
                                                    </div>
                                                </Timeline.Item>
                                            )
                                        })
                                    }
                                </Timeline>
                    }
                </div>
            </div>
        </div>
    )
}

const ItemDetail = ({ initProps, dataProfile, sidemenu, itemid }) => {
    //1. Init
    const rt = useRouter()
    var activeTab = "overview"
    const { active } = rt.query
    if (active) {
        activeTab = active
    }
    var pathArr = rt.pathname.split("/").slice(1)
    pathArr.splice(2, 2)
    pathArr[pathArr.length - 1] = "Detail Item"
    const { TabPane } = Tabs

    //useState
    const [maindata, setmaindata] = useState({
        id: "",
        model_id: "",
        vendor_id: "",
        inventory_name: "",
        status_condition: "",
        status_usage: "",
        location: "",
        is_exist: "",
        deskripsi: "",
        manufacturer_id: "",
        mig_id: "",
        serial_number: "",
        created_at: "",
        updated_at: "",
        deleted_at: "",
        asset_name: "",
        model_name: "",
        location_name: "",
        model_inventory: {
            id: null,
            name: "",
            asset_id: null,
            deleted_at: null,
            asset: {
                id: null,
                name: "",
                deleted_at: null
            }
        },
        location_inventory: {
            company_id: null,
            company_name: ""
        },
        additional_attributes: [],
        inventory_parts: [],
        associations: []
    })
    const [invrelations, setinvrelations] = useState({
        models: [
            {
                id: "",
                name: "",
                deleted_at: null
            }
        ],
        assets: [
            {
                id: "",
                name: "",
                deleted_at: null
            }
        ],
        manufacturers: [
            {
                id: "",
                name: "",
                deleted_at: null
            }
        ],
        status_condition: [],
        status_usage: [],
        vendors: [],
        companies: [],
        tree_companies: {
            children: []
        }
    })
    const [relship, setrelship] = useState([])
    const [manuf, setmanuf] = useState("")
    const [vendor, setvendor] = useState("")
    const [praloading, setpraloading] = useState(true)
    const [praloading2, setpraloading2] = useState(true)
    //delete
    const [modaldelete, setmodaldelete] = useState(false)
    const [loadingdelete, setloadingdelete] = useState(false)
    //notes
    const [notes, setnotes] = useState("")
    const [modalnotes, setmodalnotes] = useState(false)
    const [loadingnotes, setloadingnotes] = useState(false)
    //kondisi
    const [kondisi, setkondisi] = useState("")
    const [notekondisi, setnotekondisi] = useState("")
    const [modalkondisi, setmodalkondisi] = useState(false)
    const [displaykondisi, setdisplaykondisi] = useState(true)
    const [loadingkondisi, setloadingkondisi] = useState(false)
    //status pemakaian
    const [changeusage, setchangeusage] = useState({
        id: Number(itemid),
        status_usage: "",
        notes: "",
        relationship_type_id: "",
        connected_id: "",
        detail_connected_id: null
    })
    const [disabledusage, setdisabledusage] = useState(true)
    const [modalusage, setmodalusage] = useState(false)
    const [displayusage, setdisplayusage] = useState(true)
    const [loadingchangecompanyusage, setloadingchangecompanyusage] = useState(false)
    const [loadingusage, setloadingusage] = useState(false)
    const [agents, setagents] = useState([])
    const [requesters, setrequesters] = useState([])
    const [models, setmodels] = useState([])
    const [locations, setlocations] = useState([])
    const [locationsdisplay, setlocationsdisplay] = useState(false)
    const [locationtrigger, setlocationtrigger] = useState(-1)
    const [activitytrigger, setactivitytrigger] = useState(0)

    //helper


    //handler
    const handleDeleteItem = () => {
        setloadingdelete(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteInventory`, {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: Number(itemid),
                notes: ""
            })
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingdelete(false)
                if (res2.success) {
                    notification['success']({
                        message: "Item berhasil dihapus",
                        duration: 3
                    })
                    setmodaldelete(false)
                    rt.push(`/items`)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }
    const handleNotesItem = () => {
        setloadingnotes(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addInventoryNotes`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: Number(itemid),
                notes: notes
            })
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingnotes(false)
                if (res2.success) {
                    notification['success']({
                        message: "Notes berhasil ditambahkan",
                        duration: 3
                    })
                    setmodalnotes(false)
                    window.location.href = `/items/detail/${itemid}?active=activity`
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }
    const handleKondisiItem = () => {
        setloadingkondisi(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/changeStatusCondition`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: Number(itemid),
                notes: notekondisi,
                status_condition: kondisi
            })
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingkondisi(false)
                setmodalkondisi(false)
                if (res2.success) {
                    notification['success']({
                        message: "Status Kondisi berhasil diubah",
                        duration: 2
                    })
                    window.location.href = `/items/detail/${itemid}`
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }
    const handleUsageItem = () => {
        setloadingusage(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/changeStatusUsage`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(changeusage)
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingusage(false)
                setmodalusage(false)
                if (res2.success) {
                    notification['success']({
                        message: "Status Pemakaian berhasil diubah",
                        duration: 2
                    })
                    window.location.href = `/items/detail/${itemid}`
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
        fetch(`https://boiling-thicket-46501.herokuapp.com/getInventory?id=${itemid}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                var t = {}
                for (var prop in res2.data) {
                    if (prop === "additional_attributes") {
                        t[prop] = res2.data[prop].map((doc, idx) => {
                            if (doc.data_type === 'dropdown' || doc.data_type === 'checkbox') {
                                return ({
                                    ...doc,
                                    value: JSON.parse(doc.value)
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
                setmaindata(t)
                setpraloading(false)
                return t
            })
            .then(res3 => {
                fetch(`https://boiling-thicket-46501.herokuapp.com/getInventoryRelations`, {
                    method: `GET`,
                    headers: {
                        'Authorization': JSON.parse(initProps),
                    }
                })
                    .then(res => res.json())
                    .then(res2 => {
                        setinvrelations(res2.data)
                        var del_manuf = null
                        res3.manufacturer_id === 0 || res3.manufacturer_id === null ? del_manuf = null : del_manuf = res2.data.manufacturers.filter(docfil => docfil.id === res3.manufacturer_id)[0].deleted_at
                        setmanuf({
                            name: res3.manufacturer_id === null || res3.manufacturer_id === 0 ? "-" : res2.data.manufacturers.filter(docfil => docfil.id === res3.manufacturer_id)[0].name,
                            isnull: del_manuf !== null ? false : true
                        })
                        res3.vendor_id === null || res3.vendor_id === 0 ? setvendor("-") : setvendor(res2.data.vendors.filter(docfil => docfil.id === res3.vendor_id)[0].name)
                        setpraloading2(false)
                    })
            })
    }, [])
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getFilterModels`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setmodels(res2.data)
            })
    }, [])
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getAgentList`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setagents(res2.data)
            })
    }, [])
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getRequesterList`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setrequesters(res2.data)
            })
    }, [])
    useEffect(() => {
        if (locationtrigger !== -1) {
            setloadingchangecompanyusage(true)
            fetch(`https://boiling-thicket-46501.herokuapp.com/getLocations`, {
                method: `GET`,
                headers: {
                    'Authorization': JSON.parse(initProps),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    company_id: Number(changeusage.connected_id)
                })
            })
                .then(res => res.json())
                .then(res2 => {
                    setloadingchangecompanyusage(false)
                    setlocations(res2.data)
                })
        }
    }, [locationtrigger])
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationshipInventory?id=${itemid}&type_id=-4`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setrelship(res2.data.from_inverse.concat(res2.data.not_from_inverse))
            })
    }, [])
    return (
        <Layout st={st} sidemenu={sidemenu} tok={initProps} pathArr={pathArr} dataProfile={dataProfile}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4" id="createAssetsWrapper">
                <div className=" col-span-1 md:col-span-4 mb-8">
                    <Sticky containerSelectorFocus="#createAgentsWrapper">
                        <div className=" col-span-4 flex justify-between py-5 px-4 border-t border-b bg-white">
                            <div className="flex items-center">
                                <h1 className="font-semibold py-2 text-2xl mb-0 mr-20">{maindata.inventory_name}</h1>
                                {
                                    praloading ?
                                        null
                                        :
                                        <>
                                            <div className="flex flex-col mr-7 p-2">
                                                <p className="mb-1">Status Pemakaian:</p>
                                                {
                                                    displayusage ?
                                                        <Select style={{ width: `10rem` }} placeholder="Masukkan Status Pemakaian" defaultValue={maindata.status_usage === 0 || maindata.status_usage === null ? null : maindata.status_usage} onChange={(value) => {
                                                            setdisabledusage(prev => {
                                                                if (value !== 1) {
                                                                    return false
                                                                }
                                                                else {
                                                                    return true
                                                                }
                                                            })
                                                            setchangeusage({
                                                                ...changeusage,
                                                                status_usage: value
                                                            });
                                                            setmodalusage(true)
                                                            setdisplayusage(false)
                                                        }}>
                                                            <Select.Option value={1}><strong>In Used</strong></Select.Option>
                                                            <Select.Option value={2}><strong>In Stock</strong></Select.Option>
                                                            <Select.Option value={3}><strong>Replacement</strong></Select.Option>
                                                        </Select>
                                                        :
                                                        null
                                                }
                                            </div>
                                            <div className="flex flex-col p-2">
                                                <p className="mb-1">Kondisi:</p>
                                                {
                                                    displaykondisi ?
                                                        <Select style={{ width: `10rem` }} placeholder="Masukkan Status Kondisi" defaultValue={maindata.status_condition === 0 || maindata.status_condition === null ? null : maindata.status_condition} onChange={(value) => {
                                                            setkondisi(value);
                                                            setmodalkondisi(true)
                                                            setdisplaykondisi(false)
                                                        }}>
                                                            <Select.Option value={1}>
                                                                <div className="p-1 flex w-full items-center">
                                                                    <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                                                                    <p className="mb-0 font-semibold">Good</p>
                                                                </div>
                                                            </Select.Option>
                                                            <Select.Option value={2}>
                                                                <div className="p-1 flex w-full items-center">
                                                                    <div className="w-3 h-3 rounded-full bg-gray-500 mr-1"></div>
                                                                    <p className="mb-0 font-semibold">Grey</p>
                                                                </div>
                                                            </Select.Option>
                                                            <Select.Option value={3}>
                                                                <div className="p-1 flex w-full items-center">
                                                                    <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                                                                    <p className="mb-0 font-semibold">Bad</p>
                                                                </div>
                                                            </Select.Option>
                                                        </Select>
                                                        :
                                                        null
                                                }
                                            </div>
                                        </>
                                }
                            </div>
                            <div className="flex space-x-2 items-center">
                                <Button style={{ marginRight: `1rem` }} onClick={() => { setmodalnotes(true) }} size="large">Tambah Notes</Button>
                                <Button type="danger" size="large" onClick={() => { setmodaldelete(true) }}>Hapus</Button>
                            </div>
                        </div>
                    </Sticky>
                </div>
                <div className="col-span-1 md:col-span-4 mb-8">
                    <div className=" hidden md:block">
                        <Tabs tabPosition={`left`} defaultActiveKey={activeTab} onTabClick={(key, e) => {
                            if (key === "activity") {
                                setactivitytrigger(prev => prev + 1)
                            }
                        }}>
                            <TabPane tab="Overview" key={`overview`}>
                                <Overview itemid={itemid} initProps={initProps} maindata={maindata} manuf={manuf} vendor={vendor} praloading={praloading} />
                            </TabPane>
                            <TabPane tab="Konfigurasi Part" key={`konfigurasiPart`}>
                                <KonfigurasiPart itemid={itemid} initProps={initProps} maindata={maindata} invrelations={invrelations} praloading2={praloading2} models={models} setmodels={setmodels} />
                            </TabPane>
                            <TabPane tab="Relationship" key={`relationship`}>
                                <Relationship itemid={itemid} initProps={initProps} maindata={maindata} />
                            </TabPane>
                            <TabPane tab="Association" key={`association`}>
                                <Association itemid={itemid} initProps={initProps} maindata={maindata} praloading={praloading} />
                            </TabPane>
                            <TabPane tab="Activity" key={`activity`}>
                                <Acitivty itemid={itemid} initProps={initProps} maindata={maindata} invrelations={invrelations} activitytrigger={activitytrigger} />
                            </TabPane>
                        </Tabs>
                    </div>
                    <div className=" block md:hidden" >
                        <Tabs tabPosition={`top`} defaultActiveKey={activeTab}>
                            <TabPane tab="Overview" key={`overview`}>
                                <Overview itemid={itemid} initProps={initProps} maindata={maindata} manuf={manuf} vendor={vendor} praloading={praloading} />
                            </TabPane>
                            <TabPane tab="Konfigurasi Part" key={`konfigurasiPart`}>
                                <KonfigurasiPart itemid={itemid} initProps={initProps} maindata={maindata} invrelations={invrelations} praloading2={praloading2} models={models} setmodels={setmodels} />
                            </TabPane>
                            <TabPane tab="Relationship" key={`relationship`}>
                                <Relationship itemid={itemid} initProps={initProps} maindata={maindata} />
                            </TabPane>
                            <TabPane tab="Association" key={`association`}>
                                <Association itemid={itemid} initProps={initProps} maindata={maindata} praloading={praloading} />
                            </TabPane>
                            <TabPane tab="Activity" key={`activity`}>
                                <Acitivty itemid={itemid} initProps={initProps} maindata={maindata} invrelations={invrelations} activitytrigger={activitytrigger} />
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
            <Modal title={
                <div className="flex justify-between p-5 mt-5">
                    <h1 className="font-bold text-xl">Form Ubah Status Pemakaian {maindata.inventory_name}</h1>
                    <div className="flex">
                        <>
                            <Button type="default" onClick={() => { setmodalusage(false); setdisplayusage(true) }} style={{ marginRight: `1rem` }}>Batal</Button>
                            <Button type='primary' disabled={disabledusage} onClick={handleUsageItem} loading={loadingusage}>Simpan</Button>
                        </>
                    </div>
                </div>
            }
                visible={modalusage}
                onCancel={() => { setmodalusage(false); setdisplayusage(true) }}
                footer={null}
                width={760}
            >
                <div className="flex flex-col mb-3">
                    <div className="flex flex-col mb-3">
                        <p className="mb-0">Status Pemakaian <span className="usagemodal"></span></p>
                        <Select disabled defaultValue={changeusage.status_usage}>
                            <Select.Option value={1}>In Used</Select.Option>
                            <Select.Option value={2}>In Stock</Select.Option>
                            <Select.Option value={3}>Replacement</Select.Option>
                        </Select>
                        <style jsx>
                            {`
                                .usagemodal::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                        </style>
                    </div>
                    {
                        changeusage.status_usage === 1 ?
                            <div className="flex flex-col mb-3">
                                <div className="flex flex-col mb-3">
                                    <p className="mb-0">Digunakan Oleh <span className="bymodal"></span></p>
                                    <Select onChange={(value) => {
                                        setchangeusage({
                                            ...changeusage,
                                            relationship_type_id: value,
                                            detail_connected_id: null,
                                            connected_id: null
                                        })
                                        setdisabledusage(true)
                                        if (value !== 3) {
                                            setlocationsdisplay(false)
                                        }
                                    }}>
                                        <Select.Option value={1}>Agent</Select.Option>
                                        <Select.Option value={2}>Requester</Select.Option>
                                        <Select.Option value={3}>Company</Select.Option>
                                    </Select>
                                    <style jsx>
                                        {`
                                            .bymodal::before{
                                                content: '*';
                                                color: red;
                                            }
                                        `}
                                    </style>
                                </div>
                                <div className="flex flex-col mb-3 ml-5">
                                    <p className="mb-0">Nama {changeusage.relationship_type_id === 1 && "Agent"} {changeusage.relationship_type_id === 2 && "Requester"} {changeusage.relationship_type_id === 3 && "Company"} <span className="namabymodal"></span></p>
                                    <Select value={changeusage.connected_id} onChange={(value) => {
                                        setchangeusage({
                                            ...changeusage,
                                            connected_id: value
                                        })
                                        changeusage.relationship_type_id === 3 ? setlocationtrigger(prev => prev + 1) : null
                                        changeusage.relationship_type_id === 3 ? setlocationsdisplay(true) : null
                                        setdisabledusage(false)
                                    }}>
                                        {
                                            changeusage.relationship_type_id === 1 &&
                                            agents.map((doc, idx) => (
                                                <Select.Option value={doc.user_id}>{doc.fullname}</Select.Option>
                                            ))
                                        }
                                        {
                                            changeusage.relationship_type_id === 2 &&
                                            requesters.map((doc, idx) => (
                                                <Select.Option value={doc.user_id}>{doc.fullname}</Select.Option>
                                            ))
                                        }
                                        {
                                            changeusage.relationship_type_id === 3 &&
                                            invrelations.companies.map((doc, idx) => (
                                                <Select.Option value={doc.id}>{doc.name}</Select.Option>
                                            ))
                                        }
                                    </Select>
                                    <style jsx>
                                        {`
                                            .namabymodal::before{
                                                content: '*';
                                                color: red;
                                            }
                                        `}
                                    </style>
                                </div>
                                {
                                    changeusage.connected_id === 3 || locationsdisplay === true ?
                                        <div className="flex flex-col ml-5">
                                            <p className="mb-0">Nama Lokasi</p>
                                            <TreeSelect loading={loadingchangecompanyusage} treeData={locations} onChange={(value) => {
                                                setchangeusage({
                                                    ...changeusage,
                                                    detail_connected_id: value
                                                })
                                            }}>
                                            </TreeSelect>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                            :
                            null
                    }
                    <div className="flex flex-col mb-3">
                        <p className="mb-0">Notes</p>
                        <Input.TextArea rows={3} placeholder="Masukkan Notes" onChange={(e => {
                            setchangeusage({
                                ...changeusage,
                                notes: e.target.value
                            })
                        })}></Input.TextArea>
                    </div>
                </div>
            </Modal>
            <Modal title={
                <div className="flex justify-between p-5 mt-5">
                    <h1 className="font-bold text-xl">Form Ubah Status Kondisi {maindata.inventory_name}</h1>
                    <div className="flex">
                        <>
                            <Button type="default" onClick={() => { setmodalkondisi(false); setdisplaykondisi(true) }} style={{ marginRight: `1rem` }}>Batal</Button>
                            <Button type='primary' onClick={handleKondisiItem} loading={loadingkondisi}>Simpan</Button>
                        </>
                    </div>
                </div>
            }
                visible={modalkondisi}
                onCancel={() => { setmodalkondisi(false); setdisplaykondisi(true) }}
                footer={null}
                width={600}
            >
                <div className="flex flex-col mb-3">
                    <div className="flex flex-col mb-3">
                        <p className="mb-0">Status Kondisi <span className="kondisimodal"></span></p>
                        <Select disabled defaultValue={kondisi}>
                            <Select.Option value={1}>
                                <p className="mb-0">Good</p>
                            </Select.Option>
                            <Select.Option value={2}>
                                <p className="mb-0">Grey</p>
                            </Select.Option>
                            <Select.Option value={3}>
                                <p className="mb-0">Bad</p>
                            </Select.Option>
                        </Select>
                        <style jsx>
                            {`
                                .kondisimodal::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                        </style>
                    </div>
                    <div className="flex flex-col mb-3">
                        <p className="mb-0">Notes</p>
                        <Input.TextArea rows={3} placeholder="Masukkan Notes" onChange={(e => {
                            setnotekondisi(e.target.value)
                        })}></Input.TextArea>
                    </div>
                </div>
            </Modal>
            <Modal title={
                <div className="flex justify-between p-5 mt-5">
                    <h1 className="font-bold text-xl">Form Tambah Notes {maindata.inventory_name}</h1>
                    <div className="flex">
                        <>
                            <Button type="default" onClick={() => { setmodalnotes(false) }} style={{ marginRight: `1rem` }}>Batal</Button>
                            <Button type='primary' disabled={notes === ""} onClick={handleNotesItem} loading={loadingnotes}>Simpan</Button>
                        </>
                    </div>
                </div>
            }
                visible={modalnotes}
                onCancel={() => { setmodalnotes(false) }}
                footer={null}
                width={600}
            >
                <div className="flex flex-col mb-5">
                    <p className="mb-0">Notes</p>
                    <Input.TextArea rows={3} placeholder="Masukkan Notes" onChange={(e => {
                        setnotes(e.target.value)
                    })}></Input.TextArea>
                </div>
            </Modal>
            <Modal title={<h1 className="font-semibold">Apakah anda yakin ingin menghapus item "{maindata.inventory_name} - {maindata.mig_id}"?</h1>}
                visible={modaldelete}
                onCancel={() => { setmodaldelete(false) }}
                okText="Ya"
                cancelText="Tidak"
                onOk={handleDeleteItem}
                okButtonProps={{ loading: loadingdelete }}
                width={720}
            >
                <div className="flex flex-col mb-5">
                    <div className="flex flex-col mb-4">
                        <p className="mb-2 text-xs font-semibold">Item ini memiliki Item Part sebagai berikut :</p>
                        <div className="mb-2 text-xs flex flex-col">
                            {
                                maindata.inventory_parts.length === 0 ?
                                    <p className="font-semibold">-</p>
                                    :
                                    <>
                                        {
                                            maindata.inventory_parts.map((docempty, idxempty) => (
                                                <p key={idxempty}>- <strong>{docempty.inventory_name}</strong></p>
                                            ))
                                        }
                                    </>
                            }
                        </div>
                        <p className="mb-2 text-xs font-semibold">
                            Item ini sedang memiliki hubungan dengan item berikut:
                        </p>
                        <ul className="mb-2 text-xs">
                            {
                                relship.map((docrel, idxrel) => (
                                    <li key={idxrel}>- <strong>{docrel.type} - {docrel.connected_detail_name}</strong></li>
                                ))
                            }
                        </ul>
                        <p className="mb-2 text-xs font-semibold text-red-500">
                            Dengan menghapus item ini akan menghilangkan seluruh hubungan dengan item diatas!
                        </p>
                    </div>
                    <hr />
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

export default ItemDetail
