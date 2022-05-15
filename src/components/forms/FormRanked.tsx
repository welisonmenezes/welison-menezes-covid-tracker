import {
    Card,
    FormControl,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useCallback } from "react";
import { connect } from "react-redux";
import { useFilter } from "../../contexts/FilterContext";
import { ICountries } from "../../interfaces/iCountries";
import { IDataState } from "../../interfaces/iDataState";
import { IFilterValue } from "../../interfaces/iFilter";

import "./FormRanked.scss";

type FormRankedProps = {
    countries: ICountries;
};

function FormRanked({ countries }: FormRankedProps) {
    const { filterConfig, setRankedMetric, setRankedQuantity }: IFilterValue =
        useFilter();

    const handleOnChangeMetric = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (setRankedMetric) {
                setRankedMetric((event.target as HTMLInputElement).value);
            }
        },
        [setRankedMetric]
    );

    const handleOnChangeQuantity = useCallback(
        (event: SelectChangeEvent) => {
            if (setRankedQuantity) {
                setRankedQuantity(event.target.value as string);
            }
        },
        [setRankedQuantity]
    );

    return (
        <Card className="FormRanked">
            <FormControl>
                <FormLabel id="row-metric-group-label">Metric</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="metric-group-label"
                    name="metric-group"
                    value={filterConfig?.rankedMetric}
                    onChange={handleOnChangeMetric}
                >
                    <FormControlLabel
                        value="deaths"
                        control={<Radio size="small" />}
                        label="Deaths"
                    />
                    <FormControlLabel
                        value="cases"
                        control={<Radio size="small" />}
                        label="Cases"
                    />
                </RadioGroup>
            </FormControl>
            <FormControl>
                <FormLabel id="row-quantity-group-label">Quantity</FormLabel>
                <Select
                    labelId="quantity-select-label"
                    size="small"
                    id="quantity-select"
                    value={filterConfig?.rankedQuantity}
                    onChange={handleOnChangeQuantity}
                >
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="25">25</MenuItem>
                    <MenuItem value="50">50</MenuItem>
                    <MenuItem value="100">100</MenuItem>
                    <MenuItem value={countries.length.toString()}>All</MenuItem>
                </Select>
            </FormControl>
        </Card>
    );
}

const mapStateToProps = function (state: IDataState) {
    return {
        countries: state.countries,
    };
};

export default connect(mapStateToProps)(FormRanked);
