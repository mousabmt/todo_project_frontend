import api from "@/Api/httpClient";

export const chatService = {
  getRoom: (room) => api.get(`chat/rooms/${room}`),
  getRoomMessages: (room) => api.get(`chat/rooms/${room}/messages`),
  storeRoomMessages: (room) => api.post(`chat/rooms/${room}/messages`),
};
