import React, { useEffect, useState } from 'react'
import Layout from '../../../components/migwebsite/layout.js'
// import Flickity from 'react-flickity-component'
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined'
import Link from 'next/link'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function LandingPage({ }) {
    const flickityOptions = {
        initialIndex: 0,
        wrapAround: 'true',
    }
    const [nav1, setNav1] = useState(null)
    const [nav2, setNav2] = useState(null)
    let slider1 = []
    let slider2 = []
    useEffect(() => {
        setNav1(slider1)
        setNav2(slider2)
    }, [slider1, slider2])
    return (
        <Layout>
            <section className={'section1landingpage py-8 px-4 md:px-10 lg:px-10 xl:px-10'}>
                <div className={'block md:flex'}>
                    <div className={'flex-col center'}>
                        <div className={''}>
                            <p className={'text-3xl md:text-5xl lg:text-6xl pb-6 gilroy-medium font-bold'} style={{ letterSpacing:'1.5px' }}>Your One Stop,
                            Cost Efficient IT Solutions
                                </p>
                            {/* <p className={' text-sm md:text-base font-bold'} style={{letterSpacing:'1.5px'}}>Improving efficiencies by supporting you with staff
                            augmentation, software and hardware managed services.
                                </p> */}
                        </div>
                    </div>
                    <div className={'flex-col'}>
                        <img style={{ width: '1500px', height: 'auto' }} src='/image/landingpage/image-section1.png' />
                    </div>
                </div>
                <div className={'block md:flex justify-between'}>
                    <div className={'flex-col hidden md:block'}>
                        <img className={'mt-2 mx-auto'} style={{width: '60px'}} src='/image/landingpage/arrow-down.png'/>
                        <p className={'pt-3'}>Discover now</p>
                    </div>
                    <div className={'flex pb-3'}>
                        <div className={'flex-col text-black p-1 md:px-4 md:py-2 mx-auto w-52'}>
                            <p className={'text-3xl md:text-6xl text-center gilroy-regular '}>20+</p>
                            <p className={'text-base text-center gilroy-regular'}>cities</p>
                        </div>
                        <div className={'flex-col text-black p-1 md:px-4 md:py-2 mx-auto w-52'}>
                            <p className={'text-3xl md:text-6xl text-center gilroy-regular '}>9000+</p>
                            <p className={'text-base text-center gilroy-regular'}>managed and leased devices</p>
                        </div>
                        <div className={'flex-col text-black p-1 md:px-4 md:py-2 mx-auto w-52'}>
                            <p className={'text-3xl md:text-6xl text-center gilroy-regular '}>20+</p>
                            <p className={'text-base text-center gilroy-regular'}>years experienced</p>
                        </div>
                    </div>
                    <div className={'flex-col block md:hidden'}>
                        <img className={'mx-auto'} style={{width: '60px'}} src='/image/landingpage/arrow-down.png'/>
                        <p className={'pt-3 text-center'}>Discover now</p>
                    </div>
                </div>
            </section>
            <section className={'section3landingpage static md:relative px-4 md:px-10 lg:px-10 xl:px-10'} style={{backgroundColor:'white'}}>
                <div className={'h-auto flex justify-between md:px-30 pt-8 md:pt-16 pb-0: md:pb-4'} >
                    <div className={'block md:flex py-0 md:py-8'} style={{width:'100%',margin:'0 auto 0'}}>
                        <div className={'flex-col mx-auto md:mr-10 pb-8 md:pb-0'}>
                            <img style={{ width: '600px', height: 'auto' }} src='/image/landingpage/image-section3.png' />
                        </div>
                        <div className={'flex-col mx-10 w-auto md:w-120'} style={{margin:'auto'}}>
                            <p className={'text-2xl md:text-3xl pb-6 text-black gilroy-bold'} style={{ letterSpacing:'1.5px' }}> Bringing you the <span className={'menu-underlined'}>advantages</span></p>
                            <p className={'text-sm md:text-sm font-normal text-black gilroy-medium'} style={{letterSpacing:'1.5px'}}>With more than 15 years of experiences across archipelago, we strive to provide end-to-end IT solutions to help achieve your business goals and optimize your cost efficiencies</p>
                            <Link href="/advantages"><button className={'text-black border-2 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none gilroy-medium'}>
                            SEE HOW  IT WORKS 
                            </button></Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className={'section1landingpage py-8 px-4 md:px-10 lg:px-10 xl:px-10'}>
                {/* <div className={'flex justify-center pb-8'}>
                    <p className={' font-bold text-xl text-green-700 cursor-pointer'}>Hardware</p>
                    <p className={'pl-24 pr-24 font-bold text-xl text-green-700 cursor-pointer'}>People</p>
                    <p className={' font-bold text-xl text-green-700 cursor-pointer'}>Software</p>
                </div> */}
                <div className={' pb-8'}>
                    <Slider
                    slidesToShow={3}
                    asNavFor={nav1}
                    ref={slider => (slider2 = slider) }
                    focusOnSelect={true}
                    >
                        <p className={'text-center font-bold text-xl text-green-700 cursor-pointer menu-underlined'}>Hardware</p>
                        <p className={'text-center font-bold text-xl text-green-700 cursor-pointer menu-underlined'}>People</p>
                        <p className={'text-center font-bold text-xl text-green-700 cursor-pointer menu-underlined'}>Software</p>
                    </Slider>
                </div>
                <Slider 
                dots={false}
                infinite= {true}
                speed= {500}
                slidesToShow= {1}
                slidesToScroll= {1}
                ref={slider => (slider1 = slider)}
                arrows={true}
                asNavFor={nav2}
                adaptiveHeight={true}
                >
                    <div>
                        <div className={'flex'}>
                            <div className={'pt-8 pb-8 w-1/2 my-auto'}>
                                <p className={'text-3xl font-bold pb-4 gilroy-bold'}>Hardware</p>
                                <p className={'w-2/3 pb-4 gilroy-medium'} style={{letterSpacing:'1.5px'}}>Optimize your cost by leasing and maintenances variety of electronic equipments</p>
                                <Link href="/hardware">
                                    <button style={{width:'150px'}} className={'text-black border-2 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none gilroy-medium'}>
                                        Get yours
                                    </button>
                                </Link>
                            </div>
                            <div className={'pt-8 pb-8 w-1/2 ml-8'}>
                                <img src="/image/landingpage/image-section2.png"></img>
                            </div>
                        </div>
                        
                    </div>
                    <div>
                        <div className={'flex'}>
                            <div className={'pt-8 pb-8 w-1/2 my-auto'}>
                                <p className={'text-3xl font-bold pb-4 gilroy-bold'}>People</p>
                                <p className={'w-2/3 pb-4 gilroy-medium'} style={{letterSpacing:'1.5px'}}>We help you reduce complexity in talent sourcing and management</p>
                                <Link href="/people">
                                    <button style={{width:'150px'}} className={'text-black border-2 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none gilroy-medium'}>
                                        Get yours
                                    </button>
                                </Link>
                            </div>
                            <div className={'pt-8 pb-8 w-1/2 ml-8'}>
                                <img src="/image/landingpage/image-section2.png"></img>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={'flex'}>
                            <div className={'pt-8 pb-8 w-1/2 my-auto'}>
                                <p className={'text-3xl font-bold pb-4 gilroy-bold'}>Software</p>
                                <p className={'w-2/3 pb-4 gilroy-medium'} style={{letterSpacing:'1.5px'}}>We support your companies to simplify and automate the process through digitalization</p>
                                <Link href="/software">
                                    <button style={{width:'150px'}} className={'text-black border-2 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none gilroy-medium'}>
                                        Build now
                                    </button>
                                </Link>
                            </div>
                            <div className={'pt-8 pb-8 w-1/2 ml-8'}>
                                <img src="/image/landingpage/image-section2.png"></img>
                            </div>
                        </div>
                    </div>
                </Slider>
                
            </section>
            <section className={'py-8 px-4 md:px-10 lg:px-10 xl:px-10'}>
                <div className={'flex'}>
                    <div className={'pt-8 pb-8 w-1/2 mr-8'}>
                        <img src="/image/landingpage/image-section2.png"></img>
                    </div>
                    <div className={'pt-8 pb-8 w-1/2 my-auto'}>
                        <p className={'text-3xl font-bold pb-4 gilroy-bold'}>Transforming capital heavy IT product into managed service model</p>
                        <p className={'w-2/3 pb-4 gilroy-medium'} style={{letterSpacing:'1.5px'}}>Offering low-cost ATM  rental and maintenance to reduce hardware upfront investment</p>
                        <Link href="/hardware">
                            <button style={{width:'150px'}} className={'text-black border-2 border-black px-3 py-2 md:px-4 md:py-3 mt-4 focus:outline-none gilroy-medium'}>
                                Get yours
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
            {/* <section className={'section4landingpage pt-8 pb-16'}>
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
            </section> */}
            <section className={'section5landingpage px-4 md:px-10 lg:px-10 xl:px-10'}>
                <div className={' md:flex relative justify-between '}style={{top:'40%'}}>
                    <div className={'flex-col text-2xl md:text-3xl text-black -top-4 md:top-0 relative gilroy-bold'} style={{}}>
                        <p>Let’s be better together</p>
                    </div>
                    <div className={'flex-col w-auto'}>
                        <button className={'text-black flex border-2 text-base md:text-lg border-black px-4 mt-1 focus:outline-none gilroy-medium'}>Contact Sales &nbsp;
                            <ArrowRightOutlined className={'pt-1'}/>
                        </button>

                    </div>
                </div>
            </section>

        </Layout>
    )
}

export default LandingPage