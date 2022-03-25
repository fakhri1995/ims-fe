import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { FC, memo } from "react";

import AddNewProjectIcon from "assets/vectors/add-new-project.svg";
import BlobLowerIcon from "assets/vectors/blob-lower.svg";
import BlobUpperIcon from "assets/vectors/blob-upper.svg";

export interface IAddNewAktivitasButton {
  onButtonClicked: () => void;
}

export const AddNewAktivitasButton: FC<IAddNewAktivitasButton> = memo(
  ({ onButtonClicked }) => {
    /** Contoh: Rabu, 23 Februari 2022 */
    const todayDateContent = format(new Date(), "EEEE, dd MMMM yyyy", {
      locale: idLocale,
    });

    return (
      <button
        className="mig-platform w-full h-full flex items-center transition-colors text-white relative bg-primary100 hover:bg-primary75 overflow-hidden"
        onClick={onButtonClicked}
      >
        <div className="h-full mr-6 flex items-center">
          <AddNewProjectIcon className="" />
        </div>

        <div className="flex flex-col text-left">
          <span className="font-bold text-sm">Buat Form Aktivitas</span>
          <span className="text-xs text-white/60">{todayDateContent}</span>
        </div>

        <BlobUpperIcon className="absolute -right-32 -bottom-4" />
        <BlobLowerIcon className="absolute -right-6 top-4" />
      </button>
    );
  }
);
AddNewAktivitasButton.displayName = "AddNewAktivitasButton";
