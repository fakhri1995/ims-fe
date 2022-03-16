import {
  CloseOutlined,
  ExclamationCircleOutlined,
  LeftOutlined,
  SearchOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { Button, Empty, Form, Input, Modal, Spin } from "antd";
import React, { FC, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  AttendanceFormAktivitasService,
  AttendanceFormAktivitasServiceQueryKeys,
  User,
  useAddFormAktivitasStaff,
  useDeleteFormAktivitasStaff,
} from "apis/attendance";
import {
  FilterUsersTypeParamEnum,
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
  const {
    data: currentFormAktivitasUsers,
    isLoading: currentFormAktivitasUsersLoading,
  } = useQuery(
    [AttendanceFormAktivitasServiceQueryKeys.FIND_ONE, aktivitasId],
    () => AttendanceFormAktivitasService.findOne(axiosClient, aktivitasId),
    {
      select: (response) => response.data.data.users as StaffModelType[],
    }
  );

  const { mutateAsync: deleteFormAktivitasStaff } =
    useDeleteFormAktivitasStaff();
  const { mutateAsync: addFormAktivitasStaff } = useAddFormAktivitasStaff();

  const [cardPhase, setCardPhase] = useState<CardPhaseType>("default");
  const [searchValue, setSearchValue] = useState("");
  const [selectedStaffBuffer, setSelectedStaffBuffer] = useState<
    Pick<StaffModelType, "id" | "name">[]
  >([]);

  const updateSelectedStaffBuffer = (
    actionType: "insert" | "delete",
    payload: Pick<StaffModelType, "id" | "name">
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
      title: "Hapus Staff",
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

  const onAddStaffButtonClicked = () => {
    confirm({
      title: "Tambah Staff",
      icon: <ExclamationCircleOutlined style={{ color: "rgb(191 74 64)" }} />,
      content: (
        <>
          <p>
            Apakah Anda yakin ingin menambah staff{" "}
            <strong>{selectedStaffNames.join(", ")}</strong>?
          </p>
          <br />
          <p>
            Menambahkan staff akan mengeluarkannya dari aktivitas mereka saat
            ini.
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
          { id: aktivitasId, user_ids: selectedStaffIds },
          {
            onSuccess: () => {
              setCardPhase("default");
              info({
                title: "Staff Berhasil Ditambahkan",
                content: (
                  <p>
                    Staff <strong>{selectedStaffNames.join(", ")}</strong> telah
                    ditambahkan
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
  };

  const filteredCurrentFormAktivitasUsers = useMemo(() => {
    if (!currentFormAktivitasUsers) {
      return [];
    }

    return currentFormAktivitasUsers.filter((staff) =>
      staff.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, currentFormAktivitasUsers]);

  return (
    <div className="mig-platform w-full overflow-x-auto">
      {/* Header */}
      <CardHeader
        cardPhase={cardPhase}
        onSearch={onSearchStaff}
        onChangePhase={triggerChangePhase}
        isAllowedToDeleteStaff={currentFormAktivitasUsers?.length > 0}
      />

      {/* Content Container */}
      <div className="my-10">
        <div className="w-full">
          {cardPhase === "default" && (
            <StaffSectionContainer
              data={filteredCurrentFormAktivitasUsers || []}
              isLoading={currentFormAktivitasUsersLoading}
              isSelectableSection={false}
              onItemClicked={() => {
                /** noop */
              }}
            >
              <div
                className="flex flex-col items-center space-y-3 group hover:cursor-pointer"
                onClick={() => triggerChangePhase("add")}
              >
                <Button className="rounded-full bg-primary100/25 w-12 h-12 flex items-center justify-center group-hover:border-primary100 group-hover:bg-primary100/50 focus:border-primary100">
                  <UserAddOutlined className="text-xl text-primary100" />
                </Button>

                <span className="text-mono30 text-center">Tambah Staff</span>
              </div>
            </StaffSectionContainer>
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
  isAllowedToDeleteStaff?: boolean;
}

/**
 * @private
 */
const CardHeader: FC<ICardHeader> = ({
  cardPhase,
  onChangePhase,
  onSearch,
  isAllowedToDeleteStaff = false,
}) => {
  const [searchForm] = Form.useForm();

  const cardTitlePrefix =
    cardPhase === "add" ? "Tambah" : cardPhase === "remove" ? "Hapus" : "";

  const onBackButtonClicked = () => {
    onChangePhase("default");
  };

  const onRemoveButtonClicked = () => {
    onChangePhase("remove");
  };

  return (
    <div className="flex items-center justify-between">
      {/* LHS: Back Button, Title */}
      <div className="flex items-center">
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
      <div className="flex space-x-4">
        {cardPhase === "default" && isAllowedToDeleteStaff && (
          <Button
            type="ghost"
            className="mig-button mig-button--outlined-danger"
            onClick={onRemoveButtonClicked}
          >
            <UserDeleteOutlined />
            Hapus Staff
          </Button>
        )}

        <Form
          form={searchForm}
          layout="inline"
          onFinish={() => {
            onSearch(searchForm.getFieldValue("search"));
          }}
        >
          <Form.Item name="search">
            <Input
              allowClear
              placeholder="Cari..."
              onChange={(ev) => {
                if (ev.target.value === "") {
                  onSearch("");
                }
              }}
            />
          </Form.Item>

          <Form.Item noStyle>
            <Button
              htmlType="submit"
              className="mig-button mig-button--solid-primary"
              icon={<SearchOutlined />}
            >
              Cari
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

/**
 * @private
 */
type StaffModelType = Pick<User, "id" | "name" | "profile_image" | "position">;

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
    <div className="flex justify-between">
      {/* LHS: Pagination */}
      <div>
        {/* {cardPhase !== "remove" && (
          <Pagination
            defaultCurrent={1}
            total={50}
            pageSize={10}
            showSizeChanger={false}
          />
        )} */}
      </div>

      {/* RHS: Acttion Button */}
      {cardPhase !== "default" && (
        <div className="flex space-x-4">
          <Button
            type="ghost"
            className={batalkanButtonClassName}
            onClick={onBatalkanClicked}
          >
            Batalkan
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
            {cardPhase === "add" ? "Tambah" : "Hapus Terpilih"}
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
    "flex flex-col justify-start items-center space-y-3 text-center rounded-lg mx-4 py-2",
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
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-mono80 overflow-hidden">
          <img
            className="w-full h-full bg-cover"
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
      <span className="block text-mono30">{name}</span>

      {/* Staff Position */}
      <span className="block text-mono50 text-xs">{position}</span>
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
  const sectionClassName = clsx("py-6 h-80 overflow-x-auto", {
    "flex flex-col space-y-6 items-center justify-center": isLoading,
    "grid grid-cols-3 md:grid-cols-5 gap-y-6 auto-rows-min":
      !isLoading && (data.length > 0 || React.Children.count(children) > 0),
  });

  return (
    <section className={sectionClassName}>
      {isLoading && <Spin />}

      {data.length === 0 && React.Children.count(children) === 0 && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={emptyMessage || "Tidak ada daftar staff"}
        />
      )}

      {data.map(({ id, name, position, profile_image }) => (
        <StaffListItem
          key={id}
          id={id}
          name={name}
          position={position}
          profileImageUrl={profile_image}
          onClick={onItemClicked}
          isSelected={isSelectableSection}
          isSelectable={isItemHoverable}
        />
      ))}

      {!isLoading && children}
    </section>
  );
};

type UpdateSelectedStaffBufferType = (
  actionType: "insert" | "delete",
  payload: Pick<StaffModelType, "id" | "name">
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
    if (searchValue === "" || items.bottom.length === 0) {
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
        emptyMessage="Pilih staff untuk dihapus"
        onItemClicked={handleItemClickedFromTop}
      />

      <hr />

      <StaffSectionContainer
        data={mappedBottomData}
        isItemHoverable
        isSelectableSection={false}
        emptyMessage="Semua staff akan terhapus"
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
    [
      UserServiceQueryKeys.FILTER_USERS,
      { name: searchValue, type: FilterUsersTypeParamEnum.AGENT },
    ],
    (queries) => {
      const params = queries.queryKey[1] as GetFilterUsersParamsType;

      return UserService.filterUsers(axiosClient, {
        name: params.name === "" ? undefined : params.name,
        type: params.type,
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
          })) as StaffModelType[],
    }
  );

  const handleItemClickedFromTop = (selectedAgentId: number) => {
    setTopItems((prev) => prev.filter((agent) => agent.id !== selectedAgentId));
    updateSelectedStaffBuffer("delete", { id: selectedAgentId, name: "" });
  };

  const handleItemClickedFromBottom = (agentId: number) => {
    const selectedAgent = agentList.find((agent) => agent.id === agentId);

    setTopItems((prev) => [...prev, selectedAgent]);
    updateSelectedStaffBuffer("insert", {
      id: agentId,
      name: selectedAgent.name,
    });
  };

  return (
    <>
      <StaffSectionContainer
        data={topItems}
        isItemHoverable
        isSelectableSection
        emptyMessage="Pilih staff untuk ditambahkan"
        onItemClicked={handleItemClickedFromTop}
      />

      <hr />

      <StaffSectionContainer
        data={agentList || []}
        isItemHoverable
        isSelectableSection={false}
        emptyMessage="Daftar staff kosong"
        onItemClicked={handleItemClickedFromBottom}
        isLoading={loadingAgentList}
      />
    </>
  );
};
