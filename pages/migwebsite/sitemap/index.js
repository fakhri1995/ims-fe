import React from 'react'
import Link from 'next/link'
import Layout from '../../../components/migwebsite/layout.js'
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined'
import {Button, Form, Input} from 'antd'

function Sitemap({ }) {
   
    return (
        <Layout>
            <section className={'px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'}>
                <div className={'container mx-auto h-108'}>
                    <div>
                        <p className={'text-3xl font-bold pb-8 pt-10'}>Sitemap</p>
                    </div>
                    <div className={'flex flex-rowflex-row'}>
                        <div className={'w-1/2'}>
                            <div>
                                <Link href={{pathname: '/'}}><p className={'cursor-pointer font-bold pb-8'}>Home</p></Link>
                            </div>
                            <div>
                                <p className={'cursor-pointer font-bold'}>Our Destination</p>
                                <Link href={{pathname: '/advantages'}}><p className={'cursor-pointer font-medium'}>Advantages</p></Link>
                                <Link href={{pathname: '/hardware'}}><p className={'cursor-pointer font-medium'}>Hardware</p></Link>
                                <Link href={{pathname: '/software'}}><p className={'cursor-pointer font-medium'}>Software</p></Link>
                                <Link href={{pathname: '/people'}}><p className={'cursor-pointer font-medium'}>People</p></Link>
                            </div>
                        </div>
                        <div className={'w-1/2'}>
                            <div className={'pb-8'}>
                                <p className={'cursor-pointer font-bold'}>Company</p>
                                <Link href={{pathname: '/aboutus'}}><p className={'cursor-pointer font-medium'}>About Us</p></Link>
                                <Link href={{pathname: '/careers'}}><p className={'cursor-pointer font-medium'}>Join Our Team</p></Link>
                            </div>
                            <div className={'pb-8'}>
                                <Link href={{pathname: '#'}}><p className={'cursor-pointer font-bold'}>Contact Us</p></Link>
                            </div>
                            <div>
                                <Link href={{pathname: '#'}}><p className={'cursor-pointer font-bold'}>Privacy</p></Link>
                                <Link href={{pathname: '#'}}><p className={'cursor-pointer font-bold'}>Term of Use</p></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Sitemap