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
import { StatusPermission } from "../tdos/user.dto";
import Unauthorized from "../pages/Unauthorized/Unauthorized";

const PrivateRoute = ({
  children,
  requiredRoles,
}: {
  children: JSX.Element;
  requiredRoles: StatusPermission[];
}) => {
  const { auth, user } = useContext(AuthContext);

  if (!auth) return <Navigate to="/login" />;

  const hasPermission = requiredRoles.includes(user?.roles as StatusPermission);

  if (!hasPermission) return <Navigate to="/unauthorized" />;

  return children;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas privadas com layout que inclui Navbar */}
        <Route
          element={
            <PrivateRoute
              requiredRoles={[
                StatusPermission.SECRETARIA,
                StatusPermission.PROFISSIONAL_SAUDE,
              ]}
            >
              <LayoutWithNavbar />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route
            path="/gestao/clientes"
            element={
              <PrivateRoute
                requiredRoles={[
                  StatusPermission.SECRETARIA,
                  StatusPermission.PROFISSIONAL_SAUDE,
                ]}
              >
                <ListClient />
              </PrivateRoute>
            }
          />
          <Route
            path="/inserir/cliente"
            element={
              <PrivateRoute
                requiredRoles={[
                  StatusPermission.SECRETARIA,
                  StatusPermission.PROFISSIONAL_SAUDE,
                ]}
              >
                <InsertClient />
              </PrivateRoute>
            }
          />
          <Route
            path="/editar/cliente"
            element={
              <PrivateRoute
                requiredRoles={[
                  StatusPermission.SECRETARIA,
                  StatusPermission.PROFISSIONAL_SAUDE,
                ]}
              >
                <EditClient />
              </PrivateRoute>
            }
          />

          <Route path="/listar/agendamento/:id" element={<ListScheduling />} />
          <Route
            path="/inserir/agendamento"
            element={
              <PrivateRoute
                requiredRoles={[
                  StatusPermission.SECRETARIA,
                  StatusPermission.PROFISSIONAL_SAUDE,
                ]}
              >
                <InsertScheduling />
              </PrivateRoute>
            }
          />

          <Route
            path="/inserir/consulta"
            element={
              <PrivateRoute
                requiredRoles={[StatusPermission.PROFISSIONAL_SAUDE]}
              >
                <InsertConsultation />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Rotas públicas (sem Navbar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
