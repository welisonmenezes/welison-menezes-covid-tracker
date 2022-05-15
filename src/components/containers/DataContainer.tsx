import { Container } from "@mui/material";
import { useMemo } from "react";
import { connect } from "react-redux";

import { useFilter } from "../../contexts/FilterContext";
import { IData, IRegionData } from "../../interfaces/iData";
import { IDataState } from "../../interfaces/iDataState";
import { IFilterValue } from "../../interfaces/iFilter";
import FormCountries from "../forms/FormCountries";
import FormRanked from "../forms/FormRanked";
import FormReported from "../forms/FormReported";
import AppTabs from "../ui/AppTabs/AppTabs";
import AppBarChart from "../ui/Charts/AppBarChart";
import AppLineChart from "../ui/Charts/AppLineChart";

type DataContainerProps = {
    data: IData;
};

function DataContainer({ data }: DataContainerProps) {
    const { filterConfig }: IFilterValue = useFilter();

    // get data from selected country (default 'world')
    const getLineChartData = useMemo((): IRegionData => {
        if (filterConfig && filterConfig.country) {
            var countryData = data.filter((value: IRegionData) => {
                return value.region_code === filterConfig.country?.code;
            });
            if (countryData && countryData[0]) {
                return countryData[0];
            }
        }
        return data[0];
    }, [data, filterConfig]);

    // sort and split the data based on filter setup
    const getBarChartData = useMemo((): IData => {
        const tmp = [...data];
        tmp.sort((a: IRegionData, b: IRegionData) => {
            if (filterConfig?.rankedMetric === "cases") {
                if (b.number_of_cases < a.number_of_cases) return -1;
                if (b.number_of_cases > a.number_of_cases) return 1;
            } else {
                if (b.number_of_deaths < a.number_of_deaths) return -1;
                if (b.number_of_deaths > a.number_of_deaths) return 1;
            }
            return 0;
        });
        const quantity = filterConfig
            ? parseInt(filterConfig?.rankedQuantity) + 1
            : 10;
        return tmp.splice(1, quantity);
    }, [data, filterConfig]);

    return (
        <Container maxWidth="xl" component="main">
            <FormCountries />
            <AppTabs
                tabs={[
                    {
                        label: "Reported cases",
                        element: (
                            <>
                                <FormReported />
                                <AppLineChart
                                    data={getLineChartData}
                                    dataKey={filterConfig?.reportedMetric}
                                    dataMode={filterConfig?.reportedInterval}
                                />
                            </>
                        ),
                    },
                    {
                        label: "Ranked charts",
                        element: (
                            <>
                                <FormRanked />
                                <AppBarChart
                                    data={getBarChartData}
                                    currentCoutryCode={
                                        filterConfig?.country?.code
                                    }
                                    dataKey={filterConfig?.rankedMetric}
                                />
                            </>
                        ),
                    },
                ]}
            />
        </Container>
    );
}

const mapStateToProps = function (state: IDataState) {
    return {
        data: state.data,
    };
};

export default connect(mapStateToProps)(DataContainer);
