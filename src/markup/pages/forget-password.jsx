import React, { Component, useState } from "react";
import { Link } from "react-router-dom";

// Images
import logoWhite2 from "../../images/logo-white-2.png";
import bannerImg from "../../images/background/bg2.jpg";
import { userApi } from "../../api/userApi";

function ForgetPassword(props) {
    const [email, setEmail] = useState();

    const handleForgetPass = async () => {
        try {
            const param = {
                email: email,
            };

            const response = await userApi.forgetPassword(param);
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
                                Forget <span>Password</span>
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
                                <div className="col-lg-12 m-b30">
                                    <p
                                        className="btn button-md"
                                        onClick={() => handleForgetPass()}
                                    >
                                        Submit
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgetPassword;
