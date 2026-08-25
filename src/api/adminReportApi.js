import API from "./axiosConfig";

// Reservation reports
export const getReservationReport = async (request) => {
    const response = await API.post(
        "/admin/reports/reservations",
        request
    );

    return response.data;
};

export const generateReservationReportPdf = async (request) => {
    const response = await API.post(
        "/admin/reports/reservations/pdf",
        request,
        {
            responseType: "blob",
        }
    );

    return response.data;
};

export const generateReservationReportCsv = async (request) => {
    const response = await API.post(
        "/admin/reports/reservations/csv",
        request,
        {
            responseType: "blob",
        }
    );

    return response.data;
};

// financial reports
export const getFinancialReport = async (request) => {
    const response = await API.post(
        "/admin/reports/financial",
        request
    );

    return response.data;
};

export const generateFinancialReportPdf = async (request) => {
    const response = await API.post(
        "/admin/reports/financial/pdf",
        request,
        {
            responseType: "blob",
        }
    );

    return response.data;
};

export const generateFinancialReportCsv = async (request) => {
    const response = await API.post(
        "/admin/reports/financial/csv",
        request,
        {
            responseType: "blob",
        }
    );

    return response.data;
};