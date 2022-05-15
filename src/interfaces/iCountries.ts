export interface ICountry {
    code: string;
    label: string;
}

export interface ICountries extends Array<ICountry> {}
