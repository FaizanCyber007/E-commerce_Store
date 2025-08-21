import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const cls = ({ isActive }) => isActive ? "text-primary" : "hover:text-secondary";
  return (
    <section className="container-responsive my-8">
      <div className="grid md:grid-cols-4 gap-6">
        <aside className="card p-4">
          <nav className="space-y-2 text-sm">
            <NavLink to="/admin/products" className={cls}>Products</NavLink><br/>
            <NavLink to="/admin/orders" className={cls}>Orders</NavLink><br/>
            <NavLink to="/admin/users" className={cls}>Users</NavLink>
          </nav>
        </aside>
        <div className="md:col-span-3">
          <Outlet />
        </div>
      </div>
    </section>
  );
};
export default AdminLayout;
