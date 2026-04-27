import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/customer/HomePage";
import AccountPage from "./pages/customer/AccountPage";
import CardListPage from "./pages/customer/CardListPage";
import DesignPage from "./pages/customer/DesignCardPage";
import SendCardPage from "./pages/customer/SendCardPage";
import SavedCardPage from "./pages/customer/SavedCardPage";
import LoginPage from "./pages/admin/LoginPage";
import UserListPage from "./pages/admin/UserListPage";
import CreateUserPage from "./pages/admin/CreateUserPage";
import EditUserPage from "./pages/admin/EditUserPage";
import CardListAdminPage from "./pages/admin/CardListPage";
import CreateCardPage from "./pages/admin/CreateCardPage";
import EditCardPage from "./pages/admin/EditCardPage";
import AccountAdminPage from "./pages/admin/AccountPage";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
function LayoutRoute() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cards" element={<CardListPage />} />
      <Route path="/card/:id" element={<DesignPage />} />

      <Route
        path="/send/:id"
        element={
          <PrivateRoute
            allowedRoles={["CUSTOMER"]}
            redirectPath="/"
            role="CUSTOMER"
          >
            <SendCardPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/account/profile"
        element={
          <PrivateRoute
            allowedRoles={["CUSTOMER"]}
            redirectPath="/"
            role="CUSTOMER"
          >
            <AccountPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/saved"
        element={
          <PrivateRoute
            allowedRoles={["CUSTOMER"]}
            redirectPath="/"
            role="CUSTOMER"
          >
            <SavedCardPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/login"
        element={
          <PublicRoute redirectPath="/admin/account/profile" role="ADMIN">
            <LoginPage />
          </PublicRoute>
        }
      />

      <Route
        path="/admin/account/profile"
        element={
          <PrivateRoute
            allowedRoles={["ADMIN"]}
            redirectPath="/admin/login"
            role="ADMIN"
          >
            <AccountAdminPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <PrivateRoute
            allowedRoles={["ADMIN"]}
            redirectPath="/admin/login"
            role="ADMIN"
          >
            <UserListPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/users/create"
        element={
          <PrivateRoute
            allowedRoles={["ADMIN"]}
            redirectPath="/admin/login"
            role="ADMIN"
          >
            <CreateUserPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/users/edit/:id"
        element={
          <PrivateRoute
            allowedRoles={["ADMIN"]}
            redirectPath="/admin/login"
            role="ADMIN"
          >
            <EditUserPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/cards"
        element={
          <PrivateRoute
            allowedRoles={["ADMIN"]}
            redirectPath="/admin/login"
            role="ADMIN"
          >
            <CardListAdminPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/cards/create"
        element={
          <PrivateRoute
            allowedRoles={["ADMIN"]}
            redirectPath="/admin/login"
            role="ADMIN"
          >
            <CreateCardPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/cards/edit/:id"
        element={
          <PrivateRoute
            allowedRoles={["ADMIN"]}
            redirectPath="/admin/login"
            role="ADMIN"
          >
            <EditCardPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default LayoutRoute;
