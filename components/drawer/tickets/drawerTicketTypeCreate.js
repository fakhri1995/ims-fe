import React, { useState, useEffect } from 'react'
import DrawerCore from '../drawerCore'
import { Spin, Select, notification, Input } from 'antd'
import { Label } from '../../typography'
import { SearchOutlined } from '@ant-design/icons'

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

const DrawerTicketTypeCreate = ({ title, visible, onvisible, onClose, buttonOkText, disabled, initProps, refreshcreatetickettypescreate, setrefreshcreatetickettypescreate }) => {
    //useState
    const [datapayload, setdatapayload] = useState({
        name: "",
        description: "",
        ticket_type_id: null,
        task_type_id: null
    })
    const [loadingsave, setloadingsave] = useState(false)
    const [datatasktypes, setdatatasktypes] = useState([])
    const [datatickettypes, setdatatickettypes] = useState([])
    const [fecthingtasktypes, setfecthingtasktypes] = useState(false)
    const [disabledcreate, setdisabledcreate] = useState(true)
    const [disabledtrigger, setdisabledtrigger] = useState(-1)


    //handler
    const handleAddTicketType = () => {
        setloadingsave(true)
        setdisabledcreate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addTicketTaskType`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datapayload)
        })
            .then((res) => res.json())
            .then(res2 => {
                setrefreshcreatetickettypescreate(prev => prev + 1)
                setloadingsave(false)
                setdisabledcreate(false)
                if (res2.success) {
                    setdatapayload({
                        name: "",
                        description: "",
                        ticket_type_id: null,
                        task_type_id: null
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

    //useEffect
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getFilterTaskTypes`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setdatatasktypes(res2.data)
            })
    }, [])
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getTicketRelation`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setdatatickettypes(res2.data.ticket_types)
            })
    }, [])
    useEffect(() => {
        if (datapayload.ticket_type_id !== null && datapayload.name !== "" && datapayload.task_type_id !== null) {
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
                    name: "",
                    description: "",
                    ticket_type_id: null,
                    task_type_id: null
                })
                onvisible(false)
            }}
            buttonOkText={buttonOkText}
            onClick={handleAddTicketType}
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
                                            ticket_type_id: value
                                        });
                                        setdisabledtrigger(prev => prev + 1)
                                    }}
                                    value={datapayload.ticket_type_id}
                                >
                                    {
                                        datatickettypes.map((doc, idx) => (
                                            <Select.Option value={doc.id}>{doc.name}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </div>
                        </div>
                        <div className=' mb-6 flex flex-col'>
                            <div className="flex mb-2">
                                <Label>Nama</Label>
                                <span className="spartsout"></span>
                                <style jsx>
                                    {`
                                .spartsout::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                                </style>
                            </div>
                            <Input value={datapayload.name} onChange={(e) => {
                                setdatapayload({ ...datapayload, name: e.target.value }); setdisabledtrigger(prev => prev + 1)
                            }}></Input>
                        </div>
                        <div className="flex flex-col mb-6">
                            <div className="flex mb-2">
                                <Label>Tipe Task</Label>
                                <span className="tasktypes"></span>
                                <style jsx>
                                    {`
                                .tasktypes::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                                </style>
                            </div>
                            <div className=' mb-2 flex'>
                                <Select
                                    style={{ width: `100%` }}
                                    suffixIcon={<SearchOutlined />}
                                    showArrow
                                    placeholder="Nama.."
                                    onChange={(value, option) => {
                                        setdatapayload({
                                            ...datapayload,
                                            task_type_id: value
                                        });
                                        setdisabledtrigger(prev => prev + 1)
                                    }}
                                    showSearch
                                    optionFilterProp="children"
                                    notFoundContent={fecthingtasktypes ? <Spin size="small" /> : null}
                                    onSearch={(value) => {
                                        setfecthingtasktypes(true)
                                        fetch(`https://boiling-thicket-46501.herokuapp.com/getFilterTaskTypes?name=${value}`, {
                                            method: `GET`,
                                            headers: {
                                                'Authorization': JSON.parse(initProps),
                                            },
                                        })
                                            .then(res => res.json())
                                            .then(res2 => {
                                                setdatatasktypes(res2.data)
                                                setfecthingtasktypes(false)
                                            })
                                    }}
                                    filterOption={(input, opt) => (
                                        opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    )}
                                    value={datapayload.task_type_id}
                                >
                                    {
                                        datatasktypes.map((doc, idx) => (
                                            <Select.Option key={idx} value={doc.id}>{doc.name}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </div>
                        </div>
                        <div className=' mb-6 flex flex-col'>
                            <div className="flex mb-2">
                                <Label>Deskripsi</Label>
                            </div>
                            <Input.TextArea rows={5} value={datapayload.description} onChange={(e) => {
                                setdatapayload({ ...datapayload, description: e.target.value })
                            }}></Input.TextArea>
                        </div>
                    </div>
            }
        </DrawerCore >
    )
}

export default DrawerTicketTypeCreate
