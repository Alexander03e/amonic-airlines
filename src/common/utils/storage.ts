import { TStorageTypes } from 'Common/types/common';

export class Storage {
    private static _instance: Storage;

    public static getInstance(): Storage {
        if (this._instance) return this._instance;

        this._instance = new Storage();
        return this._instance;
    }

    add(key: TStorageTypes, value: string) {
        if (!value || !key) return;

        sessionStorage.setItem(key, value);
    }

    get(key: TStorageTypes) {
        if (!key) return;

        return sessionStorage.getItem(key);
    }

    remove(key: TStorageTypes) {
        if (!key) return;

        sessionStorage.removeItem(key);
    }
}
