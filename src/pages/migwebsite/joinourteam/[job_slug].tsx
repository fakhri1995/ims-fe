import type { NextPage } from "next";
import Head from "next/head";
import { Link } from "react-scroll";

import Layout from "components/migwebsite/layout";
import {
  Apply,
  JobDetail as JobDetailSection,
  Overview,
  RelateJob,
} from "components/screen/joinourteam";

const JobDetail: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Job Detail</title>
      </Head>

      {/* Job detail */}
      <JobDetailSection />
      {/* <RelateJob/> */}
      {/* Overview */}
      {/* <Overview /> */}

      {/* Apply */}
    </Layout>
  );
};

export default JobDetail;
