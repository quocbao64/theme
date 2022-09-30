import axiosApi from "./axiosApi";

export const adminApi = {
    getListRole: () => {
        const url = "/api/role/roles";
        return axiosApi.get(url);
    },
    getListUser: () => {
        const url = "/api/admin/users";
        return axiosApi.get(url);
    },
    updateActiveUser: (params) => {
        const url = "/api/admin/users/active";
        return axiosApi.post(url, params);
    },
    updateRoleUser: (params) => {
        const url = "/api/role/update";
        return axiosApi.post(url, params);
    },
    getUserByUsername: (params) => {
        const url = "/api/admin/users/detail";
        return axiosApi.post(url, params);
    },
    updateUserProfile: (params) => {
        const url = "/api/admin/users/update-user";
        return axiosApi.post(url, params);
    },

    // Web Contact
    getAllContact: () => {
        const url = "/api/admin/web-contact/";
        return axiosApi.get(url);
    },
    updateStatusContact: (params, id) => {
        const url = `/api/admin/web-contact/update-status?id=${id}`;
        return axiosApi.put(url, params);
    },
    deleteContact: (id) => {
        const url = `/api/admin/web-contact/delete?id=${id}`;
        return axiosApi.delete(url);
    },
    updateContact: (params, id) => {
        const url = `/api/admin/web-contact/update?id=${id}`;
        return axiosApi.put(url, params);
    },
};
