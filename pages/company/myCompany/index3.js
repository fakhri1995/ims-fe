import Layout from '../../../components/layout-dashboardNew'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import st from '../../../components/layout-dashboard-mig.module.css'
import Link from 'next/link'
import { Tree, Input, Form, Empty, Spin, Progress, } from 'antd'
import Buttonsys from '../../../components/button'
import { H1, H2, Label } from '../../../components/typography'
import { SortingIconSvg, LocationIconSvg, ExternalLinkIconSvg, PhoneIconSvg, EmailIconSvg } from '../../../components/icon'
import { DownOutlined, HomeOutlined } from '@ant-design/icons'
import moment from 'moment'
import { ModalEdit, ModalHapus } from '../../../components/modal/modalCustom'
import { DrawerBank, DrawerLokasi } from '../../../components/drawer/drawerCustom'
import DrawerCore from '../../../components/drawer/drawerCore'
import { InputRequired, RadioRequired } from '../../../components/input'
import { AtmMain, AtmBank } from '../../../components/atm'
import CountUp from 'react-countup'
import InfiniteScroll from 'react-infinite-scroll-component'

function modifData(dataa) {
    for (var i = 0; i < dataa.length; i++) {
        // dataa[i]['icon'] = <LocationIconSvg size={15} color={`#35763B`} />
        if (dataa[i].children) [
            modifData(dataa[i].children)
        ]
    }
    return dataa
}

const Index3 = ({ initProps, dataProfile, sidemenu }) => {
    const rt = useRouter()
    const [instanceForm] = Form.useForm();
    var activeTab = "profile"
    const { active } = rt.query

    if (active) {
        activeTab = active
    }

    const [patharr, setpatharr] = useState([])
    const [rawdata, setrawdata] = useState({
        id: "",
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
        website: "",
        role: "",
        induk_level_1_count: "",
        induk_level_2_count: "",
        induk_level_3_count: ""
    })
    const [displaydata, setdisplaydata] = useState({
        id: "",
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
    const [praloading, setpraloading] = useState(true)
    const [isenabled, setisenabled] = useState(false)
    //branch
    const [branchdata, setbranchdata] = useState([])
    const [branchdata2, setbranchdata2] = useState([])
    const [expandedkeys, setexpandedkeys] = useState([])
    const [sortednum, setsortednum] = useState(-10)
    const [sorted, setsorted] = useState(false)
    const [sortedinit, setsortedinit] = useState(-10)
    const [selected, setselected] = useState(false)
    const [idselected, setidselected] = useState(null)
    const [loadingselected, setloadingselected] = useState(false)
    const [selecteddata, setselecteddata] = useState({
        id: 2,
        name: "",
        image_logo: "",
        phone_number: "",
        address: "",
        role: 3,
        is_enabled: true,
        singkatan: "",
        tanggal_pkp: "",
        penanggung_jawab: "",
        npwp: "-",
        fax: "-",
        email: "",
        website: "-",
    })
    const [lokasidrawer, setlokasidrawer] = useState(false)


    useEffect(() => {
        if (sortedinit !== -10) {
            setsortedinit(true)
            if (sorted === false) {
                var temp = branchdata.sort((a, b) => a.title > b.title ? 1 : -1)
                setbranchdata(temp)
                setsorted(true)
            }
            else {
                setbranchdata(branchdata2)
                setsorted(false)
            }
            setsortedinit(false)
        }
    }, [sortedinit])

    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getMainCompanyDetail`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                var temp2 = rt.pathname.split("/").slice(1)
                temp2[temp2.length - 1] = res2.data.name
                setpatharr(temp2)
                setrawdata(res2.data)
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
                    website: res2.data.website,
                })
                setisenabled(res2.data.is_enabled)
            })
    }, [])
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/${dataProfile.data.company.role !== 2 ? `getBranchCompanyList` : `getLocations?company_id=${dataProfile.data.company.company_id}`}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                res2.data.children ? (setbranchdata(res2.data.children), setbranchdata2(res2.data.children)) : (setbranchdata([]), setbranchdata2([]))
                const expandkeyArr = res2.data.children.map(doc => doc.key)
                res2.data.children ? setexpandedkeys(expandkeyArr) : setexpandedkeys([])
                setpraloading(false)
                setsortedinit(false)
            })
    }, [])
    useEffect(() => {
        if (selected === true) {
            fetch(`https://boiling-thicket-46501.herokuapp.com/getCompanyBranchDetail?id=${idselected}`, {
                method: `GET`,
                headers: {
                    'Authorization': JSON.parse(initProps),
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then(dataBranchDetail => {
                    const temp = {
                        ...dataBranchDetail.data,
                        id: dataBranchDetail.data.id,
                        image_logo: dataBranchDetail.data.image_logo === "" ? '/default-users.jpeg' : dataBranchDetail.data.image_logo,
                        tanggal_pkp: dataBranchDetail.data.tanggal_pkp === null ? moment(new Date()) : moment(dataBranchDetail.data.tanggal_pkp),
                    }
                    setselecteddata(temp)
                    setloadingselected(false)
                })
        }
    }, [idselected])
    return (
        <Layout tok={initProps} dataProfile={dataProfile} sidemenu={sidemenu} pathArr={patharr} st={st}>
            <div className="grid grid-cols-12">
                <div className="col-span-6 flex flex-col m-3">
                    <div className="flex justify-around mb-5">
                        <div className="mx-0">
                            <Input placeholder="Cari Lokasi" style={{ backgroundColor: `transparent` }} />
                        </div>
                        <div className="mx-0">
                            <Buttonsys type="ghost" selected={sorted === true ? false : true} onClick={() => {
                                // setsorted(prev => !prev)
                                setsortedinit(prev => prev + 1)
                                // setsortednum(prev => prev + 1)
                            }}>
                                <SortingIconSvg size={12} color={`#35763B`} />
                                Urutkan: A-Z
                            </Buttonsys>
                        </div>
                        <div className="mx-0">
                            <Buttonsys type="primary" onClick={() => { setlokasidrawer(true); console.log(branchdata, sorted) }}>
                                + Tambah Lokasi
                            </Buttonsys>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        {
                            sortedinit ?
                                <>
                                    <Spin />
                                </>
                                :
                                <Tree
                                    showIcon
                                    autoExpandParent={true}
                                    defaultExpandedKeys={expandedkeys}
                                    treeData={branchdata}
                                    switcherIcon={<DownOutlined />}
                                    style={{ backgroundColor: `transparent` }}
                                    titleRender={(nodeData) => (
                                        <>
                                            <div
                                                id={`wrap${nodeData.key}`}
                                                className={`flex items-start w-full py-3 rounded-md px-2`}
                                                onMouseOver={() => {
                                                    var d = document.getElementById(`text${nodeData.key}`)
                                                    d.classList.add("text-primary100"); d.classList.remove("text-gray-400")
                                                    var dd = document.getElementById(`wrap${nodeData.key}`)
                                                    dd.classList.add("bg-primary10");
                                                    var ddd = document.getElementById(`badge${nodeData.key}`)
                                                    ddd.classList.add("bg-primary100"); ddd.classList.remove("bg-gray-300");
                                                }}
                                                onMouseLeave={() => {
                                                    var e = document.getElementById(`text${nodeData.key}`)
                                                    e.classList.add("text-gray-400"); e.classList.remove("text-primary100")
                                                    var ee = document.getElementById(`wrap${nodeData.key}`)
                                                    ee.classList.remove("bg-primary10");
                                                    var eee = document.getElementById(`badge${nodeData.key}`)
                                                    eee.classList.add("bg-gray-300"); eee.classList.remove("bg-primary100");
                                                }}
                                                onClick={() => { setidselected(nodeData.id); setselected(true); setloadingselected(true) }}
                                            >
                                                <div className="mr-3 flex items-start">
                                                    <LocationIconSvg id={`icon${nodeData.key}`} size={15} color={`#808080`} />
                                                </div>
                                                <div className="mr-3">
                                                    <Label id={`text${nodeData.key}`}>{nodeData.title}</Label>
                                                </div>
                                                <div id={`badge${nodeData.key}`} className="w-5 h-5 rounded-full bg-gray-300 text-white text-2xs flex items-center justify-center">{nodeData.children_count}</div>
                                            </div>
                                        </>
                                    )
                                    }
                                    blockNode={true}
                                >
                                </Tree>
                        }
                    </div>
                </div>
                <div className="col-span-6 m-3 flex flex-col">
                    {
                        selected ?
                            loadingselected ?
                                <div className="flex items-center justify-center">
                                    <Spin />
                                </div>
                                :
                                <>
                                    <div className="flex shadow-md rounded-md bg-white p-5 mb-5 mx-2">
                                        <div className="mr-5">
                                            <img src={selecteddata.image_logo} className="object-contain w-24 h-24 rounded-full" alt="" />
                                        </div>
                                        <div className="flex flex-col w-9/12">
                                            <div className="flex justify-between items-center">
                                                <H1>{selecteddata.name}</H1>
                                                <a href={`/company/myCompany/index2`} target="_blank">
                                                    <div className="flex items-center">
                                                        <div className="mr-2">
                                                            <Label color="green" cursor="pointer">Lihat Detail</Label>
                                                        </div>
                                                        <ExternalLinkIconSvg size={15} color={`#35763B`} />
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="flex">
                                                <Label>{selecteddata.singkatan}</Label>
                                            </div>
                                            <div className="h-full flex items-end text-primary100">
                                                <div className="mr-1">
                                                    <PhoneIconSvg size={20} color={`#35763B`} />
                                                </div>
                                                {selecteddata.phone_number}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col shadow-md rounded-md bg-white p-5 mb-5 mx-2">
                                        <div className="flex items-center mb-3">
                                            <H1>Kondisi Aset</H1>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="w-6/12 flex-col flex items-center">
                                                <Progress
                                                    type="dashboard"
                                                    percent={75}
                                                    strokeColor={{
                                                        from: `#60A5FA`,
                                                        to: `#1890ff`
                                                    }}
                                                />
                                                <div className="flex flex-col items-center">
                                                    <H2>390/600</H2>
                                                    <Label>Sedang digunakan</Label>
                                                </div>
                                            </div>
                                            <div className="w-6/12 flex-col flex items-center">
                                                <Progress
                                                    type="dashboard"
                                                    percent={99}
                                                    strokeColor={{
                                                        from: `#65976a`,
                                                        to: `#35763B`
                                                    }}
                                                />
                                                <div className="flex flex-col items-center">
                                                    <H2>599/600</H2>
                                                    <Label>Aset dalam kondisi baik</Label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col shadow-md rounded-md bg-white p-5 mb-5 mx-2">
                                        <div className="flex items-center mb-3">
                                            <H1>Keuangan</H1>
                                        </div>
                                    </div>
                                </>
                            :
                            <div className="flex items-center justify-center">
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Silahkan pilih untuk lihat detail lokasi" />
                            </div>
                    }
                </div>
            </div>
            <DrawerLokasi
                title={"Tambah Lokasi"}
                visible={lokasidrawer}
                onClose={() => { setlokasidrawer(false) }}
                buttonOkText={"Simpan Lokasi"}
                initProps={initProps}
                onvisible={setlokasidrawer}
            />
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

export default Index3
