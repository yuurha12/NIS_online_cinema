// dependencies
import { useNavigate, useParams } from "react-router-dom";
import Rupiah from "rupiah-format";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";

// style
import productModules from "../style/css/product.module.css";

// file
import checkToping from "../assets/images/icon/green-check.svg";

// component
import NavBar from "../components/navbar/Navbar";
import { Button, Col, Container, Row } from "react-bootstrap";

export default function DetailProductPage() {
  document.title = "Waysbucks | Product";

  const navigate = useNavigate();
  // check
  const [show, setShow] = useState(false);

  let { id } = useParams();
  let { data: product } = useQuery("productCache", async () => {
    const response = await API.get("/product/" + id);
    return response.data.data;
  });


  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      await API.post("/transaction", config);

      const body = JSON.stringify({
        // topping_id: topping_id,
        // subtotal: subtotal,
        // product_id: parseInt(id),
        // qty: qty,
      });

      await API.post("/cart", body, config);

      // setIdToping([]);
      // setToping([]);
      navigate("/payment");
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
                <img src={product?.image} alt="ProductImage" />
              </Col>
            </Row>
            <Row className="position-relative">
              <Col className="d-flex mb-5" id="ck">
                <p className={productModules.titleProduct}>{product?.title}</p>
                  <Button
                    className={productModules.btn}
                    onClick={(e) => handleSubmit.mutate(e)}
                  >
                    {" "}
                    Buy Now
                  </Button>
              </Col>
              <iframe
                className="yt"
                width="560"
                height="315"
                src={product?.linkfilm}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              
            </Row>
          </div>
        </section>
      </Container>
    </>
  );
}
