import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { IData } from "../../../interfaces/iData";

type BarChartProps = {
    data: IData;
    currentCoutryCode?: string;
    dataKey?: string;
};

function AppBarChart({
    data,
    currentCoutryCode,
    dataKey = "deaths",
}: BarChartProps) {
    return (
        <div style={{ width: "100%", height: "50vh" }}>
            {data && (
                <ResponsiveContainer>
                    <BarChart
                        data={data}
                        margin={{
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="1 1" vertical={false} />
                        <XAxis dataKey="region_name" tick={{ fontSize: 10 }} />
                        <YAxis
                            dataKey={`number_of_${dataKey}`}
                            tick={{ fontSize: 10 }}
                        />
                        <Tooltip
                            cursor={{ fill: "transparent" }}
                            itemStyle={{
                                fontSize: 12,
                            }}
                        />
                        <Bar
                            type="monotone"
                            dataKey={`number_of_${dataKey}`}
                            name={`total ${dataKey}`}
                            fill="#1976d2"
                        >
                            {data.map((entry: any, index: any) => (
                                <Cell
                                    key={index}
                                    fill={
                                        entry.region_code === currentCoutryCode
                                            ? "#9c27b0"
                                            : "#1976d2"
                                    }
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

export default AppBarChart;
