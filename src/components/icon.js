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
  return <Icon rev={""} component={dashboardIconSvg}></Icon>;
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
  return <Icon rev={""} component={ticketIconSvg}></Icon>;
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
  return <Icon rev={""} component={taskIconSvg}></Icon>;
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
  return <Icon rev={""} component={itemIconSvg}></Icon>;
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
  return <Icon rev={""} component={companyIconSvg}></Icon>;
};
const UserIconSvg = ({ size, color }) => {
  const userIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-users"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#597e8d"}
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
  return <Icon rev={""} component={userIconSvg}></Icon>;
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
  return <Icon rev={""} component={fiturIconSvg}></Icon>;
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
  return <Icon rev={""} component={asetIconSvg}></Icon>;
};
const KatalogIconSvg = () => {
  const katalogIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-tag"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#808080"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="8.5" cy="8.5" r="1" fill="currentColor" />
      <path d="M4 7v3.859c0 .537 .213 1.052 .593 1.432l8.116 8.116a2.025 2.025 0 0 0 2.864 0l4.834 -4.834a2.025 2.025 0 0 0 0 -2.864l-8.117 -8.116a2.025 2.025 0 0 0 -1.431 -.593h-3.859a3 3 0 0 0 -3 3z" />
    </svg>
  );
  return <Icon rev={""} component={katalogIconSvg}></Icon>;
};
const PakaiInternalIconSvg = ({ size, color }) => {
  const pakaiinternalIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-building"
      width={size ? size : "8"}
      height={size ? size : "8"}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#00589F"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 21l18 0" />
      <path d="M9 8l1 0" />
      <path d="M9 12l1 0" />
      <path d="M9 16l1 0" />
      <path d="M14 8l1 0" />
      <path d="M14 12l1 0" />
      <path d="M14 16l1 0" />
      <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16" />
    </svg>
  );
  return <Icon rev={""} component={pakaiinternalIconSvg}></Icon>;
};

const PakaiSewaIconSvg = ({ size, color }) => {
  const pakaisewaIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-user-check"
      width={size ? size : "8"}
      height={size ? size : "8"}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#00589F"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
      <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
      <path d="M15 19l2 2l4 -4" />
    </svg>
  );
  return <Icon rev={""} component={pakaisewaIconSvg}></Icon>;
};
const TersediaIconSvg = ({ size, color }) => {
  const tersediaIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-check"
      width={size ? size : "8"}
      height={size ? size : "8"}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#00589F"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l5 5l10 -10" />
    </svg>
  );
  return <Icon rev={""} component={tersediaIconSvg}></Icon>;
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
  return <Icon rev={""} component={searchIconSvg}></Icon>;
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
  return <Icon rev={""} component={notifIconSvg}></Icon>;
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
  return <Icon rev={""} component={aset2IconSvg}></Icon>;
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
  return <Icon rev={""} component={editIconSvg}></Icon>;
};
const EmailIconSvg = ({ size, color }) => {
  const emailIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-mail"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <rect x={3} y={5} width={18} height={14} rx={2} />
      <polyline points="3 7 12 13 21 7" />
    </svg>
  );
  return <Icon rev={""} component={emailIconSvg}></Icon>;
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
  return <Icon rev={""} component={phoneIconSvg}></Icon>;
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
  return <Icon rev={""} component={webIconSvg}></Icon>;
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
  return <Icon rev={""} id={id} component={locationIconSvg}></Icon>;
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
  return <Icon rev={""} component={sublocationIconSvg}></Icon>;
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
  return <Icon rev={""} component={shareIconSvg}></Icon>;
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
      stroke={color ? color : "#4D4D4D"}
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
  return <Icon rev={""} component={trashIconSvg}></Icon>;
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
  return <Icon rev={""} component={checkIconSvg}></Icon>;
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
  return <Icon rev={""} component={backIconSvg}></Icon>;
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
  return <Icon rev={""} component={sortingIconSvg}></Icon>;
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
  return <Icon rev={""} component={downIconSvg}></Icon>;
};
const UpIconSvg = ({ size, color }) => {
  const upIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-chevron-up"
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
      <path d="M6 15l6 -6l6 6" />
    </svg>
  );
  return <Icon rev={""} component={upIconSvg}></Icon>;
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
  return <Icon rev={""} component={externallinkIconSvg}></Icon>;
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
  return <Icon rev={""} component={cameraIconSvg}></Icon>;
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
  return <Icon rev={""} component={refreshIconSvg}></Icon>;
};
const ReplacementIconSvg = ({ size, color }) => {
  const replacementIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-refresh"
      width={size ? size : "8"}
      height={size ? size : "8"}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={color ? color : "#FFFFFF"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
      <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
    </svg>
  );
  return <Icon rev={""} component={replacementIconSvg}></Icon>;
};

const PeriodeIconSvg = ({ size, color }) => {
  const periodeIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-clock"
      width={size ? size : "8"}
      height={size ? size : "8"}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#FFFFFF"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
  return <Icon rev={""} component={periodeIconSvg}></Icon>;
};

const LuarPeriodeIconSvg = ({ size, color }) => {
  const luarperiodeIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-clock-exclamation"
      width={size ? size : "8"}
      height={size ? size : "8"}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#FFFFFF"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M20.986 12.502a9 9 0 1 0 -5.973 7.98" />
      <path d="M12 7v5l3 3" />
      <path d="M19 16v3" />
      <path d="M19 22v.01" />
    </svg>
  );
  return <Icon rev={""} component={luarperiodeIconSvg}></Icon>;
};
const EditTablerIconSvg = ({ size, color }) => {
  const edittablerIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-edit"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#FFFFFF"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
      <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
      <path d="M16 5l3 3" />
    </svg>
  );
  return <Icon rev={""} component={edittablerIconSvg}></Icon>;
};
const DeleteTablerIconSvg = ({ size, color }) => {
  const deletetablerIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-trash"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#FFFFFF"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 7l16 0" />
      <path d="M10 11l0 6" />
      <path d="M14 11l0 6" />
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
    </svg>
  );
  return <Icon rev={""} component={deletetablerIconSvg}></Icon>;
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
  return <Icon rev={""} component={squareplusIconSvg}></Icon>;
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
  return <Icon rev={""} component={notesIconSvg}></Icon>;
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
  return <Icon rev={""} component={faxIconSvg}></Icon>;
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
  return <Icon rev={""} component={pkpIconSvg}></Icon>;
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
  return <Icon rev={""} component={alertIconSvg}></Icon>;
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
  return <Icon rev={""} component={alerttriangleIconSvg}></Icon>;
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
  return <Icon rev={""} component={clockIconSvg}></Icon>;
};

const ClockXIconSvg = ({ size, color }) => {
  const clockXIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-clock-x"
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
      <path d="M20.926 13.15a9 9 0 1 0 -7.835 7.784" />
      <path d="M12 7v5l2 2" />
      <path d="M22 22l-5 -5" />
      <path d="M17 22l5 -5" />
    </svg>
  );
  return <Icon rev={""} component={clockXIconSvg}></Icon>;
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
  return <Icon rev={""} component={clipboardcheckIconSvg}></Icon>;
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
  return <Icon rev={""} component={calendartimeIconSvg}></Icon>;
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
  return <Icon rev={""} component={mappinIconSvg}></Icon>;
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
  return <Icon rev={""} component={alignjustifiedIconSvg}></Icon>;
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
  return <Icon rev={""} component={checkboxIconSvg}></Icon>;
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
  return <Icon rev={""} component={borderallSvg}></Icon>;
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
  return <Icon rev={""} component={listnumbersSvg}></Icon>;
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
  return <Icon rev={""} component={listcheckIconSvg}></Icon>;
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
  return <Icon rev={""} component={copyIconSvg}></Icon>;
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
  return <Icon rev={""} component={arrowsSortIconSvg}></Icon>;
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
  return <Icon rev={""} component={usercircleIconSvg}></Icon>;
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
  return <Icon rev={""} component={circlexIconSvg}></Icon>;
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
  return <Icon rev={""} component={rulerIconSvg}></Icon>;
};
const UserPlusIconSvg = ({ size, color }) => {
  const userPlusIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-user-plus"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#597e8d"}
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
  return <Icon rev={""} component={userPlusIconSvg}></Icon>;
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
  return <Icon rev={""} component={sortAscendingIconSvg}></Icon>;
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
  return <Icon rev={""} component={sortDescendingIconSvg}></Icon>;
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
  return <Icon rev={""} component={forbidIconSvg}></Icon>;
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
  return <Icon rev={""} component={playerPauseIconSvg}></Icon>;
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
  return <Icon rev={""} component={playerPlayIconSvg}></Icon>;
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
  return <Icon rev={""} component={cloudUploadIconSvg}></Icon>;
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
  return <Icon rev={""} component={photoIconSvg}></Icon>;
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
  return <Icon rev={""} component={fileTextIconSvg}></Icon>;
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
  return <Icon rev={""} component={sendIconSvg}></Icon>;
};
const LayoutGridSvg = ({ size, color }) => {
  const layoutGridSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-layout-grid"
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
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </svg>
  );
  return <Icon rev={""} component={layoutGridSvg}></Icon>;
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
  return <Icon rev={""} component={layoutGridAddSvg}></Icon>;
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
  return <Icon rev={""} component={filePlusIconSvg}></Icon>;
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
  return <Icon rev={""} component={tableExportIconSvg}></Icon>;
};

const TableImportIconSvg = ({ size, color }) => {
  const tableImportIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-table-import"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 21h-7a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v8" />
      <path d="M3 10h18" />
      <path d="M10 3v18" />
      <path d="M19 22v-6" />
      <path d="M22 19l-3 -3l-3 3" />
    </svg>
  );
  return <Icon rev={""} component={tableImportIconSvg}></Icon>;
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
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3" />
    </svg>
  );
  return <Icon rev={""} component={fileExportIconSvg}></Icon>;
};
const DotsIconSvg = ({ size, color }) => {
  const dotsIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-dots"
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
      <circle cx={5} cy={12} r={1} />
      <circle cx={12} cy={12} r={1} />
      <circle cx={19} cy={12} r={1} />
    </svg>
  );
  return <Icon rev={""} component={dotsIconSvg}></Icon>;
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
  return <Icon rev={""} component={userSearchIconSvg}></Icon>;
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
  return <Icon rev={""} component={infoCircleIconSvg}></Icon>;
};
const PlusIconSvg = ({ size, color }) => {
  const plusIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-plus"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#FFFFFF"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1={12} y1={5} x2={12} y2={19} />
      <line x1={5} y1={12} x2={19} y2={12} />
    </svg>
  );
  return <Icon rev={""} component={plusIconSvg}></Icon>;
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
  return <Icon rev={""} component={xIconSvg}></Icon>;
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
  return <Icon rev={""} component={historyIconSvg}></Icon>;
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
  return <Icon rev={""} component={adjusmentsHorizontalIconSvg}></Icon>;
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
  return <Icon rev={""} component={armChairlIconSvg}></Icon>;
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
  return <Icon rev={""} component={assetIconSvg}></Icon>;
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
  return <Icon rev={""} component={moveIconSvg}></Icon>;
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
  return <Icon rev={""} component={contractIconSvg}></Icon>;
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
  return (
    <Icon rev={""} component={svgbroadcast} style={{ marginRight: `0.5rem` }} />
  );
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
  return (
    <Icon rev={""} component={svgquestion} style={{ marginRight: `0.5rem` }} />
  );
};

const ResumeIconSvg = () => {
  const resumeIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-file-text"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
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
  return <Icon rev={""} component={resumeIconSvg}></Icon>;
};

const ClipboardIconSvg = ({ size, color }) => {
  const clipboardIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-clipboard"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="2" />
    </svg>
  );
  return <Icon rev={""} component={clipboardIconSvg}></Icon>;
};

const UsersIconSvg = ({ size, color }) => {
  const usersIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-users"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#597e8d"}
      fill="none"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
    </svg>
  );
  return <Icon rev={""} component={usersIconSvg}></Icon>;
};

const DownloadIconSvg = ({ size, color }) => {
  const downloadIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-download"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
      <polyline points="7 11 12 16 17 11" />
      <line x1="12" y1="4" x2="12" y2="16" />
    </svg>
  );
  return <Icon rev={""} component={downloadIconSvg}></Icon>;
};

const DownloadIcon2Svg = ({ size, color }) => {
  const downloadIcon2Svg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-download"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#FFFFFF"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
      <path d="M7 11l5 5l5 -5" />
      <path d="M12 4l0 12" />
    </svg>
  );
  return <Icon rev={""} component={downloadIcon2Svg}></Icon>;
};

const OneUserIconSvg = ({ size, color, strokeWidth }) => {
  const oneUserIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-user"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ? strokeWidth : "1.5"}
      stroke={color ? color : "#597e8d"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="12" cy="7" r="4" />
      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
    </svg>
  );
  return <Icon rev={""} component={oneUserIconSvg}></Icon>;
};

const ListSearchIconSvg = ({ size, color }) => {
  const listSearchIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-list-search"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="15" cy="15" r="4" />
      <path d="M18.5 18.5l2.5 2.5" />
      <path d="M4 6h16" />
      <path d="M4 12h4" />
      <path d="M4 18h4" />
    </svg>
  );
  return <Icon rev={""} component={listSearchIconSvg}></Icon>;
};
const MailForwardIconSvg = ({ size, color }) => {
  const mailForwardIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-mail-forward"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 18h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5" />
      <path d="M3 6l9 6l9 -6" />
      <path d="M15 18h6" />
      <path d="M18 15l3 3l-3 3" />
    </svg>
  );
  return <Icon rev={""} component={mailForwardIconSvg}></Icon>;
};

const TrendingUpIconSvg = ({ size, color }) => {
  const trendingUpIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-trending-up"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="3 17 9 11 13 15 21 7" />
      <polyline points="14 7 21 7 21 14" />
    </svg>
  );
  return <Icon rev={""} component={trendingUpIconSvg}></Icon>;
};

const InfoSquareIconSvg = ({ size, color }) => {
  const infoSquareIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-info-square"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <polyline points="11 12 12 12 12 16 13 16" />
    </svg>
  );
  return <Icon rev={""} component={infoSquareIconSvg}></Icon>;
};

const BriefcaseIconSvg = ({ size, color }) => {
  const briefcaseIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-briefcase"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
      <line x1="12" y1="12" x2="12" y2="12.01" />
      <path d="M3 13a20 20 0 0 0 18 0" />
    </svg>
  );
  return <Icon rev={""} component={briefcaseIconSvg}></Icon>;
};

const ClickIconSvg = ({ size, color }) => {
  const clickIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-click"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1="3" y1="12" x2="6" y2="12" />
      <line x1="12" y1="3" x2="12" y2="6" />
      <line x1="7.8" y1="7.8" x2="5.6" y2="5.6" />
      <line x1="16.2" y1="7.8" x2="18.4" y2="5.6" />
      <line x1="7.8" y1="16.2" x2="5.6" y2="18.4" />
      <path d="M12 12l9 3l-4 2l-2 4l-3 -9" />
    </svg>
  );
  return <Icon rev={""} component={clickIconSvg}></Icon>;
};

const UserCheckIconSvg = ({ size, color }) => {
  const userCheckIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-user-check"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 11l2 2l4 -4" />
    </svg>
  );
  return <Icon rev={""} component={userCheckIconSvg}></Icon>;
};

const CirclePlusIconSvg = ({ size, color }) => {
  const circlePlusIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-circle-plus"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="12" cy="12" r="9" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="12" y1="9" x2="12" y2="15" />
    </svg>
  );
  return <Icon rev={""} component={circlePlusIconSvg}></Icon>;
};

const UploadIconSvg = ({ size, color }) => {
  const uploadIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-upload"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
      <polyline points="7 9 12 4 17 9" />
      <line x1="12" y1="4" x2="12" y2="16" />
    </svg>
  );
  return <Icon rev={""} component={uploadIconSvg}></Icon>;
};

const RightIconSvg = ({ size, color }) => {
  const rightIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-chevron-right"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="9 6 15 12 9 18" />
    </svg>
  );
  return <Icon rev={""} component={rightIconSvg}></Icon>;
};

const LeftIconSvg = ({ size, color }) => {
  const leftIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-chevron-left"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="15 6 9 12 15 18" />
    </svg>
  );
  return <Icon rev={""} component={leftIconSvg}></Icon>;
};

const CircleCheckIconSvg = ({ size, color }) => {
  const circleCheckIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-circle-check"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12l2 2l4 -4" />
    </svg>
  );
  return <Icon rev={""} component={circleCheckIconSvg}></Icon>;
};

const LogoutIconSvg = ({ size, color }) => {
  const logoutIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-logout"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
      <path d="M7 12h14l-3 -3m0 6l3 -3" />
    </svg>
  );
  return <Icon rev={""} component={logoutIconSvg}></Icon>;
};

const ClipboardListIconSvg = ({ size, color }) => {
  const clipboardListIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-clipboard-list"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="2" />
      <line x1="9" y1="12" x2="9.01" y2="12" />
      <line x1="13" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="9.01" y2="16" />
      <line x1="13" y1="16" x2="15" y2="16" />
    </svg>
  );
  return <Icon rev={""} component={clipboardListIconSvg}></Icon>;
};

const SettingsIconSvg = ({ size, color }) => {
  const settingsIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-settings"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
  return <Icon rev={""} component={settingsIconSvg}></Icon>;
};

const EyeCheckIconSvg = ({ size, color }) => {
  const eyeCheckIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-eye-check"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 19c-4 0 -7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7c-.42 .736 -.858 1.414 -1.311 2.033" />
      <path d="M15 19l2 2l4 -4" />
    </svg>
  );
  return <Icon rev={""} component={eyeCheckIconSvg}></Icon>;
};

const EyeIconSvg = ({ size, color }) => {
  const eyeIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-eye"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
    </svg>
  );
  return <Icon rev={""} component={eyeIconSvg}></Icon>;
};

const FoldersIconSvg = ({ size, color }) => {
  const foldersIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-folders"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 4h3l2 2h5a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
      <path d="M17 17v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h2" />
    </svg>
  );
  return <Icon rev={""} component={foldersIconSvg}></Icon>;
};

const EditSquareIconSvg = ({ size, color }) => {
  const editSquareIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-edit"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
      <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
      <line x1="16" y1="5" x2="19" y2="8" />
    </svg>
  );
  return <Icon rev={""} component={editSquareIconSvg}></Icon>;
};
const AlertCircleIconSvg = ({ size, color }) => {
  const alertCircleIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-alert-circle"
      width={size ? size : 24}
      height={size ? size : 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#BF4A40"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  );
  return <Icon rev={""} component={alertCircleIconSvg}></Icon>;
};

const PaperclipIconSvg = ({ size, color }) => {
  const paperclipIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-paperclip"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5" />
    </svg>
  );
  return <Icon rev={""} component={paperclipIconSvg}></Icon>;
};

const WritingIconSvg = ({ size, color }) => {
  const writingIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-writing"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z" />
      <path d="M16 7h4" />
      <path d="M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3" />
    </svg>
  );
  return <Icon rev={""} component={writingIconSvg}></Icon>;
};

const CutIconSvg = ({ size, color }) => {
  const cutIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-cut"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M9.15 14.85l8.85 -10.85" />
      <path d="M6 4l8.85 10.85" />
    </svg>
  );
  return <Icon rev={""} component={cutIconSvg}></Icon>;
};

const BellRingingIconSvg = ({ size, color }) => {
  const bellRingingIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-bell-ringing"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
      <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
      <path d="M21 6.727a11.05 11.05 0 0 0 -2.794 -3.727" />
      <path d="M3 6.727a11.05 11.05 0 0 1 2.792 -3.727" />
    </svg>
  );
  return <Icon rev={""} component={bellRingingIconSvg}></Icon>;
};
const FileImportIconSvg = ({ size, color }) => {
  const fileImportIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M9.33203 2V4.66667C9.33203 5.03486 9.63051 5.33333 9.9987 5.33333H12.6654"
        stroke="#35763B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.58203 8.66667C2.58203 9.08088 2.91782 9.41667 3.33203 9.41667C3.74624 9.41667 4.08203 9.08088 4.08203 8.66667H2.58203ZM9.33203 2L9.86236 1.46967C9.72171 1.32902 9.53094 1.25 9.33203 1.25V2ZM12.6654 5.33333H13.4154C13.4154 5.13442 13.3363 4.94366 13.1957 4.803L12.6654 5.33333ZM7.66536 13.25C7.25115 13.25 6.91536 13.5858 6.91536 14C6.91536 14.4142 7.25115 14.75 7.66536 14.75V13.25ZM1.33203 11.9167C0.917818 11.9167 0.582031 12.2525 0.582031 12.6667C0.582031 13.0809 0.917818 13.4167 1.33203 13.4167V11.9167ZM5.9987 13.4167C6.41291 13.4167 6.7487 13.0809 6.7487 12.6667C6.7487 12.2525 6.41291 11.9167 5.9987 11.9167V13.4167ZM4.52903 10.1363C4.23613 9.84344 3.76126 9.84344 3.46837 10.1363C3.17547 10.4292 3.17547 10.9041 3.46837 11.197L4.52903 10.1363ZM5.9987 12.6667L6.52903 13.197C6.82192 12.9041 6.82192 12.4292 6.52903 12.1363L5.9987 12.6667ZM3.46837 14.1363C3.17547 14.4292 3.17547 14.9041 3.46837 15.197C3.76126 15.4899 4.23613 15.4899 4.52903 15.197L3.46837 14.1363ZM4.08203 8.66667V3.33333H2.58203V8.66667H4.08203ZM4.08203 3.33333C4.08203 3.01117 4.3432 2.75 4.66536 2.75V1.25C3.51477 1.25 2.58203 2.18274 2.58203 3.33333H4.08203ZM4.66536 2.75H9.33203V1.25H4.66536V2.75ZM8.8017 2.53033L12.135 5.86366L13.1957 4.803L9.86236 1.46967L8.8017 2.53033ZM11.9154 5.33333V12.6667H13.4154V5.33333H11.9154ZM11.9154 12.6667C11.9154 12.9888 11.6542 13.25 11.332 13.25V14.75C12.4826 14.75 13.4154 13.8173 13.4154 12.6667H11.9154ZM11.332 13.25H7.66536V14.75H11.332V13.25ZM1.33203 13.4167H5.9987V11.9167H1.33203V13.4167ZM3.46837 11.197L5.46837 13.197L6.52903 12.1363L4.52903 10.1363L3.46837 11.197ZM5.46837 12.1363L3.46837 14.1363L4.52903 15.197L6.52903 13.197L5.46837 12.1363Z"
        fill="#35763B"
      />
    </svg>
  );
  return <Icon rev={""} component={fileImportIconSvg}></Icon>;
};

const SquareCheckIconSvg = ({ size, color }) => {
  const squareCheckIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-square-check"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
      <path d="M9 12l2 2l4 -4" />
    </svg>
  );
  return <Icon rev={""} component={squareCheckIconSvg}></Icon>;
};

const ArrowNarrowRightIconSvg = ({ size, color }) => {
  const arrowNarrowRightIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-arrow-narrow-right"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l14 0" />
      <path d="M15 16l4 -4" />
      <path d="M15 8l4 4" />
    </svg>
  );
  return <Icon rev={""} component={arrowNarrowRightIconSvg}></Icon>;
};

const ArrowLeftIconSvg = ({ size, color }) => {
  const arrowLeftIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-arrow-left"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l14 0" />
      <path d="M5 12l6 6" />
      <path d="M5 12l6 -6" />
    </svg>
  );
  return <Icon rev={""} component={arrowLeftIconSvg}></Icon>;
};

const CalendarEventIconSvg = ({ size, color }) => {
  const calendarEventIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-calendar-event"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
      <path d="M16 3l0 4" />
      <path d="M8 3l0 4" />
      <path d="M4 11l16 0" />
      <path d="M8 15h2v2h-2z" />
    </svg>
  );
  return <Icon rev={""} component={calendarEventIconSvg}></Icon>;
};

const FileDownloadIconSvg = ({ size, color }) => {
  const fileDownloadIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-file-download"
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ? color : "#4D4D4D"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
      <path d="M12 17v-6" />
      <path d="M9.5 14.5l2.5 2.5l2.5 -2.5" />
    </svg>
  );
  return <Icon rev={""} component={fileDownloadIconSvg}></Icon>;
};

const KehadiranCompanyIconSvg = ({ size, color }) => {
  const kehadiranCompanyIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
    >
      <path
        d="M7.66667 9.41537C8.08088 9.41537 8.41667 9.07958 8.41667 8.66536C8.41667 8.25115 8.08088 7.91536 7.66667 7.91536V9.41537ZM7.66667 14.7487C8.08088 14.7487 8.41667 14.4129 8.41667 13.9987C8.41667 13.5845 8.08088 13.2487 7.66667 13.2487V14.7487ZM14.2254 9.16564C14.5017 8.85703 14.4755 8.38288 14.1669 8.10659C13.8583 7.8303 13.3842 7.85649 13.1079 8.16509L14.2254 9.16564ZM11.4206 11.1742L10.8618 10.6739L11.4206 11.1742ZM7.57945 11.1741L8.13822 10.6739H8.13822L7.57945 11.1741ZM7.55877 10.0267C7.28248 9.71807 6.80833 9.69187 6.49973 9.96817C6.19113 10.2445 6.16493 10.7186 6.44123 11.0272L7.55877 10.0267ZM7.58333 3.9987C7.58333 5.05724 6.72521 5.91536 5.66667 5.91536V7.41536C7.55364 7.41536 9.08333 5.88567 9.08333 3.9987H7.58333ZM5.66667 5.91536C4.60812 5.91536 3.75 5.05724 3.75 3.9987H2.25C2.25 5.88567 3.77969 7.41536 5.66667 7.41536V5.91536ZM3.75 3.9987C3.75 2.94015 4.60812 2.08203 5.66667 2.08203V0.582031C3.77969 0.582031 2.25 2.11172 2.25 3.9987H3.75ZM5.66667 2.08203C6.72521 2.08203 7.58333 2.94015 7.58333 3.9987H9.08333C9.08333 2.11172 7.55364 0.582031 5.66667 0.582031V2.08203ZM3.66667 9.41537H7.66667V7.91536H3.66667V9.41537ZM7.66667 13.2487H3.66667V14.7487H7.66667V13.2487ZM3.66667 13.2487C2.60812 13.2487 1.75 12.3906 1.75 11.332H0.25C0.25 13.219 1.77969 14.7487 3.66667 14.7487V13.2487ZM3.66667 7.91536C1.77969 7.91536 0.25 9.44506 0.25 11.332H1.75C1.75 10.2735 2.60812 9.41537 3.66667 9.41537V7.91536ZM13.1079 8.16509L10.8618 10.6739L11.9793 11.6744L14.2254 9.16564L13.1079 8.16509ZM8.13822 10.6739L7.55877 10.0267L6.44123 11.0272L7.02067 11.6744L8.13822 10.6739ZM10.8618 10.6739C10.4016 11.1879 10.1087 11.5123 9.86349 11.7184C9.63689 11.9089 9.54576 11.9154 9.5 11.9154V13.4154C10.0397 13.4154 10.4638 13.1733 10.8286 12.8667C11.1748 12.5757 11.5495 12.1546 11.9793 11.6744L10.8618 10.6739ZM7.02067 11.6744C7.45054 12.1546 7.82522 12.5757 8.17138 12.8667C8.53617 13.1733 8.96029 13.4154 9.5 13.4154V11.9154C9.45424 11.9154 9.36311 11.9089 9.13651 11.7184C8.89128 11.5123 8.59841 11.1879 8.13822 10.6739L7.02067 11.6744Z"
        fill="#35763B"
      />
    </svg>
  );
  return <Icon rev={""} component={kehadiranCompanyIconSvg}></Icon>;
};
const ProyekCompanyIconSvg = ({ size, color }) => {
  const proyekCompanyIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
    >
      <path
        d="M2.37405 14.0314L2.66794 13.6269L2.37405 14.0314ZM1.63661 13.2939L2.04112 13L1.63661 13.2939ZM12.3634 13.2939L11.9589 13L12.3634 13.2939ZM11.626 14.0314L11.3321 13.6269L11.626 14.0314ZM11.626 3.30458L11.3321 3.70909L11.626 3.30458ZM12.3634 4.04202L11.9589 4.33591L12.3634 4.04202ZM2.37405 3.30458L2.66794 3.70909L2.37405 3.30458ZM1.63661 4.04202L2.04112 4.33591L1.63661 4.04202ZM9.36343 0.831114L9.20892 1.30664L9.36343 0.831114ZM11.5036 2.97125L11.028 3.12575V3.12575L11.5036 2.97125ZM4.63665 0.831114L4.79115 1.30664L4.63665 0.831114ZM2.49651 2.97125L2.97204 3.12575L2.49651 2.97125ZM11.5796 3.27176L11.2954 3.68314L11.5796 3.27176ZM4.33333 10.168C4.05719 10.168 3.83333 10.3918 3.83333 10.668C3.83333 10.9441 4.05719 11.168 4.33333 11.168V10.168ZM9.66667 11.168C9.94281 11.168 10.1667 10.9441 10.1667 10.668C10.1667 10.3918 9.94281 10.168 9.66667 10.168V11.168ZM7 14.168C5.73895 14.168 4.83333 14.1673 4.13203 14.0913C3.44009 14.0163 3.00661 13.8729 2.66794 13.6269L2.08016 14.4359C2.61771 14.8264 3.24729 15.0013 4.02432 15.0855C4.79198 15.1687 5.76123 15.168 7 15.168V14.168ZM0.5 8.66797C0.5 9.90674 0.499314 10.876 0.582485 11.6437C0.666671 12.4207 0.841549 13.0503 1.2321 13.5878L2.04112 13C1.79506 12.6614 1.65163 12.2279 1.57667 11.5359C1.50069 10.8346 1.5 9.92902 1.5 8.66797H0.5ZM2.66794 13.6269C2.42741 13.4521 2.21588 13.2406 2.04112 13L1.2321 13.5878C1.46854 13.9132 1.75473 14.1994 2.08016 14.4359L2.66794 13.6269ZM12.5 8.66797C12.5 9.92902 12.4993 10.8346 12.4233 11.5359C12.3484 12.2279 12.2049 12.6614 11.9589 13L12.7679 13.5878C13.1585 13.0503 13.3333 12.4207 13.4175 11.6437C13.5007 10.876 13.5 9.90674 13.5 8.66797H12.5ZM7 15.168C8.23877 15.168 9.20802 15.1687 9.97568 15.0855C10.7527 15.0013 11.3823 14.8264 11.9198 14.4359L11.3321 13.6269C10.9934 13.8729 10.5599 14.0163 9.86797 14.0913C9.16667 14.1673 8.26105 14.168 7 14.168V15.168ZM11.9589 13C11.7841 13.2406 11.5726 13.4521 11.3321 13.6269L11.9198 14.4359C12.2453 14.1994 12.5315 13.9132 12.7679 13.5878L11.9589 13ZM13.5 8.66797C13.5 7.4292 13.5007 6.45995 13.4175 5.69229C13.3333 4.91526 13.1585 4.28567 12.7679 3.74813L11.9589 4.33591C12.2049 4.67458 12.3484 5.10806 12.4233 5.8C12.4993 6.5013 12.5 7.40692 12.5 8.66797H13.5ZM11.3321 3.70909C11.5726 3.88385 11.7841 4.09538 11.9589 4.33591L12.7679 3.74813C12.5315 3.4227 12.2453 3.13651 11.9198 2.90007L11.3321 3.70909ZM1.5 8.66797C1.5 7.40692 1.50069 6.5013 1.57667 5.8C1.65163 5.10806 1.79506 4.67458 2.04112 4.33591L1.2321 3.74813C0.841549 4.28567 0.666671 4.91526 0.582485 5.69229C0.499314 6.45995 0.5 7.4292 0.5 8.66797H1.5ZM2.08016 2.90007C1.75473 3.13651 1.46854 3.4227 1.2321 3.74813L2.04112 4.33591C2.21588 4.09538 2.42741 3.88385 2.66794 3.70909L2.08016 2.90007ZM7.00004 1.16797C8.27981 1.16797 8.80111 1.17414 9.20892 1.30664L9.51793 0.355585C8.92153 0.1618 8.20197 0.167969 7.00004 0.167969V1.16797ZM9.20892 1.30664C10.0715 1.58691 10.7478 2.26318 11.028 3.12575L11.9791 2.81674C11.5999 1.64973 10.6849 0.734771 9.51793 0.355585L9.20892 1.30664ZM7.00004 0.167969C5.7981 0.167969 5.07855 0.1618 4.48214 0.355585L4.79115 1.30664C5.19896 1.17414 5.72026 1.16797 7.00004 1.16797V0.167969ZM4.48214 0.355585C3.31512 0.734771 2.40017 1.64972 2.02099 2.81674L2.97204 3.12575C3.25231 2.26318 3.92858 1.58691 4.79115 1.30664L4.48214 0.355585ZM2.91165 3.36508C2.92841 3.27695 2.9484 3.19852 2.97204 3.12575L2.02099 2.81674C1.98302 2.93358 1.95303 3.0532 1.92925 3.17832L2.91165 3.36508ZM7 2.16797C5.78254 2.16797 4.82581 2.16734 4.06545 2.2461C3.29735 2.32565 2.67143 2.49064 2.13627 2.86031L2.70463 3.68309C3.04347 3.44903 3.47931 3.31215 4.16848 3.24077C4.86539 3.16859 5.76144 3.16797 7 3.16797V2.16797ZM2.13627 2.86031C2.11742 2.87334 2.09871 2.88659 2.08016 2.90007L2.66794 3.70909C2.68009 3.70026 2.69232 3.6916 2.70463 3.68309L2.13627 2.86031ZM12.0708 3.17839C12.047 3.05324 12.0171 2.9336 11.9791 2.81674L11.028 3.12575C11.0517 3.19854 11.0717 3.27698 11.0884 3.36513L12.0708 3.17839ZM7 3.16797C8.2386 3.16797 9.13467 3.16859 9.83159 3.24078C10.5208 3.31217 10.9566 3.44906 11.2954 3.68314L11.8638 2.86038C11.3287 2.49067 10.7027 2.32567 9.93462 2.2461C9.17425 2.16734 8.2175 2.16797 7 2.16797V3.16797ZM11.2954 3.68314C11.3077 3.69163 11.3199 3.70028 11.3321 3.70909L11.9198 2.90007C11.9013 2.88661 11.8827 2.87338 11.8638 2.86038L11.2954 3.68314ZM4.33333 11.168H9.66667V10.168H4.33333V11.168Z"
        fill="#808080"
      />
    </svg>
  );
  return <Icon rev={""} component={proyekCompanyIconSvg}></Icon>;
};

const TautanIconSvg = ({ size, color }) => {
  const tautanIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M6.66797 9.33489C7.10684 9.78281 7.70754 10.0352 8.33464 10.0352C8.96173 10.0352 9.56243 9.78281 10.0013 9.33489L12.668 6.66822C13.5884 5.74775 13.5884 4.25536 12.668 3.33489C11.7475 2.41441 10.2551 2.41441 9.33464 3.33489L9.0013 3.66822"
        stroke="#35763B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.33489 6.66518C8.89601 6.21726 8.29531 5.96484 7.66822 5.96484C7.04113 5.96484 6.44043 6.21726 6.00155 6.66518L3.33489 9.33185C2.41441 10.2523 2.41441 11.7447 3.33489 12.6652C4.25536 13.5857 5.74775 13.5857 6.66822 12.6652L7.00155 12.3319"
        stroke="#35763B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
  return <Icon rev={""} component={tautanIconSvg}></Icon>;
};

const DashboardCompanyIconSvg = () => {
  const dashboardCompanyIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <rect
        x="2.66406"
        y="2.66797"
        width="4"
        height="3.33333"
        stroke="#35763B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <rect
        x="2.66406"
        y="8.66797"
        width="4"
        height="4.66667"
        stroke="#35763B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <rect
        x="9.33594"
        y="2.66797"
        width="4"
        height="4.66667"
        stroke="#35763B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <rect
        x="9.33594"
        y="10"
        width="4"
        height="3.33333"
        stroke="#35763B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
  return <Icon rev={""} component={dashboardCompanyIconSvg}></Icon>;
};

const NewsIconSvg = ({ size, color }) => {
  const newsIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-news"
      width={size ? size : "8"}
      height={size ? size : "8"}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={color ? color : "#35763B"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11"></path>
      <path d="M8 8l4 0"></path>
      <path d="M8 12l4 0"></path>
      <path d="M8 16l4 0"></path>
    </svg>
  );
  return <Icon rev={""} component={newsIconSvg}></Icon>;
};

const TimelineIconSvg = ({ size, color }) => {
  const timelineIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
    >
      <g clip-path="url(#clip0_18738_30973)">
        <path
          d="M8.0026 1.83398C11.6846 1.83398 14.6693 4.81865 14.6693 8.50065C14.6693 12.1827 11.6846 15.1673 8.0026 15.1673C4.3206 15.1673 1.33594 12.1827 1.33594 8.50065C1.33594 4.81865 4.3206 1.83398 8.0026 1.83398ZM8.0026 3.16732C6.58812 3.16732 5.23156 3.72922 4.23137 4.72941C3.23117 5.72961 2.66927 7.08616 2.66927 8.50065C2.66927 9.91514 3.23117 11.2717 4.23137 12.2719C5.23156 13.2721 6.58812 13.834 8.0026 13.834C9.41709 13.834 10.7736 13.2721 11.7738 12.2719C12.774 11.2717 13.3359 9.91514 13.3359 8.50065C13.3359 7.08616 12.774 5.72961 11.7738 4.72941C10.7736 3.72922 9.41709 3.16732 8.0026 3.16732ZM8.0026 4.50065C8.16589 4.50067 8.3235 4.56062 8.44552 4.66913C8.56754 4.77763 8.6455 4.92715 8.6646 5.08932L8.66927 5.16732V8.22465L10.4739 10.0293C10.5935 10.1493 10.6629 10.3103 10.6681 10.4796C10.6733 10.6489 10.6138 10.8138 10.5018 10.9408C10.3897 11.0679 10.2336 11.1475 10.065 11.1636C9.89634 11.1796 9.72793 11.1309 9.59394 11.0273L9.53127 10.972L7.53127 8.97198C7.42766 8.86828 7.36111 8.73332 7.34194 8.58798L7.33594 8.50065V5.16732C7.33594 4.99051 7.40618 4.82094 7.5312 4.69591C7.65622 4.57089 7.82579 4.50065 8.0026 4.50065Z"
          fill="#808080"
        />
      </g>
      <defs>
        <clipPath id="clip0_18738_30973">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
  return <Icon rev={""} component={timelineIconSvg}></Icon>;
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
  ClockXIconSvg,
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
  LayoutGridSvg,
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
  ClipboardIconSvg,
  UsersIconSvg,
  DownloadIconSvg,
  DownloadIcon2Svg,
  OneUserIconSvg,
  ListSearchIconSvg,
  MailForwardIconSvg,
  TrendingUpIconSvg,
  InfoSquareIconSvg,
  BriefcaseIconSvg,
  ClickIconSvg,
  UserCheckIconSvg,
  CirclePlusIconSvg,
  UploadIconSvg,
  RightIconSvg,
  LeftIconSvg,
  CircleCheckIconSvg,
  LogoutIconSvg,
  ClipboardListIconSvg,
  SettingsIconSvg,
  EyeCheckIconSvg,
  EyeIconSvg,
  FoldersIconSvg,
  EditSquareIconSvg,
  KatalogIconSvg,
  PakaiInternalIconSvg,
  PakaiSewaIconSvg,
  TersediaIconSvg,
  ReplacementIconSvg,
  PeriodeIconSvg,
  LuarPeriodeIconSvg,
  EditTablerIconSvg,
  DeleteTablerIconSvg,
  AlertCircleIconSvg,
  PaperclipIconSvg,
  WritingIconSvg,
  CutIconSvg,
  BellRingingIconSvg,
  SquareCheckIconSvg,
  ArrowNarrowRightIconSvg,
  FileImportIconSvg,
  ArrowLeftIconSvg,
  CalendarEventIconSvg,
  FileDownloadIconSvg,
  ProyekCompanyIconSvg,
  KehadiranCompanyIconSvg,
  TautanIconSvg,
  DashboardCompanyIconSvg,
  NewsIconSvg,
  UpIconSvg,
  TimelineIconSvg,
  TableImportIconSvg,
};
