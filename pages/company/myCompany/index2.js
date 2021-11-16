import Layout from '../../../components/layout-dashboardNew'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import st from '../../../components/layout-dashboard-mig.module.css'
import Link from 'next/link'
import { Tabs, Switch } from 'antd'
import Buttonsys from '../../../components/button'
import { H1, Label } from '../../../components/typography'
import { EditIconSvg, EmailIconSvg, PhoneIconSvg, WebIconSvg } from '../../../components/icon'
import moment from 'moment'


const MyCompanyIndex2 = ({ initProps, dataProfile, sidemenu }) => {
    const rt = useRouter()
    const { TabPane } = Tabs;
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
                    <div className="mt-5 flex justify-center items-center cursor-pointer">
                        <div className="mr-1">
                            <EditIconSvg size={20} />
                        </div>
                        <Label color="green">Sunting Profil</Label>
                    </div>
                    <div className="mt-7 flex flex-col px-5">
                        <div className="flex flex-col mb-5">
                            <Label>Status Perusahaan</Label>
                            {
                                displaydata.is_enabled ?
                                    <div className="flex justify-between">
                                        <p className="text-primary100 font-semibold mb-0">Aktif</p>
                                        <Switch checked={true} />
                                    </div>
                                    :
                                    <div className="flex justify-between">
                                        <p className="font-semibold mb-0">Non Aktif</p>
                                        <Switch checked={false} />
                                    </div>
                            }
                        </div>
                        <div className="flex flex-col mb-5">
                            <Label>Singkatan</Label>
                            <p className="mb-0">{displaydata.singkatan ?? "-"}</p>
                        </div>
                        <div className="flex flex-col mb-5">
                            <Label>Alamat</Label>
                            <p className="mb-0">{displaydata.address ?? "-"}</p>
                        </div>
                        <div className="flex flex-col mb-5">
                            <Label>Penanggung Jawab (PIC)</Label>
                            <p className="mb-0">{displaydata.penanggung_jawab ?? "-"}</p>
                        </div>
                        <div className="flex flex-col mb-5">
                            <Label>Tanggal PKP</Label>
                            <p className="mb-0">{displaydata.tanggal_pkp === "-" ? "-" : moment(displaydata.tanggal_pkp).locale("id").format("LL")}</p>
                        </div>
                        <div className="flex flex-col mb-5">
                            <Label>NPWP</Label>
                            <p className="mb-0">{displaydata.npwp ?? "-"}</p>
                        </div>
                        <div className="flex flex-col mb-5">
                            <Label>Email</Label>
                            <div className="flex">
                                <div className="mr-1">
                                    <EmailIconSvg size={20} />
                                </div>
                                <a href={`mailto:${displaydata.email}`} className="text-primary100 hover:text-primary75">{displaydata.email}</a>
                            </div>
                        </div>
                        <div className="flex flex-col mb-5">
                            <Label>No.Telp</Label>
                            <div className="flex">
                                <div className="mr-1">
                                    <PhoneIconSvg size={20} />
                                </div>
                                <a href={`tel:${displaydata.phone_number}`} className="text-primary100 hover:text-primary75">{displaydata.phone_number}</a>
                            </div>
                        </div>
                        <div className="flex flex-col mb-5">
                            <Label>Website</Label>
                            <div className="flex">
                                <div className="mr-1">
                                    <WebIconSvg size={20} />
                                </div>
                                <a href={`${displaydata.website}`} className="text-primary100 hover:text-primary75">{displaydata.website}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-9 m-3">
                    <div className="flex flex-col shadow-md rounded bg-white p-5">
                        <div className="flex justify-between items-center px-5">
                            <H1>Lokasi</H1>
                            <Link href="/company/myCompany">
                                <Label color="green" cursor="pointer">Lihat Semua</Label>
                            </Link>
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
