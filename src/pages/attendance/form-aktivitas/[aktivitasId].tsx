import { PlusOutlined } from "@ant-design/icons";
import faker from "@faker-js/faker";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";

import styles from "components/layout-dashboard.module.css";
import LayoutDashboard from "components/layout-dashboardNew";
import { DetailFormAktivitasCard } from "components/screen/form-aktivitas/DetailAktivitas";

import { parseToken } from "lib/auth";
import { getAxiosClient } from "lib/axios-client";

import { LoginService } from "services/auth";

import { ProtectedPageProps } from "types/common";

const ProjectsDetailPage: NextPage<ProtectedPageProps> = ({
  dataProfile,
  token,
}) => {
  const router = useRouter();
  const pathArr = router.pathname.split("/").slice(1);

  /** TODO: impl with backend data */
  const [_tableData, setTableData] =
    useState<AktivitasPekerjaanDetail[]>(tableData);

  /** TODO: this is kinda expensive though... */
  const [aktivitasTitle, setAktivitasTitle] = useState("");
  const [aktivitasDescription, setAktivitasDescription] = useState("");

  const onRowClicked = (record: AktivitasPekerjaanDetail) => {
    console.log("Record name: ", record.name);

    setTableData((prev) => {
      return [...prev].map((oldRecord) => {
        if (oldRecord.id === record.id) {
          return { ...oldRecord, selected: true };
        }

        if (oldRecord.selected && oldRecord.id !== record.id) {
          return { ...oldRecord, selected: false };
        }

        return oldRecord;
      });
    });

    setAktivitasTitle(record.name);
    setAktivitasDescription(record.description);
  };

  /** TODO: always memo props to be sent to the <DetailFormAktivitasCard> component. Especially the ones that's not primitive value. */
  const _createdBy = useMemo(
    () => ({ name: "Bintang", avatarUrl: "/image/staffTask.png" }),
    []
  );
  const _onUbahButtonClicked = useCallback(() => {
    console.log("Ubah Project clicked...");
  }, []);

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={token}
      pathArr={pathArr}
      st={styles}
    >
      {/* First Row */}
      <div className="flex flex-wrap md:flex-nowrap md:space-x-6 space-y-6 md:space-y-0">
        {/* First Column */}
        <div className="w-full md:w-1/3">
          {/* Project detail card */}
          <DetailFormAktivitasCard
            title="UI/UX Designer"
            description="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."
            updatedDate="12 Januari 2020"
            staffCount={20}
            createdBy={_createdBy}
            onUbahButtonClicked={_onUbahButtonClicked}
          />
        </div>

        {/* Second Column */}
        <div className="w-full md:w-2/3 h-4">
          {/* Staff (editable) card */}
          <div></div>

          {/* Aktivitas info card */}
          <div className="w-full bg-white p-6 rounded-md shadow-md flex flex-wrap md:flex-nowrap md:space-x-10 space-y-6 md:space-y-0">
            {/* Table */}
            <div className="w-full md:w-1/3">
              <Table<AktivitasPekerjaanDetail>
                columns={tableColumns}
                dataSource={_tableData}
                scroll={{ y: 480 }}
                pagination={{
                  pageSize: 100,
                  position: [
                    /** No Pagination */
                  ],
                }}
                onRow={(datum) => ({
                  className: "hover:cursor-pointer",
                  onClick: () => onRowClicked(datum),
                })}
              />

              <Button
                type="ghost"
                block
                className="mt-6 py-3 flex items-center justify-center text-primary100 focus:text-primary100 hover:text-primary75 border-none border-primary100 focus:border-primary100 hover:border-primary75"
              >
                <PlusOutlined className="mr-2" />
                Tambah Aktivitas
              </Button>
            </div>

            {/* Content */}
            <div className="w-full md:w-2/3 text-mono30">
              {/* Aktivitas Title */}
              <span className="py-3 block font-bold text-sm">
                {aktivitasTitle}
              </span>

              {/* Aktivitas Deskription */}
              <p className="mt-6">{aktivitasDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
};

interface AktivitasPekerjaanDetail {
  id: number | string;
  name: string;
  description: string;
  selected?: boolean;
}

const tableColumns: ColumnsType<AktivitasPekerjaanDetail> = [
  {
    key: "id",
    title: "Aktivitas",
    dataIndex: "name",
    sorter: true,
    showSorterTooltip: false,
    render: (value, record) => {
      const selectedClassname = record.selected ? "text-primary100" : "";

      return <span className={selectedClassname}>{value}</span>;
    },
  },
];

const tableData: AktivitasPekerjaanDetail[] = Array(25)
  .fill(0)
  .map(() => ({
    id: faker.random.alphaNumeric(5),
    name: faker.name.jobTitle(),
    description: faker.lorem.paragraph(),
    selected: false,
  }));

export const getServerSideProps: GetServerSideProps<
  ProtectedPageProps
> = async (ctx) => {
  let defaultProps: ProtectedPageProps = {} as ProtectedPageProps;

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

export default ProjectsDetailPage;
