import React, { useState, useEffect } from 'react'
import DrawerCore from '../drawerCore'
import { Spin, Select, notification, TreeSelect } from 'antd'
import { Label } from '../../typography'
import { SearchOutlined } from '@ant-design/icons'

function modifData(dataa) {
    for (var i = 0; i < dataa.length; i++) {
        dataa[i]['key'] = dataa[i].id
        dataa[i]['value'] = dataa[i].id
        if (dataa[i].children) {
            modifData(dataa[i].children)
        }
    }
    return dataa
}

const DrawerTicketConnectItem = ({ title, visible, onvisible, onClose, buttonOkText, disabled, initProps, refresh, setrefresh, datapayload, setdatapayload, selectedassettype, setselectedassettype, ticketid }) => {
    //useState
    const [loadingsave, setloadingsave] = useState(false)
    const [loadinggetasset, setloadinggetasset] = useState(false)
    const [dataassettype, setdataassettype] = useState([])
    const [dataasset, setdataasset] = useState([])
    const [fetchingdataasset, setfetchingdataasset] = useState(false)
    const [disabledcreate, setdisabledcreate] = useState(true)
    const [disabledtrigger, setdisabledtrigger] = useState(-1)

    //handler
    const handleSetAsset = () => {
        setloadingsave(true)
        setdisabledcreate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/setItemTicket`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datapayload)
        })
            .then((res) => res.json())
            .then(res2 => {
                setloadingsave(false)
                setdisabledcreate(false)
                if (res2.success) {
                    setrefresh(prev => prev + 1)
                    onvisible(false)
                    setdatapayload({
                        id: Number(ticketid),
                        inventory_id: null
                    })
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
        fetch(`https://boiling-thicket-46501.herokuapp.com/getAssets`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                var assettypemap = modifData(res2.data)
                setdataassettype(assettypemap)
            })
    }, [])
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getFilterInventories`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setdataasset(res2.data)
            })
    }, [])
    useEffect(() => {
        if (datapayload.inventory_id !== null) {
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
                    id: Number(ticketid),
                    inventory_id: null
                })
                onvisible(false)
            }}
            buttonOkText={buttonOkText}
            onClick={handleSetAsset}
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
                                <Label>Tipe Aset</Label>
                                <span className="assettypes"></span>
                                <style jsx>
                                    {`
                                .assettypes::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                                </style>
                            </div>
                            <div className=' mb-2 flex'>
                                <TreeSelect
                                    style={{ width: `100%` }}
                                    showArrow
                                    name={`asset_type`}
                                    onChange={(value, label, extra) => {
                                        setselectedassettype(extra.allCheckedNodes[0].node.props.id)
                                        setloadinggetasset(true)
                                        fetch(`https://boiling-thicket-46501.herokuapp.com/getFilterInventories?asset_id=${extra.allCheckedNodes[0].node.props.id}`, {
                                            method: `GET`,
                                            headers: {
                                                'Authorization': JSON.parse(initProps),
                                            },
                                        })
                                            .then(res => res.json())
                                            .then(res2 => {
                                                console.log(res2)
                                                setdataasset(res2.data)
                                                setloadinggetasset(false)
                                            })
                                    }}
                                    treeData={dataassettype}
                                    treeDefaultExpandAll
                                    value={selectedassettype}
                                ></TreeSelect >
                            </div>
                        </div>
                        <div className="flex flex-col mb-6">
                            <div className=' mb-2 flex'>
                                <Select
                                    style={{ width: `100%` }}
                                    placeholder="Nama aset..."
                                    suffixIcon={<SearchOutlined />}
                                    showArrow
                                    onChange={(value, option) => {
                                        setdatapayload({
                                            ...datapayload,
                                            inventory_id: value
                                        });
                                        setdisabledtrigger(prev => prev + 1)
                                    }}
                                    loading={loadinggetasset}
                                    showSearch
                                    optionFilterProp="children"
                                    notFoundContent={fetchingdataasset ? <Spin size="small" /> : null}
                                    onSearch={(value) => {
                                        setfetchingdataasset(true)
                                        fetch(`https://boiling-thicket-46501.herokuapp.com/getFilterInventories?asset_id=${selectedassettype}&keyword=${value}`, {
                                            method: `GET`,
                                            headers: {
                                                'Authorization': JSON.parse(initProps),
                                            },
                                        })
                                            .then(res => res.json())
                                            .then(res2 => {
                                                setdataasset(res2.data)
                                                setfetchingdataasset(false)
                                            })
                                    }}
                                    value={datapayload.inventory_id}
                                >
                                    {
                                        dataasset.map((doc, idx) => (
                                            <Select.Option key={idx} value={doc.id}>{doc.mig_id} - {doc.model_name} - {doc.asset_name}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </div>
                        </div>
                    </div>
            }
        </DrawerCore >
    )
}

export default DrawerTicketConnectItem
