import Layout from '../../components/layout-dashboard2'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import Sticky from 'wil-react-sticky'
import {Tabs, notification, Modal, Timeline} from 'antd'
import st from '../../components/layout-dashboard-inventories.module.css'
import { Row, Col, Divider } from 'antd';

function Inventories({ initProps, dataProfile, dataInventory, dataInventoryColumnAndVendor, dataInventoryActivityLog, sidemenu }) {
    // Router.events.on('routeChangeStart', () => {
    //     console.log("Mulai")
    // });
    // Router.events.on('routeChangeComplete', () => {
    //     console.log("Selesai")
    // });
    const rt = useRouter()
    const tok = initProps
    // const pathArr = rt.pathname.split("/").slice(1)
    const pathArr = ['inventories', dataInventory.data.inventory.asset_name]
    const { originPath } = rt.query
    const { TabPane } = Tabs;
    console.log(dataInventoryActivityLog)
    // console.log(dataInventoryColumnAndVendor)
    // console.log(dataInventoryColumnAndVendor.data)
    // console.log(dataInventoryColumnAndVendor.data.assets)
    var asset_type = dataInventoryColumnAndVendor.data.assets.filter((doc,index)=>{
        return dataInventory.data.inventory.asset_id == doc.id
    })
    asset_type = asset_type[0]
    // console.log(asset_type)
    const inventory = dataInventory.data.inventory
    const activityLog = dataInventoryActivityLog.data
    //--------hook modal delete inventory-------------
    const [warningDelete, setWarningDelete] = useState({
        istrue: false,
        key: null,
        asset_name: ""
    })
    const onClickModalDeleteInventory = (istrue, record) => {
        setWarningDelete({
            ...warningDelete,
            ["istrue"]: istrue,
            ["key"]: record.id,
            ["asset_name"]: record.asset_name
        })
    }
    //-------------------------------------------

    //------------------handle delete inventory-------------------
    const handleDeleteGroup = (key) => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteGroup?id=${key}`, {
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
                        rt.push(`/groups?originPath=Admin`)
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

    //--------------------------------------------------------
    
    var timeConverter = (UNIX_timestamp) => {
        var a = new Date(UNIX_timestamp);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
      }
      
    return (
        <Layout tok={tok} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} originPath={originPath} st={st}>
            <>
                <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
                    <div className=" col-span-1 md:col-span-4 flex flex-col" id="formAgentsWrapper">
                        <Sticky containerSelectorFocus="#formAgentsWrapper">
                            <div className="flex justify-between p-4 border-gray-400 border-t border-b bg-white mb-8">
                                <h1 className="font-semibold text-base w-auto py-2">{inventory.asset_name}</h1>
                                <div className="flex space-x-2">
                                    <Link href={`/inventories/update/${inventory.id}?originPath=Assets`}>
                                        <div className=" text-white text-sm bg-gray-700 hover:bg-gray-900 border-gray-900 border-2 cursor-pointer rounded-md h-10 py-2 w-20 text-center" >
                                            <p>
                                                Edit
                                            </p>
                                        </div>
                                    </Link>
                                    <button onClick={()=>{onClickModalDeleteInventory(true,inventory)}} className=" text-black text-sm bg-white border-gray-900 border-2 hover:bg-gray-400 cursor-pointer rounded-md h-10 py-2 w-20 text-center">
                                            <p>
                                                Delete
                                            </p>
                                    </button>
                                </div>
                            </div>
                        </Sticky>

                        <div className="col-span-3 flex flex-col space-y-3">
                            <Tabs defaultActiveKey="1" tabPosition={"left"}>
                                <TabPane tab={'Overview'} key={1}>
                                    <div>
                                        <div className={'py-2'}>
                                        General
                                        </div>
                                        <div className={'text-black text-sm flex flex-col bg-white border-gray-300 border cursor-pointer p-3'}>
                                        {/* <Row>
                                            <Col span={8}>Asset Type</Col>
                                            <Col span={16}>{asset_type.name}</Col>
                                        </Row>
                                        <Row>
                                            <Col span={8}>Asset Tag</Col>
                                            <Col span={16}>3 / 5</Col>
                                        </Row>
                                        <Row>
                                            <Col span={8}>Impact</Col>
                                            <Col span={16}>3 / 5</Col>
                                        </Row> */}
                                            <div className={'flex w-full'} >
                                                <div className={' mr-20 w-32'}>
                                                    Asset Type
                                                </div>
                                                <div className={' w-auto'}>
                                                    {asset_type.name}
                                                </div>
                                            </div>
                                            <div className={'flex w-full'} >
                                                <div className={' mr-20 w-32'}>
                                                    Asset Tag
                                                </div>
                                                <div className={' w-auto'}>
                                                    Isi Apanih
                                                </div>
                                            </div>
                                            <div className={'flex w-full'} >
                                                <div className={' mr-20 w-32'}>
                                                    Impact
                                                </div>
                                                <div className={' w-auto'}>
                                                    Isi Apanih
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tab={'Relationships'} key={2}>
                                Content of tab Relationships
                                </TabPane>
                                <TabPane tab={'Associations'} key={3}>
                                Content of tab Associations
                                </TabPane>
                                <TabPane tab={'Purchase Orders'} key={4}>
                                Content of tab Purchase Orders
                                </TabPane>
                                <TabPane tab={'Contracts'} key={5}>
                                Content of tab Contracts
                                </TabPane>
                                <TabPane tab={'Activity'} key={6}>
                                <div className={'text-black text-sm flex flex-col bg-white border-gray-300 border cursor-pointer p-3 w-full'}>
                                    <Timeline mode={'alternate'}> 
                                    {activityLog.map((doc,index) => {
                                        var text
                                        var data_update = ""
                                        // console.log(Object.keys(doc.properties.attributes).length)
                                        // console.log(Object.keys(doc.properties.attributes))
                                        // console.log(Object.values(doc.properties.attributes))
                                        if (doc.description == "created inventory") {
                                            text =  "Created Inventory Named " + doc.properties.attributes.asset_name +
                                                    ", Own by " + (doc.properties.attributes.kepemilikan=="milikSendiri"?"Milik Sendiri":doc.properties.attributes.kepemilikan) +
                                                    "with Asset Type as " +doc.properties.attributes.asset_id_name +
                                                    ", Vendor as " +doc.properties.attributes.vendor_name +
                                                    ", Status as " +doc.properties.attributes.status
                                        } else {
                                            for (let i = 0; i < Object.keys(doc.properties.attributes).length; i++) {
                                                data_update = data_update + Object.keys(doc.properties.attributes)[i] + " changed to " + Object.values(doc.properties.attributes)[i] + ", "
                                            }
                                            text = data_update
                                        }
                                            return(
                                                <Timeline.Item key={index} label={timeConverter(Date.parse(doc.date))}>
                                                    {text}
                                                </Timeline.Item>
                                                )
                                        })
                                    }
                                    </Timeline>
                                </div>
                                </TabPane>
                            </Tabs>
                        </div>

                        <Modal
                            title="Konfirmasi untuk menghapus grup"
                            visible={warningDelete.istrue}
                            onOk={() => { handleDeleteGroup(warningDelete.key) }}
                            onCancel={() => setWarningDelete(false, null)}
                        >
                            Apakah anda yakin ingin menghapus grup <strong>{warningDelete.asset_name}</strong>?
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

export async function getServerSideProps({ req, res, params }) {
    var initProps = {};
    const inventoryid = params.inventoryId

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
    const resourcesGetInventory = await fetch(`https://boiling-thicket-46501.herokuapp.com/getInventory?id=${inventoryid}`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGetInventory = await resourcesGetInventory.json()
    const dataInventory = resjsonGetInventory
    const assetId = dataInventory.data.inventory.asset_id
    
    const resourcesGetInventoryColumnAndVendor = await fetch(`https://boiling-thicket-46501.herokuapp.com/getInventoryColumns?id=${assetId}`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGetInventoryColumnAndVendor = await resourcesGetInventoryColumnAndVendor.json()
    const dataInventoryColumnAndVendor = resjsonGetInventoryColumnAndVendor
    
    const resourcesGetInventoryActivityLog = await fetch(`https://boiling-thicket-46501.herokuapp.com/getActivityInventoryLogs?id=${inventoryid}`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGetInventoryActivityLog = await resourcesGetInventoryActivityLog.json()
    const dataInventoryActivityLog = resjsonGetInventoryActivityLog

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
            dataInventory,
            dataInventoryColumnAndVendor,
            dataInventoryActivityLog,
            sidemenu: "sub32"
        },
    }
}

export default Inventories