import React, { Component, useState } from "react";
import { Link } from "react-router-dom";

// Images
import logoWhite2 from "../../images/logo-white-2.png";
import bannerImg from "../../images/background/bg2.jpg";
import { userApi } from "../../api/userApi";

function Register(props) {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleRegister = async () => {
        try {
            const param = {
                username: username,
                email: email,
                password: password,
            };

            const response = await userApi.registerAccount(param);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

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
                                Sign Up <span>Now</span>
                            </h2>
                            <p>
                                Login Your Account{" "}
                                <Link to="/login">Click here</Link>
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
                                                placeholder="Your Username"
                                                required=""
                                                className="form-control"
                                                onChange={(e) =>
                                                    setUsername(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input
                                                name="email"
                                                type="email"
                                                placeholder="Your Email Address"
                                                required=""
                                                className="form-control"
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input
                                                name="password"
                                                type="password"
                                                placeholder="Your Password"
                                                className="form-control"
                                                required=""
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 m-b30">
                                    <p
                                        className="btn button-md"
                                        onClick={() => handleRegister()}
                                    >
                                        Sign up
                                    </p>
                                </div>
                                <div className="col-lg-12">
                                    <h6 className="m-b15">
                                        Sign Up with Social media
                                    </h6>
                                    <Link
                                        className="btn flex-fill m-r10 facebook"
                                        to="#"
                                    >
                                        <i className="fa fa-facebook"></i>
                                        Facebook
                                    </Link>
                                    <Link
                                        className="btn flex-fill m-l5 google-plus"
                                        to="#"
                                    >
                                        <i className="fa fa-google-plus"></i>
                                        Google Plus
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
