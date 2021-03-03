import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import httpcookie from 'cookie'
import notification from 'antd/lib/notification'
import EditOutlined from '@ant-design/icons/EditOutlined'
import Sticky from 'wil-react-sticky'
import Link from 'next/link'
import Form from 'antd/lib/form/Form'
import Input from 'antd/lib/input'
import Checkbox from 'antd/lib/checkbox'
import Modal from 'antd/lib/modal'
import Layout from '../../../components/layout-dashboard'
import st from '../../../components/layout-dashboard-main.module.css'



function AssetsNew({ initProps, dataProfile, dataAssetsList, sidemenu, assetsTitle, assetsParent, dataInvColumns }) {
    const rt = useRouter()
    var { create } = rt.query
    const originPath = "Admin"
    const pathArr = rt.pathname.split("/").slice(1)
    if (!dataInvColumns.data) {
        dataInvColumns.data = []
    }
    const [editasset, setEditasset] = useState(false)
    const [modalfieldprops, setModalfieldprops] = useState(false)
    const [modalupdatefieldprops, setModalupdatefieldprops] = useState(false)
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
    const [datafield, setDatafield] = useState({
        asset_id: dataAssetDetail.id,
        name: '',
        data_type: '',
        default: '',
        required: false,
        unique: false
    })
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
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/assets/update/${dataupdate.name}?originPath=Admin&parent=${dataAssetParentDetail.key}`)
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
        fetch(`https://boiling-thicket-46501.herokuapp.com/addInventoryColumn`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datafield)
        })
            .then(res => res.json())
            .then(res2 => {
                if (res2.success) {
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
                    setModalfieldprops(false)
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/assets/update/${assetsTitle}?originPath=Admin&parent=${assetsParent}`)
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
    const handleUpdateField = () => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateInventoryColumn`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recordfield)
        })
            .then(res => res.json())
            .then(res2 => {
                if (res2.success) {
                    setModalupdatefieldprops(false)
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/assets/update/${assetsTitle}?originPath=Admin&parent=${assetsParent}`)
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
    const handleDeleteField = ()=>{
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteInventoryColumn`, {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: recordfield.id
            })
        })
            .then(res => res.json())
            .then(res2 => {
                if (res2.success) {
                    setModalupdatefieldprops(false)
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/assets/update/${assetsTitle}?originPath=Admin&parent=${assetsParent}`)
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
        <Layout tok={initProps} pathArr={pathArr} dataProfile={dataProfile} dataAssetsList={dataAssetsList} sidemenu={sidemenu} originPath={originPath} st={st}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
                <div className=" col-span-1 md:col-span-3 flex flex-col" id="formAgentsWrapper">
                    <Sticky containerSelectorFocus="#formAgentsWrapper">
                        <div className="flex justify-between p-4 border-t-2 border-b-2 bg-white mb-8">
                            <h1 className="font-semibold py-2">{assetsTitle}</h1>
                            <div className="flex space-x-2">
                                <Link href={`/assets?originPath=Admin`}>
                                    <button className=" bg-white border hover:bg-gray-200 border-gray-300 text-black py-1 px-3 rounded-md">Cancel</button>
                                </Link>
                                {/* {
                                    editasset ?
                                        <></>
                                        :
                                        <button className=" bg-gray-700 hover:bg-gray-800 border text-white py-1 px-3 rounded-md">Update</button>
                                } */}
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
                                            <div className="flex py-1">
                                                <button type="submit" className=" bg-gray-700 hover:bg-gray-800 border text-white px-3 w-20 rounded-md mr-5">Save</button>
                                                <button className=" bg-white border hover:bg-gray-200 border-gray-300 text-black px-3 rounded-md" onClick={() => { setEditasset(false) }}>Cancel</button>
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
                        <div className="w-full h-auto border border-black pb-2">
                            <div className="h-auto w-full p-2 bg-gray-500 text-white mb-2">{dataAssetParentDetail.title} Properties</div>
                            <div className=" text-center">{dataAssetParentDetail.title} Properties akan ditampilkan disini</div>
                        </div>
                    </div>
                    <div className="p-4 mb-4">
                        <div id="dropWrapper" /*className="w-full h-auto border border-dashed border-opacity-20 border-black pb-2"*/ className="w-full h-auto pb-2" onDrop={(e) => { onChangeDrop(e) }} onDragOver={(e) => { onChangeDragoverDrop(e) }}>
                            <div id="dropAreaTitle" className="h-auto w-full p-2 bg-gray-700 text-white mb-2 flex flex-col">{dataAssetDetail.title} Properties</div>
                            {
                                dataInvColumns.data.length === 0 ?
                                    <div id="dropArea" className="h-32 flex justify-center items-center">
                                        <div className="text-gray-300 text-base">Drag and Drop the custom field to build your own custom Form</div>
                                    </div>
                                    :
                                    <>
                                        {
                                            dataInvColumns.data.map((doc, idx) => {
                                                return (
                                                    <div key={idx} className="mb-5 cursor-pointer" onClick={() => { setModalupdatefieldprops(true); setRecordfield(doc) }}>
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
                    <div className="font-semibold text-base">Tambah Custom Field</div>
                    <p className="font-normal text-sm">
                        Drag and drop any field type into the "Asset Type Field" form, to add a new custom field
                    </p>
                    <div id="dragItem" className="grid grid-cols-2 md:grid-cols-2 space-x-1 space-y-1">
                        <div id="text" className="text-center pt-4 border rounded-md h-16 text-xs cursor-pointer hover:shadow-md" onDragStart={(e) => { onChangeDragStart(e) }} draggable>Text</div>
                        <div id="number" className="text-center pt-4 border rounded-md h-16 text-xs cursor-pointer hover:shadow-md" onDragStart={(e) => { onChangeDragStart(e) }} draggable>Number</div>
                        <div id="decimal" className="text-center pt-4 border rounded-md h-16 text-xs cursor-pointer hover:shadow-md" onDragStart={(e) => { onChangeDragStart(e) }} draggable>Decimal</div>
                        <div id="textarea" className="text-center pt-4 border rounded-md h-16 text-xs cursor-pointer hover:shadow-md" onDragStart={(e) => { onChangeDragStart(e) }} draggable>TextArea</div>
                        <div id="checkbox" className="text-center pt-4 border rounded-md h-16 text-xs cursor-pointer hover:shadow-md" onDragStart={(e) => { onChangeDragStart(e) }} draggable>Checkbox</div>
                        <div id="select" className="text-center pt-4 border rounded-md h-16 text-xs cursor-pointer hover:shadow-md" onDragStart={(e) => { onChangeDragStart(e) }} draggable>Dropdown</div>
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
                                    <Input name="name" allowClear onChange={onChangeUpdateField} required/>
                                </div>
                                <div className="flex flex-col my-2">
                                    <h1 className="text-sm">Default:</h1>
                                    {datafield.data_type === "text" && <Input name="default" allowClear onChange={onChangeUpdateField} />}
                                    {datafield.data_type === "number" && <input type="number" name="default" allowClear onChange={onChangeUpdateField} />}
                                    {datafield.data_type === "decimal" && <input type="number" step="0.01" name="default" allowClear onChange={onChangeUpdateField} />}
                                    {datafield.data_type === "textarea" && <textarea  step="" name="default" allowClear onChange={onChangeUpdateField} />}
                                    {datafield.data_type === "checkbox" && <input type="checkbox" name="default" allowClear onChange={onChangeUpdateField} />}
                                    {datafield.data_type === "select" && <Input name="default" allowClear onChange={onChangeUpdateField} />}
                                    {datafield.data_type === "tree" && <Input name="default" allowClear onChange={onChangeUpdateField} />}
                                    {datafield.data_type === "date" && <input type="date" name="default" allowClear onChange={onChangeUpdateField} />}
                                </div>
                                <div className="flex flex-col my-2">
                                    <h1 className="text-sm">Required:</h1>
                                    <Checkbox name="required" onChange={onChangeCheckboxRequired} />
                                </div>
                                <div className="flex flex-col my-2">
                                    <h1 className="text-sm">Unique:</h1>
                                    <Checkbox name="unique" onChange={onChangeCheckboxUnique} />
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex">
                                    <button className=" bg-gray-800 w-auto h-auto py-1 px-3 text-white rounded-md hover:bg-gray-900 mx-3" onClick={handleAddField}>Simpan</button>
                                    <button className="bg-white w-auto h-auto py-1 px-3 text-gray-800 rounded-md border border-gray-700" onClick={() => { setModalfieldprops(false) }}>Cancel</button>
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
                                    {recordfield.data_type === "textarea" && <textarea  step="" name="default" allowClear onChange={onChangeUpdateField2} defaultValue={recordfield.default} />}
                                    {recordfield.data_type === "checkbox" && <input type="checkbox" name="default" allowClear onChange={onChangeUpdateField2} defaultValue={recordfield.default} />}
                                    {recordfield.data_type === "select" && <Input name="default" allowClear onChange={onChangeUpdateField2} defaultValue={recordfield.default} />}
                                    {recordfield.data_type === "tree" && <Input name="default" allowClear onChange={onChangeUpdateField2} defaultValue={recordfield.default} />}
                                    {recordfield.data_type === "date" && <input type="date" name="default" allowClear onChange={onChangeUpdateField2} defaultValue={recordfield.default} />}
                                </div>
                                <div className="flex flex-col my-2">
                                    <h1 className="text-sm">Required:</h1>
                                    <Checkbox name="required" onChange={onChangeCheckboxRequired2} checked={recordfield.required} />
                                </div>
                                <div className="flex flex-col my-2">
                                    <h1 className="text-sm">Unique:</h1>
                                    <Checkbox name="unique" onChange={onChangeCheckboxUnique2} checked={recordfield.unique} />
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <button className="bg-white w-auto h-auto py-1 px-3 text-gray-800 rounded-md border border-gray-700" onClick={handleDeleteField}>Hapus Field</button>
                                <div className="flex">
                                    <button className=" bg-gray-800 w-auto h-auto py-1 px-3 text-white rounded-md hover:bg-gray-900 mx-3" onClick={handleUpdateField}>Simpan</button>
                                    <button className="bg-white w-auto h-auto py-1 px-3 text-gray-800 rounded-md border border-gray-700" onClick={() => { setModalupdatefieldprops(false) }}>Cancel</button>
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
            res.writeHead(302, { Location: '/' })
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