import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Input, Space, Tag, notification } from "antd";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useAccessControl } from "contexts/access-control";

import { RESUME_SKILL_ADD, RESUME_SKILL_DELETE } from "lib/features";

import MdChevronDown from "assets/vectors/md-chevron-down.svg";
import MdChevronUp from "assets/vectors/md-chevron-up.svg";

import { EditCvIconSvg } from "../../../icon";

// Currently use for Training, Certifications, and Achievements section in resume
const SkillCard = ({
  resumeId,
  skillSet,
  initProps,
  formEdit,
  statusEdit,
  setFormEdit,
  setData,
}) => {
  const [showMore, setShowMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const { hasPermission } = useAccessControl();
  const isAllowedToAddSkill = hasPermission(RESUME_SKILL_ADD);
  const isAllowedToDeleteSkill = hasPermission(RESUME_SKILL_DELETE);

  const SkillTag = ({ data }) => (
    <Tag
      closable
      onClose={(e) => {
        if (isAllowedToDeleteSkill) {
          e.stopPropagation();
          handleDeleteSkill(data.id, data.name);
        }
      }}
      color="#35763B1A"
      closeIcon={<CloseCircleOutlined className={"cursor-pointer"} rev={""} />}
      className="text-primary100 flex gap-1 items-center"
    >
      <div>{data.name}</div>
    </Tag>
  );

  const handleDeleteSkill = (id, name) => {
    const payload = {
      id: Number(id),
    };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteResumeSkill`, {
      method: "DELETE",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          const updatedData = skillSet.filter((item) => item.id !== id);
          setData(updatedData);
          notification.success({
            message: `Berhasil menghapus skill ${name}.`,
            duration: 3,
          });
        } else {
          notification.error({
            message: `Gagal menghapus skill ${name}.. ${response2.message}`,
            duration: 3,
          });
        }
        // setLoadingDelete(false);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus ${sectionName}. ${err.response}`,
          duration: 3,
        });
        // setLoadingDelete(false);
      });
  };

  const handleSave = () => {
    // Simpan data, misalnya kirim ke API atau update state
    if (value) {
      let dataSend = {
        resume_id: resumeId,
        skill_name: value,
      };
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addResumeSkill`, {
        method: `POST`,
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSend),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.success) {
            let dataNew = {
              id: response.data.id,
              name: value,
              resume_id: resumeId,
              display_order: 1,
            };
            setData((prev) => [...prev, dataNew]);
            setValue("");
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
            message: `Gagal tambah skill. ${err.response}`,
            duration: 3,
          });
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <div
      className={
        "border border-b-0 border-[#E6E6E6] bg-white w-full py-4 px-5 "
      }
    >
      <div className={"flex justify-between"}>
        <div
          onClick={() => setShowMore(!showMore)}
          className={"flex gap-1.5 items-center hover:cursor-pointer"}
        >
          <p className={"text-[#4D4D4D] text-[16px] leading-6 font-bold"}>
            Skill (5/8)
          </p>
          {showMore ? (
            <MdChevronDown className="w-[14px] h-[14px]" />
          ) : (
            <MdChevronUp className="w-[14px] h-[14px]" />
          )}
        </div>
        {statusEdit == false && (
          <div
            className={"hover:cursor-pointer"}
            onClick={() =>
              setFormEdit({
                ...formEdit,
                skill: true,
              })
            }
          >
            <EditCvIconSvg />
          </div>
        )}
      </div>
      {showMore &&
        (statusEdit ? (
          <div className={"mt-4"}>
            <div className="flex flex-wrap gap-y-2">
              {skillSet?.map((skill, index) => (
                <SkillTag data={skill} />
              ))}
            </div>
            {isAllowedToAddSkill && (
              <div>
                <Input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onPressEnter={handleSave}
                  className={"w-full mt-5"}
                />
                {statusEdit && (
                  <div className={"flex justify-end mt-4"}>
                    <Space>
                      <Button
                        onClick={() =>
                          setFormEdit({
                            ...formEdit,
                            skill: false,
                          })
                        }
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => handleSave()}
                        loading={loading}
                        htmlType="submit"
                        type="primary"
                      >
                        Save
                      </Button>
                    </Space>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className={"flex flex-wrap gap-1 mt-4"}>
            {skillSet?.map((skill, index) => (
              <div
                className={
                  "rounded-[5px] flex items-center px-2 py-1   bg-[#35763B1A]"
                }
              >
                <p
                  className={
                    "text-primary100 text-[10px] leading-6 font-normal"
                  }
                >
                  {skill.name}
                </p>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default SkillCard;
