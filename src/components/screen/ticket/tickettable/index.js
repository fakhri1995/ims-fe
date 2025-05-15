import { SearchOutlined } from "@ant-design/icons";
import { DatePicker, Input, Select, TreeSelect } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import ButtonSys from "../../../button";
import { TableCustomTickets } from "../../../table/tableCustom";
import { H1 } from "../../../typography";

const TicketTable = ({
  searcingfiltertickets,
  setsearcingfiltertickets,
  setQueryParams,
  onKeyPressHandler,
  isAllowedGetTickets,
  tickettypefiltertickets,
  isAllowedToAddTicket,
  settickettypefiltertickets,
  dataticketrelation,
  fromfiltertickets,
  tofiltertickets,
  setfromfiltertickets,
  settofiltertickets,
  isAllowedGetTicket,
  locfiltertickets,
  statusfiltertickets,
  dataProfile,
  onFilterTickets,
  datatickets,
  columnsTickets,
  loadingtickets,
  datarawtickets,
  queryParams,
}) => {
  const rt = useRouter();

  return (
    <div className="col-span-2 md:col-span-10 flex flex-col shadow-md rounded-md bg-white p-5 mb-6 ">
      <div className="flex items-center justify-between mb-4">
        <H1>Semua Tiket</H1>
      </div>

      {/* Start: Search criteria */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:flex gap-2 lg:justify-between">
        {/* Search by keyword (nomor tiket) */}
        <div className="lg:w-2/12">
          <Input
            value={searcingfiltertickets === "" ? null : searcingfiltertickets}
            style={{ width: `100%` }}
            placeholder="Masukkan Nomor Tiket..."
            allowClear
            onChange={(e) => {
              if (e.target.value === "") {
                setsearcingfiltertickets("");
              } else {
                setsearcingfiltertickets(e.target.value);
                setQueryParams({ page: 1 });
              }
            }}
            onKeyPress={onKeyPressHandler}
            disabled={!isAllowedGetTickets}
          />
        </div>

        {/* Filter by ticket (dropdown) */}
        <div className="lg:w-2/12">
          <Select
            value={
              tickettypefiltertickets === "" ? null : tickettypefiltertickets
            }
            disabled={!isAllowedToAddTicket || !isAllowedGetTickets}
            placeholder="Semua Tipe Tiket"
            style={{ width: `100%` }}
            allowClear
            name={`task_type`}
            onChange={(value) => {
              typeof value === "undefined"
                ? settickettypefiltertickets("")
                : settickettypefiltertickets(value),
                setQueryParams({ page: 1 });
            }}
          >
            {dataticketrelation.ticket_types.map((doc, idx) => (
              <Select.Option key={idx} value={doc.id}>
                {doc.name}
              </Select.Option>
            ))}
          </Select>
        </div>

        {/* Filter by date */}
        <div className="md:col-span-2 lg:w-3/12">
          <DatePicker.RangePicker
            style={{ width: `100%` }}
            allowEmpty
            disabled={!isAllowedGetTickets}
            className="datepickerStatus"
            value={
              fromfiltertickets === ""
                ? [null, null]
                : [moment(fromfiltertickets), moment(tofiltertickets)]
            }
            onChange={(dates, datestrings) => {
              setQueryParams({ page: 1 });
              setfromfiltertickets(datestrings[0]);
              settofiltertickets(datestrings[1]);
            }}
          />
        </div>

        {/* Search by location */}
        <div className="lg:w-2/12">
          <TreeSelect
            style={{ width: `100%` }}
            allowClear
            disabled={!isAllowedGetTicket || !isAllowedGetTickets}
            placeholder="Semua Lokasi"
            showSearch
            suffixIcon={<SearchOutlined />}
            showArrow
            name={`locations_id`}
            onChange={(value) => {
              typeof value === "undefined"
                ? setlocfiltertickets("")
                : setlocfiltertickets(value),
                setQueryParams({ page: 1 });
            }}
            treeData={[dataticketrelation.companies]}
            // treeData={[
            //   dataProfile.data.role === 1
            //     ? dataticketrelation.companies
            //     : dataticketrelation.companies,
            // ]}
            treeDefaultExpandAll
            value={locfiltertickets === "" ? null : locfiltertickets}
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

        {/* Search by status (dropdown) */}
        <div className="lg:w-2/12">
          <Select
            value={statusfiltertickets === "" ? null : statusfiltertickets}
            disabled={!isAllowedGetTicket || !isAllowedGetTickets}
            placeholder="Status"
            style={{ width: `100%` }}
            allowClear
            name={`status`}
            onChange={(value, option) => {
              typeof value === "undefined"
                ? setstatusfiltertickets("")
                : setstatusfiltertickets(value),
                setQueryParams({ page: 1 });
            }}
          >
            {dataProfile.data.role === 1
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
                })}
          </Select>
        </div>

        <div className="md:col-span-2 w-full lg:w-fit">
          <ButtonSys
            type={`primary`}
            onClick={onFilterTickets}
            disabled={!isAllowedGetTickets}
            fullWidth
          >
            {/* <div className='mr-1'>
                                        <SearchIconSvg size={15} color={`#ffffff`} />
                                    </div> */}
            Cari
          </ButtonSys>
        </div>
      </div>
      {/* End: Search criteria */}

      <div>
        <TableCustomTickets
          dataSource={datatickets}
          columns={columnsTickets}
          loading={loadingtickets}
          total={datarawtickets?.total}
          queryParams={queryParams}
          setQueryParams={setQueryParams}
        />
      </div>
    </div>
  );
};

export default TicketTable;
