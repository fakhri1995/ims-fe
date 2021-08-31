import React from 'react'
import Link from 'next/link'
import Head from './head'
import Styles from './styles'
import { Menu, Layout, Button, Dropdown  } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react'
import Bounce from 'react-reveal/Bounce';

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
                <Link href="/advantages"><button className={' border-2 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none hover:bg-black hover:text-white'}>
                See How It Works
                </button></Link>
            </div>
          </div>
        </div>
      );
    const menu2 = (
        <div className={'relative top-5 flex'}>
            <div className={'w-screen  table'}>
                {/* <div className='w-1/2 table-cell' >
                    <div className={''} style={{backgroundColor:'#F4EFEE', padding:'1rem 6rem'}}>
                        <Link href="/careers"><p className={' font-bold text-base'}>Careers</p></Link>
                        <p className={''}>asdasdasd</p>
                        <p className={''}>asdasdasd</p>
                        <Link href="/careers"><button className={' border-2 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none'}>
                        EXPLORE CAREERS
                        </button></Link>
                    </div>
                </div> */}
                <div className='w-1/2 table-cell' style={{backgroundColor:'#F4EFEE', padding:'1rem 6rem'}}>
                    <div className={''}>
                        <Link  href="/careers"><p className={'font-bold text-base'}>Careers</p></Link>
                        <p>Lorem Ipsum</p>
                        <Link href="/careers"><button className={' border-2 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none hover:bg-black hover:text-white'}>
                        Explore Careers
                        </button></Link>
                    </div>
                </div>
                <div className='w-1/2 table-cell' style={{backgroundColor:'#E7EDEF'}}>
                    <div className={'py-4 px-6 '}>
                        <p className={'font-bold text-base'}>About</p>
                        <p>We bringing hardware, software, and people advantages to support your business efficiently</p>
                        <Link href="/aboutus"><button className={' border-2 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none hover:bg-black hover:text-white'}>
                        Learn More
                        </button></Link>
                    </div>
                </div>
            </div>
        </div>
      );
    const [navbar, setNavbar] = useState(true) //true for hidden
    const [navbarSolution, setNavbarSolution] = useState(true) //true for hidden
    const [navbarCompany, setNavbarCompany] = useState(true) //true for hidden

    const handleNavbar = () => {
        setNavbar(!navbar)
        setNavbarSolution(true) //true for hidden
        setNavbarCompany(true) //true for hidden
    }
    const handleSolutionNavbar = () => {
        setNavbarSolution(!navbarSolution)
        setNavbar(!navbar)
        // console.log(navbar)
    }
    const handleCompanyNavbar = () => {
        setNavbarCompany(!navbarCompany)
        setNavbar(!navbar)
        // console.log(navbar)
    }
    
    return (
        <>
            <Head title="Home" />
            <Styles />
            <Layout className={'h-auto'}>
                <Header className={'header'} style={{ background:'white', position: 'fixed', zIndex: 31, width: '100%' }}>
                    <Link href="/">
                        <div className="logo top-3 md:top-2 absolute w-24 md:w-40" >
                            <img width={'auto'} height={'auto'} src='https://static.wixstatic.com/media/e817ec_be43f247d0d4454f9d29e2d22f8d4ff7~mv2.png/v1/fill/w_194,h_75,al_c,q_85,usm_0.66_1.00_0.01/mig.webp'/>
                        </div>
                    </Link>

                    {/* Open Hamburger Button */}
                    <label htmlFor={`menutoggle`} className="md:hidden block float-right cursor-pointer mt-7" hidden={!navbar}>
                        <svg className="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20">
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </label>

                    {/* Close Hamburger Button */}
                    <label onClick={()=>{handleNavbar()}} htmlFor={`menutoggle`} className="md:hidden block float-right cursor-pointer mt-7" hidden={navbar}>
                        <svg className="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 32 32">
                            <title>Menu</title>
                            <path d="M17.768 16l13.866-13.866c0.488-0.488 0.488-1.28 0-1.768s-1.28-0.488-1.768 0l-13.866 13.866-13.866-13.866c-0.488-0.488-1.28-0.488-1.768 0s-0.488 1.28 0 1.768l13.866 13.866-13.866 13.866c-0.488 0.488-0.488 1.28 0 1.768 0.244 0.244 0.564 0.366 0.884 0.366s0.64-0.122 0.884-0.366l13.866-13.866 13.866 13.866c0.244 0.244 0.564 0.366 0.884 0.366s0.64-0.122 0.884-0.366c0.488-0.488 0.488-1.28 0-1.768l-13.866-13.866z" />
                        </svg>
                    </label>
                    
                    {/* Browser Menu Navbar Header */}
                    <div theme="light" mode="horizontal" style={{lineHeight:'3.9rem',}} className={'hidden md:block float-right menu pt-2'}>
                        <Dropdown overlay={menu1}>
                            <a style={{fontWeight:'600'}} className={' ant-dropdown-link text-lg text-black menu-underlined hover:text-black'} onClick={e => e.preventDefault()}>
                            Solution
                            </a>
                        </Dropdown>
                        <Dropdown className={'ml-6 mr-4'} overlay={menu2}>
                            <a style={{fontWeight:'600'}} className=" ant-dropdown-link text-lg text-black menu-underlined hover:text-black" onClick={e => e.preventDefault()}>
                            Company 
                            </a>
                        </Dropdown>
                        <Button type="text" className={' mr-4 '} style={{fontWeight:'600', background:'white'}} key="2"><p className={'text-lg'}>Support</p></Button>
                    </div>
                </Header>

                {/* Mobile Menu Navbar Header */}
                <input className={`hidden menuToggle`} type="checkbox" id={`menutoggle`} />
                <section className={'md:hidden w-full pt-16'}>
                    <div theme="light" style={{lineHeight:'3.9rem',}} className={'float-right menu2'}>
                        <Button type="text" id="buttonSolution" onClick={()=>{handleSolutionNavbar()}} className={'menu-underlined ml-4 mt-2 '} style={{fontWeight:'600', background:'white'}} key="0">
                            Solution
                        </Button>
                        <Button type="text" onClick={()=>{handleCompanyNavbar()}} className={'menu-underlined ml-4'} style={{fontWeight:'600', background:'white'}} key="1">Company</Button>
                        <Button type="text" className={'menu-underlined ml-4 mb-4'} style={{fontWeight:'600', background:'white'}} key="2">Support</Button>
                    </div>
                </section>

                {/* SubMenu Solution */}
                <Bounce top when={!navbarSolution}>
                <section className={`bg-white h-screen w-screen z-30 fixed submenu-solution ${!navbarSolution ? "active" : ""}`} hidden={navbarSolution}>
                    <div style={{paddingTop:'5rem'}}></div>
                    <div className={'flex border-t-2 border-black'} >
                        {/* <button className={'border mx-4 my-2'} onClick={()=>{handleSolutionNavbar()}}>
                        back</button> */}
                            <svg className={'mx-4 my-2 animateBounce'} onClick={()=>{handleSolutionNavbar()}} width={32} height={32} id="icon-arrow-left2" viewBox="0 0 32 32">
                                <path d="M30.75 14.75h-26.472l4.385-4.364c0.489-0.487 0.491-1.278 0.004-1.768s-1.279-0.491-1.768-0.004l-6.532 6.5c-0 0-0.001 0.001-0.001 0.001-0.488 0.487-0.49 1.281-0 1.77 0 0 0.001 0.001 0.001 0.001l6.532 6.5c0.489 0.487 1.281 0.485 1.768-0.004s0.485-1.281-0.004-1.768l-4.385-4.364h26.472c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25z"></path>
                            </svg>
                    </div>
                    <div className={'grid justify-start border-b-2 border-t-2 border-black'} style={{backgroundColor:'#F4EFEE'}}>
                        <a className={''} href={'/hardware'}>
                            <button type="text" className={'text-black menu-underlined mx-4 my-2'} style={{fontWeight:'600'}}>
                                Hardware
                            </button>
                        </a>
                        <a className={'text-black'} href={'/software'}>
                            <button type="text" className={'text-black menu-underlined mx-4 my-2'} style={{fontWeight:'600'}}>
                                Software
                            </button>
                        </a>
                        <a className={'text-black'} href={'/people'}>
                            <button type="text" className={'text-black menu-underlined mx-4 my-2'} style={{fontWeight:'600'}}>
                                People
                            </button>
                        </a>
                    </div>
                    <div className={'h-full'} style={{backgroundColor:'#E7EDEF'}}>
                        <div className={'grid justify-start'} >
                            <a className={''} href={'/advantages'}>
                                <button type="text" className={'text-black menu-underlined mx-4 my-2 '} style={{fontWeight:'600'}}>
                                    Advantages
                                </button>
                            </a>
                        </div>
                        <p className={'mx-4'}>Operate your business , more efficient and more agile</p>
                        <Link href="/advantages"><button className={' border-2 mx-4 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none hover:bg-black hover:text-white'}>
                        See How It Works
                        </button></Link>
                    </div>
                </section>
                </Bounce>
                {/* SubMenu Company */}
                <Bounce top when={!navbarCompany}>
                <section className={'bg-white h-screen w-screen z-30 fixed'} hidden={navbarCompany}>
                    <div style={{paddingTop:'5rem'}}></div>
                    <div className={'flex border-t-2 border-black'}>
                        {/* <button className={'mx-4 my-2'} onClick={()=>{handleCompanyNavbar()}}>Back</button> */}
                        <svg className={'mx-4 my-2 animateBounce'} onClick={()=>{handleCompanyNavbar()}} width={32} height={32} id="icon-arrow-left2" viewBox="0 0 32 32">
                            <path d="M30.75 14.75h-26.472l4.385-4.364c0.489-0.487 0.491-1.278 0.004-1.768s-1.279-0.491-1.768-0.004l-6.532 6.5c-0 0-0.001 0.001-0.001 0.001-0.488 0.487-0.49 1.281-0 1.77 0 0 0.001 0.001 0.001 0.001l6.532 6.5c0.489 0.487 1.281 0.485 1.768-0.004s0.485-1.281-0.004-1.768l-4.385-4.364h26.472c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25z"></path>
                        </svg>
                    </div>
                    <div className={'grid justify-start border-b-2 border-t-2 border-black pb-4'} style={{backgroundColor:'#F4EFEE'}}>
                        <a className={''} href={'/careers'}>
                            <button type="text" className={'text-black menu-underlined mx-4 my-2 hover:bg-black hover:text-white'} style={{fontWeight:'600'}}>
                                Careers
                            </button>
                        </a>
                        <p className={'mx-4'}>Lorem Ipsum dolor met met an</p>
                        <Link href="/advantages"><button className={' border-2 mx-4 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none hover:bg-black hover:text-white'}>
                        Explore Careers
                        </button></Link>
                    </div>
                    <div className={'h-full'} style={{backgroundColor:'#E7EDEF'}}>
                        <div className={'grid justify-start'} >
                            <a className={''} href={'/aboutus'}>
                                <button type="text" className={'text-black menu-underlined mx-4 my-2 '} style={{fontWeight:'600'}}>
                                    About
                                </button>
                            </a>
                        </div>
                        <p className={'mx-4'}>We bringing hardware, software, and people advantages to support your business efficiently</p>
                        <Link href="/aboutus"><button className={' border-2 mx-4 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none hover:bg-black hover:text-white'}>
                        Learn More
                        </button></Link>
                    </div>
                </section>
                </Bounce>

                <Content className="site-layout" style={{ padding: '0px' }}>
                    <div className="site-layout-background" style={{ padding: 0, minHeight: 380 }}>
                        <div>
                            <div className=" bg-white h-full">
                                <div className="px-0 relative" id="wrapper">
                                    <main className=" md:pt-20" style={{ height: `auto` }}>
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
