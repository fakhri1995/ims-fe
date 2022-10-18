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
        // console.log('params', pagination, filters, sorter, extra);
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
  searchstate,
  setsortstate,
  tasktypefilterstate,
  fromdatefilterstate,
  todatefilterstate,
  lokasifilterstate,
  statusfilterstate,
  prevpath,
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
        current: pagefromsearch,
        pageSize: pageSize,
        total: total,
        onChange: (page, pageSize) => {
          setpraloading(true);
          setpage(page);
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserTasks?page=${page}&rows=${pageSize}&sort_by=${sortstate.sort_by}&sort_type=${sortstate.sort_type}&keyword=${searchstate}&task_type=${tasktypefilterstate}&location=${lokasifilterstate}&from=${fromdatefilterstate}&to=${todatefilterstate}&status=[${statusfilterstate}]`,
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
        // console.log('params', pagination, filters, sorter, extra, pagefromsearch, searchstate);
        if (extra.action === "sort") {
          if (sorter.column) {
            setpraloading(true);
            setsortstate({
              sort_by: sorter.column.dataIndex,
              sort_type: sorter.order === "ascend" ? "asc" : "desc",
            });
            fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserTasks?page=${
                pagination.current
              }&rows=${pagination.pageSize}&sort_by=${
                sorter.column.dataIndex
              }&sort_type=${
                sorter.order === "ascend" ? "asc" : "desc"
              }&keyword=${searchstate}&task_type=${tasktypefilterstate}&location=${lokasifilterstate}&from=${fromdatefilterstate}&to=${todatefilterstate}&status=[${statusfilterstate}]`,
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
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserTasks?page=${pagination.current}&rows=${pagination.pageSize}&sort_by=&sort_type=&keyword=${searchstate}&task_type=${tasktypefilterstate}&location=${lokasifilterstate}&from=${fromdatefilterstate}&to=${todatefilterstate}&status=[${statusfilterstate}]`,
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

const TableCustomAdminTask = ({
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
  searchstate,
  setsortstate,
  tasktypefilterstate,
  fromdatefilterstate,
  todatefilterstate,
  lokasifilterstate,
  statusfilterstate,
  prevpath,
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
        current: pagefromsearch,
        pageSize: pageSize,
        total: total,
        onChange: (page, pageSize) => {
          setpraloading(true);
          setpage(page);
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTasks?page=${page}&rows=${pageSize}&sort_by=${sortstate.sort_by}&sort_type=${sortstate.sort_type}&keyword=${searchstate}&task_type=${tasktypefilterstate}&location=${lokasifilterstate}&from=${fromdatefilterstate}&to=${todatefilterstate}&status=[${statusfilterstate}]`,
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
        // console.log('params', pagination, filters, sorter, extra, pagefromsearch, searchstate);
        if (extra.action === "sort") {
          if (sorter.column) {
            setpraloading(true);
            setsortstate({
              sort_by: sorter.column.dataIndex,
              sort_type: sorter.order === "ascend" ? "asc" : "desc",
            });
            fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTasks?page=${
                pagination.current
              }&rows=${pagination.pageSize}&sort_by=${
                sorter.column.dataIndex
              }&sort_type=${
                sorter.order === "ascend" ? "asc" : "desc"
              }&keyword=${searchstate}&task_type=${tasktypefilterstate}&location=${lokasifilterstate}&from=${fromdatefilterstate}&to=${todatefilterstate}&status=[${statusfilterstate}]`,
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
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTasks?page=${pagination.current}&rows=${pagination.pageSize}&sort_by=&sort_type=&keyword=${searchstate}&task_type=${tasktypefilterstate}&location=${lokasifilterstate}&from=${fromdatefilterstate}&to=${todatefilterstate}&status=[${statusfilterstate}]`,
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
        // console.log('params', pagination, filters, sorter, extra);
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
  status,
  dataprofile,
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
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/${
              dataprofile.data.role === 1 ? `getTickets` : `getClientTickets`
            }?page=${page}&rows=${pageSize}&ticket_id=${searching}&type_id=${tickettype}&from=${fromdate}&to=${todate}&location_id=${location}&status_id=${status}&sort_by=${
              sorting.sort_by
            }&sort_type=${sorting.sort_type}`,
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
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/${
                dataprofile.data.role === 1 ? `getTickets` : `getClientTickets`
              }?page=${pagination.current}&rows=${
                pagination.pageSize
              }&ticket_id=${searching}&type_id=${tickettype}&from=${fromdate}&to=${todate}&location_id=${location}&status_id=${status}&sort_by=${
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
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/${
                dataprofile.data.role === 1 ? `getTickets` : `getClientTickets`
              }?page=${pagination.current}&rows=${
                pagination.pageSize
              }&ticket_id=${searching}&type_id=${tickettype}&from=${fromdate}&to=${todate}&location_id=${location}&status_id=${status}&sort_by=&sort_type=`,
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

const TableCustomRoleAssessment = ({
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
      className="tableRoleAssessment"
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
  assessmentIds,
}) => {
  const rt = useRouter();
  const [rowstate, setrowstate] = useState(0);
  return (
    <Table
      className="tableCandidate"
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
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/getResumes?sort_by=${sorting.sort_by}&sort_type=${sorting.sort_type}&keyword=${searching}&page=${page}&rows=${pageSize}&assessment_ids=${assessmentIds}`,
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
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getResumes?sort_by=${
                sorter.column.dataIndex
              }&sort_type=${
                sorter.order === "ascend" ? "asc" : "desc"
              }&keyword=${searching}&page=${pagination.current}&rows=${
                pagination.pageSize
              }&assessment_ids=${assessmentIds}`,
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
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getResumes?sort_by=&sort_type=&keyword=${searching}&page=${pagination.current}&rows=${pagination.pageSize}&assessment_ids=${assessmentIds}`,
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
            rt.push(`/admin/candidates/${record.id}`);
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
  selectedRoleId,
  selectedStage,
  selectedStatus,
  isBulk,
  setSelectedRecruitments,
}) => {
  const rt = useRouter();
  const [rowstate, setrowstate] = useState(0);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRecruitments(selectedRows);
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === 'Disabled User',
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
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
        current: pagefromsearch,
        pageSize: pageSize,
        total: total,
        onChange: (page, pageSize) => {
          setpraloading(true);
          setpage(page);
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitments?recruitment_role_id=${selectedRoleId}&recruitment_stage_id=${selectedStage}&recruitment_status_id=${selectedStatus}&sort_by=${sorting.sort_by}&sort_type=${sorting.sort_type}&keyword=${searching}&page=${page}&rows=${pageSize}`,
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
              }/getRecruitments?recruitment_role_id=${selectedRoleId}&recruitment_stage_id=${selectedStage}&recruitment_status_id=${selectedStatus}&sort_by=${
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
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitments?recruitment_role_id=${selectedRoleId}&recruitment_stage_id=${selectedStage}&recruitment_status_id=${selectedStatus}&sort_by=&sort_type=&keyword=${searching}&page=${pagination.current}&rows=${pagination.pageSize}`,
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
          onMouseOver: () => {
            setrowstate(record.id);
          },
          // onClick: () => {
          //   rt.push(`/admin/recruitment/${record.id}`);
          // },
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
  TableCustomRecruitmentTemplateEmail,
};
