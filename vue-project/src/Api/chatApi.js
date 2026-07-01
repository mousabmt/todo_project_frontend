import apiClient from "./httpClient"
export const chatApi = {
  getRoom: (roomId) => apiClient.get(`/chat/rooms/${roomId}`).then((r) => r.data),
  getMessages: (roomId) => apiClient.get(`/chat/rooms/${roomId}/messages`).then((r) => r.data),
  sendMessage: (roomId, body) =>
    apiClient.post(`/chat/rooms/${roomId}/messages`, { body }).then((r) => r.data),
  getInstructorChats: (instructorId) =>
    apiClient.get(`/student/instructors/${instructorId}/chats`).then((r) => r.data),
}
