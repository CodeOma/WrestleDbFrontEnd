import React from "react";
import CIcon from "@coreui/icons-react";

export const nav = [
  {
    _tag: "CSidebarNavTitle",
    _children: ["Database"],
  },

  {
    _tag: "CSidebarNavItem",
    name: "Techniques",
    to: "/techniques",
    icon: "cil-chart-pie",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Stats",
    to: "/charts",
    icon: "cil-chart-pie",
  },

  {
    _tag: "CSidebarNavDivider",
  },

  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Disabled",
  //   icon: "cil-ban",
  //   badge: {
  //     color: "secondary",
  //     text: "NEW",
  //   },
  //   addLinkClass: "c-disabled",
  //   disabled: true,
  // },
  {
    _tag: "CSidebarNavDivider",
    className: "m-2",
  },
];

export const manageOptions = [
  {
    _tag: "CSidebarNavTitle",
    _children: ["Manage"],
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Matches",
    route: "/managematches",
    icon: "cil-star",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Management",
        to: "/manage",
        icon: "cil-drop",
      },
      {
        _tag: "CSidebarNavItem",
        name: "View Match",
        to: "/database",
        icon: "cil-pencil",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Create Match",
        to: "/match/create",
        icon: "cil-drop",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Edit Match",
        to: "/match/edit",
        icon: "cil-pencil",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Team",
    route: "/manageteam",
    icon: "cil-star",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Manage Team",
        to: "/theme/typography",
        icon: "PersonIcon",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Stats",
        to: "/theme/colors",
        icon: "cil-drop",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Assign?",
        to: "/theme/typography",
        icon: "cil-pencil",
      },
    ],
  },
];
export const settingOptions = [
  {
    _tag: "CSidebarNavDropdown",
    name: "Settings",
    route: "/icons",
    icon: "cil-star",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "CoreUI Free",
        to: "/icons/coreui-icons",
        badge: {
          color: "success",
          text: "NEW",
        },
      },
      {
        _tag: "CSidebarNavItem",
        name: "CoreUI Flags",
        to: "/icons/flags",
      },
      {
        _tag: "CSidebarNavItem",
        name: "CoreUI Brands",
        to: "/icons/brands",
      },
    ],
  },
];
