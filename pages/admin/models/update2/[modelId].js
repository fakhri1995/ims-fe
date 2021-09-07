import Layout from '../../../../components/layout-dashboard'
import { useRouter } from 'next/router'
import httpcookie from 'cookie'
import { DeleteOutlined } from '@ant-design/icons'
import Sticky from 'wil-react-sticky'
import { PlusSquareTwoTone, CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { Form, Input, notification, Button, TreeSelect, Checkbox, Select, Popconfirm, Spin, InputNumber, DatePicker, Collapse, Timeline, Empty, Tooltip } from 'antd'
import st from '../../../../components/layout-dashboard.module.css'
import Modal from 'antd/lib/modal/Modal'

const ModelsUpdate2 = ({ sidemenu, dataProfile, initProps, modelid }) => {
    //1.Init
    const rt = useRouter()
    var pathArr = rt.pathname.split("/").slice(1)
    pathArr.splice(3, 1)
    pathArr[pathArr.length - 1] = "Ubah Model"
    const [instanceForm] = Form.useForm();
    const [instanceForm2] = Form.useForm();
    const { Panel } = Collapse

    //2.Helper functions
    const renderChildPartModel = (item) => {
        return (
            item.map((doc, idx) => {
                return (
                    <Children doc={doc}></Children>
                )
            })
        )
    }
    const Children = ({ doc }) => {
        return (
            <Timeline.Item>
                <Collapse accordion>
                    {
                        <Panel header={doc.name}>
                            <div className="flex flex-col p-3">
                                <div className="flex flex-col mb-5">
                                    <h1 className="font-semibold mb-1">Quantity <span className="judulsn"></span></h1>
                                    <div className="rounded bg-gray-200 w-full flex items-center my-auto h-12 px-2">
                                        <p className="mb-0 text-sm">{doc.quantity}</p>
                                    </div>
                                </div>
                                {
                                    doc.model_column.map((doc, idx) => {
                                        return (
                                            <div className="flex flex-col mb-5">
                                                <h1 className="font-semibold mb-1">{doc.name} {doc.required ? <span className="judulsn"></span> : null} <span className="text-gray-400">({doc.data_type.charAt(0).toUpperCase() + doc.data_type.slice(1)})</span></h1>
                                                <div className="rounded bg-gray-200 w-full flex items-center my-auto h-12 px-2">
                                                    <p className="mb-0 text-sm">{doc.default}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                {
                                    doc.model_child.length > 0 && renderChildPartModel(doc.model_child)
                                }
                            </div>
                            <style jsx>
                                {`
                                                        .judulassettype::before{
                                                            content: '*';
                                                            color: red;
                                                        }
                                                        .judulsn::before{
                                                            content: '*';
                                                            color: red;
                                                        }
                                                    `}
                            </style>
                        </Panel>
                    }
                </Collapse>
            </Timeline.Item>
        )
    }

    //2.useState
    const [newdata, setnewdata] = useState({
        id: "",
        asset_id: "",
        name: "",
        description: "",
        manufacturer_id: "",
        required_sn: false,
        model_columns: [],
        model_parts: [],
        add_columns: [],
        delete_column_ids: [],
        add_models: [],
        delete_model_ids: [],
    })
    const [newdata2, setnewdata2] = useState({
        id: "",
        asset_id: "",
        name: "",
        description: "",
        manufacturer_id: "",
        required_sn: false,
        model_columns: [],
        model_parts: [],
        add_columns: [],
        delete_column_ids: [],
        add_models: [],
        delete_model_ids: [],
    })
    const [defaultdata, setdefaultdata] = useState([])
    const [assetdata, setassetdata] = useState([])
    const [manufdata, setmanufdata] = useState([])
    const [modeldata, setmodeldata] = useState([])
    const [fielddata, setfielddata] = useState([])
    const [fielddata2, setfielddata2] = useState([])
    const [fielddataa, setfielddataa] = useState([])
    const [fielddataa2, setfielddataa2] = useState([])
    const [modelpartfielddata, setmodelpartfielddata] = useState([])
    const [currentfield, setcurrentfield] = useState({
        name: "",
        data_type: "",
        default: "single",
        required: false
    })
    const [currentfield2, setcurrentfield2] = useState({
        name: "",
        data_type: "",
        default: "single",
        required: false
    })
    const [currentidmodel, setcurrentidmodel] = useState({
        id: ""
    })
    const [addedfield, setaddedfield] = useState([])
    const [addedfield2, setaddedfield2] = useState([])
    const [addedfieldidx, setaddedfieldidx] = useState(-1)
    const [addedfieldtrigger, setaddedfieldtrigger] = useState(false)
    const [addedfieldidx2, setaddedfieldidx2] = useState(-1)
    const [addedfieldtrigger2, setaddedfieldtrigger2] = useState(false)
    const [loadingcreate, setloadingcreate] = useState(false)
    const [loadingcreatemodel, setloadingcreatemodel] = useState(false)
    const [loadinggetmodel, setloadinggetmodel] = useState(false)
    const [praloading, setpraloading] = useState(true)
    const [loadingspec, setloadingspec] = useState(false)
    const [loadingspec2, setloadingspec2] = useState(false)
    const [currentdropdown2, setcurrentdropdown2] = useState(["", ""])
    const [currentdropdownn2, setcurrentdropdownn2] = useState(["", ""])
    const [currentcheckeddropdown2, setcurrentcheckeddropdown2] = useState("")
    const [currentcheckeddropdownn2, setcurrentcheckeddropdownn2] = useState("")
    const [valuedropdowntrigger, setvaluedropdowntrigger] = useState(false)
    const [valuedropdowntrigger2, setvaluedropdowntrigger2] = useState(false)
    const [idxdropdowntrigger, setidxdropdowntrigger] = useState(-1)
    const [idxdropdowntrigger2, setidxdropdowntrigger2] = useState(-1)
    const [concatfieldtrigger, setconcatfieldtrigger] = useState(false)
    const [concataddcolumnstrigger, setconcataddcolumnstrigger] = useState(false)
    const [concataddcolumnsidx, setconcataddcolumnsidx] = useState(-1)
    const [concataddcolumnsvalue, setconcataddcolumnsvalue] = useState(-1)
    const [concatfieldtrigger2, setconcatfieldtrigger2] = useState(false)
    const [editpart, seteditpart] = useState(false)
    const [modalcreatemodel, setmodalcreatemodel] = useState(false)
    const [newdatatrigger, setnewdatatrigger] = useState(false)
    const [newdatatrigger2, setnewdatatrigger2] = useState(false)
    const [modeltrigger, setmodeltrigger] = useState(false)
    const [concatparttrigger, setconcatparttrigger] = useState(false)
    const [concatpartvalue, setconcatpartvalue] = useState(-1)
    const [assettypecode, setassettypecode] = useState("")
    const [assettypecode2, setassettypecode2] = useState("")
    const [defaultmodel, setdefaultmodel] = useState({})
    const [disabledtambah, setdisabledtambah] = useState(false)
    const [disabledtambah2, setdisabledtambah2] = useState(false)
    const [disabledaddfield, setdisabledaddfield] = useState(false)
    const [disabledaddfield2, setdisabledaddfield2] = useState(false)

    //3.onChange
    const onClickAddField = () => {
        setfielddata2([...fielddata2, {
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
        setaddedfield([...addedfield, false])
        setcurrentdropdown2(["", ""])
        setcurrentcheckeddropdown2([])
        setdisabledaddfield(true)
        setdisabledtambah(true)
    }
    const onClickAddField2 = () => {
        setfielddataa2([...fielddataa2, {
            name: "",
            data_type: "",
            default: "",
            required: false
        }])
        setcurrentfield2({
            name: "",
            data_type: "",
            default: "",
            required: false
        })
        setcurrentdropdownn2(["", ""])
        setcurrentcheckeddropdownn2([])
        setdisabledaddfield2(true)
        setdisabledtambah2(true)
    }
    const onClickSelectAsset = (id) => {
        setnewdata({ ...newdata, asset_id: Number(id) });
        setloadingspec(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/getAsset?id=${id}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps)
            }
        })
            .then(res => res.json())
            .then(res2 => {
                var temp = []
                if (res2.success) {
                    temp = res2.data.asset_columns.map((doc, idx) => {
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
                    setfielddata2(temp)
                    setnewdata({
                        id: defaultmodel.id,
                        name: defaultmodel.name,
                        description: defaultmodel.description,
                        manufacturer_id: defaultmodel.manufacturer_id,
                        count: defaultmodel.count,
                        asset: {
                            id: res2.data.id,
                            name: res2.data.name,
                            code: res2.data.code,
                            description: res2.data.description
                        },
                        manufacturer: {
                            id: defaultmodel.manufacturer.id,
                            name: defaultmodel.manufacturer.name,
                        },
                        asset_id: Number(id),
                        model_columns: temp,
                        add_columns: [],
                        update_columns: [],
                        delete_column_ids: [],
                        add_models: [],
                        delete_model_ids: [],
                        required_sn: res2.data.required_sn
                    })
                    setdefaultdata({
                        id: defaultmodel.id,
                        name: defaultmodel.name,
                        description: defaultmodel.description,
                        manufacturer_id: defaultmodel.manufacturer_id,
                        count: defaultmodel.count,
                        asset: {
                            id: res2.data.id,
                            name: res2.data.name,
                            code: res2.data.code,
                            description: res2.data.description
                        },
                        manufacturer: {
                            id: defaultmodel.manufacturer.id,
                            name: defaultmodel.manufacturer.name,
                        },
                        asset_id: Number(id),
                        model_columns: temp,
                        add_columns: [],
                        update_columns: [],
                        delete_column_ids: [],
                        add_models: [],
                        delete_model_ids: [],
                        required_sn: res2.data.required_sn
                    })
                    var arr = []
                    for (var i = 0; i < res2.data.asset_columns.length; i++) {
                        arr.push(true)
                    }
                    setaddedfield(arr)
                    setassettypecode(res2.data.id)
                    setnewdatatrigger(prev => !prev)
                    setloadingspec(false)
                }
                else {
                    temp = []
                    setfielddata2(temp)
                    setnewdata({ ...newdata, model_columns: temp, required_sn: false, asset_id: 0 })
                    setloadingspec(false)
                }
            })
    }
    const onClickSelectAsset2 = (id) => {
        setloadingspec2(true)
        setnewdata2({ ...newdata2, asset_id: Number(id) });
        fetch(`https://boiling-thicket-46501.herokuapp.com/getAsset?id=${id}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps)
            }
        })
            .then(res => res.json())
            .then(res2 => {
                var temp = []
                if (res2.success) {
                    temp = res2.data.asset_columns.map((doc, idx) => {
                        if (doc.data_type === 'dropdown' || doc.data_type === 'checkbox') {
                            return ({
                                ...doc,
                                default: JSON.parse(doc.default)
                            })
                        }
                        else {
                            return { ...doc }
                        }
                    })
                    setfielddataa(temp)
                    setnewdata2({ ...newdata2, required_sn: res2.data.required_sn, asset_id: res2.data.code })
                    setassettypecode2(res2.data.id)
                    setnewdatatrigger2(prev => !prev)
                    setloadingspec2(false)
                }
                else {
                    temp = []
                    setfielddataa(temp)
                    setnewdata2({ ...newdata2, model_columns: temp, required_sn: false, asset_id: 0 })
                    setloadingspec2(false)
                }
            })
    }

    //4.handle
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
            else if (prop === 'update_columns') {
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
            else if (prop === 'add_columns') {
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
            else if (prop === 'asset_id') {
                t[prop] = Number(assettypecode)
            }
            else {
                t[prop] = newdata[prop]
            }
        }
        setloadingcreate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateModel`, {
            method: 'PUT',
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
                        message: "Model berhasil diubah",
                        duration: 3
                    })
                    setTimeout(() => {
                        setmodalcreatemodel(false)
                        rt.push(`/admin/models/detail/${modelid}`)
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
    const handleCreateModelinModel = () => {
        var t = {}
        for (var prop in newdata2) {
            if (prop === "model_columns") {
                t[prop] = newdata2[prop].map((doc, idx) => {
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
            else if (prop === "asset_id") [
                t[prop] = Number(assettypecode2)
            ]
            else {
                t[prop] = newdata2[prop]
            }
        }
        setloadingcreatemodel(true)
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
                setloadingcreatemodel(false)
                if (res2.success) {
                    notification['success']({
                        message: "Model berhasil ditambahkan",
                        duration: 3
                    })
                    setTimeout(() => {
                        setmodalcreatemodel(false)
                        setmodeltrigger(prev => !prev)
                        // rt.push(`/admin/models/detail/${res2.id}`)
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

    //5.useEffect
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
                setpraloading(false)
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
                var temp1 = {}
                var temp11 = []
                const recursivePartModel = item => {
                    for (var i = 0; i < item.length; i++) {
                        temp1 = item[i].model_column.map((doc, idx) => {
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
                        temp11.push({
                            ...item[i],
                            model_column: temp1,
                            model_child: item[i].model_child.length > 0 ? recursivePartModel(item[i].model_child) : []
                        })
                    }
                }
                recursivePartModel(res2.data.model_parts)
                const temp2 = {
                    ...res2.data,
                    asset_id: res2.data.asset.code,
                    model_columns: temp,
                    add_columns: [],
                    update_columns: [],
                    delete_column_ids: [],
                    add_models: [],
                    delete_model_ids: []
                }
                setnewdata(temp2)
                setdefaultdata(temp2)
                setdefaultmodel(temp2)
                setfielddata2(temp)
                setmodelpartfielddata(temp11)
                var arr = []
                for (var i = 0; i < res2.data.model_columns.length; i++) {
                    arr.push(true)
                }
                setaddedfield(arr)
                setassettypecode(res2.data.asset_id)
                setTimeout(() => {
                    setpraloading(false)
                }, 1000);
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
                setmodeldata(res2.data)
            })
    }, [modeltrigger])
    useEffect(() => {
        if (idxdropdowntrigger !== -1) {
            setfielddata2(prev => {
                const temp = prev
                temp[idxdropdowntrigger]["default"] = {
                    default: currentcheckeddropdown2,
                    opsi: currentdropdown2
                }
                return temp
            })
        }
    }, [valuedropdowntrigger])
    useEffect(() => {
        setnewdata({
            ...newdata,
            model_columns: fielddata.concat(fielddata2)
        })
    }, [concatfieldtrigger])
    useEffect(() => {
        if (concataddcolumnsidx !== -1) {
            if ((concataddcolumnsidx > defaultdata.model_columns.length - 1) || (typeof (concataddcolumnsvalue.id) === 'undefined')) {
                console.log("sini")
                // if ((fielddata2.length - defaultdata.model_columns.length) >= newdata.add_columns.length) {
                if (newdata.add_columns.map(docadd => docadd.name).indexOf(currentfield.name) === -1) {
                    console.log(fielddata2.length + ":" + defaultdata.model_columns.length + ":" + newdata.add_columns.length)
                    if (currentfield.data_type === 'dropdown' || currentfield.data_type === 'checkbox') {
                        setnewdata(prev => {
                            var temp = prev
                            temp.add_columns.push(fielddata2[fielddata2.length - 1])
                            return temp
                        })
                    }
                    else {
                        setnewdata(prev => {
                            var temp = prev
                            temp.add_columns.push(currentfield)
                            return temp
                        })
                    }
                }
                else {
                    const idxaddcolumn = newdata.add_columns.map(docadd2 => docadd2.name).indexOf(currentfield.name)
                    // console.log(newdata.asset_columns.length+":"+concataddcolumnsidx+";"+newdata.add_columns.length)
                    if (currentfield.data_type === 'dropdown' || currentfield.data_type === 'checkbox') {
                        setnewdata(prev => {
                            var temp = prev
                            temp.add_columns[idxaddcolumn] = {
                                name: currentfield.name,
                                data_type: currentfield.data_type,
                                default: {
                                    default: currentcheckeddropdown2,
                                    opsi: currentdropdown2
                                },
                                required: currentfield.required
                            }
                            return temp
                        })
                    }
                    else {
                        setnewdata(prev => {
                            var temp = prev
                            temp.add_columns[concataddcolumnsidx - defaultdata.model_columns.length] = currentfield
                            return temp
                        })
                    }
                }
            }
            else {
                // console.log(fielddata2[concataddcolumnsidx])
                if (newdata.update_columns.map(docup => docup.id).indexOf(currentfield.id) === -1) {
                    setnewdata(prev => {
                        var temp = prev
                        temp.update_columns.push(fielddata2[concataddcolumnsidx])
                        return temp
                    })
                }
                else {
                    const idxupcolumn = newdata.update_columns.map(docadd2 => docadd2.id).indexOf(currentfield.id)
                    if (currentfield.data_type === 'dropdown' || currentfield.data_type === 'checkbox') {
                        setnewdata(prev => {
                            var temp = prev
                            temp.update_columns[idxupcolumn] = {
                                id: currentfield.id,
                                model_id: currentfield.model_id,
                                name: currentfield.name,
                                data_type: currentfield.data_type,
                                default: {
                                    default: currentcheckeddropdown2,
                                    opsi: currentdropdown2
                                },
                                required: currentfield.required
                            }
                            return temp
                        })
                    }
                    else {
                        setnewdata(prev => {
                            var temp = prev
                            temp.update_columns[idxupcolumn] = currentfield
                            return temp
                        })
                    }
                }
            }
        }
    }, [concataddcolumnstrigger])
    useEffect(() => {
        if (addedfieldidx !== -1) {
            setaddedfield(prev => {
                if (prev[addedfieldidx] === false) {
                    prev[addedfieldidx] = true
                    return prev
                }
                else if (typeof (prev[addedfieldidx]) === 'undefined') {
                    const temp2 = [...prev, true]
                    return temp2
                }
            })
        }
    }, [addedfieldtrigger])

    useEffect(() => {
        if (idxdropdowntrigger2 !== -1) {
            setfielddataa2(prev => {
                const temp = prev
                temp[idxdropdowntrigger2]["default"] = {
                    default: currentcheckeddropdownn2,
                    opsi: currentdropdownn2
                }
                return temp
            })
        }
    }, [valuedropdowntrigger2])
    useEffect(() => {
        setnewdata2({
            ...newdata2,
            model_columns: fielddataa.concat(fielddataa2)
        })
    }, [concatfieldtrigger2])
    useEffect(() => {
        if (addedfieldidx2 !== -1) {
            setaddedfield2(prev => {
                if (prev[addedfieldidx2] === false) {
                    prev[addedfieldidx2] = true
                    return prev
                }
                else if (typeof (prev[addedfieldidx2]) === 'undefined') {
                    const temp2 = [...prev, true]
                    return temp2
                }
            })
        }
    }, [addedfieldtrigger2])

    useEffect(() => {
        setnewdata({ ...newdata, model_columns: fielddata })
    }, [newdatatrigger])
    useEffect(() => {
        setnewdata2({ ...newdata2, model_columns: fielddataa })
    }, [newdatatrigger2])

    useEffect(() => {
        var temp = []
        if (concatpartvalue !== -1) {
            if (concatpartvalue.length === 0) {
                setnewdata({ ...newdata, model_parts: [] })
            }
            else {
                concatpartvalue.map((doc, idx) => {
                    var idxtemp = temp.map(doc => doc.id).indexOf(doc.id)
                    if (idxtemp !== -1 && temp[idxtemp]["id"] === doc.id) {
                        var idxof = temp.map(doc => doc.id).indexOf(doc.id)
                        temp[idxof] = { ...temp[idxof], quantity: temp[idxof].quantity + doc.quantity }
                    }
                    else if (idxtemp === -1) {
                        temp.push({
                            id: doc.id,
                            quantity: doc.quantity
                        })
                    }
                })
                setnewdata({ ...newdata, add_models: temp })
            }
        }
    }, [concatparttrigger])
    return (
        <Layout st={st} tok={initProps} sidemenu={sidemenu} dataProfile={dataProfile} pathArr={pathArr}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4" id="createAssetsWrapper">
                <div className=" col-span-1 md:col-span-4 mb-8">
                    <Sticky containerSelectorFocus="#createAgentsWrapper">
                        <div className=" col-span-4 flex justify-between p-2 pt-4 border-t-2 border-b-2 bg-white">
                            <h1 className="font-semibold py-2">Form Ubah Model - {newdata.name}</h1>
                            <div className="flex space-x-2">
                                <Link href={`/admin/models/detail/${modelid}`}>
                                    <Button /*onClick={() => { console.log(newdata); console.log(fielddata2); console.log(defaultdata) }}*/ type="default">Batal</Button>
                                </Link>
                                <Button type="primary" loading={loadingcreate} disabled={disabledaddfield} onClick={instanceForm.submit}>Simpan</Button>
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
                                <Form form={instanceForm} layout="vertical" onFinish={handleCreateModel} initialValues={newdata}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 space-x-2">
                                        <Form.Item name="asset_id" label="Asset Type"
                                            rules={[
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
                                                    if (typeof (value) !== 'undefined') {
                                                        onClickSelectAsset(extra.allCheckedNodes[0].node.props.id)
                                                    }
                                                    else {
                                                        onClickSelectAsset(0)
                                                    }
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
                                            <Input name="name" onChange={(e) => { setnewdata({ ...newdata, name: e.target.value }) }} />
                                        </Form.Item>
                                    </div>
                                    <Form.Item name="manufacturer_id" label="Manufacturer"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Manufacturer wajib diisi',
                                            },
                                        ]}>
                                        <Select placeholder="Pilih Manufacturer" onChange={(value) => { setnewdata({ ...newdata, manufacturer_id: value }) }} name="manufacturer_id">
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
                                        <Input.TextArea rows={4} name="description" onChange={(e) => { setnewdata({ ...newdata, description: e.target.value }) }} />
                                    </Form.Item>
                                    <div className="flex">
                                        <Checkbox style={{ marginRight: `0.5rem` }} onChange={(e) => { setnewdata({ ...newdata, required_sn: e.target.checked }) }} checked={newdata.required_sn} /> Serial Number wajib ada
                                    </div>
                                </Form>
                        }
                    </div>
                </div>
                <div className=" col-span-1 md:col-span-4 px-5 mb-8 flex flex-col">
                    <div className="mb-5">
                        <h1 className="font-bold text-xl">Spesifikasi Model</h1>
                    </div>
                    {
                        loadingspec ?
                            <Spin />
                            :
                            <>
                                {
                                    fielddata2.map((doc, idx) => {
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
                                                            setcurrentfield(fielddata2[idx])
                                                            if (doc.data_type === 'dropdown' || doc.data_type === 'checkbox') {
                                                                setcurrentdropdown2(doc.default.opsi)
                                                                setcurrentcheckeddropdown2(doc.default.default)
                                                            }
                                                            if (fielddata2[idx].data_type !== 'dropdown' || fielddata2[idx].data_type !== 'checkbox') {
                                                                if (fielddata2[idx].name !== "" && fielddata2[idx].data_type !== "") {
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
                                                        }}>
                                                            <div className="font-semibold mb-2">
                                                                {doc.name}
                                                                {fielddata2[idx].required ? <span className="judulField"></span> : null} <span className="text-gray-400 text-sm">({doc.data_type === "single" ? "Single Textbox" : doc.data_type.charAt(0).toUpperCase() + doc.data_type.slice(1)})</span>
                                                            </div>
                                                            <div className='rounded border w-full pl-3 py-2 flex items-center my-auto'>
                                                                {
                                                                    doc.data_type === 'checkbox' || doc.data_type === 'dropdown' || doc.data_type === 'paragraph' || doc.data_type === 'date' ?
                                                                        <>
                                                                            {
                                                                                doc.data_type === 'dropdown' &&
                                                                                <div className="flex flex-col w-full">
                                                                                    {
                                                                                        doc.default.opsi.map((dok, idk) => {
                                                                                            return (
                                                                                                <div key={idk} className='rounded border mb-1 w-3/12 py-1 pl-3 flex items-center flex-wrap my-auto'>
                                                                                                    <Checkbox disabled checked={doc.default.default === idk ? true : false} style={{ marginRight: `0.5rem` }} />
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
                                                                                                    <Checkbox disabled checked={doc.default.default.indexOf(idk) !== -1 ? true : false} style={{ marginRight: `0.5rem` }} />
                                                                                                    <p className="mb-0">{dok}</p>
                                                                                                </div>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </div>
                                                                            }
                                                                            {
                                                                                doc.data_type === 'date' &&
                                                                                <div className="flex justify-between w-full px-3">
                                                                                    <p className='mb-0'>{doc.default}</p>
                                                                                    <div>
                                                                                        <CalendarOutlined></CalendarOutlined>
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                            {
                                                                                doc.data_type === 'paragraph' &&
                                                                                <div className="flex h-20">{doc.default}</div>

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
                                                            <Form layout="vertical" initialValues={currentfield}>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 space-x-2">
                                                                    <Form.Item name="name" label="Nama Spesifikasi" rules={[
                                                                        {
                                                                            required: true,
                                                                            message: 'Nama Spesifikasi wajib diisi',
                                                                        },
                                                                    ]}>
                                                                        <Input required name="name" onChange={(e) => {
                                                                            setcurrentfield({ ...currentfield, name: e.target.value })
                                                                            if (e.target.value === "") {
                                                                                setdisabledtambah(true)
                                                                            }
                                                                            else if (e.target.value !== "" && currentfield.data_type !== "") {
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
                                                                                setdisabledtambah(true)
                                                                            }
                                                                            else {
                                                                                setdisabledtambah(false)
                                                                            }
                                                                            if (value === 'dropdown') {
                                                                                setcurrentcheckeddropdown2("")
                                                                                setcurrentdropdown2(["", ""])
                                                                            }
                                                                            if (value === 'checkbox') {
                                                                                setcurrentcheckeddropdown2([])
                                                                                setcurrentdropdown2(["", ""])
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
                                                                <Form.Item name="default" label="Default">
                                                                    {
                                                                        currentfield.data_type.toLowerCase() === "dropdown" ?
                                                                            <div className="flex flex-col">
                                                                                <h1>Default hanya dipilih 1 (satu) dari beberapa opsi dibawah ini</h1>
                                                                                {
                                                                                    currentdropdown2.map((doc, idxx) => (
                                                                                        <div className="flex mb-3">
                                                                                            <div className="w-7 flex items-center">
                                                                                                <Checkbox checked={currentcheckeddropdown2 === idxx ? true : false} onChange={(e) => {
                                                                                                    if (e.target.checked === true) {
                                                                                                        setcurrentcheckeddropdown2(idxx)
                                                                                                    }
                                                                                                }}></Checkbox>
                                                                                            </div>
                                                                                            <div className="w-10/12 mr-5">
                                                                                                <Input style={{ marginRight: `0.5rem` }} defaultValue={doc} placeholder={`Masukkan opsi ke-${idxx + 1}`} onChange={(e) => {
                                                                                                    setcurrentdropdown2(prev => {
                                                                                                        const temp = prev
                                                                                                        temp[idxx] = e.target.value
                                                                                                        return temp
                                                                                                    })
                                                                                                    if ((e.target.value !== "") && (idxx === currentdropdown2.length - 1)) {
                                                                                                        setdisabledtambah(false)
                                                                                                    }
                                                                                                }} />
                                                                                            </div>
                                                                                            <div className="w-1/12 flex justify-around" onClick={() => {
                                                                                                setcurrentdropdown2(prev => prev.filter((_, idxxx) => idxxx !== idxx))
                                                                                            }}>
                                                                                                <Button type="danger">-</Button>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))
                                                                                }
                                                                                <div className="mx-auto my-3">
                                                                                    <Button onClick={() => { setcurrentdropdown2([...currentdropdown2, ""]); setdisabledtambah(true) }}>+ Tambah Opsi</Button>
                                                                                </div>
                                                                            </div>
                                                                            :
                                                                            null
                                                                    }
                                                                    {
                                                                        currentfield.data_type.toLowerCase() === "checkbox" ?
                                                                            <div className="flex flex-col">
                                                                                <h1>Default dapat dipilih lebih dari 1 (satu) opsi dibawah ini</h1>
                                                                                {
                                                                                    currentdropdown2.map((doc, idxx) => {
                                                                                        const idxchecked = currentcheckeddropdown2.includes(idxx)
                                                                                        return (
                                                                                            <div className="flex mb-3">
                                                                                                <div className="w-7 flex items-center">
                                                                                                    <Checkbox defaultChecked={idxchecked} onChange={(e) => {
                                                                                                        if (e.target.checked === true) {
                                                                                                            setcurrentcheckeddropdown2(prev => {
                                                                                                                var temp = prev
                                                                                                                temp.push(idxx)
                                                                                                                return temp
                                                                                                            })
                                                                                                        }
                                                                                                        else {
                                                                                                            setcurrentcheckeddropdown2(prev => {
                                                                                                                var temp = prev
                                                                                                                const index = temp.indexOf(idxx)
                                                                                                                temp.splice(index, 1)
                                                                                                                return temp
                                                                                                            })
                                                                                                        }
                                                                                                    }}></Checkbox>
                                                                                                </div>
                                                                                                <div className="w-10/12 mr-5">
                                                                                                    <Input style={{ marginRight: `0.5rem` }} defaultValue={doc} placeholder={`Masukkan opsi ke-${idxx + 1}`} onChange={(e) => {
                                                                                                        setcurrentdropdown2(prev => {
                                                                                                            const temp = prev
                                                                                                            temp[idxx] = e.target.value
                                                                                                            return temp
                                                                                                        })
                                                                                                        if ((e.target.value !== "") && (idxx === currentdropdown2.length - 1)) {
                                                                                                            setdisabledtambah(false)
                                                                                                        }
                                                                                                    }} />
                                                                                                </div>
                                                                                                <div className="w-1/12 flex justify-around" onClick={() => {
                                                                                                    setcurrentdropdown2(prev => prev.filter((_, idxxx) => idxxx !== idxx))
                                                                                                }}>
                                                                                                    <Button type="danger">-</Button>
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                                }
                                                                                <div className="mx-auto my-3">
                                                                                    <Button onClick={() => { setcurrentdropdown2([...currentdropdown2, ""]); setdisabledtambah(true) }}>+ Tambah Opsi</Button>
                                                                                </div>
                                                                            </div>
                                                                            :
                                                                            null
                                                                    }
                                                                    {
                                                                        currentfield.data_type.toLowerCase() === 'number' &&
                                                                        <InputNumber style={{ width: `30%` }} defaultValue={fielddata2[idx].default} placeholder={`Masukkan default ${currentfield.name}`} onChange={(value) => {
                                                                            setcurrentfield({ ...currentfield, default: `${value}` })
                                                                        }}></InputNumber>
                                                                    }
                                                                    {
                                                                        currentfield.data_type.toLowerCase() === "paragraph" &&
                                                                        <Input.TextArea rows={4} placeholder={`Masukkan default ${currentfield.name}`} defaultValue={fielddata2[idx].default} onChange={(e) => {
                                                                            setcurrentfield({ ...currentfield, default: e.target.value })
                                                                        }}></Input.TextArea>
                                                                    }
                                                                    {
                                                                        (currentfield.data_type.toLowerCase() === "string") &&
                                                                        <Input placeholder={`Masukkan default ${currentfield.name}`} defaultValue={fielddata2[idx].default} onChange={(e) => {
                                                                            setcurrentfield({ ...currentfield, default: e.target.value })
                                                                        }}></Input>
                                                                    }
                                                                    {
                                                                        (currentfield.data_type.toLowerCase() === "single") &&
                                                                        <Input placeholder={`Masukkan default ${currentfield.name}`} defaultValue={fielddata2[idx].default} onChange={(e) => {
                                                                            setcurrentfield({ ...currentfield, default: e.target.value })
                                                                        }}></Input>
                                                                    }
                                                                    {
                                                                        currentfield.data_type.toLowerCase() === "date" &&
                                                                        <DatePicker style={{ width: `30%` }} placeholder={`Masukkan default ${currentfield.name}`} onChange={(value, dateString) => {
                                                                            setcurrentfield({ ...currentfield, default: dateString })
                                                                        }}></DatePicker>
                                                                    }
                                                                </Form.Item>
                                                                <hr />
                                                                <div className="flex mt-4 justify-end">
                                                                    <Popconfirm placement="bottom" title={`Apakah anda yakin ingin menghapus field ${doc.name === "" ? "ini" : doc.name}?`} okText="Ya" cancelText="Tidak" onConfirm={() => {
                                                                        setfielddata2(prev => prev.filter((_, idxx) => idxx !== idx))
                                                                        setnewdata(prev => {
                                                                            var temp = prev
                                                                            temp.model_columns = temp.model_columns.filter((_, idxx) => idxx !== fielddata.length + idx)
                                                                            return temp
                                                                        })
                                                                        if (defaultdata.model_columns.some(docdef => docdef.id === doc.id)) {
                                                                            setnewdata(prev => {
                                                                                var temp = prev
                                                                                temp.delete_column_ids.push(doc.id)
                                                                                const idxtemp = defaultdata.model_columns.map(doctemp => doctemp.id).indexOf(doc.id)
                                                                                temp.model_columns.splice(idxtemp, 1)
                                                                                return temp
                                                                            })
                                                                        }
                                                                        else {
                                                                            setnewdata(prev => {
                                                                                var temp = prev
                                                                                const idxtemp = temp.add_columns.map(doctemp => doctemp.name).indexOf(doc.name)
                                                                                idxtemp !== -1 ? temp.add_columns.splice(idxtemp, 1) : null
                                                                                return temp
                                                                            })
                                                                        }
                                                                        setaddedfield(prev => {
                                                                            prev.splice(idx, 1)
                                                                            return prev
                                                                        })
                                                                        setdisabledaddfield(false)
                                                                    }
                                                                    }>
                                                                        <div className="flex items-center mr-4 hover:text-red-500 cursor-pointer">
                                                                            <DeleteOutlined style={{ fontSize: `1.25rem` }} ></DeleteOutlined>
                                                                        </div>
                                                                    </Popconfirm>
                                                                    <div className=" flex items-center mr-4">
                                                                        <Checkbox checked={currentfield.required} style={{ marginRight: `0.5rem` }} onChange={(e) => {
                                                                            setcurrentfield({ ...currentfield, required: e.target.checked })
                                                                        }} /> Required
                                                                    </div>
                                                                    <Button disabled={disabledtambah} type="primary" onClick={() => {
                                                                        if (currentfield.data_type === 'dropdown' || currentfield.data_type === 'checkbox') {
                                                                            setidxdropdowntrigger(idx)
                                                                            setvaluedropdowntrigger(prev => !prev)
                                                                        }
                                                                        setconcataddcolumnsidx(idx)
                                                                        setconcataddcolumnsvalue(doc)
                                                                        setconcataddcolumnstrigger(prev => !prev)
                                                                        const temp = fielddata2
                                                                        temp[idx] = currentfield
                                                                        setfielddata2(temp)
                                                                        setaddedfieldidx(idx)
                                                                        setaddedfieldtrigger(prev => !prev)
                                                                        setconcatfieldtrigger(prev => !prev)
                                                                        setdisabledaddfield(false)
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
                    <div className="w-full flex justify-center mt-5">
                        <Button type="dashed" disabled={disabledaddfield} style={{ width: `80%`, height: `4rem` }} onClick={onClickAddField}>+ Tambah Spesifikasi Model</Button>
                    </div>
                </div>
                <div className=" mb-8 col-span-1 md:col-span-4 px-5 flex flex-col">
                    <div className="mb-5">
                        <h1 className="font-bold text-xl">Konfigurasi Part Model</h1>
                    </div>
                    {
                        modelpartfielddata.length === 0 ?
                            null
                            :
                            <>
                                <Collapse accordion>
                                    {
                                        modelpartfielddata.map((doc, idx) => {
                                            return (
                                                <Panel id={`panel${idx}`} key={idx} header={
                                                    <strong>{doc.name ?
                                                        <>
                                                            {
                                                                doc.model_child.length === 0 ?
                                                                    <div className="flex items-center w-6/12">
                                                                        <span className="mr-2">{doc.name}</span>
                                                                        <Tooltip placement="right" title="Model tidak memiliki part model!">
                                                                            <ExclamationCircleOutlined style={{ color: `brown` }}></ExclamationCircleOutlined>
                                                                        </Tooltip>
                                                                    </div>
                                                                    :
                                                                    doc.name
                                                            }
                                                        </>
                                                        :
                                                        "-"}
                                                    </strong>}
                                                    extra={
                                                        <div className="absolute top-2 right-2">
                                                            <Popconfirm placement="bottom" title={`Apakah anda yakin ingin menghapus Model ${doc.name === "" ? "ini" : doc.name} dari Model Part ${newdata.name}?`} okText="Ya" cancelText="Tidak" onConfirm={() => {
                                                                setnewdata(prev => {
                                                                    var temp = prev
                                                                    var idxtemp = modelpartfielddata.map(doctemp => doctemp.id).indexOf(doc.id)
                                                                    if ((defaultdata.model_parts.map(docparts => docparts.id).includes(doc.id) === false) && idxtemp !== -1) {
                                                                        temp.add_models.splice(idxtemp, 1)
                                                                    }
                                                                    if ((defaultdata.model_parts.map(docparts => docparts.id).includes(doc.id) === true) && idxtemp !== -1) {
                                                                        temp.delete_model_ids.push(doc.id)
                                                                    }
                                                                    return temp
                                                                })
                                                                setmodelpartfielddata(prev => prev.filter((_, idxx) => idxx !== idx))
                                                            }}>
                                                                <CloseCircleOutlined style={{ color: `red` }} />
                                                            </Popconfirm>
                                                        </div>
                                                    }>
                                                    <div className="flex flex-col p-3">
                                                        <div className="flex flex-col mb-5">
                                                            <h1 className="font-semibold mb-1">Asset Type <span className="judulassettype"></span></h1>
                                                            <div className="rounded bg-gray-200 w-full flex items-center my-auto h-12 px-2">
                                                                <p className="mb-0 text-sm">{doc.name}</p>
                                                            </div>
                                                        </div>
                                                        {
                                                            doc.model_column.map((docmc, idxmc) => {
                                                                return (
                                                                    <div className="flex flex-col mb-5">
                                                                        <h1 className="font-semibold mb-1">{docmc.name} {docmc.required ? <span className="judulsn"></span> : null} <span className="text-gray-400">{docmc.data_type ? <>({docmc.data_type.charAt(0).toUpperCase() + docmc.data_type.slice(1)})</> : ""}</span></h1>
                                                                        <div className="rounded bg-gray-200 w-full flex flex-col justify-center my-auto px-2 py-1">
                                                                            {
                                                                                docmc.data_type === 'dropdown' || docmc.data_type === 'checkbox' ?
                                                                                    <>
                                                                                        {docmc.data_type === 'dropdown' &&
                                                                                            <>
                                                                                                {
                                                                                                    docmc.default.opsi.map((docopsi, idxopsi) => (
                                                                                                        <div key={idxopsi} className="rounded bg-white border w-3/12 flex items-center my-auto px-2 py-1 mb-1">
                                                                                                            <Checkbox disabled checked={idxopsi === docmc.default.default} style={{ marginRight: `0.5rem` }} />
                                                                                                            {docopsi}
                                                                                                        </div>
                                                                                                    ))
                                                                                                }
                                                                                            </>
                                                                                        }
                                                                                        {docmc.data_type === 'checkbox' &&
                                                                                            <>
                                                                                                {
                                                                                                    docmc.default.opsi.map((docopsi, idxopsi) => (
                                                                                                        <div key={idxopsi} className="rounded w-full flex items-center my-auto px-2 py-1 mb-1">
                                                                                                            <Checkbox disabled checked={idxopsi === docmc.default.default} style={{ marginRight: `0.5rem` }} />
                                                                                                            {docopsi}
                                                                                                        </div>
                                                                                                    ))
                                                                                                }
                                                                                            </>
                                                                                        }
                                                                                    </>
                                                                                    :
                                                                                    <p className="mb-0 text-sm">{docmc.default}</p>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                        {
                                                            doc.model_child.length === 0 ?
                                                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
                                                                :
                                                                <>
                                                                    <Timeline style={{ marginTop: `1rem` }}>
                                                                        {
                                                                            renderChildPartModel(doc.model_child)
                                                                        }
                                                                    </Timeline>
                                                                </>
                                                        }
                                                    </div>
                                                    <style jsx>
                                                        {`
                                                        .judulassettype::before{
                                                            content: '*';
                                                            color: red;
                                                        }
                                                        .judulsn::before{
                                                            content: '*';
                                                            color: red;
                                                        }
                                                    `}
                                                    </style>
                                                </Panel>
                                            )
                                        })
                                    }
                                </Collapse>
                            </>
                    }
                    <>
                        {
                            editpart ?
                                <div className="shadow-md border p-8 mx-3 md:mx-8 my-3 flex flex-col rounded-md relative">
                                    <div className="absolute top-2 right-5 text-lg cursor-pointer" onClick={() => { seteditpart(false) }}>x</div>
                                    <Form layout="vertical" initialValues={currentidmodel}>
                                        <div className="flex mb-2">
                                            <div className=" w-11/12 mr-3">
                                                <Form.Item name="id" label="Nama Model"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Nama Model wajib diisi',
                                                        },
                                                    ]}>
                                                    <Select value={currentidmodel.id} showSearch optionFilterProp="children" placeholder="Masukkan atau cari nama modul" onChange={(value) => { setcurrentidmodel({ ...currentidmodel, id: value }) }} name="id" filterOption={(input, opt) => (
                                                        opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    )}>
                                                        {
                                                            modeldata.map((doc, idx) => {
                                                                return (
                                                                    <Select.Option key={doc.id} value={doc.id}>{doc.name}</Select.Option>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                            <div className="w-1/12 flex pt-2 my-auto items-center cursor-pointer" onClick={() => { setmodalcreatemodel(true) }}>
                                                <PlusSquareTwoTone style={{ fontSize: `1.5rem` }} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="flex mt-4 justify-end">
                                            <div className="flex items-center mr-4 hover:text-red-500 cursor-pointer" onClick={() => { seteditpart(false); setcurrentidmodel({ id: "" }) }}>
                                                <DeleteOutlined style={{ fontSize: `1.25rem` }} ></DeleteOutlined>
                                            </div>
                                            <Button loading={loadinggetmodel} type="primary" onClick={() => {
                                                seteditpart(false)
                                                setloadinggetmodel(true)
                                                fetch(`https://boiling-thicket-46501.herokuapp.com/getModel?id=${currentidmodel.id}`).then(res => res.json()).then(res2 => {
                                                    setmodelpartfielddata(prev => {
                                                        var temp1 = prev
                                                        var t = {}
                                                        for (var prop in res2.data) {
                                                            if (prop === "model_columns") {
                                                                t["model_column"] = res2.data[prop].map((doc, idx) => {
                                                                    if (doc.data_type === 'dropdown' || doc.data_type === 'checkbox') {
                                                                        return ({
                                                                            ...doc,
                                                                            default: JSON.parse(doc.default)
                                                                        })
                                                                    }
                                                                    else {
                                                                        return { ...doc }
                                                                    }
                                                                })
                                                            }
                                                            else {
                                                                t["model_child"] = res2.data.model_parts
                                                                t["id"] = res2.data.id
                                                                t["name"] = res2.data.name
                                                            }
                                                        }
                                                        temp1 = [...temp1, t]
                                                        return temp1
                                                    })
                                                    setconcatpartvalue(res2.data.model_parts)
                                                    setconcatparttrigger(prev => !prev)
                                                    setloadinggetmodel(false);
                                                    setcurrentidmodel({ id: "" })
                                                })
                                            }}>Tambah</Button>
                                        </div>
                                    </Form>
                                </div>
                                :
                                null
                        }
                    </>
                    <div className="w-full flex justify-center mt-5">
                        <Button type="dashed" style={{ width: `80%`, height: `4rem` }} onClick={() => {
                            seteditpart(true)
                        }}>+ Tambah Part Model</Button>
                    </div>
                </div>
            </div>
            <Modal
                title={
                    <div className="flex justify-between p-5 mt-5">
                        <h1 className="font-bold text-xl">Form Tambah Model</h1>
                        <div className="flex">
                            <Button type="default" onClick={() => { setmodalcreatemodel(false) }} style={{ marginRight: `1rem` }}>Batal</Button>
                            <Button type='primary' disabled={disabledaddfield2} onClick={instanceForm2.submit} loading={loadingcreatemodel}>Simpan</Button>
                        </div>
                    </div>
                }
                visible={modalcreatemodel}
                footer={null}
                onCancel={() => { setmodalcreatemodel(false) }}
                width={900}
            >
                <div className="shadow-md border p-8 flex flex-col rounded-md mb-8">
                    <Form form={instanceForm2} layout="vertical" onFinish={handleCreateModelinModel}>
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
                                        if (typeof (value) !== 'undefined') {
                                            onClickSelectAsset2(extra.allCheckedNodes[0].node.props.id)
                                        }
                                        else {
                                            onClickSelectAsset2(0)
                                        }
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
                                <Input name="name" onChange={(e) => { setnewdata2({ ...newdata2, name: e.target.value }) }} allowClear />
                            </Form.Item>
                        </div>
                        <Form.Item name="manufacturer_id" label="Manufacturer"
                            rules={[
                                {
                                    required: true,
                                    message: 'Manufacturer wajib diisi',
                                },
                            ]}>
                            <Select placeholder="Pilih Manufacturer" onChange={(value) => { setnewdata2({ ...newdata2, manufacturer_id: value }) }} name="manufacturer_id">
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
                            <Input.TextArea rows={4} name="description" onChange={(e) => { setnewdata2({ ...newdata2, description: e.target.value }) }} />
                        </Form.Item>
                        <div className="flex">
                            <Checkbox style={{ marginRight: `0.5rem` }} onChange={(e) => { setnewdata2({ ...newdata2, required_sn: e.target.checked }) }} checked={newdata2.required_sn} /> Serial Number wajib ada
                        </div>
                    </Form>
                </div>
                <div className=" col-span-1 md:col-span-4 px-5 mb-8 flex flex-col">
                    <div className="mb-5">
                        <h1 className="font-bold text-xl">Spesifikasi Model</h1>
                    </div>
                    {
                        loadingspec2 ?
                            <Spin />
                            :
                            <>
                                {
                                    fielddataa.map((doc, idx) => {
                                        return (
                                            <div key={idx} className="shadow-md border p-8 mx-3 md:mx-8 mb-5 flex flex-col rounded-md">
                                                <div className="font-semibold mb-2">
                                                    {doc.name}
                                                    {fielddataa[idx].required ? <span className="judulField"></span> : null} <span className="text-gray-400 text-sm">({doc.data_type === "single" ? "Single Textbox" : doc.data_type.charAt(0).toUpperCase() + doc.data_type.slice(1)})</span>
                                                </div>
                                                <div className='w-full'>
                                                    {
                                                        doc.data_type.toLowerCase() === "dropdown" &&
                                                        <div className="flex flex-col">
                                                            <h1>Default hanya dipilih 1 (satu) dari beberapa opsi dibawah ini</h1>
                                                            {
                                                                doc.default.opsi.map((docc, idxx) => (
                                                                    <div className="flex mb-3">
                                                                        <div className=" w-7 flex justify-center mr-5">
                                                                            <Checkbox onChange={(e) => {
                                                                                if (e.target.checked === true) {
                                                                                    setfielddataa(prev => {
                                                                                        var temp = prev
                                                                                        temp[idx]["default"]["default"] = idxx
                                                                                        return temp
                                                                                    })
                                                                                }
                                                                            }} />
                                                                        </div>
                                                                        <div className="w-10/12 mr-5">
                                                                            <Input style={{ marginRight: `0.5rem` }} defaultValue={docc} placeholder={`Masukkan opsi ke-${idxx + 1}`} disabled
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    }
                                                    {
                                                        doc.data_type.toLowerCase() === 'number' &&
                                                        <InputNumber style={{ width: `30%` }} placeholder={`Masukkan default ${doc.name}`} onChange={(value) => {
                                                            setfielddataa(prev => {
                                                                const temp = prev
                                                                temp[idx]["default"] = `${value}`
                                                                return temp
                                                            })
                                                            setconcatfieldtrigger2(prev => !prev)
                                                        }}></InputNumber>
                                                    }
                                                    {
                                                        doc.data_type.toLowerCase() === "paragraph" &&
                                                        <Input.TextArea rows={4} placeholder={`Masukkan default ${doc.name}`} onChange={(e) => {
                                                            setfielddataa(prev => {
                                                                const temp = prev
                                                                temp[idx]["default"] = e.target.value
                                                                return temp
                                                            })
                                                            setconcatfieldtrigger2(prev => !prev)
                                                        }}></Input.TextArea>
                                                    }
                                                    {
                                                        doc.data_type.toLowerCase() === "checkbox" &&
                                                        <div className="flex flex-col">
                                                            <h1>Default dapat dipilih lebih dari 1 (satu) opsi dibawah ini</h1>
                                                            {
                                                                doc.default.opsi.map((docc, idxx) => (
                                                                    <div className="flex mb-3">
                                                                        <Checkbox style={{ marginRight: `0.5rem` }} onChange={(e) => {
                                                                            if (e.target.checked === true) {
                                                                                setfielddataa(prev => {
                                                                                    var temp = prev
                                                                                    temp[idx]["default"]["default"].push(idxx)
                                                                                    return temp
                                                                                })
                                                                            }
                                                                        }} /> {docc}
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    }
                                                    {
                                                        (doc.data_type.toLowerCase() === "string") &&
                                                        <Input placeholder={`Masukkan default ${doc.name}`} onChange={(e) => {
                                                            setfielddataa(prev => {
                                                                const temp = prev
                                                                temp[idx]["default"] = e.target.value
                                                                return temp
                                                            })
                                                            setconcatfieldtrigger2(prev => !prev)
                                                        }}></Input>
                                                    }
                                                    {
                                                        (doc.data_type.toLowerCase() === "single") &&
                                                        <Input placeholder={`Masukkan default ${doc.name}`} onChange={(e) => {
                                                            setfielddataa(prev => {
                                                                const temp = prev
                                                                temp[idx]["default"] = e.target.value
                                                                return temp
                                                            })
                                                            setconcatfieldtrigger2(prev => !prev)
                                                        }}></Input>
                                                    }
                                                    {
                                                        doc.data_type.toLowerCase() === "date" &&
                                                        <DatePicker placeholder={`Masukkan default ${doc.name}`} onChange={(value, dateString) => {
                                                            setfielddataa(prev => {
                                                                const temp = prev
                                                                temp[idx]["default"] = dateString
                                                                return temp
                                                            })
                                                            setconcatfieldtrigger2(prev => !prev)
                                                        }}></DatePicker>
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
                                        )
                                    })
                                }
                            </>
                    }
                    {
                        fielddataa2.map((doc, idx) => {
                            return (
                                <>
                                    {
                                        addedfield2[idx] === true ?
                                            <div key={idx} className="shadow-md border p-8 mx-3 md:mx-8 mb-5 flex flex-col rounded-md cursor-pointer" onClick={() => {
                                                const temp = [...addedfield2]
                                                temp[idx] = false
                                                for (var i = 0; i < temp.length; i++) {
                                                    if (i !== idx) {
                                                        temp[i] = true
                                                    }
                                                }
                                                setaddedfield2(temp)
                                                setcurrentfield2(fielddataa2[idx])
                                                if (doc.data_type === 'dropdown' || doc.data_type === 'checkbox') {
                                                    setcurrentdropdownn2(doc.default.opsi)
                                                    setcurrentcheckeddropdownn2(doc.default.default)
                                                }
                                                if (fielddataa2[idx].data_type !== 'dropdown' || fielddataa2[idx].data_type !== 'checkbox') {
                                                    if (fielddataa2[idx].name !== "" && fielddataa2[idx].data_type !== "") {
                                                        setdisabledtambah2(false)
                                                    }
                                                    else {
                                                        setdisabledtambah2(true)
                                                    }
                                                }
                                                else {
                                                    if (doc.default.opsi.some(docopsi => docopsi === "")) {
                                                        setdisabledtambah2(true)
                                                    }
                                                    else {
                                                        setdisabledtambah2(false)
                                                    }
                                                }
                                                setdisabledaddfield2(true)
                                            }}>
                                                <div className="font-semibold mb-2">
                                                    {doc.name}
                                                    {fielddataa2[idx].required ? <span className="judulField"></span> : null} <span className="text-gray-400 text-sm">({doc.data_type === "single" ? "Single Textbox" : doc.data_type.charAt(0).toUpperCase() + doc.data_type.slice(1)})</span>
                                                </div>
                                                <div className='rounded border w-full pl-3 py-2 flex items-center my-auto'>
                                                    {
                                                        doc.data_type === 'checkbox' || doc.data_type === 'dropdown' || doc.data_type === 'paragraph' || doc.data_type === 'date' ?
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
                                                                {
                                                                    doc.data_type === 'date' &&
                                                                    <div className="flex justify-between w-full px-3">
                                                                        <p className='mb-0'>{doc.default}</p>
                                                                        <div>
                                                                            <CalendarOutlined></CalendarOutlined>
                                                                        </div>
                                                                    </div>
                                                                }
                                                                {
                                                                    doc.data_type === 'paragraph' &&
                                                                    <div className="flex h-20">{doc.default}</div>

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
                                                <Form layout="vertical" initialValues={currentfield2}>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 space-x-2">
                                                        <Form.Item name="name" label="Nama Field" rules={[
                                                            {
                                                                required: true,
                                                                message: 'Nama Field wajib diisi',
                                                            },
                                                        ]}>
                                                            <Input required name="name" onChange={(e) => {
                                                                setcurrentfield2({ ...currentfield2, name: e.target.value })
                                                                if (e.target.value === "") {
                                                                    setdisabledtambah2(true)
                                                                }
                                                                else if (e.target.value !== "" && currentfield2.data_type !== "") {
                                                                    setdisabledtambah2(false)
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
                                                                setcurrentfield2({ ...currentfield2, data_type: value })
                                                                if (value === 'dropdown' || value === 'checkbox') {
                                                                    setdisabledtambah2(true)
                                                                }
                                                                else {
                                                                    setdisabledtambah2(false)
                                                                }
                                                                if (value === 'dropdown') {
                                                                    setcurrentcheckeddropdownn2("")
                                                                    setcurrentdropdownn2(["", ""])
                                                                }
                                                                if (value === 'checkbox') {
                                                                    setcurrentcheckeddropdownn2([])
                                                                    setcurrentdropdownn2(["", ""])
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
                                                    <Form.Item name="default" label="Default">
                                                        {
                                                            currentfield2.data_type.toLowerCase() === "dropdown" ?
                                                                <div className="flex flex-col">
                                                                    <h1>Default hanya dipilih 1 (satu) dari beberapa opsi dibawah ini</h1>
                                                                    {
                                                                        currentdropdownn2.map((doc, idxx) => (
                                                                            <div className="flex mb-3">
                                                                                <div className="w-7 flex items-center">
                                                                                    <Checkbox checked={currentcheckeddropdownn2 === idxx ? true : false} onChange={(e) => {
                                                                                        if (e.target.checked === true) {
                                                                                            setcurrentcheckeddropdownn2(idxx)
                                                                                        }
                                                                                    }}></Checkbox>
                                                                                </div>
                                                                                <div className="w-10/12 mr-5">
                                                                                    <Input style={{ marginRight: `0.5rem` }} defaultValue={doc} placeholder={`Masukkan opsi ke-${idxx + 1}`} onChange={(e) => {
                                                                                        setcurrentdropdownn2(prev => {
                                                                                            const temp = prev
                                                                                            temp[idxx] = e.target.value
                                                                                            return temp
                                                                                        })
                                                                                        if ((e.target.value !== "") && (idxx === currentdropdownn2.length - 1)) {
                                                                                            setdisabledtambah2(false)
                                                                                        }
                                                                                    }} />
                                                                                </div>
                                                                                <div className="w-1/12 flex justify-around" onClick={() => {
                                                                                    setcurrentdropdownn2(prev => prev.filter((_, idxxx) => idxxx !== idxx))
                                                                                }}>
                                                                                    <Button type="danger">-</Button>
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                    <div className="mx-auto my-3">
                                                                        <Button onClick={() => { setcurrentdropdownn2([...currentdropdownn2, ""]); setdisabledtambah2(true) }}>+ Tambah Opsi</Button>
                                                                    </div>
                                                                </div>
                                                                :
                                                                null
                                                        }
                                                        {
                                                            currentfield2.data_type.toLowerCase() === "checkbox" ?
                                                                <div className="flex flex-col">
                                                                    <h1>Default dapat dipilih lebih dari 1 (satu) opsi dibawah ini</h1>
                                                                    {
                                                                        currentdropdownn2.map((doc, idxx) => {
                                                                            const idxchecked = currentcheckeddropdownn2.includes(idxx)
                                                                            return (
                                                                                <div className="flex mb-3">
                                                                                    <div className="w-7 flex items-center">
                                                                                        <Checkbox defaultChecked={idxchecked} onChange={(e) => {
                                                                                            if (e.target.checked === true) {
                                                                                                setcurrentcheckeddropdownn2(prev => {
                                                                                                    var temp = prev
                                                                                                    temp.push(idxx)
                                                                                                    return temp
                                                                                                })
                                                                                            }
                                                                                            else {
                                                                                                setcurrentcheckeddropdownn2(prev => {
                                                                                                    var temp = prev
                                                                                                    const index = temp.indexOf(idxx)
                                                                                                    temp.splice(index, 1)
                                                                                                    return temp
                                                                                                })
                                                                                            }
                                                                                        }}></Checkbox>
                                                                                    </div>
                                                                                    <div className="w-10/12 mr-5">
                                                                                        <Input style={{ marginRight: `0.5rem` }} defaultValue={doc} placeholder={`Masukkan opsi ke-${idxx + 1}`} onChange={(e) => {
                                                                                            setcurrentdropdownn2(prev => {
                                                                                                const temp = prev
                                                                                                temp[idxx] = e.target.value
                                                                                                return temp
                                                                                            })
                                                                                            if ((e.target.value !== "") && (idxx === currentdropdownn2.length - 1)) {
                                                                                                setdisabledtambah2(false)
                                                                                            }
                                                                                        }} />
                                                                                    </div>
                                                                                    <div className="w-1/12 flex justify-around" onClick={() => {
                                                                                        setcurrentdropdownn2(prev => prev.filter((_, idxxx) => idxxx !== idxx))
                                                                                    }}>
                                                                                        <Button type="danger">-</Button>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                    <div className="mx-auto my-3">
                                                                        <Button onClick={() => { setcurrentdropdownn2([...currentdropdownn2, ""]); setdisabledtambah2(true) }}>+ Tambah Opsi</Button>
                                                                    </div>
                                                                </div>
                                                                :
                                                                null
                                                        }
                                                        {
                                                            currentfield2.data_type.toLowerCase() === 'number' &&
                                                            <InputNumber style={{ width: `30%` }} defaultValue={fielddataa2[idx].default} placeholder={`Masukkan default ${currentfield2.name}`} onChange={(value) => {
                                                                setcurrentfield2({ ...currentfield2, default: `${value}` })
                                                            }}></InputNumber>
                                                        }
                                                        {
                                                            currentfield2.data_type.toLowerCase() === "paragraph" &&
                                                            <Input.TextArea rows={4} placeholder={`Masukkan default ${currentfield2.name}`} defaultValue={fielddataa2[idx].default} onChange={(e) => {
                                                                setcurrentfield2({ ...currentfield2, default: e.target.value })
                                                            }}></Input.TextArea>
                                                        }
                                                        {
                                                            (currentfield2.data_type.toLowerCase() === "string") &&
                                                            <Input placeholder={`Masukkan default ${currentfield2.name}`} defaultValue={fielddataa2[idx].default} onChange={(e) => {
                                                                setcurrentfield2({ ...currentfield2, default: e.target.value })
                                                            }}></Input>
                                                        }
                                                        {
                                                            (currentfield2.data_type.toLowerCase() === "single") &&
                                                            <Input placeholder={`Masukkan default ${currentfield2.name}`} defaultValue={fielddataa2[idx].default} onChange={(e) => {
                                                                setcurrentfield2({ ...currentfield2, default: e.target.value })
                                                            }}></Input>
                                                        }
                                                        {
                                                            currentfield2.data_type.toLowerCase() === "date" &&
                                                            <DatePicker style={{ width: `30%` }} placeholder={`Masukkan default ${currentfield2.name}`} onChange={(value, dateString) => {
                                                                setcurrentfield2({ ...currentfield2, default: dateString })
                                                            }}></DatePicker>
                                                        }
                                                    </Form.Item>
                                                    <hr />
                                                    <div className="flex mt-4 justify-end">
                                                        <Popconfirm placement="bottom" title={`Apakah anda yakin ingin menghapus field ${doc.name === "" ? "ini" : doc.name}?`} okText="Ya" cancelText="Tidak" onConfirm={() => {
                                                            setfielddataa2(prev => prev.filter((_, idxx) => idxx !== idx))
                                                            setnewdata2(prev => {
                                                                var temp = prev
                                                                temp.model_columns = temp.model_columns.filter((_, idxx) => idxx !== fielddataa.length + idx)
                                                                return temp
                                                            })
                                                            setaddedfield2(prev => {
                                                                prev.splice(idx, 1)
                                                                return prev
                                                            })
                                                            setdisabledaddfield2(false)
                                                        }
                                                        }>
                                                            <div className="flex items-center mr-4 hover:text-red-500 cursor-pointer">
                                                                <DeleteOutlined style={{ fontSize: `1.25rem` }} ></DeleteOutlined>
                                                            </div>
                                                        </Popconfirm>
                                                        <div className=" flex items-center mr-4">
                                                            <Checkbox checked={currentfield2.required} style={{ marginRight: `0.5rem` }} onChange={(e) => {
                                                                setcurrentfield2({ ...currentfield2, required: e.target.checked })
                                                            }} /> Required
                                                        </div>
                                                        <Button type="primary" disabled={disabledtambah2} onClick={() => {
                                                            if (currentfield2.data_type === 'dropdown' || currentfield2.data_type === 'checkbox') {
                                                                setidxdropdowntrigger2(idx)
                                                                setvaluedropdowntrigger2(prev => !prev)
                                                            }
                                                            const temp = fielddataa2
                                                            temp[idx] = currentfield2
                                                            setfielddataa2(temp)
                                                            setaddedfieldidx2(idx)
                                                            setaddedfieldtrigger2(prev => !prev)
                                                            setconcatfieldtrigger2(prev => !prev)
                                                            setdisabledaddfield2(false)
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
                        <Button type="dashed" disabled={disabledaddfield2} style={{ width: `80%`, height: `4rem` }} onClick={onClickAddField2}>+ Tambah Spesifikasi Model</Button>
                    </div>
                </div>
            </Modal>
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

export default ModelsUpdate2
