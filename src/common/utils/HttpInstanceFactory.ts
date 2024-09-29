import axios, { AxiosInstance } from "axios";
import { BACKEND_URL } from "Common";

export class HttpInstanceFactory {
    private static baseInstance: AxiosInstance | null = null;

    public static getInstance(): AxiosInstance {
        if (this.baseInstance) return this.baseInstance;
        this.baseInstance = axios.create({
            baseURL: BACKEND_URL,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return this.baseInstance;
    }
}
