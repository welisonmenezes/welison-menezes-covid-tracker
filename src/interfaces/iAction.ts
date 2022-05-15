import { IPayload } from "./iPayloads";

export interface IAction {
    type: string;
    payload?: IPayload;
}
