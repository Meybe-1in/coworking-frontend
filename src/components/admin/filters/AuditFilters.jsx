import { useState } from "react";

import {
    Search,
    BrushCleaning,
    RefreshCw,
    FileDown,
} from "lucide-react";

import Swal from "sweetalert2";

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

    const handleApplyFilters = () => {
        const hasStartDate = Boolean(startDate);
        const hasEndDate = Boolean(endDate);

        if (hasStartDate !== hasEndDate) {
            Swal.fire({
                icon: "warning",
                title: "Fechas incompletas",
                text: "Debes seleccionar una fecha de inicio y una fecha de fin.",
                confirmButtonText: "Entendido",
            });

            return;
        }

        if (
            hasStartDate &&
            hasEndDate &&
            startDate > endDate
        ) {
            Swal.fire({
                icon: "warning",
                title: "Rango de fechas inválido",
                text: "La fecha de inicio no puede ser posterior a la fecha de fin.",
                confirmButtonText: "Entendido",
            });

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

        clearFilters();
    };

    return (
        <>
            <div className="table-filters">

                {/* Primera fila */}
                <div className="table-filters__top">

                    <div className="table-filters__info">
                        <h1>Auditoría</h1>

                        <p>
                            Mostrando {auditLogs.length} de{" "}
                            {totalElements}
                        </p>
                    </div>

                    <div className="table-filters__filter-controls">

                        <div className="table-filters__field">

                            <input
                                id="admin-search"
                                type="text"
                                placeholder="Buscar administrador..."
                                value={adminName}
                                onChange={(e) =>
                                    setAdminName(e.target.value)
                                }
                                className="table-filters__search"
                            />
                        </div>

                        <div className="table-filters__field">
                            <label htmlFor="start-date">
                                Fecha inicio
                            </label>

                            <input
                                id="start-date"
                                type="date"
                                value={startDate}
                                onChange={(e) =>
                                    setStartDate(e.target.value)
                                }
                                className="audit-filter__date"
                            />
                        </div>

                        <div className="table-filters__field">
                            <label htmlFor="end-date">
                                Fecha fin
                            </label>

                            <input
                                id="end-date"
                                type="date"
                                value={endDate}
                                onChange={(e) =>
                                    setEndDate(e.target.value)
                                }
                                className="audit-filter__date"
                            />
                        </div>

                        <button
                            type="button"
                            className="table-filter__button"
                            onClick={handleApplyFilters}
                        >
                            <Search size={16} />
                            <span>Buscar</span>
                        </button>

                        <button
                            type="button"
                            className="table-filter__button"
                            onClick={handleClearFilters}
                        >
                            <BrushCleaning size={16} />
                            <span>Limpiar</span>
                        </button>

                    </div>
                </div>

                {/* Segunda fila */}
                <div className="table-filters__bottom">

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

                        {loading
                            ? "Actualizando..."
                            : "Actualizar"}
                    </button>

                    <button
                        type="button"
                        className="table-filter__export"
                        onClick={exportCSV}
                        disabled={exporting}
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

                        {exporting
                            ? "Exportando..."
                            : "Exportar CSV"}
                    </button>

                </div>
            </div>

            {exportError && (
                <p className="audit-filter__error">
                    {exportError}
                </p>
            )}
        </>
    );
}