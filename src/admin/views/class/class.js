import { CButton, CFormInput, CInputGroup } from "@coreui/react";
import Cookies from "js-cookie";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { Toaster } from "react-hot-toast";
import { adminApi } from "../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../../components";

function Class() {
    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Class Code",
            selector: (row) => row.code,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Price",
            selector: (row) => row.price,
            sortable: true,
        },
        {
            name: "Manager",
            selector: (row) => row.manager?.username,
            sortable: true,
        },
        {
            name: "Expert",
            selector: (row) => row.expert?.username,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => (row.status ? "Active" : "Inactive"),
            sortable: true,
        },
        {
            name: "Action",
            selector: (row) => (
                <CButton href={`/react/admin/class/${row?.id}`} color="primary">
                    Edit
                </CButton>
            ),
        },
    ];
    const [listClass, setListClass] = useState([]);
    const role = JSON.parse(Cookies.get("user"))?.role;
    const isNotAdminOrManager =
        role !== "ROLE_ADMIN" && role !== "ROLE_MANAGER" ? true : false;

    const getAllClass = async () => {
        try {
            const response = await adminApi.getAllClass();
            setListClass(response);
        } catch (responseError) {
            console.log(responseError);
        }
    };

    useEffect(() => {
        getAllClass();
    }, []);

    return (
        <div>
            <AppSidebar />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <CInputGroup className="px-3 pb-3 d-flex justify-content-between">
                    <CButton
                        type="button"
                        color="primary"
                        id="button-addon2"
                        disabled={isNotAdminOrManager}
                        href="/react/admin/class/create"
                    >
                        Create New Class
                    </CButton>
                </CInputGroup>
                <div className="body flex-grow-1 px-3">
                    <DataTable columns={columns} data={listClass} pagination />
                </div>
                <AppFooter />
            </div>
        </div>
    );
}

export default Class;
