import { useEffect, useState } from "react";

/**
 * Return local storage value or initialValue
 * @param key - Key for value 
 * @param initialValue - Initial value to be returned if LocalStorage value is not found
 * @returns - LocalStorage value or initialValue
 */
export function getStorageValue(key: string, initialValue: string) {
  const saved = localStorage.getItem(key);
  if (!saved) {
    return initialValue;
  }
  const initial = JSON.parse(saved);
  return initial;
}


export function useLocalStorage<T>(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState<T>(() =>
    getStorageValue(key, initialValue)
  );

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  useEffect(() => {
    // Keep the in-memory value in sync when the storage key changes.
    // eslint-disable-next-line react/set-state-in-effect
    setStoredValue(getStorageValue(key, initialValue));
  }, [key, storedValue, initialValue]);

  return [storedValue, setValue] as const;
}
