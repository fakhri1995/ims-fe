import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Input,
  Select,
  Spin,
  TreeSelect,
  notification,
} from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import moment from "moment";
import React, { useEffect, useState } from "react";

import ButtonSys from "../../button";
import {
  AssetIconSvg,
  CalendartimeIconSvg,
  CircleXIconSvg,
  CloudUploadIconSvg,
  TrashIconSvg,
  UserIconSvg,
} from "../../icon";
import {
  InputRequired,
  SelectRequired,
  TextAreaNotRequired,
} from "../../input";
import { H1, H2, Label, Text } from "../../typography";
import DrawerCore from "../drawerCore";

const DrawerTicketExports = ({
  title,
  visible,
  onvisible,
  onClose,
  buttonOkText,
  disabled,
  initProps,
  refreshtickets,
  setrefreshtickets,
  dataprofile,
}) => {
  //useState
  const [datapayload, setdatapayload] = useState({
    group: null,
    engineer: null,
    type: null,
    from: "",
    to: "",
    core_attributes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
    secondary_attributes: [1, 1, 1, 1, 1, 1, 1, 1],
  });
  const [loadingsave, setloadingsave] = useState(false);
  const [listengs, setlistengs] = useState([]);
  const [fecthingengs, setfecthingengs] = useState(false);
  const [listgroups, setlistgroups] = useState([]);
  const [fecthinggroups, setfecthinggroups] = useState(false);
  //core attributes
  const [coreopt, setcoreopt] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [valuecoreopt, setvaluecoreopt] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  //second attributes
  const [secondopt, setsecondopt] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [valuesecondopt, setvaluesecondopt] = useState([1, 2, 3, 4, 5, 6, 7]);
  //disabled save button
  const [disabledcreate, setdisabledcreate] = useState(false);
  const [disabledtrigger, setdisabledtrigger] = useState(-1);

  //handler
  const handleExports = () => {
    fetch(
      `https://boiling-thicket-46501.herokuapp.com/ticketsExport?group=${
        datapayload.group === null ? "" : datapayload.group
      }&engineer=${
        datapayload.engineer === null ? "" : datapayload.engineer
      }&type=${datapayload.type === null ? null : datapayload.type}&from=${
        datapayload.from
      }&to=${datapayload.to}&core_attributes=[${
        datapayload.core_attributes
      }]&secondary_attributes=[${
        datapayload.secondary_attributes
      }]&is_history=0`,
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

  //useEffect
  useEffect(() => {
    fetch(`https://boiling-thicket-46501.herokuapp.com/getFilterGroups`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setlistgroups(res2.data);
      });
  }, []);
  useEffect(() => {
    fetch(
      `https://boiling-thicket-46501.herokuapp.com/getFilterUsers?type=${1}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setlistengs(res2.data);
      });
  }, []);
  useEffect(() => {
    if (datapayload.core_attributes.every((val) => val === 0) === false) {
      setdisabledcreate(false);
    } else {
      setdisabledcreate(true);
    }
  }, [disabledtrigger]);

  return (
    <DrawerCore
      title={title}
      visible={visible}
      onClose={() => {
        setdatapayload({
          group: null,
          engineer: null,
          type: null,
          from: "",
          to: "",
          core_attributes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
          secondary_attributes: [1, 1, 1, 1, 1, 1, 1, 1],
        });
        onvisible(false);
      }}
      buttonOkText={buttonOkText}
      onClick={() => {
        console.log(datapayload);
        handleExports();
      }}
      disabled={disabledcreate}
    >
      {loadingsave ? (
        <>
          <Spin />
        </>
      ) : (
        <div className="flex flex-col">
          <div className="mb-6">
            <p className="mb-0 text-red-500 text-xs italic">
              *Informasi ini harus diisi
            </p>
          </div>
          <div className="mb-6">
            <H2>Pilih Filter:</H2>
          </div>
          <div className="flex flex-col mb-6">
            <div className="flex mb-2">
              <Label>Rentang Waktu</Label>
            </div>
            <div className=" mb-2 flex">
              <DatePicker.RangePicker
                style={{ width: `100%` }}
                allowClear
                className="datepickerStatus"
                onChange={(dates, datestrings) => {
                  if (datestrings[0] === "" && datestrings[1] === "") {
                    setdatapayload({ ...datapayload, from: "", to: "" });
                  } else {
                    setdatapayload({
                      ...datapayload,
                      from: moment(datestrings[0])
                        .locale("id")
                        .format("YYYY-MM-DD"),
                      to: moment(datestrings[1])
                        .locale("id")
                        .format("YYYY-MM-DD"),
                    });
                  }
                }}
              />
            </div>
          </div>
          <div className="flex flex-col mb-6">
            <div className="flex mb-2">
              <Label>Grup</Label>
            </div>
            <div className=" mb-2 flex">
              <Select
                style={{ width: `100%` }}
                placeholder="Nama Grup..."
                suffixIcon={<SearchOutlined />}
                showArrow
                allowClear
                onChange={(value, option) => {
                  setdatapayload({
                    ...datapayload,
                    group: typeof value === "undefined" ? null : Number(value),
                  });
                }}
                showSearch
                optionFilterProp="children"
                notFoundContent={fecthinggroups ? <Spin size="small" /> : null}
                onSearch={(value) => {
                  setfecthinggroups(true);
                  fetch(
                    `https://boiling-thicket-46501.herokuapp.com/getFilterGroups?name=${value}`,
                    {
                      method: `GET`,
                      headers: {
                        Authorization: JSON.parse(initProps),
                      },
                    }
                  )
                    .then((res) => res.json())
                    .then((res2) => {
                      setlistgroups(res2.data);
                      setfecthinggroups(false);
                    });
                }}
              >
                {listgroups.map((doc, idx) => (
                  <Select.Option key={idx} value={doc.id}>
                    <div className=" flex items-center">
                      <div className="mr-2">
                        <UserIconSvg />
                      </div>
                      <div>{doc.name}</div>
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex flex-col mb-6">
            <div className="flex mb-2">
              <Label>Engineer</Label>
            </div>
            <div className=" mb-2 flex">
              <Select
                style={{ width: `100%` }}
                placeholder="Nama Engineer..."
                suffixIcon={<SearchOutlined />}
                showArrow
                allowClear
                onChange={(value, option) => {
                  setdatapayload({
                    ...datapayload,
                    engineer:
                      typeof value === "undefined" ? null : Number(value),
                  });
                }}
                showSearch
                optionFilterProp="children"
                notFoundContent={fecthingengs ? <Spin size="small" /> : null}
                onSearch={(value) => {
                  setfecthingengs(true);
                  fetch(
                    `https://boiling-thicket-46501.herokuapp.com/getFilterUsers?type=${1}&name=${value}`,
                    {
                      method: `GET`,
                      headers: {
                        Authorization: JSON.parse(initProps),
                      },
                    }
                  )
                    .then((res) => res.json())
                    .then((res2) => {
                      setlistengs(res2.data);
                      setfecthingengs(false);
                    });
                }}
              >
                {listengs.map((doc, idx) => (
                  <Select.Option key={idx} value={doc.id}>
                    <div className=" flex items-center">
                      <div className="mr-1 w-7 h7 rounded-full">
                        <img
                          src={
                            doc.profile_image === "-"
                              ? `/image/stafftask.png`
                              : doc.profile_image
                          }
                          className=" object-contain"
                          alt=""
                        />
                      </div>
                      <div>{doc.name}</div>
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex flex-col mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex">
                <Label>Pilih Parameter Detail Tiket</Label>
                <span className="core"></span>
              </div>
              <div
                onClick={() => {
                  setvaluecoreopt(coreopt);
                  var arr = [1, 1, 1, 1, 1, 1, 1, 1, 1];
                  setdatapayload({ ...datapayload, core_attributes: arr });
                }}
              >
                <Text color={`green`} cursor={`pointer`}>
                  Pilih Semua
                </Text>
              </div>
              <style jsx>
                {`
                                        .core::before{
                                            content: '*';
                                            color: red;
                                        }
                                    `}
              </style>
            </div>
            <div className="mb-2 flex">
              <Checkbox.Group
                onChange={(values) => {
                  setvaluecoreopt(values);
                  var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, idx) =>
                    values.includes(idx) ? 1 : 0
                  );
                  setdatapayload({ ...datapayload, core_attributes: arr });
                  setdisabledtrigger((prev) => prev + 1);
                }}
                value={valuecoreopt}
              >
                <div className="flex flex-col">
                  <div className="mb-1">
                    <Checkbox value={coreopt[0]}>No Tiket</Checkbox>
                  </div>
                  <div className="mb-1">
                    <Checkbox value={coreopt[1]}>Nama Pembuat</Checkbox>
                  </div>
                  <div className="mb-1">
                    <Checkbox value={coreopt[2]}>
                      Lokasi Pembuatan Tiket
                    </Checkbox>
                  </div>
                  <div className="mb-1">
                    <Checkbox value={coreopt[3]}>Tanggal Diajukan</Checkbox>
                  </div>
                  <div className="mb-1">
                    <Checkbox value={coreopt[4]}>Tanggal Ditutup</Checkbox>
                  </div>
                  <div className="mb-1">
                    <Checkbox value={coreopt[5]}>Durasi Pengerjaan</Checkbox>
                  </div>
                  <div className="mb-1">
                    <Checkbox value={coreopt[6]}>Nama Engineer</Checkbox>
                  </div>
                  <div className="mb-1">
                    <Checkbox value={coreopt[7]}>Status</Checkbox>
                  </div>
                </div>
              </Checkbox.Group>
            </div>
          </div>
          <div className="flex flex-col mb-6">
            <div className="flex mb-2">
              <Label>Jenis Tiket</Label>
            </div>
            <Select
              allowClear
              placeholder="Pilih Jenis Ticket"
              style={{ width: `100%` }}
              onChange={(value) => {
                setdatapayload({
                  ...datapayload,
                  type: typeof value === "undefined" ? null : value,
                  secondary_attributes: [1, 1, 1, 1, 1, 1, 1, 1],
                });
                setvaluesecondopt(secondopt);
              }}
            >
              <Select.Option value={1}>Incident</Select.Option>
            </Select>
          </div>
          {datapayload.type === null ? (
            <div>
              <Label>
                Jika Jenis Tiket tidak dipilih, maka akan menampilkan semua
                parameter detail masalah
              </Label>
            </div>
          ) : (
            <div className="flex flex-col mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex">
                  <Label>Pilih Parameter Detail Masalah</Label>
                </div>
                <div
                  onClick={() => {
                    setvaluesecondopt(secondopt);
                    var arr = [1, 1, 1, 1, 1, 1, 1, 1];
                    setdatapayload({
                      ...datapayload,
                      secondary_attributes: arr,
                    });
                  }}
                >
                  <Text color={`green`} cursor={`pointer`}>
                    Pilih Semua
                  </Text>
                </div>
              </div>
              <div className="mb-2 flex">
                <Checkbox.Group
                  onChange={(values) => {
                    setvaluesecondopt(values);
                    var arr = [0, 0, 0, 0, 0, 0, 0, 0].map((_, idx) =>
                      values.includes(idx) ? 1 : 0
                    );
                    setdatapayload({
                      ...datapayload,
                      secondary_attributes: arr,
                    });
                  }}
                  value={valuesecondopt}
                >
                  <div className="flex flex-col">
                    <div className="mb-1">
                      <Checkbox value={secondopt[0]}>Jenis Aset</Checkbox>
                    </div>
                    <div className="mb-1">
                      <Checkbox value={secondopt[1]}>MIG ID Aset</Checkbox>
                    </div>
                    <div className="mb-1">
                      <Checkbox value={secondopt[2]}>Terminal ID</Checkbox>
                    </div>
                    <div className="mb-1">
                      <Checkbox value={secondopt[3]}>Nama PIC</Checkbox>
                    </div>
                    <div className="mb-1">
                      <Checkbox value={secondopt[4]}>Kontak PIC</Checkbox>
                    </div>
                    <div className="mb-1">
                      <Checkbox value={secondopt[5]}>Waktu Kejadian</Checkbox>
                    </div>
                    <div className="mb-1">
                      <Checkbox value={secondopt[6]}>
                        Deskripsi Kerusakan
                      </Checkbox>
                    </div>
                  </div>
                </Checkbox.Group>
              </div>
            </div>
          )}
        </div>
      )}
    </DrawerCore>
  );
};

export default DrawerTicketExports;
