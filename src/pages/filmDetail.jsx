// dependencies
import { useNavigate, useParams } from "react-router-dom";
import Rupiah from "rupiah-format";
import { useState,useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";

// style
import productModules from "../style/css/product.module.css";

// component
import NavBar from "../components/navbar/Navbar";
import { Button, Col, Container, Row } from "react-bootstrap";

export default function DetailFilmPage() {
  document.title = "ONLINE CINEMA | FILM";

  const navigate = useNavigate();
  const { id } = useParams();

  let { data: film } = useQuery("filmdetailCache", async () => {
    const response = await API.get(`/film/${id}`);
    return response.data.data;
  });

  let { data: trx } = useQuery("trxCache", async () => {
    const response = await API.get(`/transactions`);
    const filter = response.data.data.filter(
      (p) => (p.film_id == id) & (p.status == "success")
    );
    return filter;
  });

  console.log(trx?.length);

  // Create config Snap payment page with useEffect here ...
  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-YfPPe6xt9e4ncB5G";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleSubmit = useMutation(async () => {
    try {
      // Get data from product
      const data = {
        film_id: film.id,
        // BuyerId: film.user.id,
        price: film.price,
      };

      // Create variabel for store token payment from response here ...
      const response = await API.post("/transaction", data);

      const token = response.data.data.token;

      window.snap.pay(token, {
        onSuccess: function (result) {
          navigate("/profile")
        },
        onPending: function (result) {
          navigate("/profile")
        },
        onError: function (result) {
          navigate("/profile")
        },
        onClose: function () {
          navigate("/profile")
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });

      // Init Snap for display payment page with token here ...
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <>
      <NavBar />
      <Container>
        <section>
          <div className={productModules.wrap}>
            <Row className={productModules.left}>
              <Col>
                <img src={film?.image} alt="ProductImage" />
              </Col>
            </Row>
            <Row className="position-relative">
              <Col className="d-flex mb-5" id="ck">
                <p className={productModules.titleProduct}>{film?.title}</p>
                <Button
                  className={productModules.btn}
                  onClick={(e) => handleSubmit.mutate(e)}
                >
                  Buy Now
                </Button>
              </Col>
              <iframe
                className="yt"
                width="560"
                height="315"
                src={film?.linkfilm}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>

              <h4 className="T3">{film?.category.name}</h4>
              <h5 className="t4">{Rupiah.convert(film?.price)}</h5>
              <p className="descriptext">
                {film?.description}
              </p>
            </Row>
          </div>
        </section>
      </Container>
    </>
  );
}
