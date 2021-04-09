import React from 'react'
import Link from 'next/link'
import Head from './head'
import Styles from './styles'
import { Layout, Menu, Image, Button } from 'antd';

// import Logo from '../../public/mig.png'

function layout({ children }) {
    const { Header, Content, Footer } = Layout;
    return (
        <>
            <Head title="Home" />
            <Styles />
            <Layout className={'h-auto'}>
                <Header className={' border-b'} style={{ background:'white', position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo top-3 sm:top-2 absolute w-20 sm:w-32" >
                        <img width={'auto'} height={'auto'} src='/mig.png'/>
                    </div>
                    <div theme="light" mode="horizontal" style={{lineHeight:'3.9rem',}} className={' float-right'} defaultSelectedKeys={['2']}>
                        <Button type="text" className={'mx-2'} key="1">Company</Button>
                        <Button type="text" className={'mx-2 mr-4'} key="2">Solution</Button>
                        <Button type="text" className={'mx-2 px-4 border-green-800 text-white'} style={{backgroundColor:'#188E4D', color:'white'}} key="3">Get Started</Button>
                    </div>
                </Header>
                <Content className="site-layout" style={{ padding: '0px', marginTop: 64 }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                        <div>
                            <div className="hero">
                                <h1 className="title">Welcome to Yusuf Tamvan!</h1>

                                <div className="row">
                                    <Link href="/login">
                                        <a className="card">
                                            <h3>Login Ke Admin disini dulu yaa &rarr;</h3>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className=" container bg-white h-screen">
                                <div className="pt-20 relative" id="wrapper">
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
