import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '../../../components/layout-dashboard'
import st from '../../../components/layout-dashboard.module.css'
import httpcookie from 'cookie'
import { SearchOutlined } from '@ant-design/icons'
import { Button, Table, Modal } from 'antd'


const Messages = ({ initProps, dataProfile, dataMessages, sidemenu }) => {
    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)

    //Definisi table
    const columnsFeature = [
        {
            title: 'No',
            dataIndex: 'nomor',
            key: 'nomor',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            {/* <a href="#" onClick={() => {
                                setdrawedit(true); setdataedit({
                                    id: record.id,
                                    position_name: record.position_name,
                                    job_description: record.job_description,
                                    job_category: record.job_category,
                                    register_link: record.register_link,
                                })
                            }}> */}
                            <h1 className="hover:text-gray-500">{record.nomor}</h1>
                            {/* </a> */}
                        </>
                }
            }
        },
        {
            title: 'Nama Pengirim',
            dataIndex: 'name',
            key: 'name',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            <p className=" text-base">{record.name}</p>
                        </>
                }
            }
        },
        {
            title: 'Company Email',
            dataIndex: 'company_email',
            key: 'company_email',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            <p className="text-xs">{record.company_email}</p>
                        </>
                }
            }
        },
        {
            title: 'Company Name',
            dataIndex: 'company_name',
            key: 'company_name',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            <p className="text-xs">{record.company_name}</p>
                        </>
                }
            }
        },
        {
            title: 'Interested In',
            dataIndex: 'interested_in',
            key: 'interested_in',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            <h1 className="text-xs">{record.interested_in}</h1>
                        </>
                }
            }
        },
        // {
        //     title: 'Message',
        //     dataIndex: 'message',
        //     key: 'message',
        //     align: 'center',
        //     render: (text, record, index) => {
        //         return {
        //             props: {
        //                 style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
        //             },
        //             children:
        //                 <>
        //                     <p className="text-xs">
        //                         message
        //                         hari ini adalah hari yg kau tunggu
        //                         hari ini adalah hari yg kau tunggu
        //                         hari ini adalah hari yg kau tunggu
        //                         </p>
        //                 </>
        //         }
        //     }
        // },
        {
            dataIndex: 'status',
            key: 'status',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <div className=" flex">
                            <Button style={{ paddingTop: `0`, paddingBottom: `0.3rem`, marginRight: `1rem` }}
                                onClick={() => {
                                    setdatadetail({
                                        id: record.id,
                                        name: record.name,
                                        company_email: record.company_email,
                                        company_name: record.company_name,
                                        interseted_in: record.interested_in,
                                        message: record.message
                                    })
                                    setmodaldetail(true)
                                }}
                            >
                                <SearchOutlined />
                            </Button>
                            {/* <Button onClick={() => {
                                setdrawedit(true)
                                setdataedit({
                                    id: record.id,
                                    position_name: record.position_name,
                                    job_description: record.job_description,
                                    job_category: record.job_category,
                                    register_link: record.register_link,
                                })
                            }} style={{ paddingTop: `0`, paddingBottom: `0.3rem`, marginRight: `1rem` }}>
                                <EditOutlined />
                            </Button>
                            <Button danger onClick={() => {
                                setmodaldelete(true);
                                setdatadelete({ ...datadelete, id: parseInt(record.id) });
                                setfeatureselected(record.position_name)
                            }} style={{ paddingTop: `0`, paddingBottom: `0.3rem` }}>
                                <DeleteOutlined />
                            </Button> */}
                        </div>
                }
            }
        },
    ]

    //useState
    const datatemp = dataMessages.data ?? []
    const dataMessagesMap = datatemp.map((doc, idx) => {
        return ({
            ...doc,
            nomor: idx + 1
        })
    })

    //create
    const [drawcreate, setdrawcreate] = useState(false)
    const [loadingcreate, setloadingcreate] = useState(false)
    const [datacreate, setdatacreate] = useState({
        name: '',
        company_email: '',
        company_name: '',
        interseted_in: '',
        message: ''
    })
    //update
    const [drawedit, setdrawedit] = useState(false)
    const [loadingedit, setloadingedit] = useState(false)
    const [dataedit, setdataedit] = useState({
        id: 0,
        name: '',
        company_email: '',
        company_name: '',
        interseted_in: '',
        message: ''
    })
    //delete
    const [modaldelete, setmodaldelete] = useState(false)
    const [loadingdelete, setloadingdelete] = useState(false)
    const [featureselected, setfeatureselected] = useState("")
    const [datadelete, setdatadelete] = useState({
        id: 0,
    })
    //detail
    const [modaldetail, setmodaldetail] = useState(false)
    const [loadingdetail, setloadingdetail] = useState(false)
    const [datadetail, setdatadetail] = useState({
        name: '',
        company_email: '',
        company_name: '',
        interseted_in: '',
        message: ''
    })

    return (
        <Layout initProps={initProps} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} st={st}>
            <div className="w-full grid grid-cols-5 border-t border-opacity-30 border-gray-500 bg-white">
                <div className="col-span-5 border-b border-opacity-30 border-gray-400 flex items-center justify-between px-0 py-4 md:p-4 mb-5">
                    <h1 className="font-bold">Messages</h1>
                    {/* <Button type="primary" size="large" onClick={() => { setdrawcreate(true) }}>Add New</Button> */}
                </div>
                <div className="col-span-5 p-0 md:p-5 flex flex-col">
                    <Table columns={columnsFeature} dataSource={dataMessagesMap} pagination={{ pageSize: 8 }} scroll={{ x: 300 }}></Table>
                </div>
            </div>
            <Modal
                title={`Message Detail`}
                visible={modaldetail}
                okButtonProps={{ disabled: loadingdetail }}
                onCancel={() => { setmodaldetail(false) }}
                style={{ top: `3rem` }}
                width={500}
                footer={null}
                destroyOnClose={true}
            >
                <div className="flex flex-col">
                    <h1 className="text-sm font-semibold mb-2">Name:</h1>
                    <p className="text-sm mb-5">{datadetail.company_name}</p>
                    <h1 className="text-sm font-semibold mb-2">Company Name:</h1>
                    <p className="text-sm mb-5">{datadetail.company_name}</p>
                    <h1 className="text-sm font-semibold mb-2">Company Email:</h1>
                    <p className="text-sm mb-5">{datadetail.company_email}</p>
                    <h1 className="text-sm font-semibold mb-2">Interested In:</h1>
                    <p className="text-sm mb-5">{datadetail.interseted_in}</p>
                    <h1 className="text-sm font-semibold mb-2">Message:</h1>
                    <p className="text-sm mb-5">{datadetail.message}</p>
                </div>
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

    const resourcesGM = await fetch(`https://boiling-thicket-46501.herokuapp.com/getMessages`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGM = await resourcesGM.json()
    const dataMessages = resjsonGM

    return {
        props: {
            initProps,
            dataProfile,
            dataMessages,
            sidemenu: "4"
        },
    }
}

export default Messages
