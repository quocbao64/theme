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
    const [listUser, setListUser] = useState([]);
    const [user, setUser] = useState({});
    const [fullname, setFullname] = useState();
    const [phone, setPhone] = useState();
    const location = useLocation();
    const [option, setOption] = useState();

    const getListUser = async () => {
        try {
            const response = await adminApi.getListUser();
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
            setUser(response);
        } catch (responseError) {
            toast.error(responseError?.message, {
                duration: 2000,
            });
        }
    };

    const handleUpdateRoleAndProfile = async () => {
        try {
            const params = {
                username: user?.username,
                role: option,
            };
            const paramsProfile = {
                username: user?.username,
                fullname: fullname,
                phoneNumber: phone,
            };
            if (option !== user.role && option !== undefined) {
                const response = await adminApi.updateRoleUser(params);
                toast.success(response?.message, {
                    duration: 2000,
                });
            }
            const responseProfile = await adminApi.updateUserProfile(
                paramsProfile
            );
            toast.success(responseProfile?.message, {
                duration: 2000,
            });
            getUserById();
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
                                        disabled
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
                                        onChange={(e) =>
                                            setFullname(e.target.value)
                                        }
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
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                    />
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
                                    <CButton
                                        onClick={() =>
                                            handleUpdateRoleAndProfile()
                                        }
                                    >
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