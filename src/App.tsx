import { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Loading from "./components/ui/Loading/Loading";
import DataContainer from "./components/containers/DataContainer";
import { dataRequest } from "./redux/actions";
import Header from "./components/layout/Header";
import { IDataState } from "./interfaces/iDataState";
import ErrorModal from "./components/ui/ErrorModal/ErrorModal";
import FilterProvider from "./contexts/FilterContext";

import "./App.scss";

type AppProps = {
    loading: boolean;
    error: string | null;
    dataRequest: Function;
};

function App({ loading, error, dataRequest }: AppProps) {
    const [isDarkMode, setDarkMode] = useState(false);

    useEffect(() => {
        dataRequest();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleDarkMode = useCallback(() => {
        setDarkMode(!isDarkMode);
    }, [isDarkMode]);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: isDarkMode ? "dark" : "light",
                },
            }),
        [isDarkMode]
    );

    return (
        <FilterProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div
                    className={`App ${isDarkMode ? "dark-mode" : "light-mode"}`}
                >
                    <Header
                        onToggleDarkMode={toggleDarkMode}
                        isDarkMode={isDarkMode}
                    />
                    <Loading isOpen={loading} />
                    {!loading && !error && <DataContainer />}
                    {!loading && error && <ErrorModal message={error} />}
                </div>
            </ThemeProvider>
        </FilterProvider>
    );
}

const mapStateToProps = function (state: IDataState) {
    return {
        loading: state.loading,
        error: state.error,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        dataRequest: () => dispatch(dataRequest()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
