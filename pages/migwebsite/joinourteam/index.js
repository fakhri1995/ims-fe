import React from 'react'
import Layout from '../../../components/migwebsite/layout.js'
import Link from 'next/link'
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined'
import { Button, Collapse } from 'antd'
import Flickity from 'react-flickity-component'
import { Link as Linkk } from "react-scroll";

function JoinOurTeam({ dataCareers }) {
    console.log(dataCareers)
    const careers = dataCareers.data ?? []
    const flickityOption1 = {
        prevNextButtons: false,
        pageDots: true,
        draggable: true,
        initialIndex: 0,
    }
    const flickityOption2 = {
        prevNextButtons: true,
        pageDots: false,
        draggable: true,
        initialIndex: 0,
    }
    const flickityOption3 = {
        prevNextButtons: false,
    }
    const { Panel } = Collapse;
    return (
        <Layout>
            <section className={'section1careers py-4 md:py-20 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'}>
                <div className={'block md:flex'}>
                    <div className={'flex-col m-auto'}>
                        <div className={''}>
                            <p className={'text-3xl md:text-4xl pb-6 text-center md:text-left'} style={{ fontWeight: 'bold' }}>Careers at MIG
                            </p>
                            <div className={'flex-col block md:hidden pb-6'}>
                                <img style={{ width: '1000px', height: 'auto' }} src='/image-careers.png' />
                            </div>
                            <p className={' text-sm md:text-base font-bold pb-4'}>We are currently looking to expand our team! Our team comprises of highly motivated, positive and hardworking individuals.
                            </p>
                            <Linkk
                                className={'flex-col hidden md:block'}
                                activeClass="active"
                                to="section7careers"
                                spy={true}
                                smooth={true}
                                offset={-120}
                                duration={500}
                            >

                                <p className={'text-black text-xl text-left'}>See open position!</p>
                                <img className={'mt-5 ml-10 animate-bounce'} style={{ width: '60px' }} src='/image/landingpage/arrow-down.png' />
                            </Linkk>
                        </div>
                    </div>
                    <div className={'flex-col hidden md:flex ml-4'}>
                        <img style={{ width: '1000px', height: 'auto' }} src='/image-careers.png' />
                    </div>
                </div>

            </section>
            <section className={'section2careers hidden md:block px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 z-50'} style={{ background: '#F4F4F4' }}>
                <div className={'block md:flex'}>
                    <div className={'flex py-4'}>
                        <Link href='/careers/#ourvalues'><p className={'text-black cursor-pointer flex-col text-base font-semibold pr-12'} style={{}}>Our Values
                        </p></Link>
                        <Link href='/careers/#lifeatmig'><p className={'text-black cursor-pointer flex-col text-base font-semibold pr-12'} style={{}}>Life at MIG
                        </p></Link>
                        <Link href='/careers/#employeestories'><p className={'text-black cursor-pointer flex-col text-base font-semibold pr-12'} style={{}}>Employee Stories
                        </p></Link>
                        <Link href='/careers/#benefits'><p className={'text-black cursor-pointer flex-col text-base font-semibold pr-12'} style={{}}>Benefits
                        </p></Link>
                        <Link href='/careers/#vacancies'><p className={'text-black cursor-pointer flex-col text-base font-semibold pr-12'} style={{}}>Vacancies
                        </p></Link>
                    </div>
                </div>
            </section>
            <section className={'h-8 hidden md:block'}></section>
            <section className={'section3careers py-10 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'} style={{ background: '#F4F4F4' }}>
                <span className={'relative'} style={{ top: '-140px' }} id='ourvalues'></span>
                <div>
                    <p className={'text-2xl font-bold'}>Our Values</p>
                </div>
                <div className={'hidden md:flex justify-beetwen'}>
                    <div className={'w-1/3 flex-col flex'}>
                        <div className={'py-8 mx-auto pr-4'}>
                            <img src={'/avatar.png'}></img>
                        </div>
                        <div>
                            <p className={'text-xl pr-4'}>Agility</p>
                            <p className={'text-justify pr-4'}>We are adapting to fast-changing environments.</p>
                        </div>
                    </div>
                    <div className={'w-1/3 flex-col flex'}>
                        <div className={'py-8 mx-auto pr-4 pl-4'}>
                            <img src={'/avatar.png'}></img>
                        </div>
                        <div>
                            <p className={'text-xl pr-4 pl-4'}>Perseverance</p>
                            <p className={'text-justify pr-4 pl-4'}>We aim high and constantly strive for excellence.</p>
                        </div>
                    </div>
                    <div className={'w-1/3 flex-col flex'}>
                        <div className={'py-8 mx-auto pl-4'}>
                            <img src={'/avatar.png'}></img>
                        </div>
                        <div>
                            <p className={'text-xl pl-4'}>Integrity</p>
                            <p className={'text-justify pl-4'}>We are dedicated to adhering to positive ethical values.</p>
                        </div>
                    </div>
                </div>
            </section>


            <section className={'section6careers py-10 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 h-auto'}>
                <span className={'relative'} style={{ top: '-140px' }} id='benefits'></span>
                <div>
                    <p className={'text-center font-bold text-3xl pb-8'}>Benefits</p>
                    <p className={'pb-8 text-justify'}>
                        Mitramas is a people-centric business with a foundation to gives working opportunities for motivated individuals at all levels. Our long-term sustainable business which has been running for +15 years and operated across 45 cities have a strong commitment to offer pleasant experience for our team, communities, and clients.
                    </p>
                    <div className={'block md:flex justify-center'}>
                        <div className={'pb-6 md:w-1/2 flex-row flex'}>
                            <img className={'flex-row'} src='/avatar.png'></img>
                            <p className={' text-base flex-row my-auto pl-4'}>
                                We love to empower our team members to solve problems that matter
                            </p>
                        </div>
                        <div className={'pb-6 md:w-1/2 flex-row flex'}>
                            <img className={'flex-row'} src='/avatar.png'></img>
                            <p className={' text-base flex-row my-auto pl-4'}>
                                We offer diverse industry exposures and hands-on experience
                            </p>
                        </div>
                    </div>
                    <div className={'block md:flex justify-center'}>
                        <div className={'pb-6 md:w-1/2 flex-row flex'}>
                            <img className={'flex-row'} src='/avatar.png'></img>
                            <p className={' text-base flex-row my-auto pl-4'}>
                                We support personal growth through constant experiment and learning
                            </p>
                        </div>
                        <div className={'pb-6 md:w-1/2 flex-row flex'}>
                            <img className={'flex-row'} src='/avatar.png'></img>
                            <p className={' text-base flex-row my-auto pl-4'}>
                                We provide unique and competitive packages to launch your career
                            </p>
                        </div>
                    </div>
                    <div className={'block md:flex justify-center'}>
                        <div className={'pb-6 md:w-1/2 flex-row flex'}>
                            <img className={'flex-row'} src='/avatar.png'></img>
                            <p className={' text-base flex-row my-auto pl-4'}>
                                We value informal social bonding to offer a enjoyable working environment
                            </p>
                        </div>
                        <div className={'pb-6 md:w-1/2 flex-row flex'}>
                            <img className={'flex-row'} src='/avatar.png'></img>
                            <p className={' text-base flex-row my-auto pl-4'}>
                                We create engaging environment and believe everyone has a voice at the table
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className={'section7careers pb-10 md:pb-20 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 h-auto'}>
                <span className={'relative'} style={{ top: '-150px' }} id='vacancies'></span>
                <div className={'block md:flex justify-between'}>
                    <div className={'flex-row left-column-section7careers pr-0 md:pr-8'}>
                        <p className={'text-3xl font-bold pb-8'}>Careers at MIG</p>
                        <p className={'pb-8'}>Want to advance your career with us ? See our job openings below for our current financial services and government projects.</p>
                        <div className={'w-5/12 border-t-8 border-green-700 pb-8'}></div>
                        <p className={'pb-8'}>Didn't find the role that best describes your skills ? Send your CV to <span className={'font-bold'}>recruitment@mitrasolusi.group</span> for potential opportunities</p>
                    </div>
                    <div className={'flex-row w-full'}>
                        <Collapse
                            accordion
                            defaultActiveKey={['0']}
                            expandIconPosition={'right'}
                        >
                            {
                                careers.map((item, idx) => {
                                    return (
                                        <>
                                            <Panel header={item.position_name} key={idx}>
                                                <div>
                                                    <div className={'pb-4'}>
                                                        <p className={'font-bold'}>Job Description:</p>
                                                        <p>{item.job_description}</p>
                                                    </div>
                                                    <a className={'text-base'} href={item.register_link}>Apply Now<ArrowRightOutlined className={'pl-2 relative -top-0.5'} /></a>
                                                </div>
                                            </Panel>
                                        </>
                                    )
                                })
                            }
                            {/* <Panel header="Account Executive" key="1">
                            <div>
                                <div className={'pb-4'}>
                                    <p className={'font-bold'}>Location:</p>
                                    <p>Yogyakarta  Jakarta  Malang  Semarang  Tangerang</p>
                                </div>
                                <div className={'pb-4'}>
                                    <p className={'font-bold'}>Requirements:</p>
                                    <p>-Min. Bachelor Degree in Business/Management.</p>
                                    <p>-At least 1-2 years of working experience in the related background. Startup experience is a plus.</p>
                                    <p>-Proficient in English.</p>
                                    <p>-Excellent interpersonal skills with attitude in building relationships with clients.</p>
                                    <p>-Excellent verbal and written communication skills, be a listener and presenter.</p>
                                    <p>-Ability in problem solving and negotiation.</p>
                                    <p>-Adaptability, curiosity and energetic attitude.</p>
                                </div>
                                <div className={'pb-4'}>
                                    <p className={'font-bold'}>Job Description:</p>
                                    <p>-Build and acquire new sales leads and grow existing property owners (cold calling, client meeting,etc).</p>
                                    <p>-Engage and maintain strong relationships with the client.</p>
                                    <p>-Keep up with the market trends and grasp sales opportunities to achieve targets.</p>
                                    <p>-Analyzing key account performance to identify the problem to develop initiatives and propose solutions.</p>
                                    <p>-Conduct a business presentation for clients and discuss further expansion.</p>
                                    <p>-Working closely with the internal departments to support the account’s business needs and requirements through cross-functional efforts.</p>
                                    <p>-Data-Driven and Update to Market: Should be able to read and communicate data on the chart, graphs, etc. Keep updated with the market trends, and be able to predict upcoming trend.</p>
                                </div>
                                <a className={'text-base'}>Apply Now<ArrowRightOutlined className={'pl-2 relative -top-0.5'}/></a>
                            </div>
                        </Panel>
                        <Panel header="Backend Developer" key="2">
                            isi apanih
                        </Panel>
                        <Panel header="Business Developtment" key="3">
                            isi apanih
                        </Panel>
                        <Panel header="Commercial Analyst Intern" key="4">
                            isi apanih
                        </Panel>
                        <Panel header="Data Engineer" key="5">
                            isi apanih
                        </Panel>
                        <Panel header="Data Scientist" key="6">
                            isi apanih
                        </Panel>
                        <Panel header="Senior Product Manager" key="7">
                            isi apanih
                        </Panel> */}
                        </Collapse>
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
export async function getServerSideProps() {
    const resources = await fetch(`https://boiling-thicket-46501.herokuapp.com/getCareers`, {
        method: `GET`
    })
    const resjson = await resources.json()
    const dataCareers = resjson
    return {
        props: {
            dataCareers
        },
    }
}
export default JoinOurTeam