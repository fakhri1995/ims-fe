import Layout from '../../../../components/layout-dashboardNew'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import st from '../../../../components/layout-dashboard.module.css'
import { Tree, Input, Empty, Spin, Progress, } from 'antd'
import Buttonsys from '../../../../components/button'
import { H1, H2, Label } from '../../../../components/typography'
import { SortingIconSvg, LocationIconSvg, ExternalLinkIconSvg, PhoneIconSvg, EmailIconSvg } from '../../../../components/icon'
import { DownOutlined } from '@ant-design/icons'
import moment from 'moment'
import { DrawerLokasi, DrawerLokasiClient } from '../../../../components/drawer/drawerCustom'
import { Chart, ArcElement, Tooltip } from 'chart.js'
Chart.register(ArcElement, Tooltip);
import { Pie } from 'react-chartjs-2';

const ClientLocationIndex = ({ initProps, dataProfile, sidemenu }) => {
    const rt = useRouter()
    var activeTab = "profile"
    const { active, id } = rt.query

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
        parent: {
            name: ""
        }
    })
    const [lokasidrawer, setlokasidrawer] = useState(false)
    //branch searching
    const [searchvalue, setsearchvalue] = useState('')
    const [autoexpandparent, setautoexpandparent] = useState(true)

    //handler
    const onSortLoc = async (value) => {
        setpraloading(true)
        sorted === -1 ? setsorted(true) : setsorted(value)
        if (value === true) {
            var temp = await branchdata.sort((a, b) => a.title > b.title ? 1 : -1)
            setbranchdata(temp)
        }
        else {
            fetch(`https://boiling-thicket-46501.herokuapp.com/${dataProfile.data.company.role !== 2 ? `getMainLocations` : `getLocations?company_id=${id}`}`, {
                method: `GET`,
                headers: {
                    'Authorization': JSON.parse(initProps),
                },
            })
                .then(res => res.json())
                .then(res2 => {
                    res2.data.children ? setbranchdata(res2.data.children) : setbranchdata([])
                })
        }
        setpraloading(false)
    }

    //FILTER TREE
    //filterAsset
    const onExpand = (expandedKeys) => {
        setexpandedkeys(expandedKeys);
        setautoexpandparent(false);
    }
    const dataList = [];
    const generateList = (data) => {
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            const { id, key, value, parent_id, title, children_count } = node;
            dataList.push({ id, key, value, parent_id, title, children_count });
            if (node.children) {
                generateList(node.children);
            }
        }
    };
    generateList(branchdata);
    const getParentKey = (key, tree) => {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.children) {
                if (node.children.some((item) => item.key === key)) {
                    parentKey = node.key;
                } else if (getParentKey(key, node.children)) {
                    parentKey = getParentKey(key, node.children);
                }
            }
        }
        return parentKey;
    };
    const onChangeFilterAsset = (e) => {
        const { value } = e.target;
        const expandedKeys = dataList
            .map((item) => {
                if (item.title.indexOf(value) > -1) {
                    return getParentKey(item.key, branchdata);
                }
                return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        if (value) {
            setexpandedkeys(expandedKeys);
            setsearchvalue(value);
            setautoexpandparent(true);
        } else {
            setexpandedkeys(branchdata.map(doc => doc.key));
            setsearchvalue("");
            setautoexpandparent(false);
        }
    };
    const filterTreeNode = (node) => {
        const title = node.title.props.children[0].props ? node.title.props.children[0].props.children[2] : node.title.props.children[2];
        const result = title ? (title.indexOf(searchvalue) !== -1 ? true : false) : false
        return result;
    };
    const loop = (data) =>
        data.map((item) => {
            const index = item.title.indexOf(searchvalue);
            const beforeStr = item.title.substr(0, index);
            const afterStr = item.title.substr(index + searchvalue.length);
            const title =
                index > -1 ?
                    (
                        <div
                            id={`wrap${item.key}`}
                            className={`flex items-start w-full py-3 rounded-md px-2`}
                            onMouseOver={() => {
                                var d = document.getElementById(`text${item.key}`)
                                d.classList.add("text-primary100"); d.classList.remove("text-gray-400")
                                var dd = document.getElementById(`wrap${item.key}`)
                                dd.classList.add("bg-primary10");
                                var ddd = document.getElementById(`badge${item.key}`)
                                ddd.classList.add("bg-primary100"); ddd.classList.remove("bg-gray-300");
                            }}
                            onMouseLeave={() => {
                                var e = document.getElementById(`text${item.key}`)
                                e.classList.add("text-gray-400"); e.classList.remove("text-primary100")
                                var ee = document.getElementById(`wrap${item.key}`)
                                ee.classList.remove("bg-primary10");
                                var eee = document.getElementById(`badge${item.key}`)
                                eee.classList.add("bg-gray-300"); eee.classList.remove("bg-primary100");
                            }}
                            onClick={() => { setidselected(item.id); setselected(true); setloadingselected(true) }}
                        >
                            <div className="mr-3 flex items-start">
                                <LocationIconSvg id={`icon${item.key}`} size={15} color={`#808080`} />
                            </div>
                            <div className="mr-3">
                                <Label id={`text${item.key}`}>
                                    {beforeStr}
                                    <span className=" text-primary100">{searchvalue}</span>
                                    {afterStr}
                                </Label>
                            </div>
                            <div id={`badge${item.key}`} className="w-5 h-5 rounded-full bg-gray-400 text-white text-2xs flex items-center justify-center">{item.children_count}</div>
                        </div>
                    )
                    :
                    (
                        <div
                            id={`wrap${item.key}`}
                            className={`flex items-start w-full py-3 rounded-md px-2`}
                            onMouseOver={() => {
                                var d = document.getElementById(`text${item.key}`)
                                d.classList.add("text-primary100"); d.classList.remove("text-gray-400")
                                var dd = document.getElementById(`wrap${item.key}`)
                                dd.classList.add("bg-primary10");
                                var ddd = document.getElementById(`badge${item.key}`)
                                ddd.classList.add("bg-primary100"); ddd.classList.remove("bg-gray-300");
                            }}
                            onMouseLeave={() => {
                                var e = document.getElementById(`text${item.key}`)
                                e.classList.add("text-gray-400"); e.classList.remove("text-primary100")
                                var ee = document.getElementById(`wrap${item.key}`)
                                ee.classList.remove("bg-primary10");
                                var eee = document.getElementById(`badge${item.key}`)
                                eee.classList.add("bg-gray-300"); eee.classList.remove("bg-primary100");
                            }}
                            onClick={() => { setidselected(item.id); setselected(true); setloadingselected(true) }}
                        >
                            <div className="mr-3 flex items-start">
                                <LocationIconSvg id={`icon${item.key}`} size={15} color={`#808080`} />
                            </div>
                            <div className="mr-3">
                                <Label id={`text${item.key}`}>
                                    {item.title}
                                </Label>
                            </div>
                            <div id={`badge${item.key}`} className="w-5 h-5 rounded-full bg-gray-400 text-white text-2xs flex items-center justify-center">{item.children_count}</div>
                        </div>);
            if (item.children) {
                return { title, key: item.key, children: loop(item.children) };
            }

            return {
                title,
                key: item.key
            };
        });

    //USE EFECT
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getCompanyDetail?id=${id}`, {
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
        fetch(`https://boiling-thicket-46501.herokuapp.com/getLocations?company_id=${id}`, {
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
                setloadingselected(false)
            })
    }, [lokasidrawer])
    useEffect(() => {
        if (selected === true) {
            fetch(`https://boiling-thicket-46501.herokuapp.com/getSubCompanyProfile?id=${idselected}`, {
                method: `GET`,
                headers: {
                    'Authorization': JSON.parse(initProps),
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then(res2 => {
                    setselecteddata(res2.data)
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
                            <Input placeholder="Cari Lokasi" style={{ backgroundColor: `transparent` }} onChange={onChangeFilterAsset} />
                        </div>
                        <div className="mx-0">
                            <Buttonsys type="ghost" selected={sorted === true ? true : false} onClick={() => { onSortLoc(sorted === -1 ? true : !sorted) }}>
                                <SortingIconSvg size={12} color={`#35763B`} />
                                Urutkan: A-Z
                            </Buttonsys>
                        </div>
                        <div className="mx-0">
                            <Buttonsys type="primary" onClick={() => { setlokasidrawer(true) }}>
                                + Tambah Lokasi
                            </Buttonsys>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        {
                            praloading ?
                                <>
                                    <Spin />
                                </>
                                :
                                branchdata.length === 0 ?
                                    <>
                                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
                                    </>
                                    :
                                    <Tree
                                        showIcon
                                        onExpand={onExpand}
                                        filterTreeNode={filterTreeNode}
                                        autoExpandParent={autoexpandparent}
                                        expandedKeys={expandedkeys}
                                        treeData={loop(branchdata)}
                                        switcherIcon={<DownOutlined />}
                                        style={{ backgroundColor: `transparent` }}
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
                                                <a href={`/company/clients/locations/${selecteddata.id}`} target="_blank">
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
                                                <div className="w-32 h-32" id="chart">
                                                    <Pie
                                                        data={{
                                                            labels: selecteddata.asset_cluster.map(doc => doc.name),
                                                            datasets: [
                                                                {
                                                                    data: selecteddata.asset_cluster.map(doc => doc.asset_count),
                                                                    backgroundColor: [
                                                                        'rgba(255, 99, 132, 1)',
                                                                        'rgba(54, 162, 235, 1)',
                                                                        'rgba(255, 206, 86, 1)',
                                                                        'rgba(75, 192, 192, 1)',
                                                                        'rgba(153, 102, 255, 1)',
                                                                        'rgba(255, 159, 64, 1)',
                                                                    ],
                                                                    borderColor: [
                                                                        'rgba(255, 99, 132, 1)',
                                                                        'rgba(54, 162, 235, 1)',
                                                                        'rgba(255, 206, 86, 1)',
                                                                        'rgba(75, 192, 192, 1)',
                                                                        'rgba(153, 102, 255, 1)',
                                                                        'rgba(255, 159, 64, 1)',
                                                                    ],
                                                                    borderWidth: 1,
                                                                },
                                                            ]
                                                        }}
                                                        options={{
                                                            title: {
                                                                display: false,

                                                            },
                                                            legend: {
                                                                display: false,
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <H2>{selecteddata.inventory_count}</H2>
                                                    <Label>Total Aset</Label>
                                                </div>
                                            </div>
                                            <div className="w-6/12 flex-col flex items-center">
                                                <Progress
                                                    type="dashboard"
                                                    percent={selecteddata.good_inventory_percentage}
                                                    strokeColor={{
                                                        from: `#65976a`,
                                                        to: `#35763B`
                                                    }}
                                                />
                                                <div className="flex flex-col items-center">
                                                    <H2>{selecteddata.good_inventory_count}/{selecteddata.inventory_count}</H2>
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
                            <div className="flex h-screen items-center justify-center">
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Silahkan pilih untuk lihat detail lokasi" />
                            </div>
                    }
                </div>
            </div>
            <DrawerLokasiClient
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

export default ClientLocationIndex
