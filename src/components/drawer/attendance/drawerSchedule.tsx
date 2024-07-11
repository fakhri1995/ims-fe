import {
  CloseCircleOutlined,
  RightOutlined,
  SearchOutlined,
  UpOutlined,
} from "@ant-design/icons";
import {
  Checkbox,
  Collapse,
  DatePicker,
  Form,
  Input,
  Select,
  Spin,
  Switch,
  Table,
  Tag,
  notification,
} from "antd";
import locale from "antd/lib/date-picker/locale/id_ID";
import CheckableTag from "antd/lib/tag/CheckableTag";
import { AxiosResponse } from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import AsyncSelect from "components/AsyncSelect";
import ButtonSys from "components/button.js";
import {
  AlerttriangleIconSvg,
  CheckIconSvg,
  InfoCircleIconSvg,
  UsercircleIconSvg,
  XIconSvg,
} from "components/icon";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { MAX_SCHEDULED_DAYS, TODAY } from "lib/constants";
import {
  AGENTS_GET,
  ATTENDANCE_SCHEDULES_GET,
  ATTENDANCE_SCHEDULE_ADD,
  ATTENDANCE_SHIFTS_GET,
  COMPANY_CLIENTS_GET,
} from "lib/features";
import { getNameInitial } from "lib/helper";

import { AttendanceScheduleService } from "apis/attendance";
import { IAddSchedulePayload } from "apis/attendance/attendance-schedule.types";
import { AttendanceShiftService } from "apis/attendance/attendance-shift.service";
import { IGetShiftsPaginateParams } from "apis/attendance/attendance-shift.types";
import { GetCompanyClientListData } from "apis/company";
import {
  AgentService,
  IGetAgentsPaginateParams,
  IGetAgentsPaginateSucceedResponse,
} from "apis/user";

import DrawerCore from "../drawerCore";

interface IDrawerSchedule {
  visible: boolean;
  onvisible: Dispatch<SetStateAction<boolean>>;
  companyList: GetCompanyClientListData[];
}

const DrawerSchedule: FC<IDrawerSchedule> = ({
  visible,
  onvisible,
  companyList,
}) => {
  /**
   * Dependencies
   */
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();
  const rt = useRouter();
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetAgents = hasPermission(AGENTS_GET);
  const isAllowedToGetShifts = hasPermission(ATTENDANCE_SHIFTS_GET);
  const isAllowedToAddSchedule = hasPermission(ATTENDANCE_SCHEDULE_ADD);
  const isAllowedToGetCompanyList = hasPermission(COMPANY_CLIENTS_GET);

  const [instanceForm] = Form.useForm();

  //1. USE STATE
  const [dataSchedule, setDataSchedule] = useState<IAddSchedulePayload>({
    user_ids: [],
    shift_id: null,
    date: "",
    forever: false,
    start_date: "",
    end_date: "",
    repeats: [],
  });

  const [agentFilterParams, setAgentFilterParams] =
    useState<IGetAgentsPaginateParams>({
      page: 1,
      rows: 10,
      name: "",
      company_id: null,
      is_enabled: 1,
    });

  const [shiftFilterParams, setShiftFilterParams] =
    useState<IGetShiftsPaginateParams>({
      page: 1,
      rows: 10,
      keyword: "",
    });

  const [dataAgents, setDataAgents] = useState([]);
  const [dataShifts, setDataShifts] = useState([]);
  const [selectedAgents, setSelectedAgents] = useState([]);
  const [isMaxAgents, setIsMaxAgents] = useState(false);
  const [isRepetition, setRepetition] = useState(false);
  const [lockScroll, setLockScroll] = useState(false);

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
      select: (response: AxiosResponse<IGetAgentsPaginateSucceedResponse>) => {
        return response.data.data;
      },
      onSuccess: (data) => setDataAgents(data.data),
      onError: (error) => {
        notification.error({
          message: "Gagal mendapatkan daftar karyawan (agent).",
        });
      },
    }
  );

  const {
    data: dataRawShifts,
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
      select: (response) => response.data.data,
      onSuccess: (data) => {
        setLockScroll(false);
        if (shiftFilterParams.page == 1) {
          setDataShifts(data.data);
        } else {
          if (data.data.length > 0) {
            let updatedData = [...dataShifts, ...data.data];
            setDataShifts(updatedData);
          } else {
            setLockScroll(true);
          }
        }
      },
      onError: (error) => {
        notification.error({
          message: "Gagal mendapatkan daftar shift.",
        });
      },
    }
  );

  //3. HANDLER
  const handleClose = () => {
    instanceForm.resetFields();
    setDataSchedule({
      user_ids: [],
      shift_id: null,
      date: "",
      forever: false,
      start_date: "",
      end_date: "",
      repeats: [],
    });
    setSelectedAgents([]);
    setRepetition(false);
    setIsMaxAgents(false);
    onvisible(false);
    setAgentFilterParams({ page: 1, rows: 10, name: "", company_id: null });
    setShiftFilterParams({
      page: 1,
      rows: 10,
      keyword: "",
    });
    setLockScroll(false);
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
      onError: (error: any, variables) => {
        notification.error({ message: error?.response?.data?.message });
      },
    }
  );

  const onChangeSearchAgents = (e) => {
    setTimeout(
      () => setAgentFilterParams((prev) => ({ ...prev, name: e.target.value })),
      500
    );
  };

  const handleSelect = (value, checked) => {
    const currentSelected = value;
    let newSelectedAgents = [];
    let newSelectedAgentIds = [];
    if (checked && selectedAgents?.length < 20) {
      newSelectedAgents = [...selectedAgents, currentSelected];
    } else {
      newSelectedAgents = selectedAgents.filter(
        (obj) => obj.id !== currentSelected?.id
      );
    }
    newSelectedAgentIds = newSelectedAgents.map((item) => item?.id);
    setSelectedAgents(newSelectedAgents);
    setDataSchedule((prev) => ({ ...prev, user_ids: newSelectedAgentIds }));

    handleCheckMaxAgents(newSelectedAgents);
  };

  const handleSelectAll = () => {
    setSelectedAgents(dataAgents);
    setDataSchedule((prev) => ({
      ...prev,
      user_ids: dataAgents.map((item) => item?.id),
    }));

    handleCheckMaxAgents(dataAgents);
  };

  const handleUnselectAll = () => {
    setSelectedAgents([]);
    setDataSchedule((prev) => ({ ...prev, user_ids: [] }));

    handleCheckMaxAgents([]);
  };

  const handleCheckMaxAgents = (selectedAgents) => {
    if (selectedAgents?.length >= 20) {
      setIsMaxAgents(true);
    } else {
      setIsMaxAgents(false);
    }
  };

  const handleSwitchRepetition = (checked) => {
    if (checked == false) {
      setDataSchedule((prev) => ({
        ...prev,
        forever: false,
        start_date: null,
        end_date: null,
        repeats: [],
      }));

      instanceForm.resetFields(["repetition_dates"]);
    }

    setRepetition(checked);
  };

  const validateRepetitionRange = (_, value) => {
    if (value && value[1].diff(value[0], "days") > MAX_SCHEDULED_DAYS) {
      return Promise.reject(
        "Maksimal rentang tanggal yang dapat dipilih adalah 3 bulan"
      );
    }
    return Promise.resolve();
  };

  const dayList = [
    {
      label: "Senin",
      value: 1,
    },
    {
      label: "Selasa",
      value: 2,
    },
    {
      label: "Rabu",
      value: 3,
    },
    {
      label: "Kamis",
      value: 4,
    },
    {
      label: "Jumat",
      value: 5,
    },
    {
      label: "Sabtu",
      value: 6,
    },
    {
      label: "Minggu",
      value: 0,
    },
  ];

  // console.log({ dataSchedule });
  // console.log({ selectedAgents });

  return (
    <DrawerCore
      title={"Jadwalkan Karyawan"}
      visible={visible}
      width={530}
      onClose={handleClose}
      buttonOkText={"Simpan"}
      buttonCancelText={"Batal"}
      onClick={() => addSchedule(dataSchedule)}
      onButtonCancelClicked={handleClose}
      disabled={
        !isAllowedToAddSchedule ||
        !dataSchedule?.user_ids?.length ||
        !dataSchedule?.date ||
        !dataSchedule?.shift_id ||
        moment(dataSchedule.end_date).diff(
          moment(dataSchedule.start_date),
          "days"
        ) > MAX_SCHEDULED_DAYS
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
                  <RightOutlined rotate={isActive ? 90 : 0} />
                )}
              >
                <Collapse.Panel
                  key={"1"}
                  header={
                    <div className="flex items-center justify-between w-full">
                      <p className="text-md">Pilih Karyawan</p>
                      {selectedAgents?.length ? (
                        <div
                          className="flex items-center gap-2 bg-backdrop text-primary100 
                          px-3 py-1 rounded-full mig-caption--bold"
                        >
                          <p>{selectedAgents?.length} Karyawan Dipilih</p>
                        </div>
                      ) : (
                        <div
                          className="flex items-center gap-2 bg-danger bg-opacity-[0.15] text-danger 
                          px-3 py-1 rounded-full text-[10px] font-bold"
                        >
                          <AlerttriangleIconSvg size={18} color={"#BF4A40"} />
                          <p>Kamu Belum Memilih Karyawan</p>
                        </div>
                      )}
                    </div>
                  }
                >
                  <div className="grid grid-cols-1 gap-4">
                    {isMaxAgents && (
                      <div className="flex items-center justify-between bg-notice bg-opacity-[0.15] px-4 py-3 rounded-md">
                        <div className="flex items-center gap-2">
                          <InfoCircleIconSvg color={"#ED962F"} size={18} />
                          <p className="mig-caption--medium text-xs text-onprogress">
                            Maksimal karyawan yang dipilih adalah 20 orang.
                          </p>
                        </div>
                        {/* <button onClick={} className="bg-transparent p-0 m-0 flex items-center">
                          <XIconSvg size={16} color={"#4D4D4D"} />
                        </button> */}
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row items-center gap-2">
                      <Input
                        allowClear
                        style={{ width: `100%` }}
                        suffix={<SearchOutlined />}
                        placeholder="Cari Nama Karyawan.."
                        onChange={onChangeSearchAgents}
                        disabled={!isAllowedToGetAgents}
                      />
                      <div className="w-full md:w-1/3">
                        <Select
                          allowClear
                          showSearch
                          disabled={!isAllowedToGetCompanyList}
                          placeholder="Pilih Perusahaan"
                          style={{ width: `100%` }}
                          onChange={(value) => {
                            setAgentFilterParams((prev) => ({
                              ...prev,
                              company_id: value,
                            }));
                          }}
                          optionFilterProp="children"
                          filterOption={(
                            input,
                            option: { label: string; value: number }
                          ) =>
                            option?.label
                              ?.toLowerCase()
                              .includes(input.toLowerCase())
                          }
                        >
                          {companyList?.map((item) => (
                            <Select.Option
                              key={item.id}
                              value={item.id}
                              label={item.name}
                            >
                              {item.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <p className="mig-caption--bold text-mono30">
                        Daftar Karyawan
                      </p>
                      {selectedAgents?.length < agentFilterParams?.rows ? (
                        <button
                          className="mig-caption--bold text-primary100 bg-transparent 
                        hover:opacity-75"
                          onClick={handleSelectAll}
                          type="button"
                        >
                          Pilih Semua
                        </button>
                      ) : (
                        <button
                          className="mig-caption--bold text-primary100 bg-transparent 
                        hover:opacity-75"
                          onClick={handleUnselectAll}
                          type="button"
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
                      onRow={(record, idx) => {
                        return {
                          onClick: () => {
                            const isChecked = selectedAgents.some(
                              (selected) => selected?.id === record?.id
                            );
                            handleSelect(record, isChecked ? false : true);
                          },
                        };
                      }}
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
                                  <p className="font-medium">{record?.name}</p>
                                </div>
                                <Checkbox
                                  key={record.id}
                                  value={record}
                                  checked={isChecked}
                                  onChange={(e) =>
                                    handleSelect(
                                      e.target.value,
                                      e.target.checked
                                    )
                                  }
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
                  <Tag
                    key={item?.id}
                    closable
                    onClose={() => handleSelect(item, false)}
                    className="flex items-center gap-2 bg-backdrop p-2 rounded-md mig-caption--medium"
                  >
                    <UsercircleIconSvg color="#35763B" size={20} />
                    <p>{item?.name}</p>
                  </Tag>
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
                    let formattedDate = moment(value).isValid()
                      ? moment(value).format("YYYY-MM-DD")
                      : null;
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
                <AsyncSelect
                  allowClear
                  value={dataSchedule.shift_id}
                  placeholder="Pilih Shift"
                  disabled={!isAllowedToGetShifts}
                  className=" mb-2"
                  lock={lockScroll}
                  setFilterParams={setShiftFilterParams}
                  onChange={(value, option) => {
                    setDataSchedule((prev) => ({
                      ...prev,
                      shift_id: value,
                    }));
                  }}
                  data={dataShifts?.map((item) => ({
                    ...item,
                    name: `${item?.title} (${item?.start_at?.slice(
                      0,
                      5
                    )} - ${item?.end_at?.slice(0, 5)})`,
                  }))}
                />
              </div>
            </Form.Item>

            <div className="flex items-center justify-between bg-lightblue px-4 py-3 rounded-md mb-6">
              <div className="flex items-center gap-2">
                <InfoCircleIconSvg color={"#00589F"} size={18} />
                <p className="mig-caption--medium text-secondary100">
                  Belum memiliki shift yang sesuai?
                </p>
              </div>
              <ButtonSys
                type={"default"}
                color={"secondary100"}
                onClick={() => rt.push("/attendance/shift")}
              >
                Buat Shift
              </ButtonSys>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <p className="mig-caption--bold">Jadwal Repetisi</p>
              <Switch
                checked={isRepetition}
                onChange={handleSwitchRepetition}
              ></Switch>
            </div>

            <hr className="mb-6" />

            <div className={isRepetition ? `opacity-100` : `opacity-20`}>
              <h4 className="mig-heading--4 mb-6">
                Menyiapkan Jadwal Repetisi
              </h4>
              <Form.Item
                label="Pilih Salah Satu"
                name={"repeat"}
                rules={[
                  {
                    required: true,
                    message: "Wajib diisi",
                  },
                ]}
                className="col-span-2"
              >
                <div className="flex items-center">
                  <CheckableTag
                    checked={dataSchedule?.forever}
                    onChange={(checked) => {
                      setDataSchedule((prev) => ({
                        ...prev,
                        forever: checked,
                      }));
                    }}
                    className="border border-primary100 py-1 px-3 rounded-full mb-2"
                  >
                    <div className="flex flex-row items-center space-x-1">
                      <p>Selamanya</p>
                    </div>
                  </CheckableTag>

                  <CheckableTag
                    checked={dataSchedule?.forever === false}
                    className="border border-primary100 py-1 px-3 rounded-full mb-2"
                    onChange={(checked) => {
                      if (checked) {
                        setDataSchedule((prev) => ({
                          ...prev,
                          forever: false,
                        }));
                      }
                    }}
                  >
                    <div className="flex flex-row items-center space-x-1">
                      <p>Pilih Rentang Tanggal Repetisi</p>
                    </div>
                  </CheckableTag>
                </div>
              </Form.Item>
              {!dataSchedule.forever && (
                <>
                  <Form.Item
                    label="Rentang Tanggal Repetisi"
                    name={"repetition_dates"}
                    rules={[
                      {
                        required: true,
                        message: "Rentang tanggal repetisi wajib diisi",
                      },

                      { validator: validateRepetitionRange },
                    ]}
                    className="col-span-2"
                  >
                    <DatePicker.RangePicker
                      locale={locale}
                      picker="date"
                      className="w-full"
                      format={"DD MMMM YYYY"}
                      placeholder={["Mulai", "Akhir"]}
                      disabledDate={(current) => {
                        return (
                          moment(current) < moment(dataSchedule?.date) ||
                          moment(current).diff(
                            moment(dataSchedule.start_date),
                            "days"
                          ) > MAX_SCHEDULED_DAYS
                        );
                      }}
                      value={[
                        moment(dataSchedule.start_date).isValid()
                          ? moment(dataSchedule.start_date)
                          : null,
                        moment(dataSchedule.end_date).isValid()
                          ? moment(dataSchedule.end_date)
                          : null,
                      ]}
                      onChange={(values) => {
                        let formattedStartDate = moment(values?.[0]).isValid()
                          ? moment(values?.[0]).format("YYYY-MM-DD")
                          : null;

                        let formattedEndDate = moment(values?.[1]).isValid()
                          ? moment(values?.[1]).format("YYYY-MM-DD")
                          : null;

                        setDataSchedule((prev) => ({
                          ...prev,
                          start_date: formattedStartDate,
                          end_date: formattedEndDate,
                        }));
                      }}
                    />
                  </Form.Item>

                  {isRepetition &&
                    dataSchedule?.start_date < dataSchedule?.date && (
                      <div className="flex items-center gap-2 bg-danger px-4 py-3 rounded-md mb-6">
                        <AlerttriangleIconSvg color={"#FFF"} size={20} />
                        <p className="text-white">
                          <b>Tanggal Mulai Repetisi</b> harus melebihi{" "}
                          <b>Tanggal Berlaku</b>!
                        </p>
                      </div>
                    )}
                </>
              )}

              <Form.Item
                label="Tentukan Hari"
                name={"repeats"}
                rules={[
                  {
                    required: true,
                    message: "Hari wajib diisi",
                  },
                ]}
                className="col-span-2"
              >
                <div>
                  <div className="flex flex-wrap gap-y-2 items-center mb-2">
                    {dayList.map((day, idx) => (
                      <CheckableTag
                        key={idx}
                        // checked={false}
                        className="border border-primary100 py-1 px-3 rounded-full"
                        checked={dataSchedule?.repeats?.some(
                          (dayVal) => dayVal === day?.value
                        )}
                        onChange={(checked) => {
                          let selectedDays = dataSchedule.repeats;
                          if (checked) {
                            selectedDays.push(day.value);
                          } else {
                            selectedDays = selectedDays.filter(
                              (dayValue) => dayValue !== day.value
                            );
                          }

                          setDataSchedule((prev) => ({
                            ...prev,
                            repeats: selectedDays,
                          }));
                        }}
                      >
                        <p>{day.label}</p>
                      </CheckableTag>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <InfoCircleIconSvg color={"#00589F"} size={14} />
                    <p className="mig-caption text-secondary100">
                      Anda dapat memilih hari lebih dari satu
                    </p>
                  </div>
                </div>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </DrawerCore>
  );
};

export default DrawerSchedule;
