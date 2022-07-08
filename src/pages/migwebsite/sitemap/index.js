import Head from "next/head";
import Link from "next/link";
import React from "react";

import Layout from "../../../components/migwebsite/layout.js";

function Sitemap({}) {
  return (
    <Layout>
      <Head>
        <title>Site Map</title>
      </Head>
      <section className={"px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20"}>
        <div className={"container mx-auto h-108"}>
          <div>
            <p className={"text-3xl gilroy-bold pb-8 pt-10"}>Sitemap</p>
          </div>
          <div className={"flex flex-rowflex-row"}>
            <div className={"w-1/2"}>
              <div>
                <Link href={{ pathname: "/" }}>
                  <p
                    className={
                      "cursor-pointer gilroy-bold menu-underlined w-min mb-8 text-base hover:text-green-500"
                    }
                  >
                    Home
                  </p>
                </Link>
              </div>
              <div>
                <p className={"gilroy-bold pb-1 text-base"}>Our Solutions</p>
                {/* <Link href={{pathname: '/advantages'}}><p className={'cursor-pointer gilroy-regular pb-1 menu-underlined w-min text-base'}>Advantages</p></Link> */}
                <Link href={{ pathname: "/hardware" }}>
                  <p
                    className={
                      "cursor-pointer gilroy-regular pb-1 menu-underlined w-min text-base hover:text-green-500"
                    }
                  >
                    Hardware
                  </p>
                </Link>
                <Link href={{ pathname: "/software" }}>
                  <p
                    className={
                      "cursor-pointer gilroy-regular pb-1 menu-underlined w-min text-base hover:text-green-500"
                    }
                  >
                    Software
                  </p>
                </Link>
                <Link href={{ pathname: "/talents" }}>
                  <p
                    className={
                      "cursor-pointer gilroy-regular pb-1 menu-underlined w-min text-base hover:text-green-500"
                    }
                  >
                    Talents
                  </p>
                </Link>
              </div>
            </div>
            <div className={"w-1/2"}>
              <div className={"pb-8"}>
                <p className={"gilroy-bold pb-1 text-base"}>Company</p>
                <Link href={{ pathname: "/aboutus" }}>
                  <p
                    className={
                      "cursor-pointer gilroy-regular pb-1 menu-underlined w-min text-base hover:text-green-500"
                    }
                  >
                    About&nbsp;Us
                  </p>
                </Link>
                <Link href={{ pathname: "/joinourteam" }}>
                  <p
                    className={
                      "cursor-pointer gilroy-regular menu-underlined w-min text-base hover:text-green-500"
                    }
                  >
                    Join&nbsp;Our&nbsp;Team
                  </p>
                </Link>
              </div>
              <div className={"pb-8"}>
                <Link href={{ pathname: "/contactus" }}>
                  <p
                    className={
                      "cursor-pointer gilroy-bold menu-underlined w-min text-base hover:text-green-500"
                    }
                  >
                    Contact&nbsp;Us
                  </p>
                </Link>
              </div>
              <div>
                <Link href={{ pathname: "/privacy" }}>
                  <p
                    className={
                      "cursor-pointer gilroy-bold menu-underlined w-min text-base hover:text-green-500"
                    }
                  >
                    Privacy
                  </p>
                </Link>
                <Link href={{ pathname: "/term" }}>
                  <p
                    className={
                      "cursor-pointer gilroy-bold menu-underlined w-min text-base hover:text-green-500"
                    }
                  >
                    Term&nbsp;of&nbsp;Use
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Sitemap;
