import { UploadOutlined } from "@ant-design/icons";
import { DatePicker, Drawer, Form, Input, Select, Upload } from "antd";
import { RcFile } from "antd/lib/upload/interface";
import moment from "moment";
import { FC, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

import ButtonSys from "components/button";
import { CalendartimeIconSvg, CheckIconSvg } from "components/icon";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  ATTENDANCE_ACTIVITY_ADD,
  ATTENDANCE_ACTIVITY_DELETE,
  ATTENDANCE_ACTIVITY_UPDATE,
  FILTER_EMPLOYEES_GET,
  LEAVE_TYPES_GET,
  LEAVE_USER_ADD,
} from "lib/features";
import {
  getBase64,
  notificationError,
  notificationSuccess,
  permissionWarningNotification,
} from "lib/helper";

import { useGetUserAttendanceTodayActivities } from "apis/attendance";

/**
 * Component AttendanceStaffAktivitasDrawer's props.
 */
export interface IAttendanceStaffLeaveDrawer {
  activityFormId?: number;
  username: string;
  idUser: number;
  dataToken: string;
  visible: boolean;
  getDataNew: () => void;
  onClose: () => void;
}

/**
 * Component AttendanceStaffAktivitasDrawer
 */
export const AttendanceStaffLeaveDrawer: FC<IAttendanceStaffLeaveDrawer> = ({
  getDataNew,
  visible,
  onClose,
  username,
  dataToken,
  idUser,
  activityFormId,
}) => {
  const [instanceForm] = Form.useForm();

  const { hasPermission } = useAccessControl();
  const isAllowedToGetLeaveTypes = hasPermission(LEAVE_TYPES_GET);
  const isAllowedToGetEmployees = hasPermission(FILTER_EMPLOYEES_GET);
  const isAllowedToAddLeave = hasPermission(LEAVE_USER_ADD);
  const [personalFileBlob, setPersonalFileBlob] = useState<
    RcFile | Blob | File
  >(null);
  const [approvedFileBlob, setApprovedFileBlob] = useState<
    RcFile | Blob | File
  >(null);
  const [dataTipeCutis, setDataTipeCutis] = useState([]);
  const [dataEmployees, setDataEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchTimeoutRef = useRef(null);
  useEffect(() => {
    /** Always clean up the form fields on close */
    if (!visible) {
      instanceForm.resetFields();
    }
  }, [visible]);

  const [dataCuti, setDataCuti] = useState({
    nama_karyawan: null,
    start_date: null,
    end_date: null,
    delegasi: null,
    tipe_cuti: null,
    catatan: null,
  });

  useEffect(() => {
    fetchData();
    fetchDataEmployees();
  }, []);

  const fetchData = async () => {
    if (!isAllowedToGetLeaveTypes) {
      permissionWarningNotification("Mendapatkan", "Daftar Tipe Cuti");
    } else {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getLeaveTypes`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(dataToken),
        },
      })
        .then((res) => res.json())
        .then((res2) => {
          // setDataRawTipeCuti(res2.data); // table-related data source
          setDataTipeCutis(res2.data);
        });
    }
  };

  const fetchDataEmployees = async () => {
    if (!isAllowedToGetEmployees) {
      permissionWarningNotification("Mendapatkan", "Daftar Karyawan");
    } else {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterEmployees`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(dataToken),
        },
      })
        .then((res) => res.json())
        .then((res2) => {
          setDataEmployees(res2.data);
        });
    }
  };
  const onSearchUsers = (searchKey, setData) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    if (!isAllowedToGetEmployees) {
      permissionWarningNotification("Mendapatkan", "Daftar Karyawan");
    } else {
      setLoading(true);
      searchTimeoutRef.current = setTimeout(() => {
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterEmployees?name=${searchKey}`,
          {
            method: `GET`,
            headers: {
              Authorization: JSON.parse(dataToken),
            },
          }
        )
          .then((res) => res.json())
          .then((res2) => {
            setData(res2.data);
          })
          .catch((err) =>
            notificationError({
              message: "Gagal mendapatkan daftar user",
              duration: 3,
            })
          )
          .finally(() => setLoading(false));
      }, 500);
    }
  };

  const onChangePersonalFile = async (info) => {
    if (info.file.status === "uploading") {
      // setLoadingupload(true);
      return;
    }
    if (info.file.status === "done") {
      const blobFile = info.file.originFileObj;
      const base64Data = await getBase64(blobFile);
      setPersonalFileBlob(blobFile);
    }
  };

  const onChangeApprovedFile = async (info) => {
    if (info.file.status === "uploading") {
      // setLoadingupload(true);
      return;
    }
    if (info.file.status === "done") {
      const blobFile = info.file.originFileObj;
      const base64Data = await getBase64(blobFile);
      setApprovedFileBlob(blobFile);
    }
  };

  const handleSubmit = (values) => {
    let formData = new FormData();
    formData.append("type", values.type);
    formData.append(
      "start_date",
      moment(values.start_date).format("YYYY-MM-DD")
    );
    formData.append("end_date", moment(values.end_date).format("YYYY-MM-DD"));
    if (values.notes) {
      formData.append("notes", values.notes);
    }
    if (values.delegate_id) {
      formData.append("delegate_id", values.delegate_id);
    }
    if (personalFileBlob) {
      formData.append("document", personalFileBlob);
    }

    if (approvedFileBlob) {
      formData.append("approval", approvedFileBlob);
    }
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addLeaveUser`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(dataToken),
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setLoading(false);
          onClose();
          getDataNew();
          notificationSuccess({
            message: "Leave request successfully sent",
            duration: 3,
          });
        } else {
          notificationError({
            message:
              "Failed to sent leave request because of an error in the server",
            duration: 3,
          });
        }
      });
  };

  return (
    <Drawer
      title={<h1 className="mig-body--bold">Apply for Leave</h1>}
      open={visible}
      width={400}
      onClose={onClose}
      footer={
        <div className={"flex gap-4 justify-end p-2"}>
          <ButtonSys type={"default"} color="mono50" onClick={onClose}>
            Cancel
          </ButtonSys>
          <ButtonSys
            disabled={!isAllowedToAddLeave}
            type="primary"
            onClick={() => instanceForm.submit()}
            loading={loading}
          >
            <div className={"flex items-center gap-2"}>
              <CheckIconSvg size={16} color="#FFFFFF" />
              <p>Add Request</p>
            </div>
          </ButtonSys>
        </div>
      }
    >
      <div className="space-y-6">
        <Form layout="vertical" form={instanceForm} onFinish={handleSubmit}>
          <Form.Item
            label="Employee Name"
            name={"username"}
            className="col-span-2 "
            initialValue={username}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <div>
              <Input value={username} disabled />
            </div>
          </Form.Item>
          <div className={"mt-2 flex items-center justify-between gap-2"}>
            <div className={"calendar-cuti"}>
              <Form.Item
                label="Start Date"
                name={"start_date"}
                className="col-span-2"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current.isBefore(moment().subtract(1, "day"))
                  }
                  placeholder="Select Start Date"
                  style={{ width: "100%", borderColor: "#E6E6E6" }}
                  suffixIcon={
                    <CalendartimeIconSvg size={20} color={"#808080"} />
                  }
                />
              </Form.Item>
            </div>
            <p className="mt-2">-</p>
            <div className={"calendar-cuti "}>
              <Form.Item
                label="End Date"
                name={"end_date"}
                className="col-span-2"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current.isBefore(moment().subtract(1, "day"))
                  }
                  placeholder="Select End Date"
                  style={{ width: "100%", borderColor: "#E6E6E6" }}
                  suffixIcon={
                    <CalendartimeIconSvg size={20} color={"#808080"} />
                  }
                />
              </Form.Item>
            </div>
          </div>
          <div className={"mt-2 flex flex-col gap-2"}>
            <Form.Item
              label="Task Delegate"
              name={"delegate_id"}
              className="col-span-2 "
              rules={[
                {
                  required: true,
                  message: "Task Delegate is required",
                },
              ]}
            >
              <Select
                showSearch
                value={dataCuti?.delegasi}
                placeholder={"Search Name"}
                style={{ width: `100%` }}
                onSearch={(value) => onSearchUsers(value, setDataEmployees)}
                optionFilterProp="children"
                onChange={(value, option) => {
                  setDataCuti((prev) => ({
                    ...prev,
                    delegasi: option,
                  }));
                }}
              >
                {dataEmployees?.map((item) => {
                  return (
                    <Select.Option
                      key={item?.id}
                      value={item.id}
                      position={item?.contract?.role?.name}
                      name={item?.name}
                    >
                      {item?.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>

          <div className={"mt-2 flex flex-col gap-2"}>
            <Form.Item
              label="Leave Type"
              name={"type"}
              className="col-span-2"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select Leave Type"
                onChange={(value, option) => {
                  setDataCuti((prev) => ({
                    ...prev,
                    tipe_cuti: option,
                  }));
                }}
              >
                {dataTipeCutis?.map((item) => {
                  return (
                    <Select.Option
                      key={item?.id}
                      value={item.id}
                      is_document_required={item?.is_document_required}
                      name={item?.name}
                    >
                      {item?.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
          <div className={"mt-2 flex flex-col gap-2"}>
            <Form.Item label="Notes" name={"notes"} className="col-span-2">
              <Input.TextArea
                rows={4}
                className={"h-[164px] border border-solid border-[#E6E6E6]"}
                placeholder="Insert reason for taking leave"
              />
            </Form.Item>
          </div>
          <div className={"mt-2 flex flex-col gap-2"}>
            <Form.Item
              label="Leave Form Approved by Manager"
              name={"approval"}
              className="col-span-2"
            >
              <div className={"flex flex-col"}>
                <div className="mb-4 ">
                  <Upload
                    accept=".pdf"
                    multiple={false}
                    maxCount={1}
                    onChange={onChangeApprovedFile}
                  >
                    <ButtonSys>
                      <div className="flex justify-center items-center gap-2 ">
                        <UploadOutlined size={16} />
                        <p>Upload File</p>
                      </div>
                    </ButtonSys>
                  </Upload>
                </div>

                <em className={"text-[#808080] text-xs leading-4 font-normal "}>
                  Upload File (Max. 5 MB).
                </em>
              </div>
            </Form.Item>
          </div>
          <div className={"mt-2 flex flex-col gap-2"}>
            <Form.Item
              label="MIG Leave Form"
              name={"personal_file"}
              className="col-span-2"
              rules={[
                {
                  required:
                    dataCuti.tipe_cuti == null
                      ? true
                      : dataCuti?.tipe_cuti?.is_document_required
                      ? true
                      : false,
                  message: "Personal Reason File is required",
                },
              ]}
            >
              <div className={"flex flex-col"}>
                <div className="mb-4 ">
                  <Upload
                    accept=".pdf"
                    multiple={false}
                    maxCount={1}
                    onChange={onChangePersonalFile}
                  >
                    <ButtonSys>
                      <div className="flex justify-center items-center gap-2 ">
                        <UploadOutlined size={16} />
                        <p>Upload File</p>
                      </div>
                    </ButtonSys>
                  </Upload>
                </div>

                <em className={"text-[#808080] text-xs leading-4 font-normal "}>
                  Upload File (Max. 5 MB).
                </em>
              </div>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Drawer>
  );
};
