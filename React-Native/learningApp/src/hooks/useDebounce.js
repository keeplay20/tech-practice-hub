/**
 * useDebounce — delays propagating a fast-changing value (e.g. keystrokes).
 *
 * Interview talking points:
 * - Local input state updates immediately (responsive TextInput)
 * - Debounced value drives API calls → fewer network requests
 * - Cleanup clears timeout on unmount / value change → no memory leaks
 */

import { useEffect, useState } from 'react';

/**
 * @template T
 * @param {T} value
 * @param {number} delayMs
 * @returns {T}
 */
export function useDebounce(value, delayMs) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debouncedValue;
}
