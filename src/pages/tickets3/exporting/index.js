import Layout from "../../../components/layout-dashboard2";
import st from "../../../components/layout-dashboard.module.css";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Divider, Empty, Select } from "antd";
import httpcookie from "cookie";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const TicketExporting = ({ initProps, dataProfile, sidemenu }) => {
  // 1.Init
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  const CheckboxGroup = Checkbox.Group;
  const { closed } = rt.query;

  //useState
  const [displaydata, setdisplaydata] = useState({
    group: [],
    engineer: [],
  });
  const [attr, setattr] = useState({
    group: null,
    engineer: null,
    type: null,
    from: "",
    to: "",
    core_attributes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
    secondary_attributes: [1, 1, 1, 1, 1, 1, 1, 1],
  });
  const [praloading, setpraloading] = useState(true);
  //checkbox
  //core attr
  const [coreopt, setcoreopt] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [defaultcoreopt, setdefaultcoreopt] = useState([
    1, 2, 3, 4, 5, 6, 7, 8,
  ]);
  const [indeterminatecore, setIndeterminatecore] = React.useState(false);
  const [checkAllcore, setCheckAllcore] = React.useState(true);
  const onChangecore = (list) => {
    console.log(list);
    setdefaultcoreopt(list);
    setIndeterminatecore(!!list.length && list.length < coreopt.length);
    setCheckAllcore(list.length === coreopt.length);
    var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, idx) =>
      list.includes(idx) ? 1 : 0
    );
    setattr({ ...attr, core_attributes: arr });
  };
  const onCheckAllChangecore = (e) => {
    setdefaultcoreopt(e.target.checked ? coreopt : []);
    setIndeterminatecore(false);
    setCheckAllcore(e.target.checked);
    var arr = [1, 1, 1, 1, 1, 1, 1, 1, 1],
      arr2 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    setattr({ ...attr, core_attributes: e.target.checked ? arr : arr2 });
  };
  //secondary attr
  const [secopt, setsecopt] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [defaultsecopt, setdefaultsecopt] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [indeterminatesec, setIndeterminatesec] = React.useState(false);
  const [checkAllsec, setCheckAllsec] = React.useState(true);
  const onChangesec = (list) => {
    setdefaultsecopt(list);
    setIndeterminatesec(!!list.length && list.length < secopt.length);
    setCheckAllsec(list.length === secopt.length);
    var arr = [0, 0, 0, 0, 0, 0, 0, 0].map((_, idx) =>
      list.includes(idx) ? 1 : 0
    );
    setattr({ ...attr, secondary_attributes: arr });
  };
  const onCheckAllChangesec = (e) => {
    setdefaultsecopt(e.target.checked ? secopt : []);
    setIndeterminatesec(false);
    setCheckAllsec(e.target.checked);
    var arr = [1, 1, 1, 1, 1, 1, 1, 1],
      arr2 = [0, 0, 0, 0, 0, 0, 0, 0];
    setattr({ ...attr, secondary_attributes: e.target.checked ? arr : arr2 });
  };
  const handleExport = () => {
    // console.log(`https://boiling-thicket-46501.herokuapp.com/downloadTickets?group=${attr.group === null ? "" : attr.group}&engineer=${attr.engineer === null ? "" : attr.engineer}&type=${attr.type === null ? null : attr.type}&from=${attr.from}&to=${attr.to}&core_attributes=[${attr.core_attributes}]&secondary_attributes=[${attr.secondary_attributes}]`)
    fetch(
      `https://boiling-thicket-46501.herokuapp.com/ticketsExport?group=${
        attr.group === null ? "" : attr.group
      }&engineer=${attr.engineer === null ? "" : attr.engineer}&type=${
        attr.type === null ? null : attr.type
      }&from=${attr.from}&to=${attr.to}&core_attributes=[${
        attr.core_attributes
      }]&secondary_attributes=[${attr.secondary_attributes}]${
        closed === "1" ? `&is_history=1` : `&is_history=0`
      }`,
      {
        method: "GET",
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.blob())
      .then((res2) => {
        var newBlob = new Blob([res2], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement("a");
        link.href = data;
        link.download = `${moment(new Date())
          .locale("id")
          .format("L")}-${moment(new Date()).locale("id").format("LT")}.xlsx`;
        link.click();
        setTimeout(function () {
          window.URL.revokeObjectURL(data);
        });
      });
  };

  useEffect(() => {
    fetch(
      `https://boiling-thicket-46501.herokuapp.com/getAssignToList?assignable_type=${0}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        fetch(
          `https://boiling-thicket-46501.herokuapp.com/getAssignToList?assignable_type=${1}`,
          {
            method: `GET`,
            headers: {
              Authorization: JSON.parse(initProps),
            },
          }
        )
          .then((res3) => res3.json())
          .then((res4) => {
            setdisplaydata({
              group: res2.data,
              engineer: res4.data,
            });
            setpraloading(false);
          });
      });
  }, []);

  return (
    <Layout
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
    >
      <div className=" w-full grid grid-cols-1 md:grid-cols-4 border-t border-b bg-white mb-5 px-4 py-5">
        <div className=" col-span-1 md:col-span-3 flex items-center mb-2 md:mb-0">
          <div className="font-bold text-2xl w-auto">
            Export Tickets {closed === "1" && `(Closed)`}
          </div>
        </div>
        <div className=" col-span-1 md:col-span-1 flex md:justify-end items-center">
          <Button
            size="large"
            onClick={() => {
              rt.push(`/tickets`);
            }}
            type="default"
            style={{ marginRight: `1rem` }}
          >
            Batal
          </Button>
          {/* <a href={`https://boiling-thicket-46501.herokuapp.com/downloadTickets`}> */}
          <Button
            size="large"
            type="primary"
            style={{ marginRight: `1rem` }}
            onClick={handleExport}
          >
            Unduh
          </Button>
          {/* </a> */}
        </div>
      </div>
      <div className="h-auto w-full grid grid-cols-1 md:grid-cols-5 mb-5 bg-white rounded-md">
        <div className="md:col-span-5 col-span-1 flex flex-col py-3">
          <h1 className="font-semibold text-base mb-3">Filter Ticket by</h1>
          <div className="border-2 shadow-md rounded-md flex flex-col py-5 px-10 mb-9 w-9/12">
            <div className="flex flex-col mb-5">
              <h1 className="text-sm font-semibold mb-2">Rentang Waktu</h1>
              <DatePicker.RangePicker
                onChange={(dates, datestrings) => {
                  if (datestrings[0] === "" && datestrings[1] === "") {
                    setattr({ ...attr, from: "", to: "" });
                  } else {
                    setattr({
                      ...attr,
                      from: moment(datestrings[0])
                        .locale("id")
                        .format("YYYY-MM-DD"),
                      to: moment(datestrings[1])
                        .locale("id")
                        .format("YYYY-MM-DD"),
                    });
                  }
                }}
              ></DatePicker.RangePicker>
            </div>
            <div className="flex flex-col mb-5">
              <p className="mb-2 font-semibold text-sm">Group</p>
              <Select
                loading={praloading}
                onChange={(value) => {
                  setattr({
                    ...attr,
                    group: Number(value),
                  });
                }}
              >
                {displaydata.group.map((doc, idx) => {
                  return (
                    <Select.Option value={doc.id}>{doc.name}</Select.Option>
                  );
                })}
              </Select>
            </div>
            <div className="flex flex-col mb-5">
              <p className="mb-2 font-semibold text-sm">Engineer</p>
              <Select
                loading={praloading}
                onChange={(value) => {
                  setattr({
                    ...attr,
                    engineer: Number(value),
                  });
                }}
              >
                {displaydata.engineer.map((doc, idx) => {
                  return (
                    <Select.Option value={doc.id}>{doc.name}</Select.Option>
                  );
                })}
              </Select>
            </div>
          </div>
        </div>
        <div className="md:col-span-5 col-span-1 flex flex-col py-3">
          <h1 className="font-semibold text-base mb-3">Export Field</h1>
          <Select
            allowClear
            placeholder="Pilih Tipe Ticket"
            style={{ marginBottom: `1rem`, width: `25%` }}
            onChange={(value) => {
              console.log(value);
              setattr({
                ...attr,
                type: typeof value === "undefined" ? null : value,
              });
            }}
          >
            <Select.Option value={1}>Incident</Select.Option>
            {/* <Select.Option value={2}>Service Request</Select.Option> */}
          </Select>
          <div className="flex flex-col mb-4">
            <div className="font-semibold w-9/12 border-b mb-3">
              Atribut Utama
            </div>
            <Checkbox
              style={{ marginBottom: `0.5rem` }}
              indeterminate={indeterminatecore}
              onChange={onCheckAllChangecore}
              checked={checkAllcore}
            >
              <strong>Pilih Semua</strong>
            </Checkbox>
            <CheckboxGroup value={defaultcoreopt} onChange={onChangecore}>
              <div className=" w-9/12 grid grid-cols-1 md:grid-cols-3 mr-5">
                <Checkbox
                  value={coreopt[0]}
                  style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}
                >
                  Nama Pembuat
                </Checkbox>
                <Checkbox
                  value={coreopt[1]}
                  style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}
                >
                  Lokasi Pembuat
                </Checkbox>
                <Checkbox
                  value={coreopt[2]}
                  style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}
                >
                  Data Raised Ticket
                </Checkbox>
                <Checkbox
                  value={coreopt[3]}
                  style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}
                >
                  Data Closed Ticket
                </Checkbox>
                <Checkbox
                  value={coreopt[4]}
                  style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}
                >
                  Ticket Number
                </Checkbox>
                <Checkbox
                  value={coreopt[5]}
                  style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}
                >
                  Ticket Type
                </Checkbox>
                <Checkbox
                  value={coreopt[6]}
                  style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}
                >
                  Status Ticket
                </Checkbox>
                <Checkbox
                  value={coreopt[7]}
                  style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}
                >
                  Assign To
                </Checkbox>
              </div>
            </CheckboxGroup>
          </div>
          <div className="flex flex-col mb-4 w-9/12">
            <div className="font-semibold w-full border-b mb-3">
              Atribut Tambahan
            </div>
            {attr.type === null ? (
              <>
                <Empty
                  image={Empty.PRESENTED_IMAGE_DEFAULT}
                  description="Jika Tipe Ticket tidak dipilih, akan menampilkan semua field"
                />
              </>
            ) : (
              <>
                <Checkbox
                  style={{ marginBottom: `0.5rem` }}
                  indeterminate={indeterminatesec}
                  onChange={onCheckAllChangesec}
                  checked={checkAllsec}
                >
                  <strong>Pilih Semua</strong>
                </Checkbox>
                <CheckboxGroup value={defaultsecopt} onChange={onChangesec}>
                  <div className=" w-9/12 grid grid-cols-1 md:grid-cols-3 mr-5">
                    <Checkbox
                      value={secopt[0]}
                      style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}
                    >
                      Jenis Produk
                    </Checkbox>
                    <Checkbox
                      value={secopt[1]}
                      style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}
                    >
                      ID Produk
                    </Checkbox>
                    <Checkbox
                      value={secopt[2]}
                      style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}
                    >
                      Nama PIC
                    </Checkbox>
                    <Checkbox
                      value={secopt[3]}
                      style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}
                    >
                      Kontak PIC
                    </Checkbox>
                    <Checkbox
                      value={secopt[4]}
                      style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}
                    >
                      Problem
                    </Checkbox>
                    <Checkbox
                      value={secopt[5]}
                      style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}
                    >
                      Lokasi Problem
                    </Checkbox>
                    <Checkbox
                      value={secopt[6]}
                      style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}
                    >
                      Waktu Kejadian
                    </Checkbox>
                  </div>
                </CheckboxGroup>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ req, res }) {
  var initProps = {};
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
    `https://boiling-thicket-46501.herokuapp.com/detailProfile`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGP = await resourcesGP.json();
  const dataProfile = resjsonGP;

  // if (![107, 108, 109, 110, 111, 112, 132].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
  //     res.writeHead(302, { Location: '/dashboard/admin' })
  //     res.end()
  // }

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "2",
    },
  };
}

export default TicketExporting;

{
  /* <Checkbox style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}>Resolved Time</Checkbox> */
}
{
  /* <Checkbox style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}>Deskripsi Kejadian</Checkbox> */
}
