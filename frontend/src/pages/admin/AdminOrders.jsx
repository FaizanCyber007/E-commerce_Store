import React from "react";
import { useAdminOrdersQuery, useMarkDeliveredMutation } from "../../store/apiSlice.js";

const AdminOrders = () => {
  const { data: orders, refetch } = useAdminOrdersQuery();
  const [markDelivered] = useMarkDeliveredMutation();

  return (
    <div className="card p-4">
      <h2 className="font-semibold mb-2">All Orders</h2>
      <div className="space-y-3">
        {(orders || []).map(o => (
          <div key={o._id} className="border border-[#1d2633] rounded-lg p-3 flex justify-between items-center">
            <div>
              <div className="font-semibold">#{o._id.slice(-6)} — ${o.totalPrice?.toFixed(2)}</div>
              <div className="text-sm opacity-80">{o.user?.name} • {o.isDelivered ? "Delivered" : "Pending"}</div>
            </div>
            {!o.isDelivered && (
              <button className="btn-primary" onClick={async ()=>{ await markDelivered(o._id).unwrap(); refetch(); }}>Mark Delivered</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminOrders;
