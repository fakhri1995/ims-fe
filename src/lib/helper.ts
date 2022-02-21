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
