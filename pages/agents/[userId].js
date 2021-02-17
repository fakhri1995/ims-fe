import { useRouter } from 'next/router'
import Layout from '../../components/layout-dashboard'
import httpcookie from 'cookie'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import DatePicker from 'antd/lib/date-picker'
import Sticky from 'wil-react-sticky'
// import Link from 'next/link';
// import Breadcrumb from 'antd/lib/breadcrumb'



function RequestorsDetail({ initProps, dataProfile, dataDetailAccount, sidemenu }) {
    const rt = useRouter()
    const { userId, originPath } = rt.query
    const tok = initProps
    var pathArr = rt.pathname.split("/").slice(1)
    pathArr[pathArr.length - 1] = userId
    return (
        <Layout tok={tok} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} originPath={originPath} dataDetailAccount={dataDetailAccount}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
                <div className=" col-span-1 md:col-span-1 flex md:hidden flex-col space-y-4 p-4">
                    <div className="font-semibold text-base">Agents</div>
                    <p className="font-normal text-xs">
                        When you add a new agent, you will have to provide the agent’s email, set their permission levels and access (full-time or occasional). Agents will receive an email with a confirmation link to activate their account after which they can be assigned to, or respond to tickets. Administrators can also edit an Agent’s profile to include the agent’s title, phone, profile picture, signature etc.
                    </p>
                </div>
                <div className=" col-span-1 md:col-span-3 flex flex-col" id="formAgentsWrapper">
                    <Sticky containerSelectorFocus="#formAgentsWrapper">
                        <div className="flex justify-between p-4 border-t-2 border-b-2 bg-white mb-8">
                            <h1 className="font-semibold py-2">Edit Agents</h1>
                            <div className="flex space-x-2">
                                <button className=" bg-white border hover:bg-gray-200 border-gray-300 text-black py-1 px-3 rounded-md">Cancel</button>
                                <button className=" bg-gray-700 hover:bg-gray-800 border text-white py-1 px-3 rounded-md">Update</button>
                            </div>
                        </div>
                    </Sticky>
                    <div className="p-4 mb-14">
                        <h1 className="font-semibold mb-2">Agent type</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="md:mr-20 col-span-1 md:col-span-1">
                                <input type="radio" id="fulltime" name="agentType" /> <label htmlFor="fulltime" className="font-semibold text-xs">Full-Time</label>
                                <br />
                                <p className="text-sm">
                                    Consumes an agent license.
                                </p>
                            </div>
                            <div className=" col-span-1 md:col-span-1">
                                <input type="radio" id="occasional" name="agentType" /> <label htmlFor="occasional" className="font-semibold text-xs">Occasional</label>
                                <br />
                                <p className="text-sm">
                                    Consumes a day pass for each day that they login.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="shadow-lg flex flex-col rounded-md w-full h-auto p-4 mb-14">
                        <div className="border-b border-black p-4 font-semibold mb-5">
                            Detail Akun Pengguna
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            <div className="p-3 col-span-1 md:col-span-1">
                                <img src={dataDetailAccount.data.profile_image} alt="imageProfile" className=" object-cover w-32 h-32 rounded-full" />
                            </div>
                            <div className="p-3 col-span-1 md:col-span-3">
                                <Form layout="vertical">
                                    <Form.Item label="Nama Lengkap" required tooltip="Wajib diisi">
                                        <Input value={dataDetailAccount.data.fullname} />
                                    </Form.Item>
                                    <Form.Item label="Email" required tooltip="Wajib diisi">
                                        <Input value={dataDetailAccount.data.email} />
                                    </Form.Item>
                                    <Form.Item label="No. Handphone">
                                        <Input value={dataDetailAccount.data.phone_number} />
                                    </Form.Item>
                                    <Form.Item label="Tanggal Bergabung">
                                        <h1 className="text-xs font-light">Default tanggal: {dataDetailAccount.data.create_time}</h1>
                                        <DatePicker onChange={(date, dateString) => { }} />
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <div className="shadow-lg flex flex-col rounded-md w-full h-auto p-4 mb-14">
                        <div className="border-b border-black p-4 font-semibold mb-5">
                            Detail Perusahaan
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            <div className="p-3 col-span-1 md:col-span-1">
                                <img src={dataDetailAccount.data.company.image_logo} alt="imageProfile" className=" object-cover w-32 h-32 rounded-full" />
                            </div>
                            <div className="col-span-1 md:col-span-3 p-3 space-y-4">
                                <div>
                                    <h1 className="font-semibold text-sm">ID Perusahaan:</h1>
                                    <h1 className="font-normal text-sm">{dataDetailAccount.data.company.company_id}</h1>
                                </div>
                                <div>
                                    <h1 className="font-semibold text-sm">Nama Perusahaan:</h1>
                                    <h1 className="font-normal text-sm">{dataDetailAccount.data.company.company_name}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 md:col-span-1 hidden md:flex flex-col space-y-4 p-4">
                    <div className="font-semibold text-base">Agents</div>
                    <p className="font-normal text-sm">
                        When you add a new agent, you will have to provide the agent’s email, set their permission levels and access (full-time or occasional). Agents will receive an email with a confirmation link to activate their account after which they can be assigned to, or respond to tickets. Administrators can also edit an Agent’s profile to include the agent’s title, phone, profile picture, signature etc.
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }) {
    var initProps = {};
    const userid = params.userId
    if (req && req.headers) {
        const cookies = req.headers.cookie;
        if (!cookies) {
            res.writeHead(302, { Location: '/' })
            res.end()
        }
        if (typeof cookies === 'string') {
            const cookiesJSON = httpcookie.parse(cookies);
            initProps = cookiesJSON.token;
        }
    }
    const resourcesDA = await fetch(`https://go.cgx.co.id/admin/v1/get-account?id=${parseInt(userid)}`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonDA = await resourcesDA.json()
    const dataDetailAccount = resjsonDA

    const resources = await fetch(`https://go.cgx.co.id/auth/v1/get-profile`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    console.log(resources)
    const resjson = await resources.json()
    const dataProfile = resjson
    return {
        props: {
            initProps,
            dataDetailAccount,
            dataProfile,
            sidemenu: "4"
        },
    }
}

export default RequestorsDetail