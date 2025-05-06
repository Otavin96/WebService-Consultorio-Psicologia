import { JSX, useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import ListClient from "../pages/client/list/ListClient";
import InsertClient from "../pages/client/insert/InsertClient";
import EditClient from "../pages/client/edit/EditClient";
import ListScheduling from "../pages/scheduling/list/ListScheduling";
import InsertScheduling from "../pages/scheduling/Insert/InsertScheduling";
import InsertConsultation from "../pages/consultation/insert/InsertConsultation";
import Register from "../pages/Auth/Register";
import { AuthContext } from "../Context/AuthContext";
import LayoutWithNavbar from "../components/navbar/LayoutWithNavbar";
import Login from "../pages/Auth/Login";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { auth } = useContext(AuthContext);
  return auth ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas privadas com layout que inclui Navbar */}
        <Route
          element={
            <PrivateRoute>
              <LayoutWithNavbar />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/gestao/clientes" element={<ListClient />} />
          <Route path="/inserir/cliente" element={<InsertClient />} />
          <Route path="/editar/cliente" element={<EditClient />} />

          <Route path="/listar/agendamento/:id" element={<ListScheduling />} />
          <Route path="/inserir/agendamento" element={<InsertScheduling />} />

          <Route path="/inserir/consulta" element={<InsertConsultation />} />
        </Route>

        {/* Rotas públicas (sem Navbar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
