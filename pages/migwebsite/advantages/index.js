import React from 'react'
import Layout from '../../../components/migwebsite/layout.js'
import Link from 'next/link'
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined'

function Advantages({ }) {
    return (
        <Layout>
            <section className={'section1advantages hidden md:block'} style={{background:'#F4F4F4'}}>
                <div className={'block md:flex'}>
                    <div className={'flex center'}>
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
            <section className={'section2advantages h-8 hidden md:block'}></section>
            <section className={'section3advantages px-4 md:px-20 py-8'} style={{background:'#F4F4F4'}}>
                <div className={'pb-4'}>
                    <p className={'text-2xl md:text-3xl font-bold'}>Support your business efficiently</p>
                </div>
                <div>
                    <p className={'text-base w-full md:w-2/5'}>One stop  seamless technology solution to help you achieve business goals and optimize your cost </p>
                </div>
                <div className={'grid md:flex my-4 justify-center md:justify-between'}>
                    <div className={'flex-col bg-white mr-0 md:mr-10 p-4 w-full md:w-96'}>
                        <img style={{height:'50px', width:'auto'}} src="/image1-section2.png"></img>
                        <p className={'text-left py-3 font-bold '}>
                            Hardware
                        </p>
                        <p>
                            Optimize your cost by leasing and maintenances variety of electronic equipments   
                        </p>
                        <Link href={{pathname: '/hardware'}}><button className={'pt-4 font-bold text-purple-800'}>
                            Get yours&nbsp; <ArrowRightOutlined className={'relative'} style={{top:'-2.5px'}}/>
                        </button></Link>
                    </div>
                    <div className={'flex-col bg-white my-5 md:my-0 mx-0 md:mx-10 p-4 w-full md:w-96'}>
                        <img style={{height:'50px', width:'auto', position:'relative', left:'-25px'}} src="/image3-section2.png"></img>
                        <p className={'text-left py-3 font-bold '}>Software
                        </p>
                        <p>
                            We support your companies to simplify and automate the process through digitalization
                        </p>
                        <Link href={{pathname: '/software'}}><button className={'pt-4 font-bold text-purple-800'}>
                            Build now&nbsp; <ArrowRightOutlined className={'relative'} style={{top:'-2.5px'}}/>
                        </button></Link>
                    </div>
                    <div className={'flex-col bg-white mdl-0 md:ml-10 p-4 w-full md:w-96'}>
                        <img style={{height:'50px', width:'auto', position:'relative', left:'-10px'}} src="/image2-section2.png"></img>
                        <p className={'text-left py-3 font-bold '}>People
                        </p>
                        <p>
                            We help you reduce complexity in talent sourcing and management
                        </p>
                        <Link href={{pathname: '/people'}}><button className={'pt-4 font-bold text-purple-800'}>
                            Setup your team&nbsp; <ArrowRightOutlined className={'relative'} style={{top:'-2.5px'}}/>
                        </button></Link>
                    </div>
                </div>
            </section>
            <section className={'section4advantages flex justify-between px-4 md:px-8'}>
                <div className={'flex-col text-2xl px-12 py-20 w-full border-r'}>
                    <p>On demand service</p>
                    <ArrowRightOutlined/>
                </div>
                <div className={'flex-col text-2xl px-12 py-20 w-full border-r'}>
                    <p>Realible partner</p>
                    <ArrowRightOutlined/>
                </div>
                <div className={'flex-col text-2xl px-12 py-20 w-full border-r'}>
                    <p>Competitive rate</p>
                    <ArrowRightOutlined/>
                </div>
                <div className={'flex-col text-2xl px-12 py-20 w-full'}>
                    <p>Cost efficient</p>
                    <ArrowRightOutlined/>
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

export default Advantages