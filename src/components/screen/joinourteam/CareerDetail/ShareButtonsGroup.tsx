import { Tooltip } from "antd";
import { FC, useCallback } from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

export const ShareButtonsGroup: FC = () => {
  /**
   * Callbacks
   */
  const onCopyToClipboard = useCallback((visibility: boolean) => {
    if (visibility) {
      navigator.clipboard.writeText(window.location.href);
    }
  }, []);

  /**
   * Values
   */
  const shareUrl = window.location.href;
  const shareMessage = "Lowongan pekerjaan di Mitramas Infosys Global";
  const shareTitle = "Job Detail";

  return (
    <div>
      <ul className="flex items-center space-x-6">
        {/* Clipboard */}
        <li>
          <Tooltip
            trigger={["click"]}
            title="Copied to clipboard!"
            afterVisibleChange={onCopyToClipboard}
            placement="bottom"
            className="cursor-pointer"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3335 17.3339C13.9061 18.0994 14.6366 18.7328 15.4756 19.1912C16.3145 19.6495 17.2422 19.9221 18.1957 19.9904C19.1492 20.0587 20.1063 19.9211 21.002 19.587C21.8976 19.2529 22.711 18.73 23.3868 18.0539L27.3868 14.0539C28.6012 12.7966 29.2732 11.1126 29.258 9.3646C29.2428 7.61662 28.5417 5.94454 27.3056 4.70848C26.0696 3.47243 24.3975 2.7713 22.6495 2.75611C20.9015 2.74092 19.2175 3.41288 17.9602 4.62727L15.6668 6.90727"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.6664 14.6676C18.0938 13.9021 17.3633 13.2687 16.5244 12.8104C15.6855 12.352 14.7578 12.0795 13.8042 12.0112C12.8507 11.9429 11.8937 12.0805 10.998 12.4146C10.1023 12.7487 9.28896 13.2715 8.61311 13.9476L4.61311 17.9476C3.39872 19.205 2.72676 20.889 2.74195 22.637C2.75714 24.3849 3.45827 26.057 4.69432 27.2931C5.93037 28.5291 7.60246 29.2303 9.35044 29.2454C11.0984 29.2606 12.7824 28.5887 14.0398 27.3743L16.3198 25.0943"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Tooltip>
        </li>

        {/* Facebook */}
        <li>
          <FacebookShareButton
            url={shareUrl}
            title={shareTitle}
            quote={shareMessage}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.0002 2.66602H20.0002C18.2321 2.66602 16.5364 3.36839 15.2861 4.61864C14.0359 5.86888 13.3335 7.56457 13.3335 9.33268V13.3327H9.3335V18.666H13.3335V29.3327H18.6668V18.666H22.6668L24.0002 13.3327H18.6668V9.33268C18.6668 8.97906 18.8073 8.63992 19.0574 8.38987C19.3074 8.13982 19.6465 7.99935 20.0002 7.99935H24.0002V2.66602Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </FacebookShareButton>
        </li>

        {/* Twitter */}
        <li>
          <TwitterShareButton url={shareUrl} title={shareMessage}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.6668 3.99974C29.39 4.90037 27.9763 5.58922 26.4802 6.03974C25.6772 5.11642 24.6099 4.46199 23.4229 4.16497C22.2358 3.86795 20.9862 3.94266 19.8429 4.37901C18.6997 4.81535 17.7181 5.59227 17.0308 6.60469C16.3435 7.61711 15.9838 8.81618 16.0002 10.0397V11.3731C13.657 11.4338 11.3352 10.9142 9.24151 9.86033C7.14782 8.80651 5.34725 7.25125 4.00016 5.33307C4.00016 5.33307 -1.33317 17.3331 10.6668 22.6664C7.92087 24.5304 4.64971 25.465 1.3335 25.3331C13.3335 31.9997 28.0002 25.3331 28.0002 9.99974C27.9989 9.62834 27.9632 9.25786 27.8935 8.89307C29.2543 7.55106 30.2146 5.85669 30.6668 3.99974V3.99974Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </TwitterShareButton>
        </li>

        {/* LinkedIn */}
        <li>
          <LinkedinShareButton
            url={shareUrl}
            title={shareTitle}
            summary={shareMessage}
            source="https://mig.id"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.3335 10.666C23.4552 10.666 25.4901 11.5089 26.9904 13.0092C28.4906 14.5095 29.3335 16.5443 29.3335 18.666V27.9993H24.0002V18.666C24.0002 17.9588 23.7192 17.2805 23.2191 16.7804C22.719 16.2803 22.0407 15.9993 21.3335 15.9993C20.6263 15.9993 19.948 16.2803 19.4479 16.7804C18.9478 17.2805 18.6668 17.9588 18.6668 18.666V27.9993H13.3335V18.666C13.3335 16.5443 14.1764 14.5095 15.6766 13.0092C17.1769 11.5089 19.2118 10.666 21.3335 10.666V10.666Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.99984 12H2.6665V28H7.99984V12Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.33317 7.99935C6.80593 7.99935 7.99984 6.80544 7.99984 5.33268C7.99984 3.85992 6.80593 2.66602 5.33317 2.66602C3.86041 2.66602 2.6665 3.85992 2.6665 5.33268C2.6665 6.80544 3.86041 7.99935 5.33317 7.99935Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </LinkedinShareButton>
        </li>
      </ul>
    </div>
  );
};
