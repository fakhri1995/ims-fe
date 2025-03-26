import { PDFDownloadLink } from "@react-pdf/renderer";
import { Input, Select, Spin, Switch, Table } from "antd";
import React from "react";

import { AccessControl } from "../../../../components/features/AccessControl";
import ButtonSys from "../../../button";
import DrawerDetailPelamar from "../../../drawer/career/DrawerDetailPelamar";
import { DownIconSvg } from "../../../icon";
import ModalCore from "../../../modal/modalCore";
import ResumePDFTemplate from "../../resume/ResumePDFTemplate";

const CareerApplicant = ({
  detailCareer,
  queryParams,
  setQueryParams,
  setSelectedName,
  setSelectedStatus,
  dataStatusApply,
  onFilterRecruitments,
  isAllowedToGetCareer,
  columnRecruitment,
  dataCareers,
  loadingCareers,
  dataRawRCareers,
  RESUME_GET,
  openDownloadModal,
  setOpenDownloadModal,
  loadingResumeData,
  isOnClient,
  showLogoStatus,
  setShowLogoStatus,
  dataResume,
}) => {
  return (
    <div
      className="lg:col-span-3 flex flex-col rounded-md bg-white p-5 mb-6"
      style={{ boxShadow: "0px 6px 25px 0px rgba(0, 0, 0, 0.05)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className={"w-3/4"}>
          <h4 className="mig-heading--4 ">Pelamar {detailCareer?.name}</h4>
        </div>
        <div className={"flex flex-row gap-4 w-2/4"}>
          <div className="w-full">
            <Input
              defaultValue={queryParams.keyword}
              style={{ width: `100%` }}
              placeholder="Cari Nama ..."
              allowClear
              onChange={(e) => {
                setQueryParams({ keyword: e.target.value });
                setSelectedName(e.target.value);
              }}
              // onKeyPress={onKeyPressHandler}
              // disabled={!isAllowedToGetCareer}
            />
          </div>
          <div className="w-full md:w-1/2 customselectcareer">
            <Select
              defaultValue={queryParams.career_apply_status_id}
              allowClear
              name={`status`}
              placeholder="Pilih Status"
              style={{ width: `100%` }}
              onChange={(value) => {
                setQueryParams({ career_apply_status_id: value });
                setSelectedStatus(value);
              }}
              suffixIcon={<DownIconSvg size={24} color={"#35763B"} />}
            >
              {dataStatusApply.map((status) => (
                <Select.Option key={status.id} value={status.id}>
                  <div className="flex items-center">
                    <p className="truncate">{status.name}</p>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </div>

          <div className={"flex justify-end ml-8"}>
            <ButtonSys
              type={`primary`}
              onClick={onFilterRecruitments}
              disabled={!isAllowedToGetCareer}
            >
              <div className="flex flex-row space-x-2.5 w-full items-center">
                <p>Simpan Filter</p>
              </div>
            </ButtonSys>
          </div>
        </div>
      </div>

      <div>
        <Table
          columns={columnRecruitment}
          className={"cursor-pointer"}
          dataSource={dataCareers}
          loading={loadingCareers}
          rowKey={(record) => record.id}
          pagination={{
            current: queryParams.page,
            pageSize: queryParams.rows,
            total: dataRawRCareers?.total,
            showSizeChanger: true,
          }}
          onChange={(pagination, filters, sorter, extra) => {
            const sortTypePayload =
              sorter.order === "ascend"
                ? "asc"
                : sorter.order === "descend"
                ? "desc"
                : undefined;

            setQueryParams({
              sort_type: sortTypePayload,
              sort_by: sortTypePayload === undefined ? undefined : sorter.field,
              page: pagination.current,
              rows: pagination.pageSize,
            });
          }}
          scroll={{ x: 300 }}
        ></Table>
      </div>
      <AccessControl hasPermission={RESUME_GET}>
        <ModalCore
          title={"Unduh Resume"}
          visible={openDownloadModal}
          onCancel={() => setOpenDownloadModal(false)}
          footer={<></>}
        >
          <Spin spinning={loadingResumeData}>
            {isOnClient && (
              <div className="flex flex-col space-y-5 ml-1">
                <p className="">
                  Klik untuk mengunduh resume kandidat dengan nama&nbsp;
                  <strong>{dataResume.name}</strong>
                </p>
                <div className={"mt-6 flex"}>
                  <Switch
                    checked={showLogoStatus}
                    onChange={() => setShowLogoStatus(!showLogoStatus)}
                  />
                  <p className={"ml-4 text-mono30 text-xs self-center"}>
                    {showLogoStatus
                      ? "Menampilkan Logo MIG"
                      : "Tidak Menampilkan Logo MIG"}
                  </p>
                </div>
                <div className={"flex self-end"}>
                  <p
                    onClick={() => setOpenDownloadModal(false)}
                    className={
                      "flex items-center mr-8 text-xs text-mono50 cursor-pointer"
                    }
                  >
                    Batalkan
                  </p>
                  <PDFDownloadLink
                    document={
                      <ResumePDFTemplate
                        dataResume={dataResume}
                        logoStatus={showLogoStatus}
                      />
                    }
                    fileName={`CV-${dataResume?.assessment?.name}-${dataResume?.name}.pdf`}
                  >
                    <ButtonSys
                      type={"primary"}
                      // onClick={() => rt.push('/admin/candidates/pdfTemplate')}
                    >
                      <div className={"flex flex-row"}>
                        <DownloadIcon2Svg size={16} color={"#fffffff"} />
                        <p className={"ml-2 text-xs text-white"}>
                          Unduh Resume
                        </p>
                      </div>
                    </ButtonSys>
                  </PDFDownloadLink>
                </div>
              </div>
            )}
          </Spin>
        </ModalCore>
      </AccessControl>
    </div>
  );
};

export default CareerApplicant;
