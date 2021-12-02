import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import httpcookie from 'cookie'
import { EditOutlined } from '@ant-design/icons'
import Sticky from 'wil-react-sticky'
import Link from 'next/link'
import { Button, notification, Form, Input, Checkbox, Modal } from 'antd'
import Layout from '../../../../components/layout-dashboard'
import st from '../../../../components/layout-dashboard.module.css'

function AssetsNew({ initProps, dataProfile, dataAssetsList, sidemenu, assetsTitle, assetsParent, dataInvColumns }) {
    const rt = useRouter()
    var { create } = rt.query
    const pathArr = rt.pathname.split("/").slice(1)
    pathArr[pathArr.length - 1] = assetsTitle
    const [datawhole, setdatawhole] = useState(dataInvColumns.data.inventory_columns_turunan)
    const [datatetap, setdatatetap] = useState(dataInvColumns.data.inventory_columns_turunan)
    const [datacreate, setdatacreate] = useState([])
    const [dataedit, setdataedit] = useState(dataInvColumns.data.inventory_columns_turunan.map((doc, idx) => {
        return ({
            id: doc.id,
            name: doc.name,
            data_type: doc.data_type,
            default: doc.default,
            required: doc.required,
            unique: doc.unique,
        })
    }))
    const [datadelete, setdatadelete] = useState([])
    const [idxx, setidxx] = useState(0)
    const [existedln, setexistedln] = useState(dataInvColumns.data.inventory_columns_turunan.length)

    const [editasset, setEditasset] = useState(false)
    const [modalfieldprops, setModalfieldprops] = useState(false)
    const [modalupdatefieldprops, setModalupdatefieldprops] = useState(false)
    const [loadingnewfield, setloadingnewfield] = useState(false)
    const [loadingupdatefield, setloadingupdatefield] = useState(false)
    const [loadingwhole, setloadingwhole] = useState(false)
    const [loadingupdateasset, setloadingupdateasset] = useState(false)
    const [recordfield, setRecordfield] = useState({})
    const [idfield, setIdfield] = useState("")
    function flattenArr(dataassets) {
        const result = []
        dataassets.forEach((item, idx) => {
            const { id, title, key, value, children } = item
            result.push({
                id: id,
                title: title,
                key: key,
                value: value
            })
            if (children) {
                result.push(...flattenArr(children))
            }
        })
        return result
    }
    const flattenDataAsset = flattenArr(dataAssetsList.data)
    var dataAssetDetail = {}
    var dataAssetParentDetail = {}
    flattenDataAsset.forEach(item => {
        if (item.title == assetsTitle) {
            dataAssetDetail = item
        }
    })
    flattenDataAsset.forEach(item => {
        if (item.key == assetsParent) {
            dataAssetParentDetail = item
        }
    })
    useEffect(() => {
        if (create) {
            notification['success']({
                message: `Asset ${dataAssetDetail.title} berhasil ditambahkan`,
                duration: 4
            })
        }
    }, [])

    //Asset types properties
    const [dataupdate, setDataupdate] = useState({
        id: dataAssetDetail.id,
        name: '',
        code: dataAssetDetail.key,
    })
    const onChangeUpdateAssets = (e) => {
        setDataupdate({
            ...dataupdate,
            [e.target.name]: e.target.value
        })
    }

    //Dynamic field (untuk data baru)
    const [datafield, setDatafield] = useState({
        // asset_id: dataAssetDetail.id,
        name: '',
        data_type: '',
        default: '',
        required: false,
        unique: false
    })

    //onChange handler
    const onChangeUpdateField = (e) => {
        setDatafield({
            ...datafield,
            [e.target.name]: e.target.value
        })
    }
    const onChangeCheckboxRequired = (e) => {
        setDatafield({
            ...datafield,
            required: e.target.checked
        })
    }
    const onChangeCheckboxUnique = (e) => {
        setDatafield({
            ...datafield,
            unique: e.target.checked
        })
    }

    const onChangeUpdateField2 = (e) => {
        setRecordfield({
            ...recordfield,
            [e.target.name]: e.target.value
        })
    }
    const onChangeCheckboxRequired2 = (e) => {
        setRecordfield({
            ...recordfield,
            required: e.target.checked
        })
    }
    const onChangeCheckboxUnique2 = (e) => {
        setRecordfield({
            ...recordfield,
            unique: e.target.checked
        })
    }

    const handleUpdateAssets = () => {
        setloadingupdateasset(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateAsset`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataupdate)
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingupdateasset(false)
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/admin/assets/${dataupdate.name}?parent=${dataAssetParentDetail.key}`)
                    }, 500)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3
                    })
                }
            })
    }
    const handleAddField = () => {
        setdatacreate([
            ...datacreate,
            datafield
        ])
        setDatafield({
            name: '',
            data_type: '',
            default: '',
            required: false,
            unique: false
        })
        setdatawhole([
            ...datawhole,
            datafield
        ])
        setModalfieldprops(false)
        // fetch(`https://boiling-thicket-46501.herokuapp.com/addInventoryColumn`, {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': JSON.parse(initProps),
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(datafield)
        // })
        //     .then(res => res.json())
        //     .then(res2 => {
        //         setloadingnewfield(false)
        //         if (res2.success) {
        //             setModalfieldprops(false)
        //             notification['success']({
        //                 message: res2.message,
        //                 duration: 3
        //             })
        //             setTimeout(() => {
        //                 rt.push(`/assets/update/${assetsTitle}?originPath=Admin&parent=${assetsParent}`)
        //             }, 500)
        //         }
        //         else if (!res2.success) {
        //             notification['error']({
        //                 message: res2.message.errorInfo.status_detail,
        //                 duration: 3
        //             })
        //         }
        //     })
    }

    const handleUpdateField = (index) => {
        if (datawhole.length <= existedln) {
            if (datatetap.some(dataa => dataa['id'] === recordfield.id)) {
                setdataedit(prev => prev.map((doc, idx) => {
                    if (index === idx) {
                        return ({
                            id: doc.id,
                            name: recordfield.name,
                            data_type: recordfield.data_type,
                            default: recordfield.default,
                            required: recordfield.required,
                            unique: recordfield.unique,
                        })
                    }
                    else {
                        return doc
                    }
                }))
            }
            else {
                setdatacreate(prev => prev.map((doc, idx) => {
                    if (doc.name === recordfield.name) {
                        return ({
                            name: recordfield.name,
                            data_type: recordfield.data_type,
                            default: recordfield.default,
                            required: recordfield.required,
                            unique: recordfield.unique,
                        })
                    }
                }))
            }
        }
        else {
            if (datatetap.some(dataaa => dataaa['id'] === recordfield.id)) {
                setdataedit(prev => prev.map((doc, idx) => {
                    if (doc.id === recordfield.id) {
                        return ({
                            id: doc.id,
                            name: recordfield.name,
                            data_type: recordfield.data_type,
                            default: recordfield.default,
                            required: recordfield.required,
                            unique: recordfield.unique,
                        })
                    }
                    else {
                        return doc
                    }
                }))
            }
            else {
                console.log("masuk >: " + index)
                var idxxx = index - existedln
                setdatacreate(prev => prev.map((doc, idx) => {
                    if (idx === idxxx) {
                        return ({
                            name: recordfield.name,
                            data_type: recordfield.data_type,
                            default: recordfield.default,
                            required: recordfield.required,
                            unique: recordfield.unique,
                        })
                    }
                }))
            }
        }
        var datawholee = datawhole
        datawholee[index] = {
            id: recordfield.id,
            asset_id: dataAssetDetail.id,
            name: recordfield.name,
            data_type: recordfield.data_type,
            default: recordfield.default,
            required: recordfield.required,
            unique: recordfield.unique,
            deleted_at: null
        }
        setdatawhole(datawholee)
        setloadingupdatefield(false)
        setModalupdatefieldprops(false)
        // setloadingupdatefield(true)
        // fetch(`https://boiling-thicket-46501.herokuapp.com/updateInventoryColumn`, {
        //     method: 'PUT',
        //     headers: {
        //         'Authorization': JSON.parse(initProps),
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(recordfield)
        // })
        //     .then(res => res.json())
        //     .then(res2 => {
        //         setloadingupdatefield(false)
        //         if (res2.success) {
        //             setModalupdatefieldprops(false)
        //             notification['success']({
        //                 message: res2.message,
        //                 duration: 3
        //             })
        //             setTimeout(() => {
        //                 rt.push(`/assets/update/${assetsTitle}?originPath=Admin&parent=${assetsParent}`)
        //             }, 500)
        //         }
        //         else if (!res2.success) {
        //             notification['error']({
        //                 message: res2.message.errorInfo.status_detail,
        //                 duration: 3
        //             })
        //         }
        //     })
    }

    const handleDeleteField = (index) => {
        console.log(index)
        if (datawhole.length <= existedln) {
            if (datatetap.some(dataa => dataa['id'] === recordfield.id)) {
                setdatadelete([
                    ...datadelete,
                    {
                        id: recordfield.id
                    }
                ])
                setdataedit(prev => prev.filter((doc, idx) => {
                    return doc.id !== recordfield.id
                }))
            }
            else {
                setdatacreate(prev => prev.filter((doc, idx) => {
                    return recordfield.name !== doc.name
                }))
            }
        }
        else {
            if (datatetap.some(dataaa => dataaa['id'] === recordfield.id)) {
                setdatadelete([
                    ...datadelete,
                    {
                        id: recordfield.id
                    }
                ])
                setdataedit(prev => prev.filter((doc, idx) => {
                    return doc.id !== recordfield.id
                }))
            }
            else {
                var idxxx = index - existedln
                setdatacreate(prev => prev.filter((doc, idx) => {
                    return idxxx !== idx
                }))
            }
        }
        var indeks = index
        setdatawhole(prev => prev.filter((doc, idx) => {
            return indeks !== idx
        }))
        setModalupdatefieldprops(false)
        // fetch(`https://boiling-thicket-46501.herokuapp.com/deleteInventoryColumn`, {
        //     method: 'DELETE',
        //     headers: {
        //         'Authorization': JSON.parse(initProps),
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         id: recordfield.id
        //     })
        // })
        //     .then(res => res.json())
        //     .then(res2 => {
        //         if (res2.success) {
        //             setModalupdatefieldprops(false)
        //             notification['success']({
        //                 message: res2.message,
        //                 duration: 3
        //             })
        //             setTimeout(() => {
        //                 rt.push(`/assets/update/${assetsTitle}?originPath=Admin&parent=${assetsParent}`)
        //             }, 500)
        //         }
        //         else if (!res2.success) {
        //             notification['error']({
        //                 message: res2.message.errorInfo.status_detail,
        //                 duration: 3
        //             })
        //         }
        //     })
    }
    const handlingWhole = () => {
        console.log("isi whole: " + datawhole[datawhole.length - 1].name)
        console.log("isi datacreate: " + datacreate.length)
        console.log("dataedit: " + dataedit.length)
        console.log("isi delete: " + datadelete.length)
        setloadingwhole(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/cudInventoryColumn`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                asset_id: dataAssetDetail.id,
                add_inventory_columns: datacreate,
                update_inventory_columns: dataedit,
                delete_inventory_columns: datadelete
            })
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingwhole(false)
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        setdatacreate([])
                        setdataedit([])
                        setdatadelete([])
                        // if (process.env.NODE_ENV == "development") {
                        //     window.location.href = `http://localhost:3000/admin/assets/${assetsTitle}?parent=${assetsParent}`
                        // }
                        // else if (process.env.NODE_ENV == "production") {
                        //     window.location.href = `https://migsys.herokuapp.com/admin/assets/${assetsTitle}?parent=${assetsParent}`
                        // }
                        // rt.push(`/admin/assets/${assetsTitle}?parent=${assetsParent}`)
                        rt.push(`/admin/assets`)
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



    const onChangeDragStart = (e) => {
        e.dataTransfer.setData("idField", e.target.id);
    }
    const onChangeDrop = (e) => {
        e.preventDefault()
        var id = e.dataTransfer.getData("idField");
        setIdfield(id)
        setDatafield({
            ...datafield,
            data_type: id
        })
        setModalfieldprops(true)
    }
    const onChangeDragoverDrop = (e) => {
        e.preventDefault()
    }
    return (
        <Layout tok={initProps} pathArr={pathArr} dataProfile={dataProfile} dataAssetsList={dataAssetsList} sidemenu={sidemenu} st={st}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
                <div className=" col-span-1 md:col-span-3 flex flex-col" id="formAgentsWrapper">
                    <Sticky containerSelectorFocus="#formAgentsWrapper">
                        <div className="flex justify-between p-4 border-t-2 border-b-2 bg-white mb-8">
                            <h1 className="font-semibold py-2">{assetsTitle}</h1>
                            <div className="flex space-x-2">
                                <Link href={`/admin/assets`}>
                                    <Button type="default">Cancel</Button>
                                </Link>
                                <Button type="primary" loading={loadingwhole} onClick={handlingWhole}>Save</Button>
                            </div>
                        </div>
                    </Sticky>
                    <div className="p-4 mb-1">
                        {
                            editasset ?
                                <div className="flex">
                                    <Form layout="horizontal" onFinish={handleUpdateAssets}>
                                        <div className="grid grid-cols-1 md:grid-cols-3">
                                            <div className="flex flex-col mx-3">
                                                <h1 className="text-sm">Nama:</h1>
                                                <Input onChange={onChangeUpdateAssets} name="name" defaultValue={assetsTitle} allowClear required />
                                            </div>
                                            <div className="flex flex-col mx-3">
                                                <h1 className="text-sm">Deskripsi:</h1>
                                                <Input name="description" allowClear />
                                            </div>
                                            <div className="flex pt-7">
                                                <Button htmlType="submit" type="primary" size="middle" style={{ marginRight: `1rem` }} loading={loadingupdateasset}>Perbarui</Button>
                                                <Button onClick={() => { setEditasset(false) }} type="default" size="middle">Batalkan</Button>
                                                {/* <button type="submit" className=" bg-gray-700 hover:bg-gray-800 border text-white px-3 w-20 rounded-md mr-5">Save</button> */}
                                                {/* <button className=" bg-white border hover:bg-gray-200 border-gray-300 text-black px-3 rounded-md" onClick={() => { setEditasset(false) }}>Back</button> */}
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                                :
                                <div className="flex">
                                    <div className="w-auto text-black mr-2 pt-2">{assetsTitle}</div>
                                    <div className=" text-center p-1 w-10 h-10 rounded cursor-pointer hover:bg-gray-300" onClick={() => { setEditasset(true) }}><EditOutlined /></div>
                                </div>
                        }
                    </div>
                    <div className="p-4 mb-4">
                        <div id="dropWrapper" className="w-full h-auto p-5 border border-dashed border-opacity-20 border-black" onDrop={(e) => { onChangeDrop(e) }} onDragOver={(e) => { onChangeDragoverDrop(e) }}>
                            <div id="dropAreaTitle" className="h-auto w-full p-2 bg-primary text-white mb-2 flex flex-col">{dataAssetDetail.title} Properties</div>
                            {
                                datawhole.length === 0 ?
                                    <div id="dropArea" className="h-32 flex justify-center items-center">
                                        <div className="text-gray-300 text-base">Drag and Drop the custom field to build your own custom Form</div>
                                    </div>
                                    :
                                    <>
                                        {
                                            datawhole.map((doc, idx) => {
                                                return (
                                                    <div key={idx} className="cursor-pointer p-3" onClick={() => {
                                                        setModalupdatefieldprops(true);
                                                        setRecordfield({
                                                            id: doc.id,
                                                            name: doc.name,
                                                            data_type: doc.data_type,
                                                            default: doc.default,
                                                            required: doc.required,
                                                            unique: doc.unique
                                                        });
                                                        setidxx(idx)
                                                    }}>
                                                        <h1 className="text-sm">{doc.name}</h1>
                                                        <div className="w-full h-10 rounded-md border-2 border-gray-400 text-gray-500 p-2">Tipe data: {doc.data_type}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-span-1 md:col-span-1 hidden md:flex flex-col space-y-4 p-4">
                    <div className="font-semibold text-base">Add Custom Field</div>
                    <p className="font-normal text-sm">
                        Drag and drop any field type into the "Asset Type Field" form, to add a new custom field
                    </p>
                    <div id="dragItem" className="grid grid-cols-2 md:grid-cols-2 space-x-1 space-y-1">
                        <div id="text" className="text-center pt-4 border rounded-md h-16 text-xs cursor-pointer hover:shadow-md" onDragStart={(e) => { onChangeDragStart(e) }} draggable>Text</div>
                        <div id="number" className="text-center pt-4 border rounded-md h-16 text-xs cursor-pointer hover:shadow-md" onDragStart={(e) => { onChangeDragStart(e) }} draggable>Number</div>
                        <div id="decimal" className="text-center pt-4 border rounded-md h-16 text-xs cursor-pointer hover:shadow-md" onDragStart={(e) => { onChangeDragStart(e) }} draggable>Decimal</div>
                        <div id="textarea" className="text-center pt-4 border rounded-md h-16 text-xs cursor-pointer hover:shadow-md" onDragStart={(e) => { onChangeDragStart(e) }} draggable>TextArea</div>
                        <div id="checkbox" className="text-center pt-4 border rounded-md h-16 text-xs cursor-pointer hover:shadow-md" onDragStart={(e) => { onChangeDragStart(e) }} draggable>Checkbox</div>
                        <div id="select" className="text-center pt-4 border rounded-md h-16 text-xs cursor-pointer hover:shadow-md" onDragStart={(e) => { onChangeDragStart(e) }} draggable>Select</div>
                        <div id="tree" className="text-center pt-4 border rounded-md h-16 text-xs cursor-pointer hover:shadow-md" onDragStart={(e) => { onChangeDragStart(e) }} draggable>Tree</div>
                        <div id="date" className="text-center pt-4 border rounded-md h-16 text-xs cursor-pointer hover:shadow-md" onDragStart={(e) => { onChangeDragStart(e) }} draggable>Date</div>
                    </div>
                    <Modal
                        title={`Field properties`}
                        visible={modalfieldprops}
                        onCancel={() => { setModalfieldprops(false) }}
                        maskClosable={false}
                        footer={null}
                        style={{ top: `3rem` }}
                        width={800}
                        destroyOnClose={true}
                    >
                        <>
                            <div className="grid grid-cols-1 mb-2">
                                <div className="flex flex-col my-2">
                                    <h1 className="text-sm">Nama Field:</h1>
                                    <Input name="name" allowClear onChange={onChangeUpdateField} required />
                                </div>
                                <div className="flex flex-col my-2">
                                    <h1 className="text-sm">Default:</h1>
                                    {datafield.data_type === "text" && <Input name="default" allowClear onChange={onChangeUpdateField} />}
                                    {datafield.data_type === "number" && <input type="number" name="default" allowClear onChange={onChangeUpdateField} />}
                                    {datafield.data_type === "decimal" && <input type="number" step="0.01" name="default" allowClear onChange={onChangeUpdateField} />}
                                    {datafield.data_type === "textarea" && <Input.TextArea name="default" allowClear onChange={onChangeUpdateField} />}
                                    {datafield.data_type === "checkbox" && <div><input type="checkbox" name="default" allowClear onChange={onChangeUpdateField} /> {datafield.name}</div>}
                                    {datafield.data_type === "select" && <Input name="default" allowClear onChange={onChangeUpdateField} placeholder="Pisahkan dengan ';' untuk banyak pilihan" />}
                                    {datafield.data_type === "tree" && <Input name="default" allowClear onChange={onChangeUpdateField} />}
                                    {datafield.data_type === "date" && <input type="date" name="default" allowClear onChange={onChangeUpdateField} />}
                                </div>
                                <div className="flex">
                                    <div className="flex flex-col my-2 mr-3">
                                        <h1 className="text-sm">Required:</h1>
                                        <Checkbox name="required" onChange={onChangeCheckboxRequired} />
                                    </div>
                                    <div className="flex flex-col my-2">
                                        <h1 className="text-sm">Unique:</h1>
                                        <Checkbox name="unique" onChange={onChangeCheckboxUnique} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <div className="flex">
                                    <Button type="default" size="middle" style={{ marginRight: `1rem` }} onClick={() => { setModalfieldprops(false) }}>Batalkan</Button>
                                    {/* <button className=" bg-gray-800 w-auto h-auto py-1 px-3 text-white rounded-md hover:bg-gray-900 mx-3" onClick={handleAddField}>Simpan</button> */}
                                    <Button type="primary" size="middle" onClick={handleAddField} loading={loadingnewfield}>Simpan</Button>
                                    {/* <button className="bg-white w-auto h-auto py-1 px-3 text-gray-800 rounded-md border border-gray-700" onClick={() => { setModalfieldprops(false) }}>Cancel</button> */}
                                </div>
                            </div>
                        </>
                    </Modal>
                    <Modal
                        title={`Update Field properties`}
                        visible={modalupdatefieldprops}
                        onCancel={() => { setModalupdatefieldprops(false) }}
                        maskClosable={false}
                        footer={null}
                        style={{ top: `3rem` }}
                        width={800}
                        destroyOnClose={true}
                    >
                        <>
                            <div className="grid grid-cols-1 mb-2">
                                <div className="flex flex-col my-2">
                                    <h1 className="text-sm">Nama Field:</h1>
                                    <Input name="name" allowClear onChange={onChangeUpdateField2} defaultValue={recordfield.name} />
                                </div>
                                <div className="flex flex-col my-2">
                                    <h1 className="text-sm">Default:</h1>
                                    {recordfield.data_type === "text" && <Input name="default" allowClear onChange={onChangeUpdateField2} defaultValue={recordfield.default} />}
                                    {recordfield.data_type === "number" && <input type="number" name="default" allowClear onChange={onChangeUpdateField2} defaultValue={recordfield.default} />}
                                    {recordfield.data_type === "decimal" && <input type="number" step="0.01" name="default" allowClear onChange={onChangeUpdateField2} defaultValue={recordfield.default} />}
                                    {recordfield.data_type === "textarea" && <Input.TextArea step="" name="default" allowClear onChange={onChangeUpdateField2} defaultValue={recordfield.default} />}
                                    {recordfield.data_type === "checkbox" && <div><input type="checkbox" name="default" allowClear onChange={onChangeUpdateField2} defaultValue={recordfield.default} /> {recordfield.name}</div>}
                                    {recordfield.data_type === "select" && <Input name="default" allowClear onChange={onChangeUpdateField2} defaultValue={recordfield.default} />}
                                    {recordfield.data_type === "tree" && <Input name="default" allowClear onChange={onChangeUpdateField2} defaultValue={recordfield.default} />}
                                    {recordfield.data_type === "date" && <input type="date" name="default" allowClear onChange={onChangeUpdateField2} defaultValue={recordfield.default} />}
                                </div>
                                <div className="flex">
                                    <div className="flex flex-col my-2 mr-3">
                                        <h1 className="text-sm">Required:</h1>
                                        <Checkbox name="required" onChange={onChangeCheckboxRequired2} checked={recordfield.required} />
                                    </div>
                                    <div className="flex flex-col my-2">
                                        <h1 className="text-sm">Unique:</h1>
                                        <Checkbox name="unique" onChange={onChangeCheckboxUnique2} checked={recordfield.unique} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <button className="bg-white w-auto h-auto py-1 px-3 hover:text-blue-500 hover:border-blue-500 text-gray-800 rounded-sm border border-gray-400" onClick={() => { handleDeleteField(idxx) }}>Delete Field</button>
                                <div className="flex">
                                    <Button type="default" size="middle" style={{ marginRight: `1rem` }} onClick={() => { setModalupdatefieldprops(false) }}>Batalkan</Button>
                                    <Button type="primary" size="middle" onClick={() => { handleUpdateField(idxx) }} loading={loadingupdatefield}>Perbarui</Button>
                                    {/* <button className=" bg-gray-800 w-auto h-auto py-1 px-3 text-white rounded-md hover:bg-gray-900 mx-3" onClick={handleUpdateField}>Simpan</button>
                                    <button className="bg-white w-auto h-auto py-1 px-3 text-gray-800 rounded-md border border-gray-700" onClick={() => { setModalupdatefieldprops(false) }}>Cancel</button> */}
                                </div>
                            </div>
                        </>
                    </Modal>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, query, params }) {
    var initProps = {};
    const assetsTitle = params.title
    const assetsParent = query.parent
    if (req && req.headers) {
        const cookies = req.headers.cookie;
        if (!cookies) {
            res.writeHead(302, { Location: '/login' })
            res.end()
        }
        if (typeof cookies === 'string') {
            const cookiesJSON = httpcookie.parse(cookies);
            initProps = cookiesJSON.token
        }
    }
    const resources = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjson = await resources.json()
    const dataProfile = resjson

    const resourcesGA = await fetch(`https://boiling-thicket-46501.herokuapp.com/getAssets`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps),
        }
    })
    const resjsonGA = await resourcesGA.json()
    const dataAssetsList = resjsonGA

    function flattenArr(dataassets) {
        const result = []
        dataassets.forEach((item, idx) => {
            const { id, title, key, value, children } = item
            result.push({
                id: id,
                title: title,
                key: key,
                value: value
            })
            if (children) {
                result.push(...flattenArr(children))
            }
        })
        return result
    }
    const flattenDataAsset = flattenArr(dataAssetsList.data)
    var dataAssetDetail = {}
    flattenDataAsset.forEach(item => {
        if (item.title == assetsTitle) {
            dataAssetDetail = item
        }
    })

    const resourcesGIC = await fetch(`https://boiling-thicket-46501.herokuapp.com/getInventoryColumns?id=${dataAssetDetail.id}`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps),
        }
    })
    const resjsonGIC = await resourcesGIC.json()
    const dataInvColumns = resjsonGIC

    return {
        props: {
            initProps,
            dataProfile,
            dataAssetsList,
            sidemenu: "4",
            assetsTitle,
            assetsParent,
            dataInvColumns
        },
    }
}

export default AssetsNew


                   // document.getElementById('dropWrapper').classList.remove("border")
                    // document.getElementById('dropWrapper').classList.remove("border-dashed")
                    // document.getElementById('dropWrapper').classList.remove("border-opacity-20")
                    // document.getElementById('dropWrapper').classList.remove("border-black")
                    // var titleField = <></>
                    // var inputField = <></>
                    // if (idfield === "text") {
                    //     titleField = document.createElement('h1')
                    //     titleField.className = "text-sm"
                    //     titleField.innerHTML = "Text"
                    //     inputField = document.createElement('div')
                    //     inputField.className = "w-full h-10 rounded-md border-2 text-gray-400 p-2"
                    // }
                    // else if (idfield === "number") {
                    //     titleField = document.createElement('h1')
                    //     titleField.className = "text-sm"
                    //     titleField.innerHTML = "Number"
                    //     inputField = document.createElement('div')
                    //     inputField.className = "w-full h-10 rounded-md border-2 text-gray-400 p-2"
                    //     inputField.innerHTML = "1000000"
                    // }
                    // else if (idfield === "textarea") {
                    //     titleField = document.createElement('h1')
                    //     titleField.className = "text-sm"
                    //     titleField.innerHTML = "Text Area"
                    //     inputField = document.createElement('div')
                    //     inputField.className = "w-full h-28 rounded-md border-2 text-gray-400 p-2"
                    // }
                    // else if (idfield === "decimal") {
                    //     titleField = document.createElement('h1')
                    //     titleField.className = "text-sm"
                    //     titleField.innerHTML = "Decimal"
                    //     inputField = document.createElement('div')
                    //     inputField.className = "w-full h-10 rounded-md border-2 text-gray-400 p-2"
                    //     inputField.innerHTML = "0.11111"
                    // }
                    // else if (idfield === "checkbox") {
                    //     titleField = document.createElement('h1')
                    //     titleField.className = "text-sm"
                    //     titleField.innerHTML = "Checkbox"
                    //     inputField = document.createElement('div')
                    //     inputField.className = "w-full h-10 rounded-md border-2 text-gray-400 p-2"
                    //     inputField.innerHTML = "<div class='w-5 h-5 rounded border-gray-700 border mr-5' />"
                    // }
                    // else if (idfield === "select") {
                    //     titleField = document.createElement('h1')
                    //     titleField.className = "text-sm"
                    //     titleField.innerHTML = "Select"
                    //     inputField = document.createElement('div')
                    //     inputField.className = "w-full h-10 rounded-md border-2 text-gray-400 p-2"
                    //     inputField.innerHTML = "<select disabled />"
                    // }
                    // else if (idfield === "tree") {
                    //     titleField = document.createElement('h1')
                    //     titleField.className = "text-sm"
                    //     titleField.innerHTML = "Tree"
                    //     inputField = document.createElement('div')
                    //     inputField.className = "w-full h-10 rounded-md border-2 text-gray-400 p-2"
                    //     inputField.innerHTML = "Tree"
                    // }
                    // else if (idfield === "date") {
                    //     titleField = document.createElement('h1')
                    //     titleField.className = "text-sm"
                    //     titleField.innerHTML = "Date"
                    //     inputField = document.createElement('div')
                    //     inputField.className = "w-full h-10 rounded-md border-2 text-gray-400 p-2"
                    //     inputField.innerHTML = "<input type='date' disabled />"
                    // }
                    // document.getElementById("dropWrapper").appendChild(titleField)
                    // document.getElementById("dropWrapper").appendChild(inputField)