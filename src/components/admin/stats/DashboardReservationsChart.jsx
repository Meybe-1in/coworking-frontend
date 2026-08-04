import {
    ResponsiveContainer, BarChart, Bar,
    XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

import Loader from "../ui/Loader";
import Err from "../ui/Err";
import CustomSelect from "../ui/CustomSelect";
import { formatChartLabel } from "../../../helpers/admin/chartFormatter";
import { CHART_PERIODS } from "../../../helpers/admin/chartPeriods";

import "./DashboardReservationsChart.css";

export default function DashboardReservationsChart({
    title,
    data,
    loading,
    error,
    period,
    setPeriod,
}) {

    return (
        <section className="chart-container">
            <div className="chart-header">
                <div>
                    <h3 className="chart-title">{title}</h3>
                </div>

                <CustomSelect
                    value={period}
                    onValueChange={setPeriod}
                    options={Object.values(CHART_PERIODS)}
                />

            </div>

            <div className="chart-wrapper">

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Err msg={error} />
                ) : !data || data.length === 0 ? (
                    <div className="chart-empty">
                        No hay información disponible
                    </div>
                ) : (

                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
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
                                allowDecimals={false}
                                axisLine={false}
                                tickLine={false}
                            />

                            <Tooltip
                                cursor={{
                                    fill: "rgba(79,70,229,.06)",
                                }}
                                contentStyle={{
                                    borderRadius: 10,
                                    border: "1px solid #e5e7eb",
                                    boxShadow: "0 8px 20px rgba(0,0,0,.08)",
                                }}
                                formatter={(value) => [
                                    `${value}`,
                                    "Reservas",
                                ]}
                            />

                            <Bar
                                dataKey="total"
                                fill="#4f46e5"
                                radius={[6, 6, 0, 0]}
                            />

                        </BarChart>
                    </ResponsiveContainer>

                )}
            </div>
        </section>
    );
}