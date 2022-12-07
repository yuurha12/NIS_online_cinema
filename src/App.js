import { useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { API, setAuthToken } from "./config/api";

//components
// import NavBar from "./components/Navbar";

//page
import Home from "./pages/Home";
import ProdDetail from "./pages/productDetail";
import Profile from "./pages/profile";
import Income from "./pages/incometransaction";
import CartDigan from "./pages/cartPage";
import AddProduct from "./pages/AddProduct";
import AddToping from "./pages/AddTopping";

//context
import { AppContexts } from "./components/contexts/AppContexts";



function App() {
  // Init user context
  const [state, dispatch] = useContext(AppContexts);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    // Redirect Auth
    if (state.isLogin === false) {
      // navigate("/")
    } else {
      if (state.user.role === "admin") {
        navigate("/income-transaction");
      } else if (state.user.role === "user") {
        // navigate("/")
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      
      let payload = response.data.data;
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  },[]);

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/product-detail/:id" element={<ProdDetail />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/income-transaction" element={<Income />} />
      <Route exact path="/payment" element={<CartDigan />} />
      <Route exact path="/add-product" element={<AddProduct />} />
      <Route exact path="/add-topping" element={<AddToping />} />
    </Routes>
  );
}

export default App;
