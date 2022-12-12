import React, { useState, useRef, useContext } from "react";
import { Nav, Image, Stack, Button, Overlay, Popover } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProfileAdmin from "../../assets/images/mod.jpg";
import AddTopingImg from "../../assets/images/icon/topping.svg";
import AddFilmImg from "../../assets/images/icon/addfilm.svg";
import LogoutIcon from "../../assets/images/icon/logout.svg";
import { AppContexts } from "../contexts/AppContexts";

function NavBarAdmin() {
  const [show, setShow] = useState(false);

  const [target, setTarget] = useState(null);

  const ref = useRef(null);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const [state, dispatch] = useContext(AppContexts)

  const logout = () => {
    console.log(state)
    dispatch({
        type: "LOGOUT"
    })
    navigate("/")
}

  return (
    <>
      <Nav className="d-flex flex-row justify-content-end">
        <Stack
          direction="horizontal"
          gap={5}
          className="d-flex flex-row justify-content-end"
        >
          <div ref={ref}>
            <Button
              onClick={handleClick}
              className="p-0 m-0 bg-transparent border-0"
              style={{ width: "70px", height: "70px" }}
            >
              <Image
                src={ProfileAdmin}
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  border: "solid",
                  borderWidth: "2px",
                  borderColor: "#bd0707",
                }}
              />
            </Button>

            <Overlay
              show={show}
              target={target}
              placement="bottom-end"
              container={ref}
            >
              <Popover id="popover-contained">
                <Popover.Body>
                  {/* button add product start */}
                  <Button
                    onClick={() => {
                      navigate("/add-film");
                    }}
                    className="d-flex flex-column justify-content-center bg-white border-0 mb-3"
                  >
                    <div className="d-flex flex-row justify-content-center">
                      <div className="d-flex flex-column justify-content-center">
                        <Image src={AddFilmImg} style={{ width: "100%" }} />
                      </div>
                      <p
                        className="justify-content-end m-0"
                        style={{ color: "#bd0707" }}
                      >
                        Add Film
                      </p>
                    </div>
                  </Button>
                  {/* button add product end */}
                </Popover.Body>
                <hr className="m-0 p-0" />
                <Popover.Body>
                  {/* button logout start */}
                  <Button
                    onClick={logout}
                    className="d-flex flex-column justify-content-center bg-white border-0"
                  >
                    <div className="d-flex flex-row justify-content-center">
                      <div className="d-flex flex-column justify-content-center">
                        <Image src={LogoutIcon} style={{ width: "100%" }} />
                      </div>
                      <p
                        className="d-flex flex-column justify-content-center m-0"
                        style={{ color: "#bd0707" }}
                      >
                        Logout
                      </p>
                    </div>
                  </Button>
                  {/* button logout end */}
                </Popover.Body>
              </Popover>
            </Overlay>
          </div>
        </Stack>
      </Nav>
    </>
  );
}

export default NavBarAdmin;
