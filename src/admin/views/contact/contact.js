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

const Contact = () => {
    const [listContact, setListContact] = useState([]);
    const [isModify, setIsModify] = useState(false);

    const getListContact = async () => {
        try {
            const response = await adminApi.getAllContact();
            setListContact(Object.values(response));
        } catch (responseError) {
            console.log(responseError);
        }
    };

    const handleUpdateStatus = async (e) => {
        try {
            const params = {
                status: e.status,
            };
            const response = await adminApi.updateStatusContact(params, e?.id);
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

    const handleDeleteContact = async (e) => {
        try {
            const response = await adminApi.deleteContact(e?.id);
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
        getListContact();
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
                                <CTableHeaderCell>Fullname</CTableHeaderCell>
                                <CTableHeaderCell>Email</CTableHeaderCell>
                                <CTableHeaderCell>Address</CTableHeaderCell>
                                <CTableHeaderCell>
                                    Phone Number
                                </CTableHeaderCell>
                                <CTableHeaderCell className="text-center">
                                    Action
                                </CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {listContact?.map((item, index) => (
                                <CTableRow
                                    v-for="item in tableItems"
                                    key={index}
                                >
                                    <CTableDataCell className="text-center">
                                        <CAvatar
                                            size="md"
                                            src={avatar1}
                                            status="active"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <div>{item?.fullName}</div>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <div>{item?.email}</div>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <div>{item?.address}</div>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <div>{item?.phoneNumber}</div>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center ">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <CButton
                                                color="warning"
                                                onClick={() =>
                                                    handleUpdateStatus(item)
                                                }
                                            >
                                                {item?.status
                                                    ? "Resolved"
                                                    : "Not Resolved"}
                                            </CButton>
                                            <CButton
                                                className="ms-2"
                                                color="danger"
                                                onClick={() =>
                                                    handleDeleteContact(item)
                                                }
                                            >
                                                Delete
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

export default Contact;
