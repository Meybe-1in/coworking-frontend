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