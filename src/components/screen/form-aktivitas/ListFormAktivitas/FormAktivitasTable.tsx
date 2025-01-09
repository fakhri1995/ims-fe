import { Modal, Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { useRouter } from "next/router";
import { FC, memo, useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";

import {
  CirclePlusIconSvg,
  EditIconSvg,
  EditSquareIconSvg,
  TrashIconSvg,
} from "components/icon";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { formatDateToLocale } from "lib/date-utils";
import {
  ATTENDANCE_FORMS_GET,
  ATTENDANCE_FORM_DELETE,
  ATTENDANCE_FORM_UPDATE,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";
import { getAntdTablePaginationConfig } from "lib/standard-config";

import {
  AttendanceFormAktivitasService,
  AttendanceFormAktivitasServiceQueryKeys,
  GetAttendanceFormsDatum,
  IGetAttendanceFormsParams,
  useDeleteFormAktivitas,
} from "apis/attendance";

import { FormAddDetailsActivityDrawer } from "../shared/FormAddDetailsActivityDrawer";
import { FormAktivitasDrawer } from "../shared/FormAktivitasDrawer";

export interface IFormAktivitasTable {
  page: number;
  rows: number;
  sort_by: string;
  sort_type: string;
  keyword: string;

  onTriggerChangeCriteria: (
    newCriteria: Partial<IGetAttendanceFormsParams>
  ) => void;
}

export const FormAktivitasTable: FC<IFormAktivitasTable> = memo(
  ({
    onTriggerChangeCriteria,
    page = 1,
    rows = 10,
    sort_by = "",
    sort_type = "",
    keyword = "",
  }) => {
    const router = useRouter();

    const axiosClient = useAxiosClient();
    const { hasPermission } = useAccessControl();
    const isAllowedToUpdateFormDetail = hasPermission(ATTENDANCE_FORM_UPDATE);
    const isAllowedToDeleteFormDetail = hasPermission(ATTENDANCE_FORM_DELETE);

    const canOpenUpdateDrawer =
      isAllowedToUpdateFormDetail || isAllowedToDeleteFormDetail;

    const [isDrawerShown, setIsDrawerShown] = useState(false);
    const [aktivtasId, setAktivitasId] = useState(null);

    const tableQueryCriteria = useMemo(
      () => ({
        page,
        rows,
        sort_by,
        sort_type,
        keyword,
      }),
      [page, rows, sort_by, sort_type, keyword]
    );
    const { mutateAsync: deleteFormAktivitas } = useDeleteFormAktivitas(
      "/attendance/form-aktivitas"
    );
    const [isCreateDrawerShown, setCreateDrawerShown] = useState(false);
    const [dataActivityForm, setDataActivityForm] = useState({
      id: null,
      title: null,
    });
    const { data, isLoading } = useQuery(
      [AttendanceFormAktivitasServiceQueryKeys.FIND, tableQueryCriteria],
      () =>
        AttendanceFormAktivitasService.find(axiosClient, tableQueryCriteria),
      {
        enabled: hasPermission(ATTENDANCE_FORMS_GET),
        select: (response) => {
          const mappedData = response.data.data.data.map((datum) => {
            return {
              ...datum,
              key: datum.id,
              updated_at: formatDateToLocale(
                new Date(datum.updated_at),
                "dd MMM yyyy, hh:mm",
                datum.updated_at as string
              ),
            } as GetAttendanceFormsDatum;
          });

          response.data.data.data = mappedData;

          return response;
        },
      }
    );

    const onRowClicked = (record: GetAttendanceFormsDatum) => {
      if (router.isReady) {
        router.push(`/attendance/form-aktivitas/${record.id}`);
      }
    };

    const tableColumns = useMemo<ColumnsType<GetAttendanceFormsDatum>>(() => {
      return [
        {
          key: "id",
          title: "No.",
          dataIndex: "id",
          render: (_, __, index) => `${data?.data.data.from + index}.`,
          width: 64,
        },
        {
          title: "Activity Form",
          dataIndex: "name",
          sorter: true,
        },
        {
          title: "Date Modified",
          dataIndex: "updated_at",
          sorter: true,
        },
        {
          title: "Total Staff",
          dataIndex: "users_count",
          sorter: true,
          width: 120,
          align: "center",
        },
        {
          key: "id",
          title: "Description",
          dataIndex: "description",
          ellipsis: { showTitle: true },
        },
        {
          title: "Actions",
          dataIndex: "action",
          align: "center",
          render: (status, record, index) => {
            return {
              children: (
                <div className="flex items-center gap-2 justify-center">
                  <button
                    className="bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddButtonClicked(record);
                    }}
                    disabled={!isAllowedToDeleteFormDetail}
                  >
                    <CirclePlusIconSvg color={"#BF4A40"} size={20} />
                  </button>
                  <button
                    className="bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteButtonClicked(record);
                    }}
                    disabled={!isAllowedToDeleteFormDetail}
                  >
                    <TrashIconSvg color={"#BF4A40"} size={20} />
                  </button>
                  <button
                    className="bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditButtonClicked(record);
                    }}
                    disabled={!canOpenUpdateDrawer}
                  >
                    <EditSquareIconSvg color={"#808080"} size={20} />
                  </button>
                </div>
              ),
            };
          },
        },
      ];
    }, [data]);

    const tablePaginationConf = useMemo(() => {
      return getAntdTablePaginationConfig({
        pageSize: rows,
        total: data?.data.data.total || 0,
        current: page || 1,
      });
    }, [rows, data, page]);

    const onEditButtonClicked = useCallback((record) => {
      setAktivitasId(record.id);
      setIsDrawerShown(true);
    }, []);

    const onDeleteButtonClicked = (record) => {
      if (!isAllowedToDeleteFormDetail) {
        permissionWarningNotification("Menghapus", "Form Aktivitas");
        return;
      }

      if (!record.id) {
        return;
      }

      Modal.confirm({
        title: "Confirm Delete Activity Form!",
        content: (
          <p>
            Are you sure to delete Activity Form <strong>{record.name}</strong>{" "}
            with ID <strong>{record.id}</strong>?
          </p>
        ),
        onOk: () => {
          setIsDrawerShown(false);
          return deleteFormAktivitas(record.id);
        },
        centered: true,
      });
    };

    const onAddButtonClicked = (record) => {
      if (!isAllowedToDeleteFormDetail) {
        permissionWarningNotification("Menghapus", "Form Aktivitas");
        return;
      }

      if (!record.id) {
        return;
      }
      setCreateDrawerShown(true);
      setDataActivityForm({
        ...dataActivityForm,
        id: record.id,
        title: record.name,
      });
    };

    return (
      <>
        <Table<GetAttendanceFormsDatum>
          loading={isLoading}
          columns={tableColumns}
          dataSource={data?.data.data.data || []}
          scroll={{ x: 640 }}
          className="tableTypeTask"
          onChange={(pagination, _, sorter) => {
            let criteria: IGetAttendanceFormsParams = {
              page: pagination.current,
              rows: pagination.pageSize,
            };

            if ("field" in sorter) {
              criteria.sort_by =
                sorter.order === undefined
                  ? ""
                  : sorter.field === "users_count"
                  ? "count"
                  : sorter.field?.toString();
              criteria.sort_type =
                sorter.order === undefined
                  ? ""
                  : sorter.order === "ascend"
                  ? "asc"
                  : "desc";
            }

            onTriggerChangeCriteria(criteria);
          }}
          pagination={tablePaginationConf}
          onRow={(datum) => {
            return {
              onClick: () => onRowClicked(datum),
              className: "hover:cursor-pointer",
            };
          }}
        />
        {canOpenUpdateDrawer && (
          <FormAktivitasDrawer
            title="Update Activity Form"
            buttonOkText="Save Form"
            onvisible={setIsDrawerShown}
            visible={isDrawerShown}
            formAktivitasId={aktivtasId}
          />
        )}
        {canOpenUpdateDrawer && (
          <FormAddDetailsActivityDrawer
            title={"Add Details Form " + dataActivityForm.title}
            buttonOkText="Save Form"
            onvisible={setCreateDrawerShown}
            visible={isCreateDrawerShown}
            formAktivitasId={dataActivityForm?.id}
          />
        )}
      </>
    );
  }
);
FormAktivitasTable.displayName = "FormAktivitasTable";
