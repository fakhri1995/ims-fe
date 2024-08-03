import { ClockCircleOutlined } from "@ant-design/icons";
import { Drawer, Form, Input, Select, TimePicker } from "antd";
import { RcFile } from "antd/lib/upload/interface";
import moment from "moment";
import { FC, useEffect, useRef, useState } from "react";

import ButtonSys from "components/button";
import { CheckIconSvg } from "components/icon";

import { useAccessControl } from "contexts/access-control";

import { FILTER_EMPLOYEES_GET, OVERTIME_USER_ADD } from "lib/features";
import {
  getBase64,
  notificationError,
  notificationSuccess,
  permissionWarningNotification,
} from "lib/helper";

/**
 * Component AttendanceStaffAktivitasDrawer's props.
 */
export interface IAttendanceStaffOvertimeDrawer {
  action: "create" | "update";

  /**
   * Arg ini diperlukan untuk `action === "update"`.
   */
  activityFormId?: number;
  username: string;
  idUser: number;
  dataToken: string;
  visible: boolean;
  getDataNew: () => void;
  onClose: () => void;
}

/**
 * Component AttendanceStaffOvertimeDrawer
 */
export const AttendanceStaffOvertimeDrawer: FC<
  IAttendanceStaffOvertimeDrawer
> = ({
  action = "create",
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
  const isAllowedToGetEmployees = hasPermission(FILTER_EMPLOYEES_GET);
  const isAllowedToAddOvertime = hasPermission(OVERTIME_USER_ADD);
  const [resumeFileBlob, setResumeFileBlob] = useState<RcFile | Blob | File>(
    null
  );
  const [dataEmployees, setDataEmployees] = useState([]);
  const [dataProjects, setDataProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchTimeoutRef = useRef(null);
  useEffect(() => {
    /** Always clean up the form fields on close */
    if (!visible) {
      instanceForm.resetFields();
    }
  }, [visible]);

  const [dataOvertime, setDataOvertime] = useState({
    nama_karyawan: null,
    start_date: null,
    end_date: null,
    manager_name: null,
    project_name: null,
    catatan: null,
  });

  useEffect(() => {
    fetchDataEmployees();
    fetchDataProjects();
  }, []);

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

  const fetchDataProjects = async () => {
    if (!isAllowedToGetEmployees) {
      permissionWarningNotification("Mendapatkan", "Daftar Projects");
    } else {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjects?user_id=${idUser}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(dataToken),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          setDataProjects(res2.data.data);
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

  const onChangeFile = async (info) => {
    if (info.file.status === "uploading") {
      // setLoadingupload(true);
      return;
    }
    if (info.file.status === "done") {
      const blobFile = info.file.originFileObj;
      const base64Data = await getBase64(blobFile);
      setResumeFileBlob(blobFile);
    }
  };

  const handleSubmit = (values) => {
    let formData = new FormData();
    formData.append("manager_id", values.manager_name);
    formData.append("project_id", values.project_name);
    formData.append("start_at", moment(values.start_overtime).format("HH:mm"));
    formData.append("end_at", moment(values.finish_overtime).format("HH:mm"));
    if (values.notes) {
      formData.append("notes", values.notes);
    }
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addOvertimeUser`, {
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
            message: "Overtime request successfully sent",
            duration: 3,
          });
        } else {
          notificationError({
            message:
              "Failed to sent overtime request because of an error in the server",
            duration: 3,
          });
        }
      });
  };

  return (
    <Drawer
      title={<h1 className="mig-body--bold">Request Overtime</h1>}
      open={visible}
      width={400}
      onClose={onClose}
      footer={
        <div className={"flex gap-4 justify-end p-2"}>
          <ButtonSys type={"default"} color="mono50" onClick={onClose}>
            Cancel
          </ButtonSys>
          <ButtonSys
            disabled={!isAllowedToAddOvertime}
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
          <div className={"mt-2 flex items-center"}>
            <div className={"w-[45%]"}>
              <Form.Item
                label="Start Overtime"
                name={"start_overtime"}
                className="col-span-2"
                rules={[
                  {
                    required: true,
                    message: "Start Overtime is required",
                  },
                ]}
              >
                <TimePicker
                  placeholder="Select Start overtime"
                  suffixIcon={
                    <ClockCircleOutlined
                      style={{ color: "#808080", fontSize: 16 }}
                    />
                  }
                  style={{ width: "100%", borderColor: "#CCCCCC" }}
                />
              </Form.Item>
            </div>
            <div className={"w-[10%] flex justify-center"}>
              <p className="mt-2">-</p>
            </div>
            <div className={"w-[45%]"}>
              <Form.Item
                label="Finish Overtime"
                name={"finish_overtime"}
                className="col-span-2"
                rules={[
                  {
                    required: true,
                    message: "Finish Overtime is required",
                  },
                ]}
              >
                <TimePicker
                  placeholder="Select Finish Overtime"
                  suffixIcon={
                    <ClockCircleOutlined
                      style={{ color: "#808080", fontSize: 16 }}
                    />
                  }
                  style={{ width: "100%", borderColor: "#CCCCCC" }}
                />
              </Form.Item>
            </div>
          </div>
          <div className={"mt-2 flex flex-col gap-2"}>
            <Form.Item
              label="Project’s Name"
              name={"project_name"}
              className="col-span-2"
              rules={[
                {
                  required: true,
                  message: "Project Name is required",
                },
              ]}
            >
              <Select
                showSearch
                value={dataOvertime?.project_name}
                placeholder={"Search Project Name"}
                style={{ width: `100%`, borderColor: "#CCCCCC" }}
                optionFilterProp="children"
                onChange={(value, option) => {
                  setDataOvertime((prev) => ({
                    ...prev,
                    project_name: value,
                  }));
                }}
              >
                {dataProjects?.map((item) => {
                  return (
                    <Select.Option
                      key={item?.id}
                      value={item.id}
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
              label="Manager's Name"
              name={"manager_name"}
              className="col-span-2 "
              rules={[
                {
                  required: true,
                  message: "Manager's Name is required",
                },
              ]}
            >
              <Select
                showSearch
                value={dataOvertime?.manager_name}
                placeholder={"Search Name"}
                style={{ width: `100%`, borderColor: "#CCCCCC" }}
                onSearch={(value) => onSearchUsers(value, setDataEmployees)}
                optionFilterProp="children"
                onChange={(value, option) => {
                  setDataOvertime((prev) => ({
                    ...prev,
                    manager_name: option,
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
            <Form.Item label="Notes" name={"notes"} className="col-span-2">
              <Input.TextArea
                rows={4}
                className={"h-[164px] border border-solid border-[#CCCCCC]"}
                placeholder="Insert reason for taking leave"
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </Drawer>
  );
};
