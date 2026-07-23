import API from "./axiosConfig";
import { toUTC } from "../utils/dateUtils";

export const getRooms = async () => {
  const res = await API.get("/api/rooms");

  return res.data.data || res.data;
};

export const getRoomById = async (id) => {
  const res = await API.get(`/api/rooms/${id}`);
  return res.data.data || res.data;
};

export const getAllRooms = async (page = 0,size = 10) => {

  const response = await API.get("/api/rooms", {
      params: {
        page,
        size,
      },
    });
  return response.data;
};

export const deleteRoom = async (id) => {
  await API.delete(`/api/rooms/${id}`);
};

export const getRoomsAvailability = async (filters) => {
  const { date, start, end, people } = filters;

  const startDateTime = toUTC(date, start);
  const endDateTime = toUTC(date, end);

  const response = await API.get("/api/rooms/availability", {
    params: {
      start: startDateTime,
      end: endDateTime,
      people
    }
  });

  return response.data;
}

//createRoom y updateRoom se pueden unificar en una función saveRoom que reciba un id opcional, si el id existe hace un PUT, si no hace un POST. Pero por ahora los dejo separados para mantener la claridad.

export const updateRoom = async (
  id,
  roomData,
  image
) => {
  const formData = new FormData();

  formData.append(
    "room",
    new Blob(
      [JSON.stringify(roomData)],
      {
        type: "application/json",
      }
    )
  );

  if (image) {
    formData.append(
      "image",
      image
    );
  }

  const res = await API.put(
    `/api/rooms/${id}`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const createRoom = async (
  roomData,
  image
) => {
  const formData = new FormData();

  formData.append(
    "room",
    new Blob(
      [JSON.stringify(roomData)],
      {
        type: "application/json",
      }
    )
  );

  if (image) {
    formData.append(
      "image",
      image
    );
  }

  const res = await API.post(
    "/api/rooms",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return res.data;
};