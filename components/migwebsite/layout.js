import React from 'react'
import Link from 'next/link'
import Head from './head'
import Styles from './styles'
import { Layout, Menu, Image, Button } from 'antd';
// import style from './styles.css'

// import Logo from '../../public/mig.png'

function layout({ children }) {
    const { Header, Content, Footer } = Layout;
    return (
        <>
            <Head title="Home" />
            <Styles />
            <Layout className={'h-auto'}>
                <Header className={'header border-b'} style={{padding:'', background:'white', position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo top-3 sm:top-2 absolute w-24 sm:w-32" >
                        <img width={'auto'} height={'auto'} src='/mig.png'/>
                    </div>
                    <label htmlFor={`menutoggle`} className="md:hidden block float-right cursor-pointer mt-5">
                            <svg className="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20">
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                            </svg>
                        </label>
                    <input className={`hidden menuToggle`} type="checkbox" id={`menutoggle`} />
                    <div theme="light" mode="horizontal" style={{lineHeight:'3.9rem',}} className={'hidden md:block float-right menu'}>
                        
                        <Button type="text" className={'mx-2'} style={{fontWeight:'600'}} key="1">
                            <Link href="/login">
                                    Login Ke Admin
                            </Link>
                        </Button>
                        <Button type="text" className={'mx-2'} style={{fontWeight:'600'}} key="1">Company</Button>
                        <Button type="text" className={'mx-2 mr-4'} style={{fontWeight:'600'}} key="2">Solution</Button>
                        <Button type="text" className={'mx-2 px-4 border-green-800 text-white'} style={{backgroundColor:'#188E4D', color:'white', fontWeight:'600'}} key="3"><p>Get Started</p></Button>
                    </div>
                </Header>
                <Content className="site-layout" style={{ padding: '0px', marginTop: 64 }}>
                    <div className="site-layout-background" style={{ padding: 0, minHeight: 380 }}>
                        <div>
                            <div className=" bg-white h-screen">
                                <div className="px-1 md:px-10 relative" id="wrapper">
                                    <main className="" style={{ padding: 24, height: `auto` }}>
                                        {children}
                                    </main>
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>

        </>
    )
}

export default layout
