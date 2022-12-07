import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Container, Table } from "react-bootstrap";
import NavBar from "../components/navbar/Navbar";
import Rupiah from "rupiah-format";
import { API } from "../config/api";
import {useQuery} from "react-query"
import ModalTransaction from "../components/modal/transaction";

function Income() {
  const title = "Income Transaction";
  document.title = "Waysbucks | " + title;

  // modal
  const [showTrans, setShowTrans] = useState(false);
  const [idOrder, setIdOrder] = useState(null);

  const handleClose = () => setShowTrans(false);
  const handleShow = (id) => {
    setIdOrder(id);
    setShowTrans(true);
  };

  //fetching
  let { data: transactions } = useQuery("transactionChace", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });

  return (
    <div>
      <NavBar />
      <Container className="tableContainer">
        <h1>Income Transaction</h1>
        <div>
          <Table hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Address</th>
                <th>Post Code</th>
                <th>Income</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((item, index) => (
                <tr
                  onClick={() => handleShow(item?.id)}
                  key={index}
                  className={item.status === "" ? "dnone" : ""}
                >
                  <td>{index + 1}</td>
                  <td>{item?.user.name}</td>
                  <td>{item?.user.profile?.address}</td>
                  <td>{item?.user.profile?.postal_code}</td>
                  <td className="tablePrice">{Rupiah.convert(item?.total)}</td>
                  <td
                    className={
                      item?.status === "Success"
                        ? "tableSuccess"
                        : item?.status === "Cancel"
                        ? "tableCancel"
                        : item?.status === "pending"
                        ? "tableWaiting"
                        : "tableOtw"
                    }
                  >
                    {item?.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <ModalTransaction
          showTrans={showTrans}
          close={handleClose}
          id={idOrder}
        />
      </Container>
    </div>
  );
}

export default Income;
