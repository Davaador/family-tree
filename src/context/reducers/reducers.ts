import { MMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";

const storage = new MMKV();

const zStorage: StateStorage = {
    getItem(name) {
        const value = storage.getString(name);
        return value ?? null;
    },
    setItem(name, value) {
        return storage.set(name, value);
    },
    removeItem(name) {
        return storage.delete(name);
    },
};

export { zStorage, storage };
