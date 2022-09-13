import Icon from "@ant-design/icons";

const DashboardIconSvg = () => {
  const dashboardIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-home-2"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#597e8d"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="5 12 3 12 12 3 21 12 19 12" />
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
      <rect x={10} y={12} width={4} height={4} />
    </svg>
  );
  return <Icon component={dashboardIconSvg}></Icon>;
};
const TicketIconSvg = ({ size, color }) => {
  const ticketIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-ticket"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1={15} y1={5} x2={15} y2={7} />
      <line x1={15} y1={11} x2={15} y2={13} />
      <line x1={15} y1={17} x2={15} y2={19} />
      <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2" />
    </svg>
  );
  return <Icon component={ticketIconSvg}></Icon>;
};
const TaskIconSvg = () => {
  const taskIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-clipboard-check"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#597e8d"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
      <rect x={9} y={3} width={6} height={4} rx={2} />
      <path d="M9 14l2 2l4 -4" />
    </svg>
  );
  return <Icon component={taskIconSvg}></Icon>;
};
const ItemIconSvg = () => {
  const itemIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-archive"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#597e8d"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <rect x={3} y={4} width={18} height={4} rx={2} />
      <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" />
      <line x1={10} y1={12} x2={14} y2={12} />
    </svg>
  );
  return <Icon component={itemIconSvg}></Icon>;
};
const CompanyIconSvg = () => {
  const companyIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-building-skyscraper"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#597e8d"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1={3} y1={21} x2={21} y2={21} />
      <path d="M5 21v-14l8 -4v18" />
      <path d="M19 21v-10l-6 -4" />
      <line x1={9} y1={9} x2={9} y2="9.01" />
      <line x1={9} y1={12} x2={9} y2="12.01" />
      <line x1={9} y1={15} x2={9} y2="15.01" />
      <line x1={9} y1={18} x2={9} y2="18.01" />
    </svg>
  );
  return <Icon component={companyIconSvg}></Icon>;
};
const UserIconSvg = () => {
  const userIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-users"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#597e8d"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx={9} cy={7} r={4} />
      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
    </svg>
  );
  return <Icon component={userIconSvg}></Icon>;
};
const FiturIconSvg = () => {
  const fiturIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-stack"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#597e8d"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="12 4 4 8 12 12 20 8 12 4" />
      <polyline points="4 12 12 16 20 12" />
      <polyline points="4 16 12 20 20 16" />
    </svg>
  );
  return <Icon component={fiturIconSvg}></Icon>;
};
const AsetIconSvg = () => {
  const asetIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-box"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#597e8d"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" />
      <line x1={12} y1={12} x2={20} y2="7.5" />
      <line x1={12} y1={12} x2={12} y2={21} />
      <line x1={12} y1={12} x2={4} y2="7.5" />
    </svg>
  );
  return <Icon component={asetIconSvg}></Icon>;
};
const SearchIconSvg = ({ size, color }) => {
  const searchIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-search"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx={10} cy={10} r={7} />
      <line x1={21} y1={21} x2={15} y2={15} />
    </svg>
  );
  return <Icon component={searchIconSvg}></Icon>;
};
const NotifIconSvg = () => {
  const notifIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-bell"
      width={28}
      height={28}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#000000"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
      <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
    </svg>
  );
  return <Icon component={notifIconSvg}></Icon>;
};
const Aset2IconSvg = ({ size, color }) => {
  const aset2IconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-box"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" />
      <line x1={12} y1={12} x2={20} y2="7.5" />
      <line x1={12} y1={12} x2={12} y2={21} />
      <line x1={12} y1={12} x2={4} y2="7.5" />
    </svg>
  );
  return <Icon component={aset2IconSvg}></Icon>;
};
const EditIconSvg = ({ size, color }) => {
  const editIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-pencil"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
      <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
    </svg>
  );
  return <Icon component={editIconSvg}></Icon>;
};
const EmailIconSvg = ({ size, color }) => {
  const emailIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-mail"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <rect x={3} y={5} width={18} height={14} rx={2} />
      <polyline points="3 7 12 13 21 7" />
    </svg>
  );
  return <Icon component={emailIconSvg}></Icon>;
};
const PhoneIconSvg = ({ size, color }) => {
  const phoneIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-phone"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
    </svg>
  );
  return <Icon component={phoneIconSvg}></Icon>;
};
const WebIconSvg = ({ size, color }) => {
  const webIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-world"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx={12} cy={12} r={9} />
      <line x1="3.6" y1={9} x2="20.4" y2={9} />
      <line x1="3.6" y1={15} x2="20.4" y2={15} />
      <path d="M11.5 3a17 17 0 0 0 0 18" />
      <path d="M12.5 3a17 17 0 0 1 0 18" />
    </svg>
  );
  return <Icon component={webIconSvg}></Icon>;
};
const LocationIconSvg = ({ size, color, id }) => {
  const locationIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-building-community"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8 9l5 5v7h-5v-4m0 4h-5v-7l5 -5m1 1v-6a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v17h-8" />
      <line x1={13} y1={7} x2={13} y2="7.01" />
      <line x1={17} y1={7} x2={17} y2="7.01" />
      <line x1={17} y1={11} x2={17} y2="11.01" />
      <line x1={17} y1={15} x2={17} y2="15.01" />
    </svg>
  );
  return <Icon id={id} component={locationIconSvg}></Icon>;
};
const SubLocationIconSvg = ({ size, color }) => {
  const sublocationIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-building"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1={3} y1={21} x2={21} y2={21} />
      <line x1={9} y1={8} x2={10} y2={8} />
      <line x1={9} y1={12} x2={10} y2={12} />
      <line x1={9} y1={16} x2={10} y2={16} />
      <line x1={14} y1={8} x2={15} y2={8} />
      <line x1={14} y1={12} x2={15} y2={12} />
      <line x1={14} y1={16} x2={15} y2={16} />
      <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16" />
    </svg>
  );
  return <Icon component={sublocationIconSvg}></Icon>;
};
const ShareIconSvg = ({ size, color }) => {
  const shareIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-share"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx={6} cy={12} r={3} />
      <circle cx={18} cy={6} r={3} />
      <circle cx={18} cy={18} r={3} />
      <line x1="8.7" y1="10.7" x2="15.3" y2="7.3" />
      <line x1="8.7" y1="13.3" x2="15.3" y2="16.7" />
    </svg>
  );
  return <Icon component={shareIconSvg}></Icon>;
};
const TrashIconSvg = ({ size, color }) => {
  const trashIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-trash"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1={4} y1={7} x2={20} y2={7} />
      <line x1={10} y1={11} x2={10} y2={17} />
      <line x1={14} y1={11} x2={14} y2={17} />
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
    </svg>
  );
  return <Icon component={trashIconSvg}></Icon>;
};
const CheckIconSvg = ({ size, color }) => {
  const checkIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-check"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l5 5l10 -10" />
    </svg>
  );
  return <Icon component={checkIconSvg}></Icon>;
};
const BackIconSvg = ({ size, color }) => {
  const backIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-arrow-back-up"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" />
    </svg>
  );
  return <Icon component={backIconSvg}></Icon>;
};
const SortingIconSvg = ({ size, color }) => {
  const sortingIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-sort-ascending-letters"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 10v-5c0 -1.38 .62 -2 2 -2s2 .62 2 2v5m0 -3h-4" />
      <path d="M19 21h-4l4 -7h-4" />
      <path d="M4 15l3 3l3 -3" />
      <path d="M7 6v12" />
    </svg>
  );
  return <Icon component={sortingIconSvg}></Icon>;
};
const DownIconSvg = ({ size, color }) => {
  const downIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-chevron-down"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
  return <Icon component={downIconSvg}></Icon>;
};
const ExternalLinkIconSvg = ({ size, color }) => {
  const externallinkIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-external-link"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5" />
      <line x1={10} y1={14} x2={20} y2={4} />
      <polyline points="15 4 20 4 20 9" />
    </svg>
  );
  return <Icon component={externallinkIconSvg}></Icon>;
};
const CameraIconSvg = ({ size, color }) => {
  const cameraIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-camera"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
      <circle cx={12} cy={13} r={3} />
    </svg>
  );
  return <Icon component={cameraIconSvg}></Icon>;
};
const RefreshIconSvg = ({ size, color }) => {
  const refreshIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-refresh"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
      <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
    </svg>
  );
  return <Icon component={refreshIconSvg}></Icon>;
};
const SquarePlusIconSvg = ({ size, color }) => {
  const squareplusIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-square-plus"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <rect x={4} y={4} width={16} height={16} rx={2} />
      <line x1={9} y1={12} x2={15} y2={12} />
      <line x1={12} y1={9} x2={12} y2={15} />
    </svg>
  );
  return <Icon component={squareplusIconSvg}></Icon>;
};
const NotesIconSvg = ({ size, color }) => {
  const notesIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-notes"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <rect x={5} y={3} width={14} height={18} rx={2} />
      <line x1={9} y1={7} x2={15} y2={7} />
      <line x1={9} y1={11} x2={15} y2={11} />
      <line x1={9} y1={15} x2={13} y2={15} />
    </svg>
  );
  return <Icon component={notesIconSvg}></Icon>;
};
const FaxIconSvg = ({ size, color }) => {
  const faxIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-printer"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" />
      <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" />
      <rect x={7} y={13} width={10} height={8} rx={2} />
    </svg>
  );
  return <Icon component={faxIconSvg}></Icon>;
};
const PkpIconSvg = ({ size, color }) => {
  const pkpIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-receipt-tax"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1={9} y1={14} x2={15} y2={8} />
      <circle cx="9.5" cy="8.5" r=".5" fill="currentColor" />
      <circle cx="14.5" cy="13.5" r=".5" fill="currentColor" />
      <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2" />
    </svg>
  );
  return <Icon component={pkpIconSvg}></Icon>;
};
const AlertIconSvg = ({ size, color }) => {
  const alertIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-alert-circle"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx={12} cy={12} r={9} />
      <line x1={12} y1={8} x2={12} y2={12} />
      <line x1={12} y1={16} x2="12.01" y2={16} />
    </svg>
  );
  return <Icon component={alertIconSvg}></Icon>;
};
const AlerttriangleIconSvg = ({ size, color }) => {
  const alerttriangleIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-alert-triangle"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 9v2m0 4v.01" />
      <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" />
    </svg>
  );
  return <Icon component={alerttriangleIconSvg}></Icon>;
};
const ClockIconSvg = ({ size, color }) => {
  const clockIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-clock"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx={12} cy={12} r={9} />
      <polyline points="12 7 12 12 15 15" />
    </svg>
  );
  return <Icon component={clockIconSvg}></Icon>;
};
const ClipboardcheckIconSvg = ({ size, color }) => {
  const clipboardcheckIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-clipboard-check"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
      <rect x={9} y={3} width={6} height={4} rx={2} />
      <path d="M9 14l2 2l4 -4" />
    </svg>
  );
  return <Icon component={clipboardcheckIconSvg}></Icon>;
};
const CalendartimeIconSvg = ({ size, color }) => {
  const calendartimeIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-calendar-time"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4" />
      <circle cx={18} cy={18} r={4} />
      <path d="M15 3v4" />
      <path d="M7 3v4" />
      <path d="M3 11h16" />
      <path d="M18 16.496v1.504l1 1" />
    </svg>
  );
  return <Icon component={calendartimeIconSvg}></Icon>;
};
const MappinIconSvg = ({ size, color }) => {
  const mappinIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-map-pin"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx={12} cy={11} r={3} />
      <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
    </svg>
  );
  return <Icon component={mappinIconSvg}></Icon>;
};
const AlignJustifiedIconSvg = ({ size, color }) => {
  const alignjustifiedIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-align-justified"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1={4} y1={6} x2={20} y2={6} />
      <line x1={4} y1={12} x2={20} y2={12} />
      <line x1={4} y1={18} x2={16} y2={18} />
    </svg>
  );
  return <Icon component={alignjustifiedIconSvg}></Icon>;
};
const CheckboxIconSvg = ({ size, color }) => {
  const checkboxIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-checkbox"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="9 11 12 14 20 6" />
      <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
    </svg>
  );
  return <Icon component={checkboxIconSvg}></Icon>;
};
const BorderAllSvg = ({ size, color }) => {
  const borderallSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-border-all"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <rect x={4} y={4} width={16} height={16} rx={2} />
      <line x1={4} y1={12} x2={20} y2={12} />
      <line x1={12} y1={4} x2={12} y2={20} />
    </svg>
  );
  return <Icon component={borderallSvg}></Icon>;
};
const ListNumbersSvg = ({ size, color }) => {
  const listnumbersSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-list-numbers"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M11 6h9" />
      <path d="M11 12h9" />
      <path d="M12 18h8" />
      <path d="M4 16a2 2 0 1 1 4 0c0 .591 -.5 1 -1 1.5l-3 2.5h4" />
      <path d="M6 10v-6l-2 2" />
    </svg>
  );
  return <Icon component={listnumbersSvg}></Icon>;
};
const ListcheckIconSvg = ({ size, color }) => {
  const listcheckIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-list-check"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3.5 5.5l1.5 1.5l2.5 -2.5" />
      <path d="M3.5 11.5l1.5 1.5l2.5 -2.5" />
      <path d="M3.5 17.5l1.5 1.5l2.5 -2.5" />
      <line x1={11} y1={6} x2={20} y2={6} />
      <line x1={11} y1={12} x2={20} y2={12} />
      <line x1={11} y1={18} x2={20} y2={18} />
    </svg>
  );
  return <Icon component={listcheckIconSvg}></Icon>;
};
const CopyIconSvg = ({ size, color }) => {
  const copyIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-copy"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <rect x={8} y={8} width={12} height={12} rx={2} />
      <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
    </svg>
  );
  return <Icon component={copyIconSvg}></Icon>;
};
const ArrowsSortIconSvg = ({ size, color }) => {
  const arrowsSortIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-arrows-sort"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 9l4 -4l4 4m-4 -4v14" />
      <path d="M21 15l-4 4l-4 -4m4 4v-14" />
    </svg>
  );
  return <Icon component={arrowsSortIconSvg}></Icon>;
};
const UsercircleIconSvg = ({ size, color }) => {
  const usercircleIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-user-circle"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx={12} cy={12} r={9} />
      <circle cx={12} cy={10} r={3} />
      <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
    </svg>
  );
  return <Icon component={usercircleIconSvg}></Icon>;
};
const CircleXIconSvg = ({ size, color }) => {
  const circlexIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-circle-x"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx={12} cy={12} r={9} />
      <path d="M10 10l4 4m0 -4l-4 4" />
    </svg>
  );
  return <Icon component={circlexIconSvg}></Icon>;
};
const RulerIconSvg = ({ size, color }) => {
  const rulerIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-ruler"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 4h14a1 1 0 0 1 1 1v5a1 1 0 0 1 -1 1h-7a1 1 0 0 0 -1 1v7a1 1 0 0 1 -1 1h-5a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1" />
      <line x1={4} y1={8} x2={6} y2={8} />
      <line x1={4} y1={12} x2={7} y2={12} />
      <line x1={4} y1={16} x2={6} y2={16} />
      <line x1={8} y1={4} x2={8} y2={6} />
      <polyline points="12 4 12 7 " />
      <polyline points="16 4 16 6 " />
    </svg>
  );
  return <Icon component={rulerIconSvg}></Icon>;
};
const UserPlusIconSvg = ({ size, color }) => {
  const userPlusIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-user-plus"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx={9} cy={7} r={4} />
      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 11h6m-3 -3v6" />
    </svg>
  );
  return <Icon component={userPlusIconSvg}></Icon>;
};
const SortAscendingIconSvg = ({ size, color }) => {
  const sortAscendingIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-sort-ascending-letters"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 10v-5c0 -1.38 .62 -2 2 -2s2 .62 2 2v5m0 -3h-4" />
      <path d="M19 21h-4l4 -7h-4" />
      <path d="M4 15l3 3l3 -3" />
      <path d="M7 6v12" />
    </svg>
  );
  return <Icon component={sortAscendingIconSvg}></Icon>;
};
const SortDescendingIconSvg = ({ size, color }) => {
  const sortDescendingIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-sort-descending-letters"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 21v-5c0 -1.38 .62 -2 2 -2s2 .62 2 2v5m0 -3h-4" />
      <path d="M19 10h-4l4 -7h-4" />
      <path d="M4 15l3 3l3 -3" />
      <path d="M7 6v12" />
    </svg>
  );
  return <Icon component={sortDescendingIconSvg}></Icon>;
};
const ForbidIconSvg = ({ size, color }) => {
  const forbidIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-forbid"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx={12} cy={12} r={9} />
      <line x1={9} y1={9} x2={15} y2={15} />
    </svg>
  );
  return <Icon component={forbidIconSvg}></Icon>;
};
const PlayerPauseIconSvg = ({ size, color }) => {
  const playerPauseIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-player-pause"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <rect x={6} y={5} width={4} height={14} rx={1} />
      <rect x={14} y={5} width={4} height={14} rx={1} />
    </svg>
  );
  return <Icon component={playerPauseIconSvg}></Icon>;
};
const PlayerPlayIconSvg = ({ size, color }) => {
  const playerPlayIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-player-play"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 4v16l13 -8z" />
    </svg>
  );
  return <Icon component={playerPlayIconSvg}></Icon>;
};
const CloudUploadIconSvg = ({ size, color }) => {
  const cloudUploadIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-cloud-upload"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
      <polyline points="9 15 12 12 15 15" />
      <line x1={12} y1={12} x2={12} y2={21} />
    </svg>
  );
  return <Icon component={cloudUploadIconSvg}></Icon>;
};
const PhotoIconSvg = ({ size, color }) => {
  const photoIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-photo"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1={15} y1={8} x2="15.01" y2={8} />
      <rect x={4} y={4} width={16} height={16} rx={3} />
      <path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5" />
      <path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2" />
    </svg>
  );
  return <Icon component={photoIconSvg}></Icon>;
};
const FileTextIconSvg = ({ size, color }) => {
  const fileTextIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-file-text"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
      <line x1={9} y1={9} x2={10} y2={9} />
      <line x1={9} y1={13} x2={15} y2={13} />
      <line x1={9} y1={17} x2={15} y2={17} />
    </svg>
  );
  return <Icon component={fileTextIconSvg}></Icon>;
};
const SendIconSvg = ({ size, color }) => {
  const sendIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-send"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1={10} y1={14} x2={21} y2={3} />
      <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
    </svg>
  );
  return <Icon component={sendIconSvg}></Icon>;
};
const LayoutGridAddSvg = ({ size, color }) => {
  const layoutGridAddSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-layout-grid-add"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <rect x={4} y={4} width={6} height={6} rx={1} />
      <rect x={14} y={4} width={6} height={6} rx={1} />
      <rect x={4} y={14} width={6} height={6} rx={1} />
      <path d="M14 17h6m-3 -3v6" />
    </svg>
  );
  return <Icon component={layoutGridAddSvg}></Icon>;
};
const FilePlusIconSvg = ({ size, color }) => {
  const filePlusIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-file-plus"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
      <line x1={12} y1={11} x2={12} y2={17} />
      <line x1={9} y1={14} x2={15} y2={14} />
    </svg>
  );
  return <Icon component={filePlusIconSvg}></Icon>;
};
const TableExportIconSvg = ({ size, color }) => {
  const tableExportIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-table-export"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M11.5 20h-5.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v7.5m-16 -3.5h16m-10 -6v16m4 -1h7m-3 -3l3 3l-3 3" />
    </svg>
  );
  return <Icon component={tableExportIconSvg}></Icon>;
};
const FileExportIconSvg = ({ size, color }) => {
  const fileExportIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-file-export"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3" />
    </svg>
  );
  return <Icon component={fileExportIconSvg}></Icon>;
};
const DotsIconSvg = ({ size, color }) => {
  const dotsIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-dots"
      width={44}
      height={44}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx={5} cy={12} r={1} />
      <circle cx={12} cy={12} r={1} />
      <circle cx={19} cy={12} r={1} />
    </svg>
  );
  return <Icon component={dotsIconSvg}></Icon>;
};
const UserSearchIconSvg = ({ size, color }) => {
  const userSearchIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-user-search"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx={12} cy={7} r={4} />
      <path d="M6 21v-2a4 4 0 0 1 4 -4h1" />
      <circle cx="16.5" cy="17.5" r="2.5" />
      <path d="M18.5 19.5l2.5 2.5" />
    </svg>
  );
  return <Icon component={userSearchIconSvg}></Icon>;
};
const InfoCircleIconSvg = ({ size, color }) => {
  const infoCircleIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-info-circle"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx={12} cy={12} r={9} />
      <line x1={12} y1={8} x2="12.01" y2={8} />
      <polyline points="11 12 12 12 12 16 13 16" />
    </svg>
  );
  return <Icon component={infoCircleIconSvg}></Icon>;
};
const PlusIconSvg = ({ size, color }) => {
  const plusIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-plus"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1={12} y1={5} x2={12} y2={19} />
      <line x1={5} y1={12} x2={19} y2={12} />
    </svg>
  );
  return <Icon component={plusIconSvg}></Icon>;
};
const XIconSvg = ({ size, color }) => {
  const xIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-x"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1={18} y1={6} x2={6} y2={18} />
      <line x1={6} y1={6} x2={18} y2={18} />
    </svg>
  );
  return <Icon component={xIconSvg}></Icon>;
};
const HistoryIconSvg = ({ size, color }) => {
  const historyIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-history"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="12 8 12 12 14 14" />
      <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
    </svg>
  );
  return <Icon component={historyIconSvg}></Icon>;
};
const AdjusmentsHorizontalIconSvg = ({ size, color }) => {
  const adjusmentsHorizontalIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-adjustments-horizontal"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx={14} cy={6} r={2} />
      <line x1={4} y1={6} x2={12} y2={6} />
      <line x1={16} y1={6} x2={20} y2={6} />
      <circle cx={8} cy={12} r={2} />
      <line x1={4} y1={12} x2={6} y2={12} />
      <line x1={10} y1={12} x2={20} y2={12} />
      <circle cx={17} cy={18} r={2} />
      <line x1={4} y1={18} x2={15} y2={18} />
      <line x1={19} y1={18} x2={20} y2={18} />
    </svg>
  );
  return <Icon component={adjusmentsHorizontalIconSvg}></Icon>;
};
const ArmChairlIconSvg = ({ size, color }) => {
  const armChairlIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-armchair"
      width={44}
      height={44}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#ff2825"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 11a2 2 0 0 1 2 2v2h10v-2a2 2 0 1 1 4 0v4a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-4a2 2 0 0 1 2 -2z" />
      <path d="M5 11v-5a3 3 0 0 1 3 -3h8a3 3 0 0 1 3 3v5" />
      <path d="M6 19v2" />
      <path d="M18 19v2" />
    </svg>
  );
  return <Icon component={armChairlIconSvg}></Icon>;
};
const AssetIconSvg = ({ size, color }) => {
  const assetIconSvg = () => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_3173_31461)">
        <rect x={4} y="0.142822" width={64} height={64} rx={5} fill="#CCCCCC" />
        <path
          d="M51.7488 29.1553L49.3881 19.2999C48.9744 17.5806 47.232 16.5006 45.503 16.9249C43.9824 17.2964 43.2432 18.3495 42.9437 19.0906C42.5894 19.9652 41.0083 23.9281 40.6387 24.747C40.5091 25.0311 40.2355 25.1809 40.1798 25.2058C39.8659 25.345 36.7238 26.6708 36.7238 26.6708V26.6766C36.4112 26.8207 36.1463 27.0511 35.9602 27.3408C35.7741 27.6304 35.6747 27.9672 35.6736 28.3114C35.6736 29.3127 36.4934 30.1249 37.5043 30.1249C37.7222 30.1249 37.9296 30.0798 38.1245 30.0106V30.0174L42.2957 28.2836C42.8678 28.0167 43.1472 27.6788 43.4313 27.1863C43.5504 26.979 43.9123 26.1111 44.207 25.3988L46.7241 35.9252L46.7213 52.2356C46.7165 53.8561 47.8358 55.177 49.4717 55.1828C51.1094 55.1885 52.2931 53.8801 52.3037 52.2567L52.32 33.0058C52.3181 32.1006 51.9581 29.9492 51.7488 29.1553Z"
          fill="white"
        />
        <path
          d="M42.6232 16.4372C44.6671 16.4372 46.324 14.7953 46.324 12.77C46.324 10.7446 44.6671 9.10278 42.6232 9.10278C40.5793 9.10278 38.9224 10.7446 38.9224 12.77C38.9224 14.7953 40.5793 16.4372 42.6232 16.4372Z"
          fill="white"
        />
        <path
          d="M28.4457 43.7606V47.8694C28.9516 47.7864 29.4118 47.5269 29.7446 47.137C30.0767 46.7462 30.2428 46.2893 30.2428 45.7632C30.2428 45.2928 30.1036 44.8867 29.8252 44.545C29.543 44.207 29.0831 43.9459 28.4457 43.7606ZM25.9075 37.3795C25.6579 37.7155 25.5321 38.088 25.5321 38.495C25.5321 38.8694 25.6463 39.2131 25.8719 39.5318C26.1004 39.8525 26.4451 40.1117 26.903 40.3075V36.6624C26.5034 36.7896 26.1547 37.0408 25.9075 37.3795ZM35.6707 32.4989H35.6745L29.9385 20.9914L29.9375 21.0019C29.7232 20.5594 29.3883 20.1863 28.9714 19.9256C28.5545 19.6649 28.0724 19.5272 27.5807 19.5283H22.294C20.8511 19.5274 19.6799 20.687 19.6799 22.1174V55.1827H35.9673V33.7968C35.9659 33.3475 35.8645 32.9042 35.6707 32.4989ZM31.6847 48.5971C30.9071 49.4678 29.8281 50.0016 28.4486 50.1974V52.1683H26.9059V50.2502C25.679 50.1034 24.6854 49.6493 23.9174 48.8918C23.1532 48.1325 22.6646 47.0621 22.4524 45.6787L25.2268 45.3821C25.3239 45.9104 25.5424 46.409 25.8652 46.8384C26.1753 47.2454 26.5228 47.5402 26.9049 47.7226V43.3085C25.5167 42.9149 24.4963 42.3187 23.8502 41.5248C23.2003 40.728 22.8758 39.7613 22.8758 38.6227C22.8758 37.4707 23.2415 36.503 23.9779 35.7187C24.7113 34.9363 25.6867 34.4842 26.9059 34.3661V33.3226H28.4486V34.3661C29.5737 34.4986 30.4713 34.8797 31.1375 35.5075C31.8019 36.1344 32.2271 36.9782 32.4124 38.0314L29.7235 38.3789C29.5593 37.5514 29.135 36.9878 28.4486 36.6931V40.8115C30.1487 41.2694 31.3075 41.8608 31.9247 42.5866C32.5401 43.3142 32.8492 44.2464 32.8492 45.384C32.8492 46.655 32.4614 47.7254 31.6847 48.5971Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_3173_31461"
          x={0}
          y="0.142822"
          width={72}
          height={72}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3173_31461"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3173_31461"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
  return <Icon component={assetIconSvg}></Icon>;
};
const MoveIconSvg = ({ size, color }) => {
  const moveIconSvg = () => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_2864_33813)">
        <path
          d="M2 0.666748H3.29867C4.574 0.666748 5.76867 1.28875 6.5 2.33341C6.8603 2.84814 7.33941 3.26839 7.8967 3.55853C8.454 3.84866 9.07304 4.00013 9.70133 4.00008H14"
          stroke="white"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 7.33333H3.3C3.92792 7.33334 4.54656 7.18184 5.10342 6.89169C5.66028 6.60154 6.13891 6.1813 6.49867 5.66667C6.85843 5.15203 7.33705 4.7318 7.89391 4.44164C8.45077 4.15149 9.06942 3.99999 9.69733 4H13.3333"
          stroke="white"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 6L14 4L12 2"
          stroke="white"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2864_33813"
          x="-2.6665"
          y={0}
          width="21.333"
          height={16}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2864_33813"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2864_33813"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
  return <Icon component={moveIconSvg}></Icon>;
};
const ContractIconSvg = () => {
  const contractIconSvg = () => (
    <svg width="2em" height="2em" id="icon-contract" viewBox="0 0 32 32">
      <path
        fill="#f4f8f8"
        style={{ fill: "var(--color1, #f4f8f8)" }}
        d="M4.195 0.469c-1.066 0-1.931 0.864-1.931 1.931v24.872c0 1.066 0.864 1.931 1.931 1.931h18.154c1.066 0 1.931-0.864 1.931-1.931v-20.848c0-0.388-0.154-0.76-0.428-1.034l-4.491-4.491c-0.274-0.274-0.646-0.428-1.034-0.428z"
      />
      <path
        fill="#e7ecf1"
        style={{ fill: "var(--color2, #e7ecf1)" }}
        d="M20.863 5.817c-0.145 0-0.287-0.017-0.423-0.047v21.501c0 1.066-0.864 1.931-1.931 1.931h3.84c1.066 0 1.931-0.864 1.931-1.931v-20.848c0-0.211-0.046-0.417-0.132-0.606z"
      />
      <path
        fill="#fc8086"
        style={{ fill: "var(--color3, #fc8086)" }}
        d="M23.851 5.388l-4.491-4.491c-0.125-0.125-0.27-0.225-0.428-0.297v3.285c0 1.066 0.864 1.931 1.931 1.931h3.285c-0.072-0.158-0.172-0.303-0.297-0.428z"
      />
      <path
        fill="#ffece3"
        style={{ fill: "var(--color4, #ffece3)" }}
        d="M25.822 25.582l-6.896-4.084c-0.354-0.21-0.47-0.666-0.261-1.020 0 0 0.17-0.288 0.353-0.596l-1.395-0.825c-0.92-0.528-1.351-0.626-2.181-0.305l-0.905 0.35c-0.551 0.213-1.169 0.162-1.677-0.139l-2.422-1.428-3.44 5.807 3.102 1.831c0.21 0.125 0.395 0.288 0.544 0.481l1.045 1.355c0.577 0.675 1.769 1.551 2.533 2.004l3.989 2.363c0.527 0.312 1.206 0.138 1.518-0.389s0.138-1.206-0.389-1.518l1.246 0.738c0.527 0.312 1.206 0.138 1.518-0.389s0.138-1.206-0.389-1.518l0.831 0.492c0.527 0.312 1.206 0.138 1.518-0.389s0.138-1.206-0.389-1.518l1.017 0.602c0.526 0.312 1.206 0.138 1.518-0.389s0.138-1.206-0.389-1.518z"
      />
      <path
        fill="#ffddce"
        style={{ fill: "var(--color5, #ffddce)" }}
        d="M25.822 25.582l-2.377-1.407c-0.052 0.203-0.153 0.4-0.318 0.571-0.422 0.438-1.098 0.509-1.621 0.199l-0.676-0.401c-0.024-0.014-0.055-0.010-0.074 0.010s-0.021 0.052-0.005 0.076c0.283 0.402 0.322 0.949 0.055 1.4-0.363 0.613-1.155 0.816-1.768 0.453l-0.531-0.317c-0.021-0.012-0.048-0.009-0.064 0.009s-0.018 0.046-0.003 0.066c0.312 0.411 0.36 0.989 0.071 1.457-0.372 0.604-1.175 0.776-1.785 0.415l-0.436-0.258c-0.087-0.051-0.195-0.047-0.277 0.011s-0.123 0.159-0.103 0.258c0.062 0.303 0.017 0.628-0.153 0.915-0.145 0.245-0.36 0.424-0.603 0.527l3.031 1.796c0.534 0.317 1.247 0.148 1.554-0.392 0.297-0.524 0.121-1.192-0.399-1.5l1.221 0.724c0.534 0.317 1.247 0.148 1.554-0.392 0.297-0.524 0.121-1.192-0.399-1.5l0.806 0.477c0.534 0.317 1.247 0.148 1.554-0.392 0.297-0.524 0.121-1.192-0.399-1.5l0.992 0.588c0.534 0.317 1.247 0.148 1.554-0.392 0.297-0.524 0.121-1.192-0.399-1.5z"
      />
      <path
        fill="#fcd0a3"
        style={{ fill: "var(--color6, #fcd0a3)" }}
        d="M25.224 17.881l-1.86 1.081c-0.508 0.301-1.126 0.352-1.677 0.139l-1.021-0.401c-0.319-0.125-0.67-0.148-1.002-0.063l-1.564 0.396c-0.728 0.184-1.238 0.839-1.238 1.59v2.087c0 0.295 0.239 0.535 0.534 0.535 0.89 0.001 1.612-0.721 1.612-1.611v-0.088l6.694 3.964c0.124-0.132 0.266-0.246 0.423-0.339l2.54-1.484z"
      />
      <path
        fill="#ffb983"
        style={{ fill: "var(--color7, #ffb983)" }}
        d="M26.217 19.557l-0.358 1.326-4.007 2.348 3.851 2.28c0.124-0.132 0.266-0.246 0.423-0.339l2.54-1.484z"
      />
      <path
        fill="#fcd0a3"
        style={{ fill: "var(--color6, #fcd0a3)" }}
        d="M11.457 26.402l-0.628 0.874c-0.357 0.497-1.049 0.611-1.546 0.254s-0.611-1.049-0.254-1.546l0.628-0.874c0.357-0.497 1.049-0.611 1.546-0.254s0.611 1.049 0.254 1.546z"
      />
      <path
        fill="#fcd0a3"
        style={{ fill: "var(--color6, #fcd0a3)" }}
        d="M13.95 26.73l-1.32 1.839c-0.357 0.497-1.049 0.611-1.546 0.254s-0.611-1.049-0.254-1.546l1.32-1.839c0.357-0.497 1.049-0.611 1.546-0.254s0.611 1.049 0.254 1.546z"
      />
      <path
        fill="#fcd0a3"
        style={{ fill: "var(--color6, #fcd0a3)" }}
        d="M15.75 28.022l-1.32 1.839c-0.357 0.497-1.049 0.611-1.546 0.254s-0.611-1.049-0.254-1.546l1.32-1.839c0.357-0.497 1.049-0.611 1.546-0.254s0.611 1.049 0.254 1.546z"
      />
      <path
        fill="#ffb983"
        style={{ fill: "var(--color7, #ffb983)" }}
        d="M16.963 30.131l-0.439 0.611c-0.357 0.497-1.049 0.611-1.546 0.254s-0.611-1.049-0.254-1.546l0.439-0.611c0.357-0.497 1.049-0.611 1.546-0.254s0.611 1.049 0.254 1.546z"
      />
      <path
        fill="#7c8b96"
        style={{ fill: "var(--color8, #7c8b96)" }}
        d="M11.733 16.931l-0.97-0.575c-0.267-0.158-0.611-0.070-0.77 0.197l-3.989 6.734c-0.158 0.267-0.070 0.611 0.197 0.77l0.97 0.575c0.651 0.386 1.491 0.171 1.877-0.48l3.166-5.343c0.386-0.651 0.171-1.491-0.48-1.877z"
      />
      <path
        fill="#7c8b96"
        style={{ fill: "var(--color8, #7c8b96)" }}
        d="M24.898 16.356l-0.97 0.575c-0.651 0.386-0.866 1.226-0.48 1.877l3.166 5.343c0.386 0.651 1.226 0.866 1.877 0.48l0.97-0.575c0.267-0.158 0.355-0.503 0.197-0.77l-3.989-6.734c-0.158-0.267-0.503-0.355-0.77-0.197z"
      />
      <path
        fill="#000"
        style={{ fill: "var(--color9, #000)" }}
        d="M20.935 8.613h-15.324c-0.26 0-0.471 0.211-0.471 0.471s0.211 0.471 0.471 0.471h15.324c0.26 0 0.471-0.211 0.471-0.471s-0.211-0.471-0.471-0.471z"
      />
      <path
        fill="#000"
        style={{ fill: "var(--color9, #000)" }}
        d="M5.61 6.289h7.662c0.26 0 0.471-0.211 0.471-0.471s-0.211-0.471-0.471-0.471h-7.662c-0.26 0-0.471 0.211-0.471 0.471s0.211 0.471 0.471 0.471z"
      />
      <path
        fill="#000"
        style={{ fill: "var(--color9, #000)" }}
        d="M20.935 11.506h-15.324c-0.26 0-0.471 0.211-0.471 0.471s0.211 0.471 0.471 0.471h15.324c0.26 0 0.471-0.211 0.471-0.471s-0.211-0.471-0.471-0.471z"
      />
      <path
        fill="#000"
        style={{ fill: "var(--color9, #000)" }}
        d="M9.101 28.729h-4.904c-0.805 0-1.46-0.655-1.46-1.46v-24.868c0-0.805 0.655-1.46 1.46-1.46h14.128c0.046 0 0.091 0.004 0.135 0.010v2.936c0 1.324 1.077 2.401 2.401 2.401h2.936c0.006 0.045 0.010 0.089 0.010 0.135v8.016c0 0.26 0.211 0.471 0.471 0.471s0.471-0.211 0.471-0.471v-8.016c0-0.516-0.201-1.002-0.566-1.367l-4.491-4.491c-0.365-0.365-0.851-0.566-1.367-0.566h-14.129c-1.324 0-2.401 1.077-2.401 2.401v24.868c0 1.324 1.077 2.401 2.401 2.401h4.904c0.26 0 0.471-0.211 0.471-0.471s-0.211-0.471-0.471-0.471zM23.142 5.347h-2.28c-0.805 0-1.46-0.655-1.46-1.46v-2.28z"
      />
      <path
        fill="#000"
        style={{ fill: "var(--color9, #000)" }}
        d="M30.060 23.046l-3.989-6.732c-0.291-0.491-0.923-0.653-1.414-0.362l-0.97 0.575c-0.753 0.446-1.071 1.349-0.813 2.149-0.327 0.118-0.685 0.117-1.015-0.011-0.766-0.241-1.348-0.726-2.31-0.483-1.633 0.416-1.584 0.395-1.731 0.446-0.956-0.544-1.531-0.706-2.546-0.314l-0.905 0.35c-0.419 0.162-0.881 0.123-1.268-0.106l-0.247-0.146c0.12-0.722-0.2-1.484-0.878-1.886 0 0 0 0-0-0l-0.97-0.575c-0.49-0.29-1.124-0.128-1.414 0.362l-3.989 6.733c-0.291 0.491-0.129 1.124 0.362 1.414l0.97 0.575c0.294 0.174 0.616 0.257 0.935 0.257 0.355 0 0.706-0.103 1.006-0.297l0.202 0.119-0.427 0.595c-0.509 0.709-0.347 1.694 0.362 2.203 0.328 0.235 0.739 0.343 1.165 0.276 0.068 0.395 0.284 0.765 0.634 1.016 0.329 0.236 0.739 0.344 1.165 0.277 0.068 0.395 0.284 0.764 0.634 1.015 0.471 0.338 1.056 0.377 1.543 0.169 0.107 0.277 0.292 0.527 0.551 0.713 0.675 0.485 1.606 0.358 2.131-0.27l1.134 0.672c0.75 0.445 1.718 0.198 2.163-0.554 0.114-0.192 0.184-0.401 0.21-0.616l0.003 0.002c0.749 0.444 1.719 0.195 2.163-0.554 0.128-0.217 0.199-0.452 0.216-0.688 0.66 0.166 1.38-0.111 1.744-0.726 0.12-0.202 0.189-0.42 0.212-0.639 0.708 0.278 1.535 0.009 1.934-0.665 0.215-0.363 0.276-0.788 0.171-1.196-0.060-0.234-0.17-0.446-0.321-0.625l0.625-0.365c0.529 0.217 1.133 0.182 1.638-0.117l0.97-0.575c0.491-0.291 0.653-0.923 0.362-1.414zM7.412 24.225l-0.97-0.575c-0.043-0.026-0.057-0.081-0.032-0.125l3.989-6.733c0.026-0.043 0.082-0.057 0.125-0.032l0.97 0.575c0.431 0.255 0.566 0.808 0.315 1.232l-3.165 5.343c-0.253 0.427-0.805 0.568-1.232 0.315zM9.559 27.146c-0.286-0.205-0.351-0.603-0.146-0.889l0.627-0.874c0.2-0.278 0.598-0.355 0.889-0.146 0.285 0.205 0.351 0.604 0.146 0.889l-0.627 0.874c-0.205 0.285-0.604 0.351-0.889 0.146zM11.359 28.438c-0.285-0.205-0.351-0.604-0.146-0.889l0.627-0.874s0 0 0-0c0 0 0-0 0-0l0.692-0.965c0.099-0.138 0.246-0.23 0.414-0.257 0.035-0.006 0.070-0.009 0.104-0.009 0.132 0 0.261 0.041 0.37 0.12 0.138 0.099 0.229 0.246 0.257 0.414s-0.012 0.337-0.111 0.475l-1.32 1.839c-0.205 0.286-0.603 0.351-0.889 0.146zM13.158 29.73c-0.285-0.205-0.351-0.603-0.146-0.889 0-0 0-0 0-0l1.32-1.839c0.205-0.285 0.604-0.351 0.889-0.146s0.351 0.604 0.146 0.889l-0.586 0.817s0 0-0 0l-0.733 1.022c-0.205 0.285-0.603 0.351-0.889 0.146zM15.253 30.612c-0.285-0.205-0.351-0.603-0.146-0.888l0.439-0.612c0.205-0.285 0.604-0.351 0.889-0.146s0.351 0.604 0.146 0.889l-0.439 0.611c-0.205 0.285-0.604 0.351-0.889 0.146zM25.804 26.859c-0.179 0.302-0.571 0.403-0.873 0.224-0.512-0.303-3.815-2.26-4.167-2.469-0.224-0.133-0.512-0.059-0.645 0.165s-0.059 0.512 0.165 0.645l3.15 1.866c0.302 0.179 0.403 0.569 0.224 0.873-0.179 0.302-0.571 0.402-0.873 0.224-1.165-0.69-2.111-1.251-3.152-1.867-0.224-0.133-0.512-0.059-0.645 0.165s-0.059 0.512 0.165 0.645l2.322 1.375c0.303 0.18 0.402 0.57 0.223 0.873s-0.571 0.403-0.873 0.224l-1.246-0.738c-0-0-0-0-0-0s-0-0-0-0l-0.909-0.539c-0.224-0.133-0.512-0.059-0.645 0.165s-0.059 0.512 0.165 0.645l0.909 0.539c0 0 0 0 0 0 0.302 0.179 0.403 0.569 0.224 0.873-0.179 0.302-0.571 0.403-0.873 0.224l-1.061-0.628c0.455-0.702 0.282-1.647-0.405-2.14-0.202-0.145-0.426-0.235-0.656-0.273 0.244-0.651 0.034-1.411-0.558-1.836-0.35-0.251-0.769-0.338-1.165-0.276-0.070-0.412-0.295-0.772-0.635-1.016-0.639-0.458-1.507-0.37-2.043 0.172-0.109-0.191-0.259-0.363-0.45-0.5-0.531-0.381-1.22-0.384-1.745-0.064l-0.216-0.127 2.961-4.997 0.141 0.083c0.623 0.369 1.382 0.446 2.086 0.173l0.905-0.35c0.518-0.2 0.803-0.213 1.316 0.029-0.335 0.377-0.534 0.871-0.534 1.404v2.087c0 0.554 0.451 1.006 1.005 1.006h0.001c0.556 0 1.078-0.216 1.471-0.609 0.229-0.229 0.398-0.502 0.5-0.8 0.608 0.36 5.63 3.334 6.212 3.679 0.146 0.087 0.25 0.225 0.293 0.39s0.018 0.336-0.069 0.483zM29.218 23.65l-0.97 0.575c-0.427 0.253-0.979 0.111-1.231-0.315l-1.483-2.504c-0.133-0.224-0.421-0.297-0.645-0.165s-0.298 0.421-0.165 0.645l1.483 2.504c0.028 0.047 0.058 0.092 0.090 0.136l-0.412 0.241c-0.083 0.049-0.164 0.104-0.24 0.163l-6.395-3.787c-0.313-0.185-0.711 0.041-0.711 0.405-0.005 0.028 0.049 0.512-0.334 0.895-0.215 0.215-0.501 0.334-0.806 0.334-0 0-0 0-0.001 0-0.035 0-0.064-0.029-0.064-0.065v-2.087c0-0.545 0.375-1.005 0.882-1.134l1.564-0.396c0.567-0.143 0.888 0.16 1.737 0.447 0.59 0.228 1.231 0.214 1.8-0.029l0.284 0.48c0.133 0.224 0.421 0.298 0.645 0.165s0.298-0.421 0.165-0.645l-0.56-0.945c-0.253-0.427-0.112-0.978 0.315-1.231l0.97-0.575c0.042-0.025 0.098-0.012 0.125 0.032l3.989 6.733c0.026 0.043 0.012 0.099-0.032 0.125z"
      />
    </svg>
  );
  return <Icon component={contractIconSvg}></Icon>;
};

const IconBroadcast = (props) => {
  const svgbroadcast = () => (
    <svg
      id="color"
      enableBackground="new 0 0 24 24"
      height={props.height ?? 40}
      viewBox="0 0 24 24"
      width={props.width ?? 40}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m8.25 21.25c-2.481 0-4.5-2.019-4.5-4.5 0-.48.071-.937.212-1.357.175-.524.742-.805 1.265-.631.524.175.807.742.631 1.265-.071.216-.108.459-.108.723 0 1.378 1.122 2.5 2.5 2.5 1.146 0 2.167-.807 2.426-1.917.125-.538.666-.874 1.201-.746.538.125.872.664.746 1.201-.476 2.038-2.274 3.462-4.373 3.462z"
        fill="#0f93ff"
      />
      <path
        d="m23.25 21.5c-.07 0-.14-.01-.208-.029l-22.5-6.5c-.321-.093-.542-.387-.542-.721v-4.5c0-.334.221-.628.542-.721l22.5-6.5c.227-.063.471-.021.659.121s.299.364.299.6v17.5c0 .236-.111.458-.299.6-.132.098-.29.15-.451.15z"
        fill="#0f93ff"
      />
      <g fill="#0f93ff">
        <path d="m23 22.25c-.552 0-1-.448-1-1v-18.5c0-.552.448-1 1-1s1 .448 1 1v18.5c0 .552-.448 1-1 1z" />
        <path d="m1 16.25c-.552 0-1-.448-1-1v-6.5c0-.552.448-1 1-1s1 .448 1 1v6.5c0 .552-.448 1-1 1z" />
      </g>
    </svg>
  );
  return <Icon component={svgbroadcast} style={{ marginRight: `0.5rem` }} />;
};

const Iconquestion = (props) => {
  const svgquestion = () => (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={props.width ?? 40}
      height={props.height ?? 40}
      viewBox="0 0 356.62 356.62"
      style={{ enableBackground: "new 0 0 356.62 356.62" }}
      xmlSpace="preserve"
    >
      <g>
        <path
          d="M178.31,0C79.99,0,0,79.99,0,178.311S79.99,356.62,178.31,356.62s178.31-79.989,178.31-178.31S276.63,0,178.31,0z
		 M178.31,326.62C96.532,326.62,30,260.089,30,178.311S96.532,30,178.31,30s148.31,66.532,148.31,148.311
		S260.088,326.62,178.31,326.62z"
          fill="#0f93ff"
        />
        <path
          d="M178.31,66.949c-35.58,0-64.527,28.947-64.527,64.527c0,8.284,6.716,15,15,15s15-6.716,15-15
		c0-19.038,15.489-34.527,34.527-34.527s34.527,15.489,34.527,34.527s-15.489,34.527-34.527,34.527c-8.284,0-15,6.716-15,15v33.915
		c0,8.284,6.716,15,15,15s15-6.716,15-15v-20.675c28.371-6.779,49.527-32.35,49.527-62.768
		C242.837,95.896,213.89,66.949,178.31,66.949z"
          fill="#0f93ff"
        />
        <circle cx="178.31" cy="265.899" r="20.999" fill="#0f93ff" />
      </g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
    </svg>
  );
  return <Icon component={svgquestion} style={{ marginRight: `0.5rem` }} />;
};

const ResumeIconSvg = () => {
  const resumeIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-file-text"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#597e8d"
      fill="none"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
      <line x1="9" y1="9" x2="10" y2="9" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="15" y2="17" />
    </svg>
  );
  return <Icon component={resumeIconSvg}></Icon>;
};

export {
  DashboardIconSvg,
  TicketIconSvg,
  TaskIconSvg,
  ItemIconSvg,
  CompanyIconSvg,
  UserIconSvg,
  FiturIconSvg,
  AsetIconSvg,
  SearchIconSvg,
  NotifIconSvg,
  Aset2IconSvg,
  EditIconSvg,
  EmailIconSvg,
  PhoneIconSvg,
  WebIconSvg,
  LocationIconSvg,
  SubLocationIconSvg,
  ShareIconSvg,
  TrashIconSvg,
  CheckIconSvg,
  BackIconSvg,
  SortingIconSvg,
  DownIconSvg,
  ExternalLinkIconSvg,
  CameraIconSvg,
  RefreshIconSvg,
  SquarePlusIconSvg,
  ContractIconSvg,
  IconBroadcast,
  Iconquestion,
  NotesIconSvg,
  FaxIconSvg,
  PkpIconSvg,
  MoveIconSvg,
  AlertIconSvg,
  ClockIconSvg,
  ClipboardcheckIconSvg,
  MappinIconSvg,
  ListcheckIconSvg,
  CalendartimeIconSvg,
  AlerttriangleIconSvg,
  UsercircleIconSvg,
  AlignJustifiedIconSvg,
  CheckboxIconSvg,
  BorderAllSvg,
  ListNumbersSvg,
  CopyIconSvg,
  CircleXIconSvg,
  RulerIconSvg,
  AssetIconSvg,
  ArrowsSortIconSvg,
  UserPlusIconSvg,
  SortAscendingIconSvg,
  SortDescendingIconSvg,
  ForbidIconSvg,
  PlayerPauseIconSvg,
  PlayerPlayIconSvg,
  CloudUploadIconSvg,
  PhotoIconSvg,
  FileTextIconSvg,
  SendIconSvg,
  LayoutGridAddSvg,
  FilePlusIconSvg,
  TableExportIconSvg,
  AdjusmentsHorizontalIconSvg,
  HistoryIconSvg,
  FileExportIconSvg,
  DotsIconSvg,
  UserSearchIconSvg,
  InfoCircleIconSvg,
  PlusIconSvg,
  XIconSvg,
  ArmChairlIconSvg,
  ResumeIconSvg,
};
