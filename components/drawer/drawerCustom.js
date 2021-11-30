import React, { useState, useEffect } from 'react'
import DrawerCore from './drawerCore'
import { AtmBank } from '../atm'
import { DateRequired, InputRequired, RadioRequired, TreeSelectRequired } from '../input'
import { Spin, notification, Input } from 'antd'
import { CameraIconSvg, EmailIconSvg, FaxIconSvg, NotesIconSvg, PkpIconSvg, RefreshIconSvg, SquarePlusIconSvg, WebIconSvg } from '../icon'
import { useRouter } from 'next/router'
import { Label, Text } from '../typography'
import ButtonSys from '../button'
import { LoadingOutlined } from '@ant-design/icons'
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

    const onChangeInput = (e) => {
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
    return (
        <DrawerCore
            title={title}
            visible={visible}
            onClose={onClose}
            buttonOkText={buttonOkText}
            onClick={handleCreateLokasi}
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
                        {dynamicattr.email && <InputRequired name="email" onChangeInput={onChangeInput} label="Email"></InputRequired>}
                        {dynamicattr.website && <InputRequired name="website" onChangeInput={onChangeInput} label="Website"></InputRequired>}
                        {dynamicattr.npwp && <InputRequired name="npwp" onChangeInput={onChangeInput} label="NPWP"></InputRequired>}
                        {dynamicattr.fax && <InputRequired name="fax" onChangeInput={onChangeInput} label="Fax"></InputRequired>}
                        {dynamicattr.tanggal_pkp && <DateRequired name="tanggal_pkp" onChangeDate={onchangeDate} label="Tanggal PKP" defaultValue={createdata.tanggal_pkp === "" ? null : moment(createdata.tanggal_pkp)}></DateRequired>}
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

const DrawerLokasiClient = ({ title, visible, onClose, children, buttonOkText, initProps, onvisible }) => {
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

    const onChangeInput = (e) => {
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
                        rt.push(`/company/clients/locations`)
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
    return (
        <DrawerCore
            title={title}
            visible={visible}
            onClose={onClose}
            buttonOkText={buttonOkText}
            onClick={handleCreateLokasi}
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
                        {dynamicattr.email && <InputRequired name="email" onChangeInput={onChangeInput} label="Email"></InputRequired>}
                        {dynamicattr.website && <InputRequired name="website" onChangeInput={onChangeInput} label="Website"></InputRequired>}
                        {dynamicattr.npwp && <InputRequired name="npwp" onChangeInput={onChangeInput} label="NPWP"></InputRequired>}
                        {dynamicattr.fax && <InputRequired name="fax" onChangeInput={onChangeInput} label="Fax"></InputRequired>}
                        {dynamicattr.tanggal_pkp && <DateRequired name="tanggal_pkp" onChangeDate={onchangeDate} label="Tanggal PKP" defaultValue={createdata.tanggal_pkp === "" ? null : moment(createdata.tanggal_pkp)}></DateRequired>}
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
    const [treedata, settreedata] = useState([])
    const [sameaddress, setsameaddress] = useState(false)
    const [lokasiloading, setlokasiloading] = useState(false)
    const [loadingfoto, setloadingfoto] = useState(false)

    const onChangeInput = (e) => {
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
    const onChangeRadioAlamat = (e) => {
        e.target.value === true ? setsameaddress(true) : setsameaddress(false)
        setcreatedata({
            ...createdata,
            address_same: e.target.value
        })
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
    return (
        <DrawerCore
            title={title}
            visible={visible}
            onClose={onClose}
            buttonOkText={buttonOkText}
            onClick={handleCreateSubLokasi}
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
                        <RadioRequired name="currency" label="Alamat Sub Lokasi" onChangeRadio={onChangeRadioAlamat} options={
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

export {
    DrawerBank, DrawerLokasi, DrawerSublokasi, DrawerBankClient, DrawerLokasiClient
}
