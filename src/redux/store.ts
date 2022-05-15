import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import dataReducer from "./reducers";
import dataSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: dataReducer,
    middleware: [sagaMiddleware],
});

sagaMiddleware.run(dataSaga);

export default store;
