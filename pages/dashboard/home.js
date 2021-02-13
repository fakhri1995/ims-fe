import httpcookie from 'cookie'
import jscookie from 'js-cookie'
import Layout from '../../components/layout-dashboard'


function DashboardIndex({ initProps, dataProfile, sidemenu }) {
    const tok = initProps
    // const cook = jscookie.get('token')
    // console.log("cookie di dashboard: " + cook)
    return (
        <Layout tok={tok} sidemenu={sidemenu} dataProfile={dataProfile}>
            <h1>Selamat datang di Dashboard</h1>
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
            initProps = cookiesJSON.token;
            // console.log("cookie di index dashboard ssr: " + initProps)
        }
    }
    const resources = await fetch(`https://go.cgx.co.id/auth/v1/get-profile`, {
        method: `GET`,
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

export default DashboardIndex