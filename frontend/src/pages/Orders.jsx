import React from "react";
import { useMyOrdersQuery } from "../store/apiSlice.js";

const Orders = () => {
  const { data: orders, isLoading } = useMyOrdersQuery();
  if (isLoading) return <div className="container-responsive py-10">Loading...</div>;

  return (
    <section className="container-responsive my-8">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <div className="space-y-3">
        {(orders || []).map(o => (
          <div key={o._id} className="card p-4">
            <div className="flex justify-between">
              <div>Order #{o._id.slice(-6)}</div>
              <div className="badge">{o.isPaid ? "Paid" : "Unpaid"} • {o.isDelivered ? "Delivered" : "In transit"}</div>
            </div>
            <ul className="mt-2 text-sm opacity-90">
              {o.orderItems.map((i, idx) => <li key={idx}>{i.name} × {i.qty} — ${i.price.toFixed(2)}</li>)}
            </ul>
            <div className="mt-2 font-semibold">Total: ${o.totalPrice?.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Orders;
