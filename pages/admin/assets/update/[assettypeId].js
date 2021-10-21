import Layout from '../../../../components/layout-dashboard'
import { useRouter } from 'next/router'
import httpcookie from 'cookie'
import { DeleteOutlined, CalendarOutlined } from '@ant-design/icons'
import Sticky from 'wil-react-sticky'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Form, Input, notification, Button, TreeSelect, Checkbox, Select, Popconfirm, Spin, Modal, Radio } from 'antd'
import st from '../../../../components/layout-dashboard.module.css'


const AssetUpdate = ({ sidemenu, dataProfile, initProps, assettypeid }) => {
    //1. Init
    const rt = useRouter()
    var pathArr = rt.pathname.split("/").slice(1)
    pathArr.splice(3, 1)
    pathArr[pathArr.length - 1] = "Ubah Asset Type"
    const [instanceForm] = Form.useForm();
    const { idparent } = rt.query

    //useState
    const [displaydata, setdisplaydata] = useState({
        id: "",
        name: "",
        code: "",
        parent: "",
        required_sn: false,
        description: "",
        asset_columns: []
    })
    const [updatedata, setupdatedata] = useState({
        id: Number(assettypeid),
        name: "",
        code: "",
        parent: "",
        required_sn: false,
        description: "",
        update_columns: [],
        add_columns: [],
        delete_column_ids: []
    })
    const [assetdata, setassetdata] = useState([])
    const [fielddata, setfielddata] = useState([])
    const [newfielddata, setnewfielddata] = useState([])
    const [deletefielddata, setdeletefielddata] = useState([])
    const [updatefielddata, setupdatefielddata] = useState([])
    const [currentdropdown, setcurrentdropdown] = useState(["", ""])
    const [currentdropdown2, setcurrentdropdown2] = useState(["", ""])
    const [cdidx, setcdidx] = useState(-1)
    const [cdtrigger, setcdtrigger] = useState(false)
    const [currentdropdownidx, setcurrentdropdownidx] = useState(-1)
    const [currentdropdowntrigger, setcurrentdropdowntrigger] = useState(false)
    const [currentnondropdownidx, setcurrentnondropdownidx] = useState(-1)
    const [currentnondropdowntrigger, setcurrentnondropdowntrigger] = useState(false)
    const [currentfield, setcurrentfield] = useState({
        name: "",
        data_type: "",
        default: "-",
        required: false
    })
    const [addedfield, setaddedfield] = useState([])
    const [selectedfieldidx, setselectedfieldidx] = useState(-1)
    const [selectedfieldidxtrigger, setselectedfieldidxtrigger] = useState(false)
    const [loadingupdate, setloadingupdate] = useState(false)
    const [praloading, setpraloading] = useState(true)
    const [disabledaddfield, setdisabledaddfield] = useState(false)
    const [disabledsimpan, setdisabledsimpan] = useState(false)
    const [disabledtambah, setdisabledtambah] = useState(false)
    const [pointevent, setpointevent] = useState("")
    const [modalubahinduk, setmodalubahinduk] = useState(false)
    const [loadingmodalchild, setloadingmodalchild] = useState(false)
    const [selectedinduk, setselectedinduk] = useState(0)
    const [movedchild, setmovedchild] = useState("")
    const [childassettype, setchildassettype] = useState([])
    const [childvalue, setchildvalue] = useState(Number(assettypeid))
    const [childbound, setchildbound] = useState(0)
    const [childtrigger, setchildtrigger] = useState(false)

    //handle
    const onClickAddField = () => {
        setfielddata([...fielddata, {
            id: -1,
            name: "",
            data_type: "",
            default: "",
            required: false
        }])
        setcurrentfield({
            id: "",
            name: "",
            data_type: "",
            default: "",
            required: false
        })
        setaddedfield([...addedfield, false])
        setcurrentdropdown(["", ""])
        setdisabledaddfield(true)
        setdisabledsimpan(true)
        setdisabledtambah(true)
        setpointevent("pointer-events-none")
    }
    const handleUpdateAsset = () => {
        var t = {}
        for (var prop in updatedata) {
            if (prop === "add_columns") {
                t[prop] = updatedata[prop].map((doc, idx) => {
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
            if (prop === "update_columns") {
                t[prop] = updatedata[prop].map((doc, idx) => {
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
            // if (prop === "code") {
            //     t[prop] = idparent
            // }
            else {
                t[prop] = updatedata[prop]
            }
        }
        setloadingupdate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateAsset`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(t)
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingupdate(false)
                if (res2.success) {
                    notification['success']({
                        message: "Asset Type berhasil diubah",
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/admin/assets/detail/${assettypeid}`)
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
        fetch(`https://boiling-thicket-46501.herokuapp.com/getAsset?id=${assettypeid}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setdisplaydata({
                    ...res2.data,
                    update_columns: [],
                    add_columns: [],
                    delete_column_ids: [],
                    parent: idparent
                })
                setupdatedata({
                    ...res2.data,
                    update_columns: [],
                    add_columns: [],
                    delete_column_ids: [],
                    parent: idparent
                })
                const assetcolmap = res2.data.asset_columns.map((doc, idx) => {
                    return ({
                        id: doc.id,
                        name: doc.name,
                        data_type: doc.data_type,
                        default: doc.default.indexOf("{") !== -1 ? JSON.parse(doc.default) : doc.default,
                        required: doc.required
                    })
                })
                setfielddata(assetcolmap)
                const boolarr = []
                for (var i = 0; i < res2.data.asset_columns.length; i++) {
                    boolarr.push(true)
                }
                setaddedfield(boolarr)
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
            })
    }, [])
    useEffect(() => {
        if (selectedfieldidx !== -1) {
            setaddedfield(prev => {
                prev[selectedfieldidx] = true
                return prev
            })
            setupdatedata({
                ...updatedata,
                add_columns: newfielddata,
                delete_column_ids: deletefielddata,
                update_columns: updatefielddata
            })
            setupdatedata(prev => {
                const temp = prev
                delete temp.asset_columns
                return temp
            })
        }
    }, [selectedfieldidxtrigger])
    useEffect(() => {
        if (currentdropdownidx !== -1) {
            if (currentfield.data_type === 'dropdown') {
                setfielddata(prev => {
                    var temp = prev
                    temp[currentdropdownidx]["default"] = {
                        default: "-",
                        opsi: currentdropdown
                    }
                    return temp
                })
            }
            else if (currentfield.data_type === 'checkbox') {
                setfielddata(prev => {
                    var temp = prev
                    temp[currentdropdownidx]["default"] = {
                        default: [],
                        opsi: currentdropdown
                    }
                    return temp
                })
            }
        }
    }, [currentdropdowntrigger])
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
        if (cdidx !== -1) {
            setcurrentdropdown(prev => {
                return currentdropdown2.filter((doc10, idx10) => idx10 !== cdidx)
            })
            setcurrentdropdown2(prev => prev.filter((doc11, idx11) => idx11 !== cdidx))
        }
    }, [cdtrigger])
    useEffect(() => {
        if (childbound !== 0) {
            setloadingmodalchild(true)
            fetch(`https://boiling-thicket-46501.herokuapp.com/getAssets`, {
                method: `GET`,
                headers: {
                    'Authorization': JSON.parse(initProps),
                }
            })
                .then(res => res.json())
                .then(res2 => {
                    var child = []
                    const searchChild = (dataa) => {
                        for (var i = 0; i < dataa.length; i++) {
                            if (dataa[i]["id"] === Number(childvalue)) {
                                if (dataa[i]["children"]) {
                                    child = dataa[i]["children"]
                                }
                            }
                            else {
                                if (dataa[i]["children"]) {
                                    searchChild(dataa[i]["children"])
                                }
                            }
                        }
                    }
                    searchChild(res2.data)
                    child.length > 0 ? setmodalubahinduk(true) : null
                    setchildassettype(child)
                    setloadingmodalchild(false)
                })
        }
    }, [childtrigger])

    return (
        <Layout tok={initProps} sidemenu={sidemenu} pathArr={pathArr} st={st} dataProfile={dataProfile}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4" id="createAssetsWrapper">
                <div className=" col-span-1 md:col-span-4 mb-8">
                    <Sticky containerSelectorFocus="#createAgentsWrapper">
                        <div className=" col-span-4 flex justify-between p-2 pt-4 border-t-2 border-b-2 bg-white">
                            <h1 className="font-semibold py-2">Form Ubah Asset Type {praloading ? null : `- ${displaydata.name}`}</h1>
                            <div className="flex space-x-2">
                                <Link href={`/admin/assets/detail/${assettypeid}`}>
                                    <Button /*onClick={() => { console.log(updatedata); console.log(displaydata); console.log(currentfield); console.log(currentdropdown) }}*/ type="default">Batal</Button>
                                </Link>
                                <Button type="primary" loading={loadingupdate} onClick={instanceForm.submit} disabled={disabledsimpan}>Simpan</Button>
                            </div>
                        </div>
                    </Sticky>
                </div>
                <div className="col-span-1 md:col-span-4 px-5 mb-8">
                    <div className="shadow-md border p-8 flex flex-col rounded-md">
                        {
                            praloading ?
                                <Spin />
                                :
                                <Form form={instanceForm} layout="vertical" onFinish={handleUpdateAsset} initialValues={updatedata}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 space-x-2">
                                        <Form.Item name="parent" label="Induk Asset Type">
                                            <TreeSelect
                                                style={{ marginRight: `1rem` }}
                                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                                treeData={assetdata}
                                                defaultValue={idparent !== "" ? idparent : "-"}
                                                treeDefaultExpandAll
                                                allowClear
                                                onChange={(value, label, extra) => {
                                                    setchildbound(prev => prev + 1)
                                                    setselectedinduk(extra.allCheckedNodes[0].node.props)
                                                    setchildtrigger(prev => !prev)
                                                }}
                                            />
                                        </Form.Item>
                                        <Form.Item name="name" label="Nama Asset Type"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Nama Asset wajib diisi',
                                                },
                                            ]}>
                                            <Input name="name" onChange={(e) => { setupdatedata({ ...updatedata, name: e.target.value }) }} />
                                        </Form.Item>
                                    </div>
                                    <Form.Item name="description" label="Deskripsi">
                                        <Input.TextArea rows={4} name="description" onChange={(e) => { setupdatedata({ ...updatedata, description: e.target.value }) }} />
                                    </Form.Item>
                                    <div className="flex">
                                        <Checkbox style={{ marginRight: `0.5rem` }} onChange={(e) => { setupdatedata({ ...updatedata, required_sn: e.target.checked }) }} checked={updatedata.required_sn} /> Serial Number wajib ada
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
                                                    {fielddata[idx].required ? <span className="judulField"></span> : null} <span className="text-gray-400">({doc.data_type.charAt(0).toUpperCase() + doc.data_type.slice(1)}{doc.data_type === 'single' && ` Textbox`}{doc.data_type === 'paragraph' && ` Text`})</span>
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
                                                        <Form.Item name="name" label="Nama Spesifikasi" rules={[
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
                                                                                setcdidx(idxx)
                                                                                setcdtrigger(prev => !prev)
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
                                                                                setcdidx(idxx)
                                                                                setcdtrigger(prev => !prev)
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
                                                            if (displaydata.asset_columns.some((docc) => docc.id === doc.id)) {
                                                                setdeletefielddata([...deletefielddata, doc.id])
                                                                setselectedfieldidxtrigger(idx)
                                                                setselectedfieldidx(idx)
                                                            }
                                                            else {
                                                                setnewfielddata(prev => {
                                                                    var temp = prev
                                                                    const idxtemp = temp.map((docc) => docc.name).indexOf(doc.name)
                                                                    temp.splice(idxtemp, 1)
                                                                })
                                                                setselectedfieldidxtrigger(idx)
                                                                setselectedfieldidx(idx)
                                                            }
                                                            setfielddata(prev => prev.filter((_, idxx) => idxx !== idx))
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
                                                            if (displaydata.asset_columns.map(docc => docc.id).includes(doc.id) === false) {
                                                                if (updatedata.add_columns.map(docname => docname.name).indexOf(doc.name) === -1) {
                                                                    if (currentfield.data_type === 'dropdown') {
                                                                        const newwdd = {
                                                                            ...currentfield,
                                                                            default: JSON.stringify({
                                                                                default: "-",
                                                                                opsi: currentdropdown
                                                                            })
                                                                        }
                                                                        setnewfielddata([...newfielddata, newwdd])
                                                                    }
                                                                    else if (currentfield.data_type === 'checkbox') {
                                                                        const newwcb = {
                                                                            ...currentfield,
                                                                            default: JSON.stringify({
                                                                                default: [],
                                                                                opsi: currentdropdown
                                                                            })
                                                                        }
                                                                        setnewfielddata([...newfielddata, newwcb])
                                                                    }
                                                                    else {
                                                                        setnewfielddata([...newfielddata, currentfield])
                                                                    }
                                                                }
                                                                else {
                                                                    setnewfielddata(prev => {
                                                                        var temp = prev
                                                                        const idxnewfield = updatedata.add_columns.map(docname => docname.name).indexOf(doc.name)
                                                                        if (currentfield.data_type === 'dropdown') {
                                                                            temp[idxnewfield] = {
                                                                                ...currentfield,
                                                                                default: JSON.stringify({
                                                                                    default: "-",
                                                                                    opsi: currentdropdown
                                                                                })
                                                                            }
                                                                        }
                                                                        else if (currentfield.data_type === 'checkbox') {
                                                                            temp[idxnewfield] = {
                                                                                ...currentfield,
                                                                                default: JSON.stringify({
                                                                                    default: [],
                                                                                    opsi: currentdropdown
                                                                                })
                                                                            }
                                                                        }
                                                                        else {
                                                                            temp[idxnewfield] = currentfield
                                                                        }
                                                                        return temp
                                                                    })
                                                                }
                                                            }
                                                            else {
                                                                const idxupdatefield = updatefielddata.map(docv => docv.id).indexOf(doc.id)
                                                                if (idxupdatefield === -1) {
                                                                    if (currentfield.data_type === "dropdown") {
                                                                        setupdatefielddata([...updatefielddata, {
                                                                            ...currentfield,
                                                                            default: JSON.stringify({
                                                                                default: "-",
                                                                                opsi: currentdropdown
                                                                            })
                                                                        }])
                                                                    }
                                                                    else if (currentfield.data_type === 'checkbox') {
                                                                        setupdatefielddata([...updatefielddata, {
                                                                            ...currentfield,
                                                                            default: JSON.stringify({
                                                                                default: [],
                                                                                opsi: currentdropdown
                                                                            })
                                                                        }])
                                                                    }
                                                                    else {
                                                                        setupdatefielddata([...updatefielddata, currentfield])
                                                                    }
                                                                }
                                                                else {
                                                                    setupdatefielddata(prev => {
                                                                        var temp = prev
                                                                        if (currentfield.data_type === "dropdown") {
                                                                            temp[idxupdatefield] = {
                                                                                ...currentfield,
                                                                                default: JSON.stringify({
                                                                                    default: "-",
                                                                                    opsi: currentdropdown
                                                                                })
                                                                            }
                                                                        }
                                                                        else if (currentfield.data_type === 'checkbox') {
                                                                            temp[idxupdatefield] = {
                                                                                ...currentfield,
                                                                                default: JSON.stringify({
                                                                                    default: [],
                                                                                    opsi: currentdropdown
                                                                                })
                                                                            }
                                                                        }
                                                                        else {
                                                                            temp[idxupdatefield] = {
                                                                                ...currentfield,
                                                                                default: "-"
                                                                            }
                                                                        }
                                                                        return temp
                                                                    })
                                                                }
                                                            }
                                                            if (currentfield.data_type === 'dropdown' || currentfield.data_type === 'checkbox') {
                                                                setcurrentdropdownidx(idx)
                                                                setcurrentdropdowntrigger(prev => !prev)
                                                            }
                                                            else {
                                                                setcurrentnondropdownidx(idx)
                                                                setcurrentnondropdowntrigger(prev => !prev)
                                                            }
                                                            const temp = fielddata
                                                            temp[idx] = currentfield
                                                            setfielddata(temp)
                                                            if (addedfield[idx] === false) {
                                                                setselectedfieldidxtrigger(prev => !prev)
                                                                setselectedfieldidx(idx)
                                                            }
                                                            else if (typeof (addedfield[idx] === 'undefined')) {
                                                                setaddedfield([...addedfield, true])
                                                            }
                                                            // setaddedfield(prev => {
                                                            //     if (prev[idx] === false) {
                                                            //         console.log("sini1")
                                                            //         setselectedfieldidxtrigger(idx)
                                                            //         setselectedfieldidx(idx)
                                                            //         prev[idx] = true
                                                            //         return prev
                                                            //     }
                                                            //     else if (typeof (prev[idx]) === 'undefined') {
                                                            //         console.log("situ2")
                                                            //         const temp2 = [...prev, true]
                                                            //         return temp2
                                                            //     }
                                                            // })
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
                        <Button type="dashed" disabled={disabledaddfield} style={{ width: `80%`, height: `4rem` }} onClick={onClickAddField}>+ Tambah Spesifikasi Asset Type</Button>
                    </div>
                </div>
            </div>
            <Modal
                title={
                    <strong>Konfirmasi Ubah Induk Asset Type</strong>
                }
                visible={modalubahinduk}
                okText={"Simpan"}
                cancelText={"Batal"}
                onCancel={() => { setmodalubahinduk(false) }}
                width={600}
                onOk={() => { setchildvalue(selectedinduk.id); setmodalubahinduk(false) }}
            >
                <div className="flex flex-col p-5">
                    <div id="step1" className="rounded border bg-gray-50 p-5 flex flex-col">
                        <div className="mb-2">
                            <h5 className=" text-xs font-semibold">Berikut adalah child dari asset type "{displaydata.name}":</h5>
                            <ul>
                                {childassettype.length === 0 ?
                                    <>
                                        -
                                    </>
                                    :
                                    <>
                                        {loadingmodalchild ?
                                            <><Spin size="small" /></>
                                            :
                                            childassettype.map((doc, idx) => {
                                                return (
                                                    <li className="text-xs">- {doc.title}</li>
                                                )
                                            })
                                        }
                                    </>
                                }
                            </ul>
                        </div>
                        <div className="mb-2">
                            <h5 className=" text-xs font-semibold">Apakah anda ingin membawa seluruh Child dari asset type "{displaydata.name}"?</h5>
                            <Radio.Group className="step1radio" onChange={(e) => {
                                if (e.target.value === true) {
                                    setmovedchild(true)
                                }
                                else {
                                    setmovedchild(null)
                                }
                            }}>
                                <div className="flex flex-col">
                                    <Radio value={true}>Ya</Radio>
                                    <Radio value={false}>Tidak, saya ingin seluruh child dari asset type "{displaydata.name}" dihapus</Radio>
                                </div>
                            </Radio.Group>
                        </div>
                    </div>
                </div>
            </Modal>
        </Layout>
    )
}

export async function getServerSideProps({ req, params }) {
    var initProps = {};
    const assettypeid = params.assettypeId
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
            sidemenu: "451",
            assettypeid
        },
    }
}

export default AssetUpdate
