
"use client";

import {
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

type UseLocalStorageReturn<T> = {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
  removeValue: () => void;
  isReady: boolean;
};

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): UseLocalStorageReturn<T> {
  const [value, setValue] = useState<T>(initialValue);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [isRemoved, setIsRemoved] = useState(false);

  const isReady = loadedKey === key;

  // Read storage only on the client.
  useEffect(() => {
    let nextValue = initialValue;
    let removed = false;

    try {
      const storedValue = localStorage.getItem(key);

      if (storedValue !== null) {
        nextValue = JSON.parse(storedValue) as T;
      }
    } catch {
      // Keep the initial value if storage is unavailable or invalid.
      removed = true;
    }

    setValue(nextValue);
    setIsRemoved(removed);
    setLoadedKey(key);
  }, [key]); // Keep initialValue stable for each key.

  // Persist updates after the correct key has loaded.
  useEffect(() => {
    if (!isReady) return;

    try {
      if (isRemoved) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch {
      // Storage may be unavailable or full.
    }
  }, [key, value, isReady, isRemoved]);

  // Sync changes made in other tabs.
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== key && event.key !== null) return;

      if (event.newValue === null) {
        setValue(initialValue);
        setIsRemoved(true);
        return;
      }

      try {
        setValue(JSON.parse(event.newValue) as T);
        setIsRemoved(false);
      } catch {
        // Ignore malformed data from another tab.
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [key]);

  const updateValue: Dispatch<SetStateAction<T>> = useCallback(
    (nextValue) => {
      setIsRemoved(false);
      setValue(nextValue);
    },
    [],
  );

  const removeValue = useCallback(() => {
    setIsRemoved(true);
    setValue(initialValue);
  }, [initialValue]);

  return {
    value,
    setValue: updateValue,
    removeValue,
    isReady,
  };
}