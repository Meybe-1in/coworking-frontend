import "./ReportFilters.css";
import { buttonStyle } from "../filters/filterStyles";

export default function ReportFilters({
    children,
    onSubmit,
    loading = false,
}) {
    return (
        <form
            className="report-filters"
            onSubmit={onSubmit}
        >
            <div className="report-filters__controls">
                {children}
            </div>

            <button
                type="submit"
                disabled={loading}
                style={buttonStyle}
                className="report-filters__generate"
            >
                {loading
                    ? "Generando..."
                    : "Generar reporte"}
            </button>
        </form>
    );
}