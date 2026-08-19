import { useEffect, useRef, useState } from "react";
import { Filter, ChevronDown } from "lucide-react";

import ReportFilters from "../ReportFilters";

import {
    RESERVATION_REPORT_METRICS,
    DEFAULT_RESERVATION_REPORT_METRICS,
} from "../../../../helpers/admin/reportMetrics";

import { inputStyle, buttonStyle } from "../../filters/filterStyles";

import "./ReservationReportFilters.css";

export default function ReservationReportFilters({
    onGenerate,
    loading = false,
}) {

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [metrics, setMetrics] = useState(
        DEFAULT_RESERVATION_REPORT_METRICS
    );

    const [metricsOpen, setMetricsOpen] = useState(false);
    const metricsRef = useRef(null);

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                metricsRef.current &&
                !metricsRef.current.contains(event.target)
            ) {
                setMetricsOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, []);

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
        <ReportFilters
            onSubmit={handleSubmit}
            loading={loading}
        >

            <div className="report-filter-group">

                <label>
                    Fecha inicio
                </label>

                <input
                    type="date"
                    value={startDate}
                    onChange={(event) =>
                        setStartDate(event.target.value)
                    }
                    style={inputStyle}
                    required
                />

            </div>

            <div className="report-filter-group">

                <label>
                    Fecha fin
                </label>

                <input
                    type="date"
                    value={endDate}
                    onChange={(event) =>
                        setEndDate(event.target.value)
                    }
                    style={inputStyle}
                    required
                />

            </div>

            <div ref={metricsRef} className="report-metrics">

                <button
                    type="button"
                    onClick={() =>
                        setMetricsOpen(!metricsOpen)
                    }
                    style={buttonStyle}
                    className="report-metrics__button"
                >
                    <Filter size={15} />

                    Métricas

                    <span>
                        {metrics.length}
                    </span>

                    <ChevronDown
                        size={14}
                        className={
                            metricsOpen
                                ? "report-metrics__chevron open"
                                : "report-metrics__chevron"
                        }
                    />
                </button>

                {metricsOpen && (
                    <div className="report-metrics__menu">

                        <span className="report-metrics__title">
                            Reporte
                        </span>

                        {RESERVATION_REPORT_METRICS.map(
                            (metric) => (
                                <label
                                    key={metric.value}
                                    className="report-metric"
                                >
                                    <input
                                        type="checkbox"
                                        checked={metrics.includes(
                                            metric.value
                                        )}
                                        onChange={() =>
                                            handleMetricChange(
                                                metric.value
                                            )
                                        }
                                    />

                                    <span>
                                        {metric.label}
                                    </span>
                                </label>
                            )
                        )}

                    </div>
                )}

            </div>

        </ReportFilters>
    );
}