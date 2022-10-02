import React, { useEffect, useState } from "react";
import {
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CAvatar,
    CButton,
} from "@coreui/react";
import { AppFooter, AppHeader, AppSidebar } from "../../components";
import CIcon from "@coreui/icons-react";
import { cibCcMastercard, cifUs, cilPeople } from "@coreui/icons";
import avatar1 from "../../assets/images/avatars/1.jpg";
import { Link } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import toast, { Toaster } from "react-hot-toast";

const Users = () => {
    const [listUser, setListUser] = useState([]);
    const [isModify, setIsModify] = useState(false);

    const getListUser = async () => {
        try {
            const response = await adminApi.getListUser();
            setListUser(response);
        } catch (responseError) {
            console.log(responseError);
        }
    };

    const handleUpdateActiveUser = async (e) => {
        try {
            const params = {
                username: e?.username,
                status: e?.active,
            };
            const response = await adminApi.updateActiveUser(params);
            toast.success(response?.message, {
                duration: 2000,
            });
            setIsModify(!isModify);
        } catch (responseError) {
            toast.error(responseError, {
                duration: 2000,
            });
        }
    };

    useEffect(() => {
        getListUser();
    }, [isModify]);

    return (
        <div>
            <AppSidebar />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <div className="body flex-grow-1 px-3">
                    <CTable
                        align="middle"
                        className="mb-0 border"
                        hover
                        responsive
                    >
                        <CTableHead color="light">
                            <CTableRow>
                                <CTableHeaderCell className="text-center">
                                    <CIcon icon={cilPeople} />
                                </CTableHeaderCell>
                                <CTableHeaderCell>User</CTableHeaderCell>
                                <CTableHeaderCell>Roles</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">
                                    Status
                                </CTableHeaderCell>
                                <CTableHeaderCell className="text-center">
                                    Action
                                </CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {listUser?.map((item, index) => (
                                <CTableRow
                                    v-for="item in tableItems"
                                    key={index}
                                >
                                    <CTableDataCell className="text-center">
                                        <CAvatar
                                            size="md"
                                            src={item?.avatar || avatar1}
                                            status="active"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <div>
                                            {item?.fullname || item.email}
                                        </div>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <strong className="clearfix d-flex flex-column">
                                            {item?.role?.replace("ROLE_", "")}
                                        </strong>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center ">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <span
                                                className={`avatar-status ${
                                                    item?.active
                                                        ? "bg-success"
                                                        : "bg-warning"
                                                } mx-2`}
                                                style={{
                                                    borderBottomWidth: "0",
                                                }}
                                            ></span>
                                            <strong>
                                                {item?.active
                                                    ? "Active"
                                                    : "Inactive"}
                                            </strong>
                                        </div>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center ">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <CButton
                                                href={
                                                    "/react/admin/users/" +
                                                    item?.username
                                                }
                                                color="primary"
                                            >
                                                Edit
                                            </CButton>
                                            <div className="p-1"></div>
                                            <CButton
                                                color="warning"
                                                onClick={() =>
                                                    handleUpdateActiveUser(item)
                                                }
                                            >
                                                {item?.active
                                                    ? "Deactive"
                                                    : "Active"}
                                            </CButton>
                                        </div>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                </div>
                <AppFooter />
            </div>
        </div>
    );
};

export default Users;
