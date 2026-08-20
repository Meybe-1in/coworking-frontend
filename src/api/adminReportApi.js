import API from "./axiosConfig";

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