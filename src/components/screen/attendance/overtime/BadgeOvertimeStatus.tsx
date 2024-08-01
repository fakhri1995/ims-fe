/**
 * Badge Component for Overtime Status
 *
 * Status Description:
 * - 1: Pending
 * - 2: Accepted
 * - 3: Rejected
 *
 */
const BadgeOvertimeStatus = ({ status }: { status: string | number }) => (
  <div
    className={`${
      status == 1
        ? "bg-warning bg-opacity-10"
        : status == 2
        ? "bg-primary100 bg-opacity-10"
        : "bg-danger bg-opacity-10"
    } py-1 px-4 max-w-max rounded-[5px] flex items-center gap-2`}
  >
    <span
      className={`w-2 h-2 flex rounded-full ${
        status == 1 ? "bg-warning" : status == 2 ? "bg-primary100" : "bg-danger"
      } `}
    ></span>
    <p
      className={`${
        status == 1
          ? "text-warning"
          : status == 2
          ? "text-primary100"
          : "text-danger"
      } mig-caption--medium`}
    >
      {status == "1" ? "Pending" : status == "2" ? "Accepted" : "Rejected"}
    </p>
  </div>
);

export default BadgeOvertimeStatus;
