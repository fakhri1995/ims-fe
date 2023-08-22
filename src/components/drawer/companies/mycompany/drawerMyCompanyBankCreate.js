import { Spin, notification } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { InputRequired, RadioRequired } from "../../../input";
import DrawerCore from "../../drawerCore";

const DrawerBank = ({
  title,
  visible,
  onClose,
  children,
  buttonOkText,
  initProps,
  onvisible,
}) => {
  const rt = useRouter();
  const [createdata, setcreatedata] = useState({
    name: "",
    account_number: "",
    owner: "",
    currency: "",
    color_first: "from-state1",
    color_second: "to-state2",
  });
  const [bankloading, setbankloading] = useState(false);
  const onChangeInput = (e) => {
    setcreatedata({
      ...createdata,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeRadio = (e) => {
    setcreatedata({
      ...createdata,
      [e.target.name]: e.target.value,
    });
  };
  const handleCreateBank = () => {
    setbankloading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addMainBank`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createdata),
    })
      .then((res) => res.json())
      .then((res2) => {
        setbankloading(false);
        onvisible(false);
        if (res2.success) {
          setcreatedata({
            name: "",
            account_number: "",
            owner: "",
            currency: "",
            color_first: "from-state1",
            color_second: "to-state2",
          });
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setTimeout(() => {
            setbankloading(false);
            rt.push(`/company/myCompany`);
          }, 500);
        } else {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };
  return (
    <DrawerCore
      title={title}
      visible={visible}
      onClose={onClose}
      buttonOkText={buttonOkText}
      onClick={handleCreateBank}
    >
      <Spin spinning={bankloading}>
        <div className="flex flex-col">
          <div className="flex justify-center items-center mb-5">
            {/* <AtmBank from={createdata.color_first} to={createdata.color_second}></AtmBank> */}
            <div
              style={
                createdata.color_first == "from-state1" &&
                createdata.color_second == "to-state2"
                  ? {
                      backgroundImage:
                        "linear-gradient(to top left, #799F0C, #FFE000)",
                    }
                  : createdata.color_first == "from-state3" &&
                    createdata.color_second == "to-state4"
                  ? {
                      backgroundImage:
                        "linear-gradient(to top left, #6DD5ED, #2193B0)",
                    }
                  : createdata.color_first == "from-red-200" &&
                    createdata.color_second == "to-red-600"
                  ? {
                      backgroundImage:
                        "linear-gradient(to top left, #fecaca, #dc2626)",
                    }
                  : {
                      backgroundImage:
                        "linear-gradient(to top left, #9333ea, #db2777)",
                    }
              }
              className={`w-5/12 h-28 rounded-md relative mr-3`}
            >
              <div className="absolute bottom-0 right-2">
                <img src="/image/visa.png" className="object-contain" />
              </div>
            </div>
            {/* {createdata.preset === 1 && <AtmBank from="from-state1" to="to-state2"></AtmBank>}
                        {createdata.preset === 2 && <AtmBank from="from-state3" to="to-state4"></AtmBank>}
                        {createdata.preset === 3 && <AtmBank from="from-red-200" to="to-red-600"></AtmBank>}
                        {createdata.preset === 4 && <AtmBank from="from-purple-600" to="to-pink-600"></AtmBank>} */}
          </div>
          <div className="flex justify-center mb-10">
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top left, #799F0C, #FFE000)",
              }}
              className={`w-8 h-8 rounded-full border cursor-pointer ${
                createdata.color_first === "from-state1" && "border-primary100"
              } mx-2`}
              onClick={() => {
                setcreatedata({
                  ...createdata,
                  color_first: "from-state1",
                  color_second: "to-state2",
                });
              }}
            ></div>
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top left, #6DD5ED, #2193B0)",
              }}
              className={`w-8 h-8 rounded-full border cursor-pointer ${
                createdata.color_first === "from-state3" && "border-primary100"
              } mx-2`}
              onClick={() => {
                setcreatedata({
                  ...createdata,
                  color_first: "from-state3",
                  color_second: "to-state4",
                });
              }}
            ></div>
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top left, #fecaca, #dc2626)",
              }}
              className={`w-8 h-8 rounded-full border cursor-pointer ${
                createdata.color_first === "from-red-200" && "border-primary100"
              } mx-2`}
              onClick={() => {
                setcreatedata({
                  ...createdata,
                  color_first: "from-red-200",
                  color_second: "to-red-600",
                });
              }}
            ></div>
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top left, #9333ea, #db2777)",
              }}
              className={`w-8 h-8 rounded-full border cursor-pointer ${
                createdata.color_first === "from-purple-600" &&
                "border-primary100"
              } mx-2`}
              onClick={() => {
                setcreatedata({
                  ...createdata,
                  color_first: "from-purple-600",
                  color_second: "to-pink-600",
                });
              }}
            ></div>
          </div>
          <div className="flex flex-col ">
            <InputRequired
              name="name"
              value={createdata.name}
              onChangeInput={onChangeInput}
              label="Nama Bank"
            ></InputRequired>
            <InputRequired
              name="account_number"
              value={createdata.account_number}
              onChangeInput={onChangeInput}
              label="Nomor Rekening"
            ></InputRequired>
            <InputRequired
              name="owner"
              value={createdata.owner}
              onChangeInput={onChangeInput}
              label="Nama Pemegang Rekening"
            ></InputRequired>
            <RadioRequired
              name="currency"
              label="Mata Uang"
              onChangeRadio={onChangeRadio}
              options={[
                {
                  value: "IDR",
                  title: "IDR",
                },
                {
                  value: "USD",
                  title: "USD",
                },
              ]}
            ></RadioRequired>
          </div>
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerBank;
