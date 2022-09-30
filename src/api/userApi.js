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
    getUserDetail: () => {
        const url = "/api/account/info";
        return axiosApi.get(url);
    },
    updateInfo: (params) => {
        const url = "/api/account/update-info";
        return axiosApi.put(url, params);
    },
    uploadAvatar: (params) => {
        const url = "/api/account/upload-avatar";
        return axiosApi.post(url, params);
    },
    getAvatar: (imageName) => {
        const url = "/api/account/downloadFile/" + imageName;
        return axiosApi.get(url);
    },

    // Web Contact
    sendContact: (params) => {
        const url = "/api/web-contact/add";
        return axiosApi.post(url, params);
    },
};
