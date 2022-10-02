import React from "react";
import CIcon from "@coreui/icons-react";
import { cilContact, cilSpeedometer, cilUser } from "@coreui/icons";
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
    {
        component: CNavItem,
        name: "Contact",
        to: "/admin/contact",
        icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: "Subjects",
        to: "/admin/subjects",
        icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
    },
];

export default _nav;
