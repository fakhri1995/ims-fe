import type { GetStaticProps, NextPage } from "next";

/** NOOP */
const AttandancePage: NextPage = () => <></>;

export const getStaticProps: GetStaticProps = () => {
  return {
    redirect: {
      permanent: false,
      destination: "/attandance/projects",
    },
  };
};

export default AttandancePage;
