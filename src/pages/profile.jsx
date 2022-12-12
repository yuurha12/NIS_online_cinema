import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import QRCode from "react-qr-code";
import { AppContexts } from "../components/contexts/AppContexts";
import Rupiah from "rupiah-format";
import { API } from "../config/api";
import { useQuery } from "react-query";
import PhotoProfile from "../assets/images/blank-profile.png";
import ProfileModal from "../components/modal/profile";
import NavBar from "../components/navbar/Navbar";
import Logo from "../assets/images/icon/Group.png"
import { useParams } from "react-router-dom";

export default function Profile() {
  const title = "Profile";
  document.title = "Waysbucks | " + title;

  const [state] = useContext(AppContexts);

  // let { id } = useParams();
  let { data: Profile, refetch } = useQuery("profileChacess", async () => {
    const response = await API.get("/user-profile");
    return response.data.data.profile;
  });

  let { id } = useParams();
  let { data: transaction } = useQuery(
    "transactionChacessssss",
    async () => {
      const response = await API.get("/transaction/user/" + id);
      return response.data.data;
    }
  );

  return (
    <>
      <NavBar />
      <Container className="profileContainer">
        <div className="profileLeft">
          <h1>My Profile</h1>
          <ProfileModal refetch={refetch}/>
          <div className="biodata">
            <img
              src={
                Profile?.image === "https://res.cloudinary.com/dfebjhjpu/image/upload/v1670185375/waysbucks/"
                  ? PhotoProfile
                  : Profile?.image
              }
              alt="Profile"
            />
            <ul>
              <li className="biodataTitle">FULL NAME</li>
              <li className="biodataContent">{state.user.fullname}</li>
              <li className="biodataTitle">Email</li>
              <li className="biodataContent">{state.user.email}</li>
              <li className="biodataTitle">Phone</li>
              {/* <li className="biodataContent">{state.user.phone}</li> */}
            </ul>
          </div>
        </div>

        <div className="profileRight">
          <h1>MY TRANSACTIONS</h1>
          {transaction?.map((item, index) => (
            <div
              className={item?.status === "" ? "fd" : "profileCard mb-5"}
              key={index}
            >
              <div className="contentCardLeft">
                {item?.map((idx) => (
                  <div className="mapContent" key={idx}>
                    <img
                      src={
                        "http://localhost:5000/uploads/" + item?.image
                      }
                      alt="coffee"
                    />
                    <ul>
                      <li className="profileCardTitle">
                        {item?.title}
                      </li>
                      <li className="profileCardDate">
                        <strong>Saturday</strong>,20 Oktober 2022
                      </li>
                      <li className="profileCardToping">
                        <strong className="inline">
                       
                          {transaction.map((topping, idx) => (
                            <span key={idx}>{topping?.title},</span>
                          ))}
                        </strong>
                      </li>
                      <li className="profileCardPrice">
                        Price: {Rupiah.convert(item?.price)}
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
              <div
                className={
                  item?.status === "Success"
                    ? "contentCardRight Success"
                    : item?.status === "Cancel"
                    ? "contentCardRight Cancel"
                    : item?.status === "pending"
                    ? "contentCardRight Pending"
                    : "contentCardRight Otw"
                }
              >
                <img src={Logo} alt="logo" />

                <QRCode value="git re" bgColor="transparent" size={80} />
                <span>
                  <p>{item?.status}</p>
                </span>
                <p className="profileSubTotal">
                  Sub Total : {Rupiah.convert(item?.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
