import Layout from '../../components/layout-dashboard'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import Table from 'antd/lib/table'
import CopyOutlined from '@ant-design/icons/CopyOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import { useState } from 'react'


function Agents({ initProps, dataProfile, dataListAccount, sidemenu }) {
    const rt = useRouter()
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    const { originPath } = rt.query
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '4',
            name: 'Jim Red',
            age: 32,
            address: 'London No. 2 Lake Park',
        },
    ];
    const dataDD = dataListAccount.data.accounts.map((doc, idx) => {
        return ({
            user_id: doc.user_id,
            profile_image: doc.profile_image,
            fullname: doc.fullname,
            email: doc.email,
            phone_number: doc.phone_number
        })
    })
    var actionsArr = []
    for (var i = 0; i < dataDD.length; i++) {
        actionsArr.push(false)
    }
    const [actions, setActions] = useState(actionsArr)
    const [action, setAction] = useState(false)
    const handleMouseoverRows = (idx) => {
        var actionsCopy = actions
        actionsCopy[idx] = "block"
        setActions(actionsCopy)
    }
    const handleMouseleaveRows = (idx) => {
        var actionsCopy = actions
        actionsCopy[idx] = "hidden"
        setActions(actionsCopy)
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            filters: [
                {
                    text: 'Joe',
                    value: 'Joe',
                },
                {
                    text: 'Jim',
                    value: 'Jim',
                },
                {
                    text: 'Submenu',
                    value: 'Submenu',
                    children: [
                        {
                            text: 'Green',
                            value: 'Green',
                        },
                        {
                            text: 'Black',
                            value: 'Black',
                        },
                    ],
                },
            ],
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Age',
            dataIndex: 'age',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            filters: [
                {
                    text: 'London',
                    value: 'London',
                },
                {
                    text: 'New York',
                    value: 'New York',
                },
            ],
            filterMultiple: false,
            onFilter: (value, record) => record.address.indexOf(value) === 0,
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            dataIndex: 'actions',
            render: (text, record, index) => (
                <>
                    <h1>{actions[index]}</h1>
                    {
                        actions[index] ? <><a><CopyOutlined /></a> <a><EditOutlined /></a></>
                            :
                            null
                    }
                </>
            )
        }
    ];
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
            filters: [
                {
                    text: 'A',
                    value: 'A'
                },
                {
                    text: 'B',
                    value: 'B'
                },
                {
                    text: 'C',
                    value: 'C'
                },
                {
                    text: 'D',
                    value: 'D'
                },
                {
                    text: 'E',
                    value: 'E'
                },
                {
                    text: 'F',
                    value: 'F'
                },
                {
                    text: 'G',
                    value: 'G'
                },
                {
                    text: 'H',
                    value: 'H'
                },
                {
                    text: 'I',
                    value: 'I'
                },
                {
                    text: 'J',
                    value: 'J'
                },
                {
                    text: 'K',
                    value: 'K'
                },
                {
                    text: 'L',
                    value: 'L'
                },
                {
                    text: 'M',
                    value: 'M'
                },
                {
                    text: 'N',
                    value: 'N'
                },
                {
                    text: 'O',
                    value: 'O'
                },
                {
                    text: 'P',
                    value: 'P'
                },
                {
                    text: 'Q',
                    value: 'Q'
                },
                {
                    text: 'R',
                    value: 'R'
                },
                {
                    text: 'S',
                    value: 'S'
                },
                {
                    text: 'T',
                    value: 'T'
                },
                {
                    text: 'U',
                    value: 'U'
                },
                {
                    text: 'V',
                    value: 'V'
                },
                {
                    text: 'W',
                    value: 'W'
                },
                {
                    text: 'X',
                    value: 'X'
                },
                {
                    text: 'Y',
                    value: 'Y'
                },
                {
                    text: 'Z',
                    value: 'Z'
                },
            ],
            onFilter: (value, record) => record.fullname.indexOf(value) === 0,
            sorter: (a, b) =>  a.fullname.localeCompare(b.fullname),
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
            dataIndex: 'actionss',
            render: (text, record, index) => (
                <>
                    {
                        actions[index] ? <>{actions[index]} <a><CopyOutlined /></a> <a><EditOutlined /></a></>
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
                <div className="h-20 w-full flex justify-between border-gray-400 border-t border-b px-2 bg-white mb-5">
                    <div className="w-auto flex items-center">
                        <div className="font-semibold text-base w-auto">Agents</div>
                    </div>
                    <div className="flex justify-center items-center space-x-6">
                        <a className=" text-sm text-center w-auto">Import</a>
                        <a className=" text-sm text-center w-auto">Export</a>
                        <div className=" text-white text-sm bg-gray-700 hover:bg-gray-900 cursor-pointer rounded-md h-10 py-2 w-32 text-center">New Agent</div>
                    </div>
                </div>
                <div className="h-auto w-full grid grid-cols-4 mb-5 bg-white px-2">
                    <div className="col-span-3 flex flex-col space-y-3">
                        <div className="flex">
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto">
                                A
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto">
                                B
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto">
                                C
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto">
                                D
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto">
                                E
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto">
                                F
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto">
                                G
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto">
                                H
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto">
                                I
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto">
                                J
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto">
                                K
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto">
                                L
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto">
                                M
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto">
                                N
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto">
                                O
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto">
                                P
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto">
                                Q
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto">
                                R
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto">
                                S
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto">
                                T
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto">
                                U
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto">
                                V
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto">
                                W
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto">
                                X
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto">
                                Y
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto">
                                Z
                            </button>
                        </div>
                        <Table dataSource={dataDD} columns={columnsDD} onRow={(record, rowIndex) => {
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
                    <div className="flex flex-col space-y-3">
                        <div className="font-semibold text-base">Agents</div>
                        <p className="font-normal text-base">
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
    const resourcesGP = await fetch(`https://go.cgx.co.id/auth/v1/get-profile`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    const resourcesLA = await fetch(`https://go.cgx.co.id/admin/v1/get-list-account?page=1&rows=5&order_by=asc`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
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