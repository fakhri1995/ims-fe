import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from 'antd/lib/layout'
import Breadcrumb from 'antd/lib/breadcrumb'
import MenuUnfoldOutlined from '@ant-design/icons/MenuUnfoldOutlined'
import MenuFoldOutlined from '@ant-design/icons/MenuFoldOutlined'
import jscookie from 'js-cookie'
import LayoutMenu from '../components/layout-menu'
import LayoutMenuHeader from './layout-menu-header'

function LayoutDashboardMig({ children, tok, dataProfile, pathArr, sidemenu, originPath, st }) {
    const rt = useRouter()
    var rootBreadcrumb = ""
    var oriPath = ""
    var childBreacrumb = []
    if (originPath) {
        oriPath = originPath
    }
    if (pathArr) {
        if (pathArr[0] === "dashboard") {
            rootBreadcrumb = pathArr[1]
            rootBreadcrumb = rootBreadcrumb[0].toUpperCase() + rootBreadcrumb.slice(1)
        }
        else {
            for (var i = 0; i < pathArr.length; i++) {
                childBreacrumb.push(pathArr[i])
            }
        }
    }
    const childBreacrumbCC = childBreacrumb.map((doc, idx) => {
        return doc[0].toUpperCase() + doc.slice(1)
    })
    const { Sider, Content, Header } = Layout
    const [coll, setColl] = useState(true)
    const [collsmall, setCollsmall] = useState(true)
    const [tinggi, setTinggi] = useState(90)
    const handleColl = () => {
        setColl(prev => !prev)
    };
    const handleCollSmall = () => {
        setCollsmall(prev => !prev)
    };
    const handleLogout = () => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/logout`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': JSON.parse(tok)
            }
        })
            .then(res => res.json())
            .then(res2 => {
                console.log("isi dari res2: " + res2)
                if (res2.data.is_success) {
                    jscookie.remove('token')
                    console.log("token abis logout: " + jscookie.get('token'))
                    rt.push('/')
                }
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    useEffect(() => {
        var h = window.innerHeight
        setTinggi(h)
    }, [])
    var pathBuilder = ""
    return (
        <Layout>
            <LayoutMenu handleCollSmall={handleCollSmall} sidemenu={sidemenu} coll={coll} collsmall={collsmall} st={st}></LayoutMenu>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0, backgroundColor: `white`, display: `flex`, flexDirection: `row`, flexWrap: `wrap`, justifyContent: `space-between`, width: `100%`, height: `auto`, alignItems: `center` }}>
                    <div className="flex z-50">
                        {coll ? <MenuUnfoldOutlined onClick={handleColl} style={{ padding: `24px`, float: `left`, marginTop: `0.3rem` }} className={st.trigger}></MenuUnfoldOutlined> : <MenuFoldOutlined onClick={handleColl} style={{ padding: `24px`, float: `left` }} className={st.trigger}></MenuFoldOutlined>}
                        {collsmall ? <MenuUnfoldOutlined onClick={handleCollSmall} style={{ padding: `24px`, float: `left`, marginTop: `0.3rem` }} className={st.triggerSmall}></MenuUnfoldOutlined> : <MenuFoldOutlined onClick={handleCollSmall} style={{ padding: `24px`, float: `left` }} className={st.triggerSmall}></MenuFoldOutlined>}
                        {
                            pathArr ?
                                <Breadcrumb separator=">" style={{ float: `left`, padding: `24px 10px` }} className={st.breadcrumbClients}>
                                    {pathArr[0] === "dashboard" && <Breadcrumb.Item> <strong>{rootBreadcrumb}</strong></Breadcrumb.Item>}
                                    {pathArr[0] !== "dashboard" && <Breadcrumb.Item href={`/dashboard/${oriPath.toLowerCase()}`}><strong>{oriPath}</strong></Breadcrumb.Item>}
                                    {childBreacrumbCC.length !== 0 ?
                                        childBreacrumbCC.splice(1, 1).map((doc, idx) => {
                                            pathBuilder = pathBuilder + `/${pathArr[idx]}`
                                            if (idx === childBreacrumbCC.length - 1 && idx > 0) {
                                                return (
                                                    <Breadcrumb.Item key={idx}> <strong>{doc}</strong> </Breadcrumb.Item>
                                                )
                                            }
                                            else {
                                                return (
                                                    <Breadcrumb.Item key={idx}>
                                                        <Link href={{
                                                            pathname: pathBuilder,
                                                            query: {
                                                                originPath: oriPath
                                                            }
                                                        }}>
                                                            <strong>{doc}</strong>
                                                        </Link>
                                                    </Breadcrumb.Item>
                                                )
                                            }
                                        })
                                        :
                                        null
                                    }
                                </Breadcrumb>
                                :
                                null
                        }
                    </div>
                    <label htmlFor={`menutoggle`} className="pointer-cursor md:hidden block cursor-pointer">
                        <svg className="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20">
                            <title>menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </label>
                    <input className={`hidden ${st.menuToggle}`} type="checkbox" id={`menutoggle`} />
                    <LayoutMenuHeader dataProfile={dataProfile} Linkheader={Link} handleLogout={handleLogout} st={st}></LayoutMenuHeader>
                    {
                        pathArr ?
                            <Breadcrumb separator=">" style={{ float: `left`, padding: `24px 24px`, fontSize: `0.825rem`, width: `100%` }} className={st.breadcrumbClientsSmall}>
                                {pathArr[0] === "dashboard" && <Breadcrumb.Item> <strong>{rootBreadcrumb}</strong></Breadcrumb.Item>}
                                {pathArr[0] !== "dashboard" && <Breadcrumb.Item href={`/dashboard/${oriPath.toLowerCase()}`}><strong>{oriPath}</strong></Breadcrumb.Item>}
                                {childBreacrumbCC.length !== 0 ?
                                    childBreacrumbCC.splice(1, 1).map((doc, idx) => {
                                        pathBuilder = pathBuilder + `/${pathArr[idx]}`
                                        if (idx === childBreacrumbCC.length - 1 && idx > 0) {
                                            return (
                                                <Breadcrumb.Item key={idx}> <strong>{doc}</strong> </Breadcrumb.Item>
                                            )
                                        }
                                        else {
                                            return (
                                                <Breadcrumb.Item key={idx}>
                                                    <Link href={{
                                                        pathname: pathBuilder,
                                                        query: {
                                                            originPath: oriPath
                                                        }
                                                    }}>
                                                        <strong>{doc}</strong>
                                                    </Link>
                                                </Breadcrumb.Item>
                                            )
                                        }
                                    })
                                    :
                                    null
                                }
                            </Breadcrumb>
                            :
                            null
                    }
                </Header>
                <Content className="slb" style={{ padding: 24, height: `${tinggi}px`, backgroundColor: `white` }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default LayoutDashboardMig