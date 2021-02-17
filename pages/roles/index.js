import Layout from '../../components/layout-dashboard'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import Table from 'antd/lib/table'
import Tooltip from 'antd/lib/tooltip'
import Button from 'antd/lib/button'
import CopyOutlined from '@ant-design/icons/CopyOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import { useState } from 'react'
import Link from 'next/link'


function Requestors({ initProps, dataProfile, dataListAccount, sidemenu }) {
    const rt = useRouter()
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    const { originPath } = rt.query
    
    // const dataDD = dataListAccount.data.accounts.map((doc, idx) => {
    //     return ({
    //         user_id: doc.user_id,
    //         profile_image: doc.profile_image,
    //         fullname: doc.fullname,
    //         email: doc.email,
    //         phone_number: doc.phone_number
    //     })
    // })
    // const [dataKK, setDataSource] = useState(dataDD);
    // const FilterAll = () => {
    //     setDataSource(dataDD)
    // }
    // const FilterByWord = (word)=> {
    //     const currValue = word;
    //     const filteredData = dataDD.filter(entry => {
    //         if (entry.fullname.toLowerCase()[0] === word){
    //             return entry.fullname.toLowerCase().includes(currValue)
    //         }
    //     }
    //     );
    //     setDataSource(filteredData);
    // };
    // var actionsArr = []
    // for (var i = 0; i < dataDD.length; i++) {
    //     actionsArr.push(false)
    // }
    // const [actions, setActions] = useState(actionsArr)
    // const [action, setAction] = useState(false)
    
    const columnsDD = [
        {
            title: 'role',
            dataIndex: 'name',
            key: 'role',
            // sorter: (a, b) => a.user_id - b.user_id,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'nama',
            dataIndex: 'agent',
            key: 'nama',
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
            render: (actionss, record, index) => (
                <>
                {
                    
                <Tooltip placement="topLeft" title={actionss}>
                        
                        <>
                        {/* {actions[index]} */}
                        <Button>
                            
                            <Link href={{
                                pathname: `/clone/${record.key}`,
                                query: {
                                    originPath: 'Admin'
                                }
                            }}><a><CopyOutlined /></a></Link>
                        </Button>
                        </>
                        
                </Tooltip>
                }
                </>
            )
        }
    ];

    const data = [
        {
          key: '1',
          name: 'Account Admin',
          agent: '4 Agents',
          actionss: 'clone'
        },
        {
          key: '2',
          name: 'Admin',
          agent: 'No Agents',
          actionss: 'clone'
        },
        {
          key: '3',
          name: 'SD Supervisor',
          agent: 'No Agents',
          actionss: 'clone'
        },
      ];

    return (
        <Layout tok={tok} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} originPath={originPath}>
            <>
                <div className="h-20 w-full flex justify-between border-gray-400 border-t border-b px-2 bg-white mb-5">
                    <div className="w-auto flex items-center">
                        <div className="font-semibold text-base w-auto">Roles</div>
                    </div>
                    <div className="flex justify-center items-center space-x-6">
                        <div className=" text-white text-sm bg-gray-700 hover:bg-gray-900 cursor-pointer rounded-md h-10 py-2 w-32 text-center">New Role</div>
                    </div>
                </div>
                <div className="h-auto w-full grid grid-cols-4 mb-5 bg-white px-2">
                    <div className="col-span-3 flex flex-col space-y-3">
                        <div className="flex">
                            {/* <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={FilterAll}>
                                All
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={()=>FilterByWord("a")}>
                                A
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={()=>FilterByWord("b")}>
                                B
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={()=>FilterByWord("c")}>
                                C
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={()=>FilterByWord("d")}>
                                D
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={()=>FilterByWord("e")}>
                                E
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={()=>FilterByWord("f")}>
                                F
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={()=>FilterByWord("g")}>
                                G
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={()=>FilterByWord("h")}>
                                H
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={()=>FilterByWord("i")}>
                                I
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={()=>FilterByWord("j")}>
                                J
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={()=>FilterByWord("k")}>
                                K
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={()=>FilterByWord("l")}>
                                L
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={()=>FilterByWord("m")}>
                                M
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={()=>FilterByWord("n")}>
                                N
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={()=>FilterByWord("o")}>
                                O
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={()=>FilterByWord("p")}>
                                P
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={()=>FilterByWord("q")}>
                                Q
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={()=>FilterByWord("r")}>
                                R
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={()=>FilterByWord("s")}>
                                S
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={()=>FilterByWord("t")}>
                                T
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={()=>FilterByWord("u")}>
                                U
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={()=>FilterByWord("v")}>
                                V
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={()=>FilterByWord("w")}>
                                W
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={()=>FilterByWord("x")}>
                                X
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={()=>FilterByWord("y")}>
                                Y
                            </button>
                            <button className=" hover:bg-gray-400 rounded px-1 w-auto h-auto" onClick={()=>FilterByWord("z")}>
                                Z
                            </button> */}
                        </div>
                        <Table showHeader={false} scroll={{ x: 400 }} dataSource={data} columns={columnsDD} onRow={(record, rowIndex) => {
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
                    <div className="flex flex-col space-y-3 p-4">
                        <div className="font-semibold text-base">Understanding Roles</div>
                        <p className="font-normal text-base">
                        Roles allow you to create and edit access permissions for agents. You can create new roles, specify what actions agents with these roles can perform within your help desk, and assign the role to agents.
                        </p>
                        <p className="font-normal text-base">
                        For example, you can create a role for your Support Co-ordinators, allowing them to update fields and assign tickets, and even add notes internally, but not reply to customers.
                        </p>
                        <p className="font-normal text-base">
                        Once you create and save a new Role you will be able to assign it to agents when you create or edit their profile by clicking on the Agents icon under the admin tab.
                        </p>
                        <br/>
                        <div className="font-semibold text-base">Admin Privileges</div>
                        <p className="font-normal text-base">
                        You can nominate whether you want an agent to have access to settings under the Admin tab. Agents with admin access can be Operation Agents with limited access, or Super Admins with the ability to edit all configurations. You can have as many Super Admins with the ability to view and modify your billing details, or as few as one.
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

    const resourcesLA = await fetch(`https://go.cgx.co.id/admin/v1/get-list-account?page=1&rows=50&order_by=asc`, {
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

export default Requestors