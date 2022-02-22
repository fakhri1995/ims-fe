import type { GetStaticProps, NextPage } from "next";

/** NOOP */
const AttandancePage: NextPage = () => <></>;

export const getStaticProps: GetStaticProps = () => {
  return {
    redirect: {
      permanent: false,
      destination: "/attendance/projects",
    },
  };
};

export default AttandancePage;
