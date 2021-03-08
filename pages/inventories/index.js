import Layout from '../../components/layout-dashboard-inventories'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import Table from 'antd/lib/table'
import Button from 'antd/lib/button'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import { useState } from 'react'
import Link from 'next/link'
import Sticky from 'wil-react-sticky'
import Tabs from 'antd/lib/tabs'
import st from '../../components/layout-dashboard-inventories.module.css'
import notification from 'antd/lib/notification'
import Modal from 'antd/lib/modal'

function Inventories({ initProps, dataProfile, dataInventories, sidemenu }) {
    const rt = useRouter()
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    const { originPath } = rt.query
    const { TabPane } = Tabs;
    // console.log(dataInventories.data)

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
                status: doc.status
            })
        })
    }
    //------------------------------------------------

    //------------------handle delete inventory-------------------
    const handleDeleteInventory = (key) => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteInventory?id=${key}`, {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(tok),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                if (res2.success) {
                    setWarningDelete(false, null)
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/inventories?originPath=Admin`)
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
            title: 'Asset Name',
            dataIndex: 'asset_name',
            key: 'asset_name',
            width: 800,
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
            title: 'Action', // Non-breakable space is char 0xa0 (160 dec)
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
                                query: {
                                    originPath: 'Admin'
                                }
                            }}><a>Edit</a></Link>
                        </Button>
                }
            }
        },
        {
            title: 'Action', // Non-breakable space is char 0xa0 (160 dec)
            dataIndex: 'actionss',
            key: 'action',
            width: 100,
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
        <Layout tok={tok} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} originPath={originPath} st={st}>
            <>
                <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
                    <div className=" col-span-1 md:col-span-3 flex flex-col" id="formAgentsWrapper">
                        <Sticky containerSelectorFocus="#formAgentsWrapper">
                            <div className="flex justify-between p-4 border-gray-400 border-t border-b bg-white mb-8">
                                <h1 className="font-semibold text-base w-auto py-2">All Assets</h1>
                                <div className="flex space-x-2">
                                    <Link href={`/inventories/create?originPath=Assets`}>
                                        <div className=" text-white text-sm bg-gray-700 hover:bg-gray-900 cursor-pointer rounded-md h-10 py-2 w-32 text-center" >
                                            <p>
                                                Add New
                                            </p>
                                        </div>
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
                        >
                            Apakah anda yakin ingin menghapus grup <strong>{warningDelete.asset_name}</strong>?
                            </Modal>
                    </div>
                    <div className="flex flex-col space-y-3 px-4">
                        <div className="font-semibold text-sm">Groups</div>
                        <p className="font-normal text-sm">
                            You can organize your agents into specific Groups like “Sales” and “Product Management”. Segmenting them into divisions lets you easily assign tickets, create specific canned responses, manage workflows and generate group-level reports. Note that the same agent can be a member of multiple groups as well
                        </p>
                        {/* <br />
                        <div className="font-semibold text-sm">Auto-ticket Assignment</div>
                        <p className="font-normal text-sm">
                            Once you create homogeneous agent groups, you can choose to automatically assign new tickets in this group to the next agent in Round Robin. Learn more about automatic ticket assignment
                        </p>
                        <br />
                        <div className="font-semibold text-sm">Working Hours</div>
                        <p className="font-normal text-sm">
                        You can assign a different set of business hours and holidays to each Group. For example, you can separate agents by shifts and assign them different business hours, or create separate groups for each time zone your agents work at
                        </p> */}
                    </div>
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