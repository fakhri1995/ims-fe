import React, { useState, useEffect } from 'react'
import DrawerCore from '../drawerCore'
import { RadioNotRequired } from '../../input'
import { Spin, notification, Input, Select, Empty, Checkbox } from 'antd'
import { AlignJustifiedIconSvg, BorderAllSvg, CheckboxIconSvg, CircleXIconSvg, CopyIconSvg, ListNumbersSvg, RulerIconSvg, TrashIconSvg } from '../../icon'
import { Label, H2 } from '../../typography'

const DrawerTaskDetailCreate = ({ title, id, taskid, loading, visible, onvisible, onClose, buttonOkText, disabled, initProps, settriggertaskdetailcreate }) => {
    //USESTATE
    const [datacreate, setdatacreate] = useState({
        task_id: Number(taskid),
        work: {
            name: "",
            description: "",
            type: null
        }
    })
    const [backupdatadisplay, setbackupdatadisplay] = useState({
        name: null,
        name: null,
        type: {}
    })
    const [dynamniclen, setdynamniclen] = useState(0)
    const [loadingdetailtaskcreate, setloadingdetailtaskcreate] = useState(false)
    const [loadingcreate, setloadingcreate] = useState(false)
    const [disabledcreate, setdisabledcreate] = useState(true)
    const [disabledtrigger, setdisabledtrigger] = useState(-1)
    const [deletestate, setdeletestate] = useState(false)
    const [workslen, setworkslen] = useState(0)
    const [prevtype, setprevtype] = useState(null)
    //checkbox
    const [tempcb, settempcb] = useState("")
    //matriks
    const [isbarismatriks, setisbarismatriks] = useState(false)
    const [tempcolumnmatriks, settempcolumnmatriks] = useState("")
    const [temprowmatriks, settemprowmatriks] = useState("")

    //HANDLER
    const onChangeInput = (e) => {
        setdatacreate(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        setdisabledtrigger(prev => prev + 1)
    }
    const handleCreateTaskDetail = () => {
        setloadingcreate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addTaskDetail`, {
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
                    settriggertaskdetailcreate(prev => prev + 1)
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
            if (datacreate.work.name !== "" && datacreate.work.description !== "") {
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
                    id: null,
                    task_id: null,
                    work: {}
                })
                onvisible(false)
            }}
            buttonOkText={buttonOkText}
            onClick={handleCreateTaskDetail}
            disabled={disabledcreate}
        >
            {
                loadingdetailtaskcreate ?
                    <>
                        <Spin />
                    </>
                    :
                    <Spin spinning={loadingcreate}>
                        <div className='flex flex-col'>
                            <div className="flex flex-col px-3 mb-5">
                                <div className='bg-white flex flex-col shadow-md rounded-md p-3 mb-4 border'>
                                    <div className="flex justify-center text-lg font-bold mb-3">
                                        <div className="cursor-pointer">
                                            :::
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 mb-3">
                                        <div className="col-span-1 mr-1">
                                            <Input value={datacreate.work.name} placeholder="Nama" onChange={(e) => {
                                                setdatacreate(prev => ({
                                                    ...prev,
                                                    work: {
                                                        ...prev.work,
                                                        name: e.target.value
                                                    }
                                                }))
                                                setdisabledtrigger(prev => prev + 1)
                                            }}></Input>
                                        </div>
                                        <div className="col-span-1 ml-1 mb-3">
                                            <Select placeholder="Tipe" name={`name`} value={datacreate.work.type} style={{ width: `100%` }} onChange={(value) => {
                                                var tt = datacreate
                                                delete tt.work.lists
                                                delete tt.work.is_general
                                                delete tt.work.columns
                                                delete tt.work.rows
                                                delete tt.work.dropdown_name
                                                tt.work.type = value
                                                if (value === 3) {
                                                    tt.work.rows = []
                                                }
                                                else if (value === 4) {
                                                    tt.work.is_general = null
                                                    tt.work.columns = []
                                                    tt.work.rows = []
                                                }
                                                else if (value === 5) {
                                                    tt.work.rows = []
                                                }
                                                else if (value === 6) {
                                                    tt.work.rows = []
                                                    tt.work.dropdown_name = ""
                                                }
                                                setdatacreate({
                                                    ...tt
                                                })
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
                                            <Input placeholder="Deskripsi" value={datacreate.work.description} onChange={(e) => {
                                                setdatacreate(prev => ({
                                                    ...prev,
                                                    work: {
                                                        ...prev.work,
                                                        description: e.target.value
                                                    }
                                                }))
                                                setdisabledtrigger(prev => prev + 1)
                                            }}></Input>
                                        </div>
                                        {
                                            datacreate.work.type === 1 &&
                                            <div className="flex flex-col mb-3 col-span-2">
                                                <div className="mb-3">
                                                    <Input placeholder="Catatan Kegiatan (Diisi oleh staff)" disabled></Input>
                                                </div>
                                            </div>
                                        }
                                        {
                                            datacreate.work.type === 2 &&
                                            <div className="flex flex-col mb-3 col-span-2">
                                                <div className="mb-3">
                                                    <Input.TextArea placeholder="Catatan Kegiatan (Diisi oleh staff)" disabled></Input.TextArea>
                                                </div>
                                            </div>
                                        }
                                        {
                                            datacreate.work.type === 3 &&
                                            <div className="flex flex-col mb-3 col-span-2">
                                                <div className="mb-3 flex flex-col">
                                                    <div className="mb-1">
                                                        <Label>Keterangan</Label>
                                                    </div>
                                                    {
                                                        datacreate.work.rows.map((doc2, idx2) => {
                                                            return (
                                                                <div key={idx2} className="flex items-center mb-2">
                                                                    <div className="cursor-pointer font-bold mr-2">
                                                                        ::
                                                                    </div>
                                                                    <div className="flex items-center mr-2">
                                                                        <Checkbox style={{ marginRight: `0.5rem` }} checked />
                                                                        {doc2}
                                                                    </div>
                                                                    <div className=' cursor-pointer flex items-center' onClick={() => {
                                                                        var temp = [...datacreate.work.rows]
                                                                        temp.splice(idx2, 1)
                                                                        setdatacreate(prev => ({
                                                                            ...prev,
                                                                            work: {
                                                                                ...prev.work,
                                                                                rows: temp
                                                                            }
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
                                                            var temp = [...datacreate.work.rows]
                                                            temp.push(tempcb)
                                                            setdatacreate(prev => ({
                                                                ...prev,
                                                                work: {
                                                                    ...prev.work,
                                                                    rows: temp
                                                                }
                                                            }))
                                                        }}>
                                                            <H2>+</H2>
                                                        </div>
                                                        <Input placeholder="Tambah" value={tempcb} onChange={(e) => {
                                                            settempcb(e.target.value)
                                                        }} bordered={false} />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {
                                            datacreate.work.type === 4 &&
                                            <div className="flex flex-col mb-3 col-span-2">
                                                <div className="mb-3 flex flex-col">
                                                    <div className="mb-2">
                                                        <Label>Kolom</Label>
                                                    </div>
                                                    {
                                                        datacreate.work.columns.map((doc2, idx2) => {
                                                            return (
                                                                <div key={idx2} className="flex items-center mb-2"
                                                                >
                                                                    <div className="cursor-pointer font-bold mr-2">
                                                                        ::
                                                                    </div>
                                                                    <div className="flex items-center mr-2">
                                                                        {doc2}
                                                                    </div>
                                                                    <div className=' cursor-pointer flex items-center' onClick={() => {
                                                                        var temp = [...datacreate.work.columns]
                                                                        temp.splice(idx2, 1)
                                                                        setdatacreate(prev => ({
                                                                            ...prev,
                                                                            work: {
                                                                                ...prev.work,
                                                                                columns: temp
                                                                            }
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
                                                            var temp = [...datacreate.work.columns]
                                                            temp.push(tempcolumnmatriks)
                                                            setdatacreate(prev => ({
                                                                ...prev,
                                                                work: {
                                                                    ...prev.work,
                                                                    columns: temp
                                                                }
                                                            }))
                                                        }}>
                                                            <H2>+</H2>
                                                        </div>
                                                        <Input placeholder="Tambah" value={tempcolumnmatriks} onChange={(e) => { settempcolumnmatriks(e.target.value) }} bordered={false} />
                                                    </div>
                                                </div>
                                                <div className="mb-3 flex flex-col">
                                                    <div className="mb-2">
                                                        <RadioNotRequired label="Baris" value={datacreate.work.is_general} onChangeRadio={(e) => {
                                                            setisbarismatriks(e.target.value);
                                                            setdatacreate(prev => ({
                                                                ...prev,
                                                                work: {
                                                                    ...prev.work,
                                                                    is_general: e.target.value
                                                                }
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
                                                                datacreate.work.rows.map((doc2, idx2) => {
                                                                    return (
                                                                        <div key={idx2} className="flex items-center mb-2"
                                                                        >
                                                                            <div className="cursor-pointer font-bold mr-2">
                                                                                ::
                                                                            </div>
                                                                            <div className="flex items-center mr-2">
                                                                                {doc2}
                                                                            </div>
                                                                            <div className=' cursor-pointer flex items-center' onClick={() => {
                                                                                var temp = [...datacreate.work.rows]
                                                                                temp.splice(idx2, 1)
                                                                                setdatacreate(prev => ({
                                                                                    ...prev,
                                                                                    work: {
                                                                                        ...prev.work,
                                                                                        rows: temp
                                                                                    }
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
                                                                    var temp = [...datacreate.work.rows]
                                                                    temp.push(temprowmatriks)
                                                                    setdatacreate(prev => ({
                                                                        ...prev,
                                                                        work: {
                                                                            ...prev.work,
                                                                            rows: temp
                                                                        }
                                                                    }))
                                                                }}>
                                                                    <H2>+</H2>
                                                                </div>
                                                                <Input placeholder="Tambah" value={temprowmatriks} onChange={(e) => { settemprowmatriks(e.target.value) }} bordered={false} />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        }
                                        {
                                            datacreate.work.type === 5 &&
                                            <div className='flex flex-col mb-3 col-span-2'>
                                                {
                                                    datacreate.work.rows.map((doc3, idx3) => {
                                                        return (
                                                            <div className="flex items-center mb-4">
                                                                <div className=' cursor-pointer flex items-center' onClick={() => {
                                                                    var temp = [...datacreate.work.rows]
                                                                    temp.splice(idx3, 1)
                                                                    setdatacreate(prev => ({
                                                                        ...prev,
                                                                        work: {
                                                                            ...prev.work,
                                                                            rows: temp
                                                                        }
                                                                    }))
                                                                }}>
                                                                    <CircleXIconSvg size={15} color={`#BF4A40`} />
                                                                </div>
                                                                <div className='flex flex-col'>
                                                                    <div className="flex mb-2">
                                                                        <div className="w-7/12 mr-2">
                                                                            <Input placeholder="Nilai (Diisi staff)" disabled></Input>
                                                                        </div>
                                                                        <div className="w-5/12">
                                                                            <Select placeholder={`Satuan`} name={`numeral`} value={doc3.type} style={{ width: `100%` }} onChange={async (value) => {
                                                                                var temp = [...datacreate.work.rows]
                                                                                temp[idx3] = { ...doc3, type: value }
                                                                                setdatacreate(prev => ({
                                                                                    ...prev,
                                                                                    work: {
                                                                                        ...prev.work,
                                                                                        rows: temp
                                                                                    }
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
                                                                    <div className="flex mb-2">
                                                                        <Input placeholder="Keterangan" value={doc3.description} onChange={(e) => {
                                                                            var temp = [...datacreate.work.rows]
                                                                            temp[idx3] = { ...doc3, description: e.target.value }
                                                                            setdatacreate(prev => ({
                                                                                ...prev,
                                                                                work: {
                                                                                    ...prev.work,
                                                                                    rows: temp
                                                                                }
                                                                            }))
                                                                        }}></Input>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <div className='flex items-center'>
                                                    <div className="mr-1 cursor-pointer hover:text-primary100" onClick={() => {
                                                        var temp = [...datacreate.work.rows]
                                                        temp.push({ type: null, description: "" })
                                                        setdatacreate(prev => ({
                                                            ...prev,
                                                            work: {
                                                                ...prev.work,
                                                                rows: temp
                                                            }
                                                        }))
                                                    }}>
                                                        <h1 className='font-semibold text-sm hover:text-primary100'>+ Tambah Item</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {
                                            datacreate.work.type === 6 &&
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
                                                        <Input value={datacreate.work.dropdown_name} onChange={(e) => {
                                                            setdatacreate(prev => ({
                                                                ...prev,
                                                                work: {
                                                                    ...prev.work,
                                                                    dropdown_name: e.target.value
                                                                }
                                                            }))
                                                        }}></Input>
                                                    </div>
                                                </div>
                                                {
                                                    datacreate.work.rows.map((doc4, idx4) => {
                                                        return (
                                                            <div key={idx4} className=" px-3 flex items-center mb-2">
                                                                <div className=' cursor-pointer flex items-center' onClick={() => {
                                                                    var temp = [...datacreate.work.rows]
                                                                    temp.splice(idx4, 1)
                                                                    setdatacreate(prev => ({
                                                                        ...prev,
                                                                        work: {
                                                                            ...prev.work,
                                                                            rows: temp
                                                                        }
                                                                    }))
                                                                }}>
                                                                    <CircleXIconSvg size={15} color={`#BF4A40`} />
                                                                </div>
                                                                <div className="flex items-center mr-2">
                                                                    <Input placeholder="Tambah" value={doc4} onChange={(e) => {
                                                                        var temp = [...datacreate.work.rows]
                                                                        temp[idx4] = e.target.value
                                                                        setdatacreate(prev => ({
                                                                            ...prev,
                                                                            work: {
                                                                                ...prev.work,
                                                                                rows: temp
                                                                            }
                                                                        }))
                                                                    }} bordered={false}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <div className="flex items-center px-3">
                                                    <div className="mr-1 cursor-pointer hover:text-primary100" onClick={() => {
                                                        var temp = [...datacreate.work.rows]
                                                        temp.push("")
                                                        setdatacreate(prev => ({
                                                            ...prev,
                                                            work: {
                                                                ...prev.work,
                                                                rows: temp
                                                            }
                                                        }))
                                                    }}>
                                                        <h1 className='font-semibold text-sm hover:text-primary100'>+ Tambah Value</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Spin>
            }
        </DrawerCore >
    )
}

export default DrawerTaskDetailCreate