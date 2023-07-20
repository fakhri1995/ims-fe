import { Upload, notification } from "antd";
import type { UploadProps } from "antd/es/upload/interface";
import type { RcFile } from "antd/lib/upload";
import { format } from "date-fns";
import moment from "moment";
import { ReactNode } from "react";

moment.locale("id");

/**
 * A high order helper function to create `KeyboardEvent` handler.
 * It primarily used to handle a keypress event when User pressing Enter key on search box.
 *
 * @param {Function} callback
 * @param {string} keyIdentifier KeyboardEvent.key's value.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
 *
 * @example
 * ```javascriptreact
 * function render() {
 *  const { onKeyPressHandler } = createKeyPressHandler(fetchData, "Enter");
 *
 *  return (
 *    <Input onKeyPress={onKeyPressHandler} />
 *  )
 * }
 * ```
 */
export const createKeyPressHandler = (
  callback: Function,
  keyIdentifier: string
) => {
  const onKeyPressHandler = (event: KeyboardEvent) => {
    if (event.key.toLowerCase() !== keyIdentifier.toLowerCase()) {
      return;
    }

    callback();
  };

  return { onKeyPressHandler };
};

/**
 * Digunakan untuk transform blob (binary large object, e.g. image) menjadi base64.
 *
 * Function ini umunya digunakan untuk transform image data ketika user upload dan dapat dipreview
 *  terlebih dahulu pada browser.
 */
export const getBase64 = (file: RcFile | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Client side function.
 *
 * A helper function to download any binary files (pdf, image, xlsx, etc) for client.
 *
 * @link https://dev.to/nombrekeff/download-file-from-blob-21ho
 *
 * @param fileBinary Blob file.
 * @param fileName Downloaded file name.
 */
export const downloadFile = (fileBinary: Blob, fileName: string) => {
  const blobUrl = URL.createObjectURL(fileBinary);
  const anchorElement = document.createElement("a");

  anchorElement.href = blobUrl;
  anchorElement.download = fileName;

  document.body.append(anchorElement);

  anchorElement.dispatchEvent(
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  );

  document.body.removeChild(anchorElement);
};

/**
 * Helper function untuk render toaster / notification ketika User tidak memiliki fitur
 *  tertenu.
 *
 * Function ini digunakan agar message tetap consistent.
 *
 * @example
 * ```ts
 * // does not have the permission
 * permissionWarningNotification("Mengubah", "Task");
 * // -> Anda tidak memiliki fitur untuk Mengubah Task
 * ```
 */
export const permissionWarningNotification = (
  action: string,
  object: string
) => {
  notification.warning({
    message: `Anda tidak memiliki fitur untuk ${action} ${object}`,
  });
};

/**
 * Generate a static URL of specific resource from the CDN.
 *
 * @example
 * ```ts
 * const profilePicture = "staging/Users/default_user.png";
 * const staticAssetUrl = generateStaticAssetUrl(profilePicture);
 *
 * assert(staticAssetUrl, "https://cdn.mig.id/staging/Users/default_user.png");
 * ```
 *
 * @param path Resource's asset / file path
 */
export const generateStaticAssetUrl = (path: string) => {
  return `${process.env.NEXT_PUBLIC_STATIC_ASSETS_URL}${path}`;
};

/**
 * Generate notification redirection URL from given data (id and module type (e.g. task, ticket, etc)).
 *
 * @example
 * ```typescript
 * const redirectTaskUrl = generateNotificationRedirectUrl(570, "task");
 * assert(redirectTaskUrl, "/tasks/detail/570?prevpath=mytask");
 * ```
 */
export const generateNotificationRedirectUrl = (
  notificationableId: number,
  notificationableType: "task" | "ticket"
) => {
  switch (notificationableType) {
    case "task":
      return `/tasks/detail/${notificationableId}?prevpath=mytask`;
    case "ticket":
      return `/tickets/detail/${notificationableId}`;
  }
};

/**
 * Transforming an object into FormData. The idea is to craft a valid `FormData`
 *  even the value of the given object has Array as its value.
 *
 * @example
 * ```ts
 * const payload = objectToFormData({ name: "Kennan", roles: [1, 2, 3] });
 * // use the payload directly to an axios method with `Content-Type`: `multipart/form-data`
 * ```
 *
 * @param entry Any JavaScript literal object
 */
export const objectToFormData = <T extends Object>(entry: T) => {
  const formData = new FormData();

  for (const [k, v] of Object.entries(entry)) {
    if (v instanceof Array) {
      for (let i = 0; i < v.length; ++i) {
        formData.append(`${k}[]`, v[i]);
      }

      continue;
    }

    // prevent null object converted to string
    let value: any = v;
    if (v === null) {
      value = "";
    }

    formData.append(k, value);
  }

  return formData;
};

/**
 * Transforming an object into FormData. The idea is to craft a valid `FormData`
 *  even the value of the given object has Array as its value
 *  OR inside the Array has some object with another Array as it's value
 *
 * @example
 * ```ts
 * const payload = objectToFormData({
 *    name: "Kennan",
 *    roles: [1, 2, 3],
 *   extras: [{
 *             id: 1,
 *             name: "desc 1",
 *             value: [1, 2, 3]
 *            }, {
 *             id: 2,
 *             name: "desc 2",
 *             value: [4, 5, 6]
 *            }]
 * });
 * // use the payload directly to an axios method with `Content-Type`: `multipart/form-data`
 * ```
 *
 * @param entry Any JavaScript literal object
 */
export const objectToFormDataNew = <T extends Object>(entry: T) => {
  const formData = new FormData();

  for (const [k, v] of Object.entries(entry)) {
    if (v instanceof Array) {
      for (let i = 0; i < v.length; ++i) {
        for (const [a, b] of Object.entries(v[i])) {
          if (b instanceof Array) {
            for (const item in b) {
              formData.append(`${k}[${i}][${a}][${item}]`, b[item]);
            }
          } else {
            formData.append(`${k}[${i}][${a}]`, b as string | Blob);
          }
        }
      }

      continue;
    }

    // prevent null object converted to string
    let value: any = v;
    if (v === null) {
      value = "";
    }

    formData.append(k, value);
  }

  return formData;
};

/**
 * Transform client side Date data to acceptable DTO.
 *
 * Sebenernya backend juga bisa terima nilai date dengan `Date.toString()`, tapi just in case suatu saat akan ada validasi
 *  format tertentu yang hanya bisa diterima backend.
 *
 * @param rawDate Either `Date` instance or string from `Date.toString()`
 * @param dateFormat Required date format that backend can accept
 */
export const formatDatePayload = (
  rawDate: Date | string | null,
  dateFormat: string = "yyyy-MM-dd HH:mm:ss"
) => {
  if (rawDate === null) {
    return null;
  }

  let result = "";

  try {
    result = format(new Date(rawDate), dateFormat);
  } catch (e) {
    console.error(e);
    return null;
  }

  return result;
};

/**
 * Generate `beforeUpload` props callback for Ant Design `<Upload>` component.
 *
 * @example
 * ```ts
 * // 2 MiB max
 * <Upload beforeUpload={beforeUploadFileMaxSize(2)} />
 * ```
 *
 * @param sizeInMiB File size dalam MiB
 * @param errorMessage Custom notification error message
 */
export const beforeUploadFileMaxSize = (
  sizeInMiB: number = 5,
  errorMessage?: string
): Pick<UploadProps, "beforeUpload">["beforeUpload"] => {
  return (file) => {
    const fileSizeInMb = Number.parseFloat(
      (file.size / 1024 / 1024).toFixed(2)
    );

    if (fileSizeInMb > sizeInMiB) {
      notification.error({
        message:
          errorMessage ||
          `Ukuran File ${fileSizeInMb} MiB melebih batas persyaratan maksimum sebesar ${sizeInMiB} MiB`,
      });

      return Upload.LIST_IGNORE;
    }
  };
};

/**
 * Client-side validator for date-like value given from the backend.
 *
 * @param dateValue Received value from backend
 */
export const isValidDate = (dateValue: any) => {
  if (dateValue === null || dateValue === undefined) {
    return false;
  }

  return new Date(dateValue).toString().toLowerCase() !== "invalid date";
};

/**
 * Return formatted date using moment, default format: "DD MMMM YYYY"
 *
 * @param dateValue Received date value from backend
 * @param emptyValue Desired value if date is empty
 * @param dateFormat Desired date format
 * @param isRelativeTime Set to true if need to use relative time format, e.g. "5 hari yang lalu, 03:00"
 */
export const momentFormatDate = (
  dateValue: string,
  emptyValue: string | ReactNode = "-",
  dateFormat: string = "DD MMMM YYYY",
  isRelativeTime?: boolean
) => {
  let date = moment(dateValue);

  if (!date.isValid()) {
    return emptyValue;
  } else {
    if (isRelativeTime) {
      const daysDifference = moment().diff(dateValue, "days");

      if (daysDifference <= 7) {
        return date.fromNow() + ", " + date.format("HH:mm");
      }
    }
  }
  return date.format(dateFormat);
};

/**
 * Get file name from a path string
 *
 * @example
 * ```typescript
 * const fileName = getFileName("staging/EmployeeContract/CV-Flutter-Developer-Michael-Roni.pdf");
 * assert(fileName, "CV-Flutter-Developer-Michael-Roni.pdf");
 * ```
 */
export const getFileName = (pathString: string = "") => {
  const splittedArr = pathString.split("/");
  return splittedArr[splittedArr.length - 1];
};

export const stripTags = (text: string) => {
  const pattern = "<\\w+(\\s+(\"[^\"]*\"|\\'[^\\']*'|[^>])+)?>|<\\/\\w+>";
  const reg = new RegExp(pattern, "gi");
  return text.replace(reg, "");
};

export const wordsCount = (text: string) => {
  const pattern = "\\w+";
  const reg = new RegExp(pattern, "g");
  return (text.match(reg) || []).length;
};

export const timeRead = (total: number) => {
  const wordsPerMinute = 200;
  let value = Math.ceil(total / wordsPerMinute);
  return value;
};

export const currency = (money: number) => {
  return money.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
};
