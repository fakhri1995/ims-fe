import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import httpcookie from 'cookie'
import { Button, Input, Checkbox, Collapse, notification, Modal, Spin } from 'antd'
import { ArrowRightOutlined, ArrowLeftOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import Layout from '../../../components/layout-dashboard'
import st from '../../../components/layout-dashboard.module.css'
import ScrollTo from "react-scroll-into-view";
import Sticky from 'wil-react-sticky'

const ModulesIndex = ({ initProps, dataProfile, dataListModules, dataListFeatures, sidemenu }) => {
    //Initialization
    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)
    const { Panel } = Collapse
    const { module, featuredisplay, feature } = rt.query

    //useState
    //1. Basic
    const [praloading, setpraloading] = useState(true)
    const [loop, setloop] = useState([])
    const [tabnameArrVal, settabnameArrVal] = useState(loop)
    const [datamodules, setdatamodules] = useState([
        {
            name: "",
            description: "",
            feature: []
        }
    ])
    const [datamodules2, setdatamodules2] = useState([
        {
            name: "",
            description: "",
            feature: []
        }
    ])
    const [datamodules3, setdatamodules3] = useState([
        {
            name: "",
            description: "",
            feature: []
        }
    ])
    // const [currentselectkateg, setcurrentselectkateg] = useState(datamodules[0].name)
    // const [currentdesctkateg, setcurrentdesckateg] = useState(datamodules[0].description)
    // const [datafeature, setdatafeature] = useState(datamodules[0].feature)

    //2. Create
    const [datatambahmodule, setdatatambahmodule] = useState({
        name: '',
        description: '',
        feature_ids: []
    })
    const [drawablecreate, setdrawablecreate] = useState(false)
    const [modalcreate, setmodalcreate] = useState(false)
    const [loadiingcreate, setloadingcreate] = useState(false)

    //3. Update
    const [dataeditmodule, setdataeditmodule] = useState({
        id: 0,
        feature_ids: []
    })
    const [drawableedit, setdrawableedit] = useState(false)
    const [loadiingupdate, setloadingupdate] = useState(false)

    //4. Delete
    const [datadeletemodule, setdatadeletemodule] = useState({
        id: 0
    })
    const [datadeletefeature, setdatadeletefeature] = useState({
        id: 0
    })
    const [modaldelete, setmodaldelete] = useState(false)
    const [loadiingdelete, setloadingdelete] = useState(false)
    const [modaldelete2, setmodaldelete2] = useState(false)
    const [loadiingdelete2, setloadingdelete2] = useState(false)

    //5. Features list
    const [listfeat, setlistfeat] = useState(
        [
            {
                id: 10,
                feature_id: 107,
                feature_key: "b699dca3-9908-41f9-9583-e34f07f7e5c7",
                name: "AGENT_GET",
                description: "Fitur untuk mengambil detail data agent",
                deleted_at: null
            }
        ]
    )
    const [listfeat2, setlistfeat2] = useState(
        [
            {
                id: 10,
                feature_id: 107,
                feature_key: "b699dca3-9908-41f9-9583-e34f07f7e5c7",
                name: "AGENT_GET",
                description: "Fitur untuk mengambil detail data agent",
                deleted_at: null
            }
        ]
    )
    const [listfeat3, setlistfeat3] = useState(
        [
            {
                id: 10,
                feature_id: 107,
                feature_key: "b699dca3-9908-41f9-9583-e34f07f7e5c7",
                name: "AGENT_GET",
                description: "Fitur untuk mengambil detail data agent",
                deleted_at: null
            }
        ]
    )
    const [loadinglistfeat, setloadinglistfeat] = useState(true)
    const [checkedfeatures, setcheckedfeatures] = useState(0)
    const [checkeddatafeatures, setcheckeddatafeatures] = useState([])
    const [praloadingfeature, setpraloadingfeature] = useState(true)
    const [featurecounter, setfeaturecounter] = useState(0)
    const [searchfeature, setsearchfeature] = useState("")


    //6. Module list
    const [checkedmodules, setcheckedmodules] = useState(0)
    const [checkedfeaturemodules, setcheckedfeaturemodules] = useState([])
    const [checkeddatamodules, setcheckeddatamodules] = useState([])
    const [idmodulemap, setidmodulemap] = useState([])
    const [moduletrigger, setmoduletrigger] = useState(false)
    const [modaldeletefeatmodule, setmodaldeletefeatmodule] = useState(false)
    const [loadingdeletefeatmodule, setloadingdeletefeatmodule] = useState(false)
    const [praloadingmodule, setpraloadingmodule] = useState(true)
    const [praloadingmodulefeat, setpraloadingmodulefeat] = useState(module !== "" || typeof (module) !== 'undefined' ? false : true)
    const [modulecounter, setmodulecounter] = useState(0)
    const [searchmodulefeature, setsearchmodulefeature] = useState("")
    const [scrolltrigger, setscrolltrigger] = useState(0)

    //7.arrow
    const [displayarrow, setdisplayarrow] = useState(featuredisplay === "" || typeof (featuredisplay) === 'undefined' ? false : true)
    const [rightstatus, setrightstatus] = useState(true)
    const [leftstatus, setleftstatus] = useState(true)

    //event
    const onChangeTab = (e, idxjenis, namakateg, deskripsi, id, feature) => {
        const temp3 = tabnameArrVal
        temp3[idxjenis] = "block"
        settabnameArrVal(temp3)
        for (var i = 0; i < tabnameArrVal.length; i++) {
            if (i != idxjenis) {
                const temp4 = tabnameArrVal
                temp4[i] = "hidden"
                settabnameArrVal(temp4)
            }
        }
        setdataeditmodule({
            ...dataeditmodule,
            id: id,
            feature_ids: feature.map(doc => doc.id)
        })
        setdatadeletemodule({
            id: id
        })
        setdatafeature(feature)
        setcurrentselectkateg(namakateg)
        setcurrentdesckateg(deskripsi)
    }

    const onChangeTabSmall = (namakateg) => {
        setcurrentselectkateg(namakateg)
        var variable = {}
        if (namakateg != 'all') {
            variable = datamodules.filter(dataa => { return dataa.name == namakateg }).map((doc, idx) => {
                return ({
                    idxjenis: idx + 1,
                    id: doc.id,
                    name: doc.name,
                    description: doc.description,
                    feature: doc.feature
                })
            })[0]
        }
        const temp3 = tabnameArrVal
        temp3[variable.idxjenis] = "block"
        settabnameArrVal(temp3)
        for (var i = 0; i < tabnameArrVal.length; i++) {
            if (i != variable.idxjenis) {
                const temp4 = tabnameArrVal
                temp4[i] = "hidden"
                settabnameArrVal(temp4)
            }
        }
        setdataeditmodule({
            ...dataeditmodule,
            id: variable.id,
            feature_ids: variable.feature.map(doc => doc.id)
        })
        setdatadeletemodule({
            id: variable.id
        })
        setdatafeature(variable.feature)
        setcurrentselectkateg(namakateg)
        setcurrentdesckateg(variable.description)
    }

    const onChangeCreateCheckbox = (e, id) => {
        if (e.target.checked) {
            const temp = datatambahmodule.feature_ids
            temp.push(id)
            setdatatambahmodule({
                ...datatambahmodule,
                feature_ids: temp
            })
        }
        else {
            var temp = datatambahmodule.feature_ids
            var idx = temp.indexOf(id)
            temp.splice(idx, 1)
            setdatatambahmodule({
                ...datatambahmodule,
                feature_ids: temp
            })
        }
    }
    const onChangeUpdateCheckbox = (e, id) => {
        if (e.target.checked) {
            const temp = dataeditmodule.feature_ids
            temp.push(id)
            setdataeditmodule({
                ...dataeditmodule,
                feature_ids: temp
            })
        }
        else {
            var temp = dataeditmodule.feature_ids
            var idx = temp.indexOf(id)
            temp.splice(idx, 1)
            setdataeditmodule({
                ...dataeditmodule,
                feature_ids: temp
            })
        }
    }
    const onChangeUpdateCheckbox2 = (e, id, idx) => {

        if (e.target.checked) {
            // var temp = checkedfeaturemodules
            // temp[idx] = true
            // setcheckedfeaturemodules(temp)
            setcheckeddatamodules([...checkeddatamodules, id])
            checkeddatamodules.length > 0 ? (setleftstatus(true)) : setrightstatus(false)
            checkeddatamodules.length > 0 ? (setrightstatus(false)) : setleftstatus(true)
            setmodulecounter(previ => previ + 1)
        }
        else {
            // var temp2 = checkedfeaturemodules
            // temp2[idx] = false
            // setcheckedfeaturemodules(temp2)
            var temp3 = checkeddatamodules
            var idx = temp3.indexOf(id)
            temp3.splice(idx, 1)
            setcheckeddatamodules(temp3)
            checkeddatamodules.length > 0 ? (setleftstatus(true)) : setrightstatus(false)
            checkeddatamodules.length > 0 ? (setrightstatus(false)) : setleftstatus(true)
            setmodulecounter(previ => previ - 1)
        }
    }
    const onChangeUpdateCheckbox3 = (e, id, idx) => {
        checkeddatafeatures.length > 0 ? setleftstatus(false) : setrightstatus(true)
        checkeddatamodules.length > 0 ? (setrightstatus(true)) : setleftstatus(false)
        if (e.target.checked) {
            // var temp = checkedfeaturemodules
            // temp[idx] = true
            // setcheckedfeaturemodules(temp)
            setcheckeddatafeatures([...checkeddatafeatures, id])
            setfeaturecounter(previ => previ + 1)
        }
        else {
            // var temp2 = checkedfeaturemodules
            // temp2[idx] = false
            // setcheckedfeaturemodules(temp2)
            var temp3 = checkeddatafeatures
            var idx = temp3.indexOf(id)
            temp3.splice(idx, 1)
            setcheckeddatafeatures(temp3)
            setfeaturecounter(previ => previ - 1)
        }
    }
    const onCheckedAll = (e) => {
        if (e.target.checked) {
            setCheckAll(true)
            const status = idmodulemap.map((doc) => true)
            setcheckedfeaturemodules(status)
            setcheckeddatamodules(idmodulemap)
        }
        else {
            setCheckAll(false)
            const status = idmodulemap.map((doc) => false)
            setcheckedfeaturemodules(status)
            setcheckeddatamodules([])
        }
    }

    //handler
    const handleAddModuleFeature = () => {
        setloadingcreate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addModuleFeature`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: Number(datamodules[checkedmodules].id),
                feature_ids: checkeddatafeatures
            })
        })
            .then((res) => res.json())
            .then(res2 => {
                if (res2.success) {
                    notification['success']({
                        message: 'Fitur berhasil didaftarkan',
                        duration: 3
                    })
                    setTimeout(() => {
                        setloadingcreate(false)
                        setmodalcreate(false)
                        window.location.href = `/admin/modules?module=${checkedmodules}&featuredisplay=1`
                    }, 300)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3,
                    })
                    setloadingcreate(false)
                    setmodalcreate(false)
                }
            })
    }
    const handleDeleteModuleFeature = () => {
        setloadingdeletefeatmodule(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteModuleFeature`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: Number(datamodules[checkedmodules].id),
                feature_ids: checkeddatamodules
            })
        })
            .then((res) => res.json())
            .then(res2 => {
                if (res2.success) {
                    notification['success']({
                        message: 'Fitur berhasil dikeluarkan',
                        duration: 3
                    })
                    setTimeout(() => {
                        setloadingdeletefeatmodule(false)
                        setmodaldeletefeatmodule(false)
                        window.location.href = `/admin/modules?module=${checkedmodules}&featuredisplay=1`
                    }, 300)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3,
                    })
                    setloadingdeletefeatmodule(false)
                    setmodaldeletefeatmodule(false)
                }
            })
    }
    const handleUpdate = () => {
        setloadingupdate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateModuleFeature`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataeditmodule)
        })
            .then((res) => res.json())
            .then(res2 => {
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setdataeditmodule({
                        id: 0,
                        feature_ids: []
                    })
                    setTimeout(() => {
                        setloadingupdate(false)
                        setdrawableedit(false)
                        window.location.href = `/admin/modules`
                    }, 300)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3,
                    })
                    setloadingupdate(false)
                    setdrawableedit(false)
                }
            })
    }
    const handleDeleteModule = () => {
        setloadingdelete(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteModule`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datadeletemodule)
        })
            .then((res) => res.json())
            .then(res2 => {
                if (res2.success) {
                    notification['success']({
                        message: 'Module berhasil dihapus',
                        duration: 3
                    })
                    setdatadeletemodule({
                        id: 0
                    })
                    setTimeout(() => {
                        setloadingdelete(false)
                        setmodaldelete(false)
                        window.location.href = `/admin/modules?module=&featuredisplay=`
                    }, 300)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3,
                    })
                    setloadingdelete(false)
                    setmodaldelete(false)
                }
            })
    }
    const handleDeleteFeature = () => {
        setloadingdelete2(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteFeature`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datadeletefeature)
        })
            .then((res) => res.json())
            .then(res2 => {
                if (res2.success) {
                    notification['success']({
                        message: 'Fitur berhasil dihapus',
                        duration: 3
                    })
                    setdatadeletefeature({
                        id: 0
                    })
                    setTimeout(() => {
                        setloadingdelete2(false)
                        setmodaldelete2(false)
                        window.location.href = `/admin/modules?module=&featuredisplay=`
                    }, 300)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3,
                    })
                    setloadingdelete2(false)
                    setmodaldelete2(false)
                }
            })
    }

    //useEffect
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getModules`, {
            method: `POST`,
            headers: {
                'Authorization': JSON.parse(initProps)
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setdatamodules(res2.data)
                setdatamodules2(res2.data)
                setdatamodules3(res2.data)
                // setcurrentselectkateg(res2.data[0].name)
                // setcurrentdesckateg(res2.data[0].description)
                // setdatafeature(res2.data[0].feature)
                var temp = loop
                for (var i = 0; i < res2.data.length; i++) {
                    i !== 0 ? temp.push("hidden") : temp.push("block")
                }
                setloop(temp)
                setloadinglistfeat(false)
                setidmodulemap(res2.data[Number(module)].feature !== null ? res2.data[Number(module)].feature.map((doc, idx) => doc.id) : [])
                setcheckedmodules((module !== "" || typeof (module) !== 'undefined' ? Number(module) : 0))
                setpraloadingmodule(false)
            })
    }, [moduletrigger])
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getAccessFeature`, {
            method: `POST`,
            headers: {
                'Authorization': JSON.parse(initProps)
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setlistfeat(res2)
                setlistfeat2(res2)
                setlistfeat3(res2)
                setpraloadingfeature(false)
            })
    }, [])
    useEffect(() => {
        document.getElementById(`panel${scrolltrigger}`).scrollIntoView(true)
    }, [scrolltrigger])

    return (
        <Layout tok={initProps} dataProfile={dataProfile} sidemenu={sidemenu} st={st} pathArr={pathArr}>
            <div id="containerListModules" className="w-full border-t border-opacity-30 border-gray-500">
                {/* <Sticky containerSelectorFocus="#containerListModules"> */}
                <div className="w-full border-b border-opacity-30 border-gray-400 flex items-center justify-between p-4 mb-5 bg-white">
                    <h1 className="font-bold">Modules</h1>
                </div>
                {/* </Sticky> */}
                <div className="grid grid-cols-1 md:grid-cols-7" id="containerModules">
                    <div className=" col-span-1 md:col-span-3 flex flex-col p-3">
                        <div className="flex justify-between mb-2 md:mb-5">
                            <h1 className="font-bold text-xl">Module</h1>
                            <Button type="primary" onClick={() => { rt.push(`/admin/modules/create/module?module=${datamodules.length}`) }}>Tambah</Button>
                        </div>
                        <div className="mb-2 md:mb-5">
                            <Input style={{ width: `100%` }} placeholder="Cari module" onChange={(e) => {
                                if (e.target.value === "") {
                                    setdatamodules(datamodules3)
                                }
                                else {
                                    const filtered = datamodules2.filter(flt => {
                                        return flt.name.toLowerCase().includes(e.target.value.toLowerCase())
                                    })
                                    setdatamodules(filtered)
                                }
                            }} />
                        </div>
                        {
                            praloadingmodule ?
                                <div id={`panel0`} className=" flex justify-center">
                                    <Spin size="large" />
                                </div>
                                :
                                <div className=" mb-2 md:mb-5">
                                    <Collapse accordion defaultActiveKey={module !== "" || typeof (module) !== 'undefined' ? Number(module) : 0} onChange={(value) => {
                                        if (typeof (value) === 'undefined') {
                                            setdisplayarrow(false)
                                            setrightstatus(true)
                                            setleftstatus(true)
                                            setmodulecounter(0)
                                            setfeaturecounter(0)
                                            setcheckeddatamodules([])
                                            setcheckeddatafeatures([])
                                            setpraloadingmodulefeat(true)
                                            setsearchmodulefeature("")
                                        }
                                        else {
                                            setpraloadingmodulefeat(false)
                                            setdisplayarrow(true)
                                            setcheckeddatamodules([])
                                            setcheckeddatafeatures([])
                                            setcheckedmodules(value)
                                            setmodulecounter(0)
                                            setfeaturecounter(0)
                                            setdatadeletemodule({ ...datadeletemodule, id: datamodules[value].id })
                                            datamodules[value].feature ? setidmodulemap(datamodules[value].feature.map((doc, idx) => doc.id)) : setidmodulemap([])
                                            setscrolltrigger(value)
                                        }
                                    }}>
                                        {
                                            datamodules.map((doc, idx) => {
                                                return (
                                                    <Panel id={`panel${idx}`} key={idx} header={<strong>{doc.name}</strong>}
                                                        extra={
                                                            <div className="flex">
                                                                <EditOutlined style={{ marginRight: `1rem` }} onClick={() => { rt.push(`/admin/modules/update/module/${doc.id}?module=${idx}`) }} />
                                                                <DeleteOutlined style={{ color: `red` }} onClick={() => { setmodaldelete(true) }} />
                                                            </div>
                                                        }>
                                                        <div className="flex flex-col">
                                                            <div className="flex justify-between border-b pb-3 mb-3">
                                                                <div>
                                                                    {/* <Checkbox checked={checkAll} onChange={(e) => { onCheckedAll(e) }} />  */}
                                                                    {modulecounter}/{doc.feature ? doc.feature.length : 0} {checkeddatamodules.length > 1 ? "items" : "item"}
                                                                </div>
                                                                <div>
                                                                    <strong>Feature yang terdaftar pada - Module {doc.name}</strong>
                                                                </div>
                                                            </div>
                                                            <div className="mb-5">
                                                                <Input placeholder="Cari feature terdaftar" onChange={(e) => {
                                                                    setsearchmodulefeature(e.target.value.toLowerCase())
                                                                }}></Input>
                                                            </div>
                                                            <div className="overflow-y-auto flex flex-col h-48 mb-5 border-b pb-3">
                                                                {
                                                                    praloadingmodulefeat ?
                                                                        null
                                                                        :
                                                                        <>
                                                                            {
                                                                                doc.feature ?
                                                                                    doc.feature.map((doc2, idx2) => {
                                                                                        const st = checkeddatamodules.includes(doc2.id)
                                                                                        if (doc2.name.toLowerCase().includes(searchmodulefeature.toLowerCase())) {
                                                                                            return (
                                                                                                <div className="flex items-center my-2">
                                                                                                    <Checkbox checked={st} onChange={(e) => { onChangeUpdateCheckbox2(e, doc2.id, idx) }} style={{ marginRight: `1rem` }} /> {doc2.name}
                                                                                                </div>
                                                                                            )
                                                                                        }
                                                                                    })
                                                                                    :
                                                                                    null
                                                                            }
                                                                        </>
                                                                }
                                                            </div>
                                                            <div>
                                                                <h1 className="font-semibold text-lg">Deskripsi</h1>
                                                                <p className="text-xs mb-0">
                                                                    {doc.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Panel>
                                                )
                                            })
                                        }
                                    </Collapse>
                                </div>
                        }
                    </div>
                    <Sticky containerSelectorFocus="#containerModules" offsetTop={400}>
                        <div className=" col-span-1 md:col-span-1 flex flex-col justify-center items-center">
                            {
                                displayarrow ?
                                    <>
                                        <Button type="primary" onClick={() => { setmodaldeletefeatmodule(true) /*console.log(checkeddatamodules); console.log(datamodules[checkedmodules].feature)*/ }} disabled={rightstatus || modulecounter < 1} style={{ marginBottom: `0.5rem` }}><ArrowRightOutlined /></Button>
                                        <Button type="primary" onClick={() => { setmodalcreate(true) }} disabled={leftstatus || featurecounter < 1} style={{ marginBottom: `0.5rem` }}><ArrowLeftOutlined /></Button>
                                    </>
                                    :
                                    null
                            }
                        </div>
                    </Sticky>
                    <div className=" col-span-1 md:col-span-3 flex flex-col p-3">
                        <div className="flex justify-between mb-2 md:mb-5">
                            <h1 className="font-bold text-xl">Feature</h1>
                            <Button type="primary" onClick={() => { rt.push(`/admin/modules/create/feature?feature=${listfeat.length}`) }}>Tambah</Button>
                        </div>
                        <div className="mb-2 md:mb-5">
                            <Input style={{ width: `100%` }} placeholder="Cari feature" onChange={(e) => {
                                if (e.target.value === "") {
                                    setlistfeat(listfeat3)
                                }
                                else {
                                    const filtered = listfeat2.filter(flt => {
                                        return flt.name.toLowerCase().includes(e.target.value.toLowerCase())
                                    })
                                    setlistfeat(filtered)
                                }
                            }} />
                        </div>
                        {
                            praloadingfeature ?
                                <Spin size="large" />
                                :
                                <div className=" mb-2 md:mb-5">
                                    {
                                        displayarrow ?
                                            <Sticky containerSelectorFocus="#containerModules" offsetTop={60}>
                                                {
                                                    datamodules.length > 0 ?
                                                        <div className="flex flex-col border p-2">
                                                            <div className="flex justify-between border-b pb-3 mb-3">
                                                                <div>
                                                                    {/* <Checkbox />  */}
                                                                    {featurecounter}/{listfeat.length - idmodulemap.length} {checkeddatafeatures.length > 1 ? "items" : "item"}
                                                                </div>
                                                                <div>
                                                                    <strong>Feature yang tidak terdaftar pada - Module {datamodules[checkedmodules] ? datamodules[checkedmodules].name : ""}</strong>
                                                                </div>
                                                            </div>
                                                            <div className="mb-5">
                                                                <Input placeholder="Cari feature terdaftar" onChange={(e) => {
                                                                    setsearchfeature(e.target.value.toLowerCase())
                                                                }}></Input>
                                                            </div>
                                                            <div className="overflow-y-auto flex flex-col h-80 mb-5 border-b pb-5">
                                                                {
                                                                    listfeat.map((doc3, idx3) => {
                                                                        const st = checkeddatafeatures.includes(doc3.feature_id)
                                                                        if (!idmodulemap.includes(doc3.feature_id)) {
                                                                            if (doc3.name.toLowerCase().includes(searchfeature.toLowerCase())) {
                                                                                return (
                                                                                    <div key={idx3} className="flex items-center my-1">
                                                                                        <Checkbox checked={st} style={{ marginRight: `1rem` }} onChange={(e) => { onChangeUpdateCheckbox3(e, doc3.feature_id, idx3) }} style={{ marginRight: `1rem` }} /> {doc3.name}
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        }
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                        :
                                                        null
                                                }
                                            </Sticky>
                                            :
                                            <Collapse accordion defaultActiveKey={feature ? Number(feature) : 0} onChange={(value) => {
                                                if (typeof (value) !== 'undefined') {
                                                    setcheckeddatafeatures([])
                                                    setcheckedfeatures(value)
                                                    setdatadeletefeature({ ...datadeletefeature, id: listfeat[value].id })
                                                }
                                            }}>
                                                {
                                                    listfeat.map((doc, idx) => {
                                                        return (
                                                            <Panel key={idx} header={doc.name}
                                                                extra={
                                                                    <div className="flex">
                                                                        <EditOutlined style={{ marginRight: `1rem` }} onClick={() => { rt.push(`/admin/modules/update/feature/${doc.id}?feature=${idx}`) }} />
                                                                        <DeleteOutlined style={{ color: `red` }} onClick={() => { setmodaldelete2(true) }} />
                                                                    </div>
                                                                }>
                                                                <p>{doc.description}</p>
                                                            </Panel>
                                                        )
                                                    })
                                                }
                                            </Collapse>
                                    }
                                </div>
                        }
                    </div>
                </div>
            </div>
            {/* <Drawer title={`Tambah Module`} maskClosable={false} visible={drawablecreate} onClose={() => { setdrawablecreate(false); }} width={380} destroyOnClose={true}>
                <div className="flex flex-col">
                    <Form layout="vertical" initialValues={datatambahmodule} onFinish={handleCreate}>
                        <Form.Item label="Nama Module" rules={[
                            {
                                required: true,
                                message: 'Nama module wajib diisi',
                            },
                        ]} name="name">
                            <Input name="name" onChange={(e) => { setdatatambahmodule({ ...datatambahmodule, name: e.target.value }) }} />
                        </Form.Item>
                        <Form.Item label="Deskripsi" rules={[
                            {
                                required: true,
                                message: 'Deskripsi wajib diisi',
                            },
                        ]} name="description">
                            <Input name="description" onChange={(e) => { setdatatambahmodule({ ...datatambahmodule, description: e.target.value }) }} />
                        </Form.Item>
                        <h1 className="font-semibold">Pilih Feature</h1>
                        <div className=" overflow-y-auto h-80 mb-5">
                            {
                                listfeat.map((doc, idx) => {
                                    return (
                                        <div key={idx} className="flex items-center hover:bg-gray-300 p-3">
                                            <Checkbox style={{ marginRight: `1rem` }} onChange={(e) => { onChangeCreateCheckbox(e, doc.feature_id) }} /> {doc.name}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="flex justify-end">
                            <Button type="default" onClick={() => { setdrawablecreate(false) }} style={{ marginRight: `1rem` }}>Cancel</Button>
                            <Button htmlType="submit" type="primary" loading={loadiingcreate}>Save</Button>
                        </div>
                    </Form>
                </div>
            </Drawer>
            <Drawer title={`Edit Module ${currentselectkateg}`} maskClosable={false} visible={drawableedit} onClose={() => { setdrawableedit(false); }} width={380} destroyOnClose={true}>
                <div className="flex flex-col">
                    <Form layout="vertical" initialValues={dataeditmodule} onFinish={handleUpdate}>
                        <Form.Item label="Nama Module" rules={[
                            {
                                required: true,
                                message: 'Nama module wajib diisi',
                            },
                        ]} name="name">
                            <Input name="name" defaultValue={currentselectkateg} disabled />
                        </Form.Item>
                        <Form.Item label="Deskripsi" rules={[
                            {
                                required: true,
                                message: 'Deskripsi wajib diisi',
                            },
                        ]} style={{ marginBottom: `3rem` }} name="description">
                            <Input name="name" defaultValue={currentdesctkateg} disabled />
                        </Form.Item>
                        <div className=" overflow-y-auto h-80 mb-5">
                            {
                                listfeat.map((doc, idx) => {
                                    const checkedStatus = dataeditmodule.feature_ids.includes(doc.feature_id)
                                    return (
                                        <div key={idx} className="flex items-center hover:bg-gray-300 p-3">
                                            <Checkbox style={{ marginRight: `1rem` }} onChange={(e) => { onChangeUpdateCheckbox(e, doc.feature_id) }} defaultChecked={checkedStatus} /> {doc.name}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="flex justify-end">
                            <Button type="default" onClick={() => { setdrawableedit(false) }} style={{ marginRight: `1rem` }}>Cancel</Button>
                            <Button loading={loadiingupdate} type="primary" onClick={handleUpdate}>Save</Button>
                        </div>
                    </Form>
                </div>
            </Drawer> */}
            <Modal
                title={`Konfirmasi Tambah Feature pada Module`}
                visible={modalcreate}
                onCancel={() => { setloadingcreate(false); setmodalcreate(false) }}
                onOk={handleAddModuleFeature}
                okButtonProps={{ disabled: loadiingcreate }}
                okText="Ya"
                cancelText="Tidak"
                style={{ top: `3rem` }}
                width={500}
                destroyOnClose={true}
            >
                <div className="flex flex-col">
                    <p>Apakah anda yakin ingin menambahkan Feature berikut ke Module <strong>{datamodules[checkedmodules] ? datamodules[checkedmodules].name : null}</strong>?</p>
                    {
                        datamodules.length < 1 ?
                            <p className="font-semibold">-</p>
                            :
                            <ol>
                                {
                                    checkeddatafeatures.length > 0 ?
                                        listfeat.map((doc, idx) => {
                                            if (checkeddatafeatures.includes(doc.feature_id)) {
                                                return (
                                                    <li key={idx} className="font-semibold">{"-"} {doc.name}</li>
                                                )
                                            }
                                        })
                                        :
                                        "-"
                                }
                            </ol>
                    }
                </div>
            </Modal>
            <Modal
                title={`Konfirmasi Hapus Feature pada Module`}
                visible={modaldeletefeatmodule}
                onCancel={() => { setloadingdeletefeatmodule(false); setmodaldeletefeatmodule(false) }}
                onOk={handleDeleteModuleFeature}
                okButtonProps={{ disabled: loadingdeletefeatmodule }}
                okText="Ya"
                cancelText="Tidak"
                style={{ top: `3rem` }}
                width={500}
                destroyOnClose={true}
            >
                <div className="flex flex-col">
                    <p>Apakah anda yakin ingin mengeluarkan Feature berikut dari Module <strong>{datamodules[checkedmodules] ? datamodules[checkedmodules].name : null}</strong>?</p>
                    {
                        datamodules.length < 1 ?
                            <p className="font-semibold">----</p>
                            :
                            <ol>
                                {
                                    checkeddatamodules.length > 0 && datamodules[checkedmodules].feature ?
                                        datamodules[checkedmodules].feature.map((doc, idx) => {
                                            if (checkeddatamodules.includes(doc.id)) {
                                                return (
                                                    <li key={idx} className="font-semibold">- {doc.name}</li>
                                                )
                                            }
                                        })
                                        :
                                        "-"
                                }
                            </ol>
                    }
                </div>
            </Modal>
            <Modal
                title="Konfirmasi hapus module"
                visible={modaldelete}
                onOk={handleDeleteModule}
                onCancel={() => setmodaldelete(false)}
                okText="Ya"
                cancelText="Tidak"
                okButtonProps={{ disabled: loadiingdelete }}
            >
                <p>Apakah anda yakin ingin menghapus Module <strong>{datamodules[checkedmodules] > 0 ? datamodules[checkedmodules].name : null}</strong> yang memiliki Feature berikut ini?</p>
                {
                    datamodules[checkedmodules] ?
                        <p className="font-semibold">-</p>
                        :
                        <ol>
                            {
                                datamodules[checkedmodules] ?
                                    datamodules[checkedmodules].feature.map((doc, idx) => {
                                        return (
                                            <li key={idx} className="font-semibold">{idx + 1}. {doc.name}</li>
                                        )
                                    })
                                    :
                                    "-"
                            }
                        </ol>
                }
            </Modal>
            <Modal
                title="Konfirmasi hapus feature"
                visible={modaldelete2}
                onOk={handleDeleteFeature}
                onCancel={() => setmodaldelete2(false)}
                okText="Ya"
                cancelText="Tidak"
                okButtonProps={{ disabled: loadiingdelete2 }}
            >
                <p>Apakah Anda yakin untuk menghapus fitur <strong>{listfeat.length > 0 ? listfeat[checkedfeatures].name : null}</strong> yang terdaftar pada modul:</p>
                {
                    listfeat.length < 1 ?
                        <p className="font-semibold">-</p>
                        :
                        <ol>
                            {
                                datamodules ?
                                    datamodules.map((doc, idx) => {
                                        const status = doc.feature !== null ? doc.feature.map(doc => doc.id).includes(listfeat[checkedfeatures].feature_id) : false
                                        if (status) {
                                            return (
                                                <li key={idx} className="font-semibold">- {doc.name}</li>
                                            )
                                        }
                                    })
                                    :
                                    "-"
                            }
                        </ol>
                }
            </Modal>
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
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjson = await resources.json()
    const dataProfile = resjson

    if (![179, 180, 181, 182].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
        res.writeHead(302, { Location: '/dashboard/admin' })
        res.end()
    }

    // const resourcesGM = await fetch(`https://boiling-thicket-46501.herokuapp.com/getModules`, {
    //     method: `POST`,
    //     headers: {
    //         'Authorization': JSON.parse(initProps)
    //     }
    // })
    // const resjsonGM = await resourcesGM.json()
    // const dataListModules = resjsonGM

    // const resourcesGF = await fetch(`https://boiling-thicket-46501.herokuapp.com/getAccessFeature`, {
    //     method: `POST`,
    //     headers: {
    //         'Authorization': JSON.parse(initProps)
    //     }
    // })
    // const resjsonGF = await resourcesGF.json()
    // const dataListFeatures = resjsonGF

    return {
        props: {
            initProps,
            dataProfile,
            // dataListModules,
            // dataListFeatures,
            sidemenu: "4"
        },
    }
}

export default ModulesIndex


// <div className="w-full grid grid-cols-5 bg-white">
                    //     <div className="col-span-5">
                    //         <div className="w-full grid grid-cols-9">
                    //             <div className="col-span-2 hidden md:flex flex-col border-r pr-2">
                    //                 <div>
                    //                     {
                    //                         datamodules.map((doc, idx) => {
                    //                             return (
                    //                                 <>
                    //                                     {
                    //                                         tabnameArrVal[idx] === "block" ?
                    //                                             <div className={`p-2 cursor-pointer flex items-center bg-primary text-white rounded-sm`}>
                    //                                                 {doc.name}
                    //                                             </div>
                    //                                             :
                    //                                             <div className={`p-2 cursor-pointer hover:text-gray-900 flex items-center text-sm font-semibold`} onClick={(e) => { onChangeTab(e, (idx), doc.name, doc.description, doc.id, doc.feature) }}>
                    //                                                 {doc.name}
                    //                                             </div>
                    //                                     }
                    //                                 </>
                    //                             )
                    //                         })
                    //                     }
                    //                 </div>
                    //             </div>
                    //             <div className=" col-span-9 md:col-span-7">
                    //                 <div className="w-full flex md:hidden mb-5">
                    //                     <Select defaultValue={currentselectkateg} onChange={(value) => { onChangeTabSmall(value) }} style={{ width: `100%` }}>
                    //                         {
                    //                             datamodules.map((doc, idx) => {
                    //                                 if (doc.feature === null || doc.feature === "null" || typeof (doc.feature) === undefined || typeof (doc.feature) === 'undefined') {
                    //                                     doc.feature = []
                    //                                 }
                    //                                 return (
                    //                                     <Option value={doc.name}>{doc.name}</Option>
                    //                                 )
                    //                             })
                    //                         }
                    //                     </Select>
                    //                 </div>
                    //                 <div className={` p-0 md:py-5 md:px-7 flex flex-col`}>
                    //                     <div className="flex justify-between items-center mb-1 md:mb-5">
                    //                         <div className="flex flex-col justify-center">
                    //                             <div className="flex items-center mb-1">
                    //                                 <div className="flex flex-col justify-center mr-8">
                    //                                     <p className="font-semibold mb-1">{currentselectkateg}</p>
                    //                                     <p className="text-xs text-gray-500">{currentdesctkateg}</p>
                    //                                 </div>
                    //                                 <div className="flex items-center">
                    //                                     {
                    //                                         [181].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                    //                                         <Button disabled={loadinglistfeat} onClick={() => { setdrawableedit(true) }} style={{ paddingTop: `0`, paddingBottom: `0.3rem`, marginRight: `1rem` }}>
                    //                                             <EditOutlined />
                    //                                         </Button>
                    //                                     }
                    //                                     {
                    //                                         [182].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                    //                                         <Button onClick={() => { setmodaldelete(true) }} style={{ paddingTop: `0`, paddingBottom: `0.3rem` }}>
                    //                                             <DeleteOutlined />
                    //                                         </Button>
                    //                                     }
                    //                                 </div>
                    //                             </div>
                    //                         </div>
                    //                     </div>
                    //                     <div>
                    //                         {
                    //                             datafeature.length !== 0 ?
                    //                                 <>
                    //                                     {
                    //                                         datafeature.map((doc, idx) => {
                    //                                             return (
                    //                                                 <div key={idx} className="border-b mb-3 p-3">
                    //                                                     <p className="mb-0 text-sm">{doc.name} : {doc.id}</p>
                    //                                                 </div>
                    //                                             )
                    //                                         })
                    //                                     }
                    //                                 </>
                    //                                 :
                    //                                 <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
                    //                         }
                    //                     </div>
                    //                 </div>
                    //             </div>
                    //         </div>
                    //     </div>
                    // </div>