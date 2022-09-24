import React from "react";

const Dashboard = React.lazy(() => import("./admin/views/dashboard/Dashboard"));
// Base
const Accordion = React.lazy(() => import("./admin/views/users/Users"));

const routes = [
    { path: "/", exact: true, name: "Home" },
    { path: "/admin/dashboard", name: "Dashboard", element: Dashboard },
    { path: "/admin/users", name: "Users", element: Accordion },
];

export default routes;
