import API from "./axiosConfig";

export const getReservationSettings = async () => {
    const response = await API.get("/api/settings/reservation");

    return response.data;
};