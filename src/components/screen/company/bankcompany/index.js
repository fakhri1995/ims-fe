import { Spin } from "antd";

import { AccessControl } from "components/features/AccessControl";

import { permissionWarningNotification } from "../../../../lib/helper";
import ButtonSys from "../../../button";
import DrawerBank from "../../../drawer/companies/mycompany/drawerMyCompanyBankCreate";
import DrawerCore from "../../../drawer/drawerCore";
import { EditIconSvg, TrashIconSvg } from "../../../icon";
import { InputRequired, RadioRequired } from "../../../input";
import { ModalHapus } from "../../../modal/modalCustom";
import { H1, H2, Label, Text } from "../../../typography";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

Chart.register(
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement
);

const BankCompany = ({
  COMPANY_MAIN_BANKS_GET,
  banks,
  isAllowedToUpdateMainBank,
  seteditbankdata,
  setbankdraweredit,
  isAllowedToAddMainBank,
  isAllowedToDeleteMainBank,
  sethapusbankdata,
  setbankmodalhapus,
  bankdrawer,
  setbankdrawer,
  bankdraweredit,
  initProps,
  handleEditBank,
  bankloadingedit,
  editbankdata,
  onChangeInputBankEdit,
  bankmodalhapus,
  handleDeleteBank,
  onChangeRadioBankEdit,
  hapusbankdata,
}) => {
  return (
    <div className="flex flex-col shadow-md rounded-md bg-white p-8 ">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <H1>Akun Bank</H1>
        <ButtonSys
          type="primary"
          disabled={!isAllowedToAddMainBank}
          onClick={() => {
            if (!isAllowedToAddMainBank) {
              permissionWarningNotification("Menambahkan", "Bank");
              return;
            }

            setbankdrawer(true);
          }}
        >
          + Tambah Akun Bank
        </ButtonSys>
      </div>
      <AccessControl hasPermission={COMPANY_MAIN_BANKS_GET}>
        {banks.map((doc, idx) => {
          return (
            <div className="flex mt-5">
              {/* <AtmMain idx={idx} from={doc.color_first} to={doc.color_second}></AtmMain> */}
              <div
                style={
                  doc.color_first == "from-state1" &&
                  doc.color_second == "to-state2"
                    ? {
                        backgroundImage:
                          "linear-gradient(to top left, #799F0C, #FFE000)",
                      }
                    : doc.color_first == "from-state3" &&
                      doc.color_second == "to-state4"
                    ? {
                        backgroundImage:
                          "linear-gradient(to top left, #6DD5ED, #2193B0)",
                      }
                    : doc.color_first == "from-red-200" &&
                      doc.color_second == "to-red-600"
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
              <div className="w-7/12 flex flex-col justify-between">
                <div className="flex justify-between w-full items-center">
                  <H2>{doc.name ?? "-"}</H2>
                  <div className="flex">
                    <div
                      className="mx-1 cursor-pointer"
                      onClick={() => {
                        if (!isAllowedToUpdateMainBank) {
                          permissionWarningNotification("Memperbarui", "Bank");
                          return;
                        }

                        seteditbankdata({ ...doc });
                        setbankdraweredit(true);
                      }}
                    >
                      <EditIconSvg size={15} color={`#35763B`} />
                    </div>
                    <div
                      className="mx-1 cursor-pointer"
                      onClick={() => {
                        if (!isAllowedToDeleteMainBank) {
                          permissionWarningNotification("Menghapus", "Bank");
                          return;
                        }

                        sethapusbankdata({
                          ...hapusbankdata,
                          id: doc.id,
                        });
                        setbankmodalhapus(true);
                      }}
                    >
                      <TrashIconSvg size={15} color={`#BF4A40`} />
                    </div>
                  </div>
                </div>
                <div className=" flex flex-col">
                  <Label>
                    ***
                    {doc.account_number.slice(
                      doc.account_number.length - 4,
                      doc.account_number.length
                    )}{" "}
                    - {doc.owner}
                  </Label>
                  <Label>{doc.currency ?? "-"}</Label>
                </div>
              </div>
            </div>
          );
        })}
      </AccessControl>
      <DrawerBank
        title={"Tambah Bank"}
        visible={bankdrawer}
        onClose={() => {
          setbankdrawer(false);
        }}
        buttonOkText={"Simpan Bank"}
        initProps={initProps}
        onvisible={setbankdrawer}
      ></DrawerBank>
      <DrawerCore
        title={`Edit Bank`}
        visible={bankdraweredit}
        onClose={() => {
          setbankdraweredit(false);
        }}
        buttonOkText={`Simpan Bank`}
        onClick={handleEditBank}
      >
        <Spin spinning={bankloadingedit}>
          <div className="flex flex-col">
            <div className="flex justify-center items-center mb-5">
              {/* <AtmBank from={createdata.color_first} to={createdata.color_second}></AtmBank> */}
              <div
                style={
                  editbankdata.color_first == "from-state1" &&
                  editbankdata.color_second == "to-state2"
                    ? {
                        backgroundImage:
                          "linear-gradient(to top left, #799F0C, #FFE000)",
                      }
                    : editbankdata.color_first == "from-state3" &&
                      editbankdata.color_second == "to-state4"
                    ? {
                        backgroundImage:
                          "linear-gradient(to top left, #6DD5ED, #2193B0)",
                      }
                    : editbankdata.color_first == "from-red-200" &&
                      editbankdata.color_second == "to-red-600"
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
                  editbankdata.color_first === "from-state1" &&
                  "border-primary100"
                } mx-2`}
                onClick={() => {
                  seteditbankdata({
                    ...editbankdata,
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
                  editbankdata.color_first === "from-state3" &&
                  "border-primary100"
                } mx-2`}
                onClick={() => {
                  seteditbankdata({
                    ...editbankdata,
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
                  editbankdata.color_first === "from-red-200" &&
                  "border-primary100"
                } mx-2`}
                onClick={() => {
                  seteditbankdata({
                    ...editbankdata,
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
                  editbankdata.color_first === "from-purple-600" &&
                  "border-primary100"
                } mx-2`}
                onClick={() => {
                  seteditbankdata({
                    ...editbankdata,
                    color_first: "from-purple-600",
                    color_second: "to-pink-600",
                  });
                }}
              ></div>
            </div>
            <div className="flex flex-col ">
              <InputRequired
                name="name"
                defaultValue={editbankdata.name}
                onChangeInput={onChangeInputBankEdit}
                label="Nama Bank"
              ></InputRequired>
              <InputRequired
                name="account_number"
                defaultValue={editbankdata.account_number}
                onChangeInput={onChangeInputBankEdit}
                label="Nomor Rekening"
              ></InputRequired>
              <InputRequired
                name="owner"
                defaultValue={editbankdata.owner}
                onChangeInput={onChangeInputBankEdit}
                label="Nama Pemegang Rekening"
              ></InputRequired>
              <RadioRequired
                name="currency"
                label="Mata Uang"
                defaultValue={editbankdata.currency}
                onChangeRadio={onChangeRadioBankEdit}
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
      <ModalHapus
        title={`Konfirmasi Hapus Bank`}
        visible={bankmodalhapus}
        onCancel={() => {
          setbankmodalhapus(false);
        }}
        footer={
          <div className="flex justify-between items-center">
            <ButtonSys
              type="default"
              color="danger"
              onClick={() => {
                setbankmodalhapus(false);
              }}
            >
              Batalkan
            </ButtonSys>
            <ButtonSys type="primary" color="danger" onClick={handleDeleteBank}>
              <TrashIconSvg size={15} color={`#ffffff`} />
              Ya, saya yakin dan hapus bank
            </ButtonSys>
          </div>
        }
      ></ModalHapus>
    </div>
  );
};

export default BankCompany;
