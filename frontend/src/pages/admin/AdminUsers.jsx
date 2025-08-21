import React from "react";
import { useAdminUsersQuery } from "../../store/apiSlice.js";

const AdminUsers = () => {
  const { data: users } = useAdminUsersQuery();
  return (
    <div className="card p-4">
      <h2 className="font-semibold mb-2">Users</h2>
      <ul className="space-y-2">
        {(users || []).map(u => (
          <li key={u._id} className="border border-[#1d2633] rounded-lg p-3 flex justify-between">
            <span>{u.name} — {u.email}</span>
            <span className="badge">{u.isAdmin ? "Admin" : "Customer"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AdminUsers;
