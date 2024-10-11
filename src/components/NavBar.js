import React from 'react';
import {Navbar, Container, Nav } from 'react-bootstrap';
import logo from "../assets/logo artistrate.png"
import styles from "../styles/NavBar.module.css"
import { NavLink } from 'react-router-dom';
import { useCurrentUser,   useSetCurrentUser,} from "../contexts/CurrentUserContext";

import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";



const NavBar = () => {

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();


  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };



  const addArtIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/arts/create"
    >
      <i className="fa-brands fa-artstation"></i> <span className={styles.Plus}>+</span> Art
    </NavLink>
  );


  const loggedInIcons = (
    <>
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/feed"
    >
      <i className="fas fa-stream"></i>Feed
    </NavLink>

    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/liked"
    >
      <i className="fas fa-heart"></i>Liked
    </NavLink>

    <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
      <i className="fas fa-sign-out-alt"></i>Signout
    </NavLink>

    <NavLink
      className={styles.NavLink}
      to={`/profiles/${currentUser?.profile_id}`}
    >
      <Avatar
        src={currentUser?.profile_image}
        height={40}
        className={styles.Avatar}
      />
      <span className="d-md-none d-lg-inline">{currentUser?.username}</span>
    </NavLink>
  </>
);



  const loggedOutIcons = (
    <>
    <NavLink className={styles.NavLink}
        activeClassName={styles.Active} to="/signin" ><i className='fas fa-sign-in-alt'></i> Sign in</NavLink>

      <NavLink className={styles.NavLink}
        activeClassName={styles.Active} to="/signup" ><i className='fas fa-user-plus'></i>Sign up</NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
      <NavLink className={styles.NavLink} to="/">
        <Navbar.Brand className={styles.NavBarBrand}>
          <img src={logo} alt="artistrate logo" height={45} />
        </Navbar.Brand>
      </NavLink>

      {/* Add highlight icon if logged in */}
      {currentUser && addArtIcon}

      <Navbar.Toggle
        onClick={() => setExpanded(!expanded)}
        aria-controls="basic-navbar-nav"
        ref={ref}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto text-left">
          <NavLink
            exact
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/discover"
          >
            <i className="fa-solid fa-magnifying-glass"></i>Discover
          </NavLink>

          {/* Add logged in links for logged in users and logged out links for logged out users */}
          {currentUser ? loggedInIcons : loggedOutIcons}
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );

};

export default NavBar;