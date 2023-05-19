import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Layout from "./components/layout/Layout";
import RegisterPage from "./components/pages/RegisterPage";
import LoginPage from "./components/pages/LoginPage";
import Product from "./components/pages/Product";
import ProductUpdate from "./components/pages/ProductUpdate";
import ChatRoom from "./components/pages/ChatRoom";

function App() {
  const { isLoggedIn } = useSelector((state) => state.logInReducer);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products" element={isLoggedIn ? <Product /> : ""} />
        <Route
          path="/products/update/:id"
          element={isLoggedIn ? <ProductUpdate /> : ""}
        />
        <Route path="/chat-room" element={isLoggedIn ? <ChatRoom /> : ""} />
      </Routes>
    </Layout>
  );
}

export default App;
