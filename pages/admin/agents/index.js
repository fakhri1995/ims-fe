import Layout from '../../../components/layout-dashboard'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import st from '../../../components/layout-dashboard.module.css'
import { Table, notification, Button } from 'antd'

function Agents({ initProps, dataProfile, dataListAgent, sidemenu }) {
    const [dataraw, setdataraw] = useState([])
    const [datarawloading, setdatarawloading] = useState(false)
    const [dataKK, setDataSource] = useState([]);
    const [rowstate, setrowstate] = useState(0)
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
    useEffect(() => {
        setdatarawloading(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/getAgentList`, {
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
                            nomor: idx + 1,
                            user_id: doc.user_id,
                            profile_image: doc.profile_image === "" ? `/default-users.jpeg` : doc.profile_image,
                            fullname: doc.fullname,
                            email: doc.email,
                            phone_number: doc.phone_number,
                            company_name: doc.company_name,
                            status: doc.attribute.is_enabled
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

    const columnsDD = [
        {
            dataIndex: 'nomor',
            align: `center`,
            // sorter: (a, b) => a.user_id - b.user_id,
            // sortDirections: ['descend', 'ascend'],
            render: (text, record, index) => {
                return {
                    children:
                        <div className="text-center">
                            {record.nomor}
                        </div>
                }
            }
        },
        {
            dataIndex: 'profil_image',
            key: `profil_image`,
            render: (text, record, index) => {
                return {
                    // props: {
                    //     style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    // },
                    children:
                        <>
                            <img src={record.profile_image} alt="imageProfile" className=" object-cover w-10 h-10 rounded-full" />
                        </>
                }
            }
        },
        // {
        //     title: 'ID',
        //     dataIndex: 'user_id',
        //     // sorter: (a, b) => a.user_id - b.user_id,
        //     // sortDirections: ['descend', 'ascend'],
        //     // render: (text, record, index) => {
        //     //     return {
        //     //         props: {
        //     //             style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
        //     //         },
        //     //         children:
        //     //             <>
        //     //                 {record.user_id}
        //     //             </>
        //     //     }
        //     // }
        // },
        {
            title: 'Nama',
            dataIndex: 'fullname',
            // sorter: (a, b) => a.fullname.localeCompare(b.fullname),
            // sortDirections: ['descend', 'ascend'],
            // render: (text, record, index) => {
            //     return {
            //         props: {
            //             style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
            //         },
            //         children:
            //             <>
            //                 {record.fullname}
            //             </>
            //     }
            // }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            // render: (text, record, index) => {
            //     return {
            //         props: {
            //             style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
            //         },
            //         children:
            //             <>
            //                 {record.email}
            //             </>
            //     }
            // }
        },
        {
            title: 'No. Handphone',
            dataIndex: 'phone_number',
            // render: (text, record, index) => {
            //     return {
            //         props: {
            //             style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
            //         },
            //         children:
            //             <>
            //                 {record.phone_number}
            //             </>
            //     }
            // }
        },
        {
            title: 'Asal Lokasi',
            dataIndex: 'company_name',
            // render: (text, record, index) => {
            //     return {
            //         props: {
            //             style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
            //         },
            //         children:
            //             <>
            //                 {record.phone_number}
            //             </>
            //     }
            // }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                        {
                            record.status ?
                            <div className="rounded-md w-auto h-auto px-1 text-center py-1 bg-blue-100 border border-blue-200 text-blue-600">Aktif</div>
                            :
                            <div className="rounded-md w-auto h-auto px-1 text-center py-1 bg-red-100 border border-red-200 text-red-600">{"Non-aktif"}</div>
                        }
                        </>
                }
            }
        },
        // {
        //     title: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
        //     dataIndex: 'actionss',
        //     render: (text, record, index) => {
        //         return {
        //             props: {
        //                 style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
        //             },
        //             children:
        //                 <>
        //                     {
        //                         [107, 110, 111, 112, 132].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
        //                             <Button onClick={() => { rt.push(`/admin/agents/${record.user_id}`) }} style={{ paddingTop: `0`, paddingBottom: `0.3rem` }}>
        //                                 <EditOutlined />
        //                             </Button>
        //                             :
        //                             null
        //                     }
        //                 </>
        //         }
        //     }
        // }
    ];
    return (
        <Layout tok={tok} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} originPath={originPath} st={st}>
            <>
                <div className="h-20 w-full grid grid-cols-1 md:grid-cols-3 border-gray-400 md:border-t md:border-b bg-white mb-5 p-4">
                    <div className=" col-span-1 md:col-span-2 flex items-center mb-2 md:mb-0">
                        <div className="font-semibold text-base w-auto">Agents</div>
                    </div>
                    {
                        [109].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                        <div className=" col-span-1 md:col-span-1 flex md:justify-end items-center">
                            <Link href={{
                                pathname: '/admin/agents/create/',
                            }}>
                                <Button size="large" type="primary">
                                    Tambah
                            </Button>
                            </Link>
                        </div>
                    }
                </div>
                {
                    [108].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                    <div className="h-auto w-full grid grid-cols-1 md:grid-cols-5 mb-5 bg-white rounded-md">
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
                            <Table pagination={{ pageSize: 9 }} scroll={{ x: 200 }} dataSource={dataKK} columns={columnsDD} loading={datarawloading}
                                onRow={(record, rowIndex) => {
                                    return {
                                        onMouseOver: (event) => {
                                            setrowstate(record.user_id)
                                        },
                                        onClick: (event) => {
                                            {
                                                [107, 110, 111, 112, 132].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                                                    rt.push(`/admin/agents/detail/${record.user_id}`)
                                                    :
                                                    null
                                            }
                                        }
                                    }
                                }}
                                rowClassName={(record, idx) => {
                                    return (
                                        record.user_id === rowstate ? `cursor-pointer` : ``
                                    )
                                }}
                            ></Table>
                        </div>
                    </div>
                }
            </>
        </Layout>
    )
}

export async function getServerSideProps({ req, res }) {
    const reqBodyAccountList = {
        page: 1,
        rows: 50,
        order_by: "asc"
    }
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

    if (![107, 108, 109, 110, 111, 112, 132].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
        res.writeHead(302, { Location: '/dashboard/admin' })
        res.end()
    }

    // const resourcesLA = await fetch(`https://boiling-thicket-46501.herokuapp.com/getAgentList`, {
    //     method: `POST`,
    //     headers: {
    //         'Authorization': JSON.parse(initProps),
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(reqBodyAccountList)
    // })
    // const resjsonLA = await resourcesLA.json()
    // const dataListAgent = resjsonLA
    return {
        props: {
            initProps,
            dataProfile,
            // dataListAgent,
            sidemenu: "4"
        },
    }
}

export default Agents