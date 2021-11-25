import React from 'react'
import Link from 'next/link'
import Layout from '../../../components/migwebsite/layout.js'
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined'
import {Card,Button} from 'antd'

function AboutUs({ }) {

    return (
        <Layout>
            
            <section className={'section2people px-4 md:px-20 lg:px-28 xl:px-40 py-8 md:py-32 text-center justify-center '}>
                <div className={'pb-8'}>
                    <p className={'text-2xl md:text-3xl gilroy-bold'}>Operate your business, more efficient and more agile</p>
                </div>
                <div className={'pb-12'}>
                    <p className={'text-base w-full font-bold'}>Mitramas Infosys global is supporting you staff augmentation &  delivering software and hardware managed services. We have served multiple industries, bringing the best solutions to financial service companies, start ups, as well as government agencies.</p>
                </div>
            </section>
            <section className={'block md:flex px-4 md:px-20 lg:px-28 xl:px-40'}>
                <div className={'flex-col w-full py-4 md:py-4 pr-0 md:pr-10 m-auto'}>
                    <p className={'font-bold text-center md:text-left pb-0 md:pb-8 text-xl'}>Who are we</p>
                    {/* <div className={'block md:hidden flex-col py-4 md:py-4 m-auto'}>
                        <img src="/image-aboutus.png" className={'block'} style={{width:'400px',height:'auto',margin:'0 auto'}}></img>
                    </div> */}
                    <p className={'pb-8 font-bold gilroy-regular'}>
                    Founded in 2003, Mitramas Infosys Global (MIG)  directly partner with global  providers and collaborate with local IT talents to offer you a seamless technology experience. Experienced  across archipelago for more than decade we have a plethora of experience in the business. With integrity as our core principle, we collaborate with our clients to increase their efficiency and reach long-term business goals.
                    </p>
                    
                    <p className={'pb-8'}>
                    <Link href="joinourteam"><em className={'cursor-pointer text-green-500 underline'}>Careers</em></Link> <em>at MIG</em> offer meaningful work to be better together 
                    </p>
                </div>
            </section>
            <section className={'py-8 px-4 lg:px-28 xl:px-40'}>
                <div className={'pb-4'}>
                    <p className={'text-2xl md:text-3xl font-bold'}>Support your business efficiently</p>
                </div>
                <div>
                    <p className={'text-base w-full md:w-2/5 font-bold'}>One stop  seamless technology solution to help you achieve business goals and optimize your cost </p>
                </div>
                <div className={'grid md:flex my-4 justify-center md:justify-between'}>
                    <Card hoverable>
                        <div className={'flex-col flex bg-white mr-0 md:mr-10 p-4 w-full md:w-96'}>
                            <div className={'min-h-full relative pb-8'} style={{}}>
                                <img style={{height:'50px', width:'auto'}} src="/image/navbar/hardware.png"></img>
                                <p className={'text-left py-3 font-bold '}>
                                    Hardware
                                </p>
                                <p>
                                    Optimize your cost by leasing and maintenances variety of electronic equipments   
                                </p>
                                <div className={'absolute bottom-0'}>
                                    <Link href={{pathname: '/hardware'}}><button className={'pt-4 font-bold text-green-800'}>
                                        Get yours&nbsp; <ArrowRightOutlined className={'relative'} style={{top:'-2.5px'}}/>
                                    </button></Link> 
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card hoverable>
                    <div className={'flex-col bg-white my-5 md:my-0 mx-0 md:mx-10 p-4 w-full md:w-96'}>
                        <div className={'min-h-full relative pb-8'} style={{}}>
                            <img style={{height:'50px', width:'auto', position:'relative', left:'-25px'}} src="/image/navbar/software.png"></img>
                            <p className={'text-left py-3 font-bold '}>Software
                            </p>
                            <p>
                                We support your companies to simplify and automate the process through digitalization
                            </p>
                            <div className={'absolute bottom-0'}>
                                <Link href={{pathname: '/software'}}><button className={'pt-4 font-bold text-green-800'}>
                                    Build now&nbsp; <ArrowRightOutlined className={'relative'} style={{top:'-2.5px'}}/>
                                </button></Link>
                            </div>
                        </div>
                    </div>
                    </Card>
                    <Card hoverable>
                    <div className={'flex-col bg-white mdl-0 md:ml-10 p-4 w-full md:w-96'}>
                        <div className={'min-h-full relative pb-8'} style={{}}>
                            <img style={{height:'50px', width:'auto', position:'relative', left:'-10px'}} src="/image/navbar/talents.png"></img>
                            <p className={'text-left py-3 font-bold '}>Talents
                            </p>
                            <p>
                                We help you reduce complexity in talent sourcing and management
                            </p>
                            <div className={'absolute bottom-0'}>
                                <Link href={{pathname: '/talents'}}><button className={'pt-4 font-bold text-green-800'}>
                                    Setup your team&nbsp; <ArrowRightOutlined className={'relative'} style={{top:'-2.5px'}}/>
                                </button></Link>
                            </div>
                        </div>
                    </div>
                    </Card>
                </div>
            </section>
            
            <section className={'px-4 md:px-20 lg:px-28 xl:px-40 py-8 md:py-16'} style={{background:'#F8F8F8'}}>
                <div>
                    <p className={'font-bold text-2xl md:text-3xl pb-4'}>MIG Locations</p>
                    <p className={'font-bold pb-4'}>Headquarters</p>
                    <p className={'font-bold'}>Tebet raya  no. 42</p>
                    <p className={'pb-4 font-bold'}>South Jakarta, DKI Jakarta,12820</p>
                    <Link href={{pathname: '/contactus'}}>
                    <Button className={'hover:text-white hover:bg-black'} style={{paddingLeft:'2rem',paddingRight:'2rem'}}>Contact Us</Button>
                    </Link>
                    <p className={'font-bold py-4'}>Coverages</p>
                    <div className={'bg-white p-4'} style={{boxShadow:'0 10px 20px rgb(0 0 0 / 20%)'}}>
                        <ul className={'coverage-list'}>
                            <li><p href="">Banda Aceh</p></li>
                            <li><p href="">Medan</p></li>
                            <li><p href="">Padang</p></li>
                            <li><p href="">Jambi</p></li>    
                            <li><p href="">Pekanbaru</p></li>
                            <li><p href="">Batam</p></li>
                            <li><p href="">Tanjung pinang</p></li>
                            <li><p href="">Jakarta</p></li>
                            <li><p href="">Bekasi</p></li>
                            <li><p href="">Depok</p></li>
                            <li><p href="">Karawang</p></li>
                            <li><p href="">Cilegon</p></li>    
                            <li><p href="">Sukabumi</p></li>
                            <li><p href="">Bandar lampung</p></li>
                            <li><p href="">Palembang</p></li>
                            <li><p href="">Bandung</p></li>
                            <li><p href="">Tasikmalaya</p></li>    
                            <li><p href="">Cirebon</p></li>
                            <li><p href="">Semarang</p></li>
                            <li><p href="">Purwokerto</p></li>
                            <li><p href="">Tegal</p></li>
                            <li><p href="">Yogyakarta</p></li>
                            <li><p href="">Magelang</p></li>
                            <li><p href="">Solo</p></li>
                            <li><p href="">Surabaya</p></li>
                            <li><p href="">Madiun</p></li>
                            <li><p href="">Sidoarjo</p></li>
                            <li><p href="">Malang</p></li>
                            <li><p href="">Kediri</p></li>
                            <li><p href="">Bogor</p></li>
                            <li><p href="">Probolingo</p></li>
                            <li><p href="">Banyuwangi</p></li>
                            <li><p href="">Jember</p></li>
                            <li><p href="">Bali</p></li>
                            <li><p href="">Mataram</p></li>
                            <li><p href="">Kupang</p></li>
                            <li><p href="">Samarinda</p></li>
                            <li><p href="">Banjarmasin</p></li>
                            <li><p href="">Pontianak</p></li>
                            <li><p href="">Balikpapan</p></li>
                            <li><p href="">Makasar</p></li>
                            <li><p href="">Sorong</p></li>
                            <li><p href="">Palu</p></li>
                            <li><p href="">Manado</p></li>
                            <li><p href="">Pare-pare</p></li>
                        </ul>
                    </div>
                </div>
            </section>
            {/* <section className={'section5landingpage'} style={{backgroundColor:'#93D9B5'}}>
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

export default AboutUs