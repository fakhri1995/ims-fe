import Layout from '../../../../components/layout-dashboard'
import { useRouter } from 'next/router'
import httpcookie from 'cookie'
import { DeleteOutlined, CalendarOutlined } from '@ant-design/icons'
import Sticky from 'wil-react-sticky'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Form, Input, notification, Button, TreeSelect, Checkbox, Select, Popconfirm, Spin } from 'antd'
import st from '../../../../components/layout-dashboard.module.css'

const AssetsCreate = ({ sidemenu, dataProfile, initProps }) => {
    //1. Init
    const rt = useRouter()
    var pathArr = rt.pathname.split("/").slice(1)
    pathArr.splice(3, 1)
    pathArr[pathArr.length - 1] = "Tambah Asset Type"
    const [instanceForm] = Form.useForm();
    const [instanceForm2] = Form.useForm();
    const { idparent, codeparent } = rt.query

    //helperFunctions
    const searchAsset = (doc, code) => {
        for (var i = 0; i < doc.length; i++) {
            if (doc[i].key === code) {
                return doc[i]
            }
            if (doc[i].children) {
                searchAsset(doc[i].children, code)
            }
        }
    }

    //useState
    //data payload
    const [newdata, setnewdata] = useState({
        name: "",
        parent: idparent !== "" ? Number(idparent) : null,
        description: "",
        required_sn: false,
        asset_columns: []
    })
    //data induk asset type
    const [assetdata, setassetdata] = useState([])
    //state field dinamis
    const [fielddata, setfielddata] = useState([])
    //state current field dinamis
    const [currentfield, setcurrentfield] = useState({
        name: "",
        data_type: "",
        default: "",
        required: false
    })
    //state is field added
    const [addedfield, setaddedfield] = useState([])
    const [selectedfieldidx, setselectedfieldidx] = useState(-1)
    const [selectedfieldidxtrigger, setselectedfieldidxtrigger] = useState(false)
    const [newfieldidxtrigger, setnewfieldidxtrigger] = useState(false)
    const [currentdropdown, setcurrentdropdown] = useState(["", ""])
    const [currentdropdown2, setcurrentdropdown2] = useState(["", ""])
    const [currentdropdownidx, setcurrentdropdownidx] = useState(-1)
    const [currentdropdowntrigger, setcurrentdropdowntrigger] = useState(false)
    const [currentnondropdownidx, setcurrentnondropdownidx] = useState(-1)
    const [currentnondropdowntrigger, setcurrentnondropdowntrigger] = useState(false)
    const [loadingcreate, setloadingcreate] = useState(false)
    const [praloading, setpraloading] = useState(true)
    const [disabledaddfield, setdisabledaddfield] = useState(false)
    const [disabledsimpan, setdisabledsimpan] = useState(false)
    const [disabledtambah, setdisabledtambah] = useState(false)
    const [pointevent, setpointevent] = useState("")

    //handle
    const onClickAddField = () => {
        setfielddata([...fielddata, {
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
        setcurrentdropdown(["", ""])
        setcurrentdropdown2(["", ""])
        setdisabledaddfield(true)
        setdisabledsimpan(true)
        setdisabledtambah(true)
        setpointevent("pointer-events-none")
    }
    const handleCreateAsset = () => {
        var t = {}
        for (var prop in newdata) {
            if (prop === "asset_columns") {
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
        fetch(`https://boiling-thicket-46501.herokuapp.com/addAsset`, {
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
                        message: "Asset Type berhasil ditambahkan",
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/admin/assets/detail/${res2.id}`)
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

    //useEffect
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
                idparent !== "" ? setnewdata({ ...newdata, parent: idparent }) : null
            })
    }, [])
    useEffect(() => {
        if (selectedfieldidx !== -1) {
            setaddedfield(prev => {
                prev[selectedfieldidx] = true
                return prev
            })
        }
    }, [selectedfieldidxtrigger])
    useEffect(() => {
        setnewdata({
            ...newdata,
            asset_columns: fielddata,
        })
    }, [newfieldidxtrigger])
    useEffect(() => {
        if (currentnondropdownidx !== -1) {
            setfielddata(prev => {
                var temp = prev
                temp[currentnondropdownidx]["default"] = '-'
                return temp
            })
        }
    }, [currentnondropdowntrigger])
    useEffect(() => {
        if (currentdropdownidx !== -1) {
            console.log("sini")
            setcurrentdropdown(prev => {
                return currentdropdown2.filter((doc10, idx10) => idx10 !== currentdropdownidx)
            })
            setcurrentdropdown2(prev => prev.filter((doc11, idx11) => idx11 !== currentdropdownidx))
        }
    }, [currentdropdowntrigger])

    return (
        <Layout st={st} tok={initProps} sidemenu={sidemenu} dataProfile={dataProfile} pathArr={pathArr}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4" id="createAssetsWrapper">
                <div className=" col-span-1 md:col-span-4 mb-8">
                    <Sticky containerSelectorFocus="#createAgentsWrapper">
                        <div className=" col-span-4 flex justify-between p-2 pt-4 border-t-2 border-b-2 bg-white">
                            <h1 className="font-semibold py-2">Form Tambah Asset Types</h1>
                            <div className="flex space-x-2">
                                <Link href={`/admin/assets`}>
                                    <Button type="default" /*onClick={() => { console.log(newdata); console.log(fielddata); console.log(currentdropdown) }}*/>Batal</Button>
                                </Link>
                                <Button type="primary" loading={loadingcreate} onClick={instanceForm.submit} disabled={disabledsimpan}>Simpan</Button>
                            </div>
                        </div>
                    </Sticky>
                </div>
                <div className="col-span-1 md:col-span-4 px-5 mb-8">
                    <div className="shadow-md border p-8 flex flex-col rounded-md">
                        {
                            praloading ?
                                <Spin></Spin>
                                :
                                <Form form={instanceForm} layout="vertical" onFinish={handleCreateAsset}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 space-x-2">
                                        {
                                            idparent !== "" ?
                                                <div className="flex flex-col">
                                                    <p className="mb-2">
                                                        <span className="judulField1"></span>
                                                        Induk Asset Type
                                                    </p>
                                                    <TreeSelect style={{ marginRight: `1rem` }} treeData={assetdata} defaultValue={codeparent !== "" ? codeparent : null} disabled={idparent !== ""}></TreeSelect>
                                                    <style jsx>
                                                        {`
                                                        .judulField1::before{
                                                            content: '*';
                                                            color: red;
                                                            margin-right: 5px;
                                                        }
                                                    `}
                                                    </style>
                                                </div>
                                                :
                                                <Form.Item name="parent" label={
                                                    <div className="flex">
                                                        <span className="judulField"></span>
                                                        <p className="mb-0 ml-1">Induk Asset Type</p>
                                                        <style jsx>
                                                            {`
                                                                    .judulField::before{
                                                                        content: '*';
                                                                        color: red;
                                                                    }
                                                                `}
                                                        </style>
                                                    </div>
                                                }
                                                >
                                                    <TreeSelect
                                                        style={{ marginRight: `1rem` }}
                                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                                        treeData={assetdata}
                                                        placeholder="Pilih parent"
                                                        treeDefaultExpandAll
                                                        onChange={(value, label, extra) => { typeof (value) === 'undefined' ? setnewdata({ ...newdata, parent: null }) : setnewdata({ ...newdata, parent: extra.allCheckedNodes[0].node.props.id }) }}
                                                        allowClear
                                                    />
                                                </Form.Item>
                                        }
                                        <Form.Item name="name" label="Nama Asset Type"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Nama Asset wajib diisi',
                                                },
                                            ]}>
                                            <Input name="name" onChange={(e) => { setnewdata({ ...newdata, name: e.target.value }) }} />
                                        </Form.Item>
                                    </div>
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
                <div className=" col-span-1 md:col-span-4 px-5 flex flex-col">
                    <div className="mb-5">
                        <h1 className="font-bold text-xl">Spesifikasi Asset Type</h1>
                    </div>
                    {
                        fielddata.map((doc, idx) => {
                            return (
                                <>
                                    {
                                        addedfield[idx] === true ?
                                            <div key={idx} className={`${pointevent} shadow-md border p-8 mx-3 md:mx-8 mb-5 flex flex-col rounded-md cursor-pointer`} onClick={() => {
                                                const temp = [...addedfield]
                                                temp[idx] = false
                                                for (var i = 0; i < temp.length; i++) {
                                                    if (i !== idx) {
                                                        temp[i] = true
                                                    }
                                                }
                                                setaddedfield(temp)
                                                setcurrentfield(fielddata[idx])
                                                if (doc.data_type === 'dropdown' || doc.data_type === 'checkbox') {
                                                    setcurrentdropdown(doc.default.opsi)
                                                    setcurrentdropdown2(doc.default.opsi)
                                                }
                                                if (fielddata[idx].data_type !== 'dropdown' || fielddata[idx].data_type !== 'checkbox') {
                                                    if (fielddata[idx].name !== "" && fielddata[idx].data_type !== "") {
                                                        setdisabledtambah(false)
                                                    }
                                                    else {
                                                        setdisabledtambah(true)
                                                    }
                                                }
                                                else {
                                                    if (doc.default.opsi.some(docopsi => docopsi === "")) {
                                                        setdisabledtambah(true)
                                                    }
                                                    else {
                                                        setdisabledtambah(false)
                                                    }
                                                }
                                                setdisabledaddfield(true)
                                                setdisabledsimpan(true)
                                                setpointevent("pointer-events-none")
                                            }}>
                                                <div className="font-semibold mb-2">
                                                    {doc.name}
                                                    {doc.required ? <span className="judulField"></span> : null} <span className="text-gray-400">({doc.data_type.charAt(0).toUpperCase() + doc.data_type.slice(1)}{doc.data_type === 'single' && ` Textbox`}{doc.data_type === 'paragraph' && ` Text`})</span>
                                                </div>
                                                <div className='rounded border w-full p-3'>
                                                    {
                                                        doc.data_type === 'dropdown' || doc.data_type === 'checkbox' || doc.data_type === 'date' || doc.data_type === 'paragraph' ?
                                                            <>
                                                                {
                                                                    doc.data_type === 'dropdown' &&
                                                                    <div className="flex flex-col z-50">
                                                                        <Select>
                                                                            {
                                                                                doc.default.opsi.map((docopsi, idxopsi) => {
                                                                                    <Select.Option key={idxopsi}>{idxopsi}</Select.Option>
                                                                                })
                                                                            }
                                                                        </Select>
                                                                    </div>
                                                                }
                                                                {
                                                                    doc.data_type === 'checkbox' &&
                                                                    <div className="flex flex-col">
                                                                        {
                                                                            doc.default.opsi.map((docopsi, idxopsi) => (
                                                                                <div className="flex items-center  mb-2">
                                                                                    <Checkbox style={{ marginRight: `0.5rem` }} disabled /> {docopsi}
                                                                                </div>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                }
                                                                {
                                                                    doc.data_type === 'date' &&
                                                                    <div className="flex justify-between">
                                                                        <p className='mb-0'>{doc.default}</p>
                                                                        <div>
                                                                            <CalendarOutlined></CalendarOutlined>
                                                                        </div>
                                                                    </div>
                                                                }
                                                                {
                                                                    doc.data_type === 'paragraph' &&
                                                                    <div className="flex h-20"></div>

                                                                }
                                                            </>
                                                            :
                                                            <>
                                                                {doc.default}
                                                            </>
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
                                                <Form layout="vertical" initialValues={fielddata[idx]}>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 space-x-2">
                                                        <Form.Item name="name" label="Nama Spesifikasi"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Nama Field wajib diisi',
                                                                },
                                                            ]}>
                                                            <Input required name="name" onChange={(e) => {
                                                                setcurrentfield({ ...currentfield, name: e.target.value })
                                                                if (e.target.value === "") {
                                                                    setdisabledtambah(true)
                                                                }
                                                                else if (e.target.value !== "" && currentfield.data_type !== "" && (currentdropdown.every((doca, idxa) => doca !== ""))) {
                                                                    setdisabledtambah(false)
                                                                }
                                                            }} />

                                                        </Form.Item>
                                                        <Form.Item name="data_type" label="Tipe Field"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Tipe Field wajib diisi',
                                                                },
                                                            ]}>
                                                            <Select placeholder="Pilih Tipe Field" onChange={(value) => {
                                                                setcurrentfield({ ...currentfield, data_type: value })
                                                                if (value === 'dropdown' || value === 'checkbox') {
                                                                    if ((currentdropdown.every((doca, idxa) => doca !== ""))) {
                                                                        setdisabledtambah(false)
                                                                    }
                                                                    else {
                                                                        setdisabledtambah(true)
                                                                    }
                                                                }
                                                                else {
                                                                    setdisabledtambah(false)
                                                                }
                                                                if (value === 'dropdown') {
                                                                    setcurrentdropdown(["", ""])
                                                                    setdisabledtambah(true)
                                                                }
                                                                if (value === 'checkbox') {
                                                                    setcurrentdropdown(["", ""])
                                                                    setdisabledtambah(true)
                                                                }
                                                            }}
                                                                name="data_type">
                                                                <Select.Option value={"dropdown"}>Dropdown</Select.Option>
                                                                <Select.Option value={"number"}>Number</Select.Option>
                                                                <Select.Option value={"paragraph"}>Paragraph Text</Select.Option>
                                                                <Select.Option value={"checkbox"}>Checkbox</Select.Option>
                                                                <Select.Option value={"single"}>Single Textbox</Select.Option>
                                                                <Select.Option value={"date"}>Date</Select.Option>
                                                            </Select>
                                                        </Form.Item>
                                                    </div>
                                                    {
                                                        currentfield.data_type === "dropdown" ?
                                                            <div className="flex flex-col">
                                                                {
                                                                    currentdropdown.map((doc, idxx) => (
                                                                        <div key={idxx} className="flex mb-3">
                                                                            <div className="w-11/12 mr-5">
                                                                                <Input style={{ marginRight: `0.5rem` }} defaultValue={doc} placeholder={`Masukkan opsi ke-${idxx + 1}`} onChange={(e) => {
                                                                                    setcurrentdropdown(prev => {
                                                                                        const temp = prev
                                                                                        temp[idxx] = e.target.value
                                                                                        return temp
                                                                                    })
                                                                                    setcurrentdropdown2(prev => {
                                                                                        const temp = prev
                                                                                        temp[idxx] = e.target.value
                                                                                        return temp
                                                                                    })
                                                                                    if ((e.target.value !== "") && (currentdropdown.every((doca, idxa) => doca !== "") && currentfield.name !== "")) {
                                                                                        setdisabledtambah(false)
                                                                                    }
                                                                                    else if (e.target.value === "" || currentfield.name === "") {
                                                                                        setdisabledtambah(true)
                                                                                    }
                                                                                }} />
                                                                            </div>
                                                                            <div className="w-1/12 flex justify-around" onClick={() => {
                                                                                setcurrentdropdown([])
                                                                                setcurrentdropdowntrigger(prev => !prev)
                                                                                setcurrentdropdownidx(idxx)
                                                                            }}>
                                                                                <Button color="black" style={{ border: `1px solid black` }}>-</Button>
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                }
                                                                <div className="mx-auto my-3">
                                                                    <Button onClick={() => { setcurrentdropdown([...currentdropdown, ""]); setcurrentdropdown2([...currentdropdown2, ""]); setdisabledtambah(true) }}>+ Tambah Opsi</Button>
                                                                </div>
                                                            </div>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        currentfield.data_type === "checkbox" ?
                                                            <div className="flex flex-col">
                                                                {
                                                                    currentdropdown.map((doc, idxx) => (
                                                                        <div key={idxx} className="flex mb-3">
                                                                            <div className="w-11/12 mr-5">
                                                                                <Input style={{ marginRight: `0.5rem` }} defaultValue={doc} placeholder={`Masukkan opsi ke-${idxx + 1}`} onChange={(e) => {
                                                                                    setcurrentdropdown(prev => {
                                                                                        const temp = prev
                                                                                        temp[idxx] = e.target.value
                                                                                        return temp
                                                                                    })
                                                                                    setcurrentdropdown2(prev => {
                                                                                        const temp = prev
                                                                                        temp[idxx] = e.target.value
                                                                                        return temp
                                                                                    })
                                                                                    if ((e.target.value !== "") && (currentdropdown.every((doca, idxa) => doca !== "") && currentfield.name !== "")) {
                                                                                        setdisabledtambah(false)
                                                                                    }
                                                                                    else if (e.target.value === "" || currentfield.name === "") {
                                                                                        setdisabledtambah(true)
                                                                                    }
                                                                                }} />
                                                                            </div>
                                                                            <div className="w-1/12 flex justify-around" onClick={() => {
                                                                                setcurrentdropdown([])
                                                                                setcurrentdropdowntrigger(prev => !prev)
                                                                                setcurrentdropdownidx(idxx)
                                                                            }}>
                                                                                <Button type="danger">-</Button>
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                }
                                                                <div className="mx-auto my-3">
                                                                    <Button onClick={() => { setcurrentdropdown([...currentdropdown, ""]); setcurrentdropdown2([...currentdropdown2, ""]); setdisabledtambah(true) }}>+ Tambah Opsi</Button>
                                                                </div>
                                                            </div>
                                                            :
                                                            null
                                                    }
                                                    <hr />
                                                    <div className="flex mt-4 justify-end">
                                                        <Popconfirm placement="bottom" title={`Apakah anda yakin ingin menghapus field ${doc.name === "" ? "ini" : doc.name}?`} okText="Ya" cancelText="Tidak" onConfirm={() => {
                                                            setfielddata(prev => prev.filter((_, idxx) => idxx !== idx))
                                                            setnewdata(prev => {
                                                                var temp = prev
                                                                temp.asset_columns.splice(idx, 1)
                                                                return temp
                                                            })
                                                            setaddedfield(prev => {
                                                                prev.splice(idx, 1)
                                                                return prev
                                                            })
                                                            setdisabledaddfield(false)
                                                            setdisabledsimpan(false)
                                                            setpointevent("")
                                                        }
                                                        }>
                                                            <div className="flex items-center mr-4 hover:text-red-500 cursor-pointer">
                                                                <DeleteOutlined style={{ fontSize: `1.25rem` }} ></DeleteOutlined>
                                                            </div>
                                                        </Popconfirm>
                                                        <div className=" flex items-center mr-4">
                                                            <Checkbox checked={currentfield.required} style={{ marginRight: `0.3rem` }} onChange={(e) => {
                                                                setcurrentfield({ ...currentfield, required: e.target.checked })
                                                            }} /> Required
                                                        </div>
                                                        <Button type="primary" disabled={disabledtambah} onClick={() => {
                                                            setnewfieldidxtrigger(prev => !prev)
                                                            if (currentfield.data_type === 'dropdown') {
                                                                // setcurrentdropdownidx(idx)
                                                                // setcurrentdropdowntrigger(prev => !prev)
                                                                setfielddata(prev => {
                                                                    var temp = prev
                                                                    temp[idx]["default"] = {
                                                                        default: "-",
                                                                        opsi: currentdropdown
                                                                    }
                                                                    return temp
                                                                })
                                                            }
                                                            else if (currentfield.data_type === 'checkbox') {
                                                                setfielddata(prev => {
                                                                    var temp = prev
                                                                    temp[idx]["default"] = {
                                                                        default: [],
                                                                        opsi: currentdropdown
                                                                    }
                                                                    return temp
                                                                })
                                                            }
                                                            else {
                                                                setcurrentnondropdownidx(idx)
                                                                setcurrentnondropdowntrigger(prev => !prev)
                                                            }
                                                            const temp = fielddata
                                                            temp[idx] = currentfield
                                                            setfielddata(temp)
                                                            setaddedfield(prev => {
                                                                if (prev[idx] === false) {
                                                                    setselectedfieldidxtrigger(prev => !prev)
                                                                    setselectedfieldidx(idx)
                                                                    prev[idx] = true
                                                                    return prev
                                                                }
                                                                else if (typeof (prev[idx]) === 'undefined') {
                                                                    const temp2 = [...prev, true]
                                                                    return temp2
                                                                }
                                                            })
                                                            setdisabledaddfield(false)
                                                            setdisabledsimpan(false)
                                                            setpointevent("")
                                                        }}>Tambah</Button>
                                                    </div>
                                                </Form>
                                            </div>

                                    }
                                </>
                            )
                        })
                    }
                    <div className="w-full flex justify-center mt-5">
                        <Button disabled={disabledaddfield} type="dashed" style={{ width: `80%`, height: `4rem` }} onClick={onClickAddField}>+ Tambah Spesifikasi Asset Type</Button>
                    </div>
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
    const resources = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
        method: `GET`,
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
            sidemenu: "81"
        },
    }
}

export default AssetsCreate