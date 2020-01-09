import api from '@/services/api';

export default {
  getOne(entity, id) {
    return api().get(`${entity}/${id}`);
  },

  findAll(entity, params) {
    return api().get(entity, { params });
  },

  create(entity, payload) {
    return api().post(entity, payload);
  },

  update(entity, id, payload) {
    return api().put(`${entity}/${id}`, payload);
  },

  delete(entity, payload) {
    return api().delete(entity, payload);
  },
};
