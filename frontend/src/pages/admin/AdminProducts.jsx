import React, { useState } from "react";
import { useGetProductsQuery } from "../../store/apiSlice.js";
import api from "../../utils/api.js";

const AdminProducts = () => {
  const { data, refetch } = useGetProductsQuery({ limit: 50 });
  const [form, setForm] = useState({ name: "", slug: "", price: 0, image: "", countInStock: 0, description: "" });

  const onSave = async (e) => {
    e.preventDefault();
    await api.post("/products", form, { withCredentials: true });
    setForm({ name: "", slug: "", price: 0, image: "", countInStock: 0, description: "" });
    refetch();
  };

  return (
    <div className="space-y-6">
      <div className="card p-4">
        <h2 className="font-semibold mb-2">Add Product</h2>
        <form onSubmit={onSave} className="grid md:grid-cols-2 gap-3">
          {["name","slug","price","image","countInStock","description"].map(k => (
            <input key={k} className="input" placeholder={k} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} />
          ))}
          <button className="btn-primary" type="submit">Save</button>
        </form>
      </div>
      <div className="card p-4">
        <h2 className="font-semibold mb-2">Products</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(data?.products || []).map(p => (
            <div key={p._id || p.slug} className="border border-[#1d2633] rounded-lg p-3">
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm opacity-80">${p.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AdminProducts;
