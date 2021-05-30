import React from "react";
// import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

// routes config
// import routes from '../routes'

import {
  HeaderDropdown,
  HeaderDropdownMssg,
  HeaderDropdownNotif,
  HeaderDropdownTasks,
} from "./index";

const Header = ({ setToggleSideBar, toggleSideBar }) => {
  // const dispatch = useDispatch()
  // const sidebarShow = useSelector(state => state.sidebarShow)

  const toggleSidebar = () => {
    setToggleSideBar(!toggleSideBar);
  };

  const toggleSidebarMobile = () => {
    setToggleSideBar(!toggleSideBar);

    // const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    // dispatch({type: 'set', sidebarShow: val})
  };

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className='ml-md-3 d-lg-none'
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className='ml-3 d-md-down-none'
        onClick={toggleSidebar}
      />
      <CHeaderBrand className='mx-auto d-lg-none' to='/'>
        <CIcon name='logo' height='48' alt='Logo' />
      </CHeaderBrand>

      <CHeaderNav className='d-md-down-none mr-auto'>
        <CHeaderNavItem className='px-3'>
          <CHeaderNavLink to='/'>Home</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className='px-3'>
          <CHeaderNavLink to='/database'>Matches</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className='px-3'>
          <CHeaderNavLink to='/techniques'>Techniques</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className='px-3'>
          <CHeaderNavLink to='/stats'>Stats</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className='px-3'>
          <CHeaderNavLink to='/wrestler'>Wrestlers</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className='px-3'>
        {/* <HeaderDropdownNotif />
        <HeaderDropdownTasks />
        <HeaderDropdownMssg />
        <HeaderDropdown /> */}
      </CHeaderNav>

      {/* <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          // routes={routes} 
        />
          <div className="d-md-down-none mfe-2 c-subheader-nav">
            <CLink className="c-subheader-nav-link"href="#">
              <CIcon name="cil-speech" alt="Settings" />
            </CLink>
            <CLink 
              className="c-subheader-nav-link" 
              aria-current="page" 
              to="/dashboard"
            >
              <CIcon name="cil-graph" alt="Dashboard" />&nbsp;Dashboard
            </CLink>
            <CLink className="c-subheader-nav-link" href="#">
              <CIcon name="cil-settings" alt="Settings" />&nbsp;Settings
            </CLink>
          </div>
      </CSubheader> */}
    </CHeader>
  );
};

export default Header;
