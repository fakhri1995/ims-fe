import type { GetServerSideProps, NextPage } from "next";

/** NOOP */
const AttandancePage: NextPage = () => <></>;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: "/attendance/form-aktivitas",
    },
  };
};

export default AttandancePage;
