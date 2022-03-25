import { useEffect, useState } from "react";

/**
 * Custom hook to prevent heavy computation to be executed in frequent time.
 * It primarily used to trigger HTTP request after (let's say 500ms) the User type on search box.
 *
 * @link https://usehooks-ts.com/react-hook/use-debounce
 *
 * @param value Any value to be debounced.
 * @param delay Debounce time in milliseconds.
 * @returns {T}
 */
export const useDebounce = <T>(value: T, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
