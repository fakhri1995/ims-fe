import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Table } from "antd";

import ButtonSys from "../../button";
import TaskCard from "../../cards/project/TaskCard";
import { PlusIconSvg } from "../../icon";

const MyTaskProject = ({
  dataMyTaskList,
  loadingMyTaskList,
  pageMyTaskList,
  rowsMyTaskList,
  dataRawMyTaskList,
  setPageMyTaskList,
  setSortOrder,
  handleSortTasks,
  dataProjectList,
  handleAddTask,
  isAllowedToAddTask,
  isAllowedToGetTasks,
  sortOrder,
  sortColumn,
  initProps,
  dataProfile,
  setCurrentTaskId,
  setModalDetailTask,
  dataStatusList,
}) => {
  return (
    <div className="col-span-2 flex flex-col shadow-md rounded-md bg-white mb-2 xl:mb-6">
      <Table
        rowKey={(record) => record.id}
        className="tableProjectTask p-2"
        dataSource={dataMyTaskList}
        loading={loadingMyTaskList}
        pagination={{
          current: pageMyTaskList,
          pageSize: rowsMyTaskList,
          total: dataRawMyTaskList?.total,
        }}
        onChange={(pagination, filters, sorter) => {
          const sortTypePayload =
            sorter.order === "ascend"
              ? "asc"
              : sorter.order === "descend"
              ? "desc"
              : "asc";

          setPageMyTaskList(pagination.current);
          setSortOrder(sortTypePayload);
        }}
        columns={[
          {
            title: () => (
              <div
                onClick={handleSortTasks}
                className="flex flex-col xl:flex-row xl:justify-between xl:items-center 
                          xl:space-x-2 space-y-2 xl:space-y-0 "
              >
                <div className="flex space-x-3 items-center">
                  <h4 className="mig-heading--4 ">Task Saya</h4>
                  <span className="flex flex-col -space-y-1">
                    <CaretUpOutlined
                      className="mr-1"
                      style={{
                        color:
                          sortColumn === "status" && sortOrder === "asc"
                            ? "#1890ff"
                            : "#00000060",
                      }}
                    />
                    <CaretDownOutlined
                      className="mr-1"
                      style={{
                        color:
                          sortColumn === "status" && sortOrder === "desc"
                            ? "#1890ff"
                            : "#00000060",
                      }}
                    />
                  </span>
                </div>
                <ButtonSys
                  type={"primary"}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddTask();
                  }}
                  disabled={!isAllowedToAddTask}
                >
                  <div className="flex items-center space-x-2">
                    <PlusIconSvg size={16} color={"#ffffff"} />
                    <p>Tambah Task Saya</p>
                  </div>
                </ButtonSys>
              </div>
            ),
            dataIndex: "name",
            key: "name",
            render: (_, task) => {
              const currentProject = dataProjectList?.find(
                (project) => project.id === task.project_id
              );
              return (
                <div key={task.id} className="flex-none rounded-md ">
                  <TaskCard
                    title={task?.name}
                    idTask={task.id}
                    taskId={task?.ticket_number}
                    projectName={currentProject?.name}
                    toDate={task?.end_date}
                    status={task?.status}
                    taskStaffs={task.task_staffs}
                    initProps={initProps}
                    dataProfile={dataProfile}
                    onClick={() => {
                      setCurrentTaskId(task.id);
                      setModalDetailTask(true);
                    }}
                  />
                </div>
              );
            },
            sorter: isAllowedToGetTasks
              ? (a, b) => {
                  const dataStatusListIds = dataStatusList?.map(
                    (status) => status.id
                  );
                  const indexA = dataStatusListIds?.indexOf(a.status_id);
                  const indexB = dataStatusListIds?.indexOf(b.status_id);
                  return indexA - indexB;
                }
              : false,
          },
        ]}
      />
    </div>
  );
};

export default MyTaskProject;
