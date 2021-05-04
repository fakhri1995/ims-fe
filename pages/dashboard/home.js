import httpcookie from 'cookie'
import jscookie from 'js-cookie'
import Layout from '../../components/layout-dashboard'
import st from "../../components/layout-dashboard-main.module.css"

function DashboardIndex({ initProps, dataProfile, sidemenu }) {
    const tok = initProps
    // const cook = jscookie.get('token')
    // console.log("cookie di dashboard: " + cook)
    return (
        <Layout tok={tok} sidemenu={sidemenu} dataProfile={dataProfile} st={st}>
            <h1>Selamat datang di Dashboard</h1>
        </Layout>
    )
}

export async function getServerSideProps({ req, res }) {
    var initProps = {};
    if (req && req.headers) {
        if (req.headers.cookie) {
            const cookies = req.headers.cookie;
            const cookiesJSON1 = httpcookie.parse(cookies);
            if (!cookiesJSON1.token) {
                return {
                    redirect: {
                        permanent: false,
                        destination: '/login'
                    }
                }
            }
            else {
                if (typeof cookies === 'string') {
                    const cookiesJSON = httpcookie.parse(cookies);
                    initProps = cookiesJSON.token;
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
                        sidemenu: "1"
                    },
                }
            }
        }
        else{
            return {
                redirect: {
                    permanent: false,
                    destination: '/login'
                }
            }
        }
    }
    else{
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            }
        }
    }
}

export default DashboardIndex