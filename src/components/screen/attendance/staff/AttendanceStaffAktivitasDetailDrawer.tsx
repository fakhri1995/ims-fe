import { FC } from "react";
import { useQuery } from "react-query";

import ButtonSys from "components/button";
import ButtonCopyText from "components/buttonCopyText";
import DrawerCore from "components/drawer/drawerCore";
import { LeftIconSvg, RightIconSvg } from "components/icon";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  generateStaticAssetUrl,
  getFileName,
  momentFormatDate,
} from "lib/helper";

import { FormAktivitasTypes } from "apis/attendance";
import { AuthService, AuthServiceQueryKeys } from "apis/auth";
import { Detail } from "apis/auth";

/**
 * Component AttendanceStaffAktivitasDetailDrawer's props.
 */
export interface IAttendanceStaffAktivitasDetailDrawer {
  activityData: any;
  visible: boolean;
  onClose: () => void;
  onClickPrevNext: (type: "next" | "prev") => void;
}

/**
 * Component AttendanceStaffAktivitasDetailDrawer
 */
export const AttendanceStaffAktivitasDetailDrawer: FC<
  IAttendanceStaffAktivitasDetailDrawer
> = ({ visible, onClose, activityData, onClickPrevNext }) => {
  const axiosClient = useAxiosClient();

  const { data: userAttendanceForm, isLoading } = useQuery(
    [AuthServiceQueryKeys.DETAIL_PROFILE],
    () => AuthService.whoAmI(axiosClient),
    {
      select: (response) => response.data.data.attendance_forms[0],
    }
  );

  return (
    <DrawerCore title={`Activity Details`} visible={visible} onClose={onClose}>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <ButtonSys square onClick={() => onClickPrevNext("prev")}>
            <LeftIconSvg size={16} />
          </ButtonSys>
          <p className="mig-body--bold">
            {momentFormatDate(
              activityData?.updated_at,
              "-",
              "DD MMMM YYYY, HH:mm"
            )}
          </p>
          <ButtonSys square onClick={() => onClickPrevNext("next")}>
            <RightIconSvg size={16} />
          </ButtonSys>
        </div>

        {!!userAttendanceForm && (
          <>
            <div className="space-y-4">
              {userAttendanceForm.details.map((field) => {
                return (
                  <div key={field?.key}>
                    <h1 className="mig-caption--medium">{field?.name}</h1>

                    {_renderDynamicInput(field, activityData)}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </DrawerCore>
  );
};

/**
 * Generates a child for the drawer's detail respective to its type argument.
 *
 * @private
 */
const _renderDynamicInput = (detail: Detail, data) => {
  switch (detail?.type) {
    case FormAktivitasTypes.TEKS:
    case FormAktivitasTypes.PARAGRAPH:
    case FormAktivitasTypes.NUMERAL:
    case FormAktivitasTypes.DROPDOWN:
      return (
        <div>
          <p>{data?.[detail?.key]}</p>
          <ButtonCopyText text={data?.[detail?.key]} />
        </div>
      );

    case FormAktivitasTypes.CHECKLIST:
      return (
        <div>
          <ul>
            {data?.[detail?.key]?.map((value, idx) => (
              <li value={idx} key={idx}>
                {value}
              </li>
            ))}
          </ul>
        </div>
      );

    case FormAktivitasTypes.UNGGAH:
      const text = data?.[detail?.key];
      const fileName = getFileName(text);

      return (
        <a
          title={fileName}
          onClick={(e) => e.stopPropagation()}
          href={generateStaticAssetUrl(text)}
          target="_blank"
          rel="external"
        >
          <p className="truncate">{fileName}</p>
        </a>
      );
  }
};
