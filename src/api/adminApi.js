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
};
