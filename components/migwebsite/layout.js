import React from 'react'
import Link from 'next/link'
import Head from './head'
import Styles from './styles'
import { Menu, Layout, Button, Dropdown  } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react'
import Bounce from 'react-reveal/Bounce';
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined'

function layout({ children }) {
    const { Header, Content, Footer } = Layout;
    // const menu2 = (
    //     <div className={'relative top-5 w-screen flex'}>
    //       <div className='w-1/2 flex-row' >
    //         <Menu className={'py-4 h-36'} style={{backgroundColor:'#F5F9EE', padding:'1rem 4rem'}}>
    //             <Menu.Item className='relative -left-8 -top-2'>
    //             <a className={'font-bold text-base menu-underlined'} href="/hardware">
    //                 Product
    //             </a>
    //             </Menu.Item>
    //             <Menu.Item className='relative -left-4 -top-2'>
    //             <a className={'font-bold text-base menu-underlined'} href="/hardware">
    //                 Hardware
    //             </a>
    //             </Menu.Item>
    //             <Menu.Item className='relative -left-4 -top-4'>
    //             <a className={'font-bold text-base menu-underlined'} href="/people">
    //                 People
    //             </a>
    //             </Menu.Item>
    //             <Menu.Item className='relative -left-4 -top-6'>
    //             <a className={'font-bold text-base menu-underlined'} href="/software">
    //                 Software
    //             </a>
    //             </Menu.Item>
    //         </Menu>
    //       </div>
    //       <div className='w-1/2 flex-row' style={{backgroundColor:'#E7EDEF'}}>
    //         <div className={'py-4 px-6 h-36'}>
    //             <p className={'font-bold text-base'}>Advantages</p>
    //             <p>Operate your business , more efficient and more agile</p>
    //             <Link href="/advantages"><button className={' border-2 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none hover:bg-black hover:text-white'}>
    //             See How It Works
    //             </button></Link>
    //         </div>
    //       </div>
    //     </div>
    //   );
    const menu = (
        <div className={'bg-white w-96 h-auto p-4 top-6 relative'}>
            <div className={'flex pb-4'}>
                <div className={'px-4 my-auto'}>
                    <img className={'w-60'} src={'/image/navbar/hardware.png'}></img>
                </div>
                <div>
                    <p className={'text-lg gilroy-medium'}>Hardware</p>
                    <p className={'text-sm gilroy-regular'}>Optimize your cost by leasing and maintenances IT hardwares</p>
                </div>
            </div>
            <div className={'flex pb-4'}>
                <div className={'px-4 my-auto'}>
                    <img className={'w-60'} src={'/image/navbar/software.png'}></img>
                </div>
                <div>
                    <p className={'text-lg gilroy-medium'}>Software</p>
                    <p className={'text-sm gilroy-regular'}>Simplify and automate the process through digitalization</p>
                </div>
            </div>
            <div className={'flex pb-4'}>
                <div className={'px-4 my-auto'}>
                    <img className={'w-60'} src={'/image/navbar/talents.png'}></img>
                </div>
                <div>
                    <p className={'text-lg gilroy-medium'}>Talents</p>
                    <p className={'text-sm gilroy-regular'}>Reduce complexity in talent sourcing and management</p>
                </div>
            </div>
        </div>
    )
    const menu1 = (
        <div className={'relative top-5 flex'}>
            <div className={'w-screen  table'}>
                <div className='w-3/5 table-cell' style={{backgroundColor:'#F5F9EE', padding:'1rem 4rem'}}>
                    <div className={'grid gap-2'}>
                        {/* <Button type="text" style={{fontWeight:'600', background:'#F5F9EE'}}><p className={'relative -left-6 gilroy-medium font-bold text-base'}>Product</p></Button> */}
                        <Link href="#"><p className={'relative -left-3 gilroy-medium font-bold text-base'}>Product</p></Link>
                        <Link href="/hardware"><p className={'font-bold text-base menu-underlined w-min'}>Hardware</p></Link>
                        <Link href="/people"><p className={'font-bold text-base menu-underlined w-min'}>People</p></Link>
                        <Link href="/software"><p className={'font-bold text-base menu-underlined w-min'}>Software</p></Link>                                             
                    </div>
                </div>
                <div className='w-2/5 table-cell' style={{backgroundColor:'#E7EDEF'}}>
                    <div className={'py-4 px-6 '}>
                        <p className={'font-bold text-base'}>Advantages</p>
                        <p>Operate your business, more efficience, and agile</p>
                        <Link href="/advantages"><button className={' border border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none hover:bg-black hover:text-white'}>
                        SEE HOW IT WORKS
                        </button></Link>
                    </div>
                </div>
            </div>
        </div>
      );

    const [navbar, setNavbar] = useState(true) //true for hidden
    const [navbarBottom, setNavbarBottom] = useState(true) //true for hidden
    const [navbarSolution, setNavbarSolution] = useState(true) //true for hidden
    const [navbarCompany, setNavbarCompany] = useState(true) //true for hidden

    const handleNavbar = () => {
        setNavbar(!navbar)
        setNavbarSolution(true) //true for hidden
        setNavbarCompany(true) //true for hidden
    }
    const handleNavbarBottom = () => {
        if (navbarBottom==true) {
            setTimeout(() => {
                setNavbarBottom(!navbarBottom)
            }, 600);
        } else {
            setNavbarBottom(!navbarBottom)
        }
        
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
                <Header className={'header'} style={{boxShadow:'0 5px 20px rgba(0,0,0,.15)' ,background:'white', position: 'fixed', zIndex: 31, width: '100%' }}>
                    <Link href="/">
                        <div className="logo top-4 md:top-4 absolute w-24 md:w-32" >
                            <img width={'auto'} height={'auto'} src='/mig.png'/>
                        </div>
                    </Link>

                    {/* Open Hamburger Button */}
                    <label onClick={()=>{handleNavbarBottom()}} htmlFor={`menutoggle`} className="md:hidden block float-right cursor-pointer mt-7" hidden={!navbar}>
                        <svg className="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20">
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </label>

                    {/* Close Hamburger Button */}
                    <label onClick={()=>{handleNavbar(),handleNavbarBottom()}} htmlFor={`menutoggle`} className="md:hidden block float-right cursor-pointer mt-7" hidden={navbar}>
                        <svg className="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 32 32">
                            <title>Menu</title>
                            <path d="M17.768 16l13.866-13.866c0.488-0.488 0.488-1.28 0-1.768s-1.28-0.488-1.768 0l-13.866 13.866-13.866-13.866c-0.488-0.488-1.28-0.488-1.768 0s-0.488 1.28 0 1.768l13.866 13.866-13.866 13.866c-0.488 0.488-0.488 1.28 0 1.768 0.244 0.244 0.564 0.366 0.884 0.366s0.64-0.122 0.884-0.366l13.866-13.866 13.866 13.866c0.244 0.244 0.564 0.366 0.884 0.366s0.64-0.122 0.884-0.366c0.488-0.488 0.488-1.28 0-1.768l-13.866-13.866z" />
                        </svg>
                    </label>
                    
                    {/* Browser Menu Navbar Header */}
                    <div theme="light" mode="horizontal" style={{lineHeight:'3.9rem',}} className={'hidden md:block float-right menu pt-2'}>
                        <Dropdown overlay={menu} placement="bottomCenter">
                            <Button type={'text'} style={{background:'white'}} className={'ant-dropdown-link text-lg text-black hover:text-black'} onClick={e => e.preventDefault()}>
                            <p className={'text-lg gilroy-medium menu-underlined'}>Solution</p>
                            </Button>
                        </Dropdown>
                        <Button href="/aboutus" type="text" className={''} style={{background:'white'}} key="1"><p className={'text-lg gilroy-medium menu-underlined'}>About Us</p></Button>
                        <Button href="/joinourteam" type="text" className={''} style={{background:'white'}} key="2"><p className={'text-lg gilroy-medium menu-underlined'}>Join Our Team</p></Button>
                        <Button href="/contactus" type="text" className={' mr-4 '} style={{background:'white'}} key="3"><p className={'text-lg gilroy-medium menu-underlined'}>Contact Us</p></Button>
                    </div>
                </Header>

                {/* Mobile Menu Navbar Header */}
                <input className={`hidden menuToggle`} type="checkbox" id={`menutoggle`} />
                <section className={'md:hidden w-full pt-16'}>
                    <div theme="light" style={{lineHeight:'3.9rem',}} className={'float-right menu2'}>
                        <Button type="text" onClick={()=>{handleSolutionNavbar()}} className={'menu-navbar mt-2'} style={{fontWeight:'600', background:'white'}} key="0">
                            Solution
                        </Button><hr className={'mx-4'}/>
                        <Button type="text" onClick={()=>{handleCompanyNavbar()}} className={'menu-navbar'} style={{fontWeight:'600', background:'white'}} key="1">
                            About Us
                        </Button><hr className={'mx-4'}/>
                        <Button type="text" className={'menu-navbar'} style={{fontWeight:'600', background:'white'}} key="2">
                            Join Our Team
                        </Button><hr className={'mx-4'}/>
                        <div hidden={navbarBottom} className={'bottom-5'} style={{position:'fixed'}}>
                            <p className={' text-xs mx-4 -my-4 text-gray-400'}>CONNECT WITH MITRAMAS INFOSYS GLOBAL</p>
                            <Button  type="text" className={'menu-navbar'} style={{fontWeight:'600', background:'white'}} key="3">
                                Contact Us <ArrowRightOutlined className={'relative'} style={{top:'-0.1rem'}}/>
                            </Button>
                        </div>
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
                        <a className={''} href={'/joinourteam'}>
                            <button type="text" className={'text-black menu-underlined mx-4 my-2'} style={{fontWeight:'600'}}>
                                Careers
                            </button>
                        </a>
                        <p className={'mx-4'}>Lorem Ipsum dolor met met an</p>
                        <Link href="/joinourteam"><button className={' border-2 mx-4 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none hover:bg-black hover:text-white'}>
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
                <div className={'px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'} style={{ textAlign: 'left', backgroundColor:'#EEF1EE' }}>
                    <div className={'container mx-auto'}>
                        {/* <div className={'py-8'}> */}
                        <div className={'py-8 flex flex-col lg:flex-row lg:justify-between'}>
                            <Link href="/">
                            <div className="pb-4" style={{minWidth:'150px',width:'150px'}} >
                                <img src='/mig.png'/>
                            </div>  
                            </Link>
                            <div className={'flex flex-row px-0 justify-between'}>
                                <div className={'flex-col pr-2 my-2 lg:my-0 lg:px-16'}>
                                    <p className={'gilroy-bold py-1 text-lg'}>Solutions</p>
                                    <Link href={{pathname: '/advantages'}}><p className={'gilroy-regular cursor-pointer menu-underlined py-1 w-min'}>Advantages</p></Link>
                                    <Link href={{pathname: '/hardware'}}><p className={'gilroy-regular cursor-pointer menu-underlined py-1 w-min'}>Hardware</p></Link>
                                    <Link href={{pathname: '/software'}}><p className={'gilroy-regular cursor-pointer menu-underlined py-1 w-min'}>Software</p></Link>
                                    <Link href={{pathname: '/talents'}}><p className={'gilroy-regular cursor-pointer menu-underlined py-1 w-min'}>Talents</p></Link>
                                </div>
                                <div className={'flex-col pr-2 my-2 lg:my-0 lg:px-16'}>
                                    <p className={'gilroy-bold py-1 text-lg'}>Company</p>
                                    <Link href={{pathname: '/aboutus'}}><p className={'gilroy-regular cursor-pointer menu-underlined py-1 w-min'}>About&nbsp;Us</p></Link>
                                    <Link href={{pathname: '/joinourteam'}}><p className={'gilroy-regular cursor-pointer menu-underlined py-1 w-min'}>Join&nbsp;Our&nbsp;Team</p></Link>
                                </div>
                                <div className={'flex-col pr-2 my-2 lg:my-0 lg:px-16'}>
                                    <p className={'gilroy-bold py-1 text-lg'}>Get in touch</p>
                                    <Link href='#'><p className={'gilroy-regular cursor-pointer menu-underlined py-1 w-min'}>Contact&nbsp;Us</p></Link>
                                </div>
                                <div className={'flex-col my-2 lg:my-0 lg:px-16'}>
                                    <p className={'gilroy-bold py-1 text-lg'}>Follow</p>
                                    <Link href='https://instagram.com/mitramasglobal?utm_medium=copy_link'>
                                        <div className={'flex'}>
                                            <img className={'w-5 h-5 relative top-1 mr-2'} src="/image/footer/instagram.png"/><p className={'gilroy-regular cursor-pointer menu-underlined py-1'}>Instagram</p>
                                        </div>
                                    </Link>
                                    <Link href='https://www.linkedin.com/company/pt-mitramas-infosys-global'>
                                        <div className={'flex'}>
                                            <img className={'w-5 h-5 relative top-1 mr-2'} src="/image/footer/linkedin.png"/><p className={'gilroy-regular cursor-pointer menu-underlined py-1'}>LinkedIn</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <hr className={'border'} style={{background:'#000'}}/>
                        <div className={'flex flex-row pb-4 justify-between pt-2'}>
                            <p className={' text-xs '}>Copyright © 2021 Mitramas Infosys Global. All rights reserved</p>
                            <div className={'flex flex-row '}>
                                <Link href={{pathname: '/privacy'}}><p className={'menu-underlined text-xs cursor-pointer ml-4 sm:ml-10 md:ml-20 lg:ml-32 font-semibold'}>Privacy</p></Link>
                                <Link href={{pathname: '/term'}}><p className={'menu-underlined text-xs cursor-pointer ml-4 sm:ml-10 md:ml-20 lg:ml-32 font-semibold'}>Term</p></Link>
                                <Link href={{pathname: '/sitemap'}}><p className={'menu-underlined text-xs cursor-pointer ml-4 sm:ml-10 md:ml-20 lg:ml-32 font-semibold'}>Sitemap</p></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default layout
