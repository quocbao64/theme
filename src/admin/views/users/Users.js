import React, { useEffect, useState } from "react";
import {
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CAvatar,
} from "@coreui/react";
import { AppFooter, AppHeader, AppSidebar } from "../../components";
import CIcon from "@coreui/icons-react";
import { cibCcMastercard, cifUs, cilPeople } from "@coreui/icons";
import avatar1 from "../../assets/images/avatars/1.jpg";
import { Link } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";

const Users = () => {
    const [listUser, setListUser] = useState([]);

    const getListUser = async () => {
        try {
            const response = await adminApi.getListUser();
            console.log(response);
            setListUser(response);
        } catch (responseError) {
            console.log(responseError);
        }
    };

    useEffect(() => {
        getListUser();
    }, []);

    return (
        <div>
            <AppSidebar />
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
                                            src="../../assets/images/avatars/1.jpg"
                                            status="active"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <div>
                                            <Link
                                                to={"/admin/users/" + item?.id}
                                            >
                                                {item?.fullname}
                                            </Link>
                                        </div>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <div className="clearfix d-flex flex-column">
                                            {item?.roles.map((role, index) => (
                                                <div
                                                    className="float-start"
                                                    key={index}
                                                >
                                                    <strong>
                                                        {role?.name?.replace(
                                                            "ROLE_",
                                                            ""
                                                        )}
                                                    </strong>
                                                </div>
                                            ))}
                                        </div>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center ">
                                        <div className="d-flex align-items-center">
                                            <span
                                                className={`avatar-status ${
                                                    item?.isActive
                                                        ? "bg-success"
                                                        : "bg-warning"
                                                } mx-2`}
                                                style={{
                                                    borderBottomWidth: "0",
                                                }}
                                            ></span>
                                            <strong>
                                                {item?.isActive
                                                    ? "Active"
                                                    : "Inactive"}
                                            </strong>
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
