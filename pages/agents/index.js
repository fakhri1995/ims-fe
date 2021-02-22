import Layout from '../../components/layout-dashboard'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import Table from 'antd/lib/table'
import CopyOutlined from '@ant-design/icons/CopyOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import { useState } from 'react'
import Link from 'next/link'


function Agents({ initProps, dataProfile, dataListAccount, sidemenu }) {
    const rt = useRouter()
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    const { originPath } = rt.query
    const dataDD = dataListAccount.data.accounts.map((doc, idx) => {
        return ({
            user_id: doc.user_id,
            profile_image: doc.profile_image,
            fullname: doc.fullname,
            email: doc.email,
            phone_number: doc.phone_number
        })
    })
    const [dataKK, setDataSource] = useState(dataDD);
    const FilterAll = () => {
        setDataSource(dataDD)
    }
    const FilterByWord = (word) => {
        const currValue = word;
        const filteredData = dataDD.filter(entry => {
            if (entry.fullname.toLowerCase()[0] === word) {
                return entry.fullname.toLowerCase().includes(currValue)
            }
        }
        );
        setDataSource(filteredData);
    };
    var actionsArr = []
    for (var i = 0; i < dataDD.length; i++) {
        actionsArr.push(false)
    }
    const [actions, setActions] = useState(actionsArr)
    const [action, setAction] = useState(false)
    const columnsDD = [
        {
            dataIndex: 'profil_image',
            render: (text, record, index) => (
                <>
                    <img src={record.profile_image} alt="imageProfile" className=" object-cover w-10 h-10 rounded-full" />
                </>
            )
        },
        {
            title: 'ID',
            dataIndex: 'user_id',
            sorter: (a, b) => a.user_id - b.user_id,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Nama',
            dataIndex: 'fullname',
            sorter: (a, b) => a.fullname.localeCompare(b.fullname),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'No Handphone',
            dataIndex: 'phone_number',
        },
        {
            title: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
            dataIndex: 'actionss',
            render: (text, record, index) => (
                <>
                    {
                        actions[index] ?
                            <>{actions[index]}
                                <a><CopyOutlined /></a>
                                <Link href={{
                                    pathname: `/agents/update/${record.user_id}`,
                                    query: {
                                        originPath: 'Admin'
                                    }
                                }}><a><EditOutlined /></a></Link>
                            </>
                            :
                            null
                    }
                </>
            )
        }
    ];
    return (
        <Layout tok={tok} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} originPath={originPath}>
            <>
                <div className="h-20 w-full grid grid-cols-1 md:grid-cols-3 border-gray-400 md:border-t md:border-b bg-white mb-5 p-4">
                    <div className=" col-span-1 md:col-span-2 flex items-center">
                        <div className="font-semibold text-base w-auto">Agents</div>
                    </div>
                    <div className=" col-span-1 md:col-span-1 flex md:justify-end items-center">
                        <a className=" text-sm text-center w-auto mr-5">Import</a>
                        <a className=" text-sm text-center w-auto mr-5">Export</a>
                        <div className=" text-white bg-gray-700 hover:bg-gray-900 cursor-pointer rounded-md h-10 py-3 md:py-2 w-24 md:w-32 text-center text-xs md:text-sm">
                            <Link href={{
                                pathname: '/agents/create/',
                                query: {
                                    originPath: 'Admin'
                                }
                            }}>
                                <div>
                                    New Agent
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="h-auto w-full grid grid-cols-1 md:grid-cols-4 mb-5 bg-white px-2">
                    <div className="flex md:hidden flex-col space-y-3 p-4 md:col-span-1 col-span-1">
                        <div className="font-semibold text-sm">Agents</div>
                        <p className="font-normal text-sm">
                            The list shows all Agents added in your help desk. You can edit an existing agent’s permissions and access rights by hovering over the agent and clicking on <EditOutlined />. <br />
                            You can add new agents by clicking on the “New Agent” button.
                        </p>
                    </div>
                    <div className="md:col-span-3 col-span-1 flex flex-col p-4">
                        <div className="flex">
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
                        <Table scroll={{ x: 200 }} dataSource={dataKK} columns={columnsDD} onRow={(record, rowIndex) => {
                            return {
                                onMouseOver: (event) => {
                                    var actionsCopy = actions
                                    actionsCopy[rowIndex] = true
                                    setActions(actionsCopy)
                                    setAction("block")
                                    // console.log("row: " + actions[rowIndex] + " " + rowIndex)
                                },
                                onMouseLeave: (event) => {
                                    var actionsCopy = actions
                                    actionsCopy[rowIndex] = false
                                    setActions(actionsCopy)
                                    setAction("hidden")
                                    // console.log("row leave: " + actions[rowIndex] + " " + rowIndex)
                                }
                            }
                        }}></Table>
                    </div>
                    <div className="hidden md:flex flex-col space-y-3 p-4 md:col-span-1 col-span-1">
                        <div className="font-semibold text-sm">Agents</div>
                        <p className="font-normal text-sm">
                            The list shows all Agents added in your help desk. You can edit an existing agent’s permissions and access rights by hovering over the agent and clicking on <EditOutlined />. <br />
                            You can add new agents by clicking on the “New Agent” button.
                        </p>
                    </div>
                </div>
            </>
        </Layout>
    )
}

export async function getServerSideProps({ req, res }) {
    var initProps = {};
    const reqBodyAccountList = {
        page: 1,
        rows: 10,
        order_by: "asc"
    }
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

    const resourcesLA = await fetch(`https://boiling-thicket-46501.herokuapp.com/getAccountList`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBodyAccountList)
    })
    const resjsonLA = await resourcesLA.json()
    const dataListAccount = resjsonLA
    return {
        props: {
            initProps,
            dataProfile,
            dataListAccount,
            sidemenu: "4"
        },
    }
}

export default Agents