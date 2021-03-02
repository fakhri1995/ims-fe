import { useRouter } from 'next/router'
import { useState } from 'react'
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



function AssetsNew({ initProps, dataProfile, dataAssetsList, sidemenu, assetsTitle, assetsParent }) {
    const rt = useRouter()
    var { create } = rt.query
    const originPath = "Admin"
    const [editasset, setEditasset] = useState(false)
    const [modalfieldprops, setModalfieldprops] = useState(false)
    // const [idxfield, setIdxfield] = useState(-1)
    const [dragfield, setDragfield] = useState([])
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
    const pathArr = ['assets', dataAssetDetail.title]
    if (create) {
        notification['success']({
            message: `Asset ${dataAssetDetail.title} berhasil ditambahkan`,
            duration: 4
        })
    }
    const [dataupdate, setDataupdate] = useState({
        id: dataAssetDetail.id,
        name: '',
    })
    const onChangeUpdateAssets = (e) => {
        setDataupdate({
            ...dataupdate,
            [e.target.name]: e.target.value
        })
    }
    // const [datafield, setDatafield] = useState({
    //     require: false,
    //     name: ''
    // })
    // const onChangeUpdateField = (e) => {
    //     setDataupdate({
    //         ...dataupdate,
    //         [e.target.name]: e.target.value
    //     })
    // }
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
                        rt.push(`/assets/update/${dataAssetDetail.title}?originPath=Admin&title=${dataAssetDetail.title}&parent=${dataAssetParentDetail.title}`)
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
        // setIdxfield(prev => prev + 1)
        document.getElementById('dropWrapper').classList.remove("border")
        document.getElementById('dropWrapper').classList.remove("border-dashed")
        document.getElementById('dropWrapper').classList.remove("border-opacity-20")
        document.getElementById('dropWrapper').classList.remove("border-black")
        var id = e.dataTransfer.getData("idField");
        console.log("masuk ke sini" + id)
        var titleField = <></>
        var inputField = <></>
        if (id === "singleLineText") {
            titleField = document.createElement('h1')
            titleField.className = "text-sm"
            titleField.innerHTML = "Text"
            inputField = document.createElement('div')
            inputField.className = "w-full h-10 rounded-md border-2 text-gray-400 p-2"
        }
        else if (id === "number") {
            titleField = document.createElement('h1')
            titleField.className = "text-sm"
            titleField.innerHTML = "Number"
            inputField = document.createElement('div')
            inputField.className = "w-full h-10 rounded-md border-2 text-gray-400 p-2"
            inputField.innerHTML = "1000000"
        }
        else if (id === "textarea") {
            titleField = document.createElement('h1')
            titleField.className = "text-sm"
            titleField.innerHTML = "Text Area"
            inputField = document.createElement('div')
            inputField.className = "w-full h-28 rounded-md border-2 text-gray-400 p-2"
        }
        else if (id === "decimal") {
            titleField = document.createElement('h1')
            titleField.className = "text-sm"
            titleField.innerHTML = "Decimal"
            inputField = document.createElement('div')
            inputField.className = "w-full h-10 rounded-md border-2 text-gray-400 p-2"
            inputField.innerHTML = "0.11111"
        }
        else if (id === "checkbox") {
            titleField = document.createElement('h1')
            titleField.className = "text-sm"
            titleField.innerHTML = "Checkbox"
            inputField = document.createElement('div')
            inputField.className = "w-full h-10 rounded-md border-2 text-gray-400 p-2"
            inputField.innerHTML = "<div class='w-5 h-5 rounded border-gray-700 border mr-5' />"
        }
        else if (id === "select") {
            titleField = document.createElement('h1')
            titleField.className = "text-sm"
            titleField.innerHTML = "Select"
            inputField = document.createElement('div')
            inputField.className = "w-full h-10 rounded-md border-2 text-gray-400 p-2"
            inputField.innerHTML = "<select disabled />"
        }
        else if (id === "tree") {
            titleField = document.createElement('h1')
            titleField.className = "text-sm"
            titleField.innerHTML = "Tree"
            inputField = document.createElement('div')
            inputField.className = "w-full h-10 rounded-md border-2 text-gray-400 p-2"
            inputField.innerHTML = "Tree"
        }
        else if (id === "date") {
            titleField = document.createElement('h1')
            titleField.className = "text-sm"
            titleField.innerHTML = "Date"
            inputField = document.createElement('div')
            inputField.className = "w-full h-10 rounded-md border-2 text-gray-400 p-2"
            inputField.innerHTML = "<input type='date' disabled />"
        }
        document.getElementById("dropWrapper").appendChild(titleField)
        document.getElementById("dropWrapper").appendChild(inputField)
        setDragfield([
            ...dragfield,
            id
        ])
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
                            <h1 className="font-semibold py-2">{dataAssetDetail.title}</h1>
                            <div className="flex space-x-2">
                                <Link href={`/assets?originPath=Admin`}>
                                    <button className=" bg-white border hover:bg-gray-200 border-gray-300 text-black py-1 px-3 rounded-md">Cancel</button>
                                </Link>
                                <button className=" bg-gray-700 hover:bg-gray-800 border text-white py-1 px-3 rounded-md">Update</button>
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
                                                <Input onChange={onChangeUpdateAssets} name="name" value={dataupdate.name} allowClear required />
                                            </div>
                                            <div className="flex flex-col mx-3">
                                                <h1 className="text-sm">Deskripsi:</h1>
                                                <Input name="description" allowClear />
                                            </div>
                                            <div className="flex">
                                                <button type="submit" className=" bg-gray-700 hover:bg-gray-800 border text-white py-1 px-3 rounded-md mr-5">Save</button>
                                                <button className=" bg-white border hover:bg-gray-200 border-gray-300 text-black py-1 px-3 rounded-md" onClick={() => { setEditasset(false) }}>Cancel</button>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                                :
                                <div className="flex">
                                    <div className="w-auto text-black mr-2 pt-2">{dataAssetParentDetail.title}</div>
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
                        <div id="dropWrapper" className="w-full h-auto border border-dashed border-opacity-20 border-black pb-2" onDrop={(e) => { onChangeDrop(e) }} onDragOver={(e) => { onChangeDragoverDrop(e) }}>
                            <div id="dropAreaTitle" className="h-auto w-full p-2 bg-gray-700 text-white mb-2 flex flex-col">{dataAssetDetail.title} Properties</div>
                            {
                                dragfield.length === 0 ?
                                    <div id="dropArea" className="h-32 flex justify-center items-center">
                                        <div className="text-gray-300 text-base">Drag and Drop the custom field to build your own custom Form</div>
                                    </div>
                                    :
                                    <></>
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
                        <div id="singleLineText" className="text-center pt-4 border rounded-md h-16 text-xs cursor-pointer hover:shadow-md" onDragStart={(e) => { onChangeDragStart(e) }} draggable>Text</div>
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
                        destroyOnClose
                    >
                        <>
                            <div className="grid grid-cols-1 mb-2">
                                <div className="flex flex-col my-2">
                                    <h1 className="text-sm">Behavior:</h1>
                                    <Checkbox name="requirement" />
                                </div>
                                <div className="flex flex-col my-2">
                                    <h1 className="text-sm">Nama Field:</h1>
                                    <Input name="name" allowClear />
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <button className="bg-white w-auto h-auto py-1 px-3 text-gray-800 rounded-md border border-gray-700">Hapus</button>
                                <div className="flex">
                                    <button className=" bg-gray-800 w-auto h-auto py-1 px-3 text-white rounded-md hover:bg-gray-900 mx-3">Simpan</button>
                                    <button className="bg-white w-auto h-auto py-1 px-3 text-gray-800 rounded-md border border-gray-700" onClick={() => { setModalfieldprops(false) }}>Cancel</button>
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

    return {
        props: {
            initProps,
            dataProfile,
            dataAssetsList,
            sidemenu: "4",
            assetsTitle,
            assetsParent
        },
    }
}

export default AssetsNew