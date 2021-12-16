import React, { useState, useEffect } from 'react'
import DrawerCore from '../drawerCore'
import { InputRequired, TextAreaRequired, RadioNotRequired } from '../../input'
import { Spin, notification, Input, Select, Empty, Checkbox } from 'antd'
import { AlignJustifiedIconSvg, BorderAllSvg, CheckboxIconSvg, CopyIconSvg, ListNumbersSvg, RulerIconSvg, TrashIconSvg } from '../../icon'
import { Label, H2 } from '../../typography'

const DrawerTaskTypesUpdate = ({ title, id, loading, visible, dataDisplay, onvisible, onClose, buttonOkText, disabled, initProps }) => {
    //USESTATE
    const [datadisplay, setdatadisplay] = useState({
        id: "",
        name: "",
        description: "",
        works: []
    })
    const [dataupdate, setdataupdate] = useState({
        id: "",
        name: "",
        description: "",
        add_works: [],
        update_works: [],
        delete_works: []
    })
    const [loadingdetailtipetaskupdate, setloadingdetailtipetaskupdate] = useState(false)
    const [loadingupdate, setloadingupdate] = useState(false)
    const [disabledupdate, setdisabledupdate] = useState(true)
    const [disabledtrigger, setdisabledtrigger] = useState(-1)
    const [deletestate, setdeletestate] = useState(false)
    const [workslen, setworkslen] = useState(0)
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
    const handleUpdateTipeTask = () => {
        // console.log(datadisplay, dataupdate, workslen)
        setloadingupdate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateTaskType`, {
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
            setloadingdetailtipetaskupdate(true)
            fetch(`https://boiling-thicket-46501.herokuapp.com/getTaskType?id=${id}`, {
                method: `GET`,
                headers: {
                    'Authorization': JSON.parse(initProps),
                },
            })
                .then(res => res.json())
                .then(res2 => {
                    const worksmap = res2.data.works.map((doc, idx) => {
                        var temp = {
                            ...doc,
                            ...doc.details
                        }
                        delete temp.details
                        return (temp)
                    })
                    setworkslen(worksmap.length)
                    setdatadisplay({
                        ...res2.data,
                        works: worksmap
                    })
                    setdataupdate(prev => ({
                        ...prev,
                        id: res2.data.id,
                        name: res2.data.name,
                        description: res2.data.description
                    }))
                    res2.data.name !== "" && res2.data.description !== "" ? setdisabledupdate(false) : setdisabledupdate(true)
                    setloadingdetailtipetaskupdate(false)
                })
        }
    }, [id])
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
                    id: "",
                    name: "",
                    description: "",
                    add_works: [],
                    update_works: [],
                    delete_works: []
                })
                onvisible(false)
            }}
            buttonOkText={buttonOkText}
            onClick={handleUpdateTipeTask}
            disabled={disabledupdate}
        >
            {
                loadingdetailtipetaskupdate ?
                    <>
                        <Spin />
                    </>
                    :
                    <Spin spinning={loadingupdate}>
                        <div className='flex flex-col'>
                            <div className="mb-8">
                                <p className="mb-0 text-red-500 text-xs italic">*Informasi ini harus diisi</p>
                            </div>
                            <div className="flex flex-col">
                                <InputRequired name="name" defaultValue={datadisplay.name} onChangeInput={onChangeInput} label="Judul Tipe Task"></InputRequired>
                                <TextAreaRequired name="description" defaultValue={datadisplay.description} onChangeInput={onChangeInput} label="Deskripsi Tipe Task"></TextAreaRequired>
                            </div>
                            <div className="flex flex-col px-3 mb-5">
                                <div className="flex mb-5">
                                    <Label>Pekerjaan</Label>
                                </div>
                                {
                                    datadisplay.works.length === 0 ?
                                        <>
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Pekerjaan masih kosong" />
                                        </>
                                        :
                                        <>
                                            {
                                                deletestate ?
                                                    null
                                                    :
                                                    datadisplay.works.map((doc, idx) => {
                                                        return (
                                                            <div key={idx} className='bg-white flex flex-col shadow-md rounded-md p-3 mb-4 border'>
                                                                <div className="flex justify-center text-lg font-bold mb-3">
                                                                    <div className="cursor-pointer">
                                                                        :::
                                                                    </div>
                                                                </div>
                                                                <div key={idx} className="grid grid-cols-2 mb-3">
                                                                    <div className="col-span-1 mr-1">
                                                                        <Input value={doc.name} placeholder="Nama" onChange={(e) => {
                                                                            const tempdisplay = [...datadisplay.works]
                                                                            tempdisplay[idx].name = e.target.value
                                                                            setdatadisplay(prev => ({
                                                                                ...prev,
                                                                                works: tempdisplay
                                                                            }))
                                                                            if (doc.id) {
                                                                                var idxdataupdate = dataupdate.update_works.map(docmap => docmap.id).indexOf(doc.id)
                                                                                if (idxdataupdate === -1) {
                                                                                    setdataupdate(prev => ({
                                                                                        ...prev,
                                                                                        update_works: [...prev.update_works, { ...doc, name: e.target.value }]
                                                                                    }))
                                                                                }
                                                                                else {
                                                                                    var temp = [...dataupdate.update_works]
                                                                                    temp[idxdataupdate].name = e.target.value
                                                                                    setdataupdate(prev => ({
                                                                                        ...prev,
                                                                                        update_works: temp
                                                                                    }))
                                                                                }
                                                                            }
                                                                            else {
                                                                                var temp = [...dataupdate.add_works]
                                                                                temp[idx - workslen].name = e.target.value
                                                                                setdataupdate(prev => ({
                                                                                    ...prev,
                                                                                    add_works: temp
                                                                                }))
                                                                            }
                                                                        }}></Input>
                                                                    </div>
                                                                    <div className="col-span-1 ml-1 mb-3">
                                                                        <Select key={idx} name={`name`} value={doc.type} style={{ width: `100%` }} onChange={(value) => {
                                                                            const tempdisplay = [...datadisplay.works]
                                                                            delete tempdisplay[idx].lists
                                                                            delete tempdisplay[idx].is_general
                                                                            delete tempdisplay[idx].columns
                                                                            delete tempdisplay[idx].rows
                                                                            delete tempdisplay[idx].dropdown_name
                                                                            tempdisplay[idx].type = value
                                                                            if (value === 3) {
                                                                                tempdisplay[idx].lists = []
                                                                            }
                                                                            else if (value === 4) {
                                                                                tempdisplay[idx].is_general = false
                                                                                tempdisplay[idx].columns = []
                                                                                tempdisplay[idx].rows = []
                                                                            }
                                                                            else if (value === 5) {
                                                                                tempdisplay[idx].lists = []
                                                                            }
                                                                            else if (value === 6) {
                                                                                tempdisplay[idx].lists = []
                                                                                tempdisplay[idx].dropdown_name = ""
                                                                            }
                                                                            setdatadisplay(prev => ({
                                                                                ...prev,
                                                                                works: tempdisplay
                                                                            }))
                                                                            if (doc.id) {
                                                                                var idxdataupdate = dataupdate.update_works.map(docmap => docmap.id).indexOf(doc.id)
                                                                                if (idxdataupdate === -1) {
                                                                                    setdataupdate(prev => ({
                                                                                        ...prev,
                                                                                        update_works: [...prev.update_works, { ...tempdisplay[idx] }]
                                                                                    }))
                                                                                }
                                                                                else {
                                                                                    var temp2 = [...dataupdate.update_works]
                                                                                    temp2[idxdataupdate] = tempdisplay[idx]
                                                                                    setdataupdate(prev => ({
                                                                                        ...prev,
                                                                                        update_works: temp2
                                                                                    }))
                                                                                }
                                                                            }
                                                                            else {
                                                                                var temp2 = [...dataupdate.add_works]
                                                                                temp2[idx - workslen] = tempdisplay[idx]
                                                                                setdataupdate(prev => ({
                                                                                    ...prev,
                                                                                    add_works: temp2
                                                                                }))
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
                                                                        <Input placeholder="Deskripsi" value={doc.description} onChange={(e) => {
                                                                            var tempdisplay = [...datadisplay.works]
                                                                            tempdisplay[idx].description = e.target.value
                                                                            setdatadisplay(prev => ({
                                                                                ...prev,
                                                                                works: tempdisplay
                                                                            }))
                                                                            if (doc.id) {
                                                                                var idxdataupdate = dataupdate.update_works.map(docmap => docmap.id).indexOf(doc.id)
                                                                                if (idxdataupdate === -1) {
                                                                                    setdataupdate(prev => ({
                                                                                        ...prev,
                                                                                        update_works: [...prev.update_works, { ...doc, description: e.target.value }]
                                                                                    }))
                                                                                }
                                                                                else {
                                                                                    var temp = [...dataupdate.update_works]
                                                                                    temp[idxdataupdate].description = e.target.value
                                                                                    setdataupdate(prev => ({
                                                                                        ...prev,
                                                                                        update_works: temp
                                                                                    }))
                                                                                }
                                                                            }
                                                                            else {
                                                                                var temp = [...dataupdate.add_works]
                                                                                temp[idx - workslen].description = e.target.value
                                                                                setdataupdate(prev => ({
                                                                                    ...prev,
                                                                                    add_works: temp
                                                                                }))
                                                                            }
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
                                                                                            <div key={idx2} className="flex items-center mb-2"
                                                                                            >
                                                                                                <div className="cursor-pointer font-bold mr-2">
                                                                                                    ::
                                                                                                </div>
                                                                                                <div className="flex items-center mr-2">
                                                                                                    <Checkbox style={{ marginRight: `0.5rem` }} checked />
                                                                                                    {doc2}
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                                }
                                                                                <div className="flex items-center">
                                                                                    <div className="mr-1 cursor-pointer hover:text-primary100" onClick={() => {
                                                                                        settempcb("")
                                                                                        var tempdisplay = [...datadisplay.works]
                                                                                        tempdisplay[idx].lists.push(tempcb)
                                                                                        setdatadisplay(prev => ({
                                                                                            ...prev,
                                                                                            works: tempdisplay
                                                                                        }))
                                                                                        if (doc.id) {
                                                                                            var idxdataupdate = dataupdate.update_works.map(docmap => docmap.id).indexOf(doc.id)
                                                                                            if (idxdataupdate === -1) {
                                                                                                setdataupdate(prev => ({
                                                                                                    ...prev,
                                                                                                    update_works: [...prev.update_works, { ...doc, lists: tempdisplay[idx].lists }]
                                                                                                }))
                                                                                            }
                                                                                            else {
                                                                                                var temp2 = [...dataupdate.update_works]
                                                                                                temp2[idxdataupdate].lists = tempdisplay[idx].lists
                                                                                                setdataupdate(prev => ({
                                                                                                    ...prev,
                                                                                                    update_works: temp2
                                                                                                }))
                                                                                            }
                                                                                        }
                                                                                        else {
                                                                                            var temp2 = [...dataupdate.add_works]
                                                                                            temp2[idx - workslen].lists = tempdisplay[idx].lists
                                                                                            setdataupdate(prev => ({
                                                                                                ...prev,
                                                                                                add_works: temp2
                                                                                            }))
                                                                                        }
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
                                                                        doc.type === 4 &&
                                                                        <div className="flex flex-col mb-3 col-span-2">
                                                                            <div className="mb-3 flex flex-col">
                                                                                <div className="mb-2">
                                                                                    <Label>Kolom</Label>
                                                                                </div>
                                                                                {
                                                                                    doc.columns.map((doc2, idx2) => {
                                                                                        return (
                                                                                            <div key={idx2} className="flex items-center mb-2"
                                                                                            >
                                                                                                <div className="cursor-pointer font-bold mr-2">
                                                                                                    ::
                                                                                                </div>
                                                                                                <div className="flex items-center mr-2">
                                                                                                    {doc2}
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                                }
                                                                                <div className="flex items-center">
                                                                                    <div className="mr-1 cursor-pointer hover:text-primary100" onClick={() => {
                                                                                        settempcolumnmatriks("")
                                                                                        var tempdisplay = [...datadisplay.works]
                                                                                        tempdisplay[idx].columns.push(tempcolumnmatriks)
                                                                                        setdatadisplay(prev => ({
                                                                                            ...prev,
                                                                                            works: tempdisplay
                                                                                        }))
                                                                                        if (doc.id) {
                                                                                            var idxdataupdate = dataupdate.update_works.map(docmap => docmap.id).indexOf(doc.id)
                                                                                            if (idxdataupdate === -1) {
                                                                                                setdataupdate(prev => ({
                                                                                                    ...prev,
                                                                                                    update_works: [...prev.update_works, { ...doc, columns: tempdisplay[idx].columns }]
                                                                                                }))
                                                                                            }
                                                                                            else {
                                                                                                var temp2 = [...dataupdate.update_works]
                                                                                                temp2[idxdataupdate].columns = tempdisplay[idx].columns
                                                                                                setdataupdate(prev => ({
                                                                                                    ...prev,
                                                                                                    update_works: temp2
                                                                                                }))
                                                                                            }
                                                                                        }
                                                                                        else {
                                                                                            var temp2 = [...dataupdate.add_works]
                                                                                            temp2[idx - workslen].columns = tempdisplay[idx].columns
                                                                                            setdataupdate(prev => ({
                                                                                                ...prev,
                                                                                                add_works: temp2
                                                                                            }))
                                                                                        }
                                                                                    }}>
                                                                                        <H2>+</H2>
                                                                                    </div>
                                                                                    <Input placeholder="Tambah" value={tempcolumnmatriks} onChange={(e) => { settempcolumnmatriks(e.target.value) }} bordered={false} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="mb-3 flex flex-col">
                                                                                <div className="mb-2">
                                                                                    <RadioNotRequired label="Baris" value={doc.is_general} onChangeRadio={(e) => {
                                                                                        setisbarismatriks(e.target.value);
                                                                                        var tempdisplay = [...datadisplay.works]
                                                                                        tempdisplay[idx].is_general = e.target.value
                                                                                        setdatadisplay(prev => ({
                                                                                            ...prev,
                                                                                            works: tempdisplay
                                                                                        }))
                                                                                        if (doc.id) {
                                                                                            var idxdataupdate = dataupdate.update_works.map(docmap => docmap.id).indexOf(doc.id)
                                                                                            if (idxdataupdate === -1) {
                                                                                                setdataupdate(prev => ({
                                                                                                    ...prev,
                                                                                                    update_works: [...prev.update_works, { ...doc, is_general: tempdisplay[idx].is_general }]
                                                                                                }))
                                                                                            }
                                                                                            else {
                                                                                                var temp2 = [...dataupdate.update_works]
                                                                                                temp2[idxdataupdate].is_general = tempdisplay[idx].is_general
                                                                                                setdataupdate(prev => ({
                                                                                                    ...prev,
                                                                                                    update_works: temp2
                                                                                                }))
                                                                                            }
                                                                                        }
                                                                                        else {
                                                                                            var temp2 = [...dataupdate.add_works]
                                                                                            temp2[idx - workslen].is_general = tempdisplay[idx].is_general
                                                                                            setdataupdate(prev => ({
                                                                                                ...prev,
                                                                                                add_works: temp2
                                                                                            }))
                                                                                        }
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
                                                                                                    <div key={idx2} className="flex items-center mb-2"
                                                                                                    >
                                                                                                        <div className="cursor-pointer font-bold mr-2">
                                                                                                            ::
                                                                                                        </div>
                                                                                                        <div className="flex items-center mr-2">
                                                                                                            {doc2}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                        <div className="flex items-center">
                                                                                            <div className="mr-1 cursor-pointer hover:text-primary100" onClick={() => {
                                                                                                settemprowmatriks("")
                                                                                                var tempdisplay = [...datadisplay.works]
                                                                                                tempdisplay[idx].rows.push(temprowmatriks)
                                                                                                setdatadisplay(prev => ({
                                                                                                    ...prev,
                                                                                                    works: tempdisplay
                                                                                                }))
                                                                                                if (doc.id) {
                                                                                                    var idxdataupdate = dataupdate.update_works.map(docmap => docmap.id).indexOf(doc.id)
                                                                                                    if (idxdataupdate === -1) {
                                                                                                        setdataupdate(prev => ({
                                                                                                            ...prev,
                                                                                                            update_works: [...prev.update_works, { ...doc, rows: tempdisplay[idx].rows }]
                                                                                                        }))
                                                                                                    }
                                                                                                    else {
                                                                                                        var temp2 = [...dataupdate.update_works]
                                                                                                        temp2[idxdataupdate].rows = tempdisplay[idx].rows
                                                                                                        setdataupdate(prev => ({
                                                                                                            ...prev,
                                                                                                            update_works: temp2
                                                                                                        }))
                                                                                                    }
                                                                                                }
                                                                                                else {
                                                                                                    var temp2 = [...dataupdate.add_works]
                                                                                                    temp2[idx - workslen].rows = tempdisplay[idx].rows
                                                                                                    setdataupdate(prev => ({
                                                                                                        ...prev,
                                                                                                        add_works: temp2
                                                                                                    }))
                                                                                                }
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
                                                                        doc.type === 5 &&
                                                                        <div className='flex flex-col mb-3 col-span-2'>
                                                                            {
                                                                                doc.lists.map((doc3, idx3) => {
                                                                                    return (
                                                                                        <div className="flex items-center mb-4">
                                                                                            <div className="cursor-pointer font-bold mr-2">
                                                                                                ::
                                                                                            </div>
                                                                                            <div className='flex flex-col'>
                                                                                                <div className="flex mb-2">
                                                                                                    <div className="w-7/12 mr-2">
                                                                                                        <Input placeholder="Nilai (Diisi staff)" disabled></Input>
                                                                                                    </div>
                                                                                                    <div className="w-5/12">
                                                                                                        <Select placeholder={`Satuan`} name={`numeral`} value={doc3.type} style={{ width: `100%` }} onChange={async (value) => {
                                                                                                            var tempdisplay = [...datadisplay.works]
                                                                                                            tempdisplay[idx].lists[idx3] = ({ ...doc3, type: value })
                                                                                                            setdatadisplay(prev => ({
                                                                                                                ...prev,
                                                                                                                works: tempdisplay
                                                                                                            }))
                                                                                                            if (doc.id) {
                                                                                                                var idxdataupdate = dataupdate.update_works.map(docmap => docmap.id).indexOf(doc.id)
                                                                                                                if (idxdataupdate === -1) {
                                                                                                                    setdataupdate(prev => ({
                                                                                                                        ...prev,
                                                                                                                        update_works: [...prev.update_works, { ...doc, lists: tempdisplay[idx].lists }]
                                                                                                                    }))
                                                                                                                }
                                                                                                                else {
                                                                                                                    var temp2 = [...dataupdate.update_works]
                                                                                                                    temp2[idxdataupdate].lists = tempdisplay[idx].lists
                                                                                                                    setdataupdate(prev => ({
                                                                                                                        ...prev,
                                                                                                                        update_works: temp2
                                                                                                                    }))
                                                                                                                }
                                                                                                            }
                                                                                                            else {
                                                                                                                var temp2 = [...dataupdate.add_works]
                                                                                                                temp2[idx - workslen].lists = tempdisplay[idx].lists
                                                                                                                setdataupdate(prev => ({
                                                                                                                    ...prev,
                                                                                                                    add_works: temp2
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
                                                                                                    <Input placeholder="Keterangan" value={doc3.description} onChange={(e) => {
                                                                                                        var tempdisplay = [...datadisplay.works]
                                                                                                        tempdisplay[idx].lists[idx3] = ({ ...doc3, description: e.target.value })
                                                                                                        setdatadisplay(prev => ({
                                                                                                            ...prev,
                                                                                                            works: tempdisplay
                                                                                                        }))
                                                                                                        if (doc.id) {
                                                                                                            var idxdataupdate = dataupdate.update_works.map(docmap => docmap.id).indexOf(doc.id)
                                                                                                            if (idxdataupdate === -1) {
                                                                                                                setdataupdate(prev => ({
                                                                                                                    ...prev,
                                                                                                                    update_works: [...prev.update_works, { ...doc, lists: tempdisplay[idx].lists }]
                                                                                                                }))
                                                                                                            }
                                                                                                            else {
                                                                                                                var temp2 = [...dataupdate.update_works]
                                                                                                                temp2[idxdataupdate].lists = tempdisplay[idx].lists
                                                                                                                setdataupdate(prev => ({
                                                                                                                    ...prev,
                                                                                                                    update_works: temp2
                                                                                                                }))
                                                                                                            }
                                                                                                        }
                                                                                                        else {
                                                                                                            var temp2 = [...dataupdate.add_works]
                                                                                                            temp2[idx - workslen].lists = tempdisplay[idx].lists
                                                                                                            setdataupdate(prev => ({
                                                                                                                ...prev,
                                                                                                                add_works: temp2
                                                                                                            }))
                                                                                                        }
                                                                                                    }}></Input>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                            <div className='flex items-center'>
                                                                                <div className="mr-1 cursor-pointer hover:text-primary100" onClick={() => {
                                                                                    var tempdisplay = [...datadisplay.works]
                                                                                    tempdisplay[idx].lists.push({ type: null, description: "" })
                                                                                    setdatadisplay(prev => ({
                                                                                        ...prev,
                                                                                        works: tempdisplay
                                                                                    }))
                                                                                    if (doc.id) {
                                                                                        var idxdataupdate = dataupdate.update_works.map(docmap => docmap.id).indexOf(doc.id)
                                                                                        if (idxdataupdate === -1) {
                                                                                            setdataupdate(prev => ({
                                                                                                ...prev,
                                                                                                update_works: [...prev.update_works, { ...doc, lists: tempdisplay[idx].lists }]
                                                                                            }))
                                                                                        }
                                                                                        else {
                                                                                            var temp2 = [...dataupdate.update_works]
                                                                                            temp2[idxdataupdate].lists = tempdisplay[idx].lists
                                                                                            setdataupdate(prev => ({
                                                                                                ...prev,
                                                                                                update_works: temp2
                                                                                            }))
                                                                                        }
                                                                                    }
                                                                                    else {
                                                                                        var temp2 = [...dataupdate.add_works]
                                                                                        temp2[idx - workslen].lists = tempdisplay[idx].lists
                                                                                        setdataupdate(prev => ({
                                                                                            ...prev,
                                                                                            add_works: temp2
                                                                                        }))
                                                                                    }
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
                                                                                        var tempdisplay = [...datadisplay.works]
                                                                                        tempdisplay[idx].dropdown_name = e.target.value
                                                                                        setdatadisplay(prev => ({
                                                                                            ...prev,
                                                                                            works: tempdisplay
                                                                                        }))
                                                                                        if (doc.id) {
                                                                                            var idxdataupdate = dataupdate.update_works.map(docmap => docmap.id).indexOf(doc.id)
                                                                                            if (idxdataupdate === -1) {
                                                                                                setdataupdate(prev => ({
                                                                                                    ...prev,
                                                                                                    update_works: [...prev.update_works, { ...doc, dropdown_name: tempdisplay[idx].dropdown_name }]
                                                                                                }))
                                                                                            }
                                                                                            else {
                                                                                                var temp2 = [...dataupdate.update_works]
                                                                                                temp2[idxdataupdate].dropdown_name = tempdisplay[idx].dropdown_name
                                                                                                setdataupdate(prev => ({
                                                                                                    ...prev,
                                                                                                    update_works: temp2
                                                                                                }))
                                                                                            }
                                                                                        }
                                                                                        else {
                                                                                            var temp2 = [...dataupdate.add_works]
                                                                                            temp2[idx - workslen].dropdown_name = tempdisplay[idx].dropdown_name
                                                                                            setdataupdate(prev => ({
                                                                                                ...prev,
                                                                                                add_works: temp2
                                                                                            }))
                                                                                        }
                                                                                    }}></Input>
                                                                                </div>
                                                                            </div>
                                                                            {
                                                                                doc.lists.map((doc4, idx4) => {
                                                                                    return (
                                                                                        <div key={idx4} className=" px-3 flex items-center mb-2">
                                                                                            <div className="cursor-pointer font-bold mr-2">
                                                                                                ::
                                                                                            </div>
                                                                                            <div className="flex items-center mr-2">
                                                                                                <Input placeholder="Tambah" value={doc4} onChange={(e) => {
                                                                                                    var tempdisplay = [...datadisplay.works]
                                                                                                    tempdisplay[idx].lists[idx4] = e.target.value
                                                                                                    setdatadisplay(prev => ({
                                                                                                        ...prev,
                                                                                                        works: tempdisplay
                                                                                                    }))
                                                                                                    if (doc.id) {
                                                                                                        var idxdataupdate = dataupdate.update_works.map(docmap => docmap.id).indexOf(doc.id)
                                                                                                        if (idxdataupdate === -1) {
                                                                                                            setdataupdate(prev => ({
                                                                                                                ...prev,
                                                                                                                update_works: [...prev.update_works, { ...doc, lists: tempdisplay[idx].lists }]
                                                                                                            }))
                                                                                                        }
                                                                                                        else {
                                                                                                            var temp2 = [...dataupdate.update_works]
                                                                                                            temp2[idxdataupdate].lists = tempdisplay[idx].lists
                                                                                                            setdataupdate(prev => ({
                                                                                                                ...prev,
                                                                                                                update_works: temp2
                                                                                                            }))
                                                                                                        }
                                                                                                    }
                                                                                                    else {
                                                                                                        var temp2 = [...dataupdate.add_works]
                                                                                                        temp2[idx - workslen].lists = tempdisplay[idx].lists
                                                                                                        setdataupdate(prev => ({
                                                                                                            ...prev,
                                                                                                            add_works: temp2
                                                                                                        }))
                                                                                                    }
                                                                                                }} bordered={false}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                            <div className="flex items-center px-3">
                                                                                <div className="mr-1 cursor-pointer hover:text-primary100" onClick={() => {
                                                                                    var tempdisplay = [...datadisplay.works]
                                                                                    tempdisplay[idx].lists.push("")
                                                                                    setdatadisplay(prev => ({
                                                                                        ...prev,
                                                                                        works: tempdisplay
                                                                                    }))
                                                                                    if (doc.id) {
                                                                                        var idxdataupdate = dataupdate.update_works.map(docmap => docmap.id).indexOf(doc.id)
                                                                                        if (idxdataupdate === -1) {
                                                                                            setdataupdate(prev => ({
                                                                                                ...prev,
                                                                                                update_works: [...prev.update_works, { ...doc, lists: tempdisplay[idx].lists }]
                                                                                            }))
                                                                                        }
                                                                                        else {
                                                                                            var temp2 = [...dataupdate.update_works]
                                                                                            temp2[idxdataupdate].lists = tempdisplay[idx].lists
                                                                                            setdataupdate(prev => ({
                                                                                                ...prev,
                                                                                                update_works: temp2
                                                                                            }))
                                                                                        }
                                                                                    }
                                                                                    else {
                                                                                        var temp2 = [...dataupdate.add_works]
                                                                                        temp2[idx - workslen].lists = tempdisplay[idx].lists
                                                                                        setdataupdate(prev => ({
                                                                                            ...prev,
                                                                                            add_works: temp2
                                                                                        }))
                                                                                    }
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
                                                                            var temp = [...datadisplay.works]
                                                                            temp.splice(idx + 1, 0, templastdata)
                                                                            setdatadisplay(prev => ({
                                                                                ...prev,
                                                                                works: temp
                                                                            }))
                                                                            setdataupdate(prev => ({
                                                                                ...prev,
                                                                                add_works: [...prev.add_works, templastdata]
                                                                            }))
                                                                        }}>
                                                                            <CopyIconSvg size={15} color={`#000000`} />
                                                                        </div>
                                                                        <div className="mx-1 cursor-pointer" onClick={async () => {
                                                                            setdeletestate(true)
                                                                            const temp = [...datadisplay.works]
                                                                            const temp2 = [...datadisplay.works]
                                                                            var tempp = temp.filter(dfil => { return dfil.id !== doc.id })
                                                                            setdatadisplay(prev => ({
                                                                                ...prev,
                                                                                works: [...tempp]
                                                                            }))
                                                                            temp2[idx].id ?
                                                                                (
                                                                                    setdataupdate(prev => ({
                                                                                        ...prev,
                                                                                        delete_works: [...prev.delete_works, temp2[idx].id]
                                                                                    })),
                                                                                    setworkslen(prev => prev - 1)
                                                                                )
                                                                                :
                                                                                setdataupdate(prev => ({
                                                                                    ...prev,
                                                                                    add_works: temp2.filter(dfil => typeof (dfil.id) === 'undefined' && dfil.name !== temp2[idx].name)
                                                                                }))
                                                                            setdeletestate(false)
                                                                        }}>
                                                                            <TrashIconSvg size={15} color={`#000000`} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                            }
                                        </>
                                }
                            </div>
                            <div className="mb-4 border border-dashed border-primary100 hover:border-primary75 py-2 flex justify-center items-center w-full rounded-md cursor-pointer" onClick={() => {
                                setdatadisplay(prev => ({
                                    ...prev,
                                    works: [...prev.works, { type: 1, name: "", description: "" }]
                                }))
                                setdataupdate(prev => ({
                                    ...prev,
                                    add_works: [...prev.add_works, { type: 1, name: "", description: "" }]
                                }))
                            }}>
                                <div className="text-primary100 hover:text-primary75">
                                    + Tambah Pekerjaan Baru
                                </div>
                            </div>
                        </div>
                    </Spin>
            }

        </DrawerCore>
    )
}

export default DrawerTaskTypesUpdate