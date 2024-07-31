import { LeaveStatus } from "apis/attendance";

/**
 * Badge Component for Leave Status
 *
 * Status Description:
 * - 1: Pending
 * - 2: Accepted
 * - 3: Rejected
 *
 */
const BadgeLeaveStatus = ({ status }: { status: string | number }) => (
  <div
    className={`${
      status == LeaveStatus.PENDING
        ? "bg-warning bg-opacity-10"
        : status == LeaveStatus.ACCEPTED
        ? "bg-primary100 bg-opacity-10"
        : "bg-danger bg-opacity-10"
    } py-1 px-4 max-w-max rounded-[5px] flex items-center gap-2`}
  >
    <span
      className={`w-2 h-2 flex rounded-full ${
        status == LeaveStatus.PENDING
          ? "bg-warning"
          : status == LeaveStatus.ACCEPTED
          ? "bg-primary100"
          : "bg-danger"
      } `}
    ></span>
    <p
      className={`${
        status == LeaveStatus.PENDING
          ? "text-warning"
          : status == LeaveStatus.ACCEPTED
          ? "text-primary100"
          : "text-danger"
      } mig-caption--medium`}
    >
      {status == LeaveStatus.PENDING
        ? "Pending"
        : status == LeaveStatus.ACCEPTED
        ? "Accepted"
        : "Rejected"}
    </p>
  </div>
);

export default BadgeLeaveStatus;
