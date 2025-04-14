import { Input, Select, Table } from "antd";
import React from "react";

import ButtonSys from "../../../button";
import { DownIconSvg, SearchIconSvg } from "../../../icon";

const CareerTableCandidate = ({
  searchingFilterRecruitments,
  setSearchingFilterRecruitments,
  queryParams,
  setQueryParams,
  onKeyPressHandler,
  isAllowedToGetCareer,
  setSelectedStatus,
  dataStatusList,
  columnRecruitment,
  dataCareers,
  loadingCareers,
  dataRawRCareers,
  onFilterRecruitments,
}) => {
  return (
    <div className="lg:col-span-3 flex flex-col shadow-md rounded-md bg-white p-5 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h4 className="mig-heading--4 ">List Lowongan</h4>
      </div>

      {/* Start: Search criteria */}
      <div className="flex flex-col gap-4 md:flex-row md:justify-between w-full md:items-center mb-4">
        {/* Search by keyword (kata kunci) */}
        <div className="w-full md:w-8/12">
          <Input
            defaultValue={searchingFilterRecruitments}
            style={{ width: `100%` }}
            placeholder="Cari Lowongan ..."
            allowClear
            onChange={(e) => {
              setSearchingFilterRecruitments(e.target.value);
              setQueryParams({ page: 1 });
            }}
            onKeyPress={onKeyPressHandler}
            disabled={!isAllowedToGetCareer}
          />
        </div>
        {/* filter tanggal */}
        {/* <div className="w-full md:w-2/12 customDatepicker">
              <DatePicker placeholder="Semua Tanggal" className={'w-full'} suffixIcon={<CalendartimeIconSvg size={16} color={'#35763B'}/>} />
              </div> */}

        {/* Search by status (dropdown) */}
        <div className="w-full md:w-2/12 customselectcareer">
          <Select
            defaultValue={queryParams.is_posted}
            suffixIcon={<DownIconSvg size={24} color={"#35763B"} />}
            allowClear
            name={`status`}
            placeholder="Semua Status"
            style={{ width: `100%` }}
            onChange={(value) => {
              setQueryParams({ is_posted: value, page: 1 });
              setSelectedStatus(value);
            }}
          >
            {dataStatusList.map((status) => (
              <Select.Option key={status.id} value={status.id}>
                <div className="flex items-center">
                  <p className="truncate">{status.name}</p>
                </div>
              </Select.Option>
            ))}
          </Select>
        </div>

        <div className="flex justify-end">
          <ButtonSys
            type={`primary`}
            onClick={onFilterRecruitments}
            disabled={!isAllowedToGetCareer}
          >
            <div className="flex flex-row space-x-2.5 w-full items-center">
              <SearchIconSvg size={15} color={`#ffffff`} />
              <p>Cari Lowongan</p>
            </div>
          </ButtonSys>
        </div>
      </div>
      {/* End: Search criteria */}

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
          // onRow={(record, rowIndex) => {
          //   return {
          //     onClick: () => {
          //       handleClickCareer(record);
          //     },
          //   };
          // }}
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
    </div>
  );
};

export default CareerTableCandidate;
