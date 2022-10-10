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
    updateUserProfile: (params, id) => {
        const url = `/api/admin/users/update-user?id=${id}`;
        return axiosApi.post(url, params);
    },

    getListManager: () => {
        const url = "/api/admin/users/manager-list";
        return axiosApi.get(url);
    },
    getListExpert: () => {
        const url = "/api/admin/users/expert-list";
        return axiosApi.get(url);
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

    // subject
    getAllSubject: (params) => {
        const url = `/api/subjects?name=${params?.name}&code=${params?.code}`;
        return axiosApi.get(url);
    },
    getSubjectDetail: (code) => {
        const url = `/api/subjects/${code}`;
        return axiosApi.get(url);
    },
    addSubject: (params) => {
        const url = `/api/subjects/create`;
        return axiosApi.post(url, params);
    },
    updateSubject: (params, id) => {
        const url = `/api/subjects/update?id=${id}`;
        return axiosApi.put(url, params);
    },
    managerUpdateSubject: (params) => {
        const url = "/api/subjects/manager-update";
        return axiosApi.put(url, params);
    },

    // class
    getAllClass: () => {
        const url = "/api/class";
        return axiosApi.get(url);
    },
    getClassDetail: (id) => {
        const url = `/api/class/${id}`;
        return axiosApi.get(url);
    },
    createClass: (params) => {
        const url = "/api/class/create";
        return axiosApi.post(url, params);
    },
    updateClass: (params, id) => {
        const url = `/api/class/update?id=${id}`;
        return axiosApi.post(url, params);
    },
};
