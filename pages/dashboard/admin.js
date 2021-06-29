import { useRouter } from 'next/router'
import httpcookie from 'cookie'
import Layout from '../../components/layout-dashboard'
import TeamOutlined from '@ant-design/icons/TeamOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import InboxOutlined from '@ant-design/icons/InboxOutlined'
import Link from 'next/link'
import st from "../../components/layout-dashboard.module.css"
import { IconRoles, IconModules, IconFeatures, IconAgents, IconRequesters, Icongroups, IconMIGCompany, IconClientsCompany, IconAssets, IconVendors, IconCatalog, IconContract, IconDepreciation, IconCareer, IconMessages } from '../../components/icon-admin'

function DashboardAdmin({ initProps, dataProfile, sidemenu }) {
    // jscookie.remove('token')
    const rt = useRouter()
    // const cook = jscookie.get('token')
    // console.log("cookie di admin dashboard: " + cook)
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    console.log(__dirname)
    return (
        <Layout tok={tok} pathArr={pathArr} sidemenu={sidemenu} dataProfile={dataProfile} st={st}>
            <div className="w-full h-auto p-5 font-mont border-t border-opacity-30 border-gray-500 bg-white space-y-10">
                {
                    dataProfile.data.registered_feature.includes(108) && dataProfile.data.registered_feature.includes(119) && dataProfile.data.registered_feature.includes(134)
                        ?
                        <div className="divide-y divide-gray-300 divide-opacity-50 border border-gray-300 p-5 rounded-md">
                            <div className="border-b border-gray-300">
                                <h3 className="font-semibold text-lg mb-0">User Management</h3>
                                <h3 className="font-normal text-sm text-gray-700">
                                    Manage agents and end users of your service desk
                                </h3>
                            </div>
                            <div className="grid md:grid-cols-5 sm:grid-cols-1">
                                {
                                    dataProfile.data.registered_feature.includes(108) ?
                                        <Link href={{
                                            pathname: '/admin/agents',
                                        }}>
                                            <div className="border-2 border-transparent hover:border-blue-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                                                <div className="flex">
                                                    <IconAgents />
                                                    <div className=" flex items-center">Agents</div>
                                                </div>
                                            </div>
                                        </Link>
                                        :
                                        null
                                }
                                {
                                    dataProfile.data.registered_feature.includes(119) ?
                                        <Link href={{
                                            pathname: '/admin/requesters',
                                        }}>
                                            <div className="border-2 border-transparent hover:border-blue-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                                                <div className="flex">
                                                    <IconRequesters />
                                                    <div className=" flex items-center">Requesters</div>
                                                </div>
                                            </div>
                                        </Link>
                                        :
                                        null
                                }
                                {
                                    dataProfile.data.registered_feature.includes(134) ?
                                        <Link href={{
                                            pathname: '/admin/groups',
                                            query: {
                                                originPath: "Admin"
                                            }
                                        }}>
                                            <div className="border-2 border-transparent hover:border-blue-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                                                <div className="flex">
                                                    <Icongroups />
                                                    <div className=" flex items-center">Groups</div>
                                                </div>
                                            </div>
                                        </Link>
                                        :
                                        null
                                }
                            </div>
                        </div>
                        :
                        null
                }

                <div className="divide-y divide-gray-300 divide-opacity-50 border border-gray-300 p-5 rounded-md">
                    <div className="border-b border-gray-300">
                        <h3 className="font-semibold text-lg mb-0">Features Management</h3>
                        <h3 className="font-normal text-sm text-gray-700">
                            Manajemen untuk pengaturan akses fitur dari tiap role
                        </h3>
                    </div>
                    <div className="grid md:grid-cols-5 sm:grid-cols-1">
                        {dataProfile.data.registered_feature.includes(173) ?
                            <Link href={{
                                pathname: '/admin/roles',
                                query: {
                                    originPath: "Admin"
                                }
                            }}>
                                <div className="border-2 border-transparent hover:border-blue-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                                    <div className="flex">
                                        <IconRoles />
                                        <div className=" flex items-center">Roles</div>
                                    </div>
                                </div>
                            </Link>
                            :
                            null
                        }
                        {dataProfile.data.registered_feature.includes(179) ?
                            <Link href={'/admin/modules'}>
                                <div className="border-2 border-transparent hover:border-blue-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                                    <div className="flex">
                                        <IconModules />
                                        <div className=" flex items-center">Modules</div>
                                    </div>
                                </div>
                            </Link>
                            :
                            null
                        }
                        <Link href={'/admin/features'}>
                            <div className="border-2 border-transparent hover:border-blue-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                                <div className="flex">
                                    <IconFeatures />
                                    <div className=" flex items-center">Features</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                {dataProfile.data.registered_feature.includes(144) && dataProfile.data.registered_feature.includes(155) && dataProfile.data.registered_feature.includes(150) ?
                    <div className="divide-y divide-gray-300 divide-opacity-50 border border-gray-300 p-5 rounded-md">
                        <div className="border-b border-gray-300">
                            <h3 className="font-semibold text-lg mb-0">Company</h3>
                            <h3 className="font-normal text-sm text-gray-700">
                                Configure the basic settings that are necessary for company information
                        </h3>
                        </div>
                        <div className="grid md:grid-cols-5 sm:grid-cols-1">
                            {dataProfile.data.registered_feature.includes(144) ?
                                <Link href={{
                                    pathname: '/admin/company/mig/',
                                }}>
                                    <div className="border-2 border-transparent hover:border-blue-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                                        <div className="flex">
                                            <IconMIGCompany />
                                            <div className=" flex items-center">My Company</div>
                                        </div>
                                    </div>
                                </Link>
                                :
                                null
                            }
                            {dataProfile.data.registered_feature.includes(155) ?
                                <Link href={{
                                    pathname: '/admin/company/',
                                }}>
                                    <div className="border-2 border-transparent hover:border-blue-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                                        <div className="flex">
                                            <IconClientsCompany />
                                            <div className=" flex items-center">Clients</div>
                                        </div>
                                    </div>
                                </Link>
                                :
                                null
                            }
                        </div>
                    </div>
                    :
                    null
                }

                <div className="divide-y divide-gray-300 divide-opacity-50 border border-gray-300 p-5 rounded-md">
                    <div className="border-b border-gray-300">
                        <h3 className="font-semibold text-lg mb-0">Assets</h3>
                        <h3 className="font-normal text-sm text-gray-700">
                            Keep track of your assets, vendors and contracts, all in one place
                        </h3>
                    </div>
                    <div className="grid md:grid-cols-5 sm:grid-cols-1">
                        <Link href={'/admin/assets'}>
                            <div className="border-2 border-transparent hover:border-blue-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                                <div className="flex">
                                    <IconAssets />
                                    <div className=" flex items-center">Asset Types & Fields</div>
                                </div>
                            </div>
                        </Link>
                        <Link href={{
                            pathname: '/admin/vendors',
                        }}>
                            <div className="border-2 border-transparent hover:border-blue-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                                <div className="flex">
                                    <IconVendors />
                                    <div className=" flex items-center">Vendors</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                {dataProfile.data.registered_feature.includes(183) && dataProfile.data.registered_feature.includes(187) && dataProfile.data.registered_feature.includes(194) ?
                    <div className="divide-y divide-gray-300 divide-opacity-50 border border-gray-300 p-5 rounded-md">
                        <div className="border-b border-gray-300">
                            <h3 className="font-semibold text-lg mb-0">Service Management</h3>
                            <h3 className="font-normal text-sm text-gray-700">
                                Keep track of your assets, vendors and contracts, all in one place
                            </h3>
                        </div>
                        <div className="grid md:grid-cols-5 sm:grid-cols-1">
                            {dataProfile.data.registered_feature.includes(183) && dataProfile.data.registered_feature.includes(187) ?
                                <Link href={'/admin/service'}>
                                    <div className="border-2 border-transparent hover:border-blue-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                                        <div className="flex">
                                            <IconCatalog />
                                            <div className=" flex items-center">Service Catalog</div>
                                        </div>
                                    </div>
                                </Link>
                                :
                                null
                            }
                            {dataProfile.data.registered_feature.includes(194) ?
                                <Link href={'/admin/contracts'}>
                                    <div className="border-2 border-transparent hover:border-blue-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                                        <div className="flex">
                                            <IconContract />
                                            <div className=" flex items-center">Contracts</div>
                                        </div>
                                    </div>
                                </Link>
                                :
                                null
                            }
                        </div>
                    </div>
                    :
                    null
                }

                {dataProfile.data.registered_feature.includes(169) ?
                    <div className="divide-y divide-gray-300 divide-opacity-50 border border-gray-300 p-5 rounded-md">
                        <div className="border-b border-gray-300">
                            <h3 className="font-semibold text-lg mb-0">Financial Management</h3>
                            <h3 className="font-normal text-sm text-gray-700">
                                Keep track of your financial
                            </h3>
                        </div>
                        <div className="grid md:grid-cols-5 sm:grid-cols-1">
                            <Link href={'/admin/financial'}>
                                <div className="border-2 border-transparent hover:border-blue-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                                    <div className="flex">
                                        <IconDepreciation />
                                        <div className=" flex items-center">Depreciation</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    :
                    null
                }

                <div className="divide-y divide-gray-300 divide-opacity-50 border border-gray-300 p-5 rounded-md">
                    <div className="border-b border-gray-300">
                        <h3 className="font-semibold text-lg mb-0">MIG Content Management System</h3>
                        <h3 className="font-normal text-sm text-gray-700">
                            Supply data into MIG Website
                            </h3>
                    </div>
                    <div className="grid md:grid-cols-5 sm:grid-cols-1">
                        <Link href={'/admin/careers'}>
                            <div className="border-2 border-transparent hover:border-blue-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                                <div className="flex">
                                    <IconCareer />
                                    <div className=" flex items-center">Careers</div>
                                </div>
                            </div>
                        </Link>
                        <Link href={'/admin/messages'}>
                            <div className="border-2 border-transparent hover:border-blue-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                                <div className="flex">
                                    <IconMessages />
                                    <div className=" flex items-center">Messages</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res }) {
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