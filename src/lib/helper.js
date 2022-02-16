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
export const createKeyPressHandler = (callback, keyIdentifier) => {
  if (!(callback instanceof Function)) {
    throw new Error("Callback must be a Function");
  }

  if (typeof keyIdentifier !== "string") {
    throw new Error("keyIdentifier must ba string");
  }

  const onKeyPressHandler = (/** @type {KeyboardEvent} */ event) => {
    if (event.key.toLowerCase() !== keyIdentifier.toLowerCase()) {
      return;
    }

    callback();
  };

  return { onKeyPressHandler };
};
