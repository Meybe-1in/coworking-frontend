// RESERVATION REPORT

export const RESERVATION_REPORT_METRICS = [
    {
        value: "TOTAL_RESERVAS",
        label: "Total de reservas",
    },
    {
        value: "HORAS_RESERVADAS",
        label: "Horas reservadas",
    },
    {
        value: "TOTAL_REVENUE",
        label: "Ingresos pagados totales",
    },
    {
        value: "PAID",
        label: "Reservas pagadas",
    },
];

export const DEFAULT_RESERVATION_REPORT_METRICS = [
    "TOTAL_RESERVAS",
];

// FINANCIAL REPORT

export const FINANCIAL_REPORT_METRICS = [
    {
        value: "TOTAL_REVENUE",
        label: "Ingresos totales",
    },
    {
        value: "TOTAL_RESERVATIONS",
        label: "Cantidad de reservas",
    },
    {
        value: "AVERAGE_RESERVATION",
        label: "Promedio por reserva",
    },
    {
        value: "SUCCESSFUL_PAYMENTS",
        label: "Pagos exitosos",
    },
];

export const DEFAULT_FINANCIAL_REPORT_METRICS = [
    "TOTAL_REVENUE",
];

// ROOM USAGE REPORT

export const ROOM_USAGE_REPORT_METRICS = [
    {
        value: "OCCUPANCY_PERCENTAGE",
        label: "Porcentaje de ocupación",
    },
    {
        value: "TOTAL_RESERVATIONS",
        label: "Cantidad de reservas",
    },
    {
        value: "RESERVED_HOURS",
        label: "Horas reservadas",
    },
];

export const DEFAULT_ROOM_USAGE_REPORT_METRICS = [
    "OCCUPANCY_PERCENTAGE",
];