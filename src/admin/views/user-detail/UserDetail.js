import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormLabel,
    CFormSelect,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { adminApi } from "../../../api/adminApi";
import { userApi } from "../../../api/userApi";
import {
    AppFooter,
    AppHeader,
    AppSidebar,
    DocsExample,
} from "../../components";

function UserDetail(props) {
    const [selectOptions, setSelectOptions] = useState([]);
    const [listRole, setListRole] = useState([]);
    const [user, setUser] = useState();

    const handleChange = (e) => {
        let target = e.target;
        //here
        let value = Array.from(
            target.selectedOptions,
            (option) => option.value
        );
        console.log(value);
        setSelectOptions(value);
    };

    const getUserInfo = async () => {
        try {
            const response = await userApi.getUserDetail();
            console.log(response);
            setUser(response);
        } catch (responseError) {
            console.log(responseError);
        }
    };

    const getListRole = async () => {
        try {
            const response = await adminApi.getListRole();
            console.log(response);
            setListRole(response);
        } catch (responseError) {
            console.log(responseError);
        }
    };

    useEffect(() => {
        getUserInfo();
        getListRole();
    }, []);

    return (
        <div>
            <AppSidebar />
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
                                        multiple
                                        onChange={(e) => handleChange(e)}
                                        value={selectOptions}
                                    >
                                        {listRole.map((role, index) => (
                                            <option
                                                value={role?.name}
                                                key={index}
                                            >
                                                {role?.name.replace(
                                                    "ROLE_",
                                                    ""
                                                )}
                                            </option>
                                        ))}
                                    </CFormSelect>
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
