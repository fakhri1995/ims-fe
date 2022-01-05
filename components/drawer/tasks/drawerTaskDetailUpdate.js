import React, { useState, useEffect } from 'react'
import DrawerCore from '../drawerCore'
import { RadioNotRequired } from '../../input'
import { Spin, notification, Input, Select, Empty, Checkbox } from 'antd'
import { AlignJustifiedIconSvg, BorderAllSvg, CheckboxIconSvg, CircleXIconSvg, CopyIconSvg, ListNumbersSvg, RulerIconSvg, TrashIconSvg } from '../../icon'
import { Label, H2 } from '../../typography'

const DrawerTaskDetailUpdate = ({ title, id, taskid, loading, visible, onvisible, onClose, buttonOkText, disabled, initProps, settriggertaskdetailupdate }) => {
    //USESTATE
    const [datadisplay, setdatadisplay] = useState({
        name: "",
        description: "",
        type: ""
    })
    const [dataupdate, setdataupdate] = useState({
        id: null,
        task_id: null,
        work: {}
    })
    const [backupdatadisplay, setbackupdatadisplay] = useState({
        name: null,
        name: null,
        type: {}
    })
    const [dynamniclen, setdynamniclen] = useState(0)
    const [loadingdetailtaskupdate, setloadingdetailtaskupdate] = useState(false)
    const [loadingupdate, setloadingupdate] = useState(false)
    const [disabledupdate, setdisabledupdate] = useState(true)
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
        setdatadisplay({
            ...datadisplay,
            [e.target.name]: e.target.value
        })
        setdataupdate(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        setdisabledtrigger(prev => prev + 1)
    }
    const handleUpdateTaskDetail = () => {
        // console.log(datadisplay, dataupdate)
        setloadingupdate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateTaskDetail`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataupdate)
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
                    settriggertaskdetailupdate(prev => prev + 1)
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
        if (id !== -1) {
            setloadingdetailtaskupdate(true)
            fetch(`https://boiling-thicket-46501.herokuapp.com/getTask?id=${taskid}`, {
                method: `GET`,
                headers: {
                    'Authorization': JSON.parse(initProps),
                },
            })
                .then(res => res.json())
                .then(res2 => {
                    var worksdetail = res2.data.task_details.filter(docfil => docfil.id === Number(id))[0]
                    if (worksdetail.component.type === 1 || worksdetail.component.type === 2) {
                        setdatadisplay({
                            ...datadisplay,
                            name: worksdetail.component.name,
                            description: worksdetail.component.description,
                            type: worksdetail.component.type
                        })
                        setbackupdatadisplay({
                            ...backupdatadisplay,
                            name: worksdetail.component.name,
                            description: worksdetail.component.description,
                            type: worksdetail.component.type
                        })
                        setdataupdate({
                            ...dataupdate,
                            id: Number(id),
                            task_id: Number(taskid),
                            work: {
                                name: worksdetail.component.name,
                                description: worksdetail.component.description,
                                type: worksdetail.component.type
                            }
                        })
                    }
                    else if (worksdetail.component.type === 3) {
                        setdatadisplay({
                            ...datadisplay,
                            name: worksdetail.component.name,
                            description: worksdetail.component.description,
                            type: worksdetail.component.type,
                            lists: worksdetail.component.lists
                        })
                        setbackupdatadisplay({
                            ...backupdatadisplay,
                            name: worksdetail.component.name,
                            description: worksdetail.component.description,
                            type: worksdetail.component.type,
                            lists: worksdetail.component.lists
                        })
                        setdataupdate({
                            ...dataupdate,
                            id: Number(id),
                            task_id: Number(taskid),
                            work: {
                                name: worksdetail.component.name,
                                description: worksdetail.component.description,
                                type: worksdetail.component.type,
                                add_rows: [],
                                update_rows: [],
                                delete_rows: []
                            }
                        })
                    }
                    else if (worksdetail.component.type === 4) {
                        setdatadisplay({
                            ...datadisplay,
                            name: worksdetail.component.name,
                            description: worksdetail.component.description,
                            type: worksdetail.component.type,
                            is_general: worksdetail.component.is_general,
                            rows: worksdetail.component.rows,
                            columns: worksdetail.component.columns
                        })
                        setbackupdatadisplay({
                            ...backupdatadisplay,
                            name: worksdetail.component.name,
                            description: worksdetail.component.description,
                            type: worksdetail.component.type,
                            is_general: worksdetail.component.is_general,
                            rows: worksdetail.component.rows,
                            columns: worksdetail.component.columns
                        })
                        setdataupdate({
                            ...dataupdate,
                            id: Number(id),
                            task_id: Number(taskid),
                            work: {
                                name: worksdetail.component.name,
                                description: worksdetail.component.description,
                                type: worksdetail.component.type,
                                add_rows: [],
                                update_rows: [],
                                delete_rows: [],
                                add_columns: [],
                                update_columns: [],
                                delete_columns: [],
                                is_general: worksdetail.component.is_general
                            }
                        })
                        worksdetail.component.is_general === true ? setisbarismatriks(true) : setisbarismatriks(false)
                    }
                    else if (worksdetail.component.type === 5) {
                        setdatadisplay({
                            ...datadisplay,
                            name: worksdetail.component.name,
                            description: worksdetail.component.description,
                            type: worksdetail.component.type,
                            lists: worksdetail.component.lists
                        })
                        setbackupdatadisplay({
                            ...backupdatadisplay,
                            name: worksdetail.component.name,
                            description: worksdetail.component.description,
                            type: worksdetail.component.type,
                            lists: worksdetail.component.lists
                        })
                        setdataupdate({
                            ...dataupdate,
                            id: Number(id),
                            task_id: Number(taskid),
                            work: {
                                name: worksdetail.component.name,
                                description: worksdetail.component.description,
                                type: worksdetail.component.type,
                                lists: worksdetail.component.lists,
                                add_rows: [],
                                update_rows: [],
                                delete_rows: [],
                            }
                        })
                        setdynamniclen(worksdetail.component.lists.length)
                    }
                    else if (worksdetail.component.type === 6) {
                        setdatadisplay({
                            ...datadisplay,
                            name: worksdetail.component.name,
                            description: worksdetail.component.description,
                            type: worksdetail.component.type,
                            dropdown_name: worksdetail.component.dropdown_name,
                            lists: worksdetail.component.lists
                        })
                        setbackupdatadisplay({
                            ...backupdatadisplay,
                            name: worksdetail.component.name,
                            description: worksdetail.component.description,
                            type: worksdetail.component.type,
                            dropdown_name: worksdetail.component.dropdown_name,
                            lists: worksdetail.component.lists
                        })
                        setdataupdate({
                            ...dataupdate,
                            id: Number(id),
                            task_id: Number(taskid),
                            work: {
                                name: worksdetail.component.name,
                                description: worksdetail.component.description,
                                type: worksdetail.component.type,
                                dropdown_name: worksdetail.component.dropdown_name,
                                lists: worksdetail.component.lists,
                                add_rows: [],
                                update_rows: [],
                                delete_rows: [],
                            }
                        })
                        setdynamniclen(worksdetail.component.lists.length)
                    }
                    setprevtype(worksdetail.component.type)
                    worksdetail.component.name !== "" && worksdetail.component.description !== "" ? setdisabledupdate(false) : setdisabledupdate(true)
                    setloadingdetailtaskupdate(false)
                })
        }
    }, [visible])
    useEffect(() => {
        if (disabledtrigger !== -1) {
            if (datadisplay.name !== "" && datadisplay.description !== "") {
                setdisabledupdate(false)
            }
            else {
                setdisabledupdate(true)
            }
        }
    }, [disabledtrigger])

    return (
        <DrawerCore
            title={title}
            visible={visible}
            onClose={() => {
                setdataupdate({
                    id: null,
                    task_id: null,
                    work: {}
                })
                onvisible(false)
            }}
            buttonOkText={buttonOkText}
            onClick={handleUpdateTaskDetail}
            disabled={disabledupdate}
        >
            {
                loadingdetailtaskupdate ?
                    <>
                        <Spin />
                    </>
                    :
                    <Spin spinning={loadingupdate}>
                        <div className='flex flex-col'>
                            <div className="flex flex-col px-3 mb-5">
                                <div className='bg-white flex flex-col shadow-md rounded-md p-3 mb-4 border'>
                                    <div className="flex justify-center text-lg font-bold mb-3">
                                        {/* <div className="cursor-pointer">
                                            :::
                                        </div> */}
                                    </div>
                                    <div className="grid grid-cols-2 mb-3">
                                        <div className="col-span-1 mr-1">
                                            <Input value={datadisplay.name} placeholder="Nama" onChange={(e) => {
                                                setdatadisplay(prev => ({
                                                    ...prev,
                                                    name: e.target.value
                                                }))
                                                setdataupdate(prev => ({
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
                                            <Select name={`name`} value={datadisplay.type} style={{ width: `100%` }} onChange={(value) => {
                                                if (prevtype === value) {
                                                    var t = datadisplay
                                                    var tt = dataupdate
                                                    delete t.lists
                                                    delete t.is_general
                                                    delete t.columns
                                                    delete t.rows
                                                    delete t.dropdown_name
                                                    delete tt.work.rows
                                                    delete tt.work.columns
                                                    delete tt.work.add_rows
                                                    delete tt.work.update_rows
                                                    delete tt.work.delete_rows
                                                    delete tt.work.add_columns
                                                    delete tt.work.update_columns
                                                    delete tt.work.delete_columns
                                                    delete tt.work.is_general
                                                    delete tt.work.dropdown_name
                                                    t.type = value
                                                    tt.work.type = value
                                                    if (value === 3) {
                                                        t.lists = backupdatadisplay.lists
                                                        tt.work.add_rows = []
                                                        tt.work.update_rows = []
                                                        tt.work.delete_rows = []
                                                    }
                                                    else if (value === 4) {
                                                        t.is_general = backupdatadisplay.is_general
                                                        t.columns = backupdatadisplay.columns
                                                        t.rows = backupdatadisplay.rows
                                                        tt.work.is_general = false
                                                        tt.work.add_rows = []
                                                        tt.work.update_rows = []
                                                        tt.work.delete_rows = []
                                                        tt.work.add_columns = []
                                                        tt.work.update_columns = []
                                                        tt.work.delete_columns = []
                                                    }
                                                    else if (value === 5) {
                                                        t.lists = backupdatadisplay.lists
                                                        tt.work.add_rows = []
                                                        tt.work.update_rows = []
                                                        tt.work.delete_rows = []
                                                    }
                                                    else if (value === 6) {
                                                        t.lists = backupdatadisplay.lists
                                                        t.dropdown_name = backupdatadisplay.dropdown_name
                                                        tt.work.dropdown_name = ""
                                                        tt.work.add_rows = []
                                                        tt.work.update_rows = []
                                                        tt.work.delete_rows = []
                                                    }
                                                    setdatadisplay(prev => ({
                                                        ...prev,
                                                        type: value
                                                    }))
                                                    setdataupdate({
                                                        ...tt,
                                                        work: {
                                                            ...tt.work,
                                                        }
                                                    })
                                                }
                                                else {
                                                    var t = datadisplay
                                                    var tt = dataupdate
                                                    delete t.lists
                                                    delete t.is_general
                                                    delete t.columns
                                                    delete t.rows
                                                    delete t.dropdown_name
                                                    delete tt.work.rows
                                                    delete tt.work.columns
                                                    delete tt.work.add_rows
                                                    delete tt.work.update_rows
                                                    delete tt.work.delete_rows
                                                    delete tt.work.add_columns
                                                    delete tt.work.update_columns
                                                    delete tt.work.delete_columns
                                                    delete tt.work.is_general
                                                    delete tt.work.dropdown_name
                                                    t.type = value
                                                    tt.work.type = value
                                                    if (value === 3) {
                                                        t.lists = []
                                                        tt.work.rows = []
                                                    }
                                                    else if (value === 4) {
                                                        t.is_general = false
                                                        t.columns = []
                                                        t.rows = []
                                                        tt.work.is_general = false
                                                        tt.work.columns = []
                                                        tt.work.rows = []
                                                    }
                                                    else if (value === 5) {
                                                        t.lists = []
                                                        tt.work.rows = []
                                                    }
                                                    else if (value === 6) {
                                                        t.lists = []
                                                        t.dropdown_name = ""
                                                        tt.work.rows = []
                                                        tt.work.dropdown_name = ""
                                                    }
                                                    setdatadisplay({
                                                        ...t,
                                                    })
                                                    setdataupdate({
                                                        ...tt,
                                                        work: {
                                                            ...tt.work,
                                                        }
                                                    })
                                                }
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
                                            <Input placeholder="Deskripsi" value={datadisplay.description} onChange={(e) => {
                                                setdatadisplay(prev => ({
                                                    ...prev,
                                                    description: e.target.value
                                                }))
                                                setdataupdate(prev => ({
                                                    ...prev,
                                                    work: {
                                                        ...prev.work,
                                                        description: e.target.value
                                                    }
                                                }))
                                                // setdisabledtrigger(prev => prev + 1)
                                            }}></Input>
                                        </div>
                                        {
                                            datadisplay.type === 1 &&
                                            <div className="flex flex-col mb-3 col-span-2">
                                                <div className="mb-3">
                                                    <Input placeholder="Catatan Kegiatan (Diisi oleh staff)" disabled></Input>
                                                </div>
                                            </div>
                                        }
                                        {
                                            datadisplay.type === 2 &&
                                            <div className="flex flex-col mb-3 col-span-2">
                                                <div className="mb-3">
                                                    <Input.TextArea placeholder="Catatan Kegiatan (Diisi oleh staff)" disabled></Input.TextArea>
                                                </div>
                                            </div>
                                        }
                                        {
                                            datadisplay.type === 3 &&
                                            <div className="flex flex-col mb-3 col-span-2">
                                                <div className="mb-3 flex flex-col">
                                                    <div className="mb-1">
                                                        <Label>Keterangan</Label>
                                                    </div>
                                                    {
                                                        datadisplay.lists.map((doc2, idx2) => {
                                                            return (
                                                                <div key={idx2} className="flex items-center justify-between mb-2">
                                                                    {/* <div className="cursor-pointer font-bold mr-2">
                                                                        ::
                                                                    </div> */}
                                                                    <div className="flex items-center">
                                                                        <Checkbox style={{ marginRight: `0.5rem` }} checked />
                                                                        {doc2}
                                                                    </div>
                                                                    <div className=' cursor-pointer flex items-center' onClick={() => {
                                                                        var temp = [...datadisplay.lists]
                                                                        temp.splice(idx2, 1)
                                                                        setdatadisplay(prev => ({
                                                                            ...prev,
                                                                            lists: temp
                                                                        }))
                                                                        prevtype === datadisplay.type ?
                                                                            setdataupdate(prev => ({
                                                                                ...prev,
                                                                                work: {
                                                                                    ...prev.work,
                                                                                    delete_rows: [...prev.work.delete_rows, idx2]
                                                                                }
                                                                            }))
                                                                            :
                                                                            setdataupdate(prev => ({
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
                                                            setdatadisplay(prev => ({
                                                                ...prev,
                                                                lists: [...prev.lists, tempcb]
                                                            }))
                                                            prevtype === datadisplay.type ?
                                                                setdataupdate(prev => ({
                                                                    ...prev,
                                                                    work: {
                                                                        ...prev.work,
                                                                        add_rows: [...prev.work.add_rows, tempcb]
                                                                    }
                                                                }))
                                                                :
                                                                setdataupdate(prev => ({
                                                                    ...prev,
                                                                    work: {
                                                                        ...prev.work,
                                                                        rows: [...prev.work.rows, tempcb]
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
                                            datadisplay.type === 4 &&
                                            <div className="flex flex-col mb-3 col-span-2">
                                                <div className="mb-3 flex flex-col">
                                                    <div className="mb-2">
                                                        <Label>Kolom</Label>
                                                    </div>
                                                    {
                                                        datadisplay.columns.map((doc2, idx2) => {
                                                            return (
                                                                <div key={idx2} className="flex items-center justify-between mb-2"
                                                                >
                                                                    {/* <div className="cursor-pointer font-bold mr-2">
                                                                        ::
                                                                    </div> */}
                                                                    <div className="flex items-center">
                                                                        {doc2}
                                                                    </div>
                                                                    <div className=' cursor-pointer flex items-center' onClick={() => {
                                                                        var temp = [...datadisplay.columns]
                                                                        temp.splice(idx2, 1)
                                                                        setdatadisplay(prev => ({
                                                                            ...prev,
                                                                            columns: temp
                                                                        }))
                                                                        prevtype === datadisplay.type ?
                                                                            setdataupdate(prev => ({
                                                                                ...prev,
                                                                                work: {
                                                                                    ...prev.work,
                                                                                    delete_columns: [...prev.work.delete_columns, idx2]
                                                                                }
                                                                            }))
                                                                            :
                                                                            setdataupdate(prev => ({
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
                                                            setdatadisplay(prev => ({
                                                                ...prev,
                                                                columns: [...prev.columns, tempcolumnmatriks]
                                                            }))
                                                            prevtype === datadisplay.type ?
                                                                setdataupdate(prev => ({
                                                                    ...prev,
                                                                    work: {
                                                                        ...prev.work,
                                                                        add_columns: [...prev.work.add_columns, tempcolumnmatriks]
                                                                    }
                                                                }))
                                                                :
                                                                setdataupdate(prev => ({
                                                                    ...prev,
                                                                    work: {
                                                                        ...prev.work,
                                                                        columns: [...prev.work.columns, tempcolumnmatriks]
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
                                                        <RadioNotRequired label="Baris" defaultValue={datadisplay.is_general} onChangeRadio={(e) => {
                                                            setisbarismatriks(e.target.value);
                                                            setdatadisplay(prev => ({
                                                                ...prev,
                                                                is_general: e.target.value
                                                            }))
                                                            setdataupdate(prev => ({
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
                                                                datadisplay.rows.map((doc2, idx2) => {
                                                                    return (
                                                                        <div key={idx2} className="flex items-center justify-between mb-2"
                                                                        >
                                                                            {/* <div className="cursor-pointer font-bold mr-2">
                                                                                ::
                                                                            </div> */}
                                                                            <div className="flex items-center">
                                                                                {doc2}
                                                                            </div>
                                                                            <div className=' cursor-pointer flex items-center' onClick={() => {
                                                                                var temp = [...datadisplay.rows]
                                                                                temp.splice(idx2, 1)
                                                                                setdatadisplay(prev => ({
                                                                                    ...prev,
                                                                                    rows: temp
                                                                                }))
                                                                                prevtype === datadisplay.type ?
                                                                                    setdataupdate(prev => ({
                                                                                        ...prev,
                                                                                        work: {
                                                                                            ...prev.work,
                                                                                            delete_rows: [...prev.work.delete_rows, idx2]
                                                                                        }
                                                                                    }))
                                                                                    :
                                                                                    setdataupdate(prev => ({
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
                                                                    setdatadisplay(prev => ({
                                                                        ...prev,
                                                                        rows: [...prev.rows, temprowmatriks]
                                                                    }))
                                                                    prevtype === datadisplay.type ?
                                                                        setdataupdate(prev => ({
                                                                            ...prev,
                                                                            work: {
                                                                                ...prev.work,
                                                                                add_rows: [...prev.work.add_rows, temprowmatriks]
                                                                            }
                                                                        }))
                                                                        :
                                                                        setdataupdate(prev => ({
                                                                            ...prev,
                                                                            work: {
                                                                                ...prev.work,
                                                                                rows: [...prev.work.rows, temprowmatriks]
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
                                            datadisplay.type === 5 &&
                                            <div className='flex flex-col mb-3 col-span-2'>
                                                {
                                                    datadisplay.lists.map((doc3, idx3) => {
                                                        return (
                                                            <div className="flex items-center mb-4">
                                                                <div className='flex flex-col'>
                                                                    <div className="flex mb-2">
                                                                        <div className="w-7/12 mr-2">
                                                                            <Input placeholder="Nilai (Diisi staff)" disabled></Input>
                                                                        </div>
                                                                        <div className="w-5/12">
                                                                            <Select placeholder={`Satuan`} name={`numeral`} value={doc3.type} style={{ width: `100%` }} onChange={async (value) => {
                                                                                var tempdisplay = [...datadisplay.lists]
                                                                                tempdisplay[idx3] = ({ ...doc3, type: value })
                                                                                setdatadisplay(prev => ({
                                                                                    ...prev,
                                                                                    lists: tempdisplay
                                                                                }))
                                                                                if (prevtype === datadisplay.type) {
                                                                                    if (idx3 - (dynamniclen - 1) <= 0) {
                                                                                        var templists = [...dataupdate.work.update_rows]
                                                                                        var idxupdaterows = dataupdate.work.update_rows.map(doc => doc.number).indexOf(idx3)
                                                                                        idxupdaterows === -1 ?
                                                                                            templists.push({ ...doc3, number: idx3, type: value })
                                                                                            :
                                                                                            templists[idxupdaterows] = ({ ...doc3, number: idx3, type: value })
                                                                                        setdataupdate(prev => ({
                                                                                            ...prev,
                                                                                            work: {
                                                                                                ...prev.work,
                                                                                                update_rows: templists
                                                                                            }
                                                                                        }))
                                                                                    }
                                                                                    else {
                                                                                        var templists = [...dataupdate.work.add_rows]
                                                                                        templists[idx3 - dynamniclen] = { ...doc3, type: value }
                                                                                        setdataupdate(prev => ({
                                                                                            ...prev,
                                                                                            work: {
                                                                                                ...prev.work,
                                                                                                add_rows: templists
                                                                                            }
                                                                                        }))
                                                                                    }
                                                                                }
                                                                                else {
                                                                                    setdataupdate(prev => ({
                                                                                        ...prev,
                                                                                        work: {
                                                                                            ...prev.work,
                                                                                            rows: tempdisplay
                                                                                        }
                                                                                    }))
                                                                                }
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
                                                                        <div className=' w-10/12'>
                                                                            <Input placeholder="Keterangan" value={doc3.description} onChange={(e) => {
                                                                                var tempdisplay = [...datadisplay.lists]
                                                                                tempdisplay[idx3] = ({ ...doc3, description: e.target.value })
                                                                                setdatadisplay(prev => ({
                                                                                    ...prev,
                                                                                    lists: tempdisplay
                                                                                }))
                                                                                if (prevtype === datadisplay.type) {
                                                                                    if (idx3 - (dynamniclen - 1) <= 0) {
                                                                                        var templists = [...dataupdate.work.update_rows]
                                                                                        var idxupdaterows = dataupdate.work.update_rows.map(doc => doc.number).indexOf(idx3)
                                                                                        idxupdaterows === -1 ?
                                                                                            templists.push({ ...doc3, number: idx3, description: e.target.value })
                                                                                            :
                                                                                            templists[idxupdaterows] = ({ ...doc3, number: idx3, description: e.target.value })
                                                                                        setdataupdate(prev => ({
                                                                                            ...prev,
                                                                                            work: {
                                                                                                ...prev.work,
                                                                                                update_rows: templists
                                                                                            }
                                                                                        }))
                                                                                    }
                                                                                    else {
                                                                                        var templists = [...dataupdate.work.add_rows]
                                                                                        templists[idx3 - dynamniclen] = { ...doc3, description: e.target.value }
                                                                                        setdataupdate(prev => ({
                                                                                            ...prev,
                                                                                            work: {
                                                                                                ...prev.work,
                                                                                                add_rows: templists
                                                                                            }
                                                                                        }))
                                                                                    }
                                                                                }
                                                                                else {
                                                                                    setdataupdate(prev => ({
                                                                                        ...prev,
                                                                                        work: {
                                                                                            ...prev.work,
                                                                                            rows: tempdisplay
                                                                                        }
                                                                                    }))
                                                                                }
                                                                            }}></Input>
                                                                        </div>
                                                                        <div className=' w-2/12 cursor-pointer flex justify-center items-center' onClick={() => {
                                                                            var temp = [...datadisplay.lists]
                                                                            temp.splice(idx3, 1)
                                                                            setdatadisplay(prev => ({
                                                                                ...prev,
                                                                                lists: temp
                                                                            }))
                                                                            if (prevtype === datadisplay.type) {
                                                                                if (idx3 - (dynamniclen - 1) <= 0) {
                                                                                    setdataupdate(prev => ({
                                                                                        ...prev,
                                                                                        work: {
                                                                                            ...prev.work,
                                                                                            delete_rows: [...prev.work.delete_rows, dataupdate.work.lists.map(doc => doc.type).indexOf(doc3.type)]
                                                                                        }
                                                                                    }))
                                                                                    setdynamniclen(prev => prev - 1)
                                                                                }
                                                                                else {
                                                                                    var templists = [...dataupdate.work.add_rows]
                                                                                    templists.splice(idx3 - dynamniclen, 1)
                                                                                    setdataupdate(prev => ({
                                                                                        ...prev,
                                                                                        work: {
                                                                                            ...prev.work,
                                                                                            add_rows: templists
                                                                                        }
                                                                                    }))
                                                                                }
                                                                            }
                                                                            else {
                                                                                setdataupdate(prev => ({
                                                                                    ...prev,
                                                                                    work: {
                                                                                        ...prev.work,
                                                                                        rows: temp
                                                                                    }
                                                                                }))
                                                                            }
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
                                                        var tempdisplay = [...datadisplay.lists]
                                                        tempdisplay.push({ type: null, description: "" })
                                                        setdatadisplay(prev => ({
                                                            ...prev,
                                                            lists: tempdisplay
                                                        }))
                                                        if (prevtype === datadisplay.type) {
                                                            var templists = [...dataupdate.work.add_rows]
                                                            templists.push({ type: null, description: "" })
                                                            setdataupdate(prev => ({
                                                                ...prev,
                                                                work: {
                                                                    ...prev.work,
                                                                    add_rows: templists
                                                                }
                                                            }))
                                                        }
                                                        else {
                                                            setdataupdate(prev => ({
                                                                ...prev,
                                                                work: {
                                                                    ...prev.work,
                                                                    rows: tempdisplay
                                                                }
                                                            }))
                                                        }
                                                    }}>
                                                        <h1 className='font-semibold text-sm hover:text-primary100'>+ Tambah Item</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {
                                            datadisplay.type === 6 &&
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
                                                        <Input value={datadisplay.dropdown_name} onChange={(e) => {
                                                            setdatadisplay(prev => ({
                                                                ...prev,
                                                                dropdown_name: e.target.value
                                                            }))
                                                            setdataupdate(prev => ({
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
                                                    datadisplay.lists.map((doc4, idx4) => {
                                                        return (
                                                            <div key={idx4} className=" px-3 flex items-center mb-2">
                                                                <div className="flex items-center mr-2">
                                                                    <Input placeholder="Tambah" value={doc4} onChange={(e) => {
                                                                        var tempdisplay = [...datadisplay.lists]
                                                                        tempdisplay[idx4] = e.target.value
                                                                        setdatadisplay(prev => ({
                                                                            ...prev,
                                                                            lists: tempdisplay
                                                                        }))
                                                                        if (prevtype === datadisplay.type) {
                                                                            if (idx4 - (dynamniclen - 1) <= 0) {
                                                                                var templists = [...dataupdate.work.update_rows]
                                                                                var idxupdaterows = dataupdate.work.update_rows.map(doc => doc.number).indexOf(idx4)
                                                                                idxupdaterows === -1 ?
                                                                                    templists.push({ number: idx4, value: e.target.value })
                                                                                    :
                                                                                    templists[idxupdaterows] = ({ number: idx4, value: e.target.value })
                                                                                setdataupdate(prev => ({
                                                                                    ...prev,
                                                                                    work: {
                                                                                        ...prev.work,
                                                                                        update_rows: templists
                                                                                    }
                                                                                }))
                                                                            }
                                                                            else {
                                                                                var templists = [...dataupdate.work.add_rows]
                                                                                templists[idx4 - dynamniclen] = e.target.value
                                                                                setdataupdate(prev => ({
                                                                                    ...prev,
                                                                                    work: {
                                                                                        ...prev.work,
                                                                                        add_rows: templists
                                                                                    }
                                                                                }))
                                                                            }
                                                                        }
                                                                        else {
                                                                            setdataupdate(prev => ({
                                                                                ...prev,
                                                                                work: {
                                                                                    ...prev.work,
                                                                                    rows: tempdisplay
                                                                                }
                                                                            }))
                                                                        }
                                                                    }} bordered={false}
                                                                    />
                                                                </div>
                                                                <div className=' cursor-pointer flex items-center' onClick={() => {
                                                                    var temp = [...datadisplay.lists]
                                                                    temp.splice(idx4, 1)
                                                                    setdatadisplay(prev => ({
                                                                        ...prev,
                                                                        lists: temp
                                                                    }))
                                                                    if (prevtype === datadisplay.type) {
                                                                        if (idx4 - (dynamniclen - 1) <= 0) {
                                                                            setdataupdate(prev => ({
                                                                                ...prev,
                                                                                work: {
                                                                                    ...prev.work,
                                                                                    delete_rows: [...prev.work.delete_rows, dataupdate.work.lists.indexOf(doc4)]
                                                                                }
                                                                            }))
                                                                            setdynamniclen(prev => prev - 1)
                                                                        }
                                                                        else {
                                                                            var templists = [...dataupdate.work.add_rows]
                                                                            templists.splice(idx4 - dynamniclen, 1)
                                                                            setdataupdate(prev => ({
                                                                                ...prev,
                                                                                work: {
                                                                                    ...prev.work,
                                                                                    add_rows: templists
                                                                                }
                                                                            }))
                                                                        }
                                                                    }
                                                                    else {
                                                                        setdataupdate(prev => ({
                                                                            ...prev,
                                                                            work: {
                                                                                ...prev.work,
                                                                                rows: temp
                                                                            }
                                                                        }))
                                                                    }
                                                                }}>
                                                                    <CircleXIconSvg size={15} color={`#BF4A40`} />
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <div className="flex items-center px-3">
                                                    <div className="mr-1 cursor-pointer hover:text-primary100" onClick={() => {
                                                        var tempdisplay = [...datadisplay.lists]
                                                        tempdisplay.push("")
                                                        setdatadisplay(prev => ({
                                                            ...prev,
                                                            lists: tempdisplay
                                                        }))
                                                        if (prevtype === datadisplay.type) {
                                                            var templists = [...dataupdate.work.add_rows]
                                                            templists.push("")
                                                            setdataupdate(prev => ({
                                                                ...prev,
                                                                work: {
                                                                    ...prev.work,
                                                                    add_rows: templists
                                                                }
                                                            }))
                                                        }
                                                        else {
                                                            setdataupdate(prev => ({
                                                                ...prev,
                                                                work: {
                                                                    ...prev.work,
                                                                    rows: tempdisplay
                                                                }
                                                            }))
                                                        }
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

export default DrawerTaskDetailUpdate