import {
  DeleteOutlined,
  PictureOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Spin, Upload } from "antd";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";

import canvasPreview from "lib/canvasPreview";

import { beforeUploadFileMaxSize, notificationError } from "../lib/helper";
import ButtonSys from "./button";
import { CheckIconSvg } from "./icon";
import ModalCore from "./modal/modalCore";

const UploadImage = ({ useCrop = false, dataDisplay, setDataUpdate }) => {
  const IMAGE_WIDTH = 80;
  const IMAGE_HEIGHT = 105;

  const [fileList, setFileList] = useState([]);
  const [fileName, setFileName] = useState("");
  const [uploadPictureLoading, setUploadPictureLoading] = useState(false);

  // Modal crop state
  const [modalCrop, setModalCrop] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState({
    unit: "px", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  });

  const [completedCrop, setCompletedCrop] = useState(null);
  const [aspect, setAspect] = useState(IMAGE_WIDTH / IMAGE_HEIGHT);

  // Display profile photo filename when available
  useEffect(() => {
    if (dataDisplay?.profile_image?.link) {
      const currentFileName = dataDisplay?.profile_image?.link?.split("/")[2];
      setFileList([{ name: currentFileName }]);
    } else {
      setFileList([]);
    }
  }, [dataDisplay?.profile_image]);

  useEffect(() => {
    const preview = async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      }
    };
    const timer = setTimeout(() => preview(), 100);
    return () => clearTimeout(timer);
  }, [completedCrop]);

  // Handle upload file
  const beforeUploadImage = useCallback((uploadedFile) => {
    const checkMaxFileSizeFilter = beforeUploadFileMaxSize(2);
    const isReachedMaxFileSize =
      checkMaxFileSizeFilter(uploadedFile) === Upload.LIST_IGNORE;
    const allowedFileTypes = [`image/png`, `image/jpg`, `image/jpeg`];

    if (!allowedFileTypes.includes(uploadedFile.type)) {
      notificationError({
        message: "File harus berupa gambar",
      });
      return Upload.LIST_IGNORE;
    }

    if (isReachedMaxFileSize) {
      return Upload.LIST_IGNORE;
    }

    useCrop && setModalCrop(true);
  }, []);

  const onUploadChange = useCallback(({ file }) => {
    if (useCrop) {
      if (file?.originFileObj) {
        setCrop(undefined); // Makes crop preview update between images.
        const reader = new FileReader();
        reader.addEventListener("load", () =>
          setImgSrc(reader.result?.toString() || "")
        );
        reader.readAsDataURL(file.originFileObj);
        setFileName(file?.name);
      }
    } else {
      setUploadPictureLoading(file.status === "uploading");
      if (file.status !== "removed") {
        setFileList([file]);
        setDataUpdate((prev) => ({
          ...prev,
          profile_image: file?.originFileObj,
        }));
      }
    }
  }, []);

  const onUploadSubmit = async () => {
    setUploadPictureLoading(true);
    const image = imgRef.current;

    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      notificationError({
        message: "Crop canvas does not exist",
      });
      throw new Error("Crop canvas does not exist");
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    // const scaleX = image.naturalWidth / image.width;
    // const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width,
      completedCrop.height
    );
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      notificationError({
        message: "No 2d context",
      });
      throw new Error("No 2d context");
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );

    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: "image/jpeg",
      quality: 0.7,
    });

    // Create a File object from the Blob
    const imageFile = new File([blob], fileName, {
      type: "image/jpeg",
    });

    setFileList([imageFile]);
    setDataUpdate((prev) => ({
      ...prev,
      profile_image: imageFile,
    }));

    setModalCrop(false);
    setUploadPictureLoading(false);
  };

  const removeImage = () => {
    setFileList([]);
    setDataUpdate((prev) => ({
      ...prev,
      profile_image: null,
    }));
  };

  const onImageLoad = (e) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  const centerAspectCrop = (mediaWidth, mediaHeight, aspect) => {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "px",
          width: IMAGE_WIDTH,
          height: IMAGE_HEIGHT,
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  };

  return (
    <>
      <Upload
        accept=".png, .jpg, .jpeg"
        maxCount={1}
        beforeUpload={beforeUploadImage}
        onChange={onUploadChange}
        showUploadList={false}
        // onRemove={onUploadRemove}
        disabled={uploadPictureLoading}
        fileList={fileList}
      >
        <Button
          className="btn-sm btn font-semibold px-6 space-x-2 border
                  text-primary100 hover:text-white bg-white border-primary100 
                  hover:bg-primary75 hover:border-primary75  
                  focus:border-primary75 focus:text-primary100 "
        >
          <UploadOutlined />
          <p>Unggah File</p>
        </Button>
      </Upload>
      {fileList.length > 0 &&
        fileList.map((item) => (
          <div
            className={
              "relative p-4 border border-solid border-[##d9d9d9] rounded-sm mt-5"
            }
          >
            <div className={"flex justify-between"}>
              <div className={"flex gap-5 ml-1 items-center"}>
                <PictureOutlined
                  style={{ fontSize: "26px", color: "#1890ff" }}
                />
                <p>{item.name}</p>
              </div>
              <div>
                <DeleteOutlined
                  onClick={() => removeImage()}
                  className={"hover:cursor-pointer"}
                  style={{ color: "rgba(0, 0, 0, 0.45)" }}
                />
              </div>
            </div>
          </div>
        ))}

      {useCrop && (
        <ModalCore
          title={"Edit Photo"}
          visible={modalCrop}
          onCancel={() => setModalCrop(false)}
          footer={
            <Spin spinning={uploadPictureLoading}>
              <ButtonSys
                type={"primary"}
                onClick={onUploadSubmit}
                disabled={!completedCrop}
              >
                <div className="flex flex-row space-x-2 items-center">
                  <CheckIconSvg color={"white"} size={16} />
                  <p>Simpan</p>
                </div>
              </ButtonSys>
            </Spin>
          }
        >
          <>
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              // minWidth={400}
              minHeight={100}
            >
              <img
                ref={imgRef}
                alt="Crop image"
                src={imgSrc}
                onLoad={onImageLoad}
              />
            </ReactCrop>
            {!!completedCrop && (
              <div className="flex justify-end">
                <canvas
                  ref={previewCanvasRef}
                  style={{
                    border: "1px solid black",
                    objectFit: "contain",
                    width: completedCrop.width,
                    height: completedCrop.height,
                  }}
                />
              </div>
            )}
          </>
        </ModalCore>
      )}
    </>
  );
};

export default UploadImage;
