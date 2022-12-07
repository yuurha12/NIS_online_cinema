import React from "react"
import { Image, Badge } from "react-bootstrap"
import BasketIcon from "../../assets/images/icon/shopping-basket.svg"
import { Link } from "react-router-dom"

const Cart = () => {
  const transaction = JSON.parse(localStorage.getItem("TRANSACTION"))
  const isLogin = JSON.parse(localStorage.getItem("DATA_LOGIN"))

  const trans = transaction.map((e) => {
    if (isLogin[0].email === e.email) {
      return e.idProduct
    }
  })

  return (
    <>
      <Link to="/my-cart">
        <Image src={BasketIcon} alt="" />
        {transaction.map((e) => {
          return (
            <>
              {isLogin[0].email === e.email ? (
                <>
                  <Badge bg="danger" className="position-absolute">
                    {trans.length}
                  </Badge>
                </>
              ) : (
                <>
                  <Badge bg="danger" className="position-absolute">
                    0
                  </Badge>
                </>
              )}
            </>
          )
        })}
      </Link>
    </>
  )
}

export default Cart