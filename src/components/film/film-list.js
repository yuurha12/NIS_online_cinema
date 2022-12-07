import React, { useContext, useState } from "react";
import { Card, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../auth/Login";
import Regform from "../auth/Register";
// import { AppContexts } from "../contexts/AppContexts";
import { API } from "../../config/api";
import { useQuery } from "react-query";

const FilmList = () => {
  const title = 'Shop';
  document.title = 'DumbMerch | ' + title;

  let { data: products } = useQuery("productsCaches", async () => {
    const response = await API.get('/products')
    console.log("success receive data", response.data.data)
    return response.data.data
  })

    let navigate = useNavigate()

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className=""
      style={{ margin: "50px auto 20px", width: "1072px", height: "392px" }}
    >
      {/* card */}
      {products?.map((item) => (
        <Card
          key={item.id}
          style={{
            width: "18rem",
            borderRadius: "13px",
            background: "#F7DADA",
            border: "none",
          }}
        >
            <Link to={`/product-detail/${item.id}`}>
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title style={{ color: "#BD0707", fontSize: "18px" }}>
                  <b> {item.title}</b>
                </Card.Title>
                <Card.Text style={{ fontSize: "14px" }}>
                  Rp. {item.price}
                </Card.Text>
              </Card.Body>
            </Link>
        </Card>
      ))}
      <LoginForm
      />
      <Regform
      />
    </Stack>
  );
};

export default FilmList;
