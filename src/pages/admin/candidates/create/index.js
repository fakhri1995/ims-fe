import { Form, Input } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { RESUME_ADD } from "lib/features";

import ButtonSys from "../../../../components/button";
import { CheckIconSvg, XIconSvg } from "../../../../components/icon";
import LayoutDashboard from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import { H1, H2 } from "../../../../components/typography";
import httpcookie from "cookie";

const CandidateCreate = ({ initProps, dataProfile, sidemenu }) => {
  /**
   * Dependencies
   */

  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToCreateCandidate = hasPermission(RESUME_ADD);

  const rt = useRouter();

  const tok = initProps;
  const pathArr = rt.pathname.split("/").slice(1);
  pathArr.splice(2, 1);
  pathArr[pathArr.length - 1] = "Detail Kandidat";

  const [instanceForm] = Form.useForm();
  const [newCandidate, setNewCandidate] = useState({
    name: "",
    telp: "",
    email: "",
    role: "",
    city: "",
    province: "",
  });

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
    >
      <div className="grid grid-cols-2 gap-6 ">
        <div className="col-span-2 shadow-lg rounded-md bg-white p-5 divide-y">
          <div className="flex flex-row items-center justify-between mb-4 ">
            <H1>Basic Information</H1>
            <div className="flex flex-row space-x-6">
              <ButtonSys
                type={"default"}
                color={"danger"}
                className="flex flex-row"
                onClick={() => rt.back()}
              >
                <XIconSvg size={16} color={`#BF4A40`} />
                <p>Batalkan</p>
              </ButtonSys>
              <ButtonSys type={"primary"} className="flex flex-row">
                <CheckIconSvg size={16} color={`white`} />
                <p>Tambah Kandidat</p>
              </ButtonSys>
            </div>
          </div>
          <Form
            layout="vertical"
            form={instanceForm}
            className="grid grid-cols-2 gap-x-6 pt-5"
          >
            <Form.Item
              label="Name"
              name={"name"}
              rules={[
                {
                  required: true,
                  message: "Nama kandidat wajib diisi",
                },
              ]}
              className="col-span-2"
            >
              <Input
                value={newCandidate.name}
                name={"name"}
                // onChange={onChangeCreateCandidate}
              />
            </Form.Item>
            <Form.Item
              label="Role"
              name={"role"}
              rules={[
                {
                  required: true,
                  message: "Role kandidat wajib diisi",
                },
              ]}
            >
              <Input
                value={newCandidate.role}
                name={"role"}
                // onChange={onChangeCreateCandidate}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "Email kandidat wajib diisi",
                },
                {
                  pattern:
                    /(\-)|(^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/,
                  message: "Email belum diisi dengan benar",
                },
              ]}
            >
              <Input
                value={newCandidate.email}
                name={"email"}
                // onChange={onChangeCreateCandidate}
              />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name={"telp"}
              rules={[
                {
                  required: true,
                  message: "Nomor HP wajib diisi",
                },
              ]}
            >
              <Input
                value={newCandidate.telp}
                name={"telp"}
                // onChange={onChangeCreateCandidate}
              />
            </Form.Item>
            <Form.Item
              label="Address"
              name={"address"}
              rules={[
                {
                  required: true,
                  message: "Alamat kandidat wajib diisi",
                },
              ]}
            >
              <div className="flex flex-row space-x-3">
                <Input
                  value={newCandidate.city}
                  name={"city"}
                  placeholder="City"
                  // onChange={onChangeCreateCandidate}
                />
                <Input
                  value={newCandidate.province}
                  name={"province"}
                  placeholder="Province"
                  // onChange={onChangeCreateCandidate}
                />
              </div>
            </Form.Item>
          </Form>
        </div>
        <div className="shadow-lg rounded-md bg-white p-5">
          <H2>Academic History</H2>
          <hr className="my-4" />
          <ButtonSys type={"dashed"}>
            <p className="text-primary100 hover:text-primary75">
              + Add academic history
            </p>
          </ButtonSys>
        </div>
        <div className="shadow-lg rounded-md bg-white p-5">
          <H2>Skills</H2>
          <hr className="my-4" />
          <ButtonSys type={"dashed"}>
            <p className="text-primary100 hover:text-primary75">+ Add skills</p>
          </ButtonSys>
        </div>
        <div className="shadow-lg rounded-md bg-white p-5">
          <H2>Experience</H2>
          <hr className="my-4" />
          <ButtonSys type={"dashed"}>
            <p className="text-primary100 hover:text-primary75">
              + Add experience
            </p>
          </ButtonSys>
        </div>
        <div className="shadow-lg rounded-md bg-white p-5">
          <H2>Training</H2>
          <hr className="my-4" />
          <ButtonSys type={"dashed"}>
            <p className="text-primary100 hover:text-primary75">
              + Add training
            </p>
          </ButtonSys>
        </div>
        <div className="shadow-lg rounded-md bg-white p-5">
          <H2>Projects</H2>
          <hr className="my-4" />
          <ButtonSys type={"dashed"}>
            <p className="text-primary100 hover:text-primary75">
              + Add project
            </p>
          </ButtonSys>
        </div>
        <div className="shadow-lg rounded-md bg-white p-5">
          <H2>Certifications</H2>
          <hr className="my-4" />
          <ButtonSys type={"dashed"}>
            <p className="text-primary100 hover:text-primary75">
              + Add certification
            </p>
          </ButtonSys>
        </div>
        <div className="row-span-2" />
        <div className="shadow-lg rounded-md bg-white p-5">
          <H2>Achievements</H2>
          <hr className="my-4" />
          <ButtonSys type={"dashed"}>
            <p className="text-primary100 hover:text-primary75">
              + Add achievement
            </p>
          </ButtonSys>
        </div>
        <div className="shadow-lg rounded-md bg-white p-5">
          <H2>Technical Assessment Results</H2>
        </div>
      </div>
    </LayoutDashboard>
  );
};

export async function getServerSideProps({ req, res }) {
  var initProps = {};
  if (!req.headers.cookie) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const cookiesJSON1 = httpcookie.parse(req.headers.cookie);
  if (!cookiesJSON1.token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  initProps = cookiesJSON1.token;
  const resourcesGP = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/detailProfile`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGP = await resourcesGP.json();
  const dataProfile = resjsonGP;

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "11",
    },
  };
}

export default CandidateCreate;
