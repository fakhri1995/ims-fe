import React, { useState, useEffect } from 'react'
import DrawerCore from '../drawerCore'
import { InputRequired, TextAreaNotRequired } from '../../input'
import { Spin, TreeSelect, Select, DatePicker, Switch, Radio, notification } from 'antd'
import { AssetIconSvg, CalendartimeIconSvg, CircleXIconSvg, UserIconSvg } from '../../icon'
import { Label, H1, H2 } from '../../typography'
import { SearchOutlined } from '@ant-design/icons'
import ButtonSys from '../../button'
import moment from 'moment'

const DrawerTaskCreate = ({ title, visible, onvisible, onClose, buttonOkText, disabled, initProps }) => {
    //USESTATE
    const [datacreate, setdatacreate] = useState({
        name: "",
        description: "",
        task_type_id: null,
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
    const [loadingcreate, setloadingcreate] = useState(false)
    const [disabledcreate, setdisabledcreate] = useState(true)
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
    //items
    const [dataitems, setdataitems] = useState([])
    const [selecteditems, setselecteditems] = useState([])
    const [fetchingitems, setfetchingitems] = useState(false)
    //staff/group
    const [datastaffgroup, setdatastaffgroup] = useState([])
    const [selectedstaffgroup, setselectedstaffgroup] = useState([])
    const [fetchingstaffgroup, setfetchingstaffgroup] = useState(false)
    const [switchstaffgroup, setswitchstaffgroup] = useState(1)
    //start date
    const [now, setnow] = useState(true)
    const [choosedate, setchoosedate] = useState(false)
    //end date
    const [nowend, setnowend] = useState(3)
    const [choosedateend, setchoosedateend] = useState(false)
    //repeat date
    const [repeatable, setrepeatable] = useState(false)
    const [regular, setregular] = useState(null)
    const [choosedateendrepeat, setchoosedateendrepeat] = useState(false)

    //HANDLER
    const handleAddTask = () => {
        var finaldata = {
            ...datacreate,
            location_id: datacreate.subloc_id === null ? datacreate.location_id : datacreate.subloc_id
        }
        setloadingcreate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addTask`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(finaldata)
        })
            .then((res) => res.json())
            .then(res2 => {
                setloadingcreate(false)
                if (res2.success) {
                    onvisible(false)
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setdatacreate({
                        name: "",
                        description: "",
                        task_type_id: null,
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
                setdatatasktypes(res2.data)
            })
    }, [])
    //Referensi
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getFilterTickets?id=`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setdatareferences(res2.data)
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
        if (datacreate.task_type_id !== null && datacreate.name !== "" && datacreate.location_id !== null && datacreate.created_at !== null && datacreate.deadline !== null && datacreate.repeat !== -1) {
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
            onClose={onClose}
            buttonOkText={buttonOkText}
            onClick={handleAddTask}
            disabled={disabledcreate}
        >
            <Spin spinning={loadingcreate}>
                <div className="flex flex-col">
                    <div className="mb-6">
                        <p className="mb-0 text-red-500 text-xs italic">*Informasi ini harus diisi</p>
                    </div>
                    <div className="mb-6 flex px-3">
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
                                value={datacreate.task_type_id}
                                placeholder="Nama tipe task"
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
                                name={`task_type_id`} defaultValue={datacreate.task_type_id}
                                onChange={(value) => { setdatacreate({ ...datacreate, task_type_id: value }); setdisabledtrigger(prev => prev + 1) }}
                            >
                                {
                                    datatasktypes.map((doc, idx) => (
                                        <Select.Option key={idx} value={doc.id}>{doc.name}</Select.Option>
                                    ))
                                }
                            </Select >
                        </div>
                        {/* <div className='w-6/12 ml-2 flex flex-col'>
                            <div className='mb-2 text-center'>
                                <Label>No. Task (dibuat otomatis)</Label>
                            </div>
                            <div className='w-full text-center'>
                                <H1>T-000089</H1>
                            </div>
                        </div> */}
                    </div>
                    <div className='mb-5 flex flex-col px-3'>
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
                                suffixIcon={<SearchOutlined />}
                                showArrow
                                placeholder="Referensi"
                                name={`reference_id`}
                                onChange={(value) => { setdatacreate({ ...datacreate, reference_id: value }) }}
                                showSearch
                                optionFilterProp="children"
                                notFoundContent={fetchingreferences ? <Spin size="small" /> : null}
                                onSearch={(value) => {
                                    setfetchingreferences(true)
                                    fetch(`https://boiling-thicket-46501.herokuapp.com/getFilterTickets?id=${value}`, {
                                        method: `GET`,
                                        headers: {
                                            'Authorization': JSON.parse(initProps),
                                        },
                                    })
                                        .then(res => res.json())
                                        .then(res2 => {
                                            setdatareferences(res2.data)
                                            setfetchingreferences(false)
                                        })
                                }}
                                filterOption={(input, opt) => (
                                    opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                )}
                            >
                                {
                                    datareferences.map((doc, idx) => (
                                        <Select.Option key={idx} value={doc.id}>{doc.name}</Select.Option>
                                    ))
                                }
                            </Select >
                        </div>
                    </div>
                    <InputRequired value={datacreate.name} label={`Judul Task`} onChangeInput={(e) => { setdatacreate({ ...datacreate, name: e.target.value }); setdisabledtrigger(prev => prev + 1) }}></InputRequired>
                    <TextAreaNotRequired value={datacreate.description} rows={4} label={`Deskripsi Task`} onChangeInput={(e) => { setdatacreate({ ...datacreate, description: e.target.value }) }}></TextAreaNotRequired>
                    <div className='mb-6 px-3 flex flex-col'>
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
                            onChange={(value) => { typeof (value) === 'undefined' ? setdatacreate({ ...datacreate, location_id: null, subloc_id: null }) : setdatacreate({ ...datacreate, location_id: value }); setdisabledtrigger(prev => prev + 1) }}
                            treeData={datalocations}
                            treeDefaultExpandAll
                            value={datacreate.location_id}
                        ></TreeSelect >
                    </div>
                    {
                        datacreate.location_id !== null ?
                            <div className='mb-6 px-3 flex flex-col'>
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
                                    onChange={(value) => { typeof (value) === 'undefined' ? setdatacreate({ ...datacreate, subloc_id: null }) : setdatacreate({ ...datacreate, subloc_id: value }) }}
                                    treeData={datasublocs}
                                    treeDefaultExpandAll
                                    value={datacreate.subloc_id}
                                ></TreeSelect >
                            </div>
                            :
                            null
                    }
                    <div className="mb-6 px-3 flex justify-between items-center">
                        <div>
                            <Label>Pergantian Suku Cadang</Label>
                        </div>
                        <div>
                            <Switch value={datacreate.is_replaceable} onChange={(checked) => { setdatacreate({ ...datacreate, is_replaceable: checked }); console.log(datacreate) }}></Switch>
                        </div>
                    </div>
                    <div className="mb-6 px-3 flex flex-col">
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
                                value={datacreate.inventory_ids}
                                placeholder="Cari MIG ID"
                                name={`inventory_ids`}
                                onChange={(values, options) => { setdatacreate({ ...datacreate, inventory_ids: values }); setselecteditems(options); console.log(options) }}
                                showSearch
                                optionFilterProp="children"
                                notFoundContent={fetchingitems ? <Spin size="small" /> : null}
                                onSearch={(value) => {
                                    setfetchingitems(true)
                                    fetch(`https://boiling-thicket-46501.herokuapp.com/getFilterInventories?keyword=${value}`, {
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
                                                setdatacreate(prev => ({
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
                    <div className="mb-6 px-3 flex flex-col">
                        <div className='mb-2 flex items-center justify-between'>
                            <div>
                                <Label>{switchstaffgroup === 0 ? `Group` : `Staff`}</Label>
                            </div>
                            <div className='flex items-center'>
                                <div className="mr-1">
                                    <Label>Staff</Label>
                                </div>
                                <div className="mx-1">
                                    <Switch value={datacreate.is_group} onChange={(checked) => { setswitchstaffgroup(checked ? 0 : 1); setdatacreate({ ...datacreate, is_group: checked, assign_ids: [] }); setselectedstaffgroup([]) }}></Switch>
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
                                        value={datacreate.assign_ids}
                                        placeholder="Cari Nama Staff, Group.."
                                        name={`assign_ids`}
                                        onChange={(values, options) => { setdatacreate({ ...datacreate, assign_ids: values }); setselectedstaffgroup(options); console.log(options) }}
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
                                                <Select.Option key={idx} value={doc.id} position={doc.position} image={doc.profile_image}>{doc.name}</Select.Option>
                                            ))
                                        }
                                    </Select>
                                    :
                                    <Select
                                        style={{ width: `100%` }}
                                        className='dontShow'
                                        suffixIcon={<SearchOutlined />}
                                        showArrow
                                        value={[datacreate.assign_ids]}
                                        placeholder="Cari Nama Staff, Group.."
                                        name={`assign_ids`}
                                        onChange={(value, option) => { setdatacreate({ ...datacreate, assign_ids: [value] }); setselectedstaffgroup([option]); console.log(option) }}
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
                                                setdatacreate(prev => ({
                                                    ...prev,
                                                    assign_ids: temp.map(docmap => docmap.value)
                                                }))
                                            }}>
                                                <CircleXIconSvg size={15} color={`#BF4A40`} />
                                            </div>
                                        </div>
                                        <div>
                                            <Label>{switchstaffgroup === 0 ? `` : `${doc.position}`}</Label>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="mb-6 px-3 flex flex-col">
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
                                    setdatacreate({ ...datacreate, created_at: e.target.value === true ? moment(new Date()).locale('id').format() : null })
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
                                    <DatePicker showTime placeholder="Jadwal Mulai" style={{ width: `100%` }} onChange={(date, datestring) => {
                                        setdatacreate({ ...datacreate, created_at: datestring })
                                        setdisabledtrigger(prev => prev + 1)
                                    }}></DatePicker>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="mb-6 px-3 flex flex-col">
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
                                    setdatacreate({ ...datacreate, deadline: e.target.value !== -10 ? choisedate : null })
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
                                    <DatePicker showTime placeholder="Jadwal Mulai" style={{ width: `100%` }} onChange={(date, datestring) => {
                                        setdatacreate({ ...datacreate, deadline: datestring })
                                        setdisabledtrigger(prev => prev + 1)
                                    }}></DatePicker>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="mb-6 px-3 flex flex-col">
                        <div className=' flex mb-2 justify-between'>
                            <div>
                                <Label>Jadwal Berulang</Label>
                            </div>
                            <div>
                                <Switch checked={repeatable} onChange={(checked) => { setrepeatable(checked); setchoosedateendrepeat(false); checked === false ? (setdatacreate({ ...datacreate, repeat: 0, end_repeat_at: null })) : null }} />
                            </div>
                        </div>
                        {
                            repeatable ?
                                <>
                                    <div className=' mb-2'>
                                        <Select style={{ width: `100%` }} placeholder="Reguler, Setelah Selesai" onChange={(value) => {
                                            setdatacreate({ ...datacreate, repeat: value })
                                            value === -1 ? setregular(true) : (setdatacreate({ ...datacreate, repeat: 1 }), setregular(false))
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
                                                    name={`repeat`}
                                                    onChange={(e) => {
                                                        setdatacreate({ ...datacreate, repeat: e.target.value })
                                                        setdisabledtrigger(prev => prev + 1)
                                                    }}
                                                    value={datacreate.repeat < 2 ? null : datacreate.repeat}
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
                                                <DatePicker showTime placeholder="Selesai pada" style={{ width: `100%` }} onChange={(date, datestring) => {
                                                    setdatacreate({ ...datacreate, end_repeat_at: datestring })
                                                }}></DatePicker>
                                            </div>
                                        }
                                    </div>
                                </>
                                :
                                null
                        }
                    </div>
                    <div className="mb-6 px-3 flex justify-between">
                        <div>
                            <Label>
                                Unggah Dokumen Pelengkap (PDF, JPG)
                            </Label>
                        </div>
                        <div>
                            <Switch checked={datacreate.is_uploadable} onChange={(checked) => { setdatacreate({ ...datacreate, is_uploadable: checked }) }} />
                        </div>
                    </div>
                </div>
            </Spin>
        </DrawerCore>
    )
}

export default DrawerTaskCreate
