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

export default function Profile() {
  const title = "Profile";
  document.title = "Waysbucks | " + title;

  const [state] = useContext(AppContexts);

  let { data: ProfileTransactions } = useQuery(
    "transactionChacesss",
    async () => {
      const response = await API.get("/user-transaction");
      return response.data.data;
    }
  );

  let { data: Profile, refetch } = useQuery("profileChaces", async () => {
    const response = await API.get("/user-profile");
    return response.data.data.profile;
  });

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
                Profile?.image === "http://localhost:5000/uploads/"
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
              <li className="biodataContent">{state.profile?.phone}</li>
              <li className="biodataTitle">Postal Code</li>
              <li className="biodataContent">{state.profile?.postalcode}</li>
              <li className="biodataTitle">Address</li>
              <li className="biodataContent">{state.profile?.adrress}</li>
            </ul>
          </div>
        </div>

        <div className="profileRight">
          <h1>MY TRANSACTIONS</h1>
          {ProfileTransactions?.map((item, index) => (
            <div
              className={item?.status === "" ? "fd" : "profileCard mb-5"}
              key={index}
            >
              <div className="contentCardLeft">
                {item?.carts?.map((cart, idx) => (
                  <div className="mapContent" key={idx}>
                    <img
                      src={
                        "http://localhost:5000/uploads/" + cart?.product?.image
                      }
                      alt="coffee"
                    />
                    <ul>
                      <li className="profileCardTitle">
                        {cart?.product?.title}
                      </li>
                      <li className="profileCardDate">
                        <strong>Saturday</strong>,20 Oktober 2022
                      </li>
                      <li className="profileCardToping">
                        <strong className="inline">
                       
                          {cart.topping.map((topping, idx) => (
                            <span key={idx}>{topping?.title},</span>
                          ))}
                        </strong>
                      </li>
                      <li className="profileCardPrice">
                        Price: {Rupiah.convert(cart?.product?.price)}
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
                  Sub Total : {Rupiah.convert(item?.total)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
