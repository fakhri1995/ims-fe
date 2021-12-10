import React from 'react'
import Link from 'next/link'
import Head from './head'
import Styles from './styles'
import { Menu, Layout, Button, Dropdown, Space } from 'antd';
import { CaretDownOutlined, LinkedinFilled, InstagramFilled } from '@ant-design/icons';
import { useState, useEffect } from 'react'
import Bounce from 'react-reveal/Bounce';
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined'

function layout({ children }) {
    const { Header, Content, Footer } = Layout;
    const menu = (
        <div className={'bg-white w-96 h-auto p-2 top-6 relative'} style={{ boxShadow: '0px 0px 3px rgba(50, 50, 50, 0.75)' }}>
            <Link href="/hardware">
                <div className={'group flex py-2 cursor-pointer hover:bg-gray-100'}>
                    <div className={'px-4 my-auto w-1/6'}>
                        <img className={'relative -top-5'} width={40} src={'/image/navbar/hardware_black.png'}></img>
                    </div>
                    <div className={'w-5/6'}>
                        <p className={'text-lg gilroy-medium group-hover:text-green-500'}>Hardware</p>
                        <p className={'text-sm gilroy-regular group-hover:text-green-500'}>Optimize your cost by leasing and maintenances IT hardwares</p>
                    </div>
                </div>
            </Link>
            <Link href="/software">
                <div className={'group flex py-2 cursor-pointer hover:bg-gray-100'}>
                    <div className={'px-4 my-auto w-1/6'}>
                        <img className={'relative -top-5'} width={40} src={'/image/navbar/software_black.png'}></img>
                    </div>
                    <div className={'w-5/6'}>
                        <p className={'text-lg gilroy-medium group-hover:text-green-500'}>Software</p>
                        <p className={'text-sm gilroy-regular group-hover:text-green-500'}>Simplify and automate the process through digitalization</p>
                    </div>
                </div>
            </Link>
            <Link href="/talents">
                <div className={'group flex py-2 cursor-pointer hover:bg-gray-100'}>
                    <div className={'px-4 my-auto w-1/6'}>
                        <img className={'relative -top-5'} width={40} src={'/image/navbar/talents_black.png'}></img>
                    </div>
                    <div className={'w-5/6'}>
                        <p className={'text-lg gilroy-medium group-hover:text-green-500'}>Talents</p>
                        <p className={'text-sm gilroy-regular group-hover:text-green-500'}>Reduce complexity in talent sourcing and management</p>
                    </div>
                </div>
            </Link>
        </div>
    )
    const [kelas, setKelas] = useState('notShadow')
    const handleScroll = () => {

            setKelas('notShadow')

    }
    useEffect(() => {
        window.onscroll = () => { handleScroll() }
    }, [])

    const [navbar, setNavbar] = useState(true) //true for hidden
    const [navbarBottom, setNavbarBottom] = useState(true) //true for hidden

    const handleNavbar = () => {
        setNavbar(!navbar)
        setNavbarSolution(true) //true for hidden
        setNavbarCompany(true) //true for hidden
    }
    const handleNavbarBottom = () => {
        if (navbarBottom == true) {
            setTimeout(() => {
                setNavbarBottom(!navbarBottom)
            }, 600);
        } else {
            setNavbarBottom(!navbarBottom)
        }

    }
    const { SubMenu } = Menu;

    return (
        <>
            <Head title="Home" />
            <Styles />
            <Layout className={'h-auto'}>
                <Header className={`${kelas} header`} style={{ background: 'white', position: 'fixed', zIndex: 31, width: '100%' }}>
                    <Link href="/">
                        <div className="logo top-4 md:top-4 absolute w-24 md:w-32 cursor-pointer" >
                            <img width={'auto'} height={'auto'} src='/mig.png' />
                        </div>
                    </Link>

                    {/* Open Hamburger Button */}
                    <label onClick={() => { handleNavbarBottom() }} htmlFor={`menutoggle`} className="md:hidden block float-right cursor-pointer mt-7" hidden={!navbar}>
                        <svg className="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20">
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </label>

                    {/* Close Hamburger Button */}
                    <label onClick={() => { handleNavbar(), handleNavbarBottom() }} htmlFor={`menutoggle`} className="md:hidden block float-right cursor-pointer mt-7" hidden={navbar}>
                        <svg className="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 32 32">
                            <title>Menu</title>
                            <path d="M17.768 16l13.866-13.866c0.488-0.488 0.488-1.28 0-1.768s-1.28-0.488-1.768 0l-13.866 13.866-13.866-13.866c-0.488-0.488-1.28-0.488-1.768 0s-0.488 1.28 0 1.768l13.866 13.866-13.866 13.866c-0.488 0.488-0.488 1.28 0 1.768 0.244 0.244 0.564 0.366 0.884 0.366s0.64-0.122 0.884-0.366l13.866-13.866 13.866 13.866c0.244 0.244 0.564 0.366 0.884 0.366s0.64-0.122 0.884-0.366c0.488-0.488 0.488-1.28 0-1.768l-13.866-13.866z" />
                        </svg>
                    </label>

                    {/* Browser Menu Navbar Header */}
                    <div theme="light" mode="horizontal" style={{ lineHeight: '3.9rem', }} className={'hidden md:block float-right menu pt-2'}>
                        <Dropdown overlay={menu} placement="bottomCenter">
                            <Button type={'text'} style={{ background: 'white' }} className={'ant-dropdown-link text-lg text-black hover:text-black'} onClick={e => e.preventDefault()}>
                                <p className={'text-lg gilroy-medium menu-underlined'}>Solutions <CaretDownOutlined style={{ display: 'inline-block', verticalAlign: 'middle' }} /></p>
                            </Button>
                        </Dropdown>
                        <Button href="/aboutus" type="text" className={''} style={{ background: 'white' }} key="1"><p className={'text-lg gilroy-medium menu-underlined'}>About Us</p></Button>
                        <Button href="/joinourteam" type="text" className={''} style={{ background: 'white' }} key="2"><p className={'text-lg gilroy-medium menu-underlined'}>Join Our Team</p></Button>
                        <Button href="/contactus" type="text" className={' mr-4 '} style={{ background: 'white' }} key="3"><p className={'text-lg gilroy-medium menu-underlined'}>Contact Us</p></Button>
                    </div>
                </Header>

                {/* Mobile Menu Navbar Header */}
                <input className={`hidden menuToggle`} type="checkbox" id={`menutoggle`} />
                <section className={'md:hidden w-full h-auto pt-16'}>
                    <div theme="light" style={{ lineHeight: '3.9rem', }} className={'float-right menu2'}>
                        <Menu mode="inline" className={'w-auto'}>
                            <SubMenu key="sub 1" title="Solutions" className="text-lg gilroy-medium">
                                <Menu.Item key='1'>
                                    <img className={'relative'} style={{ display: 'inline-block' }} width={40} src={'/image/navbar/hardware_black.png'}></img>
                                    <a href='/hardware' className="text-lg gilroy-medium pl-3">
                                        Hardware
                                    </a>
                                </Menu.Item>
                                <Menu.Item key='2'>
                                    <img className={'relative'} style={{ display: 'inline-block' }} width={40} src={'/image/navbar/software_black.png'}></img>
                                    <a href='/software' className="text-lg gilroy-medium pl-3">
                                        Software
                                    </a>
                                </Menu.Item>
                                <Menu.Item key='3'>
                                    <img className={'relative'} style={{ display: 'inline-block' }} width={40} src={'/image/navbar/talents_black.png'}></img>
                                    <a href='/talents' className="text-lg gilroy-medium pl-3">
                                        Talents
                                    </a>
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item key='4'>
                                <a href='/aboutus' className="text-lg gilroy-medium">About Us</a>
                            </Menu.Item>
                            <Menu.Item key='5'><a href='/joinourteam' className="text-lg gilroy-medium">Join Our Team</a></Menu.Item>
                            <Menu.Item key='6'
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                zIndex: 1,
                                transition: 'all 0.2s',
                            }}><a href='/contactus' className="text-lg gilroy-medium">Contact Us &nbsp;&nbsp;
                            <ArrowRightOutlined style={{fontSize:'20px' ,display: 'inline-block', verticalAlign: 'middle'}}/>
                            <LinkedinFilled style={{fontSize:'20px' ,display: 'inline-block', verticalAlign: 'middle'}}/>
                            <InstagramFilled style={{fontSize:'20px' ,display: 'inline-block', verticalAlign: 'middle'}}/>
                            </a></Menu.Item>
                        </Menu>
                    </div>
                </section>

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
                <div className={'px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'} style={{ textAlign: 'left', backgroundColor: '#EEF1EE' }}>
                    <div className={'container mx-auto'}>
                        {/* <div className={'py-8'}> */}
                        <div className={'py-8 flex flex-col lg:flex-row lg:justify-between'}>
                            <Link href="/">
                                <div className={'pb-4 cursor-pointer'} style={{ minWidth: '150px', width: '150px' }} >
                                    <img src='/mig.png' />
                                </div>
                            </Link>
                            <div className={'hidden md:flex flex-row px-0 justify-between'}>
                                <div className={'flex-col pr-2 my-2 lg:my-0 lg:px-16'}>
                                    <p className={'gilroy-bold py-1 text-lg'}>Solutions</p>
                                    <Link href={{ pathname: '/hardware' }}><p className={'gilroy-regular cursor-pointer menu-underlined py-1 w-min'}>Hardware</p></Link>
                                    <Link href={{ pathname: '/software' }}><p className={'gilroy-regular cursor-pointer menu-underlined py-1 w-min'}>Software</p></Link>
                                    <Link href={{ pathname: '/talents' }}><p className={'gilroy-regular cursor-pointer menu-underlined py-1 w-min'}>Talents</p></Link>
                                </div>
                                <div className={'flex-col pr-2 my-2 lg:my-0 lg:px-16'}>
                                    <p className={'gilroy-bold py-1 text-lg'}>Company</p>
                                    <Link href={{ pathname: '/aboutus' }}><p className={'gilroy-regular cursor-pointer menu-underlined py-1 w-min'}>About&nbsp;Us</p></Link>
                                    <Link href={{ pathname: '/joinourteam' }}><p className={'gilroy-regular cursor-pointer menu-underlined py-1 w-min'}>Join&nbsp;Our&nbsp;Team</p></Link>
                                </div>
                                <div className={'flex-col pr-2 my-2 lg:my-0 lg:px-16'}>
                                    <p className={'gilroy-bold py-1 text-lg'}>Get in touch</p>
                                    <Link href='/contactus'><p className={'gilroy-regular cursor-pointer menu-underlined py-1 w-min'}>Contact&nbsp;Us</p></Link>
                                </div>
                                <div className={'flex-col my-2 lg:my-0 lg:px-16'}>
                                    <p className={'gilroy-bold py-1 text-lg'}>Follow</p>
                                    <Link href='https://instagram.com/mitramasglobal?utm_medium=copy_link'>
                                        <div className={'flex'}>
                                            <img className={'w-5 h-5 relative top-1 mr-2'} src="/image/footer/instagram.png" /><p className={'gilroy-regular cursor-pointer menu-underlined py-1'}>Instagram</p>
                                        </div>
                                    </Link>
                                    <Link href='https://www.linkedin.com/company/pt-mitramas-infosys-global'>
                                        <div className={'flex'}>
                                            <img className={'w-5 h-5 relative top-1 mr-2'} src="/image/footer/linkedin.png" /><p className={'gilroy-regular cursor-pointer menu-underlined py-1'}>LinkedIn</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className={'block md:hidden'}>
                                <div className={'flex'}>
                                    <div className={'w-1/2 pr-2 my-2 lg:my-0 lg:px-16'}>
                                        <p className={'gilroy-bold py-1 text-lg'}>Solutions</p>
                                        <Link href={{ pathname: '/hardware' }}><p className={'gilroy-regular cursor-pointer menu-underlined py-1 w-min'}>Hardware</p></Link>
                                        <Link href={{ pathname: '/software' }}><p className={'gilroy-regular cursor-pointer menu-underlined py-1 w-min'}>Software</p></Link>
                                        <Link href={{ pathname: '/talents' }}><p className={'gilroy-regular cursor-pointer menu-underlined py-1 w-min'}>Talents</p></Link>
                                    </div>
                                    <div className={'w-1/2 pr-2 my-2 lg:my-0 lg:px-16'}>
                                        <p className={'gilroy-bold py-1 text-lg'}>Company</p>
                                        <Link href={{ pathname: '/aboutus' }}><p className={'gilroy-regular cursor-pointer menu-underlined py-1 w-min'}>About&nbsp;Us</p></Link>
                                        <Link href={{ pathname: '/joinourteam' }}><p className={'gilroy-regular cursor-pointer menu-underlined py-1 w-min'}>Join&nbsp;Our&nbsp;Team</p></Link>
                                    </div>
                                </div>
                                <div className={'flex'}>
                                    <div className={'w-1/2 pr-2 my-2 lg:my-0 lg:px-16'}>
                                        <p className={'gilroy-bold py-1 text-lg'}>Get in touch</p>
                                        <Link href='/contactus'><p className={'gilroy-regular cursor-pointer menu-underlined py-1 w-min'}>Contact&nbsp;Us</p></Link>
                                    </div>
                                    <div className={'w-1/2 my-2 lg:my-0 lg:px-16'}>
                                        <p className={'gilroy-bold py-1 text-lg'}>Follow</p>
                                        <Link href='https://instagram.com/mitramasglobal?utm_medium=copy_link'>
                                            <div className={'flex'}>
                                                <img className={'w-5 h-5 relative top-1 mr-2'} src="/image/footer/instagram.png" /><p className={'gilroy-regular cursor-pointer menu-underlined py-1'}>Instagram</p>
                                            </div>
                                        </Link>
                                        <Link href='https://www.linkedin.com/company/pt-mitramas-infosys-global'>
                                            <div className={'flex'}>
                                                <img className={'w-5 h-5 relative top-1 mr-2'} src="/image/footer/linkedin.png" /><p className={'gilroy-regular cursor-pointer menu-underlined py-1'}>LinkedIn</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className={'border'} style={{ background: '#000' }} />
                        <div className={'flex flex-row pb-4 justify-between pt-2'}>
                            <p className={' text-xs '}>Copyright © 2021 Mitramas Infosys Global. All rights reserved</p>
                            <div className={'flex flex-row '}>
                                <Link href={{ pathname: '/privacy' }}><p className={'menu-underlined text-xs cursor-pointer ml-4 sm:ml-10 md:ml-20 lg:ml-32'}>Privacy</p></Link>
                                <Link href={{ pathname: '/term' }}><p className={'menu-underlined text-xs cursor-pointer ml-4 sm:ml-10 md:ml-20 lg:ml-32'}>Term</p></Link>
                                <Link href={{ pathname: '/sitemap' }}><p className={'menu-underlined text-xs cursor-pointer ml-4 sm:ml-10 md:ml-20 lg:ml-32'}>Sitemap</p></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default layout
