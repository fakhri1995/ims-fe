import { FC, memo } from "react";

export interface ITotalFormAktivitasCard {
  totalFormAktivitasCount: number;
}

export const TotalFormAktivitasCard: FC<ITotalFormAktivitasCard> = memo(
  ({ totalFormAktivitasCount }) => {
    return (
      <div className="p-6 flex items-center justify-between rounded-md bg-white shadow-md">
        <span className="font-bold text-lg text-mono30">
          Total Form Aktivitas
        </span>

        <span className="text-5xl text-primary100">
          {totalFormAktivitasCount}
        </span>
      </div>
    );
  }
);
TotalFormAktivitasCard.displayName = "TotalFormAktivitasCard";
