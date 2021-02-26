import { useRouter } from 'next/router'
import httpcookie from 'cookie'
import Layout from '../../components/layout-dashboard-main'
import st from "../../components/layout-dashboard-main.module.css"
// import TeamOutlined from '@ant-design/icons/TeamOutlined'
// import UserOutlined from '@ant-design/icons/UserOutlined'
// import Link from 'next/link'

function Assets({ initProps, dataProfile, sidemenu }) {
    const rt = useRouter()
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    return (
        <Layout tok={tok} pathArr={pathArr} sidemenu={sidemenu} dataProfile={dataProfile} st={st}>
            <div className="w-full h-auto border-t border-opacity-30 border-gray-500 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="col-span-1 md:col-span-3 flex flex-col">
                        <div className="p-2 md:p-5 border-b flex justify-between">
                            <div className="text-xs md:text-sm font-semibold">
                                <h1 className="mt-2">Assets Types & Fields</h1>
                            </div>
                            <div className="w-auto h-auto p-2 text-white bg-blue-700 rounded-md cursor-pointer hover:bg-blue-900 text-xs md:text-sm font-semibold">
                                New Asset Type
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-1 flex flex-col p-2 md:p-5">
                        <h1 className="text-xs md:text-sm font-semibold mb-5">Asset Types & Fields</h1>
                        <p className="text-xs md:text-sm">
                        Freshservice lets you maintain a repository of assets by creating a structure of configuration types in your help desk. You can add asset types at the root level or within another asset type, and have several items mapped to those types.You can also disable the default asset types so that only the ones you need are visible.
                        <br/><br/>
                        When you open an asset, you can find out whether it is currently being used, its business impact and the employee it’s assigned to in your team. In addition you will also be able to pull out specifications, relationship details etc. about the asset without switching between different pages.
                        </p>
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
            sidemenu: "3"
        },
    }
}

export default Assets