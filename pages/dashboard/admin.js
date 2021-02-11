import { useRouter } from 'next/router'
import httpcookie from 'cookie'
import Layout from '../../components/layout-dashboard'
import TeamOutlined from '@ant-design/icons/TeamOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import jscookie from 'js-cookie'

function DashboardAdmin({ initProps }) {
    // jscookie.remove('token')
    const rt = useRouter()
    // const cook = jscookie.get('token')
    // console.log("cookie di admin dashboard: " + cook)
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    return (
        <Layout tok={tok} pathArr={pathArr}>
            <div className="w-full h-auto py-5 font-mont border-t border-opacity-30 border-gray-500 border-b">
                <div className="divide-y divide-gray-300 divide-opacity-50">
                    <div>
                        <h3 className="font-semibold text-lg mb-0">User Management</h3>
                        <h3 className="font-normal text-sm text-gray-700">
                            Manage agents and end users of your service desk
                        </h3>
                    </div>
                    <div className="grid grid-cols-5">
                        <div className="border hover:border-blue-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                            <TeamOutlined /> Agents
                        </div>
                        <div className="border hover:border-blue-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                            <UserOutlined /> Requestors
                        </div>
                        <div className="border hover:border-blue-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                            <TeamOutlined /> Agents
                        </div>
                        <div className="border hover:border-blue-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                            <UserOutlined /> Requestors
                        </div>
                        <div className="border hover:border-blue-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                            <TeamOutlined /> Agents
                        </div>
                        <div className="border hover:border-blue-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                            <UserOutlined /> Requestors
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
    return {
        props: {
            initProps,
        },
    }
}

export default DashboardAdmin