import React from "react";

const Dashboard = React.lazy(() => import("./admin/views/dashboard/Dashboard"));
// Base
const Users = React.lazy(() => import("./admin/views/users/Users"));
const Subject = React.lazy(() => import("./admin/views/subjects/subjects"));
const Contact = React.lazy(() => import("./admin/views/contact/contact"));

const routes = [
    { path: "/", exact: true, name: "Home" },
    { path: "/admin/dashboard", name: "Dashboard", element: Dashboard },
    { path: "/admin/users", name: "Users", element: Users },
    { path: "/admin/contact", name: "Contact", element: Contact },
    { path: "/admin/subjects", name: "Subject", element: Subject },
];

export default routes;
