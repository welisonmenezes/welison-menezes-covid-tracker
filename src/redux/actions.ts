import { IPayload } from "./../interfaces/iPayloads";
import { IAction } from "./../interfaces/iAction";
import { DATA_REQUEST, DATA_SUCCESS, DATA_ERROR } from "./constants";

export const dataRequest = (): IAction =>
    ({
        type: DATA_REQUEST,
    } as IAction);

export const dataSuccess = (data: IPayload): IAction =>
    ({
        type: DATA_SUCCESS,
        payload: data,
    } as IAction);

export const dataError = (message: string): IAction =>
    ({
        type: DATA_ERROR,
        payload: { message },
    } as IAction);
