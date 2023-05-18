import { ITEMS_PER_PAGE } from '@/constants/api';

export const classNameHelper = (...args: string[]): string => {
  const classes = args.filter((entry) => entry && entry.trim() !== '');
  return classes.toString().replaceAll(',', ' ').trim();
};

export const createDynamicArray = (value: number) => {
  return Array.from(Array(Math.abs(value)).keys()) as number[];
};

export const createPaginationShowList = (numberOfItems: number) => {
  return createDynamicArray(
    Math.ceil(Math.abs(numberOfItems) / ITEMS_PER_PAGE) + 1
  ).map((i) => {
    const value = (i + 1) * ITEMS_PER_PAGE;
    return { label: `Show ${value}`, value: value };
  });
};

export const localStorageHelper = <T>(key: string) => {
  const getValue = (key: string): string | null => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      return null;
    }
  };

  const setValue = (value: T) => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [setValue, getValue] as const;
};

export const convertToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const createFormData = <T extends object>(data: T) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value);
    }
  }
  return formData;
};
