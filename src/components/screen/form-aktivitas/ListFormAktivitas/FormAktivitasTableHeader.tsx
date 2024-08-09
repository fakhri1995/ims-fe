import { Form, Input } from "antd";
import { FC, memo } from "react";

import ButtonSys from "components/button";
import { CirclePlusIconSvg } from "components/icon";

import { useAccessControl } from "contexts/access-control";

import { ATTENDANCE_FORM_ADD } from "lib/features";

export interface IFormAktivitasTableHeader {
  onSearchTriggered: (searchValue: string) => void;
  onAddActivityFormClicked: () => void;
}

export const FormAktivitasTableHeader: FC<IFormAktivitasTableHeader> = memo(
  ({ onSearchTriggered, onAddActivityFormClicked }) => {
    const { hasPermission, isPending: isAccessControlPending } =
      useAccessControl();
    const [searchForm] = Form.useForm();

    return (
      <div>
        <div className="flex justify-between items-center border-b py-3 px-4">
          {/* Title */}
          <p className="mig-body--bold text-neutrals100">
            List of Activity Form
          </p>

          <ButtonSys
            type="primary"
            onClick={onAddActivityFormClicked}
            disabled={!hasPermission(ATTENDANCE_FORM_ADD)}
          >
            <div className="flex items-center gap-2">
              <CirclePlusIconSvg />
              <p>Add Activity Form</p>
            </div>
          </ButtonSys>
        </div>
        {/* Buttons and Input */}
        <Form
          form={searchForm}
          className="flex justify-between gap-3 py-3 px-4"
          onFinish={() => {
            onSearchTriggered(searchForm.getFieldValue("search"));
          }}
        >
          <Form.Item noStyle name="search">
            <Input
              placeholder="Search activity form..."
              allowClear
              onChange={(event) => {
                if (
                  event.target.value.length === 0 ||
                  event.target.value === ""
                ) {
                  onSearchTriggered("");
                }
                setTimeout(() => onSearchTriggered(event.target.value), 1000);
              }}
            />
          </Form.Item>
        </Form>
      </div>
    );
  }
);
FormAktivitasTableHeader.displayName = "FormAktivitasTableHeader";
