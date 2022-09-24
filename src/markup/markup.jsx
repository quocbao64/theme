import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Elements
import BackToTop from "./elements/back-top";
import PageScrollTop from "./elements/page-scroll-top";

// Home Pages
import Index2 from "./pages/index-2";

// About Us
import About2 from "./pages/about-2";

// Events
import Events from "./pages/event";
import EventsDetails from "./pages/events-details";

// Faq
import Faq2 from "./pages/faq-2";

// Other Pages
import Portfolio from "./pages/portfolio";
import Profile from "./pages/profile";
import Membership from "./pages/membership";
import Error404 from "./pages/error-404";
import Register from "./pages/register";
import Login from "./pages/login";
import ForgetPassword from "./pages/forget-password";

// Courses
import Courses from "./pages/courses";
import CoursesDetails from "./pages/courses-details";

// Blog Pages
import BlogClassicSidebar from "./pages/blog-classic-sidebar";
import BlogDetails from "./pages/blog-details";

// Contact Us
import Contact1 from "./pages/contact-1";

import ForgetPasswordInput from "./pages/forget-password-input";

import Users from "../admin/views/users/Users";
import Dashboard from "../admin/views/dashboard/Dashboard";
import UserDetail from "../admin/views/user-detail/UserDetail";
import DefaultLayout from "../admin/layout/DefaultLayout";

class Markup extends Component {
    render() {
        return (
            <>
                <BrowserRouter basename={"/react/"}>
                    <Switch>
                        {/* Home Pages */}
                        <Route path="/" exact component={Index2} />

                        {/* About Us */}
                        <Route path="/about" exact component={About2} />

                        {/* Events */}
                        <Route path="/events" exact component={Events} />
                        <Route
                            path="/events-details"
                            exact
                            component={EventsDetails}
                        />

                        {/* Faq */}
                        <Route path="/faq" exact component={Faq2} />

                        {/* Other Pages */}
                        <Route path="/portfolio" exact component={Portfolio} />
                        <Route path="/profile" exact component={Profile} />
                        <Route
                            path="/membership"
                            exact
                            component={Membership}
                        />
                        <Route path="/error-404" exact component={Error404} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/login" exact component={Login} />
                        <Route
                            path="/forget-password"
                            exact
                            component={ForgetPassword}
                        />
                        <Route
                            path="/reset-password/:token"
                            exact
                            component={ForgetPasswordInput}
                        />
                        <Route path="/profile" exact component={Profile} />

                        {/* Courses */}
                        <Route path="/courses" exact component={Courses} />
                        <Route
                            path="/courses-details"
                            exact
                            component={CoursesDetails}
                        />

                        {/* Blog Pages */}
                        <Route
                            path="/blog"
                            exact
                            component={BlogClassicSidebar}
                        />
                        <Route
                            path="/blog-details"
                            exact
                            component={BlogDetails}
                        />

                        {/* Contact Us */}
                        <Route path="/contact-us" exact component={Contact1} />

                        {/* admin  */}
                        <Route
                            path="/admin/dashboard"
                            exact
                            component={() => <Dashboard />}
                        />
                        <Route
                            path="/admin/users"
                            exact
                            component={() => <Users />}
                        />
                        <Route
                            path="/admin/users/:id"
                            exact
                            component={() => <UserDetail />}
                        />
                    </Switch>

                    <PageScrollTop />
                </BrowserRouter>

                <BackToTop />
            </>
        );
    }
}

export default Markup;
