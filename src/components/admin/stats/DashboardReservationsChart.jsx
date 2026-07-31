import {
    ResponsiveContainer, BarChart, Bar,
    XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

import Loader from "../ui/Loader";
import Err from "../ui/Err";

import "./DashboardReservationsChart.css";

export default function DashboardReservationsChart({
    data,
    loading,
    error,
}) {

    if (loading) {
        return (
            <div className="chart-container">
                <Loader />
            </div>
        );
    }


    if (error) {
        return (
            <div className="chart-container">
                <Err msg={error} />
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="chart-container chart-empty">
                No hay información disponible
            </div>
        );
    }


    return (
        <section className="chart-container">

            <h2 className="chart-title">
                Reservas por período
            </h2>

            <div className="chart-wrapper">

                <ResponsiveContainer width="100%"height="100%">
                    <BarChart data={data}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="period"
                        />
                        <YAxis />

                        <Tooltip
                            formatter={(value) => [
                                value,
                                "Reservas",
                            ]}
                        />

                        <Bar
                            dataKey="reservations"
                            fill="#4f46e5"
                        />

                    </BarChart>
                </ResponsiveContainer>

            </div>

        </section>
    );
}