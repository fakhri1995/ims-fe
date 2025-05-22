import { DownOutlined, SearchOutlined, UpOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Empty,
  Input,
  Select,
  Spin,
  Switch,
  TimePicker,
  Tree,
} from "antd";
import moment from "moment";

import { EmailIconSvg, PhoneIconSvg, WebIconSvg } from "../../../icon";
import { H1, H2, Label, Text } from "../../../typography";

const CompanyCard = ({
  isenabled,
  editable,
  rawdata,
  onChangeInput,
  displaydata,
  setdisplaydata,
}) => {
  return (
    <div className="mt-7 flex flex-col px-5">
      <div className="flex flex-col mb-5">
        <Label>Status Perusahaan</Label>
        {isenabled ? (
          <div className="flex justify-between">
            <p className="text-primary100 font-semibold mb-0">Aktif</p>
            <Switch defaultChecked={true} disabled />
          </div>
        ) : (
          <div className="flex justify-between">
            <p className="font-semibold mb-0">Non Aktif</p>
            <Switch defaultChecked={false} disabled />
          </div>
        )}
      </div>
      <div className={`flex flex-col mb-5`}>
        <Label>Singkatan</Label>
        {editable ? (
          <Input
            name="singkatan"
            defaultValue={rawdata.singkatan}
            onChange={onChangeInput}
          ></Input>
        ) : (
          <p className="mb-0">{rawdata.singkatan || "-"}</p>
        )}
      </div>
      <div className="flex flex-col mb-5">
        <Label>Alamat</Label>
        {editable ? (
          <Input
            name="address"
            onChange={onChangeInput}
            defaultValue={rawdata.address}
          ></Input>
        ) : (
          <p className="mb-0">{rawdata.address || "-"}</p>
        )}
      </div>
      <div className="flex flex-col mb-5">
        <Label>Penanggung Jawab (PIC)</Label>
        {editable ? (
          <Input
            name="penanggung_jawab"
            onChange={onChangeInput}
            defaultValue={rawdata.penanggung_jawab}
          ></Input>
        ) : (
          <p className="mb-0">{rawdata.penanggung_jawab || "-"}</p>
        )}
      </div>
      <div className="flex flex-col mb-5">
        <Label>Tanggal PKP</Label>
        {editable ? (
          <DatePicker
            onChange={(value, dateString) => {
              setdisplaydata({
                ...displaydata,
                tanggal_pkp: dateString,
              });
            }}
            defaultValue={
              moment(rawdata?.tanggal_pkp).isValid()
                ? moment(rawdata?.tanggal_pkp)
                : null
            }
          ></DatePicker>
        ) : (
          <p className="mb-0">
            {moment(rawdata?.tanggal_pkp).isValid()
              ? moment(rawdata?.tanggal_pkp).locale("id").format("LL")
              : "-"}
          </p>
        )}
      </div>
      <div className="flex flex-col mb-5">
        <Label>Jam Masuk</Label>
        {editable ? (
          <TimePicker
            allowClear
            onChange={(value, dateString) => {
              setdisplaydata({
                ...displaydata,
                check_in_time: dateString,
              });
            }}
            defaultValue={
              moment(displaydata.check_in_time, "HH:mm:ss").isValid()
                ? moment(displaydata?.check_in_time, "HH:mm:ss")
                : null
            }
            format={"HH:mm:ss"}
          />
        ) : (
          <p className="mb-0">
            {moment(rawdata.check_in_time, "HH:mm:ss").isValid() &&
            rawdata.check_in_time !== "00:00:00"
              ? rawdata?.check_in_time
              : "-"}
          </p>
        )}
      </div>
      <div className="flex flex-col mb-5">
        <Label>NPWP</Label>
        {editable ? (
          <Input
            name="npwp"
            onChange={onChangeInput}
            defaultValue={rawdata.npwp}
          ></Input>
        ) : (
          <p className="mb-0">{rawdata.npwp || "-"}</p>
        )}
      </div>
      <div className="flex flex-col mb-5">
        <Label>Email</Label>
        {editable ? (
          <Input
            name="email"
            onChange={onChangeInput}
            prefix={<EmailIconSvg size={15} color={`#35763B`} />}
            defaultValue={rawdata.email}
          ></Input>
        ) : (
          <div className="flex">
            <div className="mr-1">
              <EmailIconSvg size={20} color={`#35763B`} />
            </div>
            <a
              href={`mailto:${rawdata.email}`}
              className="text-primary100 hover:text-primary75 truncate"
            >
              {rawdata.email || "-"}
            </a>
          </div>
        )}
      </div>
      <div className="flex flex-col mb-5">
        <Label>No.Telp</Label>
        {editable ? (
          <Input
            name="phone_number"
            onChange={onChangeInput}
            prefix={<PhoneIconSvg size={15} color={`#35763B`} />}
            defaultValue={rawdata.phone_number}
          ></Input>
        ) : (
          <div className="flex">
            <div className="mr-1">
              <PhoneIconSvg size={20} color={`#35763B`} />
            </div>
            <a
              href={`tel:${rawdata.phone_number}`}
              className="text-primary100 hover:text-primary75"
            >
              {rawdata.phone_number || "-"}
            </a>
          </div>
        )}
      </div>
      <div className="flex flex-col mb-5">
        <Label>Website</Label>
        {editable ? (
          <Input
            name="website"
            onChange={onChangeInput}
            prefix={<WebIconSvg size={15} color={`#35763B`} />}
            defaultValue={rawdata.website}
          ></Input>
        ) : (
          <div className="flex">
            <div className="mr-1">
              <WebIconSvg size={20} color={`#35763B`} />
            </div>
            <a
              href={`${rawdata.website}`}
              target="_blank"
              rel="external"
              className="text-primary100 hover:text-primary75 truncate"
            >
              {rawdata.website || "-"}
            </a>
          </div>
        )}
      </div>
      <div className="flex flex-col mb-5">
        <Label>Auto Check-Out</Label>
        {editable ? (
          <div className="flex justify-between">
            {displaydata?.autocheckout ? (
              <p className="text-primary100 font-semibold mb-0">Aktif</p>
            ) : (
              <p className="font-semibold mb-0">Non Aktif</p>
            )}

            <Switch
              checked={displaydata?.autocheckout}
              onChange={(checked) => {
                setdisplaydata({
                  ...displaydata,
                  autocheckout: Number(checked),
                });
              }}
            />
          </div>
        ) : rawdata?.autocheckout ? (
          <p className="text-primary100 font-semibold mb-0">Aktif</p>
        ) : (
          <p className="font-semibold mb-0">Non Aktif</p>
        )}
      </div>

      {/* {editable && (
                    <div className="flex justify-center items-center mb-10">
                      <Buttonsys type="primary" color="danger">
                        <div className="mr-1">
                          <TrashIconSvg size={18} color={"#FFFFFF"} />
                        </div>
                        Hapus Lokasi
                      </Buttonsys>
                    </div>
                  )} */}
    </div>
  );
};

export default CompanyCard;
