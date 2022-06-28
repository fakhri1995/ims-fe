import { Collapse, Drawer, Typography } from "antd";
import Link from "next/link";
import type { FC, ReactNode } from "react";
import React from "react";

import { H1, H2, Label, Text } from "components/typography";

import { useAccessControl } from "contexts/access-control";

import { formatDateToLocale } from "lib/date-utils";
import { TICKET_CLIENT_GET, TICKET_GET } from "lib/features";
import { generateStaticAssetUrl, isValidDate } from "lib/helper";

import ChecklistIcon from "assets/vectors/icon-checked.svg";
import ExternalLinkIcon from "assets/vectors/icon-external_link.svg";

import styles from "./drawerTaskReference.module.scss";
import clsx from "clsx";

interface IDrawerTaskReference {
  visible?: boolean;
  onClose?: () => void;

  reference?: ReferenceModel;
}

export const DrawerTaskReference: FC<IDrawerTaskReference> = ({
  visible = false,
  onClose = undefined,
  reference = undefined,
}) => {
  /**
   * Dependencies
   */
  const { hasPermission } = useAccessControl();
  const isAllowedToSeeTicketDetail =
    hasPermission(TICKET_GET) || hasPermission(TICKET_CLIENT_GET);

  const titleContent = `Tiket ${reference?.name}`;

  const title = isAllowedToSeeTicketDetail ? (
    <>
      <Link href={`/tickets/detail/${reference.id}`}>
        <a className="flex space-x-2 text-mono30 hover:text-mono30">
          <H1>{titleContent}</H1>
          <ExternalLinkIcon className="w-6 h-6 stroke-2" />
        </a>
      </Link>
    </>
  ) : (
    <H1>{titleContent}</H1>
  );

  return (
    <Drawer
      visible={visible}
      closable
      destroyOnClose
      onClose={onClose}
      title={title}
    >
      <div className="flex flex-col space-y-8">
        {/* Status and Deadline */}
        <div className="grid grid-cols-2">
          <DetailContent
            label="Status"
            content={
              <span className="flex items-center space-x-2">
                <ChecklistIcon />

                <H2>{reference?.status_name}</H2>
              </span>
            }
          />

          <DetailContent
            label="Deadline"
            content={<H2>{reference?.deadline}</H2>}
          />
        </div>

        <hr className="border-mono90" />

        {/* Panel: Informasi Ticket */}
        <CollapsePanel name="Informasi Tiket">
          <div className="grid grid-cols-2 gap-y-8 gap-x-2">
            <DetailContent
              label="Diajukan oleh"
              content={reference?.creator?.name}
            />

            <DetailContent
              label="Lokasi Pengaju"
              content={reference?.creator?.location}
            />

            <DetailContent
              label="Tanggal Diajukan"
              content={
                isValidDate(reference?.raised_at)
                  ? formatDateToLocale(
                      reference?.raised_at as unknown as Date,
                      "dd MMMM yyyy - HH:mm:ss"
                    )
                  : "-"
              }
            />

            <DetailContent
              label="Tanggal Selesai"
              content={
                isValidDate(reference?.closed_at)
                  ? formatDateToLocale(
                      reference?.closed_at as unknown as Date,
                      "dd MMMM yyyy - HH:mm:ss"
                    )
                  : "-"
              }
            />

            <DetailContent
              label="Durasi Penyelesaian"
              content={reference?.resolved_times}
              // content="3 jam 10 menit"
            />
          </div>
        </CollapsePanel>

        <hr className="border-mono90" />

        {/* Panel: Detail Masalah */}
        <CollapsePanel name="Detail Masalah">
          <div className="grid grid-cols-2 gap-y-8 gap-x-2">
            <DetailContent
              label="Tipe Aset"
              content={reference?.ticketable?.asset_type_name}
            />

            <DetailContent
              label="ID Produk"
              content={reference?.ticketable?.product_id}
            />

            <div className="col-span-2">
              <DetailContent
                label="PIC"
                content={`${reference?.ticketable?.pic_name} / ${reference?.ticketable?.pic_contact}`}
              />
            </div>

            <div className="col-span-2">
              <DetailContent
                label="Waktu Kejadian"
                content={formatDateToLocale(
                  reference?.raised_at as unknown as Date,
                  "dd MMMM yyyy"
                )}
                // content="13 Januari 2021"
              />
            </div>

            <div className="col-span-2">
              <DetailContent
                label="Lokasi Masalah"
                content={reference?.ticketable?.location?.name}
              />
            </div>

            <div className="col-span-2">
              <DetailContent
                label="Deskripsi Kerusakan"
                content={reference?.ticketable?.description}
              />
            </div>

            <div className="col-span-2">
              <DetailContent
                label="Bukti Kejadian"
                content={
                  <div className="grid grid-cols-2 gap-y-8 gap-x-2">
                    {reference?.ticketable?.attachments?.map(({ link }) => {
                      const attachmentSrc = generateStaticAssetUrl(link);
                      const attachmentFileName = attachmentSrc.split("/").pop();

                      return (
                        <DetailMedia
                          src={attachmentSrc}
                          fileName={attachmentFileName}
                        />
                      );
                    })}
                  </div>
                }
              />
            </div>
          </div>
        </CollapsePanel>

        <hr className="border-mono90" />

        {/* Panel: Catatan */}
        {reference?.logs?.special_logs?.length > 0 && (
          <>
            <CollapsePanel name="Catatan">
              <div className="grid grid-cols-1 gap-y-8">
                {reference?.logs?.special_logs?.map(
                  ({ id, description, created_at, causer }) => {
                    return (
                      <CatatanItem
                        key={id}
                        content={description}
                        userName={causer.name}
                        date={created_at}
                        userProfilePicture={generateStaticAssetUrl(
                          causer.profile_image.link
                        )}
                      />
                    );
                  }
                )}
              </div>
            </CollapsePanel>

            <hr className="border-mono90" />
          </>
        )}

        {/* Panel: Detail Aset */}
        {reference?.ticketable?.inventory !== null && (
          <>
            <CollapsePanel name="Detail Aset">
              <div className="grid grid-cols-2 gap-y-8 gap-x-2">
                <div className="col-span-2">
                  <H2>
                    {reference?.ticketable?.inventory?.model_inventory?.name}
                  </H2>
                </div>

                <DetailContent
                  label="Tipe Aset"
                  content={
                    reference?.ticketable?.inventory?.model_inventory?.asset
                      ?.full_name
                  }
                />

                <DetailContent
                  label="MIG ID"
                  content={reference?.ticketable?.inventory?.mig_id}
                />

                <DetailContent
                  label="Status Pemakaian"
                  content={
                    <DetailBadge
                      statusId={
                        reference?.ticketable?.inventory?.status_usage?.id
                      }
                      statusName={
                        reference?.ticketable?.inventory?.status_usage?.name
                      }
                      type="usage"
                    />
                  }
                />

                <DetailContent
                  label="Kondisi Aset"
                  content={
                    <DetailBadge
                      statusId={
                        reference?.ticketable?.inventory?.status_condition?.id
                      }
                      statusName={
                        reference?.ticketable?.inventory?.status_condition?.name
                      }
                      type="condition"
                    />
                  }
                />

                <div className="col-span-2">
                  <DetailContent
                    label="Lokasi"
                    content={
                      reference?.ticketable?.inventory?.location_inventory?.name
                    }
                  />
                </div>

                <div className="col-span-2 flex flex-col space-y-8">
                  {reference?.ticketable?.inventory?.additional_attributes?.map(
                    ({ name, value, data_type }, index) => {
                      let _value = value;

                      switch (data_type) {
                        case "dropdown":
                          _value = JSON.parse(value as string)?.default;
                          break;
                        case "checkbox":
                          _value = JSON.parse(value as string)?.default?.join(
                            ", "
                          );
                          break;
                      }

                      return (
                        <DetailContent
                          key={index}
                          label={name}
                          content={_value || "-"}
                        />
                      );
                    }
                  )}
                </div>
              </div>
            </CollapsePanel>

            <hr className="border-mono90" />
          </>
        )}
      </div>
    </Drawer>
  );
};

/**
 * @private
 */
interface IDetailContent {
  label: string;
  content?: ReactNode;
}

/**
 * @private
 */
const DetailContent: FC<IDetailContent> = ({ label, content }) => {
  const isReactElement = React.isValidElement(content);

  const safeContent =
    content !== undefined && !isReactElement ? (
      <span className="text-mono30">{content}</span>
    ) : (
      content
    );

  return (
    <div className="w-full flex flex-col items-start justify-start space-y-2">
      {/* Label */}
      <Label>{label}</Label>

      {/* Children */}
      {safeContent || null}
    </div>
  );
};

/**
 * @private
 */
interface ReferenceModel {
  id: number;
  name: string;
  status_name: string;
  deadline: string;

  raised_at: string;
  closed_at: string;
  resolved_times: string;

  // Informasi Tiket
  creator: {
    name: string;
    location: string;
    raised_at: string;
    closed_at: string;
    resolved_times: string;
  };

  // Catatan
  logs: {
    special_logs: {
      id: number;
      description: string;
      created_at: string;
      causer: {
        name: string;
        profile_image: {
          link: string;
        };
      };
    }[];
  };

  // Detail Masalah
  ticketable: {
    asset_type_name: string;
    product_id: string;
    pic_name: string;
    pic_contact: string;
    location: { name: string };
    description: string;
    attachments: { link: string }[];

    // Detail Aset
    inventory: {
      model_inventory: {
        name: string;
        asset: { full_name: string };
      };
      mig_id: string;
      status_usage: { id: number; name: string };
      status_condition: { id: number; name: string };
      location_inventory: { name: string };
      additional_attributes: {
        name: string;
        value: string | number;
        data_type:
          | "dropdown"
          | "number"
          | "paragraph"
          | "checkbox"
          | "single"
          | "date";
      }[];
    };
  };
}

/**
 * @private
 */
interface IDetailMedia {
  src: string;
  fileName?: string;
}

/**
 * @private
 */
const DetailMedia: FC<IDetailMedia> = ({ src, fileName = undefined }) => {
  return (
    <div className="flex flex-col justify-start items-center space-y-2">
      {/* Image */}
      <a href={src} target="_blank" className="block">
        <img src={src} alt={fileName || src} />
      </a>

      {/* File name */}
      <Typography.Text ellipsis className="mig-caption--medium text-mono50">
        {fileName || "File name"}
      </Typography.Text>
    </div>
  );
};

/**
 * @private
 */
interface IPanelHeader {
  label: string;
}

/**
 * @private
 */
const PanelHeader: FC<IPanelHeader> = ({ label }) => {
  return <span className="font-bold text-primary100">{label}</span>;
};

/**
 * @private
 */
interface ICollapsePanel {
  name: string;
}

/**
 * @private
 */
const CollapsePanel: FC<ICollapsePanel> = ({ name = "", children }) => {
  return (
    <Collapse
      ghost
      expandIconPosition="right"
      className={styles["frameless-panel-header"]}
    >
      <Collapse.Panel
        key={name.toLowerCase().replace(/ /gi, "-")}
        header={<PanelHeader label={name} />}
        className={styles["collapse-content-wrapper"]}
      >
        {children || null}
      </Collapse.Panel>
    </Collapse>
  );
};

/**
 * @private
 */
interface ICatatanItem {
  content: string;
  userName: string;
  userProfilePicture?: string;
  date?: Date | string;
}

/**
 * @private
 */
export const CatatanItem: FC<ICatatanItem> = ({
  content,
  userName,
  userProfilePicture = undefined,
  date = undefined,
}) => {
  return (
    <div className="flex flex-col">
      <p className=" mb-3 line-clamp-6 text-mono30">{content}</p>

      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          <div className="w-5 h-5 rounded-full mr-2">
            <img
              src={userProfilePicture || "/image/staffTask.png"}
              className="object-contain w-5 h-5 rounded-full overflow-hidden"
              alt="Profile Picture"
            />
          </div>
          <Text color={`green`}>{userName}</Text>
        </div>
        <div>
          <Label>
            {/* 2 Jan 2022, 16:00 */}
            {formatDateToLocale(date as unknown as Date, "dd MMM yyyy, HH:mm")}
          </Label>
        </div>
      </div>
    </div>
  );
};

/**
 * @private
 */
interface IDetailBadge {
  statusId?: number;
  statusName?: string;

  type: "usage" | "condition";
}

/**
 * @private
 */ const DetailBadge: FC<IDetailBadge> = ({ statusId, statusName, type }) => {
  const usageBadgeClassName = clsx(
    {
      "bg-open bg-opacity-10 text-open": statusId === 1,
      "bg-completed bg-opacity-10 text-completed": statusId === 2,
      "bg-overdue bg-opacity-10 text-overdue": statusId === 3,
    },
    "inline-block rounded-md h-auto px-3 text-center py-1"
  );

  const conditionBadgeClassName = clsx(
    {
      "bg-completed bg-opacity-10 text-completed": 1,
      "bg-closed bg-opacity-10 text-closed": 2,
      "bg-overdue bg-opacity-10 text-overdue": 3,
    },
    "inline-block rounded-md h-auto px-3 text-center py-1"
  );

  const badgeClassName =
    type === "usage" ? usageBadgeClassName : conditionBadgeClassName;

  return <div className={badgeClassName}>{statusName}</div>;
};
