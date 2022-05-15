import { ICountries } from "./iCountries";
import { IData } from "./iData";

export interface IPayload {
    loading: boolean;
    message?: string | null;
    data?: IData;
    countries?: ICountries;
}
