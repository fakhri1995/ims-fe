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
export const getBase64 = (file: RcFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
