import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { IRegionData } from "../../../interfaces/iData";
import { formatDateForHumans } from "../../../utils";

type LineChartProps = {
    data: IRegionData;
    dataKey?: string;
    dataMode?: string;
};

function AppLineChart({
    data,
    dataKey = "deaths",
    dataMode = "new",
}: LineChartProps) {
    return (
        <div style={{ width: "100%", height: "50vh" }}>
            {data && (
                <ResponsiveContainer>
                    <LineChart
                        data={data.data}
                        margin={{
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="1 1" vertical={false} />
                        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                        <YAxis
                            dataKey={`${dataMode}_${dataKey}`}
                            tick={{ fontSize: 10 }}
                        />
                        <Tooltip
                            itemStyle={{
                                fontSize: 12,
                            }}
                            labelFormatter={(name) =>
                                `${data.region_name} ${formatDateForHumans(
                                    name
                                )}`
                            }
                        />
                        <Line
                            type="monotone"
                            dataKey={`${dataMode}_${dataKey}`}
                            name={`${dataMode} ${dataKey}`}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

export default AppLineChart;
