import { Input, Modal, Spin, notification } from "antd";
import type { AxiosError } from "axios";
import axios from "axios";
import type { FC } from "react";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import DrawerCore from "components/drawer/drawerCore";
import { TrashIconSvg } from "components/icon";
import { H2, Label } from "components/typography";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  ROLE_ASSESSMENT_ADD,
  ROLE_ASSESSMENT_DELETE,
  ROLE_ASSESSMENT_UPDATE,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

// import {
//   AttendanceFormAktivitasService,
//   AttendanceFormAktivitasServiceQueryKeys,
//   Detail,
//   FormAktivitasTypes,
//   useAddFormAssessment,
//   useDeleteFormAktivitas,
//   useUpdateFormAktivitas,
// } from "apis/attendance";

const { confirm } = Modal;

/**
 * Component BuatFormAktivitasDrawer's props.
 */
export interface IDrawerFormCreate {
  /**
   * Flag to let the drawer behave to update and not to create.
   * Use this flag on detail page only.
   *
   * If it is left undefined, then the drawer will behave to add new data.
   */
  formAssessmentId?: number;

  title: string;
  buttonOkText: string;

  visible: boolean;
  onvisible: (visibleValue: boolean) => void;
  initProps: string;
}

/**
 * Component BuatFormAktivitasDrawer digunakan untuk create, update, dan delete Form Aktivitas.
 *
 * Phase update dan delete hanya dapat berlaku ketika props `formAssessmentId` defined.
 * Otherwise drawer ini akan create new form aktivitas.
 */
export const DrawerFormCreate: FC<IDrawerFormCreate> = ({
  title,
  visible,
  onvisible,
  buttonOkText,
  formAssessmentId,
  initProps,
}) => {
  // console.log(formAssessmentId)
  const axiosClient = useAxiosClient();
  const { hasPermission } = useAccessControl();
  const isAllowedToCreateForm = hasPermission(ROLE_ASSESSMENT_ADD);
  let isAllowedToUpdateForm = false;
  // let isAllowedToDeleteForm = false;
  if (formAssessmentId !== undefined) {
    isAllowedToUpdateForm = hasPermission(ROLE_ASSESSMENT_UPDATE);
    // isAllowedToDeleteForm = hasPermission(ROLE_ASSESSMENT_DELETE);
  }

  // const { mutate: addFormAssessment, isLoading: addFormLoading } =
  //   useAddFormAssessment();
  // const { mutate: updateFormAssessment, isLoading: updateFormLoading } =
  //   useUpdateFormAktivitas();
  // const { mutateAsync: deleteFormAssessment } = useDeleteFormAktivitas(
  //   "/attendance/form-aktivitas"
  // );

  // const {
  //   data: existingFormAssessmentData,
  //   refetch: refetchExistingFormAssessmentData,
  //   isStale: isExistingDataStale,
  // } = useQuery(
  //   [AttendanceFormAktivitasServiceQueryKeys.FIND_ONE, formAssessmentId],
  //   () => AttendanceFormAktivitasService.findOne(axiosClient, formAssessmentId),
  //   {
  //     enabled: false,
  //     select: (response) => {
  //       const mapAddCriteria = [...response.data.data.add].map(
  //         (add) => {
  //           let mapped = {
  //             criteria: add.criteria
  //           };

  //           return mapped;
  //         }
  //       );

  //       return {
  //         name: response.data.data.name,
  //         add: mapAddCriteria,
  //       };
  //     },
  //   }
  // );

  //USESTATE
  const [datacreate, setdatacreate] = useState({
    id: null,
    name: "",
    add: [{ criteria: "" }],
  });
  // const [dataedit, setdataedit] = useState({
  //   id: 0,
  //   name: "",
  //   add: [],
  //   update: [],
  //   delete: [],
  // });

  const [disabledcreate, setdisabledcreate] = useState(true);

  //HANDLER
  const onChangeInput = (e) => {
    setdatacreate({
      ...datacreate,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddForm = () => {
    const payload = {
      name: datacreate.name,
      add: datacreate.add,
    };

    if (!formAssessmentId) {
      if (!isAllowedToCreateForm) {
        permissionWarningNotification("Membuat", "Form Assessment");
        return;
      }
      console.log(payload);
      console.log(initProps);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addAssessment`, {
        method: "POST",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((response2) => {
          console.log(response2);
          notification.success({
            message: response2.message,
            duration: 3,
          });
          onvisible(false);
          setdatacreate({ id: null, name: "", add: [{ criteria: "" }] });
        })
        .catch((err) => {
          console.log(err);
          notification.error({
            message: `Gagal menambahkan form assessment. ${err.response}`,
            duration: 3,
          });
        });
    } else {
      if (!isAllowedToUpdateForm) {
        permissionWarningNotification("Memperbarui", "Form Assessment");
        return;
      }

      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateAssessment`, {
        method: "PUT",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datacreate),
      })
        .then((res) => res.json())
        .then((res2) => {
          notification.success({
            message: res2.message,
            duration: 3,
          });
          setdatacreate({
            id: 0,
            name: "",
            add: [],
            // update: [],
            // delete: [],
          });
          setTimeout(() => {
            // setloadingedit(false);
            // setdrawedit(false);
            onvisible(false);
            // rt.push(`/admin/role-assessment`);
          }, 500);
        })
        .catch((err) => {
          notification["error"]({
            message: `Gagal memperbarui form assessment. ${err.response}`,
            duration: 3,
          });
          // setloadingedit(false);
          // setdrawedit(false);
          onvisible(false);
        });
    }
  };

  //USEEFFECT
  useEffect(() => {
    if (datacreate.name !== "" && datacreate.add.length !== 0) {
      setdisabledcreate(false);
    } else {
      setdisabledcreate(true);
    }
  }, [datacreate]);

  // useEffect(() => {
  //   if (
  //     dataedit.name !== "" &&
  //     dataedit.add.length !== 0
  //   ) {
  //     setdisabledcreate(false);
  //   } else {
  //     setdisabledcreate(true);
  //   }
  // }, [dataedit]);

  // useEffect(() => {
  //   if (!formAssessmentId) {
  //     return;
  //   }

  //   const fetchAssesment = async () => {
  //     const assessment =  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getAssessment?id=${formAssessmentId}`, {
  //       method: `GET`,
  //       headers: {
  //       Authorization: JSON.parse(initProps),
  //       },
  //     })
  //     const assessmentJson = await assessment.json();

  //     setdatacreate({
  //       id: formAssessmentId,
  //       name: assessmentJson.data.name,
  //       add: assessmentJson.data.details,
  //       // update: record.update,
  //       // delete: record.delete,
  //     });
  //   }

  //   fetchAssesment()
  //     .catch(err => {
  //       notification["error"]({
  //         message: `Gagal memperbarui form assessment. ${err.response}`,
  //         duration: 3,
  //       })
  //     })

  // }, [formAssessmentId]);

  // useEffect(() => {
  //   if (!existingFormAssessmentData) {
  //     return;
  //   }

  //   setdatacreate(existingFormAssessmentData);
  // }, [existingFormAssessmentData]);

  return (
    <DrawerCore
      title={title}
      visible={visible}
      onClose={() => {
        if (!formAssessmentId) {
          setdatacreate({
            id: null,
            name: "",
            add: [{ criteria: "" }],
          });
        }
        onvisible(false);
      }}
      buttonOkText={buttonOkText}
      // buttonCancelText={formAssessmentId ? "Hapus Form" : undefined}
      // onButtonCancelClicked={
      //   formAssessmentId ? onDeleteButtonClicked : undefined
      // }
      onClick={handleAddForm}
      disabled={disabledcreate}
    >
      {/* <Spin spinning={addFormLoading || updateFormLoading}> */}
      <div className="flex flex-col">
        <div className="mb-8">
          <p className="mb-0 text-red-500 text-xs italic">
            *Informasi ini harus diisi
          </p>
        </div>
        <div className="flex flex-col">
          <div className=" mb-5 flex flex-col">
            <div className="flex mb-1">
              <Label>Nama Form</Label>
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
            <Input
              style={{ width: `100%` }}
              name="name"
              defaultValue={datacreate.name}
              onChange={onChangeInput}
            ></Input>
          </div>
        </div>

        {/* Menampilkan fields untuk add criteria*/}
        {!formAssessmentId && (
          <>
            <div className="flex flex-col mb-4">
              <div className="flex mb-1">
                <Label>Kriteria</Label>
                <span className="criteria"></span>
                <style jsx>
                  {`
                          .criteria::before{
                              content: '*';
                              color: red;
                          }
                      `}
                </style>
              </div>
              {datacreate.add.map((add, idx) => {
                return (
                  <div key={idx} className="flex flex-row mb-3">
                    <Input
                      value={add.criteria}
                      placeholder="Nama kriteria"
                      onChange={(e) => {
                        var temp = [...datacreate.add];
                        temp[idx].criteria = e.target.value;
                        setdatacreate((prev) => ({
                          ...prev,
                          add: temp,
                        }));
                      }}
                    ></Input>
                    <div
                      className="ml-2 cursor-pointer"
                      onClick={() => {
                        if (datacreate.add.length > 1) {
                          const temp = [...datacreate.add];
                          temp.splice(idx, 1);
                          setdatacreate((prev) => ({
                            ...prev,
                            add: temp,
                          }));
                        }
                      }}
                    >
                      <TrashIconSvg
                        size={15}
                        color={
                          datacreate.add.length == 1 ? `#CCCCCC` : `#BF4A40`
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              className="mb-4 border border-dashed border-primary100 hover:border-primary75 py-2 flex justify-center items-center w-full rounded-md cursor-pointer"
              onClick={() => {
                if (!formAssessmentId) {
                  setdatacreate((prev) => ({
                    ...prev,
                    add: [
                      ...prev.add,
                      {
                        criteria: "",
                      },
                    ],
                  }));
                }
              }}
            >
              <div className="text-primary100 hover:text-primary75">
                + Tambah Kriteria
              </div>
            </div>
          </>
        )}
      </div>
      {/* </Spin> */}
    </DrawerCore>
  );
};
