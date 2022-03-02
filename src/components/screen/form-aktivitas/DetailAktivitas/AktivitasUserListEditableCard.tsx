import {
  CloseOutlined,
  LeftOutlined,
  SearchOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Pagination, Spin } from "antd";
import {
  AttendanceService,
  AttendanceServiceQueryKeys,
  User,
} from "apis/attendance";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { useAxiosClient } from "hooks/use-axios-client";

import clsx from "clsx";

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
  const { data, isLoading } = useQuery(
    [AttendanceServiceQueryKeys.FIND_ONE, aktivitasId],
    () => AttendanceService.findOne(axiosClient, aktivitasId)
  );

  const [cardPhase, setCardPhase] = useState<CardPhaseType>("default");

  const [staffData, setStaffData] = useState<StaffGridItemData[]>([]);
  useEffect(() => {
    if (!data) {
      return;
    }

    setStaffData(() => {
      return data.data.data.users.map((user) => ({
        ...user,
        isOnRemoveState: false,
      }));
    });
  }, [data]);

  const triggerChangePhase = (phase: CardPhaseType) => {
    setCardPhase(phase);

    /** Check for "remove" phase and apply `isOnRemoveState` to true */
    setStaffData((prev) =>
      [...prev].map((staffData) => ({
        ...staffData,
        isOnRemoveState: phase === "remove",
      }))
    );
  };

  const onSearchStaff = (searchValue: string) => {
    alert(searchValue);
  };

  const contentClassName = clsx("my-10", {
    "grid grid-cols-3 md:grid-cols-5 gap-y-6": !isLoading,
    "flex flex-col space-y-6 items-center justify-center": isLoading,
  });

  return (
    <div className="w-full bg-white p-6 rounded-md shadow-md overflow-x-auto">
      {/* Header */}
      <CardHeader
        cardPhase={cardPhase}
        onSearch={onSearchStaff}
        onChangePhase={triggerChangePhase}
      />

      {/* Content Container */}
      <div className={contentClassName}>
        {isLoading && (
          <>
            <Spin />
            <span className="text-mono50 animate-pulse">Memuat data...</span>
          </>
        )}

        {/* Staff Item */}
        {!isLoading && (
          <>
            {staffData.map((props, idx) => (
              <StaffGridItem
                key={idx}
                onRemoveStaff={(staffId) => {
                  alert(`Try to remove staff with ID: ${staffId}`);
                }}
                {...props}
              />
            ))}

            {cardPhase === "default" && (
              <div
                className="flex flex-col items-center space-y-3 hover:cursor-pointer"
                onClick={() => triggerChangePhase("add")}
              >
                <Button className="rounded-full bg-primary100/25 w-12 h-12 flex items-center justify-center hover:border-primary100 focus:border-primary100">
                  <UserAddOutlined className="text-xl text-primary100" />
                </Button>

                <span className="text-mono30 text-center">Tambah Staff</span>
              </div>
            )}
          </>
        )}

        {/* {!isLoading && (
                    Array(10)
                        .fill(0)
                        .map((_, idx) => (
                            <StaffGridItem
                                key={idx}
                                id={1}
                                name="Bintang"
                                nip="12031289"
                                profile_image="-"
                                isOnRemoveState={cardPhase === "remove"}
                                onRemoveStaff={(staffId) => {
                                    alert(`Try to remove staff with ID: ${staffId}`);
                                }}
                            />
                        ))
                )} */}
      </div>

      {/* Pagination and Action button */}
      <CardFooter
        cardPhase={cardPhase}
        onBatalkanClicked={() => triggerChangePhase("default")}
        onDeleteStaffClicked={() => {}}
        onAddStaffClicked={() => {}}
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
}

/**
 * @private
 */
const CardHeader: FC<ICardHeader> = ({
  cardPhase,
  onChangePhase,
  onSearch,
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
        {cardPhase === "default" && (
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
            <Input placeholder="Cari..." />
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
type StaffGridItemType = Pick<
  User,
  "id" | "name" | "profile_image" | "position"
>;
interface IStaffGridItem {
  isOnRemoveState?: boolean;
  onRemoveStaff: (staffId: number) => void;
}
type StaffGridItemData = StaffGridItemType &
  Pick<IStaffGridItem, "isOnRemoveState">;

/**
 * @private
 */
const StaffGridItem: FC<StaffGridItemType & IStaffGridItem> = ({
  isOnRemoveState = false,
  onRemoveStaff,
  ...staff
}) => {
  const gridItemClassName = clsx(
    "flex flex-col justify-start items-center space-y-3 text-center",
    {
      "hover:cursor-pointer": isOnRemoveState,
    }
  );

  const onGridItemClicked = () => {
    if (!isOnRemoveState) {
      return;
    }

    onRemoveStaff(staff.id);
  };

  return (
    <div className={gridItemClassName} onClick={onGridItemClicked}>
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-mono80 relative">
        {staff.profile_image !== "-" && (
          <img
            className="w-full h-full bg-cover"
            alt={`${staff.name}'s Avatar`}
            src={staff.profile_image}
          />
        )}

        {isOnRemoveState && (
          <button className="bg-state1/40 rounded-full flex items-center p-1 absolute -top-1 -right-2">
            <CloseOutlined className="text-state1" />
          </button>
        )}
      </div>

      {/* Staff name */}
      <span className="block text-mono30">{staff.name}</span>

      {/* Staff Position */}
      <span className="block text-mono50 text-xs">{staff.position}</span>
    </div>
  );
};

/**
 * @private
 */
interface ICardFooter {
  cardPhase: CardPhaseType;
  onBatalkanClicked: () => void;

  onDeleteStaffClicked: () => void;
  onAddStaffClicked: () => void;
}

/**
 * @private
 */
const CardFooter: FC<ICardFooter> = ({
  cardPhase,
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
        {cardPhase !== "remove" && (
          <Pagination
            defaultCurrent={1}
            total={50}
            pageSize={10}
            showSizeChanger={false}
          />
        )}
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
