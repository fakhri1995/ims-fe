import React from 'react'
import Link from 'next/link'
import Layout from '../../../components/migwebsite/layout.js'

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
                                <p className={'font-bold pb-1'}>Our Solutions</p>
                                <Link href={{pathname: '/advantages'}}><p className={'cursor-pointer font-medium pb-1 menu-underlined w-min'}>Advantages</p></Link>
                                <Link href={{pathname: '/hardware'}}><p className={'cursor-pointer font-medium pb-1 menu-underlined w-min'}>Hardware</p></Link>
                                <Link href={{pathname: '/software'}}><p className={'cursor-pointer font-medium pb-1 menu-underlined w-min'}>Software</p></Link>
                                <Link href={{pathname: '/people'}}><p className={'cursor-pointer font-medium pb-1 menu-underlined w-min'}>People</p></Link>
                            </div>
                        </div>
                        <div className={'w-1/2'}>
                            <div className={'pb-8'}>
                                <p className={'font-bold pb-1'}>Company</p>
                                <Link href={{pathname: '/aboutus'}}><p className={'cursor-pointer font-medium pb-1 menu-underlined w-min'}>About&nbsp;Us</p></Link>
                                <Link href={{pathname: '/joinourteam'}}><p className={'cursor-pointer font-medium menu-underlined w-min'}>Join&nbsp;Our&nbsp;Team</p></Link>
                            </div>
                            <div className={'pb-8'}>
                                <Link href={{pathname: '/contactus'}}><p className={'cursor-pointer font-bold menu-underlined w-min'}>Contact&nbsp;Us</p></Link>
                            </div>
                            <div>
                                <Link href={{pathname: '/privacy'}}><p className={'cursor-pointer font-bold menu-underlined w-min'}>Privacy</p></Link>
                                <Link href={{pathname: '/term'}}><p className={'cursor-pointer font-bold menu-underlined w-min'}>Term&nbsp;of&nbsp;Use</p></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Sitemap