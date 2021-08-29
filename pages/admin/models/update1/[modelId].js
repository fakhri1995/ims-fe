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


const ModelUpdate1 = ({ initProps, dataProfile, sidemenu, modelid }) => {
    //1.Init
    const rt = useRouter()
    var pathArr = rt.pathname.split("/").slice(1)
    pathArr.splice(3, 1)
    pathArr[pathArr.length - 1] = "Ubah Model"
    const [instanceForm] = Form.useForm();
    const { Panel } = Collapse

    //2.usestate
    const [updatedata, setupdatedata] = useState({
        id: "",
        asset_id: "",
        name: "",
        description: "",
        manufacturer_id: "",
        add_columns: [],
        delete_column_ids: [],
        add_models: [],
        delete_model_ids: [],
        model_columns: [],
        model_parts: []
    })
    const [defaultdata, setdefaultdata] = useState({
        id: "",
        asset_id: "",
        name: "",
        description: "",
        manufacturer_id: "",
        add_columns: [],
        delete_column_ids: [],
        add_models: [],
        delete_model_ids: [],
        model_columns: [],
        model_parts: []
    })
    const [assetdata, setassetdata] = useState([])
    const [manufdata, setmanufdata] = useState([])
    const [modelcolumnsdata, setmodelcolumnsdata] = useState([])
    const [addedfield, setaddedfield] = useState([])
    const [currentfield, setcurrentfield] = useState({})
    const [assettypecode, setassettypecode] = useState("")
    const [praloading, setpraloading] = useState(true)
    const [loadingupdate, setloadingupdate] = useState(false)
    const [loadingspec, setloadingspec] = useState(false)
    //trigger
    const [deletefieldtrigger, setdeletefieldtrigger] = useState(false)
    const [deletefieldid, setdeletefieldid] = useState(-1)
    const [deletefieldidx, setdeletefieldidx] = useState(-1)


    //3.onchange


    //4.handler
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
        setloadingupdate(true)
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
                setloadingupdate(false)
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

    //5.useeffect
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

                const temp = res2.data.model_columns.map((doc, idx) => {
                    if (doc.data_type === 'dropdown' || doc.data_type === 'checkbox') {
                        return ({
                            ...doc,
                            default: (doc.default === "") || (doc.default === "-") ? doc.default : JSON.parse(doc.default)
                        })
                    }
                    else {
                        return ({
                            ...doc
                        })
                    }
                })
                const temp2 = {
                    ...res2.data,
                    asset_id: res2.data.asset.code,
                    model_columns: temp,
                    add_columns: [],
                    delete_column_ids: [],
                    add_models: [],
                    delete_model_ids: []
                }
                setupdatedata(temp2)
                setdefaultdata(temp2)
                setmodelcolumnsdata(temp)
                var arr = []
                for (var i = 0; i < res2.data.model_columns.length; i++) {
                    arr.push(true)
                }
                setaddedfield(arr)
                setassettypecode(res2.data.asset_id)
                setpraloading(false)
            })
    }, [])
    //trigger
    useEffect(() => {
        if (deletefieldidx !== -1) {
            // setupdatedata(prev => {
            //     var temp = prev
            //     temp.model_columns[dtypeidx]["data_type"] = dtypevalue
            //     temp.model_columns[dtypeidx]["default"] = {
            //         default: "-",
            //         opsi: ["", ""]
            //     }
            //     return temp
            // })
            setupdatedata(prev => {
                var temp = prev
                temp["model_columns"].splice(deletefieldidx,1)
                return temp
            })
        }
    }, [deletefieldtrigger])

    return (
        <Layout st={st} dataProfile={dataProfile} tok={initProps} sidemenu={sidemenu} pathArr={pathArr}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4" id="createAssetsWrapper">
                <div className=" col-span-1 md:col-span-4 mb-8">
                    <Sticky containerSelectorFocus="#createAgentsWrapper">
                        <div className=" col-span-4 flex justify-between p-2 pt-4 border-t-2 border-b-2 bg-white">
                            <h1 className="font-semibold py-2">Form Ubah Model - {updatedata.name}</h1>
                            <div className="flex space-x-2">
                                {/* <Link href={`/admin/models`}> */}
                                <Button type="default" onClick={() => { console.log(updatedata); console.log(addedfield); console.log(modelcolumnsdata) }}>Batal</Button>
                                {/* </Link> */}
                                <Button type="primary" loading={loadingupdate} onClick={instanceForm.submit}>Simpan</Button>
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
                                <Form form={instanceForm} layout="vertical" onFinish={handleCreateModel} initialValues={updatedata}>
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
                                                treeDefaultExpandAll
                                                onChange={(value, label, extra) => {
                                                    setloadingspec(true)
                                                    fetch(`https://boiling-thicket-46501.herokuapp.com/getAsset?id=${extra.allCheckedNodes[0].node.props.id}`, {
                                                        method: `GET`,
                                                        headers: {
                                                            'Authorization': JSON.parse(initProps)
                                                        }
                                                    })
                                                        .then(res => res.json())
                                                        .then(res2 => {
                                                            const temp = res2.data.asset_columns.map((doc, idx) => {
                                                                if (doc.data_type === 'dropdown' || doc.data_type === 'checkbox') {
                                                                    return ({
                                                                        ...doc,
                                                                        default: (doc.default === "") || (doc.default === "-") ? doc.default : JSON.parse(doc.default)
                                                                    })
                                                                }
                                                                else {
                                                                    return { ...doc }
                                                                }
                                                            })
                                                            const temp2 = {
                                                                ...updatedata,
                                                                asset_id: Number(extra.allCheckedNodes[0].node.props.id),
                                                                model_columns: temp,
                                                            }
                                                            setupdatedata(temp2)
                                                            setdefaultdata(temp2)
                                                            setloadingspec(false)
                                                        })
                                                }}
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
                                            <Input name="name" onChange={(e) => { setupdatedata({ ...updatedata, name: e.target.value }) }} />
                                        </Form.Item>
                                    </div>
                                    <Form.Item name="manufacturer_id" label="Manufacturer"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Manufacturer wajib diisi',
                                            },
                                        ]}>
                                        <Select placeholder="Pilih Manufacturer" onChange={(value) => { setupdatedata({ ...updatedata, manufacturer_id: value }) }} name="manufacturer_id">
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
                                        <Input.TextArea rows={4} name="description" onChange={(e) => { setupdatedata({ ...updatedata, description: e.target.value }) }} />
                                    </Form.Item>
                                    <div className="flex">
                                        <Checkbox style={{ marginRight: `0.5rem` }} onChange={(e) => { setupdatedata({ ...updatedata, required_sn: e.target.checked }) }} checked={updatedata.required_sn} /> Serial Number wajib ada
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
                                        modelcolumnsdata.map((doc, idx) => {
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
                                                                setcurrentfield(doc)
                                                            }}>
                                                                <div className="font-semibold mb-2">
                                                                    {doc.name}
                                                                    {doc.required ? <span className="judulField"></span> : null} <span className="text-gray-400 text-sm">({doc.data_type === "single" ? "Single Textbox" : doc.data_type.charAt(0).toUpperCase() + doc.data_type.slice(1)})</span>
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
                                                                <Form layout="vertical" initialValues={doc}>
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 space-x-2">
                                                                        <Form.Item name="name" label="Nama Field" rules={[
                                                                            {
                                                                                required: true,
                                                                                message: 'Nama Field wajib diisi',
                                                                            },
                                                                        ]}>
                                                                            <Input required name="name" onChange={(e) => {
                                                                                setupdatedata(prev => {
                                                                                    var temp = prev
                                                                                    temp.model_columns[idx]["name"] = e.target.value
                                                                                    return temp
                                                                                })
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
                                                                                setdtypevalue(value)
                                                                                setdtypeidx(idx)
                                                                                setdtypetrigger(prev => !prev)
                                                                            }} name="data_type">
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
                                                                            doc.data_type.toLowerCase() === "dropdown" ?
                                                                                <div className="flex flex-col">
                                                                                    <h1>Default hanya dipilih 1 (satu) dari beberapa opsi dibawah ini</h1>
                                                                                    {
                                                                                        doc.default.opsi.map((docop, idxop) => (
                                                                                            <div className="flex mb-3">
                                                                                                <div className="w-7 flex items-center">
                                                                                                    <Checkbox checked={modelcolumnsdata[idx].default.default === idxop ? true : false} onChange={(e) => {
                                                                                                        if (e.target.checked === true) {
                                                                                                            setupdatedata(prev => {
                                                                                                                var temp = prev
                                                                                                                temp.model_columns[idx]["default"]["default"] = idxop
                                                                                                                return temp
                                                                                                            })
                                                                                                        }
                                                                                                    }}></Checkbox>
                                                                                                </div>
                                                                                                <div className="w-10/12 mr-5">
                                                                                                    <Input style={{ marginRight: `0.5rem` }} defaultValue={docop} placeholder={`Masukkan opsi ke-${idxop + 1}`} onChange={(e) => {
                                                                                                        setupdatedata(prev => {
                                                                                                            var temp = prev
                                                                                                            temp.model_columns[idx]["default"]["opsi"][idxop] = e.target.value
                                                                                                            return temp
                                                                                                        })
                                                                                                    }} />
                                                                                                </div>
                                                                                                <div className="w-1/12 flex justify-around" onClick={() => {
                                                                                                    setupdatedata(prev => {
                                                                                                        var temp = prev
                                                                                                        temp.model_columns[idx]["default"]["opsi"].filter((_, idxfil1) => idxfil1 !== idxop)
                                                                                                        return temp
                                                                                                    })
                                                                                                }}>
                                                                                                    <Button type="danger">-</Button>
                                                                                                </div>
                                                                                            </div>
                                                                                        ))
                                                                                    }
                                                                                    <div className="mx-auto my-3">
                                                                                        <Button onClick={() => {
                                                                                            setupdatedata(prev => {
                                                                                                var temp = prev
                                                                                                temp.model_columns[idx]["default"]["opsi"].push("")
                                                                                                return temp
                                                                                            })
                                                                                        }}>+ Tambah Opsi</Button>
                                                                                    </div>
                                                                                </div>
                                                                                :
                                                                                null
                                                                        }
                                                                        {
                                                                            doc.data_type.toLowerCase() === "checkbox" ?
                                                                                <div className="flex flex-col">
                                                                                    <h1>Default hanya dipilih 1 (satu) dari beberapa opsi dibawah ini</h1>
                                                                                    {
                                                                                        doc.default.opsi.map((docop, idxop) => (
                                                                                            <div className="flex mb-3">
                                                                                                <div className="w-7 flex items-center">
                                                                                                    <Checkbox checked={doc.default.default === idxop ? true : false} onChange={(e) => {
                                                                                                        if (e.target.checked === true) {
                                                                                                            setupdatedata(prev => {
                                                                                                                var temp = prev
                                                                                                                temp.model_columns[idx]["default"]["default"] = idxop
                                                                                                                return temp
                                                                                                            })
                                                                                                        }
                                                                                                    }}></Checkbox>
                                                                                                </div>
                                                                                                <div className="w-10/12 mr-5">
                                                                                                    <Input style={{ marginRight: `0.5rem` }} defaultValue={docop} placeholder={`Masukkan opsi ke-${idxop + 1}`} onChange={(e) => {
                                                                                                        setupdatedata(prev => {
                                                                                                            var temp = prev
                                                                                                            temp.model_columns[idx]["default"]["opsi"][idxop] = e.target.value
                                                                                                            return temp
                                                                                                        })
                                                                                                    }} />
                                                                                                </div>
                                                                                                <div className="w-1/12 flex justify-around" onClick={() => {
                                                                                                    setupdatedata(prev => {
                                                                                                        var temp = prev
                                                                                                        temp.model_columns[idx]["default"]["opsi"].filter((_, idxfil1) => idxfil1 !== idxop)
                                                                                                        return temp
                                                                                                    })
                                                                                                }}>
                                                                                                    <Button type="danger">-</Button>
                                                                                                </div>
                                                                                            </div>
                                                                                        ))
                                                                                    }
                                                                                    <div className="mx-auto my-3">
                                                                                        <Button onClick={() => {
                                                                                            setupdatedata(prev => {
                                                                                                var temp = prev
                                                                                                temp.model_columns[idx]["default"]["opsi"].push("")
                                                                                                return temp
                                                                                            })
                                                                                        }}>+ Tambah Opsi</Button>
                                                                                    </div>
                                                                                </div>
                                                                                :
                                                                                null
                                                                        }
                                                                        {
                                                                            doc.data_type.toLowerCase() === 'number' &&
                                                                            <InputNumber style={{ width: `30%` }} defaultValue={doc.default} placeholder={`Masukkan default ${doc.name}`} onChange={(value) => {
                                                                                // setcurrentfield({ ...currentfield, default: `${value}` })
                                                                                setupdatedata(prev => {
                                                                                    var temp = prev
                                                                                    temp.model_columns[idx]["default"] = value
                                                                                    return temp
                                                                                })
                                                                            }}></InputNumber>
                                                                        }
                                                                        {
                                                                            doc.data_type.toLowerCase() === "paragraph" &&
                                                                            <Input.TextArea rows={4} placeholder={`Masukkan default ${doc.name}`} defaultValue={doc.default} onChange={(e) => {
                                                                                // setcurrentfield({ ...currentfield, default: e.target.value })
                                                                                setupdatedata(prev => {
                                                                                    var temp = prev
                                                                                    temp.model_columns[idx]["default"] = e.target.value
                                                                                    return temp
                                                                                })
                                                                            }}></Input.TextArea>
                                                                        }
                                                                        {
                                                                            doc.data_type.toLowerCase() === "string" &&
                                                                            <Input placeholder={`Masukkan default ${doc.name}`} defaultValue={doc.default} onChange={(e) => {
                                                                                // setcurrentfield({ ...currentfield, default: e.target.value })
                                                                                setupdatedata(prev => {
                                                                                    var temp = prev
                                                                                    temp.model_columns[idx]["default"] = e.target.value
                                                                                    return temp
                                                                                })
                                                                            }}></Input>
                                                                        }
                                                                        {
                                                                            doc.data_type.toLowerCase() === "single" &&
                                                                            <Input placeholder={`Masukkan default ${doc.name}`} defaultValue={doc.default} onChange={(e) => {
                                                                                // setcurrentfield({ ...currentfield, default: e.target.value })
                                                                                setupdatedata(prev => {
                                                                                    var temp = prev
                                                                                    temp.model_columns[idx]["default"] = e.target.value
                                                                                    return temp
                                                                                })
                                                                            }}></Input>
                                                                        }
                                                                        {
                                                                            doc.data_type.toLowerCase() === "date" &&
                                                                            <DatePicker style={{ width: `30%` }} placeholder={`Masukkan default ${doc.name}`} onChange={(value, dateString) => {
                                                                                setupdatedata(prev => {
                                                                                    var temp = prev
                                                                                    temp.model_columns[idx]["default"] = dateString
                                                                                    return temp
                                                                                })
                                                                            }}></DatePicker>
                                                                        }
                                                                    </Form.Item>
                                                                    <hr />
                                                                    <div className="flex mt-4 justify-end">
                                                                        <Popconfirm placement="bottom" title={`Apakah anda yakin ingin menghapus field ${doc.name === "" ? "ini" : doc.name}?`} okText="Ya" cancelText="Tidak" onConfirm={() => {
                                                                            // setfielddata2(prev => prev.filter((_, idxx) => idxx !== idx))
                                                                            // setupdatedata(prev => {
                                                                            //     var temp = prev
                                                                            //     temp.model_columns.filter((_, idxcol) => idxcol !== idx)
                                                                            //     return temp
                                                                            // })
                                                                            if (typeof (doc.id) !== 'undefined' && defaultdata.model_columns.some((docc) => docc.id === doc.id)) {
                                                                                setupdatedata(prev => {
                                                                                    var temp = prev
                                                                                    temp.delete_column_ids.push(doc.id)
                                                                                    return temp
                                                                                })
                                                                            }
                                                                            setaddedfield(prev => {
                                                                                prev.splice(idx, 1)
                                                                                return prev
                                                                            })
                                                                            setdeletefieldidx(idx)
                                                                            setdeletefieldid(doc.id)
                                                                            setdeletefieldtrigger(prev => !prev)
                                                                        }
                                                                        }>
                                                                            <div className="flex items-center mr-4 hover:text-red-500 cursor-pointer">
                                                                                <DeleteOutlined style={{ fontSize: `1.25rem` }} ></DeleteOutlined>
                                                                            </div>
                                                                        </Popconfirm>
                                                                        <div className=" flex items-center mr-4">
                                                                            <Checkbox checked={doc.required} style={{ marginRight: `0.5rem` }} onChange={(e) => {
                                                                                // setcurrentfield({ ...currentfield, required: e.target.checked })
                                                                                setupdatedata(prev => {
                                                                                    var temp = prev
                                                                                    temp.model_columns[idx]["default"] = e.target.checked
                                                                                    return temp
                                                                                })
                                                                            }} /> Required
                                                                    </div>
                                                                        <Button type="primary" onClick={() => {
                                                                            // if (doc.data_type === 'dropdown' || doc.data_type === 'checkbox') {
                                                                            //     setidxdropdowntrigger(idx)
                                                                            //     setvaluedropdowntrigger(prev => !prev)
                                                                            // }
                                                                            // const temp = fielddata2
                                                                            // temp[idx] = currentfield
                                                                            // setfielddata2(temp)
                                                                            if (typeof (doc.id) === 'undefined') {
                                                                                setupdatedata(prev => {
                                                                                    var temp = prev
                                                                                    temp.add_columns.push(updatedata.model_columns[idx])
                                                                                    return temp
                                                                                })
                                                                            }
                                                                            setaddedfield(prev => {
                                                                                var temp = prev
                                                                                temp[idx] = true
                                                                                return temp
                                                                            })
                                                                            // setaddedfieldidx(idx)
                                                                            // setaddedfieldtrigger(prev => !prev)
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
                        <Button type="dashed" style={{ width: `80%`, height: `4rem` }} onClick={() => {
                            setupdatedata(prev => {
                                var temp = prev
                                temp.model_columns.push({
                                    id: "",
                                    asset_id: "",
                                    name: "",
                                    data_type: "",
                                    default: {
                                        default: "-",
                                        opsi: ["", ""]
                                    },
                                    required: false,
                                })
                                return temp
                            })
                            setaddedfield([...addedfield, false])
                            setcurrentfield(
                                {
                                    name: "",
                                    data_type: "",
                                    default: "",
                                    required: false
                                }
                            )
                        }}>+ Tambah Spesifikasi Model</Button>
                    </div>
                </div>
            </div>
        </Layout >
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

export default ModelUpdate1
