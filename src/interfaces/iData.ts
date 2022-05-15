export interface ISingleData {
    new_deaths: number;
    new_cases: number;
    total_deaths: number;
    total_cases: number;
    date: string;
}

export interface IRegionData {
    region_code: string;
    region_name: string;
    number_of_deaths: number;
    number_of_cases: number;
    data: Array<ISingleData>;
}

export interface IData extends Array<IRegionData> {}
