import React, { useState, useEffect } from 'react'
import DrawerCore from '../drawerCore'
import { Radio, notification, DatePicker, Spin } from 'antd'
import moment from 'moment'
import { Label, H2 } from '../../typography'
import { SearchOutlined } from '@ant-design/icons'
import { UserIconSvg } from '../../icon'

const DrawerTicketDeadline = ({ title, visible, onvisible, onClose, buttonOkText, disabled, initProps, refresh, setrefresh, setrefreshclosed, datapayload, setdatapayload, showdatetime, setshowdatetime, datevalue, setdatevalue, ticketid }) => {

    //useState
    const [loadingsave, setloadingsave] = useState(false)
    const [disabledcreate, setdisabledcreate] = useState(true)
    const [disabledtrigger, setdisabledtrigger] = useState(-1)

    //handler
    const handleSetDeadline = () => {
        setloadingsave(true)
        setdisabledcreate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/setDeadline`, {
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
                    setdatapayload({
                        id: Number(ticketid),
                        deadline: null
                    })
                    setrefresh(prev => prev + 1)
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
        if (datapayload.assignable_id !== null) {
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
                setrefreshclosed(prev => prev + 1)
                setdatapayload({
                    id: Number(ticketid),
                    deadline: null
                })
                onvisible(false)
            }}
            buttonOkText={buttonOkText}
            onClick={handleSetDeadline}
            disabled={disabledcreate}
        >
            {
                loadingsave ?
                    <>
                        <Spin />
                    </>
                    :
                    <div className=' flex flex-col px-3'>
                        <div className='mb-2'>
                            <Radio.Group
                                onChange={(e) => {
                                    var choisedate = ''
                                    if (e.target.value === 3) {
                                        choisedate = moment(datapayload.created_at).add(3, 'h').locale('id').format()
                                        setdatevalue(3)
                                        setshowdatetime(false)
                                    }
                                    else if (e.target.value === 12) {
                                        choisedate = moment(datapayload.created_at).add(30, 'h').locale('id').format()
                                        setdatevalue(12)
                                        setshowdatetime(false)
                                    }
                                    else if (e.target.value === 30) {
                                        choisedate = moment(datapayload.created_at).add(1, 'h').locale('id').format()
                                        setdatevalue(30)
                                        setshowdatetime(false)
                                    }
                                    else if (e.target.value === 72) {
                                        choisedate = moment(datapayload.created_at).add(3, 'd').locale('id').format()
                                        setdatevalue(72)
                                        setshowdatetime(false)
                                    }
                                    else if (e.target.value === -10) {
                                        setdatevalue(-10)
                                        setshowdatetime(true)
                                    }
                                    setdatapayload({ ...datapayload, deadline: e.target.value === -10 ? null : choisedate })
                                    setdisabledtrigger(prev => prev + 1)
                                }}
                                value={datevalue}
                            >
                                <div className="flex flex-col">
                                    <div className='mb-3'>
                                        <Radio value={3}>3 Jam</Radio>
                                    </div>
                                    <div className='mb-3'>
                                        <Radio value={12}>12 Jam</Radio>
                                    </div>
                                    <div className='mb-3'>
                                        <Radio value={30}>30 Jam</Radio>
                                    </div>
                                    <div className='mb-3'>
                                        <Radio value={72}>3 Hari</Radio>
                                    </div>
                                    <div className='mb-3'>
                                        <Radio value={-10}>Pilih Tanggal</Radio>
                                    </div>
                                </div>
                            </Radio.Group>
                        </div>
                        <div className='mb-2 flex flex-col'>
                            {
                                showdatetime ?
                                    <DatePicker value={datapayload.deadline === null ? null : moment(datapayload.deadline)} className="datepickerStatus" showTime onChange={(date, datestring) => {
                                        setdatapayload({ ...datapayload, deadline: datestring })
                                        setdisabledtrigger(prev => prev + 1)
                                    }}></DatePicker>
                                    :
                                    null
                            }
                        </div>
                    </div>
            }
        </DrawerCore>
    )
}

export default DrawerTicketDeadline
