import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { parseToken } from "lib/auth";
import { getAxiosClient } from "lib/axios-client";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { IGetDetailProfile } from "types/api/login/get-detailprofile";

import ButtonSys from "components/button";
import styles from "components/layout-dashboard.module.css";
import LayoutDashboard from "components/layout-dashboardNew";
import {
  AddNewProjectButton,
  TotalProjectCard,
} from "components/screen/projects/ListProject";

import { LoginService } from "services/auth";

interface IProjecsPage {
  token: string;
  sidemenu: string;
  dataProfile: IGetDetailProfile;
}

const ProjectsPage: NextPage<IProjecsPage> = ({ token, dataProfile }) => {
  const router = useRouter();
  const pathArr = router.pathname.split("/").slice(1);

  const [searchForm] = Form.useForm();

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={token}
      pathArr={pathArr}
      st={styles}
    >
      <>
        {/* First Row */}
        <div className="flex mb-6 md:space-x-6 space-y-6 md:space-y-0 flex-wrap md:flex-nowrap">
          {/* Total Project */}
          <div className="w-full md:w-1/2">
            <TotalProjectCard projectCount={120} />
          </div>

          {/* Create new project */}
          <div className="w-full md:w-1/2">
            <AddNewProjectButton
              onButtonClicked={() => {
                console.log("clicked!");
              }}
            />
          </div>
        </div>

        {/* Second Row */}
        <div className="w-full">
          {/* Table: Role Activity */}
          <div className="w-full bg-white rounded-md shadow-md p-6">
            {/* Table header */}
            <div className="flex items-center justify-between overflow-x-auto">
              {/* Title */}
              <span className="text-mono30 font-bold text-lg">
                Role Activity
              </span>

              {/* Buttons and Input */}
              <div className="flex space-x-4">
                <ButtonSys type="default">
                  <DownloadOutlined
                    className="mr-2"
                    onClick={
                      /** TODO */ () => {
                        console.log("Table Downloaded...");
                      }
                    }
                  />
                  Unduh Tabel
                </ButtonSys>

                <Form
                  form={searchForm}
                  layout="inline"
                  onFinish={
                    /** TODO */ () => {
                      console.log(searchForm.getFieldValue("search"));
                      console.log("Finishing the form...");
                    }
                  }
                >
                  <Form.Item name="search">
                    <Input placeholder="Cari..." />
                  </Form.Item>

                  <Form.Item noStyle>
                    <Button
                      htmlType="submit"
                      className="rounded-md bg-primary100 hover:bg-primary75 hover:border-primary75 hover:text-white text-white font-medium flex items-center px-6"
                      icon={<SearchOutlined />}
                    >
                      Cari
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
            {/* End: Table header */}

            {/* TODO: Table */}
          </div>
        </div>
      </>
    </LayoutDashboard>
  );
};

export const getServerSideProps: GetServerSideProps<IProjecsPage> = async (
  ctx
) => {
  let defaultProps: IProjecsPage = {} as IProjecsPage;

  const { token, hasNoToken } = parseToken(ctx);
  if (hasNoToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
      props: defaultProps,
    };
  }

  defaultProps.token = token;

  const axiosClient = getAxiosClient(token);
  try {
    const { data } = await LoginService.me(axiosClient);

    defaultProps.dataProfile = data;
  } catch {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
      props: defaultProps,
    };
  }

  return {
    props: defaultProps,
  };
};

export default ProjectsPage;
