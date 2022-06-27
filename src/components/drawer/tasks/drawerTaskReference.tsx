import { Collapse, Drawer } from "antd";
import moment from "moment";
import type { FC, ReactNode } from "react";
import React from "react";

import { H1, H2, Label, Text } from "components/typography";

import { generateStaticAssetUrl } from "lib/helper";

import ChecklistIcon from "assets/vectors/icon-checked.svg";

import styles from "./drawerTaskReference.module.scss";

interface IDrawerTaskReference {
  visible?: boolean;
  onClose?: () => void;
}

export const DrawerTaskReference: FC<IDrawerTaskReference> = ({
  visible = false,
  onClose = undefined,
}) => {
  return (
    <Drawer
      visible={visible}
      closable
      destroyOnClose
      onClose={onClose}
      title={<H1>Tiket INC-7</H1>}
    >
      <div className="flex flex-col space-y-8">
        {/* Status and Deadline */}
        <div className="grid grid-cols-2">
          <DetailContent
            label="Deadline"
            content={
              <span className="flex items-center space-x-2">
                {/* TODO: dynamic icon? */}
                <ChecklistIcon />

                <H2>Open</H2>
              </span>
            }
          />

          <DetailContent
            label="Deadline"
            content={<H2>16 Jan 2021, 10:00</H2>}
          />
        </div>

        <hr className="border-mono90" />

        {/* Panel: Informasi Ticket */}
        <CollapsePanel name="Informasi Tiket">
          <div className="grid grid-cols-2 gap-y-8 gap-x-2">
            <DetailContent label="Diajukan oleh" content="Andi Gunawan" />

            <DetailContent label="Lokasi Pengaju" content="KCP Tebet 2" />

            <DetailContent
              label="Tanggal Diajukan"
              content="12 Januari 2021 - 10:00:00"
            />

            <DetailContent
              label="Tanggal Selesai"
              content="14 Januari 2021 - 10:00:00"
            />

            <DetailContent
              label="Durasi Penyelesaian"
              content="3 jam 10 menit"
            />
          </div>
        </CollapsePanel>

        <hr className="border-mono90" />

        {/* Panel: Detail Masalah */}
        <CollapsePanel name="Detail Masalah">
          <div className="grid grid-cols-2 gap-y-8 gap-x-2">
            <DetailContent label="Tipe Aset" content="ATM" />

            <DetailContent label="ID Produk" content="223080" />

            <div className="col-span-2">
              <DetailContent label="PIC" content="Kejar / 085815123123" />
            </div>

            <div className="col-span-2">
              <DetailContent label="Waktu Kejadian" content="13 Januari 2021" />
            </div>

            <div className="col-span-2">
              <DetailContent label="Lokasi Masalah" content="KCP Tebet" />
            </div>

            <div className="col-span-2">
              <DetailContent
                label="Deskripsi Kerusakan"
                content="kartu tidak terbaca dan tertolak keluar. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
              />
            </div>

            <div className="col-span-2">
              <DetailContent
                label="Bukti Kejadian"
                content={
                  <div className="grid grid-cols-2 gap-y-8 gap-x-2">
                    <DetailMedia src="/tes.jpg" fileName="DSC000078.jpg" />

                    <DetailMedia src="/tes.jpg" fileName="DSC000079.jpg" />
                  </div>
                }
              />
            </div>
          </div>
        </CollapsePanel>

        <hr className="border-mono90" />

        {/* Panel: Catatan */}
        <CollapsePanel name="Catatan">
          <div className="grid grid-cols-1 gap-y-8">
            <CatatanItem
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              userName="Herman"
            />

            <CatatanItem
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              userName="Kennan"
            />
          </div>
        </CollapsePanel>

        <hr className="border-mono90" />

        {/* Panel: Detail Aset */}
        <CollapsePanel name="Detail Aset">
          <div className="grid grid-cols-2 gap-y-8 gap-x-2">
            <div className="col-span-2">
              <H2>Nama Model</H2>
            </div>

            <DetailContent label="Tipe Aset" content="IT Asset / ATM" />

            <DetailContent label="MIG ID" content="122021" />

            <DetailContent
              label="Status Pemakaian"
              content={
                <>
                  {false && (
                    <div className="inline-block rounded-md h-auto px-3 text-center py-1 bg-open bg-opacity-10 text-open">
                      In Used
                    </div>
                  )}
                  {2 === 2 && (
                    <div className="inline-block rounded-md h-auto px-3 text-center py-1 bg-completed bg-opacity-10 text-completed">
                      In Stock
                    </div>
                  )}
                  {false && (
                    <div className="inline-block rounded-md h-auto px-3 text-center py-1 bg-overdue bg-opacity-10 text-overdue">
                      Replacement
                    </div>
                  )}
                </>
              }
            />

            <DetailContent
              label="Kondisi Aset"
              content={
                <div>
                  {false && (
                    <div className="inline-block rounded-md h-auto px-3 text-center py-1 bg-completed bg-opacity-10 text-completed">
                      Good
                    </div>
                  )}
                  {false && (
                    <div className="inline-block rounded-md h-auto px-3 text-center py-1 bg-closed bg-opacity-10 text-closed">
                      Gray
                    </div>
                  )}
                  {3 === 3 && (
                    <div className="inline-block rounded-md h-auto px-3 text-center py-1 bg-overdue bg-opacity-10 text-overdue">
                      Bad
                    </div>
                  )}
                </div>
              }
            />

            <div className="col-span-2">
              <DetailContent label="Lokasi" content="KCP Tebet" />
            </div>

            <div className="col-span-2">
              <DetailContent
                label="Field Dinamis Spesifikasi Item"
                content="Value Field Dinamis"
              />
            </div>
          </div>
        </CollapsePanel>

        <hr className="border-mono90" />
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
    <div className="w-full flex flex-col items-start justify-center space-y-2">
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
interface IDetailMedia {
  src: string;
  fileName?: string;
}

/**
 * @private
 */
const DetailMedia: FC<IDetailMedia> = ({ src, fileName = undefined }) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-2">
      {/* Image */}
      <a href={src} target="_blank" className="block">
        <img src={src} alt={fileName || src} />
      </a>

      {/* File name */}
      <span className="mig-caption--medium text-mono50">
        {fileName || "File name"}
      </span>
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
            {moment(date).locale("id").format("D MMM YYYY, HH:mm")}
          </Label>
        </div>
      </div>
    </div>
  );
};
