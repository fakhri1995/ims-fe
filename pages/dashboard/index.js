import { useRouter } from 'next/router'
import httpcookie from 'cookie'
import jscookie from 'js-cookie'
import Layout from '../../components/layout-dashboard'


function DashboardIndex({ initProps }) {
    const rt = useRouter()
    const tok = initProps
    const cook = jscookie.get('token')
    if (tok == null || tok == "null") {
        rt.push('/')
    }
    console.log("cookie di dashboard: " + cook)
    return (
        <Layout tok={cook}>
            <h1>Selamat datang di Dashboard</h1>
        </Layout>
    )
}

export async function getServerSideProps({ req }) {
    const initProps = {};
    if (req && req.headers) {
        const cookies = req.headers.cookie;
        if (typeof cookies === 'string') {
            const cookiesJSON = httpcookie.parse(cookies);
            initProps.token = cookiesJSON.token;
        }
    }
    return {
        props: {
            initProps,
        },
    }
}

export default DashboardIndex