import {
  ArrowLeftOutlined,
  FileTextOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Collapse, DatePicker, Tabs } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMemo } from "react";
import { useQuery } from "react-query";

import st from "components/layout-dashboard.module.css";
import LayoutDashboard from "components/layout-dashboardNew";

import { useAccessControl } from "contexts/access-control";

import {
  CONTRACTS_GET,
  CONTRACT_ADD,
  CONTRACT_DELETE,
  CONTRACT_GET,
  CONTRACT_UPDATE,
} from "lib/features";

import { ContractService } from "apis/contract";

import ButtonSys from "../../../../components/button";
import {
  ArrowLeftIconSvg,
  CalendarEventIconSvg,
  FileTextIconSvg,
  PlusIconSvg,
} from "../../../../components/icon";
import ModalContractInfo from "../../../../components/modal/contracts/modalContractInfo";
import ModalInvoiceCreate from "../../../../components/modal/contracts/modalInvoiceCreate";
import ContractInvoiceItemSection from "../../../../components/screen/contract/invoice/ContractInvoiceItemSection";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  LineElement,
  LinearScale,
  PointElement,
  TooltipChart,
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

const ContractInvoiceIndex = ({
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

  const isAllowedToGetContracts = hasPermission(CONTRACTS_GET);
  const isAllowedToGetContract = hasPermission(CONTRACT_GET);
  const isAllowedToUpdateContract = hasPermission(CONTRACT_UPDATE);
  const isAllowedToDeleteContract = hasPermission(CONTRACT_DELETE);

  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);

  // 2. useState
  const [refresh, setRefresh] = useState(-1);
  const [dataInvoiceTemplate, setDataInvoiceTemplate] = useState({});
  const [dateState, setDateState] = useState("");

  const [modalInvoice, setModalInvoice] = useState(false);
  const [modalContractInfo, setModalContractInfo] = useState(false);

  // 3. Use Effect & Use Query

  // get contract detail
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

  // 4. Event

  // Breadcrumb Text
  const pageBreadcrumbValue = useMemo(
    () => [
      { name: "Kontrak", hrefValue: "/admin/contracts" },
      { name: "Detail Kontrak", hrefValue: `/admin/contracts/${contractId}` },
      {
        name: "Template Invoice",
      },
    ],
    []
  );

  if (isAccessControlPending) {
    return null;
  }

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
      fixedBreadcrumbValues={pageBreadcrumbValue}
    >
      <div
        className="grid grid-cols-1 gap-4 lg:gap-6 px-4 md:px-5 "
        id="mainWrapper"
      >
        <section
          className="grid grid-cols-1  
          gap-6 shadow-md rounded-md bg-white p-4 lg:p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between">
            <button
              className="flex space-x-2 items-center bg-transparent"
              onClick={() => rt.back()}
            >
              <ArrowLeftIconSvg size={24} />
              <h4 className="mig-heading--4">Data Template Invoice</h4>
            </button>
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 lg:items-center">
              <ButtonSys type={"default"} onClick={() => setModalInvoice(true)}>
                <div className="flex space-x-2 items-center">
                  <FileTextOutlined />
                  <p>Buat Invoice</p>
                </div>
              </ButtonSys>
              <ButtonSys type={"primary"}>
                <p>Simpan Template Invoice</p>
              </ButtonSys>
            </div>
          </div>
          <div className="grid grid-cols-2 space-x-2">
            <div className="space-y-2">
              <p className="mig-caption--bold">Klien</p>
              <p>PT. Mitramas Infosys Global</p>
            </div>
            <div className="space-y-2">
              <p className="mig-caption--bold">Periode Penagihan</p>
              {/* <button
                className="flex items-center space-x-2 bg-transparent"
                onClick={() => {
                  setCalendarPopup((prev) => !prev);
                }}>
                <CalendarEventIconSvg color={"#2F80ED"} size={18} />
                <p className="mig-caption--bold text-open">Pilih Periode</p>
              </button> */}

              <DatePicker
                allowEmpty
                format={"D"}
                showToday={false}
                placeholder="Pilih Periode"
                value={moment(dateState).isValid() ? moment(dateState) : null}
                onChange={(dates, datestrings) => {
                  setDateState(dates);
                }}
                renderExtraFooter={() => <div />}
                bordered={false}
                className="blueDatePicker p-0"
                suffixIcon={
                  <CalendarEventIconSvg color={"#2F80ED"} size={20} />
                }
              />
            </div>
          </div>
          <button
            onClick={() => setModalContractInfo(true)}
            className="flex space-x-1 items-center bg-transparent"
          >
            <PlusIconSvg size={18} color={"#35763B"} />
            <p className="mig-caption--bold text-primary100">
              Tambah Informasi Lainnya
            </p>
          </button>
        </section>

        {/* Detail Kontrak & Daftar Service */}
        <section className="shadow-md rounded-md bg-white p-6 mb-4 gap-6">
          <ContractInvoiceItemSection
            dataServices={dataContract?.services}
            loading={loadingDataContract}
          />
        </section>
      </div>

      <ModalInvoiceCreate
        initProps={initProps}
        visible={modalInvoice}
        onvisible={setModalInvoice}
      />

      <ModalContractInfo
        visible={modalContractInfo}
        onvisible={setModalContractInfo}
        dataContract={dataContract}
      />
    </LayoutDashboard>
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

export default ContractInvoiceIndex;
