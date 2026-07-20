import { Outlet } from "react-router-dom";

import AdminHeader from "../components/admin/layout/AdminHeader";
import AdminSidebar from "../components/admin/layout/AdminSidebar";

import Icon from "../components/admin/ui/Icon";
import { ICONS } from "../helpers/admin/icons";

import "./AdminLayout.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminHeader
        Icon={Icon}
        ICONS={ICONS}
      />

      <div className="admin-layout__container">
        <AdminSidebar
          Icon={Icon}
        />

        <main className="admin-layout__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}