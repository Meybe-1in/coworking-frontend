import API from "./axiosConfig";

export const getAdminStats = async () => {
    const response = await API.get("/admin/stats");
    return response.data;
}

export const cancelReservationAdmin = async (reservationId) => {
    const response = await API.patch(`/admin/reservations/${reservationId}/cancel`);
    return response.data;
}

export const getAllReservations = async (page = 0, size = 10) => {
    const response = await API.get("/admin/reservations", {
        params: {
            page,
            size,
        },
    });
    return response.data;
};

export const getAllPayments = async (page = 0,size = 10) => {

    const response =await API.get("/admin/payments", {
            params: {
                page,
                size,
            },
        });
    return response.data;
};

export const exportReservationsCSV = async () => {
    const response = await API.get("/admin/reports/reservations", {
        responseType: "blob",
    });
    return response.data;
}

export const exportPaymentsCSV = async () => {
    const response = await API.get("/admin/reports/payments", {
        responseType: "blob",
    });
    return response.data;
}

export const getUsers = async (page = 0,size = 10) => {

    const response =await API.get("/admin/users",{
            params:{
                page,
                size,
            },
        });
    return response.data;
};

export const createAdmin = async (userData) => {
    const res = await API.post("/admin/users/admin", userData);
    return res.data;
}

export const updateUserStatus = async (userId, enabled) => {
    const res = await API.patch(`/admin/users/${userId}/status`, { enabled });
    return res.data;
};

export const updateUserRole = async (userId, role) => {
    const res = await API.patch(`/admin/users/${userId}/role`, { role });
    return res.data;
}

export async function getAdminProfile() {
    const response = await API.get("/admin/profile");
    return response.data;
}