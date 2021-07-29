import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../../../../components/layout-dashboard'
import st from '../../../../../components/layout-dashboard.module.css'
import httpcookie from 'cookie'
import Sticky from 'wil-react-sticky'
import Link from 'next/link'
import { Button, Tabs, Table, Input, Modal, notification } from 'antd'

const AnggotaSide = ({ initProps, rolesid }) => {
    const [roleanggota, setroleanggota] = useState([])
    const [roleanggota2, setroleanggota2] = useState([])
    const [loadingdata, setloadingdata] = useState(true)
    const col = [
        {
            title: 'Nama Anggota',
            dataIndex: 'name',
            key: 'name',
            // render(text, record, index) {
            //     return {
            //         props: {
            //             style: { background: index % 2 == 1 ? '#f2f2f2' : '#fff' },
            //         },
            //         children:
            //             <div>
            //                 <Link href={{
            //                     pathname: `/admin/roles/${record.id}`,
            //                     query: {
            //                         originPath: 'Admin'
            //                     }
            //                 }}>
            //                     <a>
            //                         {record.name}
            //                     </a>
            //                 </Link>
            //                 <p style={{ fontSize: '13px' }}>
            //                     {record.description}
            //                 </p>
            //             </div>,

            //     };
            // },
            // sorter: (a, b) => a.user_id - b.user_id,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: `center`,
            render(t, r, i) {
                return (
                    <>
                        {
                            r.status ?
                                <div className="rounded-md w-2/5 mx-auto h-auto px-1 text-center justify-center py-1 bg-blue-100 border border-blue-200 text-blue-600">Aktif</div>
                                :
                                <div className="rounded-md w-2/5 mx-auto h-auto px-1 text-center justify-center py-1 bg-red-100 border border-red-200 text-red-600">Non-aktif</div>
                        }
                    </>
                )
            }
            // render(text, record, index) {
            //     return {
            //         props: {
            //             style: { background: index % 2 == 1 ? '#f2f2f2' : '#fff' },
            //         },
            //         children:
            //             <div>
            //                 <Link href={{
            //                     pathname: `/admin/roles/${record.id}`,
            //                     query: {
            //                         originPath: 'Admin'
            //                     }
            //                 }}>
            //                     <a>
            //                         {record.name}
            //                     </a>
            //                 </Link>
            //                 <p style={{ fontSize: '13px' }}>
            //                     {record.description}
            //                 </p>
            //             </div>,

            //     };
            // },
            // sorter: (a, b) => a.user_id - b.user_id,
            // sortDirections: ['descend', 'ascend'],
        },
    ]
    const onChangeSearch = (e) => {
        const filtered = roleanggota2.filter(flt => {
            return flt.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setroleanggota(filtered)
    }
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getRoleUserFeatures?id=${rolesid}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps)
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setroleanggota(res2.data.users)
                setroleanggota2(res2.data.users)
                setloadingdata(false)
            })
    }, [])
    return (
        <div className="flex flex-col space-y-4">
            <Input style={{ width: `50%` }} onChange={(e) => { onChangeSearch(e) }} placeholder="Cari Nama Anggota" />
            <Table loading={loadingdata} dataSource={roleanggota} columns={col} scroll={{ x: 500 }} pagination={{ pageSize: 5 }} size="medium" />
        </div>
    )
}

const FiturSide = ({ initProps, rolesid }) => {
    const [rolefitur, setrolefitur] = useState([])
    const [rolefitur2, setrolefitur2] = useState([])
    const [loadingdata, setloadingdata] = useState(true)
    const onChangeSearch = (e) => {
        const filtered = rolefitur2.filter(flt => {
            return flt.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setrolefitur(filtered)
    }
    const col = [
        {
            title: 'Nama Fitur',
            dataIndex: 'name',
            key: 'name',
            // render(text, record, index) {
            //     return {
            //         props: {
            //             style: { background: index % 2 == 1 ? '#f2f2f2' : '#fff' },
            //         },
            //         children:
            //             <div>
            //                 <Link href={{
            //                     pathname: `/admin/roles/${record.id}`,
            //                     query: {
            //                         originPath: 'Admin'
            //                     }
            //                 }}>
            //                     <a>
            //                         {record.name}
            //                     </a>
            //                 </Link>
            //                 <p style={{ fontSize: '13px' }}>
            //                     {record.description}
            //                 </p>
            //             </div>,

            //     };
            // },
            // sorter: (a, b) => a.user_id - b.user_id,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Nama Modul',
            dataIndex: 'list_module',
            key: 'list_module',
            render(t, r, i) {
                var strmodule = r.list_module.length > 0 ? r.list_module.join(",") : "-"
                return (
                    <>
                        {
                            strmodule
                        }
                    </>
                )
            }
            // render(text, record, index) {
            //     return {
            //         props: {
            //             style: { background: index % 2 == 1 ? '#f2f2f2' : '#fff' },
            //         },
            //         children:
            //             <div>
            //                 <Link href={{
            //                     pathname: `/admin/roles/${record.id}`,
            //                     query: {
            //                         originPath: 'Admin'
            //                     }
            //                 }}>
            //                     <a>
            //                         {record.name}
            //                     </a>
            //                 </Link>
            //                 <p style={{ fontSize: '13px' }}>
            //                     {record.description}
            //                 </p>
            //             </div>,

            //     };
            // },
            // sorter: (a, b) => a.user_id - b.user_id,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Deskripsi',
            dataIndex: 'description',
            key: 'description',
            render(t, r, i) {
                return (
                    <div className="text-xs">
                        {r.description}
                    </div>
                )
            }
            // render(text, record, index) {
            //     return {
            //         props: {
            //             style: { background: index % 2 == 1 ? '#f2f2f2' : '#fff' },
            //         },
            //         children:
            //             <div>
            //                 <Link href={{
            //                     pathname: `/admin/roles/${record.id}`,
            //                     query: {
            //                         originPath: 'Admin'
            //                     }
            //                 }}>
            //                     <a>
            //                         {record.name}
            //                     </a>
            //                 </Link>
            //                 <p style={{ fontSize: '13px' }}>
            //                     {record.description}
            //                 </p>
            //             </div>,

            //     };
            // },
            // sorter: (a, b) => a.user_id - b.user_id,
            // sortDirections: ['descend', 'ascend'],
        },
    ]
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getRoleUserFeatures?id=${rolesid}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps)
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setrolefitur(res2.data.features)
                setrolefitur2(res2.data.features)
                setloadingdata(false)
            })
    }, [])
    return (
        <div className="flex flex-col space-y-4">
            <Input style={{ width: `50%` }} onChange={(e) => { onChangeSearch(e) }} placeholder="Cari Nama Fitur" />
            <Table loading={loadingdata} dataSource={rolefitur} columns={col} scroll={{ x: 400 }} pagination={{ pageSize: 5 }} size="medium" />
        </div>
    )
}

const RolesDetail = ({ initProps, dataProfile, sidemenu, rolesid }) => {
    const rt = useRouter()
    const { TabPane } = Tabs;

    //data
    const [patharr, setpatharr] = useState([])
    const [detaildata, setdetaildata] = useState({
        id: 0,
        name: "",
        desc: ""
    })
    const [roleanggota, setroleanggota] = useState([])
    const [loadingdata, setloadingdata] = useState(true)

    //delete
    const [modaldelete, setmodaldelete] = useState(false)
    const [loadingdelete, setloadingdelete] = useState(false)

    //handle
    const handleDeleteRole = () => {
        setloadingdelete(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteRole`, {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: detaildata.id
            })
        })
            .then((res) => res.json())
            .then(res2 => {
                if (res2.success) {
                    notification['success']({
                        message: "Role berhasil dihapus",
                        duration: 3
                    })
                    setTimeout(() => {
                        setloadingdelete(false)
                        rt.push(`/admin/roles`)
                    }, 300)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3,
                    })
                    setloadingdelete(false)
                }
            })
    }

    //useEffect
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getRole?id=${rolesid}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps)
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setdetaildata({
                    id: res2.data.role_detail.id,
                    name: res2.data.role_detail.name,
                    desc: res2.data.role_detail.description
                })
                var pathArr = rt.pathname.split("/").slice(1)
                pathArr.splice(2, 1)
                pathArr[pathArr.length - 1] = `Detail Role - ` + res2.data.role_detail.name
                setpatharr(pathArr)
                setloadingdata(false)
            })
            .then(() => {
                fetch(`https://boiling-thicket-46501.herokuapp.com/getRoleUserFeatures?id=${rolesid}`, {
                    method: `GET`,
                    headers: {
                        'Authorization': JSON.parse(initProps)
                    }
                })
                    .then(res => res.json())
                    .then(res2 => {
                        setroleanggota(res2.data.users)
                    })
            })
    }, [])
    return (
        <Layout st={st} pathArr={patharr} sidemenu={sidemenu} dataProfile={dataProfile}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4" id="formAgentsWrapper">
                <div className="col-span-1 md:col-span-4">
                    <Sticky containerSelectorFocus="#formAgentsWrapper">
                        <div className="flex justify-between px-1 md:px-4 py-4 md:py-6 border-gray-400 border-t border-b bg-white mb-8">
                            <h1 className="font-semibold text-base w-auto ">Detail Role</h1>
                            <div className="flex space-x-2">
                                <Link href="/admin/roles" >
                                    <Button type="default" size="middle">Batal</Button>
                                </Link>
                                {
                                    [174, 177].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                    <Button type="primary" size="middle" onClick={() => { rt.push(`/admin/roles/update/${rolesid}`) }}>Ubah</Button>
                                }
                                {
                                    [178].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                    <Button type="default" size="middle" onClick={() => { setmodaldelete(true) }} danger>Hapus</Button>
                                }
                            </div>
                        </div>
                    </Sticky>
                </div>
                <div className="col-span-1 md:col-span-4">
                    <div className="flex flex-col border-b mb-2 md:mb-5">
                        <div className=" px-1 md:px-4 mb-1 md:mb-4">
                            <h1 className="font-semibold text-2xl mb-0">{detaildata.name}</h1>
                        </div>
                        <div className=" px-1 md:px-4 mb-3 md:mb-5">
                            <p className="mb-0">Deskripsi:</p>
                            <span className="text-xs">{detaildata.desc}</span>
                        </div>
                    </div>
                    <div>
                        <div className=" bg-white hidden md:block">
                            <Tabs tabPosition={`left`}>
                                <TabPane tab="Anggota" key={`anggota`}>
                                    <AnggotaSide rolesid={rolesid} initProps={initProps} />
                                </TabPane>
                                <TabPane tab="Fitur" key={`fitur`}>
                                    <FiturSide rolesid={rolesid} initProps={initProps} />
                                </TabPane>

                            </Tabs>
                        </div>
                        <div className=" bg-white block md:hidden" >
                            <Tabs tabPosition={`top`}>
                                <TabPane tab="Anggota" key={`anggota`}>
                                    <AnggotaSide rolesid={rolesid} initProps={initProps} />
                                </TabPane>
                                <TabPane tab="Fitur" key={`fitur`}>
                                    <FiturSide rolesid={rolesid} initProps={initProps} />
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title="Konfirmasi untuk menghapus role"
                visible={modaldelete}
                onOk={handleDeleteRole}
                okText="Ya"
                cancelText="Tidak"
                onCancel={() => setmodaldelete(false)}
                okButtonProps={{ disabled: loadingdelete }}
            >
                <div className="flex flex-col">
                    <p>Apakah Anda yakin untuk menghapus role <strong>{detaildata.name}</strong> yang berkaitan dengan anggota berikut ini?</p>
                    {
                        roleanggota.length < 1 ?
                            <p className="font-semibold">-</p>
                            :
                            <ol>
                                {
                                    roleanggota.map((doc, idx) => {
                                        return (
                                            <li key={idx} className="font-semibold">{idx + 1}. {doc.name}</li>
                                        )
                                    })
                                }
                            </ol>
                    }
                </div>
            </Modal>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }) {
    const rolesid = params.rolesId
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
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    if (![173, 174, 175, 176, 177, 178].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
        res.writeHead(302, { Location: '/dashboard/admin' })
        res.end()
    }

    // const resourcesGR = await fetch(`https://boiling-thicket-46501.herokuapp.com/getRoles`, {
    //     method: `GET`,
    //     headers: {
    //         'Authorization': JSON.parse(initProps)
    //     }
    // })
    // const resjsonGR = await resourcesGR.json()
    // const dataRoles = resjsonGR

    return {
        props: {
            initProps,
            dataProfile,
            // dataRoles,
            rolesid,
            sidemenu: "4"
        },
    }
}

export default RolesDetail
