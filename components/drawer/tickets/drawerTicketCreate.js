import React, { useState, useEffect } from 'react'
import DrawerCore from '../drawerCore'
import { InputRequired, SelectRequired, TextAreaNotRequired } from '../../input'
import { Spin, TreeSelect, Select, DatePicker, notification, Input } from 'antd'
import { AssetIconSvg, CalendartimeIconSvg, CircleXIconSvg, CloudUploadIconSvg, TrashIconSvg, UserIconSvg } from '../../icon'
import { Label, H1, H2 } from '../../typography'
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons'
import ButtonSys from '../../button'
import moment from 'moment'

function modifData1(dataa) {
    for (var i = 0; i < dataa.length; i++) {
        dataa[i]['key'] = dataa[i].id
        dataa[i]['value'] = dataa[i].id
        dataa[i]['title'] = dataa[i].mig_id
        if (dataa[i].inventory_parts) {
            dataa[i]['children'] = dataa[i].inventory_parts
            delete dataa[i].inventory_parts
            modifData1(dataa[i].children)
        }
    }
    return dataa
}
function modifData2(dataa) {
    for (var i = 0; i < dataa.length; i++) {
        dataa[i]['key'] = dataa[i].id
        dataa[i]['value'] = dataa[i].id
        dataa[i]['title'] = `${dataa[i].mig_id} - ${dataa[i].model_inventory?.name} - ${dataa[i].model_inventory?.asset?.name}`
        if (dataa[i].inventory_parts) {
            dataa[i]['children'] = dataa[i].inventory_parts
            delete dataa[i].inventory_parts
            modifData2(dataa[i].children)
        }
    }
    return dataa
}

const DrawerTicketCreate = ({ title, visible, onvisible, onClose, buttonOkText, disabled, initProps, refreshtickets, setrefreshtickets, dataprofile }) => {
    //useState
    const [datapayload, setdatapayload] = useState({
        type_id: null,
        ticket_task_type_id: null,
        product_id: "",
        pic_name: "",
        pic_contact: "",
        location_id: dataprofile.data.company.id,
        problem: "",
        incident_time: new Date(),
        files: [],
        description: ""
    })
    const [loadingsave, setloadingsave] = useState(false)
    //data for each field
    const [datatypetickets, setdatatypetickets] = useState([])
    const [datatasktickets, setdatatasktickets] = useState([])
    const [dataloctickets, setdataloctickets] = useState([])
    const [fecthingtickets, setfecthingtickets] = useState(false)
    const [warningphonenumber, setwarningphonenumber] = useState(false)
    const [warningproductid, setwarningproductid] = useState(false)
    //files
    const [loadingfile, setloadingfile] = useState(false)
    //disabled save button
    const [disabledcreate, setdisabledcreate] = useState(true)
    const [disabledtrigger, setdisabledtrigger] = useState(-1)


    //handler
    const onChangeGambar = async (e) => {
        setloadingfile(true)
        const foto = e.target.files
        const formdata = new FormData()
        formdata.append('file', foto[0])
        formdata.append('upload_preset', 'migsys')
        const fetching = await fetch(`https://api.Cloudinary.com/v1_1/aqlpeduli/image/upload`, {
            method: 'POST',
            body: formdata
        })
        const datajson = await fetching.json()
        var tempfile = [...datapayload.files]
        tempfile.push(datajson.secure_url)
        setdatapayload({ ...datapayload, files: tempfile })
        setloadingfile(false)
    }
    const handleAddTicket = () => {
        if (/(^\d+$)/.test(datapayload.pic_contact) === false || /(^\d+$)/.test(datapayload.product_id) === false) {
            if (datapayload.pic_contact === "") {
                setloadingsave(true)
                setdisabledcreate(true)
                fetch(`https://boiling-thicket-46501.herokuapp.com/addTicket`, {
                    method: 'POST',
                    headers: {
                        'Authorization': JSON.parse(initProps),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datapayload)
                })
                    .then((res) => res.json())
                    .then(res2 => {
                        setrefreshtickets(prev => prev + 1)
                        setloadingsave(false)
                        setdisabledcreate(false)
                        if (res2.success) {
                            setdatapayload({
                                type_id: null,
                                ticket_task_type_id: null,
                                product_id: "",
                                pic_name: "",
                                pic_contact: "",
                                location_id: dataprofile.data.company.id,
                                problem: "",
                                incident_time: new Date(),
                                files: [],
                                description: ""
                            })
                            onvisible(false)
                            notification['success']({
                                message: res2.message,
                                duration: 3
                            })
                        }
                        else {
                            notification['error']({
                                message: res2.message,
                                duration: 3
                            })
                        }
                    })
            }
            else {
                new RegExp(/(^\d+$)/).test(datapayload.pic_contact) === false ? setwarningphonenumber(true) : setwarningphonenumber(false)
                new RegExp(/(^\d+$)/).test(datapayload.product_id) === false ? setwarningproductid(true) : setwarningproductid(false)
                setdisabledcreate(true)
            }
        }
        else {
            setloadingsave(true)
            setdisabledcreate(true)
            fetch(`https://boiling-thicket-46501.herokuapp.com/addTicket`, {
                method: 'POST',
                headers: {
                    'Authorization': JSON.parse(initProps),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datapayload)
            })
                .then((res) => res.json())
                .then(res2 => {
                    setrefreshtickets(prev => prev + 1)
                    setloadingsave(false)
                    setdisabledcreate(false)
                    if (res2.success) {
                        setdatapayload({
                            type_id: null,
                            ticket_task_type_id: null,
                            product_id: "",
                            pic_name: "",
                            pic_contact: "",
                            location_id: dataprofile.data.company.id,
                            problem: "",
                            incident_time: new Date(),
                            files: [],
                            description: ""
                        })
                        onvisible(false)
                        notification['success']({
                            message: res2.message,
                            duration: 3
                        })
                    }
                    else {
                        notification['error']({
                            message: res2.message,
                            duration: 3
                        })
                    }
                })
        }
    }

    //useEffect
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/${dataprofile.data.role === 1 ? `getTicketRelation` : `getClientTicketRelation`}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setdatatypetickets(res2.data.ticket_types)
                setdatatasktickets(res2.data.ticket_task_types)
                setdataloctickets([dataprofile.data.role === 1 ? res2.data.companies : res2.data.companies.data])
            })
    }, [])
    useEffect(() => {
        if (datapayload.type_id !== null && datapayload.name !== "" && datapayload.ticket_task_type_id !== null && datapayload.product_id !== "" && datapayload.incident_time !== null && datapayload.location_id !== null) {
            setdisabledcreate(false)
        }
        else {
            setdisabledcreate(true)
        }
    }, [disabledtrigger])
    return (
        <DrawerCore
            title={title}
            visible={visible}
            onClose={() => {
                setdatapayload({
                    type_id: null,
                    ticket_task_type_id: null,
                    product_id: "",
                    pic_name: "",
                    pic_contact: "",
                    location_id: dataprofile.data.company.id,
                    problem: "",
                    incident_time: new Date(),
                    files: [],
                    description: ""
                })
                onvisible(false)
            }}
            buttonOkText={buttonOkText}
            onClick={handleAddTicket}
            disabled={disabledcreate}
        >
            {
                loadingsave ?
                    <>
                        <Spin />
                    </>
                    :
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <p className="mb-0 text-red-500 text-xs italic">*Informasi ini harus diisi</p>
                        </div>
                        <div className="flex flex-col mb-6">
                            <div className="flex mb-2">
                                <Label>Tipe Tiket</Label>
                                <span className="tickettypes"></span>
                                <style jsx>
                                    {`
                                .tickettypes::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                                </style>
                            </div>
                            <div className=' mb-2 flex'>
                                <Select
                                    style={{ width: `100%` }}
                                    onChange={(value, option) => {
                                        setdatapayload({
                                            ...datapayload,
                                            type_id: value
                                        });
                                        setdisabledtrigger(prev => prev + 1)
                                    }}
                                    value={datapayload.type_id}
                                >
                                    {
                                        datatypetickets.map((doc, idx) => (
                                            <Select.Option value={doc.id}>{doc.name}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </div>
                        </div>
                        <div className="flex flex-col mb-6">
                            <div className="flex mb-2">
                                <Label>Jenis Aset</Label>
                                <span className="tickettask"></span>
                                <style jsx>
                                    {`
                                .tickettask::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                                </style>
                            </div>
                            <div className=' mb-2 flex'>
                                <Select
                                    style={{ width: `100%` }}
                                    onChange={(value, option) => {
                                        setdatapayload({
                                            ...datapayload,
                                            ticket_task_type_id: value
                                        });
                                        setdisabledtrigger(prev => prev + 1)
                                    }}
                                    value={datapayload.ticket_task_type_id}
                                >
                                    {
                                        datatasktickets.map((doc, idx) => (
                                            <Select.Option value={doc.id}>{doc.name}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </div>
                        </div>
                        <div className=' mb-6 flex flex-col'>
                            <div className="flex mb-2">
                                <Label>ID Produk</Label>
                                <span className="idproduk"></span>
                                <style jsx>
                                    {`
                                .idproduk::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                                </style>
                            </div>
                            <Input value={datapayload.product_id} onChange={(e) => {
                                setdatapayload({ ...datapayload, product_id: e.target.value })
                                setdisabledtrigger(prev => prev + 1)
                            }}></Input>
                            {warningproductid && <p className=' text-red-500 text-sm mb-0'>ID Produk harus angka</p>}
                        </div>
                        <div className="flex flex-col mb-6">
                            <div className="flex mb-2">
                                <Label>Waktu Kejadian</Label>
                                <span className="timeincident"></span>
                                <style jsx>
                                    {`
                                .timeincident::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                                </style>
                            </div>
                            <div className=' mb-2 flex'>
                                <DatePicker style={{ width: `100%` }} showTime allowClear className="datepickerStatus" value={datapayload.incident_time === null ? null : moment(datapayload.incident_time)} onChange={(date, datestring) => {
                                    setdatapayload({ ...datapayload, incident_time: datestring === "" ? null : datestring })
                                    setdisabledtrigger(prev => prev + 1)
                                }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col mb-6">
                            <div className="flex mb-2">
                                <Label>Lokasi Kejadian</Label>
                                <span className="locincident"></span>
                                <style jsx>
                                    {`
                                .locincident::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                                </style>
                            </div>
                            <div className=' mb-2 flex'>
                                <TreeSelect
                                    style={{ width: `100%` }}
                                    allowClear
                                    placeholder="Semua Lokasi"
                                    showSearch
                                    suffixIcon={<SearchOutlined />}
                                    showArrow
                                    name={`locations_id`}
                                    onChange={(value) => { typeof (value) === 'undefined' ? setdatapayload({ ...datapayload, location_id: null }) : setdatapayload({ ...datapayload, location_id: value }); setdisabledtrigger(prev => prev + 1) }}
                                    treeData={dataloctickets}
                                    treeDefaultExpandAll
                                    value={datapayload.location_id}
                                ></TreeSelect >
                            </div>
                        </div>
                        <div className=' mb-6 flex flex-col'>
                            <div className="flex mb-2">
                                <Label>PIC</Label>
                            </div>
                            <Input value={datapayload.pic_name} onChange={(e) => {
                                setdatapayload({ ...datapayload, pic_name: e.target.value })
                            }}></Input>
                        </div>
                        <div className=' mb-6 flex flex-col'>
                            <div className="flex mb-2">
                                <Label>Kontak PIC</Label>
                            </div>
                            <Input value={datapayload.pic_contact} onChange={(e) => {
                                setdatapayload({ ...datapayload, pic_contact: e.target.value })
                                setdisabledtrigger(prev => prev + 1)
                            }}></Input>
                            {warningphonenumber && <p className=' text-red-500 text-sm mb-0'>Kontak PIC harus angka</p>}
                        </div>
                        <div className=' mb-6 flex flex-col'>
                            <div className="flex mb-2">
                                <Label>Deskripsi Masalah</Label>
                            </div>
                            <Input.TextArea rows={5} value={datapayload.description} onChange={(e) => {
                                setdatapayload({ ...datapayload, description: e.target.value })
                            }}></Input.TextArea>
                        </div>
                        <div className=' mb-6 flex flex-col'>
                            <div className="flex mb-2">
                                <Label>Bukti Kejadian</Label>
                            </div>
                            <div className=' flex justify-between items-center mb-2'>
                                <div><Label>Unggah JPG/MP4 (Maks. 5 MB)</Label></div>
                                <div>
                                    <ButtonSys type={`primaryInput`} onChangeGambar={onChangeGambar}>
                                        {loadingfile ? <LoadingOutlined style={{ marginRight: `0.5rem` }} /> : <div className='mr-1'><CloudUploadIconSvg size={15} color={`#ffffff`} /></div>}
                                        Unggah File
                                    </ButtonSys>
                                </div>
                            </div>
                            <div className='grid grid-cols-3'>
                                {
                                    datapayload.files.map((doc, idx) => (
                                        <div className=' col-span-1 mx-1 flex flex-col items-center mb-2'>
                                            <img src={doc} className=' object-contain mb-1 h-28 w-full' alt="" />
                                            <div className=' cursor-pointer' onClick={() => {
                                                var tempfiles = [...datapayload.files]
                                                tempfiles.splice(idx, 1)
                                                setdatapayload(prev => ({
                                                    ...prev,
                                                    files: tempfiles
                                                }))
                                            }}><TrashIconSvg size={15} color={`#BF4A40`} /></div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
            }
        </DrawerCore >
    )
}

export default DrawerTicketCreate
