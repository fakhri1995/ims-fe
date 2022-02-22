import AddNewProjectIcon from "assets/vectors/add-new-project.svg";
import BlobLowerIcon from "assets/vectors/blob-lower.svg";
import BlobUpperIcon from "assets/vectors/blob-upper.svg";
import type { FC } from "react";

export interface IAddNewProjectButton {
  onButtonClicked: () => void;
}

export const AddNewProjectButton: FC<IAddNewProjectButton> = ({
  onButtonClicked,
}) => {
  return (
    <button
      className="w-full h-full flex items-center transition-colors py-6 px-6 bg-primary100 rounded-md shadow-md text-white relative hover:bg-primary75 overflow-hidden"
      onClick={onButtonClicked}
    >
      <div className="h-full mr-6 flex items-center">
        <AddNewProjectIcon className="" />
      </div>

      <div className="flex flex-col text-left">
        <span className="font-bold text-sm">Buat Project</span>
        <span className="text-xs text-white/60">Jumat, 07 Januari 2021</span>
      </div>

      <BlobUpperIcon className="absolute -right-32 -bottom-4" />
      <BlobLowerIcon className="absolute -right-6 top-4" />
    </button>
  );
};
