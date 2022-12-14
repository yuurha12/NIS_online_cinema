import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import convertRupiah from "rupiah-format";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../Usercontext/Usercontex";

const Details = () => {
  const [state] = useContext(UserContext);
  const notify = () =>
    toast.warn(`Buy now to stream!`, {
      theme: "dark",
    });

  // ambil id dari params dulu cuy
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  let { data: films } = useQuery("filmdetailCache", async () => {
    const response = await API.get(`/film/${id}`);
    return response.data.data;
  });

  console.log("ini film", films);
  console.log("state", state);

  let { data: trx } = useQuery("trx2Cache", async () => {
    const response = await API.get(`/transactions`);
    const response2 = response.data.data.filter(
      (p) =>
        (p.status === "success") &
        (p.user_id == state?.user.id) &
        (p.film_id == id)
    );
    return response2;
  });
  console.log("ini trx", trx);
  console.log(state.user.role, "admin apa user");

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

  const handleBuy = useMutation(async () => {
    try {
      // Get data from product
      const data = {
        film_id: films.id,
        // BuyerId: films.user.id,
        price: films.price,
      };

      // Create variabel for store token payment from response here ...
      const response = await API.post("/transaction/create", data);

      const token = response.data.data.token;

      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          // console.log(result);
          // history.push("/profile");
          alert("success");
          navigate("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          // console.log(result);
          // history.push("/profile");
          alert("pending");
          navigate("/");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          // console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });

      // Init Snap for display payment page with token here ...
    } catch (error) {
      console.log(error);
    }
  });

  setTimeout(() => {
    setLoading(false);
  }, 10000);
  return (
    <Container className="mt-5">
      {isLoading ? (
        <div>loading....</div>
      ) : (
        <Row>
          <Col>
            <Image src={films?.image} className="w-50" />
          </Col>
          <Col>
            <Row>
              <Col>
                <h1 className="text-light">{films?.title}</h1>
              </Col>
              <Col className="text-end">
                {state.user.role !== "admin" ? (
                  <div>
                    {trx?.length === 0 ? (
                      <Button
                        className="btn-color fw-bold"
                        onClick={() => handleBuy.mutate()}
                      >
                        Buy Now
                      </Button>
                    ) : null}
                  </div>
                ) : null}
              </Col>
            </Row>
            <div className="embed-responsive embed-responsive-16by9">
              {state.user.role === "admin" ? (
                <iframe
                  width="600"
                  height="315"
                  src={films?.filmUrl}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : trx?.length === 0 ? (
                <div onClick={notify}>
                  <ToastContainer />
                  <iframe
                    width="600"
                    height="315"
                    src={films?.filmUrl}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ pointerEvents: "none" }}
                  ></iframe>
                </div>
              ) : (
                <iframe
                  width="600"
                  height="315"
                  src={films?.filmUrl}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
            <h5 className="text-light">{films?.category?.name}</h5>
            <h5 className="text-color">
              {convertRupiah.convert(films?.price)}
            </h5>
            <p className="text-light">{films?.description}</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Details;
