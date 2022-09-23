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
    loginAccount: (params) => {
        const url = "/api/account/login";
        return axiosApi.post(url, params);
    },
    forgetPassword: (params) => {
        const url = "/api/account/forgot-password";
        return axiosApi.post(url, params);
    },
    resetPassword: (token, params) => {
        const url = "/api/account/reset-password/" + token;
        return axiosApi.post(url, params);
    },
};
