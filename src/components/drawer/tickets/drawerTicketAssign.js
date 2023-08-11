import { SearchOutlined } from "@ant-design/icons";
import { Input, Spin, notification } from "antd";
import React, { useEffect, useState } from "react";

import { UserIconSvg } from "../../icon";
import { H2, Label } from "../../typography";
import DrawerCore from "../drawerCore";

const DrawerTicketAssign = ({
  title,
  visible,
  onvisible,
  onClose,
  buttonOkText,
  disabled,
  initProps,
  refresh,
  setrefresh,
  setrefreshclosed,
  datapayload,
  setdatapayload,
  ticketid,
}) => {
  //useState

  const [listengs, setlistengs] = useState([]);
  const [loadinggetengs, setloadinggetengs] = useState(false);
  const [listgroups, setlistgroups] = useState([]);
  const [loadinggetgroups, setloadinggetgroups] = useState(false);
  const [loadingsave, setloadingsave] = useState(false);
  const [disabledcreate, setdisabledcreate] = useState(true);
  const [disabledtrigger, setdisabledtrigger] = useState(-1);

  //handler
  const handleAssign = () => {
    setloadingsave(true);
    setdisabledcreate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/assignTicket`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datapayload),
    })
      .then((res) => res.json())
      .then((res2) => {
        setloadingsave(false);
        setdisabledcreate(false);
        if (res2.success) {
          setrefresh((prev) => prev + 1);
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
  };

  //useEffect
  useEffect(() => {
    /** NOTE: `assignable_type` === 0 is for group */
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAssignToList?assignable_type=0`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setlistgroups(res2.data);
      });
  }, []);

  useEffect(() => {
    /** NOTE: `assignable_type` === 1 is for an engineer (individual) */
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAssignToList?assignable_type=1`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setlistengs(res2.data);
      });
  }, []);

  useEffect(() => {
    if (datapayload.assignable_id !== null) {
      setdisabledcreate(false);
    } else {
      setdisabledcreate(true);
    }
  }, [disabledtrigger]);

  return (
    <DrawerCore
      title={title}
      visible={visible}
      onClose={() => {
        setrefreshclosed((prev) => prev + 1);
        onvisible(false);
      }}
      buttonOkText={buttonOkText}
      onClick={handleAssign}
      disabled={disabledcreate}
    >
      {loadingsave ? (
        <>
          <Spin />
        </>
      ) : (
        <div className=" flex flex-col px-3">
          <div className=" my-5 flex items-center">
            <div
              id="ind"
              className={`mr-4 text-primary100 bg-white hover:bg-primary100 hover:border-primary100 border-2 hover:text-white border-primary100 ${
                datapayload.assignable_type === false && `border-opacity-20`
              } px-6 btn btn-sm`}
              onClick={() => {
                setdatapayload({ ...datapayload, assignable_type: true });
              }}
            >
              Individu
            </div>
            <div
              id="grup"
              className={`mr-4 text-primary100 bg-white hover:bg-primary100 hover:border-primary100 border-2 hover:text-white border-primary100 ${
                datapayload.assignable_type === true && `border-opacity-20`
              } px-6 btn btn-sm`}
              onClick={() => {
                setdatapayload({ ...datapayload, assignable_type: false });
              }}
            >
              Grup
            </div>
          </div>
          <div className="my-5">
            <Input
              suffix={<SearchOutlined rev={""} />}
              allowClear
              placeholder="Nama Staff, Group.."
              onChange={(e) => {
                if (datapayload.assignable_type === true) {
                  setloadinggetengs(true);
                  fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAssignToList?assignable_type=1&name=${e.target.value}`,
                    {
                      method: `GET`,
                      headers: {
                        Authorization: JSON.parse(initProps),
                      },
                    }
                  )
                    .then((res) => res.json())
                    .then((res2) => {
                      setlistengs(res2.data);
                      setloadinggetengs(false);
                    });
                } else {
                  setloadinggetgroups(true);
                  fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAssignToList?assignable_type=0&name=${e.target.value}`,
                    {
                      method: `GET`,
                      headers: {
                        Authorization: JSON.parse(initProps),
                      },
                    }
                  )
                    .then((res) => res.json())
                    .then((res2) => {
                      setlistgroups(res2.data);
                      setloadinggetgroups(false);
                    });
                }
              }}
            ></Input>
          </div>
          <div className="my-5 flex flex-col max-h-screen overflow-y-scroll">
            {loadinggetengs ? (
              <>
                <Spin />
              </>
            ) : (
              datapayload.assignable_type === true &&
              listengs.map((eng, idx) => (
                <div
                  key={idx}
                  className={`${
                    datapayload.assignable_id === eng.id && `bg-primary10`
                  } mb-4 flex items-center cursor-pointer`}
                  onClick={() => {
                    setdatapayload({ ...datapayload, assignable_id: eng.id });
                    setdisabledtrigger((prev) => prev + 1);
                  }}
                >
                  <div className=" w-10 h-10 rounded-full mr-3">
                    <img
                      src={
                        eng.profile_image === "" || eng.profile_image === "-"
                          ? "/image/staffTask.png"
                          : `${eng.profile_image}`
                      }
                      className=" object-contain w-10 h-10"
                      alt=""
                    />
                  </div>
                  <div className=" flex flex-col justify-center">
                    <div className="mb-1 flex">
                      <div className="mr-1">
                        <H2>{eng.name}</H2>
                      </div>
                    </div>
                    <div>
                      <Label>{eng.position}</Label>
                    </div>
                  </div>
                </div>
              ))
            )}
            {loadinggetgroups ? (
              <>
                <Spin />
              </>
            ) : (
              datapayload.assignable_type === false &&
              listgroups.map((group, idx) => (
                <div
                  key={idx}
                  className={`${
                    datapayload.assignable_id === group.id && `bg-primary10`
                  } mb-4 flex items-center cursor-pointer`}
                  onClick={() => {
                    setdatapayload({ ...datapayload, assignable_id: group.id });
                    setdisabledtrigger((prev) => prev + 1);
                  }}
                >
                  <div className=" w-10 h-10 rounded-full mr-3">
                    <UserIconSvg />
                  </div>
                  <div className=" flex flex-col justify-center">
                    <div className="mb-1 flex">
                      <div className="mr-1">
                        <H2>{group.name}</H2>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </DrawerCore>
  );
};

export default DrawerTicketAssign;
