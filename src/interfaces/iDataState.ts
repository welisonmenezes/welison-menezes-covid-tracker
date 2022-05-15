import { ICountries } from "./iCountries";
import { IData } from "./iData";

export interface IDataState {
    countries: ICountries;
    data: IData;
    loading: boolean;
    error: string | null;
}
