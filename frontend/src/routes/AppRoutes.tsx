import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import ListClient from "../pages/client/listClient/ListClient";
import Navbar from "../components/navbar/Navbar";
import InsertClient from "../pages/client/InsertClient/InsertClient";
import EditClient from "../pages/client/EditClient/EditClient";
import ListScheduling from "../pages/scheduling/list/ListScheduling";
import InsertScheduling from "../pages/scheduling/Insert/InsertScheduling";
import InsertConsultation from "../pages/consultation/InsertConsultation";

const AppRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gestao/clientes" element={<ListClient />} />
          <Route path="/inserir/cliente" element={<InsertClient />} />
          <Route path="/editar/cliente" element={<EditClient />} />

          <Route path="/listar/agendamento" element={<ListScheduling />} />
          <Route path="/inserir/agendamento" element={<InsertScheduling />} />

          <Route path="/inserir/consulta" element={<InsertConsultation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;
