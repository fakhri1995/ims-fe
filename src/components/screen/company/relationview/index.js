import { DownOutlined, SearchOutlined, UpOutlined } from "@ant-design/icons";
import { DatePicker, Empty, Input, Select, Spin, Tree } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import InfiniteScroll from "react-infinite-scroll-component";

import { permissionWarningNotification } from "../../../../lib/helper";
import ButtonSys from "../../../button";
import DrawerAddRelasi from "../../../drawer/companies/mycompany/drawerMyCompanyRelasiCreate";
import DrawerCore from "../../../drawer/drawerCore";
import {
  BackIconSvg,
  CircleXIconSvg,
  LocationIconSvg,
  MappinIconSvg,
  SearchIconSvg,
  TrashIconSvg,
} from "../../../icon";
import ModalCore from "../../../modal/modalCore";
import { TableCustomRelasi } from "../../../table/tableCustom";
import { H1, H2, Label, Text } from "../../../typography";
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

Chart.register(
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement
);

const RelationView = ({
  setviewrelasi,
  setdrawerelasi,
  datarelasi,
  setdatarelasi,
  columnrelasi,
  loadingrelasi,
  setloadingrelasi,
  rowsrelasi,
  datarawrelasi,
  initProps,
  setpagerelasi,
  dataProfile,
  setdatarawrelasi,
  drawerelasi,
  drawerupdaterelasi,
  setdrawerupdaterelasi,
  handleUpdateRelationshipItem,
  loadingupdate,
  setrelationnameddupdate,
  relationnameddupdate,
  displaydatarelations,
  relationselectedidxupdate,
  relationselectedisinverseupdate,
  setrelationnameupdate,
  dataApiupdate,
  setdataApiupdate,
  setrelationselectedidxupdate,
  setrelationselectedisinverseupdate,
  fetchingmodel,
  setfetchingmodel,
  setdetailtipedataupdate,
  detailtipedataupdate,
  modaldeleterelasi,
  setmodaldeleterelasi,
  loadingdeleterelasi,
  handleDeleteRelationshipItem,
  datadeleterelasi,
  relationnameupdate,
}) => {
  const [disabledadd, setdisabledadd] = useState(false);
  return (
    <div className="flex flex-col shadow-md rounded-md bg-white p-8 mx-6 md:mx-0 h-screen">
      <div className="flex justify-between items-center mb-5">
        <div className="flex">
          <div
            className="mr-2 cursor-pointer"
            onClick={() => {
              setviewrelasi(false);
            }}
          >
            <BackIconSvg size={15} color={`#000000`} />
          </div>
          <H1>Relasi</H1>
        </div>
        <div>
          <ButtonSys
            type="primary"
            onClick={() => {
              setdrawerelasi(true);
            }}
          >
            + Tambah Relasi
          </ButtonSys>
        </div>
      </div>
      <div>
        <TableCustomRelasi
          dataSource={datarelasi}
          setDataSource={setdatarelasi}
          columns={columnrelasi}
          loading={loadingrelasi}
          setpraloading={setloadingrelasi}
          pageSize={rowsrelasi}
          total={datarawrelasi.total}
          initProps={initProps}
          setpage={setpagerelasi}
          id={dataProfile.data.company.id}
          setdataraw={setdatarawrelasi}
        />
      </div>
      <DrawerAddRelasi
        title={"Tambah Relasi"}
        visible={drawerelasi}
        onClose={() => {
          setdrawerelasi(false);
        }}
        buttonOkText={"Simpan Relasi"}
        initProps={initProps}
        onvisible={setdrawerelasi}
        id={dataProfile.data.company.id}
      />
      <DrawerCore
        title={"Edit Relasi"}
        visible={drawerupdaterelasi}
        onClose={() => {
          setdrawerupdaterelasi(false);
        }}
        buttonOkText={"Simpan Relasi"}
        onClick={handleUpdateRelationshipItem}
      >
        <Spin spinning={loadingupdate}>
          <div className="flex flex-col mb-3">
            <div className="flex flex-col mb-3">
              <p className="mb-0">
                Relationship Type <span className="namapart"></span>
              </p>
              <div
                className="w-full border p-2 hover:border-primary100 rounded-sm flex items-center justify-between cursor-pointer"
                onClick={() => {
                  setrelationnameddupdate((prev) => !prev);
                }}
              >
                <p className="mb-0">{relationnameupdate}</p>
                {relationnameddupdate ? (
                  <UpOutlined style={{ color: `rgb(229,231,235)` }} />
                ) : (
                  <DownOutlined style={{ color: `rgb(229,231,235)` }} />
                )}
              </div>
              {relationnameddupdate ? (
                <div className="flex flex-col">
                  <div className="flex">
                    <div className="bg-gray-200 font-semibold p-3 w-6/12">
                      Relationship Type
                    </div>
                    <div className="bg-gray-200 font-semibold p-3 w-6/12">
                      Inverse Relationship Type
                    </div>
                  </div>
                  {displaydatarelations.map((doc, idx) => {
                    return (
                      <div className="flex">
                        <div
                          className={` hover:bg-primary10 cursor-pointer hover:text-black p-3 w-6/12 ${
                            relationselectedidxupdate === idx &&
                            relationselectedisinverseupdate === false
                              ? " bg-primary50"
                              : "bg-white"
                          }`}
                          onClick={(e) => {
                            setrelationnameddupdate(false);
                            setrelationnameupdate(doc.relationship_type);
                            setdataApiupdate({
                              ...dataApiupdate,
                              relationship_id: doc.id,
                              is_inverse: false,
                            });
                            doc.id === null || dataApiupdate.type_id === null
                              ? setdisabledadd(true)
                              : setdisabledadd(false);
                            setrelationselectedidxupdate(idx);
                            setrelationselectedisinverseupdate(false);
                          }}
                        >
                          {doc.relationship_type}
                        </div>
                        <div
                          className={` hover:bg-primary10 cursor-pointer hover:text-black p-3 w-6/12 ${
                            relationselectedidxupdate === idx &&
                            relationselectedisinverseupdate === true
                              ? " bg-primary50"
                              : "bg-white"
                          }`}
                          onClick={(e) => {
                            setrelationnameddupdate(false);
                            setrelationnameupdate(
                              doc.inverse_relationship_type
                            );
                            setdataApiupdate({
                              ...dataApiupdate,
                              relationship_id: doc.id,
                              is_inverse: true,
                            });
                            doc.id === null || dataApiupdate.type_id === null
                              ? setdisabledadd(true)
                              : setdisabledadd(false);
                            setrelationselectedidxupdate(idx);
                            setrelationselectedisinverseupdate(true);
                          }}
                        >
                          {doc.inverse_relationship_type}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
              <style jsx>
                {`
                                                        .namapart::before{
                                                            content: '*';
                                                            color: red;
                                                        }
                                                    `}
              </style>
            </div>
            <div className="flex flex-col mb-3">
              <p className="mb-0">Item</p>
              <Select
                allowClear
                value={dataApiupdate.connected_id}
                showSearch
                optionFilterProp="children"
                notFoundContent={fetchingmodel ? <Spin size="small" /> : null}
                onSearch={(value) => {
                  setfetchingmodel(true);
                  fetch(
                    `${
                      process.env.NEXT_PUBLIC_BACKEND_URL
                    }/getFilterInventories?keyword=${
                      value !== "" ? value : ""
                    }`,
                    {
                      method: `GET`,
                      headers: {
                        Authorization: JSON.parse(initProps),
                      },
                    }
                  )
                    .then((res) => res.json())
                    .then((res2) => {
                      setdetailtipedataupdate(res2.data);
                      setfetchingmodel(false);
                    });
                }}
                // filterOption={(input, opt) => (
                //     opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                // )}
                onChange={(value) => {
                  setdataApiupdate({
                    ...dataApiupdate,
                    connected_id: value,
                    backup_connected_id: value,
                  });
                }}
              >
                {detailtipedataupdate.map((doc, idx) => {
                  return (
                    <Select.Option value={doc.id}>
                      {doc.mig_id} - {doc.model_name} - {doc.asset_name}
                    </Select.Option>
                  );
                })}
              </Select>
            </div>
            {/* <div className="flex flex-col mb-3">
                                                <p className="mb-0">Tipe <span className="tipepart"></span></p>
                                                <Select disabled value={dataApiupdate.type_id} onChange={(value) => {
                                                    setdataApiupdate({ ...dataApiupdate, type_id: value })
                                                    dataApiupdate.relationship_id === null || value === null ? setdisabledadd(true) : setdisabledadd(false)
                                                    setdetailtipeupdate(value)
                                                }}>
                                                    <Select.Option value={-1}>Agent</Select.Option>
                                                    <Select.Option value={-2}>Requester</Select.Option>
                                                    <Select.Option value={-3}>Company</Select.Option>
                                                    <Select.Option value={-4}>Asset Type</Select.Option>
                                                </Select>
                                                <style jsx>
                                                    {`
                                                        .tipepart::before{
                                                            content: '*';
                                                            color: red;
                                                        }
                                                    `}
                                                </style>
                                            </div> */}
            {/* {
                                                dataApiupdate.type_id !== null ?
                                                    <>
                                                        {
                                                            dataApiupdate.type_id === -3 &&
                                                            <div className="flex flex-col mb-3">
                                                                <p className="mb-0">Detail Tipe</p>
                                                                <TreeSelect value={dataApiupdate.backup_connected_id === null ? null : dataApiupdate.backup_connected_id} treeDefaultExpandedKeys={[1]} treeData={detailtipedataupdate} onChange={(value, label, extra) => {
                                                                    setdataApiupdate({ ...dataApiupdate, connected_id: value, backup_connected_id: value })
                                                                    setsubloctrig(value)
                                                                }}></TreeSelect>
                                                            </div>
                                                        }
                                                    </>
                                                    :
                                                    null

                                            } */}
            {/* {
                                                sublocdata !== null &&
                                                <div className="flex flex-col mb-3">
                                                    <p className="mb-0">Detail Tipe (Sublokasi)</p>
                                                    <TreeSelect multiple allowClear treeData={sublocdata} onChange={(value, label, extra) => {
                                                        if (value.length === 0) {
                                                            setdataApiupdate({ ...dataApiupdate, connected_id: dataApiupdate.backup_connected_id })
                                                        }
                                                        else {
                                                            setdataApiupdate({ ...dataApiupdate, connected_id: value })
                                                        }
                                                    }}></TreeSelect>
                                                </div>
                                            } */}
          </div>
        </Spin>
      </DrawerCore>
      <ModalCore
        title={"Konfirmasi Hapus Relasi"}
        visible={modaldeleterelasi}
        onCancel={() => {
          setmodaldeleterelasi(false);
        }}
        footer={
          <Spin spinning={loadingdeleterelasi}>
            <div className="flex justify-between items-center">
              <ButtonSys
                type="default"
                color="danger"
                onClick={() => {
                  setmodaldeleterelasi(false);
                }}
              >
                Batalkan
              </ButtonSys>
              <ButtonSys
                type="primary"
                color="danger"
                onClick={handleDeleteRelationshipItem}
              >
                <TrashIconSvg size={15} color={`#ffffff`} />
                Ya, saya yakin dan hapus relasi
              </ButtonSys>
            </div>
          </Spin>
        }
        loading={loadingdeleterelasi}
      >
        Apakah Anda yakin ingin melanjutkan penghapusan relasi{" "}
        <strong>{datadeleterelasi.relationship_name}</strong>?
      </ModalCore>
    </div>
  );
};

export default RelationView;
