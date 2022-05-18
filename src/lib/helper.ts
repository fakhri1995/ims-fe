import { notification } from "antd";
import type { RcFile } from "antd/lib/upload";

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

    formData.append(k, v);
  }

  return formData;
};
