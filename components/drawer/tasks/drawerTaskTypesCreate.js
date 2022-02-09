import React, { useState, useEffect } from 'react'
import DrawerCore from '../drawerCore'
import { InputRequired, TextAreaRequired, RadioNotRequired } from '../../input'
import { Spin, notification, Input, Select, Empty, Checkbox } from 'antd'
import { AlertIconSvg, AlignJustifiedIconSvg, BorderAllSvg, CheckboxIconSvg, CheckIconSvg, CircleXIconSvg, CopyIconSvg, ListNumbersSvg, RulerIconSvg, TrashIconSvg } from '../../icon'
import { Label, H2 } from '../../typography'

const DrawerTaskTypesCreate = ({ title, visible, onvisible, onClose, buttonOkText, disabled, initProps }) => {
    //USESTATE
    const [datacreate, setdatacreate] = useState({
        name: "",
        description: "",
        works: []
    })
    const [loadingcreate, setloadingcreate] = useState(false)
    const [disabledcreate, setdisabledcreate] = useState(true)
    const [disabledtrigger, setdisabledtrigger] = useState(-1)
    const [tasktypenameexist, settasktypenameexist] = useState(null)
    const [loadingtasktypenameexist, setloadingtasktypenameexist] = useState(false)
    //checkbox
    const [tempcb, settempcb] = useState([])
    //matriks
    const [isbarismatriks, setisbarismatriks] = useState(false)
    const [tempcolumnmatriks, settempcolumnmatriks] = useState([])
    const [temprowmatriks, settemprowmatriks] = useState([])

    //HANDLER
    const onChangeInput = (e) => {
        setdatacreate({
            ...datacreate,
            [e.target.name]: e.target.value
        })
        setdisabledtrigger(prev => prev + 1)
    }
    const handleAddTipeTask = () => {
        setloadingcreate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addTaskType`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datacreate)
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
                        works: []
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

    //USEEFFECT
    useEffect(() => {
        if (disabledtrigger !== -1) {
            if (datacreate.name !== "" && datacreate.description !== "" && tasktypenameexist === false) {
                setdisabledcreate(false)
            }
            else {
                setdisabledcreate(true)
            }
        }
    }, [disabledtrigger])

    return (
        <DrawerCore
            title={title}
            visible={visible}
            onClose={() => {
                setdatacreate({
                    name: "",
                    description: "",
                    works: []
                })
                settasktypenameexist(null)
                onvisible(false)
            }}
            buttonOkText={buttonOkText}
            onClick={handleAddTipeTask}
            disabled={disabledcreate}
        >
            <Spin spinning={loadingcreate}>
                <div className='flex flex-col'>
                    <div className="mb-8">
                        <p className="mb-0 text-red-500 text-xs italic">*Informasi ini harus diisi</p>
                    </div>
                    <div className="flex flex-col">
                        <div className=' mb-5 px-3 flex flex-col'>
                            <div className="flex mb-1">
                                <Label>{`Judul Tipe Task`}</Label>
                                <span className="namaField"></span>
                                <style jsx>
                                    {`
                                        .namaField::before{
                                            content: '*';
                                            color: red;
                                        }
                                    `}
                                </style>
                            </div>
                            <div className=' flex flex-col'>
                                <div className="mb-2 w-full">
                                    <Input style={{ width: `100%` }} name='name' defaultValue={datacreate.name} onChange={onChangeInput}
                                        onBlur={(e) => {
                                            setloadingtasktypenameexist(true)
                                            fetch(`https://boiling-thicket-46501.herokuapp.com/getFilterTaskTypes?name=${e.target.value}`, {
                                                method: 'GET',
                                                headers: {
                                                    'Authorization': JSON.parse(initProps),
                                                },
                                            })
                                                .then((res) => res.json())
                                                .then(res2 => {
                                                    setloadingtasktypenameexist(false)
                                                    res2.data.length === 0 ? settasktypenameexist(false) : settasktypenameexist(true)
                                                    setdisabledtrigger(prev => prev + 1)
                                                })
                                        }}
                                    ></Input>
                                </div>
                                <div className='flex items-center'>
                                    {
                                        loadingtasktypenameexist ?
                                            <>
                                                <Spin size='small' />
                                            </>
                                            :
                                            tasktypenameexist !== null ?
                                                (
                                                    tasktypenameexist === true ?
                                                        <div className=' bg-overdue bg-opacity-10 text-overdue px-2 py-2 rounded flex items-center text-2xs'>
                                                            <div className=' mr-1'><AlertIconSvg size={15} color={`#BF4A40`} /></div>
                                                            Tipe task sudah ada
                                                        </div>
                                                        :
                                                        <div className=' bg-open bg-opacity-10 text-open px-2 py-2 rounded flex items-center text-2xs'>
                                                            <div className=' mr-1'><CheckIconSvg size={15} color={`#2F80ED`} /></div>
                                                            Tipe task masih kosong
                                                        </div>
                                                )
                                                :
                                                null
                                    }
                                </div>
                            </div>
                        </div>
                        {/* <InputRequired name="name" defaultValue={datacreate.name} onChangeInput={onChangeInput} label="Judul Tipe Task"></InputRequired> */}
                        <TextAreaRequired name="description" defaultValue={datacreate.description} onChangeInput={onChangeInput} label="Deskripsi Tipe Task"></TextAreaRequired>
                    </div>
                    <div className="flex flex-col px-3 mb-5">
                        <div className="flex mb-5">
                            <Label>Pekerjaan</Label>
                            <span className="pekerjaan"></span>
                            <style jsx>
                                {`
                                    .pekerjaan::before{
                                        content: '*';
                                        color: red;
                                    }
                                `}
                            </style>
                        </div>
                        {
                            datacreate.works.length === 0 ?
                                <>
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Pekerjaan masih kosong" />
                                </>
                                :
                                datacreate.works.map((doc, idx) => {
                                    return (
                                        <div key={idx} className='bg-white flex flex-col shadow-md rounded-md p-3 mb-4 border'>
                                            {/* <div className="flex justify-center text-lg font-bold mb-3">
                                                <div className="cursor-pointer">
                                                    :::
                                                </div>
                                            </div> */}
                                            <div key={idx} className="grid grid-cols-2 mb-3">
                                                <div className="col-span-1 mr-1 mb-3 flex items-center">
                                                    <div className=' mr-2'>
                                                        <Input value={doc.name} placeholder="Nama" onChange={(e) => {
                                                            var temp = [...datacreate.works]
                                                            temp[idx].name = e.target.value
                                                            setdatacreate(prev => ({
                                                                ...prev,
                                                                works: temp
                                                            }))
                                                        }}></Input>
                                                    </div>
                                                </div>
                                                <div className="col-span-1 ml-1 mb-3">
                                                    <Select key={idx} name={`name`} value={doc.type} style={{ width: `100%` }} onChange={(value) => {
                                                        var temp = [...datacreate.works]
                                                        delete temp[idx].lists
                                                        delete temp[idx].is_general
                                                        delete temp[idx].columns
                                                        delete temp[idx].rows
                                                        delete temp[idx].dropdown_name
                                                        temp[idx].type = value
                                                        if (value === 3) {
                                                            temp[idx].lists = []
                                                        }
                                                        else if (value === 4) {
                                                            temp[idx].is_general = false
                                                            temp[idx].columns = []
                                                            temp[idx].rows = []
                                                        }
                                                        else if (value === 5) {
                                                            temp[idx].lists = []
                                                        }
                                                        else if (value === 6) {
                                                            temp[idx].lists = []
                                                            temp[idx].dropdown_name = ""
                                                        }
                                                        setdatacreate(prev => ({
                                                            ...prev,
                                                            works: temp
                                                        }))
                                                    }}>
                                                        <Select.Option value={1}>
                                                            <div className="flex items-center">
                                                                <AlignJustifiedIconSvg size={12} color={`#35763B`} />
                                                                Single Textbox
                                                            </div>
                                                        </Select.Option>
                                                        <Select.Option value={2}>
                                                            <div className="flex items-center">
                                                                <AlignJustifiedIconSvg size={12} color={`#35763B`} />
                                                                Paragraf
                                                            </div>
                                                        </Select.Option>
                                                        <Select.Option value={3}>
                                                            <div className="flex items-center">
                                                                <CheckboxIconSvg size={12} color={`#35763B`} />
                                                                Checkbox
                                                            </div>
                                                        </Select.Option>
                                                        <Select.Option value={4}>
                                                            <div className="flex items-center">
                                                                <BorderAllSvg size={12} color={`#35763B`} />
                                                                Matriks
                                                            </div>
                                                        </Select.Option>
                                                        <Select.Option value={5}>
                                                            <div className="flex items-center">
                                                                <ListNumbersSvg size={12} color={`#35763B`} />
                                                                Numeral
                                                            </div>
                                                        </Select.Option>
                                                        <Select.Option value={6}>
                                                            <div className="flex items-center">
                                                                <ListNumbersSvg size={12} color={`#35763B`} />
                                                                Dropdown
                                                            </div>
                                                        </Select.Option>
                                                    </Select>
                                                </div>
                                                <div className="mb-5 col-span-2">
                                                    <Input placeholder="Deskripsi" value={doc.description} onChange={(e) => {
                                                        var temp = [...datacreate.works]
                                                        temp[idx].description = e.target.value
                                                        setdatacreate(prev => ({
                                                            ...prev,
                                                            works: temp
                                                        }))
                                                    }}></Input>
                                                </div>
                                                {
                                                    doc.type === 1 &&
                                                    <div className="flex flex-col mb-3 col-span-2">
                                                        <div className="mb-3">
                                                            <Input placeholder="Catatan Kegiatan (Diisi oleh staff)" disabled></Input>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    doc.type === 2 &&
                                                    <div className="flex flex-col mb-3 col-span-2">
                                                        <div className="mb-3">
                                                            <Input.TextArea placeholder="Catatan Kegiatan (Diisi oleh staff)" disabled></Input.TextArea>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    doc.type === 3 &&
                                                    <div className="flex flex-col mb-3 col-span-2">
                                                        <div className="mb-3 flex flex-col">
                                                            <div className="mb-1">
                                                                <Label>Keterangan</Label>
                                                            </div>
                                                            {
                                                                doc.lists.map((doc2, idx2) => {
                                                                    return (
                                                                        <div key={idx2} className="flex items-center justify-between mb-2"
                                                                        >
                                                                            {/* <div className="cursor-pointer font-bold mr-2">
                                                                                ::
                                                                            </div> */}
                                                                            <div className="flex items-center">
                                                                                <Checkbox style={{ marginRight: `0.5rem` }} checked />
                                                                                {doc2}
                                                                            </div>
                                                                            <div className=' cursor-pointer' onClick={() => {
                                                                                var temp = [...datacreate.works]
                                                                                temp[idx].lists.splice(idx2, 1)
                                                                                setdatacreate(prev => ({
                                                                                    ...prev,
                                                                                    works: temp
                                                                                }))
                                                                            }}>
                                                                                <CircleXIconSvg size={15} color={`#BF4A40`} />
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                            <div className="flex items-center">
                                                                <div className="mr-1 cursor-pointer hover:text-primary100" onClick={() => {
                                                                    settempcb("")
                                                                    var temp = [...datacreate.works]
                                                                    temp[idx].lists.push(tempcb[idx])
                                                                    setdatacreate(prev => ({
                                                                        ...prev,
                                                                        works: temp
                                                                    }))
                                                                }}>
                                                                    <H2>+</H2>
                                                                </div>
                                                                <Input placeholder="Tambah" value={tempcb[idx]} onChange={(e) => {
                                                                    var temptempcb = [...tempcb]
                                                                    temptempcb[idx] = e.target.value
                                                                    settempcb(temptempcb)
                                                                }} bordered={false} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    doc.type === 4 &&
                                                    <div className="flex flex-col mb-3 col-span-2">
                                                        <div className="mb-3 flex flex-col">
                                                            <div className="mb-2">
                                                                <Label>Kolom</Label>
                                                            </div>
                                                            {
                                                                doc.columns.map((doc2, idx2) => {
                                                                    return (
                                                                        <div key={idx2} className="flex items-center justify-between mb-2"
                                                                        >
                                                                            {/* <div className="cursor-pointer font-bold mr-2">
                                                                                ::
                                                                            </div> */}
                                                                            <div className="flex items-center">
                                                                                {doc2}
                                                                            </div>
                                                                            <div className=' cursor-pointer' onClick={() => {
                                                                                var temp = [...datacreate.works]
                                                                                temp[idx].columns.splice(idx2, 1)
                                                                                setdatacreate(prev => ({
                                                                                    ...prev,
                                                                                    works: temp
                                                                                }))
                                                                            }}>
                                                                                <CircleXIconSvg size={15} color={`#BF4A40`} />
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                            <div className="flex items-center">
                                                                <div className="mr-1 cursor-pointer hover:text-primary100" onClick={() => {
                                                                    settempcolumnmatriks("")
                                                                    var temp = [...datacreate.works]
                                                                    temp[idx].columns.push(tempcolumnmatriks[idx])
                                                                    setdatacreate(prev => ({
                                                                        ...prev,
                                                                        works: temp
                                                                    }))
                                                                }}>
                                                                    <H2>+</H2>
                                                                </div>
                                                                <Input placeholder="Tambah" value={tempcolumnmatriks[idx]} onChange={(e) => {
                                                                    var temptempcolumnsmatriks = [...tempcolumnmatriks]
                                                                    temptempcolumnsmatriks[idx] = e.target.value
                                                                    settempcolumnmatriks(temptempcolumnsmatriks)
                                                                }} bordered={false} />
                                                            </div>
                                                        </div>
                                                        <div className="mb-3 flex flex-col">
                                                            <div className="mb-2">
                                                                <RadioNotRequired label="Baris" value={doc.is_general} onChangeRadio={(e) => {
                                                                    setisbarismatriks(e.target.value);
                                                                    var temp = [...datacreate.works]
                                                                    temp[idx].is_general = e.target.value
                                                                    setdatacreate(prev => ({
                                                                        ...prev,
                                                                        works: temp
                                                                    }))
                                                                }}
                                                                    options={
                                                                        [
                                                                            {
                                                                                value: false,
                                                                                title: "Item"
                                                                            },
                                                                            {
                                                                                value: true,
                                                                                title: "Umum"
                                                                            }
                                                                        ]
                                                                    }
                                                                ></RadioNotRequired>
                                                            </div>
                                                            {
                                                                isbarismatriks &&
                                                                <div className="mb-2">
                                                                    {
                                                                        doc.rows.map((doc2, idx2) => {
                                                                            return (
                                                                                <div key={idx2} className="flex items-center justify-between mb-2"
                                                                                >
                                                                                    {/* <div className="cursor-pointer font-bold mr-2">
                                                                                        ::
                                                                                    </div> */}
                                                                                    <div className="flex items-center">
                                                                                        {doc2}
                                                                                    </div>
                                                                                    <div className=' cursor-pointer' onClick={() => {
                                                                                        var temp = [...datacreate.works]
                                                                                        temp[idx].rows.splice(idx2, 1)
                                                                                        setdatacreate(prev => ({
                                                                                            ...prev,
                                                                                            works: temp
                                                                                        }))
                                                                                    }}>
                                                                                        <CircleXIconSvg size={15} color={`#BF4A40`} />
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                    <div className="flex items-center">
                                                                        <div className="mr-1 cursor-pointer hover:text-primary100" onClick={() => {
                                                                            settemprowmatriks("")
                                                                            var temp = [...datacreate.works]
                                                                            temp[idx].rows.push(temprowmatriks[idx])
                                                                            setdatacreate(prev => ({
                                                                                ...prev,
                                                                                works: temp
                                                                            }))
                                                                        }}>
                                                                            <H2>+</H2>
                                                                        </div>
                                                                        <Input placeholder="Tambah" value={temprowmatriks[idx]} onChange={(e) => {
                                                                            var temptemprowssmatriks = [...temprowmatriks]
                                                                            temptemprowssmatriks[idx] = e.target.value
                                                                            settemprowmatriks(temptemprowssmatriks)
                                                                        }} bordered={false} />
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    doc.type === 5 &&
                                                    <div className='flex flex-col mb-3 col-span-2'>
                                                        {
                                                            doc.lists.map((doc3, idx3) => {
                                                                return (
                                                                    <div className="flex items-center mb-4">
                                                                        {/* <div className="cursor-pointer font-bold mr-2">
                                                                            ::
                                                                        </div> */}
                                                                        <div className='flex flex-col'>
                                                                            <div className="flex mb-2">
                                                                                <div className="w-7/12 mr-2">
                                                                                    <Input placeholder="Nilai (Diisi staff)" disabled></Input>
                                                                                </div>
                                                                                <div className="w-5/12">
                                                                                    <Select placeholder={`Satuan`} name={`numeral`} value={doc3.type} style={{ width: `100%` }} onChange={async (value) => {
                                                                                        var temp = [...datacreate.works]
                                                                                        temp[idx].lists[idx3] = ({ ...doc3, type: value })
                                                                                        setdatacreate(prev => ({
                                                                                            ...prev,
                                                                                            works: temp
                                                                                        }))
                                                                                    }}>
                                                                                        <Select.Option value={'Vac'}>
                                                                                            <div className="flex items-center">
                                                                                                <RulerIconSvg size={12} color={`#35763B`} />
                                                                                                Vac
                                                                                            </div>
                                                                                        </Select.Option>
                                                                                        <Select.Option value={'C'}>
                                                                                            <div className="flex items-center">
                                                                                                <RulerIconSvg size={12} color={`#35763B`} />
                                                                                                C
                                                                                            </div>
                                                                                        </Select.Option>
                                                                                        <Select.Option value={"Volt"}>
                                                                                            <div className="flex items-center">
                                                                                                <RulerIconSvg size={12} color={`#35763B`} />
                                                                                                Volt
                                                                                            </div>
                                                                                        </Select.Option>
                                                                                        <Select.Option value={"Hz"}>
                                                                                            <div className="flex items-center">
                                                                                                <RulerIconSvg size={12} color={`#35763B`} />
                                                                                                Hz
                                                                                            </div>
                                                                                        </Select.Option>
                                                                                    </Select>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex mb-2 items-center">
                                                                                <div className=' w-10/12'>
                                                                                    <Input placeholder="Keterangan" value={doc3.description} onChange={(e) => {
                                                                                        var temp = [...datacreate.works]
                                                                                        temp[idx].lists[idx3] = ({ ...doc3, description: e.target.value })
                                                                                        setdatacreate(prev => ({
                                                                                            ...prev,
                                                                                            works: temp
                                                                                        }))
                                                                                    }}></Input>
                                                                                </div>
                                                                                <div className=' w-2/12 cursor-pointer flex items-center text-center justify-center' onClick={() => {
                                                                                    var temp = [...datacreate.works]
                                                                                    temp[idx].lists.splice(idx3, 1)
                                                                                    setdatacreate(prev => ({
                                                                                        ...prev,
                                                                                        works: temp
                                                                                    }))
                                                                                }}>
                                                                                    <CircleXIconSvg size={15} color={`#BF4A40`} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                        <div className='flex items-center'>
                                                            <div className="mr-1 cursor-pointer hover:text-primary100" onClick={() => {
                                                                var temp = [...datacreate.works]
                                                                temp[idx].lists.push({ type: null, description: "" })
                                                                setdatacreate(prev => ({
                                                                    ...prev,
                                                                    works: temp
                                                                }))
                                                            }}>
                                                                <h1 className='font-semibold text-sm hover:text-primary100'>+ Tambah Item</h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    doc.type === 6 &&
                                                    <div className='flex flex-col mb-3 col-span-2'>
                                                        <div>
                                                            <div className="flex flex-col mb-1 px-3">
                                                                <div className="flex">
                                                                    <Label>Nama Dropdown</Label>
                                                                    <span className="namaField"></span>
                                                                    <style jsx>
                                                                        {`
                                                                        .namaField::before{
                                                                            content: '*';
                                                                            color: red;
                                                                        }
                                                                    `}
                                                                    </style>
                                                                </div>
                                                                <Input value={doc.dropdown_name} onChange={(e) => {
                                                                    var temp = [...datacreate.works]
                                                                    temp[idx].dropdown_name = e.target.value
                                                                    setdatacreate(prev => ({
                                                                        ...prev,
                                                                        works: temp
                                                                    }))
                                                                }}></Input>
                                                            </div>
                                                        </div>
                                                        {
                                                            doc.lists.map((doc4, idx4) => {
                                                                return (
                                                                    <div key={idx4} className=" px-3 flex items-center mb-2">
                                                                        {/* <div className="cursor-pointer font-bold mr-2">
                                                                            ::
                                                                        </div> */}
                                                                        <div className="flex items-center mr-2">
                                                                            <Input placeholder="Tambah" style={{ marginRight: `0.5rem` }} value={doc4} onChange={(e) => {
                                                                                var temp = [...datacreate.works]
                                                                                temp[idx].lists[idx4] = e.target.value
                                                                                setdatacreate(prev => ({
                                                                                    ...prev,
                                                                                    works: temp
                                                                                }))
                                                                            }} bordered={false}
                                                                            />
                                                                            <div className='cursor-pointer flex items-center text-center justify-center' onClick={() => {
                                                                                var temp = [...datacreate.works]
                                                                                temp[idx].lists.splice(idx4, 1)
                                                                                setdatacreate(prev => ({
                                                                                    ...prev,
                                                                                    works: temp
                                                                                }))
                                                                            }}>
                                                                                <CircleXIconSvg size={15} color={`#BF4A40`} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                        <div className="flex items-center px-3">
                                                            <div className="mr-1 cursor-pointer hover:text-primary100" onClick={() => {
                                                                var temp = [...datacreate.works]
                                                                temp[idx].lists.push("")
                                                                setdatacreate(prev => ({
                                                                    ...prev,
                                                                    works: temp
                                                                }))
                                                            }}>
                                                                <h1 className='font-semibold text-sm hover:text-primary100'>+ Tambah Value</h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                {/* COPY dan DELETE */}
                                                <div className=" col-span-2 flex justify-end">
                                                    <div className="mx-1 cursor-pointer" onClick={() => {
                                                        var templastdata = {}
                                                        if (doc.type === 1 || doc.type === 2) {
                                                            templastdata = {
                                                                name: doc.name,
                                                                type: doc.type,
                                                                description: doc.description,
                                                            }
                                                        }
                                                        else if (doc.type === 3) {
                                                            templastdata = {
                                                                name: doc.name,
                                                                type: doc.type,
                                                                description: doc.description,
                                                                lists: [...doc.lists]
                                                            }
                                                        }
                                                        else if (doc.type === 4) {
                                                            templastdata = {
                                                                name: doc.name,
                                                                type: doc.type,
                                                                description: doc.description,
                                                                is_general: doc.is_general,
                                                                columns: [...doc.columns],
                                                                rows: [...doc.rows]
                                                            }
                                                        }
                                                        else if (doc.type === 5) {
                                                            templastdata = {
                                                                name: doc.name,
                                                                type: doc.type,
                                                                description: doc.description,
                                                                lists: [...doc.lists]
                                                            }
                                                        }
                                                        else if (doc.type === 6) {
                                                            templastdata = {
                                                                name: doc.name,
                                                                type: doc.type,
                                                                description: doc.description,
                                                                dropdown_name: doc.dropdown_name,
                                                                lists: [...doc.lists]
                                                            }
                                                        }
                                                        var temp = [...datacreate.works]
                                                        temp.splice(idx + 1, 0, templastdata)
                                                        setdatacreate(prev => ({
                                                            ...prev,
                                                            works: temp
                                                        }))
                                                    }}>
                                                        <CopyIconSvg size={15} color={`#000000`} />
                                                    </div>
                                                    <div className="mx-1 cursor-pointer" onClick={() => {
                                                        console.log(idx)
                                                        const temp = [...datacreate.works]
                                                        temp.splice(idx, 1)
                                                        setdatacreate(prev => ({
                                                            ...prev,
                                                            works: temp
                                                        }))
                                                    }}>
                                                        <TrashIconSvg size={15} color={`#000000`} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>
                    <div className="mb-4 border border-dashed border-primary100 hover:border-primary75 py-2 flex justify-center items-center w-full rounded-md cursor-pointer" onClick={() => {
                        setdatacreate(prev => ({
                            ...prev,
                            works: [...prev.works, { type: 1, name: "", description: "" }]
                        }))
                        settempcb([...tempcb, ""])
                        settempcolumnmatriks([...tempcolumnmatriks, ""])
                        settemprowmatriks([...temprowmatriks, ""])
                    }}>
                        <div className="text-primary100 hover:text-primary75">
                            + Tambah Pekerjaan Baru
                        </div>
                    </div>
                </div>
            </Spin>
        </DrawerCore>
    )
}

export default DrawerTaskTypesCreate