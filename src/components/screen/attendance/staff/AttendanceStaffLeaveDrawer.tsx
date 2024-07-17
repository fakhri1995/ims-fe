import {
  CameraOutlined,
  LoadingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Skeleton,
  Spin,
  Tag,
  Upload,
  UploadProps,
  notification,
} from "antd";
import { FormInstance } from "antd/es/form/Form";
import { UploadChangeParam } from "antd/lib/upload";
import { RcFile, UploadFile } from "antd/lib/upload/interface";
import type { AxiosError, AxiosResponse } from "axios";
import moment from "moment";
import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useQuery } from "react-query";

import ButtonSys from "components/button";
import DrawerCore from "components/drawer/drawerCore";
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
  generateStaticAssetUrl,
  getBase64,
  getFileName,
  notificationError,
  objectToFormData,
  objectToFormDataNew,
  permissionWarningNotification,
} from "lib/helper";

import {
  FormAktivitasTypes,
  IAddAttendanceActivityPayload,
  IUpdateAttendanceActivityPayload,
  useGetUserAttendanceTodayActivities,
  useMutateAttendanceActivity,
} from "apis/attendance";
import { AuthService, AuthServiceQueryKeys } from "apis/auth";
import { Detail } from "apis/auth";

/**
 * Component AttendanceStaffAktivitasDrawer's props.
 */
export interface IAttendanceStaffLeaveDrawer {
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
 * Component AttendanceStaffAktivitasDrawer
 */
export const AttendanceStaffLeaveDrawer: FC<IAttendanceStaffLeaveDrawer> = ({
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
  const axiosClient = useAxiosClient();
  const { todayActivities, findTodayActivity } =
    useGetUserAttendanceTodayActivities();
  const { hasPermission } = useAccessControl();
  const isAllowedToAddActivity = hasPermission(ATTENDANCE_ACTIVITY_ADD);
  const isAllowedToUpdateActivity = hasPermission(ATTENDANCE_ACTIVITY_UPDATE);
  const isAllowedToDeleteActivity = hasPermission(ATTENDANCE_ACTIVITY_DELETE);
  const isAllowedToGetLeaveTypes = hasPermission(LEAVE_TYPES_GET);
  const isAllowedToGetEmployees = hasPermission(FILTER_EMPLOYEES_GET);
  const isAllowedToAddLeave = hasPermission(LEAVE_USER_ADD);
  const [resumeFileBlob, setResumeFileBlob] = useState<RcFile | Blob | File>(
    null
  );
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
    if (resumeFileBlob) {
      formData.append("document", resumeFileBlob);
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
          notification["success"]({
            message: "Succesfully applied for leave",
            duration: 3,
          });
        } else {
          notification["error"]({
            message:
              "Failed to apply for leave because of an error in the server",
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
          <div className={"mt-2 flex items-center justify-between "}>
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
                className="dontShow"
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
          <div className="flex flex-wrap">
            {dataCuti?.delegasi && (
              <Tag
                closable
                onClose={() => {
                  setDataCuti((prev) => ({
                    ...prev,
                    delegasi: null,
                  }));
                }}
                className="flex items-center p-2 w-max mb-2"
              >
                <div className="flex items-center space-x-2">
                  <img
                    src={generateStaticAssetUrl(
                      dataCuti?.delegasi?.profile_image?.link ??
                        "staging/Users/default_user.png"
                    )}
                    alt={dataCuti?.delegasi?.name}
                    className="w-6 h-6 bg-cover object-cover rounded-full"
                  />
                  <p className="truncate">
                    <strong>{dataCuti?.delegasi?.name}</strong> -{" "}
                    {dataCuti?.delegasi?.position}
                  </p>
                </div>
              </Tag>
            )}
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
              label="Supporting File"
              name={"dokumen"}
              className="col-span-2"
              rules={[
                {
                  required:
                    dataCuti.tipe_cuti == null
                      ? true
                      : dataCuti?.tipe_cuti?.is_document_required
                      ? true
                      : false,
                  message: "Supporting Document is required",
                },
              ]}
            >
              <div className={"flex flex-col"}>
                <div className="mb-4 ">
                  <Upload
                    accept=".pdf"
                    multiple={false}
                    onChange={onChangeFile}
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
                  Upload File (Max. 5 MB), multiple files are allowed.
                </em>
              </div>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Drawer>
  );
};
