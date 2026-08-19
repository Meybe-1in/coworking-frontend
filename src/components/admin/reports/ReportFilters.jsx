import { useState } from "react";
import {
    RESERVATION_REPORT_METRICS,
    DEFAULT_RESERVATION_REPORT_METRICS,
} from "../../../helpers/admin/reportMetrics";

export default function ReservationReportFilters({
    onGenerate,
    loading = false,
}) {

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [metrics, setMetrics] = useState(
        DEFAULT_RESERVATION_REPORT_METRICS
    );

    const handleMetricChange = (value) => {

        setMetrics((currentMetrics) => {

            if (currentMetrics.includes(value)) {

                return currentMetrics.filter(
                    (metric) => metric !== value
                );

            }

            return [...currentMetrics, value];

        });
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        onGenerate({
            startDate,
            endDate,
            metrics,
        });
    };

    return (
        <form onSubmit={handleSubmit}>

            <div>
                <label htmlFor="startDate">
                    Fecha inicio
                </label>

                <input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(event) =>
                        setStartDate(event.target.value)
                    }
                    required
                />
            </div>

            <div>
                <label htmlFor="endDate">
                    Fecha fin
                </label>

                <input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(event) =>
                        setEndDate(event.target.value)
                    }
                    required
                />
            </div>

            <fieldset>

                <legend>Reporte</legend>

                {RESERVATION_REPORT_METRICS.map((metric) => (
                    <label key={metric.value}>
                        <input
                            type="checkbox"
                            checked={metrics.includes(metric.value)}
                            onChange={() =>
                                handleMetricChange(metric.value)
                            }
                        />

                        {metric.label}
                    </label>
                ))}

            </fieldset>

            <button
                type="submit"
                disabled={loading || metrics.length === 0}
            >
                {loading
                    ? "Generando reporte..."
                    : "Generar reporte"}
            </button>

        </form>
    );
}