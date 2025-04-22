import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import ListClient from "../pages/client/listClient/ListClient";
import Navbar from "../components/navbar/Navbar";
import InsertClient from "../pages/client/InsertClient/InsertClient";

const AppRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gestao/clientes" element={<ListClient />} />
          <Route path="/inserir/cliente" element={<InsertClient />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;
