import React from "react";

const Dashboard = React.lazy(() => import("./admin/views/dashboard/Dashboard"));

const Widgets = React.lazy(() => import("./admin/views/widgets/Widgets"));

const routes = [
    { path: "/", exact: true, name: "Home" },
    { path: "/admin", name: "Dashboard", element: Dashboard },
    { path: "/widgets", name: "Widgets", element: Widgets },
];

export default routes;
