import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import httpcookie from 'cookie'
import Link from 'next/link'
import { ExclamationCircleOutlined, CalendarOutlined } from '@ant-design/icons'
import { notification, Button, Spin, Timeline, Empty, Modal, Tooltip, Select, Tabs, Input, TreeSelect } from 'antd'
import Layout from '../../../components/layout-dashboard2'
import moment from 'moment'
import st from '../../../components/layout-dashboard.module.css'
import Sticky from 'wil-react-sticky'

const Overview = ({ itemid, initProps, maindata, manuf, praloading }) => {
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
                        <Button type="primary" size="large" /*onClick={() => { rt.push(`/items/update/${itemid}`) }}*/>Ubah</Button>
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
                                maindata.model_name === "Model Tidak Ditemukan"
                                    ?
                                    <div className="flex items-center">
                                        <p className="mb-0 mr-1">{maindata.model_name}</p>
                                        <Tooltip placement="right" title="Model telah dihapus, segera lakukan pengubahan Model!">
                                            <ExclamationCircleOutlined style={{ color: `brown` }}></ExclamationCircleOutlined>
                                        </Tooltip>
                                    </div>
                                    :
                                    <p className="mb-0 text-sm">{maindata.model_name}</p>
                            }
                        </div>
                        <div className="flex flex-col mb-5">
                            <h1 className=" text-sm font-semibold mb-0">Asset Type:</h1>
                            {
                                maindata.asset_name === "Asset Tidak Ditemukan"
                                    ?
                                    <div className="flex items-center">
                                        <p className="mb-0 mr-1">{maindata.asset_name}</p>
                                        <Tooltip placement="right" title="Asset Type telah dihapus, segera lakukan pengubahan Asset Type!">
                                            <ExclamationCircleOutlined style={{ color: `brown` }}></ExclamationCircleOutlined>
                                        </Tooltip>
                                    </div>
                                    :
                                    <p className="mb-0 text-sm">{maindata.asset_name}</p>
                            }
                        </div>
                        <div className="flex flex-col mb-5">
                            <h1 className=" text-sm font-semibold mb-0">MIG ID:</h1>
                            <p className="mb-0 text-sm">{maindata.mig_id}</p>
                        </div>
                        <div className="flex flex-col mb-5">
                            <h1 className=" text-sm font-semibold mb-0">Serial Number:</h1>
                            <p className="mb-0 text-sm">{maindata.serial_number}</p>
                        </div>
                        <div className="flex flex-col mb-5">
                            <h1 className=" text-sm font-semibold mb-0">Manufacturer:</h1>
                            {
                                // invrelations.manufacturers.filter(docfil => docfil.id === maindata.manufacturer_id)[0].deleted_at !== null
                                maindata.manufacturer_id === "Manufacturer Tidak Ditemukan"
                                    ?
                                    <div className="flex items-center">
                                        <p className="mb-0 mr-1">{manuf}</p>
                                        <Tooltip placement="right" title="Manufacturer telah dihapus, segera lakukan pengubahan Manufacturer!">
                                            <ExclamationCircleOutlined style={{ color: `brown` }}></ExclamationCircleOutlined>
                                        </Tooltip>
                                    </div>
                                    :
                                    <p className="mb-0 text-sm">{manuf}</p>
                            }
                        </div>
                        <div className="flex flex-col mb-5">
                            <h1 className=" text-sm font-semibold mb-0">Location:</h1>
                            <p className="mb-0 text-sm">{maindata.location_name}</p>
                        </div>
                        <div className="flex flex-col mb-5">
                            <h1 className=" text-sm font-semibold mb-0">Deskripsi:</h1>
                            <p className="mb-0 text-sm">{maindata.deskripsi}</p>
                        </div>
                        {
                            maindata.additional_attributes.map((doccolumns, idxcolumns) => {
                                return (
                                    <div key={idxcolumns} className="flex flex-col mb-5">
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
                                                                {doccolumns.value.opsi.filter(docfil => doccolumns.value.default.indexOf(docfil) !== 1).join(",")}
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
const KonfigurasiPart = () => {
    return (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
    )
}
const Relationship = () => {
    return (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
    )
}
const Association = () => {
    return (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
    )
}
const Acitivty = ({ itemid, initProps, maindata, invrelations, praloading }) => {
    const [logs, setlogs] = useState([])
    const [praloadinglogs, setpraloadinglogs] = useState(true)
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getActivityInventoryLogs?id=${itemid}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            }
        })
            .then(res => res.json())
            .then(res2 => {
                var logsmap = res2.data.inventory.map((doclogs, idxlogs) => {
                    const datenew = moment(doclogs.date).locale("id").format('LLL')
                    var descnew = ''
                    const desckondisiOld = doclogs.properties ? (doclogs.properties.old ? (doclogs.properties.old.status_condition === 1 ? 'Good' : (doclogs.properties.old.status_condition === 2 ? 'Grey' : (doclogs.properties.old.status_condition === 3 ? 'Bad' : null))): null) : null
                    const desckondisiBaru = doclogs.properties ? (doclogs.properties.old ? (doclogs.properties.attributes.status_condition === 1 ? 'Good' : (doclogs.properties.attributes.status_condition === 2 ? 'Grey' : (doclogs.properties.attributes.status_condition === 3 ? 'Bad' : null))): null) : null
                    const descusageOld = doclogs.properties ? (doclogs.properties.old ? (doclogs.properties.old.status_usage === 1 ? 'In Used' : (doclogs.properties.old.status_usage === 2 ? 'In Stock' : (doclogs.properties.old.status_usage === 3 ? 'Replacement' : null))): null) : null
                    const descusageBaru = doclogs.properties ? (doclogs.properties.old ? (doclogs.properties.attributes.status_usage === 1 ? 'In Used' : (doclogs.properties.attributes.status_usage === 2 ? 'In Stock' : (doclogs.properties.attributes.status_usage === 3 ? 'Replacement' : null))): null) : null
                    const desc1 = doclogs.description.split(" ")
                    desc1[0] === 'created' ? descnew = descnew + `Pembuatan Item Baru bernama "${doclogs.properties.attributes.inventory_name}"` : null
                    desc1[0] === 'note' ? descnew = descnew + `Penambahan Notes` : null
                    if(desc1[0] === 'updated'){
                        if(doclogs.properties.attributes.status_condition){
                            descnew = descnew + `Pengubahan status kondisi dari ${desckondisiOld} ke ${desckondisiBaru}`
                        }
                        else if(doclogs.properties.attributes.status_usage){
                            descnew = descnew + `Pengubahan status pemakaian dari ${descusageOld} ke ${descusageBaru}`
                        }
                    }
                    return {
                        ...doclogs,
                        date: datenew,
                        description: descnew
                    }
                })
                setlogs(logsmap)
                setpraloadinglogs(false)
            })
    }, [itemid])
    return (
        <div className="flex flex-col">
            <div className="border-b flex justify-between p-5 mb-8">
                <h1 className="font-bold text-xl my-auto">Activity</h1>
            </div>
            <div className="flex flex-col w-6/12">
                <Timeline mode="left">
                    {
                        praloadinglogs ?
                            <Spin />
                            :
                            logs.map((doclog, idxlog) => {
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
        additional_attributes: [],
        inventory_parts: []
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
        companies: []
    })
    const [manuf, setmanuf] = useState("")
    const [praloading, setpraloading] = useState(true)
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
    const [locations, setlocations] = useState([])
    const [locationsdisplay, setlocationsdisplay] = useState(false)
    const [locationtrigger, setlocationtrigger] = useState(-1)

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
                        setmanuf(res2.data.manufacturers.filter(docfil => docfil.id === res3.manufacturer_id)[0].name)
                    })
            })
    }, [])
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getAgentList`, {
            method: `POST`,
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: {
                page: 1,
                rows: 50,
                order_by: "asc"
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setagents(res2.data)
            })
    }, [])
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getRequesterList`, {
            method: `POST`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
            body: {
                page: 1,
                rows: 50,
                order_by: "asc"
            }
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
                method: `POST`,
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
    return (
        <Layout st={st} sidemenu={sidemenu} tok={initProps} pathArr={pathArr} dataProfile={dataProfile}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4" id="createAssetsWrapper">
                <div className=" col-span-1 md:col-span-4 mb-8">
                    <Sticky containerSelectorFocus="#createAgentsWrapper">
                        <div className=" col-span-4 flex justify-between py-5 px-4 border-t-2 border-b-2 bg-white">
                            <div className="flex items-center">
                                <h1 className="font-semibold py-2 text-2xl mb-0 mr-20">{maindata.inventory_name}</h1>
                                {
                                    praloading ?
                                        null
                                        :
                                        <>
                                            <div className="flex flex-col mr-7 rounded border p-2">
                                                <p className="mb-1">Status Pemakaian:</p>
                                                {
                                                    displayusage ?
                                                        <Select bordered={false} defaultValue={maindata.status_usage} onChange={(value) => {
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
                                            <div className="flex flex-col rounded border p-2">
                                                <p className="mb-1">Kondisi:</p>
                                                {
                                                    displaykondisi ?
                                                        <Select bordered={false} defaultValue={maindata.status_condition} onChange={(value) => {
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
                        <Tabs tabPosition={`left`} defaultActiveKey={activeTab}>
                            <TabPane tab="Overview" key={`overview`}>
                                <Overview itemid={itemid} initProps={initProps} maindata={maindata} manuf={manuf} praloading={praloading} />
                            </TabPane>
                            <TabPane tab="Konfigurasi Part" key={`konfigurasiPart`}>
                                <KonfigurasiPart itemid={itemid} initProps={initProps} />
                            </TabPane>
                            <TabPane tab="Relationship" key={`relationship`}>
                                <Relationship itemid={itemid} initProps={initProps} />
                            </TabPane>
                            <TabPane tab="Association" key={`association`}>
                                <Association itemid={itemid} initProps={initProps} />
                            </TabPane>
                            <TabPane tab="Activity" key={`activity`}>
                                <Acitivty itemid={itemid} initProps={initProps} />
                            </TabPane>
                        </Tabs>
                    </div>
                    <div className=" block md:hidden" >
                        <Tabs tabPosition={`top`} defaultActiveKey={activeTab}>
                            <TabPane tab="Overview" key={`overview`}>
                                <Overview itemid={itemid} initProps={initProps} maindata={maindata} manuf={manuf} praloading={praloading} />
                            </TabPane>
                            <TabPane tab="Konfigurasi Part" key={`konfigurasiPart`}>
                                <KonfigurasiPart itemid={itemid} initProps={initProps} />
                            </TabPane>
                            <TabPane tab="Relationship" key={`relationship`}>
                                <Relationship itemid={itemid} initProps={initProps} />
                            </TabPane>
                            <TabPane tab="Association" key={`association`}>
                                <Association itemid={itemid} initProps={initProps} />
                            </TabPane>
                            <TabPane tab="Activity" key={`activity`}>
                                <Acitivty itemid={itemid} initProps={initProps} />
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
                                                <p key={idxempty}>- <strong>{docempty.model}</strong></p>
                                            ))
                                        }
                                    </>
                            }
                        </div>
                        {/* <p className="mb-2 text-xs font-semibold">
                            Item ini sedang memiliki hubungan dengan item berikut:
                        </p> */}
                        {/* <ul className="mb-2 text-xs">
                                    {
                                        maindata.inventory_parts.map((docempty, idxempty) => (
                                            <li key={idxempty}>- <strong>{docempty}</strong></li>
                                        ))
                                    }
                                </ul> */}
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
            sidemenu: "3",
            itemid
        },
    }
}

export default ItemDetail
