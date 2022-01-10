import Layout from '../../../../components/layout-dashboard'
import { useRouter } from 'next/router'
import httpcookie from 'cookie'
import Sticky from 'wil-react-sticky'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Modal, Steps, Radio, Button, Tabs, TreeSelect, Empty, notification, Select, Checkbox, Table, Input, Spin } from 'antd'
import { CalendarOutlined, DownOutlined, UpOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import st from '../../../../components/layout-dashboard.module.css'

const Overview = ({ assettypeid, initProps, displaydata, parentcode, praloading, idparent }) => {
    const rt = useRouter()
    const codeparent = displaydata.code.substring(0, displaydata.code.length - 4)
    return (
        <div className="flex flex-col">
            <div className="border-b flex justify-between p-5 mb-8">
                <h1 className="font-bold text-xl my-auto">Overview</h1>
                {
                    praloading ?
                        null
                        :
                        <Button type="primary" onClick={() => { rt.push(`/admin/assets/update/${assettypeid}?codeparent=${codeparent}&idparent=${idparent}`) }}>Ubah</Button>
                }
            </div>
            <div className="mb-8 mx-5 p-5 border shadow-md rounded-md flex flex-col">
                <div className="flex flex-col mb-3">
                    <h1 className=" text-sm font-semibold mb-0">Induk Asset Type:</h1>
                    <p className="mb-0 text-sm">{parentcode ? parentcode.title : "-"}</p>
                    {/* {
                        praloadingoverview ?
                            null
                            :
                            <p className="mb-0 text-sm">{parentcode ? parentcode.title : "-"}</p>
                    } */}
                </div>
                <div className="flex flex-col mb-3">
                    <h1 className=" text-sm font-semibold mb-0">Deskripsi:</h1>
                    <p className="mb-0 text-sm">{displaydata ? displaydata.description : "-"}</p>
                    {/* {
                        praloadingoverview ?
                            null
                            :
                            <p className="mb-0 text-sm">{displaydata ? displaydata.description : "-"}</p>
                    } */}
                </div>
                <div className="flex flex-col mb-3">
                    <h1 className=" text-sm font-semibold mb-0">Serial Number:</h1>
                    <p className="mb-0 text-sm">{displaydata.required_sn ? "Wajib Ada" : "Tidak Wajib"}</p>
                    {/* {
                        praloadingoverview ?
                            null
                            :
                            <p className="mb-0 text-sm">{displaydata ? displaydata.description : "-"}</p>
                    } */}
                </div>
            </div>
            <div className="flex flex-col">
                <h1 className="font-bold text-large mx-5 p-5">Spesifikasi Asset Type</h1>
                <div className="mb-8 border shadow-md rounded-md flex flex-col mx-5 p-5">
                    {
                        displaydata.asset_columns.length > 0 ?
                            displaydata.asset_columns.map((doc, idx) => {
                                return (
                                    <div className="mb-5">
                                        <div className="font-semibold mb-2">{doc.name} {doc.required ? <span className="judulField"></span> : null} <span className="text-gray-400">({doc.data_type.charAt(0).toUpperCase() + doc.data_type.slice(1)}{doc.data_type === 'single' && ` Textbox`}{doc.data_type === 'paragraph' && ` Text`})</span></div>
                                        {
                                            doc.data_type === 'dropdown' || doc.data_type === 'checkbox' || doc.data_type === 'date' || doc.data_type === 'paragraph' ?
                                                <>
                                                    {
                                                        doc.data_type === 'dropdown' &&
                                                        <Select disabled style={{ width: `100%`, backgroundColor: `rgba(229, 231, 235,1)`, color: `rgba(229, 231, 235,1)` }}>
                                                            {
                                                                doc.default.opsi.map((doc2, idx2) => (
                                                                    <Select.Option disabled value={idx2}>{doc2}</Select.Option>
                                                                ))
                                                            }
                                                        </Select>
                                                    }
                                                    {
                                                        doc.data_type === 'checkbox' &&
                                                        <div className="w-full flex flex-col">
                                                            {
                                                                doc.default.opsi.map((doc3, idx3) => (
                                                                    <div className="flex mb-1">
                                                                        <Checkbox disabled style={{ marginRight: `0.5rem` }}></Checkbox>
                                                                        <p className="mb-0">{doc3}</p>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    }
                                                    {
                                                        doc.data_type === 'date' &&
                                                        <div className="flex w-full items-center justify-between rounded bg-gray-100 h-10 px-3">
                                                            <p className='mb-0'>{doc.default}</p>
                                                            <div>
                                                                <CalendarOutlined></CalendarOutlined>
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        doc.data_type === 'paragraph' &&
                                                        <div className="flex h-20 rounded border bg-gray-100 w-full px-3">{doc.default}</div>
                                                    }
                                                </>
                                                :
                                                <div className='rounded border bg-gray-100 flex items-center w-full h-10 px-3'>
                                                    {doc.default}
                                                </div>
                                        }
                                        <style jsx>
                                            {`
                                                        .judulField::before{
                                                            content: '*';
                                                            color: red;
                                                        }
                                                    `}
                                        </style>
                                    </div>
                                )
                            })
                            :
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    }
                </div>
            </div>
        </div>
    )
}

const AssetTypeDetail = ({ initProps, sidemenu, dataProfile, assettypeid }) => {
    //1. Init
    const rt = useRouter()
    var pathArr = rt.pathname.split("/").slice(1)
    pathArr.splice(3, 1)
    pathArr[pathArr.length - 1] = "Detail Asset Type"
    const { TabPane } = Tabs
    const { Step } = Steps;
    var activeTab = "overview"
    const { active } = rt.query
    if (active) {
        activeTab = active
    }

    //flattening array of object
    function flattening(array) {
        var result = [];
        array.forEach(function (a) {
            result.push(a);
            if (Array.isArray(a.children)) {
                result = result.concat(flattening(a.children));
            }
        });
        return result;
    }

    //useState
    const [displaydata, setdisplaydata] = useState({
        id: 0,
        name: "",
        code: "",
        description: "",
        asset_columns: []
    })
    const [displayassetdata, setdisplayassetdata] = useState([])
    const [modeldata, setmodeldata] = useState([])
    const [loadingdelete, setloadingdelete] = useState(false)
    const [modaldelete, setmodaldelete] = useState(false)
    const [modaldeletenonmodel, setmodaldeletenonmodel] = useState(false)
    const [modaldeletenonchild, setmodaldeletenonchild] = useState(false)
    const [modaldeletenonboth, setmodaldeletenonboth] = useState(false)
    const [stepdelete, setstepdelete] = useState(0)
    const [allchilddelete, setallchilddelete] = useState(true)
    const [allmodeldelete, setallmodeldelete] = useState(true)
    const [newparentchildradio, setnewparentchildradio] = useState(null)
    const [newparentchild, setnewparentchild] = useState(null)
    const [newparentchildcode, setnewparentchildcode] = useState(null)
    const [newparentmodelradio, setnewparentmodelradio] = useState(null)
    const [newparentmodel, setnewparentmodel] = useState(null)
    const [newparentmodelcode, setnewparentmodelcode] = useState(null)
    const [childassettype, setchildassettype] = useState([])
    const [parentcode, setparentcode] = useState("")
    const [parentid, setparentid] = useState(-10)
    const [praloading, setpraloading] = useState(true)

    //handle
    const handleDeleteAsset = () => {
        setloadingdelete(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteAsset`, {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: Number(assettypeid),
                new_parent: newparentchild,
                new_model_asset_id: newparentmodel
            })
        })
            .then(res => res.json())
            .then(res2 => {
                if (res2.success) {
                    setloadingdelete(false)
                    setmodaldelete(false)
                    notification['success']({
                        message: "Asset Type berhasil dihapus",
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/admin/assets`)
                    }, 500)
                }
                else if (!res2.success) {
                    setloadingdelete(false)
                    setmodaldelete(false)
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
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
                'Authorization': JSON.parse(initProps)
            }
        })
            .then(res => res.json())
            .then(res2 => {
                const assetcolmap = res2.data.asset_columns.map((doc, idx) => {
                    return ({
                        id: doc.id,
                        name: doc.name,
                        data_type: doc.data_type,
                        default: doc.data_type === 'dropdown' || doc.data_type === 'checkbox' ? JSON.parse(doc.default) : doc.default,
                        required: doc.required
                    })
                })
                setdisplaydata({
                    ...res2.data,
                    asset_columns: assetcolmap
                })
                const prt = res2.data.code.substring(0, res2.data.code.length - 4)
                return prt
            })
            .then(res3 => {
                fetch(`https://boiling-thicket-46501.herokuapp.com/getAssets`, {
                    method: `GET`,
                    headers: {
                        'Authorization': JSON.parse(initProps),
                    }
                })
                    .then(ress => ress.json())
                    .then(ress2 => {
                        var temp = flattening(ress2.data)
                        var temp3 = temp.filter((doc) => doc.value === res3)[0]
                        setparentcode(temp3)
                        temp3 ? setparentid(temp3.id) : setparentid(null)
                        setpraloading(false)
                    })
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
                // setdisplayassetdata(res2.data)
                var child = []
                const searchChild = (dataa) => {
                    for (var i = 0; i < dataa.length; i++) {
                        if (dataa[i]["id"] === Number(assettypeid)) {
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
                function searchAsset(doq) {
                    var arr = []
                    for (var i = 0; i < doq.length; i++) {
                        if (doq[i].id === Number(assettypeid)) {
                            continue
                        }
                        else {
                            if (doq[i].children) {
                                arr.push({
                                    ...doq[i],
                                    children: searchAsset(doq[i].children)
                                })
                            }
                            else {
                                arr.push({
                                    ...doq[i]
                                })
                            }
                        }
                    }
                    return arr
                }
                var hsl = searchAsset(res2.data)
                setdisplayassetdata(hsl)
                searchChild(res2.data)
                setchildassettype(child)
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
                setmodeldata(res2.data.data)
            })
    }, [])
    useEffect(() => {
        if (stepdelete === 0) {
            var el = document.getElementById("step1")
            el.classList.add("flex", "flex-col")
            el.classList.remove("hidden")
            var el2 = document.getElementById("step2")
            el2.classList.remove("flex", "flex-col")
            el2.classList.add("hidden")
        }
        else if (stepdelete === 1) {
            var el = document.getElementById("step2")
            el.classList.add("flex", "flex-col")
            el.classList.remove("hidden")
            var el2 = document.getElementById("step1")
            el2.classList.add("hidden")
            el2.classList.remove("flex", "flex-col")
        }
    }, [stepdelete])
    return (
        <Layout tok={initProps} sidemenu={sidemenu} dataProfile={dataProfile} st={st} pathArr={pathArr}>
            {
                praloading ?
                    <>
                        <div id="step1"></div>
                        <div id="step2"></div>
                    </>
                    :
                    null
            }
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4" id="createAssetsWrapper">
                <div className=" col-span-1 md:col-span-4 mb-8">
                    <Sticky containerSelectorFocus="#createAgentsWrapper">
                        <div className=" col-span-4 flex justify-between p-2 pt-4 border-t-2 border-b-2 bg-white">
                            <h1 className="font-bold text-xl py-2">{displaydata.name}</h1>
                            <div className="flex mr-5 items-center">
                                <Button disabled={praloading} type="danger" loading={loadingdelete} onClick={() => {
                                    const modeldata2 = modeldata.filter((doc1, idx1) => doc1.asset_id === Number(assettypeid))
                                    if (childassettype.length > 0 && modeldata2.length > 0) {
                                        setmodaldelete(true)
                                    }
                                    else {
                                        if (modeldata2.length === 0 && childassettype.length > 0) {
                                            setmodaldeletenonmodel(true)
                                        }
                                        else if (modeldata2.length > 0 && childassettype.length === 0) {
                                            setmodaldeletenonchild(true)
                                        }
                                        else {
                                            setmodaldeletenonboth(true)
                                        }
                                    }
                                }}>Hapus</Button>
                            </div>
                        </div>
                    </Sticky>
                </div>
                <div className="col-span-1 md:col-span-3 mb-8 pt-5">
                    <Overview assettypeid={assettypeid} initProps={initProps} displaydata={displaydata} parentcode={parentcode} praloading={praloading} idparent={parentid} />
                </div>
            </div>
            <Modal
                title={
                    <div className="flex justify-between p-5 mt-5">
                        <h1 className="font-bold text-xl">Form Hapus Asset Type</h1>
                        <div className="flex">
                            {
                                stepdelete === 0 ?
                                    <>
                                        <Button type="default" onClick={() => { setmodaldelete(false) }} style={{ marginRight: `1rem` }}>Batal</Button>
                                        <Button type='primary' disabled={newparentchildradio === null} onClick={() => { setstepdelete(1) }}>Selanjutnya</Button>
                                    </>
                                    :
                                    <>
                                        <Button type="default" onClick={() => { setstepdelete(0) }} style={{ marginRight: `1rem` }}>Sebelumnya</Button>
                                        <Button type='primary' disabled={newparentmodelradio === null} onClick={handleDeleteAsset} loading={loadingdelete}>Simpan</Button>
                                    </>
                            }
                        </div>
                    </div>
                }
                visible={modaldelete}
                footer={null}
                onCancel={() => { setmodaldelete(false) }}
                width={850}
            >
                <div className="flex flex-col p-5">
                    <div className="flex justify-center w-7/12 mx-auto mb-8">
                        <Steps current={stepdelete}>
                            <Step title="Asset Type Child" />
                            <Step title="Model" />
                        </Steps>
                    </div>
                    <div id="step1" className="rounded border bg-gray-50 p-5 flex flex-col">
                        <div className="mb-2">
                            <h5 className=" text-xs font-semibold">Berikut adalah child dari asset type "{displaydata.name}":</h5>
                            <ul>
                                {childassettype.length === 0 ?
                                    <>
                                        -
                                    </>
                                    :
                                    childassettype.map((doc, idx) => {
                                        return (
                                            <li className="text-xs">- {doc.title}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="mb-2">
                            <h5 className=" text-xs font-semibold">1. Apakah anda ingin menghapus seluruh child dari asset type "{displaydata.name}"? <span className="hapusField1"></span></h5>
                            <Radio.Group className="step1radio" onChange={(e) => {
                                if (e.target.value === true) {
                                    setnewparentchildradio(true)
                                }
                                else {
                                    setnewparentchildradio(null)
                                }
                                setallchilddelete(e.target.value)
                                if (e.target.value === true) {
                                    setnewparentchild(null)
                                }
                            }}>
                                <div className="flex flex-col">
                                    <Radio value={true}>Ya</Radio>
                                    <Radio value={false}>Tidak</Radio>
                                </div>
                            </Radio.Group>
                        </div>
                        <div className="mb-2">
                            <h5 className=" text-xs font-semibold">2. Jika tidak, pilih Asset Type sebagai parent untuk child dari Asset Type "{displaydata.name}"! <span className="hapusField2"></span></h5>
                            <TreeSelect value={newparentchildcode} className="step1treeselect" placeholder="Pilih Asset Type" onChange={(value, label, extra) => { setnewparentchild(extra.allCheckedNodes[0].node.props.id); setnewparentchildcode(value); setnewparentchildradio(true) }} disabled={allchilddelete} treeData={displayassetdata} style={{ width: `70%` }} />
                        </div>
                        <style jsx>
                            {`
                                .hapusField1::before, .hapusField2::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                        </style>
                    </div>
                    <div id="step2" className="rounded border bg-gray-50 p-5 hidden">
                        <div className="mb-2">
                            <h5 className=" text-xs font-semibold">Berikut adalah Model yang dimiliki Asset Type "{displaydata.name}":</h5>
                            <ul>
                                {modeldata.length === 0 || modeldata.map(doc => doc.asset_id).indexOf(Number(assettypeid)) === -1 ?
                                    "-"
                                    :
                                    modeldata.map((doc, idx) => {
                                        if (doc.asset_id === Number(assettypeid)) {
                                            return (
                                                <li className="text-xs">- {doc.name}</li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                        </div>
                        <div className="mb-2">
                            <h5 className=" text-xs font-semibold">1. Apakah anda ingin menghapus seluruh model yang dimiliki Asset Type "{displaydata.name}"? <span className="hapusField1"></span></h5>
                            <Radio.Group className="step2radio" onChange={(e) => {
                                if (e.target.value === true) {
                                    setnewparentmodelradio(true)
                                }
                                else {
                                    setnewparentmodelradio(null)
                                }
                                setallmodeldelete(e.target.value)
                                if (e.target.value === true) {
                                    setnewparentmodelcode(null)
                                }
                            }}>
                                <div className="flex flex-col">
                                    <Radio value={true}>Ya</Radio>
                                    <Radio value={false}>Tidak</Radio>
                                </div>
                            </Radio.Group>
                        </div>
                        <div className="mb-2">
                            <h5 className=" text-xs font-semibold">2. Jika tidak, pilih Asset Type untuk memindahkan seluruh model yang dimiliki oleh Asset Type "{displaydata.name}"! <span className="hapusField2"></span></h5>
                            <TreeSelect value={newparentmodelcode} className="step2treeselect" placeholder="Pilih Asset Type" onChange={(value, label, extra) => { setnewparentmodel(extra.allCheckedNodes[0].node.props.id); setnewparentmodelcode(value); setnewparentmodelradio(true) }} disabled={allmodeldelete} treeData={displayassetdata} style={{ width: `70%` }} />
                        </div>
                        <style jsx>
                            {`
                                .hapusField1::before, .hapusField2::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                        </style>
                    </div>
                </div>
            </Modal>

            <Modal
                title={
                    <div className="flex justify-between p-5 mt-5">
                        <h1 className="font-bold text-xl">Form Hapus Asset Type</h1>
                        <div className="flex">
                            <>
                                <Button type="default" onClick={() => { setmodaldeletenonmodel(false) }} style={{ marginRight: `1rem` }}>Batal</Button>
                                <Button type='primary' disabled={newparentchildradio === null} onClick={handleDeleteAsset} loading={loadingdelete}>Simpan</Button>
                            </>
                        </div>
                    </div>
                }
                visible={modaldeletenonmodel}
                footer={null}
                onCancel={() => { setmodaldeletenonmodel(false) }}
                width={850}
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
                                    childassettype.map((doc, idx) => {
                                        return (
                                            <li className="text-xs">- {doc.title}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="mb-2">
                            <h5 className=" text-xs font-semibold">1. Apakah anda ingin menghapus seluruh child dari asset type "{displaydata.name}"? <span className="hapusField1"></span></h5>
                            <Radio.Group className="step1radio" onChange={(e) => {
                                if (e.target.value === true) {
                                    setnewparentchildradio(true)
                                }
                                else {
                                    setnewparentchildradio(null)
                                }
                                setallchilddelete(e.target.value)
                                if (e.target.value === true) {
                                    setnewparentchild(null)
                                }
                            }}>
                                <div className="flex flex-col">
                                    <Radio value={true}>Ya</Radio>
                                    <Radio value={false}>Tidak</Radio>
                                </div>
                            </Radio.Group>
                        </div>
                        <div className="mb-2">
                            <h5 className=" text-xs font-semibold">2. Jika tidak, pilih Asset Type sebagai parent untuk child dari Asset Type "{displaydata.name}"! <span className="hapusField2"></span></h5>
                            <TreeSelect value={newparentchildcode} className="step1treeselect" placeholder="Pilih Asset Type" onChange={(value, label, extra) => { setnewparentchild(extra.allCheckedNodes[0].node.props.id); setnewparentchildcode(value); setnewparentchildradio(true) }} disabled={allchilddelete} treeData={displayassetdata} style={{ width: `70%` }} />
                        </div>
                        <style jsx>
                            {`
                                .hapusField1::before, .hapusField2::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                        </style>
                    </div>
                </div>
            </Modal>

            <Modal
                title={
                    <div className="flex justify-between p-5 mt-5">
                        <h1 className="font-bold text-xl">Form Hapus Asset Type</h1>
                        <div className="flex">
                            <>
                                <Button type="default" onClick={() => { setmodaldeletenonchild }} style={{ marginRight: `1rem` }}>Batal</Button>
                                <Button type='primary' disabled={newparentmodelradio === null} onClick={handleDeleteAsset} loading={loadingdelete}>Simpan</Button>
                            </>
                        </div>
                    </div>
                }
                visible={modaldeletenonchild}
                footer={null}
                onCancel={() => { setmodaldeletenonchild(false) }}
                width={850}
            >
                <div className="flex flex-col p-5">
                    <div id="step2" className="rounded border bg-gray-50 p-5">
                        <div className="mb-2">
                            <h5 className=" text-xs font-semibold">Berikut adalah Model yang dimiliki Asset Type "{displaydata.name}":</h5>
                            <ul>
                                {modeldata.length === 0 || modeldata.map(doc => doc.asset_id).indexOf(Number(assettypeid)) === -1 ?
                                    "-"
                                    :
                                    modeldata.map((doc, idx) => {
                                        if (doc.asset_id === Number(assettypeid)) {
                                            return (
                                                <li className="text-xs">- {doc.name}</li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                        </div>
                        <div className="mb-2">
                            <h5 className=" text-xs font-semibold">1. Apakah anda ingin menghapus seluruh model yang dimiliki Asset Type "{displaydata.name}"? <span className="hapusField1"></span></h5>
                            <Radio.Group className="step2radio" onChange={(e) => {
                                if (e.target.value === true) {
                                    setnewparentmodelradio(true)
                                }
                                else {
                                    setnewparentmodelradio(null)
                                }
                                setallmodeldelete(e.target.value)
                                if (e.target.value === true) {
                                    setnewparentmodelcode(null)
                                }
                            }}>
                                <div className="flex flex-col">
                                    <Radio value={true}>Ya</Radio>
                                    <Radio value={false}>Tidak</Radio>
                                </div>
                            </Radio.Group>
                        </div>
                        <div className="mb-2">
                            <h5 className=" text-xs font-semibold">2. Jika tidak, pilih Asset Type untuk memindahkan seluruh model yang dimiliki oleh Asset Type "{displaydata.name}"! <span className="hapusField2"></span></h5>
                            <TreeSelect value={newparentmodelcode} className="step2treeselect" placeholder="Pilih Asset Type" onChange={(value, label, extra) => { setnewparentmodel(extra.allCheckedNodes[0].node.props.id); setnewparentmodelcode(value); setnewparentmodelradio(true) }} disabled={allmodeldelete} treeData={displayassetdata} style={{ width: `70%` }} />
                        </div>
                        <style jsx>
                            {`
                                .hapusField1::before, .hapusField2::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                        </style>
                    </div>
                </div>
            </Modal>

            <Modal title={<h1 className="font-semibold">Konfirmasi Hapus Asset Type</h1>}
                visible={modaldeletenonboth}
                onCancel={() => { setmodaldeletenonboth(false) }}
                okText="Ya"
                cancelText="Tidak"
                onOk={handleDeleteAsset}
                okButtonProps={{ loading: loadingdelete }}
            >
                Apakah anda yakin ingin menghapus Asset Type <strong>"{displaydata.name}"</strong> ?
            </Modal>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }) {
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
            sidemenu: "81",
            assettypeid
        },
    }
}

export default AssetTypeDetail
