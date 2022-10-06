import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Dropdown,
  Empty,
  Input,
  Menu,
  Select,
  Spin,
  TreeSelect,
} from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import { AccessControl } from "components/features/AccessControl";
import { AddNewFormButton } from "components/screen/resume";

import { useAccessControl } from "contexts/access-control";

import {
  TICKETS_CLIENT_GET,
  TICKETS_EXPORT,
  TICKETS_GET,
  TICKET_ADD,
  TICKET_CLIENT_GET,
  TICKET_GET,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import SettingsIcon from "assets/vectors/icon-settings.svg";

import ButtonSys from "../../../../components/button";
import DrawerCandidateCreate from "../../../../components/drawer/recruitment/drawerCandidateCreate";
import {
  AdjusmentsHorizontalIconSvg,
  AlerttriangleIconSvg,
  DownloadIconSvg,
  FileExportIconSvg,
  FilePlusIconSvg,
  HistoryIconSvg,
  LayoutGridSvg,
  ListSearchIconSvg,
  MailForwardIconSvg,
  PlusIconSvg,
  SearchIconSvg,
  TableExportIconSvg,
  TicketIconSvg,
  UserPlusIconSvg,
} from "../../../../components/icon";
import Layout from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import { TableCustomTickets } from "../../../../components/table/tableCustom";
import { H1, H2, Label, Text } from "../../../../components/typography";
import { createKeyPressHandler } from "../../../../lib/helper";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import httpcookie from "cookie";

Chart.register(
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement
);

const RecruitmentCandidateIndex = ({ dataProfile, sidemenu, initProps }) => {
  // 1. Init
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);

  // 2. Use state
  const [dropdownAddCandidate, setDropdownAddCandidate] = useState(false);
  const [isCreateDrawerShown, setCreateDrawerShown] = useState(false);
  const [refresh, setRefresh] = useState(-1);

  // Dropdown Menu
  const dropdownMenu = (
    <Menu className="mx-0">
      <Menu.Item>
        <button
          className="flex flex-row space-x-2 items-center 
					bg-transparent w-full px-2.5 py-2 hover:bg-gray-200"
          onClick={() => {
            setCreateDrawerShown(true);
          }}
        >
          <PlusIconSvg size={20} color="#4D4D4D" />
          <p className="mig-caption--medium text-mono30">Tambah Perorangan</p>
        </button>
      </Menu.Item>

      <Menu.Item>
        <button
          className="flex flex-row space-x-2 items-center
					bg-transparent w-full px-2.5 py-2 hover:bg-gray-200"
        >
          <FilePlusIconSvg size={20} color="#4D4D4D" />
          <p className="mig-caption--medium text-mono30">Masukkan dari Excel</p>
        </button>
      </Menu.Item>

      <Menu.Item>
        <button
          className="flex flex-row space-x-2 items-center 
					bg-transparent w-full px-2.5 py-2 hover:bg-gray-200"
        >
          <DownloadIconSvg size={20} color="#4D4D4D" />
          <p className="mig-caption--medium text-mono30">
            Unduh Template Excel
          </p>
        </button>
      </Menu.Item>
    </Menu>
  );

  // Table's columns
  // const columnsTickets = [
  //   {
  //     title: "No",
  //     dataIndex: "num",
  //     render: (text, record, index) => {
  //       return {
  //         children: <>{datarawcandidates?.from + index}</>,
  //       };
  //     },
  //   },
  //   {
  //     title: "Nama",
  //     dataIndex: "name",
  //     render: (text, record, index) => {
  //       return {
  //         children: <>{record.full_name}</>,
  //       };
  //     },
  //     sorter: isAllowedToGetCandidates? (a, b) => a.id > b.id : false,
  //   },
  //   {
  //     title: "Role",
  //     dataIndex: "role",
  //     render: (text, record, index) => {
  //       return {
  //         children: <>{record.role}</>,
  //       };
  //     },
  //     sorter: isAllowedToGetCandidates
  //       ? (a, b) => a.role.localeCompare(b.role)
  //       : false,
  //   },
  //   {
  //     title: "Stage",
  //     dataIndex: "stage",
  //     render: (text, record, index) => {
  //       return {
  //         children: <>{record.stage}</>,
  //       };
  //     },
  // 		sorter: isAllowedToGetCandidates
  //       ? (a, b) => a.stage.localeCompare(b.stage)
  //       : false,
  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //     render: (text, record, index) => {
  //       return {
  //         children: (
  //           <>
  //             {dataProfile.data.role === 1 ? (
  //               <>
  //                 {record.status === 1 && (
  //                   <div className="rounded-md h-auto px-3 text-center py-1 bg-overdue bg-opacity-10 text-overdue">
  //                     Overdue
  //                   </div>
  //                 )}
  //                 {record.status === 2 && (
  //                   <div className="rounded-md h-auto px-3 text-center py-1 bg-open bg-opacity-10 text-open">
  //                     Open
  //                   </div>
  //                 )}
  //                 {record.status === 3 && (
  //                   <div className="rounded-md h-auto px-3 text-center py-1 bg-onprogress bg-opacity-10 text-onprogress">
  //                     On-Progress
  //                   </div>
  //                 )}
  //                 {record.status === 4 && (
  //                   <div className="rounded-md h-auto px-3 text-center py-1 bg-onhold bg-opacity-10 text-onhold">
  //                     On-Hold
  //                   </div>
  //                 )}
  //                 {record.status === 5 && (
  //                   <div className="rounded-md h-auto px-3 text-center py-1 bg-completed bg-opacity-10 text-completed">
  //                     Completed
  //                   </div>
  //                 )}
  //                 {record.status === 6 && (
  //                   <div className="rounded-md h-auto px-3 text-center py-1 bg-closed bg-opacity-10 text-closed">
  //                     Closed
  //                   </div>
  //                 )}
  //                 {record.status === 7 && (
  //                   <div className="rounded-md h-auto px-3 text-center py-1 bg-canceled bg-opacity-10 text-canceled">
  //                     Canceled
  //                   </div>
  //                 )}
  //               </>
  //             ) : (
  //               <>
  //                 {(record.status === 1 ||
  //                   record.status === 3 ||
  //                   record.status === 4) && (
  //                   <div className="rounded-md h-auto px-3 text-center py-1 bg-onprogress bg-opacity-10 text-onprogress">
  //                     Dalam Proses
  //                   </div>
  //                 )}
  //                 {record.status === 2 && (
  //                   <div className="rounded-md h-auto px-3 text-center py-1 bg-open bg-opacity-10 text-open">
  //                     Menunggu Staff
  //                   </div>
  //                 )}
  //                 {record.status === 6 && (
  //                   <div className="rounded-md h-auto px-3 text-center py-1 bg-closed bg-opacity-10 text-closed">
  //                     Selesai
  //                   </div>
  //                 )}
  //                 {record.status === 7 && (
  //                   <div className="rounded-md h-auto px-3 text-center py-1 bg-canceled bg-opacity-10 text-canceled">
  //                     Dibatalkan
  //                   </div>
  //                 )}
  //               </>
  //             )}
  //           </>
  //         ),
  //       };
  //     },
  //     sorter: isAllowedToGetCandidates
  //       ? (a, b) => a?.status_name.localeCompare(b?.status_name)
  //       : false,
  //   },
  // 	{
  //     key: "button_action",
  //     render: (text, record, index) => {
  //       return {
  //         children: (
  //           <div className="flex items-center space-x-2">
  //             <ButtonSys
  // 							type={"primary"}
  //               // type={canUpdateRoleAssessment ? "default" : "primary"}
  //               // disabled={!canUpdateRoleAssessment}
  //               // onClick={(event) => {
  //               //   event.stopPropagation();
  //               //   tempIdAssessmentUpdate.current = record.id;
  //               //   setTriggerAssessmentUpdate((prev) => prev + 1);
  //               //   setDrawUpdate(true);
  //               // }}
  //             >
  // 							<MailForwardIconSvg size={8} color={`#35763B`} />
  //             </ButtonSys>
  //             <ButtonSys
  // 							type={"primary"}
  //               // type={isAllowedToDeleteRoleAssessment ? "default" : "primary"}
  //               // color="danger"
  //               // disabled={!isAllowedToDeleteRoleAssessment}
  //               // onClick={(event) => {
  //               //   event.stopPropagation();
  //               //   onOpenDeleteModal(record);
  //               // }}
  //             >
  // 							<FileExportIconSvg size={8} color={`#00589F`} />
  //             </ButtonSys>
  //           </div>
  //         ),
  //       };
  //     },
  //   },
  // ];

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      st={st}
      pathArr={pathArr}
    >
      <div className="flex flex-col" id="mainWrapper">
        <div className="grid grid-cols-3 px-5 gap-6">
          <div
            className="col-span-2 flex flex-row items-center w-full 
						justify-between px-6 py-2 shadow-md rounded-md bg-white
						divide-x divide-gray-300"
          >
            <div className="flex flex-row items-center justify-between w-full pr-8 ">
              <h4 className="mig-heading--4">Jumlah Role</h4>
              <p className="text-5xl text-primary100 pl-2">32</p>
            </div>

            <div className="flex flex-row items-center justify-between w-full pl-8">
              <h4 className="mig-heading--4">Total Kandidat</h4>
              <p className="text-5xl text-secondary100 pl-2">1,024</p>
            </div>
          </div>
          <AddNewFormButton icon={<SettingsIcon />} title="Kelola Rekrutmen" />

          {/* Card Jalur Daftar */}
          <div className="col-span-1 flex flex-col shadow-md rounded-md bg-white p-6">
            <div className="flex flex-row justify-between items-center w-full">
              <h4 className="mig-heading--4">Jalur Daftar</h4>
              <ListSearchIconSvg size={24} />
            </div>
          </div>

          {/* Card Stage */}
          <div className="col-span-1 flex flex-col shadow-md rounded-md bg-white p-6">
            <div className="flex flex-row justify-between items-center w-full">
              <h4 className="mig-heading--4">Stage</h4>
              <ListSearchIconSvg size={24} />
            </div>
          </div>

          {/* Card Status */}
          <div className="col-span-1 flex flex-col shadow-md rounded-md bg-white p-6">
            <div className="flex flex-row justify-between items-center w-full">
              <h4 className="mig-heading--4">Status</h4>
              <ListSearchIconSvg size={24} />
            </div>
          </div>
          {/* Table Kandidat */}
          <div className="col-span-3 flex flex-col shadow-md rounded-md bg-white p-5 mb-6 mx-2">
            <div className="flex items-center justify-between mb-4">
              <h4 className="mig-heading--4 ">Semua Kandidat</h4>
              <div className="relative flex flex-row space-x-6">
                <ButtonSys type={"default"}>
                  <div className="flex flex-row space-x-2.5 items-center">
                    <LayoutGridSvg size={16} color="#35763B" />
                    <p>Bulk Action</p>
                  </div>
                </ButtonSys>
                {/* <ButtonSys 
									type={'primary'}
									onClick={() => setDropdownAddCandidate(!dropdownAddCandidate)}
									className=""
								>
									<div className='flex flex-row space-x-2.5 items-center'>
										<UserPlusIconSvg size={16} color='#FFFFFF'/>
										<p>Tambah Kandidat</p>
									</div>
								</ButtonSys> */}

                {/* Dropdown Tambah Kandidat */}
                <Dropdown
                  overlay={dropdownMenu}
                  overlayClassName=""
                  placement="bottomCenter"
                >
                  <Button
                    type={"primary"}
                    // onClick={() => setDropdownAddCandidate(!dropdownAddCandidate)}
                    className="btn btn-sm text-white font-semibold px-6 border 
										bg-primary100 hover:bg-primary75 border-primary100 
										hover:border-primary75"
                  >
                    <div className="flex flex-row space-x-2.5 items-center">
                      <UserPlusIconSvg size={16} color="#FFFFFF" />
                      <p>Tambah Kandidat</p>
                    </div>
                  </Button>
                  {/* <button>test</button> */}
                </Dropdown>

                {/* { dropdownAddCandidate && (
									<div className='absolute top-10 right-0 z-10 flex flex-col 
										py-2 bg-white shadow-md rounded-md'
									>
										<button 
											className='flex flex-row space-x-2 items-center 
											bg-transparent px-2.5 py-2 hover:bg-gray-200'
											onClick={() => {
												setCreateDrawerShown(true);
											}}
										>
											<PlusIconSvg size={20} color="#4D4D4D" />
											<p className='mig-caption--medium text-mono30'>
												Tambah Perorangan
											</p>
										</button>
										<button className='flex flex-row space-x-2 items-center
											bg-transparent px-2.5 py-2 hover:bg-gray-200'
										>
											<FilePlusIconSvg size={20} color="#4D4D4D" />
											<p className='mig-caption--medium text-mono30'>
												Masukkan dari Excel
											</p>
										</button>
										<button className='flex flex-row space-x-2 items-center 
											bg-transparent px-2.5 py-2 hover:bg-gray-200'
										>
											<DownloadIconSvg size={20} color="#4D4D4D"/>
											<p className='mig-caption--medium text-mono30'>
												Unduh Template Excel
											</p>
										</button>
									</div>
								)} */}
              </div>
            </div>

            {/* Start: Search criteria */}
            <div className="flex flex-row justify-between w-full items-center mb-4">
              {/* Search by keyword (kata kunci) */}
              <div className="w-4/12">
                <Input
                  // value={
                  //   searcingfiltertickets === "" ? null : searcingfiltertickets
                  // }
                  style={{ width: `100%` }}
                  placeholder="Kata Kunci.."
                  allowClear
                  // onChange={(e) => {
                  //   if (e.target.value === "") {
                  //     setsearcingfiltertickets("");
                  //   } else {
                  //     setsearcingfiltertickets(e.target.value);
                  //   }
                  // }}
                  // onKeyPress={onKeyPressHandler}
                  // disabled={!isAllowedGetTickets}
                />
              </div>

              {/* Filter by role (dropdown) */}
              <div className="w-2/12">
                <Select
                  // value={
                  //   tickettypefiltertickets === ""
                  //     ? null
                  //     : tickettypefiltertickets
                  // }
                  // disabled={!isAllowedToAddTicket || !isAllowedGetTickets}
                  placeholder="Semua Role"
                  style={{ width: `100%` }}
                  allowClear
                  // name={`task_type`}
                  // onChange={(value) => {
                  //   typeof value === "undefined"
                  //     ? settickettypefiltertickets("")
                  //     : settickettypefiltertickets(value);
                  // }}
                >
                  {/* {dataticketrelation.ticket_types.map((doc, idx) => (
                    <Select.Option key={idx} value={doc.id}>
                      {doc.name}
                    </Select.Option>
                  ))} */}
                </Select>
              </div>

              {/* Filter by stage */}
              <div className="w-2/12">
                <Select
                  // value={
                  //   tickettypefiltertickets === ""
                  //     ? null
                  //     : tickettypefiltertickets
                  // }
                  // disabled={!isAllowedToAddTicket || !isAllowedGetTickets}
                  placeholder="Semua Stage"
                  style={{ width: `100%` }}
                  allowClear
                  // name={`task_type`}
                  // onChange={(value) => {
                  //   typeof value === "undefined"
                  //     ? settickettypefiltertickets("")
                  //     : settickettypefiltertickets(value);
                  // }}
                >
                  {/* {dataticketrelation.ticket_types.map((doc, idx) => (
                    <Select.Option key={idx} value={doc.id}>
                      {doc.name}
                    </Select.Option>
                  ))} */}
                </Select>
              </div>

              {/* Search by status (dropdown) */}
              <div className="w-2/12">
                <Select
                  // value={
                  //   statusfiltertickets === "" ? null : statusfiltertickets
                  // }
                  // disabled={!isAllowedGetTicket || !isAllowedGetTickets}
                  placeholder="Semua Status"
                  style={{ width: `100%` }}
                  allowClear
                  name={`status`}
                  // onChange={(value, option) => {
                  //   typeof value === "undefined"
                  //     ? setstatusfiltertickets("")
                  //     : setstatusfiltertickets(value);
                  // }}
                >
                  {/* {dataProfile.data.role === 1
                    ? dataticketrelation.status_ticket.map((doc, idx) => {
                        if (doc.id === 1)
                          return (
                            <Select.Option key={idx} value={doc.id}>
                              <div className=" flex items-center">
                                <div className="mr-1 w-3 h-3 rounded-full bg-overdue"></div>{" "}
                                {doc.name}
                              </div>
                            </Select.Option>
                          );
                        else if (doc.id === 2)
                          return (
                            <Select.Option key={idx} value={doc.id}>
                              <div className=" flex items-center">
                                <div className="mr-1 w-3 h-3 rounded-full bg-open"></div>{" "}
                                {doc.name}
                              </div>
                            </Select.Option>
                          );
                        else if (doc.id === 3)
                          return (
                            <Select.Option key={idx} value={doc.id}>
                              <div className=" flex items-center">
                                <div className="mr-1 w-3 h-3 rounded-full bg-onprogress"></div>{" "}
                                {doc.name}
                              </div>
                            </Select.Option>
                          );
                        else if (doc.id === 4)
                          return (
                            <Select.Option key={idx} value={doc.id}>
                              <div className=" flex items-center">
                                <div className="mr-1 w-3 h-3 rounded-full bg-onhold"></div>{" "}
                                {doc.name}
                              </div>
                            </Select.Option>
                          );
                        else if (doc.id === 5)
                          return (
                            <Select.Option key={idx} value={doc.id}>
                              <div className=" flex items-center">
                                <div className="mr-1 w-3 h-3 rounded-full bg-completed"></div>{" "}
                                {doc.name}
                              </div>
                            </Select.Option>
                          );
                        else if (doc.id === 6)
                          return (
                            <Select.Option key={idx} value={doc.id}>
                              <div className=" flex items-center">
                                <div className="mr-1 w-3 h-3 rounded-full bg-closed"></div>{" "}
                                {doc.name}
                              </div>
                            </Select.Option>
                          );
                      })
                    : dataticketrelation.status_ticket.map((doc, idx) => {
                        if (doc.id === 1)
                          return (
                            <Select.Option key={idx} value={doc.id}>
                              <div className=" flex items-center">
                                <div className="mr-1 w-3 h-3 rounded-full bg-onprogress"></div>{" "}
                                {doc.name}
                              </div>
                            </Select.Option>
                          );
                        else if (doc.id === 2)
                          return (
                            <Select.Option key={idx} value={doc.id}>
                              <div className=" flex items-center">
                                <div className="mr-1 w-3 h-3 rounded-full bg-open"></div>{" "}
                                {doc.name}
                              </div>
                            </Select.Option>
                          );
                        else if (doc.id === 6)
                          return (
                            <Select.Option key={idx} value={doc.id}>
                              <div className=" flex items-center">
                                <div className="mr-1 w-3 h-3 rounded-full bg-closed"></div>{" "}
                                {doc.name}
                              </div>
                            </Select.Option>
                          );
                        else if (doc.id === 7)
                          return (
                            <Select.Option key={idx} value={doc.id}>
                              <div className=" flex items-center">
                                <div className="mr-1 w-3 h-3 rounded-full bg-canceled"></div>{" "}
                                {doc.name}
                              </div>
                            </Select.Option>
                          );
                      })} */}
                </Select>
              </div>

              <ButtonSys
                type={`primary`}
                // onClick={onFilterTickets}
                // disabled={!isAllowedGetTickets}
              >
                <div className="flex flex-row space-x-2.5 w-full items-center">
                  <SearchIconSvg size={15} color={`#ffffff`} />
                  <p>Cari</p>
                </div>
              </ButtonSys>
            </div>
            {/* End: Search criteria */}

            {/* <div>
              <TableCustomTickets
                dataSource={datatickets}
                setDataSource={setdatatickets}
                columns={columnsTickets}
                loading={loadingtickets}
                setpraloading={setloadingtickets}
                pageSize={rowstickets}
                total={datarawtickets?.total}
                initProps={initProps}
                setpage={setpagetickets}
                pagefromsearch={pagetickets}
                setdataraw={setdatarawtickets}
                setsorting={setsortingtickets}
                sorting={sortingtickets}
                searching={searcingfiltertickets}
                tickettype={tickettypefiltertickets}
                fromdate={fromfiltertickets}
                todate={tofiltertickets}
                location={locfiltertickets}
                status={statusfiltertickets}
                dataprofile={dataProfile}
              />
            </div> */}
          </div>
        </div>
      </div>

      {/* <AccessControl hasPermission={ASSESSMENT_ADD}> */}
      <DrawerCandidateCreate
        title={"Tambah Kandidat"}
        visible={isCreateDrawerShown}
        buttonOkText={"Simpan Kandidat"}
        initProps={initProps}
        onvisible={setCreateDrawerShown}
        setRefresh={setRefresh}
        // isAllowedToAddCandidate={isAllowedToAddCandidate}
      />
      {/* </AccessControl> */}
    </Layout>
  );
};

export async function getServerSideProps({ req, res }) {
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
      sidemenu: "111",
    },
  };
}

export default RecruitmentCandidateIndex;
