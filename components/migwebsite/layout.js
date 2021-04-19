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
                            <div className=" bg-white h-full">
                                <div className="px-0 relative" id="wrapper">
                                    <main className="" style={{ padding: '24px 0px 0px 0px', height: `auto` }}>
                                        {children}
                                    </main>
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
                <Footer className={''} style={{ textAlign: 'left' }}>
                    <div className={'flex'}>
                            <div className="" style={{minWidth:'150px',width:'150px'}} >
                                <img src='/mig.png'/>
                            </div>  
                            <div className={'flex px-20'}>
                                <div className={'flex-col px-16'}>
                                    <p className={'font-bold py-1'}>Company</p>
                                    <p className={' py-1'}>About Us</p>
                                    <p className={' py-1'}>Careers</p>
                                </div>
                                <div className={'flex-col px-16'}>
                                    <p className={'font-bold py-1'}>Solutions</p>
                                    <p className={' py-1'}>Advantages</p>
                                    <p className={' py-1'}>Hardware</p>
                                    <p className={' py-1'}>Software</p>
                                    <p className={' py-1'}>People</p>
                                </div>
                                <div className={'flex-col px-16'}>
                                    <p className={'font-bold py-1'}>Help</p>
                                    <p className={' py-1'}>Contact Us</p>
                                </div>
                            </div>
                    </div>
                </Footer>
            </Layout>

        </>
    )
}

export default layout
