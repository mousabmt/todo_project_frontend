import api from '@/Api/httpClient';

export const courseService = {
    getAll:   ()         => api.get('/instructor/courses'),
    getOne:   (id)       => api.get(`/instructor/courses/${id}`),
    create:   (formData) => api.post('/instructor/courses', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
    update:   (id, formData) => api.post(`/instructor/courses/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
    delete:   (id)       => api.delete(`/instructor/courses/${id}`),
};
