import { AppBar, Toolbar, Typography } from "@mui/material";
import { DarkModeSwitch } from "react-toggle-dark-mode";

import "./Header.scss";

type HeaderProps = {
    onToggleDarkMode: Function;
    isDarkMode: boolean;
};

function Header({ onToggleDarkMode, isDarkMode }: HeaderProps) {
    return (
        <AppBar position="relative" className="Header">
            <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                    Covid-19 Tracker
                </Typography>
                <DarkModeSwitch
                    sunColor="#fff"
                    checked={isDarkMode}
                    onChange={() => {
                        onToggleDarkMode();
                    }}
                    size={20}
                />
            </Toolbar>
        </AppBar>
    );
}

export default Header;
