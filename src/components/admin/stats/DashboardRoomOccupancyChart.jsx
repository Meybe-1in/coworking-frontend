import {
    ResponsiveContainer, BarChart, Bar,
    CartesianGrid, Tooltip, XAxis, YAxis,
} from "recharts";
import DashboardChart from "./DashboardChart";
import RoomOccupancyTooltip from "../ui/RoomOccupancyTooltip";

export default function DashboardRoomOccupancyChart(props) {

    const { data } = props;

    const chartData = [...(data ?? [])].sort(
        (a, b) => b.occupancyPercentage - a.occupancyPercentage
    );

    return (

        <DashboardChart {...props}>
            <ResponsiveContainer
                width="100%"
                height="100%"
            >

                <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{
                        top: 10,
                        right: 20,
                        left: 15,
                        bottom: 10,
                    }}
                >

                    <CartesianGrid
                        horizontal={false}
                        stroke="#f3f4f6"
                    />

                    <XAxis
                        type="number"
                        domain={[0, 100]}
                        axisLine={false}
                        tickLine={false}
                        tick={{
                            fontSize: 11,
                            fill: "#6b7280",
                        }}
                    />

                    <YAxis
                        type="category"
                        dataKey="roomName"
                        width={100}
                        axisLine={false}
                        tickLine={false}
                        tick={{
                            fontSize: 12,
                            fill: "#374151",
                        }}
                    />

                    <Tooltip
                        cursor={{
                            fill: "rgba(79,70,229,.06)",
                        }}
                        content={<RoomOccupancyTooltip />}
                    />

                    <Bar
                        dataKey="occupancyPercentage"
                        fill="#7c3aed"
                        radius={[0, 8, 8, 0]}
                    />

                </BarChart>
            </ResponsiveContainer>
        </DashboardChart>

    );
}