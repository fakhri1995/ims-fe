import { useRouter } from 'next/router'
import httpcookie from 'cookie'
import Layout from '../../components/layout-dashboard'
import TeamOutlined from '@ant-design/icons/TeamOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import Link from 'next/link'

function DashboardAdmin({ initProps, dataProfile, sidemenu }) {
    // jscookie.remove('token')
    const rt = useRouter()
    // const cook = jscookie.get('token')
    // console.log("cookie di admin dashboard: " + cook)
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    return (
        <Layout tok={tok} pathArr={pathArr} sidemenu={sidemenu} dataProfile={dataProfile}>
            <div className="w-full h-auto p-5 font-mont border-t border-opacity-30 border-gray-500 bg-white space-y-10">
                <div className="divide-y divide-gray-300 divide-opacity-50 border border-gray-300 p-5 rounded-md">
                    <div className="border-b border-gray-300">
                        <h3 className="font-semibold text-lg mb-0">User Management</h3>
                        <h3 className="font-normal text-sm text-gray-700">
                            Manage agents and end users of your service desk
                        </h3>
                    </div>
                    <div className="grid md:grid-cols-5 sm:grid-cols-1">
                        <div className="border-2 hover:border-blue-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                            <Link href={{
                                pathname: '/agents',
                                query: {
                                    originPath: "Admin"
                                }
                            }}>
                                <div>
                                    <TeamOutlined /> Agents
                                </div>
                            </Link>
                        </div>
                        <div className="border-2 hover:border-blue-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                        <Link href={{
                                pathname: '/requestors',
                                query: {
                                    originPath: "Admin"
                                }
                            }}>
                                <div>
                                    <UserOutlined /> Requestors
                                </div>
                            </Link>
                        </div>
                        <div className="border-2 hover:border-blue-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                            <Link href={{
                                pathname: '/roles',
                                query: {
                                    originPath: "Admin"
                                }
                            }}>
                                <div>
                                    <TeamOutlined /> Roles
                                </div>
                            </Link>
                        </div>
                        <div className="border-2 hover:border-blue-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                            <UserOutlined /> Groups
                        </div>
                    </div>
                </div>

                <div className="divide-y divide-gray-300 divide-opacity-50 border border-gray-300 p-5 rounded-md">
                    <div className="border-b border-gray-300">
                        <h3 className="font-semibold text-lg mb-0">Company</h3>
                        <h3 className="font-normal text-sm text-gray-700">
                            Configure the basic settings that are necessary for company information
                        </h3>
                    </div>
                    <div className="grid md:grid-cols-5 sm:grid-cols-1">
                        <div className="border-2 hover:border-blue-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                            <Link href={{
                                pathname: '/company/mig/',
                                query: {
                                    originPath: "Admin"
                                }
                            }}>
                                <div>
                                    <TeamOutlined /> MIG Company
                                </div>
                            </Link>
                        </div>
                        <div className="border-2 hover:border-blue-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                            <Link href={{
                                pathname: '/company/',
                                query: {
                                    originPath: "Admin"
                                }
                            }}>
                                <div>
                                    <UserOutlined /> Clients
                                </div>
                            </Link>
                        </div>
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
            sidemenu: "4"
        },
    }
}

export default DashboardAdmin