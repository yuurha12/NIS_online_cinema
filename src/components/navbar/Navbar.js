import React, { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import LoginForm from "../auth/Login";
import RegForm from "../auth/Register";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/icon/Icon.svg"
import { API } from "../../config/api";

//icon

import { AppContexts } from "../contexts/AppContexts";
//page
import ModalAuth from "../modal/auth";
import NavBarAdmin from "./NavbarAdmin";

const NavBar = ({ show, setShow }) => {
  const contexts = useContext(AppContexts);

  const [modalRegisterShow, setModalRegisterShow] = useState(false);
  const [modalLoginShow, setModalLoginShow] = useState(false);

  const [state] = useContext(AppContexts);
  const isLogin = state.isLogin;


  let redirect = null
  if (state.user.role === "admin") {
    redirect = '/income-transaction'
  }else{
    redirect = '/'
  }

  return (
    <>
      <Navbar className="nav-bg" bg="black" variant="dark">
        <Container>
          <Link to={redirect}>
            <Navbar.Brand className="brand">
              {" "}
              <img src={Logo} />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            {isLogin !== true ? (
              <Nav className="form-relog">
                <>
                  <Button
                    className="btn-login"
                    variant="primary"
                    onClick={() => setModalLoginShow(true)}
                  >
                    Login
                  </Button>
                  <LoginForm
                    show={modalLoginShow}
                    hide={() => setModalLoginShow(false)}
                    setModalLoginShow={contexts.showContextsetModalLoginShow}
                    setModalRegisterShow={setModalRegisterShow}
                  />
                  <Button
                    className="btn-reg"
                    variant="primary"
                    onClick={() => setModalRegisterShow(true)}
                  >
                    Register
                  </Button>
                  <RegForm
                    show={modalRegisterShow}
                    hide={() => setModalRegisterShow(false)}
                    setModalLoginShow={setModalLoginShow}
                    setModalRegisterShow={setModalRegisterShow}
                  />
                </>
              </Nav>
            ) : (
              <>
                {state.user.role === "user" ? (
                  <ModalAuth show={show} setShow={setShow} />
                ) : (
                  <NavBarAdmin />
                )}
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
