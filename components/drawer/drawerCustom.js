import React, { useState, useEffect } from 'react'
import DrawerCore from './drawerCore'
import { AtmBank } from '../atm'
import { DateNotRequired, DateRequired, InputNotRequired, InputRequired, RadioRequired, TreeSelectRequired, TextAreaRequired, SelectNotRequired, RadioNotRequired } from '../input'
import { Spin, notification, Input, Select, TreeSelect, Empty, Checkbox } from 'antd'
import { AlignJustifiedIconSvg, BorderAllSvg, CameraIconSvg, CheckboxIconSvg, CircleXIconSvg, CopyIconSvg, EmailIconSvg, FaxIconSvg, ListNumbersSvg, NotesIconSvg, PkpIconSvg, RefreshIconSvg, RulerIconSvg, SquarePlusIconSvg, TrashIconSvg, WebIconSvg } from '../icon'
import { useRouter } from 'next/router'
import { Label, Text, H2 } from '../typography'
import ButtonSys from '../button'
import { LoadingOutlined, UpOutlined, DownOutlined } from '@ant-design/icons'
import moment from 'moment'

const DrawerBank = ({ title, visible, onClose, children, buttonOkText, initProps, onvisible }) => {
    const rt = useRouter()
    const [createdata, setcreatedata] = useState({
        name: '',
        account_number: '',
        owner: '',
        currency: '',
        color_first: "from-state1",
        color_second: "to-state2"
    })
    const [bankloading, setbankloading] = useState(false)
    const onChangeInput = (e) => {
        setcreatedata({
            ...createdata,
            [e.target.name]: e.target.value
        })
    }
    const onChangeRadio = (e) => {
        setcreatedata({
            ...createdata,
            [e.target.name]: e.target.value
        })
    }
    const handleCreateBank = () => {
        setbankloading(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addMainBank`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(createdata)
        })
            .then((res) => res.json())
            .then(res2 => {
                setbankloading(false)
                onvisible(false)
                if (res2.success) {
                    setcreatedata({
                        name: '',
                        account_number: '',
                        owner: '',
                        currency: '',
                        color_first: "from-state1",
                        color_second: "to-state2"
                    })
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        setbankloading(false)
                        rt.push(`/company/myCompany`)
                    }, 500)
                }
                else {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }
    return (
        <DrawerCore
            title={title}
            visible={visible}
            onClose={onClose}
            buttonOkText={buttonOkText}
            onClick={handleCreateBank}
        >
            <Spin spinning={bankloading}>
                <div className="flex flex-col">
                    <div className="flex justify-center items-center mb-5">
                        <AtmBank from={createdata.color_first} to={createdata.color_second}></AtmBank>
                        {/* {createdata.preset === 1 && <AtmBank from="from-state1" to="to-state2"></AtmBank>}
                        {createdata.preset === 2 && <AtmBank from="from-state3" to="to-state4"></AtmBank>}
                        {createdata.preset === 3 && <AtmBank from="from-red-200" to="to-red-600"></AtmBank>}
                        {createdata.preset === 4 && <AtmBank from="from-purple-600" to="to-pink-600"></AtmBank>} */}
                    </div>
                    <div className="flex justify-center mb-10">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-tl from-state1 to-state2 border cursor-pointer ${createdata.color_first === "from-state1" && "border-primary100"} mx-2`} onClick={() => { setcreatedata({ ...createdata, color_first: "from-state1", color_second: "to-state2" }) }}></div>
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-tl from-state3 to-state4 border cursor-pointer ${createdata.color_first === "from-state3" && "border-primary100"} mx-2`} onClick={() => { setcreatedata({ ...createdata, color_first: "from-state3", color_second: "to-state4" }) }}></div>
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-tl from-red-200 to-red-600 border cursor-pointer ${createdata.color_first === "from-red-200" && "border-primary100"} mx-2`} onClick={() => { setcreatedata({ ...createdata, color_first: "from-red-200", color_second: "to-red-600" }) }}></div>
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-tl from-purple-600 to-pink-600 border cursor-pointer ${createdata.color_first === "from-purple-600" && "border-primary100"} mx-2`} onClick={() => { setcreatedata({ ...createdata, color_first: "from-purple-600", color_second: "to-pink-600" }) }}></div>
                    </div>
                    <div className="flex flex-col ">
                        <InputRequired name="name" value={createdata.name} onChangeInput={onChangeInput} label="Nama Bank"></InputRequired>
                        <InputRequired name="account_number" value={createdata.account_number} onChangeInput={onChangeInput} label="Nomor Rekening"></InputRequired>
                        <InputRequired name="owner" value={createdata.owner} onChangeInput={onChangeInput} label="Nama Pemegang Rekening"></InputRequired>
                        <RadioRequired name="currency" label="Mata Uang" onChangeRadio={onChangeRadio} options={
                            [
                                {
                                    value: "IDR",
                                    title: "IDR"
                                },
                                {
                                    value: 'USD',
                                    title: "USD"
                                }
                            ]
                        }></RadioRequired>
                    </div>
                </div>
            </Spin>
        </DrawerCore>
    )
}

const DrawerBankClient = ({ title, visible, onClose, children, buttonOkText, initProps, onvisible, companyid }) => {
    const rt = useRouter()
    const [createdata, setcreatedata] = useState({
        company_id: Number(companyid),
        name: '',
        account_number: '',
        owner: '',
        currency: '',
        color_first: "from-state1",
        color_second: "to-state2"
    })
    const [bankloading, setbankloading] = useState(false)
    const onChangeInput = (e) => {
        setcreatedata({
            ...createdata,
            [e.target.name]: e.target.value
        })
    }
    const onChangeRadio = (e) => {
        setcreatedata({
            ...createdata,
            [e.target.name]: e.target.value
        })
    }
    const handleCreateBank = () => {
        setbankloading(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addClientBank`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(createdata)
        })
            .then((res) => res.json())
            .then(res2 => {
                setbankloading(false)
                onvisible(false)
                if (res2.success) {
                    setcreatedata({
                        name: '',
                        account_number: '',
                        owner: '',
                        currency: '',
                        color_first: "from-state1",
                        color_second: "to-state2"
                    })
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        setbankloading(false)
                        rt.push(`/company/clients/${companyid}`)
                    }, 500)
                }
                else {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }
    return (
        <DrawerCore
            title={title}
            visible={visible}
            onClose={onClose}
            buttonOkText={buttonOkText}
            onClick={handleCreateBank}
        >
            <Spin spinning={bankloading}>
                <div className="flex flex-col">
                    <div className="flex justify-center items-center mb-5">
                        <AtmBank from={createdata.color_first} to={createdata.color_second}></AtmBank>
                        {/* {createdata.preset === 1 && <AtmBank from="from-state1" to="to-state2"></AtmBank>}
                        {createdata.preset === 2 && <AtmBank from="from-state3" to="to-state4"></AtmBank>}
                        {createdata.preset === 3 && <AtmBank from="from-red-200" to="to-red-600"></AtmBank>}
                        {createdata.preset === 4 && <AtmBank from="from-purple-600" to="to-pink-600"></AtmBank>} */}
                    </div>
                    <div className="flex justify-center mb-10">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-tl from-state1 to-state2 border cursor-pointer ${createdata.color_first === "from-state1" && "border-primary100"} mx-2`} onClick={() => { setcreatedata({ ...createdata, color_first: "from-state1", color_second: "to-state2" }) }}></div>
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-tl from-state3 to-state4 border cursor-pointer ${createdata.color_first === "from-state3" && "border-primary100"} mx-2`} onClick={() => { setcreatedata({ ...createdata, color_first: "from-state3", color_second: "to-state4" }) }}></div>
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-tl from-red-200 to-red-600 border cursor-pointer ${createdata.color_first === "from-red-200" && "border-primary100"} mx-2`} onClick={() => { setcreatedata({ ...createdata, color_first: "from-red-200", color_second: "to-red-600" }) }}></div>
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-tl from-purple-600 to-pink-600 border cursor-pointer ${createdata.color_first === "from-purple-600" && "border-primary100"} mx-2`} onClick={() => { setcreatedata({ ...createdata, color_first: "from-purple-600", color_second: "to-pink-600" }) }}></div>
                    </div>
                    <div className="flex flex-col ">
                        <InputRequired name="name" value={createdata.name} onChangeInput={onChangeInput} label="Nama Bank"></InputRequired>
                        <InputRequired name="account_number" value={createdata.account_number} onChangeInput={onChangeInput} label="Nomor Rekening"></InputRequired>
                        <InputRequired name="owner" value={createdata.owner} onChangeInput={onChangeInput} label="Nama Pemegang Rekening"></InputRequired>
                        <RadioRequired name="currency" label="Mata Uang" onChangeRadio={onChangeRadio} options={
                            [
                                {
                                    value: "IDR",
                                    title: "IDR"
                                },
                                {
                                    value: 'USD',
                                    title: "USD"
                                }
                            ]
                        }></RadioRequired>
                    </div>
                </div>
            </Spin>
        </DrawerCore>
    )
}

const DrawerLokasi = ({ title, visible, onClose, children, buttonOkText, initProps, onvisible }) => {
    const rt = useRouter()
    const [createdata, setcreatedata] = useState({
        name: '',
        address: "",
        phone_number: "",
        image_logo: '',
        parent_id: null,
        singkatan: "",
        tanggal_pkp: null,
        penanggung_jawab: "",
        npwp: "",
        fax: "",
        email: "",
        website: ""
    })
    const [treedata, settreedata] = useState([])
    const [lokasiloading, setlokasiloading] = useState(false)
    const [loadingfoto, setloadingfoto] = useState(false)
    const [dynamicattr, setdynamicattr] = useState({
        email: false,
        website: false,
        npwp: false,
        fax: false,
        tanggal_pkp: false
    })
    const [disabledsave, setdisabledsave] = useState(true)
    const [disabledtrigger, setdisabledtrigger] = useState(-1)

    const onChangeInput = (e) => {
        setcreatedata({
            ...createdata,
            [e.target.name]: e.target.value
        })
        setdisabledtrigger(prev => prev + 1)
    }
    const onChangeInputNotRequired = (e) => {
        setcreatedata({
            ...createdata,
            [e.target.name]: e.target.value
        })
    }
    const onChangeTreeselect = (value, label, extra) => {
        setcreatedata({
            ...createdata,
            parent_id: value
        })
    }
    const onchangeDate = (date, datestring) => {
        setcreatedata({ ...createdata, tanggal_pkp: datestring })
    }
    const onChangeGambar = async (e) => {
        setloadingfoto(true)
        const foto = e.target.files
        const formdata = new FormData()
        formdata.append('file', foto[0])
        formdata.append('upload_preset', 'migsys')
        const fetching = await fetch(`https://api.Cloudinary.com/v1_1/aqlpeduli/image/upload`, {
            method: 'POST',
            body: formdata
        })
        const datajson = await fetching.json()
        setcreatedata({ ...createdata, image_logo: datajson.secure_url })
        setloadingfoto(false)
    }
    const handleCreateLokasi = () => {
        setlokasiloading(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addCompanyBranch`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(createdata)
        })
            .then((res) => res.json())
            .then(res2 => {
                setlokasiloading(false)
                onvisible(false)
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/company/myCompany/locations`)
                    }, 500)
                }
                else {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getBranchCompanyList`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                settreedata([res2.data])
            })
    }, [lokasiloading])
    useEffect(() => {
        if (disabledtrigger !== -1) {
            if (createdata.parent_id !== null && createdata.name !== "" && createdata.address !== "" && createdata.phone_number !== "" && createdata.penanggung_jawab !== "") {
                setdisabledsave(false)
            }
            else {
                setdisabledsave(true)
            }
        }
    }, [disabledtrigger])
    return (
        <DrawerCore
            title={title}
            visible={visible}
            onClose={onClose}
            buttonOkText={buttonOkText}
            onClick={handleCreateLokasi}
            disabled={disabledsave}
        >
            <Spin spinning={lokasiloading}>
                <div className="flex flex-col">
                    <div className="mb-8">
                        <p className="mb-0 text-red-500 text-xs italic">*Informasi ini harus diisi</p>
                    </div>
                    <div className="mb-5 flex">
                        <div className="mr-2">
                            {
                                createdata.image_logo === "" ?
                                    <div className="w-20 h-20 rounded-full bg-gray-400 flex justify-center items-center">
                                        <CameraIconSvg size={20} color={`#ffffff`} />
                                    </div>
                                    :
                                    <img src={createdata.image_logo} className="object-contain w-20 h-20 rounded-full" alt="" />
                            }
                        </div>
                        <div className="flex flex-col w-9/12 px-3">
                            <div className="mb-5">
                                <Text>
                                    Unggah gambar JPG/PNG dari komputer Anda (Max. 5 MB)
                                </Text>
                            </div>
                            <div className="flex justify-end items-end">
                                <ButtonSys type="primaryInput" onChangeGambar={onChangeGambar}>
                                    {loadingfoto ? <LoadingOutlined style={{ marginRight: `0.5rem` }} /> : <RefreshIconSvg size={15} color={`#ffffff`} />}
                                    Atur Ulang
                                </ButtonSys>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col mb-5">
                        <TreeSelectRequired name="parent_id" onChangeTreeselect={onChangeTreeselect} label="Induk Lokasi" treeData={treedata} />
                        <InputRequired name="name" onChangeInput={onChangeInput} label="Nama Lokasi"></InputRequired>
                        <InputRequired name="address" onChangeInput={onChangeInput} label="Alamat Lokasi"></InputRequired>
                        <InputRequired name="phone_number" onChangeInput={onChangeInput} label="Nomor Telepon"></InputRequired>
                        <InputRequired name="penanggung_jawab" onChangeInput={onChangeInput} label="Penanggung Jawab (PIC)"></InputRequired>
                        {dynamicattr.email && <InputNotRequired name="email" onChangeInput={onChangeInputNotRequired} label="Email"></InputNotRequired>}
                        {dynamicattr.website && <InputNotRequired name="website" onChangeInput={onChangeInputNotRequired} label="Website"></InputNotRequired>}
                        {dynamicattr.npwp && <InputNotRequired name="npwp" onChangeInput={onChangeInputNotRequired} label="NPWP"></InputNotRequired>}
                        {dynamicattr.fax && <InputNotRequired name="fax" onChangeInput={onChangeInputNotRequired} label="Fax"></InputNotRequired>}
                        {dynamicattr.tanggal_pkp && <DateNotRequired name="tanggal_pkp" onChangeDate={onchangeDate} label="Tanggal PKP" defaultValue={createdata.tanggal_pkp === null ? null : moment(createdata.tanggal_pkp)}></DateNotRequired>}
                    </div>
                    <div className="mb-5 flex flex-col">
                        <div className="mb-3">
                            <Label>Informasi Tambahan</Label>
                        </div>
                        {!dynamicattr.email &&
                            <div className="flex justify-between mb-3">
                                <div className="flex items-center">
                                    <div className="mr-2">
                                        <EmailIconSvg size={18} color={`#808080`} />
                                    </div>
                                    Email
                                </div>
                                <div className="cursor-pointer" onClick={() => { setdynamicattr({ ...dynamicattr, email: true }) }}>
                                    <SquarePlusIconSvg size={18} color={`#808080`} />
                                </div>
                            </div>
                        }
                        {!dynamicattr.website &&
                            <div className="flex justify-between mb-3">
                                <div className="flex items-center">
                                    <div className="mr-2">
                                        <WebIconSvg size={18} color={`#808080`} />
                                    </div>
                                    Website
                                </div>
                                <div className="cursor-pointer" onClick={() => { setdynamicattr({ ...dynamicattr, website: true }) }}>
                                    <SquarePlusIconSvg size={18} color={`#808080`} />
                                </div>
                            </div>
                        }
                        {!dynamicattr.npwp &&
                            <div className="flex justify-between mb-3">
                                <div className="flex items-center">
                                    <div className="mr-2">
                                        <NotesIconSvg size={18} color={`#808080`} />
                                    </div>
                                    NPWP
                                </div>
                                <div className="cursor-pointer" onClick={() => { setdynamicattr({ ...dynamicattr, npwp: true }) }}>
                                    <SquarePlusIconSvg size={18} color={`#808080`} />
                                </div>
                            </div>
                        }
                        {!dynamicattr.fax &&
                            <div className="flex justify-between mb-3">
                                <div className="flex items-center">
                                    <div className="mr-2">
                                        <FaxIconSvg size={18} color={`#808080`} />
                                    </div>
                                    Fax
                                </div>
                                <div className="cursor-pointer" onClick={() => { setdynamicattr({ ...dynamicattr, fax: true }) }}>
                                    <SquarePlusIconSvg size={18} color={`#808080`} />
                                </div>
                            </div>
                        }
                        {!dynamicattr.tanggal_pkp &&
                            <div className="flex justify-between mb-3">
                                <div className="flex items-center">
                                    <div className="mr-2">
                                        <PkpIconSvg size={18} color={`#808080`} />
                                    </div>
                                    Tanggal PKP
                                </div>
                                <div className="cursor-pointer" onClick={() => { setdynamicattr({ ...dynamicattr, tanggal_pkp: true }) }}>
                                    <SquarePlusIconSvg size={18} color={`#808080`} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </Spin>
        </DrawerCore>
    )
}

const DrawerLokasiClient = ({ title, visible, onClose, children, buttonOkText, initProps, onvisible, displaydata }) => {
    const rt = useRouter()
    const [createdata, setcreatedata] = useState({
        name: '',
        address: "",
        phone_number: "",
        image_logo: '',
        parent_id: null,
        singkatan: "",
        tanggal_pkp: null,
        penanggung_jawab: "",
        npwp: "",
        fax: "",
        email: "",
        website: ""
    })
    const [treedata, settreedata] = useState([])
    const [lokasiloading, setlokasiloading] = useState(false)
    const [loadingfoto, setloadingfoto] = useState(false)
    const [dynamicattr, setdynamicattr] = useState({
        email: false,
        website: false,
        npwp: false,
        fax: false,
        tanggal_pkp: false
    })
    const [disabledsave, setdisabledsave] = useState(true)
    const [disabledtrigger, setdisabledtrigger] = useState(-1)

    const onChangeInput = (e) => {
        setcreatedata({
            ...createdata,
            [e.target.name]: e.target.value
        })
        setdisabledtrigger(prev => prev + 1)
    }
    const onChangeInputNotRequired = (e) => {
        setcreatedata({
            ...createdata,
            [e.target.name]: e.target.value
        })
    }
    const onChangeTreeselect = (value, label, extra) => {
        setcreatedata({
            ...createdata,
            parent_id: value
        })
    }
    const onchangeDate = (date, datestring) => {
        setcreatedata({ ...createdata, tanggal_pkp: datestring })
    }
    const onChangeGambar = async (e) => {
        setloadingfoto(true)
        const foto = e.target.files
        const formdata = new FormData()
        formdata.append('file', foto[0])
        formdata.append('upload_preset', 'migsys')
        const fetching = await fetch(`https://api.Cloudinary.com/v1_1/aqlpeduli/image/upload`, {
            method: 'POST',
            body: formdata
        })
        const datajson = await fetching.json()
        setcreatedata({ ...createdata, image_logo: datajson.secure_url })
        setloadingfoto(false)
    }
    const handleCreateLokasi = () => {
        setlokasiloading(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addCompanyClient`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(createdata)
        })
            .then((res) => res.json())
            .then(res2 => {
                setlokasiloading(false)
                onvisible(false)
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/company/clients/locations?id=${displaydata.id}&company_name=${displaydata.name}`)
                    }, 500)
                }
                else {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getClientCompanyList`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                settreedata([res2.data])
            })
    }, [lokasiloading])
    useEffect(() => {
        if (disabledtrigger !== -1) {
            if (createdata.parent_id !== null && createdata.name !== "" && createdata.address !== "" && createdata.phone_number !== "" && createdata.penanggung_jawab !== "") {
                setdisabledsave(false)
            }
            else {
                setdisabledsave(true)
            }
        }
    }, [disabledtrigger])
    return (
        <DrawerCore
            title={title}
            visible={visible}
            onClose={onClose}
            buttonOkText={buttonOkText}
            onClick={handleCreateLokasi}
            disabled={disabledsave}
        >
            <Spin spinning={lokasiloading}>
                <div className="flex flex-col">
                    <div className="mb-8">
                        <p className="mb-0 text-red-500 text-xs italic">*Informasi ini harus diisi</p>
                    </div>
                    <div className="mb-5 flex">
                        <div className="mr-2">
                            {
                                createdata.image_logo === "" ?
                                    <div className="w-20 h-20 rounded-full bg-gray-400 flex justify-center items-center">
                                        <CameraIconSvg size={20} color={`#ffffff`} />
                                    </div>
                                    :
                                    <img src={createdata.image_logo} className="object-contain w-20 h-20 rounded-full" alt="" />
                            }
                        </div>
                        <div className="flex flex-col w-9/12 px-3">
                            <div className="mb-5">
                                <Text>
                                    Unggah gambar JPG/PNG dari komputer Anda (Max. 5 MB)
                                </Text>
                            </div>
                            <div className="flex justify-end items-end">
                                <ButtonSys type="primaryInput" onChangeGambar={onChangeGambar}>
                                    {loadingfoto ? <LoadingOutlined style={{ marginRight: `0.5rem` }} /> : <RefreshIconSvg size={15} color={`#ffffff`} />}
                                    Atur Ulang
                                </ButtonSys>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col mb-5">
                        <TreeSelectRequired name="parent_id" onChangeTreeselect={onChangeTreeselect} label="Induk Lokasi" treeData={treedata} />
                        <InputRequired name="name" onChangeInput={onChangeInput} label="Nama Lokasi"></InputRequired>
                        <InputRequired name="address" onChangeInput={onChangeInput} label="Alamat Lokasi"></InputRequired>
                        <InputRequired name="phone_number" onChangeInput={onChangeInput} label="Nomor Telepon"></InputRequired>
                        <InputRequired name="penanggung_jawab" onChangeInput={onChangeInput} label="Penanggung Jawab (PIC)"></InputRequired>
                        {dynamicattr.email && <InputNotRequired name="email" onChangeInput={onChangeInputNotRequired} label="Email"></InputNotRequired>}
                        {dynamicattr.website && <InputNotRequired name="website" onChangeInput={onChangeInputNotRequired} label="Website"></InputNotRequired>}
                        {dynamicattr.npwp && <InputNotRequired name="npwp" onChangeInput={onChangeInputNotRequired} label="NPWP"></InputNotRequired>}
                        {dynamicattr.fax && <InputNotRequired name="fax" onChangeInput={onChangeInputNotRequired} label="Fax"></InputNotRequired>}
                        {dynamicattr.tanggal_pkp && <DateNotRequired name="tanggal_pkp" onChangeDate={onchangeDate} label="Tanggal PKP" defaultValue={createdata.tanggal_pkp === null ? null : moment(createdata.tanggal_pkp)}></DateNotRequired>}
                    </div>
                    <div className="mb-5 flex flex-col">
                        <div className="mb-3">
                            <Label>Informasi Tambahan</Label>
                        </div>
                        {!dynamicattr.email &&
                            <div className="flex justify-between mb-3">
                                <div className="flex items-center">
                                    <div className="mr-2">
                                        <EmailIconSvg size={18} color={`#808080`} />
                                    </div>
                                    Email
                                </div>
                                <div className="cursor-pointer" onClick={() => { setdynamicattr({ ...dynamicattr, email: true }) }}>
                                    <SquarePlusIconSvg size={18} color={`#808080`} />
                                </div>
                            </div>
                        }
                        {!dynamicattr.website &&
                            <div className="flex justify-between mb-3">
                                <div className="flex items-center">
                                    <div className="mr-2">
                                        <WebIconSvg size={18} color={`#808080`} />
                                    </div>
                                    Website
                                </div>
                                <div className="cursor-pointer" onClick={() => { setdynamicattr({ ...dynamicattr, website: true }) }}>
                                    <SquarePlusIconSvg size={18} color={`#808080`} />
                                </div>
                            </div>
                        }
                        {!dynamicattr.npwp &&
                            <div className="flex justify-between mb-3">
                                <div className="flex items-center">
                                    <div className="mr-2">
                                        <NotesIconSvg size={18} color={`#808080`} />
                                    </div>
                                    NPWP
                                </div>
                                <div className="cursor-pointer" onClick={() => { setdynamicattr({ ...dynamicattr, npwp: true }) }}>
                                    <SquarePlusIconSvg size={18} color={`#808080`} />
                                </div>
                            </div>
                        }
                        {!dynamicattr.fax &&
                            <div className="flex justify-between mb-3">
                                <div className="flex items-center">
                                    <div className="mr-2">
                                        <FaxIconSvg size={18} color={`#808080`} />
                                    </div>
                                    Fax
                                </div>
                                <div className="cursor-pointer" onClick={() => { setdynamicattr({ ...dynamicattr, fax: true }) }}>
                                    <SquarePlusIconSvg size={18} color={`#808080`} />
                                </div>
                            </div>
                        }
                        {!dynamicattr.tanggal_pkp &&
                            <div className="flex justify-between mb-3">
                                <div className="flex items-center">
                                    <div className="mr-2">
                                        <PkpIconSvg size={18} color={`#808080`} />
                                    </div>
                                    Tanggal PKP
                                </div>
                                <div className="cursor-pointer" onClick={() => { setdynamicattr({ ...dynamicattr, tanggal_pkp: true }) }}>
                                    <SquarePlusIconSvg size={18} color={`#808080`} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </Spin>
        </DrawerCore>
    )
}

const DrawerSublokasi = ({ title, visible, onClose, children, buttonOkText, initProps, onvisible, subchildren }) => {
    const rt = useRouter()
    const [createdata, setcreatedata] = useState({
        name: '',
        address_same: false,
        address: "",
        phone_number: "",
        image_logo: '',
        parent_id: null,
        singkatan: "",
        tanggal_pkp: null,
        penanggung_jawab: "",
        npwp: "",
        fax: "",
        email: "",
        website: ""
    })
    const [disabledsave, setdisabledsave] = useState(true)
    const [disabledtrigger, setdisabledtrigger] = useState(-1)
    const [treedata, settreedata] = useState([])
    const [sameaddress, setsameaddress] = useState(false)
    const [lokasiloading, setlokasiloading] = useState(false)
    const [loadingfoto, setloadingfoto] = useState(false)

    const onChangeInput = (e) => {
        setcreatedata({
            ...createdata,
            [e.target.name]: e.target.value
        })
        setdisabledtrigger(prev => prev + 1)
    }
    const onChangeTreeselect = (value, label, extra) => {
        setcreatedata({
            ...createdata,
            parent_id: value
        })
        setdisabledtrigger(prev => prev + 1)
    }
    const onChangeRadioAlamat = (e) => {
        e.target.value === true ? setsameaddress(true) : setsameaddress(false)
        setcreatedata({
            ...createdata,
            address_same: e.target.value
        })
        setdisabledtrigger(prev => prev + 1)
    }
    const onChangeGambar = async (e) => {
        setloadingfoto(true)
        const foto = e.target.files
        const formdata = new FormData()
        formdata.append('file', foto[0])
        formdata.append('upload_preset', 'migsys')
        const fetching = await fetch(`https://api.Cloudinary.com/v1_1/aqlpeduli/image/upload`, {
            method: 'POST',
            body: formdata
        })
        const datajson = await fetching.json()
        setcreatedata({ ...createdata, image_logo: datajson.secure_url })
        setloadingfoto(false)
    }
    const handleCreateSubLokasi = () => {
        setlokasiloading(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addCompanySub`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(createdata)
        })
            .then((res) => res.json())
            .then(res2 => {
                setlokasiloading(false)
                onvisible(false)
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        // rt.push(`/company/myCompany/detail/${res2.id}`)
                    }, 500)
                }
                else {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getBranchCompanyList`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                settreedata([res2.data])
            })
    }, [lokasiloading])
    useEffect(() => {
        if (disabledtrigger !== -1) {
            if (createdata.parent_id !== null && createdata.name !== "" && (createdata.address_same !== false || createdata.address !== "") && createdata.phone_number !== "" && createdata.penanggung_jawab !== "") {
                setdisabledsave(false)
            }
            else {
                setdisabledsave(true)
            }
        }
    }, [disabledtrigger])
    return (
        <DrawerCore
            title={title}
            visible={visible}
            onClose={onClose}
            buttonOkText={buttonOkText}
            onClick={handleCreateSubLokasi}
            disabled={disabledsave}
        // onClick={()=>{console.log(createdata)}}
        >
            <Spin spinning={lokasiloading}>
                <div className="flex flex-col">
                    <div className="mb-8">
                        <p className="mb-0 text-red-500 text-xs italic">*Informasi ini harus diisi</p>
                    </div>
                    <div className="mb-5 flex">
                        <div className="mr-2">
                            {
                                createdata.image_logo === "" ?
                                    <div className="w-20 h-20 rounded-full bg-gray-400 flex justify-center items-center">
                                        <CameraIconSvg size={20} color={`#ffffff`} />
                                    </div>
                                    :
                                    <img src={createdata.image_logo} className="object-contain w-20 h-20 rounded-full" alt="" />
                            }
                        </div>
                        <div className="flex flex-col w-9/12 px-3">
                            <div className="mb-5">
                                <Text>
                                    Unggah gambar JPG/PNG dari komputer Anda (Max. 5 MB)
                                </Text>
                            </div>
                            <div className="flex justify-end items-end">
                                <ButtonSys type="primaryInput" onChangeGambar={onChangeGambar}>
                                    {loadingfoto ? <LoadingOutlined style={{ marginRight: `0.5rem` }} /> : <RefreshIconSvg size={15} color={`#ffffff`} />}
                                    Atur Ulang
                                </ButtonSys>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col mb-5">
                        <TreeSelectRequired name="parent_id" onChangeTreeselect={onChangeTreeselect} label="Induk Lokasi" treeData={subchildren} />
                        <InputRequired name="name" onChangeInput={onChangeInput} label="Nama Sub Lokasi"></InputRequired>
                        <RadioRequired name="address" label="Alamat Sub Lokasi" onChangeRadio={onChangeRadioAlamat} options={
                            [
                                {
                                    value: true,
                                    title: "Sama dengan Induk"
                                },
                                {
                                    value: false,
                                    title: "Alamat Berbeda"
                                }
                            ]
                        }></RadioRequired>
                        <div className="mb-5 px-3">
                            <Input name="address" onChange={onChangeInput} disabled={sameaddress ? true : false} />
                        </div>
                        <InputRequired name="phone_number" onChangeInput={onChangeInput} label="Nomor Telepon"></InputRequired>
                        <InputRequired name="penanggung_jawab" onChangeInput={onChangeInput} label="Penanggung Jawab (PIC)"></InputRequired>
                    </div>
                </div>
            </Spin>
        </DrawerCore>
    )
}

const DrawerAddRelasi = ({ id, title, visible, onClose, children, buttonOkText, initProps, onvisible }) => {
    //add
    const [dataApiadd, setdataApiadd] = useState({
        subject_id: Number(id),
        relationship_id: null,
        is_inverse: null,
        type_id: null,
        connected_ids: null,
        backup_connected_ids: null
    })
    const [displaydatarelations, setdisplaydatarelations] = useState([])
    const [relationnameadd, setrelationnameadd] = useState("")
    const [relationnameddadd, setrelationnameddadd] = useState(false)
    const [relationselectedidxadd, setrelationselectedidxadd] = useState(-1)
    const [relationselectedisinverseadd, setrelationselectedisinverseadd] = useState(-1)
    const [detailtipeadd, setdetailtipeadd] = useState(-10)
    const [detailtipedataadd, setdetailtipedataadd] = useState([])
    const [modaladd, setmodaladd] = useState(false)
    const [disabledadd, setdisabledadd] = useState(true)
    const [loadingadd, setloadingadd] = useState(false)
    const [fetchingmodel, setfetchingmodel] = useState(false)
    const [sublocdata, setsublocdata] = useState(null)
    const [subloctrig, setsubloctrig] = useState(-1)

    const handleAddRelationshipItem = () => {
        setloadingadd(true)
        // delete dataApiadd.backup_connected_ids
        fetch(`https://boiling-thicket-46501.herokuapp.com/addRelationshipInventories`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataApiadd)
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingadd(false)
                onvisible(false)
                if (res2.success) {
                    setdataApiadd({
                        subject_id: Number(id),
                        relationship_id: null,
                        is_inverse: null,
                        type_id: null,
                        connected_ids: null,
                        backup_connected_ids: null
                    })
                    setrelationnameadd("")
                    setsublocdata(null)
                    setrelationselectedidxadd(-1)
                    setrelationselectedisinverseadd(-1)
                    setsubloctrig(-1)
                    notification['success']({
                        message: "Relationship Item berhasil ditambahkan",
                        duration: 3
                    })
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationships`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setdisplaydatarelations(res2.data)
            })
    }, [])
    useEffect(() => {
        if (subloctrig !== -1) {
            fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationshipInventoryDetailList?type_id=${subloctrig}`, {
                method: `GET`,
                headers: {
                    'Authorization': JSON.parse(initProps),
                }
            })
                .then(res => res.json())
                .then(res2 => {
                    setsublocdata(res2.data.children)
                })
        }
        else if (detailtipeadd !== -10) {
            fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationshipInventoryDetailList?type_id=${dataApiadd.type_id}`, {
                method: `GET`,
                headers: {
                    'Authorization': JSON.parse(initProps),
                }
            })
                .then(res => res.json())
                .then(res2 => {
                    dataApiadd.type_id === -3 && setdetailtipedataadd([res2.data])
                    dataApiadd.type_id === -1 && setdetailtipedataadd(res2.data)
                    dataApiadd.type_id === -2 && setdetailtipedataadd(res2.data)
                    dataApiadd.type_id === -4 && setdetailtipedataadd(res2.data.data)
                })
        }
    }, [detailtipeadd, subloctrig])
    return (
        <DrawerCore
            title={title}
            visible={visible}
            onClose={/*()=>{console.log(dataApiadd)}*/ onClose}
            buttonOkText={buttonOkText}
            onClick={handleAddRelationshipItem}
        >
            <Spin spinning={loadingadd}>
                <div className="flex flex-col mb-3">
                    <div className="flex flex-col mb-3">
                        <p className="mb-0">Relationship Type <span className="namapart"></span></p>
                        <div className="w-full border p-2 hover:border-primary100 rounded-sm flex items-center justify-between cursor-pointer" onClick={() => { setrelationnameddadd(prev => !prev) }}>
                            <p className="mb-0">{relationnameadd}</p>
                            {relationnameddadd ? <UpOutlined style={{ color: `rgb(229,231,235)` }} /> : <DownOutlined style={{ color: `rgb(229,231,235)` }} />}
                        </div>
                        {
                            relationnameddadd ?
                                <div className="flex flex-col">
                                    <div className="flex">
                                        <div className="bg-gray-200 font-semibold p-3 w-6/12">Relationship Type</div>
                                        <div className="bg-gray-200 font-semibold p-3 w-6/12">Inverse Relationship Type</div>
                                    </div>
                                    {
                                        displaydatarelations.map((doc, idx) => {
                                            return (
                                                <div className="flex">
                                                    <div className={` hover:bg-primary10 cursor-pointer hover:text-black p-3 w-6/12 ${relationselectedidxadd === idx && relationselectedisinverseadd === false ? " bg-primary50" : "bg-white"}`}
                                                        onClick={(e) => {
                                                            setrelationnameddadd(false);
                                                            setrelationnameadd(doc.relationship_type);
                                                            setdataApiadd({ ...dataApiadd, relationship_id: doc.id, is_inverse: false })
                                                            doc.id === null || dataApiadd.type_id === null ? setdisabledadd(true) : setdisabledadd(false)
                                                            setrelationselectedidxadd(idx)
                                                            setrelationselectedisinverseadd(false)
                                                        }}
                                                    >{doc.relationship_type}</div>
                                                    <div className={` hover:bg-primary10 cursor-pointer hover:text-black p-3 w-6/12 ${relationselectedidxadd === idx && relationselectedisinverseadd === true ? " bg-primary50" : "bg-white"}`}
                                                        onClick={(e) => {
                                                            setrelationnameddadd(false);
                                                            setrelationnameadd(doc.inverse_relationship_type);
                                                            setdataApiadd({ ...dataApiadd, relationship_id: doc.id, is_inverse: true })
                                                            doc.id === null || dataApiadd.type_id === null ? setdisabledadd(true) : setdisabledadd(false)
                                                            setrelationselectedidxadd(idx)
                                                            setrelationselectedisinverseadd(true)
                                                        }}
                                                    >{doc.inverse_relationship_type}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                :
                                null
                        }
                        <style jsx>
                            {`
                                .namapart::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                        </style>
                    </div>
                    <div className="flex flex-col mb-3">
                        <p className="mb-0">Tipe <span className="tipepart"></span></p>
                        <Select value={dataApiadd.type_id} onChange={(value) => {
                            setdataApiadd({ ...dataApiadd, type_id: value })
                            dataApiadd.relationship_id === null || value === null ? setdisabledadd(true) : setdisabledadd(false)
                            setdetailtipeadd(value)
                        }}>
                            <Select.Option value={-1}>Agent</Select.Option>
                            <Select.Option value={-2}>Requester</Select.Option>
                            <Select.Option value={-3}>Company</Select.Option>
                            <Select.Option value={-4}>Asset Type</Select.Option>
                        </Select>
                        <style jsx>
                            {`
                                .tipepart::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                        </style>
                    </div>
                    {
                        dataApiadd.type_id !== null ?
                            <>
                                {
                                    dataApiadd.type_id === -1 &&
                                    <div className="flex flex-col mb-3">
                                        <p className="mb-0">Detail Tipe</p>
                                        <Select value={dataApiadd.connected_ids} mode="multiple" showSearch optionFilterProp="children" notFoundContent={fetchingmodel ? <Spin size="small" /> : null} onSearch={(value) => {
                                            setfetchingmodel(true)
                                            fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationshipInventoryDetailList?type_id=${detailtipeadd}&name=${value !== "" ? value : ""}`, {
                                                method: `GET`,
                                                headers: {
                                                    'Authorization': JSON.parse(initProps),
                                                },
                                            })
                                                .then(res => res.json())
                                                .then(res2 => {
                                                    setdetailtipedataadd(res2.data)
                                                    setfetchingmodel(false)
                                                })
                                        }} filterOption={(input, opt) => (
                                            opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        )} onChange={(value) => {
                                            setdataApiadd({ ...dataApiadd, connected_ids: value, backup_connected_ids: value })
                                        }}>
                                            {
                                                detailtipedataadd.map((doc, idx) => {
                                                    return (
                                                        <Select.Option value={doc.id}>{doc.name}</Select.Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </div>
                                }
                                {
                                    dataApiadd.type_id === -2 &&
                                    <div className="flex flex-col mb-3">
                                        <p className="mb-0">Detail Tipe</p>
                                        <Select value={dataApiadd.connected_ids} mode="multiple" showSearch optionFilterProp="children" notFoundContent={fetchingmodel ? <Spin size="small" /> : null} onSearch={(value) => {
                                            setfetchingmodel(true)
                                            fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationshipInventoryDetailList?type_id=${detailtipeadd}&name=${value !== "" ? value : ""}`, {
                                                method: `GET`,
                                                headers: {
                                                    'Authorization': JSON.parse(initProps),
                                                },
                                            })
                                                .then(res => res.json())
                                                .then(res2 => {
                                                    setdetailtipedataadd(res2.data)
                                                    setfetchingmodel(false)
                                                })
                                        }} filterOption={(input, opt) => (
                                            opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        )} onChange={(value) => {
                                            setdataApiadd({ ...dataApiadd, connected_ids: value, backup_connected_ids: value })
                                        }}>
                                            {
                                                detailtipedataadd.map((doc, idx) => {
                                                    return (
                                                        <Select.Option value={doc.id}>{doc.name}</Select.Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </div>
                                }
                                {
                                    dataApiadd.type_id === -3 &&
                                    <div className="flex flex-col mb-3">
                                        <p className="mb-0">Detail Tipe</p>
                                        <TreeSelect value={dataApiadd.backup_connected_ids === null ? null : dataApiadd.backup_connected_ids[0]} treeDefaultExpandedKeys={[1]} treeData={detailtipedataadd} onChange={(value, label, extra) => {
                                            setdataApiadd({ ...dataApiadd, connected_ids: [value], backup_connected_ids: [value] })
                                            setsubloctrig(value)
                                        }}></TreeSelect>
                                    </div>
                                }
                                {
                                    dataApiadd.type_id === -4 &&
                                    <div className="flex flex-col mb-3">
                                        <p className="mb-0">Detail Tipe</p>
                                        <Select placeholder="Cari dengan Model ID" value={dataApiadd.connected_ids} mode="multiple" showSearch optionFilterProp="children" notFoundContent={fetchingmodel ? <Spin size="small" /> : null} onSearch={(value) => {
                                            setfetchingmodel(true)
                                            fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationshipInventoryDetailList?type_id=${detailtipeadd}&model_id=${value !== "" ? value : ""}`, {
                                                method: `GET`,
                                                headers: {
                                                    'Authorization': JSON.parse(initProps),
                                                },
                                            })
                                                .then(res => res.json())
                                                .then(res2 => {
                                                    setdetailtipedataadd(res2.data)
                                                    setfetchingmodel(false)
                                                })
                                        }} filterOption={(input, opt) => (
                                            opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        )} onChange={(value) => {
                                            setdataApiadd({ ...dataApiadd, connected_ids: value, backup_connected_ids: value })
                                        }}>
                                            {
                                                detailtipedataadd.map((doc, idx) => {
                                                    return (
                                                        <Select.Option value={doc.id}>{doc.mig_id}</Select.Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </div>
                                }
                            </>
                            :
                            null

                    }
                    {
                        sublocdata !== null &&
                        <div className="flex flex-col mb-3">
                            <p className="mb-0">Detail Tipe (Sublokasi)</p>
                            <TreeSelect multiple allowClear treeData={sublocdata} onChange={(value, label, extra) => {
                                if (value.length === 0) {
                                    setdataApiadd({ ...dataApiadd, connected_ids: dataApiadd.backup_connected_ids })
                                }
                                else {
                                    setdataApiadd({ ...dataApiadd, connected_ids: value })
                                }
                            }}></TreeSelect>
                        </div>
                    }
                </div>
            </Spin>
        </DrawerCore>
    )
}

const DrawerUpdateRelasi = ({ id, title, visible, onClose, children, buttonOkText, initProps, onvisible, dataapiadd }) => {
    //add
    const [dataApiadd, setdataApiadd] = useState(dataapiadd)
    const [displaydatarelations, setdisplaydatarelations] = useState([])
    const [relationnameadd, setrelationnameadd] = useState("")
    const [relationnameddadd, setrelationnameddadd] = useState(false)
    const [relationselectedidxadd, setrelationselectedidxadd] = useState(-1)
    const [relationselectedisinverseadd, setrelationselectedisinverseadd] = useState(-1)
    const [detailtipeadd, setdetailtipeadd] = useState(-10)
    const [detailtipedataadd, setdetailtipedataadd] = useState([])
    const [modaladd, setmodaladd] = useState(false)
    const [disabledadd, setdisabledadd] = useState(true)
    const [loadingadd, setloadingadd] = useState(false)
    const [fetchingmodel, setfetchingmodel] = useState(false)
    const [sublocdata, setsublocdata] = useState(null)
    const [subloctrig, setsubloctrig] = useState(-1)

    const handleAddRelationshipItem = () => {
        setloadingadd(true)
        // delete dataApiadd.backup_connected_ids
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateRelationshipInventory`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataApiadd)
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingadd(false)
                onvisible(false)
                if (res2.success) {
                    setdataApiadd({
                        subject_id: Number(id),
                        relationship_id: null,
                        is_inverse: null,
                        type_id: null,
                        connected_ids: null,
                        backup_connected_ids: null
                    })
                    setrelationnameadd("")
                    setsublocdata(null)
                    setrelationselectedidxadd(-1)
                    setrelationselectedisinverseadd(-1)
                    setsubloctrig(-1)
                    notification['success']({
                        message: "Relationship Item berhasil ditambahkan",
                        duration: 3
                    })
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationships`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setdisplaydatarelations(res2.data)
            })
    }, [])
    useEffect(() => {
        if (subloctrig !== -1) {
            fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationshipInventoryDetailList?type_id=${subloctrig}`, {
                method: `GET`,
                headers: {
                    'Authorization': JSON.parse(initProps),
                }
            })
                .then(res => res.json())
                .then(res2 => {
                    setsublocdata(res2.data.children)
                })
        }
        else if (detailtipeadd !== -10) {
            fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationshipInventoryDetailList?type_id=${dataApiadd.type_id}`, {
                method: `GET`,
                headers: {
                    'Authorization': JSON.parse(initProps),
                }
            })
                .then(res => res.json())
                .then(res2 => {
                    dataApiadd.type_id === -3 && setdetailtipedataadd([res2.data])
                    dataApiadd.type_id === -1 && setdetailtipedataadd(res2.data)
                    dataApiadd.type_id === -2 && setdetailtipedataadd(res2.data)
                    dataApiadd.type_id === -4 && setdetailtipedataadd(res2.data.data)
                })
        }
    }, [detailtipeadd, subloctrig])
    return (
        <DrawerCore
            title={title}
            visible={visible}
            onClose={/*()=>{console.log(dataApiadd)}*/ onClose}
            buttonOkText={buttonOkText}
            onClick={handleAddRelationshipItem}
        >
            <Spin spinning={loadingadd}>
                <div className="flex flex-col mb-3">
                    <div className="flex flex-col mb-3">
                        <p className="mb-0">Relationship Type <span className="namapart"></span></p>
                        <div className="w-full border p-2 hover:border-primary100 rounded-sm flex items-center justify-between cursor-pointer" onClick={() => { setrelationnameddadd(prev => !prev) }}>
                            <p className="mb-0">{relationnameadd}</p>
                            {relationnameddadd ? <UpOutlined style={{ color: `rgb(229,231,235)` }} /> : <DownOutlined style={{ color: `rgb(229,231,235)` }} />}
                        </div>
                        {
                            relationnameddadd ?
                                <div className="flex flex-col">
                                    <div className="flex">
                                        <div className="bg-gray-200 font-semibold p-3 w-6/12">Relationship Type</div>
                                        <div className="bg-gray-200 font-semibold p-3 w-6/12">Inverse Relationship Type</div>
                                    </div>
                                    {
                                        displaydatarelations.map((doc, idx) => {
                                            return (
                                                <div className="flex">
                                                    <div className={` hover:bg-primary10 cursor-pointer hover:text-black p-3 w-6/12 ${relationselectedidxadd === idx && relationselectedisinverseadd === false ? " bg-primary50" : "bg-white"}`}
                                                        onClick={(e) => {
                                                            setrelationnameddadd(false);
                                                            setrelationnameadd(doc.relationship_type);
                                                            setdataApiadd({ ...dataApiadd, relationship_id: doc.id, is_inverse: false })
                                                            doc.id === null || dataApiadd.type_id === null ? setdisabledadd(true) : setdisabledadd(false)
                                                            setrelationselectedidxadd(idx)
                                                            setrelationselectedisinverseadd(false)
                                                        }}
                                                    >{doc.relationship_type}</div>
                                                    <div className={` hover:bg-primary10 cursor-pointer hover:text-black p-3 w-6/12 ${relationselectedidxadd === idx && relationselectedisinverseadd === true ? " bg-primary50" : "bg-white"}`}
                                                        onClick={(e) => {
                                                            setrelationnameddadd(false);
                                                            setrelationnameadd(doc.inverse_relationship_type);
                                                            setdataApiadd({ ...dataApiadd, relationship_id: doc.id, is_inverse: true })
                                                            doc.id === null || dataApiadd.type_id === null ? setdisabledadd(true) : setdisabledadd(false)
                                                            setrelationselectedidxadd(idx)
                                                            setrelationselectedisinverseadd(true)
                                                        }}
                                                    >{doc.inverse_relationship_type}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                :
                                null
                        }
                        <style jsx>
                            {`
                                .namapart::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                        </style>
                    </div>
                    <div className="flex flex-col mb-3">
                        <p className="mb-0">Tipe <span className="tipepart"></span></p>
                        <Select value={dataApiadd.type_id} onChange={(value) => {
                            setdataApiadd({ ...dataApiadd, type_id: value })
                            dataApiadd.relationship_id === null || value === null ? setdisabledadd(true) : setdisabledadd(false)
                            setdetailtipeadd(value)
                        }}>
                            <Select.Option value={-1}>Agent</Select.Option>
                            <Select.Option value={-2}>Requester</Select.Option>
                            <Select.Option value={-3}>Company</Select.Option>
                            <Select.Option value={-4}>Asset Type</Select.Option>
                        </Select>
                        <style jsx>
                            {`
                                .tipepart::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                        </style>
                    </div>
                    {
                        dataApiadd.type_id !== null ?
                            <>
                                {
                                    dataApiadd.type_id === -1 &&
                                    <div className="flex flex-col mb-3">
                                        <p className="mb-0">Detail Tipe</p>
                                        <Select value={dataApiadd.connected_ids} mode="multiple" showSearch optionFilterProp="children" notFoundContent={fetchingmodel ? <Spin size="small" /> : null} onSearch={(value) => {
                                            setfetchingmodel(true)
                                            fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationshipInventoryDetailList?type_id=${detailtipeadd}&name=${value !== "" ? value : ""}`, {
                                                method: `GET`,
                                                headers: {
                                                    'Authorization': JSON.parse(initProps),
                                                },
                                            })
                                                .then(res => res.json())
                                                .then(res2 => {
                                                    setdetailtipedataadd(res2.data)
                                                    setfetchingmodel(false)
                                                })
                                        }} filterOption={(input, opt) => (
                                            opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        )} onChange={(value) => {
                                            setdataApiadd({ ...dataApiadd, connected_ids: value, backup_connected_ids: value })
                                        }}>
                                            {
                                                detailtipedataadd.map((doc, idx) => {
                                                    return (
                                                        <Select.Option value={doc.id}>{doc.name}</Select.Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </div>
                                }
                                {
                                    dataApiadd.type_id === -2 &&
                                    <div className="flex flex-col mb-3">
                                        <p className="mb-0">Detail Tipe</p>
                                        <Select value={dataApiadd.connected_ids} mode="multiple" showSearch optionFilterProp="children" notFoundContent={fetchingmodel ? <Spin size="small" /> : null} onSearch={(value) => {
                                            setfetchingmodel(true)
                                            fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationshipInventoryDetailList?type_id=${detailtipeadd}&name=${value !== "" ? value : ""}`, {
                                                method: `GET`,
                                                headers: {
                                                    'Authorization': JSON.parse(initProps),
                                                },
                                            })
                                                .then(res => res.json())
                                                .then(res2 => {
                                                    setdetailtipedataadd(res2.data)
                                                    setfetchingmodel(false)
                                                })
                                        }} filterOption={(input, opt) => (
                                            opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        )} onChange={(value) => {
                                            setdataApiadd({ ...dataApiadd, connected_ids: value, backup_connected_ids: value })
                                        }}>
                                            {
                                                detailtipedataadd.map((doc, idx) => {
                                                    return (
                                                        <Select.Option value={doc.id}>{doc.name}</Select.Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </div>
                                }
                                {
                                    dataApiadd.type_id === -3 &&
                                    <div className="flex flex-col mb-3">
                                        <p className="mb-0">Detail Tipe</p>
                                        <TreeSelect value={dataApiadd.backup_connected_ids === null ? null : dataApiadd.backup_connected_ids[0]} treeDefaultExpandedKeys={[1]} treeData={detailtipedataadd} onChange={(value, label, extra) => {
                                            setdataApiadd({ ...dataApiadd, connected_ids: [value], backup_connected_ids: [value] })
                                            setsubloctrig(value)
                                        }}></TreeSelect>
                                    </div>
                                }
                                {
                                    dataApiadd.type_id === -4 &&
                                    <div className="flex flex-col mb-3">
                                        <p className="mb-0">Detail Tipe</p>
                                        <Select placeholder="Cari dengan Model ID" value={dataApiadd.connected_ids} mode="multiple" showSearch optionFilterProp="children" notFoundContent={fetchingmodel ? <Spin size="small" /> : null} onSearch={(value) => {
                                            setfetchingmodel(true)
                                            fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationshipInventoryDetailList?type_id=${detailtipeadd}&model_id=${value !== "" ? value : ""}`, {
                                                method: `GET`,
                                                headers: {
                                                    'Authorization': JSON.parse(initProps),
                                                },
                                            })
                                                .then(res => res.json())
                                                .then(res2 => {
                                                    setdetailtipedataadd(res2.data)
                                                    setfetchingmodel(false)
                                                })
                                        }} filterOption={(input, opt) => (
                                            opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        )} onChange={(value) => {
                                            setdataApiadd({ ...dataApiadd, connected_ids: value, backup_connected_ids: value })
                                        }}>
                                            {
                                                detailtipedataadd.map((doc, idx) => {
                                                    return (
                                                        <Select.Option value={doc.id}>{doc.mig_id}</Select.Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </div>
                                }
                            </>
                            :
                            null

                    }
                    {
                        sublocdata !== null &&
                        <div className="flex flex-col mb-3">
                            <p className="mb-0">Detail Tipe (Sublokasi)</p>
                            <TreeSelect multiple allowClear treeData={sublocdata} onChange={(value, label, extra) => {
                                if (value.length === 0) {
                                    setdataApiadd({ ...dataApiadd, connected_ids: dataApiadd.backup_connected_ids })
                                }
                                else {
                                    setdataApiadd({ ...dataApiadd, connected_ids: value })
                                }
                            }}></TreeSelect>
                        </div>
                    }
                </div>
            </Spin>
        </DrawerCore>
    )
}

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
    //checkbox
    const [tempcb, settempcb] = useState("")
    //matriks
    const [isbarismatriks, setisbarismatriks] = useState(false)
    const [tempcolumnmatriks, settempcolumnmatriks] = useState("")
    const [temprowmatriks, settemprowmatriks] = useState("")

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
            if (datacreate.name !== "" && datacreate.description !== "") {
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
            onClose={onClose}
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
                        <InputRequired name="name" defaultValue={datacreate.name} onChangeInput={onChangeInput} label="Judul Tipe Task"></InputRequired>
                        <TextAreaRequired name="description" defaultValue={datacreate.description} onChangeInput={onChangeInput} label="Deskripsi Tipe Task"></TextAreaRequired>
                    </div>
                    <div className="flex flex-col px-3 mb-5">
                        <div className="flex mb-5">
                            <Label>Pekerjaan</Label>
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
                                            <div className="flex justify-center text-lg font-bold mb-3">
                                                <div className="cursor-pointer">
                                                    :::
                                                </div>
                                            </div>
                                            <div key={idx} className="grid grid-cols-2 mb-3">
                                                <div className="col-span-1 mr-1">
                                                    <Input value={doc.name} placeholder="Nama" onChange={(e) => {
                                                        var temp = [...datacreate.works]
                                                        temp[idx].name = e.target.value
                                                        setdatacreate(prev => ({
                                                            ...prev,
                                                            works: temp
                                                        }))
                                                    }}></Input>
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
                                                                    var temp = [...datacreate.works]
                                                                    temp[idx].lists.push(tempcb)
                                                                    setdatacreate(prev => ({
                                                                        ...prev,
                                                                        works: temp
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
                                                                    var temp = [...datacreate.works]
                                                                    temp[idx].columns.push(tempcolumnmatriks)
                                                                    setdatacreate(prev => ({
                                                                        ...prev,
                                                                        works: temp
                                                                    }))
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
                                                                            var temp = [...datacreate.works]
                                                                            temp[idx].rows.push(temprowmatriks)
                                                                            setdatacreate(prev => ({
                                                                                ...prev,
                                                                                works: temp
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
                                                                            <div className="flex mb-2">
                                                                                <Input placeholder="Keterangan" value={doc3.description} onChange={(e) => {
                                                                                    var temp = [...datacreate.works]
                                                                                    temp[idx].lists[idx3] = ({ ...doc3, description: e.target.value })
                                                                                    setdatacreate(prev => ({
                                                                                        ...prev,
                                                                                        works: temp
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
                                                                        <div className="cursor-pointer font-bold mr-2">
                                                                            ::
                                                                        </div>
                                                                        <div className="flex items-center mr-2">
                                                                            <Input placeholder="Tambah" value={doc4} onChange={(e) => {
                                                                                var temp = [...datacreate.works]
                                                                                temp[idx].lists[idx4] = e.target.value
                                                                                setdatacreate(prev => ({
                                                                                    ...prev,
                                                                                    works: temp
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
        // console.log(datadisplay, dataupdate)
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
                                                                            var temp = [...datadisplay.works]
                                                                            temp[idx].name = e.target.value
                                                                            setdatadisplay(prev => ({
                                                                                ...prev,
                                                                                works: temp
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
                                                                                var idxdataadd = dataupdate.add_works.map(docmap => docmap.id).indexOf(doc.name)
                                                                                var temp = [...dataupdate.add_works]
                                                                                idxdataadd === -1 ? temp[temp.length - 1].name = e.target.value : temp[idxdataadd].name = e.target.value
                                                                                setdataupdate(prev => ({
                                                                                    ...prev,
                                                                                    add_works: temp
                                                                                }))
                                                                            }
                                                                        }}></Input>
                                                                    </div>
                                                                    <div className="col-span-1 ml-1 mb-3">
                                                                        <Select key={idx} name={`name`} value={doc.type} style={{ width: `100%` }} onChange={(value) => {
                                                                            var temp = [...datadisplay.works]
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
                                                                            setdatadisplay(prev => ({
                                                                                ...prev,
                                                                                works: temp
                                                                            }))
                                                                            if (doc.id) {
                                                                                var idxdataupdate = dataupdate.update_works.map(docmap => docmap.id).indexOf(doc.id)
                                                                                if (idxdataupdate === -1) {
                                                                                    setdataupdate(prev => ({
                                                                                        ...prev,
                                                                                        update_works: [...prev.update_works, { ...temp[idx] }]
                                                                                    }))
                                                                                }
                                                                                else {
                                                                                    var temp2 = [...dataupdate.update_works]
                                                                                    temp2[idxdataupdate] = temp[idx]
                                                                                    setdataupdate(prev => ({
                                                                                        ...prev,
                                                                                        update_works: temp2
                                                                                    }))
                                                                                }
                                                                            }
                                                                            else {
                                                                                var idxdataadd = dataupdate.add_works.map(docmap => docmap.id).indexOf(doc.name)
                                                                                console.log(idxdataadd)
                                                                                var temp2 = [...dataupdate.add_works]
                                                                                idxdataadd === -1 ? temp2[temp2.length - 1] = temp[idx] : temp2[idxdataadd] = temp[idx]
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
                                                                            var temp = [...datadisplay.works]
                                                                            temp[idx].name = e.target.value
                                                                            setdatadisplay(prev => ({
                                                                                ...prev,
                                                                                works: temp
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
                                                                                var idxdataadd = dataupdate.add_works.map(docmap => docmap.id).indexOf(doc.name)
                                                                                var temp = [...dataupdate.add_works]
                                                                                idxdataadd === -1 ? temp[temp.length - 1].description = e.target.value : temp[idxdataadd].description = e.target.value
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
                                                                                        var temp = [...datadisplay.works]
                                                                                        temp[idx].lists.push(tempcb)
                                                                                        setdatadisplay(prev => ({
                                                                                            ...prev,
                                                                                            works: temp
                                                                                        }))
                                                                                        if (doc.id) {
                                                                                            var idxdataupdate = dataupdate.update_works.map(docmap => docmap.id).indexOf(doc.id)
                                                                                            if (idxdataupdate === -1) {
                                                                                                setdataupdate(prev => ({
                                                                                                    ...prev,
                                                                                                    update_works: [...prev.update_works, { ...doc, lists: temp[idx].lists }]
                                                                                                }))
                                                                                            }
                                                                                            else {
                                                                                                var temp2 = [...dataupdate.update_works]
                                                                                                temp2[idxdataupdate].lists = temp[idx].lists
                                                                                                setdataupdate(prev => ({
                                                                                                    ...prev,
                                                                                                    update_works: temp2
                                                                                                }))
                                                                                            }
                                                                                        }
                                                                                        else {
                                                                                            var idxdataadd = dataupdate.add_works.map(docmap => docmap.id).indexOf(doc.name)
                                                                                            var temp2 = [...dataupdate.add_works]
                                                                                            idxdataadd === -1 ? temp2[temp2.length - 1].lists = temp[idx].lists : temp2[idxdataadd].lists = temp[idx].lists
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
                                                                                        var temp = [...datadisplay.works]
                                                                                        temp[idx].columns.push(tempcolumnmatriks)
                                                                                        setdatadisplay(prev => ({
                                                                                            ...prev,
                                                                                            works: temp
                                                                                        }))
                                                                                        if (doc.id) {
                                                                                            var idxdataupdate = dataupdate.update_works.map(docmap => docmap.id).indexOf(doc.id)
                                                                                            if (idxdataupdate === -1) {
                                                                                                setdataupdate(prev => ({
                                                                                                    ...prev,
                                                                                                    update_works: [...prev.update_works, { ...doc, columns: temp[idx].columns }]
                                                                                                }))
                                                                                            }
                                                                                            else {
                                                                                                var temp2 = [...dataupdate.update_works]
                                                                                                temp2[idxdataupdate].columns = temp[idx].columns
                                                                                                setdataupdate(prev => ({
                                                                                                    ...prev,
                                                                                                    update_works: temp2
                                                                                                }))
                                                                                            }
                                                                                        }
                                                                                        else {
                                                                                            var idxdataadd = dataupdate.add_works.map(docmap => docmap.id).indexOf(doc.name)
                                                                                            var temp2 = [...dataupdate.add_works]
                                                                                            idxdataadd === -1 ? temp2[temp2.length - 1].columns = temp[idx].columns : temp2[idxdataadd].columns = temp[idx].columns
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
                                                                                        var temp = [...datadisplay.works]
                                                                                        temp[idx].is_general = e.target.value
                                                                                        setdatadisplay(prev => ({
                                                                                            ...prev,
                                                                                            works: temp
                                                                                        }))
                                                                                        if (doc.id) {
                                                                                            var idxdataupdate = dataupdate.update_works.map(docmap => docmap.id).indexOf(doc.id)
                                                                                            if (idxdataupdate === -1) {
                                                                                                setdataupdate(prev => ({
                                                                                                    ...prev,
                                                                                                    update_works: [...prev.update_works, { ...doc, is_general: temp[idx].is_general }]
                                                                                                }))
                                                                                            }
                                                                                            else {
                                                                                                var temp2 = [...dataupdate.update_works]
                                                                                                temp2[idxdataupdate].is_general = temp[idx].is_general
                                                                                                setdataupdate(prev => ({
                                                                                                    ...prev,
                                                                                                    update_works: temp2
                                                                                                }))
                                                                                            }
                                                                                        }
                                                                                        else {
                                                                                            var idxdataadd = dataupdate.add_works.map(docmap => docmap.id).indexOf(doc.name)
                                                                                            var temp2 = [...dataupdate.add_works]
                                                                                            idxdataadd === -1 ? temp2[temp2.length - 1].is_general = temp[idx].is_general : temp2[idxdataadd].is_general = temp[idx].is_general
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
                                                                                                var temp = [...datadisplay.works]
                                                                                                temp[idx].rows.push(temprowmatriks)
                                                                                                setdatadisplay(prev => ({
                                                                                                    ...prev,
                                                                                                    works: temp
                                                                                                }))
                                                                                                if (doc.id) {
                                                                                                    var idxdataupdate = dataupdate.update_works.map(docmap => docmap.id).indexOf(doc.id)
                                                                                                    if (idxdataupdate === -1) {
                                                                                                        setdataupdate(prev => ({
                                                                                                            ...prev,
                                                                                                            update_works: [...prev.update_works, { ...doc, rows: temp[idx].rows }]
                                                                                                        }))
                                                                                                    }
                                                                                                    else {
                                                                                                        var temp2 = [...dataupdate.update_works]
                                                                                                        temp2[idxdataupdate].rows = temp[idx].rows
                                                                                                        setdataupdate(prev => ({
                                                                                                            ...prev,
                                                                                                            update_works: temp2
                                                                                                        }))
                                                                                                    }
                                                                                                }
                                                                                                else {
                                                                                                    var idxdataadd = dataupdate.add_works.map(docmap => docmap.id).indexOf(doc.name)
                                                                                                    var temp2 = [...dataupdate.add_works]
                                                                                                    idxdataadd === -1 ? temp2[temp2.length - 1].rows = temp[idx].rows : temp2[idxdataadd].rows = temp[idx].rows
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
                                                                                                            var temp = [...datadisplay.works]
                                                                                                            temp[idx].lists[idx3] = ({ ...doc3, type: value })
                                                                                                            setdatadisplay(prev => ({
                                                                                                                ...prev,
                                                                                                                works: temp
                                                                                                            }))
                                                                                                            if (doc.id) {
                                                                                                                var idxdataupdate = dataupdate.update_works.map(docmap => docmap.id).indexOf(doc.id)
                                                                                                                if (idxdataupdate === -1) {
                                                                                                                    setdataupdate(prev => ({
                                                                                                                        ...prev,
                                                                                                                        update_works: [...prev.update_works, { ...doc, lists: temp[idx].lists }]
                                                                                                                    }))
                                                                                                                }
                                                                                                                else {
                                                                                                                    var temp2 = [...dataupdate.update_works]
                                                                                                                    temp2[idxdataupdate].lists = temp[idx].lists
                                                                                                                    setdataupdate(prev => ({
                                                                                                                        ...prev,
                                                                                                                        update_works: temp2
                                                                                                                    }))
                                                                                                                }
                                                                                                            }
                                                                                                            else {
                                                                                                                var idxdataadd = dataupdate.add_works.map(docmap => docmap.id).indexOf(doc.name)
                                                                                                                var temp2 = [...dataupdate.add_works]
                                                                                                                idxdataadd === -1 ? temp2[temp2.length - 1].lists = temp[idx].lists : temp2[idxdataadd].lists = temp[idx].lists
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
                                                                                                        var temp = [...datadisplay.works]
                                                                                                        temp[idx].lists[idx3] = ({ ...doc3, description: e.target.value })
                                                                                                        setdatadisplay(prev => ({
                                                                                                            ...prev,
                                                                                                            works: temp
                                                                                                        }))
                                                                                                        if (doc.id) {
                                                                                                            var idxdataupdate = dataupdate.update_works.map(docmap => docmap.id).indexOf(doc.id)
                                                                                                            if (idxdataupdate === -1) {
                                                                                                                setdataupdate(prev => ({
                                                                                                                    ...prev,
                                                                                                                    update_works: [...prev.update_works, { ...doc, lists: temp[idx].lists }]
                                                                                                                }))
                                                                                                            }
                                                                                                            else {
                                                                                                                var temp2 = [...dataupdate.update_works]
                                                                                                                temp2[idxdataupdate].lists = temp[idx].lists
                                                                                                                setdataupdate(prev => ({
                                                                                                                    ...prev,
                                                                                                                    update_works: temp2
                                                                                                                }))
                                                                                                            }
                                                                                                        }
                                                                                                        else {
                                                                                                            var idxdataadd = dataupdate.add_works.map(docmap => docmap.id).indexOf(doc.name)
                                                                                                            var temp2 = [...dataupdate.add_works]
                                                                                                            idxdataadd === -1 ? temp2[temp2.length - 1].lists = temp[idx].lists : temp2[idxdataadd].lists = temp[idx].lists
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
                                                                                    var temp = [...datadisplay.works]
                                                                                    temp[idx].lists.push({ type: null, description: "" })
                                                                                    setdatadisplay(prev => ({
                                                                                        ...prev,
                                                                                        works: temp
                                                                                    }))
                                                                                    if (doc.id) {
                                                                                        var idxdataupdate = dataupdate.update_works.map(docmap => docmap.id).indexOf(doc.id)
                                                                                        if (idxdataupdate === -1) {
                                                                                            setdataupdate(prev => ({
                                                                                                ...prev,
                                                                                                update_works: [...prev.update_works, { ...doc, lists: temp[idx].lists }]
                                                                                            }))
                                                                                        }
                                                                                        else {
                                                                                            var temp2 = [...dataupdate.update_works]
                                                                                            temp2[idxdataupdate].lists = temp[idx].lists
                                                                                            setdataupdate(prev => ({
                                                                                                ...prev,
                                                                                                update_works: temp2
                                                                                            }))
                                                                                        }
                                                                                    }
                                                                                    else {
                                                                                        var idxdataadd = dataupdate.add_works.map(docmap => docmap.id).indexOf(doc.name)
                                                                                        var temp2 = [...dataupdate.add_works]
                                                                                        idxdataadd === -1 ? temp2[temp2.length - 1].lists = temp[idx].lists : temp2[idxdataadd].lists = temp[idx].lists
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
                                                                                        var temp = [...datadisplay.works]
                                                                                        temp[idx].dropdown_name = e.target.value
                                                                                        setdatadisplay(prev => ({
                                                                                            ...prev,
                                                                                            works: temp
                                                                                        }))
                                                                                        if (doc.id) {
                                                                                            var idxdataupdate = dataupdate.update_works.map(docmap => docmap.id).indexOf(doc.id)
                                                                                            if (idxdataupdate === -1) {
                                                                                                setdataupdate(prev => ({
                                                                                                    ...prev,
                                                                                                    update_works: [...prev.update_works, { ...doc, dropdown_name: temp[idx].dropdown_name }]
                                                                                                }))
                                                                                            }
                                                                                            else {
                                                                                                var temp2 = [...dataupdate.update_works]
                                                                                                temp2[idxdataupdate].dropdown_name = temp[idx].dropdown_name
                                                                                                setdataupdate(prev => ({
                                                                                                    ...prev,
                                                                                                    update_works: temp2
                                                                                                }))
                                                                                            }
                                                                                        }
                                                                                        else {
                                                                                            var idxdataadd = dataupdate.add_works.map(docmap => docmap.id).indexOf(doc.name)
                                                                                            var temp2 = [...dataupdate.add_works]
                                                                                            idxdataadd === -1 ? temp2[temp2.length - 1].dropdown_name = temp[idx].dropdown_name : temp2[idxdataadd].dropdown_name = temp[idx].dropdown_name
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
                                                                                                    var temp = [...datadisplay.works]
                                                                                                    temp[idx].lists[idx4] = e.target.value
                                                                                                    setdatadisplay(prev => ({
                                                                                                        ...prev,
                                                                                                        works: temp
                                                                                                    }))
                                                                                                    if (doc.id) {
                                                                                                        var idxdataupdate = dataupdate.update_works.map(docmap => docmap.id).indexOf(doc.id)
                                                                                                        if (idxdataupdate === -1) {
                                                                                                            setdataupdate(prev => ({
                                                                                                                ...prev,
                                                                                                                update_works: [...prev.update_works, { ...doc, lists: temp[idx].lists }]
                                                                                                            }))
                                                                                                        }
                                                                                                        else {
                                                                                                            var temp2 = [...dataupdate.update_works]
                                                                                                            temp2[idxdataupdate].lists = temp[idx].lists
                                                                                                            setdataupdate(prev => ({
                                                                                                                ...prev,
                                                                                                                update_works: temp2
                                                                                                            }))
                                                                                                        }
                                                                                                    }
                                                                                                    else {
                                                                                                        var idxdataadd = dataupdate.add_works.map(docmap => docmap.id).indexOf(doc.name)
                                                                                                        var temp2 = [...dataupdate.add_works]
                                                                                                        idxdataadd === -1 ? temp2[temp2.length - 1].lists = temp[idx].lists : temp2[idxdataadd].lists = temp[idx].lists
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
                                                                                    var temp = [...datadisplay.works]
                                                                                    temp[idx].lists.push("")
                                                                                    setdatadisplay(prev => ({
                                                                                        ...prev,
                                                                                        works: temp
                                                                                    }))
                                                                                    if (doc.id) {
                                                                                        var idxdataupdate = dataupdate.update_works.map(docmap => docmap.id).indexOf(doc.id)
                                                                                        if (idxdataupdate === -1) {
                                                                                            setdataupdate(prev => ({
                                                                                                ...prev,
                                                                                                update_works: [...prev.update_works, { ...doc, lists: temp[idx].lists }]
                                                                                            }))
                                                                                        }
                                                                                        else {
                                                                                            var temp2 = [...dataupdate.update_works]
                                                                                            temp2[idxdataupdate].lists = temp[idx].lists
                                                                                            setdataupdate(prev => ({
                                                                                                ...prev,
                                                                                                update_works: temp2
                                                                                            }))
                                                                                        }
                                                                                    }
                                                                                    else {
                                                                                        var idxdataadd = dataupdate.add_works.map(docmap => docmap.id).indexOf(doc.name)
                                                                                        var temp2 = [...dataupdate.add_works]
                                                                                        idxdataadd === -1 ? temp2[temp2.length - 1].lists = temp[idx].lists : temp2[idxdataadd].lists = temp[idx].lists
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
                                                                            var tempp = temp.filter(dfil => { console.log(dfil.id, doc.id); return dfil.id !== doc.id })
                                                                            setdatadisplay(prev => ({
                                                                                ...prev,
                                                                                works: [...tempp]
                                                                            }))
                                                                            temp2[idx].id ?
                                                                                setdataupdate(prev => ({
                                                                                    ...prev,
                                                                                    delete_works: [...prev.delete_works, temp2[idx].id]
                                                                                }))
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

export {
    DrawerBank, DrawerLokasi, DrawerSublokasi, DrawerBankClient, DrawerLokasiClient, DrawerAddRelasi, DrawerUpdateRelasi, DrawerTaskTypesCreate, DrawerTaskTypesUpdate
}
