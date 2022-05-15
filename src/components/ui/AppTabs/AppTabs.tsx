import { Box, Tab, Tabs } from "@mui/material";
import { useCallback, useState } from "react";

import { ITabs } from "../../../interfaces/iTabs";
import TabPanel from "../TabPanel/TabPanel";

function AppTabs({ tabs }: ITabs) {
    const [value, setValue] = useState(0);

    const handleOnChange = useCallback(
        (event: React.SyntheticEvent, newValue: number) => {
            setValue(newValue);
        },
        []
    );

    const getTabProps = useCallback((index: number) => {
        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`,
        };
    }, []);

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleOnChange}
                    aria-label="basic tabs example"
                >
                    {tabs.map((item, index) => (
                        <Tab
                            key={index}
                            label={item.label}
                            {...getTabProps(index)}
                        />
                    ))}
                </Tabs>
            </Box>
            {tabs.map((item, index) => (
                <TabPanel key={index} value={value} index={index}>
                    {item.element}
                </TabPanel>
            ))}
        </>
    );
}

export default AppTabs;
