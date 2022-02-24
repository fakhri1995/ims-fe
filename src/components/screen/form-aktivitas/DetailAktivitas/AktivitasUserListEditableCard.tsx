import {
  CloseOutlined,
  LeftOutlined,
  SearchOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Spin } from "antd";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  FormAktivitasQueryKeys,
  FormAktivitasService,
} from "services/form-aktivitas";

import clsx from "clsx";

import type { User } from "types/api/attendances/get-attendance-form";

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
  const { axiosClient } = useAxiosClient();
  const { data, isLoading } = useQuery(
    [FormAktivitasQueryKeys.FIND, aktivitasId],
    () => FormAktivitasService.findOne(axiosClient, aktivitasId)
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
  };

  const onSearchStaff = (searchValue: string) => {
    alert(searchValue);
  };

  const contentClassName = clsx("my-10", {
    "grid grid-cols-5 gap-y-6": !isLoading,
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
        {!isLoading &&
          staffData.map((props, idx) => (
            <StaffGridItem
              key={idx}
              onRemoveStaff={(staffId) => {
                alert(`Try to remove staff with ID: ${staffId}`);
              }}
              {...props}
            />
          ))}
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
            className="rounded-md text-state1 hover:text-state12 focus:text-state12 font-medium border-state1 hover:border-state12 focus:border-state12 flex items-center"
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
              className="rounded-md bg-primary100 hover:bg-primary75 focus:bg-primary100 hover:border-primary75 focus:border-primary100 hover:text-white focus:text-white text-white font-medium flex items-center px-6"
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
type StaffGridItemType = Pick<User, "id" | "nip" | "name" | "profile_image">;
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
    "flex flex-col justify-center items-center space-y-3",
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
      <span className="block text-mono30 text-center">{staff.name}</span>

      {/* Staff ID */}
      <span className="block text-mono50 text-xs">{staff.nip}</span>
    </div>
  );
};
