import { useCallback } from "react";
import { connect } from "react-redux";
import { Autocomplete, FormControl, TextField } from "@mui/material";

import { useFilter } from "../../contexts/FilterContext";
import { ICountries, ICountry } from "../../interfaces/iCountries";
import { IDataState } from "../../interfaces/iDataState";
import { IFilterValue } from "../../interfaces/iFilter";

import "./FormCountries.scss";

type FormCountriesProps = {
    countries: ICountries;
};

function FormCountries({ countries }: FormCountriesProps) {
    const { filterConfig, setCountry }: IFilterValue = useFilter();

    const handleOnChangeCountry = useCallback(
        (event: any, newCountry: ICountry | null) => {
            if (setCountry) {
                if (newCountry) {
                    setCountry(newCountry);
                } else {
                    setCountry(null);
                }
            }
        },
        [setCountry]
    );

    return (
        <FormControl fullWidth={true} className="FormCountries">
            <Autocomplete
                options={countries}
                value={filterConfig?.country}
                onChange={handleOnChangeCountry}
                renderInput={(params) => (
                    <TextField {...params} label="Country" />
                )}
            />
        </FormControl>
    );
}

const mapStateToProps = function (state: IDataState) {
    return {
        countries: state.countries,
    };
};

export default connect(mapStateToProps)(FormCountries);
