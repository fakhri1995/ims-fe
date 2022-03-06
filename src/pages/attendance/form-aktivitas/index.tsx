import {
  AttendanceService,
  AttendanceServiceQueryKeys,
  IGetAttendanceFormsParams,
} from "apis/attendance";
import { AuthService } from "apis/auth";
import type { GetServerSideProps, NextPage } from "next";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";

import styles from "components/layout-dashboard.module.css";
import LayoutDashboard from "components/layout-dashboardNew";
import {
  AddNewAktivitasButton,
  FormAktivitasDrawer,
  FormAktivitasTable,
  FormAktivitasTableHeader,
  TotalFormAktivitasCard,
} from "components/screen/form-aktivitas";

import { useAxiosClient } from "hooks/use-axios-client";

import { parseToken } from "lib/auth";
import { getAxiosClient } from "lib/axios-client";

import { ProtectedPageProps } from "types/common";

const ListFormAktivitasPage: NextPage<ProtectedPageProps> = ({
  token,
  dataProfile,
}) => {
  const router = useRouter();
  const pathArr = router.pathname.split("/").slice(1);

  const [criteria, setCriteria] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, ""),
    sort_type: withDefault(StringParam, ""),
    keyword: withDefault(StringParam, ""),
  });

  const onTriggerChangeCriteria = (
    newCriteria: Partial<IGetAttendanceFormsParams>
  ) => {
    setCriteria({
      page: newCriteria.page,
      rows: newCriteria.rows,
      sort_by: newCriteria.sort_by,
      sort_type: newCriteria.sort_type,
      keyword: newCriteria.keyword,
    });
  };

  const axiosClient = useAxiosClient();
  const { data, isLoading } = useQuery(
    [AttendanceServiceQueryKeys.FIND, criteria],
    () => AttendanceService.find(axiosClient, criteria)
  );

  const [isCreateDrawerShown, setCreateDrawerShown] = useState(false);

  const onAddNewAktivitasButtonClicked = useCallback(() => {
    setCreateDrawerShown(true);
  }, []);
  const onSearchTriggered = useCallback((searchValue: string) => {
    onTriggerChangeCriteria({
      keyword: searchValue,
    });
  }, []);

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={token}
      pathArr={pathArr}
      st={styles}
    >
      <div className="px-5">
        {/* First Row */}
        <div className="flex mb-6 md:space-x-6 space-y-6 md:space-y-0 flex-wrap md:flex-nowrap">
          {/* Total Form Aktivitas */}
          <div className="w-full md:w-1/2">
            <TotalFormAktivitasCard />
          </div>

          {/* Create new Form Aktivitas */}
          <div className="w-full md:w-1/2">
            <AddNewAktivitasButton
              onButtonClicked={onAddNewAktivitasButtonClicked}
            />
          </div>
        </div>

        {/* Second Row */}
        {/* Table: Form Aktivitas */}
        <div className="w-full bg-white rounded-md shadow-md p-6">
          {/* Table header */}
          <FormAktivitasTableHeader onSearchTriggered={onSearchTriggered} />

          {/* Table */}
          <div className="my-6">
            <FormAktivitasTable
              data={data?.data.data.data}
              tablePageSize={criteria.rows}
              tableTotalData={data?.data.data.total}
              isLoading={isLoading}
              onTriggerChangeCriteria={onTriggerChangeCriteria}
            />
          </div>
        </div>

        <FormAktivitasDrawer
          title="Tambah Form Aktivitas Baru"
          buttonOkText="Simpan Form"
          onvisible={setCreateDrawerShown}
          visible={isCreateDrawerShown}
        />
      </div>
    </LayoutDashboard>
  );
};

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
    const { data } = await AuthService.whoAmI(axiosClient);

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

export default ListFormAktivitasPage;
