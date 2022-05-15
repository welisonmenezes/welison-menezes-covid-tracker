import { call, put, takeLatest } from "redux-saga/effects";

import GetData from "../api";
import { DATA_REQUEST, DATA_SUCCESS, DATA_ERROR } from "./constants";
import { regionDataFactory } from "../utils";
import { ICountries } from "./../interfaces/iCountries";
import { IData } from "../interfaces/iData";
import { IRegionData } from "./../interfaces/iData";
import { IAction } from "../interfaces/iAction";

function* fetchData(action: IAction): any {
    try {
        const result: any = yield call(GetData);
        if (result && result.status && result.status === 200 && result.data) {
            const countries: ICountries = [];
            const data: IData = [];

            // prepare world data to put into store
            const worldData: IRegionData | null = regionDataFactory(
                "OWID_WRL",
                result
            );
            if (worldData) {
                data.push(worldData);
            }

            for (const key in result.data) {
                // get only countries
                if (!key.includes("OWID_")) {
                    countries.push({
                        code: key,
                        label: result.data[key].location,
                    });

                    // prepare contry data to put into store
                    const regionData: IRegionData | null = regionDataFactory(
                        key,
                        result
                    );
                    if (regionData) {
                        data.push(regionData);
                    }
                }
            }

            yield put({
                type: DATA_SUCCESS,
                payload: {
                    countries,
                    data,
                },
            } as IAction);
        } else {
            yield put({
                type: DATA_ERROR,
                payload: {
                    message: "No data found!",
                },
            } as IAction);
        }
    } catch (error: any) {
        yield put({
            type: DATA_ERROR,
            payload: {
                message: error.message,
            },
        } as IAction);
    }
}

function* dataSaga() {
    yield takeLatest(DATA_REQUEST, fetchData);
}

export default dataSaga;
