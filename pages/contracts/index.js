import Layout from '../../components/layout-dashboard2'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import {Table, Button, Tabs, notification, Modal} from 'antd'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import { useState } from 'react'
import Link from 'next/link'
import Sticky from 'wil-react-sticky'
import st from '../../components/layout-dashboard.module.css'

function Contracts({ initProps, dataProfile, dataContracts, sidemenu }) {
    const rt = useRouter()
    const tok = initProps
    // const pathArr = rt.pathname.split("/").slice(1)
    const pathArr = ['admin', 'contracts']
    // const { originPath } = rt.query
    const { TabPane } = Tabs;
    console.log(dataContracts)

    //--------hook modal delete contracts-------------
    const [warningDelete, setWarningDelete] = useState({
        istrue: false,
        key: null,
        nomor_kontrak: ""
    })
    const onClickModalDeleteContract = (istrue, record) => {
        setWarningDelete({
            ...warningDelete,
            ["istrue"]: istrue,
            ["key"]: record.key,
            ["nomor_kontrak"]: record.nomor_kontrak
        })
    }
    const [modaldelete, setmodaldelete] = useState(false)
    //-------------------------------------------

    //------------get data contracts-------------------
    var contracts
    if (dataContracts.data == null) {
        console.log("nodata")
        contracts = []
    }
    else {
        contracts = dataContracts
        .data.map((doc, idx) => {
            return ({
                idx: idx,
                key: doc.id,
                id: doc.id,
                id_client_company: doc.id_client_company,
                id_tipe_kontrak: doc.id_tipe_kontrak,
                nomor_kontrak: doc.nomor_kontrak,
                tanggal_mulai: doc.tanggal_mulai,
                tanggal_selesai: doc.tanggal_selesai
            })
        })
    }
    //------------------------------------------------

    //------------------handle delete contract-------------------
    const handleDeleteContract = (key) => {
        setmodaldelete(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteContract?id=${key}`, {
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
                        rt.push(`/contracts?originPath=Admin`)
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
        // {
        //     title: 'Company ID',
        //     dataIndex: 'id_client_company',
        //     key: 'id_client_company',
        //     width: 50,
        //     render(text, record) {
        //         return {
        //             props: {
        //                 style: { background: record.idx % 2 == 1 ? '#f2f2f2' : '#fff' },
        //             },
        //             children: <div><Link href={{
        //                 pathname: `/inventories/${record.key}`,
        //                 query: {
        //                     originPath: 'Admin'
        //                 }
        //             }}><a>{record.id_client_company}</a></Link>
        //             </div>,
        //         };
        //     },
        // },
        // {
        //     title: 'Tipe Kontrak ID',
        //     dataIndex: 'id_tipe_kontrak',
        //     key: 'id_tipe_kontrak',
        //     width: 50,
        //     render(text, record) {
        //         return {
        //             props: {
        //                 style: { background: record.idx % 2 == 1 ? '#f2f2f2' : '#fff' },
        //             },
        //             children: <div>{record.id_tipe_kontrak}
        //             </div>,
        //         };
        //     },
        // },
        {
            title: 'Nomor Kontrak',
            dataIndex: 'nomor_kontrak',
            key: 'nomor_kontrak',
            width: 50,
            render(text, record) {
                return {
                    props: {
                        style: { background: record.idx % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children: 
                    <div><Link href={{
                        pathname: `/contracts/${record.key}`,
                        query: {
                            originPath: 'Admin'
                        }
                    }}><a>{record.nomor_kontrak}</a></Link>
                    </div>
                };
            },
        },
        {
            title: 'Tanggal Mulai',
            dataIndex: 'tanggal_mulai',
            key: 'tanggal_mulai',
            width: 50,
            render(text, record) {
                return {
                    props: {
                        style: { background: record.idx % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children: <div>{record.tanggal_mulai}
                    </div>,
                };
            },
        },
        {
            title: 'Tanggal Selesai',
            dataIndex: 'tanggal_selesai',
            key: 'tanggal_selesai',
            width: 50,
            render(text, record) {
                return {
                    props: {
                        style: { background: record.idx % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children: <div>{record.tanggal_selesai}
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
                                pathname: `/contracts/update/${record.key}`,
                            }}><a>Edit</a></Link>
                        </Button>
                }
            }
        },
        {
            title: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0', // Non-breakable space is char 0xa0 (160 dec)
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
                            <Button onClick={() => { onClickModalDeleteContract(true, record) }}>
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
                                <h1 className="font-semibold text-base w-auto pt-2">Daftar Kontrak</h1>
                                <div className="flex space-x-2">
                                    <Link href={`/contracts/create`}>
                                        <Button type="primary" size="large">Tambah Kontrak</Button>
                                    </Link>
                                </div>
                            </div>
                        </Sticky>

                        <div className="col-span-3 flex flex-col space-y-3">

                            <Table scroll={{ x: 400 }} dataSource={contracts} columns={columnsDD} onRow={(record, rowIndex) => {
                            }}>
                            </Table>

                        </div>

                        <Modal
                            title="Konfirmasi untuk menghapus grup"
                            visible={warningDelete.istrue}
                            onOk={() => { handleDeleteContract(warningDelete.key) }}
                            onCancel={() => setWarningDelete(false, null)}
                            okButtonProps={{ disabled: modaldelete }}
                        >
                            Apakah anda yakin ingin menghapus kontrak <strong>{warningDelete.nomor_kontrak}</strong>?
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
    const resourcesGetContracts = await fetch(`https://boiling-thicket-46501.herokuapp.com/getContracts`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGetContracts = await resourcesGetContracts.json()
    const dataContracts = resjsonGetContracts

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
            dataContracts,
            sidemenu: "4"
        },
    }
}

export default Contracts