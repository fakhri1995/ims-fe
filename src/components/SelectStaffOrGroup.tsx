import { Select, Switch, Tag, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { GetFilterUsersDatum, UserService } from "apis/user";
import { GroupService } from "apis/user/group.service";
import { GetFilterGroupsWithUsersDatum } from "apis/user/group.types ";

import {
  GROUPS_GET,
  PROJECT_GET,
  PROJECT_LOGS_GET,
  PROJECT_UPDATE,
  USERS_GET,
} from "../lib/features";
import {
  generateStaticAssetUrl,
  permissionWarningNotification,
} from "../lib/helper";
import { CirclePlusIconSvg } from "./icon";

const SelectStaffOrGroup = ({ title, initProps, selected, setSelected }) => {
  const { hasPermission } = useAccessControl();

  const isAllowedToGetFilterGroups = hasPermission(GROUPS_GET);
  const isAllowedToGetFilterUsers = hasPermission(USERS_GET);

  const searchTimeoutRef = useRef(null);
  const axiosClient = useAxiosClient();

  const queryClient = useQueryClient();

  // 1. USE STATE
  // Current state: detail, edit
  const [isSwitchGroup, setIsSwitchGroup] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [dataStaffsOrGroups, setDataStaffsOrGroups] = useState<
    GetFilterGroupsWithUsersDatum[] | GetFilterUsersDatum[]
  >([]);

  // Option data
  const {
    data: dataUsers,
    isLoading: loadingUsers,
    refetch: refetchUsers,
  } = useQuery(
    [USERS_GET, searchField],
    () => UserService.filterUsers(axiosClient, { name: searchField }),
    {
      enabled: isAllowedToGetFilterUsers,
      select: (response) => {
        return response.data.data;
      },
      onError: (error) => {
        notification.error({
          message: "Gagal mendapatkan daftar user.",
        });
      },
    }
  );

  const {
    data: dataGroups,
    isLoading: loadingGroups,
    refetch: refetchGroups,
  } = useQuery(
    [GROUPS_GET],
    () =>
      GroupService.filterGroupsWithUsers(
        isAllowedToGetFilterGroups,
        axiosClient
      ),
    {
      enabled: isAllowedToGetFilterGroups,
      select: (response) => {
        return response.data.data;
      },
      onError: (error) => {
        notification.error({
          message: "Gagal mendapatkan daftar grup.",
        });
      },
    }
  );

  useEffect(() => {
    return () => {
      setDataStaffsOrGroups([]);
      setSelected([]);
      setIsSwitchGroup(false);
    };
  }, []);

  useEffect(() => {
    setDataStaffsOrGroups(dataUsers);
  }, [dataUsers]);

  useEffect(() => {
    if (isSwitchGroup) {
      setDataStaffsOrGroups(dataGroups);
    } else {
      setDataStaffsOrGroups(dataUsers);
    }

    return () => setDataStaffsOrGroups([]);
  }, [isSwitchGroup]);

  const onSearchUsers = (searchKey) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setSearchField(searchKey);
    }, 500);
  };

  return (
    <div className="">
      <div className="flex flex-col md:flex-row">
        <div className="w-full mb-2">
          <p className="mb-2">{title}</p>
          <Select
            showSearch
            mode="multiple"
            className="dontShow"
            value={isSwitchGroup ? selectedGroups : selected}
            disabled={!isAllowedToGetFilterUsers}
            placeholder={
              isSwitchGroup ? "Cari Nama Grup..." : "Cari Nama Staff..."
            }
            style={{ width: `100%` }}
            onSearch={(value) => !isSwitchGroup && onSearchUsers(value)}
            onChange={(value, option: any) => {
              // TODO: change option types
              // use when group switch is on
              const getStaffsFromGroups = () => {
                let staffs = [...selected];
                for (let group of option) {
                  for (let user of group?.users) {
                    if (
                      !staffs?.map((staff) => staff.name)?.includes(user.name)
                    ) {
                      let userWithKey = {
                        ...user,
                        key: Number(user?.id),
                      };
                      staffs.push(userWithKey);
                    }
                  }
                }

                return staffs;
              };

              if (isSwitchGroup) {
                setSelectedGroups(option);
              }

              let newTaskStaffs = isSwitchGroup
                ? getStaffsFromGroups()
                : option;

              setSelected(newTaskStaffs);
            }}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {dataStaffsOrGroups?.map((item) => (
              <Select.Option
                key={Number(item?.id)}
                value={Number(item?.id)}
                position={item?.position}
                users={item?.users}
                name={item?.name}
                profile_image={item?.profile_image}
              >
                {item?.name}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div className="flex space-x-2 items-center absolute right-6">
          <p>Staff</p>
          <Switch
            checked={isSwitchGroup}
            onChange={(checked) => {
              setIsSwitchGroup(checked);
            }}
          />
          <p>Group</p>
        </div>
      </div>

      {/* List of selected users */}
      <div className="flex flex-wrap mb-4">
        {selected?.map((staff, idx) => {
          return (
            <Tag
              key={staff.key}
              closable
              onClose={() => {
                const newTags = selected?.filter(
                  (tag) => tag.key !== staff.key
                );
                setSelected(newTags?.map((tag) => tag));
              }}
              className="flex items-center p-2 w-max mb-2"
            >
              <div className="flex items-center space-x-2">
                <img
                  src={generateStaticAssetUrl(
                    staff?.profile_image?.link ??
                      "staging/Users/default_user.png"
                  )}
                  alt={staff?.name}
                  className="w-6 h-6 bg-cover object-cover rounded-full"
                />
                <p className="truncate">
                  <strong>{staff?.name}</strong>
                </p>
              </div>
            </Tag>
          );
        })}
      </div>
    </div>
  );
};

export default SelectStaffOrGroup;
