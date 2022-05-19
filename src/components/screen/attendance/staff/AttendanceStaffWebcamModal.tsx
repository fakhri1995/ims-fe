import { Modal } from "antd";
import { FC, useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

import ButtonSys from "components/button";

const WEBCAM_WIDTH = 640;
const WEBCAM_HEIGHT = 480;
const WEBCAM_SCREENSHOT_FORMAT = "image/jpeg";
const WEBCAM_VIDEO_CONSTRAINTS: MediaTrackConstraints = {
  width: WEBCAM_WIDTH,
  height: WEBCAM_HEIGHT,
  facingMode: "user" /** Front camera */,
};

/**
 * Component AttendanceStaffWebcamModal's props.
 */
export interface IAttendanceStaffWebcamModal {
  visible: boolean;

  onCancel: () => void;
  onOk: (imageBase64: string) => void;
}

/**
 * Component AttendanceStaffWebcamModal
 */
export const AttendanceStaffWebcamModal: FC<IAttendanceStaffWebcamModal> = ({
  visible = true /** TODO */,

  onOk,
  onCancel,
}) => {
  /**
   * States & Refs
   */
  const webcamRef = useRef<Webcam>(null);
  const [webcamAvailabilityStatus, setWebcamAvailabilityStatus] = useState<
    "hasAccess" | "permissionDenied" | "cameraDeviceNotFound"
  >("hasAccess");

  /**
   * Details:
   * default => init phase (checking for permission or even denied).
   * capture => ready to capture or take the screenshot.
   * preview => the `imageSrc` is is now has a data and modal is showing the captured image.
   *
   * Change this state when user interact with control buttons.
   */
  const [webcamPhase, setWebcamPhase] = useState<"capture" | "preview">(
    "capture"
  );

  /** base64 string (an image) */
  const [imageSrc, setImageSrc] = useState<string>("");

  /**
   * Callbacks
   */
  const captureWebcam = useCallback(() => {
    const base64Image = webcamRef.current?.getScreenshot({
      width: WEBCAM_WIDTH,
      height: WEBCAM_HEIGHT,
    });

    setImageSrc(base64Image);
  }, [webcamRef]);

  const onHandleWebcamError = useCallback((error: DOMException | string) => {
    if (error instanceof DOMException) {
      switch (error.message) {
        case "Requested device not found":
          return setWebcamAvailabilityStatus("cameraDeviceNotFound");

        case "Permission denied":
          return setWebcamAvailabilityStatus("permissionDenied");
      }
    }
  }, []);

  const onBackButtonClicked = useCallback(() => {
    setWebcamPhase("capture");
    setImageSrc("");

    onCancel();
  }, [onCancel]);

  const onUsePictureButtonClicked = useCallback(() => {
    setWebcamPhase("capture");

    onOk(imageSrc);

    setImageSrc("");
  }, [onOk, imageSrc]);

  const onCaptureButtonClicked = useCallback(() => {
    /**
     * Scenario 1:
     * 1. Init phase === "capture"
     * 2. Trigger the `captureWebcam` callback
     * 3. Change the phase -> "preview"
     *
     * Scenario 2:
     * 1. Phase === "preview"
     * 2. Set the `imgSrc` into ""
     * 3. Change the phase -> "capture"
     */
    switch (webcamPhase) {
      case "capture":
        captureWebcam();
        setWebcamPhase("preview");
        break;

      case "preview":
        setImageSrc("");
        setWebcamPhase("capture");
        break;
    }
  }, [webcamPhase]);

  /**
   * JSX(s) for footer
   */
  const footerContent = (
    <div className="flex w-full items-center justify-between">
      <ButtonSys type="default" onClick={onBackButtonClicked}>
        Kembali
      </ButtonSys>

      <div className="space-x-3">
        <ButtonSys
          type={webcamPhase === "preview" ? "default" : "primary"}
          onClick={onCaptureButtonClicked}
        >
          {webcamPhase !== "preview" && "Ambil foto"}
          {webcamPhase === "preview" && "Ambil ulang foto"}
        </ButtonSys>

        {webcamPhase === "preview" && (
          <ButtonSys type="primary" onClick={onUsePictureButtonClicked}>
            Gunakan foto
          </ButtonSys>
        )}
      </div>
    </div>
  );

  /**
   * Conditional aliases
   */
  const hasPreview = webcamPhase === "preview" && imageSrc.length > 0;

  return (
    <Modal
      visible={visible}
      title="Ambil foto bukti kehadiran"
      centered
      closable
      destroyOnClose
      onCancel={onCancel}
      width="auto"
      footer={footerContent}
    >
      {/* Modal inner wrapper */}
      <div className="flex flex-col">
        <div
          className="bg-gray-100 rounded-md overflow-hidden flex items-center justify-center"
          style={{
            minWidth: `${WEBCAM_WIDTH}px`,
            minHeight: `${WEBCAM_HEIGHT}px`,
          }}
        >
          {webcamAvailabilityStatus === "cameraDeviceNotFound" && (
            <h3 className="text-mono30">
              Perangkat Anda tidak terhubung dengan kamera.
            </h3>
          )}

          {webcamAvailabilityStatus === "permissionDenied" && (
            <h3 className="text-mono30 text-center max-w-lg">
              Mohon izinkan hak akses kamera untuk menggunakan fitur ini.
              <br /> Dan refresh web browser untuk mengaktifkan fitur.
            </h3>
          )}

          {webcamAvailabilityStatus === "hasAccess" && (
            <>
              {/* Do not unmount the webcam component while showing the preivew (if any) */}
              <Webcam
                className={hasPreview && "hidden"}
                ref={webcamRef}
                audio={false}
                width={WEBCAM_WIDTH}
                height={WEBCAM_HEIGHT}
                screenshotFormat={WEBCAM_SCREENSHOT_FORMAT}
                videoConstraints={WEBCAM_VIDEO_CONSTRAINTS}
                onUserMediaError={onHandleWebcamError}
              />

              {hasPreview && (
                <img
                  src={imageSrc}
                  alt="Evidence Picture's preview"
                  className="w-full h-full"
                />
              )}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};
