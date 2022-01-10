import React, { useState, useEffect } from 'react'
import DrawerCore from './drawerCore'
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
                        {/* <AtmBank from={createdata.color_first} to={createdata.color_second}></AtmBank> */}
                        <div className={`w-5/12 h-28 rounded-md bg-gradient-to-tl ${createdata.color_first} ${createdata.color_second} relative mr-3`}>
                            <div className="absolute bottom-0 right-2">
                                <img src="/image/visa.png" className="object-contain" />
                            </div>
                        </div>
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
                        {/* <AtmBank from={createdata.color_first} to={createdata.color_second}></AtmBank> */}
                        <div className={`w-5/12 h-28 rounded-md bg-gradient-to-tl ${createdata.color_first} ${createdata.color_second} relative mr-3`}>
                            <div className="absolute bottom-0 right-2">
                                <img src="/image/visa.png" className="object-contain" />
                            </div>
                        </div>
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
    const [warningphonenumber, setwarningphonenumber] = useState(false)
    const [warningemail, setwarningemail] = useState(false)
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
    const onChangeEmail = (e) => {
        setcreatedata({
            ...createdata,
            email: e.target.value
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
        // console.log(/(^\d+$)/.test(createdata.phone_number), createdata.phone_number)
        if (/(^\d+$)/.test(createdata.phone_number) === false || /(\-)|(^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/.test(createdata.email) === false) {
            // console.log(new RegExp(/(^\d+$)/).test(createdata.phone_number))
            new RegExp(/(^\d+$)/).test(createdata.phone_number) === false ? setwarningphonenumber(true) : setwarningphonenumber(false)
            new RegExp(/(\-)|(^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/).test(createdata.email) === false ? setwarningemail(true) : setwarningemail(false)
            setdisabledsave(true)
        }
        else {
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
                        setdisabledsave(true)
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
            onClose={() => {
                setcreatedata({
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
                setdynamicattr({
                    email: false,
                    website: false,
                    npwp: false,
                    fax: false,
                    tanggal_pkp: false
                })
                setwarningphonenumber(false)
                setwarningemail(false)
                setdisabledsave(true)
                onvisible(false)
            }}
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
                        {warningphonenumber && <p className=' text-red-500 text-sm mb-3 -mt-3 mx-3'>Nomor Telepon harus angka</p>}
                        <InputRequired name="penanggung_jawab" onChangeInput={onChangeInput} label="Penanggung Jawab (PIC)"></InputRequired>
                        {dynamicattr.email && <InputNotRequired name="email" onChangeInput={onChangeEmail} label="Email"></InputNotRequired>}
                        {warningemail && <p className=' text-red-500 text-sm mb-3 -mt-3 mx-3'>Email belum diisi dengan benar</p>}
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
    const [warningphonenumber, setwarningphonenumber] = useState(false)
    const [warningemail, setwarningemail] = useState(false)

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
        if (/(^\d+$)/.test(createdata.phone_number) === false || /(\-)|(^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/.test(createdata.email) === false) {
            // console.log(new RegExp(/(^\d+$)/).test(createdata.phone_number))
            new RegExp(/(^\d+$)/).test(createdata.phone_number) === false ? setwarningphonenumber(true) : setwarningphonenumber(false)
            new RegExp(/(\-)|(^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/).test(createdata.email) === false ? setwarningemail(true) : setwarningemail(false)
            setdisabledsave(true)
        }
        else {
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
                        {warningphonenumber && <p className=' text-red-500 text-sm mb-3 -mt-3 mx-3'>Nomor Telepon harus angka</p>}
                        <InputRequired name="penanggung_jawab" onChangeInput={onChangeInput} label="Penanggung Jawab (PIC)"></InputRequired>
                        {dynamicattr.email && <InputNotRequired name="email" onChangeInput={onChangeInputNotRequired} label="Email"></InputNotRequired>}
                        {warningemail && <p className=' text-red-500 text-sm mb-3 -mt-3 mx-3'>Email belum diisi dengan benar</p>}
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
    const [warningphonenumber, setwarningphonenumber] = useState(false)
    const [warningemail, setwarningemail] = useState(false)

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
        if (/(^\d+$)/.test(createdata.phone_number) === false) {
            // console.log(new RegExp(/(^\d+$)/).test(createdata.phone_number))
            new RegExp(/(^\d+$)/).test(createdata.phone_number) === false ? setwarningphonenumber(true) : setwarningphonenumber(false)
            setdisabledsave(true)
        }
        else {
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
                        {warningphonenumber && <p className=' text-red-500 text-sm mb-3 -mt-3 mx-3'>Nomor Telepon harus angka</p>}
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
        from_inverse: true,
        type_id: -3,
        connected_ids: null,
        backup_connected_ids: null
    })
    const [displaydatarelations, setdisplaydatarelations] = useState([])
    const [relationnameadd, setrelationnameadd] = useState("")
    const [relationnameddadd, setrelationnameddadd] = useState(false)
    const [relationselectedidxadd, setrelationselectedidxadd] = useState(-1)
    const [relationselectedisinverseadd, setrelationselectedisinverseadd] = useState(-1)
    const [detailtipeadd, setdetailtipeadd] = useState(-9)
    const [detailtipedataadd, setdetailtipedataadd] = useState([])
    const [modaladd, setmodaladd] = useState(false)
    const [disabledadd, setdisabledadd] = useState(true)
    const [loadingadd, setloadingadd] = useState(false)
    const [fetchingmodel, setfetchingmodel] = useState(false)
    const [sublocdata, setsublocdata] = useState(null)
    const [subloctrig, setsubloctrig] = useState(-1)

    const handleAddRelationshipItem = () => {
        setloadingadd(true)
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
                        type_id: -3,
                        connected_ids: null,
                        backup_connected_ids: null,
                        from_inverse: true
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
            fetch(`https://boiling-thicket-46501.herokuapp.com/getFilterInventories`, {
                method: `GET`,
                headers: {
                    'Authorization': JSON.parse(initProps),
                }
            })
                .then(res => res.json())
                .then(res2 => {
                    setdetailtipedataadd(res2.data)
                    // dataApiadd.type_id === -3 && setdetailtipedataadd([res2.data])
                    // dataApiadd.type_id === -1 && setdetailtipedataadd(res2.data)
                    // dataApiadd.type_id === -2 && setdetailtipedataadd(res2.data)
                    // dataApiadd.type_id === -4 && setdetailtipedataadd(res2.data.data)
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
                    {/* <div className="flex flex-col mb-3">
                        <p className="mb-0">Tipe <span className="tipepart"></span></p>
                        <Select disabled value={dataApiadd.type_id} onChange={(value) => {
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
                    </div> */}
                    {
                        dataApiadd.type_id !== null ?
                            <>
                                {
                                    <div className="flex flex-col mb-3">
                                        <p className="mb-0">Item</p>
                                        <Select allowClear value={dataApiadd.connected_ids} showSearch optionFilterProp="children" notFoundContent={fetchingmodel ? <Spin size="small" /> : null} onSearch={(value) => {
                                            setfetchingmodel(true)
                                            fetch(`https://boiling-thicket-46501.herokuapp.com/getFilterInventories?keyword=${value !== "" ? value : ""}`, {
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
                                        }}
                                            // filterOption={(input, opt) => (
                                            //     opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            // )} 
                                            onChange={(value) => {
                                                setdataApiadd({ ...dataApiadd, connected_ids: [value], backup_connected_ids: [value] })
                                            }}>
                                            {
                                                detailtipedataadd.map((doc, idx) => {
                                                    return (
                                                        <Select.Option value={doc.id}>{doc.mig_id} - {doc.model_name} - {doc.asset_name}</Select.Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </div>
                                }
                                {/* {
                                    dataApiadd.type_id === -1 &&
                                    <div className="flex flex-col mb-3">
                                        <p className="mb-0">Item</p>
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
                                } */}
                            </>
                            :
                            null

                    }
                    {/* {
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
                    } */}
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

export {
    DrawerBank, DrawerLokasi, DrawerSublokasi, DrawerBankClient, DrawerLokasiClient, DrawerAddRelasi, DrawerUpdateRelasi
}
