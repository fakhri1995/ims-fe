import { useRouter } from 'next/router'
import cookie from 'cookie'
import Layout from '../../components/layout-dashboard'
import TeamOutlined from '@ant-design/icons/TeamOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import jscookie from 'js-cookie'

function DashboardAdmin({ initProps }) {
    const rt = useRouter()
    const cook = jscookie.get('token')
    console.log("cook: "+cook)
    const tok = initProps
    if (tok == null || tok == "null") {
        rt.push('/')
    }
    return (
        <Layout tok={cook}>
            <div className="w-full h-auto py-5 px-2 font-mont border-t border-opacity-30 border-gray-500 border-b">
                <div className="divide-y divide-gray-300 divide-opacity-50">
                    <div>
                        <h3 className="font-semibold text-lg mb-0">User Management</h3>
                        <h3 className="font-normal text-sm text-gray-700">
                            Manage agents and end users of your service desk
                        </h3>
                    </div>
                    <div className="grid grid-cols-5">
                        <div className="border hover:border-yellow-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                            <TeamOutlined /> Agents
                        </div>
                        <div className="border hover:border-yellow-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                            <UserOutlined /> Requestors
                        </div>
                        <div className="border hover:border-yellow-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                            <TeamOutlined /> Agents
                        </div>
                        <div className="border hover:border-yellow-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                            <UserOutlined /> Requestors
                        </div>
                        <div className="border hover:border-yellow-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                            <TeamOutlined /> Agents
                        </div>
                        <div className="border hover:border-yellow-500 cursor-pointer rounded-md py-4 px-3 mt-5 mx-1">
                            <UserOutlined /> Requestors
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req }) {
    const initProps = {};
    if (req && req.headers) {
        const cookies = req.headers.cookie;
        if (typeof cookies === 'string') {
            const cookiesJSON = cookie.parse(cookies);
            console.log("cookie di admin: " + cookiesJSON)
            initProps.token = JSON.stringify(cookiesJSON.token);
        }
    }
    return {
        props: {
            initProps,
        },
    }
}

export default DashboardAdmin