import axios, { AxiosInstance, AxiosResponse } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: "https://covid.ourworldindata.org",
});

export default async function GetData(): Promise<AxiosResponse<any, any>> {
    return await api
        .get("/data/owid-covid-data.json")
        .then((response: AxiosResponse<any, any>) => response)
        .catch((error: any) => {
            throw error;
        });
}
