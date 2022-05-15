import { DATA_REQUEST, DATA_SUCCESS, DATA_ERROR } from "./constants";
import { IDataState } from "../interfaces/iDataState";
import { IAction } from "../interfaces/iAction";

const initialState: IDataState = {
    countries: [],
    data: [],
    loading: false,
    error: null,
};

const dataReducer = (
    state: IDataState = initialState,
    action: IAction
): IDataState => {
    switch (action.type) {
        case DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DATA_SUCCESS:
            if (
                action.payload &&
                action.payload.data &&
                action.payload.countries
            ) {
                return {
                    ...state,
                    data: action.payload.data,
                    countries: action.payload.countries,
                    loading: false,
                };
            }
            return state;
        case DATA_ERROR:
            if (action.payload && action.payload.message !== undefined) {
                return {
                    ...state,
                    error: action.payload.message,
                    loading: false,
                };
            }
            return state;
        default:
            return state;
    }
};

export default dataReducer;
