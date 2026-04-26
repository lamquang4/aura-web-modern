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
function LayoutRoute() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cards" element={<CardListPage />} />
      <Route path="/card/:id" element={<DesignPage />} />
      <Route path="/send/:id" element={<SendCardPage />} />
      <Route path="/account/profile" element={<AccountPage />} />
      <Route path="/saved" element={<SavedCardPage />} />

      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin/account/profile" element={<AccountAdminPage />} />

      <Route path="/admin/users" element={<UserListPage />} />
      <Route path="/admin/users/create" element={<CreateUserPage />} />
      <Route path="/admin/users/edit/:id" element={<EditUserPage />} />

      <Route path="/admin/cards" element={<CardListAdminPage />} />
      <Route path="/admin/cards/create" element={<CreateCardPage />} />
      <Route path="/admin/cards/edit/:id" element={<EditCardPage />} />
    </Routes>
  );
}

export default LayoutRoute;
