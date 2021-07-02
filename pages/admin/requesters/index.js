import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import st from '../../../components/layout-dashboard.module.css'
import Layout from '../../../components/layout-dashboard'
import httpcookie from 'cookie'
import EditOutlined from '@ant-design/icons/EditOutlined'
import Link from 'next/link'
import { Table, notification, Button, Select } from 'antd'

function Requesters({ initProps, dataProfile, dataListRequester, dataCompanyList, sidemenu }) {
    const [dataraw, setdataraw] = useState([])
    const [datarawloading, setdatarawloading] = useState(false)
    const [dataKK, setDataSource] = useState([]);
    const FilterAll = () => {
        setDataSource(dataraw)
    }
    const FilterByWord = (word) => {
        const currValue = word;
        const filteredData = dataraw.filter(entry => {
            if (entry.fullname.toLowerCase()[0] === word) {
                return entry.fullname.toLowerCase().includes(currValue)
            }
        }
        );
        setDataSource(filteredData);
    };
    const onFilterByCompany = (val) => {
        setDataSource(dataraw)
        if (val === "all") {
            setDataSource(dataraw)
        }
        else {
            setDataSource(prev => {
                return prev.filter(dataa => {
                    return dataa.company_id === val
                })
            })
        }
    }
    useEffect(() => {
        setdatarawloading(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/getRequesterList`, {
            method: `POST`,
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                page: 1,
                rows: 50,
                order_by: "asc"
            })
        })
            .then(res => res.json())
            .then(res2 => {
                setdatarawloading(false)
                var dataDD = []
                if (!res2) {
                    dataDD = []
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3
                    })
                    rt.push('/dashboard/admin')
                }
                else {
                    dataDD = res2.data.map((doc, idx) => {
                        return ({
                            user_id: doc.user_id,
                            profile_image: doc.profile_image === "" ? `/default-users.jpeg` : doc.profile_image,
                            fullname: doc.fullname,
                            email: doc.email,
                            phone_number: doc.phone_number,
                            company_id: doc.company_id
                        })
                    })
                }
                setdataraw(dataDD)
                setDataSource(dataDD)
            })
    }, [])
    const rt = useRouter()
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    const { originPath } = rt.query
    const { Option } = Select

    const columnsDD = [
        {
            dataIndex: 'profil_image',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            <img src={record.profile_image} alt="imageProfile" className=" object-cover w-10 h-10 rounded-full" />
                        </>
                }
            }
            // render: (text, record, index) => (
            //     <>
            //         <img src={record.profile_image} alt="imageProfile" className=" object-cover w-10 h-10 rounded-full" />
            //     </>
            // )
        },
        {
            title: 'ID',
            dataIndex: 'user_id',
            // sorter: (a, b) => a.user_id - b.user_id,
            // sortDirections: ['descend', 'ascend'],
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            {record.user_id}
                        </>
                }
            }
        },
        {
            title: 'Nama',
            dataIndex: 'fullname',
            // sorter: (a, b) => a.fullname.localeCompare(b.fullname),
            // sortDirections: ['descend', 'ascend'],
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            {record.fullname}
                        </>
                }
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            {record.email}
                        </>
                }
            }
        },
        {
            title: 'No Handphone',
            dataIndex: 'phone_number',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            {record.phone_number}
                        </>
                }
            }
        },
        {
            title: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
            dataIndex: 'actionss',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            {/* {
                                actions[index] ?
                                    <>{actions[index]} */}
                            {
                                [114, 115, 116, 118, 133].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                                    <Button onClick={() => { rt.push(`/admin/requesters/${record.user_id}`) }} style={{ paddingTop: `0`, paddingBottom: `0.3rem` }}>
                                        <EditOutlined />
                                    </Button>
                                    :
                                    null
                            }
                            {/* </>
                                    :
                                    null
                            } */}
                        </>
                }
            }
            // render: (text, record, index) => (
            //     <>
            //         {
            //             actions[index] ?
            //                 <>{actions[index]}
            //                     <Button onClick={() => { rt.push(`/admin/requesters/${record.user_id}`) }} style={{ paddingTop: `0`, paddingBottom: `0.3rem` }}>
            //                         <EditOutlined />
            //                     </Button>
            //                 </>
            //                 :
            //                 null
            //         }
            //     </>
            // )
        }
    ];

    return (
        <Layout tok={tok} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} originPath={originPath} st={st}>
            <>
                <div className="h-20 w-full grid grid-cols-1 md:grid-cols-3 border-gray-400 md:border-t md:border-b p-4 bg-white mb-5">
                    <div className="col-span-1 md:col-span-2 flex items-center mb-2 md:mb-0">
                        <div className="font-semibold text-base w-auto">Requesters</div>
                    </div>
                    {
                        [117].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                        <div className=" col-span-1 md:col-span-1 flex md:justify-end items-center">
                            <Link href={{
                                pathname: '/admin/requesters/create/',
                            }}>
                                <Button size="large" type="primary">
                                    Add New
                                </Button>
                            </Link>
                        </div>
                    }
                </div>
                {
                    [119].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                    <div className="h-auto w-full grid grid-cols-1 md:grid-cols-5 mb-5 bg-white">
                        <div className="md:col-span-5 col-span-1 flex flex-col py-3">
                            <div className="flex flex-wrap mb-2">
                                <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={FilterAll}>
                                    All
                            </button>
                                <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={() => FilterByWord("a")}>
                                    A
                            </button>
                                <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={() => FilterByWord("b")}>
                                    B
                            </button>
                                <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={() => FilterByWord("c")}>
                                    C
                            </button>
                                <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={() => FilterByWord("d")}>
                                    D
                            </button>
                                <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={() => FilterByWord("e")}>
                                    E
                            </button>
                                <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={() => FilterByWord("f")}>
                                    F
                            </button>
                                <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={() => FilterByWord("g")}>
                                    G
                            </button>
                                <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={() => FilterByWord("h")}>
                                    H
                            </button>
                                <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={() => FilterByWord("i")}>
                                    I
                            </button>
                                <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={() => FilterByWord("j")}>
                                    J
                            </button>
                                <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={() => FilterByWord("k")}>
                                    K
                            </button>
                                <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={() => FilterByWord("l")}>
                                    L
                            </button>
                                <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={() => FilterByWord("m")}>
                                    M
                            </button>
                                <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={() => FilterByWord("n")}>
                                    N
                            </button>
                                <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={() => FilterByWord("o")}>
                                    O
                            </button>
                                <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={() => FilterByWord("p")}>
                                    P
                            </button>
                                <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={() => FilterByWord("q")}>
                                    Q
                            </button>
                                <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={() => FilterByWord("r")}>
                                    R
                            </button>
                                <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={() => FilterByWord("s")}>
                                    S
                            </button>
                                <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={() => FilterByWord("t")}>
                                    T
                            </button>
                                <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={() => FilterByWord("u")}>
                                    U
                            </button>
                                <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={() => FilterByWord("v")}>
                                    V
                            </button>
                                <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={() => FilterByWord("w")}>
                                    W
                            </button>
                                <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={() => FilterByWord("x")}>
                                    X
                            </button>
                                <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={() => FilterByWord("y")}>
                                    Y
                            </button>
                                <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={() => FilterByWord("z")}>
                                    Z
                            </button>
                            </div>
                            {/* <div className="flex mb-2">
                                <Select placeholder="Filter by companies" defaultValue={"all"} onChange={(value) => { onFilterByCompany(value) }} style={{ width: `40%` }}>
                                    <Option value={"all"}>Semua</Option>
                                    {
                                        dataCompanyList.data.filter(dataa => dataa.company_id !== 66).map((doc, idx) => {
                                            return (
                                                <Option key={idx} value={doc.company_id}>{doc.company_id}: {doc.company_name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </div> */}
                            <Table pagination={{ pageSize: 9 }} scroll={{ x: 200 }} dataSource={dataKK} columns={columnsDD} loading={datarawloading}
                            // onRow={(record, rowIndex) => {
                            //     return {
                            //         onMouseOver: (event) => {
                            //             var actionsCopy = actions
                            //             actionsCopy[rowIndex] = true
                            //             setActions(actionsCopy)
                            //             setAction("block")
                            //         },
                            //         onMouseLeave: (event) => {
                            //             var actionsCopy = actions
                            //             actionsCopy[rowIndex] = false
                            //             setActions(actionsCopy)
                            //             setAction("hidden")
                            //         }
                            //     }
                            // }}
                            ></Table>
                        </div>
                    </div>
                }
            </>
        </Layout>
    )
}

export async function getServerSideProps({ req, res }) {
    var initProps = {};
    const reqBodyAccountList = {
        page: 1,
        rows: 50,
        order_by: "asc"
    }
    const reqBody = {
        page: 1,
        rows: 50,
        order_by: "asc"
    }
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

    if (![119, 118, 117, 116, 115, 114, 133].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
        res.writeHead(302, { Location: '/dashboard/admin' })
        res.end()
    }

    // const resourcesLA = await fetch(`https://boiling-thicket-46501.herokuapp.com/getRequesterList`, {
    //     method: `POST`,
    //     headers: {
    //         'Authorization': JSON.parse(initProps),
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(reqBodyAccountList)
    // })
    // const resjsonLA = await resourcesLA.json()
    // const dataListRequester = resjsonLA

    // const resourcesGCL = await fetch(`https://boiling-thicket-46501.herokuapp.com/getClientCompanyList`, {
    //     method: `POST`,
    //     headers: {
    //         'Authorization': JSON.parse(initProps),
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(reqBody)
    // })
    // const resjsonGCL = await resourcesGCL.json()
    // const dataCompanyList = resjsonGCL

    return {
        props: {
            initProps,
            dataProfile,
            // dataListRequester,
            // dataCompanyList,
            sidemenu: "4"
        },
    }
}

export default Requesters