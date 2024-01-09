import {
  Button,
  Checkbox,
  Drawer,
  Empty,
  Form,
  Input,
  Select,
  Spin,
  Switch,
} from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import "react-quill/dist/quill.snow.css";

import { useAccessControl } from "contexts/access-control";

import { RECRUITMENT_JALUR_DAFTARS_LIST_GET } from "lib/features";

import {
  AlignJustifiedIconSvg,
  CheckIconSvg,
  CheckboxIconSvg,
  CircleXIconSvg,
  CopyIconSvg,
  ListNumbersSvg,
  TrashIconSvg,
  UploadIconSvg,
} from "../../icon";
import { H2, Label } from "../../typography";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const DrawerQuestionEdit = ({
  title,
  visible,
  onvisible,
  buttonOkText,
  setdrawedit,
  handleUpdateQuestion,
  dataedit,
  setdataedit,
  loadingEdit,
}) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetRegistPlatformList = hasPermission(
    RECRUITMENT_JALUR_DAFTARS_LIST_GET
  );

  const [instanceForm] = Form.useForm();

  //USESTATE

  const [disabledcreate, setdisabledcreate] = useState(true);
  const [activeTab, setActiveTab] = useState("1");
  const [tempcb, settempcb] = useState("");
  const [loadingRegistPlatformList, setLoadingRegistPlatformList] =
    useState(false);
  const [dataRegistPlatformList, setDataRegistPlatformList] = useState([]);

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link"],
    ],
  };
  const formats = [
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  return (
    <Drawer
      title={title}
      visible={visible}
      onClose={() => {
        setdrawedit(false);
      }}
      destroyOnClose={true}
      maskClosable={false}
      width={400}
      //   disabled={disabledcreate}
    >
      <Spin spinning={loadingEdit}>
        <div>
          <p className={"text-mono30 text-xs font-medium leading-5 mb-6"}>
            {" "}
            Daftar Isian *{" "}
          </p>
          {dataedit.question.length === 0 ? (
            <>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Daftar isian masih kosong"
              />
            </>
          ) : (
            dataedit.question.map((doc, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-white flex flex-col shadow-md rounded-md p-3 mb-4 border"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="block">Wajib Diisi</span>
                    <Switch
                      checked={doc.required}
                      onChange={(checked) => {
                        var temp = [...dataedit.question];
                        temp[idx].required = checked;
                        setdataedit((prev) => ({
                          ...prev,
                          question: temp,
                        }));
                      }}
                    />
                  </div>
                  <div key={idx} className="grid grid-cols-2 mb-3">
                    <div className="col-span-1 mr-1 mb-3 flex items-center">
                      <div className="mr-2">
                        <Input
                          value={doc.name}
                          placeholder="Nama"
                          onChange={(e) => {
                            var temp = [...dataedit.question];
                            temp[idx].name = e.target.value;
                            setdataedit((prev) => ({
                              ...prev,
                              question: temp,
                            }));
                          }}
                        ></Input>
                      </div>
                    </div>
                    <div className="col-span-1 ml-1 mb-3">
                      <Select
                        key={idx}
                        // name={`name`}
                        value={doc.type}
                        style={{ width: `100%` }}
                        onChange={(value) => {
                          var temp = [...dataedit.question];
                          delete temp[idx].list;
                          temp[idx].type = value;
                          if (value === 3) {
                            temp[idx].list = [];
                          } else if (value === 5) {
                            temp[idx].list = [];
                          }
                          temp[idx].required = false;
                          setdataedit((prev) => ({
                            ...prev,
                            question: temp,
                          }));
                        }}
                      >
                        <Select.Option value={1}>
                          <div className="flex items-center">
                            <AlignJustifiedIconSvg
                              size={12}
                              color={`#35763B`}
                            />
                            Teks
                          </div>
                        </Select.Option>
                        <Select.Option value={2}>
                          <div className="flex items-center">
                            <AlignJustifiedIconSvg
                              size={12}
                              color={`#35763B`}
                            />
                            Paragraf
                          </div>
                        </Select.Option>
                        <Select.Option value={3}>
                          <div className="flex items-center">
                            <CheckboxIconSvg size={12} color={`#35763B`} />
                            Ceklis
                          </div>
                        </Select.Option>
                        <Select.Option value={4}>
                          <div className="flex items-center">
                            <ListNumbersSvg size={12} color={`#35763B`} />
                            Numeral
                          </div>
                        </Select.Option>
                        <Select.Option value={5}>
                          <div className="flex items-center">
                            <ListNumbersSvg size={12} color={`#35763B`} />
                            Dropdown
                          </div>
                        </Select.Option>
                        <Select.Option value={6}>
                          <div className="flex items-center">
                            <UploadIconSvg size={12} color={`#35763B`} />
                            Unggah File
                          </div>
                        </Select.Option>
                      </Select>
                    </div>

                    <div className="mb-5 col-span-2">
                      <Input
                        placeholder="Deskripsi"
                        value={doc.description}
                        onChange={(e) => {
                          var temp = [...dataedit.question];
                          temp[idx].description = e.target.value;
                          setdataedit((prev) => ({
                            ...prev,
                            question: temp,
                          }));
                        }}
                      ></Input>
                    </div>

                    {doc.type === 3 && (
                      <div className="flex flex-col mb-3 col-span-2">
                        <div className="mb-3 flex flex-col">
                          <div className="mb-1">
                            <Label>Keterangan</Label>
                          </div>
                          {doc.list.map((doc2, idx2) => {
                            return (
                              <div
                                key={idx2}
                                className="flex items-center justify-between mb-2"
                              >
                                {/* <div className="cursor-pointer font-bold mr-2">
                                                                              ::
                                                                          </div> */}
                                <div className="flex items-center">
                                  <Checkbox
                                    style={{ marginRight: `0.5rem` }}
                                    checked
                                  />
                                  {doc2}
                                </div>
                                <div
                                  className=" cursor-pointer"
                                  onClick={() => {
                                    var temp = [...dataedit.question];
                                    temp[idx].list.splice(idx2, 1);
                                    setdataedit((prev) => ({
                                      ...prev,
                                      question: temp,
                                    }));
                                  }}
                                >
                                  <CircleXIconSvg size={15} color={`#BF4A40`} />
                                </div>
                              </div>
                            );
                          })}
                          <div className="flex items-center">
                            <div
                              className="mr-1 cursor-pointer hover:text-primary100"
                              onClick={() => {
                                settempcb([]);
                                var temp = [...dataedit.question];
                                temp[idx].list.push(tempcb[idx]);
                                setdataedit((prev) => ({
                                  ...prev,
                                  question: temp,
                                }));
                              }}
                            >
                              <H2>+</H2>
                            </div>
                            <Input
                              placeholder="Tambah"
                              value={tempcb[idx]}
                              onChange={(e) => {
                                var temptempcb = [...tempcb];
                                temptempcb[idx] = e.target.value;
                                settempcb(temptempcb);
                              }}
                              bordered={false}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {doc.type === 5 && (
                      <div className="flex flex-col mb-3 col-span-2">
                        {doc.list.map((doc4, idx4) => {
                          return (
                            <div
                              key={idx4}
                              className=" px-3 flex items-center mb-2"
                            >
                              {/* <div className="cursor-pointer font-bold mr-2">
                                                                          ::
                                                                      </div> */}
                              <div className="flex items-center mr-2">
                                <Input
                                  placeholder="Tambah"
                                  style={{ marginRight: `0.5rem` }}
                                  value={doc4}
                                  onChange={(e) => {
                                    var temp = [...dataedit.question];
                                    temp[idx].list[idx4] = e.target.value;
                                    setdataedit((prev) => ({
                                      ...prev,
                                      question: temp,
                                    }));
                                  }}
                                  bordered={false}
                                />
                                <div
                                  className="cursor-pointer flex items-center text-center justify-center"
                                  onClick={() => {
                                    var temp = [...dataedit.question];
                                    temp[idx].list.splice(idx4, 1);
                                    setdataedit((prev) => ({
                                      ...prev,
                                      question: temp,
                                    }));
                                  }}
                                >
                                  <CircleXIconSvg size={15} color={`#BF4A40`} />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <div className="flex items-center px-3">
                          <div
                            className="mr-1 cursor-pointer hover:text-primary100"
                            onClick={() => {
                              var temp = [...dataedit.question];
                              temp[idx].list.push("");
                              setdataedit((prev) => ({
                                ...prev,
                                question: temp,
                              }));
                            }}
                          >
                            <h1 className="font-semibold text-sm hover:text-primary100">
                              + Tambah Value
                            </h1>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* COPY dan DELETE */}
                    <div className=" col-span-2 flex justify-end">
                      <div
                        className="mx-1 cursor-pointer"
                        onClick={() => {
                          var templastdata = {};
                          if (doc.type === 1 || doc.type === 2) {
                            templastdata = {
                              name: doc.name,
                              type: doc.type,
                              description: doc.description,
                            };
                          } else if (doc.type === 3) {
                            templastdata = {
                              name: doc.name,
                              type: doc.type,
                              description: doc.description,
                              list: [...doc.list],
                            };
                          } else if (doc.type === 4) {
                            templastdata = {
                              name: doc.name,
                              type: doc.type,
                              description: doc.description,
                            };
                          } else if (doc.type === 5) {
                            templastdata = {
                              name: doc.name,
                              type: doc.type,
                              description: doc.description,
                              list: [...doc.list],
                            };
                          } else if (doc.type === 6) {
                            templastdata = {
                              name: doc.name,
                              type: doc.type,
                              description: doc.description,
                            };
                          }
                          templastdata = {
                            ...templastdata,
                            required: doc.required,
                          };

                          var temp = [...dataedit.question];
                          temp.splice(idx + 1, 0, templastdata);
                          setdataedit((prev) => ({
                            ...prev,
                            question: temp,
                          }));
                        }}
                      >
                        <CopyIconSvg size={15} color={`#000000`} />
                      </div>
                      <div
                        className="mx-1 cursor-pointer"
                        onClick={() => {
                          const temp = [...dataedit.question];
                          temp.splice(idx, 1);
                          setdataedit((prev) => ({
                            ...prev,
                            question: temp,
                          }));
                        }}
                      >
                        <TrashIconSvg size={15} color={`#000000`} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div
            className="mb-4 border border-dashed border-primary100 hover:border-primary75 py-2 flex justify-center items-center w-full rounded-md cursor-pointer"
            onClick={() => {
              setdataedit((prev) => ({
                ...prev,
                question: [
                  ...prev.question,
                  {
                    type: 1,
                    name: "",
                    description: "",
                    required: false,
                  },
                ],
              }));
              settempcb([...tempcb, ""]);
            }}
          >
            <div className="text-primary100 hover:text-primary75">
              + Tambah Field Baru
            </div>
          </div>
          <div className="fixed bottom-0 right-6 mb-6">
            <Button
              type="default"
              onClick={() => {
                setdrawedit(false);
              }}
              style={{ marginRight: `1rem` }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleUpdateQuestion()}
              type="primary"
              danger
              icon={<CheckIconSvg size={16} color={"#ffffff"} />}
              loading={loadingEdit}
            >
              Update Pertanyaan
            </Button>
          </div>
        </div>
      </Spin>
    </Drawer>
  );
};

export default DrawerQuestionEdit;
