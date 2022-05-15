import {
    Card,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import { useCallback } from "react";
import { useFilter } from "../../contexts/FilterContext";
import { IFilterValue } from "../../interfaces/iFilter";

import "./FormReported.scss";

function FormReported() {
    const {
        filterConfig,
        setReportedMetric,
        setReportedInterval,
    }: IFilterValue = useFilter();

    const handleOnChangeMetric = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (setReportedMetric) {
                setReportedMetric((event.target as HTMLInputElement).value);
            }
        },
        [setReportedMetric]
    );

    const handleOnChangeInterval = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (setReportedInterval) {
                setReportedInterval((event.target as HTMLInputElement).value);
            }
        },
        [setReportedInterval]
    );

    return (
        <Card className="FormReported">
            <FormControl>
                <FormLabel id="row-metric-group-label">Metric</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="metric-group-label"
                    name="metric-group"
                    value={filterConfig?.reportedMetric}
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
                <FormLabel id="row-interval-group-label">Interval</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="interval-group-label"
                    name="interval-group"
                    value={filterConfig?.reportedInterval}
                    onChange={handleOnChangeInterval}
                >
                    <FormControlLabel
                        value="new"
                        control={<Radio size="small" />}
                        label="Daily"
                    />
                    <FormControlLabel
                        value="total"
                        control={<Radio size="small" />}
                        label="Cumulative"
                    />
                </RadioGroup>
            </FormControl>
        </Card>
    );
}

export default FormReported;
