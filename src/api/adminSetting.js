import API from "./axiosConfig";

export const getAdminSettings = async () => {
    const response = await API.get("/admin/settings");
    return response.data;
};

export const updateAdminSettings = async (settingsData) => {
    const response = await API.put(
        "/admin/settings",
        settingsData
    );
    return response.data;
};