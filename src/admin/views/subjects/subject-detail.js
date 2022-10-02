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
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../../components";

function SubjectDetail(props) {
    const [listSubject, setListSubject] = useState();
    const [listManager, setListManager] = useState();
    const [listExpert, setListExpert] = useState();
    const [subject, setSubject] = useState();
    const [codeSubject, setCodeSubject] = useState();
    const [name, setName] = useState();
    const [status, setStatus] = useState(false);
    const [note, setNote] = useState();
    const [manager, setManager] = useState();
    const [expert, setExpert] = useState();
    const [image, setImage] = useState();
    const location = useLocation();
    const id = location.pathname.substring(
        "/admin/subjects/".length,
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

    const getListExpert = async () => {
        try {
            const response = await adminApi.getListExpert();
            setListExpert(response);
        } catch (responseError) {
            toast.error(responseError?.message, {
                duration: 2000,
            });
        }
    };

    const handleUpdateSubject = async () => {
        try {
            console.log(status);
            const params = {
                code: codeSubject,
                name: name,
                status: status,
                note: note,
                manager: manager,
                expert: expert,
            };
            const formData = new FormData();
            if (image) {
                formData.append("image", image, image?.name);
                Object.assign(params, formData);
            }
            const response =
                type === 1
                    ? await adminApi.updateSubject(params, id)
                    : await adminApi.addSubject(params);
            console.log(response);
            toast.success(response?.message, {
                duration: 2000,
            });
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
        getListManager();
        getListExpert();
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
                                        ? "Change Subject Info"
                                        : "Create New Subject"}
                                </strong>
                            </CCardHeader>
                            <CCardBody>
                                <div className="mb-3">
                                    <CFormLabel>
                                        Code (
                                        <span style={{ color: "red" }}>*</span>)
                                    </CFormLabel>
                                    <CFormInput
                                        type="text"
                                        id="exampleFormControlInput1"
                                        defaultValue={
                                            type === 1 ? subject?.code : ""
                                        }
                                        onChange={(e) =>
                                            setCodeSubject(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                        Name (
                                        <span style={{ color: "red" }}>*</span>)
                                    </CFormLabel>
                                    <CFormInput
                                        type="text"
                                        id="exampleFormControlInput1"
                                        placeholder=""
                                        defaultValue={
                                            type === 1 ? subject?.name : ""
                                        }
                                        onChange={(e) =>
                                            setName(e.target.value)
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
                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                        Note (
                                        <span style={{ color: "red" }}>*</span>)
                                    </CFormLabel>
                                    <CFormInput
                                        type="text"
                                        id="exampleFormControlInput1"
                                        placeholder=""
                                        defaultValue={
                                            type === 1 ? subject?.note : ""
                                        }
                                        onChange={(e) =>
                                            setNote(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="formFile">
                                        Manager
                                    </CFormLabel>
                                    <CFormSelect
                                        aria-label="Default select example"
                                        onChange={(e) =>
                                            setManager(e.target.value)
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
                                    <CFormLabel htmlFor="formFile">
                                        Expert
                                    </CFormLabel>
                                    <CFormSelect
                                        aria-label="Default select example"
                                        onChange={(e) =>
                                            setExpert(e.target.value)
                                        }
                                    >
                                        <option>Select expert</option>
                                        {listExpert?.map((item, index) => {
                                            if (type === 1) {
                                                return subject?.expert
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
                                    <CFormLabel htmlFor="formFile">
                                        Upload Image Subject
                                    </CFormLabel>
                                    <input
                                        className="form-control"
                                        type="file"
                                        accept=".jpg, .png"
                                        defaultValue={subject?.image}
                                        onChange={(e) =>
                                            setImage(e.target.files[0])
                                        }
                                    />
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

export default SubjectDetail;
