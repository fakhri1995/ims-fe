import { RightOutlined, SearchOutlined, UpOutlined } from "@ant-design/icons";
import {
  Checkbox,
  Collapse,
  DatePicker,
  Form,
  Input,
  Select,
  Spin,
  Table,
  notification,
} from "antd";
import locale from "antd/lib/date-picker/locale/id_ID";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { CheckIconSvg } from "components/icon";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  AGENTS_GET,
  ATTENDANCE_SCHEDULES_GET,
  ATTENDANCE_SCHEDULE_ADD,
  ATTENDANCE_SHIFTS_GET,
} from "lib/features";
import { getNameInitial } from "lib/helper";

import { AttendanceScheduleService } from "apis/attendance";
import { IAddSchedulePayload } from "apis/attendance/attendance-schedule.types";
import { AttendanceShiftService } from "apis/attendance/attendance-shift.service";
import { IGetShiftsPaginateParams } from "apis/attendance/attendance-shift.types";
import { AgentService, IGetAgentsPaginateParams } from "apis/user";

import DrawerCore from "../drawerCore";

import { HttpRequestBaseSucceedResponse } from "types/common";

const DrawerSchedule = ({ visible, onvisible, data = null }) => {
  /**
   * Dependencies
   */
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetAgents = hasPermission(AGENTS_GET);
  const isAllowedToGetShifts = hasPermission(ATTENDANCE_SHIFTS_GET);
  const isAllowedToAddSchedule = hasPermission(ATTENDANCE_SCHEDULE_ADD);

  const [instanceForm] = Form.useForm();

  //1. USE STATE
  const [dataSchedule, setDataSchedule] = useState<IAddSchedulePayload>({
    user_ids: [],
    shift_id: null,
    date: "",
  });

  const [agentFilterParams, setAgentFilterParams] =
    useState<IGetAgentsPaginateParams>({
      page: 1,
      rows: 10,
      name: "",
    });

  const [shiftFilterParams, setShiftFilterParams] =
    useState<IGetShiftsPaginateParams>({
      page: 1,
      rows: 10,
      keyword: "",
    });

  const [dataAgents, setDataAgents] = useState([]);

  const [selectedAgents, setSelectedAgents] = useState([]);
  const [searchAgents, setSearchAgents] = useState("");

  // 2. USE EFFECT
  const {
    data: dataRawAgents,
    isLoading: loadingAgents,
    refetch: refetchAgents,
  } = useQuery(
    [AGENTS_GET, agentFilterParams],
    () =>
      AgentService.getAgents(
        isAllowedToGetAgents,
        axiosClient,
        agentFilterParams
      ),
    {
      enabled: isAllowedToGetAgents && visible,

      select: (response) => response.data.data,
      onSuccess: (data) => setDataAgents(data.data),
      onError: (error) => {
        notification.error({
          message: "Gagal mendapatkan daftar karyawan (agent).",
        });
      },
    }
  );

  const {
    data: dataShifts,
    isLoading: loadingShifts,
    refetch: refetchShifts,
  } = useQuery(
    [ATTENDANCE_SHIFTS_GET, shiftFilterParams],
    () =>
      AttendanceShiftService.getShifts(
        isAllowedToGetShifts,
        axiosClient,
        shiftFilterParams
      ),
    {
      enabled: isAllowedToGetShifts && visible,

      select: (response) => response.data.data.data,
      onError: (error) => {
        notification.error({
          message: "Gagal mendapatkan daftar shift.",
        });
      },
    }
  );

  //3. HANDLER
  const handleClose = () => {
    setDataSchedule({
      user_ids: [],
      shift_id: null,
      date: "",
    });
    setSelectedAgents([]);
    onvisible(false);
  };

  const onMutationSucceed = (queryKey: string, message: string) => {
    queryClient.invalidateQueries(queryKey);
    notification.success({
      message,
    });
  };

  const { mutate: addSchedule, isLoading: loadingAddSchedule } = useMutation(
    (payload: IAddSchedulePayload) =>
      AttendanceScheduleService.addSchedule(
        isAllowedToAddSchedule,
        axiosClient,
        payload
      ),
    {
      onSuccess: (response) => {
        onMutationSucceed(ATTENDANCE_SCHEDULES_GET, response.data.message);
        handleClose();
      },
      onError: (error, variables) => {
        // console.log({ error });
        // notification.error({ message: error?.response?.data?.message });
        notification.error({ message: "Gagal menambahkan jadwal." });
      },
    }
  );

  const onChangeSearchAgents = (e) => {
    setTimeout(
      () => setAgentFilterParams((prev) => ({ ...prev, name: e.target.value })),
      500
    );
  };
  const handleSelect = (e) => {
    const currentSelected = e.target.value;
    let newSelectedAgents = [];
    let newSelectedAgentIds = [];
    if (e.target.checked) {
      newSelectedAgents = [...selectedAgents, currentSelected];
      newSelectedAgentIds = newSelectedAgents.map((item) => item?.id);
    } else {
      newSelectedAgents = selectedAgents.filter(
        (obj) => obj.id !== currentSelected?.id
      );
      newSelectedAgentIds = newSelectedAgents.map((item) => item?.id);
    }
    setSelectedAgents(newSelectedAgents);
    setDataSchedule((prev) => ({ ...prev, user_ids: newSelectedAgentIds }));

    setDataSchedule;
  };

  const handleSelectAll = () => {
    setSelectedAgents(dataAgents);
    setDataSchedule((prev) => ({
      ...prev,
      user_ids: dataAgents.map((item) => item?.id),
    }));
  };

  const handleUnselectAll = () => {
    setSelectedAgents([]);
    setDataSchedule((prev) => ({ ...prev, user_ids: [] }));
  };

  return (
    <DrawerCore
      title={"Jadwalkan Karyawan"}
      visible={visible}
      onClose={handleClose}
      buttonOkText={"Simpan"}
      buttonCancelText={"Batal"}
      onClick={() => addSchedule(dataSchedule)}
      onButtonCancelClicked={handleClose}
      disabled={
        !dataSchedule?.user_ids?.length ||
        !dataSchedule?.date ||
        !dataSchedule?.shift_id
      }
    >
      <div className="flex flex-col">
        <p className="mb-6 text-red-500 text-xs italic">
          *Informasi ini harus diisi
        </p>
        <Form layout="vertical" form={instanceForm}>
          <div>
            <div className="mb-6 ">
              <Collapse
                className="col-span-2 bg-transparent rounded-md"
                bordered={true}
                expandIconPosition="right"
                expandIcon={({ isActive }) => (
                  <RightOutlined rev={""} rotate={isActive ? 90 : 0} />
                )}
                // defaultActiveKey={["1", "2"]}
              >
                <Collapse.Panel
                  key={"1"}
                  header={
                    <div className="flex items-center justify-between w-full">
                      <p className="text-md">Pilih Karyawan</p>
                      <div
                        className="flex items-center gap-2 bg-backdrop text-primary100 
                        px-3 py-1 rounded-full mig-caption--bold"
                      >
                        <p>{selectedAgents?.length} Karyawan Dipilih</p>
                      </div>
                    </div>
                  }
                >
                  <div className="grid grid-cols-1 gap-4">
                    {/* TODO: Implement tab  */}
                    <Input
                      style={{ width: `100%` }}
                      suffix={<SearchOutlined rev={""} />}
                      placeholder="Cari Nama Talent.."
                      onChange={onChangeSearchAgents}
                      allowClear
                    />
                    <div className="flex justify-between items-center gap-2">
                      <p className="mig-caption--bold text-mono30">
                        Daftar Karyawan
                      </p>
                      {selectedAgents?.length !==
                      dataRawAgents?.data?.length ? (
                        <button
                          className="mig-caption--bold text-primary100 bg-transparent 
                        hover:opacity-75"
                          onClick={handleSelectAll}
                        >
                          Pilih Semua
                        </button>
                      ) : (
                        <button
                          className="mig-caption--bold text-primary100 bg-transparent 
                        hover:opacity-75"
                          onClick={handleUnselectAll}
                        >
                          Hapus Semua
                        </button>
                      )}
                    </div>

                    <Table
                      rowKey={(record) => record.id}
                      className="tableTalentCandidate"
                      dataSource={dataAgents}
                      loading={loadingAgents}
                      pagination={{
                        current: agentFilterParams.page,
                        pageSize: agentFilterParams.rows,
                        total: dataRawAgents?.total,
                        showSizeChanger: true,
                        pageSizeOptions: [10, 20],
                        showTotal: (total, range) =>
                          `Showing ${range[0]}-${range[1]} of ${total} items`,
                      }}
                      onChange={(pagination, filters, sorter) => {
                        setAgentFilterParams((prev) => ({
                          ...prev,
                          page: pagination.current,
                          rows: pagination.pageSize,
                        }));
                      }}
                      // onRow={(record) => {
                      //   return {
                      //     onMouseOver: () => {
                      //       setRowState(record.id);
                      //     },
                      //   };
                      // }}
                      columns={[
                        {
                          title: undefined,
                          dataIndex: "candidate",
                          key: "candidate",
                          render: (_, record, cardIdx) => {
                            const isChecked = selectedAgents.some(
                              (item) => item.id === record.id
                            );
                            return (
                              <div
                                className={`p-3 relative hover:bg-backdrop rounded-md flex 
                              items-center mb-2 border border-mono100 cursor-pointer ${
                                isChecked ? "bg-backdrop" : "bg-transparent"
                              }`}
                              >
                                <div className="flex gap-3 items-center w-11/12">
                                  <div
                                    className={`rounded-full w-12 h-12 flex justify-center 
                                  items-center mig-caption--bold p-1 bg-backdrop `}
                                  >
                                    {getNameInitial(record?.name)}
                                  </div>
                                  <div>
                                    <p className="font-medium">
                                      {record?.name}
                                    </p>
                                    <p className="mig-caption text-mono50">
                                      {record?.last_assessment?.name}
                                    </p>
                                  </div>
                                </div>
                                <Checkbox
                                  key={record.id}
                                  value={record}
                                  checked={isChecked}
                                  onChange={handleSelect}
                                />
                              </div>
                            );
                          },
                        },
                      ]}
                    />
                  </div>
                </Collapse.Panel>
              </Collapse>
              <div className="flex flex-wrap gap-2 items-center  pt-2">
                {selectedAgents?.map((item) => (
                  <div className="flex items-center gap-2 bg-backdrop p-2 rounded-md mig-caption--medium">
                    <CheckIconSvg color="#35763B" size={20} />
                    <p>{item?.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <Form.Item
              label="Tanggal Berlaku"
              name={"date"}
              rules={[
                {
                  required: true,
                  message: "Tanggal Berlaku wajib diisi",
                },
              ]}
              className="col-span-2"
            >
              <div className="flex gap-2 items-center">
                <DatePicker
                  placeholder="Pilih Tanggal Berlaku"
                  className="w-full"
                  format={"DD MMMM YYYY"}
                  locale={locale}
                  value={
                    moment(dataSchedule.date).isValid()
                      ? moment(dataSchedule.date)
                      : null
                  }
                  onChange={(value) => {
                    let formattedDate = moment(value).format("YYYY-MM-DD");
                    setDataSchedule((prev) => ({
                      ...prev,
                      date: formattedDate,
                    }));
                  }}
                />
              </div>
            </Form.Item>

            <Form.Item
              label="Tetapkan Shift"
              name={"shift_id"}
              className="col-span-2"
              rules={[
                {
                  required: true,
                  message: "Shift wajib diisi",
                },
              ]}
            >
              <div className="flex gap-2 items-center ">
                <Select
                  showSearch
                  placeholder="Pilih Shift"
                  disabled={!isAllowedToGetShifts}
                  className=" mb-2"
                  onChange={(value, option) => {
                    setDataSchedule((prev) => ({
                      ...prev,
                      shift_id: value,
                    }));
                  }}
                  onSearch={(value) => {
                    setTimeout(
                      () =>
                        setShiftFilterParams((prev) => ({
                          ...prev,
                          keyword: value,
                        })),
                      500
                    );
                  }}
                  optionFilterProp="children"
                  filterOption={(
                    input,
                    option: { label: string; value: number }
                  ) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {dataShifts?.map((item) => (
                    <Select.Option
                      key={item?.id}
                      value={item?.id}
                      label={item?.title}
                    >
                      {item?.title}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </Form.Item>
          </div>
        </Form>
      </div>
    </DrawerCore>
  );
};

export default DrawerSchedule;
