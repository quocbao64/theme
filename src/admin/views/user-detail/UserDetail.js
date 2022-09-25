import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormLabel,
    CFormSelect,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import { userApi } from "../../../api/userApi";
import {
    AppFooter,
    AppHeader,
    AppSidebar,
    DocsExample,
} from "../../components";

function UserDetail(props) {
    const [listRole, setListRole] = useState([]);
    const [listUser, setListUser] = useState();
    const [user, setUser] = useState();
    const location = useLocation();
    const [option, setOption] = useState();

    const getListUser = async () => {
        try {
            const response = await adminApi.getListUser();
            console.log(response);
            setListUser(response);
        } catch (responseError) {
            console.log(responseError);
        }
    };

    const getListRole = async () => {
        try {
            const response = await adminApi.getListRole();
            setListRole(response);
        } catch (responseError) {
            console.log(responseError);
        }
    };

    const getUserById = async () => {
        const username = location.pathname.substring(
            "/admin/users/".length,
            location.pathname.length
        );
        try {
            const params = {
                username: username,
            };
            const response = await adminApi.getUserByUsername(params);
            console.log(response);
            setUser(response);
        } catch (responseError) {
            toast.error(responseError?.message, {
                duration: 2000,
            });
        }
    };

    const handleUpdateRole = async () => {
        try {
            const params = {
                username: user?.username,
                role: option,
            };
            const response = await adminApi.updateRoleUser(params);
            toast.success(response?.message, {
                duration: 2000,
            });
        } catch (responseError) {
            toast.error(responseError?.message, {
                duration: 2000,
            });
        }
    };
    useEffect(() => {
        getListUser();
        getListRole();
        getUserById();
    }, []);

    return (
        <div>
            <AppSidebar />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <div className="body flex-grow-1 px-3">
                    <CCol xs={12}>
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>Change User Info</strong>
                            </CCardHeader>
                            <CCardBody>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                        Email
                                    </CFormLabel>
                                    <CFormInput
                                        type="email"
                                        id="exampleFormControlInput1"
                                        placeholder="name@example.com"
                                        defaultValue={user?.email}
                                    />
                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                        Fullname
                                    </CFormLabel>
                                    <CFormInput
                                        type="text"
                                        id="exampleFormControlInput1"
                                        placeholder=""
                                        defaultValue={user?.fullname}
                                    />
                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                        Phone Number
                                    </CFormLabel>
                                    <CFormInput
                                        type="text"
                                        id="exampleFormControlInput1"
                                        placeholder=""
                                        defaultValue={user?.phoneNumber}
                                    />
                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="formFile">
                                        Upload avatar
                                    </CFormLabel>
                                    <CFormInput type="file" id="formFile" />
                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="formFile">
                                        Set Roles. Click Ctrl to select multiple
                                    </CFormLabel>
                                    <CFormSelect
                                        aria-label="Default select example"
                                        onChange={(e) =>
                                            setOption(e.target.value)
                                        }
                                    >
                                        {listRole?.map((item, index) => {
                                            return user?.role === item?.name ? (
                                                <option
                                                    key={index}
                                                    value={item?.name}
                                                    selected
                                                >
                                                    {item?.name?.replace(
                                                        "ROLE_",
                                                        ""
                                                    )}
                                                </option>
                                            ) : (
                                                <option
                                                    key={index}
                                                    value={item?.name}
                                                >
                                                    {item?.name?.replace(
                                                        "ROLE_",
                                                        ""
                                                    )}
                                                </option>
                                            );
                                        })}
                                    </CFormSelect>
                                </div>
                                <div className="mb-3">
                                    <CButton onClick={() => handleUpdateRole()}>
                                        Save
                                    </CButton>
                                </div>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </div>
                <AppFooter />
            </div>
        </div>
    );
}

export default UserDetail;
