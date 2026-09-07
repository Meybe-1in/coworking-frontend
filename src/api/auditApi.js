import API from "./axiosConfig";

export const getAuditLogs = async (page = 0, size = 10) => {
  const response = await API.get("/admin/audit-logs", {
    params: {
      page,
      size,
    },
  });

  return response.data;
};