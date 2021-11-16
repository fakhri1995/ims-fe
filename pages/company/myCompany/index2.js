import Layout from '../../../components/layout-dashboardNew'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import st from '../../../components/layout-dashboard-mig.module.css'
import Link from 'next/link'
import { Switch, DatePicker, Input, Drawer } from 'antd'
import Buttonsys from '../../../components/button'
import { H1, H2, Label } from '../../../components/typography'
import { EditIconSvg, EmailIconSvg, PhoneIconSvg, WebIconSvg, LocationIconSvg, SubLocationIconSvg, ShareIconSvg, TrashIconSvg, CheckIconSvg } from '../../../components/icon'
import moment from 'moment'


const MyCompanyIndex2 = ({ initProps, dataProfile, sidemenu }) => {
    const rt = useRouter()
    const tok = initProps
    // const pathArr = rt.pathname.split("/").slice(1)
    // const pathArr = ['admin', "company", 'mig', ""]
    var activeTab = "profile"
    const { active } = rt.query
    if (active) {
        activeTab = active
    }

    //useState
    const [patharr, setpatharr] = useState([])
    const [displaydata, setdisplaydata] = useState({
        id: null,
        name: "",
        image_logo: "",
        phone_number: "",
        address: "",
        role: null,
        is_enabled: null,
        singkatan: "",
        tanggal_pkp: "",
        penanggung_jawab: "",
        npwp: "",
        fax: "",
        email: "mig@mitrasolusi.group",
        website: ""
    })
    const [editable, seteditable] = useState(false)
    const [banks, setbanks] = useState([])
    const [bankdrawer, setbankdrawer] = useState(false)
    const [bankloading, setbankloading] = useState(false)
    const [bankdisabled, setbankdisabled] = useState(false)

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
                setdisplaydata(res2.data)
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
    }, [])
    return (
        <Layout tok={tok} dataProfile={dataProfile} sidemenu={sidemenu} pathArr={patharr} st={st}>
            <div className="grid grid-cols-12">
                <div className="col-span-3 flex flex-col shadow-md rounded bg-white m-3">
                    <div className="max-h-24 relative">
                        <img src={`/image/Rectangle.png`} alt="" className="object-fit max-h-24 w-full rounded-t" />
                        <div className="absolute -bottom-1/2 bg-white left-28 rounded-full">
                            <img src={displaydata.image_logo} alt="" className="object-contain w-24 h-24" />
                        </div>
                    </div>
                    <div className="mt-14 flex flex-col justify-center text-center">
                        <H1>{displaydata.name ?? "-"}</H1>
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
                                    <Buttonsys type="primary">
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
                                displaydata.is_enabled ?
                                    <div className="flex justify-between">
                                        <p className="text-primary100 font-semibold mb-0">Aktif</p>
                                        <Switch defaultChecked={true} disabled={editable ? false : true} />
                                    </div>
                                    :
                                    <div className="flex justify-between">
                                        <p className="font-semibold mb-0">Non Aktif</p>
                                        <Switch defaultChecked={false} disabled={editable ? false : true} />
                                    </div>
                            }
                        </div>
                        <div className="flex flex-col mb-5">
                            <Label>Singkatan</Label>
                            {
                                editable ?
                                    <Input defaultValue={displaydata.singkatan ?? "-"}></Input>
                                    :
                                    <p className="mb-0">{displaydata.singkatan ?? "-"}</p>
                            }
                        </div>
                        <div className="flex flex-col mb-5">
                            <Label>Alamat</Label>
                            {
                                editable ?
                                    <Input defaultValue={displaydata.address ?? "-"}></Input>
                                    :
                                    <p className="mb-0">{displaydata.address ?? "-"}</p>
                            }
                        </div>
                        <div className="flex flex-col mb-5">
                            <Label>Penanggung Jawab (PIC)</Label>
                            {
                                editable ?
                                    <Input defaultValue={displaydata.penanggung_jawab ?? "-"}></Input>
                                    :
                                    <p className="mb-0">{displaydata.penanggung_jawab ?? "-"}</p>
                            }
                        </div>
                        <div className="flex flex-col mb-5">
                            <Label>Tanggal PKP</Label>
                            {
                                editable ?
                                    <DatePicker defaultValue={displaydata.tanggal_pkp === "-" ? null : moment(displaydata.tanggal_pkp)}></DatePicker>
                                    :
                                    <p className="mb-0">{displaydata.tanggal_pkp === "-" ? "-" : moment(displaydata.tanggal_pkp).locale("id").format("LL")}</p>
                            }
                        </div>
                        <div className="flex flex-col mb-5">
                            <Label>NPWP</Label>
                            {
                                editable ?
                                    <Input defaultValue={displaydata.npwp ?? "-"}></Input>
                                    :
                                    <p className="mb-0">{displaydata.npwp ?? "-"}</p>
                            }
                        </div>
                        <div className="flex flex-col mb-5">
                            <Label>Email</Label>
                            {
                                editable ?
                                    <Input prefix={<EmailIconSvg size={15} />} defaultValue={displaydata.email ?? "-"}></Input>
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
                                    <Input prefix={<PhoneIconSvg size={15} />} defaultValue={displaydata.phone_number ?? "-"}></Input>
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
                                    <Input prefix={<WebIconSvg size={15} />} defaultValue={displaydata.website ?? "-"}></Input>
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
                </div>
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
                                                <div className={`w-5/12 h-28 rounded-md bg-gradient-to-tl ${idx % 2 === 0 ? "from-state1" : "from-state3"} ${idx % 2 === 0 ? "to-state2" : "to-state4"} relative mr-3`}>
                                                    <div className="absolute bottom-0 right-2">
                                                        <img src="/image/visa.png" className="object-contain" />
                                                    </div>
                                                </div>
                                                <div className="w-7/12 flex flex-col justify-between">
                                                    <div className="flex justify-between w-full items-center">
                                                        <H2>{doc.name ?? "-"}</H2>
                                                        <div className="dropdown dropdown-end">
                                                            <div tabIndex={0} className="cursor-pointer font-bold text-xl flex">...</div>
                                                            <ul tabIndex={0} className="p-2 shadow menu dropdown-content bg-white rounded w-52">
                                                                <li>
                                                                    <a>Hapus</a>
                                                                </li>
                                                                <li>
                                                                    <a>Ubah Warna Kartu</a>
                                                                </li>
                                                                <li>
                                                                    <a>Ubah Informasi</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className=" flex flex-col">
                                                        <Label>***{doc.account_number.slice(doc.account_number.length - 4, doc.account_number.length - 1)} - {doc.owner}</Label>
                                                        <Label>{doc.currency ?? "-"}</Label>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
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
            <Drawer
                title="Tambah Bank" maskClosable={false} visible={bankdrawer} onClose={() => { setbankdrawer(false) }} destroyOnClose={true}
                width={450}
                footer={
                    <div style={{ textAlign: 'right' }}>
                        <Buttonsys type="primary">
                            <CheckIconSvg size={15} color="#FFFFFF" />
                            Simpan Bank
                        </Buttonsys>
                    </div>
                }
            ></Drawer>
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
