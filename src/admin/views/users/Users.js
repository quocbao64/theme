import React, { useEffect, useState } from "react";
import { CButton } from "@coreui/react";
import { AppFooter, AppHeader, AppSidebar } from "../../components";
import { adminApi } from "../../../api/adminApi";
import toast, { Toaster } from "react-hot-toast";
import DataTable from "react-data-table-component";

const Users = () => {
    const columns = [
        {
            name: "ID",
            selector: (row) => row?.id,
            sortable: true,
        },
        {
            name: "User",
            selector: (row) => row?.username || row?.email,
            sortable: true,
        },
        {
            name: "Fullname",
            selector: (row) => row?.fullname,
            sortable: true,
        },
        {
            name: "Phone",
            selector: (row) => row?.phoneNumber,
            sortable: true,
        },
        {
            name: "Role",
            selector: (row) => row?.role?.replace("ROLE_", ""),
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => (
                <div className="d-flex align-items-center justify-content-center">
                    <span
                        className={`avatar-status ${
                            row?.active ? "bg-success" : "bg-warning"
                        } mx-2`}
                        style={{
                            borderBottomWidth: "0",
                        }}
                    ></span>
                    <strong>{row?.active ? "Active" : "Inactive"}</strong>
                </div>
            ),
            sortable: true,
        },
        {
            name: "Action",
            selector: (row) => (
                <div className="my-2">
                    <CButton
                        href={"/react/admin/users/" + row?.id}
                        style={{ width: "100px" }}
                        color="primary"
                    >
                        Edit
                    </CButton>
                    <div className="p-1"></div>
                    <CButton
                        color="warning"
                        style={{ width: "100px" }}
                        onClick={() => handleUpdateActiveUser(row)}
                    >
                        {row?.active ? "Deactive" : "Active"}
                    </CButton>
                </div>
            ),
        },
    ];
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
                    <DataTable columns={columns} data={listUser} pagination />
                </div>
                <AppFooter />
            </div>
        </div>
    );
};

export default Users;
