import ButtonSys from "../../../button";
import {
  CameraIconSvg,
  EmailIconSvg,
  FaxIconSvg,
  NotesIconSvg,
  PkpIconSvg,
  RefreshIconSvg,
  SquarePlusIconSvg,
  WebIconSvg,
} from "../../../icon";
import {
  DateNotRequired,
  DateRequired,
  InputNotRequired,
  InputRequired,
  RadioRequired,
  TreeSelectRequired,
} from "../../../input";
import { H2, Label, Text } from "../../../typography";
import DrawerCore from "../../drawerCore";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, notification } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const DrawerLokasiClient = ({
  title,
  visible,
  onClose,
  children,
  buttonOkText,
  initProps,
  onvisible,
  displaydata,
}) => {
  const rt = useRouter();
  const [createdata, setcreatedata] = useState({
    name: "",
    address: "",
    phone_number: "",
    image_logo: "",
    parent_id: null,
    singkatan: "",
    tanggal_pkp: null,
    penanggung_jawab: "",
    npwp: "",
    fax: "",
    email: "",
    website: "",
  });
  const [treedata, settreedata] = useState([]);
  const [lokasiloading, setlokasiloading] = useState(false);
  const [loadingfoto, setloadingfoto] = useState(false);
  const [dynamicattr, setdynamicattr] = useState({
    email: false,
    website: false,
    npwp: false,
    fax: false,
    tanggal_pkp: false,
  });
  const [disabledsave, setdisabledsave] = useState(true);
  const [disabledtrigger, setdisabledtrigger] = useState(-1);
  const [warningphonenumber, setwarningphonenumber] = useState(false);
  const [warningemail, setwarningemail] = useState(false);

  const onChangeInput = (e) => {
    setcreatedata({
      ...createdata,
      [e.target.name]: e.target.value,
    });
    setdisabledtrigger((prev) => prev + 1);
  };
  const onChangeInputNotRequired = (e) => {
    setcreatedata({
      ...createdata,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeTreeselect = (value, label, extra) => {
    setcreatedata({
      ...createdata,
      parent_id: value,
    });
  };
  const onchangeDate = (date, datestring) => {
    setcreatedata({ ...createdata, tanggal_pkp: datestring });
  };
  const onChangeGambar = async (e) => {
    setloadingfoto(true);
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
    setcreatedata({ ...createdata, image_logo: datajson.secure_url });
    setloadingfoto(false);
  };
  const handleCreateLokasi = () => {
    if (
      /(^\d+$)/.test(createdata.phone_number) === false ||
      /(\-)|(^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/.test(
        createdata.email
      ) === false
    ) {
      // console.log(new RegExp(/(^\d+$)/).test(createdata.phone_number))
      if (createdata.email === "") {
        setlokasiloading(true);
        fetch(`https://boiling-thicket-46501.herokuapp.com/addCompanyClient`, {
          method: "POST",
          headers: {
            Authorization: JSON.parse(initProps),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(createdata),
        })
          .then((res) => res.json())
          .then((res2) => {
            setlokasiloading(false);
            if (res2.success) {
              notification["success"]({
                message: res2.message,
                duration: 3,
              });
              setcreatedata({
                name: "",
                address: "",
                phone_number: "",
                image_logo: "",
                parent_id: null,
                singkatan: "",
                tanggal_pkp: null,
                penanggung_jawab: "",
                npwp: "",
                fax: "",
                email: "",
                website: "",
              });
              setdynamicattr({
                email: false,
                website: false,
                npwp: false,
                fax: false,
                tanggal_pkp: false,
              });
              setwarningphonenumber(false);
              setwarningemail(false);
              onvisible(false);
              rt.push(
                `/company/clients/locations?id=${displaydata.id}&company_name=${displaydata.name}`
              );
            } else {
              notification["error"]({
                message: res2.message,
                duration: 3,
              });
            }
          });
      } else {
        new RegExp(/(^\d+$)/).test(createdata.phone_number) === false
          ? setwarningphonenumber(true)
          : setwarningphonenumber(false);
        new RegExp(
          /(\-)|(^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/
        ).test(createdata.email) === false
          ? setwarningemail(true)
          : setwarningemail(false);
        setdisabledsave(true);
      }
    } else {
      setlokasiloading(true);
      fetch(`https://boiling-thicket-46501.herokuapp.com/addCompanyClient`, {
        method: "POST",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createdata),
      })
        .then((res) => res.json())
        .then((res2) => {
          setlokasiloading(false);
          if (res2.success) {
            notification["success"]({
              message: res2.message,
              duration: 3,
            });
            setcreatedata({
              name: "",
              address: "",
              phone_number: "",
              image_logo: "",
              parent_id: null,
              singkatan: "",
              tanggal_pkp: null,
              penanggung_jawab: "",
              npwp: "",
              fax: "",
              email: "",
              website: "",
            });
            setdynamicattr({
              email: false,
              website: false,
              npwp: false,
              fax: false,
              tanggal_pkp: false,
            });
            setwarningphonenumber(false);
            setwarningemail(false);
            onvisible(false);
            rt.push(
              `/company/clients/locations?id=${displaydata.id}&company_name=${displaydata.name}`
            );
          } else {
            notification["error"]({
              message: res2.message,
              duration: 3,
            });
          }
        });
    }
  };
  useEffect(() => {
    fetch(`https://boiling-thicket-46501.herokuapp.com/getClientCompanyList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        settreedata([res2.data]);
      });
  }, [lokasiloading]);
  useEffect(() => {
    if (disabledtrigger !== -1) {
      if (
        createdata.parent_id !== null &&
        createdata.name !== "" &&
        createdata.address !== "" &&
        createdata.phone_number !== "" &&
        createdata.penanggung_jawab !== ""
      ) {
        setdisabledsave(false);
      } else {
        setdisabledsave(true);
      }
    }
  }, [disabledtrigger]);
  return (
    <DrawerCore
      title={title}
      visible={visible}
      onClose={() => {
        setcreatedata({
          name: "",
          address: "",
          phone_number: "",
          image_logo: "",
          parent_id: null,
          singkatan: "",
          tanggal_pkp: null,
          penanggung_jawab: "",
          npwp: "",
          fax: "",
          email: "",
          website: "",
        });
        setdynamicattr({
          email: false,
          website: false,
          npwp: false,
          fax: false,
          tanggal_pkp: false,
        });
        setwarningphonenumber(false);
        setwarningemail(false);
        setdisabledsave(true);
        onvisible(false);
      }}
      buttonOkText={buttonOkText}
      onClick={handleCreateLokasi}
      disabled={disabledsave}
    >
      <Spin spinning={lokasiloading}>
        <div className="flex flex-col">
          <div className="mb-8">
            <p className="mb-0 text-red-500 text-xs italic">
              *Informasi ini harus diisi
            </p>
          </div>
          <div className="mb-5 flex">
            <div className="mr-2">
              {createdata.image_logo === "" ? (
                <div className="w-20 h-20 rounded-full bg-gray-400 flex justify-center items-center">
                  <CameraIconSvg size={20} color={`#ffffff`} />
                </div>
              ) : (
                <img
                  src={createdata.image_logo}
                  className="object-contain w-20 h-20 rounded-full"
                  alt=""
                />
              )}
            </div>
            <div className="flex flex-col w-9/12 px-3">
              <div className="mb-5">
                <Text>
                  Unggah gambar JPG/PNG dari komputer Anda (Max. 5 MB)
                </Text>
              </div>
              <div className="flex justify-end items-end">
                <ButtonSys type="primaryInput" onChangeGambar={onChangeGambar}>
                  {loadingfoto ? (
                    <LoadingOutlined style={{ marginRight: `0.5rem` }} />
                  ) : (
                    <RefreshIconSvg size={15} color={`#ffffff`} />
                  )}
                  Atur Ulang
                </ButtonSys>
              </div>
            </div>
          </div>
          <div className="flex flex-col mb-5">
            <TreeSelectRequired
              name="parent_id"
              onChangeTreeselect={onChangeTreeselect}
              label="Induk Lokasi"
              treeData={treedata}
            />
            <InputRequired
              name="name"
              onChangeInput={onChangeInput}
              label="Nama Lokasi"
            ></InputRequired>
            <InputRequired
              name="address"
              onChangeInput={onChangeInput}
              label="Alamat Lokasi"
            ></InputRequired>
            <InputRequired
              name="phone_number"
              onChangeInput={onChangeInput}
              label="Nomor Telepon"
            ></InputRequired>
            {warningphonenumber && (
              <p className=" text-red-500 text-sm mb-3 -mt-3 mx-3">
                Nomor Telepon harus angka
              </p>
            )}
            <InputRequired
              name="penanggung_jawab"
              onChangeInput={onChangeInput}
              label="Penanggung Jawab (PIC)"
            ></InputRequired>
            {dynamicattr.email && (
              <>
                <InputNotRequired
                  name="email"
                  onChangeInput={onChangeInputNotRequired}
                  label="Email"
                ></InputNotRequired>
                {warningemail && (
                  <p className=" text-red-500 text-sm mb-3 -mt-3 mx-3">
                    Email belum diisi dengan benar
                  </p>
                )}
              </>
            )}
            {dynamicattr.website && (
              <InputNotRequired
                name="website"
                onChangeInput={onChangeInputNotRequired}
                label="Website"
              ></InputNotRequired>
            )}
            {dynamicattr.npwp && (
              <InputNotRequired
                name="npwp"
                onChangeInput={onChangeInputNotRequired}
                label="NPWP"
              ></InputNotRequired>
            )}
            {dynamicattr.fax && (
              <InputNotRequired
                name="fax"
                onChangeInput={onChangeInputNotRequired}
                label="Fax"
              ></InputNotRequired>
            )}
            {dynamicattr.tanggal_pkp && (
              <DateNotRequired
                name="tanggal_pkp"
                onChangeDate={onchangeDate}
                label="Tanggal PKP"
                defaultValue={
                  createdata.tanggal_pkp === null
                    ? null
                    : moment(createdata.tanggal_pkp)
                }
              ></DateNotRequired>
            )}
          </div>
          <div className="mb-5 flex flex-col">
            <div className="mb-3">
              <Label>Informasi Tambahan</Label>
            </div>
            {!dynamicattr.email && (
              <div className="flex justify-between mb-3">
                <div className="flex items-center">
                  <div className="mr-2">
                    <EmailIconSvg size={18} color={`#808080`} />
                  </div>
                  Email
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setdynamicattr({ ...dynamicattr, email: true });
                  }}
                >
                  <SquarePlusIconSvg size={18} color={`#808080`} />
                </div>
              </div>
            )}
            {!dynamicattr.website && (
              <div className="flex justify-between mb-3">
                <div className="flex items-center">
                  <div className="mr-2">
                    <WebIconSvg size={18} color={`#808080`} />
                  </div>
                  Website
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setdynamicattr({ ...dynamicattr, website: true });
                  }}
                >
                  <SquarePlusIconSvg size={18} color={`#808080`} />
                </div>
              </div>
            )}
            {!dynamicattr.npwp && (
              <div className="flex justify-between mb-3">
                <div className="flex items-center">
                  <div className="mr-2">
                    <NotesIconSvg size={18} color={`#808080`} />
                  </div>
                  NPWP
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setdynamicattr({ ...dynamicattr, npwp: true });
                  }}
                >
                  <SquarePlusIconSvg size={18} color={`#808080`} />
                </div>
              </div>
            )}
            {!dynamicattr.fax && (
              <div className="flex justify-between mb-3">
                <div className="flex items-center">
                  <div className="mr-2">
                    <FaxIconSvg size={18} color={`#808080`} />
                  </div>
                  Fax
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setdynamicattr({ ...dynamicattr, fax: true });
                  }}
                >
                  <SquarePlusIconSvg size={18} color={`#808080`} />
                </div>
              </div>
            )}
            {!dynamicattr.tanggal_pkp && (
              <div className="flex justify-between mb-3">
                <div className="flex items-center">
                  <div className="mr-2">
                    <PkpIconSvg size={18} color={`#808080`} />
                  </div>
                  Tanggal PKP
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setdynamicattr({ ...dynamicattr, tanggal_pkp: true });
                  }}
                >
                  <SquarePlusIconSvg size={18} color={`#808080`} />
                </div>
              </div>
            )}
          </div>
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerLokasiClient;
