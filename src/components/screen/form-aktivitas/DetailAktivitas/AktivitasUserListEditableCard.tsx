import {
  CloseOutlined,
  ExclamationCircleOutlined,
  LeftOutlined,
  SearchOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { Button, Empty, Form, Input, Modal, Spin } from "antd";
import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQuery } from "react-query";

import ButtonSys from "components/button";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  ATTENDANCE_FORM_GET,
  ATTENDANCE_FORM_USERS_ADD,
  ATTENDANCE_FORM_USERS_REMOVE,
  USERS_GET,
} from "lib/features";
import {
  generateStaticAssetUrl,
  permissionWarningNotification,
} from "lib/helper";

import {
  AttendanceFormAktivitasService,
  AttendanceFormAktivitasServiceQueryKeys,
  useAddFormAktivitasStaff,
  useDeleteFormAktivitasStaff,
} from "apis/attendance";
import {
  FilterUsersTypeParamEnum,
  GetFilterUsersDatum,
  GetFilterUsersParamsType,
  UserService,
  UserServiceQueryKeys,
} from "apis/user";

import clsx from "clsx";

const { confirm, info } = Modal;

/**
 * Component AktivitasUserListEditableCard's props.
 */
export interface IAktivitasUserListEditableCard {
  aktivitasId: number;
}

/**
 * Component AktivitasUserListEditableCard
 */
export const AktivitasUserListEditableCard: FC<
  IAktivitasUserListEditableCard
> = ({ aktivitasId }) => {
  const axiosClient = useAxiosClient();
  const { hasPermission } = useAccessControl();
  const isAllowedToAddUsers = hasPermission(ATTENDANCE_FORM_USERS_ADD);
  const isAllowedToDeleteUsers = hasPermission(ATTENDANCE_FORM_USERS_REMOVE);
  const isAllowedToGetFilterUsers = hasPermission(USERS_GET);

  const canAddNewStaffToFormActivity =
    isAllowedToAddUsers && isAllowedToGetFilterUsers;

  const {
    data: currentFormAktivitasUsers,
    isLoading: currentFormAktivitasUsersLoading,
  } = useQuery(
    [AttendanceFormAktivitasServiceQueryKeys.FIND_ONE, aktivitasId],
    () => AttendanceFormAktivitasService.findOne(axiosClient, aktivitasId, 1),
    {
      enabled: hasPermission(ATTENDANCE_FORM_GET),
      select: (response) => response.data.data.users as StaffModelType[],
    }
  );

  const { mutateAsync: deleteFormAktivitasStaff } =
    useDeleteFormAktivitasStaff();
  const { mutateAsync: addFormAktivitasStaff } = useAddFormAktivitasStaff();

  const [cardPhase, setCardPhase] = useState<CardPhaseType>("default");
  const [searchValue, setSearchValue] = useState("");

  const [selectedStaffBuffer, setSelectedStaffBuffer] = useState<
    UpdateSelectedStaffPayloadType[]
  >([]);

  const updateSelectedStaffBuffer = (
    actionType: "insert" | "delete",
    payload: UpdateSelectedStaffPayloadType
  ) => {
    switch (actionType) {
      case "insert":
        setSelectedStaffBuffer([...selectedStaffBuffer, payload]);
        break;

      case "delete":
        setSelectedStaffBuffer((prev) =>
          prev.filter((staff) => staff.id !== payload.id)
        );
        break;
    }
  };

  const triggerChangePhase = (phase: CardPhaseType) => {
    if (phase === "add" && !canAddNewStaffToFormActivity) {
      permissionWarningNotification("Menambahkan", "User Form Aktivitas");
      return;
    }

    if (phase === "remove" && !isAllowedToDeleteUsers) {
      permissionWarningNotification("Menghapus", "User Form Aktivitas");
      return;
    }

    setCardPhase(phase);
    setSelectedStaffBuffer([]);
  };

  const onSearchStaff = (searchValue: string) => {
    setSearchValue(searchValue);
  };

  const selectedStaffNames = useMemo(
    () => selectedStaffBuffer.map((staff) => staff.name),
    [selectedStaffBuffer.length]
  );
  const selectedStaffIds = useMemo(
    () => selectedStaffBuffer.map((staff) => staff.id),
    [selectedStaffBuffer.length]
  );

  const onDeleteStaffButtonClicked = () => {
    confirm({
      title: "Remove Staff",
      icon: <ExclamationCircleOutlined style={{ color: "rgb(191 74 64)" }} />,
      content: (
        <p>
          Apakah Anda yakin ingin menghapus staff{" "}
          <strong>{selectedStaffNames.join(", ")}</strong>?
        </p>
      ),
      width: 640,
      centered: true,
      okText: "Ya, saya yakin dan hapus staff",
      okType: "danger",
      cancelText: "Kembali",
      onOk: () => {
        return deleteFormAktivitasStaff(
          { id: aktivitasId, user_ids: selectedStaffIds },
          {
            onSuccess: () => {
              setCardPhase("default");
              info({
                title: "Staff Berhasil Dihapus",
                content: (
                  <p>
                    Staff <strong>{selectedStaffNames.join(", ")}</strong> telah
                    terhapus
                  </p>
                ),
                width: 640,
                centered: true,
              });
            },
          }
        );
      },
      modalRender: (node) => (
        <div className="custom-modal-confirm-danger">{node}</div>
      ),
    });
  };

  const onAddStaffButtonClicked = useCallback(() => {
    const mSelectedStaffNames = [];
    const mSelectedStaffIds = [];
    const mSelectedStaffNameAndFormActivities = {};
    let someStaffHaveFormAttendance = false;

    selectedStaffBuffer.forEach((buffer) => {
      mSelectedStaffNames.push(buffer.name);
      mSelectedStaffIds.push(buffer.id);

      if (buffer.attendance_form) {
        mSelectedStaffNameAndFormActivities[buffer.name] =
          buffer.attendance_form.name;

        if (!someStaffHaveFormAttendance) {
          someStaffHaveFormAttendance = true;
        }
      }
    });

    confirm({
      title: "Menambahkan Staff",
      icon: <ExclamationCircleOutlined style={{ color: "rgb(191 74 64)" }} />,
      content: (
        <>
          {someStaffHaveFormAttendance && (
            <div className="flex flex-col space-y-6 mb-6">
              <p>Beberapa staff sebelumnya memiliki aktivitas.</p>
              <ul>
                {Object.entries(mSelectedStaffNameAndFormActivities).map(
                  ([staffName, staffFormAktivitas], idx) => (
                    <li key={idx}>
                      <strong>
                        {`${++idx}. ${staffName} (${staffFormAktivitas})`}
                      </strong>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
          <p>
            Apakah Anda yakin ingin menambahkan staff{" "}
            <strong>{mSelectedStaffNames.join(", ")}</strong>? Staff yang
            memiliki aktivitas akan terhapus dari aktivitas sebelumnya.
          </p>
        </>
      ),
      width: 640,
      centered: true,
      okText: "Ya, saya yakin dan tambah staff",
      okType: "primary",
      cancelText: "Kembali",
      onOk: () => {
        return addFormAktivitasStaff(
          { id: aktivitasId, user_ids: mSelectedStaffIds },
          {
            onSuccess: () => {
              setCardPhase("default");
              info({
                title: "Staff Berhasil Ditambahkan",
                content: (
                  <p>
                    Staff <strong>{mSelectedStaffNames.join(", ")}</strong>{" "}
                    telah ditambahkan
                  </p>
                ),
                width: 640,
                centered: true,
              });
            },
          }
        );
      },
      modalRender: (node) => (
        <div className="custom-modal-confirm-default">{node}</div>
      ),
    });
  }, [aktivitasId, selectedStaffBuffer]);

  const filteredCurrentFormAktivitasUsers = useMemo(() => {
    if (!currentFormAktivitasUsers) {
      return [];
    }

    if (!searchValue) {
      return currentFormAktivitasUsers;
    }

    return currentFormAktivitasUsers.filter((staff) =>
      staff.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, currentFormAktivitasUsers]);

  useEffect(() => {
    setSearchValue("");
  }, [cardPhase]);

  const tambahStaffClassName = clsx(
    "flex flex-col items-center space-y-3 group",
    canAddNewStaffToFormActivity
      ? "hover:cursor-pointer"
      : "hover:cursor-not-allowed"
  );

  return (
    <div className="mig-platform w-full overflow-x-auto">
      {/* Header */}
      <CardHeader
        cardPhase={cardPhase}
        onSearch={onSearchStaff}
        searchValue={searchValue}
        onChangePhase={triggerChangePhase}
        isAllowedToDeleteStaff={currentFormAktivitasUsers?.length > 0}
        canAddNewStaffToFormActivity={canAddNewStaffToFormActivity}
      />

      {/* Content Container */}
      <div className="mt-2 mb-10">
        <div className="w-full">
          {cardPhase === "default" && (
            <StaffSectionContainer
              data={filteredCurrentFormAktivitasUsers || []}
              isLoading={currentFormAktivitasUsersLoading}
              isSelectableSection={false}
              onItemClicked={() => {
                /** noop */
              }}
            />
          )}

          {cardPhase === "remove" && (
            <StaffSectionOnRemoveContainer
              currentStaff={currentFormAktivitasUsers || []}
              searchValue={searchValue}
              updateSelectedStaffBuffer={updateSelectedStaffBuffer}
            />
          )}

          {cardPhase === "add" && (
            <StaffSectionOnAddContainer
              currentStaff={currentFormAktivitasUsers || []}
              currentSelectedStaff={selectedStaffBuffer}
              searchValue={searchValue}
              updateSelectedStaffBuffer={updateSelectedStaffBuffer}
            />
          )}
        </div>
      </div>

      {/* Pagination and Action button */}
      <CardFooter
        cardPhase={cardPhase}
        onBatalkanClicked={() => triggerChangePhase("default")}
        onDeleteStaffClicked={onDeleteStaffButtonClicked}
        onAddStaffClicked={onAddStaffButtonClicked}
        disableActionButton={selectedStaffBuffer.length === 0}
      />
    </div>
  );
};

/**
 * Terdapat 3 phase:
 *
 * default: Menampilkan users yang ter-attach pada aktivitas (`users`)
 * add: Menambahkan users baru ke dalam aktivitas
 * remove: Mengeluarkan users dari aktivitas
 *
 * @private
 */
type CardPhaseType = "default" | "add" | "remove";

/**
 * @private
 */
interface ICardHeader {
  cardPhase: CardPhaseType;
  onChangePhase: (phase: CardPhaseType) => void;
  onSearch: (searchValue: string) => void;
  searchValue: string;
  isAllowedToDeleteStaff?: boolean;
  canAddNewStaffToFormActivity?: boolean;
}

/**
 * @private
 */
const CardHeader: FC<ICardHeader> = ({
  cardPhase,
  onChangePhase,
  onSearch,
  searchValue,
  isAllowedToDeleteStaff = false,
  canAddNewStaffToFormActivity,
}) => {
  const [form] = Form.useForm();

  const cardTitlePrefix =
    cardPhase === "add" ? "Add" : cardPhase === "remove" ? "Remove" : "";

  const onBackButtonClicked = () => {
    onChangePhase("default");
  };

  const onRemoveButtonClicked = () => {
    onChangePhase("remove");
  };

  useEffect(() => {
    form?.setFields([{ name: "search", value: searchValue || "" }]);
  }, [searchValue]);

  let timer: NodeJS.Timeout; // use for delay time in table's search

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between gap-4">
        {/* LHS: Back Button, Title */}
        <div className="flex items-center ">
          {/* Back button */}
          {cardPhase !== "default" && (
            <Button
              type="link"
              className="flex items-center text-mono30 hover:text-mono50 focus:text-mono50"
              onClick={onBackButtonClicked}
            >
              <LeftOutlined />
            </Button>
          )}
          <span className="font-bold text-mono30 text-lg">
            {[cardTitlePrefix, "Staff"].join(" ")}
          </span>
        </div>

        {/* RHS: Search Input, Button */}
        <div className="flex items-center gap-2 ">
          {cardPhase === "default" && isAllowedToDeleteStaff && (
            <div className="w-full">
              <ButtonSys
                type="default"
                color="danger"
                onClick={onRemoveButtonClicked}
                fullWidth
              >
                <div className="flex gap-2 items-center whitespace-nowrap">
                  <UserAddOutlined />
                  Remove Staff
                </div>
              </ButtonSys>
            </div>
          )}
          {cardPhase === "default" && canAddNewStaffToFormActivity && (
            <div className="w-full">
              <ButtonSys
                type="primary"
                fullWidth
                onClick={() => onChangePhase("add")}
              >
                <div className="flex gap-2 items-center whitespace-nowrap">
                  <UserAddOutlined />
                  Add Staff
                </div>
              </ButtonSys>
            </div>
          )}
        </div>
      </div>
      <div className="w-full">
        <Form
          form={form}
          onFinish={(value: { search?: string }) => {
            onSearch(value.search);
          }}
        >
          <Form.Item name="search">
            <Input
              allowClear
              placeholder="Search staff..."
              onChange={(ev) => {
                if (ev.target.value === "") {
                  onSearch("");
                } else {
                  clearTimeout(timer);
                  timer = setTimeout(() => {
                    form.submit();
                  }, 500);
                }
              }}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

/**
 * @private
 */
type StaffModelType = Pick<
  GetFilterUsersDatum,
  "id" | "name" | "profile_image" | "position" | "attendance_forms"
>;

/**
 * @private
 */
interface ICardFooter {
  cardPhase: CardPhaseType;
  disableActionButton: boolean;

  onBatalkanClicked: () => void;

  onDeleteStaffClicked: () => void;
  onAddStaffClicked: () => void;
}

/**
 * @private
 */
const CardFooter: FC<ICardFooter> = ({
  cardPhase,
  disableActionButton,
  onBatalkanClicked,
  onDeleteStaffClicked,
  onAddStaffClicked,
}) => {
  const baseButtonClassName = "mig-button";
  const batalkanButtonClassName = clsx(baseButtonClassName, {
    "mig-button--outlined-danger": cardPhase === "remove",
    "mig-button--outlined-primary": cardPhase === "add",
  });

  const actionButtonClassName = clsx(baseButtonClassName, {
    "mig-button--solid-danger": cardPhase === "remove",
    "mig-button--solid-primary": cardPhase === "add",
  });

  const onActionButtonClicked = () => {
    if (cardPhase === "add") {
      onAddStaffClicked();
    } else {
      onDeleteStaffClicked();
    }
  };

  return (
    <div className="flex justify-end">
      {cardPhase !== "default" && (
        <div className="flex space-x-4">
          <Button
            type="ghost"
            className={batalkanButtonClassName}
            onClick={onBatalkanClicked}
          >
            Cancel
          </Button>

          <Button
            className={actionButtonClassName}
            onClick={onActionButtonClicked}
            disabled={disableActionButton}
          >
            {cardPhase === "add" ? (
              <UserAddOutlined className="text-base" />
            ) : (
              <UserDeleteOutlined className="text-base" />
            )}
            {cardPhase === "add" ? "Add" : "Delete Selected"}
          </Button>
        </div>
      )}
    </div>
  );
};

interface IStaffListItem {
  id: number;
  name: string;
  position: string | null;
  profileImageUrl: string;

  isSelected: boolean;
  isSelectable?: boolean;

  onClick: (id: number) => void;
}

const StaffListItem: FC<IStaffListItem> = ({
  id,
  name,
  position,
  profileImageUrl,
  isSelected,
  isSelectable = false,
  onClick,
}) => {
  const gridItemClassName = clsx(
    "h-24 flex flex-col justify-center items-center text-center rounded-lg py-2 px-1 border",
    {
      "hover:cursor-pointer transition-colors duration-300 bg-white/0 hover:bg-primary100/10":
        isSelectable,
      // "hover:cursor-pointer": isSelected,
    }
  );

  const onClickHandler = () => onClick(id);

  return (
    <div className={gridItemClassName} onClick={onClickHandler}>
      {/* Avatar */}
      <div className="relative mb-1">
        <div className="w-10 h-10 rounded-full bg-mono80 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            alt={`${name}'s Avatar`}
            src={
              profileImageUrl === "-" || profileImageUrl === ""
                ? "/image/staffTask.png"
                : profileImageUrl
            }
          />
        </div>
        {isSelected && (
          <button className="bg-state1/40 rounded-full flex items-center p-1 absolute -top-1 -right-2">
            <CloseOutlined className="text-state1" />
          </button>
        )}
      </div>

      {/* Staff name */}
      <p
        title={name}
        className="block mig-caption--medium text-mono30 truncate w-36 md:w-24 xl:w-36"
      >
        {name}
      </p>

      {/* Staff Position */}
      <p className="block text-mono50 mig-small truncate w-36 md:w-24 xl:w-36">
        {position}
      </p>
    </div>
  );
};

interface IStaffSectionContainer {
  data: StaffModelType[];
  isSelectableSection: boolean;

  onItemClicked: (id: number) => void;

  emptyMessage?: string;
  isLoading?: boolean;
  isItemHoverable?: boolean;
  children?: ReactNode;
}

const StaffSectionContainer: FC<IStaffSectionContainer> = ({
  data,
  isSelectableSection,
  isItemHoverable,
  isLoading = false,
  emptyMessage,
  onItemClicked,
  children,
}) => {
  const sectionClassName = clsx("py-6 h-60 overflow-x-auto", {
    "flex flex-col space-y-6 items-center justify-center": isLoading,
    "grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 auto-rows-min gap-2 md:gap-4":
      !isLoading && (data.length > 0 || React.Children.count(children) > 0),
  });

  return (
    <section className={sectionClassName}>
      {isLoading && <Spin />}

      {data.length === 0 && React.Children.count(children) === 0 && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={emptyMessage || "There’s no staff here. "}
        />
      )}

      {!isLoading && children}

      {data.map(({ id, name, position, profile_image }) => (
        <div key={id} className="w-full">
          <StaffListItem
            id={id}
            name={name}
            position={position}
            profileImageUrl={generateStaticAssetUrl(profile_image.link)}
            onClick={onItemClicked}
            isSelected={isSelectableSection}
            isSelectable={isItemHoverable}
          />
        </div>
      ))}
    </section>
  );
};

type UpdateSelectedStaffPayloadType = Pick<StaffModelType, "id" | "name"> & {
  attendance_form?: { id: number; name: string };
};
type UpdateSelectedStaffBufferType = (
  actionType: "insert" | "delete",
  payload: UpdateSelectedStaffPayloadType
) => void;

interface IStaffSectionOnRemoveContainer {
  currentStaff: StaffModelType[];
  searchValue?: string;
  updateSelectedStaffBuffer: UpdateSelectedStaffBufferType;
}
const StaffSectionOnRemoveContainer: FC<IStaffSectionOnRemoveContainer> = ({
  currentStaff,
  updateSelectedStaffBuffer,
  searchValue,
}) => {
  const [items, setItems] = useState<{
    top: StaffModelType[];
    bottom: StaffModelType[];
  }>({ top: [], bottom: currentStaff });

  const handleItemClickedFromTop = (staffId: number) => {
    const candidateStaffIndex = items.top.findIndex(
      (staff) => staff.id === staffId
    );
    const candidateStaff = items.top[candidateStaffIndex];

    setItems((prev) => {
      return {
        top: prev.top.filter((staff) => staff.id !== staffId),
        bottom: [...prev.bottom, candidateStaff],
      };
    });

    updateSelectedStaffBuffer("delete", {
      id: candidateStaff.id,
      name: candidateStaff.name,
    });
  };

  const handleItemClickedFromBottom = (staffId: number) => {
    const candidateStaffIndex = items.bottom.findIndex(
      (staff) => staff.id === staffId
    );
    const candidateStaff = items.bottom[candidateStaffIndex];

    setItems((prev) => {
      return {
        top: [...prev.top, candidateStaff],
        bottom: prev.bottom.filter((staff) => staff.id !== staffId),
      };
    });

    updateSelectedStaffBuffer("insert", {
      id: candidateStaff.id,
      name: candidateStaff.name,
    });
  };

  /** Filter bottom data to match with the `searchValue` */
  const mappedBottomData = useMemo(() => {
    if (!searchValue || searchValue === "" || items.bottom.length === 0) {
      return items.bottom;
    }

    return items.bottom.filter((staff) => {
      return staff.name.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [searchValue, items.bottom]);

  return (
    <>
      <StaffSectionContainer
        data={items.top}
        isItemHoverable
        isSelectableSection
        emptyMessage="Select staff to be deleted"
        onItemClicked={handleItemClickedFromTop}
      />

      <hr />

      <StaffSectionContainer
        data={mappedBottomData}
        isItemHoverable
        isSelectableSection={false}
        emptyMessage="All staffs will be deleted"
        onItemClicked={handleItemClickedFromBottom}
      />
    </>
  );
};

interface IStaffSectionOnAddContainer extends IStaffSectionOnRemoveContainer {
  currentSelectedStaff: Pick<StaffModelType, "id" | "name">[];
}
const StaffSectionOnAddContainer: FC<IStaffSectionOnAddContainer> = ({
  currentStaff,
  searchValue,
  currentSelectedStaff,
  updateSelectedStaffBuffer,
}) => {
  const axiosClient = useAxiosClient();
  const [topItems, setTopItems] = useState<StaffModelType[]>([]);

  const excludeStaffIds = useMemo(() => {
    const selectedStaffIds = currentSelectedStaff.map((staff) => staff.id);
    const currentStaffIds = currentStaff.map((staff) => staff.id);

    return Array.from(new Set([...selectedStaffIds, ...currentStaffIds]));
  }, [currentSelectedStaff, currentStaff]);

  const { data: agentList, isLoading: loadingAgentList } = useQuery(
    [UserServiceQueryKeys.FILTER_USERS, { name: searchValue }],
    (queries) => {
      const params = queries.queryKey[1] as GetFilterUsersParamsType;

      return UserService.filterUsers(axiosClient, {
        name: params.name === "" ? undefined : params.name,
        type: FilterUsersTypeParamEnum.AGENT,
      });
    },
    {
      select: (response) =>
        response.data.data
          .filter((agent) => !excludeStaffIds.includes(agent.id))
          .map((agent) => ({
            id: agent.id,
            name: agent.name,
            position: agent.position,
            profile_image: agent.profile_image,
            attendance_forms: agent.attendance_forms,
          })) as StaffModelType[],
    }
  );

  const handleItemClickedFromTop = (selectedAgentId: number) => {
    setTopItems((prev) => prev.filter((agent) => agent.id !== selectedAgentId));
    updateSelectedStaffBuffer("delete", { id: selectedAgentId, name: "" });
  };

  const handleItemClickedFromBottom = (agentId: number) => {
    const selectedAgent = agentList.find((agent) => agent.id === agentId);
    const selectedAgentCurrentAttendanceForm =
      selectedAgent.attendance_forms[0];

    setTopItems((prev) => [...prev, selectedAgent]);
    updateSelectedStaffBuffer("insert", {
      id: agentId,
      name: selectedAgent.name,
      attendance_form:
        selectedAgentCurrentAttendanceForm === undefined
          ? undefined
          : {
              id: selectedAgentCurrentAttendanceForm.id,
              name: selectedAgentCurrentAttendanceForm.name,
            },
    });
  };

  return (
    <>
      <StaffSectionContainer
        data={topItems}
        isItemHoverable
        isSelectableSection
        emptyMessage="Select staff to be added"
        onItemClicked={handleItemClickedFromTop}
      />

      <hr />

      <StaffSectionContainer
        data={agentList || []}
        isItemHoverable
        isSelectableSection={false}
        emptyMessage="Staff is empty"
        onItemClicked={handleItemClickedFromBottom}
        isLoading={loadingAgentList}
      />
    </>
  );
};
