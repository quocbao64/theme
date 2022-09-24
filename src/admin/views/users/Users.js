import React from "react";
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

const Users = () => {
    const tableExample = [
        {
            id: 1,
            avatar: { src: avatar1, status: "success" },
            user: {
                name: "Yiorgos Avraamu",
                new: true,
                registered: "Jan 1, 2021",
            },
            country: { name: "USA", flag: cifUs },
            roles: ["ROLE_USER", "ROLE_EDITOR", "ROLE_ADMIN"],
            isActive: true,
            activity: "10 sec ago",
        },
        {
            id: 2,
            avatar: { src: avatar1, status: "success" },
            user: {
                name: "Yiorgos Avraamu",
                new: true,
                registered: "Jan 1, 2021",
            },
            country: { name: "USA", flag: cifUs },
            roles: ["ROLE_USER", "ROLE_EDITOR", "ROLE_ADMIN"],
            isActive: false,
            activity: "10 sec ago",
        },
    ];

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
                                <CTableHeaderCell className="text-center">
                                    Country
                                </CTableHeaderCell>
                                <CTableHeaderCell>Roles</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">
                                    Status
                                </CTableHeaderCell>
                                <CTableHeaderCell>Activity</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {tableExample.map((item, index) => (
                                <CTableRow
                                    v-for="item in tableItems"
                                    key={index}
                                >
                                    <CTableDataCell className="text-center">
                                        <CAvatar
                                            size="md"
                                            src={item.avatar.src}
                                            status={item.avatar.status}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <div>
                                            <Link
                                                to={"/admin/users/" + item.id}
                                            >
                                                {item.user.name}
                                            </Link>
                                        </div>
                                        <div className="small text-medium-emphasis">
                                            <span>
                                                {item.user.new
                                                    ? "New"
                                                    : "Recurring"}
                                            </span>{" "}
                                            | Registered: {item.user.registered}
                                        </div>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                        <CIcon
                                            size="xl"
                                            icon={item.country.flag}
                                            title={item.country.name}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <div className="clearfix d-flex flex-column">
                                            {item.roles.map((role, index) => (
                                                <div
                                                    className="float-start"
                                                    key={index}
                                                >
                                                    <strong>
                                                        {role.replace(
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
                                                class={`avatar-status ${
                                                    item.isActive
                                                        ? "bg-success"
                                                        : "bg-warning"
                                                } mx-2`}
                                                style={{
                                                    borderBottomWidth: "0",
                                                }}
                                            ></span>
                                            <strong>
                                                {item.isActive
                                                    ? "Active"
                                                    : "Inactive"}
                                            </strong>
                                        </div>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <div className="small text-medium-emphasis">
                                            Last login
                                        </div>
                                        <strong>{item.activity}</strong>
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
