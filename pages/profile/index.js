import Layout from "../../components/layout-dashboard-profile"
import httpcookie from 'cookie'
import { useState } from "react"

import Tabs from 'antd/lib/tabs'
import Input from 'antd/lib/input'
import DatePicker from 'antd/lib/date-picker'
import EditOutlined from '@ant-design/icons/EditOutlined'

function ProfileTabs({ dataProfile, editable2 }) {
    return (
        <div className="p-4 flex flex-col w-full">
            <div className="flex flex-col">
                <h1 className="text-base font-normal mb-4">Work Information</h1>
                <div className="grid grid-cols-3">
                    <div className="mx-5 my-5">
                        <h1 className="text-xs text-gray-600 mb-1">Nama Lengkap</h1>
                        {
                            editable2 ?
                                <Input defaultValue={dataProfile.data.fullname}></Input>
                                :
                                <h1 className="text-sm text-black">{dataProfile.data.fullname}</h1>
                        }
                    </div>
                    <div className="mx-5 my-5">
                        <h1 className="text-xs text-gray-600 mb-1">Email</h1>
                        {
                            editable2 ?
                                <Input defaultValue={dataProfile.data.email}></Input>
                                :
                                <h1 className="text-sm text-black">{dataProfile.data.email}</h1>
                        }
                    </div>
                    <div className="mx-5 my-5">
                        <h1 className="text-xs text-gray-600 mb-1">Nomor Telepon</h1>
                        {
                            editable2 ?
                                <Input defaultValue={dataProfile.data.phone_number}></Input>
                                :
                                <h1 className="text-sm text-black">{dataProfile.data.phone_number}</h1>
                        }
                    </div>
                    <div className="mx-5 my-5">
                        <h1 className="text-xs text-gray-600 mb-1">Tanggal Bergabung</h1>
                        {
                            editable2 ?
                                // <DatePicker defaultValue={dataProfile.data.create_time}></DatePicker>
                                <DatePicker onChange={(date, dateString) => { }} />
                                :
                                <h1 className="text-sm text-black">{dataProfile.data.create_time}</h1>
                        }
                    </div>
                    <div className="mx-5 my-5">
                        <h1 className="text-xs text-gray-600 mb-1">ID Perusahaan</h1>
                        {
                            editable2 ?
                                <Input defaultValue={dataProfile.data.company_id}></Input>
                                :
                                <h1 className="text-sm text-black">{dataProfile.data.company_id}</h1>
                        }
                    </div>
                    <div className="mx-5 my-5">
                        <h1 className="text-xs text-gray-600 mb-1">Perusahaan</h1>
                        {
                            editable2 ?
                                <Input defaultValue={dataProfile.data.company_name}></Input>
                                :
                                <h1 className="text-sm text-black">{dataProfile.data.company_name}</h1>
                        }
                    </div>
                    <div className="mx-5 my-5">
                        <h1 className="text-xs text-gray-600 mb-1">Posisi</h1>
                        {
                            editable2 ?
                                <Input defaultValue={"-"}></Input>
                                :
                                <h1 className="text-sm text-black">-</h1>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

function SecurityTabs({ dataProfile }) {
    return (
        <h1>Ini security</h1>
    )
}

function ProfileIndex({ initProps, dataProfile }) {
    const { TabPane } = Tabs;
    const [editable, setEditable] = useState(false)
    const handleEditable = () => {
        setEditable(true)
    }
    const handleCloseEditable = () => {
        setEditable(false)
    }
    return (
        <Layout tok={initProps} dataProfile={dataProfile} >
            <div className="w-full h-auto border-t-2 p-4 relative">
                <div className=" absolute top-4 right-8">
                    {editable ?
                        <button className=" bg-white border hover:bg-gray-200 border-gray-300 text-black py-1 px-3 rounded-md mr-5" onClick={handleCloseEditable}>Cancel</button>
                        :
                        null
                    }
                    {editable ?
                        <button className=" bg-gray-700 hover:bg-gray-800 border text-white py-1 px-3 rounded-md w-24 md:w-40">Save</button>
                        :
                        <button className="border rounded-md p-2 hover:bg-gray-200 font-semibold text-sm" onClick={handleEditable}>
                            <EditOutlined /> Edit Profile
                        </button>
                    }
                </div>
                <div className="flex flex-col justify-center">
                    <div className="flex mb-8">
                        <div className="mx-4">
                            <img src={dataProfile.data.image_profile} alt="imageProfile" className=" object-cover w-20 h-20 rounded-full" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-semibold mb-1">{dataProfile.data.fullname}</h1>
                            <div className="flex">
                                <h1 className="text-sm font-normal mr-3 pt-1">{dataProfile.data.email} </h1>
                                <div className="mr-3 pt-1">|</div>
                                <div className=" bg-blue-100 text-blue-600 border-blue-600 border py-1 px-3 rounded-md">USER</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-7/12">
                        <Tabs tabPosition="top">
                            <TabPane tab="Profile" key={`profile`}>
                                <ProfileTabs dataProfile={dataProfile} editable2={editable} />
                            </TabPane>
                            <TabPane tab="Security" key={`security`}>
                                <SecurityTabs dataProfile={dataProfile} />
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
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
            // console.log("cookie di admin dashboard ssr: " + initProps)
        }
    }
    const resources = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjson = await resources.json()
    const dataProfile = resjson
    return {
        props: {
            initProps,
            dataProfile,
        },
    }
}

export default ProfileIndex