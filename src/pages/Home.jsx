import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "../components/navbar/Navbar";
import FilmList from "../components/film/film-list";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div>
      <NavBar />
    <Container className="my-5">
      <Hero />
      <Row>
        <h1 className="Order">List Film</h1>
        <Col>
          <FilmList />
        </Col>
      </Row>
    </Container>
    </div>
  );
}
