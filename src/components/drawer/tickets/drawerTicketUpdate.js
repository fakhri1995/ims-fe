import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Input,
  Select,
  Spin,
  TreeSelect,
  notification,
} from "antd";
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
import { H1, H2, Label } from "../../typography";
import DrawerCore from "../drawerCore";

const DrawerTicketUpdate = ({
  title,
  visible,
  onvisible,
  onClose,
  buttonOkText,
  disabled,
  initProps,
  refreshtickets,
  setrefreshtickets,
  setrefreshclosed,
  dataprofile,
  displaydata,
  datapayload,
  setdatapayload,
  ticketid,
  disabledsubmit,
  setdisabledsubmit,
}) => {
  //useState
  const [loadingsave, setloadingsave] = useState(false);
  //data for each field
  const [datatypetickets, setdatatypetickets] = useState([]);
  const [datatasktickets, setdatatasktickets] = useState([]);
  const [dataloctickets, setdataloctickets] = useState([]);
  const [listusers, setlistusers] = useState([]);
  const [warningphonenumber, setwarningphonenumber] = useState(false);
  const [warningproductid, setwarningproductid] = useState(false);
  //files
  const [loadingfile, setloadingfile] = useState(false);
  //disabled save button
  const [disabledtrigger, setdisabledtrigger] = useState(-1);

  //handler
  const onChangeGambar = async (e) => {
    setloadingfile(true);
    const foto = e.target.files;
    const formdata = new FormData();
    formdata.append("file", foto[0]);
    formdata.append("upload_preset", "migsys");
    const fetching = await fetch(
      `https://api.Cloudinary.com/v1_1/aqlpeduli/image/upload`,
      {
        method: "POST",
        body: formdata,
      }
    );
    const datajson = await fetching.json();
    var tempfile = [...datapayload.files];
    tempfile.push(datajson.secure_url);
    setdatapayload({ ...datapayload, files: tempfile });
    setloadingfile(false);
  };
  const handleUpdateTicket = () => {
    if (
      /(^\d+$)/.test(datapayload.pic_contact) === false ||
      /(^\d+$)/.test(datapayload.product_id) === false
    ) {
      if (datapayload.pic_contact === "") {
        setloadingsave(true);
        setdisabledsubmit(true);
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateTicket`, {
          method: "PUT",
          headers: {
            Authorization: JSON.parse(initProps),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datapayload),
        })
          .then((res) => res.json())
          .then((res2) => {
            setrefreshtickets((prev) => prev + 1);
            setloadingsave(false);
            setdisabledsubmit(false);
            if (res2.success) {
              setdatapayload({
                id: Number(ticketid),
                requester_id: null,
                raised_at: null,
                closed_at: null,
                product_id: "",
                pic_name: "",
                pic_contact: "",
                location_id: null,
                problem: "",
                incident_time: null,
                files: [],
                description: "",
              });
              onvisible(false);
              notification["success"]({
                message: res2.message,
                duration: 3,
              });
            } else {
              notification["error"]({
                message: res2.message,
                duration: 3,
              });
            }
          });
      } else {
        new RegExp(/(^\d+$)/).test(datapayload.pic_contact) === false
          ? setwarningphonenumber(true)
          : setwarningphonenumber(false);
        new RegExp(/(^\d+$)/).test(datapayload.product_id) === false
          ? setwarningproductid(true)
          : setwarningproductid(false);
        setdisabledsubmit(true);
      }
    } else {
      setloadingsave(true);
      setdisabledsubmit(true);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateTicket`, {
        method: "PUT",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datapayload),
      })
        .then((res) => res.json())
        .then((res2) => {
          setrefreshtickets((prev) => prev + 1);
          setloadingsave(false);
          setdisabledsubmit(false);
          if (res2.success) {
            setdatapayload({
              id: Number(ticketid),
              requester_id: null,
              raised_at: null,
              closed_at: null,
              product_id: "",
              pic_name: "",
              pic_contact: "",
              location_id: null,
              problem: "",
              incident_time: null,
              files: [],
              description: "",
            });
            onvisible(false);
            notification["success"]({
              message: res2.message,
              duration: 3,
            });
          } else {
            notification["error"]({
              message: res2.message,
              duration: 3,
            });
          }
        });
    }
  };

  //useEffect
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getTicketRelation`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setdatatypetickets(res2.data.ticket_types);
        setdatatasktickets(res2.data.ticket_task_types);
        setdataloctickets([res2.data.companies]);
      });
  }, []);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterUsers`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setlistusers(res2.data);
      });
  }, []);
  useEffect(() => {
    console.log(datapayload);
    if (
      datapayload.type_id !== null &&
      datapayload.name !== "" &&
      datapayload.ticket_task_type_id !== null &&
      datapayload.product_id !== "" &&
      datapayload.incident_time !== null &&
      datapayload.location_id !== null
    ) {
      console.log("tidak");
      setdisabledsubmit(false);
    } else {
      console.log("ya");
      setdisabledsubmit(true);
    }
  }, [disabledtrigger]);
  return (
    <DrawerCore
      title={title}
      visible={visible}
      onClose={() => {
        setrefreshclosed((prev) => prev + 1);
        onvisible(false);
      }}
      buttonOkText={buttonOkText}
      onClick={handleUpdateTicket}
      disabled={disabledsubmit}
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
          <div className="flex flex-col mb-6">
            <Label>No. Tiket</Label>
            <p className=" mb-0 text-lg font-bold">{displaydata.name}</p>
          </div>
          <div className="flex flex-col mb-6">
            <div className="flex mb-2">
              <Label>Nama Pembuat</Label>
            </div>
            <div className=" mb-2 flex">
              <Select
                suffixIcon={<SearchOutlined />}
                showArrow
                style={{ width: `100%` }}
                onChange={(value, option) => {
                  setdatapayload({
                    ...datapayload,
                    requester_id: value,
                  });
                }}
                defaultValue={datapayload.requester_id}
              >
                {listusers.map((doc, idx) => (
                  <Select.Option value={doc.id}>
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
            <div className="flex mb-2">
              <Label>Tanggal Dibuat</Label>
            </div>
            <div className=" mb-2 flex">
              <DatePicker
                suffixIcon={<CalendartimeIconSvg size={15} color={`#000000`} />}
                style={{ width: `100%` }}
                showTime
                allowClear
                className="datepickerStatus"
                defaultValue={
                  datapayload.raised_at === null
                    ? null
                    : moment(datapayload.raised_at)
                }
                onChange={(date, datestring) => {
                  setdatapayload({
                    ...datapayload,
                    raised_at: datestring === "" ? null : datestring,
                  });
                }}
              />
            </div>
          </div>
          <div className="flex flex-col mb-6">
            <div className="flex mb-2">
              <Label>Tanggal Closed</Label>
            </div>
            <div className=" mb-2 flex">
              <DatePicker
                suffixIcon={<CalendartimeIconSvg size={15} color={`#000000`} />}
                style={{ width: `100%` }}
                showTime
                allowClear
                className="datepickerStatus"
                defaultValue={
                  datapayload.closed_at === null
                    ? null
                    : moment(datapayload.closed_at)
                }
                onChange={(date, datestring) => {
                  setdatapayload({
                    ...datapayload,
                    closed_at: datestring === "" ? null : datestring,
                  });
                }}
              />
            </div>
          </div>
          {/* ------------------------------------------------------------------------- */}
          <hr />
          {/* ------------------------------------------------------------------------- */}
          <div className="flex flex-col my-6">
            <Label>Tipe Tiket</Label>
            <p className=" mb-0 text-lg font-bold">
              {
                datatypetickets.filter(
                  (type) =>
                    type.id === displaydata.ticketable.asset_type.ticket_type_id
                )[0]?.name
              }
            </p>
            {/* <p className=' mb-0 text-lg font-bold'>{displaydata.name}</p> */}
          </div>
          <div className="flex flex-col mb-6">
            <Label>Jenis Aset</Label>
            <div className="flex items-center">
              <div className="mr-2 flex items-center">
                <AssetIconSvg size={50} />
              </div>
              <H2>{displaydata.ticketable.asset_type.name}</H2>
            </div>
          </div>
          <div className=" mb-6 flex flex-col">
            <div className="flex mb-2">
              <Label>ID Produk</Label>
              <span className="idproduk"></span>
              <style jsx>
                {`
                                .idproduk::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
              </style>
            </div>
            <Input
              defaultValue={datapayload.product_id}
              onChange={(e) => {
                setdatapayload({ ...datapayload, product_id: e.target.value });
                setdisabledtrigger((prev) => prev + 1);
              }}
            ></Input>
            {warningproductid && (
              <p className=" text-red-500 text-sm mb-0">
                ID Produk harus angka
              </p>
            )}
          </div>
          <div className="flex flex-col mb-6">
            <div className="flex mb-2">
              <Label>Waktu Kejadian</Label>
              <span className="timeincident"></span>
              <style jsx>
                {`
                                .timeincident::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
              </style>
            </div>
            <div className=" mb-2 flex">
              <DatePicker
                suffixIcon={<CalendartimeIconSvg size={15} color={`#000000`} />}
                style={{ width: `100%` }}
                showTime
                allowClear
                className="datepickerStatus"
                defaultValue={
                  datapayload.incident_time === null
                    ? null
                    : moment(datapayload.incident_time)
                }
                onChange={(date, datestring) => {
                  setdatapayload({
                    ...datapayload,
                    incident_time: datestring === "" ? null : datestring,
                  });
                  setdisabledtrigger((prev) => prev + 1);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col mb-6">
            <div className="flex mb-2">
              <Label>Lokasi Kejadian</Label>
              <span className="locincident"></span>
              <style jsx>
                {`
                                .locincident::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
              </style>
            </div>
            <div className=" mb-2 flex">
              <TreeSelect
                style={{ width: `100%` }}
                allowClear
                placeholder="Semua Lokasi"
                showSearch
                suffixIcon={<SearchOutlined />}
                showArrow
                name={`locations_id`}
                onChange={(value) => {
                  typeof value === "undefined"
                    ? setdatapayload({ ...datapayload, location_id: null })
                    : setdatapayload({ ...datapayload, location_id: value });
                  setdisabledtrigger((prev) => prev + 1);
                }}
                treeData={dataloctickets}
                treeDefaultExpandAll
                defaultValue={datapayload.location_id}
              ></TreeSelect>
            </div>
          </div>
          <div className=" mb-6 flex flex-col">
            <div className="flex mb-2">
              <Label>PIC</Label>
            </div>
            <Input
              defaultValue={datapayload.pic_name}
              onChange={(e) => {
                setdatapayload({ ...datapayload, pic_name: e.target.value });
              }}
            ></Input>
          </div>
          <div className=" mb-6 flex flex-col">
            <div className="flex mb-2">
              <Label>Kontak PIC</Label>
            </div>
            <Input
              defaultValue={datapayload.pic_contact}
              onChange={(e) => {
                setdatapayload({ ...datapayload, pic_contact: e.target.value });
                setdisabledtrigger((prev) => prev + 1);
              }}
            ></Input>
            {warningphonenumber && (
              <p className=" text-red-500 text-sm mb-0">
                Kontak PIC harus angka
              </p>
            )}
          </div>
          <div className=" mb-6 flex flex-col">
            <div className="flex mb-2">
              <Label>Deskripsi Masalah</Label>
            </div>
            <Input.TextArea
              rows={5}
              defaultValue={datapayload.description}
              onChange={(e) => {
                setdatapayload({ ...datapayload, description: e.target.value });
              }}
            ></Input.TextArea>
          </div>
          <div className=" mb-6 flex flex-col">
            <div className="flex mb-2">
              <Label>Bukti Kejadian</Label>
            </div>
            <div className=" flex justify-between items-center mb-2">
              <div>
                <Label>Unggah JPG/MP4 (Maks. 5 MB)</Label>
              </div>
              <div>
                <ButtonSys
                  type={`primaryInput`}
                  onChangeGambar={onChangeGambar}
                >
                  {loadingfile ? (
                    <LoadingOutlined style={{ marginRight: `0.5rem` }} />
                  ) : (
                    <div className="mr-1">
                      <CloudUploadIconSvg size={15} color={`#ffffff`} />
                    </div>
                  )}
                  Unggah File
                </ButtonSys>
              </div>
            </div>
            <div className="grid grid-cols-3">
              {datapayload.files.map((doc, idx) => (
                <div className=" col-span-1 mx-1 flex flex-col items-center mb-2">
                  <img
                    src={doc}
                    className=" object-contain mb-1 h-28 w-full"
                    alt=""
                  />
                  <div
                    className=" cursor-pointer"
                    onClick={() => {
                      var tempfiles = [...datapayload.files];
                      tempfiles.splice(idx, 1);
                      setdatapayload((prev) => ({
                        ...prev,
                        files: tempfiles,
                      }));
                    }}
                  >
                    <TrashIconSvg size={15} color={`#BF4A40`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </DrawerCore>
  );
};

export default DrawerTicketUpdate;
