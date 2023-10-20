import {
  DeleteOutlined,
  ProfileOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Input, Select, Tag, notification } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import ButtonSys from "components/button";
import { AccessControl } from "components/features/AccessControl";
import {
  NewsIconSvg,
  SearchIconSvg,
  TableImportIconSvg,
} from "components/icon";
import { TableCustomTalentPoolList } from "components/table/tableCustom";

import { permissionWarningNotification } from "lib/helper";
import { createKeyPressHandler } from "lib/helper";

import {
  TALENT_POOL_ADD,
  TALENT_POOL_DELETE,
  TALENT_POOL_GET,
} from "../../../lib/features";
import DrawerTalentDetail from "../../drawer/recruitment/drawerTalentDetail";
import { ModalHapus2 } from "../../modal/modalCustom";
import ModalTalentAdd from "../../modal/talent-pool/modalTalentAdd";

const TalentPoolSection = ({
  initProps,
  isAllowedToGetTalentPools,
  isAllowedToGetTalentPoolFilters,
  isAllowedToAddTalentPool,
  isAllowedToDeleteTalentPool,
  isAllowedToGetTalentPool,
  queryParams,
  setQueryParams,
  category,
  dataTalents,
  loadingTalents,
  searchingFilterTalents,
  setSearchingFilterTalents,
  dataFilters,
  setRefresh,
}) => {
  const rt = useRouter();

  // 2. Use state
  const [modalTalentAdd, setModalTalentAdd] = useState(false);
  const [modalTalentDelete, setModalTalentDelete] = useState(false);
  const [drawerTalentDetail, setDrawerTalentDetail] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [dataRowClicked, setDataRowClicked] = useState({});

  // 2.1. Table Contract
  // filter search & selected options
  // const [searchingFilterTalents, setSearchingFilterTalents] = useState("");
  const [selectedRole, setSelectedRole] = useState(undefined);
  const [selectedSkill, setSelectedSkill] = useState(undefined);
  const [selectedExpYear, setSelectedExpYear] = useState(undefined);
  const [selectedUni, setSelectedUni] = useState(undefined);
  const [selectedStatus, setSelectedStatus] = useState(undefined);

  // 3. Use Effect
  useEffect(() => {
    return () => {
      setDataRowClicked({});
    };
  }, []);

  // 4. Event
  // 4.1. Filter Table
  const onFilterTalentPools = () => {
    setQueryParams({
      role: selectedRole,
      skill: selectedSkill,
      year: selectedExpYear,
      university: selectedUni,
      status: selectedStatus,
    });
  };

  const { onKeyPressHandler } = createKeyPressHandler(
    onFilterTalentPools,
    "Enter"
  );

  // 4.2. Delete Talent
  const handleDelete = () => {
    if (!isAllowedToDeleteTalentPool) {
      permissionWarningNotification("Menghapus", "Talent");
      return;
    }

    setLoadingDelete(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteTalentPool?id=${dataRowClicked?.id}`,
      {
        method: `DELETE`,
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setRefresh((prev) => prev + 1);
          setModalTalentDelete(false);

          notification.success({
            message: response.message,
            duration: 3,
          });
        } else {
          notification.error({
            message: response.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus talent. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoadingDelete(false));
  };

  // Talent Pool Table columns
  const columnTalents = [
    {
      title: "No",
      key: "number",
      dataIndex: "number",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex justify-center">
              {dataTalents?.from + index}
            </div>
          ),
        };
      },
    },
    {
      title: "Nama",
      key: "name",
      dataIndex: ["resume", "name"],
      render: (text) => {
        return {
          children: <div className="xl:w-40">{text || "-"}</div>,
        };
      },
    },
    {
      title: "Posisi",
      key: "last_assessment",
      dataIndex: ["resume", "last_assessment", "name"],
      render: (text, record, index) => {
        return {
          children: <>{text || "-"}</>,
        };
      },
    },
    {
      title: "Universitas",
      key: "last_education",
      dataIndex: ["resume", "last_education", "university"],
      render: (text) => {
        return {
          children: <div>{text || "-"}</div>,
        };
      },
    },
    {
      title: "Skill",
      key: "skills",
      dataIndex: ["resume", "skills"],
      render: (skills) => {
        return {
          children: (
            <>
              {skills?.length > 3 ? (
                <div className="flex flex-wrap gap-2">
                  {skills?.slice(0, 3)?.map((skill) => (
                    <Tag
                      key={skill.id}
                      color="#35763B1A"
                      className="text-primary100 rounded-md"
                    >
                      {skill.name}
                    </Tag>
                  ))}
                  ..
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {skills?.map((skill) => (
                    <Tag
                      key={skill.id}
                      color="#35763B1A"
                      className="text-primary100 rounded-md"
                    >
                      {skill.name}
                    </Tag>
                  ))}
                </div>
              )}
            </>
          ),
        };
      },
    },

    {
      title: "Aksi",
      key: "action_button",
      dataIndex: "action_button",
      render: (text, record, index) => {
        return {
          children: (
            <>
              <div className="flex flex-col md:flex-row gap-2 items-center">
                <ButtonSys
                  type={"default"}
                  color={"mono50"}
                  disabled={!isAllowedToGetTalentPool}
                  onClick={(event) => {
                    event.stopPropagation();
                    setDataRowClicked(record);
                    setDrawerTalentDetail(true);
                  }}
                >
                  <ProfileOutlined rev={""} />
                </ButtonSys>
                <ButtonSys
                  type={"default"}
                  color={"danger"}
                  disabled={!isAllowedToDeleteTalentPool}
                  onClick={(event) => {
                    event.stopPropagation();
                    setDataRowClicked(record);
                    setModalTalentDelete(true);
                  }}
                >
                  <DeleteOutlined rev={""} />
                </ButtonSys>
              </div>
            </>
          ),
        };
      },
    },
  ];

  // console.log({ dataRowClicked });
  return (
    <div className="flex flex-col gap-6">
      {/* Start: Search criteria */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row gap-2">
        {/* Search by keyword (kata kunci) */}
        <div className="w-full lg:w-2/12">
          <Input
            defaultValue={searchingFilterTalents}
            style={{ width: `100%` }}
            placeholder="Cari Talent.."
            allowClear
            onChange={(e) => {
              setTimeout(() => setSearchingFilterTalents(e.target.value), 500);
            }}
            onKeyPress={onKeyPressHandler}
            disabled={!isAllowedToGetTalentPools}
          />
        </div>
        {/* Filter by position (dropdown) */}
        <div className="w-full lg:w-2/12">
          <Select
            defaultValue={queryParams.role}
            allowClear
            name={`role`}
            disabled={!isAllowedToGetTalentPoolFilters}
            placeholder="Posisi"
            style={{ width: `100%` }}
            onChange={(value) => {
              setQueryParams({ role: value });
              setSelectedRole(value);
            }}
          >
            {dataFilters?.role?.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        {/* Filter by skill */}
        <div className="w-full lg:w-2/12">
          <Select
            defaultValue={queryParams.skill}
            allowClear
            name={`skill`}
            disabled={!isAllowedToGetTalentPoolFilters}
            placeholder="Skill"
            style={{ width: `100%` }}
            onChange={(value) => {
              setQueryParams({ skill: value });
              setSelectedSkill(value);
            }}
          >
            {dataFilters?.skill?.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        {/* Filter by years of experience */}
        <div className="w-full lg:w-1/12">
          <Select
            defaultValue={queryParams.year}
            allowClear
            name={`year`}
            disabled={!isAllowedToGetTalentPoolFilters}
            placeholder="Tahun Pengalaman"
            style={{ width: `100%` }}
            onChange={(value) => {
              setQueryParams({ year: value });
              setSelectedExpYear(value);
            }}
          >
            {dataFilters?.year?.map((item) => (
              <Select.Option key={item.year} value={item.year}>
                {item.year}
              </Select.Option>
            ))}
          </Select>
        </div>
        {/* Filter by university */}
        <div className="w-full lg:w-2/12">
          <Select
            defaultValue={queryParams.university}
            allowClear
            name={`university`}
            disabled={!isAllowedToGetTalentPoolFilters}
            placeholder="Universitas"
            style={{ width: `100%` }}
            onChange={(value) => {
              setQueryParams({ university: value });
              setSelectedUni(value);
            }}
          >
            {dataFilters?.university?.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.university}
              </Select.Option>
            ))}
          </Select>
        </div>
        {/* Filter by status (dropdown) */}
        <div className="w-full lg:w-1/12">
          <Select
            defaultValue={queryParams.status}
            allowClear
            name={`status`}
            disabled={!isAllowedToGetTalentPoolFilters}
            placeholder="Status"
            style={{ width: `100%` }}
            onChange={(value) => {
              setQueryParams({ status: value });
              setSelectedStatus(value);
            }}
          >
            {dataFilters?.status?.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.status}
              </Select.Option>
            ))}
          </Select>
        </div>
        {/* End: Search criteria */}
        <div className="w-full col-span-2 md:col-span-3 lg:w-2/12">
          <ButtonSys
            type={`primary`}
            onClick={onFilterTalentPools}
            disabled={!isAllowedToGetTalentPools}
            fullWidth
          >
            <div className="flex flex-row space-x-2.5 items-center whitespace-nowrap">
              <SearchIconSvg size={14} color={`#ffffff`} />
              <p className="text-xs">Cari Talent</p>
            </div>
          </ButtonSys>
        </div>
      </div>

      <div>
        <TableCustomTalentPoolList
          rt={rt}
          dataSource={dataTalents?.data}
          columns={columnTalents}
          loading={loadingTalents}
          total={dataTalents?.total}
          queryParams={queryParams}
          setQueryParams={setQueryParams}
        />
      </div>

      <div className="flex gap-6 justify-center items-center">
        <ButtonSys
          type={"primary"}
          disabled={!isAllowedToAddTalentPool}
          onClick={() => setModalTalentAdd(true)}
        >
          <div className="flex gap-2 items-center">
            <TableImportIconSvg color={"#FFFFFF"} size={16} />
            <p className="mig-caption">Tambahkan Talent</p>
          </div>
        </ButtonSys>
        <ButtonSys type={"default"}>
          <div className="flex gap-2 items-center">
            <ShareAltOutlined />
            <p className="mig-caption">Bagikan Daftar Talent</p>
          </div>
        </ButtonSys>
      </div>

      {/* Drawer Talent Detail */}
      <AccessControl hasPermission={TALENT_POOL_GET}>
        <DrawerTalentDetail
          initProps={initProps}
          visible={drawerTalentDetail}
          onvisible={setDrawerTalentDetail}
          isAllowedToGetTalentPool={isAllowedToGetTalentPool}
          talentId={dataRowClicked?.id}
        />
      </AccessControl>

      <AccessControl hasPermission={TALENT_POOL_ADD}>
        <ModalTalentAdd
          initProps={initProps}
          visible={modalTalentAdd}
          onvisible={setModalTalentAdd}
          category={category}
          setRefreshTalentPool={setRefresh}
        />
      </AccessControl>

      <AccessControl hasPermission={TALENT_POOL_DELETE}>
        <ModalHapus2
          title={`Peringatan`}
          visible={modalTalentDelete}
          onvisible={setModalTalentDelete}
          onOk={handleDelete}
          onCancel={() => {
            setModalTalentDelete(false);
          }}
          itemName={"talent"}
          loading={loadingDelete}
        >
          <p className="mb-4">
            Apakah Anda yakin ingin melanjutkan penghapusan talent dengan nama{" "}
            <strong>{dataRowClicked?.resume?.name}</strong>?
          </p>
        </ModalHapus2>
      </AccessControl>
    </div>
  );
};

export default TalentPoolSection;
