import { StateStorage } from 'zustand/middleware';

const zStorage: StateStorage = {
  getItem: (name) => {
    const value = window.localStorage.getItem(name);
    return value ? value : null;
  },
  setItem: (name, value) => {
    window.localStorage.setItem(name, value);
    return Promise.resolve();
  },
  removeItem: (name) => {
    window.localStorage.removeItem(name);
    return Promise.resolve();
  },
};

export { zStorage };
