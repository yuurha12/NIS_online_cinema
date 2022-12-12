import React from "react";
import { Container } from "react-bootstrap";
import FilmList from "../components/film/film-list";
import NavBar from "../components/navbar/Navbar";

export default function MylistFilm() {
  return (
    <div>
        <NavBar />
        <Container>
      <h1 style={{color: "white"}}>My Film List</h1>
      <FilmList />
        </Container>
    </div>
  );
}
