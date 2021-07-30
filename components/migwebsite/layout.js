import React from 'react'
import Link from 'next/link'
import Head from './head'
import Styles from './styles'
import { Menu, Layout, Button, Dropdown  } from 'antd';
import { DownOutlined } from '@ant-design/icons';

function layout({ children }) {
    const { Header, Content, Footer } = Layout;
    const menu1 = (
        <div className={'relative top-5 w-screen flex'}>
          <div className='w-1/2 flex-row' >
            <Menu className={'py-4 h-36'} style={{backgroundColor:'#F4EFEE', padding:'1rem 10rem'}}>
                <Menu.Item className='relative -left-4 -top-2'>
                <a className={'font-bold text-base menu-underlined'} href="/hardware">
                    Hardware
                </a>
                </Menu.Item>
                <Menu.Item className='relative -left-4 -top-4'>
                <a className={'font-bold text-base menu-underlined'} href="/people">
                    People
                </a>
                </Menu.Item>
                <Menu.Item className='relative -left-4 -top-6'>
                <a className={'font-bold text-base menu-underlined'} href="/software">
                    Software
                </a>
                </Menu.Item>
            </Menu>
          </div>
          <div className='w-1/2 flex-row' style={{backgroundColor:'#E7EDEF'}}>
            <div className={'py-4 px-6 h-36'}>
                <p className={'font-bold text-base'}>Advantages</p>
                <p>Operate your business , more efficient and more agile</p>
                <Link href="/advantages"><button className={' border-2 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none'}>
                SEE HOW  IT WORKS 
                </button></Link>
            </div>
          </div>
        </div>
      );
    const menu2 = (
        <div className={'relative top-5 w-screen flex'}>
          <div className='w-1/2 flex-row' >
            <div className={'h-36'} style={{backgroundColor:'#F4EFEE', padding:'1rem 10rem'}}>
                <Link href="/careers"><p className={' font-bold text-base'}>Careers</p></Link>
                <p className={''}>asdasdasd</p>
                <Link href="/careers"><button className={' border-2 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none'}>
                EXPLORE CAREERS
                </button></Link>
            </div>
          </div>
          <div className='w-1/2 flex-row' style={{backgroundColor:'#E7EDEF'}}>
            <div className={'py-4 px-6 h-36'}>
                <p className={'font-bold text-base'}>About</p>
                <p>We bringing hardware, software, and people advantages to support your business efficiently</p>
                <Link href="/aboutus"><button className={' border-2 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none'}>
                LEARN MORE
                </button></Link>
            </div>
          </div>
        </div>
      );
    return (
        <>
            <Head title="Home" />
            <Styles />
            <Layout className={'h-auto'}>
                <Header className={'header'} style={{ background:'white', position: 'fixed', zIndex: 20, width: '100%' }}>
                    <Link href="/">
                        <div className="logo top-3 md:top-2 absolute w-24 md:w-40" >
                            <img width={'auto'} height={'auto'} src='/mig.png'/>
                        </div>
                    </Link>
                    <label htmlFor={`menutoggle`} className="md:hidden block float-right cursor-pointer mt-7">
                            <svg className="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20">
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                            </svg>
                        </label>
                    <input className={`hidden menuToggle`} type="checkbox" id={`menutoggle`} />
                    <section className={'md:hidden w-full'}>
                        <div theme="light" mode="horizontal" style={{lineHeight:'3.9rem',}} className={'float-right menu2'}>
                            {/* <Dropdown overlay={menu1}>
                                <a className="" onClick={e => e.preventDefault()}>
                                Solutions <DownOutlined className={'fixed top-10'} />
                                </a>
                            </Dropdown> */}
                            <Button type="text" className={'ml-4 mt-4 '} style={{fontWeight:'600', background:'white'}} key="0">
                                Solutions
                            </Button>
                            <Button type="text" className={'ml-4 '} style={{fontWeight:'600', background:'white'}} key="1">Company</Button>
                            <Button type="text" className={'ml-4 mr-4 '} style={{fontWeight:'600', background:'white'}} key="2">Support</Button>
                            {/* <Button type="text" className={'button-hover ml-4 px-4 mb-4 border-green-800 text-white '} style={{backgroundColor:'#188E4D', color:'white', fontWeight:'600'}} key="3"><p>Get Started</p></Button> */}
                        </div>
                    </section>
                    <div theme="light" mode="horizontal" style={{lineHeight:'3.9rem',}} className={'hidden md:block float-right menu pt-2'}>
                        {/* <div className={'bla'}>bla</div>
                        <div className={'blabla'}>blabla</div> */}
                                {/* <div className={'bla'}>aaaaaaaaaa</div>
                                <div className={'blabla'}>bbbbbbbbbbb</div> */}
                        
                        <Dropdown overlay={menu1}>
                            {/* <div> */}
                                <a style={{fontWeight:'600'}} className={' ant-dropdown-link text-lg text-black menu-underlined hover:text-black'} onClick={e => e.preventDefault()}>
                                {/* <p className={'bla ant-dropdown-link'}>Solution </p> */}
                                Solution
                                {/* <div className={'blabla'}>hana</div> */}
                                    {/* <DownOutlined className={' relative top-3 right-10'} /> */}
                                </a>
                                {/* <div className={'bla'}>wijay</div> */}
                            {/* </div> */}
                        </Dropdown>
                        <Dropdown className={'ml-6 mr-4'} overlay={menu2}>
                            {/* <div> */}
                                <a style={{fontWeight:'600'}} className=" ant-dropdown-link text-lg text-black menu-underlined hover:text-black" onClick={e => e.preventDefault()}>
                                Company 
                                {/* <DownOutlined className={' relative top-3 right-10'} /> */}
                                </a>
                            {/* </div> */}
                        </Dropdown>
                        {/* <Button type="text" className={'mx-2 '} style={{fontWeight:'600', background:'white'}} key="0">
                            Solution
                        </Button> */}
                        {/* <Button type="text" className={'mx-2 '} style={{fontWeight:'600', background:'white'}} key="1">Company</Button> */}
                        <Button type="text" className={' mr-4 '} style={{fontWeight:'600', background:'white'}} key="2"><p className={'text-lg'}>Support</p></Button>
                        {/* <Button type="text" className={'button-hover mx-2 px-4 border-green-800 text-white '} style={{backgroundColor:'#188E4D', color:'white', fontWeight:'600'}} key="3"><p>Get Started</p></Button> */}
                    </div>
                </Header>
                <Content className="site-layout" style={{ padding: '0px' }}>
                    <div className="site-layout-background" style={{ padding: 0, minHeight: 380 }}>
                        <div>
                            <div className=" bg-white h-full">
                                <div className="px-0 relative" id="wrapper">
                                    <main className="" style={{ padding: '0px', height: `auto` }}>
                                        {children}
                                    </main>
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
                <Footer className={'footer-custom'} style={{ textAlign: 'left', backgroundColor:'white' }}>
                    <div className={' flex flex-col md:flex-row'}>
                        <Link href="/">
                        <div className="pb-4" style={{minWidth:'150px',width:'150px'}} >
                            <img src='/mig.png'/>
                        </div>  
                        </Link>
                        <div className={'flex justify-between flex-row px-0'}>
                            <div className={'flex-col px-0 my-2 md:my-0 md:px-16'}>
                                <p className={'font-bold py-1'}>Company</p>
                                <Link href={{pathname: '/aboutus'}}><p className={'cursor-pointer py-1'}>About Us</p></Link>
                                <Link href={{pathname: '/careers'}}><p className={'cursor-pointer py-1'}>Careers</p></Link>
                            </div>
                            <div className={'flex-col px-0 my-2 md:my-0 md:px-16'}>
                                <p className={'font-bold py-1'}>Solutions</p>
                                <Link href={{pathname: '/advantages'}}><p className={'cursor-pointer py-1'}>Advantages</p></Link>
                                <Link href={{pathname: '/hardware'}}><p className={'cursor-pointer py-1'}>Hardware</p></Link>
                                <Link href={{pathname: '/software'}}><p className={'cursor-pointer py-1'}>Software</p></Link>
                                <Link href={{pathname: '/people'}}><p className={'cursor-pointer py-1'}>People</p></Link>
                            </div>
                            <div className={'flex-col px-0 my-2 md:my-0 md:px-16'}>
                                <p className={'font-bold py-1'}>Help</p>
                                <p className={'cursor-pointer py-1'}>Contact Us</p>
                            </div>
                        </div>
                    </div>
                </Footer>
            </Layout>

        </>
    )
}

export default layout
