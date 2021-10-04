import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import httpcookie from 'cookie'
import Link from 'next/link'
import { QuestionCircleOutlined } from '@ant-design/icons'
import Sticky from 'wil-react-sticky'
import { Form, Input, notification, Button, Modal, Checkbox, Select, Spin, InputNumber, DatePicker, Collapse, Timeline, Empty, Tooltip, TreeSelect } from 'antd'
import Layout from '../../../components/layout-dashboard2'
import st from '../../../components/layout-dashboard.module.css'
import moment from 'moment'

const ItemCreate = ({ initProps, sidemenu, dataProfile }) => {
    // 1.Init
    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)
    pathArr.splice(3, 1)
    pathArr[pathArr.length - 1] = "Tambah Item"
    const [instanceForm] = Form.useForm();
    const [instanceForm2] = Form.useForm();
    const { Panel } = Collapse

    //2.useState
    const [newdata, setnewdata] = useState({
        model_id: 0,
        vendor_id: 0,
        inventory_name: "",
        status_condition: 0,
        status_usage: 0,
        serial_number: "",
        location: 0,
        is_exist: true,
        deskripsi: "",
        manufacturer_id: 0,
        mig_id: "",
        notes: "",
        inventory_values: [],
        inventory_parts: [
            {
                model_id: 0,
                vendor_id: null,
                inventory_name: "",
                status_condition: null,
                status_usage: null,
                serial_number: "",
                is_exist: true,
                deskripsi: "",
                manufacturer_id: null,
                mig_id: "",
                inventory_values: [],
                inventory_parts: []
            }
        ]
    })
    const [invrelations, setinvrelations] = useState({
        models: [],
        assets: [],
        manufacturers: [],
        status_condition: [],
        status_usage: [],
        vendors: [],
        companies: [],
        tree_companies: {}
    })
    const [modeldata, setmodeldata] = useState([])
    const [columnsmodeldata, setcolumnsmodeldata] = useState([])
    const [partmodeldata, setpartmodeldata] = useState([])
    const [assetnameitem, setassetnameitem] = useState("")
    const [snitem, setsnitem] = useState(false)
    const [disabledfielditem, setdisabledfielditem] = useState(true)
    const [manuffielditem, setmanuffielditem] = useState(true)
    const [dynamicfielditem, setdynamicfielditem] = useState([])
    const [praloading, setpraloading] = useState(true)
    const [loadingspec, setloadingspec] = useState(false)
    const [modalfinal, setmodalfinal] = useState(false)
    const [loadingcreate, setloadingcreate] = useState(false)
    //2.1trigger
    const [emptyfieldpart, setemptyfieldpart] = useState([])
    const [emptyfieldpartmodel, setemptyfieldpartmodel] = useState(0)
    const [emptyfieldparttrigger, setemptyfieldparttrigger] = useState(0)

    //2.helper function
    const searchPart = (doc, partid) => {
        for (var i = 0; i < doc.length; i++) {
            if (doc[i].model_id === partid) {
                const mandatoryfieldspec = doc[i].inventory_values.filter(docfil => docfil.required === true).map(docmap => {
                    if (docmap.data_type === 'dropdown') {
                        return docmap.default.default
                    }
                    else if (docmap.data_type === 'checkbox') {
                        if (docmap.default.default.length === 0) {
                            return ""
                        }
                        else {
                            return "ada"
                        }
                    }
                    else {
                        return docmap.default
                    }
                })
                if (doc[i].inventory_name === "" || doc[i].mig_id === "" || doc[i].status_condition === "" || doc[i].status_usage === "" || doc[i].serial_number === "" || mandatoryfieldspec.includes("") || mandatoryfieldspec.includes("-")) {
                    return true
                }
                else {
                    return false
                }
            }
            if (doc[i].inventory_parts) {
                searchPart(doc[i].inventory_parts, partid)
            }
        }
    }
    const changeEnablePart = (doq, partid, checked) => {
        var arr = []
        for (var i = 0; i < doq.length; i++) {
            if (doq[i].model_id === Number(partid)) {
                arr.push({
                    ...doq[i],
                    enable_part: checked ? true : false
                })
            }
            else {
                if (doq[i].inventory_parts.length > 0) {
                    arr.push({
                        ...doq[i],
                        inventory_parts: changeEnablePart(doq[i].inventory_parts, partid, checked)
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
    const changeDataPart = (doq, partid, attr, value) => {
        var arr = []
        for (var i = 0; i < doq.length; i++) {
            if (doq[i].model_id === Number(partid)) {
                arr.push({
                    ...doq[i],
                    [attr]: value
                })
            }
            else {
                if (doq[i].inventory_parts) {
                    arr.push({
                        ...doq[i],
                        inventory_parts: changeDataPart(doq[i].inventory_parts, partid, attr, value)
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
    const changeInventoryValuesPart = (doq, partid, idcolumn, value) => {
        var arr = []
        for (var i = 0; i < doq.length; i++) {
            if (doq[i].model_id === Number(partid)) {
                const idxfield = doq[i].inventory_values.map(docname => docname.model_inventory_column_id).indexOf(idcolumn)
                doq[i].inventory_values[idxfield].default = value
                doq[i].inventory_values[idxfield].value = value
                arr.push({
                    ...doq[i],
                })
            }
            else {
                if (doq[i].inventory_parts) {
                    arr.push({
                        ...doq[i],
                        inventory_parts: changeInventoryValuesPart(doq[i].inventory_parts, partid, idcolumn, value)
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
    const changeInventoryValuesDropdownPart = (doq, partid, idcolumn, value) => {
        var arr = []
        for (var i = 0; i < doq.length; i++) {
            if (doq[i].model_id === Number(partid)) {
                const idxfield = doq[i].inventory_values.map(docname => docname.model_inventory_column_id).indexOf(idcolumn)
                doq[i].inventory_values[idxfield].default.default = value
                doq[i].inventory_values[idxfield].value.default = value
                arr.push({
                    ...doq[i],
                })
            }
            else {
                if (doq[i].inventory_parts) {
                    arr.push({
                        ...doq[i],
                        inventory_parts: changeInventoryValuesDropdownPart(doq[i].inventory_parts, partid, idcolumn, value)
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
    const changeInventoryValuesCheckboxPart = (doq, partid, idcolumn, checked, idx, value) => {
        var arr = []
        for (var i = 0; i < doq.length; i++) {
            if (doq[i].model_id === Number(partid)) {
                const idxfield = doq[i].inventory_values.map(docname => docname.model_inventory_column_id).indexOf(idcolumn)
                if (checked === true) {
                    console.log(idx)
                    doq[i].inventory_values[idxfield].value.default.push(idx)
                    doq[i].inventory_values[idxfield].default.default.push(idx)
                }
                else {
                    var idxtoremove = doq[i].inventory_values[idxfield].value.default.indexOf(idx)
                    doq[i].inventory_values[idxfield].value.default.splice(idxtoremove, 1)
                    doq[i].inventory_values[idxfield].default.default.splice(idxtoremove, 1)
                }
                arr.push({
                    ...doq[i],
                })
            }
            else {
                if (doq[i].inventory_parts) {
                    arr.push({
                        ...doq[i],
                        inventory_parts: changeInventoryValuesCheckboxPart(doq[i].inventory_parts, partid, idcolumn, checked, idx, value)
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
    const renderChildPartModel = (item) => {
        return (
            item.map((doc, idx) => {
                return (
                    <Children doc={doc} idx={idx}></Children>
                )
            })
        )
    }
    const Children = ({ doc, idx }) => {
        return (
            <Timeline.Item>
                <Collapse>
                    {
                        <Panel id={`panel${idx}`} key={idx} header={<strong>{doc.model_name}</strong>}
                            extra={
                                <div className="flex">
                                    <Checkbox checked={doc.enable_part} style={{ marginRight: `0.5rem` }} onChange={(e) => {
                                        var temp = newdata.inventory_parts
                                        const selectedpart = changeEnablePart(temp, doc.model_id, e.target.checked)
                                        setpartmodeldata(selectedpart)
                                        setnewdata(prev => {
                                            var temp = prev
                                            temp.inventory_parts = selectedpart
                                            return temp
                                        })
                                    }}></Checkbox>
                                    <p className="mb-0">{doc.enable_part ? "Item Ada" : "Item Tidak Ada"}</p>
                                </div>
                            }>
                            <div className="flex flex-col p-5 mb-3 relative">
                                {
                                    doc.enable_part === false ?
                                        <div className="absolute left-0 right-0 top-0 bottom-0 z-10 bg-white bg-opacity-80"></div>
                                        :
                                        null
                                }
                                <Form layout="vertical">
                                    <Form.Item name="model_id" label={
                                        <div className="flex">
                                            <span className="judulField"></span>
                                            <p className="mb-0 ml-1">Asset Type</p>
                                            <style jsx>
                                                {`
                                                        .judulField::before{
                                                            content: '*';
                                                            color: red;
                                                        }
                                                    `}
                                            </style>
                                        </div>
                                    }>
                                        <div className="w-full rounded bg-gray-200 p-2 h-10">{doc.asset_name}</div>
                                    </Form.Item>
                                    <Form.Item name="inventory_name" label={
                                        <div className="flex">
                                            <span className="namaItem"></span>
                                            <p className="mb-0 ml-1">Nama Item</p>
                                            <style jsx>
                                                {`
                                                    .namaItem::before{
                                                        content: '*';
                                                        color: red;
                                                    }
                                                `}
                                            </style>
                                        </div>
                                    }>
                                        <Input name="inventory_name" onChange={(e) => {
                                            var temp = newdata.inventory_parts
                                            const selectedpart = changeDataPart(temp, doc.model_id, "inventory_name", e.target.value)
                                            setnewdata(prev => {
                                                var temp2 = prev
                                                temp2.inventory_parts = selectedpart
                                                return temp2
                                            })
                                        }} />
                                    </Form.Item>
                                    <Form.Item name="mig_id" label={
                                        <div className="flex">
                                            <span className="migId"></span>
                                            <p className="mb-0 ml-1">MIG ID</p>
                                            <style jsx>
                                                {`
                                                    .migId::before{
                                                        content: '*';
                                                        color: red;
                                                    }
                                                `}
                                            </style>
                                        </div>
                                    }>
                                        <Input name="mig_id" onChange={(e) => {
                                            var temp = newdata.inventory_parts
                                            const selectedpart = changeDataPart(temp, doc.model_id, "mig_id", e.target.value)
                                            setnewdata(prev => {
                                                var temp2 = prev
                                                temp2.inventory_parts = selectedpart
                                                return temp2
                                            })
                                        }} />
                                    </Form.Item>
                                    <Form.Item name="status_condition" label={
                                        <div className="flex">
                                            <span className="kondisi"></span>
                                            <p className="mb-0 ml-1">Kondisi</p>
                                            <style jsx>
                                                {`
                                                    .kondisi::before{
                                                        content: '*';
                                                        color: red;
                                                    }
                                                `}
                                            </style>
                                        </div>
                                    }>
                                        <Select placeholder="Pilih Kondisi" onChange={(value) => {
                                            var temp = newdata.inventory_parts
                                            const selectedpart = changeDataPart(temp, doc.model_id, "status_condition", value)
                                            setnewdata(prev => {
                                                var temp2 = prev
                                                temp2.inventory_parts = selectedpart
                                                return temp2
                                            })
                                        }}>
                                            <Select.Option value={1}>
                                                <div className="p-1 flex w-full items-center">
                                                    <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                                                    <p className="mb-0">Good</p>
                                                </div>
                                            </Select.Option>
                                            <Select.Option value={2}>
                                                <div className="p-1 flex w-full items-center">
                                                    <div className="w-3 h-3 rounded-full bg-gray-500 mr-1"></div>
                                                    <p className="mb-0">Grey</p>
                                                </div>
                                            </Select.Option>
                                            <Select.Option value={3}>
                                                <div className="p-1 flex w-full items-center">
                                                    <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                                                    <p className="mb-0">Bad</p>
                                                </div>
                                            </Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="status_usage" label={
                                        <div className="flex">
                                            <span className="pemakaian"></span>
                                            <p className="mb-0 ml-1">Status Pemakaian</p>
                                            <style jsx>
                                                {`
                                                .pemakaian::before{
                                                    content: '*';
                                                    color: red;
                                                }
                                            `}
                                            </style>
                                        </div>
                                    }>
                                        <Select placeholder="Pilih Status Pemakaian" onChange={(value) => {
                                            var temp = newdata.inventory_parts
                                            const selectedpart = changeDataPart(temp, doc.model_id, "status_usage", value)
                                            setnewdata(prev => {
                                                var temp2 = prev
                                                temp2.inventory_parts = selectedpart
                                                return temp2
                                            })
                                        }}>
                                            <Select.Option value={1}>In Used</Select.Option>
                                            <Select.Option value={2}>In Stock</Select.Option>
                                            <Select.Option value={3}>Replacement</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="serial_number" label={
                                        <div className="flex">
                                            <span className="sn"></span>
                                            <p className="mb-0 ml-1">Serial Number</p>
                                            <style jsx>
                                                {`
                                                .sn::before{
                                                    content: '*';
                                                    color: red;
                                                }
                                            `}
                                            </style>
                                        </div>
                                    }>
                                        <Input name="serial_number" onChange={(e) => {
                                            var temp = newdata.inventory_parts
                                            const selectedpart = changeDataPart(temp, doc.model_id, "serial_number", e.target.value)
                                            setnewdata(prev => {
                                                var temp2 = prev
                                                temp2.inventory_parts = selectedpart
                                                return temp2
                                            })
                                        }} />
                                    </Form.Item>
                                    <Form.Item name="vendor_id" label="Vendor">
                                        <Select placeholder="Pilih vendor" onChange={(value) => {
                                            var temp = newdata.inventory_parts
                                            const selectedpart = changeDataPart(temp, doc.model_id, "vendor_id", value)
                                            setnewdata(prev => {
                                                var temp2 = prev
                                                temp2.inventory_parts = selectedpart
                                                return temp2
                                            })
                                        }}>
                                            {
                                                invrelations.vendors.map((doc, idx) => {
                                                    return (
                                                        <Select.Option value={doc.id}>{doc.name}</Select.Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                    <Form.Item defaultValue={doc.manufacturer_id} name="manufacturer_id" label="Manufacturer">
                                        <Select placeholder="Pilih Manufacturer" onChange={(value) => {
                                            var temp = newdata.inventory_parts
                                            const selectedpart = changeDataPart(temp, doc.model_id, "manufacturer_id", value)
                                            setnewdata(prev => {
                                                var temp2 = prev
                                                temp2.inventory_parts = selectedpart
                                                return temp2
                                            })
                                        }}>
                                            {
                                                invrelations.manufacturers.map((doc, idx) => {
                                                    return (
                                                        <Select.Option value={doc.id}>{doc.name}</Select.Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="deskripsi" label="Deskripsi">
                                        <Input.TextArea rows={4} name="deskripsi" onChange={(e) => {
                                            var temp = newdata.inventory_parts
                                            const selectedpart = changeDataPart(temp, doc.model_id, "deskripsi", e.target.value)
                                            setnewdata(prev => {
                                                var temp2 = prev
                                                temp2.inventory_parts = selectedpart
                                                return temp2
                                            })
                                        }} />
                                    </Form.Item>
                                    {
                                        doc.inventory_values.map((docvalue, idxvalue) => {
                                            return (
                                                <Form.Item key={idxvalue} name={docvalue.name} label={
                                                    <div className="flex">
                                                        <span className={docvalue.name}></span>
                                                        <p className="mb-0 ml-1">{docvalue.name}</p>
                                                        <style jsx>
                                                            {`
                                                                    .${docvalue.name}::before{
                                                                        content: '*';
                                                                        color: red;
                                                                    }
                                                                `}
                                                        </style>
                                                    </div>
                                                }>
                                                    <>
                                                        {docvalue.data_type === 'dropdown' &&
                                                            <Select defaultValue={docvalue.default.default} style={{ width: `100%` }} onChange={(value, label) => {
                                                                var temp = newdata.inventory_parts
                                                                const selectedpart = changeInventoryValuesDropdownPart(temp, doc.model_id, docvalue.id, value)
                                                                setnewdata(prev => {
                                                                    var temp2 = prev
                                                                    temp2.inventory_parts = selectedpart
                                                                    return temp2
                                                                })
                                                            }}>
                                                                {
                                                                    docvalue.default.opsi.map((doc2, idx2) => (
                                                                        <Select.Option key={doc2} value={idx2}>{doc2}</Select.Option>
                                                                    ))
                                                                }
                                                            </Select>
                                                        }
                                                        {docvalue.data_type === 'checkbox' &&
                                                            <div className="w-full flex flex-col">
                                                                {
                                                                    docvalue.default.opsi.map((doc3, idx3) => {
                                                                        return (
                                                                            <div className="flex mb-1">
                                                                                <Checkbox defaultChecked={docvalue.default.default.includes(idx3)} style={{ marginRight: `0.5rem` }} onChange={(e) => {
                                                                                    var temp = newdata.inventory_parts
                                                                                    const selectedpart = changeInventoryValuesCheckboxPart(temp, doc.model_id, docvalue.id, e.target.checked, idx3, doc3)
                                                                                    setnewdata(prev => {
                                                                                        var temp2 = prev
                                                                                        temp2.inventory_parts = selectedpart
                                                                                        return temp2
                                                                                    })
                                                                                }}></Checkbox>
                                                                                <p className="mb-0">{doc3}</p>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        }
                                                        {
                                                            docvalue.data_type === 'date' &&
                                                            <DatePicker defaultValue={docvalue.default === "" ? null : moment(docvalue.default)} onChange={(date, datestring) => {
                                                                var temp = newdata.inventory_parts
                                                                const selectedpart = changeInventoryValuesPart(temp, doc.model_id, docvalue.id, datestring)
                                                                setnewdata(prev => {
                                                                    var temp2 = prev
                                                                    temp2.inventory_parts = selectedpart
                                                                    return temp2
                                                                })
                                                            }}></DatePicker>
                                                        }
                                                        {
                                                            docvalue.data_type === 'paragraph' &&
                                                            <Input.TextArea rows={4} defaultValue={docvalue.default} onChange={(e) => {
                                                                var temp = newdata.inventory_parts
                                                                const selectedpart = changeInventoryValuesPart(temp, doc.model_id, docvalue.id, e.target.value)
                                                                setnewdata(prev => {
                                                                    var temp2 = prev
                                                                    temp2.inventory_parts = selectedpart
                                                                    return temp2
                                                                })
                                                            }}></Input.TextArea>
                                                        }
                                                        {
                                                            docvalue.data_type === 'number' &&
                                                            <InputNumber defaultValue={docvalue.default} onChange={(value) => {
                                                                var temp = newdata.inventory_parts
                                                                const selectedpart = changeInventoryValuesPart(temp, doc.model_id, docvalue.id, `${value}`)
                                                                setnewdata(prev => {
                                                                    var temp2 = prev
                                                                    temp2.inventory_parts = selectedpart
                                                                    return temp2
                                                                })
                                                            }}></InputNumber>
                                                        }
                                                        {
                                                            docvalue.data_type === 'single' &&
                                                            <Input defaultValue={docvalue.default} onChange={(e) => {
                                                                var temp = newdata.inventory_parts
                                                                const selectedpart = changeInventoryValuesPart(temp, doc.model_id, docvalue.id, e.target.value)
                                                                setnewdata(prev => {
                                                                    var temp2 = prev
                                                                    temp2.inventory_parts = selectedpart
                                                                    return temp2
                                                                })
                                                            }}></Input>
                                                        }
                                                    </>
                                                </Form.Item>
                                            )
                                        })
                                    }
                                </Form>
                            </div>
                            {
                                doc.inventory_parts.length > 0 && renderChildPartModel(doc.inventory_parts)
                            }
                        </Panel>
                    }
                </Collapse>
            </Timeline.Item>
        )
    }


    //3.handler and onchange
    const handleCreateItem = () => {
        const invcolumns = newdata.inventory_values.map((doc, idx) => {
            if (doc.data_type === 'dropdown' || doc.data_type === 'checkbox') {
                return ({
                    ...doc,
                    value: JSON.stringify(doc.value)
                })
            }
            else {
                return { ...doc }
            }
        })
        const recursivePartItem = item => {
            var temp11 = []
            for (var i = 0; i < item.length; i++) {
                var temp1 = {}
                temp1 = item[i].inventory_values.map((doc, idx) => {
                    if (doc.data_type === 'dropdown' || doc.data_type === 'checkbox') {
                        return ({
                            ...doc,
                            value: JSON.stringify(doc.value),
                            default: JSON.stringify(doc.default)
                        })
                    }
                    else {
                        return ({
                            ...doc,
                        })
                    }
                })
                temp11.push({
                    ...item[i],
                    inventory_values: temp1,
                    inventory_parts: item[i].inventory_parts.length > 0 ? recursivePartItem(item[i].inventory_parts) : []
                })
            }
            return temp11
        }
        const invparts = recursivePartItem(newdata.inventory_parts)
        const finalres = {
            ...newdata,
            inventory_values: invcolumns,
            inventory_parts: invparts
        }
        setloadingcreate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addInventory`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalres)
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingcreate(false)
                if (res2.success) {
                    notification['success']({
                        message: "Item berhasil ditambahkan",
                        duration: 3
                    })
                    setmodalfinal(false)
                    rt.push(`/items/detail/${res2.id}`)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }

    //4.useEffect
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
                setpraloading(false)
            })
    }, [])
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getInventoryRelations`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setinvrelations(res2.data)
                setpraloading(false)
            })
    }, [])
    useEffect(() => {
        if (emptyfieldparttrigger !== 0) {
            if (emptyfieldpartmodel.enable_part === true) {
                const bool = searchPart(newdata.inventory_parts, emptyfieldpartmodel.model_id)
                if (bool) {
                    if (emptyfieldpart.indexOf(emptyfieldpartmodel.model_name) === -1) {
                        setemptyfieldpart([...emptyfieldpart, emptyfieldpartmodel.model_name])
                    }
                }
                else {
                    setemptyfieldpart(prev => prev.filter(emptyfil => emptyfil !== emptyfieldpartmodel.model_name))
                }
            }
        }
    }, [emptyfieldparttrigger])

    return (
        <Layout dataProfile={dataProfile} sidemenu={sidemenu} tok={initProps} st={st} pathArr={pathArr}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4" id="createAssetsWrapper">
                <div className=" col-span-1 md:col-span-4 mb-8 p-3">
                    <Sticky containerSelectorFocus="#createAgentsWrapper">
                        <div className=" col-span-4 flex justify-between pt-4 border-t-2 border-b-2 bg-white">
                            <h1 className="font-semibold py-2">Form Tambah Item</h1>
                            <div className="flex space-x-2">
                                {/* <Link href={`/items`}> */}
                                <Button type="default" onClick={() => { console.log(newdata); console.log(columnsmodeldata); console.log(partmodeldata); console.log(emptyfieldpart) }}>Batal</Button>
                                {/* </Link> */}
                                <Button type="primary" onClick={() => {
                                    instanceForm.submit()
                                }}>Simpan</Button>
                            </div>
                        </div>
                    </Sticky>
                </div>
                <div className="col-span-1 md:col-span-4 mb-6 py-3 px-12">
                    <div className="shadow-md border p-5 flex flex-col rounded-md">
                        <Form form={instanceForm} layout="vertical" onFinish={() => { setmodalfinal(true) }}>
                            <Form.Item name="model_id" label="Nama Model"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Model wajib dipilih',
                                    },
                                ]}>
                                <Select showSearch optionFilterProp="children" placeholder="Pilih Nama Model" filterOption={(input, opt) => (
                                    opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                )} onChange={(value) => {
                                    setnewdata({ ...newdata, model_id: value })
                                    const selectedmodel = invrelations.models.filter(docmodel => docmodel.id === value)[0]
                                    const selectedasset = invrelations.assets.filter(docasset => docasset.id === selectedmodel.asset_id)
                                    setassetnameitem(selectedasset[0] ? selectedasset[0].name : "")
                                    const snitemmodel = modeldata.filter(docfilter => docfilter.id === value)
                                    setsnitem(snitemmodel[0].required_sn)
                                    setloadingspec(true)
                                    setmanuffielditem(false)
                                    fetch(`https://boiling-thicket-46501.herokuapp.com/getModel?id=${value}`, {
                                        method: `GET`,
                                        headers: {
                                            'Authorization': JSON.parse(initProps)
                                        }
                                    })
                                        .then(res => res.json())
                                        .then(res2 => {
                                            var temp = []
                                            if (res2.success) {
                                                //model_columns
                                                temp = res2.data.model_columns.map((doc, idx) => {
                                                    if (doc.data_type === 'dropdown' || doc.data_type === 'checkbox') {
                                                        return ({
                                                            ...doc,
                                                            default: JSON.parse(doc.default)
                                                        })
                                                    }
                                                    else if (doc.data_type === 'number' || doc.data_type === 'date') {
                                                        if (doc.default === "-") {
                                                            return ({
                                                                ...doc,
                                                                default: ""
                                                            })
                                                        }
                                                        else {
                                                            return {
                                                                ...doc
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        return { ...doc }
                                                    }
                                                })
                                                setcolumnsmodeldata(temp)
                                                setdynamicfielditem(temp)
                                                //model_parts
                                                const recursivePartModel = item => {
                                                    var temp11 = []
                                                    for (var i = 0; i < item.length; i++) {
                                                        var temp1 = {}
                                                        temp1 = item[i].model_column.map((doc, idx) => {
                                                            if (doc.data_type === 'dropdown' || doc.data_type === 'checkbox') {
                                                                return ({
                                                                    ...doc,
                                                                    data_type: doc.data_type,
                                                                    model_inventory_column_id: doc.id,
                                                                    value: (doc.default === "") || (doc.default === "-") ? doc.default : JSON.parse(doc.default),
                                                                    default: (doc.default === "") || (doc.default === "-") ? doc.default : JSON.parse(doc.default),
                                                                })
                                                            }
                                                            else if (doc.data_type === 'number' || doc.data_type === 'date') {
                                                                return ({
                                                                    ...doc,
                                                                    data_type: doc.data_type,
                                                                    model_inventory_column_id: doc.id,
                                                                    value: (doc.default === "") || (doc.default === "-") ? "" : doc.default,
                                                                    default: (doc.default === "") || (doc.default === "-") ? "" : doc.default,
                                                                })
                                                            }
                                                            else {
                                                                return ({
                                                                    ...doc,
                                                                    data_type: doc.data_type,
                                                                    model_inventory_column_id: doc.id,
                                                                    value: doc.default,
                                                                })
                                                            }
                                                        })
                                                        temp11.push({
                                                            model_name: item[i].name,
                                                            asset_name: item[i].asset_name,
                                                            enable_part: false,
                                                            id: item[i].id,
                                                            model_id: item[i].child_id,
                                                            vendor_id: 0,
                                                            inventory_name: "",
                                                            status_condition: 0,
                                                            status_usage: 0,
                                                            serial_number: "",
                                                            is_exist: true,
                                                            deskripsi: "",
                                                            manufacturer_id: 0,
                                                            mig_id: "",
                                                            inventory_values: temp1,
                                                            inventory_parts: item[i].model_parts.length > 0 ? recursivePartModel(item[i].model_parts) : []
                                                        })
                                                    }
                                                    return temp11
                                                }
                                                const yo = recursivePartModel(res2.data.model_parts)
                                                setpartmodeldata(yo)
                                                setnewdata(prev => {
                                                    var temploc = prev
                                                    temploc.inventory_values = []
                                                    temp.forEach((doc) => {
                                                        temploc.inventory_values.push({
                                                            data_type: doc.data_type,
                                                            model_inventory_column_id: doc.id,
                                                            value: doc.default
                                                        })
                                                    })
                                                    temploc.inventory_parts = yo
                                                    temploc.manufacturer_id = res2.data.manufacturer_id
                                                    return temploc
                                                })
                                                setloadingspec(false)
                                                setdisabledfielditem(false)
                                                setmanuffielditem(true)
                                            }
                                            else {
                                                setcolumnsmodeldata([])
                                                setpartmodeldata([])
                                                setloadingspec(false)
                                                setdisabledfielditem(false)
                                                setmanuffielditem(true)
                                            }
                                        })
                                }}>
                                    {
                                        modeldata.map((doc, idx) => (
                                            <Select.Option value={doc.id}>{doc.name}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item name="model_id" label={
                                <div className="flex">
                                    <span className="judulField"></span>
                                    <p className="mb-0 ml-1">Asset Type</p>
                                    <style jsx>
                                        {`
                                            .judulField::before{
                                                content: '*';
                                                color: red;
                                            }
                                        `}
                                    </style>
                                </div>
                            }>
                                <div className="w-full rounded-sm flex items-center bg-gray-100 border p-2 h-8">{assetnameitem}</div>
                            </Form.Item>
                            <Form.Item name="inventory_name" label="Nama Item"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nama Item wajib diisi',
                                    },
                                ]}>
                                <Input disabled={disabledfielditem} name="inventory_name" onChange={(e) => { setnewdata({ ...newdata, inventory_name: e.target.value }) }} />
                            </Form.Item>
                            <Form.Item name="mig_id" label="MIG ID"
                                rules={[
                                    {
                                        required: true,
                                        message: 'MIG ID wajib diisi',
                                    },
                                ]}>
                                <Input disabled={disabledfielditem} name="mig_id" onChange={(e) => { setnewdata({ ...newdata, mig_id: e.target.value }) }} />
                            </Form.Item>
                            <Form.Item name="status_condition" label="Kondisi"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Kondisi wajib dipilih',
                                    },
                                ]}>
                                <Select disabled={disabledfielditem} placeholder="Pilih Kondisi" onChange={(value) => {
                                    setnewdata({ ...newdata, status_condition: value })
                                }}>
                                    <Select.Option value={1}>
                                        <div className="p-1 flex w-full items-center">
                                            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                                            <p className="mb-0">Good</p>
                                        </div>
                                    </Select.Option>
                                    <Select.Option value={2}>
                                        <div className="p-1 flex w-full items-center">
                                            <div className="w-3 h-3 rounded-full bg-gray-500 mr-1"></div>
                                            <p className="mb-0">Grey</p>
                                        </div>
                                    </Select.Option>
                                    <Select.Option value={3}>
                                        <div className="p-1 flex w-full items-center">
                                            <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                                            <p className="mb-0">Bad</p>
                                        </div>
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="status_usage" label="Status Pemakaian"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Status Pemakaian wajib dipilih',
                                    },
                                ]}>
                                <Select disabled={disabledfielditem} placeholder="Pilih Status Pemakaian" onChange={(value) => {
                                    setnewdata({ ...newdata, status_usage: value })
                                }}>
                                    <Select.Option value={1}>In Used</Select.Option>
                                    <Select.Option value={2}>In Stock</Select.Option>
                                    <Select.Option value={3}>Replacement</Select.Option>
                                </Select>
                            </Form.Item>
                            {
                                snitem ?
                                    <Form.Item name="serial_number" label="Serial Number"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Serial Number wajib diisi',
                                            },
                                        ]}>
                                        <Input disabled={disabledfielditem} name="serial_number" onChange={(e) => { setnewdata({ ...newdata, serial_number: e.target.value }) }} />
                                    </Form.Item>
                                    :
                                    <Form.Item name="serial_number" label="Serial Number">
                                        <Input disabled={disabledfielditem} name="serial_number" onChange={(e) => { setnewdata({ ...newdata, serial_number: e.target.value }) }} />
                                    </Form.Item>
                            }
                            <Form.Item name="location" label="Location">
                                <TreeSelect disabled={disabledfielditem} treeDefaultExpandedKeys={[invrelations.tree_companies.key]} placeholder="Pilih Location" treeData={[invrelations.tree_companies]} onChange={(value) => {
                                    setnewdata({ ...newdata, location: value })
                                }}></TreeSelect>
                                {/* <Select disabled={disabledfielditem} placeholder="Pilih Location" onChange={(value) => {
                                    setnewdata({ ...newdata, location: value })
                                }}>
                                    {
                                        invrelations.companies.map((doc, idx) => {
                                            return (
                                                <Select.Option value={doc.id}>{doc.name}</Select.Option>
                                            )
                                        })
                                    }
                                </Select> */}
                            </Form.Item>
                            <Form.Item name="vendor_id" label="Vendor">
                                <Select disabled={disabledfielditem} placeholder="Pilih vendor" onChange={(value) => {
                                    setnewdata({ ...newdata, vendor_id: value })
                                }}>
                                    {
                                        invrelations.vendors.map((doc, idx) => {
                                            return (
                                                <Select.Option value={doc.id}>{doc.name}</Select.Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            {
                                manuffielditem ?
                                    <Form.Item name="manufacturer_id" label="Manufacturer">
                                        <Select disabled={disabledfielditem} defaultValue={newdata.manufacturer_id} placeholder="Pilih Manufacturer" onChange={(value) => {
                                            setnewdata({ ...newdata, manufacturer_id: value })
                                        }}>
                                            {
                                                invrelations.manufacturers.map((doc, idx) => {
                                                    return (
                                                        <Select.Option value={doc.id}>{doc.name}</Select.Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                    :
                                    null
                            }
                            <Form.Item name="deskripsi" label="Deskripsi">
                                <Input.TextArea disabled={disabledfielditem} rows={4} name="deskripsi" onChange={(e) => { setnewdata({ ...newdata, deskripsi: e.target.value }) }} />
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <div className="col-span-1 md:col-span-4 mb-6 py-3 px-12">
                    <div className="mb-3">
                        <h1 className="font-bold text-xl">Spesifikasi Item</h1>
                    </div>
                    <div className="shadow-md border p-5 flex flex-col rounded-md">
                        {
                            loadingspec ?
                                <Spin />
                                :
                                <>
                                    {
                                        columnsmodeldata.length === 0 ?
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
                                            :
                                            <Form layout="vertical" form={instanceForm2}>
                                                {
                                                    columnsmodeldata.map((docinvvalue, idxinvvalue) => {
                                                        if (docinvvalue.required) {
                                                            // const idxfieldmain = newdata.inventory_values.map(docname => docname.model_inventory_column_id).indexOf(docinvvalue.id)
                                                            return (
                                                                <Form.Item name={docinvvalue.name} label={
                                                                    <div className="flex">
                                                                        <span className="judulField"></span>
                                                                        <p className="mb-0 ml-1">{docinvvalue.name}</p>
                                                                        <style jsx>
                                                                            {`
                                                                                .judulField::before{
                                                                                    content: '*';
                                                                                    color: red;
                                                                                }
                                                                            `}
                                                                        </style>
                                                                    </div>
                                                                }>
                                                                    <>
                                                                        {docinvvalue.data_type === 'dropdown' &&
                                                                            <Select defaultValue={docinvvalue.default.default} style={{ width: `100%` }} onChange={(value, label) => {
                                                                                setnewdata(prev => {
                                                                                    var temp = prev
                                                                                    const idxfield = temp.inventory_values.map(docname => docname.model_inventory_column_id).indexOf(docinvvalue.id)
                                                                                    temp.inventory_values[idxfield].value.default = value
                                                                                    return temp
                                                                                })
                                                                            }}>
                                                                                {
                                                                                    docinvvalue.default.opsi.map((doc2, idx2) => (
                                                                                        <Select.Option key={doc2} value={idx2}>{doc2}</Select.Option>
                                                                                    ))
                                                                                }
                                                                            </Select>
                                                                        }
                                                                        {docinvvalue.data_type === 'checkbox' &&
                                                                            <div className="w-full flex flex-col">
                                                                                {
                                                                                    docinvvalue.default.opsi.map((doc3, idx3) => {
                                                                                        return (
                                                                                            <div className="flex mb-1">
                                                                                                <Checkbox defaultChecked={docinvvalue.default.default.includes(idx3)} style={{ marginRight: `0.5rem` }} onChange={(e) => {
                                                                                                    setnewdata(prev => {
                                                                                                        var temp = prev
                                                                                                        const idxfield = temp.inventory_values.map(docname => docname.model_inventory_column_id).indexOf(docinvvalue.id)
                                                                                                        if (e.target.checked === true) {
                                                                                                            temp.inventory_values[idxfield].value.default.push(idx3)
                                                                                                        }
                                                                                                        else {
                                                                                                            var idxtoremove = temp.inventory_values[idxfield].value.default.indexOf(idx3)
                                                                                                            temp.inventory_values[idxfield].value.default.splice(idxtoremove, 1)
                                                                                                        }
                                                                                                        return temp
                                                                                                    })
                                                                                                }}></Checkbox>
                                                                                                <p className="mb-0">{doc3}</p>
                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </div>
                                                                        }
                                                                        {
                                                                            docinvvalue.data_type === 'date' &&
                                                                            <>
                                                                                <DatePicker /*style={dynamicfielditem[idxinvvalue].value === "" ? { borderColor: `red` } : null}*/ defaultValue={docinvvalue.default === "" ? null : moment(docinvvalue.default)} onChange={(date, datestring) => {
                                                                                    setnewdata(prev => {
                                                                                        var temp = prev
                                                                                        const idxfield = temp.inventory_values.map(docname => docname.model_inventory_column_id).indexOf(docinvvalue.id)
                                                                                        temp.inventory_values[idxfield].value = datestring
                                                                                        return temp
                                                                                    })
                                                                                    // setdynamicfielditem(prev => {
                                                                                    //     var temp = prev
                                                                                    //     temp[idxinvvalue].value = datestring
                                                                                    //     return temp
                                                                                    // })
                                                                                }}></DatePicker>
                                                                                {/* {
                                                                                    dynamicfielditem[idxinvvalue].value === "" ?
                                                                                        null
                                                                                        :
                                                                                        <p className="text-red-500 mb-0">{docinvvalue.name} wajib dipilih</p>
                                                                                } */}
                                                                            </>
                                                                        }
                                                                        {
                                                                            docinvvalue.data_type === 'paragraph' &&
                                                                            <Input.TextArea rows={4} defaultValue={docinvvalue.default} onChange={(e) => {
                                                                                setnewdata(prev => {
                                                                                    var temp = prev
                                                                                    const idxfield = temp.inventory_values.map(docname => docname.model_inventory_column_id).indexOf(docinvvalue.id)
                                                                                    temp.inventory_values[idxfield].value = e.target.value
                                                                                    return temp
                                                                                })
                                                                            }}></Input.TextArea>
                                                                        }
                                                                        {
                                                                            docinvvalue.data_type === 'number' &&
                                                                            <InputNumber defaultValue={docinvvalue.default} onChange={(value) => {
                                                                                setnewdata(prev => {
                                                                                    var temp = prev
                                                                                    const idxfield = temp.inventory_values.map(docname => docname.model_inventory_column_id).indexOf(docinvvalue.id)
                                                                                    temp.inventory_values[idxfield].value = `${value}`
                                                                                    return temp
                                                                                })
                                                                            }}></InputNumber>
                                                                        }
                                                                        {
                                                                            docinvvalue.data_type === 'single' &&
                                                                            <Input defaultValue={docinvvalue.default} onChange={(e) => {
                                                                                setnewdata(prev => {
                                                                                    var temp = prev
                                                                                    const idxfield = temp.inventory_values.map(docname => docname.model_inventory_column_id).indexOf(docinvvalue.id)
                                                                                    temp.inventory_values[idxfield].value = e.target.value
                                                                                    return temp
                                                                                })
                                                                            }}></Input>
                                                                        }
                                                                    </>
                                                                </Form.Item>
                                                            )
                                                        }
                                                        else {
                                                            return (
                                                                <Form.Item name={docinvvalue.name} label={docinvvalue.name}>
                                                                    <>
                                                                        {docinvvalue.data_type === 'dropdown' &&
                                                                            <Select defaultValue={docinvvalue.default.default} style={{ width: `100%` }} onChange={(value, label) => {
                                                                                setnewdata(prev => {
                                                                                    var temp = prev
                                                                                    const idxfield = temp.inventory_values.map(docname => docname.model_inventory_column_id).indexOf(docinvvalue.id)
                                                                                    temp.inventory_values[idxfield].value.default = value
                                                                                    return temp
                                                                                })
                                                                            }}>
                                                                                {
                                                                                    docinvvalue.default.opsi.map((doc2, idx2) => (
                                                                                        <Select.Option key={doc2} value={idx2}>{doc2}</Select.Option>
                                                                                    ))
                                                                                }
                                                                            </Select>
                                                                        }
                                                                        {docinvvalue.data_type === 'checkbox' &&
                                                                            <div className="w-full flex flex-col">
                                                                                {
                                                                                    docinvvalue.default.opsi.map((doc3, idx3) => {
                                                                                        return (
                                                                                            <div className="flex mb-1">
                                                                                                <Checkbox defaultChecked={docinvvalue.default.default.includes(idx3)} style={{ marginRight: `0.5rem` }} onChange={(e) => {
                                                                                                    setnewdata(prev => {
                                                                                                        var temp = prev
                                                                                                        const idxfield = temp.inventory_values.map(docname => docname.model_inventory_column_id).indexOf(docinvvalue.id)
                                                                                                        if (e.target.checked === true) {
                                                                                                            temp.inventory_values[idxfield].value.default.push(idx3)
                                                                                                        }
                                                                                                        else {
                                                                                                            var idxtoremove = temp.inventory_values[idxfield].value.default.indexOf(idx3)
                                                                                                            temp.inventory_values[idxfield].value.default.splice(idxtoremove, 1)
                                                                                                        }
                                                                                                        return temp
                                                                                                    })
                                                                                                }}></Checkbox>
                                                                                                <p className="mb-0">{doc3}</p>
                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </div>
                                                                        }
                                                                        {
                                                                            docinvvalue.data_type === 'date' &&
                                                                            <DatePicker defaultValue={docinvvalue.default === "" ? null : moment(docinvvalue.default)} onChange={(date, datestring) => {
                                                                                setnewdata(prev => {
                                                                                    var temp = prev
                                                                                    const idxfield = temp.inventory_values.map(docname => docname.model_inventory_column_id).indexOf(docinvvalue.id)
                                                                                    temp.inventory_values[idxfield].value = datestring
                                                                                    return temp
                                                                                })
                                                                            }}></DatePicker>
                                                                        }
                                                                        {
                                                                            docinvvalue.data_type === 'paragraph' &&
                                                                            <Input.TextArea rows={4} defaultValue={docinvvalue.default} onChange={(e) => {
                                                                                setnewdata(prev => {
                                                                                    var temp = prev
                                                                                    const idxfield = temp.inventory_values.map(docname => docname.model_inventory_column_id).indexOf(docinvvalue.id)
                                                                                    temp.inventory_values[idxfield].value = e.target.value
                                                                                    return temp
                                                                                })
                                                                            }}></Input.TextArea>
                                                                        }
                                                                        {
                                                                            docinvvalue.data_type === 'number' &&
                                                                            <InputNumber defaultValue={docinvvalue.default} onChange={(value) => {
                                                                                setnewdata(prev => {
                                                                                    var temp = prev
                                                                                    const idxfield = temp.inventory_values.map(docname => docname.model_inventory_column_id).indexOf(docinvvalue.id)
                                                                                    temp.inventory_values[idxfield].value = `${value}`
                                                                                    return temp
                                                                                })
                                                                            }}></InputNumber>
                                                                        }
                                                                        {
                                                                            docinvvalue.data_type === 'single' &&
                                                                            <Input defaultValue={docinvvalue.default} onChange={(e) => {
                                                                                setnewdata(prev => {
                                                                                    var temp = prev
                                                                                    const idxfield = temp.inventory_values.map(docname => docname.model_inventory_column_id).indexOf(docinvvalue.id)
                                                                                    temp.inventory_values[idxfield].value = e.target.value
                                                                                    return temp
                                                                                })
                                                                            }}></Input>
                                                                        }
                                                                    </>
                                                                </Form.Item>
                                                            )
                                                        }
                                                    })
                                                }
                                            </Form>
                                    }
                                </>
                        }
                    </div>
                </div>
                <div className="col-span-1 md:col-span-4 mb-6 py-3 px-12">
                    <div className="mb-3 flex items-center">
                        <h1 className="font-bold text-xl mb-0 mr-1">Konfigurasi Part Item</h1>
                        <div className='pb-1'>
                            <Tooltip placement="right" title="Anda tidak wajib mengisi seluruh Spesifikasi dari item part, kecuali Nama Item, MIG ID, Kondisi, dan Status Pemakaian!">
                                <QuestionCircleOutlined size="large"></QuestionCircleOutlined>
                            </Tooltip>
                        </div>
                    </div>
                    <div>
                        {
                            loadingspec ?
                                <Spin />
                                :
                                <>
                                    {
                                        partmodeldata.length === 0 ?
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
                                            :
                                            <Collapse>
                                                {
                                                    partmodeldata.map((docpart, idxpart) => {
                                                        return (
                                                            <Panel id={`panel${idxpart}`} key={idxpart} header={<strong>{docpart.model_name}</strong>}
                                                                extra={
                                                                    <div className="flex">
                                                                        <Checkbox value={docpart.enable_part} style={{ marginRight: `0.5rem` }} onChange={(e) => {
                                                                            var temp = newdata.inventory_parts
                                                                            const selectedpart = changeEnablePart(temp, docpart.model_id, e.target.checked)
                                                                            setpartmodeldata(selectedpart)
                                                                            setnewdata(prev => {
                                                                                var temp = prev
                                                                                temp.inventory_parts = selectedpart
                                                                                return temp
                                                                            })
                                                                        }}></Checkbox>
                                                                        <p className="mb-0">{docpart.enable_part ? "Item Ada" : "Item Tidak Ada"}</p>
                                                                    </div>
                                                                }>
                                                                <div className="flex flex-col p-5 mb-3 relative">
                                                                    {
                                                                        docpart.enable_part === false ?
                                                                            <div className="absolute left-0 right-0 top-0 bottom-0 z-10 bg-white bg-opacity-80"></div>
                                                                            :
                                                                            null
                                                                    }
                                                                    <Form layout="vertical">
                                                                        <Form.Item name="model_id" label={
                                                                            <div className="flex">
                                                                                <span className="judulField"></span>
                                                                                <p className="mb-0 ml-1">Asset Type</p>
                                                                                <style jsx>
                                                                                    {`
                                                                                        .judulField::before{
                                                                                            content: '*';
                                                                                            color: red;
                                                                                        }
                                                                                    `}
                                                                                </style>
                                                                            </div>
                                                                        }>
                                                                            <div className="w-full rounded bg-gray-200 p-2 h-10">{docpart.asset_name}</div>
                                                                        </Form.Item>
                                                                        <Form.Item name="inventory_name" label={
                                                                            <div className="flex">
                                                                                <span className="namaItem"></span>
                                                                                <p className="mb-0 ml-1">Nama Item</p>
                                                                                <style jsx>
                                                                                    {`
                                                                                    .namaItem::before{
                                                                                        content: '*';
                                                                                        color: red;
                                                                                    }
                                                                                `}
                                                                                </style>
                                                                            </div>
                                                                        }>
                                                                            <Input name="inventory_name" onChange={(e) => {
                                                                                var temp = newdata.inventory_parts
                                                                                const selectedpart = changeDataPart(temp, docpart.model_id, "inventory_name", e.target.value)
                                                                                setnewdata(prev => {
                                                                                    var temp2 = prev
                                                                                    temp2.inventory_parts = selectedpart
                                                                                    return temp2
                                                                                })
                                                                                setemptyfieldpartmodel(docpart)
                                                                                setemptyfieldparttrigger(prev => prev + 1)
                                                                            }} />
                                                                        </Form.Item>
                                                                        <Form.Item name="mig_id" label={
                                                                            <div className="flex">
                                                                                <span className="migId"></span>
                                                                                <p className="mb-0 ml-1">MIG ID</p>
                                                                                <style jsx>
                                                                                    {`
                                                                                    .migId::before{
                                                                                        content: '*';
                                                                                        color: red;
                                                                                    }
                                                                                `}
                                                                                </style>
                                                                            </div>
                                                                        }>
                                                                            <Input name="mig_id" onChange={(e) => {
                                                                                var temp = newdata.inventory_parts
                                                                                const selectedpart = changeDataPart(temp, docpart.model_id, "mig_id", e.target.value)
                                                                                setnewdata(prev => {
                                                                                    var temp2 = prev
                                                                                    temp2.inventory_parts = selectedpart
                                                                                    return temp2
                                                                                })
                                                                                setemptyfieldpartmodel(docpart)
                                                                                setemptyfieldparttrigger(prev => prev + 1)
                                                                            }} />
                                                                        </Form.Item>
                                                                        <Form.Item name="status_condition" label={
                                                                            <div className="flex">
                                                                                <span className="kondisi"></span>
                                                                                <p className="mb-0 ml-1">Kondisi</p>
                                                                                <style jsx>
                                                                                    {`
                                                                                    .kondisi::before{
                                                                                        content: '*';
                                                                                        color: red;
                                                                                    }
                                                                                `}
                                                                                </style>
                                                                            </div>
                                                                        }>
                                                                            <Select placeholder="Pilih Kondisi" onChange={(value) => {
                                                                                var temp = newdata.inventory_parts
                                                                                const selectedpart = changeDataPart(temp, docpart.model_id, "status_condition", value)
                                                                                setnewdata(prev => {
                                                                                    var temp2 = prev
                                                                                    temp2.inventory_parts = selectedpart
                                                                                    return temp2
                                                                                })
                                                                                setemptyfieldpartmodel(docpart)
                                                                                setemptyfieldparttrigger(prev => prev + 1)
                                                                            }}>
                                                                                <Select.Option value={1}>
                                                                                    <div className="p-1 flex w-full items-center">
                                                                                        <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                                                                                        <p className="mb-0">Good</p>
                                                                                    </div>
                                                                                </Select.Option>
                                                                                <Select.Option value={2}>
                                                                                    <div className="p-1 flex w-full items-center">
                                                                                        <div className="w-3 h-3 rounded-full bg-gray-500 mr-1"></div>
                                                                                        <p className="mb-0">Grey</p>
                                                                                    </div>
                                                                                </Select.Option>
                                                                                <Select.Option value={3}>
                                                                                    <div className="p-1 flex w-full items-center">
                                                                                        <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                                                                                        <p className="mb-0">Bad</p>
                                                                                    </div>
                                                                                </Select.Option>
                                                                            </Select>
                                                                        </Form.Item>
                                                                        <Form.Item name="status_usage" label={
                                                                            <div className="flex">
                                                                                <span className="pemakaian"></span>
                                                                                <p className="mb-0 ml-1">Status Pemakaian</p>
                                                                                <style jsx>
                                                                                    {`
                                                                                .pemakaian::before{
                                                                                    content: '*';
                                                                                    color: red;
                                                                                }
                                                                            `}
                                                                                </style>
                                                                            </div>
                                                                        }>
                                                                            <Select placeholder="Pilih Status Pemakaian" onChange={(value) => {
                                                                                var temp = newdata.inventory_parts
                                                                                const selectedpart = changeDataPart(temp, docpart.model_id, "status_usage", value)
                                                                                setnewdata(prev => {
                                                                                    var temp2 = prev
                                                                                    temp2.inventory_parts = selectedpart
                                                                                    return temp2
                                                                                })
                                                                                setemptyfieldpartmodel(docpart)
                                                                                setemptyfieldparttrigger(prev => prev + 1)
                                                                            }}>
                                                                                <Select.Option value={1}>In Used</Select.Option>
                                                                                <Select.Option value={2}>In Stock</Select.Option>
                                                                                <Select.Option value={3}>Replacement</Select.Option>
                                                                            </Select>
                                                                        </Form.Item>
                                                                        <Form.Item name="serial_number" label={
                                                                            <div className="flex">
                                                                                <span className="sn"></span>
                                                                                <p className="mb-0 ml-1">Serial Number</p>
                                                                                <style jsx>
                                                                                    {`
                                                                                .sn::before{
                                                                                    content: '*';
                                                                                    color: red;
                                                                                }
                                                                            `}
                                                                                </style>
                                                                            </div>
                                                                        }>
                                                                            <Input name="serial_number" onChange={(e) => {
                                                                                var temp = newdata.inventory_parts
                                                                                const selectedpart = changeDataPart(temp, docpart.model_id, "serial_number", e.target.value)
                                                                                setnewdata(prev => {
                                                                                    var temp2 = prev
                                                                                    temp2.inventory_parts = selectedpart
                                                                                    return temp2
                                                                                })
                                                                                setemptyfieldpartmodel(docpart)
                                                                                setemptyfieldparttrigger(prev => prev + 1)
                                                                            }} />
                                                                        </Form.Item>
                                                                        <Form.Item name="vendor_id" label="Vendor">
                                                                            <Select placeholder="Pilih vendor" onChange={(value) => {
                                                                                var temp = newdata.inventory_parts
                                                                                const selectedpart = changeDataPart(temp, docpart.model_id, "vendor_id", value)
                                                                                setnewdata(prev => {
                                                                                    var temp2 = prev
                                                                                    temp2.inventory_parts = selectedpart
                                                                                    return temp2
                                                                                })
                                                                                setemptyfieldpartmodel(docpart)
                                                                                setemptyfieldparttrigger(prev => prev + 1)
                                                                            }}>
                                                                                {
                                                                                    invrelations.vendors.map((doc, idx) => {
                                                                                        return (
                                                                                            <Select.Option value={doc.id}>{doc.name}</Select.Option>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </Select>
                                                                        </Form.Item>
                                                                        <Form.Item name="manufacturer_id" label="Manufacturer">
                                                                            <Select defaultValue={docpart.manufacturer_id} placeholder="Pilih Manufacturer" onChange={(value) => {
                                                                                var temp = newdata.inventory_parts
                                                                                const selectedpart = changeDataPart(temp, docpart.model_id, "manufacturer_id", value)
                                                                                setnewdata(prev => {
                                                                                    var temp2 = prev
                                                                                    temp2.inventory_parts = selectedpart
                                                                                    return temp2
                                                                                })
                                                                                setemptyfieldpartmodel(docpart)
                                                                                setemptyfieldparttrigger(prev => prev + 1)
                                                                            }}>
                                                                                {
                                                                                    invrelations.manufacturers.map((doc, idx) => {
                                                                                        return (
                                                                                            <Select.Option value={doc.id}>{doc.name}</Select.Option>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </Select>
                                                                        </Form.Item>
                                                                        <Form.Item name="deskripsi" label="Deskripsi">
                                                                            <Input.TextArea rows={4} name="deskripsi" onChange={(e) => {
                                                                                var temp = newdata.inventory_parts
                                                                                const selectedpart = changeDataPart(temp, docpart.model_id, "deskripsi", e.target.value)
                                                                                setnewdata(prev => {
                                                                                    var temp2 = prev
                                                                                    temp2.inventory_parts = selectedpart
                                                                                    return temp2
                                                                                })
                                                                                setemptyfieldpartmodel(docpart)
                                                                                setemptyfieldparttrigger(prev => prev + 1)
                                                                            }} />
                                                                        </Form.Item>
                                                                        {
                                                                            docpart.inventory_values.map((docvalue, idxvalue) => {
                                                                                return (
                                                                                    <Form.Item key={idxvalue} name={docvalue.name} label={
                                                                                        <div className="flex">
                                                                                            {docvalue.required ? <span className={docvalue.name.replace(/\s+/g, "")}></span> : null}
                                                                                            <p className="mb-0 ml-1">{docvalue.name}</p>
                                                                                            <style jsx>
                                                                                                {`
                                                                                                    .${docvalue.name.replace(/\s+/g, "")}::before{
                                                                                                        content: '*';
                                                                                                        color: red;
                                                                                                    }
                                                                                                `}
                                                                                            </style>
                                                                                        </div>
                                                                                    }>
                                                                                        <>
                                                                                            {docvalue.data_type === 'dropdown' &&
                                                                                                <Select defaultValue={docvalue.default.default} style={{ width: `100%` }} onChange={(value, label) => {
                                                                                                    var temp = newdata.inventory_parts
                                                                                                    const selectedpart = changeInventoryValuesDropdownPart(temp, docpart.model_id, docvalue.id, value)
                                                                                                    setnewdata(prev => {
                                                                                                        var temp2 = prev
                                                                                                        temp2.inventory_parts = selectedpart
                                                                                                        return temp2
                                                                                                    })
                                                                                                    setemptyfieldpartmodel(docpart)
                                                                                                    setemptyfieldparttrigger(prev => prev + 1)
                                                                                                }}>
                                                                                                    {
                                                                                                        docvalue.default.opsi.map((doc2, idx2) => (
                                                                                                            <Select.Option key={doc2} value={idx2}>{doc2}</Select.Option>
                                                                                                        ))
                                                                                                    }
                                                                                                </Select>
                                                                                            }
                                                                                            {docvalue.data_type === 'checkbox' &&
                                                                                                <div className="w-full flex flex-col">
                                                                                                    {
                                                                                                        docvalue.default.opsi.map((doc3, idx3) => {
                                                                                                            return (
                                                                                                                <div className="flex mb-1">
                                                                                                                    <Checkbox defaultChecked={docvalue.default.default.includes(idx3)} style={{ marginRight: `0.5rem` }} onChange={(e) => {
                                                                                                                        var temp = newdata.inventory_parts
                                                                                                                        const selectedpart = changeInventoryValuesCheckboxPart(temp, docpart.model_id, docvalue.id, e.target.checked, idx3, doc3)
                                                                                                                        setnewdata(prev => {
                                                                                                                            var temp2 = prev
                                                                                                                            temp2.inventory_parts = selectedpart
                                                                                                                            return temp2
                                                                                                                        })
                                                                                                                        setemptyfieldpartmodel(docpart)
                                                                                                                        setemptyfieldparttrigger(prev => prev + 1)
                                                                                                                    }}></Checkbox>
                                                                                                                    <p className="mb-0">{doc3}</p>
                                                                                                                </div>
                                                                                                            )
                                                                                                        })
                                                                                                    }
                                                                                                </div>
                                                                                            }
                                                                                            {
                                                                                                docvalue.data_type === 'date' &&
                                                                                                <DatePicker defaultValue={docvalue.default === "" ? null : moment(docvalue.default)} onChange={(date, datestring) => {
                                                                                                    var temp = newdata.inventory_parts
                                                                                                    const selectedpart = changeInventoryValuesPart(temp, docpart.model_id, docvalue.id, datestring)
                                                                                                    setnewdata(prev => {
                                                                                                        var temp2 = prev
                                                                                                        temp2.inventory_parts = selectedpart
                                                                                                        return temp2
                                                                                                    })
                                                                                                    setemptyfieldpartmodel(docpart)
                                                                                                    setemptyfieldparttrigger(prev => prev + 1)
                                                                                                }}></DatePicker>
                                                                                            }
                                                                                            {
                                                                                                docvalue.data_type === 'paragraph' &&
                                                                                                <Input.TextArea rows={4} defaultValue={docvalue.default} onChange={(e) => {
                                                                                                    var temp = newdata.inventory_parts
                                                                                                    const selectedpart = changeInventoryValuesPart(temp, docpart.model_id, docvalue.id, e.target.value)
                                                                                                    setnewdata(prev => {
                                                                                                        var temp2 = prev
                                                                                                        temp2.inventory_parts = selectedpart
                                                                                                        return temp2
                                                                                                    })
                                                                                                    setemptyfieldpartmodel(docpart)
                                                                                                    setemptyfieldparttrigger(prev => prev + 1)
                                                                                                }}></Input.TextArea>
                                                                                            }
                                                                                            {
                                                                                                docvalue.data_type === 'number' &&
                                                                                                <InputNumber defaultValue={docvalue.default} onChange={(value) => {
                                                                                                    var temp = newdata.inventory_parts
                                                                                                    const selectedpart = changeInventoryValuesPart(temp, docpart.model_id, docvalue.id, `${value}`)
                                                                                                    setnewdata(prev => {
                                                                                                        var temp2 = prev
                                                                                                        temp2.inventory_parts = selectedpart
                                                                                                        return temp2
                                                                                                    })
                                                                                                    setemptyfieldpartmodel(docpart)
                                                                                                    setemptyfieldparttrigger(prev => prev + 1)
                                                                                                }}></InputNumber>
                                                                                            }
                                                                                            {
                                                                                                docvalue.data_type === 'single' &&
                                                                                                <Input defaultValue={docvalue.default} onChange={(e) => {
                                                                                                    var temp = newdata.inventory_parts
                                                                                                    const selectedpart = changeInventoryValuesPart(temp, docpart.model_id, docvalue.id, e.target.value)
                                                                                                    setnewdata(prev => {
                                                                                                        var temp2 = prev
                                                                                                        temp2.inventory_parts = selectedpart
                                                                                                        return temp2
                                                                                                    })
                                                                                                    setemptyfieldpartmodel(docpart)
                                                                                                    setemptyfieldparttrigger(prev => prev + 1)
                                                                                                }}></Input>
                                                                                            }
                                                                                        </>
                                                                                    </Form.Item>
                                                                                )
                                                                            })
                                                                        }
                                                                    </Form>
                                                                </div>
                                                                {
                                                                    docpart.inventory_parts.length === 0 ?
                                                                        null
                                                                        :
                                                                        <>
                                                                            <Timeline style={{ marginTop: `1rem` }}>
                                                                                {
                                                                                    renderChildPartModel(docpart.inventory_parts)
                                                                                }
                                                                            </Timeline>
                                                                        </>
                                                                }
                                                            </Panel>
                                                        )
                                                    })
                                                }
                                            </Collapse>
                                    }
                                </>
                        }
                    </div>
                </div>
            </div>
            <Modal title={<h1 className="font-semibold">Apakah anda yakin ingin {emptyfieldpart.length > 0 ? "tetap" : ""} membuat item {emptyfieldpart.length > 0 ? "part ini" : `\"${newdata.inventory_name}\"`}?</h1>}
                visible={modalfinal}
                onCancel={() => { setmodalfinal(false) }}
                okText="Ya"
                cancelText="Tidak"
                onOk={handleCreateItem}
                okButtonProps={{ loading: loadingcreate }}
            >
                {
                    emptyfieldpart.length > 0 ?
                        <div className="flex flex-col mb-5">
                            <div className="flex flex-col mb-4">
                                <p className="mb-2 text-xs">Anda belum melengkapi seluruh field wajib dari item part dengan model berikut ini :</p>
                                <ul className="mb-2 text-xs">
                                    {
                                        emptyfieldpart.map((docempty, idxempty) => (
                                            <li key={idxempty}>- <strong>{docempty}</strong></li>
                                        ))
                                    }
                                </ul>
                                <p className="mb-2 text-xs">
                                    Jika field wajib tidak diisi, maka akan bernilai “-”
                                </p>
                            </div>
                            <hr />
                            <div className="flex flex-col mt-4">
                                <p className="mb-0">Notes</p>
                                <Input placeholder="Masukkan Notes" onChange={(e => {
                                    setnewdata(prev => {
                                        var temp = prev
                                        temp.notes = e.target.value
                                        return temp
                                    })
                                })}></Input>
                            </div>
                        </div>
                        :
                        <div className="flex flex-col">
                            <div className="flex flex-col">
                                <p className="mb-0">Notes</p>
                                <Input placeholder="Masukkan Notes" onChange={(e => {
                                    setnewdata(prev => {
                                        var temp = prev
                                        temp.notes = e.target.value
                                        return temp
                                    })
                                })}></Input>
                            </div>
                        </div>
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
    const resourcesGP = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    // if (![107, 108, 109, 110, 111, 112, 132].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
    //     res.writeHead(302, { Location: '/dashboard/admin' })
    //     res.end()
    // }

    return {
        props: {
            initProps,
            dataProfile,
            sidemenu: "3"
        },
    }
}

export default ItemCreate
