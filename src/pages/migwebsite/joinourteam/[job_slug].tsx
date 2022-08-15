import type { NextPage } from "next";
import Head from "next/head";
import { Link } from "react-scroll";

import Layout from "components/migwebsite/layout";
import {
  Apply,
  JobDetail as JobDetailSection,
  Overview,
} from "components/screen/joinourteam";

const JobDetail: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Job Detail</title>
      </Head>

      {/* Job detail */}
      <JobDetailSection />

      <section
        className={
          "section2careers hidden md:block px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 z-50"
        }
        style={{ background: "#F4F4F4" }}
      >
        <div className={"block md:flex"}>
          <div className={"flex py-4"}>
            <Link
              activeClass="active"
              to="section1job"
              spy={true}
              smooth={true}
              offset={-120}
              className={"mr-12"}
              duration={500}
            >
              <button
                className={
                  "gilroy-regular text-xl text-black cursor-pointer flex-col focus:outline-none jot-underlined bg-transparent"
                }
                style={{}}
              >
                Overview
              </button>
            </Link>

            <Link
              activeClass="active"
              to="section2job"
              spy={true}
              smooth={true}
              offset={-120}
              className={"mr-12"}
              duration={500}
            >
              <button className="section1job gilroy-regular text-xl text-black cursor-pointer flex-col focus:outline-none jot-underlined bg-transparent">
                Apply
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <Overview />

      {/* Apply */}
      <Apply />
    </Layout>
  );
};

export default JobDetail;
