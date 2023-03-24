import { SearchOutlined } from "@ant-design/icons";
import { Button, Modal, Table } from "antd";
import moment from "moment";
import { Router, useRouter } from "next/router";
import { useState } from "react";

import { AccessControl } from "components/features/AccessControl";

import { MESSAGES_GET } from "lib/features";

import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
import httpcookie from "cookie";

const FormSolution = ({ initProps, dataProfile, dataMessages, sidemenu }) => {
  const rt = useRouter();

  const pathArr = rt.pathname.split("/").slice(1);

  //Definisi table
  const columnsFeature = [
    {
      title: "No",
      dataIndex: "nomor",
      key: "nomor",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <>
              <h1 className="hover:text-gray-500">{record.nomor}</h1>
            </>
          ),
        };
      },
    },
    {
      title: "Contact Name",
      dataIndex: "contact_name",
      key: "contact_name",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <>
              <p className=" text-base">{record.contact_name}</p>
            </>
          ),
        };
      },
    },
    {
      title: "Company Email",
      dataIndex: "email",
      key: "email",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <>
              <p className="text-xs">{record.email}</p>
            </>
          ),
        };
      },
    },
    {
      title: "Company Name",
      dataIndex: "company_name",
      key: "company_name",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <>
              <p className="text-xs">{record.company_name}</p>
            </>
          ),
        };
      },
    },
    {
      title: "Kind Form",
      dataIndex: "kind_form",
      key: "kind_form",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <>
              <h1 className="text-xs">{record.kind_form}</h1>
            </>
          ),
        };
      },
    },
    {
      title: "Meeting Schedule",
      dataIndex: "meeting_schedule",
      key: "meeting_schedule",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <>
              <h1 className="text-xs">
                {moment(record.meeting_schedule).format("DD MMMM YYYY, h:mm a")}
              </h1>
            </>
          ),
        };
      },
    },
    {
      dataIndex: "status",
      key: "status",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <div className=" flex">
              <Button
                style={{
                  paddingTop: `0`,
                  paddingBottom: `0.3rem`,
                  marginRight: `1rem`,
                }}
                onClick={() => {
                  rt.push(`/admin/form-solution/${record.id}`);
                }}
              >
                <p>Details</p>
              </Button>
            </div>
          ),
        };
      },
    },
  ];

  //useState
  const datatemp = dataMessages.data ?? [];
  const dataMessagesMap = datatemp.map((doc, idx) => {
    return {
      ...doc,
      nomor: idx + 1,
    };
  });

  //detail
  const [modaldetail, setmodaldetail] = useState(false);
  const [loadingdetail, setloadingdetail] = useState(false);
  const [datadetail, setdatadetail] = useState({
    name: "",
    company_email: "",
    company_name: "",
    interseted_in: "",
    message: "",
  });

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      pathArr={pathArr}
      sidemenu={"93"}
      st={st}
    >
      <div className="w-full grid grid-cols-5 border-t border-opacity-30 border-gray-500 bg-white">
        <div className="col-span-5 border-b border-opacity-30 border-gray-400 flex items-center justify-between px-0 py-4 md:p-4 mb-5">
          <h1 className="font-bold">Form Solution</h1>
        </div>
        <div className="col-span-5 p-0 md:p-5 flex flex-col">
          <AccessControl hasPermission={MESSAGES_GET}>
            <Table
              columns={columnsFeature}
              dataSource={dataMessagesMap}
              pagination={{ pageSize: 8 }}
              scroll={{ x: 300 }}
            ></Table>
          </AccessControl>
        </div>
      </div>
      <Modal
        title={`Form Solution Detail`}
        visible={modaldetail}
        okButtonProps={{ disabled: loadingdetail }}
        onCancel={() => {
          setmodaldetail(false);
        }}
        style={{ top: `3rem` }}
        width={500}
        footer={null}
        destroyOnClose={true}
      >
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold mb-2">Name:</h1>
          <p className="text-sm mb-5">{datadetail.company_name}</p>
          <h1 className="text-sm font-semibold mb-2">Company Name:</h1>
          <p className="text-sm mb-5">{datadetail.company_name}</p>
          <h1 className="text-sm font-semibold mb-2">Company Email:</h1>
          <p className="text-sm mb-5">{datadetail.company_email}</p>
          <h1 className="text-sm font-semibold mb-2">Kind of Form:</h1>
          <p className="text-sm mb-5">{datadetail.interseted_in}</p>
          <h1 className="text-sm font-semibold mb-2">Meeting Schedule:</h1>
          <p className="text-sm mb-5">{datadetail.meeting_schedule}</p>
        </div>
      </Modal>
    </Layout>
  );
};

export async function getServerSideProps({ req, res }) {
  var initProps = {};
  if (req && req.headers) {
    const cookies = req.headers.cookie;
    if (!cookies) {
      res.writeHead(302, { Location: "/login" });
      res.end();
    }
    if (typeof cookies === "string") {
      const cookiesJSON = httpcookie.parse(cookies);
      initProps = cookiesJSON.token;
    }
  }
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

  const resourcesGM = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getFormSolution`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGM = await resourcesGM.json();
  const dataMessages = resjsonGM;
  console.log("datanya ", dataMessages);
  return {
    props: {
      initProps,
      dataProfile,
      dataMessages,
      sidemenu: "4",
    },
  };
}

export default FormSolution;
