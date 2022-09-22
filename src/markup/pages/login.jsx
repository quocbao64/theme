import React, { Component, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

// Images
import logoWhite2 from "../../images/logo-white-2.png";
import bannerImg from "../../images/background/bg2.jpg";
import { userApi } from "../../api/userApi";
import GoogleLogin from "react-google-login";
import { useScript } from "../../hooks/useScript";

function Login(props) {
    const googlebuttonref = useRef();
    const onGoogleSignIn = (user) => {
        let userCred = user.credential;
        console.log(userCred);
    };
    useScript("https://accounts.google.com/gsi/client", () => {
        window.google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: onGoogleSignIn,
            auto_select: false,
        });

        window.google.accounts.id.renderButton(googlebuttonref.current, {
            size: "medium",
            text: "Google",
        });
    });

    return (
        <>
            <div className="account-form">
                <div
                    className="account-head"
                    style={{ backgroundImage: "url(" + bannerImg + ")" }}
                >
                    <Link to="/">
                        <img src={logoWhite2} alt="" />
                    </Link>
                </div>
                <div className="account-form-inner">
                    <div className="account-container">
                        <div className="heading-bx left">
                            <h2 className="title-head">
                                Login to your <span>Account</span>
                            </h2>
                            <p>
                                Don't have an account?{" "}
                                <Link to="/register">Create one here</Link>
                            </p>
                        </div>
                        <form className="contact-bx">
                            <div className="row placeani">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input
                                                name="name"
                                                type="text"
                                                required=""
                                                placeholder="Your Name"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input
                                                name="email"
                                                type="password"
                                                className="form-control"
                                                placeholder="Your Password"
                                                required=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group form-forget">
                                        <div className="custom-control custom-checkbox">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id="customControlAutosizing"
                                            />
                                            <label
                                                className="custom-control-label"
                                                htmlFor="customControlAutosizing"
                                            >
                                                Remember me
                                            </label>
                                        </div>
                                        <Link
                                            to="/forget-password"
                                            className="ml-auto"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-lg-12 m-b30">
                                    <button
                                        name="submit"
                                        type="submit"
                                        value="Submit"
                                        className="btn button-md"
                                    >
                                        Login
                                    </button>
                                </div>
                                <div className="col-lg-12">
                                    <h6 className="m-b15">
                                        Login with Social media
                                    </h6>
                                    <Link
                                        className="btn flex-fill m-r10 facebook"
                                        to="#"
                                    >
                                        <i className="fa fa-facebook"></i>
                                        Facebook
                                    </Link>
                                    <div ref={googlebuttonref}></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
