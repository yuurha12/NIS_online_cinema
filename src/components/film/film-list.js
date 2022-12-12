import React, { useContext, useState } from "react";
import { Card, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../auth/Login";
import Regform from "../auth/Register";
import { AppContexts } from "../contexts/AppContexts";
import { API } from "../../config/api";
import { useQuery } from "react-query";

const FilmList = () => {
  const title = 'LIST FILM';
  document.title = 'ONLINE CINEMA | ' + title;

  let { data: film } = useQuery("filmCaches", async () => {
    const response = await API.get('/films')
    console.log("success receive data", response.data.data)
    return response.data.data
  })

    let navigate = useNavigate()
  
    const [state] = useContext(AppContexts);
    const isLogin = state.isLogin;

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className=""
      style={{ margin: "50px auto 20px", width: "1072px", height: "392px" }}
    >
      {/* card */}
      {film?.map((item) => (
        <Card
          key={item.id}
          style={{
            width: "18rem",
            borderRadius: "13px",
            background: "#F7DADA",
            border: "none",
          }}
        >
            <Link to={`/film-detail/${item.id}`}>
              <Card.Img variant="top" src={item.image} />
            </Link>
        </Card>              
      ))}
    </Stack>
  );
};

export default FilmList;
