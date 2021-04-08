// File pages/index.js

import React from 'react'
import Link from 'next/link'
import Layout from '../../../components/migwebsite/layout.js'

function LandingPage({}) {
    // const tok = initProps
    // const cook = jscookie.get('token')
    // console.log("cookie di dashboard: " + cook)
    return (
        <Layout>
            <h1>Selamat datang di Dashboard</h1>
        </Layout>
    )
}

export default LandingPage