import React, { useState } from "react";
import "./navbar.scss";
import logo from "../../assets/images/logo.png";
import avatar from "../../assets/images/avatar.jpg";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { HOMEMENU } from "../../assets/menu/homeMenu";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <Link className="link-logo" to={"/"}>
            <img src={logo} alt="Netflix logo" className="logo" />
          </Link>
          <ul className="menuList">
            {HOMEMENU.map((item, index) => (
              <li className="menuItem" key={index}>
                <Link className="link-menu" to={item.path}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="right">
          <SearchIcon className="icon" />
          <span>KID</span>
          <NotificationsIcon className="icon" />
          <img className="avatar" src={avatar} alt="Avatar Img" width={50} />
          <div className="profile">
            <ArrowDropDownIcon className="icon" />
            <div className="options">
              <span>Settings</span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
