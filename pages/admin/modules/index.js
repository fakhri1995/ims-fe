import { useRouter } from 'next/router'
import { useState } from 'react'
import httpcookie from 'cookie'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, Drawer, Checkbox, Select, Empty, notification } from 'antd'
import Layout from '../../../components/layout-dashboard'
import st from '../../../components/layout-dashboard.module.css'
import Sticky from 'wil-react-sticky'

const ModulesIndex = ({ initProps, dataProfile, dataListModules, dataListFeatures, sidemenu }) => {
    //Initialization
    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)
    const { Option } = Select
    const tabnameArr = []
    const loop = []
    dataListModules.data.map((doc, idx) => {
        var nama = doc.name.split(" ")[0]
        tabnameArr.push(nama)
    })
    for (var i = 0; i < dataListModules.data.length; i++) {
        if (i === 0) {
            loop.push("block")
        }
        else {
            loop.push("hidden")
        }
    }

    //useState
    //1. Basic
    const [tabnameArrVal, settabnameArrVal] = useState(loop)
    const [currentselectkateg, setcurrentselectkateg] = useState(dataListModules.data[0].name)
    const [currentdesctkateg, setcurrentdesckateg] = useState(dataListModules.data[0].description)
    const [datafeature, setdatafeature] = useState([])

    //2. Create
    const [datatambahmodule, setdatatambahmodule] = useState({
        name: '',
        description: '',
        feature_ids: []
    })
    const [drawablecreate, setdrawablecreate] = useState(false)
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
    const [modaldelete, setmodaldelete] = useState(false)
    const [loadiingdelete, setloadingdelete] = useState(false)

    //event
    const onChangeTab = (e, jenis, idxjenis, namakateg, deskripsi, id, feature) => {
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
            variable = dataListModules.data.filter(dataa => { return dataa.name == namakateg }).map((doc, idx) => {
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

    //handler
    const handleCreate = () => {
        setloadingcreate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addModule`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datatambahmodule)
        })
            .then((res) => res.json())
            .then(res2 => {
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setdatatambahmodule({
                        name: '',
                        description: '',
                        feature_ids: []
                    })
                    setTimeout(() => {
                        setloadingcreate(false)
                        setdrawablecreate(false)
                        rt.push(`/admin/modules`)
                    }, 300)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3,
                    })
                    setloadingcreate(false)
                    setdrawablecreate(false)
                }
            })
    }
    const handleUpdate = ()=>{
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
                        rt.push(`/admin/modules`)
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
    const handleDelete = () => {
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
                        message: res2.message,
                        duration: 3
                    })
                    setdatadeletemodule({
                        id: 0
                    })
                    setTimeout(() => {
                        setloadingdelete(false)
                        setmodaldelete(false)
                        rt.push(`/admin/modules`)
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

    return (
        <Layout tok={initProps} dataProfile={dataProfile} sidemenu={sidemenu} st={st} pathArr={pathArr}>
            <div id="containerListModules" className="w-full border-t border-opacity-30 border-gray-500">
                <Sticky containerSelectorFocus="#containerListModules">
                    <div className="w-full border-b border-opacity-30 border-gray-400 flex items-center justify-between p-4 mb-5 bg-white">
                        <h1 className="font-bold">Modules</h1>
                        <Button type="primary" size="large" onClick={() => { setdrawablecreate(true) }}>Add New</Button>
                    </div>
                </Sticky>
                <div className="w-full grid grid-cols-5 bg-white">
                    <div className="col-span-5">
                        <div className="w-full grid grid-cols-9">
                            <div className="col-span-2 hidden md:flex flex-col border-r pr-2">
                                <div>
                                    {
                                        dataListModules.data.map((doc, idx) => {
                                            if (doc.feature === null || doc.feature === "null" || typeof (doc.feature) === undefined || typeof (doc.feature) === 'undefined') {
                                                doc.feature = []
                                            }
                                            return (
                                                <>
                                                    {
                                                        tabnameArrVal[idx] === "block" ?
                                                            <div className={`p-2 cursor-pointer flex items-center bg-primary text-white rounded-sm`}>
                                                                {doc.name}
                                                            </div>
                                                            :
                                                            <div className={`p-2 cursor-pointer hover:text-gray-900 flex items-center text-sm font-semibold`} onClick={(e) => { onChangeTab(e, tabnameArr[idx], (idx), doc.name, doc.description, doc.id, doc.feature) }}>
                                                                {doc.name}
                                                            </div>
                                                    }
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className=" col-span-9 md:col-span-7">
                                <div className="w-full flex md:hidden mb-5">
                                    <Select defaultValue={currentselectkateg} onChange={(value) => { onChangeTabSmall(value) }} style={{ width: `100%` }}>
                                        {
                                            dataListModules.data.map((doc, idx) => {
                                                if (doc.feature === null || doc.feature === "null" || typeof (doc.feature) === undefined || typeof (doc.feature) === 'undefined') {
                                                    doc.feature = []
                                                }
                                                return (
                                                    <Option value={doc.name}>{doc.name}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </div>
                                <div className={` p-0 md:py-5 md:px-7 flex flex-col`}>
                                    <div className="flex justify-between items-center mb-1 md:mb-5">
                                        <div className="flex flex-col justify-center">
                                            <div className="flex items-center mb-1">
                                                <div className="flex flex-col justify-center mr-8">
                                                    <p className="font-semibold mb-1">{currentselectkateg}</p>
                                                    <p className="text-xs text-gray-500">{currentdesctkateg}</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <Button onClick={() => { setdrawableedit(true) }} style={{ paddingTop: `0`, paddingBottom: `0.3rem`, marginRight: `1rem` }}>
                                                        <EditOutlined />
                                                    </Button>
                                                    <Button onClick={() => { setmodaldelete(true) }} style={{ paddingTop: `0`, paddingBottom: `0.3rem` }}>
                                                        <DeleteOutlined />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            datafeature.length !== 0 ?
                                                <>
                                                    {
                                                        datafeature.map((doc, idx) => {
                                                            return (
                                                                <div key={idx} className="border-b mb-3 p-3">
                                                                    <p className="mb-0 text-sm">{doc.name}</p>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </>
                                                :
                                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Drawer title={`Tambah Module`} maskClosable={false} visible={drawablecreate} onClose={() => { setdrawablecreate(false); }} width={380} destroyOnClose={true}>
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
                        {/* <Input prefix={<SearchOutlined />} placeholder="Cari Fitur" style={{ borderRadius: `0.1rem`, marginBottom: `1rem` }} /> */}
                        <h1 className="font-semibold">Pilih Feature</h1>
                        <div className=" overflow-y-auto h-80 mb-5">
                            {
                                dataListFeatures.map((doc, idx) => {
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
                            <Input name="name" defaultValue={currentselectkateg} disabled/>
                        </Form.Item>
                        <Form.Item label="Deskripsi" rules={[
                            {
                                required: true,
                                message: 'Deskripsi wajib diisi',
                            },
                        ]} style={{ marginBottom: `3rem` }} name="description">
                            <Input name="name" defaultValue={currentdesctkateg} disabled/>
                        </Form.Item>
                        {/* <Input prefix={<SearchOutlined />} placeholder="Cari Fitur" style={{ borderRadius: `0.5rem`, marginBottom: `1rem` }} /> */}
                        <div className=" overflow-y-auto h-80 mb-5">
                            {
                                dataListFeatures.map((doc, idx) => {
                                    const checkedStatus = dataeditmodule.feature_ids.includes(doc.feature_id)
                                    return (
                                        <div key={idx} className="flex items-center hover:bg-gray-300 p-3">
                                            <Checkbox style={{ marginRight: `1rem` }} onChange={(e) => { onChangeUpdateCheckbox(e, doc.feature_id) }} defaultChecked={checkedStatus}/> {doc.name}
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
            </Drawer>
            <Modal
                title={`Konfirmasi Hapus Module`}
                visible={modaldelete}
                onCancel={() => { setmodaldelete(false) }}
                onOk={handleDelete}
                okButtonProps={{ disabled: loadiingdelete }}
                style={{ top: `3rem` }}
                width={500}
                destroyOnClose={true}
            >
                <h1>Yakin ingin hapus module {currentselectkateg} ini?</h1>
            </Modal>
        </Layout>
    )
}

export async function getServerSideProps({ req, res }) {
    var initProps = {};
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

    const resourcesGM = await fetch(`https://boiling-thicket-46501.herokuapp.com/getModules`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGM = await resourcesGM.json()
    const dataListModules = resjsonGM

    const resourcesGF = await fetch(`https://boiling-thicket-46501.herokuapp.com/getAccessFeature`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGF = await resourcesGF.json()
    const dataListFeatures = resjsonGF

    return {
        props: {
            initProps,
            dataProfile,
            dataListModules,
            dataListFeatures,
            sidemenu: "4"
        },
    }
}

export default ModulesIndex
