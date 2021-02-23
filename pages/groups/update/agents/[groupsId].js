import Layout from '../../../../components/layout-dashboard-groups'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import Table from 'antd/lib/table'
import Tooltip from 'antd/lib/tooltip'
import Button from 'antd/lib/button'
import Drawer from 'antd/lib/drawer'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import { useState } from 'react'
import Link from 'next/link'
import Sticky from 'wil-react-sticky'
import Tabs from 'antd/lib/tabs'
import DownOutlined from '@ant-design/icons/DownOutlined'
import Dropdown from 'antd/lib/dropdown'
import Divider from 'antd/lib/divider'
import Menu from 'antd/lib/menu'
import { Input, Slider } from 'antd'
import { Select, Tag } from 'antd'
import { Radio } from 'antd'
import { Row, Col } from 'antd'
import st from '../../../../components/layout-dashboard-groups.module.css'

function Groups({ initProps, dataProfile, dataListAccount, dataDetailGroup, sidemenu }) {
    const rt = useRouter()
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    const { originPath } = rt.query
    // console.log('yg ni' + dataDetailGroup.data.group_detail.name)

    //------------populate list account-------------
    const [value, setValue] = useState(1);
    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const dataDD = dataListAccount.data.accounts.map((doc, idx) => {
        return ({
            value: doc.user_id,
            profile_image: doc.profile_image,
            label: doc.fullname,
            email: doc.email,
            phone_number: doc.phone_number
        })
    })
    
    function handleChange(value) {
        console.log(`selected ${value}`);
      }

    //----------------------------------------------
    const waktu = [{value:'15 Minutes'},{value:'30 Minutes'},{value:'1 Hour'},{value:'2 Hours'},{value:'4 Hours'},{value:'8 Hours'},{value:'12 Hours'},{value:'1 Day'},{value:'2 Days'},{value:'4 Days'}]
    // const time = JSON.parse(waktu)
    const [drawablecreate, setDrawablecreate] = useState(false)
    const { TextArea } = Input;
    const { Option } = Select;
    const { TabPane } = Tabs;
    function callback(key) {
        console.log(key);
      }
    const columnsDD = [
        {
            title: 'role',
            dataIndex: 'name',
            key: 'role',
            width: 800,
            render(text, record) {
                return {
                    props: {
                    style: { background: record.key%2 == 1 ? '#f2f2f2' : '#fff' },
                  },
                    children: <div>{text}</div>,
                };
            },
        },
        {
            title: 'action', // Non-breakable space is char 0xa0 (160 dec)
            dataIndex: 'actionss',
            key: 'action',
            width: 50,
            render: (text, record, index) => {
                return {
                    props: {
                        style: { background: record.key%2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children: 
                    <Button>
                        <Link href={{
                            pathname: `/edit/${record.key}`,
                            query: {
                                originPath: 'Admin'
                            }
                        }}><a>Edit</a></Link>
                    </Button>
                }
            }
        },
        {
            title: 'action', // Non-breakable space is char 0xa0 (160 dec)
            dataIndex: 'actionss',
            key: 'action',
            width: 100,
            render: (text, record, index) => {
                return {
                    props: {
                        style: { background: record.key%2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children: <Tooltip placement="topLeft" title={"Delete"}>
                    {/* {actions[index]} */}
                    <Button>
                        <Link href={{
                            pathname: `/delete/${record.key}`,
                            query: {
                                originPath: 'Admin'
                            }
                        }}><a><DeleteOutlined /></a></Link>
                    </Button>
                </Tooltip>
                }
            }
        }
    ];

    return (
        <Layout tok={tok} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} dataDetailGroup={dataDetailGroup} originPath={originPath} st={st}>
            <>
                <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
                    <div className=" col-span-1 md:col-span-3 flex flex-col" id="formAgentsWrapper">
                        <Sticky containerSelectorFocus="#formAgentsWrapper">
                            <div className="flex justify-between p-4 border-gray-400 border-t border-b bg-white mb-8">
                                <h1 className="font-semibold text-base w-auto py-2">New Group</h1>
                                <div className="flex space-x-2">
                                    
                                        <div className=" text-black text-sm bg-white hover:bg-gray-300 border-2 border-gray-900 cursor-pointer rounded-md h-10 py-2 w-20 text-center" >
                                            <p onClick={e => e.preventDefault()}>
                                            Cancel
                                            </p>
                                        </div>
                                        <div className=" text-white text-sm bg-gray-700 hover:bg-gray-900 cursor-pointer rounded-md h-10 py-2 w-20 text-center" >
                                            <p onClick={e => e.preventDefault()}>
                                            Save
                                            </p>
                                        </div>
                                    
                                </div>
                            </div>
                        </Sticky>
                        
                        {/* <div className="w-120 h-auto p-0 "> */}
                            <div className="pb-4 md:mb-0 ">
                                <h1 className="font-semibold text-sm">Group Name</h1>
                                <Input placeholder="Group Name" defaultValue={dataDetailGroup.data.group_detail.name}></Input>
                            </div>
                            
                            <div className="pb-4 md:mb-0">
                                <h1 className="font-semibold text-sm">Group Description</h1>
                                <TextArea placeholder="Group Description" defaultValue={dataDetailGroup.data.group_detail.description} rows={2}/>
                            </div>
                            
                            {/* <div className="pb-4 md:mb-0">
                                <h1 className="font-semibold text-sm">Business Hours</h1>
                                
                                <Select placeholder="Select Business Hours">
                                    <Option value="Default">Default</Option>
                                </Select>
                            </div> */}
                        {/* </div> */}
                        <Divider style={{borderTop:'1px solid rgba(0, 0, 0, 0.2)'}}/>
                        <h1 className="font-semibold text-base w-auto py-2">Agents</h1>
                        <div className="border-gray-300 p-4 border bg-white w-full h-auto ">
                            <Radio.Group className="flex" row onChange={onChange} value={value}>
                                <Radio className="flex-initial font-bold " value={1}>Add as a Member 
                                <p className="w-96 pl-6 whitespace-normal font-normal">Members can be assigned tickets, tasks and other items that belong to this group.</p>
                                </Radio>
                                <Radio disabled className="flex-initial font-bold" value={2}>Add as an Observer
                                <p className="w-96 pl-6 whitespace-normal font-normal">Members can be assigned tickets, tasks and other items that belong to this group.</p>
                                </Radio>
                            </Radio.Group>
                            <Row>
                                <Col flex="auto">
                                    <Select  placeholder="Add an Agent" showArrow mode="multiple" options={dataDD} onChange={handleChange} style={{ width: '100%',padding:'0 5px', lineHeight:'2.4'}}/>  
                                </Col>
                                <Col flex="100px">
                                    <div className=" text-black text-sm bg-white hover:bg-gray-300 border border-gray-900 cursor-pointer rounded-md h-10 py-2 w-20 text-center" >
                                        <p onClick={e => e.preventDefault()}>
                                        Add
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        {/* <Divider style={{borderTop:'1px solid rgba(0, 0, 0, 0.2)'}}/>
                        <h1 className="font-semibold text-base w-auto py-2">Group Automation</h1>
                        <Row>
                            <Col span={9}>
                                if a ticket remains un-assigned for more than
                            </Col>
                            <Col span={15}>
                            <Select  options={waktu}  style={{ width: '100%',padding:'0 5px', lineHeight:'2.4'}}/>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col span={9}>
                                then send escalation email to
                            </Col>
                            <Col span={15}>
                            <Select  placeholder="Select Agent" showArrow options={dataDD} onChange={handleChange} style={{ width: '100%',padding:'0 5px', lineHeight:'2.4'}}/> 
                            </Col>
                        </Row> */}
                        
                    </div>
                    <div className="flex flex-col space-y-3 px-4">
                        <div className="font-semibold text-sm">Groups</div>
                        <p className="font-normal text-xs md:text-sm">
                            You can organize your agents into specific Groups like “Sales” and “Product Management”. Segmenting them into divisions lets you easily assign tickets, create specific canned responses, manage workflows and generate group-level reports. Note that the same agent can be a member of multiple groups as well
                        </p>
                        <br />
                        <div className="font-semibold text-sm">Auto-ticket Assignment</div>
                        <p className="font-normal text-xs md:text-sm">
                            Once you create homogeneous agent groups, you can choose to automatically assign new tickets in this group to the next agent in Round Robin. Learn more about automatic ticket assignment
                        </p>
                        <br />
                        <div className="font-semibold text-sm">Working Hours</div>
                        <p className="font-normal text-xs md:text-sm">
                        You can assign a different set of business hours and holidays to each Group. For example, you can separate agents by shifts and assign them different business hours, or create separate groups for each time zone your agents work at
                        </p>
                    </div>
                </div>

                <Drawer title="New Groups" maskClosable={false} visible={drawablecreate} onClose={() => { setDrawablecreate(false) }} width={720} footer={
                    <div style={{ textAlign: 'right' }}>
                        <button onClick={() => { setDrawablecreate(false) }} className="bg-white-700 hover:bg-gray-300 border text-black py-1 px-2 rounded-md w-20 mr-4">
                            Cancel
                        </button>
                        <button type="primary" className="bg-blue-700 hover:bg-blue-800 border text-white py-1 px-2 rounded-md w-20">
                            Submit
                        </button>
                    </div>
                }>
                </Drawer>


            </>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }) {
    var initProps = {};
    const groupsid = params.groupsId
    const reqBodyAccountList = {
        page: 1,
        rows: 50,
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
    const resourcesGetDetailGroup = await fetch(`https://boiling-thicket-46501.herokuapp.com/getGroup?id=${groupsid}`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        },
    })
    const resjsonGetDetailGroup = await resourcesGetDetailGroup.json()
    const dataDetailGroup = resjsonGetDetailGroup
    
    // const resourcesGP = await fetch(`https://go.cgx.co.id/auth/v1/get-profile`, {
    //     method: `GET`,
    //     headers: {
    //         'Authorization': JSON.parse(initProps)
    //     }
    // })
    const resourcesGP = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    // const resourcesLA = await fetch(`https://go.cgx.co.id/admin/v1/get-list-account?page=1&rows=50&order_by=asc`, {
    //     method: `GET`,
    //     headers: {
    //         'Authorization': JSON.parse(initProps)
    //     }
    // })
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
            dataDetailGroup,
            sidemenu: "4"
        },
    }
}

export default Groups