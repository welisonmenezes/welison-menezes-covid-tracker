import { ReactNode } from "react";

export interface ITab {
    label: string;
    element: ReactNode;
}

export interface ITabs {
    tabs: Array<ITab>;
}
