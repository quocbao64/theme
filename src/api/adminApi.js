import axiosApi from "./axiosApi";

export const adminApi = {
    getListRole: () => {
        const url = "/api/role/roles";
        return axiosApi.get(url);
    },
};
