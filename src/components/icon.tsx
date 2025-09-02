import Icon from "@ant-design/icons";

const DashboardIconSvg = (props) => {
  const dashboardIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-home-2"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
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
  return <Icon rev={""} component={dashboardIconSvg} {...props}></Icon>;
};
const TicketIconSvg = (props) => {
  const ticketIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-ticket"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
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
  return <Icon rev={""} component={ticketIconSvg} {...props}></Icon>;
};

const TicketFilledIconSvg = (props) => {
  const ticketFilledIconSvg = () => (
    <svg
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.0078 15.003L12.0138 13C12.0138 12.7341 12.1194 12.4791 12.3074 12.2911C12.4954 12.1031 12.7504 11.9975 13.0163 11.9975C13.2821 11.9975 13.5371 12.1031 13.7251 12.2911C13.9131 12.4791 14.0188 12.7341 14.0188 13V14.977C14.0188 15.458 14.0188 15.699 14.1728 15.847C14.3278 15.994 14.5628 15.984 15.0358 15.964C16.8988 15.885 18.0438 15.634 18.8498 14.828C19.6598 14.022 19.9108 12.877 19.9898 11.011C20.0048 10.641 20.0128 10.455 19.9438 10.332C19.8738 10.209 19.5988 10.055 19.0468 9.746C18.7358 9.57266 18.4768 9.31942 18.2965 9.01247C18.1162 8.70552 18.0212 8.35599 18.0212 8C18.0212 7.64401 18.1162 7.29448 18.2965 6.98753C18.4768 6.68058 18.7358 6.42734 19.0468 6.254C19.5988 5.946 19.8748 5.791 19.9438 5.668C20.0128 5.545 20.0048 5.36 19.9888 4.989C19.9108 3.123 19.6588 1.979 18.8498 1.172C17.9728 0.296 16.6948 0.0750001 14.5278 0.0190001C14.4614 0.0172639 14.3954 0.0288362 14.3336 0.0530343C14.2718 0.0772324 14.2154 0.113566 14.1679 0.159891C14.1204 0.206215 14.0826 0.261593 14.0568 0.322755C14.031 0.383917 14.0177 0.449624 14.0178 0.516V3C14.0178 3.26588 13.9121 3.52087 13.7241 3.70887C13.5361 3.89688 13.2811 4.0025 13.0153 4.0025C12.7494 4.0025 12.4944 3.89688 12.3064 3.70887C12.1184 3.52087 12.0128 3.26588 12.0128 3L12.0058 0.499C12.0055 0.366565 11.9527 0.239645 11.859 0.146093C11.7652 0.0525409 11.6382 -2.6487e-07 11.5058 0H7.99377C4.21377 0 2.32377 -1.19209e-07 1.14877 1.172C0.338766 1.978 0.0877658 3.123 0.00876582 4.989C-0.00623418 5.359 -0.0142342 5.545 0.0547658 5.668C0.124766 5.791 0.399766 5.946 0.951766 6.254C1.2627 6.42734 1.5217 6.68058 1.70201 6.98753C1.88231 7.29448 1.97738 7.64401 1.97738 8C1.97738 8.35599 1.88231 8.70552 1.70201 9.01247C1.5217 9.31942 1.2627 9.57266 0.951766 9.746C0.399766 10.055 0.123766 10.209 0.0547658 10.332C-0.0142342 10.455 -0.00623425 10.64 0.00976575 11.01C0.0877658 12.877 0.339766 14.022 1.14877 14.828C2.32377 16 4.21377 16 7.99477 16H11.0048C11.4768 16 11.7118 16 11.8588 15.854C12.0058 15.708 12.0068 15.474 12.0078 15.003ZM14.0178 9V7C14.0178 6.73412 13.9121 6.47913 13.7241 6.29113C13.5361 6.10312 13.2811 5.9975 13.0153 5.9975C12.7494 5.9975 12.4944 6.10312 12.3064 6.29113C12.1184 6.47913 12.0128 6.73412 12.0128 7V9C12.0128 9.26601 12.1184 9.52113 12.3065 9.70923C12.4946 9.89733 12.7498 10.003 13.0158 10.003C13.2818 10.003 13.5369 9.89733 13.725 9.70923C13.9131 9.52113 14.0178 9.26601 14.0178 9Z"
        fill={props.color ?? "currentColor"}
      />
    </svg>
  );
  return <Icon rev={""} component={ticketFilledIconSvg} {...props}></Icon>;
};

const TaskIconSvg = (props) => {
  const taskIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-clipboard-check"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
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
  return <Icon rev={""} component={taskIconSvg} {...props}></Icon>;
};

const TaskFilledIconSvg = (props) => {
  const taskFilledIconSvg = () => (
    <svg
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_22402_5177)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15 2C15.3511 2.00001 15.6959 2.09243 16 2.26796C16.304 2.4435 16.5565 2.69597 16.732 3H18C18.5304 3 19.0391 3.21071 19.4142 3.58579C19.7893 3.96086 20 4.46957 20 5V17C20 18.3261 19.4732 19.5979 18.5355 20.5355C17.5979 21.4732 16.3261 22 15 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V5C4 4.46957 4.21071 3.96086 4.58579 3.58579C4.96086 3.21071 5.46957 3 6 3H7.268C7.44353 2.69597 7.696 2.4435 8.00003 2.26796C8.30406 2.09243 8.64894 2.00001 9 2H15ZM14.824 9.379L10.582 13.622L9.167 12.207C8.9784 12.0248 8.7258 11.924 8.4636 11.9263C8.2014 11.9286 7.95059 12.0338 7.76518 12.2192C7.57977 12.4046 7.4746 12.6554 7.47233 12.9176C7.47005 13.1798 7.57084 13.4324 7.753 13.621L9.803 15.672C9.90515 15.7742 10.0264 15.8553 10.1599 15.9106C10.2934 15.9659 10.4365 15.9944 10.581 15.9944C10.7255 15.9944 10.8686 15.9659 11.0021 15.9106C11.1356 15.8553 11.2568 15.7742 11.359 15.672L16.239 10.793C16.3318 10.7001 16.4055 10.5898 16.4557 10.4684C16.5059 10.3471 16.5317 10.217 16.5317 10.0856C16.5317 9.9543 16.5057 9.82424 16.4554 9.70291C16.4051 9.58158 16.3314 9.47134 16.2385 9.3785C16.1456 9.28566 16.0353 9.21202 15.9139 9.1618C15.7926 9.11158 15.6625 9.08575 15.5311 9.0858C15.3998 9.08584 15.2697 9.11176 15.1484 9.16207C15.0271 9.21238 14.9168 9.28609 14.824 9.379ZM14.5 4H9.5C9.38297 3.99996 9.26964 4.04097 9.17974 4.11589C9.08984 4.19081 9.02906 4.29489 9.008 4.41L9 4.5V5.5C8.99996 5.61703 9.04097 5.73036 9.11589 5.82026C9.19081 5.91016 9.29489 5.97094 9.41 5.992L9.5 6H14.5C14.617 6.00004 14.7304 5.95903 14.8203 5.88411C14.9102 5.80919 14.9709 5.70511 14.992 5.59L15 5.5V4.5C15 4.38297 14.959 4.26964 14.8841 4.17974C14.8092 4.08984 14.7051 4.02906 14.59 4.008L14.5 4Z"
          fill={props.color ?? "currentColor"}
        />
      </g>
      <defs>
        <clipPath id="clip0_22402_5177">
          <rect width="24" height="24" fill={props.color ?? "currentColor"} />
        </clipPath>
      </defs>
    </svg>
  );
  return <Icon rev={""} component={taskFilledIconSvg} {...props}></Icon>;
};

const ItemIconSvg = (props) => {
  const itemIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-archive"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
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
  return <Icon rev={""} component={itemIconSvg} {...props}></Icon>;
};
const CompanyIconSvg = (props) => {
  const companyIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-building-skyscraper"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
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
  return <Icon rev={""} component={companyIconSvg} {...props}></Icon>;
};
const UserIconSvg = (props) => {
  const userIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-users"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
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
  return <Icon rev={""} component={userIconSvg} {...props}></Icon>;
};
const FiturIconSvg = (props) => {
  const fiturIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-stack"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
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
  return <Icon rev={""} component={fiturIconSvg} {...props}></Icon>;
};
const AsetIconSvg = (props) => {
  const asetIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-box"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
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
  return <Icon rev={""} component={asetIconSvg} {...props}></Icon>;
};
const KatalogIconSvg = (props) => {
  const katalogIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-tag"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="8.5" cy="8.5" r="1" fill="currentColor" />
      <path d="M4 7v3.859c0 .537 .213 1.052 .593 1.432l8.116 8.116a2.025 2.025 0 0 0 2.864 0l4.834 -4.834a2.025 2.025 0 0 0 0 -2.864l-8.117 -8.116a2.025 2.025 0 0 0 -1.431 -.593h-3.859a3 3 0 0 0 -3 3z" />
    </svg>
  );
  return <Icon rev={""} component={katalogIconSvg} {...props}></Icon>;
};
const PakaiInternalIconSvg = (props) => {
  const pakaiinternalIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-building"
      width={props.size ?? "8"}
      height={props.size ?? "8"}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={pakaiinternalIconSvg} {...props}></Icon>;
};

const PakaiSewaIconSvg = (props) => {
  const pakaisewaIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-user-check"
      width={props.size ?? "8"}
      height={props.size ?? "8"}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={pakaisewaIconSvg} {...props}></Icon>;
};
const TersediaIconSvg = (props) => {
  const tersediaIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-check"
      width={props.size ?? "8"}
      height={props.size ?? "8"}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l5 5l10 -10" />
    </svg>
  );
  return <Icon rev={""} component={tersediaIconSvg} {...props}></Icon>;
};

const SearchIconSvg = (props) => {
  const searchIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-search"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx={10} cy={10} r={7} />
      <line x1={21} y1={21} x2={15} y2={15} />
    </svg>
  );
  return <Icon rev={""} component={searchIconSvg} {...props}></Icon>;
};
const NotifIconSvg = (props) => {
  const notifIconSvg = () => (
    <svg
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      fill={props?.color ?? "currentColor"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.45549 11.88L0.883926 11.3944H0.883926L1.45549 11.88ZM2.33476 9.8385L1.58953 9.75408L2.33476 9.8385ZM15.6652 9.8385L16.4105 9.75408L15.6652 9.8385ZM16.5445 11.88L17.1161 11.3944L16.5445 11.88ZM15.3204 6.79403L14.5751 6.87846V6.87846L15.3204 6.79403ZM2.67964 6.79403L3.42487 6.87846L2.67964 6.79403ZM12.7023 17.2632C12.8477 16.8753 12.6511 16.4431 12.2632 16.2977C11.8753 16.1523 11.4431 16.3489 11.2977 16.7368L12.7023 17.2632ZM6.7023 16.7368C6.55694 16.3489 6.12467 16.1523 5.7368 16.2977C5.34893 16.4431 5.15234 16.8753 5.2977 17.2632L6.7023 16.7368ZM15.1699 14.25H2.83014V15.75H15.1699V14.25ZM14.5751 6.87846L14.92 9.92292L16.4105 9.75408L16.0656 6.70961L14.5751 6.87846ZM3.07999 9.92292L3.42487 6.87846L1.9344 6.70961L1.58953 9.75408L3.07999 9.92292ZM2.02706 12.3657C2.61173 11.6775 2.97775 10.8255 3.07999 9.92292L1.58953 9.75408C1.52038 10.3645 1.2732 10.9363 0.883926 11.3944L2.02706 12.3657ZM14.92 9.92292C15.0223 10.8255 15.3883 11.6775 15.9729 12.3657L17.1161 11.3944C16.7268 10.9363 16.4796 10.3645 16.4105 9.75408L14.92 9.92292ZM2.83014 14.25C1.94335 14.25 1.37926 13.1281 2.02706 12.3657L0.883926 11.3944C-0.535086 13.0647 0.57828 15.75 2.83014 15.75V14.25ZM15.1699 15.75C17.4217 15.75 18.5351 13.0647 17.1161 11.3944L15.9729 12.3657C16.6207 13.1281 16.0567 14.25 15.1699 14.25V15.75ZM16.0656 6.70961C15.6504 3.04473 12.6279 0.25 9 0.25V1.75C11.8302 1.75 14.2419 3.93698 14.5751 6.87846L16.0656 6.70961ZM3.42487 6.87846C3.75808 3.93698 6.16977 1.75 9 1.75V0.25C5.37212 0.25 2.34956 3.04473 1.9344 6.70961L3.42487 6.87846ZM11.2977 16.7368C10.975 17.5979 10.0846 18.25 9 18.25V19.75C10.6855 19.75 12.1516 18.7325 12.7023 17.2632L11.2977 16.7368ZM9 18.25C7.91542 18.25 7.02502 17.5979 6.7023 16.7368L5.2977 17.2632C5.84835 18.7325 7.31452 19.75 9 19.75V18.25Z"
        fill={props?.color ?? "currentColor"}
      />
    </svg>
  );
  return <Icon rev={""} component={notifIconSvg} {...props}></Icon>;
};
const Aset2IconSvg = (props) => {
  const aset2IconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-box"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={aset2IconSvg} {...props}></Icon>;
};

const EditIconSvg = (props) => {
  const editIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-pencil"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
      <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
    </svg>
  );
  return <Icon rev={""} component={editIconSvg} {...props}></Icon>;
};
const EmailIconSvg = (props) => {
  const emailIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-mail"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <rect x={3} y={5} width={18} height={14} rx={2} />
      <polyline points="3 7 12 13 21 7" />
    </svg>
  );
  return <Icon rev={""} component={emailIconSvg} {...props}></Icon>;
};
const PhoneIconSvg = (props) => {
  const phoneIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-phone"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
    </svg>
  );
  return <Icon rev={""} component={phoneIconSvg} {...props}></Icon>;
};
const WebIconSvg = (props) => {
  const webIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-world"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={webIconSvg} {...props}></Icon>;
};
const LocationIconSvg = (props) => {
  const locationIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-building-community"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return (
    <Icon rev={""} id={props.id} component={locationIconSvg} {...props}></Icon>
  );
};
const SubLocationIconSvg = (props) => {
  const sublocationIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-building"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={sublocationIconSvg} {...props}></Icon>;
};
const ShareIconSvg = (props) => {
  const shareIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-share"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth={props.strokeWidth ?? "1.5"}
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={shareIconSvg} {...props}></Icon>;
};
const TrashIconSvg = (props) => {
  const trashIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-trash"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
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
  return <Icon rev={""} component={trashIconSvg} {...props}></Icon>;
};
const CheckIconSvg = (props) => {
  const checkIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-check"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={props?.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l5 5l10 -10" />
    </svg>
  );
  return <Icon rev={""} component={checkIconSvg} {...props}></Icon>;
};
const BackIconSvg = (props) => {
  const backIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-arrow-back-up"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" />
    </svg>
  );
  return <Icon rev={""} component={backIconSvg} {...props}></Icon>;
};
const SortingIconSvg = (props) => {
  const sortingIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-sort-ascending-letters"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={sortingIconSvg} {...props}></Icon>;
};
const DownIconSvg = (props) => {
  const downIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-chevron-down"
      width={props.size ?? "20"}
      height={props.size ?? "20"}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
  return <Icon rev={""} component={downIconSvg} {...props}></Icon>;
};
const UpIconSvg = (props) => {
  const upIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-chevron-up"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M6 15l6 -6l6 6" />
    </svg>
  );
  return <Icon rev={""} component={upIconSvg} {...props}></Icon>;
};
const ExternalLinkIconSvg = (props) => {
  const externallinkIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-external-link"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={externallinkIconSvg} {...props}></Icon>;
};
const CameraIconSvg = (props) => {
  const cameraIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-camera"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
      <circle cx={12} cy={13} r={3} />
    </svg>
  );
  return <Icon rev={""} component={cameraIconSvg} {...props}></Icon>;
};
const RefreshIconSvg = (props) => {
  const refreshIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-refresh"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
      <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
    </svg>
  );
  return <Icon rev={""} component={refreshIconSvg} {...props}></Icon>;
};
const ReplacementIconSvg = (props) => {
  const replacementIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-refresh"
      width={props.size ?? "8"}
      height={props.size ?? "8"}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
      <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
    </svg>
  );
  return <Icon rev={""} component={replacementIconSvg} {...props}></Icon>;
};

const PeriodeIconSvg = (props) => {
  const periodeIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-clock"
      width={props.size ?? "8"}
      height={props.size ?? "8"}
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
  return <Icon rev={""} component={periodeIconSvg} {...props}></Icon>;
};

const LuarPeriodeIconSvg = (props) => {
  const luarperiodeIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-clock-exclamation"
      width={props.size ?? "8"}
      height={props.size ?? "8"}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={luarperiodeIconSvg} {...props}></Icon>;
};
const EditTablerIconSvg = (props) => {
  const edittablerIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-edit"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={edittablerIconSvg} {...props}></Icon>;
};
const DeleteTablerIconSvg = (props) => {
  const deletetablerIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-trash"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth={props.strokeWidth ?? "1.5"}
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={deletetablerIconSvg} {...props}></Icon>;
};

const SquarePlusIconSvg = (props) => {
  const squareplusIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-square-plus"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={squareplusIconSvg} {...props}></Icon>;
};
const NotesIconSvg = (props) => {
  const notesIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-notes"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={notesIconSvg} {...props}></Icon>;
};
const FaxIconSvg = (props) => {
  const faxIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-printer"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={faxIconSvg} {...props}></Icon>;
};
const PkpIconSvg = (props) => {
  const pkpIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-receipt-tax"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={pkpIconSvg} {...props}></Icon>;
};
const AlertIconSvg = (props) => {
  const alertIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-alert-circle"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
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
  return <Icon rev={""} component={alertIconSvg} {...props}></Icon>;
};
const AlerttriangleIconSvg = (props) => {
  const alerttriangleIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-alert-triangle"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 9v2m0 4v.01" />
      <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" />
    </svg>
  );
  return <Icon rev={""} component={alerttriangleIconSvg} {...props}></Icon>;
};
const ClockIconSvg = (props) => {
  const clockIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-clock"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx={12} cy={12} r={9} />
      <polyline points="12 7 12 12 15 15" />
    </svg>
  );
  return <Icon rev={""} component={clockIconSvg} {...props}></Icon>;
};

const ClockIconFilledSvg = (props) => {
  const clockIconFIlledSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-clock"
      width={props.size ?? "20"}
      height={props.size ?? "20"}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={"white"}
      fill={props?.color ?? "currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx={12} cy={12} r={9} />
      <polyline points="12 7 12 12 15 15" />
    </svg>
  );
  return <Icon rev={""} component={clockIconFIlledSvg} {...props}></Icon>;
};

const ClockXIconSvg = (props) => {
  const clockXIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-clock-x"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={clockXIconSvg} {...props}></Icon>;
};

const ClipboardcheckIconSvg = (props) => {
  const clipboardcheckIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-clipboard-check"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
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
  return <Icon rev={""} component={clipboardcheckIconSvg} {...props}></Icon>;
};
const CalendartimeIconSvg = (props) => {
  const calendartimeIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-calendar-time"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={calendartimeIconSvg} {...props}></Icon>;
};
const MappinIconSvg = (props) => {
  const mappinIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-map-pin"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx={12} cy={11} r={3} />
      <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
    </svg>
  );
  return <Icon rev={""} component={mappinIconSvg} {...props}></Icon>;
};
const AlignJustifiedIconSvg = (props) => {
  const alignjustifiedIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-align-justified"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={alignjustifiedIconSvg} {...props}></Icon>;
};
const CheckboxIconSvg = (props) => {
  const checkboxIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-checkbox"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="9 11 12 14 20 6" />
      <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
    </svg>
  );
  return <Icon rev={""} component={checkboxIconSvg} {...props}></Icon>;
};
const BorderAllSvg = (props) => {
  const borderallSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-border-all"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={borderallSvg} {...props}></Icon>;
};
const ListNumbersSvg = (props) => {
  const listnumbersSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-list-numbers"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={listnumbersSvg} {...props}></Icon>;
};
const ListcheckIconSvg = (props) => {
  const listcheckIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-list-check"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={listcheckIconSvg} {...props}></Icon>;
};
const CopyIconSvg = (props) => {
  const copyIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-copy"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <rect x={8} y={8} width={12} height={12} rx={2} />
      <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
    </svg>
  );
  return <Icon rev={""} component={copyIconSvg} {...props}></Icon>;
};
const ArrowsSortIconSvg = (props) => {
  const arrowsSortIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-arrows-sort"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 9l4 -4l4 4m-4 -4v14" />
      <path d="M21 15l-4 4l-4 -4m4 4v-14" />
    </svg>
  );
  return <Icon rev={""} component={arrowsSortIconSvg} {...props}></Icon>;
};
const UsercircleIconSvg = (props) => {
  const usercircleIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-user-circle"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
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
  return <Icon rev={""} component={usercircleIconSvg} {...props}></Icon>;
};
const CircleXIconSvg = (props) => {
  const circlexIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-circle-x"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx={12} cy={12} r={9} />
      <path d="M10 10l4 4m0 -4l-4 4" />
    </svg>
  );
  return <Icon rev={""} component={circlexIconSvg} {...props}></Icon>;
};

const CircleXFilledIconSvg = (props) => {
  const circleXFilledIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      fill={props?.color ?? "currentColor"}
      className="icon icon-tabler icons-tabler-filled icon-tabler-circle-x"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-6.489 5.8a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" />
    </svg>
  );
  return <Icon rev={""} component={circleXFilledIconSvg} {...props}></Icon>;
};

const RulerIconSvg = (props) => {
  const rulerIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-ruler"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={rulerIconSvg} {...props}></Icon>;
};
const UserPlusIconSvg = (props) => {
  const userPlusIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-user-plus"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
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
  return <Icon rev={""} component={userPlusIconSvg} {...props}></Icon>;
};
const SortAscendingIconSvg = (props) => {
  const sortAscendingIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-sort-ascending-letters"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={sortAscendingIconSvg} {...props}></Icon>;
};
const SortDescendingIconSvg = (props) => {
  const sortDescendingIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-sort-descending-letters"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={sortDescendingIconSvg} {...props}></Icon>;
};
const ForbidIconSvg = (props) => {
  const forbidIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-forbid"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx={12} cy={12} r={9} />
      <line x1={9} y1={9} x2={15} y2={15} />
    </svg>
  );
  return <Icon rev={""} component={forbidIconSvg} {...props}></Icon>;
};
const PlayerPauseIconSvg = (props) => {
  const playerPauseIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-player-pause"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <rect x={6} y={5} width={4} height={14} rx={1} />
      <rect x={14} y={5} width={4} height={14} rx={1} />
    </svg>
  );
  return <Icon rev={""} component={playerPauseIconSvg} {...props}></Icon>;
};
const PlayerPlayIconSvg = (props) => {
  const playerPlayIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-player-play"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 4v16l13 -8z" />
    </svg>
  );
  return <Icon rev={""} component={playerPlayIconSvg} {...props}></Icon>;
};
const CloudUploadIconSvg = (props) => {
  const cloudUploadIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-cloud-upload"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={cloudUploadIconSvg} {...props}></Icon>;
};
const PhotoIconSvg = (props) => {
  const photoIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-photo"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={photoIconSvg} {...props}></Icon>;
};
const FileTextIconSvg = (props) => {
  const fileTextIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-file-text"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={fileTextIconSvg} {...props}></Icon>;
};
const SendIconSvg = (props) => {
  const sendIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-send"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1={10} y1={14} x2={21} y2={3} />
      <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
    </svg>
  );
  return <Icon rev={""} component={sendIconSvg} {...props}></Icon>;
};
const LayoutGridSvg = (props) => {
  const layoutGridSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-layout-grid"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={layoutGridSvg} {...props}></Icon>;
};
const LayoutGridAddSvg = (props) => {
  const layoutGridAddSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-layout-grid-add"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={layoutGridAddSvg} {...props}></Icon>;
};
const FilePlusIconSvg = (props) => {
  const filePlusIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-file-plus"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={filePlusIconSvg} {...props}></Icon>;
};
const TableExportIconSvg = (props) => {
  const tableExportIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-table-export"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M11.5 20h-5.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v7.5m-16 -3.5h16m-10 -6v16m4 -1h7m-3 -3l3 3l-3 3" />
    </svg>
  );
  return <Icon rev={""} component={tableExportIconSvg} {...props}></Icon>;
};

const TableImportIconSvg = (props) => {
  const tableImportIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-table-import"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={tableImportIconSvg} {...props}></Icon>;
};

const FileExportIconSvg = (props) => {
  const fileExportIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-file-export"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3" />
    </svg>
  );
  return <Icon rev={""} component={fileExportIconSvg} {...props}></Icon>;
};
const DotsIconSvg = (props) => {
  const dotsIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-dots"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={dotsIconSvg} {...props}></Icon>;
};
const UserSearchIconSvg = (props) => {
  const userSearchIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-user-search"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={userSearchIconSvg} {...props}></Icon>;
};
const InfoCircleIconSvg = (props) => {
  const infoCircleIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-info-circle"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
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
  return <Icon rev={""} component={infoCircleIconSvg} {...props}></Icon>;
};

const InfoCircleFilledIconSvg = (props) => {
  const infoCircleFilledIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      fill={props?.color ?? "currentColor"}
      className="icon icon-tabler icons-tabler-filled icon-tabler-info-circle"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm0 9h-1l-.117 .007a1 1 0 0 0 0 1.986l.117 .007v3l.007 .117a1 1 0 0 0 .876 .876l.117 .007h1l.117 -.007a1 1 0 0 0 .876 -.876l.007 -.117l-.007 -.117a1 1 0 0 0 -.764 -.857l-.112 -.02l-.117 -.006v-3l-.007 -.117a1 1 0 0 0 -.876 -.876l-.117 -.007zm.01 -3l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z" />
    </svg>
  );
  return <Icon rev={""} component={infoCircleFilledIconSvg} {...props}></Icon>;
};

const PlusIconSvg = (props) => {
  const plusIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-plus"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1={12} y1={5} x2={12} y2={19} />
      <line x1={5} y1={12} x2={19} y2={12} />
    </svg>
  );
  return <Icon rev={""} component={plusIconSvg} {...props}></Icon>;
};
const XIconSvg = (props) => {
  const xIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-x"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1={18} y1={6} x2={6} y2={18} />
      <line x1={6} y1={6} x2={18} y2={18} />
    </svg>
  );
  return <Icon rev={""} component={xIconSvg} {...props}></Icon>;
};
const HistoryIconSvg = (props) => {
  const historyIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-history"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth={props?.strokeWidth ?? "1.5"}
      stroke={props?.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="12 8 12 12 14 14" />
      <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
    </svg>
  );
  return <Icon rev={""} component={historyIconSvg} {...props}></Icon>;
};
const AdjusmentsHorizontalIconSvg = (props) => {
  const adjusmentsHorizontalIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-adjustments-horizontal"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return (
    <Icon rev={""} component={adjusmentsHorizontalIconSvg} {...props}></Icon>
  );
};
const ArmChairlIconSvg = (props) => {
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
  return <Icon rev={""} component={armChairlIconSvg} {...props}></Icon>;
};
const AssetIconSvg = (props) => {
  const assetIconSvg = () => (
    <svg
      width={props.size ?? 24}
      height={props.size ?? 24}
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
  return <Icon rev={""} component={assetIconSvg} {...props}></Icon>;
};
const MoveIconSvg = (props) => {
  const moveIconSvg = () => (
    <svg
      width={props.size ?? 24}
      height={props.size ?? 24}
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
  return <Icon rev={""} component={moveIconSvg} {...props}></Icon>;
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
  return (
    <Icon
      rev={""}
      component={svgbroadcast}
      style={{ marginRight: `0.5rem` }}
      {...props}
    />
  );
};

const ResumeIconSvg = (props) => {
  const resumeIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-file-text"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
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
  return <Icon rev={""} component={resumeIconSvg} {...props}></Icon>;
};

const ClipboardIconSvg = (props) => {
  const clipboardIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-clipboard"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
      fill="none"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="2" />
    </svg>
  );
  return <Icon rev={""} component={clipboardIconSvg} {...props}></Icon>;
};

const UsersIconSvg = (props) => {
  const usersIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-users"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
      fill="none"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
    </svg>
  );
  return <Icon rev={""} component={usersIconSvg} {...props}></Icon>;
};

const UsersFilledIconSvg = (props) => {
  const usersFilledIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-users"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
      fill={props?.color ?? "currentColor"}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
    </svg>
  );
  return <Icon rev={""} component={usersFilledIconSvg} {...props}></Icon>;
};

const DownloadIconSvg = (props) => {
  const downloadIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-download"
      width={props.size ?? "20"}
      height={props.size ?? "20"}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
      fill="none"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
      <polyline points="7 11 12 16 17 11" />
      <line x1="12" y1="4" x2="12" y2="16" />
    </svg>
  );
  return <Icon rev={""} component={downloadIconSvg} {...props}></Icon>;
};

const DownloadIcon2Svg = (props) => {
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
  return <Icon rev={""} component={downloadIcon2Svg} {...props}></Icon>;
};

const OneUserIconSvg = (props) => {
  const oneUserIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-user"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth={props.strokeWidth ?? "1.5"}
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="12" cy="7" r="4" />
      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
    </svg>
  );
  return <Icon rev={""} component={oneUserIconSvg} {...props}></Icon>;
};

const ListSearchIconSvg = (props) => {
  const listSearchIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-list-search"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={listSearchIconSvg} {...props}></Icon>;
};
const MailForwardIconSvg = (props) => {
  const mailForwardIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-mail-forward"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={mailForwardIconSvg} {...props}></Icon>;
};

const TrendingUpIconSvg = (props) => {
  const trendingUpIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-trending-up"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="3 17 9 11 13 15 21 7" />
      <polyline points="14 7 21 7 21 14" />
    </svg>
  );
  return <Icon rev={""} component={trendingUpIconSvg} {...props}></Icon>;
};

const InfoSquareIconSvg = (props) => {
  const infoSquareIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-info-square"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
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
  return <Icon rev={""} component={infoSquareIconSvg} {...props}></Icon>;
};

const BriefcaseIconSvg = (props) => {
  const briefcaseIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-briefcase"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
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
  return <Icon rev={""} component={briefcaseIconSvg} {...props}></Icon>;
};

const ClickIconSvg = (props) => {
  const clickIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-click"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
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
  return <Icon rev={""} component={clickIconSvg} {...props}></Icon>;
};

const UserCheckIconSvg = (props) => {
  const userCheckIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-user-check"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
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
  return <Icon rev={""} component={userCheckIconSvg} {...props}></Icon>;
};

const CirclePlusIconSvg = (props) => {
  const circlePlusIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-circle-plus"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
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
  return <Icon rev={""} component={circlePlusIconSvg} {...props}></Icon>;
};

const UploadIconSvg = (props) => {
  const uploadIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-upload"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={uploadIconSvg} {...props}></Icon>;
};

const RightIconSvg = (props) => {
  const rightIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-chevron-right"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={props?.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="9 6 15 12 9 18" />
    </svg>
  );
  return <Icon rev={""} component={rightIconSvg} {...props}></Icon>;
};

const LeftIconSvg = (props) => {
  const leftIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-chevron-left"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={props?.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="15 6 9 12 15 18" />
    </svg>
  );
  return <Icon rev={""} component={leftIconSvg} {...props}></Icon>;
};

const CircleCheckIconSvg = (props) => {
  const circleCheckIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-circle-check"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12l2 2l4 -4" />
    </svg>
  );
  return <Icon rev={""} component={circleCheckIconSvg} {...props}></Icon>;
};

const CircleCheckFilledIconSvg = (props) => {
  const circleCheckFilledIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      fill={props?.color ?? "currentColor"}
      className="icon icon-tabler icons-tabler-filled icon-tabler-circle-check"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
    </svg>
  );
  return <Icon rev={""} component={circleCheckFilledIconSvg} {...props}></Icon>;
};

const LogoutIconSvg = (props) => {
  const logoutIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-logout"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
      <path d="M7 12h14l-3 -3m0 6l3 -3" />
    </svg>
  );
  return <Icon rev={""} component={logoutIconSvg} {...props}></Icon>;
};

const ClipboardListIconSvg = (props) => {
  const clipboardListIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-clipboard-list"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={clipboardListIconSvg} {...props}></Icon>;
};

const SettingsIconSvg = (props) => {
  const settingsIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-settings"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
  return <Icon rev={""} component={settingsIconSvg} {...props}></Icon>;
};

const EyeCheckIconSvg = (props) => {
  const eyeCheckIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-eye-check"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={eyeCheckIconSvg} {...props}></Icon>;
};

const EyeIconSvg = (props) => {
  const eyeIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-eye"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
    </svg>
  );
  return <Icon rev={""} component={eyeIconSvg} {...props}></Icon>;
};

const FoldersIconSvg = (props) => {
  const foldersIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-folders"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 4h3l2 2h5a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
      <path d="M17 17v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h2" />
    </svg>
  );
  return <Icon rev={""} component={foldersIconSvg} {...props}></Icon>;
};

const EditSquareIconSvg = (props) => {
  const editSquareIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-edit"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={editSquareIconSvg} {...props}></Icon>;
};
const AlertCircleIconSvg = (props) => {
  const alertCircleIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-alert-circle"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={alertCircleIconSvg} {...props}></Icon>;
};

const PaperclipIconSvg = (props) => {
  const paperclipIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-paperclip"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5" />
    </svg>
  );
  return <Icon rev={""} component={paperclipIconSvg} {...props}></Icon>;
};

const WritingIconSvg = (props) => {
  const writingIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-writing"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={writingIconSvg} {...props}></Icon>;
};

const CutIconSvg = (props) => {
  const cutIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-cut"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={cutIconSvg} {...props}></Icon>;
};

const BellRingingIconSvg = (props) => {
  const bellRingingIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-bell-ringing"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={bellRingingIconSvg} {...props}></Icon>;
};

const FileImportIconSvg = (props) => {
  const fileImportIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? 16}
      height={props.size ?? 16}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M9.33203 2V4.66667C9.33203 5.03486 9.63051 5.33333 9.9987 5.33333H12.6654"
        stroke={props?.color ?? "currentColor"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.58203 8.66667C2.58203 9.08088 2.91782 9.41667 3.33203 9.41667C3.74624 9.41667 4.08203 9.08088 4.08203 8.66667H2.58203ZM9.33203 2L9.86236 1.46967C9.72171 1.32902 9.53094 1.25 9.33203 1.25V2ZM12.6654 5.33333H13.4154C13.4154 5.13442 13.3363 4.94366 13.1957 4.803L12.6654 5.33333ZM7.66536 13.25C7.25115 13.25 6.91536 13.5858 6.91536 14C6.91536 14.4142 7.25115 14.75 7.66536 14.75V13.25ZM1.33203 11.9167C0.917818 11.9167 0.582031 12.2525 0.582031 12.6667C0.582031 13.0809 0.917818 13.4167 1.33203 13.4167V11.9167ZM5.9987 13.4167C6.41291 13.4167 6.7487 13.0809 6.7487 12.6667C6.7487 12.2525 6.41291 11.9167 5.9987 11.9167V13.4167ZM4.52903 10.1363C4.23613 9.84344 3.76126 9.84344 3.46837 10.1363C3.17547 10.4292 3.17547 10.9041 3.46837 11.197L4.52903 10.1363ZM5.9987 12.6667L6.52903 13.197C6.82192 12.9041 6.82192 12.4292 6.52903 12.1363L5.9987 12.6667ZM3.46837 14.1363C3.17547 14.4292 3.17547 14.9041 3.46837 15.197C3.76126 15.4899 4.23613 15.4899 4.52903 15.197L3.46837 14.1363ZM4.08203 8.66667V3.33333H2.58203V8.66667H4.08203ZM4.08203 3.33333C4.08203 3.01117 4.3432 2.75 4.66536 2.75V1.25C3.51477 1.25 2.58203 2.18274 2.58203 3.33333H4.08203ZM4.66536 2.75H9.33203V1.25H4.66536V2.75ZM8.8017 2.53033L12.135 5.86366L13.1957 4.803L9.86236 1.46967L8.8017 2.53033ZM11.9154 5.33333V12.6667H13.4154V5.33333H11.9154ZM11.9154 12.6667C11.9154 12.9888 11.6542 13.25 11.332 13.25V14.75C12.4826 14.75 13.4154 13.8173 13.4154 12.6667H11.9154ZM11.332 13.25H7.66536V14.75H11.332V13.25ZM1.33203 13.4167H5.9987V11.9167H1.33203V13.4167ZM3.46837 11.197L5.46837 13.197L6.52903 12.1363L4.52903 10.1363L3.46837 11.197ZM5.46837 12.1363L3.46837 14.1363L4.52903 15.197L6.52903 13.197L5.46837 12.1363Z"
        fill={props?.color ?? "currentColor"}
      />
    </svg>
  );
  return <Icon rev={""} component={fileImportIconSvg} {...props}></Icon>;
};

const SquareCheckIconSvg = (props) => {
  const squareCheckIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-square-check"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
      <path d="M9 12l2 2l4 -4" />
    </svg>
  );
  return <Icon rev={""} component={squareCheckIconSvg} {...props}></Icon>;
};

const ArrowNarrowRightIconSvg = (props) => {
  const arrowNarrowRightIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-arrow-narrow-right"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={arrowNarrowRightIconSvg} {...props}></Icon>;
};

const ArrowLeftIconSvg = (props) => {
  const arrowLeftIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-arrow-left"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={arrowLeftIconSvg} {...props}></Icon>;
};

const ArrowRightIconSvg = (props) => {
  const arrowRightIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l14 0" />
      <path d="M13 18l6 -6" />
      <path d="M13 6l6 6" />
    </svg>
  );
  return <Icon rev={""} component={arrowRightIconSvg} {...props}></Icon>;
};

const CalendarEventIconSvg = (props) => {
  const calendarEventIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-calendar-event"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={calendarEventIconSvg} {...props}></Icon>;
};

const FileDownloadIconSvg = (props) => {
  const fileDownloadIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-file-download"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={fileDownloadIconSvg} {...props}></Icon>;
};

const KehadiranCompanyIconSvg = (props) => {
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
        fill={props?.color ?? "currentColor"}
      />
    </svg>
  );
  return <Icon rev={""} component={kehadiranCompanyIconSvg} {...props}></Icon>;
};
const ProyekCompanyIconSvg = (props) => {
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
        fill={props?.color ?? "currentColor"}
      />
    </svg>
  );
  return <Icon rev={""} component={proyekCompanyIconSvg} {...props}></Icon>;
};

const TautanIconSvg = (props) => {
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
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.33489 6.66518C8.89601 6.21726 8.29531 5.96484 7.66822 5.96484C7.04113 5.96484 6.44043 6.21726 6.00155 6.66518L3.33489 9.33185C2.41441 10.2523 2.41441 11.7447 3.33489 12.6652C4.25536 13.5857 5.74775 13.5857 6.66822 12.6652L7.00155 12.3319"
        stroke="#35763B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  return <Icon rev={""} component={tautanIconSvg} {...props}></Icon>;
};

const DashboardCompanyIconSvg = (props) => {
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
        stroke={props?.color ?? "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="2.66406"
        y="8.66797"
        width="4"
        height="4.66667"
        stroke={props?.color ?? "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="9.33594"
        y="2.66797"
        width="4"
        height="4.66667"
        stroke={props?.color ?? "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="9.33594"
        y="10"
        width="4"
        height="3.33333"
        stroke={props?.color ?? "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  return <Icon rev={""} component={dashboardCompanyIconSvg} {...props}></Icon>;
};

const NewsIconSvg = (props) => {
  const newsIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-news"
      width={props.size ?? "8"}
      height={props.size ?? "8"}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={props.color ?? "currentColor"}
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
  return <Icon rev={""} component={newsIconSvg} {...props}></Icon>;
};

const TimelineIconSvg = (props) => {
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
  return <Icon rev={""} component={timelineIconSvg} {...props}></Icon>;
};

const SchoolIconSvg = (props) => {
  const schoolIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-school"
      width={props.size ?? "8"}
      height={props.size ?? "8"}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
      <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
    </svg>
  );
  return <Icon rev={""} component={schoolIconSvg} {...props}></Icon>;
};

const ArrowUpRightIconSvg = (props) => {
  const arrowUpRightlIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-arrow-up-right"
      width={props.size ?? "8"}
      height={props.size ?? "8"}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17 7l-10 10" />
      <path d="M8 7l9 0l0 9" />
    </svg>
  );
  return <Icon rev={""} component={arrowUpRightlIconSvg} {...props}></Icon>;
};

const BulbIconSvg = (props) => {
  const bulbIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-bulb`}
      width={props.size ?? "8"}
      height={props.size ?? "8"}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
      <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
      <path d="M9.7 17l4.6 0" />
    </svg>
  );
  return <Icon rev={""} component={bulbIconSvg} {...props}></Icon>;
};

const TableOffIconSvg = (props) => {
  const tableOffIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-table-off"
      width={props.size ?? "24"}
      height={props.size ?? "24"}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 3h12a2 2 0 0 1 2 2v12m-.585 3.413a1.994 1.994 0 0 1 -1.415 .587h-14a2 2 0 0 1 -2 -2v-14c0 -.55 .223 -1.05 .583 -1.412" />
      <path d="M3 10h7m4 0h7" />
      <path d="M10 3v3m0 4v11" />
      <path d="M3 3l18 18" />
    </svg>
  );
  return <Icon rev={""} component={tableOffIconSvg} {...props}></Icon>;
};

const UserXIconSvg = (props) => {
  const userXIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-user-x"
      width={props.size ?? "24"}
      height={props.size ?? "24"}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
      <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5" />
      <path d="M22 22l-5 -5" />
      <path d="M17 22l5 -5" />
    </svg>
  );
  return <Icon rev={""} component={userXIconSvg} {...props}></Icon>;
};

const AddCareerIconSvg = (props) => {
  const addCareerIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-clipboard-plus"
      width={props.size ?? "36"}
      height={props.size ?? "36"}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
      <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
      <path d="M10 14h4" />
      <path d="M12 12v4" />
    </svg>
  );
  return <Icon rev={""} component={addCareerIconSvg} {...props}></Icon>;
};

const ShowCareerIconSvg = (props) => {
  const showCareerIconSvg = () => (
    <svg
      width={props.size ?? "36"}
      height={props.size ?? "36"}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5 7.5H10.5C8.84315 7.5 7.5 8.84315 7.5 10.5V28.5C7.5 30.1569 8.84315 31.5 10.5 31.5H25.5C27.1569 31.5 28.5 30.1569 28.5 28.5V10.5C28.5 8.84315 27.1569 7.5 25.5 7.5H22.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="13.5"
        y="4.5"
        width="9"
        height="6"
        rx="2"
        stroke={props.color ?? "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.9975 21.0014H22.3881C22.6577 21.0015 22.9008 21.2045 23.0039 21.5159C23.1071 21.8272 23.0501 22.1856 22.8595 22.4239L18.4688 27.9123C18.2085 28.2376 17.7865 28.2376 17.5261 27.9123L13.1355 22.4239C12.9449 22.1856 12.8879 21.8272 12.991 21.5159C13.0942 21.2045 13.3372 21.0015 13.6068 21.0014H15.9975V18.5014H19.9975V21.0014Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 13.5013H16"
        stroke={props.color ?? "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 16.0013H16"
        stroke={props.color ?? "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  return <Icon rev={""} component={showCareerIconSvg} {...props}></Icon>;
};

const PinFilledIconSvg = (props) => {
  const pinFilledIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-pin-filled"
      width={props.size ?? "24"}
      height={props.size ?? "24"}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M15.113 3.21l.094 .083l5.5 5.5a1 1 0 0 1 -1.175 1.59l-3.172 3.171l-1.424 3.797a1 1 0 0 1 -.158 .277l-.07 .08l-1.5 1.5a1 1 0 0 1 -1.32 .082l-.095 -.083l-2.793 -2.792l-3.793 3.792a1 1 0 0 1 -1.497 -1.32l.083 -.094l3.792 -3.793l-2.792 -2.793a1 1 0 0 1 -.083 -1.32l.083 -.094l1.5 -1.5a1 1 0 0 1 .258 -.187l.098 -.042l3.796 -1.425l3.171 -3.17a1 1 0 0 1 1.497 -1.26z"
        strokeWidth="0"
        fill={props.color ?? "currentColor"}
      />
    </svg>
  );
  return <Icon rev={""} component={pinFilledIconSvg} {...props}></Icon>;
};

const ArchivedIconSvg = (props) => {
  const archivedIconSvg = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.79844 3.60156C3.47295 3.60156 2.39844 4.67608 2.39844 6.00156C2.39844 7.32705 3.47295 8.40156 4.79844 8.40156H19.1984C20.5239 8.40156 21.5984 7.32705 21.5984 6.00156C21.5984 4.67608 20.5239 3.60156 19.1984 3.60156H4.79844Z"
        fill="#585858"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.59844 9.60156H20.3984V18.0016C20.3984 19.327 19.3239 20.4016 17.9984 20.4016H5.99844C4.67295 20.4016 3.59844 19.327 3.59844 18.0016V9.60156ZM9.59844 13.2016C9.59844 12.5388 10.1357 12.0016 10.7984 12.0016H13.1984C13.8612 12.0016 14.3984 12.5388 14.3984 13.2016C14.3984 13.8643 13.8612 14.4016 13.1984 14.4016H10.7984C10.1357 14.4016 9.59844 13.8643 9.59844 13.2016Z"
        fill="#585858"
      />
    </svg>
  );
  return <Icon rev={""} component={archivedIconSvg} {...props}></Icon>;
};

const WorkIconSvg = (props) => {
  const workIconSvg = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="work">
        <path
          id="Vector"
          d="M20 6.5H16V4.5C16 3.39 15.11 2.5 14 2.5H10C8.89 2.5 8 3.39 8 4.5V6.5H4C2.89 6.5 2.01 7.39 2.01 8.5L2 19.5C2 20.61 2.89 21.5 4 21.5H20C21.11 21.5 22 20.61 22 19.5V8.5C22 7.39 21.11 6.5 20 6.5ZM14 6.5H10V4.5H14V6.5Z"
          fill="#585858"
        />
      </g>
    </svg>
  );
  return <Icon rev={""} component={workIconSvg} {...props}></Icon>;
};

const AccessTimeIconSvg = (props) => {
  const accessTimeIconSvg = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="access_time_filled">
        <path
          id="Vector"
          d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM15.29 16.71L11 12.41V7H13V11.59L16.71 15.3L15.29 16.71Z"
          fill="#585858"
        />
      </g>
    </svg>
  );
  return <Icon rev={""} component={accessTimeIconSvg} {...props}></Icon>;
};

const SpinnerIconSvg = (props) => {
  const spinnerIconSvg = () => (
    <svg
      width="53"
      height="53"
      viewBox="0 0 53 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="26.5" cy="26.5" r="26.5" fill="#35763B" />
      <path
        d="M14.6953 26.2043L22.9152 34.4242L39.355 17.9844"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  return <Icon rev={""} component={spinnerIconSvg} {...props}></Icon>;
};

const ViewModuleIconSvg = (props) => {
  const viewModuleIconSvg = () => (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="view_module">
        <path
          id="Vector"
          d="M15.17 5V11.5H9.83V5H15.17ZM16.17 11.5H21.5V5H16.17V11.5ZM15.17 19V12.5H9.83V19H15.17ZM16.17 12.5V19H21.5V12.5H16.17ZM8.83 12.5H3.5V19H8.83V12.5ZM8.83 11.5V5H3.5V11.5H8.83Z"
          fill={props.color ?? "currentColor"}
        />
      </g>
    </svg>
  );
  return <Icon rev={""} component={viewModuleIconSvg} {...props}></Icon>;
};

const ViewListIconSvg = (props) => {
  const viewListIconSvg = () => (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="view_list">
        <path
          id="Vector"
          d="M3.5 14H7.5V10H3.5V14ZM3.5 19H7.5V15H3.5V19ZM3.5 9H7.5V5H3.5V9ZM8.5 14H21.5V10H8.5V14ZM8.5 19H21.5V15H8.5V19ZM8.5 5V9H21.5V5H8.5Z"
          fill={props.color ?? "currentColor"}
        />
      </g>
    </svg>
  );
  return <Icon rev={""} component={viewListIconSvg} {...props}></Icon>;
};

const CalendarOffIconSvg = (props) => {
  const calendarOffIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-calendar-off"
      width={props.size ?? "24"}
      height={props.size ?? "24"}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 5h9a2 2 0 0 1 2 2v9m-.184 3.839a2 2 0 0 1 -1.816 1.161h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 1.158 -1.815" />
      <path d="M16 3v4" />
      <path d="M8 3v1" />
      <path d="M4 11h7m4 0h5" />
      <path d="M3 3l18 18" />
    </svg>
  );
  return <Icon rev={""} component={calendarOffIconSvg} {...props}></Icon>;
};

const CalendarStatsIconSvg = (props) => {
  const calendarStatsIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-calendar-stats"
      width={props.size ?? "24"}
      height={props.size ?? "24"}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4" />
      <path d="M18 14v4h4" />
      <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
      <path d="M15 3v4" />
      <path d="M7 3v4" />
      <path d="M3 11h16" />
    </svg>
  );
  return <Icon rev={""} component={calendarStatsIconSvg} {...props}></Icon>;
};

const MessageIconSvg = (props) => {
  const messageIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-message"
      width={props.size ?? "24"}
      height={props.size ?? "24"}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={props?.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8 9h8" />
      <path d="M8 13h6" />
      <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
    </svg>
  );
  return <Icon rev={""} component={messageIconSvg} {...props}></Icon>;
};

const CloseIconSvg = (props) => {
  const closeIconSvg = () => (
    <svg
      width={props.size ?? "16"}
      height={props.size ?? "16"}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4L4 12"
        stroke={props.color ?? "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 4L12 12"
        stroke={props.color ?? "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  return <Icon rev={""} component={closeIconSvg} {...props}></Icon>;
};

const AddNoteSvg = (props) => {
  const addNoteSvg = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.33333 14C2.96667 14 2.65267 13.8693 2.39133 13.608C2.13 13.3467 1.99956 13.0329 2 12.6667V3.33333C2 2.96667 2.13067 2.65267 2.392 2.39133C2.65333 2.13 2.96711 1.99956 3.33333 2H12.6667C13.0333 2 13.3473 2.13067 13.6087 2.392C13.87 2.65333 14.0004 2.96711 14 3.33333V7.8C13.7889 7.7 13.5722 7.61378 13.35 7.54134C13.1278 7.46889 12.9 7.41622 12.6667 7.38333V3.33333H3.33333V12.6667H7.36667C7.4 12.9111 7.45289 13.1444 7.52533 13.3667C7.59778 13.5889 7.68378 13.8 7.78333 14H3.33333ZM3.33333 12V12.6667V3.33333V7.38333V7.33333V12ZM4.66667 11.3333H7.38333C7.41667 11.1 7.46956 10.8722 7.542 10.65C7.61445 10.4278 7.69489 10.2111 7.78333 10H4.66667V11.3333ZM4.66667 8.66667H8.73334C9.08889 8.33333 9.48622 8.05556 9.92533 7.83333C10.3644 7.61111 10.8338 7.46111 11.3333 7.38333V7.33333H4.66667V8.66667ZM4.66667 6H11.3333V4.66667H4.66667V6ZM12 15.3333C11.0778 15.3333 10.2916 15.0082 9.64133 14.358C8.99111 13.7078 8.66622 12.9218 8.66667 12C8.66667 11.0778 8.99178 10.2916 9.642 9.64133C10.2922 8.99111 11.0782 8.66622 12 8.66667C12.9222 8.66667 13.7084 8.99178 14.3587 9.642C15.0089 10.2922 15.3338 11.0782 15.3333 12C15.3333 12.9222 15.0082 13.7084 14.358 14.3587C13.7078 15.0089 12.9218 15.3338 12 15.3333ZM11.6667 14H12.3333V12.3333H14V11.6667H12.3333V10H11.6667V11.6667H10V12.3333H11.6667V14Z"
        fill="white"
      />
    </svg>
  );
  return <Icon rev={""} component={addNoteSvg} {...props}></Icon>;
};

const CloseOverlay = (props) => {
  const closeOverlay = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? "24"}
      height={props.size ?? "24"}
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color ?? "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-x"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
  return <Icon rev={""} component={closeOverlay} {...props}></Icon>;
};
const CheckBoldSvg = (props) => {
  const checkBoldSvg = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.33398 8.00033L6.66732 11.3337L13.334 4.66699"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  return <Icon rev={""} component={checkBoldSvg} {...props}></Icon>;
};

const CopyrightIconSvg = (props) => {
  const copyrightIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-copyright"
      width={props.size ?? "24"}
      height={props.size ?? "24"}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={props.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M14 9.75a3.016 3.016 0 0 0 -4.163 .173a2.993 2.993 0 0 0 0 4.154a3.016 3.016 0 0 0 4.163 .173" />
    </svg>
  );
  return <Icon rev={""} component={copyrightIconSvg} {...props}></Icon>;
};

const Menu2IconSvg = (props) => {
  const menu2IconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-menu-2"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 6l16 0" />
      <path d="M4 12l16 0" />
      <path d="M4 18l16 0" />
    </svg>
  );
  return <Icon rev={""} component={menu2IconSvg} {...props}></Icon>;
};

const PartyIconSvg = (props) => {
  const partyIconSvg = () => (
    <svg
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.0004 6.00008C19.2378 5.9031 17.4891 6.36125 16.0004 7.31008C15.6404 6.90008 15.2704 6.49008 14.8804 6.10008L14.5904 5.83008L14.7304 5.71008C15.2195 5.29029 15.568 4.73059 15.7289 4.10651C15.8898 3.48244 15.8555 2.82401 15.6304 2.22008C15.3054 1.53826 14.7893 0.965511 14.1449 0.571416C13.5005 0.177322 12.7555 -0.0211617 12.0004 7.77144e-05V2.00008C12.3562 1.99513 12.7069 2.08519 13.0163 2.26097C13.3257 2.43676 13.5826 2.6919 13.7604 3.00008C13.9304 3.40008 13.7604 3.84008 13.2904 4.31008L13.0604 4.52008C12.0174 3.65093 10.8723 2.91215 9.65044 2.32008C7.12045 1.18008 5.82044 1.71008 5.18044 2.32008C4.98543 2.51557 4.82933 2.74632 4.72044 3.00008L4.54044 3.53008L3.10044 7.87008C4.24044 10.7101 7.00045 15.7601 13.0004 17.9401L18.0004 16.2801C18.1691 16.2173 18.3176 16.1102 18.4304 15.9701L18.6404 15.7901C20.0704 14.3501 19.1504 11.5801 17.2304 8.89008C18.3705 8.22473 19.6832 7.91484 21.0004 8.00008V6.00008ZM17.2104 14.3701H17.1504C16.4604 14.7401 13.6004 13.8001 10.3604 10.5601C10.0204 10.2201 9.70045 9.89008 9.41045 9.56008C9.31044 9.45008 9.22045 9.33008 9.12045 9.21008L8.59045 8.57008L8.31045 8.18008C8.17045 7.99008 8.03045 7.80008 7.91044 7.62008C7.79044 7.44008 7.75044 7.36008 7.67044 7.23008C7.59045 7.10008 7.45044 6.89008 7.36044 6.72008C7.27044 6.55008 7.23044 6.48008 7.17044 6.35008C7.11045 6.22008 7.00044 6.07008 6.94044 5.93008C6.88044 5.79008 6.85045 5.70008 6.80045 5.59008C6.75044 5.48008 6.69044 5.32008 6.65044 5.19008C6.61044 5.06008 6.60044 5.00008 6.58044 4.90008C6.56044 4.80008 6.52044 4.66008 6.50044 4.56008C6.49564 4.48015 6.49564 4.40001 6.50044 4.32008C6.49062 4.23369 6.49062 4.14647 6.50044 4.06008L6.61044 3.75008C6.78044 3.57008 7.52045 3.52008 8.84045 4.12008C9.7226 4.54386 10.5573 5.06009 11.3304 5.66008C10.9089 5.84611 10.4595 5.961 10.0004 6.00008V8.00008C11.0628 7.9398 12.0936 7.61682 13.0004 7.06008L13.4904 7.52008C13.9304 7.95008 14.3204 8.38008 14.6804 8.79008C14.0775 9.81821 13.838 11.0193 14.0004 12.2001L16.0004 11.8101C15.9329 11.4331 15.9329 11.0471 16.0004 10.6701C17.2904 12.6401 17.5304 14.0601 17.2104 14.3701ZM2.40044 10.0001L0.170445 16.7001C0.0094929 17.192 -0.0327669 17.715 0.0471204 18.2264C0.127008 18.7377 0.326774 19.2229 0.63009 19.6423C0.933405 20.0617 1.33166 20.4033 1.7923 20.6393C2.25293 20.8753 2.76288 20.9989 3.28045 21.0001C3.62068 20.9968 3.95823 20.9394 4.28045 20.8301L10.8004 18.6601C7.12058 16.7807 4.16678 13.7355 2.40044 10.0001Z"
        fill={props.color ?? "currentColor"}
      />
    </svg>
  );
  return <Icon rev={""} component={partyIconSvg} {...props}></Icon>;
};

const CalendarFilIconSvg = (props) => {
  const calendarFilIconSvg = () => (
    <svg
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.5 10.648V17.3743C20.5 17.884 20.3127 18.3728 19.9793 18.7332C19.6459 19.0936 19.1937 19.2961 18.7222 19.2961H6.27778C5.80628 19.2961 5.3541 19.0936 5.0207 18.7332C4.6873 18.3728 4.5 17.884 4.5 17.3743V10.648H20.5ZM16.0556 2C16.2913 2 16.5174 2.10124 16.6841 2.28144C16.8508 2.46164 16.9444 2.70605 16.9444 2.96089V3.92178H18.7222C19.1937 3.92178 19.6459 4.12426 19.9793 4.48466C20.3127 4.84506 20.5 5.33388 20.5 5.84357V8.72624H4.5V5.84357C4.5 5.33388 4.6873 4.84506 5.0207 4.48466C5.3541 4.12426 5.80628 3.92178 6.27778 3.92178H8.05556V2.96089C8.05556 2.70605 8.14921 2.46164 8.31591 2.28144C8.4826 2.10124 8.7087 2 8.94444 2C9.18019 2 9.40628 2.10124 9.57298 2.28144C9.73968 2.46164 9.83333 2.70605 9.83333 2.96089V3.92178H15.1667V2.96089C15.1667 2.70605 15.2603 2.46164 15.427 2.28144C15.5937 2.10124 15.8198 2 16.0556 2Z"
        fill={props.color ?? "currentColor"}
      />
    </svg>
  );
  return <Icon rev={""} component={calendarFilIconSvg} {...props}></Icon>;
};

const CalendarCheckedFillIconSvg = (props) => {
  const calendarCheckedFillIconSvg = () => (
    <svg
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 8.64803V15.3743C16 15.884 15.8127 16.3728 15.4793 16.7332C15.1459 17.0936 14.6937 17.2961 14.2222 17.2961H1.77778C1.30628 17.2961 0.854097 17.0936 0.520699 16.7332C0.187301 16.3728 0 15.884 0 15.3743V8.64803H16ZM11.5556 0C11.7913 0 12.0174 0.101236 12.1841 0.281439C12.3508 0.461641 12.4444 0.706047 12.4444 0.960892V1.92178H14.2222C14.6937 1.92178 15.1459 2.12426 15.4793 2.48466C15.8127 2.84506 16 3.33388 16 3.84357V6.72624H0V3.84357C0 3.33388 0.187301 2.84506 0.520699 2.48466C0.854097 2.12426 1.30628 1.92178 1.77778 1.92178H3.55556V0.960892C3.55556 0.706047 3.64921 0.461641 3.81591 0.281439C3.9826 0.101236 4.2087 0 4.44444 0C4.68019 0 4.90628 0.101236 5.07298 0.281439C5.23968 0.461641 5.33333 0.706047 5.33333 0.960892V1.92178H10.6667V0.960892C10.6667 0.706047 10.7603 0.461641 10.927 0.281439C11.0937 0.101236 11.3198 0 11.5556 0Z"
        fill="#BF4A40"
      />
      <path
        d="M5.66699 12.9987L7.33366 14.6654L10.667 11.332"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  return (
    <Icon rev={""} component={calendarCheckedFillIconSvg} {...props}></Icon>
  );
};

const SolarStarsIconSvg = (props) => {
  const solarStarsIconSvg = () => (
    <svg
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.461 11.1112C14.3095 9.6362 13.7343 8.8987 13.0716 9.0112C12.4101 9.12495 12.1009 10.0149 11.4826 11.7949L11.3216 12.2549C11.1465 12.7612 11.0579 13.0137 10.8864 13.1999C10.716 13.3862 10.4804 13.4849 10.0113 13.6824L9.58317 13.8612C7.92995 14.5549 7.10276 14.9024 7.00825 15.6112C6.91492 16.3199 7.61494 16.9224 9.01615 18.1249L9.37783 18.4374C9.77684 18.7787 9.97635 18.9499 10.0907 19.1837C10.2074 19.4174 10.2249 19.6886 10.261 20.2299L10.2949 20.7224C10.4232 22.6261 10.4885 23.5786 11.0917 23.9036C11.6949 24.2286 12.4381 23.7099 13.9233 22.6749L14.3071 22.4061C14.7295 22.1124 14.9407 21.9649 15.1822 21.9224C15.4248 21.8811 15.6722 21.9499 16.1634 22.0874L16.6126 22.2124C18.3451 22.6949 19.212 22.9374 19.6798 22.4286C20.1465 21.9199 19.905 20.9986 19.422 19.1537L19.296 18.6787C19.1595 18.1537 19.0906 17.8912 19.1245 17.6324C19.1595 17.3724 19.2936 17.1449 19.5608 16.6874L19.8058 16.2724C20.7473 14.6662 21.2175 13.8637 20.9025 13.2249C20.5887 12.5862 19.6973 12.5337 17.9134 12.4312L17.4514 12.4037C16.9451 12.3749 16.6907 12.3599 16.4702 12.2412C16.2485 12.1224 16.0852 11.9124 15.7585 11.4924L15.461 11.1112Z"
        fill="white"
      />
      <path
        d="M14.918 4.66932L15.1353 5.27394C15.374 5.93762 15.4939 6.27004 15.7255 6.51327C15.9582 6.75882 16.2765 6.88855 16.9142 7.14684L17.4949 7.38312C19.7392 8.29351 20.8614 8.74986 20.9885 9.67994C21.0419 10.0668 20.9089 10.4305 20.5966 10.8359C20.4968 10.8096 20.3963 10.7865 20.295 10.7664C19.6704 10.6425 18.8759 10.6008 18.0661 10.5579L17.4842 10.5278L17.2111 10.5127L17.0317 10.3042L16.6565 9.86758C16.134 9.25602 15.6234 8.65952 15.146 8.24486C14.6389 7.80241 13.7911 7.2256 12.6487 7.40397C11.4944 7.58466 10.8793 8.40355 10.5468 8.98731C10.2392 9.52937 9.96256 10.2544 9.68231 10.9876L9.48043 11.5181L9.39493 11.7416C9.33081 11.7648 9.25718 11.7938 9.16574 11.8297L8.62424 12.0358C7.87612 12.3219 7.13631 12.6034 6.58531 12.9126C5.99393 13.2451 5.16031 13.8589 4.99524 14.9894C4.83256 16.1094 5.44412 16.9272 5.90606 17.4125C6.25043 17.7727 6.71474 18.1538 7.20993 18.5452C5.34674 19.0375 4.35637 19.2217 3.79349 18.6286C3.15937 17.9615 3.48712 16.7523 4.14381 14.3315L4.31243 13.706C4.49887 13.0169 4.59268 12.674 4.54637 12.3324C4.49887 11.9918 4.31718 11.6918 3.95381 11.093L3.62368 10.5486C2.34474 8.43945 1.70587 7.38544 2.13099 6.5457C2.55849 5.70712 3.76856 5.63879 6.18987 5.50327L6.81568 5.46852C7.50443 5.42914 7.84762 5.41061 8.14806 5.25424C8.44731 5.09788 8.66937 4.82337 9.11349 4.27204L9.51724 3.77168C11.08 1.83391 11.8614 0.86561 12.7591 1.01502C13.6569 1.16444 14.0772 2.33196 14.9168 4.66817"
        fill="white"
      />
    </svg>
  );
  return <Icon rev={""} component={solarStarsIconSvg} {...props}></Icon>;
};

const MessageFilledIconSvg = (props) => {
  const messageFilledIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="icon icon-tabler icons-tabler-filled icon-tabler-message"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 3a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-4.724l-4.762 2.857a1 1 0 0 1 -1.508 -.743l-.006 -.114v-2h-1a4 4 0 0 1 -3.995 -3.8l-.005 -.2v-8a4 4 0 0 1 4 -4zm-4 9h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2m2 -4h-8a1 1 0 1 0 0 2h8a1 1 0 0 0 0 -2" />
    </svg>
  );
  return <Icon rev={""} component={messageFilledIconSvg} {...props}></Icon>;
};

const AlertCircleFilledIconSvg = (props) => {
  const alertCircleFilledIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="icon icon-tabler icons-tabler-filled icon-tabler-alert-circle"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm.01 13l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -8a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z" />
    </svg>
  );
  return <Icon rev={""} component={alertCircleFilledIconSvg} {...props}></Icon>;
};

const LinkIconSvg = (props) => {
  const linkIconSvg = () => (
    <svg
      width={props.size ?? "16"}
      height={props.size ?? "16"}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.66797 9.33293C7.10684 9.78086 7.70754 10.0333 8.33464 10.0333C8.96173 10.0333 9.56243 9.78086 10.0013 9.33293L12.668 6.66627C13.5884 5.74579 13.5884 4.25341 12.668 3.33293C11.7475 2.41246 10.2551 2.41246 9.33464 3.33293L9.0013 3.66627"
        stroke={props.color ?? "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.33489 6.66714C8.89601 6.21921 8.29531 5.9668 7.66822 5.9668C7.04113 5.9668 6.44043 6.21921 6.00155 6.66714L3.33489 9.3338C2.41441 10.2543 2.41441 11.7467 3.33489 12.6671C4.25536 13.5876 5.74775 13.5876 6.66822 12.6671L7.00155 12.3338"
        stroke={props.color ?? "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  return <Icon rev={""} component={linkIconSvg} {...props}></Icon>;
};
const PdfIconSvg = (props) => {
  const pdfIconSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-file-type-pdf"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
      <path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" />
      <path d="M17 18h2" />
      <path d="M20 15h-3v6" />
      <path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" />
    </svg>
  );
  return <Icon rev={""} component={pdfIconSvg} {...props}></Icon>;
};

const WarningIconSvg = (props) => {
  const warningIconSvg = () => (
    <svg
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C14.6522 2 17.1957 3.05357 19.0711 4.92893C20.9464 6.8043 22 9.34784 22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22C9.34784 22 6.8043 20.9464 4.92893 19.0711C3.05357 17.1957 2 14.6522 2 12C2 9.34784 3.05357 6.8043 4.92893 4.92893C6.8043 3.05357 9.34784 2 12 2ZM12 6.28571C11.8186 6.28555 11.6392 6.32322 11.4732 6.39632C11.3072 6.46941 11.1583 6.57632 11.036 6.71022C10.9136 6.84413 10.8206 7.00207 10.7627 7.17397C10.7049 7.34587 10.6835 7.52795 10.7 7.70857L11.2214 13.4314C11.2416 13.6238 11.3324 13.8019 11.4762 13.9314C11.6199 14.0608 11.8065 14.1325 12 14.1325C12.1935 14.1325 12.3801 14.0608 12.5238 13.9314C12.6676 13.8019 12.7584 13.6238 12.7786 13.4314L13.2986 7.70857C13.3151 7.52807 13.2937 7.34611 13.236 7.17431C13.1782 7.00251 13.0853 6.84463 12.9631 6.71075C12.8409 6.57687 12.6922 6.46993 12.5263 6.39675C12.3605 6.32357 12.1813 6.28575 12 6.28571ZM12 17.7143C12.3031 17.7143 12.5938 17.5939 12.8081 17.3796C13.0224 17.1652 13.1429 16.8745 13.1429 16.5714C13.1429 16.2683 13.0224 15.9776 12.8081 15.7633C12.5938 15.549 12.3031 15.4286 12 15.4286C11.6969 15.4286 11.4062 15.549 11.1919 15.7633C10.9776 15.9776 10.8571 16.2683 10.8571 16.5714C10.8571 16.8745 10.9776 17.1652 11.1919 17.3796C11.4062 17.5939 11.6969 17.7143 12 17.7143Z"
        fill="#BF4A40"
      />
    </svg>
  );
  return <Icon rev={""} component={warningIconSvg} {...props}></Icon>;
};

const RocketIconSvg = (props) => {
  const rocketIconSvg = () => (
    <svg
      width="15"
      height="14"
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.2605 1.04617C13.2555 1.02198 13.2437 0.999724 13.2265 0.981999C13.2093 0.964274 13.1874 0.951817 13.1634 0.946088C11.5619 0.554526 7.86146 1.94988 5.85661 3.9539C5.49903 4.30859 5.17305 4.69377 4.88235 5.10507C4.26411 5.05038 3.64587 5.09605 3.11896 5.32574C1.63228 5.98007 1.19942 7.68742 1.07884 8.42187C1.072 8.46207 1.07458 8.50331 1.08638 8.54234C1.09817 8.58138 1.11886 8.61714 1.14682 8.64682C1.17478 8.6765 1.20925 8.69929 1.24751 8.7134C1.28577 8.72751 1.32678 8.73255 1.36731 8.72812L3.7547 8.4648C3.7564 8.64479 3.76726 8.82458 3.78724 9.00347C3.79925 9.1277 3.8544 9.24379 3.9431 9.3316L4.86759 10.2539C4.95548 10.3425 5.07153 10.3976 5.19571 10.4098C5.3736 10.4296 5.55239 10.4405 5.73138 10.4423L5.46942 12.8267C5.46505 12.8672 5.47013 12.9082 5.48426 12.9464C5.49839 12.9846 5.52118 13.0191 5.55085 13.047C5.58051 13.075 5.61625 13.0957 5.65526 13.1075C5.69427 13.1193 5.73548 13.1219 5.77567 13.1152C6.50876 12.9976 8.21911 12.5647 8.86962 11.078C9.09931 10.5511 9.14634 9.93589 9.09329 9.32066C9.50558 9.02994 9.89177 8.70387 10.2475 8.34613C12.2586 6.34511 13.646 2.72726 13.2605 1.04617ZM8.24099 5.95902C8.05734 5.7755 7.93226 5.54163 7.88154 5.28701C7.83083 5.03238 7.85677 4.76844 7.95609 4.52856C8.0554 4.28868 8.22363 4.08365 8.43948 3.93939C8.65534 3.79513 8.90914 3.71814 9.16876 3.71814C9.42838 3.71814 9.68218 3.79513 9.89804 3.93939C10.1139 4.08365 10.2821 4.28868 10.3814 4.52856C10.4807 4.76844 10.5067 5.03238 10.456 5.28701C10.4053 5.54163 10.2802 5.7755 10.0965 5.95902C9.97476 6.08097 9.83014 6.17771 9.67094 6.24372C9.51175 6.30973 9.3411 6.3437 9.16876 6.3437C8.99642 6.3437 8.82577 6.30973 8.66658 6.24372C8.50738 6.17771 8.36276 6.08097 8.24099 5.95902Z"
        fill={props.color ?? "currentColor"}
      />
      <path
        d="M4.8047 10.9219C4.65486 11.072 4.4145 11.1305 4.12521 11.1806C3.47525 11.2913 2.9013 10.7297 3.01806 10.0726C3.06263 9.82352 3.19443 9.47434 3.27646 9.39231C3.29439 9.37472 3.30632 9.35194 3.31057 9.32718C3.31481 9.30243 3.31115 9.27697 3.3001 9.25442C3.28905 9.23187 3.27117 9.21337 3.24902 9.20155C3.22686 9.18974 3.20154 9.1852 3.17665 9.1886C2.81319 9.23307 2.47505 9.39785 2.21607 9.65672C1.57322 10.3001 1.51251 12.6875 1.51251 12.6875C1.51251 12.6875 3.90126 12.6268 4.54411 11.9834C4.80377 11.7246 4.96876 11.386 5.01251 11.022C5.02263 10.9077 4.88345 10.8396 4.8047 10.9219Z"
        fill={props.color ?? "currentColor"}
      />
    </svg>
  );
  return <Icon rev={""} component={rocketIconSvg} {...props}></Icon>;
};

const StarFillIconSvg = (props) => {
  const starFillIconSvg = () => (
    <svg
      width="15"
      height="14"
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_81_3390)">
        <path
          d="M7.20001 10.6517L3.08576 12.9547L4.00451 8.32999L0.542427 5.12866L5.22484 4.57332L7.20001 0.291656L9.17518 4.57332L13.8576 5.12866L10.3955 8.32999L11.3143 12.9547L7.20001 10.6517Z"
          fill={props.color ?? "currentColor"}
        />
      </g>
      <defs>
        <clipPath id="clip0_81_3390">
          <rect
            width="14"
            height="14"
            fill="white"
            transform="translate(0.200012)"
          />
        </clipPath>
      </defs>
    </svg>
  );
  return <Icon rev={""} component={starFillIconSvg} {...props}></Icon>;
};

const EditCvIconSvg = (props) => {
  const editCvIconSvg = () => (
    <svg
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props?.color ?? "currentColor"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5 6.5L17.5 10.5M4 20H8L18.5 9.5C19.0304 8.96956 19.3284 8.25014 19.3284 7.5C19.3284 6.74985 19.0304 6.03043 18.5 5.5C17.9696 4.96956 17.2501 4.67157 16.5 4.67157C15.7499 4.67157 15.0304 4.96956 14.5 5.5L4 16V20Z"
        stroke="#4D4D4D"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
  return <Icon rev={""} component={editCvIconSvg} {...props}></Icon>;
};

const LineDownIconSvg = (props) => {
  const lineDownIconSvg = () => {
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.91666 5.25L6.99999 9.33333L11.0833 5.25"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>;
  };
  return <Icon rev={""} component={lineDownIconSvg} {...props}></Icon>;
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
  NotesIconSvg,
  FaxIconSvg,
  PkpIconSvg,
  MoveIconSvg,
  AlertIconSvg,
  ClockIconSvg,
  ClockIconFilledSvg,
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
  CircleXFilledIconSvg,
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
  InfoCircleFilledIconSvg,
  PlusIconSvg,
  XIconSvg,
  ArmChairlIconSvg,
  ResumeIconSvg,
  ClipboardIconSvg,
  UsersIconSvg,
  UsersFilledIconSvg,
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
  CircleCheckFilledIconSvg,
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
  ArrowRightIconSvg,
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
  SchoolIconSvg,
  ArrowUpRightIconSvg,
  BulbIconSvg,
  TableOffIconSvg,
  UserXIconSvg,
  AddCareerIconSvg,
  ShowCareerIconSvg,
  PinFilledIconSvg,
  ArchivedIconSvg,
  WorkIconSvg,
  AccessTimeIconSvg,
  SpinnerIconSvg,
  ViewModuleIconSvg,
  ViewListIconSvg,
  CalendarOffIconSvg,
  CalendarStatsIconSvg,
  MessageIconSvg,
  CloseIconSvg,
  AddNoteSvg,
  CloseOverlay,
  CheckBoldSvg,
  CopyrightIconSvg,
  Menu2IconSvg,
  PartyIconSvg,
  CalendarFilIconSvg,
  CalendarCheckedFillIconSvg,
  SolarStarsIconSvg,
  MessageFilledIconSvg,
  TaskFilledIconSvg,
  TicketFilledIconSvg,
  AlertCircleFilledIconSvg,
  LinkIconSvg,
  PdfIconSvg,
  WarningIconSvg,
  RocketIconSvg,
  StarFillIconSvg,
  LineDownIconSvg,
  EditCvIconSvg,
};
