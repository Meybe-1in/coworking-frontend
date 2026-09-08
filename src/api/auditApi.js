import API from "./axiosConfig";

export const getAuditLogs = async (
  page = 0,
  size = 10,
  filters = {}
) => {
  const response = await API.get("/admin/audit-logs", {
    params: {
      page,
      size,
      ...(filters.adminName && {
        adminName: filters.adminName,
      }),
      ...(filters.startDate && {
        startDate: filters.startDate,
      }),
      ...(filters.endDate && {
        endDate: filters.endDate,
      }),
    },
  });

  return response.data;
};

export const exportAuditLogsCSV = async (
  filters = {}
) => {
  const response = await API.post(
    "/admin/audit-logs/export/csv",
    filters,
    {
      responseType: "blob",
    }
  );

  return response.data;
};