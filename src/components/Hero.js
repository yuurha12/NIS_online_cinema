import React from "react";
import { Card,Button } from "react-bootstrap";
import hero from "../assets/images/hero.svg"
import dp from "../assets/images/dp.svg"


export default function Hero() {
    return (
    <>
    <Card className="hero">
    <Card.Img src={hero}/>
    <Card.ImgOverlay className="text-hero">
      <Card.Title className="t1">
        DEAD
      </Card.Title>
      <Card.Title className="t2_1">
        POOL
      </Card.Title>
      <Card.Title className="t3">
        ACTION
      </Card.Title>
      <Card.Title className="t4">
        Rp. 99,0000
      </Card.Title>
      <Card.Text className="t2">Hold onto your chimichangas, folks. From the studio that brought you all 3 Taken films comes the block-busting, fourth-wall-breaking masterpiece about Marvel Comics’ sexiest anti-hero! Starring God’s perfect idiot Ryan Reynolds and a bunch of other "actors," DEADPOOL is a giddy slice of awesomeness packed with more twists than Deadpool’s enemies’ intestines and more action than prom night. Amazeballs! </Card.Text>
      <Button className="buy-now" variant="success">Buy Now</Button>{' '}
    </Card.ImgOverlay>
    </Card>
    </>

    )
}