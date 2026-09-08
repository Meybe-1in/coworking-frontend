import { useState } from "react";

import {
    Search,
    BrushCleaning,
    RefreshCw,
    FileDown,
} from "lucide-react";

import "./AuditFilters.css";

export default function AuditFilters({
    auditLogs,
    totalElements,
    loading,
    reloadAuditLogs,
    appliedFilters,
    applyFilters,
    clearFilters,
    exportCSV,
    exporting,
    exportError,
}) {
    const [adminName, setAdminName] = useState(
        appliedFilters.adminName || ""
    );

    const [startDate, setStartDate] = useState(
        appliedFilters.startDate || ""
    );

    const [endDate, setEndDate] = useState(
        appliedFilters.endDate || ""
    );

    const [filterError, setFilterError] = useState("");

    const handleApplyFilters = () => {
        setFilterError("");

        const hasStartDate = Boolean(startDate);
        const hasEndDate = Boolean(endDate);

        if (hasStartDate !== hasEndDate) {
            setFilterError(
                "Debes seleccionar una fecha de inicio y una fecha de fin."
            );
            return;
        }

        if (
            hasStartDate &&
            hasEndDate &&
            startDate > endDate
        ) {
            setFilterError(
                "La fecha de inicio no puede ser posterior a la fecha de fin."
            );
            return;
        }

        const filters = {};

        const normalizedAdminName = adminName.trim();

        if (normalizedAdminName) {
            filters.adminName = normalizedAdminName;
        }

        if (startDate && endDate) {
            filters.startDate = startDate;
            filters.endDate = endDate;
        }

        applyFilters(filters);
    };

    const handleClearFilters = () => {
        setAdminName("");
        setStartDate("");
        setEndDate("");
        setFilterError("");

        clearFilters();
    };

    return (
        <>
            <div className="table-filters">
                <div className="table-filters__info">
                    <h1>Auditoría</h1>
                    <p>
                        Mostrando {auditLogs.length} de {totalElements}
                    </p>
                </div>

                <div className="table-filters__actions">

                    <input
                        type="text"
                        placeholder="Buscar administrador..."
                        value={adminName}
                        onChange={(e) =>
                            setAdminName(e.target.value)
                        }
                        className="table-filters__search"
                    />

                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) =>
                            setStartDate(e.target.value)
                        }
                        className="audit-filter__date"
                    />

                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) =>
                            setEndDate(e.target.value)
                        }
                        className="audit-filter__date"
                    />

                    <button
                        type="button"
                        className="table-filter__button"
                        onClick={handleApplyFilters}
                        title="Buscar"
                        aria-label="Buscar"
                    >
                        <Search size={16} />
                    </button>

                    <button
                        type="button"
                        className="table-filter__button"
                        onClick={handleClearFilters}
                        title="Limpiar filtros"
                        aria-label="Limpiar filtros"
                    >
                        <BrushCleaning size={16} />
                    </button>

                    <button
                        type="button"
                        className="table-filter__refresh"
                        onClick={reloadAuditLogs}
                        disabled={loading}
                    >
                        <span
                            className={
                                loading
                                    ? "table-filters__icon--spin"
                                    : ""
                            }
                        >
                            <RefreshCw size={16} />
                        </span>

                        Actualizar
                    </button>

                    <button
                        type="button"
                        className="table-filter__export"
                        onClick={exportCSV}
                        disabled={exporting}
                        title="Exportar CSV"
                        aria-label="Exportar CSV"
                    >
                        <span
                            className={
                                exporting
                                    ? "table-filters__icon--spin"
                                    : ""
                            }
                        >
                            <FileDown size={16} />
                        </span>

                        {exporting ? "Exportando..." : "Exportar CSV"}
                    </button>
                </div>
            </div>

            {filterError && (
                <p className="audit-filter__error">
                    {filterError}
                </p>
            )}

            {exportError && (
                <p className="audit-filter__error">
                    {exportError}
                </p>
            )}
        </>
    );
}