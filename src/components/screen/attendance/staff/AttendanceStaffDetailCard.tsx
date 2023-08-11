import { FC, memo, useCallback, useMemo } from "react";
import { useQuery } from "react-query";

import ButtonSys from "components/button";
import { DetailCard } from "components/cards/DetailCard";

import { useAxiosClient } from "hooks/use-axios-client";

import { generateStaticAssetUrl } from "lib/helper";

import { AuthService, AuthServiceQueryKeys } from "apis/auth";

/**
 * Component AttendanceStaffDetailCard's props.
 */
export interface IAttendanceStaffDetailCard {}

/**
 * Component AttendanceStaffDetailCard
 */
export const AttendanceStaffDetailCard: FC<IAttendanceStaffDetailCard> = memo(
  () => {
    const axiosClient = useAxiosClient();
    const { data, isLoading } = useQuery(
      [AuthServiceQueryKeys.DETAIL_PROFILE],
      () => AuthService.whoAmI(axiosClient),
      {
        select: (response) => {
          const { profile_image, name, nip, phone_number, position, email } =
            response.data.data;

          return {
            profile_image: generateStaticAssetUrl(profile_image.link),
            name,
            nip,
            phone_number,
            position,
            email,
          };
        },
      }
    );

    const content = useMemo(() => {
      if (!data) {
        return [];
      }

      return [
        { label: "Jabatan", content: data.position },
        { label: "Email", content: data.email },
        { label: "No. Telp", content: data.phone_number },
      ];
    }, [data]);

    const onUnduhIdCardButtonClicked = useCallback(() => {
      /** TODO: implement ini */
    }, []);

    return (
      <DetailCard
        content={content}
        isLoading={isLoading}
        estimatedContentLength={5}
        header={
          !isLoading && (
            <div className="flex flex-col items-center space-y-6">
              {/* Avatar */}
              <span
                className="w-32 h-32 bg-mono80 rounded-full bg-cover bg-center block"
                style={{ backgroundImage: `url(${data.profile_image})` }}
              />

              {/* Name and NIP? */}
              <div className="text-center space-y-2">
                <h3 className="mig-heading--4">{data?.name}</h3>
                <p className="mig-caption mig-caption--medium text-mono80">
                  {data?.nip}
                </p>
              </div>
            </div>
          )
        }
        // footer={
        //   !isLoading && (
        //     <div className="flex justify-center">
        //       <ButtonSys type="default" onClick={onUnduhIdCardButtonClicked}>
        //         <DownloadOutlined className="mr-2" />
        //         Unduh ID Card
        //       </ButtonSys>
        //     </div>
        //   )
        // }
      />
    );
  }
);
AttendanceStaffDetailCard.displayName = "AttendanceStaffDetailCard";
