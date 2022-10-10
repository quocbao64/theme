import { CButton, CFormInput, CInputGroup } from "@coreui/react";
import Cookies from "js-cookie";
import moment from "moment/moment";
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
            name: "Date From",
            selector: (row) => new Date(row.dateFrom).toLocaleDateString(),
            sortable: true,
        },
        {
            name: "Date To",
            selector: (row) => new Date(row.dateTo).toLocaleDateString(),
            sortable: true,
        },
        {
            name: "Trainer",
            selector: (row) => row.trainer?.username,
            sortable: true,
        },
        {
            name: "Package",
            selector: (row) => row.packages,
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
    const [packages, setPackages] = useState("");
    const role = JSON.parse(Cookies.get("user"))?.role;
    const isNotAdminOrManager =
        role !== "ROLE_ADMIN" && role !== "ROLE_MANAGER" ? true : false;

    const getAllClass = async () => {
        try {
            const response = await adminApi.getAllClass(packages);
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
