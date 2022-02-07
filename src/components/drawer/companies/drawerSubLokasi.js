import { DownOutlined, LoadingOutlined, UpOutlined } from "@ant-design/icons";
import {
  Checkbox,
  Empty,
  Input,
  Select,
  Spin,
  TreeSelect,
  notification,
} from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import ButtonSys from "../../button";
import {
  AlignJustifiedIconSvg,
  BorderAllSvg,
  CameraIconSvg,
  CheckboxIconSvg,
  CircleXIconSvg,
  CopyIconSvg,
  EmailIconSvg,
  FaxIconSvg,
  ListNumbersSvg,
  NotesIconSvg,
  PkpIconSvg,
  RefreshIconSvg,
  RulerIconSvg,
  SquarePlusIconSvg,
  TrashIconSvg,
  WebIconSvg,
} from "../../icon";
import {
  DateNotRequired,
  DateRequired,
  InputNotRequired,
  InputRequired,
  RadioNotRequired,
  RadioRequired,
  SelectNotRequired,
  TextAreaRequired,
  TreeSelectRequired,
} from "../../input";
import { H2, Label, Text } from "../../typography";
import DrawerCore from "../drawerCore";

const DrawerSublokasi = ({
  title,
  visible,
  onClose,
  children,
  buttonOkText,
  initProps,
  onvisible,
  subchildren,
}) => {
  const rt = useRouter();
  const [createdata, setcreatedata] = useState({
    name: "",
    address_same: false,
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
  const [disabledsave, setdisabledsave] = useState(true);
  const [disabledtrigger, setdisabledtrigger] = useState(-1);
  const [treedata, settreedata] = useState([]);
  const [sameaddress, setsameaddress] = useState(false);
  const [lokasiloading, setlokasiloading] = useState(false);
  const [loadingfoto, setloadingfoto] = useState(false);
  const [warningphonenumber, setwarningphonenumber] = useState(false);
  const [warningemail, setwarningemail] = useState(false);

  const onChangeInput = (e) => {
    setcreatedata({
      ...createdata,
      [e.target.name]: e.target.value,
    });
    setdisabledtrigger((prev) => prev + 1);
  };
  const onChangeTreeselect = (value, label, extra) => {
    setcreatedata({
      ...createdata,
      parent_id: value,
    });
    setdisabledtrigger((prev) => prev + 1);
  };
  const onChangeRadioAlamat = (e) => {
    e.target.value === true ? setsameaddress(true) : setsameaddress(false);
    setcreatedata({
      ...createdata,
      address_same: e.target.value,
    });
    setdisabledtrigger((prev) => prev + 1);
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
  const handleCreateSubLokasi = () => {
    if (/(^\d+$)/.test(createdata.phone_number) === false) {
      // console.log(new RegExp(/(^\d+$)/).test(createdata.phone_number))
      new RegExp(/(^\d+$)/).test(createdata.phone_number) === false
        ? setwarningphonenumber(true)
        : setwarningphonenumber(false);
      setdisabledsave(true);
    } else {
      setlokasiloading(true);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addCompanySub`, {
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
            setcreatedata({
              name: "",
              address_same: false,
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
            setsameaddress(false);
            setdisabledsave(true);
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
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getBranchCompanyList`, {
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
        (createdata.address_same !== false || createdata.address !== "") &&
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
          address_same: false,
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
        setsameaddress(false);
        setdisabledsave(true);
        onvisible(false);
      }}
      buttonOkText={buttonOkText}
      onClick={handleCreateSubLokasi}
      disabled={disabledsave}
      // onClick={()=>{console.log(createdata)}}
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
              treeData={subchildren}
            />
            <InputRequired
              name="name"
              onChangeInput={onChangeInput}
              label="Nama Sub Lokasi"
            ></InputRequired>
            <RadioRequired
              name="address"
              label="Alamat Sub Lokasi"
              onChangeRadio={onChangeRadioAlamat}
              options={[
                {
                  value: true,
                  title: "Sama dengan Induk",
                },
                {
                  value: false,
                  title: "Alamat Berbeda",
                },
              ]}
            ></RadioRequired>
            <div className="mb-5 px-3">
              <Input
                name="address"
                onChange={onChangeInput}
                disabled={sameaddress ? true : false}
              />
            </div>
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
          </div>
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerSublokasi;
