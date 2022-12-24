import { Input, Spin, notification } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import { ASSESSMENT_GET, ASSESSMENT_UPDATE } from "lib/features";

import ButtonSys from "../../button";
import { TrashIconSvg } from "../../icon";
import { InputRequired } from "../../input";
import { ModalUbah } from "../../modal/modalCustom";
import { Label } from "../../typography";
import DrawerCore from "../drawerCore";

const DrawerAssessmentUpdate = ({
  title,
  id,
  visible,
  onvisible,
  buttonOkText,
  initProps,
  trigger,
  setRefresh,
  modalUpdate,
  setModalUpdate,
}) => {
  /**
   * Dependencies
   */
  const { hasPermission } = useAccessControl();
  const isAllowedToUpdateRoleAssessment = hasPermission(ASSESSMENT_UPDATE);
  const isAllowedToGetRoleAssessment = hasPermission(ASSESSMENT_GET);
  const canUpdateRoleAssessment =
    isAllowedToUpdateRoleAssessment && isAllowedToGetRoleAssessment;

  const rt = useRouter();

  //USESTATE
  const [datadisplay, setdatadisplay] = useState({
    id: 0,
    name: "",
    resumes_count: 0,
    details: [],
  });
  const [dataupdate, setdataupdate] = useState({
    id: 0,
    name: "",
    add: [],
    update: [],
    delete: [],
  });
  const [loadingDataRoleAssessment, setLoadingDataRoleAssessment] =
    useState(false);
  const [loadingupdate, setloadingupdate] = useState(false);
  const [disabledupdate, setdisabledupdate] = useState(true);
  const [deletestate, setdeletestate] = useState(false);
  const [criteriaLen, setCriteriaLen] = useState(0);

  //USEEFFECT
  // Get a role assessment data
  useEffect(() => {
    if (!isAllowedToGetRoleAssessment) {
      setLoadingDataRoleAssessment(false);
      return;
    }

    if (trigger !== -1) {
      setLoadingDataRoleAssessment(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAssessment?id=${id.current}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          setCriteriaLen(res2.data.details.length);
          setdatadisplay({
            id: res2.data.id,
            name: res2.data.name,
            resumes_count: res2.data.resumes_count,
            details: res2.data.details,
          });
          setdataupdate((prev) => ({
            ...prev,
            id: res2.data.id,
            name: res2.data.name,
          }));
          setLoadingDataRoleAssessment(false);
          // console.log(datadisplay)
        });
    }
  }, [trigger, isAllowedToGetRoleAssessment]);

  // Disable update button if there are any empty field
  useEffect(() => {
    let criteriaIsFilled = datadisplay.details.every(
      (detail) => detail.criteria !== ""
    );
    if (datadisplay.name !== "" && criteriaIsFilled) {
      setdisabledupdate(false);
    } else {
      setdisabledupdate(true);
    }
  }, [datadisplay]);

  //HANDLER
  const onChangeInput = (e) => {
    setdatadisplay({
      ...datadisplay,
      [e.target.name]: e.target.value,
    });
    setdataupdate({
      ...dataupdate,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateRoleAssessment = () => {
    setloadingupdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateAssessment`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataupdate),
    })
      .then((res) => res.json())
      .then((res2) => {
        setRefresh((prev) => prev + 1);
        if (res2.success) {
          setTimeout(() => {
            setloadingupdate(false);
            setdataupdate({
              id: 0,
              name: "",
              add: [],
              update: [],
              delete: [],
            });
            onvisible(false);
            setModalUpdate(false);
          }, 500);
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
        } else {
          setloadingupdate(false);
          setModalUpdate(false);
          notification["error"]({
            message: `Gagal mengubah form. ${res2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        setloadingupdate(false);
        notification["error"]({
          message: `Gagal mengubah form. ${err.message}`,
          duration: 3,
        });
      });
  };

  // console.log("data display", datadisplay)
  // console.log("data update", dataupdate)
  return (
    <DrawerCore
      title={title}
      visible={visible}
      onClose={() => {
        setdataupdate({
          id: "",
          name: "",
          add: [],
          update: [],
          delete: [],
        });
        onvisible(false);
      }}
      buttonOkText={buttonOkText}
      onClick={() => setModalUpdate(true)}
      disabled={disabledupdate || !canUpdateRoleAssessment}
    >
      {loadingDataRoleAssessment ? (
        <>
          <Spin />
        </>
      ) : (
        <div className="flex flex-col">
          <p className="mb-8 text-red-500 text-xs italic">
            *Informasi ini harus diisi
          </p>

          <InputRequired
            name="name"
            defaultValue={datadisplay.name}
            onChangeInput={onChangeInput}
            label="Nama Form"
          ></InputRequired>

          <div className="flex flex-col mb-5">
            <div className="flex mb-1">
              <Label>Kriteria</Label>
              <span className="kriteria"></span>
              <style jsx>
                {`
                  .kriteria::before{
                      content: '*';
                      color: red;
                  }
              `}
              </style>
            </div>
            {datadisplay.details.length === 1 ? (
              <>
                {datadisplay.details.map((doc, idx) => {
                  return (
                    <div
                      key={idx}
                      className="flex flex-row mb-4 justify-between"
                    >
                      <Input
                        value={doc.criteria}
                        placeholder="Nama Kriteria"
                        onChange={(e) => {
                          let newCriteria = e.target.value;
                          const tempdisplay = [...datadisplay.details];
                          tempdisplay[idx].criteria = newCriteria;
                          setdatadisplay((prev) => ({
                            ...prev,
                            details: tempdisplay,
                          }));
                          if (doc.id) {
                            var idxdataupdate = dataupdate.update
                              .map((docmap) => docmap.id)
                              .indexOf(doc.id);
                            if (idxdataupdate === -1) {
                              setdataupdate((prev) => ({
                                ...prev,
                                update: [
                                  ...prev.update,
                                  { ...doc, criteria: newCriteria },
                                ],
                              }));
                            } else {
                              var temp = [...dataupdate.update];
                              temp[idxdataupdate].criteria = newCriteria;
                              setdataupdate((prev) => ({
                                ...prev,
                                update: temp,
                              }));
                            }
                          } else {
                            var temp = [...dataupdate.add];
                            temp[idx - criteriaLen].criteria = newCriteria;
                            setdataupdate((prev) => ({
                              ...prev,
                              add: temp,
                            }));
                          }
                        }}
                      ></Input>
                      <div className="mx-1">
                        <TrashIconSvg size={18} color={`#CCCCCC`} />
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                {deletestate
                  ? null
                  : datadisplay.details.map((doc, idx) => {
                      return (
                        <div
                          key={idx}
                          className="flex flex-row mb-4 justify-between"
                        >
                          <Input
                            value={doc.criteria}
                            placeholder="Nama Kriteria"
                            onChange={(e) => {
                              let newCriteria = e.target.value;
                              const tempdisplay = [...datadisplay.details];
                              tempdisplay[idx].criteria = newCriteria;
                              setdatadisplay((prev) => ({
                                ...prev,
                                details: tempdisplay,
                              }));
                              if (doc.id) {
                                var idxdataupdate = dataupdate.update
                                  .map((docmap) => docmap.id)
                                  .indexOf(doc.id);

                                if (idxdataupdate === -1) {
                                  setdataupdate((prev) => ({
                                    ...prev,
                                    update: [
                                      ...prev.update,
                                      {
                                        id: doc.id,
                                        criteria: newCriteria,
                                      },
                                    ],
                                  }));
                                } else {
                                  var temp = [...dataupdate.update];
                                  temp[idxdataupdate].criteria = newCriteria;
                                  setdataupdate((prev) => ({
                                    ...prev,
                                    update: temp,
                                  }));
                                }
                              } else {
                                var temp = [...dataupdate.add];
                                temp[idx - criteriaLen].criteria = newCriteria;
                                setdataupdate((prev) => ({
                                  ...prev,
                                  add: temp,
                                }));
                              }
                            }}
                          ></Input>
                          <div
                            className="mx-1 cursor-pointer"
                            onClick={async () => {
                              setdeletestate(true);
                              const temp = [...datadisplay.details];
                              const temp2 = [...datadisplay.details];
                              temp.splice(idx, 1);

                              setdatadisplay((prev) => ({
                                ...prev,
                                details: [...temp],
                              }));
                              temp2[idx].id
                                ? (setdataupdate((prev) => ({
                                    ...prev,
                                    delete: [...prev.delete, temp2[idx].id],
                                  })),
                                  setCriteriaLen((prev) => prev - 1))
                                : setdataupdate((prev) => ({
                                    ...prev,
                                    add: temp2.filter(
                                      (dfil) =>
                                        typeof dfil.id === "undefined" &&
                                        dfil.criteria !== temp2[idx].criteria
                                    ),
                                  }));
                              setdeletestate(false);
                            }}
                          >
                            <TrashIconSvg size={18} color={`#BF4A40`} />
                          </div>
                        </div>
                      );
                    })}
              </>
            )}
          </div>
          <ButtonSys
            type={"dashed"}
            onClick={() => {
              setdatadisplay((prev) => ({
                ...prev,
                details: [...prev.details, { criteria: "" }],
              }));
              setdataupdate((prev) => ({
                ...prev,
                add: [...prev.add, { criteria: "" }],
              }));
            }}
          >
            <p className="text-primary100 hover:text-primary75">
              + Tambah Kriteria
            </p>
          </ButtonSys>
        </div>
      )}

      {/* Modal */}
      <AccessControl hasPermission={ASSESSMENT_UPDATE}>
        <ModalUbah
          title={`Peringatan`}
          visible={modalUpdate}
          onvisible={setModalUpdate}
          onOk={handleUpdateRoleAssessment}
          onCancel={() => {
            setModalUpdate(false);
          }}
          loading={loadingupdate}
          // disabled={candidateCount > 0}
        >
          <div className="space-y-4">
            <p className="">
              Form assessment <strong>{datadisplay.name}</strong> digunakan oleh{" "}
              <strong>{datadisplay.resumes_count}</strong> kandidat. Apakah Anda
              yakin ingin melanjutkan pengubahan?
            </p>
            <p>
              Data hasil assessment kandidat yang menggunakan form ini akan
              tetap disimpan.
            </p>
          </div>
        </ModalUbah>
      </AccessControl>
    </DrawerCore>
  );
};

export default DrawerAssessmentUpdate;
