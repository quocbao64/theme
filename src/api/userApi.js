import axiosApi from "./axiosApi";

export const userApi = {
    loginGoogle: (params) => {
        const url = "/api/oauth2/google";
        return axiosApi.post(url, params);
    },
    registerAccount: (params) => {
        const url = "/api/account/register";
        return axiosApi.post(url, params);
    },
};
