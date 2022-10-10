import { cilPeople } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
    CAvatar,
    CButton,
    CFormInput,
    CInputGroup,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from "@coreui/react";
import Cookies from "js-cookie";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { Toaster } from "react-hot-toast";
import { adminApi } from "../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../../components";

function Subjects() {
    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Subject Code",
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
                <CButton
                    href={`/react/admin/subjects/${row?.id}`}
                    color="primary"
                >
                    Edit
                </CButton>
            ),
        },
    ];
    const [listSubject, setListSubject] = useState([]);
    const [nameSearch, setNameSearch] = useState();
    const [codeSearch, setCodeSearch] = useState();
    const role = JSON.parse(Cookies.get("user"))?.role;
    const isNotAdmin = role !== "ROLE_ADMIN" ? true : false;

    const getAllSubject = async () => {
        try {
            const params = {
                name: nameSearch !== undefined ? nameSearch : "",
                code: codeSearch !== undefined ? codeSearch : "",
            };
            const response = await adminApi.getAllSubject(params);
            setListSubject(response);
        } catch (responseError) {
            console.log(responseError);
        }
    };

    useEffect(() => {
        getAllSubject();
    }, []);

    return (
        <div>
            <AppSidebar />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <CInputGroup className="px-3 pb-3 d-flex justify-content-between">
                    <div className="d-flex">
                        <CInputGroup className="mr-3">
                            <CFormInput
                                placeholder="Enter a name"
                                aria-label="Recipient's username"
                                aria-describedby="button-addon2"
                                style={{ maxWidth: "300px" }}
                                onChange={(e) => setNameSearch(e.target.value)}
                            />
                            <CFormInput
                                placeholder="Enter a subject code"
                                aria-label="Recipient's username"
                                aria-describedby="button-addon2"
                                className="mx-3"
                                style={{ maxWidth: "300px" }}
                                onChange={(e) => setCodeSearch(e.target.value)}
                            />
                            <CButton
                                type="button"
                                color="primary"
                                id="button-addon2"
                                onClick={() => getAllSubject()}
                            >
                                Search
                            </CButton>
                        </CInputGroup>
                    </div>
                    <CButton
                        type="button"
                        color="primary"
                        id="button-addon2"
                        disabled={isNotAdmin}
                        href="/react/admin/subjects/create"
                    >
                        Create New Subject
                    </CButton>
                </CInputGroup>
                <div className="body flex-grow-1 px-3">
                    <DataTable
                        columns={columns}
                        data={listSubject}
                        pagination
                    />
                </div>
                <AppFooter />
            </div>
        </div>
    );
}

export default Subjects;
