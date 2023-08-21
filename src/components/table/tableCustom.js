import { Table, notification } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";

const TableCustom = ({
  dataSource,
  setDataSource,
  columns,
  loading,
  setloading,
  pageSize,
  total,
  setpraloading,
  initProps,
  setpage,
  pagefromsearch,
  keyworditems,
  setdataraw,
  locid,
  sorting,
  setsorting,
}) => {
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      scroll={{ x: 200 }}
      pagination={{
        current: pagefromsearch,
        pageSize: pageSize,
        total: total,
        onChange: (page, pageSize) => {
          setloading(true);
          setpage(page);
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyInventories?id=${locid}&page=${page}&rows=${pageSize}&keyword=${keyworditems}&sort_by=${sorting.sort_by}&sort_type=${sorting.sort_type}`,
            {
              method: `GET`,
              headers: {
                Authorization: JSON.parse(initProps),
              },
            }
          )
            .then((res) => res.json())
            .then((res2) => {
              setdataraw(res2.data);
              setDataSource(res2.data.data);
              setloading(false);
            });
        },
      }}
      onChange={(pagination, filters, sorter, extra) => {
        if (extra.action === "sort") {
          if (sorter.column) {
            setloading(true);
            setsorting({
              sort_by: sorter.column.dataIndex,
              sort_type: sorter.order === "ascend" ? "asc" : "desc",
            });
            fetch(
              `${
                process.env.NEXT_PUBLIC_BACKEND_URL
              }/getCompanyInventories?id=${locid}&page=${
                pagination.current
              }&rows=${pagination.pageSize}&keyword=${keyworditems}&sort_by=${
                sorter.column.dataIndex
              }&sort_type=${sorter.order === "ascend" ? "asc" : "desc"}`,
              {
                method: `GET`,
                headers: {
                  Authorization: JSON.parse(initProps),
                },
              }
            )
              .then((res) => res.json())
              .then((res2) => {
                setdataraw(res2.data);
                setDataSource(res2.data.data);
                setloading(false);
              });
          } else {
            setloading(true);
            setsorting({ sort_by: "", sort_type: "" });
            fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyInventories?id=${locid}&page=${pagination.current}&rows=${pagination.pageSize}&keyword=${keyworditems}&sort_by=&sort_type=`,
              {
                method: `GET`,
                headers: {
                  Authorization: JSON.parse(initProps),
                },
              }
            )
              .then((res) => res.json())
              .then((res2) => {
                setdataraw(res2.data);
                setDataSource(res2.data.data);
                setloading(false);
              });
          }
        }
      }}
    />
  );
};

const TableCustomRelasi = ({
  dataSource,
  setDataSource,
  columns,
  loading,
  pageSize,
  total,
  setpraloading,
  initProps,
  id,
  setpage,
  setdataraw,
}) => {
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      scroll={{ x: 200 }}
      pagination={{
        pageSize: pageSize,
        total: total,
        onChange: (page, pageSize) => {
          setpraloading(true);
          setpage(page);
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyRelationshipInventory?id=${id}&page=${page}&rows=${pageSize}`,
            {
              method: `GET`,
              headers: {
                Authorization: JSON.parse(initProps),
              },
            }
          )
            .then((res) => res.json())
            .then((res2) => {
              setdataraw(res2.data);
              setDataSource(res2.data.data);
              setpraloading(false);
            });
        },
      }}
    />
  );
};

const TableCustomTipeTask = ({
  dataSource,
  setDataSource,
  columns,
  loading,
  pageSize,
  total,
  setpraloading,
  initProps,
  setpage,
  pagefromsearch,
  setdataraw,
  setsortingtipetask,
  sortingtipetask,
  searcingtipetask,
}) => {
  return (
    <Table
      className="tableTypeTask"
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      scroll={{ x: 200 }}
      pagination={{
        current: pagefromsearch,
        pageSize: pageSize,
        total: total,
        onChange: (page, pageSize) => {
          setpraloading(true);
          setpage(page);
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTaskTypes?page=${page}&rows=${pageSize}&sort_by=${sortingtipetask.sort_by}&sort_type=${sortingtipetask.sort_type}&name=${searcingtipetask}`,
            {
              method: `GET`,
              headers: {
                Authorization: JSON.parse(initProps),
              },
            }
          )
            .then((res) => res.json())
            .then((res2) => {
              setdataraw(res2.data);
              setDataSource(res2.data.data);
              setpraloading(false);
            });
        },
      }}
      onChange={(pagination, filters, sorter, extra) => {
        if (extra.action === "sort") {
          if (sorter.column) {
            setpraloading(true);
            setsortingtipetask({
              sort_by: sorter.column.dataIndex,
              sort_type: sorter.order === "ascend" ? "asc" : "desc",
            });
            fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTaskTypes?page=${
                pagination.current
              }&rows=${pagination.pageSize}&sort_by=${
                sorter.column.dataIndex
              }&sort_type=${
                sorter.order === "ascend" ? "asc" : "desc"
              }&name=${searcingtipetask}`,
              {
                method: `GET`,
                headers: {
                  Authorization: JSON.parse(initProps),
                },
              }
            )
              .then((res) => res.json())
              .then((res2) => {
                setdataraw(res2.data);
                setDataSource(res2.data.data);
                setpraloading(false);
              });
          } else {
            setpraloading(true);
            setsortingtipetask({ sort_by: "", sort_type: "" });
            fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTaskTypes?page=${pagination.current}&rows=${pagination.pageSize}&sort_by=&sort_type=&name=${searcingtipetask}`,
              {
                method: `GET`,
                headers: {
                  Authorization: JSON.parse(initProps),
                },
              }
            )
              .then((res) => res.json())
              .then((res2) => {
                setdataraw(res2.data);
                setDataSource(res2.data.data);
                setpraloading(false);
              });
          }
        }
      }}
    />
  );
};

const TableCustomTask = ({
  dataSource,
  columns,
  loading,
  total,
  prevpath,
  queryParams,
  setQueryParams,
}) => {
  const rt = useRouter();
  const [rowstate, setrowstate] = useState(0);
  return (
    <Table
      className="tableTask"
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      scroll={{ x: "max-content" }}
      pagination={{
        current: queryParams.page,
        pageSize: queryParams.rows,
        total: total,
        showSizeChanger: true,
      }}
      onRow={(record, rowIndex) => {
        return {
          onMouseOver: (event) => {
            setrowstate(record.id);
          },
          onClick: (event) => {
            rt.push(`/tasks/detail/${record.id}?prevpath=${prevpath}`);
          },
        };
      }}
      rowClassName={(record, idx) => {
        return `${record.id === rowstate && `cursor-pointer`} ${
          record.status === 1 && `bg-bgBackdropOverdue`
        }`;
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
    />
  );
};

const TableCustomAdminTask = ({
  dataSource,
  columns,
  loading,
  total,
  prevpath,
  queryParams,
  setQueryParams,
}) => {
  const rt = useRouter();
  const [rowstate, setrowstate] = useState(0);
  return (
    <Table
      className="tableTask"
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      scroll={{ x: "max-content" }}
      pagination={{
        current: queryParams.page,
        pageSize: queryParams.rows,
        total: total,
        showSizeChanger: true,
      }}
      onRow={(record, rowIndex) => {
        return {
          onMouseOver: (event) => {
            setrowstate(record.id);
          },
          onClick: (event) => {
            rt.push(`/tasks/detail/${record.id}?prevpath=${prevpath}`);
          },
        };
      }}
      rowClassName={(record, idx) => {
        return `${record.id === rowstate && `cursor-pointer`} ${
          record.status === 1 && `bg-bgBackdropOverdue`
        }`;
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
    />
  );
};

const TableCustomStaffTask = ({
  dataSource,
  setDataSource,
  columns,
  loading,
  pageSize,
  total,
  setpraloading,
  initProps,
  setpage,
  pagefromsearch,
  setdataraw,
  setsortingstaff,
  searcingstaff,
  intervaldatestaff,
}) => {
  return (
    <Table
      className="tableTypeTask"
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      scroll={{ x: 200 }}
      pagination={{
        current: pagefromsearch,
        pageSize: pageSize,
        total: total,
        onChange: (page, pageSize) => {
          setpraloading(true);
          setpage(page);
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/getStaffTaskStatuses?page=${page}&rows=${pageSize}&name=${searcingstaff}&from=${intervaldatestaff.from}&to=${intervaldatestaff.to}`,
            {
              method: `GET`,
              headers: {
                Authorization: JSON.parse(initProps),
              },
            }
          )
            .then((res) => res.json())
            .then((res2) => {
              setdataraw(res2.data);
              setDataSource(res2.data.data);
              setpraloading(false);
            });
        },
      }}
      onChange={(pagination, filters, sorter, extra) => {
        if (extra.action === "sort") {
          if (sorter.column) {
            setpraloading(true);
            setsortingstaff({
              sort_by: sorter.column.dataIndex,
              sort_type: sorter.order === "ascend" ? "asc" : "desc",
            });
            fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getStaffTaskStatuses?page=${pagination.current}&rows=${pagination.pageSize}&name=${searcingstaff}&from=${intervaldatestaff.from}&to=${intervaldatestaff.to}`,
              {
                method: `GET`,
                headers: {
                  Authorization: JSON.parse(initProps),
                },
              }
            )
              .then((res) => res.json())
              .then((res2) => {
                setdataraw(res2.data);
                setDataSource(res2.data.data);
                setpraloading(false);
              });
          } else {
            setpraloading(true);
            setsortingstaff({ sort_by: "", sort_type: "" });
            fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getStaffTaskStatuses?page=${pagination.current}&rows=${pagination.pageSize}&name=${searcingstaff}&from=${intervaldatestaff.from}&to=${intervaldatestaff.to}`,
              {
                method: `GET`,
                headers: {
                  Authorization: JSON.parse(initProps),
                },
              }
            )
              .then((res) => res.json())
              .then((res2) => {
                setdataraw(res2.data);
                setDataSource(res2.data.data);
                setpraloading(false);
              });
          }
        }
      }}
    />
  );
};

const TableCustomTaskPick = ({
  dataSource,
  setDataSource,
  columns,
  loading,
  pageSize,
  total,
  setpraloading,
  initProps,
  setpage,
  pagefromsearch,
  setdataraw,
  sortstate,
  setsortstate,
  searchstate,
  tasktypefilterstate,
  fromdatefilterstate,
  todatefilterstate,
  lokasifilterstate,
}) => {
  return (
    <Table
      className="tableTypeTask"
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      scroll={{ x: 200 }}
      pagination={{
        current: pagefromsearch,
        pageSize: pageSize,
        total: total,
        onChange: (page, pageSize) => {
          setpraloading(true);
          setpage(page);
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTaskPickList?page=${page}&rows=${pageSize}&keyword=${searchstate}&task_type=${tasktypefilterstate}&location=${lokasifilterstate}&from=${fromdatefilterstate}&to=${todatefilterstate}&sort_by=${sortstate.sort_by}&sort_type=${sortstate.sort_type}`,
            {
              method: `GET`,
              headers: {
                Authorization: JSON.parse(initProps),
              },
            }
          )
            .then((res) => res.json())
            .then((res2) => {
              setdataraw(res2.data);
              setDataSource(res2.data.data);
              setpraloading(false);
            });
        },
      }}
      onChange={(pagination, filters, sorter, extra) => {
        if (extra.action === "sort") {
          if (sorter.column) {
            setpraloading(true);
            setsortstate({
              sort_by: sorter.column.dataIndex,
              sort_type: sorter.order === "ascend" ? "asc" : "desc",
            });
            fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTaskPickList?page=${
                pagination.current
              }&rows=${
                pagination.pageSize
              }&keyword=${searchstate}&task_type=${tasktypefilterstate}&location=${lokasifilterstate}&from=${fromdatefilterstate}&to=${todatefilterstate}&sort_by=${
                sorter.column.dataIndex
              }&sort_type=${sorter.order === "ascend" ? "asc" : "desc"}`,
              {
                method: `GET`,
                headers: {
                  Authorization: JSON.parse(initProps),
                },
              }
            )
              .then((res) => res.json())
              .then((res2) => {
                setdataraw(res2.data);
                setDataSource(res2.data.data);
                setpraloading(false);
              });
          } else {
            setpraloading(true);
            setsortstate({ sort_by: "", sort_type: "" });
            fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTaskPickList?page=${pagination.current}&rows=${pagination.pageSize}&keyword=${searchstate}&task_type=${tasktypefilterstate}&location=${lokasifilterstate}&from=${fromdatefilterstate}&to=${todatefilterstate}&sort_by=&sort_type=`,
              {
                method: `GET`,
                headers: {
                  Authorization: JSON.parse(initProps),
                },
              }
            )
              .then((res) => res.json())
              .then((res2) => {
                setdataraw(res2.data);
                setDataSource(res2.data.data);
                setpraloading(false);
              });
          }
        }
      }}
    />
  );
};

const TableCustomTicketTypes = ({
  dataSource,
  setDataSource,
  columns,
  loading,
  pageSize,
  total,
  setpraloading,
  initProps,
  setpage,
  pagefromsearch,
  setdataraw,
  setsorting,
  sorting,
  searching,
}) => {
  return (
    <Table
      className="tableTypeTask"
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      scroll={{ x: 200 }}
      pagination={{
        current: pagefromsearch,
        pageSize: pageSize,
        total: total,
        onChange: (page, pageSize) => {
          setpraloading(true);
          setpage(page);
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTicketTaskTypes?page=${page}&rows=${pageSize}&keyword=${searching}&sort_by=${sorting.sort_by}&sort_type=${sorting.sort_type}`,
            {
              method: `GET`,
              headers: {
                Authorization: JSON.parse(initProps),
              },
            }
          )
            .then((res) => res.json())
            .then((res2) => {
              setdataraw(res2.data);
              setDataSource(res2.data.data);
              setpraloading(false);
            });
        },
      }}
      onChange={(pagination, filters, sorter, extra) => {
        if (extra.action === "sort") {
          if (sorter.column) {
            setpraloading(true);
            setsorting({
              sort_by: sorter.column.dataIndex,
              sort_type: sorter.order === "ascend" ? "asc" : "desc",
            });
            fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTicketTaskTypes?page=${
                pagination.current
              }&rows=${pagination.pageSize}&keyword=${searching}&sort_by=${
                sorter.column.dataIndex
              }&sort_type=${sorter.order === "ascend" ? "asc" : "desc"}`,
              {
                method: `GET`,
                headers: {
                  Authorization: JSON.parse(initProps),
                },
              }
            )
              .then((res) => res.json())
              .then((res2) => {
                setdataraw(res2.data);
                setDataSource(res2.data.data);
                setpraloading(false);
              });
          } else {
            setpraloading(true);
            setsorting({ sort_by: "", sort_type: "" });
            fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTicketTaskTypes?page=${pagination.current}&rows=${pagination.pageSize}&keyword=${searching}&sort_by=&sort_type=`,
              {
                method: `GET`,
                headers: {
                  Authorization: JSON.parse(initProps),
                },
              }
            )
              .then((res) => res.json())
              .then((res2) => {
                setdataraw(res2.data);
                setDataSource(res2.data.data);
                setpraloading(false);
              });
          }
        }
      }}
    />
  );
};

const TableCustomTicketHistories = ({
  dataSource,
  setDataSource,
  columns,
  loading,
  pageSize,
  total,
  setpraloading,
  initProps,
  setpage,
  pagefromsearch,
  setdataraw,
  setsorting,
  sorting,
  searching,
  tickettype,
  fromdate,
  todate,
  location,
  fromres,
  tores,
}) => {
  const rt = useRouter();
  const [rowstate, setrowstate] = useState(0);
  return (
    <Table
      className="tableTypeTask"
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      scroll={{ x: 200 }}
      pagination={{
        current: pagefromsearch,
        pageSize: pageSize,
        total: total,
        onChange: (page, pageSize) => {
          setpraloading(true);
          setpage(page);
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/getClosedTickets?page=${page}&rows=${pageSize}&ticket_id=${searching}&from=${fromdate}&to=${todate}&location_id=${location}&from_res=${fromres}&to_res=${tores}&sort_by=${sorting.sort_by}&sort_type=${sorting.sort_type}`,
            {
              method: `GET`,
              headers: {
                Authorization: JSON.parse(initProps),
              },
            }
          )
            .then((res) => res.json())
            .then((res2) => {
              setdataraw(res2.data);
              setDataSource(res2.data.data);
              setpraloading(false);
            });
        },
      }}
      onChange={(pagination, filters, sorter, extra) => {
        if (extra.action === "sort") {
          if (sorter.column) {
            setpraloading(true);
            setsorting({
              sort_by: sorter.column.dataIndex,
              sort_type: sorter.order === "ascend" ? "asc" : "desc",
            });
            fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getClosedTickets?page=${
                pagination.current
              }&rows=${
                pagination.pageSize
              }&ticket_id=${searching}&from=${fromdate}&to=${todate}&location_id=${location}&from_res=${fromres}&to_res=${tores}&sort_by=${
                sorter.column.dataIndex
              }&sort_type=${sorter.order === "ascend" ? "asc" : "desc"}`,
              {
                method: `GET`,
                headers: {
                  Authorization: JSON.parse(initProps),
                },
              }
            )
              .then((res) => res.json())
              .then((res2) => {
                setdataraw(res2.data);
                setDataSource(res2.data.data);
                setpraloading(false);
              });
          } else {
            setpraloading(true);
            setsorting({ sort_by: "", sort_type: "" });
            fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getClosedTickets?page=${pagination.current}&rows=${pagination.pageSize}&ticket_id=${searching}&from=${fromdate}&to=${todate}&location_id=${location}&from_res=${fromres}&to_res=${tores}&sort_by=&sort_type=`,
              {
                method: `GET`,
                headers: {
                  Authorization: JSON.parse(initProps),
                },
              }
            )
              .then((res) => res.json())
              .then((res2) => {
                setdataraw(res2.data);
                setDataSource(res2.data.data);
                setpraloading(false);
              });
          }
        }
      }}
      onRow={(record, rowIndex) => {
        return {
          onMouseOver: (event) => {
            setrowstate(record.id);
          },
          onClick: (event) => {
            rt.push(`/tickets/detail/${record.id}`);
          },
        };
      }}
      rowClassName={(record, idx) => {
        return `${record.id === rowstate && `cursor-pointer`} ${
          record.status === 1 && `bg-bgBackdropOverdue`
        }`;
      }}
    />
  );
};

const TableCustomTickets = ({
  dataSource,
  columns,
  loading,
  total,
  queryParams,
  setQueryParams,
}) => {
  const rt = useRouter();
  const [rowstate, setrowstate] = useState(0);
  return (
    <Table
      className="tableTypeTask"
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      scroll={{ x: 200 }}
      pagination={{
        current: queryParams.page,
        pageSize: queryParams.rows,
        total: total,
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
      onRow={(record, rowIndex) => {
        return {
          onMouseOver: (event) => {
            setrowstate(record.id);
          },
          onClick: (event) => {
            rt.push(`/tickets/detail/${record.id}`);
          },
        };
      }}
      rowClassName={(record, idx) => {
        return `${record.id === rowstate && `cursor-pointer`} ${
          record.status === 1 && `bg-bgBackdropOverdue`
        }`;
      }}
    />
  );
};

const TableCustomRoleAssessment = ({
  dataSource,
  setDataSource,
  columns,
  loading,
  pageSize,
  setPageSize,
  total,
  setpraloading,
  initProps,
  setpage,
  pagefromsearch,
  setdataraw,
  setsorting,
  sorting,
  searching,
  onOpenReadDrawer,
}) => {
  const [rowstate, setrowstate] = useState(0);
  return (
    <Table
      className="tableRoleAssessment"
      dataSource={dataSource}
      rowKey={(record) => record.id}
      columns={columns}
      loading={loading}
      scroll={{ x: 200 }}
      pagination={{
        current: pagefromsearch,
        pageSize: pageSize,
        total: total,
        showSizeChanger: true,
        onShowSizeChange: (pagefromsearch, pageSize) => {
          setPageSize(pageSize);
        },
        onChange: (page, pageSize) => {
          setpraloading(true);
          setpage(page);
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAssessments?sort_by=${sorting.sort_by}&sort_type=${sorting.sort_type}&keyword=${searching}&page=${page}&rows=${pageSize}`,
            {
              method: `GET`,
              headers: {
                Authorization: JSON.parse(initProps),
              },
            }
          )
            .then((res) => res.json())
            .then((res2) => {
              setdataraw(res2.data);
              setDataSource(res2.data.data);
              setpraloading(false);
            });
        },
      }}
      onChange={(pagination, filters, sorter, extra) => {
        if (extra.action === "sort") {
          if (sorter.column) {
            setpraloading(true);
            setsorting({
              sort_by: sorter.column.dataIndex,
              sort_type: sorter.order === "ascend" ? "asc" : "desc",
            });
            fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAssessments?sort_by=${
                sorter.column.dataIndex
              }&sort_type=${
                sorter.order === "ascend" ? "asc" : "desc"
              }&keyword=${searching}&page=${pagination.current}&rows=${
                pagination.pageSize
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
                setdataraw(res2.data);
                setDataSource(res2.data.data);
                setpraloading(false);
              });
          } else {
            setpraloading(true);
            setsorting({ sort_by: "", sort_type: "" });
            fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAssessments?sort_by=&sort_type=&keyword=${searching}&page=${pagination.current}&rows=${pagination.pageSize}`,
              {
                method: `GET`,
                headers: {
                  Authorization: JSON.parse(initProps),
                },
              }
            )
              .then((res) => res.json())
              .then((res2) => {
                setdataraw(res2.data);
                setDataSource(res2.data.data);
                setpraloading(false);
              });
          }
        }
      }}
      onRow={(record, rowIndex) => {
        return {
          onMouseOver: (event) => {
            setrowstate(record.id);
          },
          onClick: (event) => {
            onOpenReadDrawer(record);
          },
        };
      }}
      rowClassName={(record, idx) => {
        return `${record.id === rowstate && `cursor-pointer`}
        }`;
      }}
    />
  );
};

const TableCustomCandidate = ({
  rt,
  dataSource,
  columns,
  loading,
  total,
  queryParams,
  setQueryParams,
}) => {
  const [rowstate, setrowstate] = useState(0);

  return (
    <Table
      rowKey={(record) => record.id}
      className="tableCandidate"
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      scroll={{ x: 200 }}
      pagination={{
        current: queryParams.page,
        pageSize: queryParams.rows,
        total: total,
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
      onRow={(record, rowIndex) => {
        return {
          onMouseOver: (event) => {
            setrowstate(record.id);
          },
          onClick: () => {
            rt.push(`candidates/${record.id}`);
          },
        };
      }}
      rowClassName={(record, idx) => {
        return `${record.id === rowstate && `cursor-pointer`}
        }`;
      }}
    />
  );
};

const TableCustomRecruitmentCandidate = ({
  dataSource,
  columns,
  loading,
  total,
  isBulk,
  setSelectedRecruitments,
  setSelectedRecruitmentIds,
  setDrawerShown,
  tempIdClicked,
  setTriggerRowClicked,
  queryParams,
  setQueryParams,
}) => {
  const rt = useRouter();
  const [rowstate, setrowstate] = useState(0);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRecruitments(selectedRows);
      setSelectedRecruitmentIds(selectedRowKeys);
    },
  };
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record.id}
      rowSelection={
        isBulk && {
          type: "checkbox",
          ...rowSelection,
        }
      }
      loading={loading}
      scroll={{ x: 200 }}
      pagination={{
        current: queryParams.page,
        pageSize: queryParams.rows,
        total: total,
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
      onRow={(record, rowIndex) => {
        return {
          onMouseOver: () => {
            setrowstate(record.id);
          },
          onClick: () => {
            !isBulk && setDrawerShown(true);
            tempIdClicked.current = record.id;
            setTriggerRowClicked((prev) => prev + 1);
          },
        };
      }}
      rowClassName={(record, idx) => {
        return `${record.id === rowstate && `cursor-pointer`}
        }`;
      }}
    />
  );
};

const TableCustomRecruitmentRole = ({
  dataSource,
  setDataSource,
  columns,
  loading,
  pageSize,
  total,
  setpraloading,
  initProps,
  setpage,
  pagefromsearch,
  setdataraw,
  setsorting,
  sorting,
  searching,
  roleTypeId,
}) => {
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record.id}
      loading={loading}
      scroll={{ x: 200 }}
      pagination={{
        current: pagefromsearch,
        pageSize: pageSize,
        total: total,
        onChange: (page, pageSize) => {
          setpraloading(true);
          setpage(page);
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentRoles?sort_by=${sorting.sort_by}&sort_type=${sorting.sort_type}&recruitment_role_type_id=${roleTypeId}&keyword=${searching}&rows=${pageSize}&page=${page}`,
            {
              method: `GET`,
              headers: {
                Authorization: JSON.parse(initProps),
              },
            }
          )
            .then((res) => res.json())
            .then((res2) => {
              setdataraw(res2.data);
              setDataSource(res2.data.data);
              setpraloading(false);
            });
        },
      }}
      onChange={(pagination, filters, sorter, extra) => {
        if (extra.action === "sort") {
          if (sorter.column) {
            setpraloading(true);
            setsorting({
              sort_by: sorter.column.dataIndex,
              sort_type: sorter.order === "ascend" ? "asc" : "desc",
            });
            fetch(
              `${
                process.env.NEXT_PUBLIC_BACKEND_URL
              }/getRecruitmentRoles?sort_by=${
                sorter.column.dataIndex
              }&sort_type=${
                sorter.order === "ascend" ? "asc" : "desc"
              }&recruitment_role_type_id=${roleTypeId}&keyword=${searching}&rows=${
                pagination.pageSize
              }&page=${pagination.current}`,
              {
                method: `GET`,
                headers: {
                  Authorization: JSON.parse(initProps),
                },
              }
            )
              .then((res) => res.json())
              .then((res2) => {
                setdataraw(res2.data);
                setDataSource(res2.data.data);
                setpraloading(false);
              })
              .catch((err) => {
                // console.log(err);
                notification.error({
                  message: `${err.message}`,
                  duration: 3,
                });
                setpraloading(false);
              });
          } else {
            setpraloading(true);
            setsorting({ sort_by: "", sort_type: "" });
            fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentRoles?sort_by=&sort_type=
                  &recruitment_role_type_id=${roleTypeId}&keyword=${searching}&rows=${pagination.pageSize}&page=${pagination.current}`,
              {
                method: `GET`,
                headers: {
                  Authorization: JSON.parse(initProps),
                },
              }
            )
              .then((res) => res.json())
              .then((res2) => {
                setdataraw(res2.data);
                setDataSource(res2.data.data);
                setpraloading(false);
              });
          }
        }
      }}
    />
  );
};

const TableCustomRecruitmentStatus = ({
  dataSource,
  setDataSource,
  columns,
  loading,
  pageSize,
  total,
  setpraloading,
  initProps,
  setpage,
  pagefromsearch,
  setdataraw,
  setsorting,
  sorting,
  searching,
  roleTypeId,
  onOpenReadDrawer,
}) => {
  const rt = useRouter();
  const [rowstate, setrowstate] = useState(0);
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record.id}
      loading={loading}
      scroll={{ x: 200 }}
      pagination={{
        current: pagefromsearch,
        pageSize: pageSize,
        total: total,
        onChange: (page, pageSize) => {
          setpraloading(true);
          setpage(page);
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentStatuses?sort_by=${sorting.sort_by}&sort_type=${sorting.sort_type}&keyword=${searching}&rows=${pageSize}&page=${page}`,
            {
              method: `GET`,
              headers: {
                Authorization: JSON.parse(initProps),
              },
            }
          )
            .then((res) => res.json())
            .then((res2) => {
              setdataraw(res2.data);
              setDataSource(res2.data.data);
              setpraloading(false);
            });
        },
      }}
      onChange={(pagination, filters, sorter, extra) => {
        if (extra.action === "sort") {
          if (sorter.column) {
            setpraloading(true);
            setsorting({
              sort_by: sorter.column.dataIndex,
              sort_type: sorter.order === "ascend" ? "asc" : "desc",
            });
            fetch(
              `${
                process.env.NEXT_PUBLIC_BACKEND_URL
              }/getRecruitmentStatuses?sort_by=${
                sorter.column.dataIndex
              }&sort_type=${
                sorter.order === "ascend" ? "asc" : "desc"
              }&keyword=${searching}&rows=${pagination.pageSize}&page=${
                pagination.current
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
                setdataraw(res2.data);
                setDataSource(res2.data.data);
                setpraloading(false);
              })
              .catch((err) => {
                // console.log(err);
                notification.error({
                  message: `${err.message}`,
                  duration: 3,
                });
                setpraloading(false);
              });
          } else {
            setpraloading(true);
            setsorting({ sort_by: "", sort_type: "" });
            fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentStatuses?sort_by=&sort_type=
                  &keyword=${searching}&rows=${pagination.pageSize}&page=${pagination.current}`,
              {
                method: `GET`,
                headers: {
                  Authorization: JSON.parse(initProps),
                },
              }
            )
              .then((res) => res.json())
              .then((res2) => {
                setdataraw(res2.data);
                setDataSource(res2.data.data);
                setpraloading(false);
              });
          }
        }
      }}
      onRow={(record, rowIndex) => {
        return {
          onMouseOver: (event) => {
            setrowstate(record.id);
          },
          onClick: (event) => {
            onOpenReadDrawer(record);
          },
        };
      }}
      rowClassName={(record, idx) => {
        return `${record.id === rowstate && `cursor-pointer`}
        }`;
      }}
    />
  );
};

const TableCustomRecruitmentStage = ({
  dataSource,
  setDataSource,
  columns,
  loading,
  pageSize,
  total,
  setpraloading,
  initProps,
  setpage,
  pagefromsearch,
  setdataraw,
  setsorting,
  sorting,
  searching,
  onOpenReadDrawer,
}) => {
  const [rowstate, setrowstate] = useState(0);
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record.id}
      loading={loading}
      scroll={{ x: 200 }}
      pagination={{
        current: pagefromsearch,
        pageSize: pageSize,
        total: total,
        onChange: (page, pageSize) => {
          setpraloading(true);
          setpage(page);
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentStages?sort_by=${sorting.sort_by}&sort_type=${sorting.sort_type}&keyword=${searching}&rows=${pageSize}&page=${page}`,
            {
              method: `GET`,
              headers: {
                Authorization: JSON.parse(initProps),
              },
            }
          )
            .then((res) => res.json())
            .then((res2) => {
              setdataraw(res2.data);
              setDataSource(res2.data.data);
              setpraloading(false);
            });
        },
      }}
      onChange={(pagination, filters, sorter, extra) => {
        if (extra.action === "sort") {
          if (sorter.column) {
            setpraloading(true);
            setsorting({
              sort_by: sorter.column.dataIndex,
              sort_type: sorter.order === "ascend" ? "asc" : "desc",
            });
            fetch(
              `${
                process.env.NEXT_PUBLIC_BACKEND_URL
              }/getRecruitmentStages?sort_by=${
                sorter.column.dataIndex
              }&sort_type=${
                sorter.order === "ascend" ? "asc" : "desc"
              }&keyword=${searching}&rows=${pagination.pageSize}&page=${
                pagination.current
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
                setdataraw(res2.data);
                setDataSource(res2.data.data);
                setpraloading(false);
              })
              .catch((err) => {
                // console.log(err);
                notification.error({
                  message: `${err.message}`,
                  duration: 3,
                });
                setpraloading(false);
              });
          } else {
            setpraloading(true);
            setsorting({ sort_by: "", sort_type: "" });
            fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentStages?sort_by=&sort_type=
                  &keyword=${searching}&rows=${pagination.pageSize}&page=${pagination.current}`,
              {
                method: `GET`,
                headers: {
                  Authorization: JSON.parse(initProps),
                },
              }
            )
              .then((res) => res.json())
              .then((res2) => {
                setdataraw(res2.data);
                setDataSource(res2.data.data);
                setpraloading(false);
              });
          }
        }
      }}
      onRow={(record, rowIndex) => {
        return {
          onMouseOver: (event) => {
            setrowstate(record.id);
          },
          onClick: (event) => {
            onOpenReadDrawer(record);
          },
        };
      }}
      rowClassName={(record, idx) => {
        return `${record.id === rowstate && `cursor-pointer`}
        }`;
      }}
    />
  );
};

const TableCustomRecruitmentRegistration = ({
  dataSource,
  setDataSource,
  columns,
  loading,
  pageSize,
  total,
  setpraloading,
  initProps,
  setpage,
  pagefromsearch,
  setdataraw,
  setsorting,
  sorting,
  searching,
  roleTypeId,
}) => {
  const rt = useRouter();
  const [rowstate, setrowstate] = useState(0);
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record.id}
      loading={loading}
      scroll={{ x: 200 }}
      pagination={{
        current: pagefromsearch,
        pageSize: pageSize,
        total: total,
        onChange: (page, pageSize) => {
          setpraloading(true);
          setpage(page);
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentJalurDaftars?sort_by=${sorting.sort_by}&sort_type=${sorting.sort_type}&keyword=${searching}&rows=${pageSize}&page=${page}`,
            {
              method: `GET`,
              headers: {
                Authorization: JSON.parse(initProps),
              },
            }
          )
            .then((res) => res.json())
            .then((res2) => {
              setdataraw(res2.data);
              setDataSource(res2.data.data);
              setpraloading(false);
            });
        },
      }}
      onChange={(pagination, filters, sorter, extra) => {
        if (extra.action === "sort") {
          if (sorter.column) {
            setpraloading(true);
            setsorting({
              sort_by: sorter.column.dataIndex,
              sort_type: sorter.order === "ascend" ? "asc" : "desc",
            });
            fetch(
              `${
                process.env.NEXT_PUBLIC_BACKEND_URL
              }/getRecruitmentJalurDaftars?sort_by=${
                sorter.column.dataIndex
              }&sort_type=${
                sorter.order === "ascend" ? "asc" : "desc"
              }&keyword=${searching}&rows=${pagination.pageSize}&page=${
                pagination.current
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
                setdataraw(res2.data);
                setDataSource(res2.data.data);
                setpraloading(false);
              })
              .catch((err) => {
                // console.log(err);
                notification.error({
                  message: `${err.message}`,
                  duration: 3,
                });
                setpraloading(false);
              });
          } else {
            setpraloading(true);
            setsorting({ sort_by: "", sort_type: "" });
            fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentJalurDaftars?sort_by=&sort_type=
                  &keyword=${searching}&rows=${pagination.pageSize}&page=${pagination.current}`,
              {
                method: `GET`,
                headers: {
                  Authorization: JSON.parse(initProps),
                },
              }
            )
              .then((res) => res.json())
              .then((res2) => {
                setdataraw(res2.data);
                setDataSource(res2.data.data);
                setpraloading(false);
              });
          }
        }
      }}
    />
  );
};

const TableCustomRecruitmentTemplateEmail = ({
  dataSource,
  setDataSource,
  columns,
  loading,
  pageSize,
  total,
  setpraloading,
  initProps,
  setpage,
  pagefromsearch,
  setdataraw,
  setsorting,
  sorting,
  searching,
  onOpenReadDrawer,
}) => {
  const [rowstate, setrowstate] = useState(0);
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record.id}
      loading={loading}
      scroll={{ x: 200 }}
      pagination={{
        current: pagefromsearch,
        pageSize: pageSize,
        total: total,
        onChange: (page, pageSize) => {
          setpraloading(true);
          setpage(page);
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentEmailTemplates?sort_by=${sorting.sort_by}&sort_type=${sorting.sort_type}&keyword=${searching}&rows=${pageSize}&page=${page}`,
            {
              method: `GET`,
              headers: {
                Authorization: JSON.parse(initProps),
              },
            }
          )
            .then((res) => res.json())
            .then((res2) => {
              setdataraw(res2.data);
              setDataSource(res2.data.data);
              setpraloading(false);
            });
        },
      }}
      onChange={(pagination, filters, sorter, extra) => {
        if (extra.action === "sort") {
          if (sorter.column) {
            setpraloading(true);
            setsorting({
              sort_by: sorter.column.dataIndex,
              sort_type: sorter.order === "ascend" ? "asc" : "desc",
            });
            fetch(
              `${
                process.env.NEXT_PUBLIC_BACKEND_URL
              }/getRecruitmentEmailTemplates?sort_by=${
                sorter.column.dataIndex
              }&sort_type=${
                sorter.order === "ascend" ? "asc" : "desc"
              }&keyword=${searching}&rows=${pagination.pageSize}&page=${
                pagination.current
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
                setdataraw(res2.data);
                setDataSource(res2.data.data);
                setpraloading(false);
              })
              .catch((err) => {
                notification.error({
                  message: `${err.message}`,
                  duration: 3,
                });
                setpraloading(false);
              });
          } else {
            setpraloading(true);
            setsorting({ sort_by: "", sort_type: "" });
            fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentEmailTemplates?sort_by=&sort_type=
                  &keyword=${searching}&rows=${pagination.pageSize}&page=${pagination.current}`,
              {
                method: `GET`,
                headers: {
                  Authorization: JSON.parse(initProps),
                },
              }
            )
              .then((res) => res.json())
              .then((res2) => {
                setdataraw(res2.data);
                setDataSource(res2.data.data);
                setpraloading(false);
              });
          }
        }
      }}
      onRow={(record, rowIndex) => {
        return {
          onMouseOver: (event) => {
            setrowstate(record.id);
          },
          onClick: (event) => {
            onOpenReadDrawer(record);
          },
        };
      }}
      rowClassName={(record, idx) => {
        return `${record.id === rowstate && `cursor-pointer`}
        }`;
      }}
    />
  );
};

const TableCustomEmployeeList = ({
  rt,
  dataSource,
  columns,
  loading,
  total,
  queryParams,
  setQueryParams,
}) => {
  const [rowstate, setrowstate] = useState(0);
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record.id}
      loading={loading}
      scroll={{ x: 200 }}
      pagination={{
        current: queryParams.page,
        pageSize: queryParams.rows,
        total: total,
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
      onRow={(record, rowIndex) => {
        return {
          onMouseOver: () => {
            setrowstate(record.id);
          },
          onClick: () => {
            record?.is_posted === 1
              ? rt.push(`/admin/employees/${record.id}`)
              : rt.push(`/admin/employees/create?id=${record.id}`);
          },
        };
      }}
      rowClassName={(record, idx) => {
        return `${record.id === rowstate && `cursor-pointer`}
        }`;
      }}
    />
  );
};

const TableCustomPayslipList = ({
  rt,
  dataSource,
  columns,
  loading,
  total,
  queryParams,
  setQueryParams,
}) => {
  const [rowstate, setrowstate] = useState(0);
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record.id}
      loading={loading}
      scroll={{ x: 200 }}
      pagination={{
        current: queryParams.page,
        pageSize: queryParams.rows,
        total: total,
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
      onRow={(record, rowIndex) => {
        return {
          onMouseOver: () => {
            setrowstate(record.id);
          },
          onClick: () => {
            record?.is_posted === 0
              ? rt.push(
                  `/admin/employees/payslip/${record?.contract?.employee_id}/addPayslip?id=${record.id}`
                )
              : rt.push(
                  `/admin/employees/payslip/${record?.contract?.employee_id}`
                );
          },
        };
      }}
      rowClassName={(record, idx) => {
        return `${record.id === rowstate && `cursor-pointer`}
        }`;
      }}
    />
  );
};

const TableCustomPayslipEmployeeList = ({
  rt,
  dataSource,
  columns,
  loading,
  total,
  queryParams,
  setQueryParams,
}) => {
  const [rowstate, setrowstate] = useState(0);
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record.id}
      loading={loading}
      scroll={{ x: 200 }}
      pagination={{
        current: queryParams.page,
        pageSize: queryParams.rows,
        total: total,
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
      onRow={(record, rowIndex) => {
        return {
          onMouseOver: () => {
            setrowstate(record.id);
          },
          onClick: () => {
            record?.is_posted === 0 &&
              record.id &&
              rt.push(
                `/admin/employees/payslip/${record.employee_id}/addPayslip?id=${record.id}`
              );
          },
        };
      }}
      rowClassName={(record, idx) => {
        return `${record.id === rowstate && `cursor-pointer`}
        }`;
      }}
    />
  );
};

const TableCustomProjectList = ({
  rt,
  dataSource,
  columns,
  loading,
  total,
  queryParams,
  setQueryParams,
}) => {
  const [rowstate, setrowstate] = useState(0);
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record.id}
      loading={loading}
      scroll={{ x: 200 }}
      pagination={{
        current: queryParams.page,
        pageSize: queryParams.rows,
        total: total,
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
      onRow={(record, rowIndex) => {
        return {
          onMouseOver: () => {
            setrowstate(record.id);
          },
          onClick: () => {
            record.id && rt.push(`/projects/${record.id}`);
          },
        };
      }}
      rowClassName={(record, idx) => {
        return `${record.id === rowstate && `cursor-pointer`}
        }`;
      }}
    />
  );
};

const TableCustomTaskList = ({
  dataSource,
  columns,
  loading,
  total,
  queryParams,
  setQueryParams,
  sortTable,
  onOpenModal,
}) => {
  const [rowstate, setrowstate] = useState(0);
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record.id}
      loading={loading}
      scroll={{ x: 200 }}
      pagination={{
        current: queryParams.page,
        pageSize: queryParams.rows,
        total: total,
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
          sort_type: sortTable.sort_type || sortTypePayload,
          sort_by:
            sortTable.sort_by ||
            (sortTypePayload === undefined ? undefined : sorter.field),
          page: pagination.current,
          rows: pagination.pageSize,
        });
      }}
      onRow={(record, rowIndex) => {
        return {
          onMouseOver: () => {
            setrowstate(record.id);
          },
          onClick: () => {
            onOpenModal(record.id);
          },
        };
      }}
      rowClassName={(record, idx) => {
        return `${record.id === rowstate && `cursor-pointer`}
        }`;
      }}
    />
  );
};

const TableCustomContractList = ({
  rt,
  dataSource,
  columns,
  loading,
  total,
  queryParams,
  setQueryParams,
}) => {
  const [rowstate, setrowstate] = useState(0);
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record.id}
      loading={loading}
      scroll={{ x: 200 }}
      pagination={{
        current: queryParams.page,
        pageSize: queryParams.rows,
        total: total,
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
      onRow={(record, rowIndex) => {
        return {
          onMouseOver: () => {
            setrowstate(record.id);
          },
          onClick: () => {
            record.id &&
              record.is_posted &&
              rt.push(`/admin/contracts/${record.id}`);
          },
        };
      }}
      rowClassName={(record, idx) => {
        return `${record.id === rowstate && `cursor-pointer`}
        }`;
      }}
    />
  );
};

const TableCustomInvoiceList = ({
  rt,
  dataSource,
  columns,
  loading,
  total,
  queryParams,
  setQueryParams,
}) => {
  const [rowstate, setrowstate] = useState(0);
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record.id}
      loading={loading}
      scroll={{ x: 200 }}
      pagination={{
        current: queryParams.page,
        pageSize: queryParams.rows,
        total: total,
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
      onRow={(record, rowIndex) => {
        return {
          onMouseOver: () => {
            setrowstate(record.id);
          },
          onClick: () => {
            record.id && rt.push(`invoice/${record.id}`);
          },
        };
      }}
      rowClassName={(record, idx) => {
        return `${record.id === rowstate && `cursor-pointer`}
        }`;
      }}
    />
  );
};

export {
  TableCustom,
  TableCustomRelasi,
  TableCustomTipeTask,
  TableCustomTask,
  TableCustomAdminTask,
  TableCustomStaffTask,
  TableCustomTaskPick,
  TableCustomTicketTypes,
  TableCustomTicketHistories,
  TableCustomTickets,
  TableCustomRoleAssessment,
  TableCustomCandidate,
  TableCustomRecruitmentCandidate,
  TableCustomRecruitmentRole,
  TableCustomRecruitmentStage,
  TableCustomRecruitmentStatus,
  TableCustomRecruitmentRegistration,
  TableCustomRecruitmentTemplateEmail,
  TableCustomEmployeeList,
  TableCustomPayslipList,
  TableCustomPayslipEmployeeList,
  TableCustomProjectList,
  TableCustomTaskList,
  TableCustomContractList,
  TableCustomInvoiceList,
};
