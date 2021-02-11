import httpcookie from 'cookie'
import jscookie from 'js-cookie'
import Layout from '../../components/layout-dashboard'


function DashboardIndex({ initProps }) {
    const tok = initProps
    // const cook = jscookie.get('token')
    // console.log("cookie di dashboard: " + cook)
    return (
        <Layout tok={tok}>
            <h1>Selamat datang di Dashboard</h1>
        </Layout>
    )
}

export async function getServerSideProps({ req,res }) {
    var initProps = {};
    if (req && req.headers) {
        const cookies = req.headers.cookie;
        if(!cookies){
            res.writeHead(302, { Location: '/' })
            res.end()
        }
        if (typeof cookies === 'string') {
            const cookiesJSON = httpcookie.parse(cookies);
            initProps = cookiesJSON.token;
            // console.log("cookie di index dashboard ssr: " + initProps)
        }
    }
    return {
        props: {
            initProps,
        },
    }
}

export default DashboardIndex