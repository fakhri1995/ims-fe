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
import React, { useCallback, useEffect, useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { TICKET_GET, TICKET_UPDATE, USERS_GET } from "lib/features";
import { generateStaticAssetUrl, getBase64 } from "lib/helper";

import { TicketService } from "apis/ticket";

import ButtonSys from "../../button";
import {
  AssetIconSvg,
  CalendartimeIconSvg,
  CloudUploadIconSvg,
  TrashIconSvg,
} from "../../icon";
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
  /**
   * Dependencies
   */
  const { hasPermission } = useAccessControl();
  const isAllowedToUpdateTicket = hasPermission(TICKET_UPDATE);
  /**
   * Digunakan untuk:
   * 1. Menampilkan "Tipe Tiket"
   * 2. Jenis Aset input field (required)
   * 3. Lokasi Kejadian input field(required)
   */
  const isAllowedToGetTicket = hasPermission(TICKET_GET);
  const isAllowedToGetUsers = hasPermission(USERS_GET); // field "Nama Pembuat"

  const canUpdateTicket = isAllowedToUpdateTicket && isAllowedToGetTicket;

  const axiosClient = useAxiosClient();

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

  const [tipeTiket, setTipeTiket] = useState(() => {
    return (
      datatypetickets.filter(
        (type) => type.id === displaydata.ticketable.asset_type?.ticket_type_id
      )[0]?.name || "-"
    );
  });
  const [jenisAset, setJenisAset] = useState("-");
  useEffect(() => {
    setJenisAset(displaydata.ticketable.asset_type?.name || "-");

    setTipeTiket(
      datatypetickets.filter(
        (type) => type.id === displaydata.ticketable.asset_type?.ticket_type_id
      )[0]?.name || "-"
    );
  }, [displaydata, datatypetickets]);

  //handler
  /**
   * Handler ketika User click "Trash" icon pada list file.
   * Setiap file yang didelete akan segera di-sync dengan backend dengan mengirim data ke endpoint `/deleteFileTicket`.
   *
   * Handler ini berfungsi untuk manage file apa yang dihapus dan mengirim data tersebut ke backend.
   */
  const onSingleAttachmentRemoved = useCallback(
    (idx) => {
      var tempfiles = [...datapayload.files];
      var tempattachments = [...datapayload.attachments];

      const removedAttachment = tempattachments.splice(idx, 1);

      const deleteFilePayload = {
        ticket_id: datapayload.id,
        id: removedAttachment[0].id,
      };

      setloadingfile(true);
      setdisabledsubmit(true);

      TicketService.deleteFileTicket(axiosClient, deleteFilePayload).then(
        (response) => {
          console.log("response", response);

          setdatapayload((prev) => ({
            ...prev,
            files: tempfiles,
            attachments: tempattachments,
          }));
          notification.success({ message: response.data.message });

          setloadingfile(false);
          setdisabledsubmit(false);
        }
      );
    },
    [setdatapayload, datapayload.id, datapayload.files, datapayload.attachments]
  );

  const onChangeGambar = async (e) => {
    setloadingfile(true);
    setdisabledsubmit(true);

    const blobFile = e.target.files[0];
    const base64Data = await getBase64(blobFile);

    const newFiles = [...datapayload.files, base64Data];
    const newAttachments = [...datapayload.attachments, blobFile];

    setdatapayload({
      ...datapayload,
      files: newFiles,
      attachments: newAttachments,
    });

    setloadingfile(false);
    setdisabledsubmit(false);
  };

  const resetDataPayload = () => {
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
      attachments: [],
      description: "",
    });
  };

  const handleUpdateTicket = () => {
    const updatePayload = { ...datapayload };
    if ("files" in updatePayload) {
      delete updatePayload["files"];
    }

    if (
      /(^\d+$)/.test(datapayload.pic_contact) === false ||
      /(^\d+$)/.test(datapayload.product_id) === false
    ) {
      if (datapayload.pic_contact === "") {
        setloadingsave(true);
        setdisabledsubmit(true);

        TicketService.update(axiosClient, updatePayload)
          .then((response) => {
            const res2 = response.data;

            setrefreshtickets((prev) => prev + 1);
            setloadingsave(false);
            setdisabledsubmit(false);
            if (res2.success) {
              resetDataPayload();
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
          })
          .catch(() => {
            notification["error"]({
              message: "Terjadi kesalahan saat memperbarui ticket",
              duration: 3,
            });

            setloadingsave(false);
            setdisabledsubmit(false);
            onvisible(false);
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

      TicketService.update(axiosClient, updatePayload)
        .then((response) => {
          const res2 = response.data;

          setrefreshtickets((prev) => prev + 1);
          setloadingsave(false);
          setdisabledsubmit(false);
          if (res2.success) {
            resetDataPayload();
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
        })
        .catch(() => {
          notification["error"]({
            message: "Terjadi kesalahan saat memperbarui ticket",
            duration: 3,
          });

          setloadingsave(false);
          setdisabledsubmit(false);
          onvisible(false);
        });
    }
  };

  //useEffect
  useEffect(() => {
    if (!isAllowedToGetTicket) {
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getTicketRelation`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setdatatypetickets(res2.data.ticket_types);
        setdatatasktickets(res2.data.ticket_detail_types);
        setdataloctickets([res2.data.companies]);

        setTipeTiket(
          res2.data.ticket_types.filter(
            (type) =>
              type.id === displaydata.ticketable.asset_type?.ticket_type_id
          )[0]?.name || "-"
        );
      });
  }, [isAllowedToGetTicket]);

  useEffect(() => {
    if (!isAllowedToGetUsers) {
      return;
    }

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
  }, [isAllowedToGetUsers]);

  useEffect(() => {
    // console.log(datapayload);
    if (
      datapayload.type_id !== null &&
      datapayload.name !== "" &&
      datapayload.ticket_task_type_id !== null &&
      datapayload.product_id !== "" &&
      datapayload.incident_time !== null &&
      datapayload.location_id !== null
    ) {
      // console.log("tidak");
      setdisabledsubmit(false);
    } else {
      // console.log("ya");
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
      disabled={disabledsubmit || !canUpdateTicket}
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
                  <Select.Option value={doc.id} key={idx}>
                    <div className=" flex items-center">
                      <div className="mr-1 w-7 h7 rounded-full">
                        <img
                          src={generateStaticAssetUrl(doc.profile_image?.link)}
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
          <div className="flex flex-col mb-6 mt-2">
            <div className="flex mb-2">
              <Label>Jenis Aset</Label>
              <span className="tickettask"></span>
              <style jsx>
                {`
                                .tickettask::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
              </style>
            </div>
            <div className=" mb-2 flex">
              <Select
                style={{ width: `100%` }}
                onChange={(value, option) => {
                  setdatapayload({
                    ...datapayload,
                    ticket_detail_type_id: value,
                  });
                  setdisabledtrigger((prev) => prev + 1);
                  const jenisAset = option.children[0];
                  const tipeTiket = option.children[2];

                  setJenisAset(jenisAset);
                  setTipeTiket(tipeTiket);
                }}
                value={datapayload.ticket_detail_type_id}
              >
                {datatasktickets.map((doc, idx) => {
                  return (
                    <Select.Option key={idx} value={doc.id}>
                      {doc.name} - {doc.ticket_type_name}
                    </Select.Option>
                  );
                })}
              </Select>
            </div>
          </div>

          <div className="flex flex-col my-6">
            <Label>Tipe Tiket</Label>
            <p className=" mb-0 text-lg font-bold">
              {displaydata.ticketable.asset_type !== null && tipeTiket}

              {displaydata.ticketable.asset_type === null && "-"}
            </p>
            {/* <p className=' mb-0 text-lg font-bold'>{displaydata.name}</p> */}
          </div>
          <div className="flex flex-col mb-6">
            <Label>Jenis Aset</Label>
            <div className="flex items-center">
              <div className="mr-2 flex items-center">
                <AssetIconSvg size={50} />
              </div>
              <H2>{displaydata.ticketable.asset_type !== null && jenisAset}</H2>
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
                <Label>Unggah JPG (Maks. 5 MB)</Label>
              </div>
              <div>
                <ButtonSys
                  type={`primaryInput`}
                  onChangeGambar={onChangeGambar}
                  inputAccept="image/jpeg"
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
                <div
                  key={idx}
                  className=" col-span-1 mx-1 flex flex-col items-center mb-2"
                >
                  <img
                    src={doc}
                    className=" object-contain mb-1 h-28 w-full"
                    alt=""
                  />
                  <div
                    className=" cursor-pointer"
                    onClick={() => onSingleAttachmentRemoved(idx)}
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
