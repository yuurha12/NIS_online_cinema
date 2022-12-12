import React, { useContext, useState, useEffect } from "react";
import { AppContexts } from "../contexts/AppContexts";
import { NavDropdown, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PhotoProfile from "../../assets/images/blank-profile.png";
// import Cart from "../../assets/images/icon/shopping-basket.svg";

//icon dropwdown user
import userIcon from "../../assets/images/icon/user2.svg";
import logoutIcon from "../../assets/images/icon/logout1.svg"
import myListIcon from "../../assets/images/icon/clapperboard1.svg"
import { API } from "../../config/api";
export default function ModalAuth() {

  const [photo, setPhoto] = useState({});

  useEffect(() => {
    API.get("/user-profile")
      .then((res) => {
        setPhoto(res.data.data.profile);
      })
      .catch((err) => console.log("error", err));
  }, [photo]);



  // useEffect(() => {
  //   API.get("/carts-id")
  //     .then((res) => {
  //       setBubble(res.data.data);
  //     })
  //     .catch((err) => console.log("error", err));
  // }, []);
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

  const myListFilm = () => {
    navigate("/mylistfilm")
  }

  return (
    <>
      <Nav className="d-flex mx-4">
      </Nav>
      <NavDropdown
        title={
          <img className="pp"
            src={
              photo?.image === "https://res.cloudinary.com/dfebjhjpu/image/upload/v1670185375/waysbucks/"
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
          <img src={userIcon} alt="" />
          Profile
        </NavDropdown.Item>
        <NavDropdown.Item onClick={myListFilm}>
          <img src={myListIcon} alt="mylistIcon" />
          My Film List
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={logout}>
          <img src={logoutIcon} alt="" />
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
}
