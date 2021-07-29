import React from 'react'
import Link from 'next/link'
import Layout from '../../../components/migwebsite/layout.js'
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined'
import {Button} from 'antd'

function AboutUs({ }) {

    return (
        <Layout>
            <section className={'section2people px-4 md:px-20 lg:px-28 xl:px-40 py-8 md:py-32 text-center justify-center '}>
                <div className={'pb-8'}>
                    <p className={'text-2xl md:text-3xl font-bold'} style={{letterSpacing:'1.5px'}}>Operate your business , more efficient and more agile</p>
                </div>
                <div className={'pb-12'}>
                    <p className={'text-base w-full font-bold'} style={{letterSpacing:'1.5px'}}>Mitramas Infosys global is supporting you staff augmentation &  delivering software and hardware managed services. We have served multiple industries, bringing the best solutions to financial service companies, start ups, as well as government agencies.</p>
                </div>
            </section>
            <section className={'section3landingpage static md:relative'}>
                <div className={'h-auto block md:flex justify-between pb-12 pt-4 md:pt-10'} style={{backgroundColor:'#188E4D'}}>
                    <div className={'flex-col text-white p-4 md:py-2'} style={{margin:'0 auto 0', width:'200px'}}>
                        <p className={'text-5xl md:text-6xl text-center font-extrabold'}>20+</p>
                        <p className={'text-base text-center'} style={{margin:'0 auto 0'}}>cities</p>
                    </div>
                    <div className={'flex-col text-white p-4 md:py-2'} style={{margin:'0 auto 0', width:'200px'}}>
                        <p className={'text-5xl md:text-6xl text-center font-extrabold'}>9000+</p>
                        <p className={'text-base text-center'} style={{margin:'0 auto 0'}}>managed and leased devices</p>
                    </div>
                    <div className={'flex-col text-white p-4 md:py-2'} style={{margin:'0 auto 0', width:'200px'}}>
                        <p className={'text-5xl md:text-6xl text-center font-extrabold'}>20+</p>
                        <p className={'text-base text-center'} style={{margin:'0 auto 0'}}>years experienced</p>
                    </div>
                </div>
            </section>
            <section className={'block md:flex px-4 md:px-20 lg:px-28 xl:px-40'}>
                <div className={'flex-col w-full md:w-3/4 py-4 md:py-4 pr-0 md:pr-10 m-auto'}>
                    <p className={'font-bold text-center md:text-left pb-0 md:pb-8 text-xl'}>Who are we</p>
                    <div className={'block md:hidden flex-col w-1/2 py-4 md:py-4 m-auto'}>
                        <img src="/image-aboutus.png" className={'block'} style={{width:'400px',height:'auto',margin:'0 auto'}}></img>
                    </div>
                    <p className={'pb-8 font-bold'}>
                    Founded in 2003, Mitramas Infosys Global (MIG)  directly partner with global  providers and collaborate with local IT talents to offer you a seamless technology experience. Experienced  across archipelago for more than decade we have a plethora of experience in the business. With integrity as our core principle, we collaborate with our clients to increase their efficiency and reach long-term business goals.
                    </p>
                    <Link href="/advantages">
                    <p className={'pb-8 cursor-pointer font-bold text-green-500 underline'}>
                    Our services help you operate your business agile and cost efficient
                    </p>
                    </Link>
                    <Link href="careers">
                    <p className={'pb-8 cursor-pointer font-bold text-green-500 underline'}>
                    Careers at MIG offer bla bla bla to be better together 
                    </p>
                    </Link>
                </div>
                <div className={'hidden md:flex flex-col w-1/4 py-4 md:py-4'}>
                    <img src="/image-aboutus.png" className={''} style={{width:'300px', height:'auto'}}></img>
                </div>
            </section>
            <section className={'px-4 md:px-20 lg:px-28 xl:px-40 py-8 md:py-16'} style={{background:'#F8F8F8'}}>
                <div>
                    <p className={'font-bold text-2xl md:text-3xl pb-4'}>MIG Locations</p>
                    <p className={'font-bold pb-4'}>Headquarters</p>
                    <p className={'font-bold'}>Tebet raya  no. 42</p>
                    <p className={'pb-4 font-bold'}>South Jakarta, DKI Jakarta,12820</p>
                    <Button className={''} style={{backgroundColor:'#F8F8F8',paddingLeft:'2rem',paddingRight:'2rem'}}>Contact Us</Button>
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
            <section className={'section5landingpage'} style={{backgroundColor:'#93D9B5'}}>
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
            </section>

        </Layout>
    )
}

export default AboutUs