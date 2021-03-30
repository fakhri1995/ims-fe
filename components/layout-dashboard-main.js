import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from 'antd/lib/layout'
import jscookie from 'js-cookie'
import { Breadcrumb, Spin } from 'antd'
import MenuUnfoldOutlined from '@ant-design/icons/MenuUnfoldOutlined'
import MenuFoldOutlined from '@ant-design/icons/MenuFoldOutlined'
import LayoutMenu from '../components/layout-menu'
import LayoutMenuHeader from './layout-menu-header'


function LayoutDashboardMain({ children, tok, dataProfile, pathArr, sidemenu, originPath, st }) {
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
    const childBreacrumbDD = childBreacrumbCC
    if (childBreacrumbDD[1] === "Update") {
        // childBreacrumbDD[childBreacrumbDD.length - 2] = childBreacrumbDD[childBreacrumbDD.length - 2] + " " + childBreacrumbDD[childBreacrumbDD.length - 1]
        childBreacrumbDD.splice(2, 1)
    }
    const { Sider, Content, Header } = Layout
    const [coll, setColl] = useState(true)
    const [collsmall, setCollsmall] = useState(true)
    const [tinggi, setTinggi] = useState(90)
    const [loadingspin, setloadingspin] = useState(false)
    const handleColl = () => {
        setColl(prev => !prev)
    };
    const handleCollSmall = () => {
        setCollsmall(prev => !prev)
    };
    const handleLogout = () => {
        setloadingspin(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/logout`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': JSON.parse(tok)
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingspin(false)
                if (res2.data.is_success) {
                    jscookie.remove('token')
                    console.log("token abis logout: " + jscookie.get('token'))
                    rt.push('/')
                }
            })
            .catch(err => {
                setloadingspin(false)
                console.log(err.message)
            })
    }
    useEffect(() => {
        var h = window.innerHeight
        setTinggi(h)
    }, [])
    var pathBuilder = ""
    return (
        <Spin spinning={loadingspin}>
            <div className=" h-screen flex">
                <LayoutMenu handleCollSmall={handleCollSmall} sidemenu={sidemenu} coll={coll} collsmall={collsmall} st={st}></LayoutMenu>
                <div className="h-auto w-full">
                    <Header className="site-layout-background" style={{ padding: 0, backgroundColor: `white`, display: `flex`, alignItems: `center`, flexDirection: `row`, flexWrap: `wrap`, width: `100%`, justifyContent: `space-between`, height: `auto` }}>
                        <div className="flex z-50" >
                            {coll ? <MenuUnfoldOutlined onClick={handleColl} style={{ padding: `24px`, float: `left`, marginTop: `0.3rem` }} className={st.trigger}></MenuUnfoldOutlined> : <MenuFoldOutlined onClick={handleColl} style={{ padding: `24px`, float: `left` }} className={st.trigger}></MenuFoldOutlined>}
                            {collsmall ? <MenuUnfoldOutlined onClick={handleCollSmall} style={{ padding: `24px`, float: `left`, marginTop: `0.3rem` }} className={st.triggerSmall}></MenuUnfoldOutlined> : <MenuFoldOutlined onClick={handleCollSmall} style={{ padding: `24px`, float: `left` }} className={st.triggerSmall}></MenuFoldOutlined>}
                            {
                                pathArr ?
                                    <Breadcrumb separator=">" style={{ float: `left`, padding: `24px 10px`, backgroundColor: `white` }} className={st.breadcrumbClients}>
                                        {pathArr[0] === "dashboard" && <Breadcrumb.Item> <strong>{rootBreadcrumb}</strong></Breadcrumb.Item>}
                                        {pathArr[0] !== "dashboard" && <Breadcrumb.Item href={`/dashboard/${oriPath.toLowerCase()}`}><strong>{oriPath}</strong></Breadcrumb.Item>}
                                        {childBreacrumbDD.length !== 0 ?
                                            childBreacrumbDD.map((doc, idx) => {
                                                pathBuilder = pathBuilder + `/${pathArr[idx]}`
                                                if (idx === childBreacrumbDD.length - 1 && idx > 0) {
                                                    if (childBreacrumbDD[idx] === "Create") {
                                                        return (
                                                            <Breadcrumb.Item key={idx}> <strong>{doc}</strong> </Breadcrumb.Item>
                                                        )
                                                    }
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
                        <label htmlFor={`menutoggle`} className="pointer-cursor md:hidden block cursor-pointer mr-4">
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
                                    {childBreacrumbDD.length !== 0 ?
                                        childBreacrumbDD.map((doc, idx) => {
                                            pathBuilder = pathBuilder + `/${pathArr[idx]}`
                                            if (idx === childBreacrumbDD.length - 1 && idx > 0) {
                                                if (childBreacrumbDD[idx] === "Create") {
                                                    return (
                                                        <Breadcrumb.Item key={idx}> <strong>{doc}</strong> </Breadcrumb.Item>
                                                    )
                                                }
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
                    <main className="slb" style={{ padding: 24, height: `auto` }}>
                        {children}
                    </main>
                </div>
            </div>
        </Spin>
    )
}

export default LayoutDashboardMain