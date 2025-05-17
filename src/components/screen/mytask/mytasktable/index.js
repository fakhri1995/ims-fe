import { SearchOutlined } from "@ant-design/icons";
import { DatePicker, Input, Select, Spin, TreeSelect } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import ButtonSys from "../../../button";
import { LayoutGridAddSvg, SearchIconSvg } from "../../../icon";
import {
  TableCustomAdminTask,
  TableCustomTask,
  TableCustomTickets,
} from "../../../table/tableCustom";
import { H1 } from "../../../typography";

const MyTaskTable = ({
  searchstate,
  setsearchstate,
  isAllowedToGetTaskTypes,
  isAllowedToGetCompanyList,
  isAllowedToGetUserTasks,
  fetchingtasktypes,
  tasktypefilterstate,
  setfetchingtasktypes,
  setdatafiltertipetasks,
  settasktypefilterstate,
  datafiltertipetasks,
  fromdatefilterstate,
  todatefilterstate,
  setfromdatefilterstate,
  settodatefilterstate,
  statusfilterstate,
  setstatusfilterstate,
  lokasifilterstate,
  setlokasifilterstate,
  datafilterlokasi,
  onFilterTask,
  datatasks,
  columnsTask,
  loadingtasks,
  datarawtask,
  queryParams,
  setQueryParams,
  canViewOpenTaskSection,
  onKeyPressHandler,
  setviewtaskpick,
  initProps,
}) => {
  const rt = useRouter();

  return (
    <div className="col-span-12 flex flex-col shadow-md rounded-md bg-white p-5 mb-6 ">
      <div className="flex items-center justify-between mb-4">
        <H1>Semua Task</H1>
      </div>
      <div className="grid grid-cols-3 lg:flex items-center mb-4 gap-2 lg:gap-x-1">
        <div className="lg:w-2/12">
          <Input
            value={searchstate}
            style={{ width: `100%` }}
            placeholder="Judul atau ID.."
            disabled={!isAllowedToGetUserTasks}
            allowClear
            onChange={(e) => {
              if (e.target.value === "") {
                setsearchstate("");
              } else {
                setQueryParams({ page: 1 });
                setsearchstate(e.target.value);
              }
            }}
            onKeyPress={onKeyPressHandler}
          />
        </div>
        <div className="lg:w-2/12">
          <Select
            value={tasktypefilterstate === "" ? null : tasktypefilterstate}
            placeholder="Semua Tipe Task"
            disabled={!isAllowedToGetTaskTypes || !isAllowedToGetUserTasks}
            style={{ width: `100%` }}
            allowClear
            showSearch
            optionFilterProp="children"
            notFoundContent={fetchingtasktypes ? <Spin size="small" /> : null}
            onSearch={(value) => {
              setfetchingtasktypes(true);
              fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterTaskTypes?name=${value}`,
                {
                  method: `GET`,
                  headers: {
                    Authorization: JSON.parse(initProps),
                  },
                }
              )
                .then((res) => res.json())
                .then((res2) => {
                  setdatafiltertipetasks(res2.data);
                  setfetchingtasktypes(false);
                });
            }}
            filterOption={(input, opt) =>
              opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            name={`task_type_id`}
            onChange={(value) => {
              typeof value === "undefined"
                ? settasktypefilterstate("")
                : settasktypefilterstate(value),
                setQueryParams({ page: 1 });
            }}
          >
            {datafiltertipetasks.map((doc, idx) => (
              <Select.Option key={idx} value={doc.id}>
                {doc.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="lg:w-3/12">
          <DatePicker.RangePicker
            showTime
            allowEmpty
            className="datepickerStatus"
            style={{ width: `100%` }}
            disabled={!isAllowedToGetUserTasks}
            value={
              fromdatefilterstate === ""
                ? [null, null]
                : [moment(fromdatefilterstate), moment(todatefilterstate)]
            }
            onChange={(dates, datestrings) => {
              setQueryParams({ page: 1 });
              setfromdatefilterstate(datestrings[0]);
              settodatefilterstate(datestrings[1]);
            }}
          />
        </div>
        <div className="lg:w-2/12">
          <TreeSelect
            style={{ width: `100%` }}
            allowClear
            placeholder="Semua Lokasi"
            disabled={!isAllowedToGetCompanyList || !isAllowedToGetUserTasks}
            showSearch
            suffixIcon={<SearchOutlined />}
            showArrow
            name={`locations_id`}
            onChange={(value) => {
              typeof value === "undefined"
                ? setlokasifilterstate("")
                : setlokasifilterstate(value),
                setQueryParams({ page: 1 });
            }}
            treeData={datafilterlokasi}
            treeDefaultExpandAll
            value={lokasifilterstate === "" ? null : lokasifilterstate}
            treeNodeFilterProp="title"
            filterTreeNode={(search, item) => {
              /** `showSearch`, `filterTreeNode`, and `treeNodeFilterProp` */
              /** @see https://stackoverflow.com/questions/58499570/search-ant-design-tree-select-by-title */
              return (
                item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0
              );
            }}
          ></TreeSelect>
        </div>
        <div className="lg:w-2/12">
          <Select
            style={{ width: `100%` }}
            value={statusfilterstate === "" ? null : statusfilterstate}
            placeholder="Semua Status"
            disabled={!isAllowedToGetUserTasks}
            allowClear
            name={`status`}
            onChange={(value) => {
              typeof value === "undefined"
                ? setstatusfilterstate("")
                : setstatusfilterstate(value),
                setQueryParams({ page: 1 });
            }}
          >
            <Select.Option value={1}>
              <div className=" flex items-center">
                <div className="rounded-md h-auto px-1 mr-1 text-center py-1 bg-overdue border border-overdue"></div>
                Overdue
              </div>
            </Select.Option>
            <Select.Option value={2}>
              <div className=" flex items-center">
                <div className="rounded-md h-auto px-1 mr-1 text-center py-1 bg-open border border-open"></div>
                Open
              </div>
            </Select.Option>
            <Select.Option value={3}>
              <div className=" flex items-center">
                <div className="rounded-md h-auto px-1 mr-1 text-center py-1 bg-onprogress border border-onprogress"></div>
                On Progress
              </div>
            </Select.Option>
            <Select.Option value={4}>
              <div className=" flex items-center">
                <div className="rounded-md h-auto px-1 mr-1 text-center py-1 bg-onhold border border-onhold"></div>
                On Hold
              </div>
            </Select.Option>
            <Select.Option value={5}>
              <div className=" flex items-center">
                <div className="rounded-md h-auto px-1 mr-1 text-center py-1 bg-completed border border-completed"></div>
                Completed
              </div>
            </Select.Option>
            <Select.Option value={6}>
              <div className=" flex items-center">
                <div className="rounded-md h-auto px-1 mr-1 text-center py-1 bg-closed border border-closed"></div>
                Closed
              </div>
            </Select.Option>
          </Select>
        </div>
        <div className="">
          <ButtonSys
            type={`primary`}
            onClick={onFilterTask}
            disabled={!isAllowedToGetUserTasks}
          >
            <div className="flex space-x-2">
              <SearchIconSvg size={15} color={`#ffffff`} />
              <p>Cari</p>
            </div>
          </ButtonSys>
        </div>
      </div>
      <div className="flex flex-col mb-5">
        <TableCustomTask
          dataSource={datatasks}
          columns={columnsTask}
          loading={loadingtasks}
          total={datarawtask.total}
          prevpath={"mytask"}
          queryParams={queryParams}
          setQueryParams={setQueryParams}
        />
      </div>
      <div className="flex items-center justify-end">
        <div>
          <ButtonSys
            type={`primary`}
            disabled={!canViewOpenTaskSection}
            onClick={() => {
              setviewtaskpick(true);
            }}
          >
            <div className="mr-1">
              <LayoutGridAddSvg size={18} color={`#ffffff`} />
            </div>
            Ambil Task Baru
          </ButtonSys>
        </div>
      </div>
    </div>
  );
};

export default MyTaskTable;
