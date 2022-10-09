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
import { _ } from "core-js";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../../components";

function ClassDetail(props) {
    const [listSubject, setListSubject] = useState();
    const [listManager, setListManager] = useState();
    const [subject, setSubject] = useState();
    const [packages, setPackages] = useState();
    const [dateFrom, setDateFrom] = useState();
    const [dateTo, setDateTo] = useState();
    const [trainer, setTrainer] = useState();
    const [status, setStatus] = useState();
    const role = JSON.parse(Cookies.get("user"))?.role;
    const isNotAdmin = role !== "ROLE_ADMIN" ? true : false;
    const location = useLocation();
    const history = useHistory();
    const id = location.pathname.substring(
        "/admin/class/".length,
        location.pathname.length
    );
    const type = id !== "create" ? 1 : 0;

    const getAllSubject = async () => {
        try {
            const response = await adminApi.getAllSubject();
            setListSubject(response);
        } catch (responseError) {
            console.log(responseError);
        }
    };

    const getSubjectByCode = async () => {
        try {
            const response = await adminApi.getSubjectDetail(id);
            setSubject(response);
            console.log(response);
        } catch (responseError) {
            toast.error(responseError?.message, {
                duration: 2000,
            });
        }
    };

    const getListManager = async () => {
        try {
            const response = await adminApi.getListManager();
            setListManager(response);
        } catch (responseError) {
            toast.error(responseError?.message, {
                duration: 2000,
            });
        }
    };

    const handleUpdateSubject = async () => {
        try {
            const params = {
                packages: packages,
                dateFrom: dateFrom,
                dateTo: dateTo,
                status: status,
                trainer: trainer,
            };

            const response =
                type === 1
                    ? await adminApi.updateSubject(params, id)
                    : await adminApi.addSubject(params);
            console.log(response);
            toast.success(response?.message, {
                duration: 2000,
            });
            history.push("/admin/class");
        } catch (error) {
            toast.error(error?.message, {
                duration: 2000,
            });
        }
    };

    useEffect(() => {
        if (type === 1) {
            getAllSubject();
            getSubjectByCode();
        }
        if (role === "ROLE_ADMIN") getListManager();
    }, []);

    const optionStatus = [
        { status: false, label: "Inactive" },
        { status: true, label: "Active" },
    ];

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
                                <strong>
                                    {type === 1
                                        ? "Change Class Info"
                                        : "Create New Class"}
                                </strong>
                            </CCardHeader>
                            <CCardBody>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                        Package (
                                        <span style={{ color: "red" }}>*</span>)
                                    </CFormLabel>
                                    <CFormInput
                                        type="text"
                                        id="exampleFormControlInput1"
                                        disabled={isNotAdmin}
                                        placeholder=""
                                        defaultValue={
                                            type === 1 ? subject?.packages : ""
                                        }
                                        onChange={(e) =>
                                            setPackages(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                        Date From (
                                        <span style={{ color: "red" }}>*</span>)
                                    </CFormLabel>
                                    <CFormInput
                                        type="date"
                                        id="exampleFormControlInput1"
                                        disabled={isNotAdmin}
                                        placeholder=""
                                        defaultValue={
                                            type === 1 ? subject?.dateFrom : ""
                                        }
                                        onChange={(e) =>
                                            setDateFrom(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                        Date To (
                                        <span style={{ color: "red" }}>*</span>)
                                    </CFormLabel>
                                    <CFormInput
                                        type="date"
                                        id="exampleFormControlInput1"
                                        disabled={isNotAdmin}
                                        placeholder=""
                                        defaultValue={
                                            type === 1 ? subject?.dateTo : ""
                                        }
                                        onChange={(e) =>
                                            setDateTo(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                        Status (
                                        <span style={{ color: "red" }}>*</span>)
                                    </CFormLabel>
                                    <CFormSelect
                                        aria-label="Default select example"
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                    >
                                        {optionStatus?.map((item, index) => {
                                            if (type === 1) {
                                                return subject?.status ===
                                                    item?.status ? (
                                                    <option
                                                        key={index}
                                                        value={item?.status}
                                                        selected
                                                    >
                                                        {item?.label}
                                                    </option>
                                                ) : (
                                                    <option
                                                        key={index}
                                                        value={item?.status}
                                                    >
                                                        {item?.label}
                                                    </option>
                                                );
                                            } else {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={item?.status}
                                                    >
                                                        {item?.label}
                                                    </option>
                                                );
                                            }
                                        })}
                                    </CFormSelect>
                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="formFile">
                                        Manager
                                    </CFormLabel>
                                    <CFormSelect
                                        aria-label="Default select example"
                                        disabled={isNotAdmin}
                                        onChange={(e) =>
                                            setTrainer(e.target.value)
                                        }
                                    >
                                        <option>Select manager</option>
                                        {listManager?.map((item, index) => {
                                            if (type === 1) {
                                                return subject?.manager
                                                    ?.username ===
                                                    item?.username ? (
                                                    <option
                                                        key={index}
                                                        defaultValue={
                                                            item?.username
                                                        }
                                                        selected
                                                    >
                                                        {item?.username}
                                                    </option>
                                                ) : (
                                                    <option
                                                        key={index}
                                                        defaultValue={
                                                            item?.username
                                                        }
                                                    >
                                                        {item?.username}
                                                    </option>
                                                );
                                            } else {
                                                return (
                                                    <option
                                                        key={index}
                                                        defaultValue={
                                                            item?.username
                                                        }
                                                    >
                                                        {item?.username}
                                                    </option>
                                                );
                                            }
                                        })}
                                    </CFormSelect>
                                </div>

                                <div className="mb-3">
                                    <CButton
                                        onClick={() => handleUpdateSubject()}
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

export default ClassDetail;
