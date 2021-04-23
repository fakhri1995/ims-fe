import React from 'react'
import Link from 'next/link'
import Layout from '../../../components/migwebsite/layout.js'
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined'
import {Button} from 'antd'

function Hardware({ }) {
    return (
        <Layout>
            <section className={'section1advantages hidden md:block'} style={{background:'#F4F4F4'}}>
                <div className={'block md:flex'}>
                    <div className={'flex center'}>
                        <Link href={{pathname: '/advantages'}}><p className={'flex-col text-base font-semibold pr-4'} style={{}}>Advantages
                            </p></Link>
                        <Link href={{pathname: '/hardware'}}><p className={'flex-col text-base font-semibold px-4'}>Hardware
                            </p></Link>
                        <Link href={{pathname: '/software'}}><p className={'flex-col text-base font-semibold px-4'}>Software
                            </p></Link>
                        <Link href={{pathname: '/people'}}><p className={'flex-col text-base font-semibold px-4'}>People
                            </p></Link>
                    </div>
                </div>
            </section>
            <section className={'section2hardware px-4 md:px-20 py-8 text-center'}>
                <div className={'pb-8'}>
                    <p className={'text-2xl md:text-3xl font-bold'}>Hardware Solutions</p>
                </div>
                <div className={'pb-12'}>
                    <p className={'text-base w-full'}>We optimize your costs by leasing and maintaining a variety of electronic equipment nation-wide. We have up to 20+ cities points across Indonesia to ensure that the electronics you rent are well-managed.</p>
                </div>
                <Button type="text" className={'mx-2 px-4 border-green-800 text-white'} style={{backgroundColor:'#188E4D', color:'white', fontWeight:'600'}} key="3"><p>Get a quote</p></Button>
            </section>
            <section className={'section3hardware justify-center'} >
                <div className={'flex relative justify-start pt-4 md:pt-16 pb-4 md:pb-0 px-4 md:px-20'} style={{flexFlow:'wrap'}}>
                    <div style={{borderRadius:'10px'}} className={'relative item-hardware'}><p className={'text-center w-full absolute bottom-2'}>Tablet</p></div>
                    <div style={{borderRadius:'10px'}} className={'relative item-hardware'}><p className={'text-center w-full absolute bottom-2'}>Tablet</p></div>
                    <div style={{borderRadius:'10px'}} className={'relative item-hardware'}><p className={'text-center w-full absolute bottom-2'}>Tablet</p></div>
                    <div style={{borderRadius:'10px'}} className={'relative item-hardware'}><p className={'text-center w-full absolute bottom-2'}>Tablet</p></div>
                    <div style={{borderRadius:'10px'}} className={'relative item-hardware'}><p className={'text-center w-full absolute bottom-2'}>Tablet</p></div>
                    <div style={{borderRadius:'10px'}} className={'relative item-hardware'}><p className={'text-center w-full absolute bottom-2'}>Tablet</p></div>
                </div>
            </section>
            <section className={'section5landingpage'}>
                <div className={' md:flex relative justify-between px-8 md:px-32 lg:px-64'}style={{top:'40%'}}>
                    <div className={'flex-col text-2xl md:text-3xl text-white font-bold -top-4 md:top-0 relative'} style={{}}>
                        <p>Let’s be better together</p>
                    </div>
                    <div className={'flex-col w-auto'}>
                        <button className={'text-white flex border-2 text-base md:text-lg border-white px-4 mt-1 focus:outline-none'}>Contact Sales &nbsp;
                            <ArrowRightOutlined className={'pt-1'}/>
                        </button>

                    </div>
                </div>
            </section>

        </Layout>
    )
}

export default Hardware