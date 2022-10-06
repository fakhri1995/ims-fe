import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { FC, memo } from "react";

import BlobLowerIcon from "assets/vectors/blob-lower.svg";
import BlobUpperIcon from "assets/vectors/blob-upper.svg";
import SquarePlusIcon from "assets/vectors/icon-square-plus.svg";

export interface IAddNewFormButton {
  title: string;
  disabled: boolean;
  icon: any;

  onButtonClicked: () => void;
}

export const AddNewFormButton: FC<IAddNewFormButton> = memo(
  ({ title, icon, disabled, onButtonClicked }) => {
    return (
      <button
        className="mig-platform w-full flex items-center transition-colors text-white relative bg-primary100 disabled:bg-gray-200 hover:bg-primary75 overflow-hidden"
        onClick={onButtonClicked}
        disabled={disabled}
      >
        <div className="h-full mr-6 flex items-center">
          {icon ? icon : <SquarePlusIcon />}
        </div>

        <div className="flex flex-col text-left">
          <span className="font-bold text-sm">{title}</span>
        </div>

        <BlobUpperIcon className="absolute -right-32 -bottom-4" />
        <BlobLowerIcon className="absolute -right-6 top-4" />
      </button>
    );
  }
);
AddNewFormButton.displayName = "AddNewFormButton";
