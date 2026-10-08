export const getAdminNotifications = async () => {
    const response = await API.get("/admin/notifications");
    return response.data;
};

export const getAdminUnreadNotificationCount = async () => {
    const response = await API.get("/admin/notifications/unread-count");
    return response.data;
};

export const markAdminNotificationAsRead = async (notificationId) => {
    const response = await API.patch(
        `/admin/notifications/${notificationId}/read`
    );
    return response.data;
};

export const markAllAdminNotificationsAsRead = async () => {
    const response = await API.patch("/admin/notifications/read-all");
    return response.data;
};
