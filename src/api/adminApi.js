import API from "./axiosConfig";

export const getAdminStats = async () =>{
    const response = await API.get("/admin/stats");
    return response.data;
}

export const cancelReservationAdmin = async (reservationId) =>{
    const response = await API.patch(`/admin/reservations/${reservationId}/cancel`);
    return response.data;
}

export const getAllReservations = async () =>{
    const response = await API.get("/admin/reservations");
    return response.data;
}

export const getAllPayments = async () =>{
    const response = await API.get("/admin/payments");
    return response.data;
}

export const exportReservationsCSV = async () =>{
    const response = await API.get("/admin/reports/reservations", {
        responseType: "blob",
    });
    return response.data;
}

export const exportPaymentsCSV = async () =>{
    const response = await API.get("/admin/reports/payments", {
        responseType: "blob",
    });
    return response.data;
}

export const getUsers = async () => {
  const res = await API.get("/admin/users");
  return res.data;
};