import React, { useState } from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const NestedDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const submenuOpen = Boolean(submenuAnchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSubmenuAnchorEl(null);
  };

  const handleSubmenuOpen = (event) => {
    setSubmenuAnchorEl(event.currentTarget);
  };

  const handleSubmenuClose = () => {
    setSubmenuAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls={open ? "main-menu" : undefined}
        aria-haspopup="true"
        onClick={handleMenuClick}
      >
        Blog
      </Button>
      <Menu
        id="main-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <NavLink to="/blogs">Blog</NavLink>
        </MenuItem>
        <MenuItem aria-haspopup="true" onClick={handleSubmenuOpen}>
          Categories
        </MenuItem>
        <Menu
          id="submenu"
          anchorEl={submenuAnchorEl}
          open={submenuOpen}
          onClose={handleSubmenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={() => handleMenuClose()}>
            <NavLink to="/blogs/news-announcements">
              News & Announcements
            </NavLink>
          </MenuItem>
          <MenuItem onClick={() => handleMenuClose()}>
            <NavLink to="/blogs/industry-insights">Industry Insights</NavLink>
          </MenuItem>
          <MenuItem onClick={() => handleMenuClose()}>
            <NavLink to="/blogs/interviews">Interviews</NavLink>
          </MenuItem>
          <MenuItem onClick={() => handleMenuClose()}>
            <NavLink to="/blogs/case-studies">Case Studies</NavLink>
          </MenuItem>
          <MenuItem onClick={() => handleMenuClose()}>
            <NavLink to="/blogs/talent-tips-tricks">
              Talent Tips & Tricks
            </NavLink>
          </MenuItem>
          <MenuItem onClick={() => handleMenuClose()}>
            <NavLink to="/blogs/brand-tips-tricks">Brand Tips & Tricks</NavLink>
          </MenuItem>
        </Menu>
      </Menu>
    </div>
  );
};

export default NestedDropdown;
