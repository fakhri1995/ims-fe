import {
  Checkbox,
  Empty,
  Input,
  Modal,
  Select,
  Spin,
  Switch,
  notification,
} from "antd";
import type { AxiosError } from "axios";
import type { FC } from "react";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import DrawerCore from "components/drawer/drawerCore";
import {
  AlignJustifiedIconSvg,
  CheckboxIconSvg,
  CircleXIconSvg,
  CopyIconSvg,
  ListNumbersSvg,
  TrashIconSvg,
  UploadIconSvg,
} from "components/icon";
import { TextAreaRequired } from "components/input";
import { H2, Label } from "components/typography";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  ATTENDANCE_FORM_ADD,
  ATTENDANCE_FORM_DELETE,
  ATTENDANCE_FORM_UPDATE,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import {
  AttendanceFormAktivitasService,
  AttendanceFormAktivitasServiceQueryKeys,
  Detail,
  FormAktivitasTypes,
  useAddFormAktivitas,
  useDeleteFormAktivitas,
  useUpdateFormAktivitas,
} from "apis/attendance";

const { confirm } = Modal;

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
 * Component BuatFormAktivitasDrawer digunakan untuk create, update, dan delete Form Aktivitas.
 *
 * Phase update dan delete hanya dapat berlaku ketika props `formAktivitasId` defined.
 * Otherwise drawer ini akan create new form aktivitas.
 */
export const FormAktivitasDrawer: FC<IFormAktivitasDrawer> = ({
  title,
  visible,
  onvisible,
  buttonOkText,
  formAktivitasId,
}) => {
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  const { hasPermission } = useAccessControl();
  const isAllowedToCreateForm = hasPermission(ATTENDANCE_FORM_ADD);
  let isAllowedToUpdateForm = false;
  let isAllowedToDeleteForm = false;
  if (formAktivitasId !== undefined) {
    isAllowedToUpdateForm = hasPermission(ATTENDANCE_FORM_UPDATE);
    isAllowedToDeleteForm = hasPermission(ATTENDANCE_FORM_DELETE);
  }

  const { mutate: addFormAktivitas, isLoading: addFormLoading } =
    useAddFormAktivitas();
  const { mutate: updateFormAktivitas, isLoading: updateFormLoading } =
    useUpdateFormAktivitas();
  const { mutateAsync: deleteFormAktivitas } = useDeleteFormAktivitas(
    "/attendance/form-aktivitas"
  );

  const {
    data: existingFormAktivitasData,
    refetch: refetchExistingFormAktivitasData,
    isLoading: isLoadingExistingFormAktivitasData,
    isStale: isExistingDataStale,
  } = useQuery(
    [AttendanceFormAktivitasServiceQueryKeys.FIND_ONE, formAktivitasId],
    () => AttendanceFormAktivitasService.findOne(axiosClient, formAktivitasId),
    {
      enabled: !!formAktivitasId,
      select: (response) => {
        const mapDetailsToWorks = [...response.data.data.details].map(
          (detail) => {
            let mapped = {
              name: detail.name,
              type: detail.type,
              description: detail.description,
            };

            // special case for type === 3 || type === 5 (checkbox and dropdown)
            if (
              detail.type === FormAktivitasTypes.CHECKLIST ||
              detail.type === FormAktivitasTypes.DROPDOWN
            ) {
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
  };

  const handleSaveForm = () => {
    const payload = {
      name: datacreate.name,
      description: datacreate.description,
      details: datacreate.works,
    };

    /**
     * Replace `payload.lists` menjadi `payload.list`.
     */
    payload.details = payload.details.map((detail) => {
      let mappedPayload = {
        ...detail,
        list: detail.lists,
      };
      delete mappedPayload.lists;

      return mappedPayload;
    }) as Detail[];

    if (!formAktivitasId) {
      if (!isAllowedToCreateForm) {
        permissionWarningNotification("Membuat", "Form Aktivitas");
        return;
      }

      addFormAktivitas(payload, {
        onSuccess: (response) => {
          notification.success({
            message: response.data.message,
            duration: 3,
          });

          onvisible(false);
          setdatacreate({ name: "", description: "", works: [] });
        },
        onError: (error: AxiosError<any, any>) => {
          notification.error({
            message: `Gagal menambahkan form aktivitas. ${error.response.data.message}`,
            duration: 3,
          });
        },
      });
    } else {
      if (!isAllowedToUpdateForm) {
        permissionWarningNotification("Memperbarui", "Form Aktivitas");
        return;
      }

      updateFormAktivitas(
        {
          id: formAktivitasId,
          name: payload.name,
          description: payload.description,
        },
        {
          onSuccess: (response) => {
            notification.success({
              message: response.data.message,
              duration: 3,
            });
            queryClient.invalidateQueries(
              AttendanceFormAktivitasServiceQueryKeys.FIND
            );

            onvisible(false);
          },
          onError: (error: AxiosError<any, any>) => {
            notification.error({
              message: `Gagal memperbarui form aktivitas. ${error.response.data.message}`,
              duration: 3,
            });
          },
        }
      );
    }
  };

  const onDeleteButtonClicked = () => {
    if (!isAllowedToDeleteForm) {
      permissionWarningNotification("Menghapus", "Form Aktivitas");
      return;
    }

    confirm({
      title: "Confirm Delete Activity Form!",
      content: (
        <p>
          Are you sure to delete Activity Form{" "}
          <strong>{existingFormAktivitasData.name}</strong> with ID{" "}
          <strong>{formAktivitasId}</strong>?
        </p>
      ),
      onOk: () => {
        onvisible(false);
        return deleteFormAktivitas(formAktivitasId);
      },
      centered: true,
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
  }, [datacreate]);

  useEffect(() => {
    if (!formAktivitasId) {
      return;
    }

    if (isExistingDataStale) {
      return;
    }

    refetchExistingFormAktivitasData();
  }, [formAktivitasId]);

  useEffect(() => {
    if (!existingFormAktivitasData) {
      return;
    }

    setdatacreate(existingFormAktivitasData);
  }, [existingFormAktivitasData]);

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
      buttonCancelText={formAktivitasId ? "Delete Form" : undefined}
      onButtonCancelClicked={
        formAktivitasId ? onDeleteButtonClicked : undefined
      }
      onClick={handleSaveForm}
      disabled={disabledcreate}
    >
      <Spin
        spinning={
          addFormLoading ||
          updateFormLoading ||
          isLoadingExistingFormAktivitasData
        }
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex">
                <p>Activity Form Name</p>
                <span className="namaField"></span>
                <style jsx>
                  {`
                      .namaField::before{
                          content: '*';
                          color: #BF4A40;
                      }
                  `}
                </style>
              </div>
              <div className="mb-2 w-full">
                <Input
                  style={{ width: `100%` }}
                  name="name"
                  value={datacreate.name}
                  onChange={onChangeInput}
                ></Input>
              </div>
            </div>

            <TextAreaRequired
              name="description"
              value={datacreate.description}
              onChangeInput={onChangeInput}
              label="Activity Form Description"
            ></TextAreaRequired>
          </div>

          {/* Menampilkan fields untuk create new form aktivitas */}
          {!formAktivitasId && (
            <>
              <div className="flex flex-col">
                <div className="flex">
                  <p>List of Fields</p>
                  <span className="pekerjaan"></span>
                  <style jsx>
                    {`
                        .pekerjaan::before{
                            content: '*';
                            color: #BF4A40;
                        }
                    `}
                  </style>
                </div>
                {datacreate.works.length === 0 ? (
                  <>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </>
                ) : (
                  datacreate.works.map((doc, idx) => {
                    return (
                      <div
                        key={idx}
                        className="bg-white flex flex-col shadow-md rounded-md p-3 mb-4 border"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <span className="block">Required</span>
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
                                placeholder="Title"
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
                                if (value === FormAktivitasTypes.CHECKLIST) {
                                  temp[idx].lists = [];
                                } else if (
                                  value === FormAktivitasTypes.DROPDOWN
                                ) {
                                  temp[idx].lists = [];
                                }
                                temp[idx].required = false;
                                setdatacreate((prev) => ({
                                  ...prev,
                                  works: temp,
                                }));
                              }}
                            >
                              <Select.Option value={FormAktivitasTypes.TEKS}>
                                <div className="flex items-center">
                                  <AlignJustifiedIconSvg
                                    size={12}
                                    color={`#35763B`}
                                  />
                                  Text
                                </div>
                              </Select.Option>
                              <Select.Option
                                value={FormAktivitasTypes.PARAGRAPH}
                              >
                                <div className="flex items-center">
                                  <AlignJustifiedIconSvg
                                    size={12}
                                    color={`#35763B`}
                                  />
                                  Paragraph
                                </div>
                              </Select.Option>
                              <Select.Option
                                value={FormAktivitasTypes.CHECKLIST}
                              >
                                <div className="flex items-center">
                                  <CheckboxIconSvg
                                    size={12}
                                    color={`#35763B`}
                                  />
                                  Checklist
                                </div>
                              </Select.Option>
                              <Select.Option value={FormAktivitasTypes.NUMERAL}>
                                <div className="flex items-center">
                                  <ListNumbersSvg size={12} color={`#35763B`} />
                                  Number
                                </div>
                              </Select.Option>
                              <Select.Option
                                value={FormAktivitasTypes.DROPDOWN}
                              >
                                <div className="flex items-center">
                                  <ListNumbersSvg size={12} color={`#35763B`} />
                                  Dropdown
                                </div>
                              </Select.Option>
                              <Select.Option value={FormAktivitasTypes.UNGGAH}>
                                <div className="flex items-center">
                                  <UploadIconSvg size={12} color={`#35763B`} />
                                  Upload File
                                </div>
                              </Select.Option>
                            </Select>
                          </div>

                          <div className="mb-5 col-span-2">
                            <Input
                              placeholder="Description"
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

                          {doc.type === FormAktivitasTypes.CHECKLIST && (
                            <div className="flex flex-col mb-3 col-span-2">
                              <div className="mb-3 flex flex-col">
                                <div className="mb-1">
                                  <Label>Checklist</Label>
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
                                    placeholder="Add"
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

                          {doc.type === FormAktivitasTypes.DROPDOWN && (
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
                                        placeholder="Add"
                                        style={{ marginRight: `0.5rem` }}
                                        value={doc4}
                                        onChange={(e) => {
                                          var temp = [...datacreate.works];
                                          temp[idx].lists[idx4] =
                                            e.target.value;
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
                                    + Add Value
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
                                if (
                                  doc.type === FormAktivitasTypes.TEKS ||
                                  doc.type === FormAktivitasTypes.PARAGRAPH
                                ) {
                                  templastdata = {
                                    name: doc.name,
                                    type: doc.type,
                                    description: doc.description,
                                  };
                                } else if (
                                  doc.type === FormAktivitasTypes.CHECKLIST
                                ) {
                                  templastdata = {
                                    name: doc.name,
                                    type: doc.type,
                                    description: doc.description,
                                    lists: [...doc.lists],
                                  };
                                } else if (
                                  doc.type === FormAktivitasTypes.NUMERAL
                                ) {
                                  templastdata = {
                                    name: doc.name,
                                    type: doc.type,
                                    description: doc.description,
                                  };
                                } else if (
                                  doc.type === FormAktivitasTypes.DROPDOWN
                                ) {
                                  templastdata = {
                                    name: doc.name,
                                    type: doc.type,
                                    description: doc.description,
                                    lists: [...doc.lists],
                                  };
                                } else if (
                                  doc.type === FormAktivitasTypes.UNGGAH
                                ) {
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
                        {
                          type: FormAktivitasTypes.TEKS,
                          name: "",
                          description: "",
                          required: false,
                        },
                      ],
                    }));
                    settempcb([...tempcb, ""]);
                  }
                }}
              >
                <div className="text-primary100 hover:text-primary75">
                  + Add New Fields
                </div>
              </div>
            </>
          )}
        </div>
      </Spin>
    </DrawerCore>
  );
};
