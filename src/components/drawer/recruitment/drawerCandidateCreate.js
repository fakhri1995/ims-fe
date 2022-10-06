import { Input, Spin, notification } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { ASSESSMENT_ADD } from "lib/features";

import ButtonSys from "../../button";
import { TrashIconSvg } from "../../icon";
import { InputRequired } from "../../input";
import { Label } from "../../typography";
import DrawerCore from "../drawerCore";

const DrawerCandidateCreate = ({
  title,
  visible,
  onvisible,
  buttonOkText,
  initProps,
  setRefresh,
  isAllowedToAddRoleAssessment,
}) => {
  //USESTATE
  const [datacreate, setdatacreate] = useState({
    id: null,
    name: "",
    add: [{ criteria: "" }],
  });
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [disabledcreate, setdisabledcreate] = useState(true);

  //HANDLER
  const onChangeInput = (e) => {
    setdatacreate({
      ...datacreate,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateForm = () => {
    const payload = {
      name: datacreate.name,
      add: datacreate.add,
    };

    if (!isAllowedToAddRoleAssessment) {
      permissionWarningNotification("Membuat", "Form Assessment");
      return;
    }
    setLoadingCreate(true);
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
        setRefresh((prev) => prev + 1);
        if (response2.success) {
          notification.success({
            message: `Form berhasil ditambahkan.`,
            duration: 3,
          });
          setTimeout(() => {
            setLoadingCreate(false);
            onvisible(false);
            setdatacreate({ id: null, name: "", add: [{ criteria: "" }] });
          }, 500);
        } else {
          notification.error({
            message: `Gagal menambahkan form assessment. ${response2.message}`,
            duration: 3,
          });
          setLoadingCreate(false);
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan form assessment. ${err.response}`,
          duration: 3,
        });
        setLoadingCreate(false);
      });
  };

  //USEEFFECT
  useEffect(() => {
    let criteriaIsFilled = datacreate.add.every(
      (detail) => detail.criteria !== ""
    );
    if (datacreate.name !== "" && criteriaIsFilled) {
      setdisabledcreate(false);
    } else {
      setdisabledcreate(true);
    }
  }, [datacreate]);

  // console.log(datacreate);
  return (
    <DrawerCore
      title={title}
      visible={visible}
      onClose={() => {
        setdatacreate({
          id: null,
          name: "",
          add: [{ criteria: "" }],
        });

        onvisible(false);
      }}
      buttonOkText={buttonOkText}
      onClick={handleCreateForm}
      disabled={disabledcreate}
    >
      <Spin spinning={loadingCreate}>
        <div className="flex flex-col">
          <div className="mb-8">
            <p className="mb-0 text-red-500 text-xs italic">
              *Informasi ini harus diisi
            </p>
          </div>

          <div className=" mb-5 flex flex-col">
            <div className="flex mb-1">
              <Label>Nama&nbsp;</Label>
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

          <div className=" mb-5 flex flex-col">
            <div className="flex mb-1">
              <Label>Email&nbsp;</Label>
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

          <div className=" mb-5 flex flex-col">
            <div className="flex mb-1">
              <Label>Universitas&nbsp;</Label>
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

          <div className=" mb-5 flex flex-col">
            <div className="flex mb-1">
              <Label>Role&nbsp;</Label>
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

          <div className=" mb-5 flex flex-col">
            <div className="flex mb-1">
              <Label>Jalur Daftar&nbsp;</Label>
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

          <div className="flex flex-row space-x-6">
            <div className=" mb-5 flex flex-col">
              <div className="flex mb-1">
                <Label>Stage&nbsp;</Label>
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

            <div className=" mb-5 flex flex-col">
              <div className="flex mb-1">
                <Label>Status&nbsp;</Label>
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
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerCandidateCreate;
