import Layout from '../../../components/layout-dashboardNew'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import st from '../../../components/layout-dashboard-mig.module.css'
import Link from 'next/link'
import { Switch, DatePicker, Input, Form, Spin, notification } from 'antd'
import Buttonsys from '../../../components/button'
import { H1, H2, Label } from '../../../components/typography'
import { EditIconSvg, EmailIconSvg, PhoneIconSvg, WebIconSvg, LocationIconSvg, SubLocationIconSvg, ShareIconSvg, TrashIconSvg, CheckIconSvg } from '../../../components/icon'
import moment from 'moment'
import { ModalEdit, ModalHapus } from '../../../components/modal/modalCustom'
import { DrawerBank } from '../../../components/drawer/drawerCustom'
import DrawerCore from '../../../components/drawer/drawerCore'
import { InputRequired, RadioRequired } from '../../../components/input'
import { AtmMain, AtmBank } from '../../../components/atm'


const MyCompanyIndex2 = ({ initProps, dataProfile, sidemenu }) => {
    const rt = useRouter()
    const tok = initProps
    const [instanceForm] = Form.useForm();
    var activeTab = "profile"
    const { active } = rt.query
    if (active) {
        activeTab = active
    }

    //useState
    const [patharr, setpatharr] = useState([])
    const [displaydata, setdisplaydata] = useState({
        name: "",
        address: "",
        phone_number: "",
        image_logo: "",
        singkatan: "",
        tanggal_pkp: moment(new Date()),
        penanggung_jawab: "",
        npwp: "",
        fax: "",
        email: "",
        website: ""
    })
    const [hapusbankdata, sethapusbankdata] = useState({
        id: ""
    })
    const [editbankdata, seteditbankdata] = useState({
        id: "",
        name: '',
        account_number: '',
        owner: '',
        currency: '',
        preset: 1,
    })
    const [isenabled, setisenabled] = useState(false)
    //edit
    const [editable, seteditable] = useState(false)
    const [modaledit, setmodaledit] = useState(false)
    const [praloadingedit, setpraloadingedit] = useState(true)
    const [editloading, seteditloading] = useState(false)
    //BANKS
    const [banks, setbanks] = useState([])
    //create
    const [bankdrawer, setbankdrawer] = useState(false)
    //edit
    const [bankdraweredit, setbankdraweredit] = useState(false)
    const [bankloadingedit, setbankloadingedit] = useState(false)
    //delete
    const [bankmodalhapus, setbankmodalhapus] = useState(false)
    const [bankloadinghapus, setbankloadinghapus] = useState(false)

    //handler
    const onChangeInput = (e) => {
        setdisplaydata({
            ...displaydata,
            [e.target.name]: e.target.value
        })
    }
    const onChangeInputBankEdit = (e) => {
        seteditbankdata({
            ...editbankdata,
            [e.target.name]: e.target.value
        })
    }
    const onChangeRadioBankEdit = (e) => {
        seteditbankdata({
            ...editbankdata,
            [e.target.name]: e.target.value
        })
    }
    const handleEdit = () => {
        if (displaydata.address === "") {
            setdisplaydata({
                ...displaydata,
                address: '-',
            })
        }
        if (displaydata.phone_number === "") {
            setdisplaydata({
                ...displaydata,
                phone_number: '-'
            })
        }
        seteditloading(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateMainCompany`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(displaydata)
        })
            .then(res => res.json())
            .then(res2 => {
                setmodaledit(false)
                seteditloading(false)
                if (res2.success) {
                    seteditable(false)
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/company/myCompany/index2`)
                    }, 500)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }
    const handleDeleteBank = () => {
        setbankloadinghapus(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteMainBank?id=${hapusbankdata.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setbankloadinghapus(false)
                setbankmodalhapus(false)
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/company/myCompany/index2`)
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
    const handleEditBank = () => {
        setbankloadingedit(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateMainBank`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editbankdata)
        })
            .then((res) => res.json())
            .then(res2 => {
                setbankloadingedit(false)
                setbankdraweredit(false)
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/company/myCompany/index2`)
                    }, 500)
                }
                else {
                    notification['error']({
                        message: res2.erroInfo.status_detail,
                        duration: 3
                    })
                }
            })
    }

    //useEffect
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getMainCompanyDetail`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(tok),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                var temp2 = rt.pathname.split("/").slice(1)
                temp2[temp2.length - 1] = res2.data.name
                setpatharr(temp2)
                setdisplaydata({
                    id: res2.data.id,
                    name: res2.data.name,
                    address: res2.data.address,
                    phone_number: res2.data.phone_number,
                    image_logo: res2.data.image_logo === "-" || res2.data.image_logo === "" ? '/default-users.jpeg' : res2.data.image_logo,
                    singkatan: res2.data.singkatan,
                    tanggal_pkp: res2.data.tanggal_pkp === null ? moment(new Date()) : moment(res2.data.tanggal_pkp),
                    penanggung_jawab: res2.data.penanggung_jawab,
                    npwp: res2.data.npwp,
                    fax: res2.data.fax,
                    email: res2.data.email,
                    website: res2.data.website
                })
                setisenabled(res2.data.is_enabled)
                setpraloadingedit(false)
            })
    }, [])
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getMainBanks`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(tok),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setbanks(res2.data)
            })
    }, [bankloadinghapus, bankloadingedit, bankdrawer])
    return (
        <Layout tok={tok} dataProfile={dataProfile} sidemenu={sidemenu} pathArr={patharr} st={st}>
            <div className="grid grid-cols-12">
                {
                    praloadingedit ?
                        null
                        :
                        <div className="col-span-3 flex flex-col shadow-md rounded bg-white m-3">
                            <Spin spinning={editloading}>
                                <Form form={instanceForm} initialValues={displaydata}>
                                    <div className="max-h-24 relative">
                                        <img src={`/image/Rectangle.png`} alt="" className="object-fit max-h-24 w-full rounded-t" />
                                        <div className="absolute -bottom-1/2 bg-white left-28 rounded-full">
                                            <img src={displaydata.image_logo} alt="" className="object-contain w-24 h-24" />
                                        </div>
                                    </div>
                                    <div className="mt-14 flex flex-col justify-center text-center">
                                        {
                                            editable ?
                                                <div className={`flex flex-col px-5`}>
                                                    <div className="flex">
                                                        <Label>Nama Perusahaan</Label>
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
                                                    <Form.Item name="name"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Nama Perusahaan wajib diisi',
                                                            },
                                                        ]}>
                                                        <Input name="name" onChange={onChangeInput}></Input>
                                                    </Form.Item>
                                                </div>
                                                :
                                                <H1>{displaydata.name ?? "-"}</H1>
                                        }
                                        <Label>{displaydata.singkatan}</Label>
                                    </div>
                                    {
                                        editable ?
                                            <div className="flex justify-center items-center mt-5">
                                                <div className="mx-1" onClick={() => { seteditable(false) }}>
                                                    <Buttonsys type="default">
                                                        X Batalkan
                                                    </Buttonsys>
                                                </div>
                                                <div className="mx-1" onClick={() => { }}>
                                                    <Buttonsys type="primary" submit={true} onClick={() => { instanceForm.submit(); setmodaledit(true) }}>
                                                        X Simpan
                                                    </Buttonsys>
                                                </div>
                                            </div>
                                            :
                                            <div className="mt-5 flex justify-center items-center cursor-pointer" onClick={() => { seteditable(true) }}>
                                                <div className="mr-1 mb-1">
                                                    <EditIconSvg size={20} />
                                                </div>
                                                <Label color="green">Sunting Profil</Label>
                                            </div>
                                    }
                                    <div className="mt-7 flex flex-col px-5">
                                        <div className="flex flex-col mb-5">
                                            <Label>Status Perusahaan</Label>
                                            {
                                                isenabled ?
                                                    <div className="flex justify-between">
                                                        <p className="text-primary100 font-semibold mb-0">Aktif</p>
                                                        <Switch defaultChecked={true} disabled />
                                                    </div>
                                                    :
                                                    <div className="flex justify-between">
                                                        <p className="font-semibold mb-0">Non Aktif</p>
                                                        <Switch defaultChecked={false} disabled />
                                                    </div>
                                            }
                                        </div>
                                        <div className={`flex flex-col mb-5`}>
                                            <Label>Singkatan</Label>
                                            {
                                                editable ?
                                                    <Input name="singkatan" defaultValue={displaydata.singkatan ?? "-"} onChange={onChangeInput}></Input>
                                                    :
                                                    <p className="mb-0">{displaydata.singkatan ?? "-"}</p>
                                            }
                                        </div>
                                        <div className="flex flex-col mb-5">
                                            <Label>Alamat</Label>
                                            {
                                                editable ?
                                                    <Input name="address" onChange={onChangeInput} defaultValue={displaydata.address ?? "-"}></Input>
                                                    :
                                                    <p className="mb-0">{displaydata.address ?? "-"}</p>
                                            }
                                        </div>
                                        <div className="flex flex-col mb-5">
                                            <Label>Penanggung Jawab (PIC)</Label>
                                            {
                                                editable ?
                                                    <Input name="penanggung_jawab" onChange={onChangeInput} defaultValue={displaydata.penanggung_jawab ?? "-"}></Input>
                                                    :
                                                    <p className="mb-0">{displaydata.penanggung_jawab ?? "-"}</p>
                                            }
                                        </div>
                                        <div className="flex flex-col mb-5">
                                            <Label>Tanggal PKP</Label>
                                            {
                                                editable ?
                                                    <DatePicker onChange={(value, dateString) => {
                                                        setdisplaydata({ ...displaydata, tanggal_pkp: dateString })
                                                    }} defaultValue={displaydata.tanggal_pkp === "-" ? null : moment(displaydata.tanggal_pkp)}></DatePicker>
                                                    :
                                                    <p className="mb-0">{displaydata.tanggal_pkp === "-" ? "-" : moment(displaydata.tanggal_pkp).locale("id").format("LL")}</p>
                                            }
                                        </div>
                                        <div className="flex flex-col mb-5">
                                            <Label>NPWP</Label>
                                            {
                                                editable ?
                                                    <Input name="npwp" onChange={onChangeInput} defaultValue={displaydata.npwp ?? "-"}></Input>
                                                    :
                                                    <p className="mb-0">{displaydata.npwp ?? "-"}</p>
                                            }
                                        </div>
                                        <div className="flex flex-col mb-5">
                                            <Label>Email</Label>
                                            {
                                                editable ?
                                                    <Input name="email" onChange={onChangeInput} prefix={<EmailIconSvg size={15} />} defaultValue={displaydata.email ?? "-"}></Input>
                                                    :
                                                    <div className="flex">
                                                        <div className="mr-1">
                                                            <EmailIconSvg size={20} />
                                                        </div>
                                                        <a href={`mailto:${displaydata.email}`} className="text-primary100 hover:text-primary75">{displaydata.email}</a>
                                                    </div>
                                            }
                                        </div>
                                        <div className="flex flex-col mb-5">
                                            <Label>No.Telp</Label>
                                            {
                                                editable ?
                                                    <Input name="phone_number" onChange={onChangeInput} prefix={<PhoneIconSvg size={15} />} defaultValue={displaydata.phone_number ?? "-"}></Input>
                                                    :
                                                    <div className="flex">
                                                        <div className="mr-1">
                                                            <PhoneIconSvg size={20} />
                                                        </div>
                                                        <a href={`tel:${displaydata.phone_number}`} className="text-primary100 hover:text-primary75">{displaydata.phone_number}</a>
                                                    </div>
                                            }
                                        </div>
                                        <div className="flex flex-col mb-5">
                                            <Label>Website</Label>
                                            {
                                                editable ?
                                                    <Input name="website" onChange={onChangeInput} prefix={<WebIconSvg size={15} />} defaultValue={displaydata.website ?? "-"}></Input>
                                                    :
                                                    <div className="flex">
                                                        <div className="mr-1">
                                                            <WebIconSvg size={20} />
                                                        </div>
                                                        <a href={`${displaydata.website}`} className="text-primary100 hover:text-primary75">{displaydata.website}</a>
                                                    </div>
                                            }
                                        </div>
                                        {
                                            editable &&
                                            <div className="flex justify-center items-center mb-10">
                                                <Buttonsys type="primary" color="danger">
                                                    <div className="mr-1">
                                                        <TrashIconSvg size={18} color={"#FFFFFF"} />
                                                    </div>
                                                    Hapus Lokasi
                                                </Buttonsys>
                                            </div>
                                        }
                                    </div>
                                </Form>
                                <ModalEdit
                                    title={`Konfirmasi Edit Perusahaan`}
                                    visible={modaledit}
                                    onCancel={() => { setmodaledit(false) }}
                                    footer={
                                        <div className="flex justify-between items-center">
                                            <Buttonsys type="default" onClick={() => { setmodaledit(false) }}>
                                                Batalkan
                                            </Buttonsys>
                                            <Buttonsys type="primary" onClick={handleEdit}>
                                                <CheckIconSvg size={15} color={`#ffffff`} />
                                                Simpan
                                            </Buttonsys>
                                        </div>
                                    }
                                ></ModalEdit>
                            </Spin>
                        </div>
                }
                <div className="col-span-9 m-3 flex flex-col">
                    {/* Location */}
                    <div className="flex flex-col shadow-md rounded-md bg-white p-8 mb-5 mx-2">
                        <div className="flex justify-between items-center">
                            <H1>Lokasi</H1>
                            <Link href="/company/myCompany">
                                <Label color="green" cursor="pointer">Lihat Semua</Label>
                            </Link>
                        </div>
                        <div className="flex mt-5">
                            <div className="w-4/12 p-5 rounded-md bg-state2 flex justify-between items-center mx-2">
                                <LocationIconSvg size={30} color={"#FFFFFF"} />
                                <div className="flex flex-col">
                                    <p className="text-2xl text-white font-bold mb-0">20</p>
                                    <p className="text-sm text-white mb-0">Induk</p>
                                </div>
                            </div>
                            <div className="w-4/12 p-5 rounded-md bg-state3 flex justify-between items-center mx-2">
                                <SubLocationIconSvg size={30} color={"#FFFFFF"} />
                                <div className="flex flex-col">
                                    <p className="text-2xl text-white font-bold mb-0">300</p>
                                    <p className="text-sm text-white mb-0">Sub Induk 1</p>
                                </div>
                            </div>
                            <div className="w-4/12 p-5 rounded-md bg-state4 flex justify-between items-center mx-2">
                                <SubLocationIconSvg size={30} color={"#FFFFFF"} />
                                <div className="flex flex-col">
                                    <p className="text-2xl text-white font-bold mb-0">1795</p>
                                    <p className="text-sm text-white mb-0">Sub Lokasi Induk 1</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-6/12 flex flex-col mx-2">
                            {/* Bank */}
                            <div className="flex flex-col shadow-md rounded-md bg-white p-8 mb-5">
                                <div className="flex justify-between items-center">
                                    <H1>Akun Bank</H1>
                                    <div onClick={() => { setbankdrawer(true) }}>
                                        <Buttonsys type="primary" >
                                            + Tambah Akun Bank
                                        </Buttonsys>
                                    </div>
                                </div>
                                {
                                    banks.map((doc, idx) => {
                                        return (
                                            <div className="flex mt-5">
                                                <AtmMain idx={idx}></AtmMain>
                                                <div className="w-7/12 flex flex-col justify-between">
                                                    <div className="flex justify-between w-full items-center">
                                                        <H2>{doc.name ?? "-"}</H2>
                                                        <div className="dropdown dropdown-end">
                                                            <div tabIndex={0} className="cursor-pointer font-bold text-xl flex">...</div>
                                                            <ul tabIndex={0} className="p-2 shadow menu dropdown-content bg-white rounded w-52">
                                                                <li className="hover:bg-gray-50" onClick={() => { sethapusbankdata({ ...hapusbankdata, id: doc.id }); setbankmodalhapus(true) }}>
                                                                    <a>Hapus</a>
                                                                </li>
                                                                <li className="hover:bg-gray-50">
                                                                    <a>Ubah Warna Kartu</a>
                                                                </li>
                                                                <li className="hover:bg-gray-50" onClick={() => { seteditbankdata({ ...doc, preset: 4 }); setbankdraweredit(true) }}>
                                                                    <a>Ubah Informasi</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className=" flex flex-col">
                                                        <Label>***{doc.account_number.slice(doc.account_number.length - 4, doc.account_number.length)} - {doc.owner}</Label>
                                                        <Label>{doc.currency ?? "-"}</Label>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <DrawerBank
                                    title={"Tambah Bank"}
                                    visible={bankdrawer}
                                    onClose={() => { setbankdrawer(false) }}
                                    buttonOkText={"Simpan Bank"}
                                    initProps={initProps}
                                    onvisible={setbankdrawer}
                                ></DrawerBank>
                                <DrawerCore
                                    title={`Edit Bank`}
                                    visible={bankdraweredit}
                                    onClose={() => { setbankdraweredit(false) }}
                                    buttonOkText={`Simpan Bank`}
                                    onClick={handleEditBank}
                                >
                                    <Spin spinning={bankloadingedit}>
                                        <div className="flex flex-col">
                                            <div className="flex justify-center items-center mb-5">
                                                {editbankdata.preset === 1 && <AtmBank from="from-state1" to="to-state2"></AtmBank>}
                                                {editbankdata.preset === 2 && <AtmBank from="from-state3" to="to-state4"></AtmBank>}
                                                {editbankdata.preset === 3 && <AtmBank from="from-red-200" to="to-red-600"></AtmBank>}
                                                {editbankdata.preset === 4 && <AtmBank from="from-purple-600" to="to-pink-600"></AtmBank>}
                                            </div>
                                            <div className="flex justify-center mb-10">
                                                <div className={`w-8 h-8 rounded-full bg-gradient-to-tl from-state1 to-state2 border cursor-pointer ${editbankdata.preset === 1 && "border-primary100"} mx-2`} onClick={() => { seteditbankdata({ ...editbankdata, preset: 1 }) }}></div>
                                                <div className={`w-8 h-8 rounded-full bg-gradient-to-tl from-state3 to-state4 border cursor-pointer ${editbankdata.preset === 2 && "border-primary100"} mx-2`} onClick={() => { seteditbankdata({ ...editbankdata, preset: 2 }) }}></div>
                                                <div className={`w-8 h-8 rounded-full bg-gradient-to-tl from-red-200 to-red-600 border cursor-pointer ${editbankdata.preset === 3 && "border-primary100"} mx-2`} onClick={() => { seteditbankdata({ ...editbankdata, preset: 3 }) }}></div>
                                                <div className={`w-8 h-8 rounded-full bg-gradient-to-tl from-purple-200 to-pink-600 border cursor-pointer ${editbankdata.preset === 4 && "border-primary100"} mx-2`} onClick={() => { seteditbankdata({ ...editbankdata, preset: 4 }) }}></div>
                                            </div>
                                            <div className="flex flex-col ">
                                                <InputRequired name="name" defaultValue={editbankdata.name} onChangeInput={onChangeInputBankEdit} label="Nama Bank"></InputRequired>
                                                <InputRequired name="account_number" defaultValue={editbankdata.account_number} onChangeInput={onChangeInputBankEdit} label="Nomor Rekening"></InputRequired>
                                                <InputRequired name="owner" defaultValue={editbankdata.owner} onChangeInput={onChangeInputBankEdit} label="Nama Pemegang Rekening"></InputRequired>
                                                <RadioRequired name="currency" label="Mata Uang" defaultValue={editbankdata.currency} onChangeRadio={onChangeRadioBankEdit} options={
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
                                <ModalHapus
                                    title={`Konfirmasi Hapus Bank`}
                                    visible={bankmodalhapus}
                                    onCancel={() => { setbankmodalhapus(false) }}
                                    footer={
                                        <div className="flex justify-between items-center">
                                            <Buttonsys type="default" color="danger" onClick={() => { setbankmodalhapus(false) }}>
                                                Batalkan
                                            </Buttonsys>
                                            <Buttonsys type="primary" color="danger" onClick={handleDeleteBank}>
                                                <TrashIconSvg size={15} color={`#ffffff`} />
                                                Ya, saya yakin dan hapus bank
                                            </Buttonsys>
                                        </div>
                                    }
                                ></ModalHapus>
                            </div>
                            {/* Relationship */}
                            <div className="flex flex-col shadow-md rounded-md bg-white p-8 h-full">
                                <div className="flex justify-between items-center">
                                    <H1>Relasi</H1>
                                    <Link href="/company/myCompany">
                                        <Buttonsys type="primary">
                                            + Tambah Relasi
                                        </Buttonsys>
                                    </Link>
                                </div>
                                <div className="flex items-center mt-5">
                                    <ShareIconSvg size={25} color={`#000000`} />
                                    <div className="flex flex-col ml-2">
                                        <H2>20</H2>
                                        <Label>Memiliki</Label>
                                    </div>
                                </div>
                                <div className="flex items-center mt-5">
                                    <ShareIconSvg size={25} color={`#000000`} />
                                    <div className="flex flex-col ml-2">
                                        <H2>108</H2>
                                        <Label>Menggunakan</Label>
                                    </div>
                                </div>
                                <div className="flex items-center mt-5">
                                    <ShareIconSvg size={25} color={`#000000`} />
                                    <div className="flex flex-col ml-2">
                                        <H2>67</H2>
                                        <Label>Meminjam</Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Aktivitas */}
                        <div className="w-6/12 flex flex-col shadow-md rounded-md bg-white p-8 mx-2">
                            <div className="mb-8">
                                <H1>Aktivitas</H1>
                            </div>
                            <div className="flex flex-col mb-5">
                                <p className="mb-0">
                                    Yusron baru saja menambahkan lokasi baru Kantor Cabang Jagakarsa
                                </p>
                                <Label>Hari ini, 16:00</Label>
                            </div>
                            <div className="flex flex-col mb-5">
                                <p className="mb-0">
                                    Yusron baru saja menambahkan lokasi baru Kantor Cabang Jagakarsa
                                </p>
                                <Label>Hari ini, 16:00</Label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res }) {
    var initProps = {};
    if (!req.headers.cookie) {
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            }
        }
    }
    const cookiesJSON1 = httpcookie.parse(req.headers.cookie);
    if (!cookiesJSON1.token) {
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            }
        }
    }
    initProps = cookiesJSON1.token
    const resourcesGP = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    return {
        props: {
            initProps,
            dataProfile,
            sidemenu: "51"
        },
    }
}

export default MyCompanyIndex2
