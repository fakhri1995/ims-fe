import { UserAddOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { Input, Select, Tag, notification } from "antd";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";

import ButtonSys from "components/button";
import { SearchIconSvg, TableImportIconSvg } from "components/icon";
import { TableCustomTalentPoolList } from "components/table/tableCustom";

import { createKeyPressHandler } from "lib/helper";

import { TalentPoolPublicService } from "../../../apis/talent-pool";
import {
  TALENT_POOL_SHARE_PUBLICS_GET,
  TALENT_POOL_SHARE_PUBLIC_CUTS_GET,
  TALENT_POOL_SHARE_PUBLIC_FILTERS_GET,
} from "../../../lib/features";
import { AlertCircleIconSvg } from "../../icon";
import { ModalHapus2 } from "../../modal/modalCustom";
import ModalTalentDetail from "../../modal/talent-pool/modalTalentDetail";
import TalentDetailCard from "./TalentDetailCard";

const TalentPoolSectionPublic = ({
  shareId,
  category,
  setModalEliminatedTalent,
}) => {
  const [queryParams, setQueryParams] = useQueryParams({
    share_id: withDefault(NumberParam, shareId),
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    roles: withDefault(StringParam, undefined),
    skills: withDefault(StringParam, undefined),
    years: withDefault(StringParam, undefined),
    educations: withDefault(StringParam, undefined),
    status: withDefault(StringParam, undefined),
  });

  const rt = useRouter();
  const queryClient = useQueryClient();

  // 2. Use state

  // 2.1. Table Contract
  // filter search & selected options
  const [searchingFilterTalents, setSearchingFilterTalents] = useState("");
  const [selectedRole, setSelectedRole] = useState(undefined);
  const [selectedSkill, setSelectedSkill] = useState(undefined);
  const [selectedExpYear, setSelectedExpYear] = useState(undefined);
  const [selectedEdu, setSelectedEdu] = useState(undefined);
  const [selectedStatus, setSelectedStatus] = useState(undefined);

  const [modalTalentAdd, setModalTalentAdd] = useState(false);
  const [modalTalentEliminate, setModalTalentEliminate] = useState(false);
  const [modalShare, setModalShare] = useState(false);
  const [drawerTalentDetail, setDrawerTalentDetail] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [dataRowClicked, setDataRowClicked] = useState({});
  const [rowState, setRowState] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  const [isLargeScreen, setIsLargeScreen] = useState(true);

  const [modalTalentDetail, setModalTalentDetail] = useState(false);

  // 3. Use Effect & Use Query
  // 3.1. Get Public Talent Pools
  const {
    data: dataTalents,
    isLoading: loadingTalents,
    refetch: refetchTalents,
  } = useQuery(
    [TALENT_POOL_SHARE_PUBLICS_GET, searchingFilterTalents, queryParams],

    () =>
      TalentPoolPublicService.getTalentPools(
        queryParams,
        searchingFilterTalents
      ),
    {
      enabled: !!queryParams?.share_id,
      select: (response) => response.data,
    }
  );
  // 3.2. Get Talent Pool Filters
  const {
    data: dataFilters,
    isLoading: loadingFilters,
    refetch: refetchFilters,
  } = useQuery(
    [TALENT_POOL_SHARE_PUBLIC_FILTERS_GET, queryParams?.share_id],
    () => TalentPoolPublicService.getFilters(queryParams?.share_id),
    {
      enabled: !!queryParams?.share_id,
      select: (response) => response.data,
    }
  );

  // 3.3. Set layout based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 820) {
        setIsLargeScreen(false); // up to medium screen
      } else {
        setIsLargeScreen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // cleanup
  useEffect(() => {
    return () => {
      setDataRowClicked({});
    };
  }, []);

  // 4. Event
  // 4.1. Filter Table
  const onFilterTalentPools = () => {
    setQueryParams({
      roles: selectedRole,
      skills: selectedSkill,
      years: selectedExpYear,
      educations: selectedEdu,
      status: selectedStatus,
    });
  };

  const { onKeyPressHandler } = createKeyPressHandler(
    onFilterTalentPools,
    "Enter"
  );

  const handleMarkTalent = async (talentId) => {
    await TalentPoolPublicService.mark(talentId)
      .then((res) => {
        if (res.success) {
          refetchTalents();
          notification.success({
            message: res.message,
            duration: 3,
          });
        } else {
          notification.error({
            message: res.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
      });
  };

  const handleEliminate = () => {
    setLoadingDelete(true);
    TalentPoolPublicService.eliminate(queryParams?.share_id, dataRowClicked?.id)
      .then((res) => {
        if (res.success) {
          setModalTalentEliminate(false);
          notification.success({
            message: (
              <div>
                Talent berhasil dieliminasi.{" "}
                <button
                  onClick={() => setModalEliminatedTalent(true)}
                  className="mig-caption--bold text-primary100 bg-transparent"
                >
                  Lihat Tabel Eliminasi
                </button>
              </div>
            ),
            duration: 3,
          });
          refetchTalents();
          queryClient.invalidateQueries(TALENT_POOL_SHARE_PUBLIC_CUTS_GET);
        } else {
          notification.error({
            message: res.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
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
      render: (text, record) => {
        return {
          children: (
            <div className="xl:w-40">
              {text || "-"}
              {isHovered && rowState === record.id && (
                <div className={`absolute left-20 w-[35vw] h-full z-50 top-3`}>
                  <TalentDetailCard
                    data={record}
                    isAllowedToGetResume={true}
                    isPublic={true}
                  />
                </div>
              )}
            </div>
          ),
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
            <div className="flex flex-col md:flex-row gap-2 items-center">
              <ButtonSys
                type={record.mark == 1 ? "primary" : "default"}
                color={"secondary100"}
                // disabled={!isAllowedToMarkTalent}
                onClick={(event) => {
                  event.stopPropagation();
                  setDataRowClicked(record);
                  handleMarkTalent(record?.id);
                }}
              >
                <UserAddOutlined rev={""} />
              </ButtonSys>
              <ButtonSys
                type={"default"}
                color={"danger"}
                // disabled={!isAllowedToEliminateTalent}
                onClick={(event) => {
                  event.stopPropagation();
                  setDataRowClicked(record);
                  setModalTalentEliminate(true);
                }}
              >
                <UserDeleteOutlined rev={""} />
              </ButtonSys>
            </div>
          ),
        };
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6">
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
            // disabled={!isAllowedToGetTalentPoolSharePublics}
          />
        </div>
        {/* Filter by position (dropdown) */}
        <div className="w-full lg:w-2/12">
          <Select
            defaultValue={queryParams.roles}
            allowClear
            name={`role`}
            // disabled={!isAllowedToGetTalentPoolSharePublicFilters}
            placeholder="Posisi"
            style={{ width: `100%` }}
            onChange={(value) => {
              setQueryParams({ roles: value });
              setSelectedRole(value);
            }}
          >
            {dataFilters?.role?.map((item) => (
              <Select.Option key={item.id} value={item.name}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        {/* Filter by skill */}
        <div className="w-full lg:w-2/12">
          <Select
            defaultValue={queryParams.skills}
            allowClear
            name={`skill`}
            // disabled={!isAllowedToGetTalentPoolSharePublicFilters}
            placeholder="Skill"
            style={{ width: `100%` }}
            onChange={(value) => {
              setQueryParams({ skills: value });
              setSelectedSkill(value);
            }}
          >
            {dataFilters?.skill?.map((item) => (
              <Select.Option key={item.id} value={item.name}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        {/* Filter by years of experience */}
        <div className="w-full lg:w-1/12">
          <Select
            defaultValue={queryParams.years}
            allowClear
            name={`year`}
            // disabled={!isAllowedToGetTalentPoolSharePublicFilters}
            placeholder="Tahun Pengalaman"
            style={{ width: `100%` }}
            onChange={(value) => {
              setQueryParams({ years: value });
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
            defaultValue={queryParams.educations}
            allowClear
            name={`university`}
            // disabled={!isAllowedToGetTalentPoolSharePublicFilters}
            placeholder="Universitas"
            style={{ width: `100%` }}
            onChange={(value) => {
              setQueryParams({ educations: value });
              setSelectedEdu(value);
            }}
          >
            {dataFilters?.university?.map((item) => (
              <Select.Option key={item.id} value={item.university}>
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
            disabled={true}
            placeholder="Status"
            style={{ width: `100%` }}
            onChange={(value) => {
              setQueryParams({ status: value });
              setSelectedStatus(value);
            }}
          >
            {dataFilters?.status?.map((item) => (
              <Select.Option key={item.id} value={item.status}>
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
            // disabled={!isAllowedToGetTalentPoolSharePublics}
            fullWidth
          >
            <div className="flex flex-row space-x-2.5 items-center whitespace-nowrap">
              <SearchIconSvg size={14} color={`#ffffff`} />
              <p className="text-xs">Cari Talent</p>
            </div>
          </ButtonSys>
        </div>
      </div>
      <TableCustomTalentPoolList
        dataSource={dataTalents?.data}
        columns={columnTalents}
        loading={loadingTalents}
        total={dataTalents?.total}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        isAllowedToGetTalentPool={true}
        setDrawerShown={setModalTalentDetail}
        setDataRowClicked={setDataRowClicked}
        rowstate={rowState}
        setrowstate={setRowState}
        setIsHovered={setIsHovered}
        isLargeScreen={isLargeScreen}
      />

      {/* Modal Talent Detail */}
      <ModalTalentDetail
        visible={modalTalentDetail}
        onvisible={setModalTalentDetail}
        dataTalent={dataRowClicked}
        setModalTalentEliminate={setModalTalentEliminate}
        handleMarkTalent={handleMarkTalent}
        // onDelete={() => {
        //   setModalTalentEliminate(true);
        //   setDrawerTalentDetail(false);
        // }}
      />

      <ModalHapus2
        title={
          <div className="flex gap-2 items-center">
            <AlertCircleIconSvg size={32} color="#BF4A40" />
            <h3 className="mig-heading--3 text-warning">
              Konfirmasi Eliminasi Talent
            </h3>
          </div>
        }
        visible={modalTalentEliminate}
        onvisible={setModalTalentEliminate}
        onOk={handleEliminate}
        onCancel={() => {
          setModalTalentEliminate(false);
        }}
        okButtonText={"Eliminasi"}
        loading={loadingDelete}
      >
        <p className="mb-4">
          Apakah Anda yakin ingin mengeliminasi talent dengan nama{" "}
          <strong>{dataRowClicked?.resume?.name}</strong> dan role{" "}
          <strong>{dataRowClicked?.resume?.last_assessment?.name}</strong>?
        </p>
      </ModalHapus2>
    </div>
  );
};

export default TalentPoolSectionPublic;
