import React, { useContext, useState, useEffect } from "react";
import { AppContexts } from "../contexts/AppContexts";
import { NavDropdown, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PhotoProfile from "../../assets/images/blank-profile.png";
import Cart from "../../assets/images/icon/shopping-basket.svg";
import userAvatar from "../../assets/images/icon/user.svg";
import { API } from "../../config/api";
export default function ModalAuth() {
  const [bubble, setBubble] = useState([]);

  const [photo, setPhoto] = useState({});

  useEffect(() => {
    API.get("/user-profile")
      .then((res) => {
        setPhoto(res.data.data.profile);
      })
      .catch((err) => console.log("error", err));
  }, [photo]);



  useEffect(() => {
    API.get("/carts-id")
      .then((res) => {
        setBubble(res.data.data);
      })
      .catch((err) => console.log("error", err));
  }, []);
  // const userAva = <Image src={userIcon} alt="" roundedCircle />;

  const [state, dispatch] = useContext(AppContexts);

  let navigate = useNavigate();

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  const profile = () => {
    navigate("/profile");
  };

  return (
    <>
      <Nav className="d-flex mx-4">
        <Link to={state.user.role === "admin" ? "/" : "/payment"}>
          <img
            src={Cart}
            alt="cart"
            className="navbarCart"
          />
        </Link>
        <nav
          className={
            bubble === undefined
              ? "d-none"
              : bubble?.length === 0
              ? "d-none"
              : "circle"
          }
        >
          {bubble?.length}
        </nav>
      </Nav>
      <NavDropdown
        title={
          <img className="pp"
            src={
              photo?.image === "http://localhost:5000/uploads/"
                ? PhotoProfile
                : photo?.image
            }
            alt="Profile"
          />
        }
        alt="photoProfile"
        id="basic-nav-dropdown"
      >
        <NavDropdown.Item onClick={profile}>
          <img src={userAvatar} alt="" />
          Profile
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={logout}>
          <img src={userAvatar} alt="" />
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
}
