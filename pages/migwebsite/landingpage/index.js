// File pages/index.js

import React from 'react'
import Layout from '../../../components/migwebsite/layout.js'
import { Typography } from 'antd'
import Flickity from 'react-flickity-component'
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined'
function LandingPage({ }) {
    const { Title } = Typography;
    const flickityOptions = {
        initialIndex: 0,
        wrapAround: 'true',
    }
    // const tok = initProps
    // const cook = jscookie.get('token')
    // console.log("cookie di dashboard: " + cook)
    return (
        <Layout>
            <section className={'section1'}>
                <div className={'block md:flex'}>
                    <div className={'flex-col center'}>
                        <div className={''}>
                            <p className={'text-3xl md:text-4xl pb-6'} style={{ fontWeight: 'bold' }}>Your One Stop,
                            Cost Efficient IT Solutions
                                </p>
                            <p className={' text-sm md:text-base font-bold'}>Improving efficiencies by supporting you with staff
                            augmentation, software and hardware managed services.
                                </p>
                        </div>
                    </div>
                    <div className={'flex-col'}>
                        <img style={{ width: '1500px', height: 'auto' }} src='/image-section1.png' />
                    </div>
                </div>
            </section>
            <section className={'section2 static md:relative'}>
                <div className={'h-auto flex justify-between p-4 mt-0 md:-mt-8'} style={{backgroundColor:'#F4F4F4'}}>
                    <div className={'flex-col pl-4 lg:pl-24 '} style={{width:'auto'}}>
                        <img style={{height:'50px', width:'auto'}} src="/image1-section2.png"></img>
                        <p className={'text-center pt-2'}>Hardware</p>
                    </div>
                    <div className={'flex-col '} style={{width:'auto'}}>
                        <img style={{height:'50px', width:'auto'}} src="/image2-section2.png"></img>
                        <p className={'text-center pt-2'}>People</p>
                    </div>
                    <div className={'flex-col pr-4 lg:pr-24'} style={{width:'auto'}}>
                        <img style={{height:'50px', width:'auto'}} src="/image3-section2.png"></img>
                        <p className={'text-center pt-2'}>Software</p>
                    </div>

                </div>
            </section>
            <section className={'section3 static md:relative'}>
                <div className={'h-auto flex justify-between px-10 md:px-30 pt-8 md:pt-16 pb-0: md:pb-4'} style={{backgroundColor:'#188E4D'}}>
                    <div className={'block md:flex'} style={{width:'100%',margin:'0 auto 0'}}>
                        <div className={'flex-col mx-16 md:mx-10 pb-8 md:pb-0'}>
                            <img style={{ width: '600px', height: 'auto' }} src='/image-section3.png' />
                        </div>
                        <div className={'flex-col mx-10 w-auto md:w-120'} style={{margin:'auto'}}>
                            <p className={'text-2xl md:text-3xl pb-6 text-white'} style={{ fontWeight: 'bold' }}> Bringing you the advantages</p>
                            <p className={'text-sm md:text-sm font-medium text-white'}>With more than 15 years of experiences across archipelago, we strive to provide end-to-end IT solutions to help achieve your business goals and optimize your cost efficiencies</p>
                            <button className={'text-white border-2 border-white px-4 mt-4 focus:outline-none'}>SEE HOW  IT WORKS </button>
                        </div>
                    </div>
                </div>
                <div className={'h-auto block md:flex justify-between pb-12 pt-4 md:pt-0'} style={{backgroundColor:'#188E4D'}}>
                    <div className={'flex-col text-white p-4 md:py-2'} style={{margin:'0 auto 0', width:'200px'}}>
                        <p className={'text-4xl text-center font-extrabold'}>20+</p>
                        <p className={'text-base text-center'} style={{margin:'0 auto 0'}}>cities</p>
                    </div>
                    <div className={'flex-col text-white p-4 md:py-2'} style={{margin:'0 auto 0', width:'200px'}}>
                        <p className={'text-4xl text-center font-extrabold'}>9000+</p>
                        <p className={'text-base text-center'} style={{margin:'0 auto 0'}}>managed and leased devices</p>
                    </div>
                    <div className={'flex-col text-white p-4 md:py-2'} style={{margin:'0 auto 0', width:'200px'}}>
                        <p className={'text-4xl text-center font-extrabold'}>20+</p>
                        <p className={'text-base text-center'} style={{margin:'0 auto 0'}}>years experienced</p>
                    </div>
                </div>
            </section>
            <section className={'section4'}>
                <div className={'text-center'}>
                    <Flickity
                        className={'carousel'} // default ''
                        elementType={'div'} // default 'div'
                        options={flickityOptions} // takes flickity options {}
                        disableImagesLoaded={false} // default false
                        reloadOnUpdate // default false
                        static // default false
                        >
                        <div className={'w-full'}>
                            <div className={'text-base md:text-4xl font-bold inline-block pb-12 px-4 md:px-64'} style={{color:'#188E4D'}}>
                                <p>“I Absolutely love the way Goodkit handles systematic design”</p>
                            </div>
                            <div className={' relative -top-7 md:-top-12 mt-4 md:mt-8'}>
                                <div className={'w-auto inline-block'}>
                                    <img src="/avatar.png"></img>
                                </div>
                                <div className={'font-bold pb-1'}>
                                    <p>Adhi Bramantya</p>
                                </div>
                                <div>
                                    <p>CFO Bank Bukopin</p>
                                </div>
                            </div>
                        </div>
                        <div className={'w-full'}>
                            <div className={'text-base md:text-4xl font-bold inline-block pb-12 px-4 md:px-64'} style={{color:'#188E4D'}}>
                                <p>“I Absolutely love the way Goodkit handles systematic design”</p>
                            </div>
                            <div className={' relative -top-7 md:-top-12 mt-4 md:mt-8'}>
                                <div className={'w-auto inline-block'}>
                                    <img src="/avatar.png"></img>
                                </div>
                                <div className={'font-bold pb-1'}>
                                    <p>Adhi Bramantya</p>
                                </div>
                                <div>
                                    <p>CFO Bank Bukopin</p>
                                </div>
                            </div>
                        </div>
                    </Flickity>
                </div>
            </section>
            <section className={'section5'}>
                <div className={'block md:flex relative justify-between px-8 md:px-32 lg:px-64'}style={{top:'45%'}}>
                    <div className={'flex-col text-2xl md:text-3xl text-white font-bold -top-4 md:top-0 relative'} style={{}}>
                        <p>Let’s be better together</p>
                    </div>
                    <div className={'flex-col w-auto'}>
                        <button className={'text-white flex border-2 text-base md:text-lg border-white px-4 mt-1 focus:outline-none'}>Contact Sales &nbsp;
                            {/* <svg id="icon-arrow-right2" viewBox="0 0 32 32" width={20} className={''}>
                                <path d="M19.414 27.414l10-10c0.781-0.781 0.781-2.047 0-2.828l-10-10c-0.781-0.781-2.047-0.781-2.828 0s-0.781 2.047 0 2.828l6.586 6.586h-19.172c-1.105 0-2 0.895-2 2s0.895 2 2 2h19.172l-6.586 6.586c-0.39 0.39-0.586 0.902-0.586 1.414s0.195 1.024 0.586 1.414c0.781 0.781 2.047 0.781 2.828 0z"></path>
                            </svg> */}
                            <ArrowRightOutlined className={'pt-1'}/>
                        </button>

                    </div>
                </div>
            </section>

        </Layout>
    )
}

export default LandingPage