import {
    ResponsiveContainer,LineChart,Line,
    CartesianGrid,Tooltip,XAxis,YAxis,
} from "recharts";

import DashboardChart from "./DashboardChart";
import { formatChartLabel } from "../../../helpers/admin/chartFormatter";

export default function DashboardRevenueChart(props) {

    const { data } = props;

    return (

        <DashboardChart {...props}>

            <ResponsiveContainer
                width="100%"
                height="100%"
            >

                <LineChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 10,
                        left: 5,
                        bottom: 5,
                    }}
                >

                    <CartesianGrid
                        vertical={false}
                        stroke="#f3f4f6"
                    />

                    <XAxis
                        dataKey="period"
                        tickFormatter={formatChartLabel}
                        interval={0}
                        angle={-40}
                        textAnchor="end"
                        height={60}
                        tick={{
                            fontSize: 11,
                            fill: "#6b7280",
                        }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        axisLine={false}
                        tickLine={false}
                    />

                    <Tooltip
                        formatter={(value) => [
                            `$${Number(value).toFixed(2)}`,
                            "Ingresos",
                        ]}
                    />

                    <Line
                        type="monotone"
                        dataKey="total"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                    />

                </LineChart>
            </ResponsiveContainer>

        </DashboardChart>

    );

}