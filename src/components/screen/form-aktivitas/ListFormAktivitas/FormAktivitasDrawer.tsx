import {
  Checkbox,
  Empty,
  Input,
  Select,
  Spin,
  Switch,
  notification,
} from "antd";
import type { FC } from "react";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import DrawerCore from "components/drawer/drawerCore";
import {
  AlignJustifiedIconSvg,
  CheckboxIconSvg,
  CircleXIconSvg,
  CopyIconSvg,
  ListNumbersSvg,
  TrashIconSvg,
} from "components/icon";
import { TextAreaRequired } from "components/input";
import { H2, Label } from "components/typography";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  FormAktivitasQueryKeys,
  FormAktivitasService,
} from "services/form-aktivitas";

import { useAddFormAktivitas } from ".";

/**
 * Component BuatFormAktivitasDrawer's props.
 */
export interface IFormAktivitasDrawer {
  /**
   * Flag to let the drawer behave to update and not to create.
   * Use this flag on detail page only.
   *
   * If it is left undefined, then the drawer will behave to add new data.
   */
  formAktivitasId?: number;

  title: string;
  buttonOkText: string;

  visible: boolean;
  onvisible: (visibleValue: boolean) => void;
}

/**
 * Component BuatFormAktivitasDrawer
 */
export const FormAktivitasDrawer: FC<IFormAktivitasDrawer> = ({
  title,
  visible,
  onvisible,
  buttonOkText,
  formAktivitasId,
}) => {
  const axiosClient = useAxiosClient();
  const { mutate: addFormAktivitas, isLoading: addFormLoading } =
    useAddFormAktivitas();
  const {
    data,
    isLoading: getFormLoading,
    refetch,
  } = useQuery(
    [FormAktivitasQueryKeys.FIND, formAktivitasId],
    () => FormAktivitasService.findOne(axiosClient, formAktivitasId),
    {
      select: (response) => {
        const mapDetailsToWorks = [...response.data.data.details].map(
          (detail) => {
            let mapped = {
              name: detail.name,
              type: detail.type,
              description: detail.description,
            };

            // special case for type === 3 || type === 5 (checkbox and dropdown)
            if (detail.type === 3 || detail.type === 5) {
              mapped["lists"] = detail.list || [];
            }

            return mapped;
          }
        );

        return {
          name: response.data.data.name,
          description: response.data.data.description,
          works: mapDetailsToWorks,
        };
      },
    }
  );

  //USESTATE
  const [datacreate, setdatacreate] = useState({
    name: "",
    description: "",
    works: [],
  });

  const [disabledcreate, setdisabledcreate] = useState(true);
  //checkbox
  const [tempcb, settempcb] = useState([]);

  //HANDLER
  const onChangeInput = (e) => {
    setdatacreate({
      ...datacreate,
      [e.target.name]: e.target.value,
    });
    // setdisabledtrigger((prev) => prev + 1);
  };

  const handleAddTipeTask = () => {
    const payload = {
      name: datacreate.name,
      description: datacreate.description,
      details: datacreate.works,
    };

    /**
     * TODO: hit endpoint berdasarkan state drawer.
     * Update ya update
     * Create ya create...
     */

    addFormAktivitas(payload, {
      onSuccess: (response) => {
        onvisible(false);

        notification.success({
          message: response.data.message,
          duration: 3,
        });

        setdatacreate({ name: "", description: "", works: [] });
      },
      onError: (error) => {
        console.log(error);
        notification.error({
          message: "Gagal menambahkan form aktivitas",
          duration: 3,
        });
      },
    });
  };

  //USEEFFECT
  useEffect(() => {
    if (
      datacreate.name !== "" &&
      datacreate.description !== "" &&
      datacreate.works.length !== 0
    ) {
      setdisabledcreate(false);
    } else {
      setdisabledcreate(true);
    }
    // if (disabledtrigger !== -1) {
    // }
  }, [datacreate]);

  // useEffect(() => {
  //   if (!formAktivitasId) {
  //     return;
  //   }

  //   refetch();
  // }, [formAktivitasId]);

  useEffect(() => {
    if (!data) {
      return;
    }

    setdatacreate(data);
  }, [data]);

  return (
    <DrawerCore
      title={title}
      visible={visible}
      onClose={() => {
        if (!formAktivitasId) {
          setdatacreate({
            name: "",
            description: "",
            works: [],
          });
        }
        onvisible(false);
      }}
      buttonOkText={buttonOkText}
      onClick={handleAddTipeTask}
      disabled={disabledcreate}
    >
      <Spin spinning={addFormLoading}>
        <div className="flex flex-col">
          <div className="mb-8">
            <p className="mb-0 text-red-500 text-xs italic">
              *Informasi ini harus diisi
            </p>
          </div>
          <div className="flex flex-col">
            <div className=" mb-5 px-3 flex flex-col">
              <div className="flex mb-1">
                <Label>Nama Form Aktivitas</Label>
                <span className="namaField"></span>
                <style jsx>
                  {`
                                          .namaField::before{
                                              content: '*';
                                              color: red;
                                          }
                                      `}
                </style>
              </div>
              <div className=" flex flex-col">
                <div className="mb-2 w-full">
                  <Input
                    style={{ width: `100%` }}
                    name="name"
                    defaultValue={datacreate.name}
                    onChange={onChangeInput}
                  ></Input>
                </div>
              </div>
            </div>
            <TextAreaRequired
              name="description"
              defaultValue={datacreate.description}
              onChangeInput={onChangeInput}
              label="Deskripsi Form Aktivitas"
            ></TextAreaRequired>
          </div>
          <div className="flex flex-col px-3 mb-5">
            <div className="flex mb-5">
              <Label>Daftar Isian</Label>
              <span className="pekerjaan"></span>
              <style jsx>
                {`
                                      .pekerjaan::before{
                                          content: '*';
                                          color: red;
                                      }
                                  `}
              </style>
            </div>
            {datacreate.works.length === 0 ? (
              <>
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="Daftar aktivitas masih kosong"
                />
              </>
            ) : (
              datacreate.works.map((doc, idx) => {
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
                          var temp = [...datacreate.works];
                          temp[idx].required = checked;
                          setdatacreate((prev) => ({
                            ...prev,
                            works: temp,
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
                              var temp = [...datacreate.works];
                              temp[idx].name = e.target.value;
                              setdatacreate((prev) => ({
                                ...prev,
                                works: temp,
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
                            var temp = [...datacreate.works];
                            delete temp[idx].lists;
                            temp[idx].type = value;
                            if (value === 3) {
                              temp[idx].lists = [];
                            } else if (value === 5) {
                              temp[idx].lists = [];
                            }
                            temp[idx].required = false;
                            setdatacreate((prev) => ({
                              ...prev,
                              works: temp,
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
                        </Select>
                      </div>

                      <div className="mb-5 col-span-2">
                        <Input
                          placeholder="Deskripsi"
                          value={doc.description}
                          onChange={(e) => {
                            var temp = [...datacreate.works];
                            temp[idx].description = e.target.value;
                            setdatacreate((prev) => ({
                              ...prev,
                              works: temp,
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
                            {doc.lists.map((doc2, idx2) => {
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
                                      var temp = [...datacreate.works];
                                      temp[idx].lists.splice(idx2, 1);
                                      setdatacreate((prev) => ({
                                        ...prev,
                                        works: temp,
                                      }));
                                    }}
                                  >
                                    <CircleXIconSvg
                                      size={15}
                                      color={`#BF4A40`}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                            <div className="flex items-center">
                              <div
                                className="mr-1 cursor-pointer hover:text-primary100"
                                onClick={() => {
                                  settempcb([]);
                                  var temp = [...datacreate.works];
                                  temp[idx].lists.push(tempcb[idx]);
                                  setdatacreate((prev) => ({
                                    ...prev,
                                    works: temp,
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
                          {doc.lists.map((doc4, idx4) => {
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
                                      var temp = [...datacreate.works];
                                      temp[idx].lists[idx4] = e.target.value;
                                      setdatacreate((prev) => ({
                                        ...prev,
                                        works: temp,
                                      }));
                                    }}
                                    bordered={false}
                                  />
                                  <div
                                    className="cursor-pointer flex items-center text-center justify-center"
                                    onClick={() => {
                                      var temp = [...datacreate.works];
                                      temp[idx].lists.splice(idx4, 1);
                                      setdatacreate((prev) => ({
                                        ...prev,
                                        works: temp,
                                      }));
                                    }}
                                  >
                                    <CircleXIconSvg
                                      size={15}
                                      color={`#BF4A40`}
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          <div className="flex items-center px-3">
                            <div
                              className="mr-1 cursor-pointer hover:text-primary100"
                              onClick={() => {
                                var temp = [...datacreate.works];
                                temp[idx].lists.push("");
                                setdatacreate((prev) => ({
                                  ...prev,
                                  works: temp,
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
                                lists: [...doc.lists],
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
                                lists: [...doc.lists],
                              };
                            }
                            templastdata = {
                              ...templastdata,
                              required: doc.required,
                            };

                            var temp = [...datacreate.works];
                            temp.splice(idx + 1, 0, templastdata);
                            setdatacreate((prev) => ({
                              ...prev,
                              works: temp,
                            }));
                          }}
                        >
                          <CopyIconSvg size={15} color={`#000000`} />
                        </div>
                        <div
                          className="mx-1 cursor-pointer"
                          onClick={() => {
                            console.log(idx);
                            const temp = [...datacreate.works];
                            temp.splice(idx, 1);
                            setdatacreate((prev) => ({
                              ...prev,
                              works: temp,
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
          </div>
          <div
            className="mb-4 border border-dashed border-primary100 hover:border-primary75 py-2 flex justify-center items-center w-full rounded-md cursor-pointer"
            onClick={() => {
              if (!formAktivitasId) {
                setdatacreate((prev) => ({
                  ...prev,
                  works: [
                    ...prev.works,
                    { type: 1, name: "", description: "", required: false },
                  ],
                }));
                settempcb([...tempcb, ""]);
              }
            }}
          >
            <div className="text-primary100 hover:text-primary75">
              + Tambah Aktivitas Baru
            </div>
          </div>
        </div>
      </Spin>
    </DrawerCore>
  );
};
