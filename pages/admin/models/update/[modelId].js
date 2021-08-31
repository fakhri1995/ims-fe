import Layout from '../../../../components/layout-dashboard'
import { useRouter } from 'next/router'
import httpcookie from 'cookie'
import { DeleteOutlined } from '@ant-design/icons'
import Sticky from 'wil-react-sticky'
import Link from 'next/link'
import { PlusSquareTwoTone, CloseCircleOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { Form, Input, notification, Button, TreeSelect, Checkbox, Select, Popconfirm, Spin, InputNumber, DatePicker, Collapse, Timeline, Empty } from 'antd'
import st from '../../../../components/layout-dashboard.module.css'
import Modal from 'antd/lib/modal/Modal'


const UpdateModel = ({ modelid, initProps, sidemenu, dataProfile }) => {
    //1.Init
    const rt = useRouter()
    var pathArr = rt.pathname.split("/").slice(1)
    pathArr.splice(3, 1)
    pathArr[pathArr.length - 1] = "Ubah Model"
    const [instanceForm] = Form.useForm();
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
    const [newdata, setnewdata] = useState({
        asset_id: "",
        name: "",
        description: "",
        manufacturer_id: "",
        required_sn: false,
        model_columns: [],
        model_parts: []
    })
    const [newdata2, setnewdata2] = useState({
        asset_id: "",
        name: "",
        description: "",
        manufacturer_id: "",
        required_sn: false,
        model_columns: [],
        model_parts: []
    })
    const [assetdata, setassetdata] = useState([])
    const [manufdata, setmanufdata] = useState([])
    const [modeldata, setmodeldata] = useState([])
    const [fielddata, setfielddata] = useState([])
    const [fielddata2, setfielddata2] = useState([])
    const [fielddataa, setfielddataa] = useState([])
    const [fielddataa2, setfielddataa2] = useState([])
    const [modelpartfielddata, setmodelpartfielddata] = useState([])
    const [currentfield, setcurrentfield] = useState({
        name: "",
        data_type: "",
        default: "single",
        required: false
    })
    const [currentfield2, setcurrentfield2] = useState({
        name: "",
        data_type: "",
        default: "single",
        required: false
    })
    const [currentidmodel, setcurrentidmodel] = useState({
        id: ""
    })
    const [addedfield, setaddedfield] = useState([])
    const [addedfield2, setaddedfield2] = useState([])
    const [addedfieldidx, setaddedfieldidx] = useState(-1)
    const [addedfieldtrigger, setaddedfieldtrigger] = useState(false)
    const [addedfieldidx2, setaddedfieldidx2] = useState(-1)
    const [addedfieldtrigger2, setaddedfieldtrigger2] = useState(false)
    const [loadingcreate, setloadingcreate] = useState(false)
    const [loadingcreatemodel, setloadingcreatemodel] = useState(false)
    const [loadinggetmodel, setloadinggetmodel] = useState(false)
    const [praloading, setpraloading] = useState(true)
    const [loadingspec, setloadingspec] = useState(false)
    const [loadingspec2, setloadingspec2] = useState(false)
    const [currentdropdown2, setcurrentdropdown2] = useState(["", ""])
    const [currentdropdownn2, setcurrentdropdownn2] = useState(["", ""])
    const [currentcheckeddropdown2, setcurrentcheckeddropdown2] = useState("")
    const [currentcheckeddropdownn2, setcurrentcheckeddropdownn2] = useState("")
    const [valuedropdowntrigger, setvaluedropdowntrigger] = useState(false)
    const [valuedropdowntrigger2, setvaluedropdowntrigger2] = useState(false)
    const [idxdropdowntrigger, setidxdropdowntrigger] = useState(-1)
    const [idxdropdowntrigger2, setidxdropdowntrigger2] = useState(-1)
    const [concatfieldtrigger, setconcatfieldtrigger] = useState(false)
    const [concatfieldtrigger2, setconcatfieldtrigger2] = useState(false)
    const [editpart, seteditpart] = useState(false)
    const [modaldeletemodel, setmodaldeletemodel] = useState(false)
    const [modalcreatemodel, setmodalcreatemodel] = useState(false)
    const [newdatatrigger, setnewdatatrigger] = useState(false)
    const [newdatatrigger2, setnewdatatrigger2] = useState(false)
    const [modeltrigger, setmodeltrigger] = useState(false)
    const [concatparttrigger, setconcatparttrigger] = useState(false)
    const [concatpartvalue, setconcatpartvalue] = useState(-1)
    const [assettypecode, setassettypecode] = useState("")

    //3.onChange
    const onClickAddField = () => {
        setfielddata2([...fielddata2, {
            name: "",
            data_type: "",
            default: "",
            required: false
        }])
        setcurrentfield({
            name: "",
            data_type: "",
            default: "",
            required: false
        })
        setcurrentdropdown2(["", ""])
        setcurrentcheckeddropdown2("")
    }
    const onClickAddField2 = () => {
        setfielddataa2([...fielddataa2, {
            name: "",
            data_type: "",
            default: "",
            required: false
        }])
        setcurrentfield2({
            name: "",
            data_type: "",
            default: "",
            required: false
        })
        setcurrentdropdownn2(["", ""])
        setcurrentcheckeddropdownn2("")
    }
    const onClickSelectAsset = (id) => {
        setnewdata({ ...newdata, asset_id: Number(id) });
        setloadingspec(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/getAsset?id=${id}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps)
            }
        })
            .then(res => res.json())
            .then(res2 => {
                const temp = res2.data.asset_columns.map((doc, idx) => {
                    return ({
                        ...doc,
                        default: JSON.parse(doc.default)
                    })
                })
                setfielddata(temp)
                setnewdatatrigger(prev => !prev)
                setloadingspec(false)
            })
    }
    const onClickSelectAsset2 = (id) => {
        setloadingspec2(true)
        setnewdata2({ ...newdata2, asset_id: Number(id) });
        fetch(`https://boiling-thicket-46501.herokuapp.com/getAsset?id=${id}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps)
            }
        })
            .then(res => res.json())
            .then(res2 => {
                const temp = res2.data.asset_columns.map((doc, idx) => {
                    return ({
                        ...doc,
                        default: JSON.parse(doc.default)
                    })
                })
                setfielddataa(temp)
                setnewdatatrigger2(prev => !prev)
                setloadingspec2(false)
            })
    }

    //4.handle
    const handleCreateModel = () => {
        var t = {}
        for (var prop in newdata) {
            if (prop === "model_columns") {
                t[prop] = newdata[prop].map((doc, idx) => {
                    if (doc.data_type === 'dropdown' || doc.data_type === 'checkbox') {
                        return ({
                            ...doc,
                            default: JSON.stringify(doc.default)
                        })
                    }
                    else {
                        return { ...doc }
                    }
                })
            }
            else {
                t[prop] = newdata[prop]
            }
        }
        setloadingcreate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addModel`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(t)
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingcreate(false)
                if (res2.success) {
                    notification['success']({
                        message: "Model berhasil ditambahkan",
                        duration: 3
                    })
                    setTimeout(() => {
                        setmodalcreatemodel(false)
                        rt.push(`/admin/models/detail/${res2.id}`)
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
    const handleCreateModelinModel = () => {
        var t = {}
        for (var prop in newdata2) {
            if (prop === "model_columns") {
                t[prop] = newdata2[prop].map((doc, idx) => {
                    if (doc.data_type === 'dropdown' || doc.data_type === 'checkbox') {
                        return ({
                            ...doc,
                            default: JSON.stringify(doc.default)
                        })
                    }
                    else {
                        return { ...doc }
                    }
                })
            }
            else {
                t[prop] = newdata2[prop]
            }
        }
        setloadingcreatemodel(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateModel`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(t)
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingcreatemodel(false)
                if (res2.success) {
                    notification['success']({
                        message: "Model berhasil ditambahkan",
                        duration: 3
                    })
                    setTimeout(() => {
                        setmodalcreatemodel(false)
                        setmodeltrigger(prev => !prev)
                        // rt.push(`/admin/models/detail/${res2.id}`)
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

    //5.useEffect
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
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getManufacturers`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setmanufdata(res2.data)
            })
    }, [])
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getModel?id=${modelid}`)
            .then(res => res.json())
            .then(res2 => {
                const temp = {
                    id: res2.data.id,
                    asset_id: res2.data.asset.code,
                    name: res2.data.name,
                    description: res2.data.description,
                    manufacturer_id: res2.data.manufacturer_id,
                    required_sn: res2.data.required_sn,
                    add_columns: [],
                    delete_column_ids: [],
                    add_models: [],
                    delete_model_ids: []
                }
                setnewdata(temp)
                const temp2 = res2.data.model_columns.map((doc, idx) => {
                    if (doc.data_type === 'dropdown' || doc.data_type === 'checkbox') {
                        return ({
                            ...doc,
                            default: JSON.parse(doc.default)
                        })
                    }
                    else {
                        return ({
                            ...doc
                        })
                    }
                })
                setfielddata2(temp2)
                var arr = []
                for (var i = 0; i < res2.data.model_columns.length; i++) {
                    arr.push(true)
                }
                setaddedfield(arr)
                setmodelpartfielddata(res2.data.model_parts)
                setassettypecode(res2.data.asset_id)
                setpraloading(false)
            })
    }, [])
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getModels`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setmodeldata(res2.data)
            })
    }, [modeltrigger])
    useEffect(() => {
        if (idxdropdowntrigger !== -1) {
            setfielddata2(prev => {
                const temp = prev
                temp[idxdropdowntrigger]["default"] = {
                    default: currentcheckeddropdown2,
                    opsi: currentdropdown2
                }
                return temp
            })
        }
    }, [valuedropdowntrigger])
    useEffect(() => {
        setnewdata({
            ...newdata,
            model_columns: fielddata.concat(fielddata2)
        })
    }, [concatfieldtrigger])
    useEffect(() => {
        if (addedfieldidx !== -1) {
            setaddedfield(prev => {
                if (prev[addedfieldidx] === false) {
                    prev[addedfieldidx] = true
                    return prev
                }
                else if (typeof (prev[addedfieldidx]) === 'undefined') {
                    const temp2 = [...prev, true]
                    return temp2
                }
            })
        }
    }, [addedfieldtrigger])

    useEffect(() => {
        if (idxdropdowntrigger2 !== -1) {
            setfielddataa2(prev => {
                const temp = prev
                temp[idxdropdowntrigger2]["default"] = {
                    default: currentcheckeddropdownn2,
                    opsi: currentdropdownn2
                }
                return temp
            })
        }
    }, [valuedropdowntrigger2])
    useEffect(() => {
        setnewdata2({
            ...newdata2,
            model_columns: fielddataa.concat(fielddataa2)
        })
    }, [concatfieldtrigger2])
    useEffect(() => {
        if (addedfieldidx2 !== -1) {
            setaddedfield2(prev => {
                if (prev[addedfieldidx2] === false) {
                    prev[addedfieldidx2] = true
                    return prev
                }
                else if (typeof (prev[addedfieldidx2]) === 'undefined') {
                    const temp2 = [...prev, true]
                    return temp2
                }
            })
        }
    }, [addedfieldtrigger2])

    useEffect(() => {
        setnewdata({ ...newdata, model_columns: fielddata })
    }, [newdatatrigger])
    useEffect(() => {
        setnewdata2({ ...newdata2, model_columns: fielddataa })
    }, [newdatatrigger2])

    useEffect(() => {
        var temp = []
        if (concatpartvalue !== -1) {
            if (concatpartvalue.length === 0) {
                setnewdata({ ...newdata, model_parts: [] })
            }
            else {
                concatpartvalue.map((doc, idx) => {
                    var idxtemp = temp.map(doc => doc.id).indexOf(doc.id)
                    if (idxtemp !== -1 && temp[idxtemp]["id"] === doc.id) {
                        var idxof = temp.map(doc => doc.id).indexOf(doc.id)
                        temp[idxof] = { ...temp[idxof], quantity: temp[idxof].quantity + doc.quantity }
                    }
                    else if (idxtemp === -1) {
                        temp.push({
                            id: doc.id,
                            quantity: doc.quantity
                        })
                    }
                })
                setnewdata({ ...newdata, model_parts: temp })
            }
        }
    }, [concatparttrigger])

    return (
        <Layout tok={initProps} st={st} dataProfile={dataProfile} sidemenu={sidemenu} pathArr={pathArr}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4" id="createAssetsWrapper">
                <div className=" col-span-1 md:col-span-4 mb-8">
                    <Sticky containerSelectorFocus="#createAgentsWrapper">
                        <div className=" col-span-4 flex justify-between p-2 pt-4 border-t-2 border-b-2 bg-white">
                            <h1 className="font-semibold py-2">Form Ubah Model - {newdata.name}</h1>
                            <div className="flex space-x-2">
                                {/* <Link href={`/admin/models`}> */}
                                <Button type="default" onClick={() => { console.log(newdata); console.log(fielddata2) }}>Batal</Button>
                                {/* </Link> */}
                                <Button type="primary" loading={loadingcreate} onClick={instanceForm.submit}>Simpan</Button>
                            </div>
                        </div>
                    </Sticky>
                </div>
                <div className="col-span-1 md:col-span-4 px-5 mb-8 flex flex-col">
                    <div className="mb-5">
                        <h1 className="font-bold text-xl">Informasi Model</h1>
                    </div>
                    <div className="shadow-md border p-8 flex flex-col rounded-md">
                        {
                            praloading ?
                                <Spin></Spin>
                                :
                                <Form form={instanceForm} layout="vertical" onFinish={handleCreateModel} initialValues={newdata}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 space-x-2">
                                        <Form.Item name="asset_id" label="Asset Type" rules={[
                                            {
                                                required: true,
                                                message: 'Asset Type wajib diisi',
                                            },
                                        ]}>
                                            <TreeSelect
                                                style={{ marginRight: `1rem` }}
                                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                                treeData={assetdata}
                                                placeholder="Pilih Asset Type"
                                                defaultValue={newdata.asset_id}
                                                treeDefaultExpandAll
                                                onChange={(value, label, extra) => { onClickSelectAsset(extra.allCheckedNodes[0].node.props.id) }}
                                                allowClear
                                            />
                                        </Form.Item>
                                        <Form.Item name="name" label="Nama Model"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Nama Model wajib diisi',
                                                },
                                            ]}>
                                            <Input name="name" onChange={(e) => { setnewdata({ ...newdata, name: e.target.value }) }} />
                                        </Form.Item>
                                    </div>
                                    <Form.Item name="manufacturer_id" label="Manufacturer"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Manufacturer wajib diisi',
                                            },
                                        ]}>
                                        <Select placeholder="Pilih Manufacturer" onChange={(value) => { setnewdata({ ...newdata, manufacturer_id: value }) }} name="manufacturer_id">
                                            {
                                                manufdata.map((doc, idx) => {
                                                    return (
                                                        <Select.Option key={idx} value={doc.id}>{doc.name}</Select.Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="description" label="Deskripsi">
                                        <Input.TextArea rows={4} name="description" onChange={(e) => { setnewdata({ ...newdata, description: e.target.value }) }} />
                                    </Form.Item>
                                    <div className="flex">
                                        <Checkbox style={{ marginRight: `0.5rem` }} onChange={(e) => { setnewdata({ ...newdata, required_sn: e.target.checked }) }} checked={newdata.required_sn} /> Serial Number wajib ada
                                    </div>
                                </Form>
                        }
                    </div>
                </div>
                <div className="col-span-1 md:col-span-4 px-5 mb-8 flex flex-col">
                    <div className="mb-5">
                        <h1 className="font-bold text-xl">Spesifikasi Model</h1>
                    </div>
                    <div className="shadow-md border p-8 flex flex-col rounded-md">
                        {
                            praloading ?
                                <Spin></Spin>
                                :
                                <>
                                    {
                                        fielddata2.map((doc, idx) => {
                                            return (
                                                <>
                                                    {
                                                        addedfield[idx] === true ?
                                                            <div key={idx} className="shadow-md border p-8 mx-3 md:mx-8 mb-5 flex flex-col rounded-md cursor-pointer" onClick={() => {
                                                                const temp = [...addedfield]
                                                                temp[idx] = false
                                                                for (var i = 0; i < temp.length; i++) {
                                                                    if (i !== idx) {
                                                                        temp[i] = true
                                                                    }
                                                                }
                                                                setaddedfield(temp)
                                                                setcurrentfield(fielddata2[idx])
                                                                if (doc.data_type === 'dropdown' || doc.data_type === 'checkbox') {
                                                                    setcurrentdropdown2(doc.default.opsi)
                                                                    setcurrentcheckeddropdown2(doc.default.default)
                                                                }
                                                            }}>
                                                                <div className="font-semibold mb-2">
                                                                    {doc.name}
                                                                    {fielddata2[idx].required ? <span className="judulField"></span> : null} <span className="text-gray-400 text-sm">({doc.data_type === "single" ? "Single Textbox" : doc.data_type.charAt(0).toUpperCase() + doc.data_type.slice(1)})</span>
                                                                </div>
                                                                <div className='rounded border w-full pl-3 py-2 flex items-center my-auto'>
                                                                    {
                                                                        doc.data_type === 'checkbox' || doc.data_type === 'dropdown' ?
                                                                            <>
                                                                                {
                                                                                    doc.data_type === 'dropdown' &&
                                                                                    <div className="flex flex-col w-full">
                                                                                        {
                                                                                            doc.default.opsi.map((dok, idk) => {
                                                                                                return (
                                                                                                    <div key={idk} className='rounded border mb-1 w-3/12 py-1 pl-3 flex items-center flex-wrap my-auto'>
                                                                                                        <p className="mb-0">{dok}</p>
                                                                                                    </div>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </div>
                                                                                }
                                                                                {
                                                                                    doc.data_type === 'checkbox' &&
                                                                                    <div className="flex flex-col w-full">
                                                                                        {
                                                                                            doc.default.opsi.map((dok, idk) => {
                                                                                                return (
                                                                                                    <div key={idk} className='rounded border mb-1 w-3/12 py-1 pl-3 flex items-center flex-wrap my-auto'>
                                                                                                        <p className="mb-0">{dok}</p>
                                                                                                    </div>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </div>
                                                                                }
                                                                            </>
                                                                            :
                                                                            <p className="mb-0">{doc.default}</p>
                                                                    }
                                                                </div>
                                                                <style jsx>
                                                                    {`
                                                                    .judulField::before{
                                                                        content: '*';
                                                                        color: red;
                                                                    }
                                                                `}
                                                                </style>
                                                            </div>
                                                            :
                                                            <div key={idx} className="shadow-md border p-8 mx-3 md:mx-8 mb-5 flex flex-col rounded-md">
                                                                <Form layout="vertical" initialValues={currentfield}>
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 space-x-2">
                                                                        <Form.Item name="name" label="Nama Field" rules={[
                                                                            {
                                                                                required: true,
                                                                                message: 'Nama Field wajib diisi',
                                                                            },
                                                                        ]}>
                                                                            <Input required name="name" onChange={(e) => {
                                                                                setcurrentfield({ ...currentfield, name: e.target.value })
                                                                            }} />

                                                                        </Form.Item>
                                                                        <Form.Item name="data_type" label="Tipe Field"
                                                                            rules={[
                                                                                {
                                                                                    required: true,
                                                                                    message: 'Tipe Field wajib diisi',
                                                                                },
                                                                            ]}>
                                                                            <Select placeholder="Pilih Tipe Field" onChange={(value) => { setcurrentfield({ ...currentfield, data_type: value }) }} name="data_type">
                                                                                <Select.Option value={"dropdown"}>Dropdown</Select.Option>
                                                                                <Select.Option value={"number"}>Number</Select.Option>
                                                                                <Select.Option value={"paragraph"}>Paragraph Text</Select.Option>
                                                                                <Select.Option value={"checkbox"}>Checkbox</Select.Option>
                                                                                <Select.Option value={"single"}>Single Textbox</Select.Option>
                                                                                <Select.Option value={"date"}>Date</Select.Option>
                                                                            </Select>
                                                                        </Form.Item>
                                                                    </div>
                                                                    <Form.Item name="default" label="Default">
                                                                        {
                                                                            currentfield.data_type.toLowerCase() === "dropdown" ?
                                                                                <div className="flex flex-col">
                                                                                    <h1>Default hanya dipilih 1 (satu) dari beberapa opsi dibawah ini</h1>
                                                                                    {
                                                                                        currentdropdown2.map((doc, idxx) => (
                                                                                            <div className="flex mb-3">
                                                                                                <div className="w-7 flex items-center">
                                                                                                    <Checkbox checked={currentcheckeddropdown2 === idxx ? true : false} onChange={(e) => {
                                                                                                        if (e.target.checked === true) {
                                                                                                            setcurrentcheckeddropdown2(idxx)
                                                                                                        }
                                                                                                    }}></Checkbox>
                                                                                                </div>
                                                                                                <div className="w-10/12 mr-5">
                                                                                                    <Input style={{ marginRight: `0.5rem` }} defaultValue={doc} placeholder={`Masukkan opsi ke-${idxx + 1}`} onChange={(e) => {
                                                                                                        setcurrentdropdown2(prev => {
                                                                                                            const temp = prev
                                                                                                            temp[idxx] = e.target.value
                                                                                                            return temp
                                                                                                        })
                                                                                                    }} />
                                                                                                </div>
                                                                                                <div className="w-1/12 flex justify-around" onClick={() => {
                                                                                                    setcurrentdropdown2(prev => prev.filter((_, idxxx) => idxxx !== idxx))
                                                                                                }}>
                                                                                                    <Button type="danger">-</Button>
                                                                                                </div>
                                                                                            </div>
                                                                                        ))
                                                                                    }
                                                                                    <div className="mx-auto my-3">
                                                                                        <Button onClick={() => { setcurrentdropdown2([...currentdropdown2, ""]) }}>+ Tambah Opsi</Button>
                                                                                    </div>
                                                                                </div>
                                                                                :
                                                                                null
                                                                        }
                                                                        {
                                                                            currentfield.data_type.toLowerCase() === "checkbox" ?
                                                                                <div className="flex flex-col">
                                                                                    <h1>Default hanya dipilih 1 (satu) dari beberapa opsi dibawah ini</h1>
                                                                                    {
                                                                                        currentdropdown2.map((doc, idxx) => (
                                                                                            <div className="flex mb-3">
                                                                                                <div className="w-7 flex items-center">
                                                                                                    <Checkbox checked={currentcheckeddropdown2 === idxx ? true : false} onChange={(e) => {
                                                                                                        if (e.target.checked === true) {
                                                                                                            setcurrentcheckeddropdown2(idxx)
                                                                                                        }
                                                                                                    }}></Checkbox>
                                                                                                </div>
                                                                                                <div className="w-10/12 mr-5">
                                                                                                    <Input style={{ marginRight: `0.5rem` }} defaultValue={doc} placeholder={`Masukkan opsi ke-${idxx + 1}`} onChange={(e) => {
                                                                                                        setcurrentdropdown2(prev => {
                                                                                                            const temp = prev
                                                                                                            temp[idxx] = e.target.value
                                                                                                            return temp
                                                                                                        })
                                                                                                    }} />
                                                                                                </div>
                                                                                                <div className="w-1/12 flex justify-around" onClick={() => {
                                                                                                    setcurrentdropdown2(prev => prev.filter((_, idxxx) => idxxx !== idxx))
                                                                                                }}>
                                                                                                    <Button type="danger">-</Button>
                                                                                                </div>
                                                                                            </div>
                                                                                        ))
                                                                                    }
                                                                                    <div className="mx-auto my-3">
                                                                                        <Button onClick={() => { setcurrentdropdown2([...currentdropdown2, ""]) }}>+ Tambah Opsi</Button>
                                                                                    </div>
                                                                                </div>
                                                                                :
                                                                                null
                                                                        }
                                                                        {
                                                                            currentfield.data_type.toLowerCase() === 'number' &&
                                                                            <InputNumber style={{ width: `30%` }} defaultValue={fielddata2[idx].default} placeholder={`Masukkan default ${currentfield.name}`} onChange={(value) => {
                                                                                setcurrentfield({ ...currentfield, default: `${value}` })
                                                                            }}></InputNumber>
                                                                        }
                                                                        {
                                                                            currentfield.data_type.toLowerCase() === "paragraph" &&
                                                                            <Input.TextArea rows={4} placeholder={`Masukkan default ${currentfield.name}`} defaultValue={fielddata2[idx].default} onChange={(e) => {
                                                                                setcurrentfield({ ...currentfield, default: e.target.value })
                                                                            }}></Input.TextArea>
                                                                        }
                                                                        {
                                                                            (currentfield.data_type.toLowerCase() === "string") &&
                                                                            <Input placeholder={`Masukkan default ${currentfield.name}`} defaultValue={fielddata2[idx].default} onChange={(e) => {
                                                                                setcurrentfield({ ...currentfield, default: e.target.value })
                                                                            }}></Input>
                                                                        }
                                                                        {
                                                                            (currentfield.data_type.toLowerCase() === "single") &&
                                                                            <Input placeholder={`Masukkan default ${currentfield.name}`} defaultValue={fielddata2[idx].default} onChange={(e) => {
                                                                                setcurrentfield({ ...currentfield, default: e.target.value })
                                                                            }}></Input>
                                                                        }
                                                                        {
                                                                            currentfield.data_type.toLowerCase() === "date" &&
                                                                            <DatePicker style={{ width: `30%` }} placeholder={`Masukkan default ${currentfield.name}`} onChange={(value, dateString) => {
                                                                                setcurrentfield({ ...currentfield, default: dateString })
                                                                            }}></DatePicker>
                                                                        }
                                                                    </Form.Item>
                                                                    <hr />
                                                                    <div className="flex mt-4 justify-end">
                                                                        <Popconfirm placement="bottom" title={`Apakah anda yakin ingin menghapus field ${doc.name === "" ? "ini" : doc.name}?`} okText="Ya" cancelText="Tidak" onConfirm={() => {
                                                                            setfielddata2(prev => prev.filter((_, idxx) => idxx !== idx))
                                                                            if (fielddata2.some((docc) => docc.id === doc.id)) {
                                                                                setnewdata(prev => {
                                                                                    var temp = prev
                                                                                    temp.delete_column_ids.push(doc.id)
                                                                                    return temp
                                                                                })
                                                                            }
                                                                            setaddedfield(prev => {
                                                                                prev.splice(idx, 1)
                                                                                return prev
                                                                            })
                                                                        }
                                                                        }>
                                                                            <div className="flex items-center mr-4 hover:text-red-500 cursor-pointer">
                                                                                <DeleteOutlined style={{ fontSize: `1.25rem` }} ></DeleteOutlined>
                                                                            </div>
                                                                        </Popconfirm>
                                                                        <div className=" flex items-center mr-4">
                                                                            <Checkbox checked={currentfield.required} style={{ marginRight: `0.5rem` }} onChange={(e) => {
                                                                                setcurrentfield({ ...currentfield, required: e.target.checked })
                                                                            }} /> Required
                                                                    </div>
                                                                        <Button type="primary" onClick={() => {
                                                                            if (doc.data_type === 'dropdown' || doc.data_type === 'checkbox') {
                                                                                setidxdropdowntrigger(idx)
                                                                                setvaluedropdowntrigger(prev => !prev)
                                                                            }
                                                                            const temp = fielddata2
                                                                            temp[idx] = currentfield
                                                                            setfielddata2(temp)
                                                                            if (typeof (fielddata2[idx].id) === 'undefined') {
                                                                                setnewdata(prev => {
                                                                                    var temp = prev
                                                                                    if (currentfield.data_type === 'dropdown' || currentfield.data_type === 'checkbox') {
                                                                                        currentfield.default = {
                                                                                            default: currentcheckeddropdown2,
                                                                                            opsi: currentdropdown2
                                                                                        }
                                                                                    }
                                                                                    temp.add_columns.push(currentfield)
                                                                                    return temp
                                                                                })
                                                                            }
                                                                            setaddedfieldidx(idx)
                                                                            setaddedfieldtrigger(prev => !prev)
                                                                            // setconcatfieldtrigger(prev => !prev)
                                                                        }}>Tambah</Button>
                                                                    </div>
                                                                </Form>
                                                            </div>
                                                    }
                                                </>
                                            )
                                        })
                                    }
                                </>
                        }
                    </div>
                    <div className="w-full flex justify-center mt-5">
                        <Button type="dashed" style={{ width: `80%`, height: `4rem` }} onClick={onClickAddField}>+ Tambah Spesifikasi Model</Button>
                    </div>
                </div>
            </div>
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
    const resources = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjson = await resources.json()
    const dataProfile = resjson

    return {
        props: {
            initProps,
            dataProfile,
            sidemenu: "4",
            modelid
        },
    }
}

export default UpdateModel
