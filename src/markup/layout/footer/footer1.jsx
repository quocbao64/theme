import React, { Component } from "react";
import { Link } from "react-router-dom";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";

// Images
import logo from "../../../images/logo-white.png";
import galleryPic1 from "../../../images/gallery/pic1.jpg";
import galleryPic2 from "../../../images/gallery/pic2.jpg";
import galleryPic3 from "../../../images/gallery/pic3.jpg";
import galleryPic4 from "../../../images/gallery/pic4.jpg";
import galleryPic5 from "../../../images/gallery/pic5.jpg";
import galleryPic6 from "../../../images/gallery/pic6.jpg";
import galleryPic7 from "../../../images/gallery/pic7.jpg";
import galleryPic8 from "../../../images/gallery/pic8.jpg";
import {
    CAlert,
    CButton,
    CForm,
    CFormInput,
    CFormTextarea,
} from "@coreui/react";
import { useState } from "react";
import { userApi } from "../../../api/userApi";
import toast, { Toaster } from "react-hot-toast";

const content = [
    {
        thumb: galleryPic1,
    },
    {
        thumb: galleryPic2,
    },
    {
        thumb: galleryPic3,
    },
    {
        thumb: galleryPic4,
    },
    {
        thumb: galleryPic5,
    },
    {
        thumb: galleryPic6,
    },
    {
        thumb: galleryPic7,
    },
    {
        thumb: galleryPic8,
    },
];

const options = {
    settings: {
        overlayColor: "rgba(0,0,0,0.9)",
        backgroundColor: "#FDC716",
        slideAnimationType: "slide",
    },
    buttons: {
        backgroundColor: "#f7b205",
        iconColor: "rgba(255, 255, 255, 1)",
        showDownloadButton: false,
        showAutoplayButton: false,
        showThumbnailsButton: false,
    },
    caption: {
        captionColor: "#232eff",
        captionFontFamily: "Raleway, sans-serif",
        captionFontWeight: "300",
        captionTextTransform: "uppercase",
    },
};

function GalleryImg() {
    return (
        <>
            <SimpleReactLightbox>
                <SRLWrapper options={options}>
                    <ul className="magnific-image">
                        {content.map((item, index) => (
                            <li key={index}>
                                <img src={item.thumb} alt="" />
                            </li>
                        ))}
                    </ul>
                </SRLWrapper>
            </SimpleReactLightbox>
        </>
    );
}

function Footer1(props) {
    const [fullname, setFullname] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [phone, setPhone] = useState();
    const [comment, setComment] = useState();
    const [alertMessage, setAlertMessage] = useState("Please input field");
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState("primary");

    const handleSendContact = async () => {
        try {
            const params = {
                fullName: fullname,
                email: email,
                address: address,
                phoneNumber: phone,
                message: comment,
            };

            const response = await userApi.sendContact(params);
            console.log(response);
            setAlertMessage(response?.message);
            setAlertVisible(true);
            setAlertType("success");
        } catch (responseError) {
            console.log(responseError);
        }
    };

    return (
        <>
            <footer>
                <div className="footer-top">
                    <div className="pt-exebar">
                        <div className="container">
                            <div className="d-flex align-items-stretch">
                                <div className="pt-logo mr-auto">
                                    <Link to="/">
                                        <img src={logo} alt="" />
                                    </Link>
                                </div>
                                <div className="pt-social-link">
                                    <ul className="list-inline m-a0">
                                        <li>
                                            <Link to="#" className="btn-link">
                                                <i className="fa fa-facebook"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#" className="btn-link">
                                                <i className="fa fa-twitter"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#" className="btn-link">
                                                <i className="fa fa-linkedin"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#" className="btn-link">
                                                <i className="fa fa-google-plus"></i>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="pt-btn-join">
                                    <Link to="/contact-1" className="btn">
                                        Join Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-12 col-sm-12 footer-col-4">
                                <div className="widget">
                                    <h6 className="footer-title">
                                        Sign Up For A Newsletter
                                    </h6>
                                    <p className="text-capitalize m-b20">
                                        Weekly Breaking news analysis and
                                        cutting edge advices on job searching.
                                    </p>
                                    <div className="subscribe-form m-b20">
                                        <form className="subscription-form">
                                            <div className="ajax-message"></div>
                                            <div className="input-group">
                                                <input
                                                    name="email"
                                                    required="required"
                                                    className="form-control"
                                                    placeholder="Your Email Address"
                                                    type="email"
                                                />
                                                <span className="input-group-btn">
                                                    <button
                                                        name="submit"
                                                        value="Submit"
                                                        type="submit"
                                                        className="btn"
                                                    >
                                                        <i className="fa fa-arrow-right"></i>
                                                    </button>
                                                </span>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-5 col-md-7 col-sm-12">
                                <CForm>
                                    <h5 className="footer-title">Contact Us</h5>
                                    <CAlert
                                        color={alertType}
                                        visible={alertVisible}
                                    >
                                        {alertMessage}
                                    </CAlert>
                                    <div className="row pb-3">
                                        <div className="w-50">
                                            <CFormInput
                                                type="text"
                                                id="floatingInput"
                                                placeholder="name@example.com"
                                                floatingLabel="Fullname"
                                                onChange={(e) =>
                                                    setFullname(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="w-50">
                                            <CFormInput
                                                type="email"
                                                id="floatingInput"
                                                placeholder="name@example.com"
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                floatingLabel="Email"
                                            />
                                        </div>
                                    </div>
                                    <div className="row pb-3">
                                        <div className="w-50">
                                            <CFormInput
                                                type="text"
                                                id="floatingInput"
                                                onChange={(e) =>
                                                    setAddress(e.target.value)
                                                }
                                                placeholder="name@example.com"
                                                floatingLabel="Address"
                                            />
                                        </div>
                                        <div className="w-50">
                                            <CFormInput
                                                type="text"
                                                id="floatingInput"
                                                floatingLabel="Phone Number"
                                                onChange={(e) =>
                                                    setPhone(e.target.value)
                                                }
                                                placeholder="name@example.com"
                                            />
                                        </div>
                                    </div>
                                    <CFormTextarea
                                        placeholder="Leave a comment here"
                                        id="floatingTextarea2"
                                        floatingLabel="Message"
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                    ></CFormTextarea>
                                    <div className="p-2"></div>
                                    <CButton
                                        style={{ float: "right" }}
                                        onClick={() => handleSendContact()}
                                    >
                                        Send
                                    </CButton>
                                    <div className="p-2"></div>
                                </CForm>
                            </div>
                            <div className="col-12 col-lg-3 col-md-5 col-sm-12 footer-col-4">
                                <div className="widget widget_gallery gallery-grid-4">
                                    <h5 className="footer-title">
                                        Our Gallery
                                    </h5>
                                    <GalleryImg />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                                {" "}
                                © 2021{" "}
                                <span className="text-white">EduChamp</span> All
                                Rights Reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer1;
