import React, { Component, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { userApi } from "../../../api/userApi";

function EditProfile({ stateChanger, state, user }) {
    const [fullname, setFullname] = useState();
    const [password, setPassword] = useState();
    const [rePassword, setRePassword] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [alertMessage, setAlertMessage] = useState();
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setPopupAlertType] = useState("primary");

    const handleChangeProfile = async () => {
        if ((password !== "") & (password !== rePassword)) {
            setAlertMessage("re input password wrong");
            setAlertVisible(true);
            setPopupAlertType("danger");
            return;
        }

        try {
            const param = {
                fullname: fullname,
                password: password,
                phoneNumber: phoneNumber,
            };
            const response = await userApi.updateInfo(param);
            stateChanger(!state);
            toast.success("update sucessfully", {
                duration: 2000,
            });
        } catch (responseError) {
            console.log(responseError);
        }
    };

    return (
        <>
            <div className="profile-head">
                <h5>Edit Profile</h5>
            </div>
            <form className="edit-profile">
                <div className="">
                    <div className="form-group row">
                        <div className="col-12 col-sm-8 col-md-8 col-lg-9 ml-auto">
                            <h3>Personal Details</h3>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label">
                            Email
                        </label>
                        <div className="col-12 col-sm-8 col-md-8 col-lg-7">
                            <input
                                className="form-control"
                                type="text"
                                defaultValue={user?.email}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label">
                            Full Name
                        </label>
                        <div className="col-12 col-sm-8 col-md-8 col-lg-7">
                            <input
                                className="form-control"
                                type="text"
                                defaultValue={user?.fullname}
                                onChange={(e) => setFullname(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label">
                            Phone No.
                        </label>
                        <div className="col-12 col-sm-8 col-md-8 col-lg-7">
                            <input
                                className="form-control"
                                type="text"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                defaultValue={user?.phoneNumber}
                            />
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="form-group row">
                        <div className="col-12 col-sm-8 col-md-8 col-lg-9 ml-auto">
                            <h3>Password</h3>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label">
                            New Password
                        </label>
                        <div className="col-12 col-sm-8 col-md-8 col-lg-7">
                            <input
                                className="form-control"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label">
                            Re Type New Password
                        </label>
                        <div className="col-12 col-sm-8 col-md-8 col-lg-7">
                            <input
                                className="form-control"
                                type="password"
                                onChange={(e) => setRePassword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className={`alert alert-${alertType} alert-dismissible fade show`}
                    role="alert"
                    style={{ display: `${alertVisible ? "" : "none"}` }}
                >
                    {alertMessage}
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                    ></button>
                </div>
                <Toaster position="top-center" reverseOrder={true} />
                <div className="">
                    <div className="">
                        <div className="row">
                            <div className="col-12 col-sm-3 col-md-3 col-lg-2"></div>
                            <div className="col-12 col-sm-9 col-md-9 col-lg-7 d-flex align-items-center">
                                <span
                                    onClick={() => handleChangeProfile()}
                                    className="btn m-r10"
                                >
                                    Save changes
                                </span>
                                <button type="reset" className="btn-secondry">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default EditProfile;
