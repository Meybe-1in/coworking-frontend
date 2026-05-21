import API from "./axiosConfig";

export const createPaymentIntent = async (reservationId) => {
  const res = await API.post(`/payments/intent/${reservationId}`);
  return res.data;
};


export const getPayments = async ( ) => {
  const res = await API.get("/payments/my-history");
  return res.data;
}