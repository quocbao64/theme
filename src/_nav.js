import React from "react";
import CIcon from "@coreui/icons-react";
import { cilSpeedometer, cilUser } from "@coreui/icons";
import { CNavItem } from "@coreui/react";

const _nav = [
    {
        component: CNavItem,
        name: "Dashboard",
        to: "/admin/dashboard",
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        badge: {
            color: "info",
            text: "NEW",
        },
    },
    {
        component: CNavItem,
        name: "Users",
        to: "/admin/users",
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    },
];

export default _nav;
