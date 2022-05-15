import { ICountry } from "./iCountries";

export interface IFilter {
    country: ICountry | null;
    reportedMetric: string;
    reportedInterval: string;
    rankedMetric: string;
    rankedQuantity: string;
}

export interface IFilterValue {
    filterConfig?: IFilter;
    setCountry?: Function;
    setReportedMetric?: Function;
    setReportedInterval?: Function;
    setRankedMetric?: Function;
    setRankedQuantity?: Function;
}