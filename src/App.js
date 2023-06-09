import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Layout from "./components/layout/Layout";
import RegisterPage from "./components/pages/RegisterPage";
import LoginPage from "./components/pages/LoginPage";
import Product from "./components/pages/Product";
import ProductUpdate from "./components/pages/ProductUpdate";
import ChatRoom from "./components/pages/ChatRoom";
import OrderDetail from "./components/pages/OrderDetail";
import Dashboard from "./components/pages/Dashboard";
import ProductAddNew from "./components/pages/ProductAddNew";

function App() {
  const { isLoggedIn, isAdmin } = useSelector((state) => state.logInReducer);
  // useEffect(() => {
  //   return localStorage.clear();
  // }, []);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        <Route
          path="/dashboard"
          element={isLoggedIn && isAdmin ? <Dashboard /> : ""}
        />
        <Route
          path="/order/detail/:id"
          element={isLoggedIn && isAdmin ? <OrderDetail /> : ""}
        />
        <Route
          path="/products"
          element={isLoggedIn && isAdmin ? <Product /> : ""}
        />
        <Route
          path="/products/update/:id"
          element={isLoggedIn && isAdmin ? <ProductUpdate /> : ""}
        />
        <Route
          path="/products/add-new"
          element={isLoggedIn && isAdmin ? <ProductAddNew /> : ""}
        />
        <Route path="/chat-room" element={isLoggedIn ? <ChatRoom /> : ""} />
      </Routes>
    </Layout>
  );
}

export default App;
