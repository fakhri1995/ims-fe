import { RightOutlined } from "@ant-design/icons";
import { Collapse, Tabs } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";

import Layout from "components/layout-dashboard";
import st from "components/layout-dashboard.module.css";
import ContractActionSection from "components/screen/contract/detail/ContractActionSection";
import ContractActivitySection from "components/screen/contract/detail/ContractActivitySection";
import ContractInfoSection from "components/screen/contract/detail/ContractInfoSection";
import ContractNotesSection from "components/screen/contract/detail/ContractNotesSection";
import ContractServiceSection from "components/screen/contract/detail/ContractServiceSection";

import { useAccessControl } from "contexts/access-control";

import {
  CONTRACTS_GET,
  CONTRACT_DELETE,
  CONTRACT_GET,
  CONTRACT_HISTORIES_GET,
  CONTRACT_HISTORY_ADD,
  CONTRACT_HISTORY_DELETE,
  CONTRACT_HISTORY_GET,
  CONTRACT_HISTORY_UPDATE,
  CONTRACT_UPDATE,
} from "lib/features";

import { ContractService } from "apis/contract";

import ContractAddendumSection from "../../../../components/screen/contract/detail/ContractAddendumSection";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  LineElement,
  LinearScale,
  PointElement,
} from "chart.js";
import httpcookie from "cookie";

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement
);

const ContractDetailIndex = ({
  dataProfile,
  sidemenu,
  initProps,
  contractId,
}) => {
  // 1. Init
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  const isAllowedToGetContract = hasPermission(CONTRACT_GET);

  const isAllowedToGetContractHistories = hasPermission(CONTRACT_HISTORIES_GET);
  const isAllowedToGetContractHistory = hasPermission(CONTRACT_HISTORY_GET);
  const isAllowedToAddContractHistory = hasPermission(CONTRACT_HISTORY_ADD);
  const isAllowedToUpdateContractHistory = hasPermission(
    CONTRACT_HISTORY_UPDATE
  );
  const isAllowedToDeleteContractHistory = hasPermission(
    CONTRACT_HISTORY_DELETE
  );

  const rt = useRouter();
  // Breadcrumb url
  const pathArr = rt.pathname.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 1);
  pathTitleArr.splice(1, 2, "Kontrak", "Detail Kontrak");

  // 2. useState
  const [refresh, setRefresh] = useState(-1);
  const [isMobileView, setIsMobileView] = useState(false);
  const [currentVersionId, setCurrentVersionId] = useState(0);

  // 3. Use Effect & Use Query
  // Responsive view for action button section
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobileView(true); // Set smaller page size for smaller devices
      } else {
        setIsMobileView(false); // Set default page size for larger devices
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Get contract detail
  const { data: dataContract, isLoading: loadingDataContract } = useQuery(
    [CONTRACT_GET],
    () =>
      ContractService.getContract(
        initProps,
        isAllowedToGetContract,
        contractId
      ),
    {
      enabled: isAllowedToGetContract,
      refetchOnMount: true,
      select: (response) => response.data,
    }
  );

  if (isAccessControlPending) {
    return null;
  }

  // console.log({ currentVersionId });
  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      st={st}
      pathArr={pathArr}
      pathTitleArr={pathTitleArr}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 px-4 md:px-5 "
        id="mainWrapper"
      >
        {/* Action Buttons */}
        {isMobileView ? (
          <Collapse
            className="md:col-span-12 shadow-md rounded-md bg-white py-3 px-2"
            bordered={false}
            ghost={true}
            expandIconPosition="right"
            expandIcon={({ isActive }) => (
              <RightOutlined rotate={isActive ? 90 : 0} />
            )}
          >
            <Collapse.Panel
              header={
                <p className="mig-caption--bold">Menu Lainnya Detail Kontrak</p>
              }
            >
              <section className="grid grid-cols-1 gap-2">
                <ContractActionSection
                  contractId={contractId}
                  contractHistoryId={dataContract?.contract_history_id_active}
                  invoiceTemplate={dataContract?.invoice_template}
                  contractEndDate={dataContract?.end_date}
                />
              </section>
            </Collapse.Panel>
          </Collapse>
        ) : (
          <section className="md:col-span-12 grid grid-cols-2 gap-4 lg:gap-6 shadow-md rounded-md bg-white p-4 lg:p-6">
            <ContractActionSection
              contractId={contractId}
              contractHistoryId={dataContract?.contract_history_id_active}
              invoiceTemplate={dataContract?.invoice_template}
              contractEndDate={dataContract?.end_date}
            />
          </section>
        )}

        {/* Catatan & Aktivitas */}
        <section className="md:col-span-4 h-max order-last md:order-none">
          <ContractAddendumSection
            currentVersion={currentVersionId}
            setCurrentVersion={setCurrentVersionId}
            isAllowedToGetContractHistories={isAllowedToGetContractHistories}
            contractId={contractId}
            initProps={initProps}
          />

          <Tabs
            defaultActiveKey={1}
            className="tabResponsive shadow-md rounded-md bg-white p-6"
          >
            <Tabs.TabPane tab="Catatan" key={1}>
              <ContractNotesSection
                initProps={initProps}
                contractId={contractId}
              />
            </Tabs.TabPane>

            <Tabs.TabPane tab="Aktivitas" key={2}>
              <ContractActivitySection
                initProps={initProps}
                contractId={contractId}
              />
            </Tabs.TabPane>
          </Tabs>
        </section>

        {/* Detail Kontrak & Daftar Service */}
        <div className="md:col-span-8 ">
          <ContractInfoSection
            initProps={initProps}
            contractId={contractId}
            dataContract={dataContract}
            loadingDataContract={loadingDataContract}
          />

          <ContractServiceSection
            dataServices={dataContract?.services}
            loading={loadingDataContract}
          />
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ req, res, params }) {
  const contractId = params.contractId;
  let initProps = {};
  if (!req.headers.cookie) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  const cookiesJSON1 = httpcookie.parse(req.headers.cookie);
  if (!cookiesJSON1.token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  initProps = cookiesJSON1.token;
  const resourcesGP = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/detailProfile`,
    {
      method: "GET",
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGP = await resourcesGP.json();
  const dataProfile = resjsonGP;

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "contract-list",
      contractId,
    },
  };
}

export default ContractDetailIndex;
