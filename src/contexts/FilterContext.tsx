import { createContext, useCallback, useContext, useState } from "react";
import { ICountry } from "../interfaces/iCountries";
import { IFilter, IFilterValue } from "../interfaces/iFilter";

const initialFilter: IFilter = {
    country: null,
    reportedMetric: "deaths",
    reportedInterval: "new",
    rankedMetric: "deaths",
    rankedQuantity: "10",
};

const FilterContext = createContext({});

type FilterProviderProps = {
    children: any;
};

const FilterProvider = ({ children }: FilterProviderProps) => {
    const [filterConfig, setFilterConfig] = useState(initialFilter);

    const setCountry = useCallback(
        (country: ICountry) => {
            setFilterConfig({
                ...filterConfig,
                country: country,
            });
        },
        [filterConfig]
    );

    const setReportedMetric = useCallback(
        (reportedMetric: string) => {
            setFilterConfig({
                ...filterConfig,
                reportedMetric: reportedMetric,
            });
        },
        [filterConfig]
    );

    const setReportedInterval = useCallback(
        (reportedInterval: string) => {
            setFilterConfig({
                ...filterConfig,
                reportedInterval: reportedInterval,
            });
        },
        [filterConfig]
    );

    const setRankedMetric = useCallback(
        (rankedMetric: string) => {
            setFilterConfig({
                ...filterConfig,
                rankedMetric: rankedMetric,
            });
        },
        [filterConfig]
    );

    const setRankedQuantity = useCallback(
        (rankedQuantity: string) => {
            setFilterConfig({
                ...filterConfig,
                rankedQuantity: rankedQuantity,
            });
        },
        [filterConfig]
    );

    return (
        <FilterContext.Provider
            value={
                {
                    filterConfig,
                    setCountry,
                    setReportedMetric,
                    setReportedInterval,
                    setRankedMetric,
                    setRankedQuantity,
                } as IFilterValue
            }
        >
            {children}
        </FilterContext.Provider>
    );
};

export default FilterProvider;

export const useFilter = () => useContext(FilterContext);
