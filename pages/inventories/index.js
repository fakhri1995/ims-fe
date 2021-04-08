import Layout from '../../components/layout-dashboard2'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import {Table, Button, Tabs, notification, Modal} from 'antd'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import { useState } from 'react'
import Link from 'next/link'
import Sticky from 'wil-react-sticky'
import st from '../../components/layout-dashboard-inventories.module.css'

function Inventories({ initProps, dataProfile, dataInventories, sidemenu }) {
    const rt = useRouter()
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    // const { originPath } = rt.query
    const { TabPane } = Tabs;
    // console.log(dataInventories)

    //--------hook modal delete inventories-------------
    const [warningDelete, setWarningDelete] = useState({
        istrue: false,
        key: null,
        asset_name: ""
    })
    const onClickModalDeleteInventory = (istrue, record) => {
        setWarningDelete({
            ...warningDelete,
            ["istrue"]: istrue,
            ["key"]: record.key,
            ["asset_name"]: record.asset_name
        })
    }
    const [modaldelete, setmodaldelete] = useState(false)
    //-------------------------------------------

    //------------get data inventories-------------------
    var inventories
    if (dataInventories.data == null) {
        console.log("nodata")
        inventories = []
    }
    else {
        inventories = dataInventories.data.map((doc, idx) => {
            return ({
                idx: idx,
                key: doc.id,
                id: doc.id,
                asset_name: doc.asset_name,
                model: doc.model,
                mig_number: doc.mig_number,
                lokasi: doc.lokasi,
                status: doc.status
            })
        })
    }
    //------------------------------------------------

    //------------------handle delete inventory-------------------
    const handleDeleteInventory = (key) => {
        setmodaldelete(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteInventory?id=${key}`, {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: key
            })
        })
            .then(res => res.json())
            .then(res2 => {
                setmodaldelete(false)
                if (res2.success) {
                    setWarningDelete(false, null)
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/inventories`)
                    }, 500)
                }
                else if (!res2.success) {
                    setWarningDelete(false, null)
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }
    //---------------------------------------------------------

    //------------------------kolom table----------------------
    const columnsDD = [
        {
            title: 'No',
            dataIndex: 'idx',
            key: 'idx',
            width: 10,
            render(text, record) {
                return {
                    props: {
                        style: { background: record.idx % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children: <div>{record.idx+1}
                    </div>,
                };
            },
        },
        {
            title: 'Asset Name',
            dataIndex: 'asset_name',
            key: 'asset_name',
            width: 100,
            render(text, record) {
                return {
                    props: {
                        style: { background: record.idx % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children: <div><Link href={{
                        pathname: `/inventories/${record.key}`,
                        query: {
                            originPath: 'Admin'
                        }
                    }}><a>{record.asset_name}</a></Link>
                    </div>,
                };
            },
        },
        {
            title: 'MIG ID',
            dataIndex: 'mig_number',
            key: 'mig_number',
            width: 100,
            render(text, record) {
                return {
                    props: {
                        style: { background: record.idx % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children: <div>{record.mig_number}
                    </div>,
                };
            },
        },
        {
            title: 'Lokasi',
            dataIndex: 'lokasi',
            key: 'lokasi',
            width: 100,
            render(text, record) {
                return {
                    props: {
                        style: { background: record.idx % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children: <div>{record.lokasi}
                    </div>,
                };
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 50,
            render(text, record) {
                return {
                    props: {
                        style: { background: record.idx % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children: <div>{record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </div>,
                };
            },
        },
        {
            title: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0', // Non-breakable space is char 0xa0 (160 dec)
            dataIndex: 'actionss',
            key: 'action',
            width: 50,
            render: (text, record, index) => {
                return {
                    props: {
                        style: { background: record.idx % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <Button>
                            <Link href={{
                                pathname: `/inventories/update/${record.key}`,
                            }}><EditOutlined/></Link>
                        </Button>
                }
            }
        },
        {
            title: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0', // Non-breakable space is char 0xa0 (160 dec)
            dataIndex: 'actionss',
            key: 'action',
            width: 50,
            render: (text, record, index) => {
                return {


                    props: {
                        style: { background: record.idx % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            {/* <Tooltip placement="topLeft" title={"Delete"}> */}
                            <Button onClick={() => { onClickModalDeleteInventory(true, record) }}>
                                <a><DeleteOutlined /></a>
                            </Button>

                            {/* </Tooltip> */}
                        </>
                }
            }
        }
    ]
    //------------------------------------------------------------------------

    return (
        <Layout tok={tok} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} /*originPath={originPath}*/ st={st}>
            <>
                <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
                    <div className=" col-span-1 md:col-span-4 flex flex-col" id="formAgentsWrapper">
                        <Sticky containerSelectorFocus="#formAgentsWrapper">
                            <div className="flex justify-between p-4 border-gray-400 border-t border-b bg-white mb-8">
                                <h1 className="font-semibold text-base w-auto pt-2">Daftar Inventori</h1>
                                <div className="flex space-x-2">
                                    <Link href={`/inventories/create`}>
                                        <Button type="primary" size="large">Tambah Inventori</Button>
                                    </Link>
                                </div>
                            </div>
                        </Sticky>

                        <div className="col-span-3 flex flex-col space-y-3">

                            <Table scroll={{ x: 400 }} dataSource={inventories} columns={columnsDD} onRow={(record, rowIndex) => {
                            }}>
                            </Table>

                        </div>

                        <Modal
                            title="Konfirmasi untuk menghapus grup"
                            visible={warningDelete.istrue}
                            onOk={() => { handleDeleteInventory(warningDelete.key) }}
                            onCancel={() => setWarningDelete(false, null)}
                            okButtonProps={{ disabled: modaldelete }}
                        >
                            Apakah anda yakin ingin menghapus inventori <strong>{warningDelete.asset_name}</strong>?
                            </Modal>
                    </div>
                    {/* <div className="flex flex-col space-y-3 px-4">
                        <div className="font-semibold text-sm">Groups</div>
                        <p className="font-normal text-sm">
                            You can organize your agents into specific Groups like “Sales” and “Product Management”. Segmenting them into divisions lets you easily assign tickets, create specific canned responses, manage workflows and generate group-level reports. Note that the same agent can be a member of multiple groups as well
                        </p>
                    </div> */}
                </div>
            </>
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
    const resourcesGetInventories = await fetch(`https://boiling-thicket-46501.herokuapp.com/getAllInventories`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGetInventories = await resourcesGetInventories.json()
    const dataInventories = resjsonGetInventories

    const resourcesGP = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
        method: `POST`,
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
            dataInventories,
            sidemenu: "sub32"
        },
    }
}

export default Inventories