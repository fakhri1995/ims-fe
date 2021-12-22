import React, { useState, useEffect } from 'react'
import DrawerCore from '../drawerCore'
import { InputRequired, TextAreaNotRequired } from '../../input'
import { Spin, TreeSelect, Select, DatePicker, Switch, Radio, notification } from 'antd'
import { AssetIconSvg, CalendartimeIconSvg, CircleXIconSvg, UserIconSvg } from '../../icon'
import { Label, H1, H2 } from '../../typography'
import { SearchOutlined } from '@ant-design/icons'
import ButtonSys from '../../button'
import moment from 'moment'

function recursiveModifData(dataa) {
    for (var i = 0; i < dataa.length; i++) {
        dataa[i]['key'] = dataa[i].id
        dataa[i]['value'] = dataa[i].id
        dataa[i]['title'] = dataa[i].name
        if (dataa[i].children) {
            recursiveModifData(dataa[i].children)
        }
    }
    return dataa
}

const DrawerTaskUpdate = ({ title, visible, onvisible, onClose, buttonOkText, disabled, initProps, dataupdate, setdataupdate, loading, selecteditems, setselecteditems, selectedstaffgroup, setselectedstaffgroup, switchstaffgroup, setswitchstaffgroup, now, setnow, choosedate, setchoosedate, nowend, setnowend, choosedateend, setchoosedateend, repeatable, setrepeatable, regular, setregular, choosedateendrepeat, setchoosedateendrepeat }) => {
    //USESTATE
    const [loadingupdate, setloadingupdate] = useState(false)
    const [disabledupdate, setdisabledupdate] = useState(true)
    const [disabledtrigger, setdisabledtrigger] = useState(-1)
    //task types
    const [datatasktypes, setdatatasktypes] = useState([])
    const [fetchingtasktypes, setfetchingtasktypes] = useState(false)
    //references
    const [datareferences, setdatareferences] = useState([])
    const [fetchingreferences, setfetchingreferences] = useState(false)
    //locations
    const [datalocations, setdatalocations] = useState([])
    const [datasublocs, setdatasublocs] = useState([])
    const [fetchinglocations, setfetchinglocations] = useState(false)
    const [triggersubloc, settriggersubloc] = useState(-1)
    const [selectedsubloc, setselectedsubloc] = useState(null)
    //items
    const [dataitems, setdataitems] = useState([])
    const [fetchingitems, setfetchingitems] = useState(false)
    //staff/group
    const [datastaffgroup, setdatastaffgroup] = useState([])
    const [fetchingstaffgroup, setfetchingstaffgroup] = useState(false)
    //end date

    //HANDLER
    const handleUpdateTask = () => {
        var finaldata = {
            ...dataupdate,
            location_id: dataupdate.subloc_id === null ? dataupdate.location_id : dataupdate.subloc_id
        }
        setloadingupdate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateTask`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(finaldata)
        })
            .then((res) => res.json())
            .then(res2 => {
                setloadingupdate(false)
                if (res2.success) {
                    onvisible(false)
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setdataupdate({
                        id: "",
                        name: "",
                        description: "",
                        location_id: null,
                        reference_id: null,
                        created_at: moment(new Date()).locale('id').format(),
                        deadline: moment(new Date()).add(3, 'h').locale('id').format(),
                        is_group: null,
                        is_replaceable: false,
                        assign_ids: [],
                        inventory_ids: [],
                        is_uploadable: false,
                        repeat: 0,
                        files: [],
                        end_repeat_at: null,
                        subloc_id: null,
                    })
                    setdataitems([])
                    setdatastaffgroup([])
                    window.location.href = `/tasks/detail/${dataupdate.id}`
                }
                else {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }


    //USEEFFECT
    //Tipe task
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getFilterTaskTypes`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                const modif = recursiveModifData(res2.data)
                setdatatasktypes(modif)
            })
    }, [])
    //Referensi
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getTickets`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setdatareferences(res2.data.tickets.data)
            })
    }, [])
    //Lokasi
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getAllCompanyList`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setdatalocations(res2.data.children)
            })
    }, [])
    //Sublokasi
    useEffect(() => {
        if (triggersubloc !== -1) {
            fetch(`https://boiling-thicket-46501.herokuapp.com/getSubLocations?company_id=${triggersubloc}`, {
                method: `GET`,
                headers: {
                    'Authorization': JSON.parse(initProps),
                }
            })
                .then(res => res.json())
                .then(res2 => {
                    setdatasublocs(res2.data.children)
                })
        }
    }, [triggersubloc])
    //Items
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getFilterInventories`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setdataitems(res2.data)
            })
    }, [])
    //Staff/group
    useEffect(() => {
        if (switchstaffgroup !== -1) {
            if (switchstaffgroup === 0) {
                fetch(`https://boiling-thicket-46501.herokuapp.com/getFilterGroups`, {
                    method: `GET`,
                    headers: {
                        'Authorization': JSON.parse(initProps),
                    },
                })
                    .then(res => res.json())
                    .then(res2 => {
                        setdatastaffgroup(res2.data)
                    })
            }
            else if (switchstaffgroup === 1) {
                fetch(`https://boiling-thicket-46501.herokuapp.com/getFilterUsers?type=${1}`, {
                    method: `GET`,
                    headers: {
                        'Authorization': JSON.parse(initProps),
                    },
                })
                    .then(res => res.json())
                    .then(res2 => {
                        setdatastaffgroup(res2.data)
                    })
            }
        }
    }, [switchstaffgroup])
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getFilterGroups`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setdatastaffgroup(res2.data)
            })
    }, [])
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getFilterUsers?type=${1}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setdatastaffgroup(res2.data)
            })
    }, [])
    useEffect(() => {
        if (dataupdate.task_type_id !== null && dataupdate.name !== "" && dataupdate.location_id !== null && dataupdate.created_at !== null && dataupdate.deadline !== null && dataupdate.repeat !== -1) {
            setdisabledupdate(false)
        }
        else {
            setdisabledupdate(true)
        }
    }, [disabledtrigger])

    return (
        <DrawerCore
            title={title}
            visible={visible}
            onClose={onClose}
            buttonOkText={buttonOkText}
            onClick={handleUpdateTask}
            disabled={disabledupdate}
        >
            {
                loading ?
                    <>
                        <div id={`card-1`} className=" flex justify-center">
                            <Spin />
                        </div>
                    </>
                    :
                    <Spin spinning={loadingupdate}>
                        <div className="flex flex-col">
                            <div className="mb-6">
                                <p className="mb-0 text-red-500 text-xs italic">*Informasi ini harus diisi</p>
                            </div>
                            {/* <div className="mb-6 flex px-3">
                                <div className=' w-6/12 mr-2 flex flex-col'>
                                    <div className="flex mb-2">
                                        <Label>Tipe Task</Label>
                                        <span className="tasktype"></span>
                                        <style jsx>
                                            {`
                                        .tasktype::before{
                                            content: '*';
                                            color: red;
                                        }
                                    `}
                                        </style>
                                    </div>
                                    <Select
                                        placeholder="Nama tipe task"
                                        suffixIcon={<SearchOutlined />}
                                        showArrow
                                        showSearch
                                        optionFilterProp="children"
                                        notFoundContent={fetchingtasktypes ? <Spin size="small" /> : null}
                                        onSearch={(value) => {
                                            setfetchingtasktypes(true)
                                            fetch(`https://boiling-thicket-46501.herokuapp.com/getFilterTaskTypes?name=${value}`, {
                                                method: `GET`,
                                                headers: {
                                                    'Authorization': JSON.parse(initProps),
                                                },
                                            })
                                                .then(res => res.json())
                                                .then(res2 => {
                                                    setdatatasktypes(res2.data)
                                                    setfetchingtasktypes(false)
                                                })
                                        }}
                                        filterOption={(input, opt) => (
                                            opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        )}
                                        name={`task_type_id`}
                                        value={dataupdate.task_type_id}
                                        onChange={(value) => { setdataupdate({ ...dataupdate, task_type_id: value }); setdisabledtrigger(prev => prev + 1) }}
                                    >
                                        {
                                            datatasktypes.map((doc, idx) => (
                                                <Select.Option key={idx} value={doc.id}>{doc.name}</Select.Option>
                                            ))
                                        }
                                    </Select >
                                </div>
                            </div> */}
                            <div id={`card${0}`} className='mb-5 flex flex-col px-3'>
                                <div className="flex mb-1">
                                    <Label>Referensi</Label>
                                    <span className="tasktype"></span>
                                    <style jsx>
                                        {`
                                    .tasktype::before{
                                        content: '*';
                                        color: red;
                                    }
                                `}
                                    </style>
                                </div>
                                <div className='w-full'>
                                    <Select
                                        style={{ width: `100%` }}
                                        mode='multiple'
                                        suffixIcon={<SearchOutlined />}
                                        showArrow
                                        placeholder="Referensi"
                                        disabled
                                        name={`reference_id`}
                                        onChange={(value) => { setdataupdate({ ...dataupdate, reference_id: value }) }}
                                    >
                                        {
                                            datareferences.map((doc, idx) => (
                                                <Select.Option key={idx} value={doc.id}>{doc.type.code + `-` + doc.ticketable.id}</Select.Option>
                                            ))
                                        }
                                    </Select >
                                </div>
                            </div>
                            <div id={`card${1}`}>
                                <InputRequired value={dataupdate.name} label={`Judul Task`} onChangeInput={(e) => { setdataupdate({ ...dataupdate, name: e.target.value }); setdisabledtrigger(prev => prev + 1) }}></InputRequired>
                            </div>
                            <div id={`card${2}`}>
                                <TextAreaNotRequired value={dataupdate.description} rows={4} label={`Deskripsi Task`} onChangeInput={(e) => { setdataupdate({ ...dataupdate, description: e.target.value }) }}></TextAreaNotRequired>
                            </div>
                            <div id={`card${3}`} className='mb-6 px-3 flex flex-col'>
                                <div className="flex mb-2">
                                    <Label>Lokasi</Label>
                                    <span className="locations"></span>
                                    <style jsx>
                                        {`
                                    .locations::before{
                                        content: '*';
                                        color: red;
                                    }
                                `}
                                    </style>
                                </div>
                                <TreeSelect
                                    allowClear
                                    placeholder="Cari Lokasi"
                                    showSearch
                                    suffixIcon={<SearchOutlined />}
                                    showArrow
                                    name={`locations_id`}
                                    onChange={(value) => { typeof (value) === 'undefined' ? setdataupdate({ ...dataupdate, location_id: null, subloc_id: null }) : setdataupdate({ ...dataupdate, location_id: value }); setdisabledtrigger(prev => prev + 1) }}
                                    treeData={datalocations}
                                    treeDefaultExpandAll
                                    value={dataupdate.location_id}
                                ></TreeSelect >
                            </div>
                            {
                                dataupdate.location_id !== null ?
                                    <div id={`card${4}`} className='mb-6 px-3 flex flex-col'>
                                        <div className="flex mb-2">
                                            <Label>Sublokasi</Label>
                                        </div>
                                        <TreeSelect
                                            allowClear
                                            placeholder="Cari Sublokasi"
                                            showSearch
                                            suffixIcon={<SearchOutlined />}
                                            showArrow
                                            name={`locations_id`}
                                            onChange={(value) => { typeof (value) === 'undefined' ? setdataupdate({ ...dataupdate, subloc_id: null }) : setdataupdate({ ...dataupdate, subloc_id: value }) }}
                                            treeData={datasublocs}
                                            treeDefaultExpandAll
                                            value={dataupdate.subloc_id}
                                        ></TreeSelect >
                                    </div>
                                    :
                                    null
                            }
                            <div id={`card${4}`} className="mb-6 px-3 flex justify-between items-center">
                                <div>
                                    <Label>Pergantian Suku Cadang</Label>
                                </div>
                                <div>
                                    <Switch checked={dataupdate.is_replaceable} onChange={(checked) => { setdataupdate({ ...dataupdate, is_replaceable: checked }) }}></Switch>
                                </div>
                            </div>
                            <div id={`card${5}`} className="mb-6 px-3 flex flex-col">
                                <div className='mb-2'>
                                    <Label>Aset</Label>
                                </div>
                                <div className='mb-2'>
                                    <Select
                                        style={{ width: `100%` }}
                                        className='dontShow'
                                        mode='multiple'
                                        suffixIcon={<SearchOutlined />}
                                        showArrow
                                        value={dataupdate.inventory_ids}
                                        placeholder="Cari MIG ID"
                                        name={`inventory_ids`}
                                        onChange={(values, options) => { setdataupdate({ ...dataupdate, inventory_ids: values }); setselecteditems(options); console.log(options) }}
                                        showSearch
                                        optionFilterProp="children"
                                        notFoundContent={fetchingitems ? <Spin size="small" /> : null}
                                        onSearch={(value) => {
                                            setfetchingitems(true)
                                            fetch(`https://boiling-thicket-46501.herokuapp.com/getFilterInventories?mig_id=${value}`, {
                                                method: `GET`,
                                                headers: {
                                                    'Authorization': JSON.parse(initProps),
                                                },
                                            })
                                                .then(res => res.json())
                                                .then(res2 => {
                                                    setdataitems(res2.data)
                                                    setfetchingitems(false)
                                                })
                                        }}
                                        filterOption={(input, opt) => (
                                            opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        )}
                                    >
                                        {
                                            dataitems.map((doc, idx) => (
                                                <Select.Option key={idx} migid={doc.mig_id} modelname={doc.model_name} assetname={doc.asset_name} value={doc.id}>{doc.mig_id}</Select.Option>
                                            ))
                                        }
                                    </Select >
                                </div>
                                {
                                    selecteditems.map((doc, idx) => (
                                        <div className='mb-2 flex items-center'>
                                            <div className='mr-2 flex items-center'>
                                                <AssetIconSvg size={50} />
                                            </div>
                                            <div className='flex flex-col justify-center'>
                                                <div className='mb-1 flex'>
                                                    <div className='mr-1'>
                                                        <H2>{doc.modelname}</H2>
                                                    </div>
                                                    <div className=' cursor-pointer' onClick={() => {
                                                        var temp = [...selecteditems]
                                                        temp.splice(idx, 1)
                                                        setselecteditems(temp)
                                                        setdataupdate(prev => ({
                                                            ...prev,
                                                            inventory_ids: temp.map(docmap => docmap.value)
                                                        }))
                                                    }}>
                                                        <CircleXIconSvg size={15} color={`#BF4A40`} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label>{doc.migid}/{doc.assetname}</Label>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div id={`card${6}`} className="mb-6 px-3 flex flex-col">
                                <div className='mb-2 flex items-center justify-between'>
                                    <div>
                                        <Label>{switchstaffgroup === 0 ? `Group` : `Staff`}</Label>
                                    </div>
                                    <div className='flex items-center'>
                                        <div className="mr-1">
                                            <Label>Staff</Label>
                                        </div>
                                        <div className="mx-1">
                                            <Switch defaultChecked={dataupdate.is_group} onChange={(checked) => { setswitchstaffgroup(checked ? 0 : 1); setdataupdate({ ...dataupdate, is_group: checked, assign_ids: [] }); setselectedstaffgroup([]) }}></Switch>
                                        </div>
                                        <div className="ml-1">
                                            <Label>Group</Label>
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-2'>
                                    {
                                        switchstaffgroup === 1 ?
                                            <Select
                                                style={{ width: `100%` }}
                                                className='dontShow'
                                                mode='multiple'
                                                suffixIcon={<SearchOutlined />}
                                                showArrow
                                                value={dataupdate.assign_ids}
                                                placeholder="Cari Nama Staff, Group.."
                                                name={`assign_ids`}
                                                onChange={(values, options) => { setdataupdate({ ...dataupdate, assign_ids: values }); setselectedstaffgroup(options); console.log(options) }}
                                                showSearch
                                                optionFilterProp="children"
                                                notFoundContent={fetchingstaffgroup ? <Spin size="small" /> : null}
                                                onSearch={(value) => {
                                                    setfetchingstaffgroup(true)
                                                    fetch(`https://boiling-thicket-46501.herokuapp.com/getFilterUsers?type=${1}&name=${value}`, {
                                                        method: `GET`,
                                                        headers: {
                                                            'Authorization': JSON.parse(initProps),
                                                        },
                                                    })
                                                        .then(res => res.json())
                                                        .then(res2 => {
                                                            setdatastaffgroup(res2.data)
                                                            setfetchingstaffgroup(false)
                                                        })
                                                }}
                                                filterOption={(input, opt) => (
                                                    opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                )}
                                            >
                                                {
                                                    datastaffgroup.map((doc, idx) => (
                                                        <Select.Option key={idx} value={doc.id} companyname={doc.company?.full_name} image={doc.profile_image}>{doc.name}</Select.Option>
                                                    ))
                                                }
                                            </Select>
                                            :
                                            <Select
                                                style={{ width: `100%` }}
                                                className='dontShow'
                                                suffixIcon={<SearchOutlined />}
                                                showArrow
                                                value={[dataupdate.assign_ids]}
                                                placeholder="Cari Nama Staff, Group.."
                                                name={`assign_ids`}
                                                onChange={(value, option) => { setdataupdate({ ...dataupdate, assign_ids: [value] }); setselectedstaffgroup([option]); console.log(option) }}
                                                showSearch
                                                optionFilterProp="children"
                                                notFoundContent={fetchingstaffgroup ? <Spin size="small" /> : null}
                                                onSearch={(value) => {
                                                    setfetchingstaffgroup(true)
                                                    fetch(`https://boiling-thicket-46501.herokuapp.com/getFilterGroups?name=${value}`, {
                                                        method: `GET`,
                                                        headers: {
                                                            'Authorization': JSON.parse(initProps),
                                                        },
                                                    })
                                                        .then(res => res.json())
                                                        .then(res2 => {
                                                            setdatastaffgroup(res2.data)
                                                            setfetchingstaffgroup(false)
                                                        })
                                                }}
                                                filterOption={(input, opt) => (
                                                    opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                )}
                                            >
                                                {
                                                    datastaffgroup.map((doc, idx) => (
                                                        <Select.Option key={idx} value={doc.id}>{doc.name}</Select.Option>
                                                    ))
                                                }
                                            </Select>
                                    }
                                </div>
                                {
                                    selectedstaffgroup.map((doc, idx) => (
                                        <div className='mb-2 flex items-center'>
                                            <div className='mr-2 flex items-center'>
                                                {
                                                    switchstaffgroup === 1 ?
                                                        <div className=' w-10 h-10 rounded-full'>
                                                            <img src={doc.image === "" || doc.image === "-" ? "/image/staffTask.png" : `${doc.image}`} className=' object-contain w-10 h-10' alt="" />
                                                        </div>
                                                        :
                                                        <UserIconSvg />
                                                }
                                            </div>
                                            <div className='flex flex-col justify-center'>
                                                <div className='mb-1 flex'>
                                                    <div className='mr-1'>
                                                        <H2>{doc.children}</H2>
                                                    </div>
                                                    <div className=' cursor-pointer' onClick={() => {
                                                        var temp = [...selectedstaffgroup]
                                                        temp.splice(idx, 1)
                                                        setselectedstaffgroup(temp)
                                                        setdataupdate(prev => ({
                                                            ...prev,
                                                            assign_ids: temp.map(docmap => docmap.value)
                                                        }))
                                                    }}>
                                                        <CircleXIconSvg size={15} color={`#BF4A40`} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label>{switchstaffgroup === 0 ? `` : `${doc.companyname}`}</Label>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div id={`card${7}`} className="mb-6 px-3 flex flex-col">
                                <div className=' flex mb-2'>
                                    <Label>Jadwal Mulai</Label>
                                    <span className="jadwal"></span>
                                    <style jsx>
                                        {`
                                    .jadwal::before{
                                        content: '*';
                                        color: red;
                                    }
                                `}
                                    </style>
                                </div>
                                <div className='mb-2'>
                                    <Radio.Group
                                        name={`created_at`}
                                        onChange={(e) => {
                                            setnow(e.target.value)
                                            setdataupdate({ ...dataupdate, created_at: e.target.value === true ? moment(new Date()).locale('id').format() : null })
                                            e.target.value === true ? setchoosedate(false) : null
                                            setdisabledtrigger(prev => prev + 1)
                                        }}
                                        defaultValue={now}
                                    >
                                        <div className="flex flex-col">
                                            <div className='mb-1'>
                                                <Radio value={true}>Saat Ini</Radio>
                                            </div>
                                            <div className='mb-1'>
                                                <Radio value={false}>Tanggal Lain</Radio>
                                            </div>
                                        </div>
                                    </Radio.Group>
                                </div>
                                <div className='pl-4 flex flex-col'>
                                    <div className='mb-2'>
                                        <ButtonSys type={`primary`} disabled={now === false ? false : true} onClick={() => { setchoosedate(true) }}>
                                            <CalendartimeIconSvg size={15} color={`#ffffff`} />
                                            Pilih Tanggal
                                        </ButtonSys>
                                    </div>
                                    {
                                        choosedate &&
                                        <div>
                                            <DatePicker showTime placeholder="Jadwal Mulai" style={{ width: `100%` }} value={moment(dataupdate.created_at)} onChange={(date, datestring) => {
                                                setdataupdate({ ...dataupdate, created_at: datestring })
                                                setdisabledtrigger(prev => prev + 1)
                                            }}></DatePicker>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div id={`card${8}`} className="mb-6 px-3 flex flex-col">
                                <div className=' flex mb-2'>
                                    <Label>Jadwal Berakhir</Label>
                                    <span className="jadwal"></span>
                                    <style jsx>
                                        {`
                                    .jadwal::before{
                                        content: '*';
                                        color: red;
                                    }
                                `}
                                    </style>
                                </div>
                                <div className='mb-2'>
                                    <Radio.Group
                                        name={`deadline`}
                                        onChange={(e) => {
                                            setnowend(e.target.value)
                                            var choisedate = ''
                                            if (e.target.value === 3) {
                                                choisedate = moment().add(3, 'h').locale('id').format()
                                            }
                                            else if (e.target.value === 30) {
                                                choisedate = moment().add(30, 'h').locale('id').format()
                                            }
                                            else if (e.target.value === 24) {
                                                choisedate = moment().add(1, 'd').locale('id').format()
                                            }
                                            else if (e.target.value === 168) {
                                                choisedate = moment().add(1, 'w').locale('id').format()
                                            }
                                            setdataupdate({ ...dataupdate, deadline: e.target.value !== -10 ? choisedate : null })
                                            e.target.value !== -10 ? setchoosedateend(false) : null
                                            setdisabledtrigger(prev => prev + 1)
                                        }}
                                        defaultValue={nowend}
                                    >
                                        <div className="flex flex-col">
                                            <div className='mb-1'>
                                                <Radio value={3}>3 jam ke depan</Radio>
                                            </div>
                                            <div className='mb-1'>
                                                <Radio value={30}>30 jam ke depan</Radio>
                                            </div>
                                            <div className='mb-1'>
                                                <Radio value={24}>Besok</Radio>
                                            </div>
                                            <div className='mb-1'>
                                                <Radio value={168}>1 minggu ke depan</Radio>
                                            </div>
                                            <div className='mb-1'>
                                                <Radio value={-10}>Tanggal Lain</Radio>
                                            </div>
                                        </div>
                                    </Radio.Group>
                                </div>
                                <div className='pl-4 flex flex-col'>
                                    <div className='mb-2'>
                                        <ButtonSys type={`primary`} disabled={nowend === -10 ? false : true} onClick={() => { setchoosedateend(true) }}>
                                            <CalendartimeIconSvg size={15} color={`#ffffff`} />
                                            Pilih Tanggal
                                        </ButtonSys>
                                    </div>
                                    {
                                        choosedateend &&
                                        <div>
                                            <DatePicker showTime placeholder="Jadwal Mulai" style={{ width: `100%` }} value={moment(dataupdate.deadline)} onChange={(date, datestring) => {
                                                setdataupdate({ ...dataupdate, deadline: datestring })
                                                setdisabledtrigger(prev => prev + 1)
                                            }}></DatePicker>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div id={`card${9}`} className="mb-6 px-3 flex flex-col">
                                <div className=' flex mb-2 justify-between'>
                                    <div>
                                        <Label>Jadwal Berulang</Label>
                                    </div>
                                    <div>
                                        <Switch checked={repeatable} onChange={(checked) => { setrepeatable(checked); setchoosedateendrepeat(false); checked === false ? (setdataupdate({ ...dataupdate, repeat: 0, end_repeat_at: null })) : null }} />
                                    </div>
                                </div>
                                {
                                    repeatable ?
                                        <>
                                            <div className=' mb-2'>
                                                <Select style={{ width: `100%` }} placeholder="Reguler, Setelah Selesai" defaultValue={dataupdate.repeat === 1 ? 1 : -1} onChange={(value) => {
                                                    setdataupdate({ ...dataupdate, repeat: value })
                                                    value === -1 ? setregular(true) : (setdataupdate({ ...dataupdate, repeat: 1 }), setregular(false))
                                                    setdisabledtrigger(prev => prev + 1)
                                                }}>
                                                    <Select.Option value={-1}>Reguler</Select.Option>
                                                    <Select.Option value={1}>Setelah Selesai</Select.Option>
                                                </Select>
                                            </div>
                                            {
                                                regular &&
                                                <>
                                                    <div className='mb-2'>
                                                        <Radio.Group
                                                            defaultValue={dataupdate.repeat}
                                                            name={`repeat`}
                                                            onChange={(e) => {
                                                                setdataupdate({ ...dataupdate, repeat: e.target.value })
                                                                setdisabledtrigger(prev => prev + 1)
                                                            }}
                                                            value={dataupdate.repeat < 2 ? null : dataupdate.repeat}
                                                        >
                                                            <div className="flex flex-col">
                                                                <div className='mb-1'>
                                                                    <Radio value={2}>Setiap Hari</Radio>
                                                                </div>
                                                                <div className='mb-1'>
                                                                    <Radio value={3}>Setiap Minggu</Radio>
                                                                </div>
                                                                <div className='mb-1'>
                                                                    <Radio value={4}>Setiap 2 Minggu</Radio>
                                                                </div>
                                                                <div className='mb-1'>
                                                                    <Radio value={5}>Setiap Bulan</Radio>
                                                                </div>
                                                                <div className='mb-1'>
                                                                    <Radio value={6}>Setiap 3 Bulan</Radio>
                                                                </div>
                                                                <div className='mb-1'>
                                                                    <Radio value={7}>Setiap 4 Bulan</Radio>
                                                                </div>
                                                            </div>
                                                        </Radio.Group>
                                                    </div>

                                                </>
                                            }
                                            <div className=' pl-4 mb-2'>
                                                <Label>Selesai Pada</Label>
                                            </div>
                                            <div className='pl-4 flex flex-col'>
                                                <div className='mb-2'>
                                                    <ButtonSys type={`primary`} onClick={() => { setchoosedateendrepeat(true) }}>
                                                        <CalendartimeIconSvg size={15} color={`#ffffff`} />
                                                        Pilih Tanggal
                                                    </ButtonSys>
                                                </div>
                                                {
                                                    choosedateendrepeat &&
                                                    <div>
                                                        <DatePicker defaultValue={dataupdate.end_repeat_at === null ? null : moment(dataupdate.end_repeat_at)} showTime placeholder="Selesai pada" style={{ width: `100%` }} onChange={(date, datestring) => {
                                                            setdataupdate({ ...dataupdate, end_repeat_at: datestring })
                                                        }}></DatePicker>
                                                    </div>
                                                }
                                            </div>
                                        </>
                                        :
                                        null
                                }
                            </div>
                            <div id={`card${10}`} className="mb-6 px-3 flex justify-between">
                                <div>
                                    <Label>
                                        Unggah Dokumen Pelengkap (PDF, JPG)
                                    </Label>
                                </div>
                                <div>
                                    <Switch checked={dataupdate.is_uploadable} onChange={(checked) => { setdataupdate({ ...dataupdate, is_uploadable: checked }) }} />
                                </div>
                            </div>
                        </div>
                    </Spin>
            }
        </DrawerCore>
    )
}

export default DrawerTaskUpdate
