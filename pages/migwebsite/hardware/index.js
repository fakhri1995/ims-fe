import React from 'react'
import Link from 'next/link'
import Layout from '../../../components/migwebsite/layout.js'
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined'
import {Button} from 'antd'

function Hardware({ }) {
    return (
        <Layout>
            <section className={'section1advantages hidden md:block fixed w-full z-50 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'} style={{background:'#F4F4F4'}}>
                <div className={'block md:flex'}>
                    <div className={'flex py-4'}>
                        <Link href={{pathname: '/advantages'}}><p className={'cursor-pointer flex-col text-base font-semibold pr-4'} style={{}}>Advantages
                            </p></Link>
                        <Link href={{pathname: '/hardware'}}><p className={'cursor-pointer flex-col text-base font-semibold px-4'}>Hardware
                            </p></Link>
                        <Link href={{pathname: '/software'}}><p className={'cursor-pointer flex-col text-base font-semibold px-4'}>Software
                            </p></Link>
                        <Link href={{pathname: '/people'}}><p className={'cursor-pointer flex-col text-base font-semibold px-4'}>People
                            </p></Link>
                    </div>
                </div>
            </section>
            <section className={'section2advantages h-12 hidden md:block'}></section>
            {/* <section className={'section2hardware px-4 md:px-20 py-8 text-center lg:px-28 xl:px-40'}>
                <div className={'pb-8'}>
                    <p className={'text-2xl md:text-3xl font-bold'}>Hardware Solutions</p>
                </div>
                <div className={'pb-12'}>
                    <p className={'text-base w-full font-bold'}>We optimize your costs by leasing and maintaining a variety of electronic equipment nation-wide. We have up to 20+ cities points across Indonesia to ensure that the electronics you rent are well-managed.</p>
                </div>
                <Button type="text" className={'button-hover mx-2 px-4 border-green-800 text-white'} style={{backgroundColor:'#188E4D', color:'white', fontWeight:'600'}} key="3"><p>Get a quote</p></Button>
            </section> */}
            <section className={'section2hardware py-8 md:py-8 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'} style={{backgroundColor:'#DAE8DC'}}>
                <div className={'flex'}>
                    <div className={'flex-row my-auto'}>
                        <p className={'text-3xl font-bold pb-4 gilroy-bold'}>Hardware</p>
                        <p className={'w-2/3 pb-4 gilroy-medium'} style={{letterSpacing:'1.5px'}}>We optimize your costs by leasing and maintaining a variety of electronic equipment nation-wide. We have up to 45 city points across Indonesia to ensure that the electronics you rent are well-managed.</p>
                        <button className={'px-4 py-2 text-white'} style={{backgroundColor:'#2A8452'}}> Tombol </button>
                    </div>
                        <div className={'flex-row pt-8 pb-8 w-1/2 ml-8'}>
                                <img src="/image/hardware/Hardware-Solution.png"></img>
                            </div>
                </div>
            </section>
            {/* <section className={'section3hardware justify-center'} >
                <div className={'flex relative justify-start pt-4 md:pt-16 pb-4 md:pb-0 px-4 md:px-20'} style={{flexFlow:'wrap'}}>
                    <div style={{borderRadius:'10px'}} className={'relative item-hardware'}><p className={'text-center w-full absolute bottom-2'}>Tablet1</p></div>
                    <div style={{borderRadius:'10px'}} className={'relative item-hardware'}><p className={'text-center w-full absolute bottom-2'}>Tablet2</p></div>
                    <div style={{borderRadius:'10px'}} className={'relative item-hardware'}><p className={'text-center w-full absolute bottom-2'}>Tablet3</p></div>
                    <div style={{borderRadius:'10px'}} className={'relative item-hardware'}><p className={'text-center w-full absolute bottom-2'}>Tablet4</p></div>
                    <div style={{borderRadius:'10px'}} className={'relative item-hardware'}><p className={'text-center w-full absolute bottom-2'}>Tablet5</p></div>
                    <div style={{borderRadius:'10px'}} className={'relative item-hardware'}><p className={'text-center w-full absolute bottom-2'}>Tablet6</p></div>
                </div>
            </section> */}
            <section className={'section3hardware py-8 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'}>
                <div className={'text-center py-16'}>
                    <p className={'text-3xl font-bold pb-4 gilroy-bold'}>Transforming your capital heavy IT product into managed service model</p>
                </div>
                <div className={'flex'}>
                    <div className={'pt-8 pb-8 w-1/2 my-auto'}>
                        <p className={'text-3xl font-bold pb-4 gilroy-bold'}>Support your fast growth</p>
                        <p className={'w-2/3 pb-4 gilroy-medium'} style={{letterSpacing:'1.5px'}}>Transforming a heavy capital IT product business line, which typically require large upfront investment into managed services model</p>
                    </div>
                    <div className={'pt-8 pb-8 w-1/2 ml-8'}>
                        <img src="/image/landingpage/image-section2.png"></img>
                    </div>
                </div>
                <div className={'flex'}>
                    <div className={'pt-8 pb-8 w-1/2 mr-8'}>
                        <img src="/image/landingpage/image-section2.png"></img>
                    </div>
                    <div className={'pt-8 pb-8 w-1/2 my-auto'}>
                        <p className={'text-3xl font-bold pb-4 gilroy-bold'}>Enabling you to focus on your core business</p>
                        <p className={'w-2/3 pb-4 gilroy-medium'} style={{letterSpacing:'1.5px'}}>increase efficiency by providing guaranteed level of IT operation services to support your business</p>
                    </div>
                </div>
                <div className={'flex'}>
                    <div className={'pt-8 pb-8 w-1/2 my-auto'}>
                        <p className={'text-3xl font-bold pb-4 gilroy-bold'}>Extensive network covering 45 cities in Indonesia</p>
                        <p className={'w-2/3 pb-4 gilroy-medium'} style={{letterSpacing:'1.5px'}}>Having operated over the past decades in Indonesia, we can provide strong local knowledge and network to help you strive</p>
                    </div>
                    <div className={'pt-8 pb-8 w-1/2 ml-8'}>
                        <img src="/image/landingpage/image-section2.png"></img>
                    </div>
                </div>
            </section>
            <section className={'section4hardware py-4 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'}>
                <div>
                    <p className={'text-3xl font-bold pb-4 gilroy-bold'}>Products selection</p>
                    <p className={'pb-4 gilroy-medium'}>Desktop & Laptop</p>
                    <p className={'pb-4 gilroy-medium'}>UPS</p>
                    <p className={'pb-4 gilroy-medium'}>Server</p>
                    <p className={'pb-4 gilroy-medium'}>ATM</p>
                    <p className={'pb-4 gilroy-medium'}>CRM</p>
                </div>
            </section>
            <section className={'section5hardware py-8 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'}>
                <div>
                    <p className={'text-3xl font-bold pb-4 gilroy-bold'}>Start now. Let’s be better together</p>
                    <p className={'pb-4 gilroy-medium'}>A sales expert will contact you within 24 hours</p>
                    <div className={'flex'}>
                        <img className={'w-1/2 flex-row py-4 pr-4'} src="/image/hardware/rectangle.png"></img>
                        <img className={'w-1/2 flex-row py-4 pl-4'} src="/image/hardware/rectangle.png"></img>
                    </div>
                    <div className={'flex'}>
                        <img className={'w-1/2 flex-row py-4 pr-4'} src="/image/hardware/rectangle.png"></img>
                        <img className={'w-1/2 flex-row py-4 pl-4'} src="/image/hardware/rectangle.png"></img>
                    </div>
                    <div className={'flex justify-end'}>
                        <button className={'text-black flex border-2 text-base md:text-lg border-black px-4 mt-1 focus:outline-none gilroy-medium'}>Get quote &nbsp;
                            <ArrowRightOutlined className={'pt-1'}/>
                        </button>
                    </div>
                </div>
            </section>
            {/* <section className={'section5landingpage'}>
                <div className={' md:flex relative justify-between px-4 md:px-20 lg:px-28 xl:px-40'}style={{top:'40%'}}>
                    <div className={'flex-col text-2xl md:text-3xl text-white font-bold -top-4 md:top-0 relative'} style={{}}>
                        <p>Let’s be better together</p>
                    </div>
                    <div className={'flex-col w-auto'}>
                        <button className={'text-white flex border-2 text-base md:text-lg border-white px-4 mt-1 focus:outline-none'}>Contact Sales &nbsp;
                            <ArrowRightOutlined className={'pt-1'}/>
                        </button>

                    </div>
                </div>
            </section> */}

        </Layout>
    )
}

export default Hardware