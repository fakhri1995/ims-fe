import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import st from '../../../components/layout-dashboard.module.css'
import Layout from '../../../components/layout-dashboard'
import httpcookie from 'cookie'
import Link from 'next/link'
import { SearchOutlined } from '@ant-design/icons'
import { Table, notification, Button, Input, TreeSelect, Select } from 'antd'

function modifData(dataa) {
    for (var i = 0; i < dataa.length; i++) {
        dataa[i]['key'] = dataa[i].company_id
        dataa[i]['value'] = dataa[i].company_id
        dataa[i]['title'] = dataa[i].company_name
        dataa[i]['children'] = dataa[i].members
        delete dataa[i].members
        if (dataa[i].children) {
            modifData(dataa[i].children)
        }
    }
    return dataa
}

function Requesters({ initProps, dataProfile, dataListRequester, dataCompanyList, sidemenu }) {
    const rt = useRouter()
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    const { originPath } = rt.query

    //useState
    const [dataraw, setdataraw] = useState([])
    const [datarawloading, setdatarawloading] = useState(false)
    const [dataKK, setDataSource] = useState([]);
    const [rowstate, setrowstate] = useState(0)
    const [datacompany, setdatacompany] = useState([])
    const [datalokasi, setdatalokasi] = useState([])
    //state order
    const [namasearchact, setnamasearchact] = useState(false)
    const [asalcompanyfilteract, setasalcompanyfilteract] = useState(false)
    const [asallokasifilteract, setasallokasifilteract] = useState(false)
    const [asallokasitrigger, setasallokasitrigger] = useState(false)
    const [statusfilteract, setstatusfilteract] = useState(false)
    //state value
    const [namavalue, setnamavalue] = useState("")
    const [asallokasivalue, setasallokasivalue] = useState("")
    const [asalcompanyvalue, setasalcompanyvalue] = useState(0)
    const [statusvalue, setstatusvalue] = useState("")
    const [loadinglokasi, setloadinglokasi] = useState(true)

    //function
    var temp = []
    function getidData(dataa) {
        for (var i = 0; i < dataa.length; i++) {
            temp.push(dataa[i]['id'])
            if (dataa[i]['children']) {
                getidData(dataa[i]['children'])
            }
        }
    }

    //filtering
    const onChangeSearch = (e) => {
        if (e.target.value === "") {
            setDataSource(dataraw)
            setnamasearchact(false)
        }
        else {
            setnamasearchact(true)
            setnamavalue(e.target.value)
        }
    }
    const onChangeAsalCompany = (value) => {
        if (typeof (value) === 'undefined') {
            setDataSource(dataraw)
            setasalcompanyfilteract(false)
        }
        else {
            setasalcompanyfilteract(true)
            setasalcompanyvalue(value)
            setasallokasitrigger(prev => !prev)
            setloadinglokasi(false) 
        }
    }
    const onChangeAsalLokasi = (value) => {
        if (typeof (value) === 'undefined') {
            setDataSource(dataraw)
            setasallokasifilteract(false)
        }
        else {
            setasallokasifilteract(true)
            setasallokasivalue(value)
        }
    }
    const onChangeStatus = (value) => {
        if (typeof (value) === 'undefined') {
            setDataSource(dataraw)
            setstatusfilteract(false)
        }
        else {
            setstatusfilteract(true)
            setstatusvalue(value)
        }
    }
    const onFinalClick = () => {
        var datatemp = dataraw
        if (asalcompanyfilteract) {
            datatemp = datatemp.filter(flt => {
                return asalcompanyvalue.indexOf(flt.company_id) !== -1
            })
        }
        if (asallokasifilteract) {
            datatemp = datatemp.filter(flt => {
                return flt.company_id === asallokasivalue
            })
        }
        if (namasearchact) {
            datatemp = datatemp.filter(flt => {
                return flt.fullname.toLowerCase().includes(namavalue.toLowerCase())
            })
        }
        if (statusfilteract) {
            datatemp = datatemp.filter(flt => {
                return flt.status === statusvalue
            })
        }
        setDataSource(datatemp)
    }

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

    const columnsDD = [
        {
            dataIndex: 'profil_image',
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
            // render: (text, record, index) => (
            //     <>
            //         <img src={record.profile_image} alt="imageProfile" className=" object-cover w-10 h-10 rounded-full" />
            //     </>
            // )
        },
        // {
        //     title: 'ID',
        //     dataIndex: 'user_id',
        //     // sorter: (a, b) => a.user_id - b.user_id,
        //     // sortDirections: ['descend', 'ascend'],
        //     render: (text, record, index) => {
        //         return {
        //             // props: {
        //             //     style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
        //             // },
        //             children:
        //                 <>
        //                     {record.user_id}
        //                 </>
        //         }
        //     }
        // },
        {
            title: 'Nama',
            dataIndex: 'fullname',
            // sorter: (a, b) => a.fullname.localeCompare(b.fullname),
            // sortDirections: ['descend', 'ascend'],
            render: (text, record, index) => {
                return {
                    // props: {
                    //     style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    // },
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
                    // props: {
                    //     style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    // },
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
                    // props: {
                    //     style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    // },
                    children:
                        <>
                            {record.phone_number}
                        </>
                }
            }
        },
        {
            title: 'Asal Perusahaan',
            dataIndex: 'company_name',
            render: (text, record, index) => {
                return {
                    // props: {
                    //     style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    // },
                    children:
                        <>
                            {record.company_name}
                        </>
                }
            }
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
                                    <div className="rounded-md w-auto h-auto px-1 text-center py-1 bg-red-100 border border-red-200 text-red-600">Non-aktif</div>
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
        //             // props: {
        //             //     style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
        //             // },
        //             children:
        //                 <>
        //                     {/* {
        //                         actions[index] ?
        //                             <>{actions[index]} */}
        //                     {
        //                         [114, 115, 116, 118, 133].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
        //                             <Button onClick={() => { rt.push(`/admin/requesters/${record.user_id}`) }} style={{ paddingTop: `0`, paddingBottom: `0.3rem` }}>
        //                                 <EditOutlined />
        //                             </Button>
        //                             :
        //                             null
        //                     }
        //                     {/* </>
        //                             :
        //                             null
        //                     } */}
        //                 </>
        //         }
        //     }
        //     // render: (text, record, index) => (
        //     //     <>
        //     //         {
        //     //             actions[index] ?
        //     //                 <>{actions[index]}
        //     //                     <Button onClick={() => { rt.push(`/admin/requesters/${record.user_id}`) }} style={{ paddingTop: `0`, paddingBottom: `0.3rem` }}>
        //     //                         <EditOutlined />
        //     //                     </Button>
        //     //                 </>
        //     //                 :
        //     //                 null
        //     //         }
        //     //     </>
        //     // )
        // }
    ];

    //useEffect
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
                            company_id: doc.company_id,
                            company_name: doc.company_name,
                            status: doc.attribute.is_enabled
                        })
                    })
                }
                setdataraw(dataDD)
                setDataSource(dataDD)
            })
    }, [])
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getClientCompanyList`, {
            method: `POST`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                const c = [res2.data]
                const d = modifData(c)
                setdatacompany(d[0].children)
            })
    }, [])
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getLocations`, {
            method: `POST`,
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                company_id: Number(asalcompanyvalue)
            })
        })
            .then(res => res.json())
            .then(res2 => {
                setdatalokasi(res2.data[0].children)
                getidData(res2.data)
                setasalcompanyvalue(temp)
            })
    }, [asallokasitrigger])

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
                                pathname: '/admin/requesters/create',
                            }}>
                                <Button size="large" type="primary">
                                    Tambah
                                </Button>
                            </Link>
                        </div>
                    }
                </div>
                {
                    [119].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                    <div className="h-auto w-full grid grid-cols-1 md:grid-cols-5 mb-5 bg-white">
                        <div className="md:col-span-5 col-span-1 flex flex-col py-3">
                            {/* <div className="flex flex-wrap mb-2">
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
                            </div> */}
                            <div className="flex mb-8">
                                <div className=" w-10/12 mr-1 grid grid-cols-9">
                                    <div className="col-span-3 mr-1">
                                        <Input style={{ width: `100%`, marginRight: `0.5rem` }} placeholder="Cari nama requester" onChange={onChangeSearch} allowClear></Input>
                                    </div>
                                    <div className="col-span-2 mr-1">
                                        <Select placeholder="Pilih asal perusahaan requester" style={{ width: `100%`, marginRight: `0.5rem` }} onChange={onChangeAsalCompany} allowClear>
                                            {
                                                datacompany.map((doc, idx) => {
                                                    return (
                                                        <Select.Option value={doc.company_id}>{doc.company_name}</Select.Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </div>
                                    <div className="col-span-2 mr-1">
                                        <TreeSelect allowClear
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            treeData={datalokasi}
                                            placeholder="Cari asal lokasi requester"
                                            treeDefaultExpandAll
                                            style={{ width: `100%`, marginRight: `0.5rem` }}
                                            onChange={onChangeAsalLokasi}
                                            disabled={loadinglokasi}
                                        />
                                    </div>
                                    <div className="col-span-2 mr-1">
                                        <Select placeholder="Pilih status requester" style={{ width: `100%`, marginRight: `0.5rem` }} onChange={onChangeStatus} allowClear>
                                            <Select.Option value={true}>Aktif</Select.Option>
                                            <Select.Option value={false}>Non Aktif</Select.Option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="w-2/12">
                                    <Button type="primary" style={{ width: `100%` }} onClick={onFinalClick}><SearchOutlined /></Button>
                                    {/* <Button style={{ width: `40%` }} onClick={() => { setDataSource(dataraw) }}>Reset</Button> */}
                                </div>
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
                                                    rt.push(`/admin/requesters/detail/${record.user_id}`)
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