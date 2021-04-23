import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '../../components/layout-dashboard-roles'
import st from '../../components/layout-dashboard-roles.module.css'
import httpcookie from 'cookie'
import Link from 'next/link'
import Sticky from 'wil-react-sticky'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Table, Button, Modal, notification } from 'antd'

function Roles({ initProps, dataProfile, dataRoles, sidemenu }) {
    const rt = useRouter()
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    const { originPath } = rt.query


    const [loadingdelete, setloadingdelete] = useState(false)
    const [modaldelete, setmodaldelete] = useState(false)

    const [maindata, setmaindata] = useState(dataRoles.data)
    const columnsDD = [
        {
            title: 'Role Name',
            dataIndex: 'name',
            key: 'name',
            render(text, record) {
                return {
                    props: {
                        style: { background: record.key % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <div>
                            <Link href={{
                                pathname: `/roles/${record.id}`,
                                query: {
                                    originPath: 'Admin'
                                }
                            }}>
                                <a>
                                    {record.name}
                                </a>
                            </Link>
                            <p style={{ fontSize: '13px' }}>
                                {record.description}
                            </p>
                        </div>,

                };
            },
            // sorter: (a, b) => a.user_id - b.user_id,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render(text, record) {
                return {
                    props: {
                        style: { background: record.key % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children: <div>{record.description}</div>,
                };
            },
            // render: agent => (

            //   ),
            // sorter: (a, b) => a.fullname.localeCompare(b.fullname),
            // sortDirections: ['descend', 'ascend'],
            // responsive: ['lg'],
        },
        {
            title: 'action', // Non-breakable space is char 0xa0 (160 dec)
            dataIndex: 'actionss',
            key: 'action',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { background: record.key % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            <Button onClick={() => { rt.push(`/roles/${record.id}`) }} style={{ paddingTop: `0`, paddingBottom: `0.3rem`, marginRight: `1rem` }}>
                                <EditOutlined />
                            </Button>
                            <Button danger onClick={() => { setmodaldelete(true); setdatadelete({ ...datadelete, id: record.id }); setcurrentdelete(record.name) }} loading={loadingdelete} style={{ paddingTop: `0`, paddingBottom: `0.3rem` }}>
                                <DeleteOutlined />
                            </Button>
                        </>
                }
            }
        }
    ];
    const [datadelete, setdatadelete] = useState({
        id: 0
    })
    const [currentdelete, setcurrentdelete] = useState('')

    const handleDeleteRoles = () => {
        setloadingdelete(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteRole`, {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datadelete)
        })
            .then((res) => res.json())
            .then(res2 => {
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        setloadingdelete(false)
                        rt.push(`/roles`)
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
    return (
        <Layout tok={tok} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} originPath={originPath} st={st}>
            <>
                <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4" id="formAgentsWrapper">
                    <div className=" col-span-1 md:col-span-4">
                        <Sticky containerSelectorFocus="#formAgentsWrapper">
                            <div className="flex justify-between p-4 border-gray-400 border-t border-b bg-white mb-8">
                                <h1 className="font-semibold text-base w-auto pt-2">Roles</h1>
                                <div className="flex space-x-2">
                                    <Link href="/roles/create">
                                        <Button type="primary" size="large">Tambah Role</Button>
                                    </Link>
                                </div>
                            </div>
                        </Sticky>
                    </div>
                    <div className=" col-span-1 md:col-span-3 flex flex-col">
                        <div className="col-span-3 flex flex-col space-y-3">

                            <Table showHeader={false} scroll={{ x: 400 }} pagination={{ pageSize: 5 }} dataSource={maindata} columns={columnsDD} onRow={(record, rowIndex) => {
                                // return {
                                //     onMouseOver: (event) => {
                                //         var actionsCopy = actions
                                //         actionsCopy[rowIndex] = true
                                //         setActions(actionsCopy)
                                //         setAction("block")
                                //         // console.log("row: " + actions[rowIndex] + " " + rowIndex)
                                //     },
                                //     onMouseLeave: (event) => {
                                //         var actionsCopy = actions
                                //         actionsCopy[rowIndex] = false
                                //         setActions(actionsCopy)
                                //         setAction("hidden")
                                //         // console.log("row leave: " + actions[rowIndex] + " " + rowIndex)
                                //     }
                                // }
                            }}></Table>
                        </div>
                    </div>
                </div>

            </>
            <Modal
                title={`Konfirmasi Hapus Role`}
                visible={modaldelete}
                onCancel={() => { setmodaldelete(false) }}
                onOk={handleDeleteRoles}
                okButtonProps={{ disabled: loadingdelete }}
                style={{ top: `3rem` }}
                width={500}
                destroyOnClose={true}
            >
                <h1>Yakin ingin hapus role {currentdelete.name} ini?</h1>
            </Modal>
        </Layout>
    )
}

export async function getServerSideProps({ req, res }) {
    var initProps = {};
    if (req && req.headers) {
        const cookies = req.headers.cookie;
        if (!cookies) {
            res.writeHead(302, { Location: '/' })
            res.end()
        }
        if (typeof cookies === 'string') {
            const cookiesJSON = httpcookie.parse(cookies);
            initProps = cookiesJSON.token
        }
    }
    const resourcesGP = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    const resourcesGR = await fetch(`https://boiling-thicket-46501.herokuapp.com/getRoles`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGR = await resourcesGR.json()
    const dataRoles = resjsonGR

    return {
        props: {
            initProps,
            dataProfile,
            dataRoles,
            sidemenu: "4"
        },
    }
}

export default Roles